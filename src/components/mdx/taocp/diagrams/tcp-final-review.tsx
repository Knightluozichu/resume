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

const UNITS = [
  { id: "V1-C1", volume: "Volume 1", title: "Basic Concepts", contract: "algorithm + proof + cost" },
  { id: "V1-C2", volume: "Volume 1", title: "Information Structures", contract: "representation + invariant" },
  { id: "V2-C3", volume: "Volume 2", title: "Random Numbers", contract: "state + statistical battery" },
  { id: "V2-C4", volume: "Volume 2", title: "Arithmetic", contract: "representation + error" },
  { id: "V3-C5", volume: "Volume 3", title: "Sorting", contract: "order + multiset + stability" },
  { id: "V3-C6", volume: "Volume 3", title: "Searching", contract: "query + index + cost" },
  { id: "V4A-C7", volume: "Volume 4A", title: "Combinatorial Part 1", contract: "valid + unique + complete" },
  { id: "V4B-C7", volume: "Volume 4B", title: "Combinatorial Part 2", contract: "state + prune + witness" },
] as const;

export function TcpPublishedSpineLab() {
  const [volume, setVolume] = useState("all");
  const units = volume === "all" ? UNITS : UNITS.filter((unit) => unit.volume === volume);
  return (
    <Figure caption="The current published spine contains eight teaching units across Volumes 1 through 4B; navigation pages do not replace those official units.">
      <label className="text-sm font-semibold text-primary">published volume<select className="mt-2 block w-full border border-border bg-background p-2" value={volume} onChange={(event) => setVolume(event.target.value)}><option value="all">all published units</option>{[...new Set(UNITS.map((unit) => unit.volume))].map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">{units.map((unit) => <Stat key={unit.id} label={`${unit.id} · ${unit.title}`} value={unit.contract} tone="success" />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="visible units" value={units.length.toString()} /><Stat label="published boundary" value="Volumes 1–4B" /></div>
    </Figure>
  );
}

const INVARIANTS = {
  structure: ["representation is canonical", "links or indices agree", "size metadata is exact"],
  numeric: ["rounding contract is stated", "error bound is measured", "independent oracle agrees"],
  generator: ["every object is valid", "no duplicate ranks", "count matches theory"],
  solver: ["partial state is legal", "undo restores parent", "pruning has a proof"],
} as const;

export function TcpInvariantMatrixLab() {
  const [family, setFamily] = useState<keyof typeof INVARIANTS>("structure");
  return (
    <Figure caption="Cross-chapter invariants turn a final output check into local proof obligations that can be tested after every state transition.">
      <label className="text-sm font-semibold text-primary">artifact family<select className="mt-2 block w-full border border-border bg-background p-2" value={family} onChange={(event) => setFamily(event.target.value as keyof typeof INVARIANTS)}><option value="structure">information structure</option><option value="numeric">numeric algorithm</option><option value="generator">combinatorial generator</option><option value="solver">backtracking solver</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{INVARIANTS[family].map((invariant, index) => <Stat key={invariant} label={`obligation ${index + 1}`} value={invariant} tone="success" />)}</div>
    </Figure>
  );
}

export function TcpCostModelLab() {
  const [records, setRecords] = useState(1_000_000);
  const [runs, setRuns] = useState(64);
  const [ways, setWays] = useState(8);
  const comparisons = records * Math.log2(records);
  let passes = 0;
  for (let mergedRuns = 1; mergedRuns < runs; mergedRuns *= ways) passes += 1;
  return (
    <Figure caption="The same asymptotic notation can hide distinct resources; a useful cost model names comparisons, memory traffic, random block reads, and full external passes separately.">
      <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">records = {records.toLocaleString()}<input className="mt-2 h-11 w-full accent-current" type="range" min="1000" max="10000000" step="1000" value={records} onChange={(event) => setRecords(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">initial runs = {runs}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="256" value={runs} onChange={(event) => setRuns(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">merge ways = {ways}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="32" value={ways} onChange={(event) => setWays(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="n log2 n comparisons" value={Math.round(comparisons).toLocaleString()} /><Stat label="external passes" value={passes.toString()} tone="warning" /><Stat label="read+write data volumes" value={(2 * passes).toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpEvidenceMatrixLab() {
  const [example, setExample] = useState(true);
  const [property, setProperty] = useState(false);
  const [exhaustive, setExhaustive] = useState(true);
  const [independent, setIndependent] = useState(false);
  const score = [example, property, exhaustive, independent].filter(Boolean).length;
  return (
    <Figure caption="Evidence strength increases when examples, invariant properties, exhaustive small cases, and an independent implementation agree without sharing the same failure mode.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={example} onChange={(event) => setExample(event.target.checked)} />worked example</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={property} onChange={(event) => setProperty(event.target.checked)} />property test</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={exhaustive} onChange={(event) => setExhaustive(event.target.checked)} />small exhaustive</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={independent} onChange={(event) => setIndependent(event.target.checked)} />independent oracle</label></div>
      <div className="mt-4"><Stat label="evidence layers" value={`${score}/4`} tone={score === 4 ? "success" : score >= 2 ? "warning" : "danger"} /></div>
    </Figure>
  );
}

const TRIAGE = {
  "correct small, wrong large": { suspect: "overflow / rounding / asymptotic state", chapter: "V2-C4 Arithmetic" },
  "missing generated objects": { suspect: "branch coverage / rank gap / unsafe prune", chapter: "V4A/V4B" },
  "lookup misses existing key": { suspect: "index invariant / deletion path / encoding", chapter: "V1-C2 + V3-C6" },
  "random test passes histogram only": { suspect: "dependence / lattice / replay metadata", chapter: "V2-C3" },
} as const;

export function TcpFailureTriageLab() {
  const [symptom, setSymptom] = useState<keyof typeof TRIAGE>("correct small, wrong large");
  const result = TRIAGE[symptom];
  return (
    <Figure caption="Failure triage starts from the violated contract and follows the producer-to-consumer chain, instead of replacing the algorithm before locating the broken layer.">
      <label className="text-sm font-semibold text-primary">observed symptom<select className="mt-2 block w-full border border-border bg-background p-2" value={symptom} onChange={(event) => setSymptom(event.target.value as keyof typeof TRIAGE)}>{Object.keys(TRIAGE).map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="first suspects" value={result.suspect} tone="warning" /><Stat label="return to" value={result.chapter} tone="success" /></div>
    </Figure>
  );
}

const CAPSTONES = {
  "disk index": ["V1 representation", "V3 sorting runs", "V3 multiway search", "I/O certificate"],
  "simulation pipeline": ["V2 random stream", "V2 floating error", "statistical tests", "replay certificate"],
  "constraint solver": ["V4A canonical objects", "V4B propagation", "learned conflict", "witness certificate"],
  "ranked generator": ["V1 algorithm contract", "V4A rank bijection", "V3 search index", "count certificate"],
} as const;

export function TcpCapstoneLab() {
  const [project, setProject] = useState<keyof typeof CAPSTONES>("constraint solver");
  return (
    <Figure caption="A capstone is a producer-to-consumer chain across volumes: representation feeds transitions, transitions feed cost, and independent evidence closes the loop.">
      <label className="text-sm font-semibold text-primary">capstone<select className="mt-2 block min-h-11 w-full border border-border bg-background p-2" value={project} onChange={(event) => setProject(event.target.value as keyof typeof CAPSTONES)}>{Object.keys(CAPSTONES).map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{CAPSTONES[project].map((stage, index) => <Stat key={stage} label={`stage ${index + 1}`} value={stage} tone={index === 3 ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

const ROUTES = {
  systems: ["V1-C2", "V3-C5", "V3-C6", "V2-C4", "V4B-C7"],
  numeric: ["V1-C1", "V2-C3", "V2-C4", "V3-C5", "V4A-C7"],
  combinatorial: ["V1-C1", "V1-C2", "V4A-C7", "V4B-C7", "V3-C6"],
} as const;

export function TcpReviewRouteLab() {
  const [profile, setProfile] = useState<keyof typeof ROUTES>("systems");
  return (
    <Figure caption="Review routes may change order by goal, but a final audit still checks every published unit and its prerequisite contracts.">
      <label className="text-sm font-semibold text-primary">review profile<select className="mt-2 block min-h-11 w-full border border-border bg-background p-2" value={profile} onChange={(event) => setProfile(event.target.value as keyof typeof ROUTES)}><option value="systems">systems and storage</option><option value="numeric">numeric and simulation</option><option value="combinatorial">combinatorial search</option></select></label>
      <div className="mt-4 grid grid-cols-5 gap-2">{ROUTES[profile].map((unit, index) => <Stat key={unit} label={`stop ${index + 1}`} value={unit} tone={index === 0 ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function TcpBookCertificateLab() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => Object.fromEntries(UNITS.map((unit, index) => [unit.id, index < 5])));
  const passed = UNITS.filter((unit) => checked[unit.id]).length;
  return (
    <Figure caption="The book certificate requires all eight official units; a high average cannot compensate for one missing published chapter or an unverified outline unit.">
      <div className="grid gap-3 sm:grid-cols-4">{UNITS.map((unit) => <label key={unit.id} className="flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={Boolean(checked[unit.id])} onChange={(event) => setChecked({ ...checked, [unit.id]: event.target.checked })} />{unit.id}</label>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="official units passed" value={`${passed}/8`} /><Stat label="book gate" value={passed === 8 ? "complete" : "incomplete"} tone={passed === 8 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function TcpFinalReviewDiagram() {
  return <TcpPublishedSpineLab />;
}
