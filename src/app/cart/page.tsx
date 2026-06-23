"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ProductRender } from "@/components/product-render";
import { products } from "@/lib/boards";
import { useCart } from "@/lib/cart-store";

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [placed, setPlaced] = useState(false);
  useEffect(() => setMounted(true), []);

  const totalQty = items.reduce((n, i) => n + i.qty, 0);

  if (!mounted) {
    return (
      <Container className="py-24">
        <div className="h-40 animate-pulse rounded-2xl bg-ink-50" />
      </Container>
    );
  }

  if (placed) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <FileText className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-ink-900">
          Quote request received 🎉
        </h1>
        <p className="mt-3 max-w-md text-ink-500">
          A NanoFab engineer will email you a tailored quote shortly. This is a
          demo—in production this sends your enquiry to the team and confirms by email.
        </p>
        <ButtonLink href="/shop" className="mt-8">
          Continue browsing <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100 text-ink-400">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-ink-900">
          Your list is empty
        </h1>
        <p className="mt-3 max-w-md text-ink-500">
          Browse boards, modules and prototype kits—add the ones you need and
          request a single quote.
        </p>
        <ButtonLink href="/shop" className="mt-8">
          Browse the shop <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
        Request a quote
      </h1>
      <p className="mt-2 text-ink-500">
        Set quantities for the items you need and we&apos;ll send a single,
        transparent quote.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Items */}
        <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100">
          {items.map((item) => (
            <div key={item.slug} className="flex gap-4 p-5">
              <Link
                href={`/shop/${item.slug}`}
                className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-[#f7faf9]"
              >
                <ProductRender
                  category={
                    products.find((p) => p.slug === item.slug)?.category ??
                    "Module"
                  }
                  id={item.slug}
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/shop/${item.slug}`}
                    className="font-display font-semibold text-ink-900 hover:text-brand-600"
                  >
                    {item.name}
                  </Link>
                  <button
                    onClick={() => remove(item.slug)}
                    aria-label="Remove"
                    className="text-ink-400 transition-colors hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-sm text-brand-600">In stock · tested</div>

                <div className="mt-auto flex items-center gap-3 pt-3">
                  <span className="text-sm text-ink-400">Qty</span>
                  <div className="flex items-center rounded-full border border-ink-200">
                    <button
                      onClick={() => setQty(item.slug, item.qty - 1)}
                      className="flex h-8 w-8 items-center justify-center text-ink-600 hover:text-ink-900"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => setQty(item.slug, item.qty + 1)}
                      className="flex h-8 w-8 items-center justify-center text-ink-600 hover:text-ink-900"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between p-5">
            <button
              onClick={clear}
              className="text-sm font-medium text-ink-400 hover:text-red-500"
            >
              Clear list
            </button>
            <Link
              href="/shop"
              className="text-sm font-medium text-ink-600 hover:text-ink-900"
            >
              Continue shopping
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6">
            <h2 className="font-display text-lg font-semibold text-ink-900">
              Quote summary
            </h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-500">Line items</dt>
                <dd className="font-medium text-ink-900">{items.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">Total units</dt>
                <dd className="font-medium text-ink-900">{totalQty}</dd>
              </div>
              <div className="flex justify-between border-t border-ink-200 pt-3">
                <dt className="text-ink-500">Pricing</dt>
                <dd className="font-medium text-brand-600">On quote</dd>
              </div>
            </dl>

            <button
              onClick={() => {
                setPlaced(true);
                clear();
              }}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 font-medium text-ink-950 transition-colors hover:bg-brand-400"
            >
              <FileText className="h-4 w-4" /> Request quote
            </button>
            <p className="mt-3 text-center text-xs text-ink-400">
              Free DFM review included · engineer responds within a day
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
