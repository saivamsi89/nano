import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 bg-grid-dark opacity-50" />
      <div className="absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-500/20 blur-[120px]" />
      <Container className="relative py-16 sm:py-20">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-200">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
