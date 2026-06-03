"use client";

import { useEffect } from "react";

/**
 * Watches every [data-reveal] element and adds `.is-revealed` when it
 * crosses the viewport. CSS handles the rest — items hide themselves
 * by default and the class flip transitions them to visible.
 *
 * One-shot: each element is unobserved after firing. If IntersectionObserver
 * isn't supported, every target is revealed immediately so the page is
 * never left blank.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not(.is-revealed)",
    );
    if (targets.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
