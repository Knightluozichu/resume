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

function clz8(value: number) {
  return value === 0 ? 8 : 7 - Math.floor(Math.log2(value));
}

function ctz32(value: number) {
  if (value === 0) return 32;
  const isolated = (value & -value) >>> 0;
  return Math.log2(isolated);
}

export function HD5PopcountScanLab() {
  const [value, setValue] = useState(0b10110100);
  const count = popcount(value);
  return (
    <Figure caption="A direct scan classifies every bit, so its work is fixed by word width even when the input contains very few 1-bits.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="word width" value="8" /><Stat label="1-bits" value={count.toString()} tone="success" /><Stat label="0-bits" value={(8 - count).toString()} /></div>
    </Figure>
  );
}

export function HD5KernighanLab() {
  const [value, setValue] = useState(0b10110100);
  const sequence: number[] = [];
  let current = value;
  while (current !== 0) {
    sequence.push(current);
    current &= current - 1;
  }
  return (
    <Figure caption="Repeated x AND (x−1) clears exactly one rightmost 1, so iteration count equals population count rather than word width.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="iterations" value={sequence.length.toString()} tone="success" /><Stat label="first state" value={sequence.length ? bits(sequence[0]) : "none"} /><Stat label="last nonzero" value={sequence.length ? bits(sequence[sequence.length - 1]) : "none"} /></div>
      <div className="mt-3 break-words font-mono text-xs text-secondary">{sequence.map((item) => bits(item)).join(" → ") || "zero has no clearing step"}</div>
    </Figure>
  );
}

export function HD5SwarLab() {
  const [value, setValue] = useState(0b10110100);
  const pairs = value - ((value >>> 1) & 0x55);
  const nibbles = (pairs & 0x33) + ((pairs >>> 2) & 0x33);
  const total = (nibbles + (nibbles >>> 4)) & 0x0f;
  return (
    <Figure caption="SWAR performs a reduction tree inside one word: 2-bit lane counts combine into nibble counts and finally a byte total.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="input" value={bits(value)} /><Stat label="2-bit counts" value={bits(pairs)} /><Stat label="4-bit counts" value={bits(nibbles)} /><Stat label="total" value={total.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD5LookupLab() {
  const [value, setValue] = useState(0xb56d);
  const low = value & 0xff;
  const high = value >>> 8;
  const total = popcount(low) + popcount(high);
  return (
    <Figure caption="A byte lookup decomposes a wider word into independent chunks; table size, cache behavior, and extraction cost become part of the model.">
      <label className="text-sm font-semibold text-primary">16-bit x = {bits(value, 16)}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="high byte count" value={popcount(high).toString()} /><Stat label="low byte count" value={popcount(low).toString()} /><Stat label="total" value={total.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD5ParityFoldLab() {
  const [value, setValue] = useState(0b10110100);
  const stage4 = value ^ (value >>> 4);
  const stage2 = stage4 ^ (stage4 >>> 2);
  const stage1 = stage2 ^ (stage2 >>> 1);
  const parity = stage1 & 1;
  return (
    <Figure caption="XOR folding preserves parity while combining halves; after log2(width) folds, the low bit is the parity of the entire word.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="fold 4" value={bits(stage4)} /><Stat label="fold 2" value={bits(stage2)} /><Stat label="fold 1" value={bits(stage1)} /><Stat label="parity" value={parity ? "odd" : "even"} tone="success" /></div>
    </Figure>
  );
}

export function HD5ParityRelationLab() {
  const [value, setValue] = useState(0b11100101);
  const count = popcount(value);
  const parity = count & 1;
  return (
    <Figure caption="Parity is population count modulo two; it detects an odd number of flipped bits but does not locate or correct them.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="population count" value={count.toString()} /><Stat label="count mod 2" value={parity.toString()} /><Stat label="parity class" value={parity ? "odd" : "even"} tone="success" /></div>
    </Figure>
  );
}

export function HD5LeadingZeroLab() {
  const [value, setValue] = useState(0b00101100);
  const count = clz8(value);
  const highest = value === 0 ? "none" : (7 - count).toString();
  return (
    <Figure caption="Counting leading zeros locates the highest 1-bit; zero needs a separate return convention because it has no highest set position.">
      <label className="text-sm font-semibold text-primary">8-bit x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="leading zeros" value={count.toString()} tone="success" /><Stat label="highest 1 position" value={highest} /><Stat label="bit length" value={(8 - count).toString()} /></div>
    </Figure>
  );
}

export function HD5ClzSearchLab() {
  const [value, setValue] = useState(37);
  const count = clz8(value);
  const firstHalf = value < 16 ? "upper nibble zero" : "upper nibble nonzero";
  const secondStep = value < 16 ? (value < 4 ? "top 6 bits zero" : "inspect low nibble high pair") : (value < 64 ? "top 2 bits zero" : "highest 1 in top pair");
  return (
    <Figure caption="A branch or conditional-move CLZ search discards half of the remaining positions at each step, mirroring binary search over bit groups.">
      <label className="text-sm font-semibold text-primary">8-bit x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="1" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="first decision" value={firstHalf} /><Stat label="next decision" value={secondStep} /><Stat label="CLZ" value={count.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD5TrailingZeroLab() {
  const [value, setValue] = useState(0b10110000);
  const isolated = value === 0 ? 0 : (value & -value);
  const count = value === 0 ? 8 : Math.log2(isolated);
  return (
    <Figure caption="Isolating x AND −x produces a one-hot value whose exponent is the trailing-zero count; zero again requires an explicit policy.">
      <label className="text-sm font-semibold text-primary">8-bit x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="isolated lowbit" value={bits(isolated)} /><Stat label="trailing zeros" value={count.toString()} tone="success" /><Stat label="lower mask" value={value === 0 ? "undefined" : bits(isolated - 1)} /></div>
    </Figure>
  );
}

export function HD5CtzPopcountLab() {
  const [value, setValue] = useState(0b10110000);
  const isolated = value === 0 ? 0 : (value & -value);
  const lowerMask = isolated - 1;
  const viaPopcount = value === 0 ? 8 : popcount(lowerMask);
  return (
    <Figure caption="The one-hot lowbit minus one has exactly one 1 for every trailing zero, turning CTZ into a population-count identity.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="lowbit−1" value={value === 0 ? "zero policy" : bits(lowerMask)} /><Stat label="popcount mask" value={value === 0 ? "n/a" : popcount(lowerMask).toString()} /><Stat label="CTZ result" value={viaPopcount.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD5DeBruijnLab() {
  const [value, setValue] = useState(0x5a40);
  const isolated = (value & -value) >>> 0;
  const table = [0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8, 31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9];
  const index = (Math.imul(isolated, 0x077cb531) >>> 27) & 31;
  const count = table[index];
  return (
    <Figure caption="Multiplying an isolated 32-bit one-hot value by a De Bruijn constant maps each possible position to a unique 5-bit table index.">
      <label className="text-sm font-semibold text-primary">nonzero x = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="65535" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="isolated lowbit" value={`0x${isolated.toString(16)}`} /><Stat label="table index" value={index.toString()} /><Stat label="CTZ" value={count.toString()} tone={count === ctz32(value) ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function HD5DensityChoiceLab() {
  const [value, setValue] = useState(0b00010001);
  const count = popcount(value);
  const sparseSteps = count;
  const swarStages = 3;
  return (
    <Figure caption="Data density changes the iteration count of clear-lowest-one loops, while SWAR and hardware POPCNT have input-independent structure.">
      <label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="1-bit density" value={`${count}/8`} /><Stat label="clear-one iterations" value={sparseSteps.toString()} tone={sparseSteps < swarStages ? "success" : "warning"} /><Stat label="8-bit SWAR stages" value={swarStages.toString()} /></div>
    </Figure>
  );
}

export function HD5ZeroPolicyLab() {
  const [clzWidth, setClzWidth] = useState(true);
  const [ctzWidth, setCtzWidth] = useState(true);
  const [documented, setDocumented] = useState(false);
  const complete = clzWidth && ctzWidth && documented;
  return (
    <Figure caption="CLZ and CTZ at zero may return word width, be undefined, or use a sentinel; portability requires the wrapper contract to choose explicitly.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={clzWidth} onChange={(event) => setClzWidth(event.target.checked)} />CLZ(0) policy</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={ctzWidth} onChange={(event) => setCtzWidth(event.target.checked)} />CTZ(0) policy</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={documented} onChange={(event) => setDocumented(event.target.checked)} />documented</label></div>
      <div className="mt-4"><Stat label="zero-input contract" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD5CountingCertificateLab() {
  const [identity, setIdentity] = useState(true);
  const [zero, setZero] = useState(false);
  const [target, setTarget] = useState(true);
  const complete = identity && zero && target;
  return (
    <Figure caption="A counting primitive is ready when its identity, zero behavior, and target instruction/library mapping all agree.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={identity} onChange={(event) => setIdentity(event.target.checked)} />identity</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={zero} onChange={(event) => setZero(event.target.checked)} />zero case</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={target} onChange={(event) => setTarget(event.target.checked)} />target primitive</label></div>
      <div className="mt-4"><Stat label="counting certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
