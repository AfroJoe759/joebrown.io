---
title: "How switching from Ably to Firebase cut real-time infrastructure costs by 95%"
description: "A cost investigation and migration strategy that replaced a mismatched pricing model while preserving presence reliability and safe rollback."
category: "Systems architecture"
publishedAt: "2026-08-02"
draft: false
---

The feature was intentionally small: warn people when someone else has the same automation open so they do not overwrite one another's work. It did not synchronize typing or cursors. It only needed to answer, “who else is here?”

The existing Ably integration handled presence and reconnection well, but its pricing model did not fit this workload. Firebase was expected to cost roughly one-twentieth as much at the same scale. The migration was less about replacing one client library with another and more about proving that cost difference, preserving failure behavior, and moving shared state without temporarily making users invisible to one another.

## The bill was driven by time, not data

Presence clients stay connected while the shared resource remains open. The payloads were tiny—about 59 bytes—but the service charged for connection minutes and channel minutes as well as messages.

At steady state, approximately **85% of the bill came from time-based charges**, and a required plan change would have increased that cost further. The annual expense was difficult to justify for a non-critical warning banner.

The technology worked. The pricing unit was the mismatch: the feature needed long-lived, mostly idle connections, while cost increased with every minute those connections remained open.

## Evaluate operational cost, not only the invoice

We compared seven managed and self-hosted approaches. The evaluation included:

- Cost at current, doubled, and quadrupled usage.
- Concurrent-connection limits.
- Engineering time to migrate.
- Monitoring, scaling, patching, and on-call ownership.
- Existing security and procurement approval.
- Internal experience operating the technology.

Self-hosted WebSockets offered low infrastructure cost, but they would turn a warning banner into an on-call service. Another managed WebSocket vendor offered a fast migration but retained much of the recurring cost. Some managed alternatives could not support expected concurrency without enterprise pricing.

Firebase Realtime Database fit the actual workload for four reasons:

1. It did not charge for connection or channel minutes.
2. Presence bandwidth fit within, or close to, the included allowance even under projected growth.
3. An existing production implementation had already operated the same pattern at higher volume.
4. Firebase was already an approved vendor, avoiding a new procurement and security-review path.

That reference implementation mattered as much as the price. It provided production evidence for heartbeat behavior, stale-session cleanup, authentication, and failure handling.

## Building presence from database primitives

Firebase does not expose the same managed presence abstraction. Each session writes a record under a tenant- and resource-scoped path:

```text
/presence/{tenant}/{resource}/{session}
```

The record contains a session identifier, a last-seen timestamp, and the minimum metadata required to display the warning. Other sessions subscribe to that scope and update the warning when entries appear or disappear.

The difficult part is deciding when a session is no longer present.

## Two paths for disconnect detection

We combined a fast cleanup path with a bounded fallback:

| Exit condition                | Cleanup mechanism                | Expected behavior |
| ----------------------------- | -------------------------------- | ----------------- |
| Tab close or navigation       | Firebase `onDisconnect()`        | Prompt removal    |
| Browser crash or network loss | Heartbeat expiration and pruning | Bounded delay     |
| Backgrounded tab              | Remains present intentionally    | No removal        |

Before writing presence, the client registers an `onDisconnect()` instruction with Firebase. The server removes the entry when it detects a cleanly closed connection, without relying on a browser `beforeunload` handler.

Every active session also refreshes a last-seen timestamp. Readers ignore and clean up entries after a conservative expiration window. That fallback covers browser crashes, operating-system termination, and network failures where disconnect detection is delayed.

Keeping backgrounded tabs present was deliberate. Someone can return to a background tab and overwrite newer work. For this feature, a stale warning is inconvenient; failing to warn about a real concurrent session defeats the feature.

## Keep authentication server-controlled

The browser does not receive administrative Firebase credentials. It requests a short-lived, scoped token from an authenticated backend. Firebase rules use the token claims to enforce tenant and session boundaries.

The database rules enforce two boundaries:

1. A user can only read presence within the authorized tenant scope.
2. A session can only write or remove its own presence entry.

The rules live in source control and deploy through CI. That keeps access changes reviewable and prevents the web console from becoming an untracked source of production configuration.

## Real-time availability must not block the application

Presence is a safeguard, not the core product. If token creation fails, Firebase is unavailable, or a rule rejects a request, the application still needs to load.

The integration catches failures at the connection boundary, reports them through existing observability, and falls back to operating without the warning. This is a deliberate degradation mode. It prevents an auxiliary real-time service from becoming a single point of failure for the application.

## The rollout could not split collaborators

A normal percentage rollout would be unsafe. If one collaborator wrote presence to Ably while another wrote to Firebase, neither system would contain the complete room. Both users could incorrectly appear alone.

We used **dual-publish with a feature-flagged read path**:

```text
During migration

Writes:  Ably + Firebase
Reads:   Ably or Firebase, selected by feature flag
```

Every client registered presence in both systems. The feature flag controlled only which system supplied the warning banner. This preserved a complete set of collaborators at every rollout percentage and made rollback a flag change rather than another deployment.

The sequence was:

1. Deploy dual publishing while continuing to read from Ably.
2. Ramp Firebase reads through controlled cohorts until all traffic uses the new path.
3. Compare warning visibility and error rates with the established baseline.
4. Hold at full traffic for a stability period.
5. Remove Ably publishing and cancel the subscription.

The temporary duplicate writes cost more for a few weeks, but they eliminated the migration's most dangerous silent failure.

## Result

Firebase reduced expected annual presence cost by approximately **95%**, bringing it to roughly **one-twentieth of the previous cost**. The migration paid for its implementation quickly while preserving an immediate rollback path throughout the rollout.

The strategy was subsequently useful to other teams evaluating similar migrations. The reusable part was not only the Firebase adapter; it was the pricing analysis, security boundary, degradation behavior, and dual-publish rollout model.

## What I would carry to the next migration

Model cost using the units a workload actually consumes. Include operational ownership in alternative analysis. Find internal production references before introducing a new platform. Define acceptable degradation before an outage forces the decision. And when shared state moves between systems, treat coexistence as an architecture problem—not merely a feature-flag percentage.
