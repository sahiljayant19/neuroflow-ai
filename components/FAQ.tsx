"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    id: 1,
    question: "Do I need to migrate my existing data?",
    answer:
      "No migration needed. NeuroFlow integrates with all your existing tools via API — Slack, Gmail, Notion, Jira, Linear, Figma, and 190+ more. Your data stays where it is; we just make it smarter and more searchable. You can start using NeuroFlow immediately without any setup hassle.",
  },
  {
    id: 2,
    question: "How does the AI learn about my team?",
    answer:
      "NeuroFlow uses on-device learning and federated processing. We analyse your messages, documents, and workflows to understand your terminology, decision-making patterns, and priorities. All learning happens in your private workspace — your data never trains our public models. You can export or delete your AI context at any time.",
  },
  {
    id: 3,
    question: "Is my data secure and compliant?",
    answer:
      "Yes. NeuroFlow is SOC 2 Type II certified, GDPR compliant, and HIPAA eligible. We offer end-to-end encryption, role-based access control, audit logs, and IP whitelisting. Enterprise customers get dedicated infrastructure and the option to self-host. We never sell data to third parties or use it for model training without explicit consent.",
  },
  {
    id: 4,
    question: "Can I use NeuroFlow with my existing workflows?",
    answer:
      "Absolutely. NeuroFlow works with your workflow, not against it. Automations trigger from Slack commands, email, calendar events, or webhooks. The AI assistant lives in your inbox, Slack, or our web app — wherever you work. You can disable any feature or integration at any time.",
  },
  {
    id: 5,
    question: "What happens if I cancel?",
    answer:
      "If you cancel, you lose access to NeuroFlow features, but your data remains yours. You can export all your messages, documents, and workflow history in JSON or CSV format. We'll give you 30 days to export before we delete everything. No lock-in, no penalties.",
  },
  {
    id: 6,
    question: "Do you offer team or enterprise discounts?",
    answer:
      "Yes. Teams of 10+ get 15-20% off annual billing. Enterprise customers (50+ seats) get custom pricing, dedicated support, and SLA guarantees. Contact sales@neuroflow.ai for a quote. We also offer free trials for larger teams with custom feature sets.",
  },
];

interface AccordionItemProps {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onClick,
  index,
}: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="border-b border-border last:border-b-0"
    >
      <button
        onClick={onClick}
        className="w-full py-5 flex items-start gap-4 text-left transition-colors hover:text-white group"
      >
        <ChevronDown
          className={`w-5 h-5 text-cyan-500 shrink-0 mt-0.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-700 text-base text-white group-hover:text-cyan-400 transition-colors">
            {question}
          </h3>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden"
          >
            <p className="pl-9 pb-5 font-body text-slate-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(0);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-28 px-6">
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 30% 50%, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 inline-flex">
            <HelpCircle className="w-3 h-3" />
            FAQ
          </span>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-white tracking-tight mb-4">
            Questions?
            <br />
            <span className="text-gradient-cyan">We&apos;ve got answers.</span>
          </h2>
          <p className="font-body text-slate-400 text-lg">
            Everything you need to know about NeuroFlow, from security to
            integrations to pricing.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-2xl border border-border overflow-hidden"
        >
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onClick={() => toggleAccordion(faq.id)}
              index={i}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-slate-400 mb-4">
            Didn&apos;t find what you were looking for?
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-slate-300 font-body font-medium text-sm hover:bg-white/[0.07] hover:border-white/20 transition-all"
          >
            Contact our team
            <ChevronDown className="w-4 h-4 rotate-90" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
