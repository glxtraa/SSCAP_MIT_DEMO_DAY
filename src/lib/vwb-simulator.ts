import rainfallAverages from "./rainfall-averages.json";

/**
 * Historical Volumetric Water Benefit (VWB) Simulation Engine
 * Based on 1996-2025 Precipitation Data (30-year daily average)
 * Formula: Replenishment (L) = Catchment (m2) * Rainfall (mm) * Efficiency
 */

const DEFAULT_CATCHMENT_M2 = 450; // Conservative school roof area
const COLLECTION_EFFICIENCY = 0.85;

export function getSimulatedVWB(dayOfYear: number): number {
  // Use dayOfYear (1-365) to index into our processed averages
  const index = Math.min(Math.max(0, dayOfYear - 1), 364);
  const mmRain = (rainfallAverages as number[])[index] || 0;
  
  // Calculate Liters
  const liters = DEFAULT_CATCHMENT_M2 * mmRain * COLLECTION_EFFICIENCY;
  return Math.round(liters);
}

export function getCurrentSeasonMetrics() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Return last 7 days of simulated benefit
  const history = Array.from({ length: 7 }, (_, i) => {
    const d = dayOfYear - (6 - i);
    return {
      day: d,
      benefitL: getSimulatedVWB(d),
    };
  });

  return {
    todayL: getSimulatedVWB(dayOfYear),
    weeklyTotalL: history.reduce((acc, curr) => acc + curr.benefitL, 0),
    history,
  };
}
