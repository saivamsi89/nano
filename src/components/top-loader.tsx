"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Premium top progress bar shown during in-app navigation.
 * Starts on an internal link click (or back/forward) and completes once the
 * route changes. Brand-green gradient with a soft glow. No dependencies.
 */
export function TopLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const active = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    if (active.current) return;
    active.current = true;
    setVisible(true);
    setProgress(8);
    const trickle = () => {
      setProgress((p) => {
        if (p >= 90) return p;
        const inc = p < 45 ? 9 : p < 70 ? 4 : 1.5;
        return Math.min(90, p + Math.random() * inc);
      });
      timer.current = setTimeout(trickle, 240);
    };
    timer.current = setTimeout(trickle, 240);
  };

  const done = () => {
    if (!active.current) return;
    active.current = false;
    if (timer.current) clearTimeout(timer.current);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 320);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      const target = a.getAttribute("target");
      if (!href || (target && target !== "_self") || a.hasAttribute("download"))
        return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // ignore same-page (hash only) navigations
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      )
        return;
      start();
    };

    const onPop = () => start();
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  // complete when the route actually changes
  useEffect(() => {
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      <div
        className="h-full rounded-r-full"
        style={{
          width: `${progress}%`,
          transition: "width 0.2s ease",
          background: "linear-gradient(90deg, #16a34a, #22c55e, #4ade80)",
          boxShadow: "0 0 10px rgba(34,197,94,0.8), 0 0 4px rgba(34,197,94,0.9)",
        }}
      />
    </div>
  );
}
