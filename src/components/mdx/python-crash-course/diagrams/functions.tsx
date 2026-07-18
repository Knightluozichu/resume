"use client";

import { useState } from "react";

const bindingCases = [
  { label: "positional", call: "describe_pet('hamster', 'harry')", bindings: ["animal_type='hamster'", "pet_name='harry'"], result: "Harry is a hamster.", risk: "顺序必须匹配signature" },
  { label: "keyword", call: "describe_pet(pet_name='harry', animal_type='hamster')", bindings: ["animal_type='hamster'", "pet_name='harry'"], result: "Harry is a hamster.", risk: "名称明确，顺序可交换" },
  { label: "default", call: "describe_pet(pet_name='willie')", bindings: ["animal_type='dog' (default)", "pet_name='willie'"], result: "Willie is a dog.", risk: "无default参数必须放在有default参数前" },
  { label: "duplicate", call: "describe_pet('dog', animal_type='cat', pet_name='milo')", bindings: ["animal_type gets two values"], result: "TypeError", risk: "同一parameter不能同时由位置和keyword绑定" },
];

export function PccArgumentBindingLab() {
  const [selected, setSelected] = useState(0);
  const item = bindingCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 border border-border sm:grid-cols-4">{bindingCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border-border text-xs sm:text-sm ${index < bindingCases.length - 1 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><code className="mt-4 block overflow-x-auto border border-border bg-bg p-3 text-sm text-primary">{item.call}</code><div className="mt-3 grid gap-3 sm:grid-cols-3"><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">parameter bindings</span>{item.bindings.map((binding) => <code key={binding} className="mt-2 block break-all text-xs text-primary">{binding}</code>)}</div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">result</span><strong className="mt-2 block text-sm text-primary">{item.result}</strong></div><div className="border border-amber-500/40 bg-amber-500/10 p-3"><span className="text-xs text-secondary">contract check</span><p className="mt-2 text-sm leading-6 text-primary">{item.risk}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">调用先把arguments绑定到signature parameters，绑定失败时function body不会执行。</figcaption></figure>
  );
}

const ownershipCases = [
  { label: "mutate input", call: "print_models(unprinted, completed)", original: "unprinted becomes []", result: "completed receives models", contract: "函数拥有消费input list的副作用" },
  { label: "pass slice copy", call: "print_models(unprinted[:], completed)", original: "unprinted remains unchanged", result: "completed receives models", contract: "只复制外层list，nested objects仍共享" },
  { label: "return new list", call: "completed = render_models(unprinted)", original: "unprinted remains unchanged", result: "new completed list returned", contract: "pure transformation让ownership最清楚" },
  { label: "optional None", call: "find_user('missing')", original: "source unchanged", result: "None", contract: "调用方必须显式处理not found" },
];

export function PccReturnOwnershipLab() {
  const [selected, setSelected] = useState(2);
  const item = ownershipCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">function ownership<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{ownershipCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">call</span><code className="mt-2 block break-all text-sm text-primary">{item.call}</code></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">caller state</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.original}</strong></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">return / effect</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.result}</strong></div></div><p className="mt-3 border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">{item.contract}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">function contract必须说明返回值与输入mutation，两者不能靠调用者猜测。</figcaption></figure>
  );
}

const variadicCases = [
  { label: "*args", signature: "make_pizza(size, *toppings)", call: "make_pizza(12, 'mushrooms', 'olives')", bound: "size=12; toppings=('mushrooms','olives')", module: "from pizza import make_pizza" },
  { label: "**kwargs", signature: "build_profile(first, last, **user_info)", call: "build_profile('ada','lovelace',location='london')", bound: "user_info={'location':'london'}", module: "import user_profiles as profiles" },
  { label: "module alias", signature: "pizza.make_pizza(...)", call: "import pizza as p; p.make_pizza(16, 'pepperoni')", bound: "namespace p makes origin explicit", module: "prefer explicit module namespace" },
];

export function PccVariadicImportLab() {
  const [selected, setSelected] = useState(0);
  const item = variadicCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border">{variadicCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border-border text-xs sm:text-sm ${index < 2 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">signature</span><code className="mt-2 block break-all text-sm text-primary">{item.signature}</code><span className="mt-4 block text-xs text-secondary">call</span><code className="mt-2 block break-all text-sm text-primary">{item.call}</code></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">bound shape</span><code className="mt-2 block break-all text-sm text-primary">{item.bound}</code><span className="mt-4 block text-xs text-secondary">module boundary</span><strong className="mt-2 block text-sm text-primary">{item.module}</strong></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">variadic arguments收集为tuple/dictionary；module import决定名字来源是否清晰。</figcaption></figure>
  );
}
