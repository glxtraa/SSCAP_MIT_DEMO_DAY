import rainfallAverages from "./rainfall-averages.json";
import { SCHOOLS } from "./constants";
import { School } from "./types";

/**
 * Historical Volumetric Water Benefit (VWB) Simulation Engine
 * Based on 1996-2025 Precipitation Data (30-year daily average)
 * Formula: Replenishment (L) = Catchment (m2) * Rainfall (mm) * Efficiency
 */

const DEFAULT_CATCHMENT_M2 = 450; // Conservative school roof area
const COLLECTION_EFFICIENCY = 0.85;

// Seasonal Adjustment Multipliers (Relative to the historical 30-year average)
const SEASONAL_ADJUSTMENTS: Record<number, number> = {
  1: 0.1,  // Jan (Driest)
  2: 0.1,  // Feb
  3: 0.2,  // Mar
  4: 0.4,  // Apr
  5: 0.8,  // May
  6: 1.5,  // Jun (Wet Season Start)
  7: 2.2,  // Jul (Peak)
  8: 2.1,  // Aug
  9: 1.8,  // Sep
  10: 1.0, // Oct
  11: 0.3, // Nov
  12: 0.1, // Dec
};

export function getSimulatedVWB(dayOfYear: number): number {
  const index = Math.min(Math.max(0, dayOfYear - 1), 364);
  const mmRain = (rainfallAverages as number[])[index] || 0;
  
  // Apply seasonal curve correction to emphasize the "Wet/Dry" seasonality from search
  const date = new Date(new Date().getFullYear(), 0, dayOfYear);
  const month = date.getMonth() + 1;
  const mmAdjusted = mmRain * (SEASONAL_ADJUSTMENTS[month] || 1.0);
  
  const liters = DEFAULT_CATCHMENT_M2 * mmAdjusted * COLLECTION_EFFICIENCY;
  return Math.round(liters);
}

export function getQuarterlyBasinBenefit(basinId: string, quarter: number): number {
  // Aggregate daily benefits for the 3-month window
  const startMonth = (quarter - 1) * 3;
  const endMonth = startMonth + 3;
  let totalL = 0;

  // Approximate days (simplified for demo)
  const startDay = startMonth * 30;
  const endDay = Math.min(endMonth * 30, 365);

  const schoolsInBasin = SCHOOLS.filter(s => s.basinId === basinId);

  for (let d = startDay; d < endDay; d++) {
    totalL += getSimulatedVWB(d) * schoolsInBasin.length;
  }

  return totalL;
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
