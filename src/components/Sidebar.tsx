"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Waves, 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardCheck, 
  ShoppingBag, 
  FileText,
  Settings,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", icon: PlusCircle, href: "/admin", role: "Admin" },
  { name: "Certification", icon: ClipboardCheck, href: "/reviewer", role: "Reviewer" },
  { name: "Marketplace", icon: ShoppingBag, href: "/buyer", role: "Buyer" },
  { name: "Reports", icon: FileText, href: "/reports" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-navy border-r border-border-brand h-full">
      <div className="flex items-center h-20 px-6 gap-3">
        <Waves className="w-8 h-8 text-accent shrink-0" />
        <span className="font-syne font-extrabold text-xl tracking-tight">
          Blue<span className="text-accent">Lifeline</span>
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors group",
                isActive 
                  ? "bg-dark text-accent border border-border-brand"
                  : "text-muted hover:text-white hover:bg-dark/50"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                isActive ? "text-accent" : "text-muted group-hover:text-white"
              )} />
              <div className="flex flex-col">
                <span>{item.name}</span>
                {item.role && (
                  <span className="text-[10px] text-sky font-syne font-semibold uppercase tracking-widest leading-none mt-0.5">
                    {item.role}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border-brand">
        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted hover:text-white cursor-pointer">
          <HelpCircle className="w-5 h-5" />
          <span>Support</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted hover:text-white cursor-pointer">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
