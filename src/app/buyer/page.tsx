"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Droplets, 
  ChevronRight, 
  ShieldCheck, 
  FileCheck,
  History,
  Zap,
  Download,
  Share2
} from "lucide-react";
import { SCHOOLS } from "@/lib/constants";
import { useLedger } from "@/lib/ledger-store";
import { getRetirementNarrative } from "@/lib/ai-modules";
import { cn } from "@/lib/utils";

export default function BuyerPage() {
  const { balance, retireTokens } = useLedger();
  const [selectedSchool, setSelectedSchool] = useState<string>(SCHOOLS[0].id);
  const [amount, setAmount] = useState(10);
  const [isRetiring, setIsRetiring] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const school = SCHOOLS.find(s => s.id === selectedSchool);

  const handleRetire = async () => {
    if (amount > balance) return;
    setIsRetiring(true);
    
    // Simulate Blockchain Retirement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    retireTokens(amount, selectedSchool);
    setIsRetiring(false);
    setShowCertificate(true);
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-[#00B0FF]" />
          <h1 className="text-4xl font-syne font-extrabold tracking-tight uppercase">
            WBT <span className="text-[#00B0FF]">Marketplace</span>
          </h1>
        </div>
        <p className="text-muted max-w-2xl font-medium">
          Acquire and retire Volumetric Water Benefit tokens to offset your operational footprint. 
          Each retirement is anchored to a specific high-risk basin.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Purchase/Retire Controls */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-dark border border-border-brand p-8">
            <h3 className="text-lg font-syne font-bold uppercase tracking-tight mb-6">Token Retirement Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Select Target Project</label>
                <div className="grid grid-cols-1 gap-2">
                  {SCHOOLS.slice(0, 4).map((s) => (
                    <div 
                      key={s.id}
                      onClick={() => setSelectedSchool(s.id)}
                      className={cn(
                        "p-4 border cursor-pointer transition-all flex items-center justify-between",
                        selectedSchool === s.id ? "bg-[#00B0FF]/10 border-[#00B0FF]" : "bg-navy border-border-brand hover:border-[#00B0FF]/30"
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold font-syne">{s.name}</span>
                        <span className="text-[10px] text-muted uppercase tracking-tighter">{s.municipality}</span>
                      </div>
                      {selectedSchool === s.id && <ShieldCheck className="w-4 h-4 text-[#00B0FF]" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-4">Retirement Amount (m³)</label>
                  <input 
                    type="range" 
                    min="1" 
                    max={Math.min(balance, 100)} 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-[#00B0FF]"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-2xl font-mono font-bold text-[#00B0FF]">{amount} <span className="text-sm text-white/40">WBT</span></span>
                    <span className="text-[10px] text-muted self-end">Available: {balance.toFixed(1)}</span>
                  </div>
                </div>

                <div className="bg-[#00B0FF]/5 border border-[#00B0FF]/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-3 h-3 text-[#00B0FF]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00B0FF]">AI Claim Narrative</span>
                  </div>
                  <p className="text-[10px] text-white/70 leading-relaxed italic">
                    "{getRetirementNarrative(selectedSchool, amount)}"
                  </p>
                </div>

                <button 
                  onClick={handleRetire}
                  disabled={isRetiring || balance < amount}
                  className={cn(
                    "w-full py-4 bg-[#00B0FF] text-navy font-syne font-extrabold text-sm uppercase tracking-widest transition-all",
                    isRetiring ? "opacity-50 cursor-wait" : "hover:bg-white"
                  )}
                >
                  {isRetiring ? "Finalizing Settlement..." : "Retire Tokens Now"}
                </button>
              </div>
            </div>
          </section>

          {/* Activity Feed */}
          <section className="bg-dark border border-border-brand p-8">
            <h3 className="text-lg font-syne font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
              <History className="w-5 h-5 text-accent" />
              Retirement History
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-navy border border-border-brand opacity-50">
                <div className="flex items-center gap-4">
                  <FileCheck className="w-4 h-4 text-green-500" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase">Settlement: MIT-RETIRE-001</span>
                    <span className="text-[10px] text-muted uppercase tracking-widest">Amedameca Basin · 12 Feb 2026</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-white/40">-500 WBT</span>
              </div>
            </div>
          </section>
        </div>

        {/* Basin Context Sidebar */}
        <div className="space-y-6">
          <section className="bg-dark border border-border-brand p-6">
            <h4 className="text-[10px] font-bold text-[#00B0FF] uppercase tracking-[0.2em] mb-4">Basin Impact Data</h4>
            <div className="space-y-4">
              <div className="p-4 bg-navy border border-border-brand">
                <span className="text-[10px] uppercase text-white/40 font-bold block mb-1">Current Basin Risk</span>
                <span className="text-2xl font-syne font-bold text-red-400">{school?.riskScore} <span className="text-sm">/ 5.0</span></span>
              </div>
              <div className="p-4 bg-navy border border-border-brand">
                <span className="text-[10px] uppercase text-white/40 font-bold block mb-1">Local Scarcity Index</span>
                <span className="text-2xl font-syne font-bold text-sky">88% <span className="text-sm text-white/40">Critical</span></span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-[#050C1A]/95 backdrop-blur-md flex items-center justify-center p-8 overflow-y-auto"
          >
            <div className="bg-white text-navy w-full max-w-3xl p-12 relative shadow-[0_0_100px_rgba(0,176,255,0.2)]">
              <button 
                onClick={() => setShowCertificate(false)}
                className="absolute top-6 right-6 text-navy/40 hover:text-navy"
              >
                CLOSE [X]
              </button>

              <div className="border-[8px] border-navy p-10 flex flex-col items-center">
                <Droplets className="w-16 h-16 text-navy mb-8" />
                
                <h2 className="text-sm font-syne font-bold uppercase tracking-[0.4em] mb-2">Certificate of</h2>
                <h1 className="text-5xl font-syne font-black uppercase tracking-tighter mb-12 text-center leading-none">
                  Volumetric Water <br /> Benefit Retirement
                </h1>

                <div className="w-24 h-1 bg-navy/20 mb-12" />

                <div className="text-center space-y-6 max-w-lg mb-16">
                  <p className="text-xs uppercase tracking-widest font-bold">This document certifies that</p>
                  <p className="text-3xl font-syne font-extrabold italic uppercase underline decoration-[#00B0FF]/50 underline-offset-8">MIT STARTUP EXCHANGE</p>
                  <p className="text-xs leading-relaxed font-medium">
                    has officially retired <span className="font-extrabold">{amount} m³ (WBT)</span> of verified water replenishment benefit at 
                    <span className="font-extrabold"> {school?.name}</span>, located in the <span className="font-extrabold">{school?.municipality}</span> region.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-12 w-full pt-12 border-t border-navy/10">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold text-navy/40">Transaction ID</span>
                    <span className="text-[10px] font-mono font-bold truncate">0x{Math.random().toString(16).slice(2, 20)}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border border-navy/10 p-1 mb-2">
                       {/* Mock QR */}
                       <div className="w-full h-full bg-navy/5 grid grid-cols-3 grid-rows-3 gap-1">
                          {[1,2,3,4,5,6,7,8,9].map(i => <div key={i} className={cn("bg-navy", Math.random() > 0.5 ? "opacity-100" : "opacity-0")} />)}
                       </div>
                    </div>
                    <span className="text-[8px] uppercase font-bold tracking-widest">Verify on Base</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase font-bold text-navy/40">Date Issued</span>
                    <span className="text-[10px] font-bold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-16 no-print">
                   <button className="flex items-center gap-2 px-6 py-3 bg-navy text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#00B0FF] transition-colors">
                      <Download className="w-4 h-4" /> Download PDF
                   </button>
                   <button className="flex items-center gap-2 px-6 py-3 border border-navy text-navy text-[10px] font-bold uppercase tracking-widest hover:bg-navy hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" /> Share Proof
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
