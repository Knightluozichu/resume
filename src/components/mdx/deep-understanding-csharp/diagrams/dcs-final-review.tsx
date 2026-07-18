"use client";

import { DcsOfficialLab } from "./official-lab";

const systemCases = [
  { label: "public SDK", fields: [["highest risk", "Versioned API shape, tuple names, nullable contracts, named arguments"], ["evidence", "Old/new compiler and consumer compatibility matrix"]] },
  { label: "data pipeline", fields: [["highest risk", "LINQ execution, iterator lifetime, async flow, partial failure"], ["evidence", "Enumeration/state-machine trace with fault injection"]] },
  { label: "interop host", fields: [["highest risk", "dynamic binding, optional/named calls, variance, exception ownership"], ["evidence", "Runtime binder and boundary adapter cases"]] },
  { label: "hot parser", fields: [["highest risk", "Tuple shape, deconstruction, ref aliases, Span lifetime"], ["evidence", "Correctness, escape, allocation, and benchmark suite"]] },
] as const;

const chainCases = [
  { label: "type", fields: [["path", "Generics -> inference/LINQ -> dynamic/variance -> tuples/patterns -> nullable references"], ["gate", "Invalid states are rejected at the earliest type or adapter boundary"]] },
  { label: "execution", fields: [["path", "Delegate/iterator -> query -> async method/state machine -> filters -> async stream"], ["gate", "Timing, count, thread/context, cancellation, and cleanup are observable"]] },
  { label: "shape", fields: [["path", "Initializers/properties -> formatting -> tuples/deconstruction -> recursive patterns"], ["gate", "Position, names, culture, invariants, and unknown cases remain explicit"]] },
  { label: "memory", fields: [["path", "Value copies -> generated state -> in/readonly -> ref returns/ref-like views"], ["gate", "Alias permission, referent lifetime, copy cost, and measurement all agree"]] },
] as const;

const releaseCases = [
  { label: "identity", fields: [["evidence", "Jon Skeet, Manning, fourth edition, March 2019, ISBN 9781617294532"], ["reject", "Mixed edition, records inserted into Chapter 11, or invented units"]] },
  { label: "content", fields: [["evidence", "17 active pages, all 15 official chapters and mapped concepts"], ["reject", "Old topic samples or missing chapter-level practice"]] },
  { label: "learning", fields: [["evidence", "Three unique labs, three exercises, traps, terms, and summaries per page"], ["reject", "Decorative reuse or answer-only reading"]] },
  { label: "engineering", fields: [["evidence", "Navigation, MDX, type, targeted lint, and diff checks"], ["reject", "Production build used as the first parser test"]] },
  { label: "promotion", fields: [["evidence", "Book and chapter score 100; global 225-book gate still enforced"], ["reject", "Partial push or deploy before the full library completes"]] },
] as const;

export function DcsWholeBookSystemLab() {
  return <DcsOfficialLab cases={systemCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Whole-book review applies all fifteen chapters to one system boundary instead of recalling isolated syntax." tone="amber" />;
}

export function DcsConceptChainLab() {
  return <DcsOfficialLab cases={chainCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Four horizontal chains expose the connections that a version-by-version reading can hide." tone="violet" />;
}

export function DcsReleaseEvidenceLab() {
  return <DcsOfficialLab cases={releaseCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Identity, content, learning, engineering, and promotion evidence must converge before this book is considered complete." tone="rose" />;
}
