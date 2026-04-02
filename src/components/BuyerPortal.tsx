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
  Share2,
  Lock,
  ArrowRight
} from "lucide-react";
import { SCHOOLS } from "@/lib/constants";
import { useLedger } from "@/lib/ledger-store";
import { getRetirementNarrative } from "@/lib/ai-modules";
import { cn } from "@/lib/utils";

export default function BuyerPortal() {
  const { balance, retireTokens, transactions } = useLedger();
  const [selectedSchool, setSelectedSchool] = useState<string>(SCHOOLS[0].id);
  const [amount, setAmount] = useState(10);
  const [isRetiring, setIsRetiring] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const school = SCHOOLS.find(s => s.id === selectedSchool);
  const retirementHistory = transactions.filter(tx => tx.type === "Retirement");

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full overflow-hidden">
      {/* Purchase/Retire Controls */}
      <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-4 custom-scrollbar">
        <section className="bg-dark/50 border border-border-brand p-8 group">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-syne font-bold uppercase tracking-tight">WBT Settlement Protocol</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#00B0FF]/10 border border-[#00B0FF]/20 rounded-full text-[10px] text-[#00B0FF] font-bold uppercase tracking-widest">
              <Lock className="w-3 h-3" /> Secure Purchase
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Target Project Selection</label>
              <div className="grid grid-cols-1 gap-2">
                {SCHOOLS.slice(0, 4).map((s) => (
                  <div 
                    key={s.id}
                    onClick={() => setSelectedSchool(s.id)}
                    className={cn(
                      "p-5 border cursor-pointer transition-all flex items-center justify-between group/item",
                      selectedSchool === s.id ? "bg-[#00B0FF]/10 border-[#00B0FF]" : "bg-navy/40 border-border-brand hover:border-[#00B0FF]/40"
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold font-syne group-hover/item:text-[#00B0FF] transition-colors">{s.name}</span>
                      <span className="text-[10px] text-muted uppercase tracking-tighter">{s.municipality} · Basin {s.basinId}</span>
                    </div>
                    <div className={cn(
                      "w-4 h-4 rounded-none border transition-all flex items-center justify-center",
                      selectedSchool === s.id ? "bg-[#00B0FF] border-[#00B0FF]" : "border-border-brand"
                    )}>
                      {selectedSchool === s.id && <ShieldCheck className="w-3 h-3 text-navy" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-4 italic">Offset Allocation (m³)</label>
                <div className="p-6 bg-navy/20 border border-white/5 relative overflow-hidden">
                  <input 
                    type="range" 
                    min="1" 
                    max={Math.min(balance, 100)} 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-[#00B0FF] relative z-10"
                  />
                  <div className="flex justify-between items-end mt-4 relative z-10">
                    <span className="text-4xl font-mono font-black text-white">{amount} <span className="text-sm text-white/20">WBT</span></span>
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-bold text-white/30 block tracking-widest">Available Pool</span>
                      <span className="text-xs font-mono font-bold text-[#00B0FF]">{balance.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#00B0FF]/5 border-l-4 border-[#00B0FF] p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Zap className="w-12 h-12 text-[#00B0FF]" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-3 h-3 text-[#00B0FF]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00B0FF]">AI Impact Narrative</span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed italic pr-8">
                  "{getRetirementNarrative(selectedSchool, amount)}"
                </p>
              </div>

              <button 
                onClick={handleRetire}
                disabled={isRetiring || balance < amount}
                className={cn(
                  "w-full py-5 bg-[#00B0FF] text-navy font-syne font-extrabold text-sm uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(0,176,255,0.2)]",
                  isRetiring ? "opacity-50 cursor-wait" : "hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                )}
              >
                {isRetiring ? "Verifying Settlement..." : "Finalize Retirement"}
              </button>
            </div>
          </div>
        </section>

        {/* History Feed */}
        <section className="bg-dark/50 border border-border-brand p-8">
          <h3 className="text-sm font-syne font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
            <History className="w-5 h-5 text-accent" />
            Audit Ledger: Retirement History
          </h3>
          <div className="space-y-3">
            {retirementHistory.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-navy border border-border-brand group transition-all hover:bg-dark/40">
                <div className="flex items-center gap-4">
                  <FileCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-white/90 font-mono tracking-widest">{tx.id}</span>
                    <span className="text-[10px] text-muted font-bold uppercase tracking-tighter">Settled on Base Mainnet · {new Date(tx.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className="text-lg font-mono font-bold text-red-400">-{tx.amount} <span className="text-[10px] opacity-40">WBT</span></span>
              </div>
            ))}
            {retirementHistory.length === 0 && (
              <div className="p-8 text-center text-xs text-muted italic border border-dashed border-border-brand uppercase tracking-widest">
                No verified retirements in this session
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Basin Stats Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <section className="bg-dark/80 border border-border-brand p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Droplets className="w-24 h-24 text-[#00B0FF]" />
          </div>
          <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-6">Basin Scarcity Metrics</h4>
          <div className="space-y-6">
            <div className="p-5 bg-navy/40 border border-border-brand">
              <span className="text-[9px] uppercase text-white/30 font-bold block mb-1">Aqueduct Baseline Water Stress</span>
              <span className="text-3xl font-syne font-black text-red-500 italic uppercase">Extremely High</span>
              <div className="flex items-center justify-between mt-3 text-[9px] font-bold text-white/40 uppercase">
                <span>Low Risk</span>
                <div className="flex-1 h-3 mx-4 bg-navy relative border border-white/5">
                  <div className="absolute top-0 left-0 h-full bg-red-600 shadow-[0_0_10px_#dc2626]" style={{ width: "94%" }} />
                </div>
                <span>4.2 / 5.0</span>
              </div>
            </div>
            
            <div className="p-5 bg-navy/40 border border-border-brand">
              <span className="text-[9px] uppercase text-white/30 font-bold block mb-1 tracking-widest">Basin Sustainability Gap</span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-mono font-bold text-white">-12.4</span>
                <span className="text-xs font-bold text-muted mb-1 tracking-widest">GL / YEAR</span>
              </div>
              <p className="text-[10px] text-muted leading-relaxed mt-2 uppercase tracking-tighter">
                Amecameca-Chalco Basin is operating at a massive sustainability deficit. Every retired WBT directly reduces this delta.
              </p>
            </div>
          </div>
        </section>

        <button className="w-full flex items-center justify-center gap-2 p-5 bg-accent text-navy hover:bg-white transition-all shadow-[0_0_20px_rgba(0,176,255,0.2)]">
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Generate ESG Proof</span>
           <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-[#050C1A]/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <div className="bg-white text-[#050C1A] w-full max-w-3xl p-6 md:p-16 relative shadow-[0_0_100px_rgba(0,176,255,0.3)]">
              <button 
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-[#050C1A]/30 hover:text-[#050C1A] font-bold text-sm tracking-widest"
              >
                CLOSE [X]
              </button>

              <div className="border-[6px] md:border-[12px] border-[#050C1A] p-6 md:p-12 flex flex-col items-center">
                <Droplets className="w-12 h-12 md:w-20 md:h-20 text-[#050C1A] mb-8" />
                
                <h2 className="text-[10px] md:text-sm font-syne font-bold uppercase tracking-[0.5em] mb-4">Official Certificate of</h2>
                <h1 className="text-3xl md:text-6xl font-syne font-black uppercase tracking-tighter mb-12 text-center leading-[0.9]">
                  Volumetric <br /> Water Benefit
                </h1>

                <div className="w-24 h-1.5 bg-[#050C1A] mb-12 shadow-[0_0_10px_rgba(0,0,0,0.1)]" />

                <div className="text-center space-y-6 max-w-lg mb-16">
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold opacity-40">This protocol certifies that</p>
                  <p className="text-2xl md:text-4xl font-syne font-black italic uppercase underline decoration-[#00B0FF] decoration-8 underline-offset-8">MIT STARTUP EXCHANGE</p>
                  <p className="text-xs md:text-sm leading-relaxed font-bold max-w-md mx-auto">
                    has officially retired <span className="text-lg text-[#00B0FF]">{amount} m³ (WBT)</span> of verified basin replenishment at 
                    <span className="block mt-2 underline decoration-[#00B0FF]/30">{school?.name || "Specified Project"}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pt-12 border-t border-[#050C1A]/10 items-center">
                  <div className="flex flex-col text-center md:text-left">
                    <span className="text-[9px] uppercase font-bold opacity-30 tracking-[0.2em]">Transaction ID</span>
                    <span className="text-[10px] font-mono font-bold truncate tracking-widest">0x{Math.random().toString(16).slice(2, 22).toUpperCase()}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-2 border-[#050C1A] p-1.5 mb-2 hover:scale-110 transition-transform">
                       <div className="w-full h-full bg-[#050C1A]/5 grid grid-cols-4 grid-rows-4 gap-1">
                          {Array.from({length: 16}).map((_, i) => <div key={i} className={cn("bg-[#050C1A]", Math.random() > 0.4 ? "opacity-100" : "opacity-0")} />)}
                       </div>
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-[0.3em] opacity-40">Verified on Base</span>
                  </div>
                  <div className="flex flex-col items-center md:items-end text-center md:text-right">
                    <span className="text-[9px] uppercase font-bold opacity-30 tracking-[0.3em]">Date of Settlement</span>
                    <span className="text-[10px] font-black tracking-widest">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-16 w-full md:w-auto">
                   <button className="flex items-center justify-center gap-3 px-8 py-4 bg-[#050C1A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#00B0FF] transition-all">
                      <Download className="w-4 h-4" /> Download Proof
                   </button>
                   <button className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#050C1A] text-[#050C1A] text-xs font-bold uppercase tracking-widest hover:bg-[#050C1A] hover:text-white transition-all">
                      <Share2 className="w-4 h-4" /> Share on X
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
