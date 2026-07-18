"use client";

import { useState } from "react";

const instanceCases = [
  { label: "my_dog", name: "Willie", age: 6, call: "my_dog.sit()", output: "Willie is now sitting.", identity: "independent Dog instance A" },
  { label: "your_dog", name: "Lucy", age: 3, call: "your_dog.roll_over()", output: "Lucy rolled over!", identity: "independent Dog instance B" },
];

export function PccClassInstanceLab() {
  const [selected, setSelected] = useState(0);
  const item = instanceCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 border border-border">{instanceCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 ${index === 0 ? "border-r border-border" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-4"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">name attribute</span><strong className="mt-2 block text-sm text-primary">{item.name}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">age attribute</span><strong className="mt-2 block text-sm text-primary">{item.age}</strong></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">method call</span><code className="mt-2 block text-sm text-primary">{item.call}</code></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">output</span><p className="mt-2 text-sm text-primary">{item.output}</p></div></div><p className="mt-3 border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.identity}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">同一class可创建多个instance；每个instance拥有独立attributes，method通过self访问当前receiver。</figcaption></figure>
  );
}

const mutationCases = [
  { label: "direct assignment", before: 0, after: 50, call: "car.odometer_reading = 50", guard: "绕过method validation，只适合公开且无invariant的state" },
  { label: "update method", before: 50, after: 80, call: "car.update_odometer(80)", guard: "method拒绝倒退，集中维护invariant" },
  { label: "increment method", before: 80, after: 105, call: "car.increment_odometer(25)", guard: "只接受非负增量，并保留变化语义" },
  { label: "invalid rollback", before: 105, after: 105, call: "car.update_odometer(20)", guard: "raise ValueError; state保持不变" },
];

export function PccAttributeMutationLab() {
  const [selected, setSelected] = useState(1);
  const item = mutationCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">state change<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{mutationCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label><div className="mt-4 grid items-center gap-3 sm:grid-cols-[0.6fr_auto_0.6fr_1.4fr]"><div className="border border-border bg-bg p-3 text-center"><span className="text-xs text-secondary">before</span><strong className="mt-2 block text-primary">{item.before}</strong></div><span className="text-secondary">→</span><div className="border border-cyan-500/40 bg-cyan-500/10 p-3 text-center"><span className="text-xs text-secondary">after</span><strong className="mt-2 block text-primary">{item.after}</strong></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><code className="block break-all text-sm text-primary">{item.call}</code><p className="mt-2 text-sm leading-6 text-secondary">{item.guard}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">method把state transition和invariant放在同一边界；失败时对象保持原状态。</figcaption></figure>
  );
}

const designCases = [
  { label: "inheritance", relation: "ElectricCar is a Car", mechanism: "class ElectricCar(Car); super().__init__", variation: "override fill_gas_tank", risk: "subclass必须仍满足base behavior contract" },
  { label: "composition", relation: "ElectricCar has a Battery", mechanism: "self.battery = Battery()", variation: "battery.describe_battery()", risk: "把独立state和behavior委托给专门object" },
  { label: "module import", relation: "application uses car module", mechanism: "from car import Car, ElectricCar", variation: "public classes separated from CLI", risk: "avoid import-time side effects and wildcard imports" },
  { label: "standard library", relation: "Lottery uses random", mechanism: "from random import choice", variation: "inject chooser for deterministic tests", risk: "random output needs controlled seed or dependency boundary" },
];

export function PccClassDesignLab() {
  const [selected, setSelected] = useState(1);
  const item = designCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 border border-border sm:grid-cols-4">{designCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border-border text-xs sm:text-sm ${index < designCases.length - 1 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">relationship</span><strong className="mt-2 block text-sm text-primary">{item.relation}</strong><span className="mt-4 block text-xs text-secondary">mechanism</span><code className="mt-2 block break-all text-sm text-primary">{item.mechanism}</code></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">behavior</span><strong className="mt-2 block text-sm text-primary">{item.variation}</strong><span className="mt-4 block text-xs text-secondary">review check</span><p className="mt-2 text-sm leading-6 text-primary">{item.risk}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">inheritance表达is-a，composition表达has-a，module/stdlib决定依赖从哪里进入。</figcaption></figure>
  );
}
