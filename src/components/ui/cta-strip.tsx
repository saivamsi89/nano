import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function CtaStrip({
  title = "Ready to build your next board?",
  description = "Get a transparent instant quote or talk to a NanoFab engineer today.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Container className="py-16">
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-ink-100 bg-ink-50 p-8 sm:flex-row sm:items-center sm:p-10">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-ink-500">{description}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <ButtonLink href="/quote" size="lg">
            Instant quote <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/about" size="lg" variant="outline">
            Talk to sales
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
