"use client";

import { useMemo, useState, type ReactNode } from "react";

const sampleValues = [7, 1, 12, 3, 9, 0, 15, 5];

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

export function PP2ProblemContractLab() {
  const [domain, setDomain] = useState(10_000_000);
  const [memoryMb, setMemoryMb] = useState(1.5);
  const [duplicates, setDuplicates] = useState(false);
  const requiredMb = domain / 8 / 1_000_000;
  const bitmapFits = !duplicates && requiredMb <= memoryMb;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">finite key domain n = {domain.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000000" max="20000000" step="1000000" value={domain} onChange={(event) => setDomain(Number(event.target.value))} /></label><label className="text-xs text-secondary">memory budget = {memoryMb.toFixed(1)} MB<input className="mt-2 w-full accent-current" type="range" min="0.5" max="4" step="0.25" value={memoryMb} onChange={(event) => setMemoryMb(Number(event.target.value))} /></label></div>
        <label className="mt-3 block border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={duplicates} onChange={(event) => setDuplicates(event.target.checked)} />input may contain duplicate keys</label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div className="border border-accent p-3 text-accent"><div>bitmap bytes</div><div className="font-mono text-lg">{(domain / 8).toLocaleString()}</div></div><div className="border border-warning p-3 text-warning"><div>required MB</div><div className="font-mono text-lg">{requiredMb.toFixed(2)}</div></div><div className={"border p-3 " + (bitmapFits ? "border-success text-success" : "border-danger text-danger")}><div>contract</div><div className="font-mono text-lg">{bitmapFits ? "fits" : "revise"}</div></div></div>
      </Panel>
      <Caption>Precise bounds expose the representation: one bit per possible key works only when the finite domain fits and set semantics are enough.</Caption>
    </figure>
  );
}

export function PP2ConversationMap() {
  const [answer, setAnswer] = useState(0);
  const questions = [
    ["What exactly is sorted?", "distinct integers, no payload"],
    ["What is the key range?", "0 through n − 1"],
    ["How much memory?", "roughly one megabyte"],
    ["How often does the job run?", "a repeated production operation"],
    ["What output order?", "ascending integer stream"],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">clarification {answer + 1} / {questions.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={questions.length - 1} value={answer} onChange={(event) => setAnswer(Number(event.target.value))} /></label>
        <div className="mt-4 grid items-center gap-3 sm:grid-cols-2"><div className="border border-accent p-4 text-accent"><div className="text-xs">question</div><div className="mt-1 font-semibold">{questions[answer][0]}</div></div><div className="border border-success p-4 text-success"><div className="text-xs">constraint discovered</div><div className="mt-1 font-semibold">{questions[answer][1]}</div></div></div>
        <div className="mt-3 h-2 border border-border bg-background"><div className="h-full bg-success" style={{ width: `${(answer + 1) / questions.length * 100}%` }} /></div>
      </Panel>
      <Caption>The friendly conversation converts a vague disk-sort request into constraints that make a specialized representation possible.</Caption>
    </figure>
  );
}

export function PP2DesignAlternativesLab() {
  const [strategy, setStrategy] = useState<"external merge" | "multi-pass" | "bitmap">("bitmap");
  const rows = {
    "external merge": ["read runs, spill files, merge", "several work-file reads and writes", "general records and duplicates"],
    "multi-pass": ["scan one key interval per pass", "many input scans, no work files", "tiny memory and finite range"],
    bitmap: ["read once, set bits, scan domain", "one input read and one output write", "distinct keys from a bounded domain"],
  }[strategy];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">program design<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={strategy} onChange={(event) => setStrategy(event.target.value as typeof strategy)}><option>external merge</option><option>multi-pass</option><option>bitmap</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent"><div className="text-xs">mechanism</div><div className="mt-1 text-sm">{rows[0]}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">I/O shape</div><div className="mt-1 text-sm">{rows[1]}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">valid when</div><div className="mt-1 text-sm">{rows[2]}</div></div></div>
      </Panel>
      <Caption>Design alternatives are evaluated against the clarified contract; bitmap sorting is excellent here precisely because it is not a general sort.</Caption>
    </figure>
  );
}

export function PP2BitmapMemoryLab() {
  const [domain, setDomain] = useState(27_000);
  const bitsPerWord = 32;
  const words = Math.ceil(domain / bitsPerWord);
  const bytes = words * 4;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">key domain n = {domain.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="100000" step="1000" value={domain} onChange={(event) => setDomain(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="border border-accent p-3"><div className="text-xs text-secondary">bits</div><div className="font-mono text-xl text-accent">{domain.toLocaleString()}</div></div><div className="border border-warning p-3"><div className="text-xs text-secondary">32-bit words</div><div className="font-mono text-xl text-warning">{words.toLocaleString()}</div></div><div className="border border-success p-3"><div className="text-xs text-secondary">bytes</div><div className="font-mono text-xl text-success">{bytes.toLocaleString()}</div></div></div>
        <div className="mt-3 text-sm text-secondary">Array size formula: 1 + floor((n − 1) / 32), equivalently ceil(n / 32).</div>
      </Panel>
      <Caption>A bitmap replaces one machine word per integer with one bit per possible value, turning domain density into a space advantage.</Caption>
    </figure>
  );
}

export function PP2BitMappingLab() {
  const [value, setValue] = useState(77);
  const word = value >> 5;
  const bit = value & 31;
  const mask = (1 << bit) >>> 0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">integer i = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-4 text-center text-accent"><div className="text-xs">word index</div><div className="font-mono text-2xl">i &gt;&gt; 5 = {word}</div></div><div className="border border-warning p-4 text-center text-warning"><div className="text-xs">bit offset</div><div className="font-mono text-2xl">i &amp; 31 = {bit}</div></div><div className="border border-success p-4 text-center text-success"><div className="text-xs">mask</div><div className="break-all font-mono text-xs">0x{mask.toString(16).padStart(8, "0")}</div></div></div>
      </Panel>
      <Caption>Power-of-two word size turns division and remainder into shift and mask operations while preserving exact indexing.</Caption>
    </figure>
  );
}

export function PP2BitOperationsLab() {
  const [active, setActive] = useState([1, 3, 6]);
  const [probe, setProbe] = useState(3);
  const word = active.reduce((bits, bit) => (bits | (1 << bit)) >>> 0, 0);
  const present = (word & (1 << probe)) !== 0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid grid-cols-8 gap-1">{Array.from({ length: 8 }, (_, bit) => <label key={bit} className={"border p-2 text-center text-xs " + (active.includes(bit) ? "border-accent text-accent" : "border-border text-secondary")}><input className="sr-only" type="checkbox" checked={active.includes(bit)} onChange={() => setActive((current) => current.includes(bit) ? current.filter((value) => value !== bit) : [...current, bit])} />{bit}</label>)}</div>
        <label className="mt-4 block text-xs text-secondary">test bit i = {probe}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={probe} onChange={(event) => setProbe(Number(event.target.value))} /></label>
        <div className="mt-3 grid grid-cols-2 gap-2"><div className="border border-warning p-3 font-mono text-warning">word = {word.toString(2).padStart(8, "0")}</div><div className={"border p-3 font-mono " + (present ? "border-success text-success" : "border-danger text-danger")}>test({probe}) = {present ? "true" : "false"}</div></div>
      </Panel>
      <Caption>set uses bitwise OR, clear uses AND with an inverted mask, and test uses AND; all operate in constant time.</Caption>
    </figure>
  );
}

export function PP2BitmapSortLab() {
  const [prefix, setPrefix] = useState(sampleValues.length);
  const input = sampleValues.slice(0, prefix);
  const output = useMemo(() => [...new Set(input)].sort((left, right) => left - right), [input]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">input records consumed = {prefix}<input className="mt-2 w-full accent-current" type="range" min="0" max={sampleValues.length} value={prefix} onChange={(event) => setPrefix(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3"><div className="text-xs text-secondary">input stream</div><div className="mt-2 flex flex-wrap gap-1">{input.map((value, index) => <span key={`${value}-${index}`} className="border border-accent px-2 py-1 font-mono text-accent">{value}</span>)}</div></div><div className="border border-warning p-3"><div className="text-xs text-secondary">set bits</div><div className="mt-2 grid grid-cols-8 gap-1">{Array.from({ length: 16 }, (_, value) => <span key={value} className={"p-1 text-center text-[10px] " + (output.includes(value) ? "bg-warning text-background" : "border border-border text-secondary")}>{value}</span>)}</div></div><div className="border border-success p-3"><div className="text-xs text-secondary">ascending scan</div><div className="mt-2 flex flex-wrap gap-1">{output.map((value) => <span key={value} className="border border-success px-2 py-1 font-mono text-success">{value}</span>)}</div></div></div>
      </Panel>
      <Caption>Reading sets membership bits; scanning bit positions from low to high emits the distinct keys in sorted order without comparisons.</Caption>
    </figure>
  );
}

export function PP2MultiPassLab() {
  const [domain, setDomain] = useState(10_000_000);
  const [memoryKb, setMemoryKb] = useState(128);
  const bits = memoryKb * 1024 * 8;
  const passes = Math.ceil(domain / bits);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">domain = {domain.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000000" max="20000000" step="1000000" value={domain} onChange={(event) => setDomain(Number(event.target.value))} /></label><label className="text-xs text-secondary">memory = {memoryKb} KiB<input className="mt-2 w-full accent-current" type="range" min="32" max="512" step="32" value={memoryKb} onChange={(event) => setMemoryKb(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="border border-accent p-3 text-accent"><div className="text-xs">keys represented/pass</div><div className="font-mono text-lg">{bits.toLocaleString()}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">input scans</div><div className="font-mono text-lg">{passes}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">work files</div><div className="font-mono text-lg">0</div></div></div>
      </Panel>
      <Caption>When the full bitmap does not fit, partition the key domain and rescan the input once per interval: less memory trades for more sequential I/O.</Caption>
    </figure>
  );
}

export function PP2PreconditionsLab() {
  const [duplicates, setDuplicates] = useState(false);
  const [payload, setPayload] = useState(false);
  const [bounded, setBounded] = useState(true);
  const exact = bounded && !duplicates && !payload;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-2 sm:grid-cols-3"><label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={bounded} onChange={(event) => setBounded(event.target.checked)} />finite known domain</label><label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={duplicates} onChange={(event) => setDuplicates(event.target.checked)} />duplicates matter</label><label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={payload} onChange={(event) => setPayload(event.target.checked)} />records carry payload</label></div>
        <div className={"mt-4 border p-3 text-sm " + (exact ? "border-success text-success" : "border-warning text-warning")}>{exact ? "One bit per key exactly represents the required output." : !bounded ? "Use hashing, comparison sorting, or an external index; direct addressing has no finite allocation." : duplicates ? "Replace one bit with counters or emit multiplicities from a separate count structure." : "Store references or records; membership alone loses associated data."}</div>
      </Panel>
      <Caption>The bitmap solution is correct only because the contract removes duplicates, payloads, and an unbounded key universe.</Caption>
    </figure>
  );
}

export function PP2CostCertificateLab() {
  const [mutation, setMutation] = useState<"valid" | "duplicate" | "out of range" | "missing clear">("valid");
  const checks = {
    range: mutation !== "out of range",
    uniqueness: mutation !== "duplicate",
    initialization: mutation !== "missing clear",
    sortedOutput: true,
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">candidate run<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mutation} onChange={(event) => setMutation(event.target.value as typeof mutation)}><option>valid</option><option>duplicate</option><option>out of range</option><option>missing clear</option></select></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-3 text-center text-[11px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "Correctness: every input key sets one valid bit and the monotone scan emits exactly the input set." : "The implementation no longer satisfies the precise problem statement."}</div>
      </Panel>
      <Caption>A lightweight certificate checks preconditions, zero initialization, membership preservation, monotone emission, and the domain-sized cost bound.</Caption>
    </figure>
  );
}
