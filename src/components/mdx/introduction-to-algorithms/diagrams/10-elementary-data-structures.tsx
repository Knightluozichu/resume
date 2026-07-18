"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><Caption>{caption}</Caption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-base">{value}</div></div>;
}

export function CLRS4ArrayAddressLab() {
  const [index, setIndex] = useState(5);
  const base = 1000;
  const width = 8;
  return (
    <Figure caption="Contiguous equal-width array cells make random access an address calculation independent of array length.">
      <label className="text-sm font-semibold text-primary">index i = {index}<input className="mt-2 w-full accent-current" type="range" min="0" max="9" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">{Array.from({ length: 10 }, (_, i) => <div key={i} className={`border p-2 text-center ${i === index ? "border-success bg-success/10 text-success" : "border-border text-secondary"}`}><div className="font-mono">A[{i}]</div><div className="text-[10px]">{base + width * i}</div></div>)}</div>
      <div className="mt-3 text-center font-mono text-sm text-accent">address = {base} + {index} × {width} = {base + index * width}</div>
    </Figure>
  );
}

export function CLRS4MatrixLayoutLab() {
  const [cell, setCell] = useState(6);
  const row = Math.floor(cell / 4);
  const col = cell % 4;
  return (
    <Figure caption="Row-major matrix storage linearizes cell (i,j) at offset i times column-count plus j.">
      <label className="text-sm font-semibold text-primary">linear offset = {cell}<input className="mt-2 w-full accent-current" type="range" min="0" max="11" value={cell} onChange={(event) => setCell(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{Array.from({ length: 12 }, (_, index) => <div key={index} className={`border p-3 text-center font-mono ${index === cell ? "border-warning bg-warning/10 text-warning" : "border-accent text-accent"}`}>({Math.floor(index / 4)},{index % 4})</div>)}</div>
      <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="row i" value={row.toString()} /><Stat label="column j" value={col.toString()} /><Stat label="4i+j" value={cell.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4StackLab() {
  const [size, setSize] = useState(3);
  const items = ["A", "B", "C", "D", "E"];
  return (
    <Figure caption="A stack exposes only the top of a prefix; push grows the prefix and pop removes its most recently added item.">
      <label className="text-sm font-semibold text-primary">stack size = {size}<input className="mt-2 w-full accent-current" type="range" min="0" max={items.length} value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
      <div className="mt-4 mx-auto flex max-w-xs flex-col-reverse gap-1 border-x border-b border-border p-2">{items.slice(0, size).map((item, index) => <div key={item} className={`border p-3 text-center font-mono ${index === size - 1 ? "border-success bg-success/10 text-success" : "border-accent text-accent"}`}>{item}{index === size - 1 ? " ← top" : ""}</div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">{size === 0 ? "empty: pop would underflow" : `next pop returns ${items[size - 1]}`}</div>
    </Figure>
  );
}

export function CLRS4QueueRingLab() {
  const [head, setHead] = useState(5);
  const [size, setSize] = useState(5);
  const capacity = 8;
  const occupied = new Set(Array.from({ length: size }, (_, offset) => (head + offset) % capacity));
  const tail = (head + size) % capacity;
  return (
    <Figure caption="A circular queue maps logical order onto an array modulo capacity, so head and tail wrap without shifting elements.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">head = {head}<input className="mt-2 w-full accent-current" type="range" min="0" max={capacity - 1} value={head} onChange={(event) => setHead(Number(event.target.value))} /></label><label className="text-sm text-primary">size = {size}<input className="mt-2 w-full accent-current" type="range" min="0" max={capacity} value={size} onChange={(event) => setSize(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-8 gap-2">{Array.from({ length: capacity }, (_, index) => <div key={index} className={`border p-3 text-center font-mono ${occupied.has(index) ? "border-accent text-accent" : "border-border text-secondary"}`}>{index}</div>)}</div>
      <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="head" value={head.toString()} tone="success" /><Stat label="tail" value={tail.toString()} tone="warning" /><Stat label="occupancy" value={`${size}/${capacity}`} /></div>
    </Figure>
  );
}

export function CLRS4BoundaryStateLab() {
  const [policy, setPolicy] = useState<"size" | "spare slot" | "ambiguous">("size");
  const rows = {
    size: ["track count separately", "head=tail can mean empty", "all slots usable"],
    "spare slot": ["reserve one cell", "head=tail means empty", "full at capacity−1"],
    ambiguous: ["head and tail only", "head=tail has two meanings", "broken contract"],
  }[policy];
  return (
    <Figure caption="Array-backed stacks and queues need explicit underflow and overflow policies; indices alone may not distinguish empty from full.">
      <label className="text-sm font-semibold text-primary">queue state policy<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={policy} onChange={(event) => setPolicy(event.target.value as typeof policy)}><option value="size">track size</option><option value="spare slot">reserve slot</option><option value="ambiguous">head/tail only</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="representation" value={rows[0]} /><Stat label="empty test" value={rows[1]} tone="warning" /><Stat label="capacity effect" value={rows[2]} tone={policy === "ambiguous" ? "danger" : "success"} /></div>
    </Figure>
  );
}

const listNodes = [
  { key: 9, prev: null, next: 1 },
  { key: 16, prev: 0, next: 2 },
  { key: 4, prev: 1, next: 3 },
  { key: 1, prev: 2, next: null },
];

export function CLRS4LinkedListLab() {
  const [active, setActive] = useState(1);
  return (
    <Figure caption="A doubly linked list stores logical adjacency in next and prev fields, independent of the nodes' physical addresses.">
      <label className="text-sm font-semibold text-primary">active node = {active}<input className="mt-2 w-full accent-current" type="range" min="0" max={listNodes.length - 1} value={active} onChange={(event) => setActive(Number(event.target.value))} /></label>
      <div className="mt-4 flex items-center justify-center gap-2">{listNodes.map((node, index) => <div key={index} className={`border p-3 text-center ${index === active ? "border-success bg-success/10 text-success" : "border-accent text-accent"}`}><div className="font-mono text-lg">{node.key}</div><div className="text-[10px]">prev {node.prev ?? "nil"} · next {node.next ?? "nil"}</div></div>)}</div>
    </Figure>
  );
}

export function CLRS4SentinelListLab() {
  const [empty, setEmpty] = useState(false);
  const nodes = empty ? ["S"] : ["S", "9", "16", "4"];
  return (
    <Figure caption="A circular sentinel replaces nil endpoints with one distinguished node, making insertion and deletion pointer rewiring uniform.">
      <label className="block border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={empty} onChange={(event) => setEmpty(event.target.checked)} />empty list</label>
      <div className="mt-4 flex items-center justify-center gap-2">{nodes.map((node, index) => <div key={index} className={`border p-4 text-center font-mono ${node === "S" ? "border-warning bg-warning/10 text-warning" : "border-accent text-accent"}`}>{node}</div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">{empty ? "S.next = S.prev = S" : "last.next = S and S.prev = last"}</div>
    </Figure>
  );
}

export function CLRS4ListOperationLab() {
  const [operation, setOperation] = useState<"search" | "insert" | "delete">("delete");
  const rows = {
    search: ["follow next until key or sentinel", "Θ(n)", "needs no node handle"],
    insert: ["rewire four links near a known position", "Θ(1)", "position handle required"],
    delete: ["bridge predecessor and successor", "Θ(1)", "target handle required"],
  }[operation];
  return (
    <Figure caption="Linked-list operation cost depends on whether the caller already has a node handle; locating by key remains linear.">
      <label className="text-sm font-semibold text-primary">operation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="search">search by key</option><option value="insert">insert at handle</option><option value="delete">delete handle</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="mechanism" value={rows[0]} /><Stat label="cost" value={rows[1]} tone="success" /><Stat label="precondition" value={rows[2]} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4RootedTreeLab() {
  const [representation, setRepresentation] = useState<"binary" | "parent">("binary");
  const rows = {
    binary: ["left and right child fields", "constant child access", "shape supports at most two children"],
    parent: ["one parent field per node", "root has nil parent", "children require scan or extra lists"],
  }[representation];
  return (
    <Figure caption="A rooted tree representation chooses which navigation directions are constant-time and which require traversal or extra storage.">
      <label className="text-sm font-semibold text-primary">representation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={representation} onChange={(event) => setRepresentation(event.target.value as typeof representation)}><option value="binary">binary child pointers</option><option value="parent">parent pointers</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="fields" value={rows[0]} /><Stat label="fast path" value={rows[1]} tone="success" /><Stat label="tradeoff" value={rows[2]} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4LeftChildSiblingLab() {
  const [node, setNode] = useState<"A" | "B" | "C">("A");
  const rows = {
    A: ["left-child = B", "right-sibling = nil", "children B,C,D"],
    B: ["left-child = E", "right-sibling = C", "first child of A"],
    C: ["left-child = nil", "right-sibling = D", "next child of A"],
  }[node];
  return (
    <Figure caption="Left-child/right-sibling encoding stores an arbitrary-degree rooted tree with two pointers per node: first child and next sibling.">
      <label className="text-sm font-semibold text-primary">node<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={node} onChange={(event) => setNode(event.target.value as typeof node)}><option value="A">A</option><option value="B">B</option><option value="C">C</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="first-child pointer" value={rows[0]} /><Stat label="next-sibling pointer" value={rows[1]} tone="warning" /><Stat label="tree meaning" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}
