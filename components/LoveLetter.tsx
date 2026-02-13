"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";

export default function LoveLetter({
  onNext,
  accepted,
}: {
  onNext: () => void;
  accepted: boolean;
}) {
  const [opened, setOpened] = useState(false);

  const lines = useMemo(
    () => [
      "Dear Sanjana,",
      "Happy Valentine's Day, my genius.",
      "You didn't just raise the bar this year — you built a whole website and hosted it live. Who does that? ",
      "Apparently, the girl I'm in love with.",
      "Since the day we met, life has honestly been such an amazing journey. We’ve had our ups and downs, our chaos, our moments — but f it, what's the point of life if it's just a straight line? The turns, the growth, the figuring-it-out together — that's what's made this real. Loving you has never felt forced or complicated. It's felt natural. Steady. Like no matter what direction life takes, I know I want you walking it with me.",
      "You said “go nuts”?",
      "Okay, full disclosure — I did take help to create this… because I’m not as cool as you. But you genuinely inspire me to be better every single day. In work, in life, in love. If you're out here coding adventures, the least I can do is try to keep up.",
      "I may not code like you, but I promise I'll always build a life with you — intentionally, patiently, and with way too much love.",
      "Yours (and only yours),",
      "Yash ❤️"
    ],
    []
  );

  return (
    <div className="glass rounded-3xl p-4 sm:p-6 md:p-8">
      <div className="mb-3 flex items-center justify-center gap-2 text-white/90">
        <Heart className="h-5 w-5 text-pink-300" />
        <span className="text-sm font-semibold">A Letter</span>
      </div>

      <h2 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
        Your <span className="grad-text">valentine reply</span> 💌
      </h2>

      <p className="mt-2 text-center text-sm text-white/75">
        Tap the envelope. (Also: {accepted ? "YES received ✅" : "waiting for your YES 👀"})
      </p>

      <div className="mt-6 flex justify-center">
        <motion.button
          onClick={() => setOpened((s) => !s)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/15"
        >
          <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_30%_20%,rgba(255,79,216,0.30),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(124,77,255,0.25),transparent_60%)]" />
          <div className="relative p-4 sm:p-5 md:p-6">
            <div className="flex items-center justify-between text-sm text-white/85">
              <span>Tap to {opened ? "close" : "open"}</span>
              <span className="text-white/60">💗</span>
            </div>

            <AnimatePresence mode="wait">
              {!opened ? (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 grid place-items-center py-8 sm:py-10"
                >
                  <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 sm:h-24 sm:w-24">
                    <span className="text-2xl sm:text-3xl">✉️</span>
                  </div>
                  <div className="mt-3 text-white/75">Open me</div>
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 max-h-[52vh] rounded-2xl bg-black/20 p-3 text-left ring-1 ring-white/10 overflow-y-auto sm:max-h-[420px] sm:p-4"
                >
                  {lines.map((t, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.35 }}
                      className="mb-2 text-sm leading-relaxed text-white/85 md:text-base"
                    >
                      {t}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onNext}
          className="button-shine w-full rounded-2xl bg-white/12 px-6 py-3 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/16 sm:w-auto"
        >
          Show photos <ArrowRight className="ml-2 inline h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
