"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR =
  ".section, .product-block, .product-cta, .about-block, .product-card, .contact-quick__item, .product-feature-card";

/** Activa revelado al entrar en viewport en las páginas públicas. */
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
    if (reduced) {
      nodes.forEach((node) => node.classList.add("is-revealed"));
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
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (inView) {
        node.classList.add("is-revealed");
        return;
      }
      node.classList.add("will-reveal");
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
