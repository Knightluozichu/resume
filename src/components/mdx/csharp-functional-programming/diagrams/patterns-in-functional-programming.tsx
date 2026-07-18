"use client";

import { CfpOfficialLab } from "./official-lab";

const operatorCases = [
  { label: "Map", fields: [["function", "T -> R"], ["container result", "F<T> -> F<R>, preserving structure"]] },
  { label: "ForEach", fields: [["function", "T -> effect/Unit"], ["container result", "Runs an effect; not a pure transformation"]] },
  { label: "Bind", fields: [["function", "T -> F<R>"], ["container result", "F<T> -> F<R>, flattening one layer"]] },
  { label: "Where", fields: [["function", "T -> bool"], ["container result", "Keeps values satisfying a predicate"]] },
] as const;

const bindCases = [
  { label: "nested map", fields: [["operation", "Map with T -> Option<R>"], ["shape", "Option<Option<R>>"]] },
  { label: "bind", fields: [["operation", "Bind with T -> Option<R>"], ["shape", "Option<R>; None short-circuits"]] },
  { label: "sequence", fields: [["operation", "IEnumerable Bind"], ["shape", "Flat sequence of all produced values"]] },
  { label: "cross", fields: [["operation", "Option combined with IEnumerable"], ["shape", "Choose which effect/structure owns the outer layer"]] },
] as const;

const abstractionCases = [
  { label: "primitive", fields: [["code", "Map/Bind/Where mechanics"], ["reader question", "What transformation rule is implemented?"]] },
  { label: "domain", fields: [["code", "ValidateOrder, PriceOrder, SaveOrder"], ["reader question", "What business workflow is expressed?"]] },
  { label: "effect", fields: [["code", "DB, clock, HTTP, logging adapters"], ["reader question", "Where and by whom does the world change?"]] },
  { label: "mixed", fields: [["code", "Generic plumbing and business rules interleaved"], ["reader question", "Can named combinators restore one level per function?"]] },
] as const;

export function CfpCoreOperatorsLab() {
  return <CfpOfficialLab cases={operatorCases} caption="Map, ForEach, Bind, and Where differ by function shape, structural effect, and whether side effects occur." tone="cyan" />;
}

export function CfpBindFlatteningLab() {
  return <CfpOfficialLab cases={bindCases} caption="Bind composes context-producing functions by flattening exactly one matching layer." tone="amber" />;
}

export function CfpAbstractionLevelLab() {
  return <CfpOfficialLab cases={abstractionCases} caption="Readable functional code keeps domain workflow, structural combinators, and external effects at deliberate abstraction levels." tone="violet" />;
}
