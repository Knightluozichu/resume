"use client";

import { CvcOfficialLab } from "./official-lab";

const argumentCases = [
  { label: "Positional", fields: [["Binding", "Argument order"], ["Version risk", "Inserted/reordered parameters"], ["Use", "Short obvious calls"]] },
  { label: "Named", fields: [["Binding", "Source parameter name"], ["Version risk", "Renaming becomes source breaking"], ["Use", "Clarify booleans/options"]] },
  { label: "Optional", fields: [["Binding", "Default embedded at call-site compilation"], ["Version risk", "Old binaries retain old default"], ["Use", "Stable defaults at source boundary"]] },
  { label: "Options type", fields: [["Binding", "Properties/constructor contract"], ["Version risk", "Can add optional members more safely"], ["Use", "Many evolving options"]], alert: "Optional parameter defaults are a source-version feature, not a runtime negotiation mechanism." },
] as const;

const passingCases = [
  { label: "Value", fields: [["Passed", "Copy of value or reference"], ["Callee", "Cannot replace caller variable"], ["Risk", "Reference target may still mutate"]] },
  { label: "ref", fields: [["Passed", "Alias to definitely assigned variable"], ["Callee", "Read and replace caller storage"], ["Risk", "Aliasing and lifetime constraints"]] },
  { label: "out", fields: [["Passed", "Alias to variable requiring callee assignment"], ["Callee", "Must assign before normal return"], ["Risk", "Multiple outputs obscure result model"]] },
  { label: "in", fields: [["Passed", "Readonly reference, often for larger structs"], ["Callee", "Cannot assign through parameter"], ["Risk", "Defensive copies for non-readonly members"]] },
] as const;

const apiCases = [
  { label: "params", fields: [["Call", "Zero or many arguments or explicit array"], ["Allocation", "Expanded call usually creates array"], ["Contract", "Must be last parameter"]] },
  { label: "Return value", fields: [["Call", "One primary outcome"], ["Allocation", "Value/reference/result type semantics"], ["Contract", "Prefer over routine out parameters"]] },
  { label: "Tuple/result", fields: [["Call", "Several cohesive outcomes"], ["Allocation", "ValueTuple is value type"], ["Contract", "Named type for long-lived public protocol"]] },
  { label: "Const intent", fields: [["Call", "C# has no general const parameter/reference object graph"], ["Allocation", "readonly/in only constrain assignment path"], ["Contract", "Use immutable types and interfaces"]], alert: "Passing a reference by value does not make the referenced object immutable." },
] as const;

export function CvcArgumentBindingLab() { return <CvcOfficialLab cases={argumentCases} caption="Positional, named, optional, and options-object calls encode different source and binary compatibility contracts." tone="amber" />; }
export function CvcParameterPassingLab() { return <CvcOfficialLab cases={passingCases} caption="Value, ref, out, and in parameters differ by caller-storage aliasing and assignment rights." tone="cyan" />; }
export function CvcParameterApiLab() { return <CvcOfficialLab cases={apiCases} caption="Variadic calls, return models, and const intent should make ownership and evolution explicit." tone="violet" />; }
