"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Zap,
  Search,
  Users,
  BarChart3,
  Cpu,
} from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI Summarization",
    description:
      "Transform hour-long meetings into crisp, actionable summaries. NeuroFlow extracts decisions, action items, and key insights automatically.",
    accent: "cyan",
    tags: ["GPT-4o", "Transcription", "NLP"],
    preview: (
      <div className="mt-4 bg-white/[0.03] rounded-xl p-3 border border-white/[0.05]">
        <div className="flex items-start gap-2">
          <div className="w-1 h-full min-h-[40px] rounded-full bg-gradient-to-b from-cyan-500 to-transparent" />
          <div>
            <p className="text-[10px] font-mono text-cyan-400 mb-1">Summary generated</p>
            <p className="text-[11px] font-body text-slate-400 leading-relaxed">
              3 decisions · 7 action items · 14 min condensed to 45s
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    title: "Smart Automation",
    description:
      "Build intelligent workflows that adapt in real time. Trigger automations from Slack, email, or calendar events — no code required.",
    accent: "violet",
    tags: ["No-code", "Triggers", "Zapier-like"],
    preview: (
      <div className="mt-4 flex items-center gap-2">
        {["Slack msg", "→", "AI classify", "→", "Assign task"].map((s, i) => (
          <span
            key={i}
            className={`text-[10px] font-mono px-2 py-1 rounded-lg ${
              s === "→"
                ? "text-slate-600 px-0"
                : "bg-white/[0.04] text-slate-400 border border-white/[0.05]"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Search,
    title: "AI Search Assistant",
    description:
      "Find anything across all your tools instantly. NeuroFlow understands context, not just keywords — results are ranked by relevance to your current work.",
    accent: "blue",
    tags: ["Semantic", "Cross-app", "Instant"],
    preview: (
      <div className="mt-4 bg-white/[0.03] rounded-xl p-3 border border-white/[0.05] flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span className="text-[11px] font-mono text-slate-500">Q3 marketing strategy...</span>
        <span className="ml-auto text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
          42 results
        </span>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Co-create in real time with AI as your silent co-author. Shared workspaces, live cursors, and version history keep everyone in sync.",
    accent: "emerald",
    tags: ["Real-time", "Cursors", "Versions"],
    preview: (
      <div className="mt-4 flex gap-2">
        {["Ana", "Ben", "Priya", "+4"].map((name, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-display font-600 text-white"
            style={{
              background: `hsl(${i * 60 + 160}, 70%, 40%)`,
              marginLeft: i > 0 ? "-6px" : 0,
            }}
          >
            {name}
          </div>
        ))}
        <span className="text-[11px] font-mono text-slate-500 ml-2 self-center">
          editing now
        </span>
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Understand team productivity patterns with AI-powered dashboards. Get proactive alerts when metrics drift from targets.",
    accent: "amber",
    tags: ["Live data", "Alerts", "Reports"],
    preview: (
      <div className="mt-4 flex items-end gap-1 h-10">
        {[30, 55, 42, 70, 48, 85, 62, 90, 75].map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            viewport={{ once: true }}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background:
                i === 7
                  ? "linear-gradient(to top, #22d3ee, #8b5cf6)"
                  : "rgba(255,255,255,0.08)",
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
    ),
  },
  {
    icon: Cpu,
    title: "Context Intelligence",
    description:
      "NeuroFlow learns your work style, terminology, and priorities. The longer you use it, the smarter — and more personal — it becomes.",
    accent: "pink",
    tags: ["Memory", "Personal", "Adaptive"],
    preview: (
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "82%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
          />
        </div>
        <span className="text-[10px] font-mono text-slate-500">82% personalised</span>
      </div>
    ),
  },
];

const accentMap: Record<string, string> = {
  cyan: "border-cyan-500/15 hover:border-cyan-500/30 hover:shadow-glow-cyan",
  violet: "border-violet-500/15 hover:border-violet-500/30 hover:shadow-glow-violet",
  blue: "border-blue-500/15 hover:border-blue-500/30",
  emerald: "border-emerald-500/15 hover:border-emerald-500/30",
  amber: "border-amber-500/15 hover:border-amber-500/30",
  pink: "border-pink-500/15 hover:border-pink-500/30",
};

const iconAccentMap: Record<string, string> = {
  cyan: "bg-cyan-500/10 text-cyan-400",
  violet: "bg-violet-500/10 text-violet-400",
  blue: "bg-blue-500/10 text-blue-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  amber: "bg-amber-500/10 text-amber-400",
  pink: "bg-pink-500/10 text-pink-400",
};

const tagAccentMap: Record<string, string> = {
  cyan: "text-cyan-500",
  violet: "text-violet-400",
  blue: "text-blue-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  pink: "text-pink-400",
};

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="features" className="relative py-28 px-6 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex">
            <Cpu className="w-3 h-3" />
            Core Features
          </span>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-white tracking-tight mb-4">
            Everything your team needs
            <br />
            <span className="text-gradient-cyan">to flow, not fight.</span>
          </h2>
          <p className="font-body text-slate-400 text-lg max-w-xl mx-auto">
            Six powerful capabilities unified in one platform — designed to remove friction
            and amplify your team&apos;s natural rhythm.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`glass rounded-2xl border p-6 cursor-default transition-all duration-300 ${accentMap[feat.accent]}`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex p-2.5 rounded-xl mb-4 ${iconAccentMap[feat.accent]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title + description */}
                <h3 className="font-display font-700 text-white text-lg mb-2">
                  {feat.title}
                </h3>
                <p className="font-body text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>

                {/* Preview */}
                {feat.preview}

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {feat.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] ${tagAccentMap[feat.accent]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
