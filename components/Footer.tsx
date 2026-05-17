"use client";

import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
  Zap,
  Globe,
} from "lucide-react";
import { useState } from "react";

const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#" },
      { label: "Roadmap", href: "#" },
      { label: "API Docs", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Community", href: "#" },
      { label: "Status", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Compliance", href: "#" },
      { label: "DPA", href: "#" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative border-t border-border pt-20 pb-12 px-6 overflow-hidden">
      {/* BG gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 glass rounded-3xl border border-border p-8 md:p-12 bg-gradient-to-r from-cyan-500/8 to-violet-500/8"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-display font-800 text-3xl text-white mb-2">
                  Stay updated.
                </h3>
                <p className="font-body text-slate-400">
                  Get the latest on NeuroFlow features, AI breakthroughs, and
                  productivity tips — straight to your inbox. No spam.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass border border-border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  disabled={!email}
                  className={`px-6 py-3 rounded-xl font-body font-semibold text-sm flex items-center gap-2 transition-all ${
                    subscribed
                      ? "bg-emerald-500 text-white"
                      : "bg-cyan-500 hover:bg-cyan-400 text-white hover:shadow-glow-cyan"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {subscribed ? (
                    <>
                      <span>✓</span> Subscribed
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Main footer grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Logo column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-2 md:col-span-1"
            >
              <a href="#" className="flex items-center gap-2.5 group mb-6">
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-glow-cyan">
                  <Zap className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="font-display font-700 text-lg text-white tracking-tight">
                  Neuro<span className="text-gradient-cyan">Flow</span>
                </span>
              </a>
              <p className="font-body text-sm text-slate-500 mb-6 max-w-xs">
                The AI-native productivity platform for teams that move fast.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Mail, href: "#" },
                ].map(({ icon: Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                    whileHover={{ scale: 1.15, y: -2 }}
                    className="p-2.5 rounded-lg glass border border-border text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link columns */}
            {FOOTER_SECTIONS.map((section, si) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (si + 1) * 0.05 }}
              >
                <h4 className="font-display font-700 text-white text-sm mb-4 tracking-tight">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-body text-sm text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8 origin-left"
          />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-body text-sm text-slate-600 text-center md:text-left"
            >
              © 2024 NeuroFlow AI, Inc. All rights reserved. Built with{" "}
              <span className="text-cyan-400">love</span> & AI.
            </motion.p>

            {/* Right side badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 flex-wrap justify-center md:justify-end"
            >
              {[
                { label: "SOC 2 Type II", icon: "🔒" },
                { label: "GDPR Compliant", icon: "✓" },
                { label: "Made in 2024", icon: "⚡" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-border text-[11px] font-mono text-slate-500"
                >
                  <span>{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating orbs (subtle) */}
      <div
        className="absolute bottom-0 right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
      />
    </footer>
  );
}
