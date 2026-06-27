import { FadeImage } from "@/components/ui/fade-image";
import { cn } from "@/lib/utils";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Real product photograph from /public/products/<slug>.png, shown contained on
 * a clean white surface (catalog style). Parent must be `relative` + sized.
 */
export function ProductImage({
  slug,
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw",
  className,
  priority,
}: {
  slug: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <FadeImage
      src={`${BASE}/products/${slug}.webp`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}
