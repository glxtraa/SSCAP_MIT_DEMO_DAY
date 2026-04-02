"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  Activity, 
  ShieldCheck, 
  Waves,
  Zap,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SCHOOLS } from "@/lib/constants";

interface IngestEvent {
  id: string;
  source: string;
  value: number;
  unit: string;
  timestamp: string;
  status: "pulsing" | "anchored" | "verified";
  txHash?: string;
}

export default function IngestionFeed() {
  const [events, setEvents] = useState<IngestEvent[]>([]);
  const [totalAnchored, setTotalAnchored] = useState(0);

  // Simulate live ingestion
  useEffect(() => {
    const interval = setInterval(() => {
      const school = SCHOOLS[Math.floor(Math.random() * SCHOOLS.length)];
      const newEvent: IngestEvent = {
        id: `EV-${Math.random().toString(16).slice(2, 6).toUpperCase()}`,
        source: school.id,
        value: Number((Math.random() * 0.5 + 0.1).toFixed(2)),
        unit: "m³",
        timestamp: new Date().toLocaleTimeString(),
        status: "pulsing",
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 8));
      
      // Auto-anchor after 2 seconds
      setTimeout(() => {
        setEvents(prev => prev.map(e => 
          e.id === newEvent.id 
            ? { ...e, status: "anchored", txHash: "0x"+Math.random().toString(16).slice(2, 20) } 
            : e
        ));
        setTotalAnchored(prev => prev + newEvent.value);
      }, 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Real-time Feed */}
      <div className="lg:col-span-2 space-y-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-accent animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] font-syne">Precision Ingestion</h3>
          </div>
          <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] text-accent font-bold uppercase tracking-widest">
            SSCAP Protocol v4.2 Enabled
          </div>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {events.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "p-5 border transition-all duration-500 bg-dark/30",
                  event.status === "anchored" ? "border-accent/30" : "border-border-brand"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 border",
                      event.status === "anchored" ? "bg-accent/10 border-accent/40" : "bg-navy border-border-brand"
                    )}>
                      {event.status === "anchored" ? <ShieldCheck className="w-5 h-5 text-accent" /> : <Database className="w-5 h-5 text-muted" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">{event.id}</span>
                        <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{event.source}</span>
                      </div>
                      <div className="text-xl font-mono font-bold text-white mt-1">
                        +{event.value} <span className="text-xs text-white/40">{event.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className={cn(
                      "px-3 py-1 text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5",
                      event.status === "anchored" ? "bg-accent/20 text-accent" : "bg-white/5 text-muted"
                    )}>
                      {event.status === "anchored" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Anchored
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3 animate-pulse" /> Pulsing
                        </>
                      )}
                    </div>
                    {event.txHash && (
                      <span className="text-[9px] font-mono text-[#00B0FF]/40 truncate max-w-[120px]">
                        TX: {event.txHash}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Basin Roll-up Stats */}
      <div className="lg:col-span-1 space-y-6">
        <div className="p-8 bg-dark border border-border-brand relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Waves className="w-24 h-24 text-accent" />
          </div>
          
          <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-6">Basin Aggregate (Q1)</h4>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[9px] uppercase text-white/40 font-bold">Total Basin Recharge</span>
                <span className="text-xl font-mono font-bold text-white leading-none">
                  {totalAnchored.toFixed(2)} <span className="text-[10px] text-white/40 font-medium">m³</span>
                </span>
              </div>
              <div className="h-[1px] w-full bg-border-brand" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[9px] uppercase text-white/40 font-bold">Anchoring Efficiency</span>
                <span className="text-xl font-mono font-bold text-[#00B0FF] leading-none">99.8%</span>
              </div>
              <div className="h-[1px] w-full bg-border-brand" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[9px] uppercase text-white/40 font-bold">Base Mainnet Depth</span>
                <span className="text-xl font-mono font-bold text-sky leading-none">2.4s <span className="text-[10px] text-white/40 font-medium">AVG</span></span>
              </div>
              <div className="h-[1px] w-full bg-border-brand" />
            </div>
          </div>

          <div className="mt-10 p-4 border border-accent/20 bg-accent/5">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Trust Layer Status</span>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              All sensor events are cryptographically hashed and anchored to Base Mainnet at 4200ms intervals. 0.0% data corruption detected.
            </p>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 p-5 border border-border-brand hover:border-accent group transition-all">
          <span className="text-xs font-bold uppercase tracking-widest text-muted group-hover:text-white transition-colors">
            View Ledger Detail
          </span>
          <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
        </button>
      </div>
    </div>
  );
}
