"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Play, Sparkles, TrendingUp, Zap, Brain } from "lucide-react";

/* ─── Magnetic Button ─────────────────────────────── */
function MagneticButton({
  children,
  className,
  href = "#",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 28 });
  const sy = useSpring(y, { stiffness: 300, damping: 28 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ─── Floating Card ───────────────────────────────── */
function FloatingCard({
  title,
  sub,
  icon: Icon,
  accent,
  className,
  delay = 0,
}: {
  title: string;
  sub: string;
  icon: React.ElementType;
  accent: "cyan" | "violet" | "emerald";
  className?: string;
  delay?: number;
}) {
  const colors = {
    cyan: {
      ring: "shadow-glow-cyan border-cyan-500/20",
      icon: "bg-cyan-500/10 text-cyan-400",
      dot: "bg-cyan-400",
    },
    violet: {
      ring: "shadow-glow-violet border-violet-500/20",
      icon: "bg-violet-500/10 text-violet-400",
      dot: "bg-violet-400",
    },
    emerald: {
      ring: "border-emerald-500/20",
      icon: "bg-emerald-500/10 text-emerald-400",
      dot: "bg-emerald-400",
    },
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className={`glass rounded-2xl border px-4 py-3.5 ${colors.ring} w-[200px]`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-xl ${colors.icon}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
              <p className="text-[11px] font-mono text-slate-400 truncate">{sub}</p>
            </div>
            <p className="text-xs font-display font-600 text-white mt-0.5">{title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Animated Counter ─────────────────────────────── */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = target / 60;
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Word-by-word headline ─────────────────────────── */
const headline1 = "Your Workflow,";
const headline2 = "Amplified";

/* ─── Component ─────────────────────────────────────── */
export default function Hero() {
  const words1 = headline1.split(" ");

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 overflow-hidden">

      {/* Decorative orbs */}
      <div
        className="absolute top-[-15%] left-[30%] w-[700px] h-[700px] rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.11) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* Left: headline + CTA */}
          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <span className="section-label">
                <Sparkles className="w-3 h-3" />
                Introducing NeuroFlow 2.0
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-6">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-800 text-5xl md:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight"
                >
                  {words1.map((w, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.09, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block mr-4"
                    >
                      {w}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <div className="overflow-hidden mt-1">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-800 text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
                >
                  <span className="text-gradient-cyan">{headline2}</span>
                  <span className="text-white"> by AI.</span>
                </motion.div>
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="font-body text-base md:text-lg text-slate-400 leading-relaxed max-w-[480px] mb-10"
            >
              NeuroFlow is the AI‑native productivity platform that learns how your
              team works, automates the repetitive, and surfaces what matters most —
              so you can build what&apos;s next.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <MagneticButton
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-body font-semibold text-sm transition-all duration-300 hover:shadow-glow-cyan active:scale-95"
              >
                Start for Free
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border-border text-slate-200 font-body font-semibold text-sm transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                Watch Demo
              </MagneticButton>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap items-center gap-8"
            >
              {[
                { value: 50, suffix: "K+", label: "Teams" },
                { value: 10, suffix: "M+", label: "Tasks/day" },
                { value: 99, suffix: ".9%", label: "Uptime" },
                { value: 4.9, suffix: "★", label: "Rating" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-700 text-xl text-white">
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="font-mono text-[11px] text-slate-500 tracking-wider uppercase mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating UI cards */}
          <div className="relative hidden lg:flex items-center justify-center min-h-[520px]">

            {/* Central glow orb */}
            <div
              className="absolute inset-0 m-auto w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(139,92,246,0.06) 50%, transparent 75%)",
              }}
            />

            {/* Rotating ring */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-white/[0.04] animate-spin-slow pointer-events-none" />
            <div
              className="absolute w-[480px] h-[480px] rounded-full border border-white/[0.025] pointer-events-none animate-spin-slow"
              style={{ animationDirection: "reverse", animationDuration: "20s" }}
            />

            {/* Floating cards */}
            <FloatingCard
              title="Meeting Summary"
              sub="AI processed · just now"
              icon={Brain}
              accent="cyan"
              className="absolute top-[10%] right-[5%] animate-float"
              delay={0.8}
            />
            <FloatingCard
              title="3 Tasks Automated"
              sub="Workflow trigger · active"
              icon={Zap}
              accent="violet"
              className="absolute top-[38%] left-[2%] animate-float-2"
              delay={1}
            />
            <FloatingCard
              title="Revenue +24%"
              sub="Analytics · this week"
              icon={TrendingUp}
              accent="emerald"
              className="absolute bottom-[14%] right-[10%] animate-float-3"
              delay={1.2}
            />

            {/* Central preview card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[280px] glass rounded-3xl border border-border p-5 shadow-card"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white fill-white" />
                </div>
                <div>
                  <p className="font-display font-600 text-sm text-white">NeuroFlow AI</p>
                  <p className="font-mono text-[10px] text-cyan-400">● Active</p>
                </div>
              </div>

              {/* AI message */}
              <div className="bg-white/[0.04] rounded-xl px-3 py-2.5 mb-3">
                <p className="font-body text-xs text-slate-300 leading-relaxed">
                  Analyzed your last 30 days. Productivity up{" "}
                  <span className="text-cyan-400 font-semibold">+38%</span>. Found{" "}
                  <span className="text-violet-400 font-semibold">6 automation</span>{" "}
                  opportunities.
                </p>
              </div>

              {/* Mini bar chart */}
              <div className="flex items-end gap-1.5 h-12 mb-3">
                {[40, 65, 45, 80, 55, 90, 72].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.2 + i * 0.08, duration: 0.5, ease: "backOut" }}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background:
                        i === 5
                          ? "linear-gradient(to top, #06b6d4, #8b5cf6)"
                          : "rgba(255,255,255,0.1)",
                      transformOrigin: "bottom",
                    }}
                  />
                ))}
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {["Automate", "Analyze", "Ship"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full glass border-border text-[10px] font-mono text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Premium Interactive Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        onClick={() => {
          const nextSec = document.querySelector("section:nth-of-type(2)");
          if (nextSec) {
            nextSec.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 cursor-pointer pointer-events-auto group z-20"
      >
        {/* Sleek Mouse Wheel Icon */}
        <div className="w-[20px] h-[32px] rounded-full border border-slate-700/60 group-hover:border-cyan-500/50 flex justify-center p-1.5 relative overflow-hidden backdrop-blur-xs transition-colors duration-300">
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [1, 0.2, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-2 rounded-full bg-gradient-to-b from-cyan-400 to-violet-400 shadow-glow-sm-cyan"
          />
        </div>

        {/* Spaced Monospace Explore Text */}
        <span className="font-mono text-[9px] tracking-[0.28em] text-slate-500 group-hover:text-cyan-400 transition-colors duration-300 uppercase flex items-center gap-1.5 pl-[0.28em]">
          Explore Platform
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[10px]"
          >
            ↓
          </motion.span>
        </span>
      </motion.div>

    </section>
  );
}
