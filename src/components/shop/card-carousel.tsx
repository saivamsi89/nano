"use client";

import { useEffect, useState } from "react";
import { ProductImage } from "@/components/shop/product-image";
import { cn } from "@/lib/utils";

/**
 * LionCircuits-style card image carousel: continuously cycles through several
 * views of the product photo (full + zoom crops) with dot indicators. Each card
 * starts at a random offset so the grid doesn't flip in sync. Honors
 * prefers-reduced-motion.
 */
const slides = [
  "", // full product
  "scale-[1.55] origin-center",
  "scale-[1.8] origin-top-left",
  "scale-[1.8] origin-bottom-right",
];

export function CardCarousel({ slug, name }: { slug: string; name: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let interval: ReturnType<typeof setInterval>;
    // stagger each card's start so they don't all change at once
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setI((p) => (p + 1) % slides.length);
      }, 2200);
    }, Math.random() * 2000);

    return () => {
      clearTimeout(startDelay);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute inset-0 p-4 transition-opacity duration-500 ease-out",
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
