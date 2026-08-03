---
title: "How barrel files slow down TypeScript builds"
description: "A benchmarked barrel-file removal that made production builds 29% faster, reduced module collection, and enabled accurate CI test selection."
category: "Developer experience"
publishedAt: "2026-08-02"
draft: false
---

Barrel files make imports shorter. In a large TypeScript application, they can also make the dependency graph much larger than the code being used.

That distinction mattered in a repository where module collection took longer than the tests themselves, cold builds varied by tens of seconds, and a single import could pull hundreds of unrelated modules into a tool's working set. We suspected barrel files were part of the problem, but removing hundreds of them would touch thousands of files. The work needed evidence before it needed a codemod.

## The pattern and its hidden cost

A barrel is usually an `index.ts` file that re-exports a directory:

```ts
// components/index.ts
export { Button } from "./button";
export { Modal } from "./modal";
export { DataGrid } from "./data-grid";
```

Consumers get a tidy import:

```ts
import { Button } from "../components";
```

The consumer needs one component, but a bundler, test runner, or type checker first opens the barrel, resolves every re-export, and follows the imports behind those modules. Nested barrels multiply that work. Tree-shaking can still keep unused code out of the browser bundle, but it happens after tooling has spent time resolving and transforming the graph.

The graph can expand far beyond the requested module:

```text
Feature imports Button
        │
        ▼
components/index.ts ─────────── re-exports 45 modules
        │
        ├── Button.tsx          ← the requested module
        ├── Modal.tsx ───────── imports hooks/index.ts
        │                              │
        │                              ├── use-modal.ts
        │                              ├── use-tooltip.ts
        │                              └── use-grid.ts ── imports utils/index.ts
        │                                                     │
        │                                                     └── 30 utilities
        ├── DatePicker.tsx ──── imports utils/index.ts
        └── DataGrid.tsx ────── imports state/index.ts
                                       │
                                       └── 50 state modules

Requested: 1 component
Resolved: hundreds of transitive modules
```

The package contained hundreds of barrel files. The problem showed up in several places:

- Test module collection took about **56 seconds**, while test execution took about **7 seconds**.
- A clean production build produced more than **2 GB** of output on disk.
- First-page compilation in development took about **61 seconds**.
- Build times varied enough to make individual before-and-after runs unreliable.

None of those measurements proved that barrels were the cause. They established a testable hypothesis.

## How to tell whether barrel files are costing you performance

Start with tool timings and graph behavior rather than the number of `index.ts` files alone.

### Module collection dominates test execution

Test runners usually report collection, transformation, setup, and execution separately. If resolving and transforming modules takes several times longer than running the assertions, inspect the import graph before optimizing individual tests.

### Clean builds create disproportionate output

A large `.next`, cache, or intermediate build directory can indicate that the same modules are being reached through many entry points. Disk size is not proof by itself, but it is a useful signal when paired with slow graph traversal.

### Builds show memory pressure or high variance

Heap exhaustion, unstable build durations, and large differences between cold and warm runs can all come from tools holding an unnecessarily broad graph in memory. Record the range and standard deviation rather than comparing only the fastest run.

### Barrel density is high

Count barrel candidates and compare the result with the package's source-file count:

```bash
find src -name "index.ts" -o -name "index.tsx"
```

Hundreds of barrels in one application package deserve investigation. A handful of package entry points do not. Also inspect whether barrels re-export other barrels; depth and import frequency matter more than the raw count.

The next step is still a proof of concept. Replace imports in one representative branch, clear the same caches, and run the same workflows repeatedly before scheduling a repository-wide rewrite.

## Benchmark before changing the repository

The first deliverable was a proof-of-concept branch and a repeatable benchmark—not a repository-wide rewrite.

We measured three workflows:

1. A cold production build with caches removed.
2. The complete test suite with the test-runner cache removed.
3. Development startup, first-page compilation, and an incremental rebuild after a controlled edit.

Each scenario ran **10 times on each branch**. A single build could move by 10–15 seconds because of machine load, so one dramatic run was not enough. We compared averages, ranges, and variance using the same commands and cache state.

The proof of concept removed most barrels from a representative branch. After those results justified continuing, the final pass retained only a small number of deliberate package-level API boundaries.

| Measurement                    | Before | After |        Change |
| ------------------------------ | -----: | ----: | ------------: |
| Cold production build          | 106.4s | 75.1s |  29.4% faster |
| Build output on disk           |   100% | 82.3% | 17.7% smaller |
| Test module collection         |  56.4s | 36.5s |  35.3% faster |
| First-page development compile |  60.7s | 46.9s |  22.7% faster |
| Incremental rebuild            |  1.67s | 0.63s |  62.5% faster |

Build variance improved too. The standard deviation dropped from roughly 3.7 seconds to 0.6 seconds. That made the improvement easier to trust and made CI duration more predictable.

## What did not change

The result was primarily an engineering-system improvement, not a runtime optimization.

- Shared client JavaScript moved from 474 kB to 469 kB—a negligible difference.
- The validation suite produced the same results before and after the rewrite.
- Application behavior did not change.
- Users did not receive a redesigned or smaller product.

Tree-shaking had already protected the browser bundle. Direct imports made the graph cheaper and more precise for the tools used to build, test, and navigate the repository.

## Why we merged the rewrite atomically

The rewrite changed imports across thousands of files. An incremental directory-by-directory migration sounded safer, but it would have extended the most expensive risks:

- Every feature branch touching imports would repeatedly conflict with the migration.
- A prevention rule could not be enforced while most violations still existed.
- Test coverage inputs would shift across many unrelated pull requests.
- New barrel imports could arrive faster than old ones were removed.

The approach that worked was one coordinated branch:

1. Use codemods for mechanical import rewrites.
2. Manually resolve cycles, aliases, dynamic imports, and genuine public boundaries.
3. Run the complete validation and benchmark suites.
4. Coordinate a low-activity merge window.
5. Enable lint enforcement in the same change.

The branch was large, but most changes were mechanically reviewable. Atomic delivery traded one carefully managed merge for weeks of recurring conflict.

## A cleaner graph enabled selective testing

The larger payoff came after the build improvement. Barrel imports made unrelated tests appear transitively connected, which prevented related-test tooling from selecting a useful subset.

After direct imports made those dependencies more accurate, we analyzed a large sample of merged pull requests and used the results to design dynamic test selection and sharding. A typical change affected only a small fraction of the full suite, reducing the required shard allocation by approximately 90% and creating the basis for much larger CI cost reductions.

De-barreling did not produce every later CI gain by itself. It removed false dependency edges so caching, affected-test analysis, and dynamic shard allocation could make better decisions.

## Downstream CI cost impact

The analysis projected a substantial reduction in annual shard jobs and runner time, lowering test compute by about **65%**. Those projections made the follow-on investment in dynamic selection and sharding easier to justify.

The broader production initiative—direct imports, dynamic test selection, dynamic sharding, incremental builds, and caching—eventually reduced average pipeline cost by approximately **72%**. That number should not be attributed to barrel removal alone. De-barreling made the dependency graph accurate enough for the later optimizations to work.

## A more extreme example from Atlassian

For a much larger comparison, read [How We Achieved 75% Faster Builds by Removing Barrel Files](https://www.atlassian.com/blog/how-we-build/faster-builds-when-removing-barrel-files). Atlassian describes the same cascading dependency problem in Jira's frontend, but across thousands of packages and more than 90,000 changed files.

Their results included 75% fewer build minutes, 88% fewer unit tests selected in a typical build, and substantially faster local TypeScript and test feedback. Their migration strategy differed because more than a thousand developers were contributing concurrently, but the core lesson was consistent: direct imports made dependency-based tooling both faster and more accurate.

## When barrels are still reasonable

The rule is not “every `index.ts` is bad.” Barrels can still be appropriate when they are intentional API boundaries:

- The public entry point of a published package.
- A small package with a shallow dependency graph.
- A monorepo package boundary that prevents consumers from importing internals.

The costly pattern is a barrel in nearly every directory of a large application, especially when barrels import other barrels.

## What I would repeat

Measure graph-heavy phases separately from test execution. Run enough samples to understand variance. Prove the largest part of the change before scheduling a repository-wide migration. Automate the mechanical work, merge it as one coordinated change, and prevent the pattern from returning immediately.

The shortest import is not always the cheapest import. At scale, explicit dependencies gave both people and tools a more honest description of the system.
