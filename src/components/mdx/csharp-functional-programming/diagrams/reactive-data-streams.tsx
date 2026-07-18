"use client";

import { CfpOfficialLab } from "./official-lab";

const observableCases = [
  { label: "next", fields: [["signal", "OnNext(value)"], ["contract", "Zero or more ordered values"]] },
  { label: "error", fields: [["signal", "OnError(cause)"], ["contract", "Terminal; no later values"]] },
  { label: "complete", fields: [["signal", "OnCompleted()"], ["contract", "Terminal successful end"]] },
  { label: "dispose", fields: [["signal", "Unsubscribe"], ["contract", "Stop resource ownership and callbacks"]], alert: "Terminal signals and disposal are different lifecycle events." },
] as const;

const operatorCases = [
  { label: "select", fields: [["operator", "Map each value"], ["question", "Is transformation pure and cheap?"]] },
  { label: "where", fields: [["operator", "Filter values"], ["question", "Does predicate preserve required events?"]] },
  { label: "merge", fields: [["operator", "Interleave sources"], ["question", "Is cross-source order meaningful?"]] },
  { label: "switch", fields: [["operator", "Observe latest inner source"], ["question", "Should stale work be unsubscribed?"]] },
] as const;

const temporalCases = [
  { label: "buffer", fields: [["state", "Collect count/time window"], ["output", "Batch of events"]] },
  { label: "scan", fields: [["state", "Fold event into running state"], ["output", "Every intermediate state"]] },
  { label: "timeout", fields: [["state", "Track silence deadline"], ["output", "Fallback or terminal error"]] },
  { label: "retry", fields: [["state", "Resubscribe under policy"], ["output", "May repeat source effects"]], alert: "Retry is safe only when subscription effects are repeatable or idempotent." },
] as const;

export function CfpObservableContractLab() { return <CfpOfficialLab cases={observableCases} caption="IObservable has three notification channels plus a separate subscription ownership lifecycle." tone="rose" />; }
export function CfpRxOperatorLab() { return <CfpOfficialLab cases={operatorCases} caption="Select, Where, Merge, and Switch encode different ordering and cancellation contracts." tone="emerald" />; }
export function CfpTemporalLogicLab() { return <CfpOfficialLab cases={temporalCases} caption="Temporal operators make cross-event state explicit, but retries and windows still need operational policy." tone="amber" />; }
