"use client";

import { CtcOfficialLab } from "./official-lab";

const signalCases = [
  { label: "log", fields: [["answers", "What happened to one operation"], ["cost", "Volume, cardinality, sensitive payload"]] },
  { label: "metric", fields: [["answers", "How often and how much"], ["cost", "Aggregation hides individual context"]] },
  { label: "trace", fields: [["answers", "Where latency and causality flow"], ["cost", "Sampling and instrumentation overhead"]] },
  { label: "dump", fields: [["answers", "What runtime state was retained"], ["cost", "Large, sensitive, point-in-time capture"]] },
] as const;

const stackCases = [
  { label: "hot CPU", fields: [["evidence", "Sampled stacks by thread"], ["decision", "Find repeated hot frames and callers"]] },
  { label: "hang", fields: [["evidence", "All thread stacks + waits"], ["decision", "Build wait-for graph and owner chain"]] },
  { label: "crash", fields: [["evidence", "Exception, modules, dump stack"], ["decision", "Match first fault and build identity"]] },
  { label: "child process", fields: [["evidence", "PID, exit, stdout/stderr"], ["decision", "Separate launch, I/O, and exit failures"]] },
] as const;

const toolCases = [
  { label: "dotnet-counters", fields: [["capture", "Live runtime/event counters"], ["gate", "Low-cost trend and incident trigger"]] },
  { label: "dotnet-trace", fields: [["capture", "Time-bounded EventPipe trace"], ["gate", "CPU, GC, exceptions, custom providers"]] },
  { label: "dotnet-dump", fields: [["capture", "Managed dump and heap/stacks"], ["gate", "Retention, crash, deadlock evidence"]] },
  { label: "dotnet-gcdump", fields: [["capture", "Managed heap graph summary"], ["gate", "Type growth before full dump"]] },
] as const;

export function CtcDiagnosticSignalLab() { return <CtcOfficialLab cases={signalCases} caption="Choose logs, metrics, traces, or dumps by the question they answer and the cost of collecting them." tone="cyan" />; }
export function CtcProcessStackLab() { return <CtcOfficialLab cases={stackCases} caption="Process, thread, stack, and wait evidence turn CPU, hangs, and crashes into testable hypotheses." tone="violet" />; }
export function CtcDiagnosticToolchainLab() { return <CtcOfficialLab cases={toolCases} caption="A cross-platform escalation ladder starts with counters and advances to bounded traces or dumps." tone="amber" />; }
