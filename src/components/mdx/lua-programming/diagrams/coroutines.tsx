"use client";

import { LuaOfficialLab } from "./official-lab";

const stateCases = [
  { label: "Suspended", fields: [["Cause", "Created but not started, or yielded"], ["Next", "resume passes initial arguments or yield-return values"], ["Risk", "Captured resources remain live while suspended"]] },
  { label: "Running", fields: [["Cause", "Currently executing its body"], ["Next", "May return, yield, error, or resume another coroutine"], ["Risk", "A blocking operation stalls the whole Lua thread"]] },
  { label: "Normal", fields: [["Cause", "It resumed another coroutine and waits for that resume"], ["Next", "Becomes running again when the child suspends/finishes"], ["Risk", "Nested ownership and tracebacks span multiple coroutines"]] },
  { label: "Dead", fields: [["Cause", "Returned normally or failed"], ["Next", "Cannot be resumed again"], ["Risk", "Failure result must be recorded before discarding diagnostic state"]], alert: "resume never throws the coroutine error directly: it returns a status followed by yielded/returned values or the error object." },
] as const;

const controlCases = [
  { label: "First resume", fields: [["Controller", "The resumer"], ["Data", "Arguments become coroutine function parameters"], ["Boundary", "The coroutine cannot run before this decision"]] },
  { label: "Yield", fields: [["Controller", "The coroutine voluntarily returns control"], ["Data", "Yielded values become resume results"], ["Boundary", "No preemption occurs inside long computation"]] },
  { label: "Next resume", fields: [["Controller", "The resumer chooses when and with what data"], ["Data", "Arguments become results of the suspended yield call"], ["Boundary", "Cancellation and timeout need an explicit message"]] },
  { label: "wrap", fields: [["Controller", "A generated function hides resume calls"], ["Data", "Yields/returns become function results"], ["Boundary", "Errors propagate and status/identity are less visible"]], alert: "Lua coroutines are asymmetric: the resumer owns scheduling, while yield can only return to the coroutine that resumed it." },
] as const;

const schedulerCases = [
  { label: "Request", fields: [["Task", "Yield an operation descriptor"], ["Scheduler", "Validate and register interest"], ["Invariant", "No task executes blocking I/O in the shared thread"]] },
  { label: "Wait", fields: [["Task", "Remains suspended with private stack state"], ["Scheduler", "Poll readiness, timer, or cancellation"], ["Invariant", "Every wait has an owner and deadline policy"]] },
  { label: "Resume", fields: [["Task", "Receives data or typed failure"], ["Scheduler", "Run a bounded slice and process next yield/return"], ["Invariant", "One task cannot starve the ready queue"]] },
  { label: "Finish", fields: [["Task", "Return or error"], ["Scheduler", "Cleanup registrations and publish result"], ["Invariant", "Resources close on success, error, and cancellation"]], alert: "Event-driven coroutines provide concurrency by interleaving waits; they do not create CPU parallelism and cannot repair a blocking host API." },
] as const;

export function PilCoroutineStateLab() {
  return <LuaOfficialLab cases={stateCases} caption="A coroutine moves through suspended, running, normal, and dead states with explicit resume outcomes." tone="cyan" />;
}

export function PilCoroutineControlLab() {
  return <LuaOfficialLab cases={controlCases} caption="First resume, yield, later resume, and wrap expose the asymmetric controller and bidirectional data flow." tone="violet" />;
}

export function PilCoroutineSchedulerLab() {
  return <LuaOfficialLab cases={schedulerCases} caption="An event scheduler turns yielded requests into waits, bounded resumes, and lifecycle-complete task outcomes." tone="emerald" />;
}
