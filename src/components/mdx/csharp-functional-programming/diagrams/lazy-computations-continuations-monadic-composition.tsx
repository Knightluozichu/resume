"use client";

import { CfpOfficialLab } from "./official-lab";

const lazyCases = [
  { label: "eager", fields: [["creation", "Dependency executes immediately"], ["evidence", "Counter changes even when value is unused"]] },
  { label: "deferred", fields: [["creation", "A function describes the computation"], ["evidence", "Each invocation executes it again"]] },
  { label: "memoized", fields: [["creation", "Lazy<T> owns one evaluation cell"], ["evidence", "Successful value or failure policy is shared"]] },
  { label: "concurrent", fields: [["creation", "Callers race for the same value"], ["evidence", "Publication mode decides duplicate execution"]], alert: "Thread safety and exception caching are part of the contract." },
] as const;

const tryCases = [
  { label: "success", fields: [["Try result", "Success(value)"], ["continuation", "Map and Bind may continue"]] },
  { label: "expected", fields: [["Try result", "Failure(typed cause)"], ["continuation", "Short-circuit and translate at boundary"]] },
  { label: "throw", fields: [["Try result", "Capture only at explicit adapter"], ["continuation", "Preserve cause and stack evidence"]] },
  { label: "cancel", fields: [["Try result", "Cancellation is not generic failure"], ["continuation", "Propagate cancellation semantics"]], alert: "Catching every exception turns cancellation and fatal faults into misleading domain failures." },
] as const;

const middlewareCases = [
  { label: "open", fields: [["resource", "Acquire connection in outer scope"], ["next", "Pass capability to inner computation"]] },
  { label: "begin", fields: [["resource", "Create transaction"], ["next", "Execute business continuation"]] },
  { label: "commit", fields: [["resource", "Commit only on successful result"], ["next", "Return the original value"]] },
  { label: "rollback", fields: [["resource", "Rollback on failure or cancellation"], ["next", "Dispose in a finally-equivalent boundary"]], alert: "The resource lifetime must enclose every deferred operation." },
] as const;

export function CfpLazyEvaluationLab() { return <CfpOfficialLab cases={lazyCases} caption="Eager, deferred, memoized, and concurrent evaluation have different observable contracts." tone="amber" />; }
export function CfpTryContinuationLab() { return <CfpOfficialLab cases={tryCases} caption="Try turns an exception-producing boundary into a composable continuation only when the outcome taxonomy stays explicit." tone="rose" />; }
export function CfpDbMiddlewareLab() { return <CfpOfficialLab cases={middlewareCases} caption="Database middleware composes acquisition, transaction, outcome, and disposal around one continuation." tone="emerald" />; }
