import type { Metadata } from "next";
import { Mail, MapPin, Target, Eye, Gauge, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeImage } from "@/components/ui/fade-image";
import { cn } from "@/lib/utils";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-ink-500 outline-none transition-all focus:border-brand-500/70 focus:bg-white/[0.07] focus:ring-2 focus:ring-brand-500/25";

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
  { k: "Amaravathi", v: "Engineered in" },
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
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-brand-500/10 blur-3xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-ink-950 shadow-lift">
              <FadeImage
                src={`${BASE}/brand/about.webp`}
                alt="NanoFab engineering workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
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
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white">
        <div className="absolute inset-0 bg-grid-dark opacity-50" />
        <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-700/10 blur-[120px]" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                tone="dark"
                eyebrow="Get in touch"
                title="Talk to a NanoFab engineer"
                description="Questions on a stack-up, a BOM or a production plan? Real engineers reply—usually within a few hours."
              />
              <div className="mt-8 space-y-3">
                <a
                  href="mailto:reachus@nanofab.in"
                  className="group flex min-h-[5rem] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all hover:border-brand-500/50 hover:bg-white/[0.08]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 ring-1 ring-inset ring-brand-500/20 transition-colors group-hover:bg-brand-500 group-hover:text-ink-950">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-ink-400">Email us</div>
                    <div className="font-medium text-white">reachus@nanofab.in</div>
                  </div>
                </a>
                <div className="flex min-h-[5rem] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 ring-1 ring-inset ring-brand-500/20">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-ink-400">Our facility</div>
                    <div className="text-sm font-medium leading-relaxed text-white">
                      Nano Fab Innovations Pvt. Ltd., Beside Co-operative Bank,
                      Main Road, Ajith Singh Nagar, Vijayawada 520015
                    </div>
                  </div>
                </div>
                <div className="flex min-h-[5rem] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 ring-1 ring-inset ring-brand-500/20">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-ink-400">Typical response</div>
                    <div className="font-medium text-white">
                      Within a few hours · Mon–Sat
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.25rem] bg-brand-500/10 blur-3xl" />
              <div className="relative rounded-[1.75rem] bg-gradient-to-br from-brand-500/40 via-white/15 to-white/[0.04] p-px shadow-2xl">
                <form className="rounded-[1.7rem] bg-ink-900/85 p-6 backdrop-blur-xl sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-ink-300">
                    Name
                  </span>
                  <input placeholder="Jane Doe" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-ink-300">
                    Company
                  </span>
                  <input placeholder="Acme Robotics" className={inputCls} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium text-ink-300">
                    Email
                  </span>
                  <input
                    type="email"
                    placeholder="jane@acme.com"
                    className={inputCls}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium text-ink-300">
                    Project details
                  </span>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your board — layers, quantity, timeline…"
                    className={cn(inputCls, "resize-none")}
                  />
                </label>
              </div>
              <button
                type="button"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 font-semibold text-ink-950 shadow-[0_12px_30px_-8px_rgba(34,197,94,0.6)] transition-all hover:bg-brand-400 hover:shadow-[0_16px_36px_-8px_rgba(34,197,94,0.75)] active:scale-[0.99] [&>svg]:transition-transform hover:[&>svg]:translate-x-0.5"
              >
                Send message <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-xs text-ink-500">
                Demo form · wires to Resend / your CRM in production
              </p>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
