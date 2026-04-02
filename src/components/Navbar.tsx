"use client";

import { 
  Bell, 
  Search, 
  User, 
  ShieldCheck, 
  ExternalLink,
  Droplets
} from "lucide-react";
import { useLedger } from "@/lib/ledger-store";
import { useEffect, useState } from "react";

export function Navbar() {
  const { balance } = useLedger();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <header className="h-20 bg-navy border-b border-border-brand px-8 flex items-center justify-between">
      <div className="flex items-center gap-6 max-w-xl w-full">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search projects, basins, or transactions..."
            className="w-full bg-dark border border-border-brand pl-10 pr-4 py-2 text-sm text-white placeholder:text-muted focus:outline-hidden focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 px-4 border-r border-border-brand mr-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-accent font-syne font-semibold uppercase tracking-widest leading-none">
              Network Status
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#10b981]" />
              <span className="text-xs font-medium">Base Mainnet</span>
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-3 py-1.5 bg-dark border border-border-brand hover:border-accent transition-colors group">
            <Droplets className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-syne">
              {Math.floor(balance).toLocaleString()} WBT
            </span>
          </button>
        </div>

        <button className="p-2 text-muted hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border-brand ml-2">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold">Demo User</span>
            <span className="text-xs text-muted">Admin Console</span>
          </div>
          <div className="w-10 h-10 bg-dark border border-border-brand flex items-center justify-center group cursor-pointer hover:border-accent transition-colors">
            <User className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
}
