import type { Metadata } from "next";
import { Mail, MapPin, Target, Eye, Gauge } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductRender } from "@/components/product-render";

export const metadata: Metadata = {
  title: "About NanoFab",
  description:
    "NanoFab is an India-based PCB manufacturer on a mission to make world-class board fabrication fast, transparent and accessible.",
};

const values = [
  { icon: Target, t: "Engineer-first", d: "Real engineers review every design. No call-centre scripts, no black-box pricing." },
  { icon: Gauge, t: "Relentlessly fast", d: "We obsess over lead time so your hardware roadmap never waits on the factory." },
  { icon: Eye, t: "Radically transparent", d: "Itemised quotes, live status and honest timelines—what you see is what you pay." },
];

const stats = [
  { k: "Amaravati", v: "Engineered in" },
  { k: "12,000+", v: "Boards delivered" },
  { k: "600+", v: "Hardware teams served" },
  { k: "18", v: "Countries shipped to" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="World-class boards, made in India, shipped worldwide"
        description="NanoFab exists to remove the friction between a great idea and a manufactured board—combining factory-grade capability with the speed and transparency hardware teams actually want."
      />

      <Container className="py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Founded by engineers, frustrated by the wait"
              description="NanoFab started when our founders—hardware engineers themselves—kept losing weeks to opaque quotes and slow turnarounds. So we built the manufacturer we wished we had: instant pricing, free DFM, and a factory obsessed with reliability."
            />
            <p className="mt-4 leading-relaxed text-ink-500">
              Today our Vijayawada facility runs calibrated fabrication and
              assembly lines with full inspection coverage, serving startups
              and enterprises across medical, mobility, energy and defence.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-3xl font-bold text-ink-900">
                    {s.k}
                  </dt>
                  <dd className="mt-1 text-sm text-ink-500">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ink-100 bg-[#f7faf9] shadow-lift">
            <ProductRender category="Dev Board" id="about-board" />
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading
            align="center"
            eyebrow="What we stand for"
            title="The principles behind every board"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.t}
                className="h-full rounded-2xl border border-ink-100 bg-white p-7 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-brand-500">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">
                  {v.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Contact */}
      <section className="bg-ink-950 py-16 text-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHeading
                tone="dark"
                eyebrow="Get in touch"
                title="Talk to a NanoFab engineer"
                description="Questions on a stack-up, a BOM or a production plan? We usually reply within a few hours."
              />
              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" /> Nano Fab Innovations Pvt. Ltd., Beside Co-operative Bank, Main Road, Ajith Singh Nagar, Vijayawada 520015
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-brand-500" /> reachus@nanofab.in
                </li>
              </ul>
            </div>

            <form className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="Name"
                  className="h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-ink-400 outline-none focus:border-brand-500"
                />
                <input
                  placeholder="Company"
                  className="h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-ink-400 outline-none focus:border-brand-500"
                />
                <input
                  placeholder="Email"
                  className="h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-ink-400 outline-none focus:border-brand-500 sm:col-span-2"
                />
                <textarea
                  placeholder="Tell us about your project"
                  rows={4}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-ink-400 outline-none focus:border-brand-500 sm:col-span-2"
                />
              </div>
              <button
                type="button"
                className="mt-5 h-12 w-full rounded-full bg-brand-500 font-medium text-ink-950 transition-colors hover:bg-brand-400"
              >
                Send message
              </button>
              <p className="mt-3 text-center text-xs text-ink-400">
                Demo form · wires to Resend / your CRM in production
              </p>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
