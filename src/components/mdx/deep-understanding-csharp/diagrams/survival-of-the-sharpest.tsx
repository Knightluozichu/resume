"use client";

import { DcsOfficialLab, type OfficialLabCase } from "./official-lab";

const evolutionCases: OfficialLabCase[] = [
  { label: "language", fields: [["pressure", "express intent with less ceremony"], ["response", "generics, LINQ, async and concise syntax"], ["compatibility", "old source and binaries remain valuable"], ["evidence", "compare equivalent code by language version"]] },
  { label: "platform", fields: [["pressure", "Windows-only framework limits reach"], ["response", ".NET Core and shared standards"], ["compatibility", "language and runtime versions are separate axes"], ["evidence", "record target framework and runtime behavior"]] },
  { label: "community", fields: [["pressure", "closed design slows feedback"], ["response", "open proposals, compilers and libraries"], ["compatibility", "discussion is not a shipped specification"], ["evidence", "trace proposal to spec and compiler version"]] },
  { label: "book", fields: [["pressure", "readers arrive with mixed experience"], ["response", "version journey plus focused deep dives"], ["compatibility", "examples teach language, not full production systems"], ["evidence", "reproduce snippets and inspect generated behavior"]] },
];

export function DcsEvolutionContextLab() {
  return <DcsOfficialLab cases={evolutionCases} tone="cyan" caption="语言、平台、社区和书本同时演进，但各自有不同版本与证据边界。" />;
}

const pressureCases: OfficialLabCase[] = [
  { label: "type system", fields: [["goal", "reject invalid relationships early"], ["example", "generic type safety and nullable intent"], ["cost", "more rules and diagnostics"], ["test", "positive and negative compile cases"]] },
  { label: "concision", fields: [["goal", "remove ceremony without hiding semantics"], ["example", "properties, lambdas, expression bodies"], ["cost", "dense syntax can obscure lifetime"], ["test", "expand to the generated or equivalent form"]] },
  { label: "LINQ", fields: [["goal", "compose data transformations"], ["example", "query operators and expression trees"], ["cost", "execution can move to a provider"], ["test", "inspect enumeration or generated command"]] },
  { label: "async", fields: [["goal", "express continuation-based I/O clearly"], ["example", "async methods and await"], ["cost", "state machine and context flow"], ["test", "trace completion, fault and cancellation"]] },
  { label: "efficiency", fields: [["goal", "reduce copying and allocation where measured"], ["example", "ref returns and readonly structs"], ["cost", "aliasing and lifetime constraints"], ["test", "benchmark plus correctness laws"]] },
];

export function DcsLanguagePressureLab() {
  return <DcsOfficialLab cases={pressureCases} tone="violet" initial={2} caption="每个语言特性都在表达力、复杂度、兼容性和效率之间做具体权衡。" />;
}

const evidenceCases: OfficialLabCase[] = [
  { label: "version", fields: [["question", "Which compiler and language version?"], ["artifact", "LangVersion and SDK"], ["acceptance", "feature compiles only in declared matrix"], ["reject", "calling a preview feature C# 7"]] },
  { label: "runtime", fields: [["question", "Which behavior belongs to CLR/BCL?"], ["artifact", "target framework and runtime trace"], ["acceptance", "language sugar separated from library call"], ["reject", "attributing GC or LINQ provider to syntax"]] },
  { label: "lowering", fields: [["question", "What does the compiler generate?"], ["artifact", "equivalent code or IL/state machine"], ["acceptance", "capture, allocation and control flow explained"], ["reject", "syntax-only mental model"]] },
  { label: "production", fields: [["question", "What does the example omit?"], ["artifact", "fault, cancellation, security and scale checklist"], ["acceptance", "didactic snippet bounded explicitly"], ["reject", "copying sample as complete architecture"]] },
];

export function DcsEvidenceBoundaryLab() {
  return <DcsOfficialLab cases={evidenceCases} tone="emerald" caption="深入理解以版本、runtime、lowering和production boundary四类证据收口。" />;
}
