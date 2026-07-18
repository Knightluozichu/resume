"use client";

import { LuaOfficialLab } from "./official-lab";

const multipleResultCases = [
  { label: "Assignment", fields: [["Context", "a, b, c = f()"], ["Adjustment", "Expand, pad with nil, or discard extras"], ["Proof", "Destination count fixes the observable arity"]] },
  { label: "Final argument", fields: [["Context", "sink(prefix, f())"], ["Adjustment", "The final call can contribute all results"], ["Proof", "Moving f() earlier collapses it to one result"]] },
  { label: "Constructor tail", fields: [["Context", "{prefix, f()}"], ["Adjustment", "The final list field can contribute all results"], ["Proof", "A following field changes the table shape"]] },
  { label: "Parenthesized", fields: [["Context", "(f())"], ["Adjustment", "Force exactly one result"], ["Proof", "Parentheses change arity, not only readability"]], alert: "A Lua call has no permanently fixed tuple value: its surrounding expression context decides how many results survive." },
] as const;

const variadicCases = [
  { label: "Direct dots", fields: [["Input", "... inside a variadic function"], ["Count", "Not recoverable with # on a plain table"], ["Use", "Forward only when the receiving call contract is known"]] },
  { label: "select count", fields: [["Input", "select(\"#\", ...)"], ["Count", "Preserves the number of arguments, including nil"], ["Use", "Validate exact or bounded arity before decoding"]] },
  { label: "table.pack", fields: [["Input", "table.pack(...)"], ["Count", "Stored in the explicit n field"], ["Use", "Retain nil-bearing arguments across table storage"]] },
  { label: "select slice", fields: [["Input", "select(i, ...)"], ["Count", "Returns arguments from position i onward"], ["Use", "Implement forwarding and recursive folds deliberately"]], alert: "Packing dots with {...} loses a reliable length when nil appears; the explicit n field is part of the data contract." },
] as const;

const tailCallCases = [
  { label: "Direct return", fields: [["Form", "return next_step(...)"], ["Tail position", "Yes"], ["Frame", "Current activation can be replaced"]] },
  { label: "Post-process", fields: [["Form", "return next_step(...) + 1"], ["Tail position", "No"], ["Frame", "Caller must remain to add one"]] },
  { label: "Force one", fields: [["Form", "return (next_step(...))"], ["Tail position", "No"], ["Frame", "Caller must apply result adjustment"]] },
  { label: "Protected call", fields: [["Form", "return pcall(next_step, ...)"], ["Tail position", "Tail call is pcall, not next_step"], ["Frame", "Error/result ownership belongs to the wrapper"]], alert: "Tail-call reuse is a semantic property of the return position, not a general promise that every recursive-looking function uses constant stack." },
] as const;

export function PilMultipleResultLab() {
  return <LuaOfficialLab cases={multipleResultCases} caption="Multiple results expand only in selected final-expression contexts; assignment and parentheses adjust the visible arity." tone="cyan" />;
}

export function PilVariadicPackLab() {
  return <LuaOfficialLab cases={variadicCases} caption="Variadic APIs need an explicit argument count whenever nil is a valid position." tone="violet" />;
}

export function PilTailCallLab() {
  return <LuaOfficialLab cases={tailCallCases} caption="A proper tail call is the direct returned call whose results need no work from the current frame." tone="amber" />;
}
