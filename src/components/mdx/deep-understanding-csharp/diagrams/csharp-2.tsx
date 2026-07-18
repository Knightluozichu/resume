"use client";

import { DcsOfficialLab, type OfficialLabCase } from "./official-lab";

const genericCases: OfficialLabCase[] = [
  { label: "pre-generic", fields: [["storage", "object in ArrayList"], ["proof", "runtime cast"], ["cost", "boxing for value types"], ["failure", "InvalidCastException far from insertion"]] },
  { label: "generic", fields: [["storage", "List<T> retains element relation"], ["proof", "compile-time type checking"], ["cost", "shared/specialized runtime representation"], ["failure", "invalid add is rejected"]] },
  { label: "method", fields: [["storage", "T belongs to one operation"], ["proof", "type inference from arguments"], ["cost", "constraints limit available members"], ["failure", "insufficient constraint is a compile error"]] },
  { label: "constraint", fields: [["storage", "where T expresses capability"], ["proof", "compiler permits constrained members"], ["cost", "public compatibility narrows"], ["failure", "unsupported type argument is rejected"]] },
];

export function DcsGenericRepresentationLab() {
  return <DcsOfficialLab cases={genericCases} tone="cyan" initial={1} caption="Generics把object/cast关系提升为compile-time contract，同时保留runtime type information。" />;
}

const absenceCases: OfficialLabCase[] = [
  { label: "nullable", fields: [["input", "int? may be absent"], ["representation", "Nullable<int> with HasValue/Value"], ["operator", "lifting propagates null by defined rules"], ["test", "value, null and bool? truth tables"]] },
  { label: "method group", fields: [["input", "compatible named method"], ["representation", "compiler creates delegate"], ["operator", "overload resolution selects target"], ["test", "ambiguous and variance cases"]] },
  { label: "anonymous", fields: [["input", "inline statement body"], ["representation", "delegate plus optional closure object"], ["operator", "captured variable storage is retained"], ["test", "capture mutation and lifetime"]] },
  { label: "null delegate", fields: [["input", "no callback"], ["representation", "nullable delegate reference"], ["operator", "conditional invocation in modern syntax"], ["test", "zero, one and multiple targets"]] },
];

export function DcsNullableDelegateLab() {
  return <DcsOfficialLab cases={absenceCases} tone="violet" caption="Nullable<T>表达value absence，delegate conversion表达callable target；两者都需要精确的default/null语义。" />;
}

const iteratorCases: OfficialLabCase[] = [
  { label: "construction", fields: [["source", "call iterator method"], ["state", "enumerable/state-machine object created"], ["body", "usually not executed yet"], ["proof", "side-effect counter remains zero"]] },
  { label: "MoveNext", fields: [["source", "consumer requests next item"], ["state", "resume at generated label"], ["body", "run until yield return/end"], ["proof", "state and Current transition trace"]] },
  { label: "dispose", fields: [["source", "loop breaks or enumeration ends"], ["state", "enumerator Dispose invoked"], ["body", "generated finally executes"], ["proof", "resource closes on partial iteration"]] },
  { label: "minor features", fields: [["source", "partial type, static class, namespace alias"], ["state", "compile-time organization"], ["body", "no shared iterator mechanism"], ["proof", "inspect emitted type and member shape"]] },
];

export function DcsIteratorLoweringLab() {
  return <DcsOfficialLab cases={iteratorCases} tone="emerald" initial={1} caption="Iterator call、MoveNext和Dispose是三个不同阶段；minor features则主要改变source organization。" />;
}
