"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/boards";
import { cn } from "@/lib/utils";

export function AddToCart({
  product,
  className,
  full,
  compact,
}: {
  product: Product;
  className?: string;
  full?: boolean;
  compact?: boolean;
}) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  const handle = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        seed: product.seed,
        tone: product.tone,
      },
      1
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  if (compact) {
    return (
      <button
        onClick={handle}
        aria-label="Add to cart"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200",
          added
            ? "bg-brand-100 text-brand-700"
            : "bg-ink-900 text-white hover:bg-brand-500 hover:text-ink-950",
          className
        )}
      >
        {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-tight transition-all duration-200",
        full ? "h-12 w-full" : "h-10 px-5",
        added
          ? "bg-brand-100 text-brand-700"
          : "bg-ink-900 text-white hover:bg-brand-500 hover:text-ink-950",
        className
      )}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" /> Added
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" /> Add to cart
        </>
      )}
    </button>
  );
}
