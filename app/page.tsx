"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, ArrowRight, Image as ImageIcon, Mail } from "lucide-react";

import FloatingHearts from "@/components/FloatingHeart";
import SparkleField from "@/components/SparkleField";
import RunawayNoButton from "@/components/RunawayNoButton";
import PhotoDeck from "@/components/PhotoDeck";
import LoveLetter from "@/components/LoveLetter";

type Step = "intro" | "question" | "letter" | "photos" | "final";

const pageFade = {
  initial: { opacity: 0, y: 14, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(8px)" },
};

export default function HomePage() {
  const [step, setStep] = useState<Step>("intro");
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const noText = useMemo(() => {
    const options = [
      "No 😤",
      "No (are you sure?)",
      "Nope 🙃",
      "Still no",
      "Okay… no",
      "NO (why??)",
      "I’m trying to click no!",
    ];
    return options[Math.min(noCount, options.length - 1)];
  }, [noCount]);

  const yesScale = useMemo(() => {
    // Yes button gets slightly larger as "No" attempts increase
    return 1 + Math.min(noCount * 0.08, 0.45);
  }, [noCount]);

  function blastConfetti() {
    const defaults = { origin: { y: 0.75 } };
    confetti({ ...defaults, particleCount: 90, spread: 75, startVelocity: 35 });
    confetti({ ...defaults, particleCount: 70, spread: 120, startVelocity: 25 });
  }

  const onYes = () => {
    setAccepted(true);
    localStorage.setItem("valentine_accepted", "1");
    blastConfetti();
    setStep("letter");
  };

  const onNoAttempt = () => {
    setNoCount((c) => c + 1);
  };

  return (
    <div ref={containerRef} className="overflow-hidden relative min-h-dvh">
      {/* ambient animated background */}
      <SparkleField />
      <FloatingHearts />
      <div className="pointer-events-none absolute inset-0 opacity-40 blur-3xl">
        <div className="absolute -top-24 left-[-8rem] h-72 w-72 rounded-full bg-pink-500/30" />
        <div className="absolute top-24 right-[-8rem] h-72 w-72 rounded-full bg-violet-500/30" />
        <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-amber-400/20" />
      </div>

      <main className="relative mx-auto flex min-h-dvh max-w-[920px] flex-col items-center justify-start px-4 py-6 md:justify-center md:py-10">
        <div className="w-full">
          <div className="mx-auto mb-4 flex max-w-xl items-center justify-center gap-2 text-white/80">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs tracking-widest uppercase">A tiny response, with big feelings</span>
          </div>

          <AnimatePresence mode="wait">
            {step === "intro" && (
              <motion.section
                key="intro"
                variants={pageFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="glass mx-auto max-w-xl rounded-3xl p-6 md:p-8"
              >
                <div className="mb-5 flex items-center justify-center">
                  <div className="animate-floaty rounded-full bg-white/10 p-4">
                    <Heart className="h-7 w-7 text-pink-300" />
                  </div>
                </div>

                <h1 className="text-center text-3xl font-semibold md:text-4xl">
                  Hey <span className="grad-text">you</span> 💖
                </h1>
                <p className="mt-3 text-center text-sm leading-relaxed text-white/80 md:text-base">
                  I saw your valentine proposal… and I couldn’t resist making a little reply.
                  <br />
                  Tap next — it gets cuter.
                </p>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setStep("question")}
                    className="button-shine rounded-2xl bg-white/12 px-6 py-3 text-sm font-semibold text-white
                               ring-1 ring-white/20 transition hover:bg-white/16 active:scale-[0.98]"
                  >
                    Continue <ArrowRight className="ml-2 inline h-4 w-4" />
                  </button>
                </div>
              </motion.section>
            )}

            {step === "question" && (
              <motion.section
                key="question"
                variants={pageFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="glass mx-auto max-w-xl rounded-3xl p-6 md:p-8"
              >
                <div className="mb-4 flex items-center justify-center gap-2 text-white/90">
                  <Heart className="h-5 w-5 text-pink-300" />
                  <span className="text-sm font-semibold">Important Question</span>
                </div>

                <h2 className="text-center text-2xl font-semibold md:text-3xl">
                  So… will you be my <span className="grad-text">Valentine</span>?
                </h2>

                <p className="mt-3 text-center text-sm text-white/75">
                  (P.S. “No” is… a little shy today.)
                </p>

                <div className="relative mt-8 flex flex-col items-center justify-center gap-3 md:flex-row">
                  <motion.button
                    onClick={onYes}
                    style={{ transformOrigin: "center" }}
                    animate={{ scale: yesScale }}
                    whileHover={{ scale: yesScale + 0.06 }}
                    whileTap={{ scale: yesScale - 0.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="button-shine w-full rounded-2xl bg-gradient-to-r from-pink-500/80 via-fuchsia-500/70 to-violet-500/70
                               px-6 py-3 text-sm font-bold text-white shadow-[0_16px_50px_rgba(255,70,180,0.35)]
                               ring-1 ring-white/25 md:w-auto"
                  >
                    YES 💘
                  </motion.button>

                  <RunawayNoButton
                    label={noText}
                    containerRef={containerRef}
                    onAttempt={onNoAttempt}
                  />
                </div>

                <div className="mt-6 text-center text-xs text-white/55">
                  No attempts: <span className="text-white/80">{noCount}</span>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setStep("intro")}
                    className="rounded-xl px-4 py-2 text-xs text-white/70 ring-1 ring-white/15 hover:bg-white/5"
                  >
                    Go back
                  </button>
                </div>
              </motion.section>
            )}

            {step === "letter" && (
              <motion.section
                key="letter"
                variants={pageFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mx-auto w-full max-w-2xl"
              >
                <LoveLetter
                  onNext={() => setStep("photos")}
                  accepted={accepted}
                />
              </motion.section>
            )}

            {step === "photos" && (
              <motion.section
                key="photos"
                variants={pageFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mx-auto w-full max-w-2xl"
              >
                <div className="glass rounded-3xl p-5 md:p-7">
                  <div className="mb-3 flex items-center justify-center gap-2 text-white/90">
                    <ImageIcon className="h-5 w-5 text-pink-200" />
                    <span className="text-sm font-semibold">Little memories</span>
                  </div>

                  <h3 className="text-center text-2xl font-semibold md:text-3xl">
                    Us, in <span className="grad-text">tiny frames</span> ✨
                  </h3>

                  <p className="mt-2 text-center text-sm text-white/75">
                    Us after a long long time.
                  </p>

                  <div className="mt-6">
                    <PhotoDeck />
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={() => setStep("letter")}
                      className="rounded-2xl bg-white/8 px-5 py-2.5 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/12"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        confetti({ particleCount: 120, spread: 120, startVelocity: 30, origin: { y: 0.7 } });
                        setStep("final");
                      }}
                      className="button-shine rounded-2xl bg-white/12 px-5 py-2.5 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/16"
                    >
                      One last thing <ArrowRight className="ml-2 inline h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.section>
            )}

            {step === "final" && (
              <motion.section
                key="final"
                variants={pageFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="glass mx-auto max-w-xl rounded-3xl p-6 md:p-8"
              >
                <div className="mb-5 flex items-center justify-center">
                  <div className="animate-floaty rounded-full bg-white/10 p-4">
                    <Mail className="h-7 w-7 text-amber-200" />
                  </div>
                </div>

                <h2 className="text-center text-3xl font-semibold md:text-4xl">
                  Okay… <span className="grad-text">it’s a date</span>? 💗
                </h2>
                <p className="mt-3 text-center text-sm leading-relaxed text-white/80 md:text-base">
                  Text me your “yes” with a heart emoji,
                  <br />
                  and I’ll plan something adorable.
                </p>

                <div className="mt-6 flex flex-col items-center justify-center gap-3">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      confetti({ particleCount: 150, spread: 140, startVelocity: 34, origin: { y: 0.75 } });
                    }}
                    className="button-shine w-full rounded-2xl bg-gradient-to-r from-amber-400/40 via-pink-500/40 to-violet-500/40
                               px-6 py-3 text-center text-sm font-bold text-white ring-1 ring-white/25 md:w-auto"
                  >
                    Yayyyy 💞
                  </a>

                  <button
                    onClick={() => {
                      localStorage.removeItem("valentine_accepted");
                      setAccepted(false);
                      setNoCount(0);
                      setStep("intro");
                    }}
                    className="rounded-xl px-4 py-2 text-xs text-white/70 ring-1 ring-white/15 hover:bg-white/5"
                  >
                    Replay
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
