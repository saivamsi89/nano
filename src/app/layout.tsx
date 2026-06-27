import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NanoFab — Precision PCB Fabrication, Assembly & Components",
    template: "%s · NanoFab",
  },
  description:
    "NanoFab builds high-reliability printed circuit boards in India. Instant online quotes, 2–22 layer fabrication, automated SMT assembly, and same-day component sourcing for hardware teams worldwide.",
  keywords: [
    "PCB manufacturer India",
    "PCB fabrication",
    "PCB assembly",
    "instant PCB quote",
    "SMT assembly",
    "electronic components",
    "NanoFab",
  ],
  metadataBase: new URL("https://saivamsi89.github.io/nano/"),
  openGraph: {
    title: "NanoFab — Precision PCB Fabrication & Assembly",
    description:
      "Instant quotes, 2–22 layer boards, automated assembly and same-day components. Built for hardware teams.",
    type: "website",
    siteName: "NanoFab",
    images: [
      {
        url: "https://saivamsi89.github.io/nano/og.jpg",
        width: 1200,
        height: 630,
        alt: "NanoFab — Precision PCB Fabrication, Assembly & Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NanoFab — Precision PCB Fabrication & Assembly",
    description:
      "Instant quotes, 2–22 layer boards, automated assembly and same-day components.",
    images: ["https://saivamsi89.github.io/nano/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
