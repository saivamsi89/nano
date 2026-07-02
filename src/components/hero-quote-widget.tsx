"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Timer, Zap } from "lucide-react";
import { computeQuote, defaultConfig } from "@/lib/quote";
import { formatINR, cn } from "@/lib/utils";

const layerOpts = [2, 4, 6];
const qtyOpts = [5, 10, 25, 50, 100];

/**
 * JLCPCB-style mini quote widget embedded in the hero: pick layers + quantity
 * and see a live price + lead time, then hand off to the full quote tool with
 * the selection carried across via URL params.
 */
export function HeroQuoteWidget() {
  const [layers, setLayers] = useState(2);
  const [qty, setQty] = useState(5);

  const result = useMemo(
    () => computeQuote({ ...defaultConfig, layers, quantity: qty }),
    [layers, qty]
  );

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute -inset-3 rounded-[1.9rem] bg-brand-500/15 blur-2xl" />
      <div className="relative rounded-3xl bg-gradient-to-br from-brand-500/40 via-white/15 to-white/[0.04] p-px shadow-2xl">
        <div className="rounded-[calc(1.5rem-1px)] bg-ink-950/85 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-brand-400" />
            <span className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Instant quote
            </span>
          </div>

          <div className="mt-4">
            <div className="text-[11px] font-medium uppercase tracking-wide text-ink-400">
              Layers
            </div>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              {layerOpts.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLayers(l)}
                  className={cn(
                    "h-9 rounded-lg border text-sm font-medium transition-all",
                    layers === l
                      ? "border-brand-500 bg-brand-500/15 text-brand-300"
                      : "border-white/10 bg-white/[0.03] text-ink-300 hover:border-white/25"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3.5">
            <div className="text-[11px] font-medium uppercase tracking-wide text-ink-400">
              Quantity
            </div>
            <div className="mt-1.5 grid grid-cols-5 gap-1.5">
              {qtyOpts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQty(q)}
                  className={cn(
                    "h-9 rounded-lg border text-sm font-medium transition-all",
                    qty === q
                      ? "border-brand-500 bg-brand-500/15 text-brand-300"
                      : "border-white/10 bg-white/[0.03] text-ink-300 hover:border-white/25"
                  )}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between rounded-xl bg-white/[0.05] px-4 py-3 ring-1 ring-inset ring-white/10">
            <div>
              <div className="text-[11px] text-ink-400">
                {qty} pcs · 100×100 mm · HASL
              </div>
              <div className="font-display text-2xl font-bold text-brand-400">
                {formatINR(result.total)}
              </div>
            </div>
            <div className="flex items-center gap-1.5 pb-1 text-xs text-ink-300">
              <Timer className="h-3.5 w-3.5 text-brand-500" />
              {result.leadDays} days
            </div>
          </div>

          <Link
            href={`/quote?layers=${layers}&qty=${qty}`}
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-500 text-sm font-semibold text-ink-950 shadow-[0_10px_26px_-8px_rgba(34,197,94,0.6)] transition-all hover:bg-brand-400 active:scale-[0.99] [&>svg]:transition-transform hover:[&>svg]:translate-x-0.5"
          >
            Customise full quote <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-2.5 text-center text-[11px] text-ink-500">
            Incl. GST &amp; free DFM review · indicative pricing
          </p>
        </div>
      </div>
    </div>
  );
}
