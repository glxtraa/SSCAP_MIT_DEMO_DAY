"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Transaction {
  id: string;
  type: "Issuance" | "Retirement" | "Transfer";
  amount: number;
  schoolId?: string;
  timestamp: string;
  txHash: string;
  status: "Confirmed" | "Pending" | "Finalized";
}

interface LedgerState {
  balance: number;
  transactions: Transaction[];
  issueTokens: (amount: number, schoolId: string) => void;
  retireTokens: (amount: number, schoolId: string) => void;
}

export const useLedger = create<LedgerState>()(
  persist(
    (set) => ({
      balance: 1240.5, // Initial realistic balance
      transactions: [],
      
      issueTokens: (amount, schoolId) => set((state) => {
        const newTx: Transaction = {
          id: `TX-${Date.now()}`,
          type: "Issuance",
          amount,
          schoolId,
          timestamp: new Date().toISOString(),
          txHash: "0x" + Math.random().toString(16).slice(2, 42),
          status: "Confirmed",
        };
        return {
          balance: state.balance + amount,
          transactions: [newTx, ...state.transactions],
        };
      }),

      retireTokens: (amount, schoolId) => set((state) => {
        const newTx: Transaction = {
          id: `TX-${Date.now()}`,
          type: "Retirement",
          amount,
          schoolId,
          timestamp: new Date().toISOString(),
          txHash: "0x" + Math.random().toString(16).slice(2, 42),
          status: "Finalized",
        };
        return {
          balance: state.balance - amount,
          transactions: [newTx, ...state.transactions],
        };
      }),
    }),
    {
      name: "blue-lifeline-ledger",
    }
  )
);
