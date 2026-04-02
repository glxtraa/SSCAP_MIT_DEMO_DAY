export interface School {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  municipality: string;
  state: string;
  studentCount: number;
  totalStorageL: number;
  basinId?: string;
  riskScore?: number;
}

export interface Metric {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
}
