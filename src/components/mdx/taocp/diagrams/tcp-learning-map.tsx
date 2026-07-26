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

const volumes = [
  { id: "1", title: "Fundamental Algorithms", edition: "3rd", chapters: ["1 · Basic Concepts", "2 · Information Structures"], color: "border-accent text-accent" },
  { id: "2", title: "Seminumerical Algorithms", edition: "3rd", chapters: ["3 · Random Numbers", "4 · Arithmetic"], color: "border-success text-success" },
  { id: "3", title: "Sorting and Searching", edition: "2nd", chapters: ["5 · Sorting", "6 · Searching"], color: "border-warning text-warning" },
  { id: "4A", title: "Combinatorial Algorithms, Part 1", edition: "1st", chapters: ["7 · Zeros, ones, and generation"], color: "border-danger text-danger" },
  { id: "4B", title: "Combinatorial Algorithms, Part 2", edition: "1st", chapters: ["7 · Backtracking, DLX, and SAT"], color: "border-accent text-accent" },
] as const;

export function TcpBookMap() {
  const [selected, setSelected] = useState("1");
  const volume = volumes.find((entry) => entry.id === selected)!;
  return (
    <Figure caption="The published TAOCP spine contains five physical volumes and eight teaching units: Chapters 1–6 plus Chapter 7 split across 4A and 4B.">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{volumes.map((entry) => <button key={entry.id} type="button" className={`min-h-14 border bg-background p-2 text-sm font-semibold ${entry.id === selected ? entry.color : "border-border text-secondary"}`} onClick={() => setSelected(entry.id)}>Volume {entry.id}</button>)}</div>
      <div className={`mt-4 border p-4 ${volume.color}`}><div className="text-xs">Volume {volume.id} · {volume.edition} edition</div><div className="mt-1 text-base font-semibold text-primary">{volume.title}</div><div className="mt-4 grid gap-2 sm:grid-cols-2">{volume.chapters.map((chapter) => <div key={chapter} className="border border-border bg-background p-3 text-sm text-primary">{chapter}</div>)}</div></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="published volumes" value="5" /><Stat label="numbered chapters" value="1..7" /><Stat label="course units" value="8" tone="success" /></div>
    </Figure>
  );
}

export function TcpPublishedScopeLab() {
  const [publishedOnly, setPublishedOnly] = useState(true);
  const future = ["Volume 4C · in-progress fascicles", "Volume 5 · in preparation", "Volumes 6–7 · future plans"];
  return (
    <Figure caption="The quality boundary follows the publisher's current Volumes 1–4B boxed set; drafts and planned volumes remain visible as context, not completion requirements.">
      <label className="flex items-center gap-2 border border-border bg-background p-3 text-sm font-semibold text-primary"><input type="checkbox" checked={publishedOnly} onChange={(event) => setPublishedOnly(event.target.checked)} />published boxed-set scope only</label>
      <div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="border border-success p-4"><div className="font-semibold text-success">Acceptance scope</div><div className="mt-2 text-sm text-primary">Volumes 1, 2, 3, 4A, 4B</div></div><div className={`border p-4 ${publishedOnly ? "border-border opacity-45" : "border-warning"}`}><div className="font-semibold text-warning">Outside current scope</div>{future.map((entry) => <div key={entry} className="mt-2 text-sm text-primary">{entry}</div>)}</div></div>
      <div className="mt-4"><Stat label="scope state" value={publishedOnly ? "published corpus" : "published + roadmap"} tone={publishedOnly ? "success" : "warning"} /></div>
    </Figure>
  );
}

const chapterSpine = [
  { id: 1, label: "Basic Concepts", inputs: "algorithm + mathematics", output: "analysis contract" },
  { id: 2, label: "Information Structures", inputs: "records + links", output: "representation invariants" },
  { id: 3, label: "Random Numbers", inputs: "state + recurrence", output: "tested random stream" },
  { id: 4, label: "Arithmetic", inputs: "digits + radix", output: "exact/rounded operations" },
  { id: 5, label: "Sorting", inputs: "records + order", output: "ordered sequence" },
  { id: 6, label: "Searching", inputs: "keys + structure", output: "retrieval result" },
  { id: 7, label: "Combinatorial Searching", inputs: "objects + constraints", output: "generated/solved space" },
];

export function TcpChapterSpineLab() {
  const [chapter, setChapter] = useState(1);
  const selected = chapterSpine[chapter - 1];
  return (
    <Figure caption="Every chapter pairs a representation with an algorithm and a measurable claim; selecting a chapter exposes that input-to-certificate contract.">
      <label className="text-sm font-semibold text-primary">chapter = {chapter}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="7" value={chapter} onChange={(event) => setChapter(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2"><Stat label="input" value={selected.inputs} /><div className="text-xl text-accent">→</div><Stat label="certificate" value={selected.output} tone="success" /></div>
      <div className="mt-3 border border-border bg-background p-3 text-center text-sm font-semibold text-primary">Chapter {selected.id} · {selected.label}</div>
    </Figure>
  );
}

export function TcpReadingContractLab() {
  const [specification, setSpecification] = useState(true);
  const [invariant, setInvariant] = useState(false);
  const [analysis, setAnalysis] = useState(true);
  const [experiment, setExperiment] = useState(false);
  const complete = specification && invariant && analysis && experiment;
  return (
    <Figure caption="A TAOCP reading unit is complete only when its specification, invariant, quantitative analysis, and executable experiment agree.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={specification} onChange={(event) => setSpecification(event.target.checked)} />specification</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={invariant} onChange={(event) => setInvariant(event.target.checked)} />invariant</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={analysis} onChange={(event) => setAnalysis(event.target.checked)} />analysis</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={experiment} onChange={(event) => setExperiment(event.target.checked)} />experiment</label></div>
      <div className="mt-4"><Stat label="reading certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
