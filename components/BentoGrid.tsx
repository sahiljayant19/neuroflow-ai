"use client";

import { motion } from "framer-motion";
import { Zap, Globe, ShieldCheck, Gauge, Layers, ArrowRight, Cpu } from "lucide-react";

/* ─── Mini typing animation ──────────────────────── */
function TypingText({ lines }: { lines: string[] }) {
  return (
    <div className="font-mono text-[11px] text-slate-400 space-y-1.5">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.18 + 0.3 }}
          className={i === lines.length - 1 ? "text-cyan-400" : ""}
        >
          <span className="text-slate-600">{`>`} </span>
          {line}
          {i === lines.length - 1 && (
            <span className="animate-typing-cursor">|</span>
          )}
        </motion.p>
      ))}
    </div>
  );
}

/* ─── Integration logos grid ─────────────────────── */
function IntegrationGrid() {
  const tools = [
    { name: "Slack", bg: "from-purple-600 to-purple-800", symbol: "S" },
    { name: "GitHub", bg: "from-slate-700 to-slate-900", symbol: "GH" },
    { name: "Notion", bg: "from-slate-800 to-slate-600", symbol: "N" },
    { name: "Figma", bg: "from-pink-600 to-orange-500", symbol: "F" },
    { name: "Jira", bg: "from-blue-600 to-blue-800", symbol: "J" },
    { name: "Linear", bg: "from-violet-600 to-indigo-700", symbol: "L" },
    { name: "Gmail", bg: "from-red-500 to-orange-600", symbol: "G" },
    { name: "Zoom", bg: "from-blue-500 to-cyan-600", symbol: "Z" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {tools.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 + 0.2, duration: 0.4 }}
          whileHover={{ scale: 1.1, y: -2 }}
          className={`aspect-square rounded-xl bg-gradient-to-br ${t.bg} flex items-center justify-center text-white font-display font-700 text-xs shadow-sm cursor-default`}
          title={t.name}
        >
          {t.symbol}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Speed meter ─────────────────────────────────── */
function SpeedMeter() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-10 overflow-hidden">
        {/* Arc track */}
        <svg viewBox="0 0 80 40" className="absolute inset-0">
          <path
            d="M 5,40 A 35,35 0 0,1 75,40"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <motion.path
            d="M 5,40 A 35,35 0 0,1 75,40"
            fill="none"
            stroke="url(#speedGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
          <defs>
            <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="font-display font-800 text-2xl text-white mt-1">
        12ms
      </p>
      <p className="font-mono text-[10px] text-slate-500">avg. response</p>
    </div>
  );
}

/* ─── Bento cards data ───────────────────────────── */
const BENTO = [
  {
    id: "integrations",
    span: "col-span-2",
    title: "200+ Integrations",
    sub: "Connect every tool your team loves in minutes.",
    icon: Globe,
    accent: "violet",
    content: <IntegrationGrid />,
  },
  {
    id: "ai-commands",
    span: "col-span-1",
    title: "AI Commands",
    sub: "Natural language, instant action.",
    icon: Cpu,
    accent: "cyan",
    content: (
      <TypingText
        lines={[
          "Summarize standup",
          "Assign to @priya",
          "Schedule follow-up",
          "Done. Workflow activated ✓",
        ]}
      />
    ),
  },
  {
    id: "speed",
    span: "col-span-1",
    title: "Blazing Fast",
    sub: "Edge-deployed. Sub-20ms globally.",
    icon: Gauge,
    accent: "emerald",
    content: <SpeedMeter />,
  },
  {
    id: "security",
    span: "col-span-1",
    title: "Enterprise Security",
    sub: "SOC 2 Type II · GDPR · End-to-end encrypted.",
    icon: ShieldCheck,
    accent: "violet",
    content: (
      <div className="flex flex-col gap-2">
        {["SOC 2 Type II", "GDPR Compliant", "E2E Encrypted", "SSO / SAML"].map(
          (item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-400">{item}</span>
            </motion.div>
          )
        )}
      </div>
    ),
  },
  {
    id: "layers",
    span: "col-span-2",
    title: "Works Everywhere",
    sub: "Web, desktop, mobile, API. One platform, every surface.",
    icon: Layers,
    accent: "cyan",
    content: (
      <div className="flex items-end gap-3 mt-1">
        {[
          { label: "Web", h: 90, color: "from-cyan-500 to-cyan-700" },
          { label: "macOS", h: 75, color: "from-violet-500 to-violet-700" },
          { label: "iOS", h: 85, color: "from-cyan-600 to-violet-600" },
          { label: "API", h: 70, color: "from-emerald-500 to-cyan-500" },
          { label: "CLI", h: 60, color: "from-violet-600 to-pink-600" },
        ].map((d, i) => (
          <div key={d.label} className="flex flex-col items-center gap-1.5 flex-1">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: "backOut" }}
              className={`w-full rounded-t-md bg-gradient-to-t ${d.color}`}
              style={{ height: `${d.h * 0.5}px`, transformOrigin: "bottom" }}
            />
            <span className="text-[10px] font-mono text-slate-500">{d.label}</span>
          </div>
        ))}
      </div>
    ),
  },
];

const accentBorder: Record<string, string> = {
  cyan: "hover:border-cyan-500/30 hover:shadow-glow-cyan",
  violet: "hover:border-violet-500/30 hover:shadow-glow-violet",
  emerald: "hover:border-emerald-500/25",
};

const iconColors: Record<string, string> = {
  cyan: "bg-cyan-500/10 text-cyan-400",
  violet: "bg-violet-500/10 text-violet-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
};

export default function BentoGrid() {
  return (
    <section className="relative py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 inline-flex">
            <Zap className="w-3 h-3" />
            The Platform
          </span>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-white tracking-tight mb-4">
            Built for the way{" "}
            <span className="text-gradient-emerald">modern teams work.</span>
          </h2>
          <p className="font-body text-slate-400 text-lg max-w-lg mx-auto">
            Every capability engineered to be invisible when you don&apos;t need it,
            and indispensable when you do.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4 auto-rows-[200px]">
          {BENTO.map((card, i) => {
            const CardIcon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`glass rounded-2xl border border-border p-5 flex flex-col transition-all duration-300 cursor-default overflow-hidden relative ${card.span} ${accentBorder[card.accent]}`}
              >
                {/* Subtle gradient accent in corner */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-20"
                  style={{
                    background:
                      card.accent === "cyan"
                        ? "radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)"
                        : card.accent === "violet"
                        ? "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)",
                    transform: "translate(30%, -30%)",
                  }}
                />

                {/* Title */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className={`p-1.5 rounded-lg ${iconColors[card.accent]}`}>
                    <CardIcon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-display font-700 text-sm text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="font-body text-[12px] text-slate-500 mb-3 leading-relaxed">
                  {card.sub}
                </p>

                {/* Dynamic content */}
                <div className="flex-1 flex items-end">{card.content}</div>

                {/* Arrow on hover */}
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute bottom-4 right-4"
                >
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
