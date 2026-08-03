export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-secondary">{description}</p>
      ) : null}
    </div>
  );
}
