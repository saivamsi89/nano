"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image with a premium "blur-up" reveal — starts soft + transparent and
 * sharpens in once loaded. A timeout fallback guarantees it never stays hidden
 * (e.g. cached images that miss onLoad).
 */
export function FadeImage({ className, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Image
      {...props}
      onLoad={() => setLoaded(true)}
      className={cn(
        "transition-[opacity,filter,transform] duration-[800ms] ease-out",
        loaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
        className
      )}
    />
  );
}
