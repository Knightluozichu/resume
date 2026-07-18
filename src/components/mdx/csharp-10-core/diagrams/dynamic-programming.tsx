"use client";

import { CtcOfficialLab } from "./official-lab";

const bindingCases = [
  { label: "static", fields: [["binding", "Compiler selects member and conversions"], ["failure", "Compile-time diagnostic"]] },
  { label: "dynamic first", fields: [["binding", "Runtime binder creates call-site rule"], ["failure", "RuntimeBinderException"]] },
  { label: "dynamic cached", fields: [["binding", "Rule reused for matching runtime shape"], ["failure", "Rebind when restrictions differ"]] },
  { label: "dynamic result", fields: [["binding", "Result remains dynamic in expression"], ["failure", "Error can move farther downstream"]] },
] as const;

const dispatchCases = [
  { label: "numeric", fields: [["need", "Runtime numeric operators/conversions"], ["gate", "Promotion, overflow, nullable, user operators"]] },
  { label: "overload", fields: [["need", "Runtime member overload selection"], ["gate", "Runtime argument types and ambiguity"]] },
  { label: "visitor", fields: [["need", "Multiple dispatch over runtime node type"], ["gate", "Missing overload becomes runtime failure"]] },
  { label: "generic", fields: [["need", "Call member without naming closed generic"], ["gate", "Constrain expected surface and output"]] },
] as const;

const objectCases = [
  { label: "DynamicObject", fields: [["shape", "Overrides TryGet/Set/Invoke hooks"], ["gate", "Return false for normal binder failure"]] },
  { label: "ExpandoObject", fields: [["shape", "Mutable dictionary-backed members"], ["gate", "Shape/version and concurrency ownership"]] },
  { label: "COM", fields: [["shape", "Runtime-dispatched automation surface"], ["gate", "Threading, optional args, release policy"]] },
  { label: "language bridge", fields: [["shape", "DLR foreign object semantics"], ["gate", "Normalize errors and DTO at boundary"]] },
] as const;

export function CtcDynamicBindingLab() { return <CtcOfficialLab cases={bindingCases} caption="A dynamic expression defers overload resolution to a cached runtime call site and moves failures to execution." tone="cyan" />; }
export function CtcDynamicDispatchLab() { return <CtcOfficialLab cases={dispatchCases} caption="Dynamic dispatch can simplify numeric, overload, visitor, and generic calls only when runtime surfaces are bounded." tone="violet" />; }
export function CtcDynamicObjectLab() { return <CtcOfficialLab cases={objectCases} caption="Dynamic objects and language bridges need explicit shape, error, lifetime, and conversion contracts." tone="amber" />; }
