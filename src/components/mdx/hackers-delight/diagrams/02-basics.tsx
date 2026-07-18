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

function byte(value: number) {
  return (value & 0xff).toString(2).padStart(8, "0");
}

function signed8(value: number) {
  const normalized = value & 0xff;
  return normalized >= 128 ? normalized - 256 : normalized;
}

export function HD2RightmostOneLab() {
  const [value, setValue] = useState(0b10110100);
  const cleared = value & (value - 1);
  const isolated = value & -value;
  const changedMask = value ^ (value - 1);
  return (
    <Figure caption="Subtracting one flips the rightmost 1 and every lower 0; combining x with x−1 can clear, isolate, or expose that suffix.">
      <label className="text-sm font-semibold text-primary">x = {byte(value)}<input className="mt-2 w-full accent-current" type="range" min="1" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x AND (x−1)" value={byte(cleared)} tone="success" /><Stat label="x AND −x" value={byte(isolated)} /><Stat label="x XOR (x−1)" value={byte(changedMask)} tone="warning" /></div>
    </Figure>
  );
}

export function HD2RightmostZeroLab() {
  const [value, setValue] = useState(0b10100111);
  const set = value | (value + 1);
  const isolated = ~value & (value + 1);
  const clearedSuffix = value & (value + 1);
  return (
    <Figure caption="Adding one flips the rightmost 0 and every lower 1; OR sets that zero, while NOT x AND (x+1) isolates it.">
      <label className="text-sm font-semibold text-primary">x = {byte(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="254" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x OR (x+1)" value={byte(set)} tone="success" /><Stat label="NOT x AND (x+1)" value={byte(isolated)} /><Stat label="x AND (x+1)" value={byte(clearedSuffix)} tone="warning" /></div>
    </Figure>
  );
}

export function HD2CarryPropagationLab() {
  const [left, setLeft] = useState(0b01101101);
  const [right, setRight] = useState(0b00110111);
  const xor = left ^ right;
  const carry = (left & right) << 1;
  const sum = (left + right) & 0xff;
  return (
    <Figure caption="XOR computes sum bits without carry and shifted AND computes the first carry layer; repeated carry propagation reaches ordinary addition.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {byte(left)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {byte(right)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x XOR y" value={byte(xor)} /><Stat label="carry << 1" value={byte(carry)} tone="warning" /><Stat label="x+y low byte" value={byte(sum)} tone="success" /></div>
    </Figure>
  );
}

export function HD2AbsoluteValueLab() {
  const [value, setValue] = useState(-37);
  const mask = value < 0 ? -1 : 0;
  const result = (value ^ mask) - mask;
  const minimum = value === -128;
  return (
    <Figure caption="XOR with a sign mask conditionally complements x and subtracting the mask completes two's-complement negation; the minimum signed value remains exceptional.">
      <label className="text-sm font-semibold text-primary">signed 8-bit x = {value}<input className="mt-2 w-full accent-current" type="range" min="-128" max="127" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="sign mask" value={byte(mask)} /><Stat label="mathematical |x|" value={Math.abs(value).toString()} tone={minimum ? "warning" : "success"} /><Stat label="8-bit representable" value={minimum ? "no" : result.toString()} tone={minimum ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function HD2AverageLab() {
  const [left, setLeft] = useState(220);
  const [right, setRight] = useState(180);
  const naive = left + right;
  const safeFloor = (left & right) + ((left ^ right) >>> 1);
  return (
    <Figure caption="For unsigned integers, shared 1-bits contribute directly and differing bits are halved, avoiding overflow in the intermediate x+y.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {right}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x+y mathematical" value={naive.toString()} tone={naive > 255 ? "warning" : "accent"} /><Stat label="floor average" value={Math.floor(naive / 2).toString()} /><Stat label="bitwise formula" value={safeFloor.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD2SignExtendLab() {
  const [fieldWidth, setFieldWidth] = useState(5);
  const [raw, setRaw] = useState(0b10110);
  const mask = (1 << fieldWidth) - 1;
  const value = raw & mask;
  const signBit = 1 << (fieldWidth - 1);
  const extended = (value ^ signBit) - signBit;
  return (
    <Figure caption="After masking a b-bit field, (x XOR signBit)−signBit maps its high bit to the full signed range without depending on a signed shift.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">field width b = {fieldWidth}<input className="mt-2 w-full accent-current" type="range" min="2" max="8" value={fieldWidth} onChange={(event) => setFieldWidth(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">raw value = {raw}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={raw} onChange={(event) => setRaw(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="masked field" value={value.toString(2).padStart(fieldWidth, "0")} /><Stat label="sign bit" value={signBit.toString()} /><Stat label="extended value" value={extended.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD2SignedShiftLab() {
  const [value, setValue] = useState(0b10010110);
  const [amount, setAmount] = useState(3);
  const unsigned = value >>> amount;
  const fill = value & 0x80 ? ((0xff << (8 - amount)) & 0xff) : 0;
  const emulated = unsigned | fill;
  return (
    <Figure caption="Arithmetic right shift can be emulated from logical shift by constructing a high-bit fill mask when the original sign bit is one.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {byte(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">n = {amount}<input className="mt-2 w-full accent-current" type="range" min="1" max="7" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="logical result" value={byte(unsigned)} /><Stat label="fill mask" value={byte(fill)} tone="warning" /><Stat label="signed result" value={byte(emulated)} tone="success" /></div>
    </Figure>
  );
}

export function HD2CompareLab() {
  const [left, setLeft] = useState(-12);
  const [right, setRight] = useState(7);
  const result = Number(left > right) - Number(left < right);
  return (
    <Figure caption="A three-valued compare can be assembled from Boolean predicates that produce 0 or 1, avoiding subtraction overflow.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {left}<input className="mt-2 w-full accent-current" type="range" min="-128" max="127" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {right}<input className="mt-2 w-full accent-current" type="range" min="-128" max="127" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x>y" value={Number(left > right).toString()} /><Stat label="x<y" value={Number(left < right).toString()} /><Stat label="compare result" value={result.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD2OverflowLab() {
  const [left, setLeft] = useState(100);
  const [right, setRight] = useState(60);
  const mathematical = left + right;
  const stored = signed8(mathematical);
  const overflow = (left >= 0 && right >= 0 && stored < 0) || (left < 0 && right < 0 && stored >= 0);
  const unsignedCarry = ((left & 0xff) + (right & 0xff)) > 255;
  return (
    <Figure caption="Signed addition overflows when equal-sign operands produce an opposite-sign result; unsigned addition reports carry when the mathematical sum exceeds the word.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">signed x = {left}<input className="mt-2 w-full accent-current" type="range" min="-128" max="127" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">signed y = {right}<input className="mt-2 w-full accent-current" type="range" min="-128" max="127" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="stored signed sum" value={stored.toString()} /><Stat label="signed overflow" value={overflow ? "yes" : "no"} tone={overflow ? "danger" : "success"} /><Stat label="unsigned carry" value={unsignedCarry ? "yes" : "no"} tone={unsignedCarry ? "warning" : "accent"} /></div>
    </Figure>
  );
}

export function HD2RotateLab() {
  const [value, setValue] = useState(0b10010110);
  const [amount, setAmount] = useState(3);
  const rotated = ((value << amount) | (value >>> (8 - amount))) & 0xff;
  return (
    <Figure caption="Rotate left combines two complementary shifts so bits leaving the high end reenter at the low end; no population is lost.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {byte(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">rotate n = {amount}<input className="mt-2 w-full accent-current" type="range" min="1" max="7" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left piece" value={byte(value << amount)} /><Stat label="wrapped piece" value={byte(value >>> (8 - amount))} /><Stat label="rotate result" value={byte(rotated)} tone="success" /></div>
    </Figure>
  );
}

export function HD2DoubleWordAddLab() {
  const [lowA, setLowA] = useState(250);
  const lowB = 20;
  const highA = 3;
  const highB = 4;
  const lowExact = lowA + lowB;
  const carry = lowExact > 255 ? 1 : 0;
  const high = (highA + highB + carry) & 0xff;
  return (
    <Figure caption="Double-word addition adds low halves first, turns unsigned wrap into a carry, then includes that carry in the high-half sum.">
      <label className="text-sm font-semibold text-primary">low half A = {lowA}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={lowA} onChange={(event) => setLowA(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="low result" value={(lowExact & 0xff).toString()} /><Stat label="carry" value={carry.toString()} tone={carry ? "warning" : "accent"} /><Stat label="high result" value={high.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD2DoubleWordShiftLab() {
  const [amount, setAmount] = useState(3);
  const high = 0b10110010;
  const low = 0b01101101;
  const shiftedHigh = ((high << amount) | (low >>> (8 - amount))) & 0xff;
  const shiftedLow = (low << amount) & 0xff;
  return (
    <Figure caption="A double-word left shift moves low-half high bits across the word boundary into the high half before discarding overflow.">
      <label className="text-sm font-semibold text-primary">shift amount = {amount}<input className="mt-2 w-full accent-current" type="range" min="1" max="7" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="input high:low" value={`${byte(high)}:${byte(low)}`} /><Stat label="output high" value={byte(shiftedHigh)} tone="success" /><Stat label="output low" value={byte(shiftedLow)} /></div>
    </Figure>
  );
}

export function HD2MinMaxLab() {
  const [left, setLeft] = useState(18);
  const [right, setRight] = useState(-7);
  const mask = left < right ? -1 : 0;
  const minimum = right ^ ((left ^ right) & mask);
  const maximum = left ^ ((left ^ right) & mask);
  return (
    <Figure caption="A comparison-derived all-zero/all-one mask selects between x and y; the predicate must be correct before branchless selection is useful.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {left}<input className="mt-2 w-full accent-current" type="range" min="-50" max="50" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {right}<input className="mt-2 w-full accent-current" type="range" min="-50" max="50" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="selection mask" value={mask === -1 ? "all ones" : "all zeros"} /><Stat label="min" value={minimum.toString()} tone="success" /><Stat label="max" value={maximum.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD2BooleanDecompositionLab() {
  const x = 0b10110100;
  const y = 0b01100110;
  const [selector, setSelector] = useState(0b11110000);
  const result = (selector & x) | (~selector & y);
  return (
    <Figure caption="Boolean decomposition uses a mask as a per-bit selector: mask bits choose x and complement-mask bits choose y.">
      <label className="text-sm font-semibold text-primary">selector m = {byte(selector)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={selector} onChange={(event) => setSelector(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="x" value={byte(x)} /><Stat label="y" value={byte(y)} /><Stat label="m" value={byte(selector)} /><Stat label="select(m,x,y)" value={byte(result)} tone="success" /></div>
    </Figure>
  );
}

export function HD2BooleanFunctionLab() {
  const [truth, setTruth] = useState(0b0110);
  const rows = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const outputs = rows.map((__, index) => (truth >>> index) & 1);
  return (
    <Figure caption="A binary Boolean function is fully specified by four output bits, so exactly 2⁴=16 functions exist, including constants, projections, XOR, AND, and OR.">
      <label className="text-sm font-semibold text-primary">truth-table code = {truth.toString(2).padStart(4, "0")}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={truth} onChange={(event) => setTruth(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{rows.map((row, index) => <Stat key={index} label={`${row[0]}${row[1]}`} value={outputs[index].toString()} tone={outputs[index] ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function HD2BasicsCertificateLab() {
  const [identity, setIdentity] = useState(true);
  const [boundaries, setBoundaries] = useState(false);
  const [target, setTarget] = useState(true);
  const complete = identity && boundaries && target;
  return (
    <Figure caption="A safe basic bit trick needs an algebraic identity, exhaustive boundary checks, and a target-specific instruction/benchmark audit.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={identity} onChange={(event) => setIdentity(event.target.checked)} />identity</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={boundaries} onChange={(event) => setBoundaries(event.target.checked)} />boundaries</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={target} onChange={(event) => setTarget(event.target.checked)} />target audit</label></div>
      <div className="mt-4"><Stat label="basics certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
