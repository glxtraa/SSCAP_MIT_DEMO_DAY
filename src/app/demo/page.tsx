"use client";

import { motion } from "framer-motion";
import { 
  Play, 
  Map as MapIcon, 
  ClipboardCheck, 
  ShoppingBag, 
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const demoSteps = [
  {
    time: "00s",
    title: "The Ingestion Map",
    description: "Start at the Dashboard. Show the live GIS monitoring of schools on Base Mainnet. Point out the 'Electric Water' accents and the real-world school data from Mexico.",
    href: "/",
    icon: MapIcon,
  },
  {
    time: "15s",
    title: "AI Review Protocol",
    description: "Navigate to Certification. Show the 'AI Evidence Copilot' parsing Spanish technical reports. Click 'Issue WBT' to anchor water benefits to the blockchain.",
    href: "/reviewer",
    icon: ClipboardCheck,
  },
  {
    time: "35s",
    title: "Marketplace & Narrative",
    description: "Go to Buyer Marketplace. Select a school, adjust the retirement amount, and show the 'AI Claim-Safe Narrative' generated automatically.",
    href: "/buyer",
    icon: ShoppingBag,
  },
  {
    time: "55s",
    title: "Trust Layer Proof",
    description: "Retire the tokens and display the Digital Certificate. Highlight the Transaction ID and the verifiable proof of impact.",
    href: "/buyer",
    icon: CheckCircle2,
  },
];

export default function DemoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest">
          <Clock className="w-3 h-3" />
          60-Second Pitch Controller
        </div>
        <h1 className="text-5xl font-syne font-extrabold tracking-tight uppercase">
          MIT Demo Day <span className="text-accent">Auto-Pilot</span>
        </h1>
        <p className="text-muted max-w-xl mx-auto">
          Follow this guided sequence to demonstrate the "Trust Layer" end-to-end. 
          The application state is persisted across transitions.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {demoSteps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-dark border border-border-brand p-8 flex gap-8 items-start hover:border-accent transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent">{step.time}</span>
              <div className="w-px h-full bg-border-brand group-last:hidden" />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <step.icon className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-syne font-bold uppercase">{step.title}</h3>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            <Link href={step.href}>
              <button className="px-6 py-3 bg-accent text-navy text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-colors">
                Open View <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      <footer className="pt-12 border-t border-border-brand text-center">
        <button 
          className="px-10 py-5 bg-white text-navy font-syne font-extrabold text-lg uppercase tracking-tighter hover:bg-accent transition-all flex items-center gap-4 mx-auto"
          onClick={() => window.location.href = "/"}
        >
          <Play className="w-6 h-6 fill-current" />
          Start 60s Demo Run
        </button>
      </footer>
    </div>
  );
}
