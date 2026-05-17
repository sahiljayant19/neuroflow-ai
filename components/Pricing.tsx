"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap } from "lucide-react";

const PRICING = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for solopreneurs and small teams",
    monthlyPrice: 29,
    annualPrice: 290,
    features: [
      "Up to 5 team members",
      "AI summarization (50/month)",
      "Basic automation flows",
      "Search across 10 apps",
      "7-day message history",
      "Email support",
      "Public API access",
    ],
    cta: "Start Free",
    highlight: false,
    accent: "cyan",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing teams who need power & scale",
    monthlyPrice: 99,
    annualPrice: 990,
    features: [
      "Unlimited team members",
      "Unlimited AI summarization",
      "Advanced automation",
      "Search across all tools",
      "90-day message history",
      "Priority support",
      "Custom integrations",
      "Advanced analytics",
      "Team templates",
      "AI fine-tuning",
    ],
    cta: "Get Started",
    highlight: true,
    accent: "violet",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations with advanced needs",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom SLA & uptime guarantee",
      "Advanced security & compliance",
      "Self-hosted option",
      "Unlimited custom models",
      "Bulk API quotas",
      "Priority feature requests",
      "Training & onboarding",
    ],
    cta: "Contact Sales",
    highlight: false,
    accent: "emerald",
  },
];

const accentConfig: Record<string, { border: string; glow: string; button: string; bg: string }> = {
  cyan: {
    border: "border-cyan-500/20 hover:border-cyan-500/50",
    glow: "hover:shadow-glow-cyan",
    button: "bg-cyan-500 hover:bg-cyan-400 text-white hover:shadow-glow-cyan",
    bg: "from-cyan-500/8 to-transparent",
  },
  violet: {
    border: "border-violet-500/25 hover:border-violet-500/60",
    glow: "hover:shadow-glow-violet",
    button: "bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 text-white hover:shadow-glow-violet",
    bg: "from-violet-500/10 to-transparent",
  },
  emerald: {
    border: "border-emerald-500/20 hover:border-emerald-500/50",
    glow: "hover:shadow-glow-sm-cyan",
    button: "bg-emerald-500 hover:bg-emerald-400 text-white",
    bg: "from-emerald-500/8 to-transparent",
  },
};

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "annual"
  );
  const professionalMonthly = PRICING[1].monthlyPrice ?? 99;
  const professionalAnnual = PRICING[1].annualPrice ?? 990;
  const savings = Math.round((professionalMonthly * 12 - professionalAnnual) / professionalMonthly);

  useEffect(() => {
    const handleTrigger = () => {
      setBillingPeriod("annual");
    };
    window.addEventListener("neuroflow-trigger-pricing", handleTrigger);
    return () => window.removeEventListener("neuroflow-trigger-pricing", handleTrigger);
  }, []);

  return (
    <section id="pricing" className="relative py-28 px-6">
      {/* BG gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(6,182,212,0.05) 0%, transparent 65%)",
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
            Transparent Pricing
          </span>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-white tracking-tight mb-4">
            Plans for every stage
            <br />
            <span className="text-gradient-cyan">of your journey.</span>
          </h2>
          <p className="font-body text-slate-400 text-lg max-w-lg mx-auto">
            No hidden fees. No surprise charges. Upgrade, downgrade, or cancel
            anytime.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 rounded-lg font-body font-medium text-sm transition-all ${
              billingPeriod === "monthly"
                ? "text-white"
                : "text-slate-500 hover:text-slate-400"
            }`}
          >
            Monthly
          </button>

          <div className="relative glass rounded-lg p-0.5 border border-border">
            <motion.div
              layoutId="billingToggle"
              className="absolute inset-0 bg-white/[0.06] rounded-md"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                left: billingPeriod === "monthly" ? "4px" : "50%",
                width: "calc(50% - 4px)",
              }}
            />
            <div className="relative flex">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className="px-4 py-1.5 text-sm font-body font-medium text-slate-400 relative z-10"
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className="px-4 py-1.5 text-sm font-body font-medium text-slate-400 relative z-10"
              >
                Annual
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-body font-medium transition-colors ${
                billingPeriod === "annual"
                  ? "text-emerald-400"
                  : "text-slate-500"
              }`}
            >
              Save {savings}%
            </span>
            {billingPeriod === "annual" && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                className="inline-flex px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25"
              >
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                  BEST VALUE
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PRICING.map((plan, i) => {
            const config = accentConfig[plan.accent];
            const price =
              billingPeriod === "monthly"
                ? plan.monthlyPrice
                : plan.annualPrice;

            return (
              <motion.div
                key={plan.id}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={
                  !plan.highlight
                    ? { y: -6, transition: { duration: 0.25 } }
                    : undefined
                }
                className="relative"
              >
                {/* Highlight border */}
                {plan.highlight && (
                  <div className="absolute -inset-0.5 bg-gradient-to-b from-violet-500 to-transparent rounded-3xl opacity-50 blur-lg" />
                )}

                <div
                  className={`relative glass rounded-3xl border p-8 transition-all duration-300 flex flex-col h-full ${config.border} ${config.glow}`}
                  style={{
                    background: plan.highlight
                      ? `linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 100%)`
                      : `rgba(255,255,255,0.028)`,
                  }}
                >
                  {/* Popular badge */}
                  {plan.highlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + i * 0.1,
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        className="inline-flex px-3 py-1 rounded-full glass border border-violet-500/30 bg-violet-500/10"
                      >
                        <span className="text-[10px] font-mono text-violet-300 font-semibold tracking-widest uppercase">
                          Most Popular
                        </span>
                      </motion.div>
                    </div>
                  )}

                  {/* Title */}
                  <div className={plan.highlight ? "mt-4" : ""}>
                    <h3 className="font-display font-800 text-2xl text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="font-body text-sm text-slate-400 mb-6">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {price ? (
                      <motion.div
                        key={`${billingPeriod}-${plan.id}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span className="font-display font-800 text-4xl text-white">
                          ${price}
                        </span>
                        <span className="font-body text-slate-500 text-sm ml-2">
                          /{billingPeriod === "monthly" ? "month" : "year"}
                        </span>
                      </motion.div>
                    ) : (
                      <p className="font-display font-700 text-white text-lg">
                        Custom pricing
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3 rounded-xl font-body font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 mb-8 ${config.button}`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  {/* Features */}
                  <div className="space-y-3 flex-1 border-t border-border pt-6">
                    {plan.features.map((feature, fi) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.4 + i * 0.1 + fi * 0.03,
                          duration: 0.5,
                        }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-slate-400">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="font-mono text-[10px] text-slate-600">
                      All plans include 14-day free trial. No card required.
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* FAQ footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="font-body text-slate-500 text-sm">
            Questions about plans?{" "}
            <a href="#faq" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              See FAQ
            </a>{" "}
            or{" "}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              talk to sales
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
