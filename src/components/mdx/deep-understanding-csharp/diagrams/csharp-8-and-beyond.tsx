"use client";

import { DcsOfficialLab } from "./official-lab";

const nullableCases = [
  { label: "non-null", fields: [["annotation", "string"], ["flow proof", "Compiler expects a non-null value on normal paths"]] },
  { label: "maybe-null", fields: [["annotation", "string?"], ["flow proof", "Consumer must test, pattern-match, or otherwise establish non-null state"]] },
  { label: "oblivious", fields: [["annotation", "Legacy/disabled nullable context"], ["flow proof", "Migration boundary has weaker compile-time information"]] },
  { label: "suppressed", fields: [["annotation", "value!"], ["flow proof", "Warning is suppressed; runtime value is unchanged"]], alert: "The null-forgiving operator is an assertion to the compiler, not a runtime null check." },
] as const;

const shapeCases = [
  { label: "switch expr", fields: [["input", "A value matched by ordered arms"], ["output", "Each selected arm produces an expression result"]] },
  { label: "property", fields: [["input", "Recursive property shape such as { Total: > 0 }"], ["output", "Nested members participate in classification"]] },
  { label: "index", fields: [["input", "^1 means one from the end"], ["output", "Index calculation is relative to collection length"]] },
  { label: "range", fields: [["input", "start..end uses start-inclusive/end-exclusive bounds"], ["output", "Actual slicing cost depends on the target type"]] },
] as const;

const asyncCases = [
  { label: "async stream", fields: [["producer", "IAsyncEnumerable<T> yields values over time"], ["consumer", "await foreach observes each asynchronous move"]] },
  { label: "async dispose", fields: [["producer", "IAsyncDisposable.DisposeAsync"], ["consumer", "await using awaits asynchronous cleanup"]] },
  { label: "cancellation", fields: [["producer", "Enumerator receives/observes a token by explicit contract"], ["consumer", "Stopping enumeration and cancelling production are related but distinct"]] },
  { label: "failure", fields: [["producer", "MoveNextAsync or cleanup can fail"], ["consumer", "Tests must cover iteration, early exit, cancellation, and disposal"]] },
] as const;

export function DcsNullableFlowLab() {
  return <DcsOfficialLab cases={nullableCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Nullable reference types add compile-time annotations and flow states; they do not change CLR null values." tone="amber" />;
}

export function DcsCsharp8ShapeLab() {
  return <DcsOfficialLab cases={shapeCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Switch expressions, recursive patterns, indexes, and ranges make value shape and selection explicit." tone="cyan" />;
}

export function DcsAsyncIntegrationLab() {
  return <DcsOfficialLab cases={asyncCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Async iteration and disposal extend await into repeated production and resource cleanup protocols." tone="emerald" />;
}
