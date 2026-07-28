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
const workloads = {
  indexing: { label: "随机下标读取", winner: "vector", reason: "contiguous O(1) indexing" },
  middleErase: { label: "已知位置删除", winner: "list", reason: "O(1) relink, stable others" },
  stack: { label: "只在尾部 push/pop", winner: "vector", reason: "cache locality + amortized O(1)" },
  queue: { label: "两端 FIFO", winner: "ring/deque", reason: "O(1) front movement" },
} as const;
type Workload = keyof typeof workloads;
