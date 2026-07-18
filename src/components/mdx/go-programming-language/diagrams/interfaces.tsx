"use client";

import { useState } from "react";

type InterfaceCase = "nil-interface" | "celsius" | "counter-value" | "counter-pointer" | "nil-counter-pointer";

const interfaceCases: Record<InterfaceCase, { dynamicType: string; dynamicValue: string; stringer: boolean; mutator: boolean; equalsNil: boolean }> = {
  "nil-interface": { dynamicType: "nil", dynamicValue: "nil", stringer: true, mutator: true, equalsNil: true },
  celsius: { dynamicType: "Celsius", dynamicValue: "20", stringer: true, mutator: false, equalsNil: false },
  "counter-value": { dynamicType: "Counter", dynamicValue: "{value: 3}", stringer: false, mutator: false, equalsNil: false },
  "counter-pointer": { dynamicType: "*Counter", dynamicValue: "&{value: 3}", stringer: false, mutator: true, equalsNil: false },
  "nil-counter-pointer": { dynamicType: "*Counter", dynamicValue: "nil", stringer: false, mutator: true, equalsNil: false },
};

export function GoplInterfaceValueLab() {
  const [selected, setSelected] = useState<InterfaceCase>("nil-counter-pointer");
  const [required, setRequired] = useState<"Stringer" | "Mutator">("Mutator");
  const value = interfaceCases[selected];
  const assignable = selected === "nil-interface" || (required === "Stringer" ? value.stringer : value.mutator);
  const callRisk = selected === "nil-counter-pointer" && required === "Mutator";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">concrete value<select value={selected} onChange={(event) => setSelected(event.target.value as InterfaceCase)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="nil-interface">nil interface</option><option value="celsius">Celsius value</option><option value="counter-value">Counter value</option><option value="counter-pointer">*Counter pointer</option><option value="nil-counter-pointer">nil *Counter pointer</option></select></label><label className="block text-sm text-primary">required interface<select value={required} onChange={(event) => setRequired(event.target.value as "Stringer" | "Mutator")} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="Stringer">Stringer: String()</option><option value="Mutator">Mutator: Increment()</option></select></label></section>
          <section className={`border p-4 ${assignable && !callRisk ? "border-emerald-500/40 bg-emerald-500/10" : callRisk ? "border-amber-500/40 bg-amber-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite"><div className="grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">dynamic type</span><strong className="mt-2 block text-sm text-primary">{value.dynamicType}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">dynamic value</span><strong className="mt-2 block text-sm text-primary">{value.dynamicValue}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">iface == nil</span><strong className="mt-2 block text-sm text-primary">{String(value.equalsNil)}</strong></div></div><strong className="mt-4 block text-sm text-primary">{assignable ? callRisk ? "assignment succeeds; method may panic on nil receiver" : "assignment satisfies contract" : "compile error: missing method set"}</strong><p className="mt-3 text-sm leading-7 text-secondary">interface 等于 nil 仅当 dynamic type 与 dynamic value 都是 nil；装入 typed nil pointer 后 interface 本身非 nil。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">interface value 是 dynamic type/value pair；implicit satisfaction 看 concrete method set，typed nil pointer 仍留下 dynamic type。</figcaption>
    </figure>
  );
}

type Contract = "sort" | "http" | "error";

const contracts: Record<Contract, { methods: string[]; adapter: string; call: string }> = {
  sort: { methods: ["Len() int", "Less(i,j) bool", "Swap(i,j)"], adapter: "sort.Interface", call: "sort.Sort(data)" },
  http: { methods: ["ServeHTTP(ResponseWriter, *Request)"], adapter: "http.HandlerFunc", call: "server.ServeHTTP(w, r)" },
  error: { methods: ["Error() string"], adapter: "custom error type", call: "return err" },
};

export function GoplBehaviorContractLab() {
  const [contract, setContract] = useState<Contract>("http");
  const [optionalBehavior, setOptionalBehavior] = useState(true);
  const selected = contracts[contract];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="interface contract example">{(["sort", "http", "error"] as Contract[]).map((item, index) => <button key={item} type="button" aria-pressed={contract === item} onClick={() => setContract(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${contract === item ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>{item}</button>)}</div><div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]"><section className="border border-border bg-bg p-4"><span className="text-xs text-secondary">required method set</span><div className="mt-3 space-y-2">{selected.methods.map((method) => <code key={method} className="block border border-border bg-elevated p-2 text-sm text-primary">{method}</code>)}</div><label className="mt-4 flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={optionalBehavior} onChange={(event) => setOptionalBehavior(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />concrete value also supports optional behavior</label></section><section className="border border-cyan-500/40 bg-cyan-500/10 p-4"><div className="grid gap-3 sm:grid-cols-2"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">adapter</span><strong className="mt-2 block text-sm text-primary">{selected.adapter}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">dispatch</span><strong className="mt-2 block text-sm text-primary">{selected.call}</strong></div></div><div className="mt-4 border border-border bg-bg p-3"><code className="text-sm text-primary">if extra, ok := value.(interface &#123; Flush() error &#125;); ok &#123; ... &#125;</code><strong className="mt-2 block text-sm text-primary">assertion: {optionalBehavior ? "ok · call optional behavior" : "false · keep base contract"}</strong></div><p className="mt-3 text-sm leading-7 text-secondary">consumer 定义最小 interface；adapter 连接普通 function/type；behavior assertion 查询能力，不查询具体 implementation identity。</p></section></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">sort.Interface、http.Handler 与 error 都是小型行为 contract；type assertion 可在不扩大基础 interface 的前提下查询可选能力。</figcaption>
    </figure>
  );
}

type DispatchMode = "expression" | "xml";
type ExpressionNode = "literal" | "variable" | "binary" | "call";

export function GoplDynamicDispatchLab() {
  const [mode, setMode] = useState<DispatchMode>("expression");
  const [node, setNode] = useState<ExpressionNode>("binary");
  const [x, setX] = useState(3);
  const result = node === "literal" ? 2 : node === "variable" ? x : node === "binary" ? x + 2 : Math.sqrt(Math.max(0, x));
  const [token, setToken] = useState<"StartElement" | "CharData" | "EndElement">("StartElement");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border"><button type="button" onClick={() => setMode("expression")} className={`min-h-11 border-r border-border text-sm ${mode === "expression" ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>expression evaluator</button><button type="button" onClick={() => setMode("xml")} className={`min-h-11 text-sm ${mode === "xml" ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>XML token decoder</button></div>{mode === "expression" ? <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">dynamic Expr type<select value={node} onChange={(event) => setNode(event.target.value as ExpressionNode)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="literal">literal</option><option value="variable">variable</option><option value="binary">binary</option><option value="call">call</option></select></label><label className="block text-sm text-primary">env[x]: <strong>{x}</strong><input type="range" min="-4" max="9" value={x} onChange={(event) => setX(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label></section><section className="border border-emerald-500/40 bg-emerald-500/10 p-4"><code className="block border border-border bg-bg p-3 text-sm text-primary">switch e := expr.(type) &#123; case {node}: ... &#125;</code><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">syntax node</span><strong className="mt-2 block text-sm text-primary">{node}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">environment</span><strong className="mt-2 block text-sm text-primary">x={x}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Eval</span><strong className="mt-2 block text-sm text-primary">{result.toFixed(2)}</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">interface method 可做开放 dispatch；type switch 适合封闭 node family 的 formatting/checking，并必须处理 unknown implementation。</p></section></div> : <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><section className="border border-border bg-bg p-4"><label className="block text-sm text-primary">xml.Token dynamic type<select value={token} onChange={(event) => setToken(event.target.value as "StartElement" | "CharData" | "EndElement")} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="StartElement">StartElement</option><option value="CharData">CharData</option><option value="EndElement">EndElement</option></select></label></section><section className="border border-violet-500/40 bg-violet-500/10 p-4"><div className="grid gap-3 sm:grid-cols-3">{["Decoder.Token", `type switch: ${token}`, token === "StartElement" ? "push path" : token === "EndElement" ? "pop path" : "emit text"].map((item, index) => <div key={item} className="min-h-24 border border-border bg-bg p-3 text-sm text-primary"><span className="text-xs text-secondary">0{index + 1}</span><strong className="mt-2 block">{item}</strong></div>)}</div><p className="mt-4 text-sm leading-7 text-secondary">streaming token decoder 保留 nesting stack，不必一次构建整棵 DOM；depth、bytes、entities 与 accepted paths 需要 limits。</p></section></div>}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">type assertion/switch 读取 interface dynamic type：可驱动 expression node dispatch，也可逐 token 解码 XML stream。</figcaption>
    </figure>
  );
}
