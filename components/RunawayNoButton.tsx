"use client";

import { motion } from "framer-motion";
import { RefObject, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function RunawayNoButton({
  label,
  containerRef,
  onAttempt,
}: {
  label: string;
  containerRef: RefObject<HTMLDivElement | null>;
  onAttempt: () => void;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const jump = () => {
    onAttempt();

    const el = containerRef.current;
    const r = el?.getBoundingClientRect();

    // keep it in the center-ish area on mobile, more free on larger screens
    const padding = 22;
    const w = r?.width ?? 360;
    const h = r?.height ?? 640;

    const x = (Math.random() * (w - 2 * padding)) + padding - w / 2;
    const y = (Math.random() * (h - 2 * padding)) + padding - h / 2;

    setPos({
      x: clamp(x, -w / 2 + 30, w / 2 - 30),
      y: clamp(y, -h / 2 + 120, h / 2 - 120),
    });
  };

  return (
    <motion.button
      type="button"
      onMouseEnter={jump}
      onPointerDown={jump}
      onFocus={jump}
      animate={{
        x: pos?.x ?? 0,
        y: pos?.y ?? 0,
        rotate: pos ? [0, 2, -2, 0] : 0,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="w-full rounded-2xl bg-white/8 px-6 py-3 text-sm font-semibold text-white/90 ring-1 ring-white/15 hover:bg-white/10 md:w-auto"
      style={{ position: "relative" }}
    >
      {label}
    </motion.button>
  );
}
