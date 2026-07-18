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

function ceilPowerOfTwo(value: number) {
  if (value <= 1) return 1;
  return 2 ** Math.ceil(Math.log2(value));
}

export function HD3KnownMultipleLab() {
  const [value, setValue] = useState(93);
  const [exponent, setExponent] = useState(4);
  const alignment = 2 ** exponent;
  const mask = alignment - 1;
  const down = value & ~mask;
  const up = (value + mask) & ~mask;
  return (
    <Figure caption="For a power-of-two alignment, the low k bits are the remainder: clear them to round down, or add the mask before clearing to round up.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="240" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">alignment = 2^{exponent} = {alignment}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={exponent} onChange={(event) => setExponent(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="low mask" value={bits(mask)} /><Stat label="remainder" value={(value & mask).toString()} /><Stat label="round down" value={down.toString()} tone="success" /><Stat label="round up" value={up.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD3AlignmentBitsLab() {
  const [value, setValue] = useState(172);
  const exponent = 3;
  const mask = 2 ** exponent - 1;
  const high = value & ~mask;
  const low = value & mask;
  return (
    <Figure caption="Modulo 2^k is exactly the low k-bit field; quotient-aligned prefix and remainder can be read without division.">
      <label className="text-sm font-semibold text-primary">8-bit x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="aligned prefix" value={bits(high)} tone="success" /><Stat label="low 3 bits" value={bits(low)} tone="warning" /><Stat label="x mod 8" value={low.toString()} /></div>
    </Figure>
  );
}

export function HD3SignedRoundingLab() {
  const [value, setValue] = useState(-19);
  const [exponent, setExponent] = useState(3);
  const alignment = 2 ** exponent;
  const floor = Math.floor(value / alignment) * alignment;
  const ceil = Math.ceil(value / alignment) * alignment;
  const towardZero = Math.trunc(value / alignment) * alignment;
  return (
    <Figure caption="For negative inputs, floor, ceiling, and truncation toward zero are different contracts; a bit-clearing formula follows floor for two's complement.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">signed x = {value}<input className="mt-2 w-full accent-current" type="range" min="-64" max="64" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">multiple = {alignment}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={exponent} onChange={(event) => setExponent(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="floor multiple" value={floor.toString()} /><Stat label="ceil multiple" value={ceil.toString()} tone="success" /><Stat label="toward zero" value={towardZero.toString()} tone="warning" /></div>
    </Figure>
  );
}

export function HD3PowerPredicateLab() {
  const [value, setValue] = useState(64);
  const cleared = value & (value - 1);
  const isPower = value !== 0 && cleared === 0;
  return (
    <Figure caption="A positive power of two has exactly one 1-bit, so clearing its rightmost 1 leaves zero; the explicit nonzero guard is essential.">
      <label className="text-sm font-semibold text-primary">x = {value} ({bits(value)})<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x−1" value={bits(value - 1)} /><Stat label="x AND (x−1)" value={bits(cleared)} /><Stat label="power of two" value={isPower ? "yes" : "no"} tone={isPower ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD3BitSpreadLab() {
  const [value, setValue] = useState(73);
  const start = Math.max(0, value - 1) & 0xff;
  const stage1 = (start | (start >>> 1)) & 0xff;
  const stage2 = (stage1 | (stage1 >>> 2)) & 0xff;
  const stage3 = (stage2 | (stage2 >>> 4)) & 0xff;
  return (
    <Figure caption="Starting from x−1, OR-with-shift doubles the filled suffix each stage until every bit below the highest 1 is set.">
      <label className="text-sm font-semibold text-primary">x = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="128" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="x−1" value={bits(start)} /><Stat label="OR >> 1" value={bits(stage1)} /><Stat label="OR >> 2" value={bits(stage2)} /><Stat label="OR >> 4" value={bits(stage3)} tone="success" /></div>
    </Figure>
  );
}

export function HD3NextPowerLab() {
  const [value, setValue] = useState(73);
  const next = ceilPowerOfTwo(value);
  const exact = value > 0 && (value & (value - 1)) === 0;
  return (
    <Figure caption="Ceiling to a power of two preserves an exact boundary and otherwise selects the one-hot value immediately above the highest set bit.">
      <label className="text-sm font-semibold text-primary">requested size x = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="already exact" value={exact ? "yes" : "no"} /><Stat label="ceil power" value={next.toString()} tone="success" /><Stat label="slack" value={(next - value).toString()} tone={next === value ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD3CeilLogLab() {
  const [value, setValue] = useState(65);
  const floorLog = Math.floor(Math.log2(value));
  const ceilLog = Math.ceil(Math.log2(value));
  return (
    <Figure caption="Floor log2 locates the highest 1-bit; ceil log2 adds one only when lower bits exist and gives the exponent of the ceiling power.">
      <label className="text-sm font-semibold text-primary">positive x = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="floor log2" value={floorLog.toString()} /><Stat label="ceil log2" value={ceilLog.toString()} tone="success" /><Stat label="2^ceil" value={(2 ** ceilLog).toString()} /></div>
    </Figure>
  );
}

export function HD3WidthOverflowLab() {
  const [value, setValue] = useState(193);
  const width = 8;
  const maximumPower = 2 ** (width - 1);
  const mathematical = ceilPowerOfTwo(value);
  const representable = mathematical <= maximumPower;
  const stored = mathematical & 0xff;
  return (
    <Figure caption="In an 8-bit unsigned word, the next one-hot power above 128 would be 256 and therefore wraps to zero; zero is an overflow sentinel, not a valid capacity.">
      <label className="text-sm font-semibold text-primary">8-bit request = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="mathematical ceil" value={mathematical.toString()} /><Stat label="stored low byte" value={stored.toString()} tone={representable ? "success" : "danger"} /><Stat label="representable one-hot" value={representable ? "yes" : "no"} tone={representable ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD3RangeCrossingLab() {
  const [start, setStart] = useState(57);
  const [length, setLength] = useState(12);
  const exponent = 4;
  const size = 2 ** exponent;
  const end = start + length - 1;
  const firstBucket = start >>> exponent;
  const lastBucket = end >>> exponent;
  const crosses = firstBucket !== lastBucket;
  return (
    <Figure caption="A nonempty inclusive range crosses a 2^k boundary exactly when its first and last addresses have different prefixes above bit k−1.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">start = {start}<input className="mt-2 w-full accent-current" type="range" min="0" max="220" value={start} onChange={(event) => setStart(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">length = {length}<input className="mt-2 w-full accent-current" type="range" min="1" max="32" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="boundary size" value={size.toString()} /><Stat label="end inclusive" value={end.toString()} /><Stat label="bucket ids" value={`${firstBucket} → ${lastBucket}`} /><Stat label="crosses" value={crosses ? "yes" : "no"} tone={crosses ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function HD3LowRemainderCrossingLab() {
  const [offset, setOffset] = useState(11);
  const [length, setLength] = useState(8);
  const size = 16;
  const crosses = offset + length > size;
  return (
    <Figure caption="Once the start is reduced modulo 2^k, boundary crossing depends only on whether remainder plus nonempty length exceeds the bucket size.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">start mod 16 = {offset}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={offset} onChange={(event) => setOffset(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">length = {length}<input className="mt-2 w-full accent-current" type="range" min="1" max="24" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="remainder + length" value={(offset + length).toString()} /><Stat label="room in bucket" value={(size - offset).toString()} /><Stat label="crosses" value={crosses ? "yes" : "no"} tone={crosses ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function HD3PageSpanLab() {
  const [address, setAddress] = useState(4090);
  const [length, setLength] = useState(40);
  const pageSize = 4096;
  const first = Math.floor(address / pageSize);
  const last = Math.floor((address + length - 1) / pageSize);
  const count = last - first + 1;
  return (
    <Figure caption="Page coverage uses the inclusive last byte address; a range beginning near a page end can touch two pages even when its length is far below one page.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">address = {address}<input className="mt-2 w-full accent-current" type="range" min="4000" max="8200" value={address} onChange={(event) => setAddress(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">bytes = {length}<input className="mt-2 w-full accent-current" type="range" min="1" max="256" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="first page" value={first.toString()} /><Stat label="last page" value={last.toString()} /><Stat label="pages touched" value={count.toString()} tone={count > 1 ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function HD3RingMaskLab() {
  const [index, setIndex] = useState(29);
  const exponent = 4;
  const capacity = 2 ** exponent;
  const slot = index & (capacity - 1);
  return (
    <Figure caption="A power-of-two ring capacity turns modulo into a mask; the optimization is valid only while capacity remains exactly one-hot.">
      <label className="text-sm font-semibold text-primary">monotonic index = {index}<input className="mt-2 w-full accent-current" type="range" min="0" max="127" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="capacity" value={capacity.toString()} /><Stat label="mask" value={bits(capacity - 1)} /><Stat label="physical slot" value={slot.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD3BoundaryCertificateLab() {
  const [nonzero, setNonzero] = useState(true);
  const [overflow, setOverflow] = useState(false);
  const [interval, setInterval] = useState(true);
  const complete = nonzero && overflow && interval;
  return (
    <Figure caption="A power-of-two boundary routine is complete only after zero semantics, representability, and interval endpoint conventions are explicit.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={nonzero} onChange={(event) => setNonzero(event.target.checked)} />zero semantics</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={overflow} onChange={(event) => setOverflow(event.target.checked)} />overflow guard</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={interval} onChange={(event) => setInterval(event.target.checked)} />endpoint rule</label></div>
      <div className="mt-4"><Stat label="boundary certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
