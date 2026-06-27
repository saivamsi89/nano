import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { Mail, MapPin } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const columns = [
  {
    title: "Services",
    links: [
      { label: "PCB Fabrication", href: "/services" },
      { label: "PCB Assembly", href: "/services" },
      { label: "Component Sourcing", href: "/services" },
      { label: "Turnkey Manufacturing", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About NanoFab", href: "/about" },
      { label: "Capabilities", href: "/capabilities" },
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Instant Quote", href: "/quote" },
      { label: "Component Shop", href: "/shop" },
      { label: "Contact Sales", href: "/about" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink-950 text-ink-200">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" uid="ftr" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
              Precision PCB fabrication, assembly and component sourcing for
              hardware teams. Your future, engineered in Amaravathi.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                Beside Co-operative Bank, Main Road, Ajith Singh Nagar,
                Vijayawada 520015
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-500" />
                reachus@nanofab.in
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-300 transition-colors hover:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={`${BASE}/brand/make-in-india.webp`}
              alt="Make in India"
              width={600}
              height={274}
              className="h-9 w-auto opacity-90"
            />
            <p className="text-xs text-ink-400">
              © {new Date().getFullYear()} Nano Fab Innovations Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
