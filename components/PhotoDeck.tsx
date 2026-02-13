"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

type Slide =
  | { kind: "text"; text: string }
  | { kind: "image"; src: string };

const slides: Slide[] = [
  { kind: "text", text: "Where it started" },
  { kind: "image", src: "/young1.jpeg" },
  { kind: "image", src: "/old1.jpeg" },
  { kind: "image", src: "/young2.jpeg" },
  { kind: "image", src: "/old2.jpeg" },
  { kind: "text", text: "Wrinkles, White Hair, Same us.\nGrow old with me?" },
];

export default function PhotoDeck() {
  const [active, setActive] = useState(0);

  const cards = useMemo(() => {
    return slides.map((slide, i) => {
      const offset = i - active;
      const isActive = i === active;

      return {
        slide,
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
            {c.slide.kind === "image" ? (
              <>
                <Image
                  src={c.slide.src}
                  alt={`photo ${c.i + 1}`}
                  fill
                  className="object-cover"
                  priority={c.i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-white/8 to-white/6 backdrop-blur-md" />
            )}
            {c.slide.kind === "text" && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <p className="whitespace-pre-line text-lg font-semibold leading-relaxed text-white/95 md:text-2xl">
                  {c.slide.text}
                </p>
              </div>
            )}
            <div className="absolute bottom-3 left-3 rounded-xl bg-black/35 px-3 py-1 text-xs text-white/85 ring-1 ring-white/10">
              {c.i + 1} / {slides.length}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => setActive((a) => (a - 1 + slides.length) % slides.length)}
          className="rounded-xl bg-white/8 px-4 py-2 text-xs font-semibold ring-1 ring-white/15 hover:bg-white/10"
        >
          Prev
        </button>
        <button
          onClick={() => setActive((a) => (a + 1) % slides.length)}
          className="rounded-xl bg-white/12 px-4 py-2 text-xs font-semibold ring-1 ring-white/20 hover:bg-white/16"
        >
          Next
        </button>
      </div>
    </div>
  );
}
