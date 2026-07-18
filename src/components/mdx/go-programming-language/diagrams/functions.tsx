"use client";

import { useMemo, useState } from "react";

export function GoplRecursiveCallLab() {
  const [n, setN] = useState(5);
  const [failAt, setFailAt] = useState(0);
  const frames = Array.from({ length: n }, (_, index) => n - index);
  const failed = failAt > 0 && failAt <= n;
  const factorial = failed ? null : frames.reduce((product, value) => product * value, 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">factorial n: <strong>{n}</strong><input type="range" min="1" max="7" value={n} onChange={(event) => setN(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">inject error at frame: <strong>{failAt || "none"}</strong><input type="range" min="0" max={n} value={Math.min(failAt, n)} onChange={(event) => setFailAt(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label></section>
          <section className={`border p-4 ${failed ? "border-rose-500/40 bg-rose-500/10" : "border-emerald-500/40 bg-emerald-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">recursive call stack · descend then return</span><div className="mt-4 flex flex-wrap items-center gap-2">{frames.map((frame, index) => <div key={frame} className={`min-w-16 border p-2 text-center text-sm ${frame === failAt ? "border-rose-500 bg-rose-500/10 text-primary" : "border-border bg-bg text-primary"}`}>f({frame})<span className="block text-xs text-secondary">depth {index + 1}</span></div>)}</div><div className="mt-4 border border-border bg-bg p-3"><code className="text-sm text-primary">result, err := factorial({n})</code><strong className="mt-2 block text-sm text-primary">{failed ? `0, error("frame ${failAt}")` : `${factorial}, nil`}</strong></div><p className="mt-4 text-sm leading-7 text-secondary">每个 recursive call 都有独立 parameters/locals/return continuation；error 沿 return path 加 context，而不是丢掉最初 cause。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">递归把问题缩小并建立 call frames；multiple returns 让 value 与 error 沿同一返回边界传播。</figcaption>
    </figure>
  );
}

type FunctionChoice = "square" | "negate" | "add";

export function GoplFunctionClosureLab() {
  const [choice, setChoice] = useState<FunctionChoice>("add");
  const [input, setInput] = useState(4);
  const [captured, setCaptured] = useState(3);
  const [go122, setGo122] = useState(true);
  const result = choice === "square" ? input * input : choice === "negate" ? -input : input + captured;
  const loopResults = go122 ? ["a", "b", "c"] : ["c", "c", "c"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">function value<select value={choice} onChange={(event) => setChoice(event.target.value as FunctionChoice)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="square">square</option><option value="negate">negate</option><option value="add">closure: add captured</option></select></label><label className="block text-sm text-primary">input: <strong>{input}</strong><input type="range" min="-8" max="8" value={input} onChange={(event) => setInput(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">captured delta: <strong>{captured}</strong><input type="range" min="-5" max="5" value={captured} onChange={(event) => setCaptured(Number(event.target.value))} disabled={choice !== "add"} className="mt-2 block w-full accent-[var(--accent)] disabled:opacity-40" /></label></section>
          <section className="space-y-4 border border-cyan-500/40 bg-cyan-500/10 p-4"><div className="grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">code</span><strong className="mt-2 block text-sm text-primary">{choice === "add" ? "func(x) x+delta" : `func ${choice}`}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">environment</span><strong className="mt-2 block text-sm text-primary">{choice === "add" ? `delta=${captured}` : "none"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">result</span><strong className="mt-2 block text-sm text-primary">{result}</strong></div></div><label className="flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={go122} onChange={(event) => setGo122(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />module declares go 1.22+</label><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">closures created by range over a,b,c</span><strong className="mt-2 block text-sm text-primary">{loopResults.join(" · ")}</strong></div><p className="text-sm leading-7 text-secondary">closure 持有 lexical environment。loop capture 的具体 binding 语义取决于 module language version，跨版本 review 要读 go.mod。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">function value 可作为参数和返回值；anonymous function 携带 captured variables，形成有状态 closure。</figcaption>
    </figure>
  );
}

export function GoplDeferPanicRecoverLab() {
  const [panicDepth, setPanicDepth] = useState(3);
  const [recoverEnabled, setRecoverEnabled] = useState(true);
  const frames = useMemo(() => [1, 2, 3, 4].slice(0, panicDepth), [panicDepth]);
  const deferred = [...frames].reverse().map((frame) => `defer frame ${frame}`);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">panic at depth: <strong>{panicDepth}</strong><input type="range" min="1" max="4" value={panicDepth} onChange={(event) => setPanicDepth(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={recoverEnabled} onChange={(event) => setRecoverEnabled(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />boundary defer calls recover directly</label></section>
          <section className={`border p-4 ${recoverEnabled ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">panic → LIFO deferred calls → boundary</span><div className="mt-4 grid gap-2 sm:grid-cols-4">{deferred.map((item, index) => <div key={item} className="min-h-20 border border-border bg-bg p-3 text-sm text-primary"><span className="text-xs text-secondary">0{index + 1}</span><strong className="mt-2 block">{item}</strong></div>)}</div><div className="mt-4 border border-border bg-bg p-3"><strong className="text-sm text-primary">{recoverEnabled ? "panic converted to explicit error at package boundary" : "unrecovered: goroutine terminates and program may exit"}</strong></div><p className="mt-3 text-sm leading-7 text-secondary">recover 只对同一 goroutine 的 panicking sequence 生效，并且必须由 deferred function 直接调用；普通 expected error 不应走 panic。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">defer 在函数退出时 LIFO 执行；panic 沿当前 goroutine 展开 stack；recover 只能在受控 deferred boundary 截获。</figcaption>
    </figure>
  );
}
