"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dynamic import for Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);

import { SCHOOLS } from "@/lib/constants";
import basinData from "@/lib/basins.geojson.json";
import { School } from "@/lib/types";
import { MapPin, Droplets, Users, ShieldCheck } from "lucide-react";

export default function MonitoringMap() {
  const [isMounted, setIsMounted] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    import("leaflet").then((leaflet) => {
      setL(leaflet);
      // Fix for Leaflet default icon path issues in Next.js
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });
  }, []);

  if (!isMounted || !L) {
    return (
      <div className="w-full h-[600px] bg-[#050C1A] flex items-center justify-center border border-[#00B0FF]/20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#00B0FF] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[#00B0FF] font-medium tracking-widest text-xs uppercase">Initializing Cartographic Engine...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full border border-border-brand group bg-navy">
      {/* Overlays - Desktop Only */}
      <div className="absolute top-4 right-4 z-[1000] hidden md:flex flex-col gap-2">
        <div className="bg-[#050C1A]/90 backdrop-blur-md border border-[#00B0FF]/30 p-3 flex flex-col gap-2">
          <h4 className="text-[10px] font-bold text-[#00B0FF] uppercase tracking-tighter">Layer Controls</h4>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked readOnly className="accent-[#00B0FF] w-3 h-3" />
            <span className="text-[10px] text-white/70">HydroBASINS L6</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked readOnly className="accent-[#00B0FF] w-3 h-3" />
            <span className="text-[10px] text-white/70">Aqueduct Water Risk</span>
          </label>
        </div>
      </div>

      <MapContainer
        center={[19.3, -98.9]}
        zoom={10}
        style={{ height: "100%", width: "100%", background: "#050C1A" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <GeoJSON
          data={basinData as any}
          style={(feature) => {
            const risk = feature?.properties?.AQUEDUCT_V4 || 0;
            const colors = {
              4: "#ef4444", // Extremely High (Red)
              3: "#f97316", // High (Orange)
              2: "#eab308", // Medium-High (Yellow)
              1: "#84cc16", // Low-Medium (Green)
              0: "#00B0FF"  // Standard
            };
            const color = colors[risk as keyof typeof colors] || colors[0];
            
            return {
              color: color,
              weight: 1.5,
              fillColor: color,
              fillOpacity: 0.15,
              dashArray: "3",
            };
          }}
          onEachFeature={(feature, layer) => {
            if (feature.properties && feature.properties.NAME) {
              layer.bindTooltip(`
                <div class="px-2 py-1 bg-[#050C1A] border border-[#00B0FF]/30 text-[10px]">
                  <div class="font-bold text-[#00B0FF] mb-0.5">${feature.properties.NAME}</div>
                  <div class="text-white/60">Risk Score: <span class="text-white font-mono">${feature.properties.RISK}</span></div>
                  <div class="text-white/60">Stress: <span class="text-red-400 font-bold">${feature.properties.STRESS_LEVEL}</span></div>
                </div>
              `, {
                sticky: true,
                className: "custom-basin-tooltip",
                opacity: 1
              });
            }
          }}
        />
        
        {SCHOOLS.map((school) => (
          <Marker key={school.id} position={[school.lat, school.lng]}>
            <Popup className="custom-popup">
              <div className="p-4 min-w-[200px] bg-[#050C1A] text-white border border-[#00B0FF]/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-[#00B0FF]/10 border border-[#00B0FF]/30">
                    <MapPin className="w-4 h-4 text-[#00B0FF]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-tight font-syne">{school.name}</h3>
                    <p className="text-[10px] text-[#00B0FF] tracking-widest">{school.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-white/40 font-bold">Storage</span>
                    <div className="flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-[#00B0FF]" />
                      <span className="text-xs font-mono font-bold text-white">{school.totalStorageL.toLocaleString()}L</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-white/40 font-bold">Beneficiaries</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#00B0FF]" />
                      <span className="text-xs font-mono">{school.studentCount}</span>
                    </div>
                  </div>
                </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase text-white/40 font-bold">Risk Context</span>
                    <div className="w-full h-1 bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-red-500" 
                        style={{ width: `${(school.riskScore || 0) * 20}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-red-400 font-bold">Rating: {school.riskScore} / 5.0</span>
                  </div>
                </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend - Mobile Friendly */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-dark/90 backdrop-blur-md border border-border-brand p-3 md:p-4">
        <h4 className="text-[9px] md:text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-2 md:mb-3 whitespace-nowrap">System Legend</h4>
        <div className="flex flex-col gap-1.5 md:gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent shadow-[0_0_8px_#00b0ff]"></div>
            <span className="text-[8px] md:text-[9px] text-white/70 uppercase font-bold tracking-tighter">Active SSCAP Nodes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 border border-accent bg-accent/20"></div>
            <span className="text-[8px] md:text-[9px] text-white/70 uppercase font-bold tracking-tighter">High Risk Basin (HydroBASINS L6)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
