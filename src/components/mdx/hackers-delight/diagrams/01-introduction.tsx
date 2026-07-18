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

function widthMask(width: number) {
  return (1 << width) - 1;
}

function bits(value: number, width: number) {
  return (value & widthMask(width)).toString(2).padStart(width, "0");
}

function signedValue(value: number, width: number) {
  const masked = value & widthMask(width);
  const sign = 1 << (width - 1);
  return masked >= sign ? masked - (1 << width) : masked;
}

export function HD2WordWidthLab() {
  const [width, setWidth] = useState(8);
  const [value, setValue] = useState(173);
  const mask = widthMask(width);
  const normalized = value & mask;
  return (
    <Figure caption="A fixed-width word retains only its low w bits; the width determines the mask, value range, and every complement operation.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">word width w = {width}<input className="mt-2 w-full accent-current" type="range" min="4" max="12" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">source value = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="4095" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="width mask" value={`0x${mask.toString(16).toUpperCase()}`} /><Stat label="stored bits" value={bits(normalized, width)} tone="success" /><Stat label="stored unsigned" value={normalized.toString()} /></div>
    </Figure>
  );
}

export function HD2SignedUnsignedLab() {
  const [pattern, setPattern] = useState(0b11101010);
  const width = 8;
  return (
    <Figure caption="The same w-bit pattern has one unsigned value and one two's-complement signed value; operations may share bits but differ in comparisons and shifts.">
      <label className="text-sm font-semibold text-primary">8-bit pattern = {bits(pattern, width)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={pattern} onChange={(event) => setPattern(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="hex" value={`0x${pattern.toString(16).padStart(2, "0").toUpperCase()}`} /><Stat label="unsigned U" value={pattern.toString()} tone="success" /><Stat label="signed S" value={signedValue(pattern, width).toString()} tone={pattern >= 128 ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function HD2TwosComplementRangeLab() {
  const [width, setWidth] = useState(8);
  const minimum = -(2 ** (width - 1));
  const maximum = 2 ** (width - 1) - 1;
  return (
    <Figure caption="A w-bit two's-complement integer has one extra negative magnitude: its range is −2^(w−1) through 2^(w−1)−1.">
      <label className="text-sm font-semibold text-primary">signed width w = {width}<input className="mt-2 w-full accent-current" type="range" min="3" max="16" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="minimum" value={minimum.toString()} tone="warning" /><Stat label="maximum" value={maximum.toString()} tone="success" /><Stat label="distinct patterns" value={(2 ** width).toLocaleString()} /></div>
    </Figure>
  );
}

export function HD2HexNotationLab() {
  const [value, setValue] = useState(0x6d);
  return (
    <Figure caption="Hexadecimal groups four bits per digit, making masks and byte boundaries readable without changing the underlying word.">
      <label className="text-sm font-semibold text-primary">byte value = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="binary" value={bits(value, 8)} /><Stat label="hex" value={`0x${value.toString(16).padStart(2, "0").toUpperCase()}`} tone="success" /><Stat label="decimal" value={value.toString()} /></div>
    </Figure>
  );
}

export function HD2LogicalOperationsLab() {
  const [left, setLeft] = useState(0b10110100);
  const right = 0b00111100;
  const width = 8;
  return (
    <Figure caption="AND clears, OR sets, XOR toggles, and NOT complements bits independently; NOT must be restricted to the declared word width.">
      <label className="text-sm font-semibold text-primary">x = {bits(left, width)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="x AND m" value={bits(left & right, width)} /><Stat label="x OR m" value={bits(left | right, width)} /><Stat label="x XOR m" value={bits(left ^ right, width)} tone="success" /><Stat label="NOT x" value={bits(~left, width)} tone="warning" /></div>
    </Figure>
  );
}

export function HD2ShiftSemanticsLab() {
  const [value, setValue] = useState(0b10010110);
  const [amount, setAmount] = useState(2);
  const logical = value >>> amount;
  const signed = signedValue(value, 8);
  const arithmetic = (signed >> amount) & 0xff;
  return (
    <Figure caption="Logical right shift inserts zeros; arithmetic right shift replicates the sign bit. They agree only when the signed input is nonnegative.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">8-bit x = {bits(value, 8)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">shift n = {amount}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x unsigned" value={value.toString()} /><Stat label="logical x>>n" value={bits(logical, 8)} tone="success" /><Stat label="arithmetic x>>n" value={bits(arithmetic, 8)} tone={value >= 128 ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function HD2WraparoundLab() {
  const [left, setLeft] = useState(240);
  const [right, setRight] = useState(30);
  const exact = left + right;
  const wrapped = exact & 0xff;
  return (
    <Figure caption="Unsigned w-bit arithmetic wraps modulo 2^w; the mathematical integer result and stored word result must be distinguished.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {right}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="mathematical x+y" value={exact.toString()} /><Stat label="stored modulo 256" value={wrapped.toString()} tone="success" /><Stat label="carry out" value={exact > 255 ? "1" : "0"} tone={exact > 255 ? "warning" : "accent"} /></div>
    </Figure>
  );
}

export function HD2InstructionSetLab() {
  const [operation, setOperation] = useState<"logic" | "shift" | "add" | "branch">("logic");
  const details = {
    logic: ["AND/OR/XOR/NOT", "register operands", "1 model step"],
    shift: ["SHL/SHR/SAR/ROL", "word + amount", "1 model step"],
    add: ["ADD/SUB", "wrap + flags", "1 model step"],
    branch: ["compare + branch", "control flow", "data-dependent"],
  }[operation];
  return (
    <Figure caption="The book's basic RISC model counts a compact register instruction set, giving a stable comparison proxy rather than a promise about every processor.">
      <label className="text-sm font-semibold text-primary">instruction class<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="logic">logical</option><option value="shift">shift/rotate</option><option value="add">arithmetic</option><option value="branch">branch</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{details.map((value, index) => <Stat key={value} label={["examples", "semantics", "model cost"][index]} value={value} tone={index === 2 ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function HD2InstructionBudgetLab() {
  const [logic, setLogic] = useState(3);
  const [shifts, setShifts] = useState(2);
  const [branches, setBranches] = useState(0);
  const modelCount = logic + shifts + branches;
  return (
    <Figure caption="Instruction count is a first-order analytical budget; dependency depth, throughput, branches, and memory still determine real execution time.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">logic = {logic}<input className="mt-2 w-full accent-current" type="range" min="0" max="10" value={logic} onChange={(event) => setLogic(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">shifts = {shifts}<input className="mt-2 w-full accent-current" type="range" min="0" max="10" value={shifts} onChange={(event) => setShifts(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">branches = {branches}<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={branches} onChange={(event) => setBranches(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="basic-RISC count" value={modelCount.toString()} tone="success" /><Stat label="benchmark still needed" value={branches ? "yes, branch behavior matters" : "yes, dependencies matter"} /></div>
    </Figure>
  );
}

export function HD2BranchCostLab() {
  const [predictability, setPredictability] = useState(0.9);
  const branchInstructions = 3;
  const mispredictPenalty = 12;
  const expected = branchInstructions + (1 - predictability) * mispredictPenalty;
  return (
    <Figure caption="A branchless sequence can have more static instructions yet win on unpredictable data; expected cost depends on the target pipeline and workload.">
      <label className="text-sm font-semibold text-primary">branch prediction rate = {(predictability * 100).toFixed(0)}%<input className="mt-2 w-full accent-current" type="range" min="0" max="1" step="0.05" value={predictability} onChange={(event) => setPredictability(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="branch path base" value={branchInstructions.toString()} /><Stat label="expected model cycles" value={expected.toFixed(1)} tone="warning" /><Stat label="branchless candidate" value="5 instructions" tone={expected > 5 ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function HD2EndiannessLab() {
  const [order, setOrder] = useState<"little" | "big">("little");
  const bytes = order === "little" ? ["78", "56", "34", "12"] : ["12", "34", "56", "78"];
  return (
    <Figure caption="Endianness changes byte order in memory, not the abstract 32-bit word value or the meanings of bit positions within the word.">
      <div className="flex border border-border">{(["little", "big"] as const).map((item) => <button key={item} type="button" className={`flex-1 p-2 text-sm font-semibold ${order === item ? "bg-accent text-background" : "text-primary"}`} onClick={() => setOrder(item)}>{item}-endian</button>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="word value" value="0x12345678" tone="success" /><Stat label="memory bytes low→high" value={bytes.join(" ")} /></div>
    </Figure>
  );
}

export function HD2ExhaustiveTestLab() {
  const [width, setWidth] = useState(8);
  const inputs = 2 ** width;
  const binaryPairs = inputs ** 2;
  return (
    <Figure caption="Small widths make exhaustive validation practical: unary identities need 2^w cases and binary identities need 2^(2w) pairs.">
      <label className="text-sm font-semibold text-primary">test width w = {width}<input className="mt-2 w-full accent-current" type="range" min="3" max="12" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="unary cases" value={inputs.toLocaleString()} tone="success" /><Stat label="binary pairs" value={binaryPairs.toLocaleString()} /><Stat label="proof status" value="evidence, not all-width proof" tone="warning" /></div>
    </Figure>
  );
}

export function HD2PortabilityLab() {
  const [unsigned, setUnsigned] = useState(true);
  const [boundedShift, setBoundedShift] = useState(true);
  const [bitCast, setBitCast] = useState(false);
  const complete = unsigned && boundedShift && bitCast;
  return (
    <Figure caption="A portable bit-hack certificate fixes unsigned width, validates shift counts, and uses a defined bit-cast path instead of relying on signed overflow or aliasing.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={unsigned} onChange={(event) => setUnsigned(event.target.checked)} />unsigned width</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={boundedShift} onChange={(event) => setBoundedShift(event.target.checked)} />valid shifts</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={bitCast} onChange={(event) => setBitCast(event.target.checked)} />defined bit cast</label></div>
      <div className="mt-4"><Stat label="portability contract" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
