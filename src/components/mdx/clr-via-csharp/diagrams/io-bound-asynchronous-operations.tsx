"use client";

import { CvcOfficialLab } from "./official-lab";

const ioCases = [
  { label: "Submit", fields: [["Thread", "Issues nonblocking OS request"], ["State", "Buffer/handle/operation registered"], ["Risk", "Synchronous completion and validation"]] },
  { label: "Pending", fields: [["Thread", "No thread required for device wait"], ["State", "Kernel/device owns progress"], ["Risk", "Buffer/lifetime and cancellation"]] },
  { label: "Complete", fields: [["Thread", "Completion port/runtime callback queues continuation"], ["State", "Bytes/result/error available"], ["Risk", "Partial I/O and late completion"]] },
  { label: "Resume", fields: [["Thread", "Continuation runs on context/scheduler"], ["State", "State machine advances"], ["Risk", "Context contention and exception observation"]] },
] as const;

const asyncCases = [
  { label: "Entry", fields: [["State machine", "Runs synchronously until incomplete await"], ["Storage", "Arguments/locals initially stack or state"], ["Failure", "Before/after Task production semantics"]] },
  { label: "Suspend", fields: [["State machine", "Stores state and registers continuation"], ["Storage", "Hoisted locals/awaiter"], ["Failure", "Cancellation/operation may complete later"]] },
  { label: "Resume", fields: [["State machine", "GetResult then continue"], ["Storage", "Captured context/ExecutionContext where applicable"], ["Failure", "Exception rethrown at await"]] },
  { label: "Complete", fields: [["State machine", "Set result/exception/cancel"], ["Storage", "Task/ValueTask source outcome"], ["Failure", "Only one terminal outcome"]] },
] as const;

const serverCases = [
  { label: "Accept", fields: [["Operation", "Asynchronously accept connection/request"], ["Backpressure", "Bound outstanding accepts/queue"], ["Shutdown", "Stop accepting"]] },
  { label: "Read", fields: [["Operation", "Loop until frame complete or EOF"], ["Backpressure", "Max frame and timeout"], ["Shutdown", "Cancel/close and observe completion"]] },
  { label: "Process", fields: [["Operation", "CPU work and domain action"], ["Backpressure", "Bound concurrency; offload only compute"], ["Shutdown", "Drain or persist work"]] },
  { label: "Write", fields: [["Operation", "Handle partial writes/flush"], ["Backpressure", "Bound outbound bytes"], ["Shutdown", "Complete response or abort by policy"]], alert: "An async server still needs bounded concurrency, buffer ownership, timeouts, and a staged shutdown protocol." },
] as const;

export function CvcOsAsyncIoLab() { return <CvcOfficialLab cases={ioCases} caption="Submission, kernel/device waiting, completion, and continuation separate I/O progress from thread occupancy." tone="cyan" />; }
export function CvcAsyncStateMachineLab() { return <CvcOfficialLab cases={asyncCases} caption="Async entry, suspension, resumption, and completion form a compiler-generated state machine with one terminal outcome." tone="violet" />; }
export function CvcAsyncServerLab() { return <CvcOfficialLab cases={serverCases} caption="Accept, read, process, and write stages require independent backpressure, cancellation, and shutdown ownership." tone="amber" />; }
