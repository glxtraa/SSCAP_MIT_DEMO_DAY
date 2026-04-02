"use client";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-navy overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-10 py-8 bg-[#020810]">
          {children}
        </main>
      </div>
    </div>
  );
}
