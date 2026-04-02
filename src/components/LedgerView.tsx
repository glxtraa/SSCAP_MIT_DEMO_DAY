"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  ShieldCheck, 
  ExternalLink, 
  Lock, 
  ArrowUpRight,
  Droplets,
  Server,
  Zap,
  Globe,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLedger } from "@/lib/ledger-store";

export default function LedgerView() {
  const { transactions, balance } = useLedger();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
      {/* Ledger Stats Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div className="p-8 bg-dark border border-border-brand relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Globe className="w-24 h-24 text-accent" />
          </div>
          <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-6">Global Ledger Status</h4>
          
          <div className="space-y-8">
            <div>
              <span className="text-[9px] uppercase text-white/40 font-bold block mb-2 tracking-widest">Base Mainnet Pool</span>
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-accent" />
                <span className="text-2xl font-mono font-bold text-white">{balance.toLocaleString()} <span className="text-sm font-medium opacity-40">WBT</span></span>
              </div>
            </div>

            <div>
              <span className="text-[9px] uppercase text-white/40 font-bold block mb-2 tracking-widest">Anchoring Nodes</span>
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-emerald-400" />
                <span className="text-xl font-mono font-bold text-emerald-400">12 Active</span>
              </div>
            </div>

            <div className="pt-6 border-t border-border-brand">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-black tracking-widest">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}</span>
              </div>
              <p className="text-[10px] text-muted leading-relaxed uppercase tracking-tighter">
                State Root: 0x42f...a1c9<br />
                Finality Delay: 0.1s (Mainnet)
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-accent/20 bg-accent/5">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Base Integration</span>
          </div>
          <p className="text-[11px] text-muted leading-relaxed">
            All Volumetric Water Benefit tokens are minted on **Base Mainnet** (Optimism Stack) for maximum scalability and auditability.
          </p>
        </div>
      </div>

      {/* Transaction Explorer */}
      <div className="lg:col-span-3 bg-dark/50 border border-border-brand flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-border-brand flex items-center justify-between bg-navy/50">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] font-syne">Blockchain Transaction Ledger</h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] text-purple-400 font-bold uppercase tracking-widest">
            <Lock className="w-3 h-3" /> Fully Audited
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar p-6">
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-20 text-center opacity-30">
                <Database className="w-12 h-12 mb-4" />
                <p className="text-xs uppercase font-bold tracking-widest">No Transactions in Current Session</p>
              </div>
            ) : (
              transactions.map((tx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 bg-navy border border-border-brand hover:border-purple-500/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-3 border",
                        tx.type === "Issuance" ? "bg-accent/10 border-accent/40" : "bg-purple-500/10 border-purple-500/40"
                      )}>
                        {tx.type === "Issuance" ? <ShieldCheck className="w-5 h-5 text-accent" /> : <Lock className="w-5 h-5 text-purple-400" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-muted uppercase">{tx.id}</span>
                          <span className={cn(
                            "text-[9px] px-1.5 py-0.5 border font-bold uppercase tracking-widest",
                            tx.type === "Issuance" ? "border-accent/30 text-accent" : "border-purple-300/30 text-purple-300"
                          )}>
                            {tx.type}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold font-syne mt-1">
                          {tx.type === "Issuance" ? "Aggregated Basin Minting" : "WBT Settlement"}
                        </h5>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end">
                      <span className={cn(
                        "text-lg font-mono font-bold",
                        tx.type === "Issuance" ? "text-accent" : "text-purple-400"
                      )}>
                        {tx.type === "Issuance" ? "+" : "-"}{tx.amount.toLocaleString()} WBT
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-mono text-white/30 truncate max-w-[200px]">{tx.txHash}</span>
                        <ExternalLink className="w-3 h-3 text-muted" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 border-t border-border-brand bg-navy/30 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] text-muted uppercase font-bold tracking-widest">Base Mainnet Synchronized</span>
           </div>
           <button className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
              View on Blockscout <ArrowRight className="w-3 h-3" />
           </button>
        </div>
      </div>
    </div>
  );
}
