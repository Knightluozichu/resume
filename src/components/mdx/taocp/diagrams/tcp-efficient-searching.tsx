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

const ORDERED = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];

export function TcpSequentialSearchLab() {
  const [target, setTarget] = useState(23);
  const index = ORDERED.indexOf(target);
  const comparisons = index < 0 ? ORDERED.length : index + 1;
  return (
    <Figure caption="Sequential search needs no ordering and stops at the first match; a sentinel removes an inner boundary test without changing linear comparison growth.">
      <label className="text-sm font-semibold text-primary">target = {target}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="95" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-11 gap-1">{ORDERED.map((value, position) => <div key={value} className={`border p-2 text-center font-mono text-xs ${position < comparisons ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-primary"}`}>{value}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="comparisons" value={comparisons.toString()} /><Stat label="index" value={index.toString()} tone={index < 0 ? "warning" : "success"} /><Stat label="ordering required" value="no" /></div>
    </Figure>
  );
}

function lowerBoundTrace(values: number[], target: number) {
  let low = 0;
  let high = values.length;
  const mids: number[] = [];
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    mids.push(middle);
    if (values[middle] < target) low = middle + 1;
    else high = middle;
  }
  return { index: low, mids };
}

export function TcpBinarySearchLab() {
  const [target, setTarget] = useState(38);
  const result = lowerBoundTrace(ORDERED, target);
  const found = result.index < ORDERED.length && ORDERED[result.index] === target;
  return (
    <Figure caption="Half-open binary search preserves the invariant that every valid lower-bound answer lies in [low, high]; the same contract handles missing keys and duplicates.">
      <label className="text-sm font-semibold text-primary">target = {target}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="95" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-11 gap-1">{ORDERED.map((value, index) => <div key={value} className={`border p-2 text-center font-mono text-xs ${result.mids.includes(index) ? "border-warning bg-warning/20 text-warning" : index === result.index ? "border-success bg-success/15 text-success" : "border-border bg-background text-primary"}`}>{value}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="probed indices" value={result.mids.join(" → ")} /><Stat label="lower bound" value={result.index.toString()} /><Stat label="exact match" value={found ? "yes" : "no"} tone={found ? "success" : "warning"} /></div>
    </Figure>
  );
}

const TREE: Record<number, [number | null, number | null]> = { 8: [4, 12], 4: [2, 6], 12: [10, 14], 2: [null, null], 6: [null, null], 10: [null, null], 14: [null, null] };

export function TcpBstSearchLab() {
  const [target, setTarget] = useState(10);
  const path: number[] = [];
  let current: number | null = 8;
  while (current !== null) {
    path.push(current);
    if (current === target) break;
    current = target < current ? TREE[current][0] : TREE[current][1];
  }
  const found = path.at(-1) === target;
  return (
    <Figure caption="Binary-search-tree lookup follows one root-to-leaf comparison path; cost is tree height, so shape is part of the data-structure contract.">
      <label className="text-sm font-semibold text-primary">target key = {target}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="15" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-7 gap-2">{[8, 4, 12, 2, 6, 10, 14].map((value) => <Stat key={value} label={`key ${value}`} value={path.includes(value) ? `visit ${path.indexOf(value) + 1}` : "not visited"} tone={path.at(-1) === value && found ? "success" : path.includes(value) ? "warning" : "accent"} />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="search path" value={path.join(" → ")} /><Stat label="result" value={found ? "found" : "absent"} tone={found ? "success" : "warning"} /></div>
    </Figure>
  );
}

const ROTATIONS = {
  LL: { input: "30 ← 20 ← 10", root: 20, action: "right rotation" },
  LR: { input: "30 ← 10 → 20", root: 20, action: "left then right" },
  RR: { input: "10 → 20 → 30", root: 20, action: "left rotation" },
  RL: { input: "10 → 30 ← 20", root: 20, action: "right then left" },
} as const;

export function TcpBalancedTreeLab() {
  const [caseName, setCaseName] = useState<keyof typeof ROTATIONS>("LL");
  const value = ROTATIONS[caseName];
  return (
    <Figure caption="Balanced search trees repair local height violations with rotations while preserving in-order key order; logarithmic lookup depends on that height bound.">
      <label className="text-sm font-semibold text-primary">imbalance case<select className="mt-2 block w-full border border-border bg-background p-2" value={caseName} onChange={(event) => setCaseName(event.target.value as keyof typeof ROTATIONS)}><option value="LL">LL</option><option value="LR">LR</option><option value="RR">RR</option><option value="RL">RL</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="before" value={value.input} /><Stat label="repair" value={value.action} tone="warning" /><Stat label="new root" value={value.root.toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpBTreeFanoutLab() {
  const [blockSize, setBlockSize] = useState(4096);
  const [keyBytes, setKeyBytes] = useState(16);
  const pointerBytes = 8;
  const fanout = Math.max(2, Math.floor((blockSize + keyBytes) / (keyBytes + pointerBytes)));
  const records = 1_000_000_000;
  const height = Math.ceil(Math.log(records) / Math.log(fanout));
  return (
    <Figure caption="A multiway search tree matches one node to one storage block; larger fanout lowers height and therefore random block reads.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">block bytes = {blockSize}<input className="mt-2 h-11 w-full accent-current" type="range" min="1024" max="16384" step="1024" value={blockSize} onChange={(event) => setBlockSize(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">key bytes = {keyBytes}<input className="mt-2 h-11 w-full accent-current" type="range" min="4" max="64" step="4" value={keyBytes} onChange={(event) => setKeyBytes(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="estimated fanout" value={fanout.toString()} /><Stat label="records" value="1,000,000,000" /><Stat label="height bound" value={height.toString()} tone="success" /></div>
    </Figure>
  );
}

const WORDS = ["car", "card", "care", "cat", "do", "dog", "dot"];

export function TcpTrieLab() {
  const [prefix, setPrefix] = useState("ca");
  const matches = WORDS.filter((word) => word.startsWith(prefix));
  return (
    <Figure caption="A trie follows key digits rather than comparing whole keys; lookup cost follows key length and prefix queries identify a complete subtree.">
      <label className="text-sm font-semibold text-primary">prefix<select className="mt-2 block w-full border border-border bg-background p-2" value={prefix} onChange={(event) => setPrefix(event.target.value)}><option value="c">c</option><option value="ca">ca</option><option value="car">car</option><option value="d">d</option><option value="do">do</option></select></label>
      <div className="mt-4 grid grid-cols-7 gap-2">{WORDS.map((word) => <Stat key={word} label="key" value={word} tone={word.startsWith(prefix) ? "success" : "accent"} />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="matched keys" value={matches.join(" ")} /><Stat label="prefix characters read" value={prefix.length.toString()} tone="success" /></div>
    </Figure>
  );
}

function commonPrefix(left: string, right: string) {
  let index = 0;
  while (index < left.length && index < right.length && left[index] === right[index]) index += 1;
  return left.slice(0, index);
}

export function TcpPatriciaLab() {
  const [pair, setPair] = useState(0);
  const pairs = [["001011", "001110"], ["101001", "101011"], ["010100", "110100"]];
  const [left, right] = pairs[pair];
  const prefix = commonPrefix(left, right);
  return (
    <Figure caption="A compressed digital tree skips unary paths and stores the first discriminating bit, reducing pointer-heavy chains without losing digital-search decisions.">
      <label className="text-sm font-semibold text-primary">key pair<select className="mt-2 block w-full border border-border bg-background p-2" value={pair} onChange={(event) => setPair(Number(event.target.value))}>{pairs.map((value, index) => <option key={index} value={index}>{value.join(" / ")}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="common path" value={prefix || "empty"} /><Stat label="branch bit index" value={prefix.length.toString()} tone="warning" /><Stat label="compressed edges" value={`${left.slice(prefix.length)} | ${right.slice(prefix.length)}`} tone="success" /></div>
    </Figure>
  );
}

const HASH_KEYS = [19, 27, 36, 10, 64, 45, 18, 54, 72];

export function TcpChainingLab() {
  const [buckets, setBuckets] = useState(7);
  const table = Array.from({ length: buckets }, () => [] as number[]);
  for (const key of HASH_KEYS) table[key % buckets].push(key);
  const longest = Math.max(...table.map((chain) => chain.length));
  return (
    <Figure caption="Separate chaining stores colliding keys in per-bucket collections; load factor predicts average work only under a suitable hash distribution.">
      <label className="text-sm font-semibold text-primary">bucket count = {buckets}<input className="mt-2 h-11 w-full accent-current" type="range" min="3" max="13" value={buckets} onChange={(event) => setBuckets(Number(event.target.value))} /></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-4">{table.map((chain, index) => <Stat key={index} label={`bucket ${index}`} value={chain.join(" → ") || "empty"} tone={chain.length > 2 ? "warning" : "accent"} />)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="load factor" value={(HASH_KEYS.length / buckets).toFixed(2)} /><Stat label="longest chain" value={longest.toString()} tone="warning" /><Stat label="all keys retained" value={table.flat().length.toString()} tone="success" /></div>
    </Figure>
  );
}

function openAddress(keys: number[], mode: "linear" | "quadratic" | "double") {
  const size = 11;
  const table: Array<number | null> = Array.from({ length: size }, () => null);
  let probes = 0;
  for (const key of keys) {
    let placed = false;
    for (let attempt = 0; attempt < size; attempt += 1) {
      const step = mode === "linear" ? attempt : mode === "quadratic" ? attempt * attempt : attempt * (1 + key % (size - 1));
      const slot = (key % size + step) % size;
      probes += 1;
      if (table[slot] === null) { table[slot] = key; placed = true; break; }
    }
    if (!placed) return { table, probes, placed: false };
  }
  return { table, probes, placed: true };
}

export function TcpOpenAddressLab() {
  const [mode, setMode] = useState<"linear" | "quadratic" | "double">("linear");
  const result = openAddress([22, 1, 13, 11, 24, 33, 44], mode);
  return (
    <Figure caption="Open addressing keeps every key in the array; the probe sequence must cover enough slots, and clustering changes work long before the table is full.">
      <label className="text-sm font-semibold text-primary">probe rule<select className="mt-2 block w-full border border-border bg-background p-2" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="linear">linear</option><option value="quadratic">quadratic</option><option value="double">double hashing</option></select></label>
      <div className="mt-4 grid grid-cols-11 gap-1">{result.table.map((key, index) => <div key={index} className="border border-border bg-background p-2 text-center font-mono text-xs text-primary"><span className="block text-secondary">{index}</span>{key ?? "·"}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="total probes" value={result.probes.toString()} /><Stat label="load factor" value={(7 / 11).toFixed(2)} /><Stat label="all inserted" value={result.placed ? "yes" : "no"} tone={result.placed ? "success" : "danger"} /></div>
    </Figure>
  );
}

const PEOPLE = [
  { id: 1, team: "compiler", level: "senior" },
  { id: 2, team: "render", level: "junior" },
  { id: 3, team: "compiler", level: "junior" },
  { id: 4, team: "render", level: "senior" },
  { id: 5, team: "storage", level: "senior" },
  { id: 6, team: "compiler", level: "senior" },
];

export function TcpSecondaryKeyLab() {
  const [team, setTeam] = useState("compiler");
  const [level, setLevel] = useState("senior");
  const teamPostings = PEOPLE.filter((person) => person.team === team).map((person) => person.id);
  const levelPostings = PEOPLE.filter((person) => person.level === level).map((person) => person.id);
  const result = teamPostings.filter((id) => levelPostings.includes(id));
  return (
    <Figure caption="Secondary-key retrieval maps each nonunique attribute value to a posting list; conjunction becomes an intersection over record identifiers.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">team<select className="mt-2 block w-full border border-border bg-background p-2" value={team} onChange={(event) => setTeam(event.target.value)}><option value="compiler">compiler</option><option value="render">render</option><option value="storage">storage</option></select></label><label className="text-sm font-semibold text-primary">level<select className="mt-2 block w-full border border-border bg-background p-2" value={level} onChange={(event) => setLevel(event.target.value)}><option value="senior">senior</option><option value="junior">junior</option></select></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label={`team=${team}`} value={teamPostings.join(" ") || "empty"} /><Stat label={`level=${level}`} value={levelPostings.join(" ") || "empty"} /><Stat label="intersection" value={result.join(" ") || "empty"} tone="success" /></div>
    </Figure>
  );
}

const POSTINGS: Record<string, number[]> = { algorithm: [1, 2, 4, 7, 9], tree: [2, 3, 7, 8], disk: [1, 5, 7, 8, 9] };

export function TcpInvertedIndexLab() {
  const [left, setLeft] = useState("algorithm");
  const [right, setRight] = useState("tree");
  const intersection = POSTINGS[left].filter((id) => POSTINGS[right].includes(id));
  return (
    <Figure caption="An inverted index reverses document-to-term storage into term-to-document postings; sorted identifiers support linear intersection and skipping.">
      <div className="grid gap-4 sm:grid-cols-2">{[left, right].map((value, index) => <label key={index} className="text-sm font-semibold text-primary">term {index + 1}<select className="mt-2 block w-full border border-border bg-background p-2" value={value} onChange={(event) => index === 0 ? setLeft(event.target.value) : setRight(event.target.value)}><option value="algorithm">algorithm</option><option value="tree">tree</option><option value="disk">disk</option></select></label>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label={left} value={POSTINGS[left].join(" ")} /><Stat label={right} value={POSTINGS[right].join(" ")} /><Stat label="AND result" value={intersection.join(" ") || "empty"} tone="success" /></div>
    </Figure>
  );
}

export function TcpSearchCertificateLab() {
  const [semantics, setSemantics] = useState(true);
  const [structure, setStructure] = useState(false);
  const [adversary, setAdversary] = useState(true);
  const [cost, setCost] = useState(false);
  const complete = semantics && structure && adversary && cost;
  return (
    <Figure caption="A search certificate states query semantics, checks the index invariant, includes absent and adversarial keys, and measures the relevant memory or I/O cost.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={semantics} onChange={(event) => setSemantics(event.target.checked)} />query semantics</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={structure} onChange={(event) => setStructure(event.target.checked)} />invariant</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={adversary} onChange={(event) => setAdversary(event.target.checked)} />absent / collision</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={cost} onChange={(event) => setCost(event.target.checked)} />probe / I-O cost</label></div>
      <div className="mt-4"><Stat label="Chapter 6 search certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function TcpEfficientSearchingDiagram() {
  return <TcpBinarySearchLab />;
}
