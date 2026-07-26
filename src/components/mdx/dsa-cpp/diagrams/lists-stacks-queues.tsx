"use client";

import { useMemo, useState } from "react";

const adts = [
  { name: "List", operations: "insert / erase / find", hidden: "array or linked nodes" },
  { name: "Stack", operations: "push / pop / top", hidden: "vector or list back" },
  { name: "Queue", operations: "enqueue / dequeue / front", hidden: "ring buffer or list ends" },
] as const;

export function DsaAdtBoundaryDiagram() {
  const [selected, setSelected] = useState(0);
  const active = adts[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">{adts.map((adt, index) => <button key={adt.name} type="button" onClick={() => setSelected(index)} className={"min-h-11 border px-2 font-mono text-sm font-semibold " + (selected === index ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{adt.name}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="border border-success bg-success/10 p-3 text-sm text-success"><strong>public ADT</strong><div className="mt-2 font-mono text-xs">{active.operations}</div></div><div className="text-center text-muted">hides →</div><div className="border border-warning bg-warning/10 p-3 text-sm text-warning"><strong>representation</strong><div className="mt-2 font-mono text-xs">{active.hidden}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">ADT 规定操作语义；array、linked nodes 与 ring buffer 是可替换表示。</figcaption>
    </figure>
  );
}

export function DsaVectorGrowthLab() {
  const [size, setSize] = useState(4);
  const [capacity, setCapacity] = useState(8);
  const push = () => {
    if (size === capacity) setCapacity(capacity * 2 + 1);
    setSize(size + 1);
  };
  const reset = () => { setSize(4); setCapacity(8); };
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-2"><button type="button" onClick={push} className="min-h-11 flex-1 border border-accent bg-accent px-3 text-sm font-semibold text-background">push_back</button><button type="button" onClick={reset} className="min-h-11 border border-border bg-background px-3 text-sm font-semibold text-primary">reset</button></div>
        <div className="mt-4 flex flex-wrap gap-1">{Array.from({ length: capacity }, (_, index) => <span key={index} className={"h-9 min-w-9 border p-2 text-center font-mono text-xs " + (index < size ? "border-success bg-success/10 text-success" : "border-border bg-background text-muted")}>{index < size ? index : "·"}</span>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs"><div className="border border-border bg-background p-2 text-secondary">size <strong className="text-primary">{size}</strong></div><div className="border border-border bg-background p-2 text-secondary">capacity <strong className="text-primary">{capacity}</strong></div><div className="border border-warning bg-warning/10 p-2 text-warning">{size === capacity ? "next push reallocates" : `${capacity - size} spare`}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Vector 只在 size 到达 capacity 时扩容；倍增把偶发 O(N) copy 均摊到每次 push_back 的 O(1)。</figcaption>
    </figure>
  );
}

export function DsaListSentinelLab() {
  const [values, setValues] = useState([10, 20, 30]);
  const [selected, setSelected] = useState(1);
  const erase = () => {
    if (!values.length) return;
    setValues((current) => current.filter((_, index) => index !== selected));
    setSelected(0);
  };
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex items-center gap-1 overflow-x-auto"><span className="border border-primary bg-primary/10 p-2 font-mono text-xs text-primary">head</span><span className="text-muted">⇄</span>{values.map((value, index) => <button key={`${value}-${index}`} type="button" onClick={() => setSelected(index)} className={"min-w-14 border p-2 font-mono text-xs " + (selected === index ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{value}</button>).flatMap((node, index) => index < values.length - 1 ? [node, <span key={`arrow-${index}`} className="text-muted">⇄</span>] : [node])}<span className="text-muted">⇄</span><span className="border border-primary bg-primary/10 p-2 font-mono text-xs text-primary">tail</span></div>
        <button type="button" onClick={erase} disabled={!values.length} className="mt-4 min-h-11 w-full border border-warning bg-warning/10 px-3 text-sm font-semibold text-warning">erase selected</button>
        <p className="mb-0 mt-3 text-sm text-secondary">删除只重连 predecessor.next 与 successor.prev；head/tail 哨兵消除首尾 null 特判。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">官方 List 用两个 sentinel nodes 统一空表、首插、尾插和删除的指针规则。</figcaption>
    </figure>
  );
}

const invalidationCases = [
  { operation: "vector push without realloc", vector: "stable before end", list: "all stable" },
  { operation: "vector reallocation", vector: "all invalid", list: "not applicable" },
  { operation: "erase one element", vector: "at/after erased invalid", list: "only erased invalid" },
] as const;

export function DsaIteratorInvalidationLab() {
  const [selected, setSelected] = useState(1);
  const active = invalidationCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={selected} onChange={(event) => setSelected(Number(event.target.value))}>{invalidationCases.map((item, index) => <option key={item.operation} value={index}>{item.operation}</option>)}</select>
        <div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">vector iterator<div className="mt-2 font-semibold text-warning">{active.vector}</div></div><div className="border border-success bg-success/10 p-3 text-xs text-secondary">list iterator<div className="mt-2 font-semibold text-success">{active.list}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Iterator 是位置抽象，不是永久地址；不同容器操作有不同失效规则。</figcaption>
    </figure>
  );
}

const postfixTokens = ["3", "4", "+", "2", "*"] as const;

export function DsaStackExpressionLab() {
  const [step, setStep] = useState(0);
  const stacks = useMemo(() => {
    const states: number[][] = [];
    const stack: number[] = [];
    for (const token of postfixTokens) {
      if (token === "+") stack.push((stack.pop() ?? 0) + (stack.pop() ?? 0));
      else if (token === "*") stack.push((stack.pop() ?? 0) * (stack.pop() ?? 0));
      else stack.push(Number(token));
      states.push([...stack]);
    }
    return states;
  }, []);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">postfix token {step + 1}/{postfixTokens.length}: {postfixTokens[step]}<input className="mt-2 w-full accent-current" type="range" min="0" max={postfixTokens.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex gap-2">{postfixTokens.map((token, index) => <span key={index} className={"flex-1 border p-2 text-center font-mono text-sm " + (index === step ? "border-accent bg-accent text-background" : index < step ? "border-success bg-success/10 text-success" : "border-border bg-background text-muted")}>{token}</span>)}</div>
        <div className="mt-3 border border-primary bg-primary/10 p-3 font-mono text-sm text-primary">stack bottom [{stacks[step].join(", ")}] top</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">LIFO 让 postfix evaluator 在遇到运算符时弹出最近两个 operands，再把结果压回。</figcaption>
    </figure>
  );
}

export function DsaQueueRingLab() {
  const [front, setFront] = useState(4);
  const [size, setSize] = useState(3);
  const capacity = 8;
  const occupied = new Set(Array.from({ length: size }, (_, index) => (front + index) % capacity));
  const enqueue = () => { if (size < capacity) setSize(size + 1); };
  const dequeue = () => { if (size > 0) { setFront((front + 1) % capacity); setSize(size - 1); } };
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-2"><button type="button" onClick={enqueue} className="min-h-11 flex-1 border border-success bg-success/10 px-3 text-sm font-semibold text-success">enqueue</button><button type="button" onClick={dequeue} className="min-h-11 flex-1 border border-warning bg-warning/10 px-3 text-sm font-semibold text-warning">dequeue</button></div>
        <div className="mt-4 grid grid-cols-8 gap-1">{Array.from({ length: capacity }, (_, index) => <span key={index} className={"aspect-square border p-2 text-center font-mono text-xs " + (occupied.has(index) ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-muted")}>{index}</span>)}</div>
        <div className="mt-3 text-center font-mono text-xs text-secondary">front={front}, size={size}, back={(front + size) % capacity}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Ring buffer 用 modulo 把逻辑队尾绕回数组开头，FIFO 操作无需搬移已有元素。</figcaption>
    </figure>
  );
}

const workloads = {
  indexing: { label: "随机下标读取", winner: "vector", reason: "contiguous O(1) indexing" },
  middleErase: { label: "已知位置删除", winner: "list", reason: "O(1) relink, stable others" },
  stack: { label: "只在尾部 push/pop", winner: "vector", reason: "cache locality + amortized O(1)" },
  queue: { label: "两端 FIFO", winner: "ring/deque", reason: "O(1) front movement" },
} as const;
type Workload = keyof typeof workloads;

export function DsaContainerChoiceLab() {
  const [workload, setWorkload] = useState<Workload>("indexing");
  const active = workloads[workload];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={workload} onChange={(event) => setWorkload(event.target.value as Workload)}>{(Object.keys(workloads) as Workload[]).map((key) => <option key={key} value={key}>{workloads[key].label}</option>)}</select>
        <div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="border border-success bg-success/10 p-3 text-sm text-secondary">preferred representation<div className="mt-2 font-mono font-semibold text-success">{active.winner}</div></div><div className="border border-accent bg-accent/10 p-3 text-sm text-secondary">deciding property<div className="mt-2 font-mono text-xs text-accent">{active.reason}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">容器选择由 operation mix、局部性与 iterator stability 决定，不由“理论 O(1)”单项决定。</figcaption>
    </figure>
  );
}
