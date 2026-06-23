"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BoardCard } from "@/components/shop/board-card";
import { products } from "@/lib/boards";
import { cn } from "@/lib/utils";

const categories = ["All", "Dev Board", "Module", "Sensor", "PCB Kit"] as const;

export default function ShopPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: products.length };
    for (const p of products) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = active === "All" || p.category === active;
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.mpn.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [active, query]);

  return (
    <>
      {/* Light catalog header with search */}
      <section className="border-b border-ink-100 bg-ink-50">
        <Container className="py-12 sm:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Component Shop
          </span>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Boards, modules &amp; components
          </h1>
          <p className="mt-3 max-w-2xl text-ink-500">
            Search and procure from NanoFab&apos;s catalogue of boards, modules and
            prototype kits — each one built and tested in-house.
          </p>

          <div className="relative mt-7 max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-600" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by MPN or keyword…"
              className="h-12 w-full rounded-full border border-ink-200 bg-white pl-12 pr-4 text-sm text-ink-900 shadow-sm outline-none placeholder:text-ink-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
              <SlidersHorizontal className="h-4 w-4" /> Product categories
            </div>
            <ul className="mt-4 space-y-1">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setActive(c)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
                      active === c
                        ? "bg-ink-900 font-medium text-white"
                        : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                    )}
                  >
                    {c}
                    <span
                      className={cn(
                        "text-xs",
                        active === c ? "text-white/70" : "text-ink-400"
                      )}
                    >
                      {counts[c] ?? 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-ink-100 bg-ink-50 p-4">
              <p className="text-sm font-medium text-ink-900">Need a custom board?</p>
              <p className="mt-1 text-xs text-ink-500">
                Upload your Gerbers for an instant fabrication quote.
              </p>
              <a
                href="/quote"
                className="mt-3 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Open quote tool →
              </a>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-ink-500">
                Showing{" "}
                <span className="font-medium text-ink-900">{filtered.length}</span>{" "}
                {active === "All" ? "products" : active.toLowerCase() + "s"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-ink-200 p-16 text-center text-ink-500">
                No products match “{query}”.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <BoardCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
