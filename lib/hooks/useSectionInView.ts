"use client";
import { RefObject, useEffect, useState } from "react";

export function useSectionInView<T extends Element>(
  ref: RefObject<T>,
  options: IntersectionObserverInit = { threshold: 0.2 },
  once = true,
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [ref, options, once]);

  return inView;
}
