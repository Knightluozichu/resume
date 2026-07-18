"use client";

import { CfpOfficialLab } from "./official-lab";

const asyncCases = [
  { label: "cold task", fields: [["construction", "Function returns a task when invoked"], ["risk", "Repeated invocation repeats effects"]] },
  { label: "hot task", fields: [["construction", "Task already represents running work"], ["risk", "Composition does not restart it"]] },
  { label: "cancel", fields: [["construction", "Token flows through every boundary"], ["risk", "Cancellation must not become ordinary failure"]] },
  { label: "fault", fields: [["construction", "Task completes faulted"], ["risk", "Await preserves the causal exception"]] },
] as const;

const traverseCases = [
  { label: "sequential", fields: [["shape", "IEnumerable<Task<A>> -> Task<List<A>>"], ["execution", "Await each item in source order"]] },
  { label: "parallel", fields: [["shape", "Same type transformation"], ["execution", "Start all and await aggregate"]] },
  { label: "bounded", fields: [["shape", "Traverse with capacity"], ["execution", "At most N operations in flight"]] },
  { label: "failure", fields: [["shape", "Aggregate contract"], ["execution", "Define fail-fast, collect, cancel, and ordering"]], alert: "A type signature alone does not choose the concurrency policy." },
] as const;

const stackedCases = [
  { label: "valid", fields: [["outer", "Task completed"], ["inner", "Right(domain value)"]] },
  { label: "invalid", fields: [["outer", "Task completed"], ["inner", "Left(validation or rejection)"]] },
  { label: "fault", fields: [["outer", "Task fault/cancellation"], ["inner", "No domain outcome was produced"]] },
  { label: "compose", fields: [["outer", "TaskEither helper"], ["inner", "Map/Bind preserve both layers"]] },
] as const;

export function CfpAsyncLifecycleLab() { return <CfpOfficialLab cases={asyncCases} caption="Task composition must distinguish invocation, running work, cancellation, and fault completion." tone="cyan" />; }
export function CfpTraversePolicyLab() { return <CfpOfficialLab cases={traverseCases} caption="Traverse flips list-of-effects into effect-of-list, while execution policy remains an explicit decision." tone="amber" />; }
export function CfpAsyncValidationLab() { return <CfpOfficialLab cases={stackedCases} caption="Combining Task and Either requires preserving transport outcomes and domain outcomes as separate layers." tone="violet" />; }
