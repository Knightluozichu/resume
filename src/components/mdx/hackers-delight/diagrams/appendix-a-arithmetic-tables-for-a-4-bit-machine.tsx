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
  return <div className={`min-w-0 border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

function wrap4(value: number) {
  return value & 0xf;
}

function signed4(word: number) {
  const value = wrap4(word);
  return (value & 0x8) !== 0 ? value - 16 : value;
}

function hex4(value: number) {
  return wrap4(value).toString(16).toUpperCase();
}

function AdditionGrid({ selectedX, selectedY }: { selectedX: number; selectedY: number }) {
  const cells = Array.from({ length: 256 }, (_, index) => {
    const x = Math.floor(index / 16);
    const y = index % 16;
    const signedOverflow = signed4(x) + signed4(y) < -8 || signed4(x) + signed4(y) > 7;
    return { x, y, value: x + y, signedOverflow };
  });
  return <div className="grid gap-px overflow-hidden border border-border bg-border" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>{cells.map((cell) => <div key={`${cell.x}-${cell.y}`} title={`${hex4(cell.x)}+${hex4(cell.y)}=${cell.value.toString(16).toUpperCase()}`} className={`aspect-square min-w-0 text-center font-mono text-[9px] leading-[1.4rem] sm:text-[10px] ${cell.x === selectedX && cell.y === selectedY ? "bg-accent text-background" : cell.signedOverflow ? "bg-danger/20 text-danger" : "bg-background text-secondary"}`}>{hex4(cell.value)}</div>)}</div>;
}

export function HDAppendixAWordDecodeLab() {
  const [word, setWord] = useState(0xd);
  return (
    <Figure caption="The same four bits denote an unsigned value from 0 to 15 or a two's-complement signed value from −8 to 7.">
      <label className="text-sm font-semibold text-primary">4-bit word = 0x{hex4(word)}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={word} onChange={(event) => setWord(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="bits" value={word.toString(2).padStart(4, "0")} /><Stat label="hex" value={`0x${hex4(word)}`} /><Stat label="unsigned" value={word.toString()} /><Stat label="signed" value={signed4(word).toString()} tone="success" /></div>
    </Figure>
  );
}

export function HDAppendixAAdditionTableLab() {
  const [x, setX] = useState(7);
  const [y, setY] = useState(1);
  const raw = x + y;
  const signedRaw = signed4(x) + signed4(y);
  const overflow = signedRaw < -8 || signedRaw > 7;
  return (
    <Figure caption="Table A-1 contains full hexadecimal sums; the machine stores the low nibble while the table separately marks signed overflow.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">row x = 0x{hex4(x)}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">column y = 0x{hex4(y)}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>
      <div className="mt-4"><AdditionGrid selectedX={x} selectedY={y} /></div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="table sum" value={`0x${raw.toString(16).toUpperCase()}`} /><Stat label="stored low 4" value={`0x${hex4(raw)}`} /><Stat label="carry" value={raw > 15 ? "1" : "0"} /><Stat label="signed overflow" value={overflow ? "yes" : "no"} tone={overflow ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function HDAppendixAAdditionFlagsLab() {
  const cases = [
    { label: "7 + 1", x: 7, y: 1 },
    { label: "F + 1", x: 15, y: 1 },
    { label: "8 + 8", x: 8, y: 8 },
    { label: "3 + 4", x: 3, y: 4 },
  ];
  const [selection, setSelection] = useState(0);
  const current = cases[selection];
  const raw = current.x + current.y;
  const signedRaw = signed4(current.x) + signed4(current.y);
  const overflow = signedRaw < -8 || signedRaw > 7;
  return (
    <Figure caption="Carry is unsigned overflow; signed overflow is a different predicate based on the operand signs and wrapped result sign.">
      <label className="text-sm font-semibold text-primary">case<select className="mt-2 block w-full border border-border bg-background p-2" value={selection} onChange={(event) => setSelection(Number(event.target.value))}>{cases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="unsigned exact" value={raw.toString()} /><Stat label="signed exact" value={signedRaw.toString()} /><Stat label="carry" value={raw > 15 ? "yes" : "no"} tone={raw > 15 ? "warning" : "accent"} /><Stat label="signed overflow" value={overflow ? "yes" : "no"} tone={overflow ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function HDAppendixASubtractionTableLab() {
  const [x, setX] = useState(3);
  const [y, setY] = useState(5);
  const raw = x - y;
  const signedRaw = signed4(x) - signed4(y);
  const overflow = signedRaw < -8 || signedRaw > 7;
  return (
    <Figure caption="Table A-2 is row minus column; a negative unsigned difference wraps modulo 16 and clears carry because carry means not-borrow.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">row x = 0x{hex4(x)}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">column y = 0x{hex4(y)}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5"><Stat label="exact row−column" value={raw.toString()} /><Stat label="stored word" value={`0x${hex4(raw)}`} /><Stat label="borrow" value={x < y ? "1" : "0"} /><Stat label="carry = not borrow" value={x >= y ? "1" : "0"} tone="success" /><Stat label="signed overflow" value={overflow ? "yes" : "no"} tone={overflow ? "danger" : "accent"} /></div>
    </Figure>
  );
}

export function HDAppendixANotBorrowLab() {
  const [x, setX] = useState(12);
  const [y, setY] = useState(5);
  return (
    <Figure caption="For x−y implemented as x plus the complement of y plus one, the final carry is one exactly when no unsigned borrow occurred.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {x}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {y}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="x + (~y & F) + 1" value={(x + ((~y) & 0xf) + 1).toString()} /><Stat label="low word" value={`0x${hex4(x - y)}`} /><Stat label="borrow" value={x < y ? "1" : "0"} /><Stat label="carry" value={x >= y ? "1" : "0"} tone="success" /></div>
    </Figure>
  );
}

export function HDAppendixAUnsignedMultiplicationLab() {
  const [x, setX] = useState(9);
  const [y, setY] = useState(3);
  const product = x * y;
  return (
    <Figure caption="Unsigned 4×4 multiplication always fits eight bits; a one-word result overflows exactly when the high nibble is nonzero.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = 0x{hex4(x)}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = 0x{hex4(y)}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="exact product" value={product.toString()} /><Stat label="8-bit hex" value={`0x${product.toString(16).toUpperCase().padStart(2, "0")}`} /><Stat label="high:low" value={`${hex4(product >> 4)}:${hex4(product)}`} /><Stat label="4-bit overflow" value={product > 15 ? "yes" : "no"} tone={product > 15 ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function HDAppendixASignedMultiplicationLab() {
  const [x, setX] = useState(0xd);
  const [y, setY] = useState(0x3);
  const left = signed4(x);
  const right = signed4(y);
  const product = left * right;
  const overflow = product < -8 || product > 7;
  return (
    <Figure caption="Signed multiplication interprets both nibbles as −8 through 7; overflow asks whether the exact product can be sign-extended from four bits.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x word 0x{hex4(x)} = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y word 0x{hex4(y)} = {right}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="signed exact" value={product.toString()} /><Stat label="stored low word" value={`0x${hex4(product)}`} /><Stat label="stored signed" value={signed4(product).toString()} /><Stat label="signed overflow" value={overflow ? "yes" : "no"} tone={overflow ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function HDAppendixAFullProductLab() {
  const [x, setX] = useState(0xe);
  const [y, setY] = useState(0xb);
  const unsignedProduct = x * y;
  const signedProduct = signed4(x) * signed4(y);
  const signedByte = signedProduct & 0xff;
  return (
    <Figure caption="The low half of a product is identical for signed and unsigned multiplication; interpretation changes the required high half.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = 0x{hex4(x)}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = 0x{hex4(y)}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="unsigned 8-bit" value={`0x${unsignedProduct.toString(16).toUpperCase().padStart(2, "0")}`} /><Stat label="signed 8-bit" value={`0x${signedByte.toString(16).toUpperCase().padStart(2, "0")}`} /><Stat label="unsigned low" value={hex4(unsignedProduct)} /><Stat label="signed low" value={hex4(signedProduct)} tone="success" /></div>
    </Figure>
  );
}

export function HDAppendixAOverflowPredicateLab() {
  const [operation, setOperation] = useState("add");
  const [x, setX] = useState(7);
  const [y, setY] = useState(1);
  const sx = signed4(x);
  const sy = signed4(y);
  const exact = operation === "add" ? sx + sy : operation === "subtract" ? sx - sy : sx * sy;
  const stored = signed4(exact);
  const overflow = exact < -8 || exact > 7;
  return (
    <Figure caption="All signed table markings reduce to one range contract: the mathematical result must remain between −8 and 7 before low-bit truncation.">
      <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">operation<select className="mt-2 block w-full border border-border bg-background p-2" value={operation} onChange={(event) => setOperation(event.target.value)}><option value="add">add</option><option value="subtract">subtract</option><option value="multiply">multiply</option></select></label><label className="text-sm font-semibold text-primary">x = {sx}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {sy}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="exact" value={exact.toString()} /><Stat label="stored signed" value={stored.toString()} /><Stat label="overflow" value={overflow ? "yes" : "no"} tone={overflow ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function HDAppendixATableCertificateLab() {
  const [allPairs, setAllPairs] = useState(true);
  const [flags, setFlags] = useState(false);
  const [signedUnsigned, setSignedUnsigned] = useState(true);
  const [fullProduct, setFullProduct] = useState(false);
  const complete = allPairs && flags && signedUnsigned && fullProduct;
  return (
    <Figure caption="A generated arithmetic table is trustworthy only when all 256 operand pairs, status flags, both interpretations, and full-width products are checked.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={allPairs} onChange={(event) => setAllPairs(event.target.checked)} />all pairs</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={flags} onChange={(event) => setFlags(event.target.checked)} />flags</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={signedUnsigned} onChange={(event) => setSignedUnsigned(event.target.checked)} />interpretations</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={fullProduct} onChange={(event) => setFullProduct(event.target.checked)} />full product</label></div>
      <div className="mt-4"><Stat label="table certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
