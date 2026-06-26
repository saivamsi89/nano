"use client";

import { useEffect, useRef, useState } from "react";
import { ProductImage } from "@/components/shop/product-image";
import { cn } from "@/lib/utils";

/**
 * LionCircuits-style card image carousel: cycles through several views of the
 * product photo (full + zoom crops) one after another while hovered, with dot
 * indicators. Falls back to the first view when not hovered.
 */
const slides = [
  "", // full product
  "scale-[1.55] origin-center",
  "scale-[1.8] origin-top-left",
  "scale-[1.8] origin-bottom-right",
];

export function CardCarousel({ slug, name }: { slug: string; name: string }) {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timer.current) return;
    timer.current = setInterval(
      () => setI((p) => (p + 1) % slides.length),
      850
    );
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setI(0);
  };

  useEffect(() => () => void (timer.current && clearInterval(timer.current)), []);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute inset-0 p-4 transition-opacity duration-300 ease-out",
            idx === i ? "opacity-100" : "opacity-0"
          )}
        >
          <div className={cn("relative h-full w-full", s)}>
            <ProductImage slug={slug} alt={name} />
          </div>
        </div>
      ))}

      {/* Dot indicators (LionCircuits style) */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === i ? "w-4 bg-brand-500" : "w-1.5 bg-ink-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}
