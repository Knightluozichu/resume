"use client";

import { useState, type ReactNode } from "react";

const surveyInput = [2, 5, 2, 1, 4, 2, 5, 3, 4, 2, 1, 5];
const records = [
  { title: "Programming Pearls", author: "Jon Bentley", city: "Reading", year: "1999" },
  { title: "The C++ Programming Language", author: "Bjarne Stroustrup", city: "Boston", year: "2013" },
];

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

export function PP2IfChainToArrayLab() {
  const [categories, setCategories] = useState(100);
  const branchLines = categories * 2;
  const arrayLines = 4;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">survey categories = {categories}<input className="mt-2 w-full accent-current" type="range" min="10" max="500" step="10" value={categories} onChange={(event) => setCategories(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-danger p-4 text-danger"><div className="text-xs">one branch per category</div><div className="font-mono text-2xl">≈ {branchLines} lines</div><div className="mt-1 text-xs">structure lives in source code</div></div><div className="border border-success p-4 text-success"><div className="text-xs">counts[k]++</div><div className="font-mono text-2xl">≈ {arrayLines} lines</div><div className="mt-1 text-xs">structure lives in indexed data</div></div></div>
      </Panel>
      <Caption>An array turns hundreds of repeated control-flow cases into one indexed operation and makes the category range explicit.</Caption>
    </figure>
  );
}

export function PP2SurveyProgramLab() {
  const [prefix, setPrefix] = useState(surveyInput.length);
  const counts = surveyInput.slice(0, prefix).reduce((result, answer) => {
    result[answer] += 1;
    return result;
  }, [0, 0, 0, 0, 0, 0]);
  const max = Math.max(1, ...counts);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">responses processed = {prefix}<input className="mt-2 w-full accent-current" type="range" min="0" max={surveyInput.length} value={prefix} onChange={(event) => setPrefix(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-5 items-end gap-2">{counts.slice(1).map((count, index) => <div key={index} className="text-center"><div className="mx-auto w-full border border-accent bg-accent/20" style={{ height: `${Math.max(8, count / max * 100)}px` }} /><div className="mt-1 font-mono text-xs text-secondary">{index + 1}: {count}</div></div>)}</div>
      </Panel>
      <Caption>The invariant after k inputs is counts[v] equals the number of processed responses whose value is v.</Caption>
    </figure>
  );
}

export function PP2FormLetterDataLab() {
  const [recordIndex, setRecordIndex] = useState(0);
  const record = records[recordIndex];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">data record<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={recordIndex} onChange={(event) => setRecordIndex(Number(event.target.value))}>{records.map((item, index) => <option key={item.title} value={index}>{item.title}</option>)}</select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">{Object.entries(record).map(([name, value]) => <div key={name} className="grid grid-cols-[6rem_1fr] border border-border p-3 text-sm"><span className="font-mono text-accent">%{name}</span><span className="text-primary">{value}</span></div>)}</div>
      </Panel>
      <Caption>Name-value pairs separate changing document facts from the template and control logic that render them.</Caption>
    </figure>
  );
}

export function PP2TemplateRenderLab() {
  const [recordIndex, setRecordIndex] = useState(0);
  const [showCity, setShowCity] = useState(true);
  const record = records[recordIndex];
  const rendered = `${record.title}\n${record.author}\n${showCity ? `${record.city}, ` : ""}${record.year}`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-2 sm:grid-cols-2"><label className="text-xs text-secondary">record<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={recordIndex} onChange={(event) => setRecordIndex(Number(event.target.value))}>{records.map((item, index) => <option key={item.title} value={index}>{item.title}</option>)}</select></label><label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={showCity} onChange={(event) => setShowCity(event.target.checked)} />include city field</label></div>
        <pre className="mt-4 whitespace-pre-wrap border border-success bg-background p-4 font-mono text-sm text-success">{rendered}</pre>
      </Panel>
      <Caption>A small renderer combines one reusable template with many records; changing layout no longer requires changing every letter.</Caption>
    </figure>
  );
}

export function PP2ArrayExamplesLab() {
  const [example, setExample] = useState<"month days" | "letter count" | "prices">("month days");
  const values = {
    "month days": [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    "letter count": [8, 2, 3, 4, 12, 2, 2, 6, 7, 1, 1, 4],
    prices: [99, 129, 75, 210, 88, 160, 142, 105, 94, 180, 115, 132],
  }[example];
  const [index, setIndex] = useState(0);
  const safeIndex = Math.min(index, values.length - 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">array example<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={example} onChange={(event) => { setExample(event.target.value as typeof example); setIndex(0); }}><option>month days</option><option>letter count</option><option>prices</option></select></label>
        <label className="mt-3 block text-xs text-secondary">index = {safeIndex}<input className="mt-2 w-full accent-current" type="range" min="0" max={values.length - 1} value={safeIndex} onChange={(event) => setIndex(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-6 gap-1">{values.map((value, itemIndex) => <div key={itemIndex} className={"border p-2 text-center font-mono text-xs " + (itemIndex === safeIndex ? "border-accent text-accent" : "border-border text-secondary")}><div>{itemIndex}</div><div>{value}</div></div>)}</div>
      </Panel>
      <Caption>Arrays replace families of similarly named variables whenever an integer index is the natural key.</Caption>
    </figure>
  );
}

export function PP2RepresentationSelectorLab() {
  const [workload, setWorkload] = useState<"dense integer keys" | "ordered range queries" | "sparse names" | "graph edges">("dense integer keys");
  const choice = {
    "dense integer keys": ["array / bitmap", "O(1) direct indexing", "space follows universe size"],
    "ordered range queries": ["balanced search tree", "O(log n) updates and ordered traversal", "pointer and balancing overhead"],
    "sparse names": ["hash table", "expected O(1) lookup", "no natural order"],
    "graph edges": ["adjacency lists", "space O(V+E)", "neighbor traversal is local"],
  }[workload];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">data and workload<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={workload} onChange={(event) => setWorkload(event.target.value as typeof workload)}><option>dense integer keys</option><option>ordered range queries</option><option>sparse names</option><option>graph edges</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">{choice[0]}</div><div className="border border-success p-3 text-success">{choice[1]}</div><div className="border border-warning p-3 text-warning">{choice[2]}</div></div>
      </Panel>
      <Caption>Data structure choice follows key domain, operations, ordering needs, density, mutation pattern, and resource budget.</Caption>
    </figure>
  );
}

export function PP2ParallelArraysLab() {
  const [mode, setMode] = useState<"parallel arrays" | "records">("records");
  const rows = [
    { name: "Ada", score: 94, active: true },
    { name: "Edsger", score: 98, active: false },
    { name: "Grace", score: 97, active: true },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">layout<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option>parallel arrays</option><option>records</option></select></label>
        <div className="mt-4 space-y-2">{mode === "records" ? rows.map((row) => <div key={row.name} className="grid grid-cols-3 border border-success p-3 text-sm text-success"><span>{row.name}</span><span>{row.score}</span><span>{row.active ? "active" : "paused"}</span></div>) : Object.keys(rows[0]).map((key) => <div key={key} className="grid grid-cols-[6rem_1fr] border border-warning p-3 text-sm text-warning"><span>{key}[]</span><span>{rows.map((row) => String(row[key as keyof typeof row])).join(" · ")}</span></div>)}</div>
      </Panel>
      <Caption>Records preserve field relationships during insert, delete, sort, and ownership changes; parallel arrays require every index operation to stay synchronized.</Caption>
    </figure>
  );
}

export function PP2ADTBoundaryLab() {
  const [representation, setRepresentation] = useState<"sorted array" | "hash table">("sorted array");
  const detail = representation === "sorted array"
    ? { find: "O(log n)", insert: "O(n)", ordered: "yes" }
    : { find: "expected O(1)", insert: "expected O(1)", ordered: "no" };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="border border-accent p-3 text-center text-accent">published abstraction: insert(key), contains(key), size()</div>
        <label className="mt-3 block text-xs text-secondary">hidden representation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={representation} onChange={(event) => setRepresentation(event.target.value as typeof representation)}><option>sorted array</option><option>hash table</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2">{Object.entries(detail).map(([name, value]) => <div key={name} className="border border-success p-3 text-center text-xs text-success"><div>{name}</div><div className="mt-1 font-mono">{value}</div></div>)}</div>
      </Panel>
      <Caption>An abstract data type publishes essential operations and hides representation so clients survive a data-structure change.</Caption>
    </figure>
  );
}

export function PP2SpecializedToolsLab() {
  const [tool, setTool] = useState<"hypertext" | "spreadsheet" | "database" | "UI properties">("spreadsheet");
  const details = {
    hypertext: ["nodes + links", "navigate cross-references", "documents and knowledge"],
    spreadsheet: ["cells + formulas", "automatic dependency recomputation", "budgets and tabular models"],
    database: ["relations + queries", "index, filter, join, transaction", "persistent shared records"],
    "UI properties": ["name-value controls", "declarative layout and behavior", "forms and visual interfaces"],
  }[tool];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">specialized data tool<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={tool} onChange={(event) => setTool(event.target.value as typeof tool)}><option>hypertext</option><option>spreadsheet</option><option>database</option><option>UI properties</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">{details[0]}</div><div className="border border-success p-3 text-success">{details[1]}</div><div className="border border-warning p-3 text-warning">{details[2]}</div></div>
      </Panel>
      <Caption>Specialized tools encode a common data model and its operations, replacing application-specific control flow with declarative data.</Caption>
    </figure>
  );
}

export function PP2DataDrivenProgramLab() {
  const [discount, setDiscount] = useState(10);
  const rules = [
    { min: 0, label: "standard", rate: 0 },
    { min: 100, label: "preferred", rate: discount },
    { min: 500, label: "premium", rate: discount + 5 },
  ];
  const [amount, setAmount] = useState(240);
  const rule = [...rules].reverse().find((candidate) => amount >= candidate.min) ?? rules[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">purchase = {amount}<input className="mt-2 w-full accent-current" type="range" min="0" max="800" step="10" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label><label className="text-xs text-secondary">preferred discount = {discount}%<input className="mt-2 w-full accent-current" type="range" min="0" max="20" value={discount} onChange={(event) => setDiscount(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{rules.map((item) => <div key={item.label} className={"border p-3 text-xs " + (item.label === rule.label ? "border-success text-success" : "border-border text-secondary")}><div>{item.label}</div><div className="font-mono">min {item.min} · {item.rate}%</div></div>)}</div>
        <div className="mt-3 border border-accent p-3 text-accent">selected by generic rule scan: {rule.label}, final {(amount * (1 - rule.rate / 100)).toFixed(2)}</div>
      </Panel>
      <Caption>When variations live in tables, one generic interpreter replaces repeated branches and behavior changes become data changes.</Caption>
    </figure>
  );
}

export function PP2StructureCostLab() {
  const [items, setItems] = useState(1000);
  const candidates = [
    ["array", items * 8, "contiguous, low overhead"],
    ["linked nodes", items * 24, "pointers and allocator overhead"],
    ["hash slots at 0.75 load", Math.ceil(items / 0.75) * 16, "spare buckets for speed"],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">items = {items}<input className="mt-2 w-full accent-current" type="range" min="100" max="5000" step="100" value={items} onChange={(event) => setItems(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{candidates.map(([name, bytes, note]) => <div key={String(name)} className="border border-border p-3 text-xs"><div className="font-semibold text-primary">{name}</div><div className="mt-1 font-mono text-accent">{Number(bytes).toLocaleString()} bytes</div><div className="mt-1 text-secondary">{note}</div></div>)}</div>
      </Panel>
      <Caption>Data structures are executable cost models: payload, metadata, locality, load factor, and allocation policy all affect real space and time.</Caption>
    </figure>
  );
}

export function PP2StructureCertificateLab() {
  const [mutation, setMutation] = useState<"valid" | "bad index" | "parallel drift" | "leaky abstraction">("valid");
  const checks = {
    domain: mutation !== "bad index",
    relationships: mutation !== "parallel drift",
    encapsulation: mutation !== "leaky abstraction",
    workload: true,
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">structure audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mutation} onChange={(event) => setMutation(event.target.value as typeof mutation)}><option>valid</option><option>bad index</option><option>parallel drift</option><option>leaky abstraction</option></select></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-3 text-center text-[11px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The representation preserves data relationships, supports the workload, and stays behind a stable interface." : "The program's simplicity is accidental; a representation invariant is broken."}</div>
      </Panel>
      <Caption>A data-structure certificate checks domain bounds, relationship preservation, operation semantics, encapsulation, and measured workload costs.</Caption>
    </figure>
  );
}
