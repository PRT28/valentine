"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type H = { left: string; delay: number; dur: number; size: number; blur: number; opacity: number };

function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function FloatingHearts() {
  const hearts = useMemo<H[]>(() => {
    const arr: H[] = [];
    for (let i = 0; i < 14; i++) {
      const base = i + 1;
      arr.push({
        left: `${Math.round(seeded(base * 11) * 100)}%`,
        delay: seeded(base * 13) * 4,
        dur: 10 + seeded(base * 17) * 8,
        size: 10 + seeded(base * 19) * 26,
        blur: seeded(base * 23) * 1.5,
        opacity: 0.10 + seeded(base * 29) * 0.22,
      });
    }
    return arr;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          initial={{ y: "110%", x: 0, rotate: -10, opacity: 0 }}
          animate={{ y: "-20%", x: [0, -12, 12, -8, 8, 0], rotate: [0, 6, -6, 4, -4, 0], opacity: h.opacity }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: h.left, filter: `blur(${h.blur}px)` }}
          className="absolute"
          aria-hidden
        >
          <div
            style={{ width: h.size, height: h.size }}
            className="relative rotate-45 bg-pink-400/60"
          >
            <div className="absolute -left-1/2 top-0 h-full w-full rounded-full bg-pink-400/60" />
            <div className="absolute left-0 -top-1/2 h-full w-full rounded-full bg-pink-400/60" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
