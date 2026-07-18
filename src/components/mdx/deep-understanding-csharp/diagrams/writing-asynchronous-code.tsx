"use client";

import { DcsOfficialLab, type OfficialLabCase } from "./official-lab";

const surfaceCases: OfficialLabCase[] = [
  { label: "declaration", fields: [["shape", "async Task<T> Method(...)"], ["start", "invocation runs synchronously initially"], ["completion", "returned task represents eventual outcome"], ["fault", "after invocation, exception is stored in task"]] },
  { label: "await complete", fields: [["shape", "awaiter IsCompleted is true"], ["start", "no suspension required"], ["completion", "GetResult continues inline"], ["fault", "GetResult propagates exception"]] },
  { label: "await pending", fields: [["shape", "awaiter incomplete"], ["start", "state saved and continuation registered"], ["completion", "method returns to caller"], ["fault", "later continuation completes task"]] },
  { label: "return wrapping", fields: [["shape", "return TResult inside async"], ["start", "builder receives result"], ["completion", "Task<TResult> completes with value"], ["fault", "throw completes task as faulted"]] },
];

export function DcsAsyncSurfaceLab() {
  return <DcsOfficialLab cases={surfaceCases} tone="cyan" initial={2} caption="Async invocation、await fast/slow path和task completion是不同阶段，不承诺新thread。" />;
}

const shapeCases: OfficialLabCase[] = [
  { label: "async lambda", fields: [["target", "Func<T, Task<R>>"], ["flow", "same async method semantics"], ["caller", "can await returned task"], ["risk", "overload may choose Action and become async void"]] },
  { label: "async void", fields: [["target", "event-handler shape"], ["flow", "no task returned"], ["caller", "cannot await completion/fault"], ["risk", "exception goes to synchronization environment"]] },
  { label: "custom task", fields: [["target", "task-like type with builder"], ["flow", "compiler uses AsyncMethodBuilder"], ["caller", "awaitable contract preserved"], ["risk", "complexity and allocation claims need benchmark"]] },
  { label: "async Main", fields: [["target", "Task/Task<int> entry point"], ["flow", "host awaits process entry task"], ["caller", "exit follows task result"], ["risk", "background work still needs ownership"]] },
];

export function DcsAsyncShapeLab() {
  return <DcsOfficialLab cases={shapeCases} tone="violet" caption="Async lambda、void、custom task-like和Main共享await model，但暴露给caller的completion contract不同。" />;
}

const usageCases: OfficialLabCase[] = [
  { label: "I/O sequence", fields: [["goal", "preserve dependent order"], ["pattern", "await each dependent operation"], ["budget", "one logical flow"], ["proof", "timeline and cancellation propagation"]] },
  { label: "I/O concurrency", fields: [["goal", "run independent operations together"], ["pattern", "start tasks then await WhenAll"], ["budget", "bound fan-out"], ["proof", "all faults and max concurrency"]] },
  { label: "cancellation", fields: [["goal", "cooperative stop"], ["pattern", "pass token through every boundary"], ["budget", "cleanup still completes"], ["proof", "before/during/after completion races"]] },
  { label: "sync boundary", fields: [["goal", "bridge legacy synchronous caller"], ["pattern", "async all the way or isolated adapter"], ["budget", "no context-blocking cycle"], ["proof", "single-thread context deadlock test"]] },
  { label: "ValueTask", fields: [["goal", "measured frequent synchronous completion"], ["pattern", "consume once, await directly"], ["budget", "avoid extra state-machine misuse"], ["proof", "allocation benchmark plus semantic tests"]] },
];

export function DcsAsyncUsageLab() {
  return <DcsOfficialLab cases={usageCases} tone="emerald" initial={1} caption="正确async usage由dependency、concurrency budget、cancellation和completion ownership共同决定。" />;
}
