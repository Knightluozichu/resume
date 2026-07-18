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

function bits(value: number, width = 8) {
  const mask = 2 ** width - 1;
  return (value & mask).toString(2).padStart(width, "0");
}

function popcount(value: number) {
  let x = value >>> 0;
  let count = 0;
  while (x !== 0) {
    x &= x - 1;
    count += 1;
  }
  return count;
}

function reverseBits(value: number, width: number) {
  let result = 0;
  for (let index = 0; index < width; index += 1)
    result |= ((value >>> index) & 1) << (width - 1 - index);
  return result >>> 0;
}

function compress(value: number, mask: number) {
  let sourceMask = mask >>> 0;
  let output = 0;
  let outputBit = 1;
  while (sourceMask !== 0) {
    const selected = (sourceMask & -sourceMask) >>> 0;
    if ((value & selected) !== 0) output |= outputBit;
    sourceMask = (sourceMask & (sourceMask - 1)) >>> 0;
    outputBit *= 2;
  }
  return output >>> 0;
}

function expand(value: number, mask: number) {
  let destinationMask = mask >>> 0;
  let input = value >>> 0;
  let output = 0;
  while (destinationMask !== 0) {
    const selected = (destinationMask & -destinationMask) >>> 0;
    if ((input & 1) !== 0) output |= selected;
    input >>>= 1;
    destinationMask = (destinationMask & (destinationMask - 1)) >>> 0;
  }
  return output >>> 0;
}

function transpose8(rows: number[]) {
  return Array.from({ length: 8 }, (__, column) => {
    let result = 0;
    for (let row = 0; row < 8; row += 1)
      result |= ((rows[row] >>> column) & 1) << row;
    return result;
  });
}

export function HD7BitReverseLab() {
  const [value, setValue] = useState(0b10110010);
  const reversed = reverseBits(value, 8);
  return (
    <Figure caption="Bit reversal maps source position i to destination w−1−i; applying the same permutation twice restores the input.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="input" value={bits(value)} /><Stat label="reversed" value={bits(reversed)} tone="success" /><Stat label="reverse twice" value={bits(reverseBits(reversed, 8))} /></div>
    </Figure>
  );
}

export function HD7SwapStagesLab() {
  const [value, setValue] = useState(0b10110010);
  const adjacent = ((value >>> 1) & 0x55) | ((value & 0x55) << 1);
  const pairs = ((adjacent >>> 2) & 0x33) | ((adjacent & 0x33) << 2);
  const nibbles = ((pairs >>> 4) & 0x0f) | ((pairs & 0x0f) << 4);
  return (
    <Figure caption="A mask-and-swap network reverses 8 bits in three stages: adjacent bits, 2-bit groups, then nibbles.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="input" value={bits(value)} /><Stat label="swap 1" value={bits(adjacent)} /><Stat label="swap 2" value={bits(pairs)} /><Stat label="swap 4" value={bits(nibbles)} tone="success" /></div>
    </Figure>
  );
}

export function HD7ByteReverseLab() {
  const [first, setFirst] = useState(0x12);
  const bytes = [first, 0x34, 0x56, 0x78];
  const original = bytes.map((byte) => byte.toString(16).padStart(2, "0")).join(" ");
  const reversed = [...bytes].reverse().map((byte) => byte.toString(16).padStart(2, "0")).join(" ");
  return (
    <Figure caption="Byte reversal changes the order of 8-bit lanes but preserves bit order inside each lane; full bit reversal additionally reverses every byte.">
      <label className="text-sm font-semibold text-primary">low byte = {first}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={first} onChange={(event) => setFirst(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="low→high bytes" value={original} /><Stat label="byte reversed" value={reversed} tone="success" /><Stat label="population preserved" value={popcount(bytes.reduce((word, byte, index) => word | byte << (8 * index), 0)).toString()} /></div>
    </Figure>
  );
}

export function HD7PerfectShuffleLab() {
  const [value, setValue] = useState(0b11000101);
  const low = value & 0x0f;
  const high = value >>> 4;
  const shuffled = expand(low, 0x55) | expand(high, 0xaa);
  return (
    <Figure caption="A perfect shuffle interleaves the low and high halves into even and odd destination positions.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="low half" value={bits(low, 4)} /><Stat label="high half" value={bits(high, 4)} /><Stat label="interleaved" value={bits(shuffled)} tone="success" /><Stat label="1-bits" value={popcount(shuffled).toString()} /></div>
    </Figure>
  );
}

export function HD7UnshuffleLab() {
  const [value, setValue] = useState(0b10110100);
  const even = compress(value, 0x55);
  const odd = compress(value, 0xaa);
  const packed = even | odd << 4;
  const restored = expand(even, 0x55) | expand(odd, 0xaa);
  return (
    <Figure caption="Unshuffle gathers even positions into one half and odd positions into the other; expanding both halves proves the inverse mapping.">
      <label className="text-sm font-semibold text-primary">shuffled x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="even bits" value={bits(even, 4)} /><Stat label="odd bits" value={bits(odd, 4)} /><Stat label="packed halves" value={bits(packed)} tone="success" /><Stat label="round trip" value={bits(restored)} /></div>
    </Figure>
  );
}

export function HD7MatrixTransposeLab() {
  const [rows, setRows] = useState([0b10000001, 0b01000010, 0b00100100, 0b00011000, 0b00011000, 0b00100100, 0b01000010, 0b10000001]);
  const columns = transpose8(rows);
  const toggle = (row: number, column: number) => setRows((current) => current.map((value, index) => index === row ? value ^ (1 << column) : value));
  return (
    <Figure caption="Transposing an 8×8 bit matrix swaps row and column indices; click cells to see source rows become destination columns.">
      <div className="mx-auto grid w-fit grid-cols-8 gap-1">{rows.flatMap((rowValue, row) => Array.from({ length: 8 }, (__, column) => <button key={`${row}-${column}`} type="button" title={`toggle row ${row}, column ${column}`} className={`h-6 w-6 border border-border ${((rowValue >>> column) & 1) ? "bg-accent text-background" : "bg-background text-secondary"}`} onClick={() => toggle(row, column)}>{(rowValue >>> column) & 1}</button>))}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="source rows hex" value={rows.map((row) => row.toString(16).padStart(2, "0")).join(" ")} /><Stat label="transposed rows hex" value={columns.map((row) => row.toString(16).padStart(2, "0")).join(" ")} tone="success" /></div>
    </Figure>
  );
}

export function HD7TransposeRoundTripLab() {
  const [seed, setSeed] = useState(0x5a);
  const rows = Array.from({ length: 8 }, (__, index) => ((seed << index) | (seed >>> (8 - index))) & 0xff);
  const transposed = transpose8(rows);
  const restored = transpose8(transposed);
  const agrees = rows.every((row, index) => row === restored[index]);
  return (
    <Figure caption="Matrix transpose is an involution: transposing the result again returns every original row.">
      <label className="text-sm font-semibold text-primary">row seed = {seed}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="row 0" value={bits(rows[0])} /><Stat label="transpose row 0" value={bits(transposed[0])} /><Stat label="round trip" value={agrees ? "exact" : "mismatch"} tone={agrees ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function HD7CompressLab() {
  const [value, setValue] = useState(0b11010110);
  const [mask, setMask] = useState(0b10110100);
  const result = compress(value, mask);
  return (
    <Figure caption="Generalized extract gathers x bits selected by mask into contiguous low positions while preserving increasing source-position order.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">mask = {bits(mask)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={mask} onChange={(event) => setMask(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="selected source" value={bits(value & mask)} /><Stat label="selected count" value={popcount(mask).toString()} /><Stat label="compressed" value={bits(result)} tone="success" /></div>
    </Figure>
  );
}

export function HD7ExpandLab() {
  const [value, setValue] = useState(0b00001011);
  const [mask, setMask] = useState(0b10110100);
  const result = expand(value, mask);
  return (
    <Figure caption="Generalized insert scatters low source bits into mask-selected destination positions and writes zero elsewhere.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">packed x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">mask = {bits(mask)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={mask} onChange={(event) => setMask(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="destination lanes" value={bits(mask)} /><Stat label="consumed bits" value={popcount(mask).toString()} /><Stat label="expanded" value={bits(result)} tone="success" /></div>
    </Figure>
  );
}

export function HD7CompressExpandRoundTripLab() {
  const [value, setValue] = useState(0b11010110);
  const mask = 0b10110100;
  const packed = compress(value, mask);
  const selectedRoundTrip = expand(packed, mask);
  const packedMask = (1 << popcount(mask)) - 1;
  const sourceRoundTrip = compress(expand(value, mask), mask);
  return (
    <Figure caption="Compress and expand are inverses only on their selected subspaces: one round trip yields x AND mask, the other keeps the low popcount(mask) bits.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="expand(compress)" value={bits(selectedRoundTrip)} tone="success" /><Stat label="x AND mask" value={bits(value & mask)} /><Stat label="compress(expand)" value={bits(sourceRoundTrip & packedMask)} /></div>
    </Figure>
  );
}

export function HD7MaskPartitionLab() {
  const [value, setValue] = useState(0b11010110);
  const mask = 0b10110100;
  const selected = compress(value, mask);
  const rejected = compress(value, (~mask) & 0xff);
  const reconstructed = expand(selected, mask) | expand(rejected, (~mask) & 0xff);
  return (
    <Figure caption="Compressing mask and complement-mask partitions all source bits into two packed streams; expanding and ORing reconstructs the word.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="selected stream" value={bits(selected)} /><Stat label="other stream" value={bits(rejected)} /><Stat label="reconstructed" value={bits(reconstructed)} tone="success" /><Stat label="exact" value={reconstructed === value ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD7LruStackLab() {
  const [order, setOrder] = useState(["A", "B", "C", "D"]);
  const access = (item: string) => setOrder((current) => [item, ...current.filter((entry) => entry !== item)]);
  return (
    <Figure caption="A move-to-front recency stack is a permutation update: the accessed item becomes most recent and all earlier items preserve relative order.">
      <div className="flex flex-wrap gap-2">{["A", "B", "C", "D"].map((item) => <button key={item} type="button" title={`access page ${item}`} className="border border-border bg-background px-3 py-2 text-sm font-semibold text-primary hover:border-accent" onClick={() => access(item)}>Access {item}</button>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="MRU→LRU" value={order.join(" → ")} tone="success" /><Stat label="most recent" value={order[0]} /><Stat label="eviction candidate" value={order[order.length - 1]} tone="warning" /></div>
    </Figure>
  );
}

export function HD7LruMatrixLab() {
  const [rows, setRows] = useState([0, 0, 0, 0]);
  const access = (page: number) => setRows((current) => current.map((row, index) => {
    const withRow = index === page ? 0b1111 : row;
    return withRow & ~(1 << page);
  }));
  const minimum = Math.min(...rows);
  const lru = rows.indexOf(minimum);
  return (
    <Figure caption="The LRU matrix algorithm sets the accessed row and clears its column; interpreting rows as unsigned values makes a minimum row an eviction candidate.">
      <div className="flex flex-wrap gap-2">{rows.map((__, page) => <button key={page} type="button" title={`access page ${page}`} className="border border-border bg-background px-3 py-2 text-sm font-semibold text-primary hover:border-accent" onClick={() => access(page)}>Page {page}</button>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="matrix rows" value={rows.map((row) => bits(row, 4)).join(" / ")} /><Stat label="row values" value={rows.join(", ")} /><Stat label="minimum row page" value={lru.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD7RearrangementCertificateLab() {
  const [mapping, setMapping] = useState(true);
  const [roundTrip, setRoundTrip] = useState(false);
  const [target, setTarget] = useState(true);
  const complete = mapping && roundTrip && target;
  return (
    <Figure caption="A rearrangement is ready when every destination has a source mapping, the intended inverse round trip is proved, and target primitives are checked.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={mapping} onChange={(event) => setMapping(event.target.checked)} />mapping</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={roundTrip} onChange={(event) => setRoundTrip(event.target.checked)} />round trip</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={target} onChange={(event) => setTarget(event.target.checked)} />target primitive</label></div>
      <div className="mt-4"><Stat label="rearrangement certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
