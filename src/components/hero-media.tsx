"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Hero background media. Renders the AURORA photo by default (instant LCP) and
 * upgrades to a looping circuit-board video on larger screens — skipped on
 * mobile and Save-Data connections to avoid the heavy download.
 */
export function HeroMedia() {
  const [video, setVideo] = useState(false);

  useEffect(() => {
    const big = window.matchMedia("(min-width: 768px)").matches;
    const conn = (navigator as { connection?: { saveData?: boolean } }).connection;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (big && !conn?.saveData && !reduce) setVideo(true);
  }, []);

  if (video) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={`${BASE}/hero/aurora-hero.jpg`}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      >
        <source src={`${BASE}/hero/hero.mp4`} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={`${BASE}/hero/aurora-hero.jpg`}
      alt="NanoFab AURORA advanced processor board in the lab"
      fill
      priority
      sizes="100vw"
      className="-z-10 object-cover object-center motion-safe:animate-ken-burns"
    />
  );
}
