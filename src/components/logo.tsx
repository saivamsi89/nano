import Link from "next/link";
import Image from "next/image";
import { LogoMark } from "@/components/logo-mark";
import { cn } from "@/lib/utils";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * NanoFab lockup using the official wordmark image (navy "nano" + green "fab").
 * `variant="light"` swaps to the white-"nano" version for dark backgrounds.
 * `showMark` optionally prefixes the "N" monogram.
 */
export function Logo({
  className,
  variant = "dark",
  uid = "nf",
  showMark = false,
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
      <Image
        src={`${BASE}/brand/${variant === "light" ? "logo-light" : "logo"}.png`}
        alt="NanoFab"
        width={163}
        height={28}
        priority
        className="h-[22px] w-auto"
      />
    </Link>
  );
}
