"use client";

import { CvcOfficialLab } from "./official-lab";

const nullableCases = [
  { label: "No value", fields: [["HasValue", "false"], ["Value", "Throws InvalidOperationException"], ["Default", "default(T?)"]] },
  { label: "Has value", fields: [["HasValue", "true"], ["Value", "Underlying T"], ["Default", "GetValueOrDefault returns value"]] },
  { label: "Lifted operator", fields: [["HasValue", "Usually requires operands per lifted rules"], ["Value", "Underlying operator result when defined"], ["Default", "Null propagates except bool? logical special cases"]] },
  { label: "Coalesce", fields: [["HasValue", "Test once"], ["Value", "Underlying or right-hand fallback"], ["Default", "Right side evaluated lazily"]] },
] as const;

const boxingCases = [
  { label: "Box null nullable", fields: [["Result", "null reference"], ["Heap allocation", "None"], ["Type test", "No object/GetType"]] },
  { label: "Box valued nullable", fields: [["Result", "Box of underlying T"], ["Heap allocation", "One underlying-value box"], ["Type test", "GetType returns typeof(T), not typeof(T?)"]] },
  { label: "Unbox to T?", fields: [["Result", "Null or underlying T accepted into nullable"], ["Heap allocation", "No new box for result value"], ["Type test", "Exact underlying type required"]] },
  { label: "Unbox wrong type", fields: [["Result", "InvalidCastException"], ["Heap allocation", "Irrelevant"], ["Type test", "No numeric widening during unbox"]], alert: "A boxed nullable never has runtime type Nullable<T>; it is either null or a box of T." },
] as const;

const boundaryCases = [
  { label: "GetType", fields: [["No value", "Cannot call on null box"], ["Has value", "Returns underlying runtime type"], ["Design", "Use typeof(T?) for static nullable metadata"]] },
  { label: "Interface call", fields: [["No value", "Boxing yields null; call fails"], ["Has value", "Underlying T boxes/dispatches"], ["Design", "Check HasValue before interface view"]] },
  { label: "Database", fields: [["No value", "Map deliberately to NULL"], ["Has value", "Typed scalar"], ["Design", "Distinguish missing, default, and unknown"]] },
  { label: "NRT", fields: [["No value", "Reference nullability is compiler annotation"], ["Has value", "Not Nullable<T> wrapper"], ["Design", "Do not mix nullable value and reference mechanisms"]] },
] as const;

export function CvcNullableStateLab() { return <CvcOfficialLab cases={nullableCases} caption="No value, present value, lifted operators, and coalescing define the two-state nullable value model." tone="cyan" />; }
export function CvcNullableBoxingLab() { return <CvcOfficialLab cases={boxingCases} caption="Boxing a nullable yields null or a box of the underlying value; unboxing preserves exact type rules." tone="amber" />; }
export function CvcNullableBoundaryLab() { return <CvcOfficialLab cases={boundaryCases} caption="GetType, interface calls, database mapping, and nullable reference annotations expose different absence semantics." tone="violet" />; }
