"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Search,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Zap
} from "lucide-react";
import { SCHOOLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLedger } from "@/lib/ledger-store";

const pendingCertifications = [
  {
    id: "CERT-0454Z-Q1",
    schoolId: "15DPR0454Z",
    period: "Q1 2026",
    status: "Pending Review",
    evidenceCount: 4,
    vwbAmount: "125.4 m³",
    riskLevel: "Medium",
  },
  {
    id: "CERT-0594Z-Q1",
    schoolId: "15DPR0594Z",
    period: "Q1 2026",
    status: "In Progress",
    evidenceCount: 2,
    vwbAmount: "88.2 m³",
    riskLevel: "High",
  },
];

export default function ReviewerPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { issueTokens } = useLedger();
  const [isIssuing, setIsIssuing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const activeCert = pendingCertifications.find(c => c.id === selectedId);

  const handleIssue = async () => {
    if (!activeCert) return;
    setIsIssuing(true);
    
    // Simulate Blockchain Latency
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const amount = parseFloat(activeCert.vwbAmount.split(" ")[0]);
    issueTokens(amount, activeCert.schoolId);
    
    setIsIssuing(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedId(null);
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="w-8 h-8 text-[#00B0FF]" />
          <h1 className="text-4xl font-syne font-extrabold tracking-tight uppercase">
            Certification <span className="text-[#00B0FF]">Engine</span>
          </h1>
        </div>
        <p className="text-muted max-w-2xl font-medium">
          Verify water benefits through multi-dimensional evidence audits. 
          Human-in-the-loop validation powered by SSCAP AI Modules.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending List */}
        <section className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold font-syne uppercase tracking-widest text-[#00B0FF]">
              Queue: {pendingCertifications.length} Pending
            </h3>
            <div className="p-2 border border-border-brand bg-dark cursor-pointer hover:border-[#00B0FF]/50 transition-colors">
              <Search className="w-4 h-4 text-muted" />
            </div>
          </div>

          <div className="space-y-4">
            {pendingCertifications.map((cert) => {
              const school = SCHOOLS.find(s => s.id === cert.schoolId);
              const isActive = selectedId === cert.id;
              
              return (
                <motion.div
                  key={cert.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedId(cert.id)}
                  className={cn(
                    "p-5 border cursor-pointer transition-all",
                    isActive 
                      ? "bg-dark border-[#00B0FF] ring-1 ring-[#00B0FF]/30" 
                      : "bg-navy border-border-brand hover:border-[#00B0FF]/30"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-[#00B0FF] uppercase tracking-tighter">
                      {cert.id}
                    </span>
                    <span className={cn(
                      "text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest border",
                      cert.riskLevel === "High" ? "text-red-400 border-red-500/30 bg-red-500/5" : "text-amber-400 border-amber-500/30 bg-amber-500/5"
                    )}>
                      {cert.riskLevel} Risk
                    </span>
                  </div>
                  <h4 className="font-syne font-bold text-sm mb-1">{school?.name}</h4>
                  <p className="text-[10px] text-muted uppercase tracking-wider mb-4">
                    Period: {cert.period}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase text-white/40 font-bold tracking-widest">WBT Potential</span>
                      <span className="text-sm font-mono font-bold text-[#00B0FF]">{cert.vwbAmount}</span>
                    </div>
                    <ArrowRight className={cn("w-4 h-4 transition-transform", isActive ? "translate-x-1 text-[#00B0FF]" : "text-muted")} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Workspace */}
        <section className="lg:col-span-2 min-h-[600px] bg-dark border border-border-brand flex flex-col">
          <AnimatePresence mode="wait">
            {!selectedId ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-white/10" />
                </div>
                <h3 className="text-xl font-syne font-bold uppercase tracking-tight mb-2">
                  No Certification Selected
                </h3>
                <p className="text-sm text-muted max-w-xs leading-relaxed">
                  Select a school from the queue to start the verification protocol.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="workspace"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col"
              >
                {/* Workspace Header */}
                <div className="p-6 border-b border-border-brand flex items-center justify-between bg-navy/50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#00B0FF]/10 border border-[#00B0FF]/30">
                      <ClipboardCheck className="w-5 h-5 text-[#00B0FF]" />
                    </div>
                    <div>
                      <h3 className="font-syne font-bold uppercase text-lg tracking-tight">Verification Protocol: {selectedId}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="text-[10px] text-muted uppercase font-bold tracking-widest">In Progress</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors disabled:opacity-50">
                      Reject
                    </button>
                    <button 
                      className={cn(
                        "px-6 py-2 bg-[#00B0FF] text-navy text-[10px] font-bold uppercase tracking-widest transition-all",
                        isIssuing ? "opacity-70 cursor-wait" : "hover:bg-white"
                      )}
                      onClick={handleIssue}
                      disabled={isIssuing}
                    >
                      {isIssuing ? "Anchoring to Base..." : "Issue WBT Tokens"}
                    </button>
                  </div>
                </div>

                <div className="relative flex-1 grid grid-cols-1 md:grid-cols-2">
                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-[#050C1A]/90 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0.5, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-20 h-20 bg-[#00B0FF]/10 border border-[#00B0FF] flex items-center justify-center mb-6"
                        >
                          <ShieldCheck className="w-10 h-10 text-[#00B0FF]" />
                        </motion.div>
                        <h3 className="text-2xl font-syne font-extrabold uppercase tracking-tight mb-2">
                          Tokens Issued <span className="text-[#00B0FF]">Successfully</span>
                        </h3>
                        <p className="text-sm text-muted max-w-xs mb-8">
                          Transaction anchored to Base Mainnet. Global Water Ledger updated.
                        </p>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-[#00B0FF] animate-pulse" />
                          <span className="text-[10px] font-mono text-[#00B0FF]">TX: 0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Left: Evidence & AI Assistant */}
                  <div className="border-r border-border-brand p-6 space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold text-[#00B0FF] uppercase tracking-[0.2em] mb-4">Evidence Feed</h4>
                      <div className="space-y-3">
                        {["Technical_Report_PCV.pdf", "School_Followup_Seguimiento.pdf", "Telemetry_Audit_12.json"].map((doc) => (
                          <div key={doc} className="flex items-center justify-between p-3 bg-navy border border-border-brand hover:border-[#00B0FF]/30 transition-all cursor-pointer group">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <FileText className="w-4 h-4 text-muted group-hover:text-[#00B0FF]" />
                              <span className="text-xs truncate font-medium">{doc}</span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-muted" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#00B0FF]/5 border border-[#00B0FF]/20 p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap className="w-12 h-12 text-[#00B0FF]" />
                      </div>
                      <h4 className="text-[10px] font-bold text-[#00B0FF] uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Zap className="w-3 h-3" />
                        AI Evidence Copilot
                      </h4>
                      <p className="text-[11px] text-white/80 leading-relaxed mb-4 italic">
                        "Extracted 3 key anomalies in discharge pressure vs. replenishment rate for 15DPR0454Z. Verified sensor ID matching PCV Report #129..."
                      </p>
                      <button className="flex items-center gap-2 text-[10px] font-bold text-[#00B0FF] uppercase tracking-widest hover:text-white transition-colors">
                        Expand Reasoning <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Right: VWBA Analyzer */}
                  <div className="p-6 space-y-6">
                    <h4 className="text-[10px] font-bold text-[#00B0FF] uppercase tracking-[0.2em] mb-4">VWBA Calculation Audit</h4>
                    
                    <div className="space-y-4">
                      {[
                        { label: "Metered Captado", value: "145.2 m³", check: true },
                        { label: "Metered Utilizado", value: "-19.8 m³", check: true },
                        { label: "Basin Evap (Delta)", value: "-0.02 m³", check: true },
                        { label: "Final Verified WBT", value: "125.4 m³", highlight: true },
                      ].map((item, i) => (
                        <div key={item.label} className="flex items-center justify-between p-3 border-b border-white/5">
                          <span className="text-[11px] text-muted font-medium">{item.label}</span>
                          <div className="flex items-center gap-3">
                            <span className={cn("text-xs font-mono font-bold", item.highlight ? "text-[#00B0FF]" : "text-white")}>
                              {item.value}
                            </span>
                            {item.check && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border border-border-brand bg-navy/30">
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-3 h-3 text-[#00B0FF]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#00B0FF]">AI VWBA Assistant</span>
                      </div>
                      <div className="text-[11px] text-muted leading-relaxed">
                        Deterministic rule check passed. Calculation matches SSCAP V4 Datasheet methodology. No deduplication conflicts detected on Base Mainnet.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
