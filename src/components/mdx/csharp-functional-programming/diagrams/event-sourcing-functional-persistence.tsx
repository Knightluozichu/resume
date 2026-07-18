"use client";

import { CfpOfficialLab } from "./official-lab";

const storageCases = [
  { label: "overwrite", fields: [["stored form", "Latest mutable row"], ["history", "Requires separate audit/version mechanism"]] },
  { label: "snapshot", fields: [["stored form", "Immutable state versions"], ["history", "Direct reads, larger writes/version management"]] },
  { label: "events", fields: [["stored form", "Append-only domain facts"], ["history", "State is a fold; replay and evolution matter"]] },
  { label: "hybrid", fields: [["stored form", "Events plus periodic snapshots/projections"], ["history", "Operational speed with multiple consistency boundaries"]] },
] as const;

const foldCases = [
  { label: "initial", fields: [["input", "Empty event stream"], ["state", "Aggregate initial state"]] },
  { label: "apply", fields: [["input", "Current state + next event"], ["state", "Deterministic new state"]] },
  { label: "decide", fields: [["input", "Current state + command"], ["state", "New events or rejection"]] },
  { label: "replay", fields: [["input", "Historical ordered events"], ["state", "Same state if apply logic/versioning is compatible"]] },
] as const;

const architectureCases = [
  { label: "write", fields: [["path", "Load -> fold -> decide -> append with expected version"], ["risk", "Optimistic conflict/idempotency"]] },
  { label: "projection", fields: [["path", "Consume events -> update read model"], ["risk", "Lag, replay, duplicate delivery"]] },
  { label: "snapshot", fields: [["path", "Load snapshot + later events"], ["risk", "Schema/version and trust boundary"]] },
  { label: "migration", fields: [["path", "Upcast old event or evolve handlers"], ["risk", "Historical meaning must remain reproducible"]] },
] as const;

export function CfpImmutableStorageLab() { return <CfpOfficialLab cases={storageCases} caption="Overwrite, snapshots, events, and hybrid persistence preserve different information and impose different operational costs." tone="amber" />; }
export function CfpEventFoldLab() { return <CfpOfficialLab cases={foldCases} caption="Event sourcing separates deterministic state folding from command decisions and append effects." tone="emerald" />; }
export function CfpEventArchitectureLab() { return <CfpOfficialLab cases={architectureCases} caption="A production event-sourced system must close write concurrency, projection, snapshot, and evolution paths." tone="violet" />; }
