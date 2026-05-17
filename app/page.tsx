import MouseGlow from "@/components/MouseGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import BentoGrid from "@/components/BentoGrid";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import AIOracle from "@/components/AIOracle";

export default function Home() {
  return (
    <main className="relative bg-bg-base min-h-screen overflow-hidden">
      {/* Mouse-following glow — client component */}
      <MouseGlow />

      {/* Global background: luxury solid base with premium ambient studio lighting */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(6,182,212,0.09) 0%, transparent 60%), " +
            "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,92,246,0.07) 0%, transparent 55%)",
        }}
      />

      <Navbar />

      <div className="relative z-10">
        <Hero />
        <Features />
        <Dashboard />
        <BentoGrid />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Footer />
      </div>

      {/* Pulsing Neural AI Assistant Oracle */}
      <AIOracle />
    </main>
  );
}
