"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, 
  FileText, 
  ShieldCheck, 
  Search,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Zap,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { SCHOOLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { getAIOpinion } from "@/lib/ai-modules";
import { useLedger } from "@/lib/ledger-store";

const pendingCertifications = [
  {
    id: "BASN-7060854410-Q1",
    basinId: "7060854410",
    name: "Amecameca-Chalco Basin",
    period: "Q1 2026",
    status: "Pending Review",
    evidenceCount: 12,
    vwbAmount: "452.8 m³",
    riskLevel: "Medium",
    schools: ["15DPR0454Z", "15DTV0170S", "15EJN3378M"],
  },
  {
    id: "BASN-7060881234-Q1",
    basinId: "7060881234",
    name: "Ecatepec-Xalostoc Basin",
    period: "Q1 2026",
    status: "In Progress",
    evidenceCount: 8,
    vwbAmount: "198.2 m³",
    riskLevel: "High",
    schools: ["15DPR0594Z"],
  },
];

export default function ReviewerWorkspace() {
  const { issueTokens } = useLedger();
  const [issuedIds, setIssuedIds] = useState<string[]>([]);
  const [isIssuing, setIsIssuing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeCertifications = pendingCertifications.filter(c => !issuedIds.includes(c.id));
  const selectedCert = pendingCertifications.find(c => c.id === selectedId);

  const handleIssue = async () => {
    if (!selectedCert) return;
    setIsIssuing(true);
    
    // Simulate Blockchain Minting Delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const amount = parseFloat(selectedCert.vwbAmount.split(" ")[0]);
    issueTokens(amount, selectedCert.schools[0]);
    
    setIssuedIds(prev => [...prev, selectedCert.id]);
    setIsIssuing(false);
    setSelectedId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
      {/* Pending List Side Panel (Desktop only) */}
      <div className="hidden lg:block lg:col-span-1 space-y-4 h-full overflow-y-auto">
        <h4 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4">Certification Queue</h4>
        {activeCertifications.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedId(cert.id)}
            className={cn(
              "p-4 border cursor-pointer transition-all",
              selectedId === cert.id ? "bg-accent/10 border-accent" : "bg-dark/30 border-border-brand hover:border-accent/30"
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[9px] font-bold text-accent uppercase">{cert.id}</span>
              <span className={cn(
                "text-[8px] px-1.5 py-0.5 border uppercase font-bold",
                cert.riskLevel === "High" ? "border-red-500/50 text-red-400" : "border-amber-500/50 text-amber-400"
              )}>
                {cert.riskLevel} Risk
              </span>
            </div>
            <h5 className="text-sm font-bold font-syne truncate">{cert.name}</h5>
            <p className="text-[10px] text-muted uppercase mt-1">{cert.period}</p>
          </div>
        ))}
        {activeCertifications.length === 0 && (
          <div className="p-8 text-center border border-dashed border-border-brand opacity-40">
            <span className="text-[10px] font-bold uppercase tracking-widest">Queue Empty</span>
          </div>
        )}
      </div>

      {/* Main Review Area */}
      <div className="lg:col-span-3 bg-dark/50 border border-border-brand flex flex-col h-full relative overflow-hidden">
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
                <ClipboardCheck className="w-8 h-8 text-white/10" />
              </div>
              <h3 className="text-lg font-syne font-bold uppercase tracking-tight mb-2">Select a Basin for Audit</h3>
              <p className="text-sm text-muted max-w-xs leading-relaxed">
                Choose a certification batch from the queue to start the human-in-the-loop verification protocol.
              </p>
              <div className="mt-8 lg:hidden flex flex-col gap-3 w-full">
                {pendingCertifications.map((cert) => (
                  <button key={cert.id} onClick={() => setSelectedId(cert.id)} className="p-4 border border-border-brand text-xs uppercase font-bold text-white bg-dark">
                    Start {cert.name}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="workspace"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Workspace Header */}
              <div className="p-6 border-b border-border-brand flex items-center justify-between bg-navy/50 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedId(null)} className="lg:hidden p-2 text-muted">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                  <div>
                    <h3 className="font-syne font-extrabold uppercase text-lg tracking-tight">{selectedCert?.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[10px] text-muted uppercase font-bold tracking-widest">Awaiting Verification</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleIssue}
                  disabled={isIssuing}
                  className={cn(
                    "px-6 py-2 bg-accent text-navy text-[10px] font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,176,255,0.2)]",
                    isIssuing ? "opacity-50 cursor-wait" : "hover:bg-white"
                  )}
                >
                  {isIssuing ? "Anchoring to Base..." : "Issue Aggregate WBT"}
                </button>
              </div>

              <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">
                {/* Left: Evidence Feed */}
                <div className="border-b lg:border-b-0 lg:border-r border-border-brand p-6 space-y-6 overflow-y-auto h-full pr-4 custom-scrollbar">
                  <div>
                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">Evidence Bundle</h4>
                    <div className="space-y-2">
                      {["PCV_Report_2026_Q1.pdf", "Site_Followup_Aggregate.pdf", "Sensor_Calibration_Logs.xlsx"].map((doc) => (
                        <div key={doc} className="flex items-center justify-between p-3 bg-navy/40 border border-border-brand hover:border-accent/40 transition-all cursor-pointer group">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileText className="w-4 h-4 text-muted group-hover:text-accent" />
                            <span className="text-[11px] truncate font-medium text-white/70">{doc}</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-muted" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-accent/5 border border-accent/20 p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Zap className="w-12 h-12 text-accent" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-3 h-3 text-accent" />
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest">AI Evidence Copilot</span>
                    </div>
                    <p className="text-[11px] text-white/80 leading-relaxed italic mb-4">
                      "{getAIOpinion(selectedCert?.schools[0] || "", "Evidence Copilot").reasoning}"
                    </p>
                    <div className="flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent text-[9px] font-bold uppercase tracking-widest self-start w-fit">
                      Confidence: 94%
                    </div>
                  </div>

                  {/* Individual Schools in Basin */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Basin Nodes ({selectedCert?.schools.length})</h4>
                    {selectedCert?.schools.map((schoolId) => {
                      const school = SCHOOLS.find(s => s.id === schoolId);
                      return (
                        <div key={schoolId} className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.02]">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold font-syne">{school?.name}</span>
                            <span className="text-[9px] text-muted">{schoolId}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <CheckCircle2 className="w-3 h-3 text-accent" />
                             <span className="text-[10px] font-mono font-bold text-accent">+142L</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: AI Analysis & Verdict */}
                <div className="p-6 space-y-6 overflow-y-auto h-full pr-4 custom-scrollbar">
                  <div className="flex flex-col space-y-4">
                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Trust Layer Verdicts</h4>
                    
                    {[
                      { name: "Deterministic Rules", icon: CheckCircle2, status: "PASS", color: "text-green-500", info: "Aggregation matches SSCAP standard (V4.2)" },
                      { name: "AI Deduplication", icon: ShieldCheck, status: "PASS", color: "text-accent", info: "Zero double-counting on Base Mainnet" },
                      { name: "Scarcity Sync", icon: AlertCircle, status: "WARN", color: "text-amber-500", info: "Aqueduct Risk ID 4.2 requires quarterly review" },
                    ].map((v) => (
                      <div key={v.name} className="p-4 bg-navy border border-border-brand group hover:border-white/10 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <v.icon className={cn("w-4 h-4", v.color)} />
                            <span className="text-xs font-bold text-white">{v.name}</span>
                          </div>
                          <span className={cn("text-[9px] font-bold uppercase tracking-widest", v.color)}>{v.status}</span>
                        </div>
                        <p className="text-[10px] text-muted leading-relaxed">{v.info}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 border border-accent/20 bg-accent/5">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-3 h-3 text-accent" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent">VWBA Method Assistant</span>
                    </div>
                    <div className="text-[11px] text-white/70 leading-relaxed mb-4">
                      {getAIOpinion(selectedCert?.schools[0] || "", "VWBA Assistant").reasoning}
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-[9px] font-bold text-accent uppercase tracking-widest hover:text-white transition-colors">Request Context</button>
                      <button className="text-[9px] font-bold text-accent uppercase tracking-widest hover:text-white transition-colors">Verify Calculus</button>
                    </div>
                  </div>

                  {/* Certification Summary */}
                  <div className="p-6 bg-[#00B0FF]/10 border-t-4 border-[#00B0FF] mt-auto">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <span className="text-[9px] uppercase text-accent font-bold tracking-widest">Aggregate Potential</span>
                        <div className="text-3xl font-syne font-extrabold text-white leading-none mt-1">
                          {selectedCert?.vwbAmount}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase text-white/40 font-bold block mb-1 tracking-widest">Total Issuance</span>
                        <span className="text-xl font-mono font-bold text-accent">453 WBT</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-white/50 italic leading-relaxed">
                      "By confirming issuance, you anchor the entire basin's replenishment volume for Q1 2026 to the Base Mainnet ledger."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
