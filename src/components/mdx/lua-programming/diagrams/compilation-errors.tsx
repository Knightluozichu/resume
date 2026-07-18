"use client";

import { LuaOfficialLab } from "./official-lab";

const loadCases = [
  { label: "load", fields: [["Input", "String or reader function"], ["Output", "Compiled function, or nil plus syntax error"], ["Boundary", "Compilation does not execute the chunk"]] },
  { label: "loadfile", fields: [["Input", "File path, mode, environment"], ["Output", "Compiled chunk function or load error"], ["Boundary", "Caller owns the later execution and result contract"]] },
  { label: "dofile", fields: [["Input", "File path"], ["Output", "Executed chunk results"], ["Boundary", "Load/runtime errors propagate; environment control is limited"]] },
  { label: "binary chunk", fields: [["Input", "string.dump output or other bytecode"], ["Output", "A loaded function for a compatible runtime"], ["Boundary", "Not portable and unsafe from untrusted sources"]], alert: "Loading and running are separate phases. Code can compile successfully yet fail immediately when the returned function is called." },
] as const;

const protectedCases = [
  { label: "Direct call", fields: [["Failure", "Error propagates to the nearest protected boundary"], ["Results", "Normal multiple results on success"], ["Use", "Internal code when the caller owns policy"]] },
  { label: "pcall", fields: [["Failure", "Returns false plus the error object"], ["Results", "Returns true followed by all function results"], ["Use", "Convert one call boundary to a status protocol"]] },
  { label: "xpcall", fields: [["Failure", "Message handler runs while the failing stack is available"], ["Results", "Status plus normal or handled error results"], ["Use", "Attach traceback and structured context"]] },
  { label: "assert/error", fields: [["Failure", "Raise an error object with a chosen blame level"], ["Results", "assert returns its arguments when the first is truthy"], ["Use", "Enforce programmer or boundary invariants deliberately"]], alert: "pcall does not make a failure successful. It changes propagation into data, so the caller must branch on the status before reading result positions." },
] as const;

const tracebackCases = [
  { label: "Capture", fields: [["Moment", "Inside an xpcall message handler"], ["Evidence", "Original stack plus the error object"], ["Risk", "Capturing after pcall sees an already unwound stack"]] },
  { label: "Annotate", fields: [["Moment", "At service/module boundaries"], ["Evidence", "Operation ID and stable context, not secrets"], ["Risk", "Stringifying arbitrary error objects can itself fail"]] },
  { label: "Cleanup", fields: [["Moment", "After protected execution, on success and failure"], ["Evidence", "Close outcome combined with primary error"], ["Risk", "Cleanup error must not silently erase the original failure"]] },
  { label: "Rethrow", fields: [["Moment", "After policy/logging decides not to recover"], ["Evidence", "Preserved traceback or structured cause chain"], ["Risk", "A new error() call can shift blame and duplicate formatting"]], alert: "A traceback is diagnostic evidence, not a user-facing error contract. It can contain paths, data, and implementation details that require redaction." },
] as const;

export function PilLoadPipelineLab() {
  return <LuaOfficialLab cases={loadCases} caption="load, loadfile, dofile, and binary chunks differ in input source, execution timing, environment control, and trust." tone="cyan" />;
}

export function PilProtectedCallLab() {
  return <LuaOfficialLab cases={protectedCases} caption="Direct calls propagate errors; pcall and xpcall convert a chosen boundary into an explicit status and result protocol." tone="violet" />;
}

export function PilTracebackLab() {
  return <LuaOfficialLab cases={tracebackCases} caption="Reliable diagnostics capture the live failing stack, annotate safely, clean resources, and preserve the primary cause." tone="rose" />;
}
