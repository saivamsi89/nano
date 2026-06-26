import type { Metadata } from "next";
import { CircuitBoard, Cpu, PackageSearch, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { FadeImage } from "@/components/ui/fade-image";
import { CtaStrip } from "@/components/ui/cta-strip";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Services — Fabrication, Assembly & Sourcing",
  description:
    "NanoFab's end-to-end PCB services: fabrication from 2 to 22 layers, automated SMT assembly, and traceable component sourcing.",
};

const services = [
  {
    id: "fabrication",
    icon: CircuitBoard,
    seed: 7,
    tone: "green" as const,
    title: "PCB Fabrication",
    lead: "Rigid, flex and rigid-flex boards built on calibrated lines with controlled impedance and tight tolerances.",
    features: [
      "1–22 layers, rigid / flex / rigid-flex",
      "Min trace & space down to 3 mil",
      "ENIG, lead-free HASL, OSP, immersion silver",
      "Controlled impedance & impedance test reports",
      "IPC-A-600 Class 2 & 3 acceptance",
      "Blind & buried vias, via-in-pad",
    ],
  },
  {
    id: "assembly",
    icon: Cpu,
    seed: 64,
    tone: "navy" as const,
    title: "PCB Assembly",
    lead: "Fully automated SMT and through-hole assembly with full inspection coverage on every build.",
    features: [
      "0201 to large BGA & QFN placement",
      "Lead-free & leaded process options",
      "100% automated optical inspection (AOI)",
      "X-ray inspection for BGAs",
      "Conformal coating & potting",
      "Functional test fixtures on request",
    ],
  },
  {
    id: "sourcing",
    icon: PackageSearch,
    seed: 41,
    tone: "slate" as const,
    title: "Component Sourcing",
    lead: "Genuine, traceable parts from authorised distributors—upload a BOM and we manage procurement end to end.",
    features: [
      "10M+ line items across authorised channels",
      "Counterfeit-free, fully traceable supply",
      "BOM scrubbing & lifecycle alerts",
      "Alternate-part suggestions for shortages",
      "Bonded inventory for repeat builds",
      "Same-day component quotes",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your board needs, under one roof"
        description="From bare-board fabrication to a fully populated, tested assembly, NanoFab owns the whole process—so you get one quote, one timeline and one point of accountability."
      />

      <Container className="py-16">
        <div className="space-y-20">
          {services.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className="grid items-center gap-10 lg:grid-cols-2 scroll-mt-24"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-brand-500">
                  <s.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold text-ink-900">
                  {s.title}
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-ink-500">{s.lead}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="relative">
                  <div className="absolute -inset-5 rounded-[2.5rem] bg-brand-500/10 blur-3xl" />
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-ink-950 shadow-lift">
                    <FadeImage
                      src={`${BASE}/brand/services-${s.id}.jpg`}
                      alt={`${s.title} at NanoFab`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <CtaStrip />
    </>
  );
}
