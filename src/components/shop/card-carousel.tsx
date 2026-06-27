"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "@/components/shop/product-image";
import { cn } from "@/lib/utils";

/**
 * Manual product-image carousel: the user clicks the arrows (or dots) to move
 * between views of the product photo. No auto-scroll. Clicks are stopped from
 * bubbling so they don't trigger the surrounding card link.
 */
const slides = [
  "", // full product
  "scale-[1.55] origin-center",
  "scale-[1.8] origin-top-left",
  "scale-[1.8] origin-bottom-right",
];

export function CardCarousel({ slug, name }: { slug: string; name: string }) {
  const [i, setI] = useState(0);

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const go = (e: React.MouseEvent, dir: number) => {
    stop(e);
    setI((p) => (p + dir + slides.length) % slides.length);
  };
  const set = (e: React.MouseEvent, idx: number) => {
    stop(e);
    setI(idx);
  };

  return (
    <div className="absolute inset-0">
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

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={(e) => go(e, -1)}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink-700 shadow-sm ring-1 ring-ink-100 backdrop-blur transition-all hover:bg-white hover:text-ink-900 active:scale-95"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={(e) => go(e, 1)}
        aria-label="Next image"
        className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink-700 shadow-sm ring-1 ring-ink-100 backdrop-blur transition-all hover:bg-white hover:text-ink-900 active:scale-95"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Clickable dots */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => set(e, idx)}
            aria-label={`View ${idx + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === i ? "w-4 bg-brand-500" : "w-1.5 bg-ink-300 hover:bg-ink-400"
            )}
          />
        ))}
      </div>
    </div>
  );
}
