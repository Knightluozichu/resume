"use client";

import { useState } from "react";

export function Ec7InstanceIdentityLab() {
  const [left, setLeft] = useState(10);
  const [right, setRight] = useState(10);
  const [alias, setAlias] = useState(false);
  const increment = () => alias ? (setLeft(value => value + 1), setRight(value => value + 1)) : setRight(value => value + 1);
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-3"><div className="border border-cyan-500/40 bg-cyan-500/10 p-4 text-center"><span className="text-xs text-secondary">accountA instance</span><strong className="mt-2 block text-xl text-primary">Balance {left}</strong></div><div className="border border-violet-500/40 bg-violet-500/10 p-4 text-center"><span className="text-xs text-secondary">accountB reference</span><strong className="mt-2 block text-xl text-primary">Balance {right}</strong></div></div><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => { setAlias(value => !value); setLeft(10); setRight(10); }} className="min-h-11 border border-border bg-bg text-sm text-primary">{alias ? "B aliases A" : "A and B are distinct"}</button><button type="button" onClick={increment} className="min-h-11 border border-primary bg-primary text-sm text-bg">accountB.Deposit(1)</button></div><p className="mt-3 text-xs leading-5 text-secondary">{alias ? "this inside Deposit identifies the shared object; both references observe its field" : "this identifies accountB's separate object; accountA remains unchanged"}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">切换独立instances与alias，调用instance method并观察this所指object。</figcaption></figure>;
}

const constructionCases = [
  { label: "default chain", input: "new Account()", steps: ["Account() delegates to Account(0)", "validate 0 ≥ 0", "private balance = 0"], result: "valid instance" },
  { label: "value chain", input: "new Account(25)", steps: ["enter Account(decimal)", "validate 25 ≥ 0", "private balance = 25"], result: "valid instance" },
  { label: "invalid", input: "new Account(-1)", steps: ["enter Account(decimal)", "validation fails", "throw before publishing object"], result: "no usable instance" },
  { label: "property set", input: "account.Name = \"  Ada  \"", steps: ["setter receives value", "trim and reject empty", "store normalized name"], result: "Name = Ada" },
];

export function Ec7ConstructionPropertyLab() {
  const [selected, setSelected] = useState(0);
  const item = constructionCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{constructionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.input}</code><div className="mt-3 grid gap-2 md:grid-cols-3">{item.steps.map((step, index) => <div key={step} className="border border-border bg-bg p-3 text-sm text-secondary"><span className="mr-2 text-cyan-400">{index + 1}</span>{step}</div>)}</div><strong className={`mt-3 block border p-3 text-sm ${item.result.startsWith("no") ? "border-red-500/40 bg-red-500/10" : "border-emerald-500/40 bg-emerald-500/10"} text-primary`}>{item.result}</strong></div><figcaption className="mt-2 text-center text-sm text-secondary">选择constructor/property路径，追踪chaining、validation、storage与失败结果。</figcaption></figure>;
}

const ownershipCases = [
  { label: "instance", owner: "one Account object", call: "account.Close()", state: "reads and changes this account only" },
  { label: "static", owner: "Account type", call: "Account.OpenCount", state: "shared across all instances; no this" },
  { label: "extension", owner: "static Extensions class", call: "account.IsOverdrawn()", state: "static call syntax sugar; no private access privilege" },
  { label: "nested", owner: "enclosing type scope", call: "Account.Statement", state: "name/access relationship, not an implicit outer instance" },
  { label: "partial", owner: "one compiled Account type", call: "Account.cs + Account.Validation.cs", state: "source parts merge at compile time; not inheritance" },
];

export function Ec7MemberOwnershipLab() {
  const [selected, setSelected] = useState(0);
  const item = ownershipCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{ownershipCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3">{[["declared owner", item.owner], ["use site", item.call], ["semantic boundary", item.state]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换member/type organization形式，区分storage owner、call syntax与access boundary。</figcaption></figure>;
}
