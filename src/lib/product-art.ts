/**
 * Clean, consistent product illustrations for the catalog — flat-with-depth
 * PCB renders on a near-white surface (the "parts store" aesthetic).
 * Deterministic per `uid`; swap for real studio photos later if desired.
 */
export type ArtKind = "dev" | "module" | "sensor" | "kit";

const defs = (id: string) => `
<defs>
  <linearGradient id="${id}-mask" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#23ad53"/><stop offset="1" stop-color="#0f7d39"/>
  </linearGradient>
  <linearGradient id="${id}-gold" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f6da86"/><stop offset="1" stop-color="#d3a02c"/>
  </linearGradient>
  <linearGradient id="${id}-ic" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#34373f"/><stop offset="0.5" stop-color="#1c1e25"/><stop offset="1" stop-color="#0c0d12"/>
  </linearGradient>
  <linearGradient id="${id}-silver" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#eef1f5"/><stop offset="1" stop-color="#aab2bf"/>
  </linearGradient>
  <linearGradient id="${id}-gloss" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/><stop offset="0.4" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
  <filter id="${id}-ds" x="-30%" y="-30%" width="160%" height="170%">
    <feDropShadow dx="0" dy="6" stdDeviation="9" flood-color="#0b1f12" flood-opacity="0.20"/>
  </filter>
  <filter id="${id}-blur"><feGaussianBlur stdDeviation="7"/></filter>
</defs>`;

const ic = (id: string, x: number, y: number, s = 64) => `
<g filter="url(#${id}-ds)">
  ${Array.from({ length: Math.floor(s / 9) })
    .map((_, i) => {
      const p = 8 + i * 9;
      return `<rect x="${x + p}" y="${y - 5}" width="4" height="6" rx="1" fill="url(#${id}-gold)"/>
      <rect x="${x + p}" y="${y + s - 1}" width="4" height="6" rx="1" fill="url(#${id}-gold)"/>
      <rect x="${x - 5}" y="${y + p}" width="6" height="4" rx="1" fill="url(#${id}-gold)"/>
      <rect x="${x + s - 1}" y="${y + p}" width="6" height="4" rx="1" fill="url(#${id}-gold)"/>`;
    })
    .join("")}
  <rect x="${x}" y="${y}" width="${s}" height="${s}" rx="7" fill="url(#${id}-ic)"/>
  <rect x="${x + 6}" y="${y + 6}" width="${s * 0.5}" height="${s * 0.32}" rx="4" fill="#ffffff" opacity="0.05"/>
  <circle cx="${x + 12}" cy="${y + 12}" r="3" fill="#aeb6c2" opacity="0.7"/>
</g>`;

const passive = (id: string, x: number, y: number, w = 15, h = 8, c = "#15151d") => `
<g filter="url(#${id}-ds)">
  <rect x="${x - 2}" y="${y}" width="3" height="${h}" rx="1" fill="url(#${id}-gold)"/>
  <rect x="${x + w - 1}" y="${y}" width="3" height="${h}" rx="1" fill="url(#${id}-gold)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${c}"/>
</g>`;

const cap = (id: string, cx: number, cy: number, r = 13) => `
<g filter="url(#${id}-ds)">
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#16171d"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3a3d47" stroke-width="2"/>
  <path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="#5a5e6b" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 0.34}" fill="#0a0a0e"/>
</g>`;

function board(id: string, x: number, y: number, w: number, h: number) {
  return `
  <ellipse cx="${x + w / 2}" cy="${y + h + 14}" rx="${w * 0.46}" ry="14" fill="#0b3a1c" opacity="0.14" filter="url(#${id}-blur)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="url(#${id}-mask)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="none" stroke="#0a5e2b" stroke-width="1.5"/>
  <rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="9" fill="none" stroke="#ffffff" stroke-opacity="0.16"/>
  ${[[x + 16, y + 16], [x + w - 16, y + 16], [x + 16, y + h - 16], [x + w - 16, y + h - 16]]
    .map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="6" fill="url(#${id}-gold)"/><circle cx="${cx}" cy="${cy}" r="3" fill="#f8faf9"/>`)
    .join("")}
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="url(#${id}-gloss)"/>`;
}

function dev(id: string) {
  const x = 95, y = 95, w = 290, h = 180;
  let s = board(id, x, y, w, h);
  s += `<g filter="url(#${id}-ds)"><rect x="${x + w / 2 - 30}" y="${y - 14}" width="60" height="26" rx="9" fill="url(#${id}-silver)"/><rect x="${x + w / 2 - 20}" y="${y - 7}" width="40" height="12" rx="6" fill="#3a3f48"/></g>`;
  s += ic(id, x + w / 2 - 32, y + h / 2 - 32, 64);
  s += Array.from({ length: 14 }).map((_, i) => `<rect x="${x + 22 + i * 18}" y="${y + h - 12}" width="11" height="14" rx="2" fill="url(#${id}-gold)"/>`).join("");
  s += passive(id, x + 30, y + 34) + passive(id, x + 52, y + 34) + passive(id, x + w - 60, y + 40) + passive(id, x + w - 44, y + 60, 8, 8, "#1d1f27");
  s += `<rect x="${x + 34}" y="${y + h - 60}" width="14" height="10" rx="2" fill="#e23b3b" filter="url(#${id}-ds)"/>`;
  s += `<rect x="${x + w - 58}" y="${y + h - 64}" width="26" height="26" rx="4" fill="url(#${id}-silver)" filter="url(#${id}-ds)"/>`;
  return s;
}

function moduleB(id: string, accent: string) {
  const x = 120, y = 100, w = 240, h = 170;
  let s = board(id, x, y, w, h);
  s += ic(id, x + w / 2 - 30, y + h / 2 - 22, 56);
  s += cap(id, x + 44, y + 44) + cap(id, x + 72, y + 44);
  s += `<g filter="url(#${id}-ds)"><rect x="${x + w - 72}" y="${y + 34}" width="40" height="40" rx="8" fill="#2a2118"/><circle cx="${x + w - 52}" cy="${y + 54}" r="13" fill="none" stroke="#b9863c" stroke-width="5"/></g>`;
  s += `<g filter="url(#${id}-ds)"><rect x="${x + w / 2 - 26}" y="${y + h - 40}" width="52" height="30" rx="5" fill="${accent}"/><circle cx="${x + w / 2 - 12}" cy="${y + h - 25}" r="6" fill="#cfd6e0"/><circle cx="${x + w / 2 + 12}" cy="${y + h - 25}" r="6" fill="#cfd6e0"/></g>`;
  s += passive(id, x + 34, y + h - 58) + passive(id, x + 56, y + h - 58);
  return s;
}

function sensor(id: string) {
  const x = 165, y = 100, w = 150, h = 150;
  let s = board(id, x, y, w, h);
  s += ic(id, x + w / 2 - 26, y + h / 2 - 30, 52);
  s += Array.from({ length: 7 }).map((_, i) => `<rect x="${x + 20 + i * 16}" y="${y + h - 12}" width="9" height="14" rx="2" fill="url(#${id}-gold)"/>`).join("");
  s += passive(id, x + 24, y + 24, 10, 7) + passive(id, x + w - 40, y + 28, 10, 7);
  return s;
}

function kit(id: string) {
  let s = "";
  const ox = 120, oy = 92;
  for (let i = 2; i >= 0; i--) {
    const x = ox + i * 16, y = oy + i * 14, w = 230, h = 170;
    s += `<ellipse cx="${x + w / 2}" cy="${y + h + 10}" rx="${w * 0.45}" ry="12" fill="#0b3a1c" opacity="0.10" filter="url(#${id}-blur)"/>`;
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="url(#${id}-mask)" stroke="#0a5e2b" stroke-width="1.5"/>`;
    s += `<rect x="${x + 7}" y="${y + 7}" width="${w - 14}" height="${h - 14}" rx="8" fill="none" stroke="#ffffff" stroke-opacity="0.14"/>`;
    s += Array.from({ length: 18 }).map((_, j) => `<circle cx="${x + 24 + (j % 6) * 36}" cy="${y + 30 + Math.floor(j / 6) * 44}" r="2.2" fill="#0a5e2b"/>`).join("");
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="url(#${id}-gloss)"/>`;
  }
  return s;
}

const accents: Record<string, string> = {
  a: "#2f6df0",
  b: "#16a34a",
  c: "#e2683b",
  d: "#7c3aed",
};

export function productSvg(kind: ArtKind, uid: string) {
  const id = uid.replace(/[^a-zA-Z0-9_-]/g, "");
  let inner = "";
  if (kind === "dev") inner = dev(id);
  else if (kind === "sensor") inner = sensor(id);
  else if (kind === "kit") inner = kit(id);
  else inner = moduleB(id, accents[id.charCodeAt(0) % 4 === 0 ? "a" : id.length % 2 ? "b" : "c"] ?? "#2f6df0");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
  ${defs(id)}
  <rect width="480" height="360" fill="#f7faf9"/>
  ${inner}
</svg>`;
}
