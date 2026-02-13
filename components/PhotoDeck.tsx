"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

const pics = [
  "https://images.unsplash.com/photo-1770643770962-7937094987a9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1770885653473-ca48b4d69173?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1769867360185-0f91f999d571?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1770650777008-d4eab4103ff8?q=80&w=984&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function PhotoDeck() {
  const [active, setActive] = useState(0);

  const cards = useMemo(() => {
    return pics.map((src, i) => {
      const offset = i - active;
      const isActive = i === active;

      return {
        src,
        i,
        offset,
        isActive,
        z: 100 - Math.abs(offset),
        scale: isActive ? 1 : 0.92 - Math.min(Math.abs(offset) * 0.04, 0.12),
        rotate: isActive ? 0 : offset * 6,
        x: offset * 38,
        y: Math.abs(offset) * 10,
        opacity: Math.abs(offset) > 3 ? 0 : 1,
      };
    });
  }, [active]);

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative h-[340px] md:h-[420px]">
        {cards.map((c) => (
          <motion.button
            key={c.i}
            onClick={() => setActive(c.i)}
            className="absolute left-1/2 top-1/2 block h-[300px] w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl
                       ring-1 ring-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.55)] md:h-[380px] md:w-[300px]"
            style={{ zIndex: c.z, opacity: c.opacity }}
            animate={{ x: c.x, y: c.y, rotate: c.rotate, scale: c.scale }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="absolute inset-0 bg-white/5" />
            <Image
              src={c.src}
              alt={`photo ${c.i + 1}`}
              fill
              className="object-cover"
              priority={c.i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
            <div className="absolute bottom-3 left-3 rounded-xl bg-black/35 px-3 py-1 text-xs text-white/85 ring-1 ring-white/10">
              {c.i + 1} / {pics.length}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => setActive((a) => (a - 1 + pics.length) % pics.length)}
          className="rounded-xl bg-white/8 px-4 py-2 text-xs font-semibold ring-1 ring-white/15 hover:bg-white/10"
        >
          Prev
        </button>
        <button
          onClick={() => setActive((a) => (a + 1) % pics.length)}
          className="rounded-xl bg-white/12 px-4 py-2 text-xs font-semibold ring-1 ring-white/20 hover:bg-white/16"
        >
          Next
        </button>
      </div>
    </div>
  );
}
