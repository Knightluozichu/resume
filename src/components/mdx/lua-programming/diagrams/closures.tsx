"use client";

import { LuaOfficialLab } from "./official-lab";

const firstClassCases = [
  { label: "Store", fields: [["Operation", "handlers[name] = function(...) ... end"], ["Identity", "The function is an ordinary value"], ["Contract", "Table ownership controls replacement and reachability"]] },
  { label: "Pass", fields: [["Operation", "table.sort(items, compare)"], ["Identity", "The callback keeps its own identity and upvalues"], ["Contract", "Comparator laws and side effects belong to the caller"]] },
  { label: "Return", fields: [["Operation", "return function(input) ... end"], ["Identity", "Each evaluation creates a function value"], ["Contract", "Captured bindings may outlive the factory call"]] },
  { label: "Compose", fields: [["Operation", "return function(x) return f(g(x)) end"], ["Identity", "The result captures f and g"], ["Contract", "Result and error arity must remain deliberate"]], alert: "A named function declaration is assignment sugar; changing a table field later does not mutate function values already captured elsewhere." },
] as const;

const bindingCases = [
  { label: "One factory", fields: [["Creation", "counter = new_counter()"], ["Binding", "One private count binding"], ["Mutation", "Every counter call updates that binding"]] },
  { label: "Two factories", fields: [["Creation", "a = new_counter(); b = new_counter()"], ["Binding", "Two independent count bindings"], ["Mutation", "Calls to a cannot change b"]] },
  { label: "Sibling closures", fields: [["Creation", "get, set = new_cell()"], ["Binding", "Both closures share one value binding"], ["Mutation", "set changes what get later observes"]] },
  { label: "Retained graph", fields: [["Creation", "callback captures context"], ["Binding", "Context stays reachable with callback"], ["Mutation", "Unregister or narrow the capture to release memory"]], alert: "Closures capture lexical bindings, not frozen copies. Shared closures observe later writes, while separate factory calls allocate separate bindings." },
] as const;

const functionalCases = [
  { label: "Map", fields: [["Shape", "One output for each input"], ["Callback", "transform(value, index)"], ["Invariant", "Order and cardinality are preserved unless documented otherwise"]] },
  { label: "Filter", fields: [["Shape", "Zero or one output for each input"], ["Callback", "predicate(value, index)"], ["Invariant", "Predicate truthiness and stable order are explicit"]] },
  { label: "Fold", fields: [["Shape", "Many inputs become one accumulator"], ["Callback", "combine(accumulator, value)"], ["Invariant", "Seed, direction, and associativity determine the result"]] },
  { label: "Pipeline", fields: [["Shape", "Output of one stage becomes input of the next"], ["Callback", "Composed closures capture stage functions"], ["Invariant", "Failure and multiple-result propagation need one policy"]], alert: "Higher-order helpers do not make effects disappear; mutation, I/O, errors, and callback cost remain part of the pipeline contract." },
] as const;

export function PilFirstClassFunctionLab() {
  return <LuaOfficialLab cases={firstClassCases} caption="First-class functions can be stored, passed, returned, and composed while retaining identity and captured bindings." tone="cyan" />;
}

export function PilClosureBindingLab() {
  return <LuaOfficialLab cases={bindingCases} caption="Closure state is determined by lexical binding ownership: independent factories split state, sibling closures can share it." tone="violet" />;
}

export function PilFunctionalPipelineLab() {
  return <LuaOfficialLab cases={functionalCases} caption="Map, filter, fold, and composition expose different shape, ordering, seed, and effect contracts." tone="emerald" />;
}
