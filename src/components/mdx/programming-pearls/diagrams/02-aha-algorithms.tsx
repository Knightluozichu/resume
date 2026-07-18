"use client";

import { useMemo, useState, type ReactNode } from "react";

const alphabet = "abcdefgh";
const anagramWords = ["pots", "stop", "tops", "spot", "opts", "post", "east", "eats", "teas", "seat", "stone"];

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function gcd(left: number, right: number) {
  let a = left;
  let b = right;
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function rotate(text: string, distance: number) {
  if (text.length === 0) return text;
  const d = ((distance % text.length) + text.length) % text.length;
  return text.slice(d) + text.slice(0, d);
}

function signature(word: string) {
  return [...word.toLowerCase()].sort().join("");
}

export function PP2ThreeProblemsMap() {
  const [problem, setProblem] = useState<"missing integer" | "vector rotation" | "anagrams">("vector rotation");
  const details = {
    "missing integer": ["find one absent 32-bit value", "partition the universe and count", "binary narrowing"],
    "vector rotation": ["rotate n items left by d", "compose reversals or cycles", "powerful primitives"],
    anagrams: ["group dictionary words", "canonical sorted-letter signature", "sort to bring equals together"],
  }[problem];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">one of the three problems<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={problem} onChange={(event) => setProblem(event.target.value as typeof problem)}><option>missing integer</option><option>vector rotation</option><option>anagrams</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent"><div className="text-xs">problem</div><div className="mt-1">{details[0]}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">representation</div><div className="mt-1">{details[1]}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">aha insight</div><div className="mt-1">{details[2]}</div></div></div>
      </Panel>
      <Caption>Each little problem becomes simple only after choosing a view that exposes monotonicity, permutation structure, or canonical equality.</Caption>
    </figure>
  );
}

export function PP2MissingIntegerLab() {
  const [bits, setBits] = useState(20);
  const universe = 2 ** bits;
  const bitmapBytes = universe / 8;
  const [memoryKiB, setMemoryKiB] = useState(32);
  const bucketCount = Math.ceil(universe / (memoryKiB * 1024 * 8));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">integer width b = {bits}<input className="mt-2 w-full accent-current" type="range" min="8" max="28" value={bits} onChange={(event) => setBits(Number(event.target.value))} /></label><label className="text-xs text-secondary">bitmap memory = {memoryKiB} KiB<input className="mt-2 w-full accent-current" type="range" min="8" max="256" step="8" value={memoryKiB} onChange={(event) => setMemoryKiB(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="border border-accent p-3 text-accent"><div className="text-xs">universe</div><div className="font-mono text-lg">{universe.toLocaleString()}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">full bitmap</div><div className="font-mono text-lg">{(bitmapBytes / 1024).toLocaleString()} KiB</div></div><div className="border border-success p-3 text-success"><div className="text-xs">range buckets</div><div className="font-mono text-lg">{bucketCount}</div></div></div>
      </Panel>
      <Caption>A 2ᵇ-value universe always has a missing value when the file has fewer than 2ᵇ distinct integers; memory determines whether to mark all values or narrow by buckets.</Caption>
    </figure>
  );
}

export function PP2ExternalNarrowingLab() {
  const [step, setStep] = useState(0);
  const path = [
    { prefix: "", candidates: 16, records: 13 },
    { prefix: "0", candidates: 8, records: 8 },
    { prefix: "01", candidates: 4, records: 3 },
    { prefix: "011", candidates: 2, records: 1 },
    { prefix: "0111", candidates: 1, records: 0 },
  ];
  const state = path[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">partition pass = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={path.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]"><div className="border border-accent p-4 text-accent"><div className="text-xs">chosen binary prefix</div><div className="font-mono text-2xl">{state.prefix || "*"}</div></div><div className="text-accent">→</div><div className={"border p-4 " + (state.records < state.candidates ? "border-success text-success" : "border-warning text-warning")}><div className="text-xs">pigeonhole test</div><div className="font-mono text-xl">{state.records} records / {state.candidates} values</div></div></div>
        <div className="mt-3 text-sm text-secondary">{step === path.length - 1 ? "The empty one-value bucket identifies missing integer 7." : "Choose a bucket whose record count is smaller than its value capacity, then discard all other buckets."}</div>
      </Panel>
      <Caption>Counting by high-order bits identifies an underfull range; repeated partitioning shrinks both the candidate universe and retained file geometrically.</Caption>
    </figure>
  );
}

export function PP2BinarySearchBisectLab() {
  const [bad, setBad] = useState(731);
  const [runs, setRuns] = useState(0);
  let low = 0;
  let high = 999;
  for (let run = 0; run < runs && low < high; run += 1) {
    const middle = Math.floor((low + high) / 2);
    if (bad <= middle) high = middle;
    else low = middle + 1;
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">hidden bad card = {bad}<input className="mt-2 w-full accent-current" type="range" min="0" max="999" value={bad} onChange={(event) => { setBad(Number(event.target.value)); setRuns(0); }} /></label>
        <label className="mt-3 block text-xs text-secondary">program runs = {runs}<input className="mt-2 w-full accent-current" type="range" min="0" max="10" value={runs} onChange={(event) => setRuns(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="border border-accent p-3 text-accent"><div className="text-xs">remaining low</div><div className="font-mono text-xl">{low}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">candidates</div><div className="font-mono text-xl">{high - low + 1}</div></div><div className={"border p-3 " + (low === high ? "border-success text-success" : "border-border text-secondary")}><div className="text-xs">remaining high</div><div className="font-mono text-xl">{high}</div></div></div>
      </Panel>
      <Caption>Binary search is a solution looking for monotone predicates: each expensive test must tell which half still contains the defect.</Caption>
    </figure>
  );
}

export function PP2RotationMethodsLab() {
  const [n, setN] = useState(32);
  const [d, setD] = useState(7);
  const normalized = Math.min(d, n - 1);
  const methods = [
    ["temporary vector", n, n, "simple but linear extra space"],
    ["shift left one, d times", n * normalized, 1, "constant space but potentially quadratic"],
    ["juggling cycles", n + gcd(n, normalized), 1, "gcd controls cycle count"],
    ["three reversals", n, 1, "simple linear-time composition"],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="4" max="64" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setD((current) => Math.min(current, value - 1)); }} /></label><label className="text-xs text-secondary">left distance d = {normalized}<input className="mt-2 w-full accent-current" type="range" min="1" max={n - 1} value={normalized} onChange={(event) => setD(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">{methods.map(([name, moves, space, note]) => <div key={String(name)} className="border border-border p-3 text-xs"><div className="font-semibold text-primary">{name}</div><div className="mt-1 font-mono text-accent">moves proxy {String(moves)} · extra slots {String(space)}</div><div className="mt-1 text-secondary">{note}</div></div>)}</div>
      </Panel>
      <Caption>Several correct rotations expose different costs; the aha result is O(n) time with O(1) extra storage.</Caption>
    </figure>
  );
}

export function PP2ReversalRotationLab() {
  const [step, setStep] = useState(0);
  const d = 3;
  const states = [
    { text: alphabet, action: "split a=abc, b=defgh" },
    { text: [...alphabet.slice(0, d)].reverse().join("") + alphabet.slice(d), action: "reverse a" },
    { text: [...alphabet.slice(0, d)].reverse().join("") + [...alphabet.slice(d)].reverse().join(""), action: "reverse b" },
    { text: rotate(alphabet, d), action: "reverse the whole vector" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">reversal composition step = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex justify-center gap-2">{[...states[step].text].map((letter, index) => <span key={`${letter}-${index}`} className={"grid h-10 w-10 place-items-center border font-mono " + (index < alphabet.length - d ? "border-success text-success" : "border-accent text-accent")}>{letter}</span>)}</div>
        <div className="mt-3 border border-border p-3 text-center text-sm text-secondary">{states[step].action}</div>
      </Panel>
      <Caption>For x = ab, reverse(a), reverse(b), then reverse(all) produces ba using one swap primitive and constant extra space.</Caption>
    </figure>
  );
}

export function PP2JugglingCyclesLab() {
  const [n, setN] = useState(12);
  const [d, setD] = useState(3);
  const distance = Math.min(d, n - 1);
  const cycles = gcd(n, distance);
  const cycleLength = n / cycles;
  const firstCycle = Array.from({ length: cycleLength }, (_, index) => index * distance % n);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="4" max="24" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setD((current) => Math.min(current, value - 1)); }} /></label><label className="text-xs text-secondary">d = {distance}<input className="mt-2 w-full accent-current" type="range" min="1" max={n - 1} value={distance} onChange={(event) => setD(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-2 gap-2"><div className="border border-accent p-3 text-accent"><div className="text-xs">gcd(n,d) cycles</div><div className="font-mono text-2xl">{cycles}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">items per cycle</div><div className="font-mono text-2xl">{cycleLength}</div></div></div>
        <div className="mt-3 flex flex-wrap items-center gap-2">{firstCycle.map((index) => <span key={index} className="grid h-9 w-9 place-items-center rounded-full border border-success font-mono text-success">{index}</span>)}</div>
      </Panel>
      <Caption>Rotation is a permutation with gcd(n,d) disjoint cycles; juggling follows each cycle and moves every element exactly once.</Caption>
    </figure>
  );
}

export function PP2PrimitivePowerLab() {
  const [primitive, setPrimitive] = useState<"reverse" | "sort" | "binary predicate">("reverse");
  const detail = {
    reverse: ["rotate vector", "reverse prefix + suffix + whole", "linear time, constant space"],
    sort: ["group equivalent records", "canonical key then sort by key", "equal signatures become adjacent"],
    "binary predicate": ["locate transition or defect", "repeatedly halve candidate interval", "logarithmic expensive tests"],
  }[primitive];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">powerful primitive<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={primitive} onChange={(event) => setPrimitive(event.target.value as typeof primitive)}><option>reverse</option><option>sort</option><option>binary predicate</option></select></label>
        <div className="mt-4 grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><div className="border border-accent p-3 text-accent">{detail[0]}</div><div>→</div><div className="border border-warning p-3 text-warning">{detail[1]}</div><div>→</div><div className="border border-success p-3 text-success">{detail[2]}</div></div>
      </Panel>
      <Caption>Algorithmic primitives solve problems beyond their textbook labels when the problem is transformed into a natural domain for the primitive.</Caption>
    </figure>
  );
}

export function PP2AnagramSignatureLab() {
  const [word, setWord] = useState("pots");
  const normalized = word.toLowerCase().replace(/[^a-z]/g, "");
  const key = signature(normalized);
  const matches = anagramWords.filter((candidate) => signature(candidate) === key);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">dictionary probe<input className="mt-2 w-full border border-border bg-background p-2 text-primary" value={word} onChange={(event) => setWord(event.target.value)} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent"><div className="text-xs">normalized word</div><div className="font-mono text-xl">{normalized || "∅"}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">sorted signature</div><div className="font-mono text-xl">{key || "∅"}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">same signature</div><div className="mt-1">{matches.join(", ") || "none"}</div></div></div>
      </Panel>
      <Caption>Sorting letters creates a canonical signature: two words are anagrams exactly when their signatures are equal.</Caption>
    </figure>
  );
}

export function PP2AnagramPipelineLab() {
  const [prefix, setPrefix] = useState(anagramWords.length);
  const entries = useMemo(() => anagramWords.slice(0, prefix).map((word) => ({ word, key: signature(word) })).sort((left, right) => left.key.localeCompare(right.key) || left.word.localeCompare(right.word)), [prefix]);
  const groups = entries.reduce<Record<string, string[]>>((result, entry) => {
    (result[entry.key] ??= []).push(entry.word);
    return result;
  }, {});

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">dictionary words processed = {prefix}<input className="mt-2 w-full accent-current" type="range" min="1" max={anagramWords.length} value={prefix} onChange={(event) => setPrefix(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{Object.entries(groups).map(([key, words]) => <div key={key} className={"border p-3 text-xs " + (words.length > 1 ? "border-success text-success" : "border-border text-secondary")}><div className="font-mono">{key}</div><div className="mt-1">{words.join(", ")}</div></div>)}</div>
      </Panel>
      <Caption>Emit signature-word pairs, sort by signature, then scan adjacent equal keys; sorting performs grouping rather than merely ordering output.</Caption>
    </figure>
  );
}

export function PP2AhaCertificateLab() {
  const [mutation, setMutation] = useState<"valid" | "nonmonotone" | "wrong rotation" | "weak signature">("valid");
  const checks = {
    predicate: mutation !== "nonmonotone",
    permutation: mutation !== "wrong rotation",
    canonicalKey: mutation !== "weak signature",
    complexity: true,
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">insight certificate<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mutation} onChange={(event) => setMutation(event.target.value as typeof mutation)}><option>valid</option><option>nonmonotone</option><option>wrong rotation</option><option>weak signature</option></select></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-3 text-center text-[11px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The transformed problem preserves answers and the chosen primitive meets the promised resource bound." : "The clever-looking transformation lacks a required invariant."}</div>
      </Panel>
      <Caption>An aha solution is complete only when monotonicity, permutation, canonical equivalence, and total cost are independently checked.</Caption>
    </figure>
  );
}
