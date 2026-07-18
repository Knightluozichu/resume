"use client";

import { DcsOfficialLab, type OfficialLabCase } from "./official-lab";

const generatedCases: OfficialLabCase[] = [
  { label: "stub", fields: [["role", "original method replacement"], ["state", "create builder and state machine"], ["action", "start MoveNext then return task"], ["evidence", "decompile generated method"]] },
  { label: "state", fields: [["role", "program counter"], ["state", "-1 running, labels suspended, -2 finished (conceptually)"], ["action", "select resume point"], ["evidence", "trace state before/after await"]] },
  { label: "awaiter field", fields: [["role", "persist incomplete awaiter"], ["state", "stored across return to caller"], ["action", "GetResult on resume then clear"], ["evidence", "inspect generated fields"]] },
  { label: "builder", fields: [["role", "connect state machine to task-like result"], ["state", "result, exception or cancellation"], ["action", "AwaitUnsafeOnCompleted/SetResult/SetException"], ["evidence", "custom builder probe"]] },
];

export function DcsGeneratedAsyncLab() {
  return <DcsOfficialLab cases={generatedCases} tone="cyan" caption="Async lowering由stub、state machine、awaiter fields和builder共同完成，而不是Task.Run包装。" />;
}

const controlCases: OfficialLabCase[] = [
  { label: "if", fields: [["source", "branch around await"], ["lowering", "states only for reachable suspension points"], ["resume", "branch locals restored"], ["risk", "different sync/async paths need equal tests"]] },
  { label: "loop", fields: [["source", "await inside iteration"], ["lowering", "loop index/locals hoisted as needed"], ["resume", "jump back into loop state"], ["risk", "accidental serial execution"]] },
  { label: "try/finally", fields: [["source", "resource scope crosses await"], ["lowering", "pending control and cleanup encoded"], ["resume", "finally runs on exit/fault"], ["risk", "cleanup fault masks primary fault"]] },
  { label: "catch", fields: [["source", "awaited operation faults"], ["lowering", "GetResult throws inside MoveNext"], ["resume", "normal catch semantics apply"], ["risk", "exception observed only when task awaited"]] },
];

export function DcsMoveNextControlLab() {
  return <DcsOfficialLab cases={controlCases} tone="violet" initial={2} caption="Branch、loop和exception regions被编码进MoveNext，source control flow仍是理解generated states的主线。" />;
}

const contextCases: OfficialLabCase[] = [
  { label: "ExecutionContext", fields: [["captures", "AsyncLocal, security/culture flow"], ["continuation", "logical context restored"], ["control", "suppress only with measured, safe reason"], ["proof", "AsyncLocal before/after await"]] },
  { label: "SyncContext", fields: [["captures", "environment continuation target when awaiter honors it"], ["continuation", "UI/request context may schedule resume"], ["control", "ConfigureAwait changes capture request"], ["proof", "single-thread context timeline"]] },
  { label: "TaskScheduler", fields: [["captures", "task scheduling context in relevant awaits"], ["continuation", "scheduler queues work"], ["control", "do not equate scheduler with thread"], ["proof", "custom scheduler trace"]] },
  { label: "custom builder", fields: [["captures", "task-like implementation policy"], ["continuation", "builder coordinates state machine"], ["control", "must preserve await semantics"], ["proof", "sync/async/fault/cancel conformance"]] },
];

export function DcsContextBuilderLab() {
  return <DcsOfficialLab cases={contextCases} tone="emerald" caption="ExecutionContext、SynchronizationContext、TaskScheduler和builder属于不同层，不能统称“上下文”。" />;
}
