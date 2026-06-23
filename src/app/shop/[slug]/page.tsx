import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2, ShieldCheck, Timer, Truck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProductRender } from "@/components/product-render";
import { AddToCart } from "@/components/shop/add-to-cart";
import { BoardCard } from "@/components/shop/board-card";
import { getProduct, products } from "@/lib/boards";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <Container className="py-10">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-ink-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* Visual */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ink-100 bg-[#f7faf9] shadow-card">
              <ProductRender category={product.category} id={product.slug} />
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 text-xs text-ink-500">
              <span className="font-mono font-medium text-brand-600">
                {product.mpn}
              </span>
              <span className="h-1 w-1 rounded-full bg-ink-300" />
              <span>by {product.manufacturer}</span>
              <span className="ml-auto font-medium text-brand-600">In stock</span>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                {product.category}
              </span>
              {product.badge && (
                <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-700">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-500">
              {product.tagline}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                In stock · tested &amp; ready to ship
              </span>
            </div>

            {/* Specs */}
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100">
              {product.specs.map((spec) => (
                <div key={spec.label} className="bg-white p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-400">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 font-mono text-sm font-medium text-ink-900">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCart product={product} full />
              <Link
                href="/cart"
                className="inline-flex h-12 items-center justify-center rounded-full border border-ink-200 px-6 text-sm font-medium text-ink-900 transition-colors hover:border-ink-900"
              >
                Go to cart
              </Link>
            </div>

            <ul className="mt-8 space-y-3 border-t border-ink-100 pt-6">
              {[
                { icon: Truck, t: product.ships, d: "Tracked pan-India & export dispatch" },
                { icon: ShieldCheck, t: "Tested & traceable", d: "100% electrical test, batch traceability" },
                { icon: Timer, t: "Engineer support", d: "Real engineers on chat, not a bot" },
              ].map((f) => (
                <li key={f.t} className="flex items-start gap-3">
                  <f.icon className="mt-0.5 h-5 w-5 text-brand-600" />
                  <div>
                    <div className="text-sm font-medium text-ink-900">{f.t}</div>
                    <div className="text-sm text-ink-500">{f.d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-ink-50 p-5">
              <h3 className="flex items-center gap-2 font-display font-semibold text-ink-900">
                <CheckCircle2 className="h-5 w-5 text-brand-600" /> Need it customised?
              </h3>
              <p className="mt-1 text-sm text-ink-500">
                Want this design in a different layer count, finish or quantity?
                Get an instant fabrication quote tailored to your specs.
              </p>
              <Link
                href="/quote"
                className="mt-3 inline-flex text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Open the quote tool →
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-16">
        <h2 className="font-display text-2xl font-bold text-ink-900">
          You might also like
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <BoardCard key={p.slug} product={p} />
          ))}
        </div>
      </Container>
    </>
  );
}
