"use client";

import { Droplets, ShieldCheck, Globe, FileText, MapPin, Calendar, User, Zap } from "lucide-react";
import { School } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getRetirementNarrative } from "@/lib/ai-modules";

interface RetirementReportProps {
  amount: number;
  school: School;
  transactionId: string;
  timestamp: string;
  onClose: () => void;
}

export default function RetirementReport({ amount, school, transactionId, timestamp, onClose }: RetirementReportProps) {
  const dateStr = new Date(timestamp).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  }).toUpperCase();

  return (
    <div className="bg-white text-navy min-h-screen w-full max-w-4xl mx-auto p-8 md:p-16 shadow-2xl font-dm-sans selection:bg-accent selection:text-navy relative">
      {/* Decorative Border */}
      <div className="absolute inset-4 border border-navy/10 pointer-events-none" />
      <div className="absolute inset-8 border-2 border-navy pointer-events-none" />

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 relative z-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-navy flex items-center justify-center">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-syne font-black tracking-tighter leading-none">BLUE</span>
              <span className="text-xl font-syne font-black tracking-tighter leading-none text-accent">LIFELINE</span>
            </div>
          </div>
          <div className="h-1 w-24 bg-accent" />
        </div>

        <div className="text-right">
          <h1 className="text-sm font-bold uppercase tracking-[0.3em] mb-1">Impact Settlement Report</h1>
          <p className="text-[10px] font-mono font-bold text-navy/40 uppercase">ID: {transactionId}</p>
          <p className="text-[10px] font-bold text-navy/60 mt-1">{dateStr}</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        <div className="md:col-span-2 space-y-12">
          {/* Executive Summary */}
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40 mb-4 flex items-center gap-2">
              <FileText className="w-3 h-3" /> Executive Summary
            </h2>
            <div className="text-3xl font-syne font-extrabold leading-tight tracking-tight">
              Certification of <span className="text-accent underline decoration-4 underline-offset-4">{amount} m³</span> Volumetric Water Benefit Retirement
            </div>
            <p className="mt-6 text-sm leading-relaxed text-navy/70 border-l-4 border-accent pl-6 italic">
              {getRetirementNarrative(school.id, amount)}
            </p>
          </section>

          {/* Project Details */}
          <section className="grid grid-cols-2 gap-8 py-8 border-y border-navy/10">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-navy/40 mb-3">Target Project</h3>
              <p className="text-sm font-bold font-syne uppercase">{school.name}</p>
              <p className="text-[10px] text-navy/60 mt-1 uppercase">{school.address}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-navy/40 mb-3">Basin Context</h3>
              <p className="text-sm font-bold font-syne uppercase">Amecameca-Chalco Basin</p>
              <p className="text-[10px] text-navy/60 mt-1 uppercase">Hydrological ID: {school.basinId}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-navy/40 mb-3">Reporting Period</h3>
              <p className="text-sm font-bold font-syne uppercase">Quarter 1, 2026</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-navy/40 mb-3">Methodology</h3>
              <p className="text-sm font-bold font-syne uppercase">SSCAP Protocol v4.2</p>
            </div>
          </section>

          {/* AI Auditor Review */}
          <section className="bg-navy/5 p-8 border border-navy/10">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-accent" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Automated Traceability Verdict</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Double-Counting Prevention</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Verified on Chain</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Sensor Baseline Integrity</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">99.8% Match</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Additionality Assessment</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Deterministic Pass</span>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Proofs */}
        <div className="space-y-8 border-l border-navy/10 pl-8 hidden md:block">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-navy/40 mb-4">Blockchain Settlement</h4>
            <div className="p-4 bg-navy text-white space-y-4">
               <div className="flex items-center gap-2">
                 <Globe className="w-4 h-4 text-accent" />
                 <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Base Mainnet</span>
               </div>
               <div className="space-y-2">
                 <span className="text-[8px] font-mono text-white/40 block leading-none">TX HASH</span>
                 <span className="text-[9px] font-mono break-all font-bold tracking-tighter">0x{transactionId}A42B91C900</span>
               </div>
               <div className="h-[1px] bg-white/10" />
               <div className="flex items-center justify-center py-2">
                  <div className="w-20 h-20 bg-white p-1">
                    <div className="w-full h-full bg-navy grid grid-cols-5 grid-rows-5 gap-0.5">
                      {Array.from({length: 25}).map((_, i) => <div key={i} className={cn("bg-white", Math.random() > 0.5 ? "opacity-100" : "opacity-10")} />)}
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Audit Trail</h4>
            <div className="space-y-3">
               {[
                 { label: "Meter Ingestion", date: "4.2s ago" },
                 { label: "AI Verification", date: "3.8s ago" },
                 { label: "Human Review", date: "2.1s ago" },
                 { label: "Settlement", date: "Current" },
               ].map((step, i) => (
                 <div key={i} className="flex justify-between items-center opacity-60">
                   <span className="text-[10px] font-medium">{step.label}</span>
                   <span className="text-[9px] font-bold">{step.date}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <footer className="mt-16 pt-12 border-t-2 border-navy flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
        <div className="flex gap-12">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase text-navy/40 tracking-widest font-mono">Signatory</span>
            <div className="font-syne font-bold italic border-b border-navy mt-2 pb-1">Blue Lifeline Protocol</div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase text-navy/40 tracking-widest font-mono">Seal</span>
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-accent flex items-center justify-center">
               <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 print:hidden">
          <button 
            onClick={() => window.print()}
            className="px-8 py-4 bg-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors shadow-xl"
          >
            Download PDF
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-4 border-2 border-navy text-navy text-xs font-bold uppercase tracking-widest hover:bg-navy hover:text-white transition-colors"
          >
            Exit Report
          </button>
        </div>
      </footer>
    </div>
  );
}
