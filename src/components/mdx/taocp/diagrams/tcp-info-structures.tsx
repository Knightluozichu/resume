"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`min-w-0 border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

function Cells({ values, active = -1 }: { values: Array<string | number>; active?: number }) {
  return <div className="flex min-h-14 gap-1 overflow-x-auto">{values.map((value, index) => <div key={`${value}-${index}`} className={`flex min-w-12 flex-1 items-center justify-center border p-2 font-mono text-sm ${index === active ? "border-success bg-success/15 text-success" : "border-border bg-background text-primary"}`}>{value}</div>)}</div>;
}

export function TcpRepresentationLab() {
  const [mode, setMode] = useState<"sequential" | "linked">("sequential");
  const [operation, setOperation] = useState<"access" | "insert">("access");
  const cost = mode === "sequential" ? operation === "access" ? "1 address" : "n/2 moves" : operation === "access" ? "n/2 links" : "2 link writes";
  return (
    <Figure caption="Logical list order can be represented by neighboring addresses or explicit links; the representation changes operation cost without changing the abstract sequence.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">representation<select className="mt-2 block w-full border border-border bg-background p-2" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="sequential">sequential allocation</option><option value="linked">linked allocation</option></select></label><label className="text-sm font-semibold text-primary">operation<select className="mt-2 block w-full border border-border bg-background p-2" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="access">access position i</option><option value="insert">insert after known node</option></select></label></div>
      <div className="mt-4"><Cells values={mode === "sequential" ? ["A", "B", "C", "D"] : ["A→B", "B→C", "C→D", "D→∅"]} active={operation === "access" ? 2 : 1} /></div>
      <div className="mt-4"><Stat label="model cost" value={cost} tone="success" /></div>
    </Figure>
  );
}

export function TcpLinkedInsertionLab() {
  const [committed, setCommitted] = useState(false);
  return (
    <Figure caption="Insertion after B is a two-link transaction: X first points to C, then B points to X; reversing those writes can lose the suffix.">
      <button type="button" className="w-full border border-accent bg-accent/10 p-3 font-semibold text-accent" onClick={() => setCommitted((value) => !value)}>{committed ? "restore A→B→C→D" : "insert X after B"}</button>
      <div className="mt-4"><Cells values={committed ? ["A→B", "B→X", "X→C", "C→D", "D→∅"] : ["A→B", "B→C", "C→D", "D→∅"]} active={committed ? 2 : 1} /></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="logical length" value={committed ? "5" : "4"} /><Stat label="reachable suffix" value="preserved" tone="success" /></div>
    </Figure>
  );
}

export function TcpDequeLab() {
  const [items, setItems] = useState([2, 3, 4]);
  const next = items.length ? Math.max(...items) + 1 : 1;
  return (
    <Figure caption="A deque exposes four boundary operations over one linear order; empty-state guards are part of the interface, not an implementation detail.">
      <div className="grid grid-cols-4 gap-1"><button type="button" className="border border-accent p-2 text-sm text-accent" onClick={() => setItems([next, ...items])}>push front</button><button type="button" className="border border-accent p-2 text-sm text-accent" onClick={() => setItems([...items, next])}>push back</button><button type="button" className="border border-warning p-2 text-sm text-warning" onClick={() => setItems(items.slice(1))}>pop front</button><button type="button" className="border border-warning p-2 text-sm text-warning" onClick={() => setItems(items.slice(0, -1))}>pop back</button></div>
      <div className="mt-4"><Cells values={items.length ? items : ["empty"]} /></div>
      <div className="mt-4"><Stat label="size" value={items.length.toString()} tone={items.length ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function TcpSequentialAllocationLab() {
  const [compacted, setCompacted] = useState(false);
  const before = ["A", "·", "B", "·", "·", "C", "D", "·"];
  const after = ["A", "B", "C", "D", "·", "·", "·", "·"];
  const values = compacted ? after : before;
  const holes = values.filter((value) => value === "·").length;
  return (
    <Figure caption="Sequential allocation offers arithmetic addressing, but deletions create holes; compaction restores contiguity by moving live records and updating references.">
      <button type="button" className="w-full border border-accent bg-accent/10 p-3 font-semibold text-accent" onClick={() => setCompacted((value) => !value)}>{compacted ? "show fragmented layout" : "compact live records"}</button>
      <div className="mt-4"><Cells values={values} /></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="capacity" value="8" /><Stat label="live records" value="4" /><Stat label="free cells" value={holes.toString()} tone="success" /></div>
    </Figure>
  );
}

function josephus(n: number, step: number) {
  const people = Array.from({ length: n }, (_, index) => index + 1);
  const removed: number[] = [];
  let index = 0;
  while (people.length > 1) {
    index = (index + step - 1) % people.length;
    removed.push(people.splice(index, 1)[0]);
  }
  return { removed, survivor: people[0] };
}

export function TcpCircularListLab() {
  const [n, setN] = useState(8);
  const [step, setStep] = useState(3);
  const result = josephus(n, step);
  return (
    <Figure caption="A circular list has no null tail; Josephus elimination repeatedly advances modulo the current length and removes one reachable node.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">nodes = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="16" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">step = {step}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label></div>
      <div className="mt-4"><Cells values={result.removed} /></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="removal order" value={result.removed.join(",")} /><Stat label="survivor" value={result.survivor.toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpDoublyLinkedLab() {
  const [removed, setRemoved] = useState(false);
  const nodes = removed ? ["A⇄B", "B⇄D", "D⇄E"] : ["A⇄B", "B⇄C", "C⇄D", "D⇄E"];
  return (
    <Figure caption="Removing C from a doubly linked list patches both neighboring directions; checking only the forward chain can leave a stale backward link.">
      <button type="button" className="w-full border border-accent bg-accent/10 p-3 font-semibold text-accent" onClick={() => setRemoved((value) => !value)}>{removed ? "restore C" : "unlink C"}</button>
      <div className="mt-4"><Cells values={nodes} active={removed ? 1 : 2} /></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="forward check" value="consistent" tone="success" /><Stat label="backward check" value="consistent" tone="success" /></div>
    </Figure>
  );
}

const tree = { value: "A", left: { value: "B", left: { value: "D" }, right: { value: "E" } }, right: { value: "C", right: { value: "F" } } };
type Tree = { value: string; left?: Tree; right?: Tree };

function traversal(node: Tree | undefined, mode: string, output: string[] = []) {
  if (!node) return output;
  if (mode === "pre") output.push(node.value);
  traversal(node.left, mode, output);
  if (mode === "in") output.push(node.value);
  traversal(node.right, mode, output);
  if (mode === "post") output.push(node.value);
  return output;
}

export function TcpTreeTraversalLab() {
  const [mode, setMode] = useState("in");
  const order = traversal(tree, mode, []);
  return (
    <Figure caption="Preorder, inorder, and postorder differ only in when the root is visited relative to its two subtrees; the recursive frame supplies the return path.">
      <label className="text-sm font-semibold text-primary">visit order<select className="mt-2 block w-full border border-border bg-background p-2" value={mode} onChange={(event) => setMode(event.target.value)}><option value="pre">root-left-right</option><option value="in">left-root-right</option><option value="post">left-right-root</option></select></label>
      <div className="mt-4"><Cells values={order} /></div>
      <div className="mt-4"><Stat label="traversal" value={order.join(" → ")} tone="success" /></div>
    </Figure>
  );
}

export function TcpChildSiblingLab() {
  const [expanded, setExpanded] = useState(true);
  return (
    <Figure caption="First-child/next-sibling links encode an arbitrary rooted tree with two pointers per node, separating descent from movement across siblings.">
      <button type="button" className="w-full border border-accent bg-accent/10 p-3 font-semibold text-accent" onClick={() => setExpanded((value) => !value)}>{expanded ? "collapse root children" : "expand root children"}</button>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="root A first-child" value={expanded ? "B" : "null"} /><Stat label="B next-sibling" value={expanded ? "C" : "hidden"} /><Stat label="C next-sibling" value={expanded ? "D" : "hidden"} tone="success" /></div>
      <div className="mt-3"><Cells values={expanded ? ["A↓B", "B→C", "C→D", "D→∅"] : ["A↓∅"]} /></div>
    </Figure>
  );
}

export function TcpTreePropertyLab() {
  const [nodes, setNodes] = useState(10);
  return (
    <Figure caption="Every finite nonempty tree with n nodes has n−1 edges; adding one new node must attach it with exactly one parent edge to preserve connected acyclicity.">
      <label className="text-sm font-semibold text-primary">nodes n = {nodes}<input className="mt-2 w-full accent-current" type="range" min="1" max="64" value={nodes} onChange={(event) => setNodes(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="nodes" value={nodes.toString()} /><Stat label="tree edges" value={(nodes - 1).toString()} /><Stat label="cycle rank" value="0" tone="success" /></div>
    </Figure>
  );
}

export function TcpGarbageCollectionLab() {
  const [rootB, setRootB] = useState(false);
  const reachable = new Set(["A", "C", "D", ...(rootB ? ["B", "E"] : [])]);
  const objects = ["A", "B", "C", "D", "E", "F"];
  return (
    <Figure caption="Mark-sweep starts from declared roots, follows links to a fixed point, then reclaims unmarked objects; reachability, not reference count, defines liveness here.">
      <label className="flex items-center gap-2 border border-border bg-background p-3 text-sm font-semibold text-primary"><input type="checkbox" checked={rootB} onChange={(event) => setRootB(event.target.checked)} />add B as a root</label>
      <div className="mt-4 grid grid-cols-6 gap-1">{objects.map((object) => <div key={object} className={`border p-3 text-center font-mono ${reachable.has(object) ? "border-success bg-success/15 text-success" : "border-warning bg-warning/10 text-warning"}`}>{object}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="marked" value={objects.filter((object) => reachable.has(object)).join(",")} tone="success" /><Stat label="sweep" value={objects.filter((object) => !reachable.has(object)).join(",")} tone="warning" /></div>
    </Figure>
  );
}

export function TcpMultilinkLab() {
  const [record, setRecord] = useState(1);
  const records = [
    { name: "Ada", team: "Compiler", year: 1843 },
    { name: "Grace", team: "Compiler", year: 1952 },
    { name: "Edsger", team: "Algorithms", year: 1959 },
  ];
  const selected = records[record];
  return (
    <Figure caption="A multilinked record participates in more than one traversal order; updating a record requires preserving every index chain that contains it.">
      <label className="text-sm font-semibold text-primary">record<select className="mt-2 block w-full border border-border bg-background p-2" value={record} onChange={(event) => setRecord(Number(event.target.value))}>{records.map((entry, index) => <option key={entry.name} value={index}>{entry.name}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="name chain" value={selected.name} /><Stat label="team chain" value={selected.team} /><Stat label="year chain" value={selected.year.toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpAllocatorLab() {
  const [request, setRequest] = useState(6);
  const [strategy, setStrategy] = useState<"first" | "best">("first");
  const holes = [12, 7, 20, 9];
  const eligible = holes.map((size, index) => ({ size, index })).filter((entry) => entry.size >= request);
  const chosen = strategy === "first" ? eligible[0] : eligible.slice().sort((a, b) => a.size - b.size)[0];
  return (
    <Figure caption="First-fit and best-fit choose different free blocks from the same list; allocation policy changes residual fragmentation while preserving non-overlap.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">request = {request}<input className="mt-2 w-full accent-current" type="range" min="1" max="24" value={request} onChange={(event) => setRequest(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">strategy<select className="mt-2 block w-full border border-border bg-background p-2" value={strategy} onChange={(event) => setStrategy(event.target.value as typeof strategy)}><option value="first">first fit</option><option value="best">best fit</option></select></label></div>
      <div className="mt-4"><Cells values={holes.map((size, index) => `H${index}:${size}`)} active={chosen?.index ?? -1} /></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="chosen block" value={chosen ? `H${chosen.index}` : "none"} tone={chosen ? "success" : "danger"} /><Stat label="residual" value={chosen ? (chosen.size - request).toString() : "allocation fails"} tone={chosen ? "accent" : "danger"} /></div>
    </Figure>
  );
}

export function TcpInformationCertificateLab() {
  const [shape, setShape] = useState(true);
  const [links, setLinks] = useState(false);
  const [reachability, setReachability] = useState(true);
  const [space, setSpace] = useState(false);
  const complete = shape && links && reachability && space;
  return (
    <Figure caption="An information-structure certificate combines shape, local link consistency, global reachability, and storage ownership checks.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={shape} onChange={(event) => setShape(event.target.checked)} />shape</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={links} onChange={(event) => setLinks(event.target.checked)} />link symmetry</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={reachability} onChange={(event) => setReachability(event.target.checked)} />reachability</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={space} onChange={(event) => setSpace(event.target.checked)} />ownership</label></div>
      <div className="mt-4"><Stat label="structure certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
