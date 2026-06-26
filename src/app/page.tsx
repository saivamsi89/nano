import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CircuitBoard,
  Cpu,
  PackageSearch,
  ShieldCheck,
  Timer,
  Layers,
  CheckCircle2,
  Star,
  Quote,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading, Eyebrow } from "@/components/ui/section-heading";
import { FadeImage } from "@/components/ui/fade-image";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { BoardCard } from "@/components/shop/board-card";
import { products } from "@/lib/boards";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <FeaturedBoards />
      <Capabilities />
      <Process />
      <Testimonials />
      <FinalCta />
    </>
  );
}

/* ----------------------------------------------------------------- Hero */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      {/* Full-bleed board photograph (shows immediately; subtle Ken-Burns drift) */}
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/hero/aurora-hero.jpg`}
        alt="NanoFab AURORA advanced processor board in the lab"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center motion-safe:animate-ken-burns"
      />
      {/* Legibility + brand grading overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/70" />
      <div className="absolute inset-0 -z-10 bg-ink-950/40 lg:bg-transparent" />
      <div className="absolute -right-32 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-brand-500/15 blur-[120px]" />

      <Container className="relative py-24 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <Eyebrow tone="dark">India&apos;s precision PCB partner</Eyebrow>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            From schematic to{" "}
            <span className="text-brand-500">shipped boards</span>—without the wait.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-100">
            NanoFab fabricates, assembles and sources components for high-reliability
            electronics. Get a transparent online quote in seconds, then let our
            factory handle the rest—2 to 22 layers, prototype to production.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/quote" size="lg">
              Get an instant quote <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="/shop"
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white/10"
            >
              Browse the shop
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { value: 12000, suffix: "+", v: "Boards delivered" },
              { value: 48, suffix: " hrs", v: "Fastest dispatch" },
              { value: 99.2, decimals: 1, suffix: "%", v: "Yield on first pass" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-bold text-white sm:text-3xl">
                  <CountUp
                    value={s.value}
                    decimals={s.decimals ?? 0}
                    suffix={s.suffix}
                  />
                </dt>
                <dd className="mt-1 text-xs text-ink-200 sm:text-sm">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex">
        <ChevronDown className="h-6 w-6 text-white/60 motion-safe:animate-scroll-cue" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Trust bar */
function TrustBar() {
  const logos = [
    "PHYSITECH Electronics",
    "Swan Environmental",
    "E-NNOVATE",
    "IBS Global",
    "International Innovation Summit",
  ];
  return (
    <section className="border-y border-ink-100 bg-white py-8">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
          Trusted by hardware teams building the future
        </p>
      </Container>
      <div className="relative mt-6 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 pr-12">
          {[...logos, ...logos].map((l, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-lg font-semibold text-ink-300"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Services */
function Services() {
  const items = [
    {
      icon: CircuitBoard,
      title: "PCB Fabrication",
      desc: "2 to 22 layer rigid, flex and rigid-flex boards with controlled impedance, ENIG and lead-free HASL finishes.",
      points: ["Min track 3 mil", "Up to 22 layers", "IPC Class 2 & 3"],
    },
    {
      icon: Cpu,
      title: "PCB Assembly",
      desc: "Fully automated SMT and through-hole assembly with AOI and X-ray inspection on every build.",
      points: ["0201 components", "BGA & QFN rework", "100% AOI coverage"],
    },
    {
      icon: PackageSearch,
      title: "Component Sourcing",
      desc: "Genuine, traceable parts sourced from authorised distributors—upload a BOM and we handle the rest.",
      points: ["10M+ line items", "Counterfeit-free", "Same-day quotes"],
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="One partner for the entire board"
          description="Fabrication, assembly and sourcing under one roof means fewer hand-offs, tighter tolerances and a single point of accountability."
        />
        <Reveal className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((s) => (
            <div
              key={s.title}
              className="group relative flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-ink-950">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-ink-700">
                    <CheckCircle2 className="h-4 w-4 text-brand-500" /> {p}
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-900 transition-colors group-hover:text-brand-600"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------- Featured boards */
function FeaturedBoards() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="In stock now"
            title="Boards & modules ready to ship"
            description="Reference designs and dev boards engineered by NanoFab—populated, tested and dispatched from Bengaluru."
          />
          <ButtonLink href="/shop" variant="outline">
            View all products <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
        <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <BoardCard key={p.slug} product={p} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------- Capabilities */
function Capabilities() {
  const stats = [
    { icon: Layers, k: "22", v: "Max layer count" },
    { icon: Timer, k: "48h", v: "Quick-turn dispatch" },
    { icon: ShieldCheck, k: "IPC-A-600", v: "Class 2 & 3 certified" },
    { icon: CheckCircle2, k: "100%", v: "Electrical test coverage" },
  ];
  return (
    <section className="bg-ink-50 py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Capabilities"
              title="Factory-grade specs, prototype-friendly access"
              description="Whether you need five boards or fifty thousand, every order runs on the same calibrated lines with full inspection and documentation."
            />
            <div className="mt-8 grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card"
                >
                  <s.icon className="h-6 w-6 text-brand-600" />
                  <div className="mt-3 font-display text-2xl font-bold text-ink-900">
                    {s.k}
                  </div>
                  <div className="text-sm text-ink-500">{s.v}</div>
                </div>
              ))}
            </div>
            <ButtonLink href="/capabilities" className="mt-8">
              Full capability matrix <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-brand-500/10 blur-3xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-ink-950 shadow-lift">
              <FadeImage
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/capabilities.jpg`}
                alt="Inspected printed circuit board on a calibrated line"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
            <div className="absolute -bottom-5 right-6 rounded-2xl border border-white/10 bg-ink-900/90 px-5 py-4 shadow-xl backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-medium text-ink-300">
                <ShieldCheck className="h-4 w-4 text-brand-500" /> Quality assured
              </div>
              <div className="mt-1 font-display text-lg font-bold text-white">
                AOI · X-ray · E-test
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------- Process */
function Process() {
  const steps = [
    { n: "01", t: "Upload & quote", d: "Drop in your Gerbers or BOM. Pricing and lead time appear instantly." },
    { n: "02", t: "DFM review", d: "Our engineers run a free design-for-manufacturing check before production." },
    { n: "03", t: "Fab & assembly", d: "Boards are fabricated, populated and inspected on automated lines." },
    { n: "04", t: "Test & ship", d: "Electrical test, traceability docs, and dispatch with tracking." },
  ];
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Four steps from idea to inventory"
          description="A transparent, engineer-led workflow that keeps you in the loop at every stage."
        />
        <Reveal className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative h-full">
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-12 z-10 hidden h-px w-6 bg-ink-200 md:block" />
              )}
              <div className="relative flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
                <span className="font-display text-3xl font-extrabold text-brand-500">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.d}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------- Testimonials */
function Testimonials() {
  const quotes = [
    {
      q: "NanoFab turned our 6-week board cycle into 6 days. Their DFM feedback caught two issues our team missed.",
      a: "Ananya Rao",
      r: "Hardware Lead, Volt Mobility",
    },
    {
      q: "The assembly quality is genuinely the best we've had in India—zero rework across three production runs.",
      a: "Karthik Menon",
      r: "Founder, MedSense",
    },
    {
      q: "Transparent pricing and real engineers on chat. It feels like an extension of our own team.",
      a: "Priya Nair",
      r: "CTO, GridWorks",
    },
  ];
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Customer stories"
          title="Hardware teams ship faster with NanoFab"
        />
        <Reveal className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((t) => (
            <figure
              key={t.a}
              className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-7 shadow-card"
            >
              <Quote className="h-7 w-7 text-brand-500" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-500 text-brand-500" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                “{t.q}”
              </blockquote>
              <figcaption className="mt-6 border-t border-ink-100 pt-4">
                <div className="font-display font-semibold text-ink-900">{t.a}</div>
                <div className="text-sm text-ink-500">{t.r}</div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------- Final CTA */
function FinalCta() {
  return (
    <section className="pb-8">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-950 px-8 py-16 text-center sm:px-12 sm:py-24">
          <div className="absolute inset-0 bg-grid-dark opacity-50" />
          <div className="absolute left-1/2 top-[-6rem] h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-brand-500/20 blur-[130px]" />
          <div className="absolute -bottom-28 right-10 h-64 w-64 rounded-full bg-brand-700/20 blur-[120px]" />
          <div className="relative">
            <div className="flex justify-center">
              <Eyebrow tone="dark">Ready when you are</Eyebrow>
            </div>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
              Your next board is one{" "}
              <span className="text-brand-500">upload away.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-200">
              Get an instant, transparent quote and put NanoFab&apos;s factory to
              work today.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/quote" size="lg">
                Get instant quote <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/shop"
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:border-white hover:bg-white/5"
              >
                Explore the shop
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
