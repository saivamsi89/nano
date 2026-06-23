import { productSvg, type ArtKind } from "@/lib/product-art";
import { cn } from "@/lib/utils";

const categoryToKind: Record<string, ArtKind> = {
  "Dev Board": "dev",
  Module: "module",
  Sensor: "sensor",
  "PCB Kit": "kit",
};

/**
 * Clean catalog product illustration. `id` must be unique per instance on the
 * page (SVG gradient ids are document-global), so pass the product slug.
 */
export function ProductRender({
  category,
  id,
  className,
}: {
  category: string;
  id: string;
  className?: string;
}) {
  const kind = categoryToKind[category] ?? "module";
  const svg = productSvg(kind, id);
  return (
    <div
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={`${category} illustration`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
