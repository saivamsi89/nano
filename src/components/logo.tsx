import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * NanoFab wordmark rebuilt in code (matches the supplied logo:
 * "nano" in deep navy, "fab" in brand green). Crisp at any size,
 * no image asset required. Swap for an <Image/> later if desired.
 */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label="NanoFab home"
      className={cn(
        "font-display text-2xl font-extrabold tracking-tight lowercase select-none",
        className
      )}
    >
      <span className={variant === "light" ? "text-white" : "text-ink-900"}>
        nano
      </span>
      <span className="text-brand-500">fab</span>
    </Link>
  );
}
