"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes.toFixed(0)} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KiB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MiB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GiB`;
}

export function PP2SpaceCliffLab() {
  const [workingSet, setWorkingSet] = useState(40);
  const [ram, setRam] = useState(80);
  const tier = workingSet <= 0.5 ? "L2 cache" : workingSet <= ram ? "RAM" : "paging";
  const relative = tier === "L2 cache" ? 1 : tier === "RAM" ? 6 : 400;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">working set = {workingSet.toFixed(1)} MiB<input className="mt-2 w-full accent-current" type="range" min="0.1" max="160" step="0.1" value={workingSet} onChange={(event) => setWorkingSet(Number(event.target.value))} /></label><label className="text-xs text-secondary">free RAM = {ram} MiB<input className="mt-2 w-full accent-current" type="range" min="16" max="160" value={ram} onChange={(event) => setRam(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className={"border p-3 " + (tier === "L2 cache" ? "border-success text-success" : "border-border text-secondary")}>L2 · 0.5 MiB</div><div className={"border p-3 " + (tier === "RAM" ? "border-accent text-accent" : "border-border text-secondary")}>RAM · {ram} MiB</div><div className={"border p-3 " + (tier === "paging" ? "border-danger text-danger" : "border-border text-secondary")}>disk paging</div></div>
        <div className="mt-3 border border-warning p-3 text-warning">active tier: {tier} · illustrative runtime cost <span className="float-right font-mono">{relative}x</span></div>
      </Panel>
      <Caption>Space cost is discontinuous: ten extra percent can be free, exceed a hard limit, or push a working set across a cache or paging boundary.</Caption>
    </figure>
  );
}

export function PP2KentuckyTaxLab() {
  const [incomes, setIncomes] = useState(500);
  const [exemptions, setExemptions] = useState(10);
  const [remainingBands, setRemainingBands] = useState(32);
  const explicitWords = incomes * exemptions;
  const derivedWords = incomes + remainingBands;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs text-secondary">income rows = {incomes}<input className="mt-2 w-full accent-current" type="range" min="50" max="1000" step="10" value={incomes} onChange={(event) => setIncomes(Number(event.target.value))} /></label><label className="text-xs text-secondary">exemption columns = {exemptions}<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={exemptions} onChange={(event) => setExemptions(Number(event.target.value))} /></label><label className="text-xs text-secondary">Kentucky bands = {remainingBands}<input className="mt-2 w-full accent-current" type="range" min="8" max="64" value={remainingBands} onChange={(event) => setRemainingBands(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-danger p-4 text-danger"><div className="text-xs">explicit Kentucky table</div><div className="font-mono text-2xl">{explicitWords.toLocaleString()} words</div></div><div className="border border-success p-4 text-success"><div className="text-xs">existing federal table + remaining-income bands</div><div className="font-mono text-2xl">{derivedWords.toLocaleString()} words</div></div></div>
      </Panel>
      <Caption>Brooks did not compress a jagged table; he recovered the legislative rule that generated it and replaced the stored problem with a simpler one.</Caption>
    </figure>
  );
}

export function PP2SparseMapLab() {
  const [representation, setRepresentation] = useState<"dense16" | "linked packed" | "linked malloc" | "parallel16" | "row8" | "reuse row" | "coordinates" | "recompute">("parallel16");
  const details = {
    dense16: [80000, "200×200 entries · 16-bit identifier"],
    "linked packed": [24800, "200 pointers + 2,000 packed records"],
    "linked malloc": [96800, "allocator expands each record to 48 bytes"],
    parallel16: [8402, "2×2,000 + 201 values · all 16-bit"],
    row8: [6400, "row shrinks from 16 bits to 8 bits"],
    "reuse row": [4400, "read row from the point record"],
    coordinates: [4000, "two one-byte coordinates per point"],
    recompute: [0, "scan point records that already contain coordinates"],
  }[representation];
  const density = 2000 / (200 * 200) * 100;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">map representation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={representation} onChange={(event) => setRepresentation(event.target.value as typeof representation)}><option value="dense16">dense 16-bit matrix</option><option value="linked packed">linked records in one array</option><option value="linked malloc">linked records via general malloc</option><option value="parallel16">parallel 16-bit arrays</option><option value="row8">8-bit row array</option><option value="reuse row">reuse point row field</option><option value="coordinates">key-indexed coordinates</option><option value="recompute">no index, sequential scan</option></select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-warning p-3 text-warning">active cells <span className="float-right font-mono">{density.toFixed(0)}%</span></div><div className="border border-accent p-3 text-accent">space <span className="float-right font-mono">{formatBytes(details[0] as number)}</span></div><div className="border border-success p-3 text-success">saved vs dense <span className="float-right font-mono">{(100 * (1 - (details[0] as number) / 80000)).toFixed(0)}%</span></div></div>
        <div className="mt-3 border border-border p-3 text-sm text-secondary">{details[1]}</div>
      </Panel>
      <Caption>The original map moved from an 80,000-byte dense matrix to an 8,402-byte parallel-array index, with further options down to zero index bytes.</Caption>
    </figure>
  );
}

export function PP2SparseLookupLab() {
  const rows = [2, 5, 15, 64, 126, 138, 177, 190];
  const [query, setQuery] = useState(126);
  const foundAt = rows.findIndex((row) => row === query);
  const visits = foundAt >= 0 ? foundAt + 1 : rows.length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">query row j = {query}<input className="mt-2 w-full accent-current" type="range" min="0" max="199" value={query} onChange={(event) => setQuery(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">{rows.map((row, index) => <div key={row} className={"border p-2 text-center font-mono text-xs " + (index < visits ? row === query ? "border-success text-success" : "border-accent text-accent" : "border-border text-secondary")}>{row}</div>)}</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="border border-warning p-3 text-warning">visits <span className="float-right font-mono">{visits}</span></div><div className={"border p-3 " + (foundAt >= 0 ? "border-success text-success" : "border-danger text-danger")}>{foundAt >= 0 ? `point found at offset ${foundAt}` : "no point in this row"}</div></div>
      </Panel>
      <Caption>firstincol bounds the compact slice for one column; lookup scans only active rows instead of materializing all 200 cells.</Caption>
    </figure>
  );
}

export function PP2RecomputeStoreLab() {
  const [objectMiB, setObjectMiB] = useState(500);
  const [accesses, setAccesses] = useState(3);
  const [recomputeSeconds, setRecomputeSeconds] = useState(4);
  const [loadSeconds, setLoadSeconds] = useState(1);
  const storedTime = accesses * loadSeconds;
  const recomputeTime = accesses * recomputeSeconds;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">materialized object = {objectMiB} MiB<input className="mt-2 w-full accent-current" type="range" min="10" max="2000" step="10" value={objectMiB} onChange={(event) => setObjectMiB(Number(event.target.value))} /></label><label className="text-xs text-secondary">accesses = {accesses}<input className="mt-2 w-full accent-current" type="range" min="1" max="20" value={accesses} onChange={(event) => setAccesses(Number(event.target.value))} /></label></div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">load = {loadSeconds}s/access<input className="mt-2 w-full accent-current" type="range" min="0.1" max="10" step="0.1" value={loadSeconds} onChange={(event) => setLoadSeconds(Number(event.target.value))} /></label><label className="text-xs text-secondary">recompute = {recomputeSeconds}s/access<input className="mt-2 w-full accent-current" type="range" min="0.1" max="20" step="0.1" value={recomputeSeconds} onChange={(event) => setRecomputeSeconds(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-accent p-3 text-accent">store <span className="float-right font-mono">{objectMiB} MiB · {storedTime.toFixed(1)}s</span></div><div className="border border-warning p-3 text-warning">recompute <span className="float-right font-mono">seed only · {recomputeTime.toFixed(1)}s</span></div></div>
      </Panel>
      <Caption>Generator plus seed can replace a huge stored object, but repeated access may justify materialization or local caching; the right point depends on both budgets.</Caption>
    </figure>
  );
}

export function PP2CompressionLab() {
  const [decimalDigits, setDecimalDigits] = useState(1000000);
  const [audioSeconds, setAudioSeconds] = useState(60);
  const decimalRaw = decimalDigits;
  const decimalPacked = Math.ceil(decimalDigits / 2);
  const pcmBytes = audioSeconds * 2 * 2 * 44100;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">decimal digits = {decimalDigits.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="2000000" step="1000" value={decimalDigits} onChange={(event) => setDecimalDigits(Number(event.target.value))} /></label><label className="text-xs text-secondary">stereo PCM duration = {audioSeconds}s<input className="mt-2 w-full accent-current" type="range" min="1" max="300" value={audioSeconds} onChange={(event) => setAudioSeconds(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-danger p-3 text-danger">ASCII digits <span className="float-right font-mono">{formatBytes(decimalRaw)}</span></div><div className="border border-success p-3 text-success">2 digits/byte <span className="float-right font-mono">{formatBytes(decimalPacked)}</span></div><div className="border border-accent p-3 text-accent">44.1 kHz PCM <span className="float-right font-mono">{formatBytes(pcmBytes)}</span></div></div>
      </Panel>
      <Caption>Compact encodings reduce storage, I/O, and network time; decode cost, random access, lossiness, and corruption behavior remain part of the contract.</Caption>
    </figure>
  );
}

export function PP2AllocationPolicyLab() {
  const [x, setX] = useState(10001);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const recordBytes = 32;
  const staticBytes = 30000 * recordBytes;
  const dynamicBytes = (x + y + z) * recordBytes;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs text-secondary">x records = {x}<input className="mt-2 w-full accent-current" type="range" min="0" max="20000" step="100" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-xs text-secondary">y records = {y}<input className="mt-2 w-full accent-current" type="range" min="0" max="20000" step="100" value={y} onChange={(event) => setY(Number(event.target.value))} /></label><label className="text-xs text-secondary">z records = {z}<input className="mt-2 w-full accent-current" type="range" min="0" max="20000" step="100" value={z} onChange={(event) => setZ(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-danger p-3 text-danger">three fixed pools <span className="float-right font-mono">{formatBytes(staticBytes)}</span></div><div className="border border-success p-3 text-success">shared dynamic pool <span className="float-right font-mono">{formatBytes(dynamicBytes)}</span></div></div>
        <div className="mt-3 border border-warning p-3 text-warning">{x > 10000 || y > 10000 || z > 10000 ? "A fixed per-type pool fails despite unused capacity in other pools." : "Current demand fits every fixed pool, but reserves all 30,000 slots."}</div>
      </Panel>
      <Caption>Allocation policy decides when and how much to reserve; dynamic pools, variable-length records, recycling, and overlaying match space to actual lifetimes.</Caption>
    </figure>
  );
}

export function PP2MatrixOverlayLab() {
  const [size, setSize] = useState(150);
  const [wordBytes, setWordBytes] = useState(4);
  const separate = 2 * size * size * wordBytes;
  const overlaid = size * size * wordBytes;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">symmetric matrix size = {size}×{size}<input className="mt-2 w-full accent-current" type="range" min="10" max="1000" step="10" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label><label className="text-xs text-secondary">word bytes = {wordBytes}<input className="mt-2 w-full accent-current" type="range" min="2" max="8" step="2" value={wordBytes} onChange={(event) => setWordBytes(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-2 gap-1">
          <div className="border border-accent p-6 text-center text-accent">upper triangle<br />matrix A</div>
          <div className="border border-success p-6 text-center text-success">upper triangle<br />matrix B</div>
          <div className="col-span-2 border border-warning p-3 text-center text-warning">both triangles share one square physical matrix</div>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="border border-danger p-3 text-danger">separate <span className="float-right font-mono">{formatBytes(separate)}</span></div><div className="border border-success p-3 text-success">overlaid <span className="float-right font-mono">{formatBytes(overlaid)}</span></div></div>
      </Panel>
      <Caption>Kernighan stored two symmetric distance matrices in opposite triangles of one square matrix, halving the dominant 45,000-word allocation.</Caption>
    </figure>
  );
}

export function PP2CodeSpaceLab() {
  const [commands, setCommands] = useState(1000);
  const [representation, setRepresentation] = useState<"repeated loops" | "functions" | "interpreter" | "packed command">("interpreter");
  const bytesPerCommand = {
    "repeated loops": 24,
    functions: 12,
    interpreter: 8,
    "packed command": 4,
  }[representation];
  const fixedRuntime = representation === "interpreter" || representation === "packed command" ? 256 : representation === "functions" ? 96 : 0;
  const bytes = commands * bytesPerCommand + fixedRuntime;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">drawing commands = {commands}<input className="mt-2 w-full accent-current" type="range" min="10" max="5000" step="10" value={commands} onChange={(event) => setCommands(Number(event.target.value))} /></label>
        <label className="mt-3 block text-sm font-semibold text-primary">representation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={representation} onChange={(event) => setRepresentation(event.target.value as typeof representation)}><option>repeated loops</option><option>functions</option><option>interpreter</option><option>packed command</option></select></label>
        <div className="mt-4 border border-accent p-4 text-accent"><div className="text-xs">{bytesPerCommand} bytes/command + {fixedRuntime} bytes shared machinery</div><div className="font-mono text-3xl">{formatBytes(bytes)}</div></div>
      </Panel>
      <Caption>Function definition removes repeated code; an interpreter turns repeated instruction sequences into compact data; packing can fit one command in 32 bits.</Caption>
    </figure>
  );
}

export function PP2ChessSymmetryLab() {
  const [stage, setStage] = useState<"naive" | "symmetry" | "legal kings">("legal kings");
  const records = {
    naive: 64 ** 5,
    symmetry: 10 * 64 ** 4,
    "legal kings": 454 * 64 ** 3,
  }[stage];
  const bytes = records * 12 / 8;
  const reduction = 64 ** 5 / records;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">endgame database<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={stage} onChange={(event) => setStage(event.target.value as typeof stage)}><option value="naive">five independent square coordinates</option><option value="symmetry">normalize White King to 10 squares</option><option value="legal kings">also remove adjacent-King positions</option></select></label>
        <div className="mt-4 grid grid-cols-4 gap-1 sm:grid-cols-8">{Array.from({ length: 64 }, (_, index) => { const row = Math.floor(index / 8); const col = index % 8; const canonical = row <= col && row + col <= 7 && row <= 3; return <div key={index} className={"aspect-square border " + (canonical ? "border-success bg-success/20" : "border-border bg-background")} />; })}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">records <span className="float-right font-mono">{records.toExponential(2)}</span></div><div className="border border-warning p-3 text-warning">12-bit file <span className="float-right font-mono">{formatBytes(bytes)}</span></div><div className="border border-success p-3 text-success">reduction <span className="float-right font-mono">{reduction.toFixed(1)}x</span></div></div>
      </Panel>
      <Caption>Thompson canonicalized reflected boards and excluded illegal adjacent Kings, shrinking about 1.07 billion records to roughly 121 million.</Caption>
    </figure>
  );
}

export function PP2SpaceCertificateLab() {
  const [failure, setFailure] = useState<"none" | "no budget" | "wrong model" | "hidden time" | "no boundary">("none");
  const checks = {
    budget: failure !== "no budget",
    measured: true,
    model: failure !== "wrong model",
    behavior: true,
    timeTradeoff: failure !== "hidden time",
    boundary: failure !== "no boundary",
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">space review<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={failure} onChange={(event) => setFailure(event.target.value as typeof failure)}><option value="none">complete evidence</option><option value="no budget">no target budget</option><option value="wrong model">ignored allocator and alignment</option><option value="hidden time">decode or recompute time omitted</option><option value="no boundary">cache or paging boundary untested</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The representation is ready for the target memory envelope." : "The space claim is missing required evidence."}</div>
      </Panel>
      <Caption>A space optimization needs a real budget, measured hot structures, an allocator-aware model, behavioral equivalence, explicit time tradeoffs, and tests at memory boundaries.</Caption>
    </figure>
  );
}
