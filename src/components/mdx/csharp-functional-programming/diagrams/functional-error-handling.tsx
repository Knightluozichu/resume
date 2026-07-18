"use client";

import { CfpOfficialLab } from "./official-lab";

const outcomeCases = [
  { label: "Option", fields: [["meaning", "Routine value absence"], ["consumer policy", "Fallback, skip, or not-found at owning boundary"]] },
  { label: "Either", fields: [["meaning", "Expected typed failure or success"], ["consumer policy", "Inspect Left/Right and translate explicitly"]] },
  { label: "Validation", fields: [["meaning", "Independent input errors"], ["consumer policy", "Accumulate all applicable failures"]] },
  { label: "exception", fields: [["meaning", "Unexpected defect/dependency failure"], ["consumer policy", "Preserve cause; handle at recovery boundary"]] },
] as const;

const chainCases = [
  { label: "right", fields: [["current", "Right<Customer>"], ["next", "Bind invokes the next operation"]] },
  { label: "left", fields: [["current", "Left<Error>"], ["next", "Bind skips later operations and preserves error"]] },
  { label: "map", fields: [["current", "Right<T> plus T -> R"], ["next", "Transforms success only"]] },
  { label: "recover", fields: [["current", "Known recoverable Left"], ["next", "Explicit policy converts or retries; not implicit catch-all"]] },
] as const;

const validationCases = [
  { label: "fail-fast", fields: [["shape", "Bind dependent validations"], ["client result", "First blocking error"]] },
  { label: "accumulate", fields: [["shape", "Apply independent validations"], ["client result", "All field errors"]] },
  { label: "HTTP", fields: [["shape", "Domain Error -> status/problem details"], ["client result", "Stable external contract"]] },
  { label: "unexpected", fields: [["shape", "Exception with cause/trace"], ["client result", "Generic response; internal diagnosis retained"]] },
] as const;

export function CfpOutcomeTaxonomyLab() { return <CfpOfficialLab cases={outcomeCases} caption="Absence, expected failure, validation, and unexpected exceptions require different information and owners." tone="rose" />; }
export function CfpFailureChainLab() { return <CfpOfficialLab cases={chainCases} caption="Either Bind continues only on Right; recovery is a separate policy decision." tone="amber" />; }
export function CfpValidationClientLab() { return <CfpOfficialLab cases={validationCases} caption="Dependency determines fail-fast versus accumulation; the delivery boundary translates domain errors without losing causes." tone="cyan" />; }
