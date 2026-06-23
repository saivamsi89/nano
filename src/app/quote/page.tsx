import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { QuoteCalculator } from "@/components/quote-calculator";

export const metadata: Metadata = {
  title: "Instant PCB Quote",
  description:
    "Configure layers, size, finish and quantity to get a transparent NanoFab fabrication quote in seconds.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Instant quote"
        title="Price your board in seconds"
        description="Set your specs and watch the price and lead time update live—no sign-up, no waiting on email."
      >
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {[
            "Transparent, itemised pricing",
            "Free DFM review on every order",
            "2–22 layers, prototype to production",
          ].map((p) => (
            <span key={p} className="flex items-center gap-2 text-sm text-ink-200">
              <CheckCircle2 className="h-4 w-4 text-brand-500" /> {p}
            </span>
          ))}
        </div>
      </PageHero>

      <Container className="py-12 sm:py-16">
        <QuoteCalculator />
      </Container>
    </>
  );
}
