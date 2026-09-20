"use client";
import { useEffect, useRef } from "react";

// Coalesce every scroll listener into a single RAF-throttled tick.
// Fixes performance-debt #7 (avoid 4 separate handlers competing).
export function useCoalescedScroll(callback: () => void): void {
  const ticking = useRef(false);
  const cb = useRef(callback);

  useEffect(() => {
    cb.current = callback;
  }, [callback]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        cb.current();
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
