"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import DemoJourney from "@/components/DemoJourney";

export default function Home() {
  return (
    <div className="flex bg-navy min-h-screen text-white font-dm-sans selection:bg-accent selection:text-navy">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <DemoJourney />
        </main>
      </div>
    </div>
  );
}
