import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductRender } from "@/components/product-render";
import { ProductImage } from "@/components/shop/product-image";
import { AddToCart } from "@/components/shop/add-to-cart";
import type { Product } from "@/lib/boards";

export function BoardCard({ product }: { product: Product }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all duration-300 hover:border-ink-200 hover:shadow-lift">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden border-b border-ink-100 bg-white"
      >
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
          {product.image ? (
            <div className="absolute inset-0 p-4">
              <div className="relative h-full w-full">
                <ProductImage slug={product.slug} alt={product.name} />
              </div>
            </div>
          ) : (
            <ProductRender category={product.category} id={product.slug} />
          )}
        </div>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-700 shadow-sm ring-1 ring-ink-100">
            {product.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-md bg-brand-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
          {product.ships}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-xs font-medium text-brand-600">
          {product.mpn}
        </span>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {product.tagline}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-ink-400">
          <span>by {product.manufacturer}</span>
          <span className="h-1 w-1 rounded-full bg-ink-300" />
          <span className="font-medium text-brand-600">In stock</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 transition-colors hover:text-brand-700"
          >
            View details <ArrowRight className="h-4 w-4" />
          </Link>
          <AddToCart product={product} compact />
        </div>
      </div>
    </div>
  );
}
