"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, Send, Sparkles, Zap, ShieldAlert, BadgeDollarSign } from "lucide-react";

interface Message {
  text: string;
  isUser: boolean;
}

export default function AIOracle() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Greetings! I am the NeuroFlow Core. I can automate your interface and showcase the platform in real-time. Try one of my directives below:",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Handle core actions
  const triggerDirective = (actionName: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: actionName, isUser: true }]);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);

      if (actionName.includes("Automation")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Initiating live workflow automation trigger! Routing viewport to Dashboard command center... ⚡",
            isUser: false,
          },
        ]);
        // Scroll to Dashboard
        const sec = document.getElementById("dashboard");
        sec?.scrollIntoView({ behavior: "smooth" });

        // Dispatch trigger to Dashboard
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("neuroflow-trigger-dashboard", {
              detail: { prompt: "Automate reminders" },
            })
          );
        }, 800);
      } else if (actionName.includes("Pricing")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Locking in our maximum value Professional Plan deal! Routing to Pricing grid... 💰",
            isUser: false,
          },
        ]);
        // Scroll to Pricing
        const sec = document.getElementById("pricing");
        sec?.scrollIntoView({ behavior: "smooth" });

        // Dispatch trigger to Pricing
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("neuroflow-trigger-pricing"));
        }, 800);
      } else if (actionName.includes("Speed")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Simulating blazingly fast high-frequency analytics routing! Scrolling to Feature Bento Grid... 🌪️",
            isUser: false,
          },
        ]);
        // Scroll to Features
        const sec = document.getElementById("features");
        sec?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Default text chatbot response
        let botReply =
          "Directives active! NeuroFlow is fully optimized. Feel free to preview the Live Automation, Blazing Speed, or Pricing deals.";
        const normalized = actionName.toLowerCase();

        if (normalized.includes("hello") || normalized.includes("hi")) {
          botReply = "Hello there! I am the NeuroFlow Core. How can I assist you with the workflow today? 😊";
        } else if (normalized.includes("install") || normalized.includes("run")) {
          botReply = "You can run NeuroFlow locally using 'npm run dev'. Standard systems compile on port 3000! 🚀";
        } else if (normalized.includes("who built") || normalized.includes("creator")) {
          botReply = "I was forged by the Advanced Agentic Coding pair-programming crew to showcase premium AI-driven visual engineering.";
        }

        setMessages((prev) => [...prev, { text: botReply, isUser: false }]);
      }
    }, 1100);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userPrompt = inputValue;
    setInputValue("");
    triggerDirective(userPrompt);
  };

  return (
    <>
      {/* Pulse Orb Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-glow-cyan border border-white/10 group cursor-pointer"
        >
          {/* Rotating gradient dashed ring */}
          <div className="absolute inset-[-4px] rounded-full border border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: "12s" }} />
          
          {/* Inner breathing aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="brain"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Brain className="w-6 h-6 text-white fill-white/10 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-cyan-500 rounded-full animate-ping" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Assistant Console Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            className="fixed bottom-24 right-6 w-[360px] h-[520px] max-w-[calc(100vw-32px)] z-50 glass rounded-3xl border border-cyan-500/20 overflow-hidden shadow-glow-violet flex flex-col"
            style={{
              background: "rgba(4,4,12,0.92)",
            }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white fill-white/10" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold tracking-widest text-white uppercase flex items-center gap-1.5">
                    NeuroFlow Core
                    <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
                  </h4>
                  <p className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    System Sync: Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <ChatBubble key={i} text={msg.text} isUser={msg.isUser} />
              ))}

              {/* Thinking Bubble */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-2"
                >
                  <div className="bg-white/[0.04] px-3.5 py-2.5 rounded-xl rounded-bl-sm border border-white/[0.05] flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions Panel */}
            <div className="px-4 py-2 bg-white/[0.01] border-t border-white/[0.05] flex flex-wrap gap-1.5">
              <button
                disabled={isThinking}
                onClick={() => triggerDirective("📊 Preview Live Automation")}
                className="text-[9px] font-mono font-semibold px-2.5 py-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Zap className="w-2.5 h-2.5" />
                Preview Automation
              </button>
              <button
                disabled={isThinking}
                onClick={() => triggerDirective("⚡ Simulate Speed Load")}
                className="text-[9px] font-mono font-semibold px-2.5 py-1.5 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/40 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-2.5 h-2.5" />
                Simulate Speed
              </button>
              <button
                disabled={isThinking}
                onClick={() => triggerDirective("💎 Show Best Pricing Deal")}
                className="text-[9px] font-mono font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center gap-1 cursor-pointer"
              >
                <BadgeDollarSign className="w-2.5 h-2.5" />
                Best Deal
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/[0.05] flex items-center gap-2 bg-white/[0.02]">
              <input
                type="text"
                disabled={isThinking}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Core AI..."
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-body text-white placeholder-slate-600 outline-none focus:border-cyan-500/40 transition-all disabled:opacity-50"
              />
              <button
                disabled={isThinking}
                onClick={handleSend}
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Chat Bubble Helper ───────────────────────────── */
function ChatBubble({ text, isUser }: { text: string; isUser: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-1`}
    >
      <div
        className={`max-w-[85%] px-3 py-2 rounded-xl text-[11px] font-body leading-relaxed border transition-all ${
          isUser
            ? "bg-cyan-500/20 border-cyan-500/25 text-cyan-100 rounded-br-xs"
            : "bg-white/[0.03] border-white/[0.05] text-slate-300 rounded-bl-xs"
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}
