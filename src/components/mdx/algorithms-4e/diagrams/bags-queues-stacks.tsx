"use client";

import { useState } from "react";

type CollectionKind = "bag" | "queue" | "stack";

const collectionSemantics = {
  bag: { insert: "add(item)", remove: "none in core API", iteration: "all items; order unspecified", use: "collect observations" },
  queue: { insert: "enqueue(item)", remove: "dequeue()", iteration: "FIFO", use: "preserve arrival order" },
  stack: { insert: "push(item)", remove: "pop()", iteration: "LIFO", use: "reverse nested work" },
} as const;

export function Algs4CollectionSemanticsLab() {
  const [kind, setKind] = useState<CollectionKind>("stack");
  const active = collectionSemantics[kind];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(collectionSemantics) as CollectionKind[]).map((candidate) => <button key={candidate} type="button" onClick={() => setKind(candidate)} className={"min-h-10 border text-xs font-semibold " + (kind === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          {Object.entries(active).map(([key, value]) => <div key={key} className="border border-border bg-background p-3 text-secondary">{key}<div className="mt-1 font-mono text-primary">{value}</div></div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三个collection共享size/iteration外形，但access policy表达不同algorithmic intent。
      </figcaption>
    </figure>
  );
}

function capacityFor(size: number) {
  let capacity = 2;
  let n = 0;
  while (n < size) {
    if (n === capacity) capacity *= 2;
    n += 1;
  }
  return capacity;
}

export function Algs4ResizingArrayLab() {
  const [size, setSize] = useState(9);
  const capacity = capacityFor(size);
  const utilization = size / capacity;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          logical size = {size}, capacity = {capacity}
          <input className="mt-2 w-full accent-current" type="range" min="0" max="32" value={size} onChange={(event) => setSize(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid grid-cols-8 gap-1">
          {Array.from({ length: capacity }, (_, index) => <div key={index} className={"h-8 border " + (index < size ? "border-accent bg-accent/30" : "border-border bg-background")} />)}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">next push<div className="font-mono text-primary">{size === capacity ? "resize 2x" : "O(1) write"}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">utilization<div className="font-mono text-success">{Math.round(utilization * 100)}%</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-secondary">shrink policy<div className="font-mono text-warning">at 25%, halve</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Doubling把copy成本摊到多次push；quarter-full才halve，避免边界附近反复扩缩容。
      </figcaption>
    </figure>
  );
}

const stackFrames = [
  { op: "empty", items: [] as string[] },
  { op: "push A", items: ["A"] },
  { op: "push B", items: ["B", "A"] },
  { op: "push C", items: ["C", "B", "A"] },
  { op: "pop -> C", items: ["B", "A"] },
] as const;

export function Algs4LinkedStackLab() {
  const [step, setStep] = useState(3);
  const frame = stackFrames[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">operation: {frame.op}<input className="mt-2 w-full accent-current" type="range" min="0" max={stackFrames.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex min-h-20 items-center gap-2">
          <div className="border border-accent bg-accent/10 p-3 font-mono text-xs text-accent">first</div>
          {frame.items.length === 0 ? <div className="font-mono text-xs text-secondary">null</div> : frame.items.map((item, index) => <div key={`${item}-${index}`} className="border border-border bg-background p-3 font-mono text-xs text-primary">{item}<span className="ml-2 text-secondary">-&gt;</span></div>)}
          {frame.items.length > 0 && <div className="font-mono text-xs text-secondary">null</div>}
        </div>
        <div className="border border-success bg-success/10 p-3 text-xs text-success">size = {frame.items.length}; top = {frame.items[0] ?? "none"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linked stack只改first pointer，push/pop均为worst-case constant time。
      </figcaption>
    </figure>
  );
}

const queueFrames = [
  { op: "empty", items: [] as string[] },
  { op: "enqueue A", items: ["A"] },
  { op: "enqueue B", items: ["A", "B"] },
  { op: "enqueue C", items: ["A", "B", "C"] },
  { op: "dequeue -> A", items: ["B", "C"] },
  { op: "dequeue -> B", items: ["C"] },
  { op: "dequeue -> C", items: [] as string[] },
] as const;

export function Algs4LinkedQueueLab() {
  const [step, setStep] = useState(4);
  const frame = queueFrames[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">operation: {frame.op}<input className="mt-2 w-full accent-current" type="range" min="0" max={queueFrames.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <div className="border border-accent bg-accent/10 p-3 font-mono text-xs text-accent">first</div>
          <div className="flex min-h-16 items-center gap-2 border border-border bg-background p-3">
            {frame.items.length === 0 ? <span className="font-mono text-xs text-secondary">null</span> : frame.items.map((item) => <span key={item} className="border border-border px-3 py-2 font-mono text-xs text-primary">{item}</span>)}
          </div>
          <div className="border border-success bg-success/10 p-3 font-mono text-xs text-success">last</div>
        </div>
        <div className="mt-2 border border-warning bg-warning/10 p-3 text-xs text-warning">{frame.items.length === 0 ? "first = last = null" : `dequeue ${frame.items[0]}; enqueue after ${frame.items.at(-1)}`}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linked queue同时维护first/last；删掉最后节点后必须把last重置为null。
      </figcaption>
    </figure>
  );
}

export function Algs4IterationOrderLab() {
  const [kind, setKind] = useState<CollectionKind>("queue");
  const inserted = ["A", "B", "C"];
  const output = kind === "stack" ? [...inserted].reverse() : inserted;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["bag", "queue", "stack"] as CollectionKind[]).map((candidate) => <button key={candidate} type="button" onClick={() => setKind(candidate)} className={"min-h-10 border text-xs font-semibold " + (kind === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="border border-border bg-background p-3 text-xs text-secondary">insert sequence<div className="mt-1 font-mono text-primary">{inserted.join(" ")}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">foreach sequence<div className="mt-1 font-mono text-success">{output.join(" ")}</div></div>
        </div>
        <div className="mt-2 border border-warning bg-warning/10 p-3 text-xs text-warning">{kind === "bag" ? "Bag client must not depend on iteration order" : `${kind.toUpperCase()} iterator follows its access policy`}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Iterable让client与representation解耦，但iteration order仍属于需要明确的behavior contract。
      </figcaption>
    </figure>
  );
}

const evaluateFrames = [
  { token: "(", ops: [] as string[], vals: [] as string[] },
  { token: "1", ops: [], vals: ["1"] },
  { token: "+", ops: ["+"], vals: ["1"] },
  { token: "2", ops: ["+"], vals: ["1", "2"] },
  { token: "*", ops: ["*", "+"], vals: ["1", "2"] },
  { token: "3", ops: ["*", "+"], vals: ["1", "2", "3"] },
  { token: ")", ops: ["+"], vals: ["1", "6"] },
  { token: ")", ops: [], vals: ["7"] },
] as const;

export function Algs4TwoStackEvaluateLab() {
  const [step, setStep] = useState(5);
  const frame = evaluateFrames[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">token: {frame.token}<input className="mt-2 w-full accent-current" type="range" min="0" max={evaluateFrames.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">operator stack<div className="mt-2 flex min-h-16 flex-col-reverse gap-1">{frame.ops.map((item, index) => <span key={`${item}-${index}`} className="border border-accent bg-background p-2 text-center font-mono text-accent">{item}</span>)}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">value stack<div className="mt-2 flex min-h-16 flex-col-reverse gap-1">{frame.vals.map((item, index) => <span key={`${item}-${index}`} className="border border-success bg-background p-2 text-center font-mono text-success">{item}</span>)}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Fully parenthesized expression在右括号处弹出operator与operands，结果再压回value stack。
      </figcaption>
    </figure>
  );
}
