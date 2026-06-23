import type { Metadata } from "next";
import {
  HeartPulse,
  Plane,
  Car,
  Cpu,
  Sun,
  Bot,
  Smartphone,
  Lightbulb,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { CtaStrip } from "@/components/ui/cta-strip";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "NanoFab builds PCBs for medical, aerospace, automotive, IoT, energy, robotics, consumer and lighting applications.",
};

const industries = [
  { icon: HeartPulse, t: "Medical Devices", d: "Class 2 & 3 boards with traceability for diagnostics, wearables and implantables." },
  { icon: Plane, t: "Aerospace & Defence", d: "Ruggedised, high-reliability builds to IPC Class 3 with full documentation." },
  { icon: Car, t: "Electric Mobility", d: "BMS, motor control and charging electronics built for thermal and vibration stress." },
  { icon: Cpu, t: "Industrial IoT", d: "Connected sensor and gateway boards at prototype and production volume." },
  { icon: Sun, t: "Renewable Energy", d: "Inverter, MPPT and grid-tie control boards with high-voltage isolation." },
  { icon: Bot, t: "Robotics", d: "Compact, dense multilayer boards for motion control and perception." },
  { icon: Smartphone, t: "Consumer Electronics", d: "Cost-optimised, high-volume manufacturing with rapid iteration." },
  { icon: Lightbulb, t: "Smart Lighting", d: "Metal-core and FR-4 LED boards engineered for thermal performance." },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built to the standard your sector demands"
        description="Different industries, different rules. NanoFab adapts materials, inspection and documentation to match the reliability your application requires."
      />

      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((it) => (
            <div
              key={it.t}
              className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-ink-950">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">
                {it.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{it.d}</p>
            </div>
          ))}
        </div>
      </Container>

      <CtaStrip title="Building something demanding?" description="Tell us about your application and reliability targets—we'll recommend the right stack-up and process." />
    </>
  );
}
