import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Download, ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaStrip } from "@/components/ui/cta-strip";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Design guides, DFM checklists and engineering references from the NanoFab team.",
};

const guides = [
  { tag: "DFM", t: "The 12-point DFM checklist before you send Gerbers", d: "Catch the design issues that delay fabrication—annular rings, acid traps, silkscreen clearance and more.", read: "8 min read" },
  { tag: "Stack-up", t: "Choosing a layer stack-up for controlled impedance", d: "A practical guide to dielectric heights, reference planes and 50Ω / 90Ω routing.", read: "11 min read" },
  { tag: "Assembly", t: "Designing for automated SMT assembly", d: "Footprint, courtyard and fiducial guidelines that keep your boards machine-friendly.", read: "7 min read" },
  { tag: "Sourcing", t: "Surviving component shortages with smart BOMs", d: "Alternate-part strategy, lifecycle checks and bonded inventory explained.", read: "9 min read" },
  { tag: "Flex", t: "Rigid-flex design: where teams go wrong", d: "Bend radius, coverlay and transition-zone rules for reliable flex circuits.", read: "10 min read" },
  { tag: "Cost", t: "What actually drives your PCB cost", d: "Layer count, finish, tolerance and panel utilisation—and how to optimise each.", read: "6 min read" },
];

const downloads = [
  "NanoFab capability matrix (PDF)",
  "Standard fabrication stack-ups",
  "DFM design rules (.dru)",
  "Recommended footprint library",
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Engineering guides that ship better boards"
        description="Hard-won knowledge from the NanoFab floor—DFM, stack-ups, assembly and sourcing, written by engineers for engineers."
      />

      <Container className="py-16">
        <SectionHeading
          eyebrow="Guides & articles"
          title="Read before your next tape-out"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.t}
              href="/resources"
              className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                  {g.tag}
                </span>
                <BookOpen className="h-4 w-4 text-ink-300" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-600">
                {g.t}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{g.d}</p>
              <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 text-sm">
                <span className="text-ink-400">{g.read}</span>
                <span className="inline-flex items-center gap-1 font-medium text-ink-900 group-hover:text-brand-600">
                  Read <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-ink-100 bg-ink-50 p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-brand-600" />
            <h2 className="font-display text-2xl font-bold text-ink-900">
              Downloads
            </h2>
          </div>
          <p className="mt-2 max-w-xl text-ink-500">
            Grab our design rules and reference documents to start your project
            on the right foot.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {downloads.map((d) => (
              <button
                key={d}
                className="flex items-center justify-between rounded-xl border border-ink-200 bg-white px-5 py-4 text-left text-sm font-medium text-ink-900 transition-colors hover:border-brand-300"
              >
                {d}
                <Download className="h-4 w-4 text-ink-400" />
              </button>
            ))}
          </div>
        </div>
      </Container>

      <CtaStrip />
    </>
  );
}
