"use client";

import { useMemo, useState } from "react";

const jobs = [
  { name: "render", priority: 4 },
  { name: "input", priority: 1 },
  { name: "audio", priority: 2 },
  { name: "backup", priority: 7 },
] as const;

export function DsaPriorityQueueModelLab() {
  const [mode, setMode] = useState<"min" | "max">("min");
  const next = [...jobs].sort((a, b) =>
    mode === "min" ? a.priority - b.priority : b.priority - a.priority,
  )[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(["min", "max"] as const).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setMode(candidate)}
              className={
                "min-h-10 border text-xs font-semibold " +
                (mode === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}-priority queue
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {jobs.map((job) => (
            <div
              key={job.name}
              className={
                "border p-3 " +
                (job.name === next.name
                  ? "border-success bg-success/10"
                  : "border-border bg-background")
              }
            >
              <div className="text-xs text-secondary">{job.name}</div>
              <div className="mt-1 font-mono text-sm font-semibold text-primary">
                p={job.priority}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Priority queue 只承诺取出极值，不承诺按插入次序或完整排序次序遍历。
      </figcaption>
    </figure>
  );
}

const simpleRows = [
  { structure: "unsorted array", insert: "O(1)", findMin: "O(N)", deleteMin: "O(N)" },
  { structure: "sorted array", insert: "O(N)", findMin: "O(1)", deleteMin: "O(1)" },
  { structure: "binary heap", insert: "O(log N)", findMin: "O(1)", deleteMin: "O(log N)" },
] as const;

export function DsaSimplePriorityQueueMatrix() {
  const [operation, setOperation] = useState<"insert" | "findMin" | "deleteMin">("deleteMin");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["insert", "findMin", "deleteMin"] as const).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setOperation(candidate)}
              className={
                "min-h-10 border px-1 text-xs font-semibold " +
                (operation === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {simpleRows.map((row) => (
            <div key={row.structure} className="grid grid-cols-[1fr_5rem] border border-border bg-background">
              <div className="p-3 text-xs text-secondary">{row.structure}</div>
              <div className="border-l border-border p-3 text-center font-mono text-xs font-semibold text-accent">
                {row[operation]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Simple implementations 把线性成本压在不同 operation；heap 在核心三项之间取得平衡。
      </figcaption>
    </figure>
  );
}

const heapValues = [3, 6, 5, 9, 8, 12, 10] as const;

export function DsaBinaryHeapIndexLab() {
  const [index, setIndex] = useState(2);
  const parent = index > 1 ? Math.floor(index / 2) : null;
  const left = index * 2 <= heapValues.length ? index * 2 : null;
  const right = index * 2 + 1 <= heapValues.length ? index * 2 + 1 : null;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-7 gap-1">
          {heapValues.map((value, offset) => {
            const slot = offset + 1;
            const related = slot === index || slot === parent || slot === left || slot === right;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setIndex(slot)}
                className={
                  "aspect-square border p-1 font-mono text-xs " +
                  (slot === index
                    ? "border-accent bg-accent text-background"
                    : related
                      ? "border-success bg-success/10 text-success"
                      : "border-border bg-background text-primary")
                }
              >
                <span className="block text-[9px] opacity-70">{slot}</span>
                {value}
              </button>
            );
          })}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-2 text-secondary">
            parent <strong className="font-mono text-primary">{parent ?? "none"}</strong>
          </div>
          <div className="border border-border bg-background p-2 text-secondary">
            left <strong className="font-mono text-primary">{left ?? "none"}</strong>
          </div>
          <div className="border border-border bg-background p-2 text-secondary">
            right <strong className="font-mono text-primary">{right ?? "none"}</strong>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        1-based complete binary heap 不存 pointers：parent、left、right 由 index 算出。
      </figcaption>
    </figure>
  );
}

type HeapOperation = "insert 2" | "deleteMin";

const operationFrames: Record<HeapOperation, string[][]> = {
  "insert 2": [
    ["3", "6", "5", "9", "8", "12", "10", "2(hole)"],
    ["3", "6", "5", "2(hole)", "8", "12", "10", "9"],
    ["3", "2(hole)", "5", "6", "8", "12", "10", "9"],
    ["2", "3", "5", "6", "8", "12", "10", "9"],
  ],
  deleteMin: [
    ["3(remove)", "6", "5", "9", "8", "12", "10"],
    ["10(hole)", "6", "5", "9", "8", "12"],
    ["5", "6", "10(hole)", "9", "8", "12"],
    ["5", "6", "10", "9", "8", "12"],
  ],
};

export function DsaHeapPercolationLab() {
  const [operation, setOperation] = useState<HeapOperation>("insert 2");
  const [frame, setFrame] = useState(0);
  const frames = operationFrames[operation];
  const selectOperation = (next: HeapOperation) => {
    setOperation(next);
    setFrame(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(operationFrames) as HeapOperation[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => selectOperation(candidate)}
              className={
                "min-h-10 border text-xs font-semibold " +
                (operation === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1">
          {frames[frame].map((value, index) => (
            <span
              key={`${value}-${index}`}
              className={
                "border px-2 py-2 font-mono text-xs " +
                (value.includes("hole") || value.includes("remove")
                  ? "border-warning bg-warning/10 text-warning"
                  : "border-border bg-background text-primary")
              }
            >
              {value}
            </span>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">
          frame {frame + 1} / {frames.length}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={frames.length - 1}
            value={frame}
            onChange={(event) => setFrame(Number(event.target.value))}
          />
        </label>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Percolate up/down 移动较少对象时用 hole technique，最后再写入待放元素。
      </figcaption>
    </figure>
  );
}

const applicationRows = [
  { name: "event simulation", key: "next timestamp", action: "deleteMin" },
  { name: "Dijkstra", key: "tentative distance", action: "decrease-key / insert" },
  { name: "top k stream", key: "current kth score", action: "replace min" },
] as const;

export function DsaHeapApplicationsDiagram() {
  const [selected, setSelected] = useState(1);
  const row = applicationRows[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-3">
          {applicationRows.map((application, index) => (
            <button
              key={application.name}
              type="button"
              onClick={() => setSelected(index)}
              className={
                "min-h-11 border px-2 text-xs font-semibold " +
                (selected === index
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {application.name}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            priority key <div className="mt-1 font-mono text-primary">{row.key}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            dominant action <div className="mt-1 font-mono text-success">{row.action}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Priority queue application 的关键是把业务状态映射成可比较 priority key。
      </figcaption>
    </figure>
  );
}

export function DsaDHeapTradeoffLab() {
  const [arity, setArity] = useState(4);
  const size = 4096;
  const height = Math.ceil(Math.log(size) / Math.log(arity));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          d = {arity}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="2"
            max="16"
            value={arity}
            onChange={(event) => setArity(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">
            height <div className="mt-1 font-mono text-primary">{height}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-secondary">
            insert levels <div className="mt-1 font-mono text-success">{height}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-secondary">
            child scan/delete <div className="mt-1 font-mono text-warning">up to {arity}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Larger d 降低高度，却让每次 percolate down 需要在更多 children 中找最小值。
      </figcaption>
    </figure>
  );
}

export function DsaMeldableHeapLab() {
  const [kind, setKind] = useState<"leftist" | "skew">("leftist");
  const details = {
    leftist: { metadata: "null-path length", rule: "swap if npl(left) < npl(right)", bound: "right path O(log N)" },
    skew: { metadata: "none", rule: "swap children after recursive merge", bound: "amortized O(log N)" },
  }[kind];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(["leftist", "skew"] as const).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setKind(candidate)}
              className={
                "min-h-10 border text-xs font-semibold " +
                (kind === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate} heap
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            metadata <div className="mt-1 font-mono text-primary">{details.metadata}</div>
          </div>
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">
            merge rule <div className="mt-1 font-mono text-accent">{details.rule}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            guarantee <div className="mt-1 font-mono text-success">{details.bound}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Leftist 与 skew heap 都把 merge 设为原语；区别在显式不变量与均摊自调整。
      </figcaption>
    </figure>
  );
}

export function DsaBinomialCarryLab() {
  const [leftSize, setLeftSize] = useState(5);
  const [rightSize, setRightSize] = useState(3);
  const total = leftSize + rightSize;
  const rows = useMemo(
    () =>
      Array.from({ length: 5 }, (_, rank) => ({
        rank,
        left: (leftSize >> rank) & 1,
        right: (rightSize >> rank) & 1,
        result: (total >> rank) & 1,
      })),
    [leftSize, rightSize, total],
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-primary">
            queue A size = {leftSize}
            <input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={leftSize} onChange={(event) => setLeftSize(Number(event.target.value))} />
          </label>
          <label className="text-sm font-semibold text-primary">
            queue B size = {rightSize}
            <input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={rightSize} onChange={(event) => setRightSize(Number(event.target.value))} />
          </label>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-1">
          {rows.map((row) => (
            <div key={row.rank} className="border border-border bg-background p-2 text-center font-mono text-[10px]">
              <div className="text-muted">B{row.rank}</div>
              <div className="mt-1 text-primary">{row.left}+{row.right}</div>
              <div className="mt-1 font-semibold text-accent">out {row.result}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 border border-success bg-success/10 p-3 font-mono text-xs text-success">
          {leftSize} + {rightSize} = {total}; trees follow binary digits of {total}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Binomial queue merge 与二进制加法同构：同 rank 两棵树 combine 后向下一 rank 进位。
      </figcaption>
    </figure>
  );
}

export function DsaStdPriorityQueueLab() {
  const [mode, setMode] = useState<"max" | "min">("max");
  const values = [4, 3, 5];
  const order = [...values].sort((a, b) => (mode === "max" ? b - a : a - b));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(["max", "min"] as const).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setMode(candidate)}
              className={
                "min-h-10 border text-xs font-semibold " +
                (mode === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate} queue
            </button>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          {order.map((value, index) => (
            <div
              key={value}
              className={
                "flex-1 border p-3 text-center font-mono text-sm " +
                (index === 0
                  ? "border-success bg-success/10 text-success"
                  : "border-border bg-background text-primary")
              }
            >
              {index + 1}. {value}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        std::priority_queue 默认 max-heap；使用 greater comparator 才得到 min-priority behavior。
      </figcaption>
    </figure>
  );
}
