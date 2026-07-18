"use client";

import { useMemo, useState } from "react";

const numericTypes = [
  { name: "byte", bits: 8, range: "0 … 255", suffix: "none", domain: "binary bytes and small unsigned values" },
  { name: "int", bits: 32, range: "-2,147,483,648 … 2,147,483,647", suffix: "none", domain: "default whole-number arithmetic" },
  { name: "long", bits: 64, range: "-9.22e18 … 9.22e18", suffix: "L", domain: "large counters and integral identifiers" },
  { name: "float", bits: 32, range: "~7 decimal digits", suffix: "F", domain: "compact approximate measurements" },
  { name: "double", bits: 64, range: "~15–16 decimal digits", suffix: "D optional", domain: "default approximate scientific arithmetic" },
  { name: "decimal", bits: 128, range: "28–29 decimal digits", suffix: "M", domain: "base-10 financial calculations" },
];

export function Ec7NumericTypeLab() {
  const [selected, setSelected] = useState(1);
  const [checkedMode, setCheckedMode] = useState(true);
  const item = numericTypes[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">numeric type<select value={selected} onChange={e=>setSelected(Number(e.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3">{numericTypes.map((entry,index)=><option key={entry.name} value={index}>{entry.name}</option>)}</select></label><label className="mt-3 flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={checkedMode} onChange={e=>setCheckedMode(e.target.checked)} /> checked integral overflow</label><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{[["storage",`${item.bits} bits`],["range / precision",item.range],["literal suffix",item.suffix],["domain",item.domain]].map(([label,value])=><div key={label} className="min-h-24 border border-border bg-bg p-3"><span className="text-xs text-secondary">{label}</span><p className="mt-2 text-xs leading-5 text-primary">{value}</p></div>)}</div><p className={`mt-3 border p-3 text-sm ${checkedMode?"border-rose-500/40 bg-rose-500/10":"border-amber-500/40 bg-amber-500/10"}`}>{checkedMode?"overflow throws OverflowException in a checked context":"unchecked integral overflow wraps; floating overflow follows IEEE values"}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">选择numeric type与overflow context，比较storage、range/precision、literal suffix与domain。</figcaption></figure>;
}

const textCases = [
  { label: "bool", value: "true / false", operation: "&&, ||, !", behavior: "control decisions; not implicitly numeric" },
  { label: "char", value: "'A' (UTF-16 code unit)", operation: "char.IsLetter", behavior: "one code unit, not always a full Unicode grapheme" },
  { label: "string", value: "\"Ada\"", operation: "name += \"!\"", behavior: "immutable: expression creates a new string reference" },
  { label: "interpolation", value: "$\"Total: {total:C}\"", operation: "format + culture", behavior: "expression values converted according to format/provider" },
  { label: "StringBuilder", value: "builder.Append(part)", operation: "mutable buffer", behavior: "reduces repeated intermediate strings in loops" },
  { label: "null / void", value: "string s = null; void Log()", operation: "absence vs no return value", behavior: "null is a reference value; void is method return syntax" },
];

export function Ec7TextAndScalarLab() {
  const [selected,setSelected]=useState(2); const item=textCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{textCases.map((entry,index)=><button key={entry.label} type="button" onClick={()=>setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected===index?"border-violet-500 bg-violet-500/15 text-primary":"border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-3"><code className="border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">{item.value}</code><p className="border border-border bg-bg p-3 text-sm text-primary">operation: {item.operation}</p><p className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.behavior}</p></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换bool、char、string、interpolation、StringBuilder与null/void，比较value和operation contract。</figcaption></figure>;
}

const conversions = [
  { from: "int", to: "long", kind: "implicit", risk: "all int values fit in long", code: "long total = count;" },
  { from: "long", to: "int", kind: "explicit cast", risk: "range may be lost; use checked", code: "int count = checked((int)total);" },
  { from: "double", to: "int", kind: "explicit cast", risk: "fraction truncates; range must be checked", code: "int whole = checked((int)value);" },
  { from: "string", to: "int", kind: "TryParse", risk: "syntax and range may fail", code: "bool ok = int.TryParse(raw, out int n);" },
  { from: "object", to: "string", kind: "runtime cast", risk: "actual runtime type may differ", code: "string text = (string)value;" },
];

export function Ec7ConversionDecisionLab() {
  const [selected,setSelected]=useState(3); const item=conversions[selected];
  const [external,setExternal]=useState(true);
  const recommendation=useMemo(()=>external&&item.from==="string"?"TryParse + explicit failure branch":item.kind,[external,item]);
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">conversion<select value={selected} onChange={e=>setSelected(Number(e.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3">{conversions.map((entry,index)=><option key={`${entry.from}-${entry.to}`} value={index}>{entry.from} → {entry.to}</option>)}</select></label><label className="mt-3 flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={external} onChange={e=>setExternal(e.target.checked)} /> source is external/untrusted</label><div className="mt-4 grid gap-3 sm:grid-cols-3"><p className="border border-violet-500/40 bg-violet-500/10 p-3 text-sm text-primary">mechanism: {item.kind}</p><p className="border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">risk: {item.risk}</p><p className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">decision: {recommendation}</p></div><code className="mt-3 block border border-border bg-bg p-3 text-sm text-primary">{item.code}</code></div><figcaption className="mt-2 text-center text-sm text-secondary">选择source/target与trust boundary，判断implicit、checked cast、TryParse或runtime cast。</figcaption></figure>;
}
