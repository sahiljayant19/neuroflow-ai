"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Head of Product",
    company: "Veritas Labs",
    avatar: "SC",
    color: "from-cyan-600 to-blue-700",
    quote:
      "NeuroFlow changed how our team operates. Meeting summaries alone save us 4+ hours a week. The AI context is eerily accurate — it understands our product jargon without any training.",
    stars: 5,
    metric: "4h saved/week",
  },
  {
    name: "Marcus Webb",
    role: "Engineering Lead",
    company: "Orbital Systems",
    avatar: "MW",
    color: "from-violet-600 to-purple-700",
    quote:
      "We replaced three tools with NeuroFlow. The workflow automation is absurdly powerful for a product this polished. Our sprint cycles are 30% faster since adopting it.",
    stars: 5,
    metric: "30% faster sprints",
  },
  {
    name: "Priya Nair",
    role: "Founder & CEO",
    company: "Lumena AI",
    avatar: "PN",
    color: "from-emerald-600 to-cyan-700",
    quote:
      "As a solo founder, NeuroFlow is like having a chief of staff. It knows what matters, reminds me about what's slipping, and drafts things before I even ask. Genuinely unreal.",
    stars: 5,
    metric: "2x output solo",
  },
  {
    name: "Tom Bakker",
    role: "CTO",
    company: "Foundry Co.",
    avatar: "TB",
    color: "from-amber-600 to-orange-700",
    quote:
      "The search alone is worth the subscription. Semantic search across Slack, Notion, Jira, and email — finding anything takes seconds now. The team actually uses it daily.",
    stars: 5,
    metric: "100% daily retention",
  },
  {
    name: "Léa Dubois",
    role: "Design Director",
    company: "Mosaique Studio",
    avatar: "LD",
    color: "from-pink-600 to-rose-700",
    quote:
      "I was sceptical about 'another AI tool', but NeuroFlow's design is the first that doesn't feel like an afterthought. It's as beautiful as it is capable — rare combination.",
    stars: 5,
    metric: "NPS score: 94",
  },
  {
    name: "James Okafor",
    role: "VP Operations",
    company: "Apex Capital",
    avatar: "JO",
    color: "from-indigo-600 to-violet-700",
    quote:
      "Enterprise-grade security without the enterprise pain. SSO was up in 10 minutes, onboarding the team took an afternoon. ROI was visible by end of month one.",
    stars: 5,
    metric: "3-week payback",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 65%)",
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
            <Star className="w-3 h-3 fill-current" />
            Testimonials
          </span>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-white tracking-tight mb-4">
            Loved by teams who
            <br />
            <span className="text-gradient-warm">move fast.</span>
          </h2>
          <p className="font-body text-slate-400 text-lg max-w-lg mx-auto">
            Join 50,000+ teams who&apos;ve replaced the chaos with clarity.
          </p>
        </motion.div>

        {/* Stars banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="font-display font-700 text-white text-lg">4.9</span>
          <span className="font-body text-slate-500 text-sm">
            from 3,200+ reviews across G2, Capterra & ProductHunt
          </span>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="glass rounded-2xl border border-border p-6 flex flex-col gap-4 cursor-default transition-all duration-300 hover:border-border-bright hover:shadow-card-hover"
            >
              {/* Quote icon */}
              <Quote className="w-5 h-5 text-slate-700 shrink-0" />

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(t.stars)].map((_, si) => (
                  <Star
                    key={si}
                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-sm text-slate-300 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Metric pill */}
              <div className="inline-flex w-fit px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-cyan-400">{t.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shrink-0`}
                >
                  <span className="text-[11px] font-display font-700 text-white">
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-display font-600 text-sm text-white">
                    {t.name}
                  </p>
                  <p className="font-mono text-[10px] text-slate-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
