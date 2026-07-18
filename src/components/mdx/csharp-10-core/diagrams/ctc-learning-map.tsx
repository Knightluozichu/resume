"use client";

import { CtcOfficialLab } from "./official-lab";

const routeCases = [
  { label: "language", fields: [["chapters", "1-4"], ["gate", "Syntax, types, delegates, patterns, unsafe"]] },
  { label: ".NET/data", fields: [["chapters", "5-11"], ["gate", "BCL, collections, LINQ, XML, JSON"]] },
  { label: "runtime", fields: [["chapters", "12-17"], ["gate", "Lifetime, diagnostics, async, I/O, network, assemblies"]] },
  { label: "advanced", fields: [["chapters", "18-25"], ["gate", "Metadata, crypto, threading, memory, interop, regex"]] },
] as const;

const contractCases = [
  { label: "type", fields: [["question", "What values and invariants exist?"], ["proof", "Compile tests and boundary examples"]] },
  { label: "owner", fields: [["question", "Who releases memory/resource/work?"], ["proof", "Fault and cancellation matrix"]] },
  { label: "boundary", fields: [["question", "What crosses process/data/API edges?"], ["proof", "Version, limits, security tests"]] },
  { label: "evidence", fields: [["question", "How is behavior observed?"], ["proof", "Trace, benchmark, heap, round trip"]] },
] as const;

const cadenceCases = [
  { label: "predict", fields: [["activity", "State an expected outcome"], ["artifact", "One falsifiable claim"]] },
  { label: "trace", fields: [["activity", "Draw state, owner, and boundary"], ["artifact", "Timeline or ledger"]] },
  { label: "break", fields: [["activity", "Inject invalid/fault/race input"], ["artifact", "Failure evidence"]] },
  { label: "transfer", fields: [["activity", "Apply contract to a new case"], ["artifact", "Small implementation and review"]] },
] as const;

export function CtcMapRouteLab() { return <CtcOfficialLab cases={routeCases} caption="The 25 official chapters progress from language rules through data and runtime services to low-level boundaries." tone="cyan" />; }
export function CtcMapContractLab() { return <CtcOfficialLab cases={contractCases} caption="Type, owner, boundary, and evidence form a reusable reading lens across every chapter." tone="violet" />; }
export function CtcMapCadenceLab() { return <CtcOfficialLab cases={cadenceCases} caption="Each chapter is learned by prediction, tracing, failure injection, and transfer rather than passive reading." tone="amber" />; }
