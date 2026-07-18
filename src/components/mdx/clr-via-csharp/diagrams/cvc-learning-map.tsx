"use client";

import { CvcOfficialLab } from "./official-lab";

const routeCases = [
  { label: "Part I · CLR Basics", fields: [["Chapters", "1-3"], ["Question", "How source becomes executing code"], ["Evidence", "IL, metadata, binding and assembly identity"]] },
  { label: "Part II · Designing Types", fields: [["Chapters", "4-13"], ["Question", "How types expose state and behavior"], ["Evidence", "layout, dispatch, contracts and generic constraints"]] },
  { label: "Part III · Essential Types", fields: [["Chapters", "14-19"], ["Question", "How common runtime types encode values"], ["Evidence", "text, enum, array, delegate, attribute and nullable tests"]] },
  { label: "Part IV · Core Facilities", fields: [["Chapters", "20-25"], ["Question", "How CLR manages failure, memory and discovery"], ["Evidence", "exception, heap, loading, reflection and serialization traces"]] },
  { label: "Part V · Threading", fields: [["Chapters", "26-30"], ["Question", "How work and shared state are coordinated"], ["Evidence", "thread, task, I/O and synchronization timelines"]] },
] as const;

const dependencyCases = [
  { label: "Code and identity", fields: [["Producer", "compiler, linker and loader"], ["Contract", "IL, metadata, manifest and assembly identity"], ["Consumer", "CLR type and method loader"]] },
  { label: "Type and invocation", fields: [["Producer", "type loader and JIT"], ["Contract", "layout, method table and calling convention"], ["Consumer", "managed execution and reflection"]] },
  { label: "State and lifetime", fields: [["Producer", "application allocation and roots"], ["Contract", "reachability, ownership and exception state"], ["Consumer", "GC, finalization and cleanup"]] },
  { label: "Work and coordination", fields: [["Producer", "threads, tasks and I/O completion"], ["Contract", "result, cancellation, ordering and visibility"], ["Consumer", "scheduler, continuations and synchronization"]], alert: "A chapter is not isolated: every runtime failure crosses at least one producer-contract-consumer boundary." },
] as const;

const evidenceCases = [
  { label: "Predict", fields: [["Action", "Write the expected state transition"], ["Artifact", "timeline or object graph"], ["Reject", "Explanation written after observing output"]] },
  { label: "Trace", fields: [["Action", "Capture IL, allocation, stack, wait or binding evidence"], ["Artifact", "before/after record"], ["Reject", "Only a final value without mechanism evidence"]] },
  { label: "Break", fields: [["Action", "Inject invalid identity, fault, pressure or race"], ["Artifact", "failing invariant and owner"], ["Reject", "Happy-path-only sample"]] },
  { label: "Transfer", fields: [["Action", "Apply the model to an unseen service"], ["Artifact", "decision plus measurable acceptance"], ["Reject", "Repeating the chapter example"]] },
] as const;

export function CvcOfficialRouteLab() {
  return <CvcOfficialLab cases={routeCases} caption="The verified fourth-edition route covers five parts and all thirty official chapters." tone="cyan" />;
}

export function CvcOfficialDependencyLab() {
  return <CvcOfficialLab cases={dependencyCases} caption="Compiler output, type execution, object lifetime, and coordination form one runtime dependency chain." tone="violet" />;
}

export function CvcOfficialEvidenceLab() {
  return <CvcOfficialLab cases={evidenceCases} caption="Predict, trace, break, and transfer turns each chapter into reproducible runtime evidence." tone="amber" />;
}
