"use client";

import { CfpOfficialLab } from "./official-lab";

const partCases = [
  { label: "Part 1", fields: [["chapters", "1-5: purity, signatures, patterns, composition"], ["exit evidence", "Pure core plus effect boundary"]] },
  { label: "Part 2", fields: [["chapters", "6-10: errors, applications, data, persistence"], ["exit evidence", "Typed outcomes and versioned state"]] },
  { label: "Part 3", fields: [["chapters", "11-15: lazy, state, async, Rx, messages"], ["exit evidence", "Effect lifecycle and concurrency policy"]] },
] as const;

const dependencyCases = [
  { label: "value", fields: [["foundation", "Functions and immutable values"], ["next capability", "Signatures expose dependencies"]] },
  { label: "compose", fields: [["foundation", "Map, Bind, Apply, fold"], ["next capability", "Programs assemble from small functions"]] },
  { label: "effect", fields: [["foundation", "Try, Task, Observable, agent"], ["next capability", "Timing and failure stay explicit"]] },
  { label: "operate", fields: [["foundation", "Version, capacity, replay, telemetry"], ["next capability", "Production evidence closes the loop"]] },
] as const;

const routeCases = [
  { label: "new", fields: [["route", "Read chapters 1-15 in order"], ["practice", "Run all prediction and lab gates"]] },
  { label: "domain", fields: [["route", "1-10, then chosen advanced effect"], ["practice", "Map one real workflow"]] },
  { label: "async", fields: [["route", "2, 4, 6, 8, 11, 13-15"], ["practice", "Trace cancellation and capacity"]] },
  { label: "review", fields: [["route", "Map -> 15 chapter gates -> final review"], ["practice", "Explain every boundary from memory"]] },
] as const;

export function CfpBookPartsLab() { return <CfpOfficialLab cases={partCases} caption="The first edition advances through three parts and fifteen official chapters." tone="cyan" />; }
export function CfpDependencyChainLab() { return <CfpOfficialLab cases={dependencyCases} caption="Values become compositions, compositions carry effects, and production gates make those effects observable." tone="emerald" />; }
export function CfpReadingRouteLab() { return <CfpOfficialLab cases={routeCases} caption="Choose a route by current evidence, while preserving every prerequisite boundary." tone="amber" />; }
