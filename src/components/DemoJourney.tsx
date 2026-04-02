"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Map as MapIcon, 
  Activity, 
  ClipboardCheck, 
  Database, 
  ShoppingBag,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import MonitoringMap from "./MonitoringMap";
import IngestionFeed from "./IngestionFeed";
import ReviewerWorkspace from "./ReviewerWorkspace";
import LedgerView from "./LedgerView";
import BuyerPortal from "./BuyerPortal";

const steps = [
  { id: "monitor", name: "Monitor", icon: MapIcon, color: "text-blue-400" },
  { id: "ingest", name: "Ingest", icon: Activity, color: "text-emerald-400" },
  { id: "certify", name: "Certify", icon: ClipboardCheck, color: "text-amber-400" },
  { id: "ledger", name: "Ledger", icon: Database, color: "text-purple-400" },
  { id: "retire", name: "Retire", icon: ShoppingBag, color: "text-[#00B0FF]" },
];

export default function DemoJourney() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-navy">
      {/* Step Indicator */}
      <div className="px-6 py-4 bg-dark/50 border-b border-border-brand">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border-brand -translate-y-1/2 z-0" />
          <motion.div 
            className="absolute top-1/2 left-0 h-[2px] bg-accent -translate-y-1/2 z-0"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <button
                  onClick={() => setCurrentStep(idx)}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center transition-all duration-500",
                    "border-2 rounded-none bg-navy",
                    isActive ? "border-accent scale-110 shadow-[0_0_15px_rgba(0,176,255,0.3)]" : 
                    isCompleted ? "border-accent/60" : "border-border-brand"
                  )}
                >
                  <step.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-accent" : isCompleted ? "text-accent/60" : "text-muted"
                  )} />
                </button>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em] font-syne hidden md:block",
                  isActive ? "text-accent" : "text-muted"
                )}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[currentStep].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full w-full"
          >
            {currentStep === 0 && <MonitoringMap />}
            {currentStep === 1 && <IngestionFeed />}
            {currentStep === 2 && <ReviewerWorkspace />}
            {currentStep === 3 && <LedgerView />}
            {currentStep === 4 && <BuyerPortal />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="px-10 py-6 bg-dark border-t border-border-brand flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-3 border border-border-brand text-muted uppercase text-xs font-bold tracking-widest hover:text-white disabled:opacity-0 transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-muted uppercase tracking-widest mb-1">Step {currentStep + 1} of 5</span>
          <div className="text-sm font-syne font-bold text-accent uppercase tracking-tighter">
            {steps[currentStep].name} Stage
          </div>
        </div>

        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-2 px-8 py-3 bg-accent text-navy uppercase text-xs font-bold tracking-widest hover:bg-white transition-all disabled:opacity-0"
        >
          Next Stage <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
