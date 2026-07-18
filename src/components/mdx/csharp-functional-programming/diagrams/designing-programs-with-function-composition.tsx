"use client";

import { CfpOfficialLab } from "./official-lab";

const compositionCases = [
  { label: "aligned", fields: [["left output", "Customer"], ["right input", "Customer: functions compose directly"]] },
  { label: "mismatch", fields: [["left output", "Option<Customer>"], ["right input", "Customer: requires Map/Bind, not ordinary composition"]] },
  { label: "effect", fields: [["left output", "Command/IO result"], ["right input", "Pure decision should not silently execute the effect"]] },
  { label: "adapter", fields: [["left output", "External DTO"], ["right input", "Domain value after explicit validation/mapping"]] },
] as const;

const workflowCases = [
  { label: "parse", fields: [["input/output", "Request DTO -> Either<Error,Command>"], ["owner", "Boundary adapter"]] },
  { label: "decide", fields: [["input/output", "State + Command -> Events"], ["owner", "Pure domain core"]] },
  { label: "persist", fields: [["input/output", "Events -> storage result"], ["owner", "Effect interpreter"]] },
  { label: "respond", fields: [["input/output", "Outcome -> HTTP response"], ["owner", "Delivery boundary"]] },
] as const;

const architectureCases = [
  { label: "functional core", fields: [["contains", "Validation, calculation, state transition"], ["acceptance", "Deterministic values and property tests"]] },
  { label: "imperative shell", fields: [["contains", "Clock, DB, network, logging"], ["acceptance", "Explicit commands, retries, cleanup, observability"]] },
  { label: "composition root", fields: [["contains", "Concrete dependencies partially applied into workflow"], ["acceptance", "One visible wiring location"]] },
  { label: "end to end", fields: [["contains", "Request through response"], ["acceptance", "Normal, invalid, dependency-fault, and repeat paths"]] },
] as const;

export function CfpCompositionAlignmentLab() {
  return <CfpOfficialLab cases={compositionCases} caption="Function composition is type alignment; context values require the matching combinator and effects require an interpreter." tone="emerald" />;
}

export function CfpWorkflowDataflowLab() {
  return <CfpOfficialLab cases={workflowCases} caption="A workflow becomes reviewable when every stage has a named input, output, owner, and failure channel." tone="cyan" />;
}

export function CfpFunctionalCoreShellLab() {
  return <CfpOfficialLab cases={architectureCases} caption="A functional core produces decisions as values; an imperative shell owns external changes and operational policy." tone="rose" />;
}
