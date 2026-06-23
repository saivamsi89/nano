import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaStrip } from "@/components/ui/cta-strip";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "NanoFab fabrication and assembly capability matrix: layer counts, materials, tolerances, finishes and certifications.",
};

const fabSpecs = [
  ["Layer count", "1 – 22 layers"],
  ["Max board size", "500 × 600 mm"],
  ["Min track / spacing", "3 mil / 3 mil"],
  ["Min drill", "0.15 mm mechanical · 0.1 mm laser"],
  ["Board thickness", "0.4 – 3.2 mm"],
  ["Copper weight", "0.5 – 6 oz"],
  ["Surface finish", "HASL · ENIG · OSP · Imm. Ag"],
  ["Solder mask", "Green · Blue · Red · Black · White"],
  ["Via types", "Through · Blind · Buried · Via-in-pad"],
  ["Impedance control", "±10% with test report"],
];

const assemblySpecs = [
  ["Placement", "SMT + through-hole"],
  ["Smallest part", "0201 / 01005 on request"],
  ["BGA pitch", "Down to 0.35 mm"],
  ["Inspection", "100% AOI + X-ray for BGA"],
  ["Process", "Lead-free & leaded"],
  ["Coating", "Conformal coat · potting"],
  ["Volume", "5 to 50,000+ boards"],
  ["Testing", "ICT · flying probe · functional"],
];

const materials = [
  "FR-4 standard Tg",
  "High-Tg FR-4 (170°C)",
  "Rogers RO4350B",
  "Aluminium / MCPCB",
  "Polyimide flex",
  "Halogen-free",
];

const certs = ["ISO 9001:2015", "IPC-A-600 Class 2 & 3", "IPC-A-610", "RoHS & REACH", "UL 94V-0"];

function SpecTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100">
      <div className="border-b border-ink-100 bg-ink-50 px-5 py-3 font-display font-semibold text-ink-900">
        {title}
      </div>
      <dl className="divide-y divide-ink-100">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-5 py-3">
            <dt className="text-sm text-ink-500">{k}</dt>
            <dd className="text-right font-mono text-sm font-medium text-ink-900">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Factory-grade specs, in plain numbers"
        description="No guesswork. Here's exactly what NanoFab's lines can build—from prototype runs to production volumes."
      />

      <Container className="py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <SpecTable title="Fabrication" rows={fabSpecs} />
          <SpecTable title="Assembly" rows={assemblySpecs} />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Materials"
              title="Substrates we work with"
              description="From everyday FR-4 to RF-grade laminates and metal-core boards for thermal management."
            />
            <div className="mt-6 flex flex-wrap gap-2.5">
              {materials.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Quality & compliance"
              title="Certified at every step"
              description="Documented processes and acceptance standards your auditors will recognise."
            />
            <div className="mt-6 flex flex-wrap gap-2.5">
              {certs.map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <CtaStrip title="Not sure if we can build it?" description="Send us your stack-up or fab notes—our engineers will confirm feasibility within a day." />
    </>
  );
}
