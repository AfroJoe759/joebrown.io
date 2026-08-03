export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-shell page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-secondary sm:text-xl">
        {description}
      </p>
    </header>
  );
}
