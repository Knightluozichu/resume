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
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

function bits(value: number, width = 16) {
  const mask = width === 32 ? 0xffffffff : 2 ** width - 1;
  return ((value & mask) >>> 0).toString(2).padStart(width, "0");
}

function hex32(value: number) {
  return `0x${(value >>> 0).toString(16).padStart(8, "0").toUpperCase()}`;
}

function ctz32(value: number) {
  const x = value >>> 0;
  if (x === 0) return 32;
  return 31 - Math.clz32((x & -x) >>> 0);
}

function zeroByteCandidateMask(value: number) {
  return (((value - 0x01010101) & ~value & 0x80808080) >>> 0);
}

function exactZeroByteMask(value: number) {
  const low = value & 0x7f7f7f7f;
  return (~(((low + 0x7f7f7f7f) >>> 0) | value | 0x7f7f7f7f) & 0x80808080) >>> 0;
}

function runs(value: number, width = 16) {
  const result: Array<{ start: number; length: number }> = [];
  let index = 0;
  while (index < width) {
    if (((value >>> index) & 1) === 0) {
      index += 1;
      continue;
    }
    const start = index;
    while (index < width && ((value >>> index) & 1) === 1) index += 1;
    result.push({ start, length: index - start });
  }
  return result;
}

export function HD6ByteLaneLab() {
  const [middle, setMiddle] = useState(0);
  const value = (0x44 << 24 | 0x43 << 16 | middle << 8 | 0x41) >>> 0;
  return (
    <Figure caption="Four byte lanes share one 32-bit word; lane-wise constants create parallel tests while the numeric word remains a single register value.">
      <label className="text-sm font-semibold text-primary">byte 1 = {middle}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={middle} onChange={(event) => setMiddle(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="bytes high→low" value={`44 43 ${middle.toString(16).padStart(2, "0")} 41`} /><Stat label="word" value={hex32(value)} /><Stat label="contains zero" value={middle === 0 ? "yes" : "no"} tone={middle === 0 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD6HasZeroByteLab() {
  const [middle, setMiddle] = useState(0);
  const value = (0x0201 << 16 | middle << 8 | 0x7f) >>> 0;
  const candidate = zeroByteCandidateMask(value);
  return (
    <Figure caption="Subtracting 0x01 per lane, then combining NOT x and high-bit masks, detects whether at least one byte was zero before subtraction.">
      <label className="text-sm font-semibold text-primary">test byte = {middle}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={middle} onChange={(event) => setMiddle(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="word" value={hex32(value)} /><Stat label="candidate mask" value={hex32(candidate)} /><Stat label="has zero byte" value={candidate !== 0 ? "yes" : "no"} tone={candidate !== 0 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD6ExactZeroMaskLab() {
  const [second, setSecond] = useState(1);
  const value = (0x4500 << 16 | second << 8 | 0x00) >>> 0;
  const candidate = zeroByteCandidateMask(value);
  const exact = exactZeroByteMask(value);
  return (
    <Figure caption="The fast subtract mask is excellent for existence and low-order-first location, but an exact per-byte mask removes borrow-induced candidate bits.">
      <label className="text-sm font-semibold text-primary">byte after low zero = {second}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={second} onChange={(event) => setSecond(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="word" value={hex32(value)} /><Stat label="subtract candidates" value={hex32(candidate)} tone="warning" /><Stat label="exact zero mask" value={hex32(exact)} tone="success" /></div>
    </Figure>
  );
}

export function HD6FirstZeroByteLab() {
  const [zeroLane, setZeroLane] = useState(2);
  const byteValues = [0x41, 0x42, 0x43, 0x44].map((value, index) => index === zeroLane ? 0 : value);
  const word = (byteValues[0] | byteValues[1] << 8 | byteValues[2] << 16 | byteValues[3] << 24) >>> 0;
  const mask = exactZeroByteMask(word);
  const first = mask === 0 ? "none" : Math.floor(ctz32(mask) / 8).toString();
  return (
    <Figure caption="With low-order byte searched first, CTZ of an exact high-bit-per-zero-byte mask gives eight times the first lane index plus seven.">
      <label className="text-sm font-semibold text-primary">zero lane from low end = {zeroLane}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={zeroLane} onChange={(event) => setZeroLane(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="word" value={hex32(word)} /><Stat label="zero mask" value={hex32(mask)} /><Stat label="first zero lane" value={first} tone="success" /></div>
    </Figure>
  );
}

export function HD6RunInventoryLab() {
  const [value, setValue] = useState(0b0011100110111000);
  const inventory = runs(value);
  return (
    <Figure caption="A word's 1-bits form maximal runs described by low start position and length; word edges act as implicit zero sentinels.">
      <label className="text-sm font-semibold text-primary">16-bit x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="run count" value={inventory.length.toString()} /><Stat label="starts" value={inventory.map((run) => run.start).join(", ") || "none"} /><Stat label="lengths" value={inventory.map((run) => run.length).join(", ") || "none"} tone="success" /></div>
    </Figure>
  );
}

export function HD6RunBoundaryLab() {
  const [value, setValue] = useState(0b1110000000000111);
  const inventory = runs(value);
  const lowEdge = inventory.some((run) => run.start === 0);
  const highEdge = inventory.some((run) => run.start + run.length === 16);
  return (
    <Figure caption="Runs touching bit 0 or bit w−1 need virtual zero sentinels outside the word; otherwise start/end masks can lose edge runs.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="low-edge run" value={lowEdge ? "yes" : "no"} /><Stat label="high-edge run" value={highEdge ? "yes" : "no"} /><Stat label="total runs" value={inventory.length.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD6FixedRunLab() {
  const [value, setValue] = useState(0b0011100110111000);
  const [length, setLength] = useState(3);
  let starts = value;
  for (let offset = 1; offset < length; offset += 1) starts &= value >>> offset;
  const first = starts === 0 ? "none" : ctz32(starts).toString();
  return (
    <Figure caption="ANDing x with shifted copies leaves bit i set exactly when positions i through i+n−1 are all ones; CTZ then locates the low-order first run.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">required length = {length}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="candidate starts" value={bits(starts)} /><Stat label="first start" value={first} tone={starts ? "success" : "warning"} /><Stat label="exists" value={starts ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD6RunErosionLab() {
  const [value, setValue] = useState(0b0011110011101000);
  const stage1 = value & (value << 1);
  const stage2 = stage1 & (stage1 << 1);
  const stage3 = stage2 & (stage2 << 1);
  return (
    <Figure caption="Each x AND (x shifted left one) erosion removes one bit from every run; a run of length L survives exactly L−1 erosions.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="input" value={bits(value)} /><Stat label="after 1" value={bits(stage1)} /><Stat label="after 2" value={bits(stage2)} /><Stat label="after 3" value={bits(stage3)} tone="success" /></div>
    </Figure>
  );
}

export function HD6LongestRunLab() {
  const [value, setValue] = useState(0b0011110011101000);
  let eroded = value;
  let length = 0;
  while (eroded !== 0) {
    eroded &= eroded << 1;
    length += 1;
  }
  const inventory = runs(value);
  const oracle = inventory.length ? Math.max(...inventory.map((run) => run.length)) : 0;
  return (
    <Figure caption="Repeated erosion reaches zero after exactly the longest run length; an explicit run inventory provides a small-width oracle.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="erosion iterations" value={length.toString()} tone="success" /><Stat label="inventory oracle" value={oracle.toString()} /><Stat label="agree" value={length === oracle ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD6ShortestRunLab() {
  const [value, setValue] = useState(0b0011110011101000);
  const inventory = runs(value);
  const shortest = inventory.length ? Math.min(...inventory.map((run) => run.length)) : 0;
  const longest = inventory.length ? Math.max(...inventory.map((run) => run.length)) : 0;
  return (
    <Figure caption="The shortest maximal run is not the first run found; all start/end pairs or the first disappearance under erosion must be considered.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="run lengths" value={inventory.map((run) => run.length).join(", ") || "none"} /><Stat label="shortest" value={shortest.toString()} tone="success" /><Stat label="longest" value={longest.toString()} /></div>
    </Figure>
  );
}

export function HD6SearchOrderLab() {
  const [littleEndian, setLittleEndian] = useState(true);
  const bytes = ["41", "00", "43", "00"];
  const memory = littleEndian ? bytes : [...bytes].reverse();
  const firstMemoryZero = memory.indexOf("00");
  return (
    <Figure caption="Numeric low-byte order and increasing-memory order coincide only under the matching load/endianness convention; byte search must name its order.">
      <label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={littleEndian} onChange={(event) => setLittleEndian(event.target.checked)} />little-endian memory view</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="numeric low→high" value={bytes.join(" ")} /><Stat label="memory low→high" value={memory.join(" ")} /><Stat label="first memory zero" value={firstMemoryZero.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD6RunPredicateLab() {
  const [value, setValue] = useState(0b0011110011101000);
  const starts = value & ~(value << 1);
  const ends = value & ~(value >>> 1);
  return (
    <Figure caption="Run starts are 1-bits with a zero immediately below; run ends are 1-bits with a zero immediately above, including virtual edge zeros.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="run starts" value={bits(starts)} /><Stat label="run ends" value={bits(ends)} /><Stat label="run count" value={runs(value).length.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD6SearchCertificateLab() {
  const [order, setOrder] = useState(true);
  const [sentinels, setSentinels] = useState(false);
  const [oracle, setOracle] = useState(true);
  const complete = order && sentinels && oracle;
  return (
    <Figure caption="A word-search routine is complete only when search order, edge sentinels, and an independent scalar oracle are explicit.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={order} onChange={(event) => setOrder(event.target.checked)} />search order</label><label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={sentinels} onChange={(event) => setSentinels(event.target.checked)} />edge sentinels</label><label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={oracle} onChange={(event) => setOracle(event.target.checked)} />scalar oracle</label></div>
      <div className="mt-4"><Stat label="search certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
