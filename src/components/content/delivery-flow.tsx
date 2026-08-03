const shards = ["Shard 01", "Shard 02", "Shard 03"];

export function DeliveryFlow() {
  return (
    <figure className="overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_24px_70px_-42px_rgb(var(--accent)/0.45)]">
      <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-accent" />
        </div>
        <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-secondary">
          Delivery feedback loop
        </p>
      </div>
      <div className="p-5 sm:p-7">
        <div className="mx-auto max-w-md font-mono text-xs">
          <div className="flow-stage rounded-xl border border-border bg-background px-4 py-3">
            <span className="text-accent-strong">01</span>
            <span className="ml-3 font-semibold text-primary">Code change</span>
          </div>
          <div className="flow-connector flow-stage" aria-hidden="true" />
          <div className="flow-stage flow-delay-1 rounded-xl border border-accent/40 bg-elevated px-4 py-3">
            <span className="text-accent-strong">02</span>
            <span className="ml-3 font-semibold text-primary">
              Relevant tests selected
            </span>
          </div>
          <div
            className="flow-connector flow-stage flow-delay-1"
            aria-hidden="true"
          />
          <div className="flow-branches flow-stage flow-delay-2 grid grid-cols-3 gap-2 pt-4">
            {shards.map((shard) => (
              <div
                key={shard}
                className="rounded-lg border border-border bg-background px-2 py-3 text-center text-secondary"
              >
                {shard}
              </div>
            ))}
          </div>
          <div
            className="flow-connector flow-stage flow-delay-2"
            aria-hidden="true"
          />
          <div className="flow-stage flow-delay-3 rounded-xl border border-border bg-background px-4 py-3">
            <span className="text-accent-strong">03</span>
            <span className="ml-3 font-semibold text-primary">
              Cached output
            </span>
          </div>
        </div>
        <div className="flow-stage flow-delay-4 mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border text-center">
          <div className="bg-background px-3 py-4">
            <p className="text-2xl font-semibold tabular-nums text-primary">
              3×
            </p>
            <p className="mt-1 text-xs text-secondary">faster rebuilds</p>
          </div>
          <div className="bg-background px-3 py-4">
            <p className="text-2xl font-semibold tabular-nums text-primary">
              72%
            </p>
            <p className="mt-1 text-xs text-secondary">lower CI costs</p>
          </div>
        </div>
      </div>
      <figcaption className="border-t border-border px-5 py-4 text-sm leading-6 text-secondary sm:px-6">
        Faster feedback through selection, parallelism, and caching.
      </figcaption>
    </figure>
  );
}
