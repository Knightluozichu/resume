"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

export function PP2SearchInterfaceLab() {
  const [m, setM] = useState(1000);
  const [n, setN] = useState(1000000);
  const [operation, setOperation] = useState<"insert" | "size" | "report">("insert");
  const density = m / n;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">set size m = {m.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1" max="10000" step="10" value={m} onChange={(event) => setM(Number(event.target.value))} /></label><label className="text-xs text-secondary">universe n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="10000" max="5000000" step="10000" value={n} onChange={(event) => setN(Number(event.target.value))} /></label></div>
        <label className="mt-3 block text-xs text-secondary">operation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="insert">insert(t): ignore duplicate</option><option value="size">size(): number of distinct keys</option><option value="report">report(v): sorted keys</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">contract <span className="float-right font-mono">{operation}</span></div><div className="border border-success p-3 text-success">density <span className="float-right font-mono">{(density * 100).toFixed(3)}%</span></div><div className="border border-warning p-3 text-warning">keys <span className="float-right font-mono">0..n-1</span></div></div>
      </Panel>
      <Caption>The IntSet interface fixes behavior while leaving representation open: distinct insertion, exact size, and sorted reporting over a bounded integer universe.</Caption>
    </figure>
  );
}

export function PP2ArraySetLab() {
  const values = [5, 12, 18, 31, 44, 63, 99];
  const [value, setValue] = useState(27);
  const position = values.findIndex((item) => item >= value);
  const insertion = position < 0 ? values.length : position;
  const duplicate = values.includes(value);
  const shifts = duplicate ? 0 : values.length - insertion;
  const view = duplicate ? values : [...values.slice(0, insertion), value, ...values.slice(insertion)];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">insert t = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="110" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-4 gap-1 sm:grid-cols-8">{view.map((item, index) => <div key={`${item}-${index}`} className={"border p-2 text-center font-mono text-xs " + (item === value ? "border-warning text-warning" : "border-border text-secondary")}>{item}</div>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">scan comparisons <span className="float-right font-mono">{insertion + 1}</span></div><div className="border border-warning p-3 text-warning">right shifts <span className="float-right font-mono">{shifts}</span></div><div className={"border p-3 " + (duplicate ? "border-success text-success" : "border-border text-secondary")}>{duplicate ? "duplicate: no change" : "new distinct key"}</div></div>
      </Panel>
      <Caption>A sorted array with a max-value sentinel makes reporting trivial, but every middle insertion can scan and shift a linear suffix.</Caption>
    </figure>
  );
}

export function PP2ListSetLab() {
  const [m, setM] = useState(1000);
  const [percentile, setPercentile] = useState(50);
  const [iterative, setIterative] = useState(true);
  const traversed = Math.max(1, Math.round(m * percentile / 100));
  const frames = iterative ? 1 : traversed;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">stored keys m = {m}<input className="mt-2 w-full accent-current" type="range" min="10" max="5000" step="10" value={m} onChange={(event) => setM(Number(event.target.value))} /></label><label className="text-xs text-secondary">insertion rank = {percentile}%<input className="mt-2 w-full accent-current" type="range" min="0" max="100" value={percentile} onChange={(event) => setPercentile(Number(event.target.value))} /></label></div>
        <label className="mt-3 flex items-center gap-2 text-sm text-primary"><input type="checkbox" checked={iterative} onChange={(event) => setIterative(event.target.checked)} />Iterative traversal with a tail sentinel</label>
        <div className="mt-4 flex items-center gap-1 overflow-hidden">{[0, 1, 2, 3, 4].map((item) => <div key={item} className={"h-8 flex-1 border " + (item * 25 <= percentile ? "border-accent bg-accent/20" : "border-border")} />)}<span className="font-mono text-xs text-warning">MAX</span></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="border border-warning p-3 text-warning">nodes traversed <span className="float-right font-mono">≈ {traversed}</span></div><div className="border border-accent p-3 text-accent">call frames <span className="float-right font-mono">{frames}</span></div></div>
      </Panel>
      <Caption>Sorted links remove array shifts but not the linear search; replacing recursion cuts call overhead without changing the representation’s asymptotic cost.</Caption>
    </figure>
  );
}

export function PP2BSTShapeLab() {
  const [m, setM] = useState(1024);
  const [order, setOrder] = useState<"random" | "sorted">("random");
  const depth = order === "sorted" ? m : Math.ceil(2 * Math.log2(m));
  const comparisons = order === "sorted" ? m * (m - 1) / 2 : m * Math.log2(m);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">insertions m = {m}<input className="mt-2 w-full accent-current" type="range" min="8" max="4096" step="8" value={m} onChange={(event) => setM(Number(event.target.value))} /></label><label className="text-xs text-secondary">arrival order<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={order} onChange={(event) => setOrder(event.target.value as typeof order)}><option value="random">random permutation</option><option value="sorted">already sorted</option></select></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2"><div className={"border p-4 " + (order === "sorted" ? "border-danger text-danger" : "border-success text-success")}><div className="text-xs">tree height model</div><div className="mt-1 font-mono text-2xl">{depth.toLocaleString()}</div></div><div className="border border-accent p-4 text-accent"><div className="text-xs">total comparisons model</div><div className="mt-1 font-mono text-2xl">{Math.round(comparisons).toLocaleString()}</div></div></div>
      </Panel>
      <Caption>An unbalanced binary search tree is fast in expectation for random arrivals, but sorted input turns it into a linked list with quadratic construction.</Caption>
    </figure>
  );
}

export function PP2BitVectorLab() {
  const [n, setN] = useState(64);
  const [selected, setSelected] = useState(18);
  const words = Math.ceil(n / 32);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">universe n = {n}<input className="mt-2 w-full accent-current" type="range" min="16" max="128" step="16" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setSelected(Math.min(selected, value - 1)); }} /></label><label className="text-xs text-secondary">toggle key t = {selected}<input className="mt-2 w-full accent-current" type="range" min="0" max={n - 1} value={selected} onChange={(event) => setSelected(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-16 gap-1">{Array.from({ length: n }, (_, index) => <div key={index} className={"aspect-square border " + (index === selected ? "border-warning bg-warning/40" : index % 7 === 0 ? "border-success bg-success/20" : "border-border bg-background")} title={`key ${index}`} />)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-success p-3 text-success">insert <span className="float-right font-mono">O(1)</span></div><div className="border border-warning p-3 text-warning">report scan <span className="float-right font-mono">O(n)</span></div><div className="border border-accent p-3 text-accent">32-bit words <span className="float-right font-mono">{words}</span></div></div>
      </Panel>
      <Caption>Direct key indexing turns insertion into one bit operation and reports in order by scanning the universe; its cost follows n, not only the number of stored keys.</Caption>
    </figure>
  );
}

export function PP2BinsLab() {
  const [m, setM] = useState(1000);
  const [bins, setBins] = useState(1000);
  const expected = m / bins;
  const maxEstimate = expected + 2 * Math.sqrt(Math.max(1, expected * Math.log(Math.max(2, bins))));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">stored keys m = {m}<input className="mt-2 w-full accent-current" type="range" min="100" max="10000" step="100" value={m} onChange={(event) => setM(Number(event.target.value))} /></label><label className="text-xs text-secondary">range bins = {bins}<input className="mt-2 w-full accent-current" type="range" min="10" max="2000" step="10" value={bins} onChange={(event) => setBins(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-5 gap-1 sm:grid-cols-10">{Array.from({ length: 10 }, (_, index) => <div key={index} className="border border-accent p-2 text-center text-xs text-accent"><div className="h-8 bg-accent/20" style={{ height: `${Math.min(48, 8 + ((index * 7) % 5) * expected)}px` }} /><span>{index}</span></div>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-success p-3 text-success">expected list <span className="float-right font-mono">{expected.toFixed(2)}</span></div><div className="border border-warning p-3 text-warning">high-bin model <span className="float-right font-mono">{maxEstimate.toFixed(1)}</span></div><div className="border border-accent p-3 text-accent">report order <span className="float-right font-mono">bin 0 → k</span></div></div>
      </Panel>
      <Caption>Bins exploit the integer range: route a key by its high-order interval, keep each small bucket sorted, then report buckets from low to high.</Caption>
    </figure>
  );
}

export function PP2RepresentationMatrixLab() {
  const [n, setN] = useState(1000000);
  const [m, setM] = useState(1000);
  const density = m / n;
  const choice = density > 0.12 ? "bit vector" : m < 100 ? "sorted array" : m > 5000 ? "bins" : "library set / tree";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">universe n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="10000" max="5000000" step="10000" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setM(Math.min(m, value)); }} /></label><label className="text-xs text-secondary">set m = {m.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="10" max={Math.min(50000, n)} step="10" value={m} onChange={(event) => setM(Number(event.target.value))} /></label></div>
        <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-xs"><thead className="text-secondary"><tr><th className="p-2">representation</th><th className="p-2">insert</th><th className="p-2">report</th><th className="p-2">space</th></tr></thead><tbody className="text-primary"><tr><td className="border-t border-border p-2">sorted array</td><td className="p-2">O(m)</td><td className="p-2">O(m)</td><td className="p-2">m</td></tr><tr><td className="border-t border-border p-2">sorted list</td><td className="p-2">O(m)</td><td className="p-2">O(m)</td><td className="p-2">2m</td></tr><tr><td className="border-t border-border p-2">binary tree</td><td className="p-2">expected O(log m)</td><td className="p-2">O(m)</td><td className="p-2">3m</td></tr><tr><td className="border-t border-border p-2">bins</td><td className="p-2">expected O(1)</td><td className="p-2">O(m)</td><td className="p-2">about 3m</td></tr><tr><td className="border-t border-border p-2">bit vector</td><td className="p-2">O(1)</td><td className="p-2">O(n)</td><td className="p-2">n bits</td></tr></tbody></table></div>
        <div className="mt-3 border border-accent p-3 text-accent">prototype first for this regime <span className="float-right font-semibold">{choice}</span></div>
      </Panel>
      <Caption>The table is a hypothesis generator, not an automatic selector: measured constants, allocation, cache boundaries, libraries, and input order can change the winner.</Caption>
    </figure>
  );
}

export function PP2CacheBoundaryLab() {
  const [m, setM] = useState(100000);
  const [bytes, setBytes] = useState(24);
  const [cacheKiB, setCacheKiB] = useState(1024);
  const workingKiB = m * bytes / 1024;
  const ratio = workingKiB / cacheKiB;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs text-secondary">elements = {m.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="1000000" step="1000" value={m} onChange={(event) => setM(Number(event.target.value))} /></label><label className="text-xs text-secondary">bytes / element = {bytes}<input className="mt-2 w-full accent-current" type="range" min="4" max="48" step="4" value={bytes} onChange={(event) => setBytes(Number(event.target.value))} /></label><label className="text-xs text-secondary">cache = {cacheKiB} KiB<input className="mt-2 w-full accent-current" type="range" min="64" max="8192" step="64" value={cacheKiB} onChange={(event) => setCacheKiB(Number(event.target.value))} /></label></div>
        <div className="mt-4 h-10 border border-border bg-background"><div className={"flex h-full items-center px-3 text-xs " + (ratio <= 1 ? "bg-success/30 text-success" : "bg-danger/30 text-danger")} style={{ width: `${Math.min(100, ratio * 100)}%` }}>{workingKiB.toFixed(0)} KiB</div></div>
        <div className={"mt-3 border p-3 " + (ratio <= 1 ? "border-success text-success" : "border-danger text-danger")}>working set / cache <span className="float-right font-mono">{ratio.toFixed(2)}×</span></div>
      </Panel>
      <Caption>Space affects time abruptly: compact contiguous storage can cross a cache or memory boundary that pointer-rich structures cannot, even with the same big-O label.</Caption>
    </figure>
  );
}

export function PP2SpellPipelineLab() {
  const stages = [
    ["corpus ∩ dictionary", "75,000 forms"],
    ["affix rules + stop list", "30,000 stems"],
    ["27-bit hashing", "810,000 bits"],
    ["sorted delta coding", "13.6 bits / word"],
    ["indexed compressed set", "26,000 16-bit words"],
  ] as const;
  const [stage, setStage] = useState(0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">pipeline stage = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">{stages.map(([name, value], index) => <div key={name} className={"border p-3 text-center text-xs " + (index === stage ? "border-warning text-warning" : index < stage ? "border-success text-success" : "border-border text-secondary")}><div>{name}</div><div className="mt-2 font-mono">{value}</div></div>)}</div>
        <div className="mt-3 border border-accent p-3 text-sm text-accent">PDP-11 target: the searchable representation must stay inside a 64 KiB address space.</div>
      </Panel>
      <Caption>McIlroy’s spell pipeline repeatedly changes representation: linguistic reduction, hashing, sorted gaps, variable-length coding, then a small random-access index.</Caption>
    </figure>
  );
}

export function PP2HashDeltaLab() {
  const [bits, setBits] = useState(27);
  const hashes = [6, 11, 14, 19, 23];
  const gaps = hashes.map((value, index) => index === 0 ? value : value - hashes[index - 1]);
  const collisionRate = 30000 / 2 ** bits;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">hash width = {bits} bits<input className="mt-2 w-full accent-current" type="range" min="16" max="32" value={bits} onChange={(event) => setBits(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-border p-3"><div className="text-xs text-secondary">sorted hashes</div><div className="mt-2 font-mono text-primary">{hashes.join("  ")}</div></div><div className="border border-success p-3"><div className="text-xs text-secondary">first value + deltas</div><div className="mt-2 font-mono text-success">{gaps.join("  ")}</div></div></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="border border-warning p-3 text-warning">rough false-hit load <span className="float-right font-mono">{(collisionRate * 100).toFixed(4)}%</span></div><div className="border border-accent p-3 text-accent">original mean code <span className="float-right font-mono">13.6 bits</span></div></div>
      </Panel>
      <Caption>Sorted hash differences are much smaller than absolute 27-bit values, so a variable-length code approaches the information bound while preserving ordered search.</Caption>
    </figure>
  );
}

export function PP2SearchCertificateLab() {
  const [missing, setMissing] = useState<"none" | "contract" | "distribution" | "memory" | "baseline" | "adversarial">("none");
  const checks = { contract: missing !== "contract", distribution: missing !== "distribution", memory: missing !== "memory", baseline: missing !== "baseline", adversarial: missing !== "adversarial", reportOrder: true };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">representation review<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={missing} onChange={(event) => setMissing(event.target.value as typeof missing)}><option value="none">complete evidence</option><option value="contract">insert/size/report contract missing</option><option value="distribution">arrival or key distribution missing</option><option value="memory">working-set evidence missing</option><option value="baseline">library baseline missing</option><option value="adversarial">sorted/duplicate/boundary tests missing</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The searching representation is ready for the stated workload." : "The representation claim is missing required evidence."}</div>
      </Panel>
      <Caption>A search implementation is releasable only when behavior, key distribution, adversarial order, memory boundaries, sorted reporting, and a library baseline are all evidenced.</Caption>
    </figure>
  );
}
