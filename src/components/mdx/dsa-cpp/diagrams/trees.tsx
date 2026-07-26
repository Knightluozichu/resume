"use client";

import { useMemo, useState } from "react";

const treeNodes = [
  { value: "A", parent: "none", children: "B, C", depth: 0 },
  { value: "B", parent: "A", children: "D, E", depth: 1 },
  { value: "C", parent: "A", children: "F", depth: 1 },
  { value: "D", parent: "B", children: "none", depth: 2 },
  { value: "E", parent: "B", children: "none", depth: 2 },
  { value: "F", parent: "C", children: "none", depth: 2 },
] as const;

export function DsaTreeVocabularyDiagram() {
  const [selected, setSelected] = useState(1);
  const node = treeNodes[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{treeNodes.map((item, index) => <button key={item.value} type="button" onClick={() => setSelected(index)} className={"aspect-square border text-sm font-semibold " + (selected === index ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{item.value}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4"><div className="border border-border bg-background p-3 text-xs text-secondary">node<div className="mt-1 font-semibold text-primary">{node.value}</div></div><div className="border border-border bg-background p-3 text-xs text-secondary">parent<div className="mt-1 font-semibold text-primary">{node.parent}</div></div><div className="border border-success bg-success/10 p-3 text-xs text-secondary">children<div className="mt-1 font-semibold text-success">{node.children}</div></div><div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">depth<div className="mt-1 font-semibold text-warning">{node.depth}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Root、parent、child、leaf、depth 与 height 是后续所有树不变量的共同词汇。</figcaption>
    </figure>
  );
}

export function DsaBinaryTreeShapeLab() {
  const [height, setHeight] = useState(3);
  const full = 2 ** (height + 1) - 1;
  const leaves = 2 ** height;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">full binary tree height = {height}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={height} onChange={(event) => setHeight(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{Array.from({ length: height + 1 }, (_, level) => <div key={level} className="flex justify-center gap-1">{Array.from({ length: 2 ** level }, (_, index) => <span key={index} className="h-5 flex-1 border border-accent bg-accent/10" />)}</div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs"><div className="border border-border bg-background p-2 text-secondary">nodes <strong className="text-primary">{full}</strong></div><div className="border border-border bg-background p-2 text-secondary">leaves <strong className="text-primary">{leaves}</strong></div><div className="border border-success bg-success/10 p-2 text-success">max nodes = 2^(h+1)-1</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Binary tree 每节点至多两个 children；满树的指数容量解释平衡搜索树的 logarithmic height。</figcaption>
    </figure>
  );
}

const bstValues = [50, 30, 70, 20, 40, 60, 80] as const;

export function DsaBstOperationsLab() {
  const [target, setTarget] = useState(60);
  const path = useMemo(() => {
    const result: number[] = [];
    let index: number | null = 0;
    while (index !== null && index < bstValues.length) {
      const value: number = bstValues[index];
      result.push(value);
      if (value === target) break;
      const nextIndex: number = target < value ? index * 2 + 1 : index * 2 + 2;
      index = nextIndex < bstValues.length ? nextIndex : null;
    }
    return result;
  }, [target]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">search target = {target}<input className="mt-2 w-full accent-current" type="range" min="10" max="90" step="10" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-7 gap-1">{bstValues.map((value) => <span key={value} className={"border p-2 text-center font-mono text-xs " + (path.includes(value) ? value === target ? "border-success bg-success/10 text-success" : "border-accent bg-accent/10 text-accent" : "border-border bg-background text-muted")}>{value}</span>)}</div>
        <div className="mt-3 border border-border bg-background p-3 font-mono text-xs text-primary">path: {path.join(" → ")} {path.at(-1) === target ? "found" : "not found"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">BST 在每个 node 用 ordering 排除一侧；成本是 path length，也就是 tree height。</figcaption>
    </figure>
  );
}

const rotations = {
  LL: { before: "30 ← 20 ← 10", action: "rotate right at 30", after: "20 with children 10, 30" },
  LR: { before: "30 ← 10 → 20", action: "left at 10, right at 30", after: "20 with children 10, 30" },
  RR: { before: "10 → 20 → 30", action: "rotate left at 10", after: "20 with children 10, 30" },
  RL: { before: "10 → 30 ← 20", action: "right at 30, left at 10", after: "20 with children 10, 30" },
} as const;
type Rotation = keyof typeof rotations;

export function DsaAvlRotationLab() {
  const [kind, setKind] = useState<Rotation>("LR");
  const active = rotations[kind];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">{(Object.keys(rotations) as Rotation[]).map((key) => <button key={key} type="button" onClick={() => setKind(key)} className={"min-h-11 border font-mono text-sm font-semibold " + (kind === key ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{key}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-warning bg-warning/10 p-3 font-mono text-xs text-warning">{active.before}</div><div className="border border-accent bg-accent/10 p-3 text-xs text-accent">{active.action}</div><div className="border border-success bg-success/10 p-3 font-mono text-xs text-success">{active.after}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">AVL insertion 只需识别 LL/LR/RR/RL，并在局部 rotation 后重算 height。</figcaption>
    </figure>
  );
}

export function DsaSplayAccessLab() {
  const [target, setTarget] = useState(20);
  const items = [10, 20, 30, 40, 50];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-1">{items.map((value) => <button key={value} type="button" onClick={() => setTarget(value)} className={"flex-1 border p-2 font-mono text-xs " + (target === value ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{value}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="border border-border bg-background p-3 text-center font-mono text-xs text-secondary">before root = 30</div><div className="text-center text-muted">access {target} → splay</div><div className="border border-success bg-success/10 p-3 text-center font-mono text-xs text-success">after root = {target}</div></div>
        <p className="mb-0 mt-3 text-sm text-secondary">单次操作可 linear；连续操作序列的 amortized cost 为 logarithmic，并让热点靠近 root。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Splay tree 不存 balance metadata，而把每次访问的最后节点旋到 root，利用访问局部性。</figcaption>
    </figure>
  );
}

const traversalOrders = {
  preorder: ["A", "B", "D", "E", "C", "F"],
  inorder: ["D", "B", "E", "A", "F", "C"],
  postorder: ["D", "E", "B", "F", "C", "A"],
  level: ["A", "B", "C", "D", "E", "F"],
} as const;
type Traversal = keyof typeof traversalOrders;

export function DsaTraversalOrderLab() {
  const [kind, setKind] = useState<Traversal>("inorder");
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={kind} onChange={(event) => setKind(event.target.value as Traversal)}>{(Object.keys(traversalOrders) as Traversal[]).map((key) => <option key={key}>{key}</option>)}</select>
        <div className="mt-4 flex gap-1">{traversalOrders[kind].map((value, index) => <span key={value} className="flex-1 border border-accent bg-accent/10 p-2 text-center font-mono text-xs text-accent">{index + 1}. {value}</span>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Pre/in/post-order 改变访问 root 的时机；BST inorder 会按 key 排序输出。</figcaption>
    </figure>
  );
}

export function DsaBTreePageLab() {
  const [fanout, setFanout] = useState(4);
  const [height, setHeight] = useState(3);
  const maxLeaves = fanout ** height;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">fanout = {fanout}<input className="mt-2 w-full accent-current" type="range" min="3" max="64" value={fanout} onChange={(event) => setFanout(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">height = {height}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={height} onChange={(event) => setHeight(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-xs text-secondary">keys per internal page<div className="mt-1 font-mono text-primary">up to {fanout - 1}</div></div><div className="border border-success bg-success/10 p-3 text-xs text-secondary">leaf capacity scale<div className="mt-1 font-mono text-success">{maxLeaves.toLocaleString()}</div></div><div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">I/O path<div className="mt-1 font-mono text-warning">{height + 1} pages</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">B-tree 用高 fanout 让一个 storage page 保存多个 keys/children，从而压低外存路径高度。</figcaption>
    </figure>
  );
}

export function DsaSetMapSemanticsLab() {
  const [lookup, setLookup] = useState<"find" | "bracket">("find");
  const initial = { Pat: 75000 };
  const janExists = lookup === "bracket";
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-2"><button type="button" onClick={() => setLookup("find")} className={"min-h-11 flex-1 border px-3 text-sm font-semibold " + (lookup === "find" ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{'find("Jan")'}</button><button type="button" onClick={() => setLookup("bracket")} className={"min-h-11 flex-1 border px-3 text-sm font-semibold " + (lookup === "bracket" ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{'operator[]("Jan")'}</button></div>
        <div className="mt-4 border border-border bg-background p-3 font-mono text-xs text-primary">Pat → {initial.Pat}<br />{janExists ? "Jan → 0 (inserted default)" : "Jan → end() (no mutation)"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">std::map 的 find 是只读查询；operator[] 对缺失 key 会插入默认 value，语义不同。</figcaption>
    </figure>
  );
}
