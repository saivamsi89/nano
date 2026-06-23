/**
 * Mock PCB fabrication pricing engine.
 * Deterministic, believable numbers for the demo. Replace the
 * coefficients (or swap for a server endpoint) when real pricing lands.
 */

export type QuoteConfig = {
  layers: number;
  quantity: number;
  width: number; // mm
  height: number; // mm
  thickness: number; // mm
  finish: "HASL" | "ENIG" | "OSP";
  copper: 1 | 2; // oz
  color: "green" | "blue" | "red" | "black" | "white";
  turn: "standard" | "quick";
};

export const defaultConfig: QuoteConfig = {
  layers: 2,
  quantity: 10,
  width: 100,
  height: 100,
  thickness: 1.6,
  finish: "HASL",
  copper: 1,
  color: "green",
  turn: "standard",
};

export const layerOptions = [1, 2, 4, 6, 8];
export const thicknessOptions = [0.8, 1.0, 1.6, 2.0];
export const finishOptions: QuoteConfig["finish"][] = ["HASL", "ENIG", "OSP"];
export const colorOptions: QuoteConfig["color"][] = [
  "green",
  "blue",
  "red",
  "black",
  "white",
];

const layerFactor: Record<number, number> = { 1: 1, 2: 1.4, 4: 2.6, 6: 4.1, 8: 6.0 };
const finishFactor: Record<QuoteConfig["finish"], number> = {
  HASL: 1,
  ENIG: 1.35,
  OSP: 1.08,
};

export type QuoteResult = {
  unitPrice: number;
  subtotal: number;
  setup: number;
  setupWaived: boolean;
  shipping: number;
  gst: number;
  total: number;
  leadDays: number;
  pricePerCm2: number;
  areaCm2: number;
};

export function computeQuote(c: QuoteConfig): QuoteResult {
  const areaCm2 = Math.max(4, (c.width * c.height) / 100);

  // base rupees per cm² for a 2-layer board, scaled by options
  const base = 1.9;
  const lf = layerFactor[c.layers] ?? 1.4;
  const ff = finishFactor[c.finish];
  const cf = c.copper === 2 ? 1.18 : 1;
  const tf = c.thickness >= 2 ? 1.12 : c.thickness <= 0.8 ? 1.06 : 1;
  const colorf = c.color === "green" ? 1 : 1.05;

  const pricePerCm2 = base * lf * ff * cf * tf * colorf;
  let unitPrice = areaCm2 * pricePerCm2;

  // quantity scaling — economies of scale
  const q = Math.max(1, Math.floor(c.quantity));
  const qtyDiscount =
    q >= 1000 ? 0.45 : q >= 500 ? 0.55 : q >= 100 ? 0.68 : q >= 50 ? 0.8 : q >= 10 ? 0.9 : 1;
  unitPrice = unitPrice * qtyDiscount;

  // quick-turn premium
  const turnMult = c.turn === "quick" ? 1.4 : 1;
  unitPrice = Math.max(12, unitPrice * turnMult);

  const subtotal = unitPrice * q;

  // one-time setup, waived for the standard "Make in India" prototype window
  const setup = 800 + (c.layers > 2 ? 600 : 0);
  const setupWaived = q <= 25 && c.layers <= 4 && c.turn === "standard";

  const shipping = subtotal >= 2000 ? 0 : 120;
  const preTax = subtotal + (setupWaived ? 0 : setup) + shipping;
  const gst = preTax * 0.18;
  const total = preTax + gst;

  // lead time
  let leadDays = 5 + Math.ceil(c.layers / 2);
  if (q >= 100) leadDays += 3;
  if (q >= 500) leadDays += 4;
  if (c.finish === "ENIG") leadDays += 1;
  if (c.turn === "quick") leadDays = Math.max(2, Math.round(leadDays * 0.45));

  return {
    unitPrice: round(unitPrice),
    subtotal: round(subtotal),
    setup,
    setupWaived,
    shipping,
    gst: round(gst),
    total: round(total),
    leadDays,
    pricePerCm2: round(pricePerCm2),
    areaCm2: round(areaCm2),
  };
}

function round(n: number) {
  return Math.round(n);
}
