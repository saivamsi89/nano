import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { cn } from "@/lib/utils";

/**
 * NanoFab lockup: the "N" monogram + wordmark ("nano" navy/white, "fab" green).
 * `uid` keeps the mark's SVG gradient ids unique per instance on the page.
 */
export function Logo({
  className,
  variant = "dark",
  uid = "nf",
  showMark = true,
}: {
  className?: string;
  variant?: "dark" | "light";
  uid?: string;
  showMark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="NanoFab home"
      className={cn("group flex items-center gap-2.5 select-none", className)}
    >
      {showMark && (
        <LogoMark
          uid={uid}
          className="h-8 w-8 transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <span className="font-display text-2xl font-extrabold tracking-tight lowercase">
        <span className={variant === "light" ? "text-white" : "text-ink-900"}>
          nano
        </span>
        <span className="text-brand-500">fab</span>
      </span>
    </Link>
  );
}
