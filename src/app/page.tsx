"use client";

import { motion } from "framer-motion";
import { 
  Droplets, 
  School, 
  Map as MapIcon, 
  ShieldCheck, 
  ArrowUpRight,
  Activity,
  Trees,
  CloudRain
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MonitoringMap from "@/components/MonitoringMap";
import { SCHOOLS } from "@/lib/constants";

const stats = [
  { label: "Total WBT Issued", value: "1,240,500", unit: "m³", icon: Droplets, color: "text-accent" },
  { label: "Active School Projects", value: "42", unit: "sites", icon: School, color: "text-sky" },
  { label: "Verified Water Benefit", value: "85.2", unit: "GL", icon: Trees, color: "text-green-400" },
  { label: "Avg. Basin Risk", value: "3.2", unit: "/ 5", icon: ShieldCheck, color: "text-orange-400" },
];

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-dark border border-border-brand p-12">
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-syne font-bold uppercase tracking-widest mb-6"
          >
            <Activity className="w-3 h-3" />
            Live Network Status: Operational
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-syne font-extrabold tracking-tight mb-6 leading-[1.1]"
          >
            Become Water <span className="text-accent">Positive.</span><br />
            Measurable. Verified. Auditable.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted mb-10 max-w-lg leading-relaxed"
          >
            Blue Lifeline is the standard for corporate water sustainability, 
            connecting institutional demand to verified, IoT-metered water 
            replenishment projects in high-risk basins.
          </motion.p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/admin">
              <button className="px-8 py-4 bg-accent text-navy font-syne font-extrabold text-sm uppercase tracking-wider hover:bg-white transition-colors">
                Explore Projects
              </button>
            </Link>
            <Link href="/buyer">
              <button className="px-8 py-4 border border-white text-white font-syne font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-navy transition-colors">
                Acquire WBTs
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative Water Ring */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full border border-accent/5 pointer-events-none" />
        <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full border border-accent/10 pointer-events-none" />
        <div className="absolute right-20 top-20 w-32 h-32 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-dark border border-border-brand p-6 hover:border-accent/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={cn("w-6 h-6", stat.color)} />
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-syne font-extrabold tracking-tight">
                {stat.value}<span className="text-sm font-dm-sans font-medium text-muted ml-1">{stat.unit}</span>
              </span>
              <span className="text-xs text-muted font-syne font-semibold uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Secondary Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-dark border border-border-brand p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-syne font-bold uppercase tracking-tight flex items-center gap-3">
              <MapIcon className="w-5 h-5 text-accent" />
              Basin Localization Index
            </h3>
            <button className="text-xs text-sky font-bold font-syne uppercase tracking-widest hover:text-white transition-colors">
              View Global Map
            </button>
          </div>
          
          <MonitoringMap />
        </section>

        <section className="bg-dark border border-border-brand p-8">
          <h3 className="text-xl font-syne font-bold uppercase tracking-tight flex items-center gap-3 mb-8">
            <CloudRain className="w-5 h-5 text-accent" />
            Live Ingestion
          </h3>
          
          <div className="space-y-4">
            {SCHOOLS.slice(0, 5).map((school, i) => (
              <div key={school.id} className="flex items-center gap-4 p-3 bg-navy border border-border-brand hover:border-accent/30 transition-colors cursor-pointer group">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-bold font-syne truncate uppercase group-hover:text-accent transition-colors">
                    {school.id}
                  </span>
                  <span className="text-[10px] text-muted uppercase tracking-wider truncate">
                    {school.name}
                  </span>
                </div>
                <div className="text-[10px] font-bold text-accent font-syne whitespace-nowrap">
                  +{((i + 1) * 0.12).toFixed(2)} m³
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-3 border border-border-brand text-[10px] font-syne font-bold uppercase tracking-widest text-muted hover:text-white hover:border-accent transition-colors">
            View All Ingestion Logs
          </button>
        </section>
      </div>
    </div>
  );
}
