import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[65vh] flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="text-5xl font-semibold tracking-tight">
        That page isn’t here.
      </h1>
      <p className="mt-5 max-w-lg text-lg text-secondary">
        The link may be outdated, or the page may have moved.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">Return home</ButtonLink>
      </div>
    </section>
  );
}
