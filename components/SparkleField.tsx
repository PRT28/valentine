"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; r: number; a: number; s: number };

export default function SparkleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    if (sparksRef.current.length === 0) {
      const arr: Spark[] = [];
      for (let i = 0; i < 90; i++) {
        arr.push({
          x: Math.random(),
          y: Math.random(),
          r: 0.6 + Math.random() * 1.6,
          a: 0.15 + Math.random() * 0.55,
          s: 0.15 + Math.random() * 0.55,
        });
      }
      sparksRef.current = arr;
    }

    const sparks = sparksRef.current;
    let raf = 0;
    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of sparks) {
        const px = p.x * window.innerWidth;
        const py = p.y * window.innerHeight;
        const tw = (Math.sin(t * 2 + p.x * 10) + 1) / 2; // 0..1
        const alpha = p.a * (0.35 + 0.65 * tw);

        ctx.beginPath();
        ctx.arc(px, py, p.r * (0.8 + tw), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();

        // slow drift
        p.y += 0.00025 * p.s;
        if (p.y > 1.02) p.y = -0.02;
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      aria-hidden
    />
  );
}
