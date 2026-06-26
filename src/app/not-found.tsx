import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[72vh] flex-col items-center justify-center py-24 text-center">
      <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
        Error 404 · Open circuit
      </span>
      <h1 className="mt-5 font-display text-6xl font-extrabold tracking-tight text-ink-900 sm:text-7xl">
        Trace not found
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-500">
        This route didn&apos;t route. The page you&apos;re after isn&apos;t on
        this panel — let&apos;s get you back on a working layer.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" size="lg">
          Back to home <ArrowRight className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink href="/shop" size="lg" variant="outline">
          Browse the shop
        </ButtonLink>
      </div>
    </Container>
  );
}
