"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseGlow() {
  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);

  const x = useSpring(rawX, { stiffness: 80, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 80, damping: 22, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX - 250);
      rawY.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  return (
    <>
      {/* Primary glow — cyan */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          x,
          y,
          background:
            "radial-gradient(circle, rgba(6,182,212,0.07) 0%, rgba(6,182,212,0.03) 40%, transparent 70%)",
        }}
      />
      {/* Secondary glow — violet, slightly offset */}
      <motion.div
        className="fixed top-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none z-0"
        style={{
          x: useSpring(rawX, { stiffness: 50, damping: 20, mass: 1 }),
          y: useSpring(rawY, { stiffness: 50, damping: 20, mass: 1 }),
          translateX: 60,
          translateY: 60,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%)",
        }}
      />
    </>
  );
}
