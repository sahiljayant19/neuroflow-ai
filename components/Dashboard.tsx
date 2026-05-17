"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  LayoutDashboard,
  Zap,
  Brain,
  Search,
  BarChart3,
  Settings,
  Bell,
  ChevronUp,
  TrendingUp,
  Users,
  CheckSquare,
  Send,
} from "lucide-react";

/* ─── SVG Line Chart ─────────────────────────────── */
function LineChart({ points }: { points: { x: number; y: number }[] }) {
  const path = points
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
    .join(" ");

  const area = path + ` L${points[points.length - 1].x},100 L0,100 Z`;

  return (
    <div className="w-full">
      <svg viewBox="0 0 480 100" className="w-full h-28" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <motion.path
          d={area}
          fill="url(#areaGrad)"
          animate={{ d: area }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Line */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ d: path }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Dots */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill="#06b6d4"
            animate={{ cx: p.x, cy: p.y }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── Metric Card ────────────────────────────────── */
function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  positive = true,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-xl p-3.5 border border-border overflow-hidden relative group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-1.5 rounded-lg ${color} transition-all duration-300 group-hover:scale-110`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span
          className={`text-[10px] font-mono flex items-center gap-0.5 font-semibold ${
            positive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          <ChevronUp
            className={`w-2.5 h-2.5 transition-transform duration-300 ${!positive ? "rotate-180" : ""}`}
          />
          {change}
        </span>
      </div>
      <p className="font-display font-700 text-base text-white tracking-tight">{value}</p>
      <p className="font-mono text-[10px] text-slate-500 mt-0.5">{label}</p>
    </motion.div>
  );
}

/* ─── AI Chat Message ────────────────────────────── */
function ChatBubble({
  text,
  isUser,
}: {
  text: string;
  isUser: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`max-w-[90%] px-3.5 py-2.5 rounded-xl text-[11px] font-body leading-relaxed transition-all shadow-sm ${
          isUser
            ? "bg-cyan-500/20 text-cyan-100 rounded-br-sm border border-cyan-500/20"
            : "bg-white/[0.05] text-slate-300 rounded-bl-sm border border-white/[0.05]"
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ───────────────────────────────── */
export default function Dashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeNav, setActiveNav] = useState("dashboard");

  // Chat message feed state
  const [messages, setMessages] = useState([
    { text: "Analysed your week. Productivity is up 38% 🚀", isUser: false },
    { text: "What were the bottlenecks?", isUser: true },
    { text: "Mainly review cycles — averaging 2.4 days. I can automate reminders.", isUser: false }
  ]);

  // Metric cards state
  const [metrics, setMetrics] = useState({
    revenue: { value: "$84.2K", change: "+18%", positive: true },
    users: { value: "12,847", change: "+6%", positive: true },
    tasks: { value: "3,291", change: "+24%", positive: true }
  });

  // Productivity Line Chart points state
  const [chartPoints, setChartPoints] = useState([
    { x: 0, y: 80 },
    { x: 60, y: 55 },
    { x: 120, y: 68 },
    { x: 180, y: 32 },
    { x: 240, y: 48 },
    { x: 300, y: 20 },
    { x: 360, y: 34 },
    { x: 420, y: 12 },
    { x: 480, y: 28 },
  ]);

  // Feed logs state
  const [activityFeed, setActivityFeed] = useState([
    { action: "Meeting summarized", time: "2m ago", color: "text-cyan-400" },
    { action: "Workflow triggered: Onboarding", time: "14m ago", color: "text-violet-400" },
    { action: "Report auto-generated", time: "1h ago", color: "text-emerald-400" },
  ]);

  // Chat input UI states
  const [chatInput, setChatInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isTypingAnimation, setIsTypingAnimation] = useState(false);

  // Suggestions panel
  const suggestions = ["Automate reminders", "Generate report", "Find blockers"];

  // Chat scroll anchor
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Submit action triggers state changes
  const handleBotResponse = (query: string) => {
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);

      if (query === "Automate reminders") {
        setMessages(prev => [
          ...prev,
          { text: "Reminders active! 3 developer cycles automated. Bottlenecks reduced by 1.8 days. Average tasks completed metrics spiked! ⚡", isUser: false }
        ]);
        setMetrics(prev => ({
          ...prev,
          tasks: { value: "3,485", change: "+31%", positive: true }
        }));
        setChartPoints([
          { x: 0, y: 80 },
          { x: 60, y: 55 },
          { x: 120, y: 68 },
          { x: 180, y: 32 },
          { x: 240, y: 48 },
          { x: 300, y: 15 },
          { x: 360, y: 10 },
          { x: 420, y: 4 },
          { x: 480, y: 2 },
        ]);
        setActivityFeed(prev => [
          { action: "Reminder cycle: marketing PR", time: "Just now", color: "text-cyan-400" },
          ...prev
        ]);
      } else if (query === "Generate report") {
        setMessages(prev => [
          ...prev,
          { text: "Weekly report compiled! Synthesized 14 team feeds. Summary: Development velocity is up +12% this week. Productivity peaked! 📊", isUser: false }
        ]);
        setMetrics(prev => ({
          ...prev,
          revenue: { value: "$89.6K", change: "+22%", positive: true }
        }));
        setChartPoints([
          { x: 0, y: 70 },
          { x: 60, y: 62 },
          { x: 120, y: 55 },
          { x: 180, y: 42 },
          { x: 240, y: 35 },
          { x: 300, y: 24 },
          { x: 360, y: 18 },
          { x: 420, y: 10 },
          { x: 480, y: 5 },
        ]);
        setActivityFeed(prev => [
          { action: "Weekly report PDF compiled", time: "Just now", color: "text-emerald-400" },
          ...prev
        ]);
      } else if (query === "Find blockers") {
        setMessages(prev => [
          ...prev,
          { text: "PR bottleneck detected in marketing-site repo. 3 drafts waiting for @sara. Notified via automated Slack trigger! 🚨", isUser: false }
        ]);
        setMetrics(prev => ({
          ...prev,
          users: { value: "13,104", change: "+9%", positive: true }
        }));
        setChartPoints([
          { x: 0, y: 80 },
          { x: 60, y: 70 },
          { x: 120, y: 68 },
          { x: 180, y: 50 },
          { x: 240, y: 55 },
          { x: 300, y: 40 },
          { x: 360, y: 45 },
          { x: 420, y: 20 },
          { x: 480, y: 12 },
        ]);
        setActivityFeed(prev => [
          { action: "@sara notified of reviewer blocker", time: "Just now", color: "text-violet-400" },
          ...prev
        ]);
      }
    }, 1400);
  };

  // Simulate premium typewriter text input
  const triggerTypewriter = (text: string) => {
    if (isThinking || isTypingAnimation) return;

    setIsTypingAnimation(true);
    setChatInput("");

    let currentString = "";
    let i = 0;

    const interval = setInterval(() => {
      currentString += text[i];
      setChatInput(currentString);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setMessages(prev => [...prev, { text, isUser: true }]);
          setChatInput("");
          setIsTypingAnimation(false);
          handleBotResponse(text);
        }, 300);
      }
    }, 40);
  };

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail && customEv.detail.prompt) {
        triggerTypewriter(customEv.detail.prompt);
      }
    };
    window.addEventListener("neuroflow-trigger-dashboard", handleTrigger);
    return () => window.removeEventListener("neuroflow-trigger-dashboard", handleTrigger);
  }, [isThinking, isTypingAnimation]);

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "flows", icon: Zap, label: "Flows" },
    { id: "ai", icon: Brain, label: "AI Studio" },
    { id: "search", icon: Search, label: "Search" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
  ];

  return (
    <section id="dashboard" className="relative py-28 px-6">
      {/* BG accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(6,182,212,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-5 inline-flex">
            <LayoutDashboard className="w-3 h-3" />
            Product Preview
          </span>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-white tracking-tight mb-4">
            Your command center,{" "}
            <span className="text-gradient-violet">reinvented.</span>
          </h2>
          <p className="font-body text-slate-400 text-lg max-w-lg mx-auto">
            An AI dashboard that doesn&apos;t just display data — it understands it,
            contextualises it, and tells you what to do next.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-3xl border border-border overflow-hidden shadow-card relative"
          style={{
            background: "rgba(5,5,18,0.85)",
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex-1 mx-6">
              <div className="max-w-[220px] mx-auto glass rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Search className="w-3 h-3 text-slate-600" />
                <span className="text-[11px] font-mono text-slate-600">
                  app.neuroflow.ai/dashboard
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-600" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500" />
            </div>
          </div>

          <div className="flex h-[480px]">
            {/* Sidebar */}
            <div className="w-[180px] border-r border-border p-3 flex flex-col gap-1 shrink-0 hidden md:flex">
              {/* Logo */}
              <div className="flex items-center gap-2 px-2 py-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white fill-white" />
                </div>
                <span className="font-display font-700 text-sm text-white">
                  NeuroFlow
                </span>
              </div>

              {navItems.map((item, i) => {
                const ItemIcon = item.icon;
                const active = activeNav === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left w-full transition-all duration-200 ${
                      active
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/15"
                        : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"
                    }`}
                  >
                    <ItemIcon className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-body">{item.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeNavDot"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"
                      />
                    )}
                  </motion.button>
                );
              })}

              <div className="mt-auto">
                <button className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-slate-600 hover:text-slate-400 w-full text-xs font-body">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-5 overflow-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-700 text-white text-base">
                    Good morning, Alex 👋
                  </h3>
                  <p className="font-mono text-[11px] text-slate-500">
                    Friday, 15 May · 3 new insights
                  </p>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                  All systems normal
                </span>
              </div>

              {/* Metric cards */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <MetricCard
                  icon={TrendingUp}
                  label="Monthly Revenue"
                  value={metrics.revenue.value}
                  change={metrics.revenue.change}
                  positive={metrics.revenue.positive}
                  color="bg-cyan-500/10 text-cyan-400"
                  delay={0.5}
                />
                <MetricCard
                  icon={Users}
                  label="Active Users"
                  value={metrics.users.value}
                  change={metrics.users.change}
                  positive={metrics.users.positive}
                  color="bg-violet-500/10 text-violet-400"
                  delay={0.6}
                />
                <MetricCard
                  icon={CheckSquare}
                  label="Tasks Done"
                  value={metrics.tasks.value}
                  change={metrics.tasks.change}
                  positive={metrics.tasks.positive}
                  color="bg-emerald-500/10 text-emerald-400"
                  delay={0.7}
                />
              </div>

              {/* Chart */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="glass rounded-xl p-4 border border-border mb-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="font-display font-600 text-sm text-white">
                    Productivity Score
                  </p>
                  <div className="flex gap-2">
                    {["7d", "30d", "90d"].map((t, i) => (
                      <button
                        key={t}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-lg transition-colors ${
                          i === 1
                            ? "bg-cyan-500/15 text-cyan-400"
                            : "text-slate-600 hover:text-slate-400"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <LineChart points={chartPoints} />
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex gap-3 text-[10px] font-mono text-slate-600">
                    {["May 1", "May 7", "May 14", "May 21", "May 28"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Activity feed */}
              <div className="space-y-2">
                <AnimatePresence initial={false}>
                  {activityFeed.map((item, i) => (
                    <motion.div
                      key={item.action}
                      initial={{ opacity: 0, x: -8, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center justify-between overflow-hidden py-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace("text-", "bg-")}`} />
                        <span className={`text-[11px] font-body ${item.color}`}>{item.action}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-600">{item.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* AI Sidebar */}
            <div className="w-[220px] border-l border-border p-4 flex flex-col hidden lg:flex shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <span className="font-display font-600 text-xs text-white">
                  AI Assistant
                </span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Conversation Feed */}
              <div className="flex-1 overflow-auto space-y-1 pr-1 max-h-[280px]">
                {messages.map((msg, i) => (
                  <ChatBubble key={i} text={msg.text} isUser={msg.isUser} />
                ))}

                {/* Animated thinking/typing neural status */}
                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start mb-2"
                  >
                    <div className="bg-white/[0.05] px-3.5 py-2.5 rounded-xl rounded-bl-sm border border-white/[0.05] flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestions */}
              <div className="mt-3 space-y-1.5">
                {suggestions.map((s, i) => (
                  <motion.button
                    key={s}
                    disabled={isThinking || isTypingAnimation}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    onClick={() => triggerTypewriter(s)}
                    className="w-full text-left text-[10px] font-body text-slate-400 px-2.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-border hover:border-border-bright transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>

              {/* Input */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-3 flex items-center gap-2 glass rounded-xl px-3 py-2 border border-border"
              >
                <input
                  readOnly
                  value={chatInput}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-[11px] font-body text-slate-500 placeholder-slate-700 outline-none"
                />
                <Send className="w-3 h-3 text-cyan-500 cursor-pointer" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
