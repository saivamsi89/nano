"use client";

import { useState } from "react";
import { ProductRender } from "@/components/product-render";
import { cn } from "@/lib/utils";

/**
 * Amazon-style product gallery: a large main image with hover-zoom and a
 * thumbnail strip that switches the active view. Each "view" is the same board
 * shown from a different angle / crop, so the set reads like real product shots.
 */
const views = [
  { key: "front", label: "Top view", transform: "" },
  {
    key: "angle",
    label: "Angled",
    transform:
      "[transform:perspective(1000px)_rotateX(26deg)_rotateY(-24deg)_scale(0.86)]",
  },
  { key: "detail", label: "Processor", transform: "scale-150 origin-center" },
  { key: "macro", label: "Macro", transform: "scale-[1.8] origin-bottom-left" },
];

export function ProductGallery({
  category,
  id,
}: {
  category: string;
  id: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="group relative aspect-square overflow-hidden rounded-3xl border border-ink-100 bg-[#f7faf9] shadow-card">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110">
          <div className={cn("absolute inset-0", views[active].transform)}>
            <ProductRender category={category} id={id} />
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink-500 ring-1 ring-ink-100 backdrop-blur-sm">
          {views[active].label}
        </span>
        <span className="absolute bottom-4 right-4 rounded-md bg-ink-900/80 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          Hover to zoom
        </span>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {views.map((v, i) => (
          <button
            key={v.key}
            type="button"
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={v.label}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border bg-[#f7faf9] transition-all",
              active === i
                ? "border-brand-500 ring-2 ring-brand-100"
                : "border-ink-100 hover:border-ink-300"
            )}
          >
            <div className={cn("absolute inset-0", v.transform)}>
              <ProductRender category={category} id={id} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
