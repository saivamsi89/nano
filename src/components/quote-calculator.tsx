"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Timer, Truck, FileUp, BadgeCheck, ArrowRight } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
import {
  computeQuote,
  defaultConfig,
  layerOptions,
  thicknessOptions,
  finishOptions,
  colorOptions,
  type QuoteConfig,
} from "@/lib/quote";
import { formatINR, cn } from "@/lib/utils";

const colorHex: Record<QuoteConfig["color"], string> = {
  green: "#16a34a",
  blue: "#2563eb",
  red: "#dc2626",
  black: "#1f2937",
  white: "#e5e7eb",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wide text-ink-400">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
        active
          ? "border-ink-900 bg-ink-900 text-white"
          : "border-ink-200 text-ink-600 hover:border-ink-400"
      )}
    >
      {children}
    </button>
  );
}

export function QuoteCalculator() {
  const [c, setC] = useState<QuoteConfig>(defaultConfig);
  const set = <K extends keyof QuoteConfig>(k: K, v: QuoteConfig[K]) =>
    setC((prev) => ({ ...prev, [k]: v }));

  // Pick up a selection handed off from the hero quote widget (?layers=&qty=)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const layers = Number(p.get("layers"));
    const qty = Number(p.get("qty"));
    setC((prev) => ({
      ...prev,
      ...(layerOptions.includes(layers) ? { layers } : {}),
      ...(qty >= 1 ? { quantity: Math.floor(qty) } : {}),
    }));
  }, []);

  const result = useMemo(() => computeQuote(c), [c]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* Configurator */}
      <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Layers">
            <div className="flex flex-wrap gap-2">
              {layerOptions.map((l) => (
                <Pill key={l} active={c.layers === l} onClick={() => set("layers", l)}>
                  {l}
                </Pill>
              ))}
            </div>
          </Field>

          <Field label="Quantity (pcs)">
            <input
              type="number"
              min={1}
              value={c.quantity}
              onChange={(e) => set("quantity", Math.max(1, Number(e.target.value)))}
              className="h-11 w-full rounded-lg border border-ink-200 px-3 text-sm font-medium text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </Field>

          <Field label="Width (mm)">
            <input
              type="number"
              min={5}
              value={c.width}
              onChange={(e) => set("width", Math.max(5, Number(e.target.value)))}
              className="h-11 w-full rounded-lg border border-ink-200 px-3 text-sm font-medium text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </Field>

          <Field label="Height (mm)">
            <input
              type="number"
              min={5}
              value={c.height}
              onChange={(e) => set("height", Math.max(5, Number(e.target.value)))}
              className="h-11 w-full rounded-lg border border-ink-200 px-3 text-sm font-medium text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </Field>

          <Field label="Thickness (mm)">
            <div className="flex flex-wrap gap-2">
              {thicknessOptions.map((t) => (
                <Pill key={t} active={c.thickness === t} onClick={() => set("thickness", t)}>
                  {t.toFixed(1)}
                </Pill>
              ))}
            </div>
          </Field>

          <Field label="Surface finish">
            <div className="flex flex-wrap gap-2">
              {finishOptions.map((f) => (
                <Pill key={f} active={c.finish === f} onClick={() => set("finish", f)}>
                  {f}
                </Pill>
              ))}
            </div>
          </Field>

          <Field label="Copper weight">
            <div className="flex flex-wrap gap-2">
              {([1, 2] as const).map((w) => (
                <Pill key={w} active={c.copper === w} onClick={() => set("copper", w)}>
                  {w} oz
                </Pill>
              ))}
            </div>
          </Field>

          <Field label="Turnaround">
            <div className="flex flex-wrap gap-2">
              <Pill active={c.turn === "standard"} onClick={() => set("turn", "standard")}>
                Standard
              </Pill>
              <Pill active={c.turn === "quick"} onClick={() => set("turn", "quick")}>
                Quick-turn
              </Pill>
            </div>
          </Field>

          <Field label="Solder mask colour">
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => set("color", col)}
                  aria-label={col}
                  className={cn(
                    "h-9 w-9 rounded-full border-2 transition-transform",
                    c.color === col ? "scale-110 border-ink-900" : "border-ink-200"
                  )}
                  style={{ background: colorHex[col] }}
                />
              ))}
            </div>
          </Field>
        </div>

        {/* Upload */}
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-ink-200 bg-ink-50 p-4">
          <FileUp className="h-5 w-5 text-ink-400" />
          <div className="flex-1 text-sm text-ink-500">
            Have Gerbers or a BOM? Drag &amp; drop to attach (demo)
          </div>
          <span className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-ink-600 shadow-sm">
            Browse
          </span>
        </div>
      </div>

      {/* Live result */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-ink-100 bg-ink-950 text-white shadow-lift">
          <div className="relative h-40 overflow-hidden">
            <Image
              src={`${BASE}/brand/capabilities.webp`}
              alt="Printed circuit board"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-300">Estimated unit price</span>
              <span className="font-display text-lg font-semibold text-white">
                {formatINR(result.unitPrice)}
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-ink-400">
                Order total (incl. GST)
              </div>
              <div className="mt-1 font-display text-3xl font-bold text-brand-400">
                {formatINR(result.total)}
              </div>
              <div className="mt-1 text-xs text-ink-400">
                {c.quantity} × {c.width}×{c.height} mm · {c.layers}-layer · {c.finish}
              </div>
            </div>

            <dl className="mt-4 space-y-2.5 text-sm">
              <Row label="Subtotal" value={formatINR(result.subtotal)} />
              <Row
                label="Setup / tooling"
                value={result.setupWaived ? "Waived" : formatINR(result.setup)}
                accent={result.setupWaived}
              />
              <Row
                label="Shipping"
                value={result.shipping === 0 ? "Free" : formatINR(result.shipping)}
              />
              <Row label="GST (18%)" value={formatINR(result.gst)} />
            </dl>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-3">
                <div className="flex items-center gap-1.5 text-xs text-ink-300">
                  <Timer className="h-3.5 w-3.5 text-brand-500" /> Lead time
                </div>
                <div className="mt-1 font-display text-lg font-bold">
                  {result.leadDays} days
                </div>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <div className="flex items-center gap-1.5 text-xs text-ink-300">
                  <Truck className="h-3.5 w-3.5 text-brand-500" /> Dispatch
                </div>
                <div className="mt-1 font-display text-lg font-bold">Tracked</div>
              </div>
            </div>

            <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 font-medium text-ink-950 transition-colors hover:bg-brand-400">
              Proceed to order <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-400">
              <BadgeCheck className="h-3.5 w-3.5 text-brand-500" />
              Free DFM review included · Indicative demo pricing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink-300">{label}</dt>
      <dd className={cn("font-medium", accent ? "text-brand-400" : "text-white")}>
        {value}
      </dd>
    </div>
  );
}
