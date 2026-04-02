import { SCHOOLS } from "./constants";

/**
 * Blue Lifeline AI Modules Implementation
 * Simulated logic for MIT Demo Day
 */

export interface AIAnalysisResult {
  module: string;
  verdict: "PASS" | "WARN" | "FAIL";
  reasoning: string;
  confidence: number;
}

export const getAIOpinion = (schoolId: string, module: string): AIAnalysisResult => {
  const school = SCHOOLS.find(s => s.id === schoolId);
  
  if (!school) {
    return {
      module,
      verdict: "FAIL",
      reasoning: "School record not found in central registry.",
      confidence: 0,
    };
  }

  switch (module) {
    case "Evidence Copilot":
      return {
        module,
        verdict: "PASS",
        reasoning: `Verified sensor serial numbers in PCV Report for ${school.name}. Discharge rates align with historical average (1996-2025).`,
        confidence: 0.94,
      };
    case "VWBA Assistant":
      return {
        module,
        verdict: "PASS",
        reasoning: "Deterministic calculation verified against SSCAP V4 methodology. Net replenishment volume > 0.1 m³ threshold.",
        confidence: 0.99,
      };
    case "Deduplication Layer":
      return {
        module,
        verdict: "PASS",
        reasoning: "Zero collisions detected on Base Mainnet for coordinates 19.3N, 98.9W. Timestamp sequence is monotonically increasing.",
        confidence: 1.0,
      };
    case "Issuance Engine":
      return {
        module,
        verdict: "PASS",
        reasoning: "Automatic minting conditions met. Generating 125 WBT tokens (m³) for the current reporting period.",
        confidence: 1.0,
      };
    default:
      return {
        module,
        verdict: "WARN",
        reasoning: "Module response timeout. Using fallback deterministic rules.",
        confidence: 0.5,
      };
  }
};

export const getRetirementNarrative = (schoolId: string, amount: number) => {
  const school = SCHOOLS.find(s => s.id === schoolId);
  return `This retirement prevents water scarcity for ${school?.studentCount} students at ${school?.name} in the high-risk ${school?.municipality} region. By funding this benefit, you are directly offsetting local industrial extraction with verified replenishment.`;
};
