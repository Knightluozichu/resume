"use client";

import { useState } from "react";

const designCases = [
  { label: "current need", evidence: "one concrete use case", design: "small direct implementation", option: "stable seam only around real external dependency", refactor: "characterization/unit tests", reject: "plugin framework for hypothetical variants" },
  { label: "second variant", evidence: "two real implementations differ", design: "extract named strategy/interface", option: "keep caller contract stable", refactor: "contract tests across both variants", reject: "copy branches across consumers" },
  { label: "uncertain scale", evidence: "load/range not measured", design: "instrument and cap before redesign", option: "configuration for bounded parameter", refactor: "benchmark and load regression", reject: "distributed architecture based on guesses" },
  { label: "legacy change", evidence: "behavior exists but tests are weak", design: "add characterization around touched path", option: "small reversible step", refactor: "golden/fault tests before cleanup", reject: "big-bang rewrite" },
  { label: "irreversible choice", evidence: "public schema/protocol/data migration", design: "explicit decision record and compatibility plan", option: "version field/adapter", refactor: "old/new consumer tests", reject: "YAGNI excuse for skipping migration design" },
];

export function CqcEvolutionLoopLab() {
  const [selected, setSelected] = useState(0);
  const item = designCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{designCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["evidence", item.evidence], ["design now", item.design], ["keep option", item.option], ["safety net", item.refactor]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">reject: {item.reject}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">按current evidence决定直接实现、抽象、instrument或migration design，并用tests保持refactoring option。</figcaption></figure>;
}

const testCases = [
  { label: "unit", scope: "one policy/value/component", asset: "test code beside production ownership", trigger: "every change", failure: "precise rule regression", maintenance: "refactor through public behavior" },
  { label: "contract", scope: "all interface/provider implementations", asset: "shared behavior suite", trigger: "provider or contract change", failure: "substitutability/compatibility break", maintenance: "version expected contract deliberately" },
  { label: "integration", scope: "database/filesystem/queue boundary", asset: "realistic fixture/container", trigger: "CI targeted/full pipeline", failure: "wiring, schema or transaction break", maintenance: "own cleanup and deterministic data" },
  { label: "UI journey", scope: "critical user path", asset: "stable selectors and test data", trigger: "smoke per change, broader scheduled", failure: "rendering/navigation/integration break", maintenance: "assert outcomes, not incidental layout" },
  { label: "production check", scope: "deployed health and synthetic path", asset: "monitor/runbook", trigger: "deploy and continuous", failure: "environment/config/runtime drift", maintenance: "safe idempotent probe with owner" },
];

export function CqcTestAssetLab() {
  const [selected, setSelected] = useState(0);
  const item = testCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{testCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["scope", item.scope], ["asset", item.asset], ["trigger", item.trigger], ["detects", item.failure]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">maintenance: {item.maintenance}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">把unit、contract、integration、UI journey和production checks作为同一版本化资产链。</figcaption></figure>;
}

const releaseCases = [
  { label: "attribute metadata", selector: "type/member carries stable capability/version metadata", owner: "composition root scans once", rollout: "deterministic selection by declared version", test: "duplicate/missing registration and each version", risk: "reflection magic hidden across assemblies" },
  { label: "feature flag", selector: "runtime audience/environment flag", owner: "product/operations with expiry", rollout: "percentage/cohort and instant rollback", test: "both branches plus stale flag cleanup", risk: "combinatorial permanent branches" },
  { label: "protocol version", selector: "request/payload explicit version", owner: "API/schema governance", rollout: "old/new coexist with migration deadline", test: "compatibility matrix and downgrade rejection", risk: "silent default chooses wrong semantics" },
  { label: "UI seam", selector: "stable role/test-id and observable state", owner: "UI component team", rollout: "first screen and every critical journey", test: "user outcome across supported viewport", risk: "selectors coupled to CSS/layout" },
  { label: "release gate", selector: "required checks and deployment evidence", owner: "service team", rollout: "promote only after gates", test: "unit/contract/integration/UI/smoke statuses", risk: "flaky gate normalized or bypassed" },
];

export function CqcVersionAutomationLab() {
  const [selected, setSelected] = useState(1);
  const item = releaseCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{releaseCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["selector", item.selector], ["owner", item.owner], ["rollout", item.rollout], ["test", item.test]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">risk: {item.risk}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较attribute、flag、protocol version、UI seam与release gate的selector、owner和cleanup contract。</figcaption></figure>;
}
