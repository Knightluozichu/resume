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

export function CLRS4DirectAddressLab() {
  const [key, setKey] = useState(6);
  const present = new Set([1, 4, 6, 9]);
  return (
    <Figure caption="A direct-address table dedicates one slot to every universe key, making lookup a single indexed access when the universe is small.">
      <label className="text-sm font-semibold text-primary">query key k = {key}<input className="mt-2 w-full accent-current" type="range" min="0" max="11" value={key} onChange={(event) => setKey(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-12">{Array.from({ length: 12 }, (_, index) => <div key={index} className={`border p-2 text-center ${index === key ? "border-warning bg-warning/10 text-warning" : present.has(index) ? "border-success text-success" : "border-border text-secondary"}`}><div className="font-mono">{index}</div><div className="text-[10px]">{present.has(index) ? "record" : "nil"}</div></div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">T[{key}] = {present.has(key) ? "present" : "nil"}</div>
    </Figure>
  );
}

const chainKeys = [5, 28, 19, 15, 20, 33, 12, 17, 10];

export function CLRS4ChainingLab() {
  const [m, setM] = useState(7);
  const buckets = Array.from({ length: m }, (_, bucket) => chainKeys.filter((key) => key % m === bucket));
  return (
    <Figure caption="Chaining stores all colliding keys in the same bucket list; a collision changes local chain length rather than losing a record.">
      <label className="text-sm font-semibold text-primary">table buckets m = {m}<input className="mt-2 w-full accent-current" type="range" min="3" max="10" value={m} onChange={(event) => setM(Number(event.target.value))} /></label>
      <div className="mt-4 space-y-2">{buckets.map((keys, index) => <div key={index} className="grid grid-cols-[3rem_1fr] items-center gap-2"><span className="font-mono text-secondary">{index}</span><div className={`border p-2 font-mono text-sm ${keys.length > 2 ? "border-warning text-warning" : "border-accent text-accent"}`}>{keys.join(" → ") || "nil"}</div></div>)}</div>
    </Figure>
  );
}

export function CLRS4LoadFactorLab() {
  const [n, setN] = useState(70);
  const [m, setM] = useState(100);
  const alpha = n / m;
  return (
    <Figure caption="The load factor alpha equals stored keys divided by buckets; it controls expected chain length and open-address probe growth.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">stored keys n = {n}<input className="mt-2 w-full accent-current" type="range" min="0" max="200" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-sm text-primary">buckets m = {m}<input className="mt-2 w-full accent-current" type="range" min="10" max="200" value={m} onChange={(event) => setM(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="α = n/m" value={alpha.toFixed(2)} tone={alpha < 0.8 ? "success" : "danger"} /><Stat label="chaining expected search" value={`Θ(1 + ${alpha.toFixed(2)})`} /><Stat label="open addressing valid" value={alpha < 1 ? "yes" : "no"} tone={alpha < 1 ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4DivisionHashLab() {
  const [key, setKey] = useState(73);
  const [m, setM] = useState(11);
  return (
    <Figure caption="The division method maps key k to k modulo m; table-size arithmetic and key patterns jointly determine whether residues spread well.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">key k = {key}<input className="mt-2 w-full accent-current" type="range" min="0" max="200" value={key} onChange={(event) => setKey(Number(event.target.value))} /></label><label className="text-sm text-primary">table size m = {m}<input className="mt-2 w-full accent-current" type="range" min="2" max="32" value={m} onChange={(event) => setM(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="formula" value="h(k)=k mod m" /><Stat label="quotient" value={Math.floor(key / m).toString()} tone="warning" /><Stat label="bucket" value={(key % m).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4MultiplicationHashLab() {
  const [key, setKey] = useState(73);
  const [power, setPower] = useState(4);
  const m = 2 ** power;
  const A = (Math.sqrt(5) - 1) / 2;
  const fraction = (key * A) % 1;
  return (
    <Figure caption="The multiplication method keeps the fractional part of kA and scales it to m buckets, working conveniently with power-of-two table sizes.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">key k = {key}<input className="mt-2 w-full accent-current" type="range" min="0" max="200" value={key} onChange={(event) => setKey(Number(event.target.value))} /></label><label className="text-sm text-primary">m = 2^{power} = {m}<input className="mt-2 w-full accent-current" type="range" min="2" max="8" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="A" value={A.toFixed(5)} /><Stat label="fraction(kA)" value={fraction.toFixed(5)} tone="warning" /><Stat label="floor(m·fraction)" value={Math.floor(m * fraction).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4UniversalHashLab() {
  const [a, setA] = useState(3);
  const [key, setKey] = useState(42);
  const p = 101;
  const m = 10;
  const bucket = ((a * key + 7) % p) % m;
  return (
    <Figure caption="Universal hashing randomly chooses a function from a family so any fixed unequal key pair collides with probability at most about one over m.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">family parameter a = {a}<input className="mt-2 w-full accent-current" type="range" min="1" max="100" value={a} onChange={(event) => setA(Number(event.target.value))} /></label><label className="text-sm text-primary">key k = {key}<input className="mt-2 w-full accent-current" type="range" min="0" max="100" value={key} onChange={(event) => setKey(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="family" value="((ak+b) mod p) mod m" /><Stat label="random a" value={a.toString()} tone="warning" /><Stat label="bucket" value={bucket.toString()} tone="success" /></div>
    </Figure>
  );
}

function probeSequence(kind: "linear" | "quadratic" | "double", key: number, m: number) {
  const h1 = key % m;
  const h2 = 1 + key % (m - 1);
  return Array.from({ length: m }, (_, i) => kind === "linear" ? (h1 + i) % m : kind === "quadratic" ? (h1 + i + 3 * i * i) % m : (h1 + i * h2) % m);
}

export function CLRS4ProbeSequenceLab() {
  const [kind, setKind] = useState<"linear" | "quadratic" | "double">("double");
  const sequence = probeSequence(kind, 37, 11);
  return (
    <Figure caption="Open addressing encodes collision resolution as a deterministic probe permutation; double hashing uses a key-dependent step.">
      <label className="text-sm font-semibold text-primary">probe method<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="linear">linear</option><option value="quadratic">quadratic</option><option value="double">double hashing</option></select></label>
      <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-11">{sequence.map((slot, index) => <div key={index} className="border border-accent p-2 text-center"><div className="font-mono text-accent">{slot}</div><div className="text-[10px] text-secondary">i={index}</div></div>)}</div>
    </Figure>
  );
}

export function CLRS4PrimaryClusterLab() {
  const [occupied, setOccupied] = useState(6);
  const m = 12;
  return (
    <Figure caption="Linear probing grows primary clusters: any key hashing anywhere into a contiguous occupied run extends the same run at its end.">
      <label className="text-sm font-semibold text-primary">cluster length = {occupied}<input className="mt-2 w-full accent-current" type="range" min="1" max="11" value={occupied} onChange={(event) => setOccupied(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-12 gap-1">{Array.from({ length: m }, (_, index) => <div key={index} className={`border p-2 text-center text-xs ${index >= 2 && index < 2 + occupied ? "border-danger bg-danger/10 text-danger" : "border-border text-secondary"}`}>{index}</div>)}</div>
      <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="keys hashing into run" value={(occupied + 1).toString()} tone="warning" /><Stat label="next empty slot" value={((2 + occupied) % m).toString()} tone="danger" /></div>
    </Figure>
  );
}

export function CLRS4TombstoneLab() {
  const [state, setState] = useState<"occupied" | "deleted" | "empty">("deleted");
  const rows = {
    occupied: ["key matches: success", "other key: keep probing", "slot not reusable yet"],
    deleted: ["search must continue", "insert may remember slot", "tombstone"],
    empty: ["unsuccessful search stops", "insert can use slot", "never occupied in chain"],
  }[state];
  return (
    <Figure caption="Open-address deletion uses a tombstone because replacing a removed slot with EMPTY could cut off keys inserted later in the same probe sequence.">
      <label className="text-sm font-semibold text-primary">observed slot state<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={state} onChange={(event) => setState(event.target.value as typeof state)}><option value="occupied">occupied</option><option value="deleted">deleted</option><option value="empty">empty</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="search action" value={rows[0]} /><Stat label="insert action" value={rows[1]} tone="warning" /><Stat label="meaning" value={rows[2]} tone={state === "empty" ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4HashCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "mutable key" | "high load" | "bad equality" | "tombstone leak">("valid");
  const checks = {
    "hash/equality agree": issue !== "bad equality",
    "key stable in table": issue !== "mutable key",
    "load policy": issue !== "high load",
    "deletion cleanup": issue !== "tombstone leak",
  };
  return (
    <Figure caption="A practical hash-table certificate checks equality consistency, key immutability, load thresholds, and tombstone or chain cleanup.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid</option><option value="mutable key">mutable key</option><option value="high load">high load</option><option value="bad equality">bad equality</option><option value="tombstone leak">tombstone buildup</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
