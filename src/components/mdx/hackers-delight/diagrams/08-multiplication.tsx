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

function signed8(value: number) {
  const normalized = value & 0xff;
  return normalized >= 128 ? normalized - 256 : normalized;
}

function nafTerms(value: number) {
  const terms: Array<{ exponent: number; digit: -1 | 1 }> = [];
  let remaining = value;
  let exponent = 0;
  while (remaining > 0) {
    if ((remaining & 1) !== 0) {
      const digit = (remaining & 3) === 1 ? 1 : -1;
      terms.push({ exponent, digit });
      remaining -= digit;
    }
    remaining /= 2;
    exponent += 1;
  }
  return terms;
}

export function HD8ShiftAddLab() {
  const [left, setLeft] = useState(13);
  const [right, setRight] = useState(11);
  const terms = Array.from({ length: 8 }, (__, bit) => ((right >>> bit) & 1) ? left * (2 ** bit) : 0).filter((term) => term !== 0);
  return (
    <Figure caption="Binary multiplication selects shifted copies of the multiplicand wherever the multiplier has a 1-bit, then sums those partial products.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="31" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {right}<input className="mt-2 w-full accent-current" type="range" min="0" max="31" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="multiplier bits" value={bits(right)} /><Stat label="partial products" value={terms.join(" + ") || "0"} /><Stat label="product" value={(left * right).toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD8PartialProductLab() {
  const [multiplier, setMultiplier] = useState(0b1011);
  const multiplicand = 0b1101;
  const rows = Array.from({ length: 4 }, (__, bit) => ((multiplier >>> bit) & 1) ? multiplicand << bit : 0);
  return (
    <Figure caption="Each multiplier bit gates one shifted row; column carries turn the bit-matrix sum into the exact product.">
      <label className="text-sm font-semibold text-primary">4-bit multiplier = {bits(multiplier, 4)}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={multiplier} onChange={(event) => setMultiplier(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{rows.map((row, index) => <Stat key={index} label={`row ${index}`} value={bits(row, 8)} tone={row ? "accent" : "warning"} />)}</div>
      <div className="mt-3"><Stat label="summed product" value={bits(multiplicand * multiplier, 8)} tone="success" /></div>
    </Figure>
  );
}

export function HD8MultiwordLab() {
  const [left, setLeft] = useState(0x9b37);
  const [right, setRight] = useState(0x6d25);
  const base = 256;
  const x0 = left & 0xff;
  const x1 = left >>> 8;
  const y0 = right & 0xff;
  const y1 = right >>> 8;
  const p00 = x0 * y0;
  const cross = x0 * y1 + x1 * y0;
  const p11 = x1 * y1;
  const product = left * right;
  return (
    <Figure caption="Splitting operands into base-256 digits yields low, cross, and high partial products weighted by B^0, B^1, and B^2.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {right}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="x0·y0" value={p00.toString()} /><Stat label="cross terms" value={cross.toString()} /><Stat label="x1·y1" value={p11.toString()} /><Stat label="32-bit product" value={product.toString()} tone="success" /></div>
      <div className="mt-3 text-center font-mono text-xs text-secondary">{p00} + {cross}·{base} + {p11}·{base}² = {product}</div>
    </Figure>
  );
}

export function HD8CarryColumnsLab() {
  const [leftLow, setLeftLow] = useState(240);
  const rightLow = 230;
  const leftHigh = 7;
  const rightHigh = 5;
  const p00 = leftLow * rightLow;
  const p01 = leftLow * rightHigh;
  const p10 = leftHigh * rightLow;
  const p11 = leftHigh * rightHigh;
  const middle = (p00 >>> 8) + (p01 & 0xff) + (p10 & 0xff);
  const high = p11 + (p01 >>> 8) + (p10 >>> 8) + (middle >>> 8);
  return (
    <Figure caption="Schoolbook multiword multiplication must add carries from the low product and both cross products into the next base-B column.">
      <label className="text-sm font-semibold text-primary">x low digit = {leftLow}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={leftLow} onChange={(event) => setLeftLow(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="p00 high carry" value={(p00 >>> 8).toString()} /><Stat label="middle column" value={middle.toString()} tone="warning" /><Stat label="middle carry" value={(middle >>> 8).toString()} /><Stat label="high column" value={high.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD8HighHalfLab() {
  const [left, setLeft] = useState(213);
  const [right, setRight] = useState(197);
  const product = left * right;
  const low = product & 0xff;
  const high = product >>> 8;
  return (
    <Figure caption="An 8×8 unsigned product is 16 bits: the low half is modulo 256 and the high half is floor(product/256).">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {right}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="full product" value={product.toString()} /><Stat label="16-bit pattern" value={bits(product, 16)} /><Stat label="high 8" value={bits(high)} tone="success" /><Stat label="low 8" value={bits(low)} /></div>
    </Figure>
  );
}

export function HD8HighWithoutFullLab() {
  const [left, setLeft] = useState(0x9b37);
  const right = 0x6d25;
  const x0 = left & 0xff;
  const x1 = left >>> 8;
  const y0 = right & 0xff;
  const y1 = right >>> 8;
  const p00 = x0 * y0;
  const p01 = x0 * y1;
  const p10 = x1 * y0;
  const p11 = x1 * y1;
  const middle = (p00 >>> 8) + (p01 & 0xff) + (p10 & 0xff);
  const computedHigh = (p11 + (p01 >>> 8) + (p10 >>> 8) + (middle >>> 8)) & 0xffff;
  const oracleHigh = Math.floor((left * right) / 65536) & 0xffff;
  return (
    <Figure caption="The high half can be assembled from half-width products and the middle-column carry without storing the full double-width product.">
      <label className="text-sm font-semibold text-primary">16-bit x = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="assembled high" value={computedHigh.toString()} tone="success" /><Stat label="full-product oracle" value={oracleHigh.toString()} /><Stat label="agree" value={computedHigh === oracleHigh ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD8SignedProductLab() {
  const [leftBits, setLeftBits] = useState(0xd3);
  const [rightBits, setRightBits] = useState(0x35);
  const left = signed8(leftBits);
  const right = signed8(rightBits);
  const product = left * right;
  const low = product & 0xff;
  const high = (product >> 8) & 0xff;
  return (
    <Figure caption="Signed and unsigned multiplication share the same low half, while the high half depends on sign extension and correction terms.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x bits = {bits(leftBits)} ({left})<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={leftBits} onChange={(event) => setLeftBits(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y bits = {bits(rightBits)} ({right})<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={rightBits} onChange={(event) => setRightBits(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="signed product" value={product.toString()} /><Stat label="high half" value={bits(high)} tone="success" /><Stat label="low half" value={bits(low)} /><Stat label="low unsigned identity" value={bits((leftBits * rightBits) & 0xff)} /></div>
    </Figure>
  );
}

export function HD8SignedCorrectionLab() {
  const [leftBits, setLeftBits] = useState(0xd3);
  const rightBits = 0xb5;
  const unsignedHigh = (leftBits * rightBits) >>> 8;
  const correctionX = leftBits >= 128 ? rightBits : 0;
  const correctionY = rightBits >= 128 ? leftBits : 0;
  const corrected = (unsignedHigh - correctionX - correctionY) & 0xff;
  const signedProduct = signed8(leftBits) * signed8(rightBits);
  const oracle = (signedProduct >> 8) & 0xff;
  return (
    <Figure caption="Signed high product equals unsigned high product minus the opposite unsigned operand for each negative sign bit, modulo one word.">
      <label className="text-sm font-semibold text-primary">x bits = {bits(leftBits)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={leftBits} onChange={(event) => setLeftBits(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="unsigned high" value={unsignedHigh.toString()} /><Stat label="x-sign correction" value={correctionX.toString()} /><Stat label="y-sign correction" value={correctionY.toString()} /><Stat label="signed high" value={`${corrected} / oracle ${oracle}`} tone={corrected === oracle ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function HD8ConstantBinaryLab() {
  const [constant, setConstant] = useState(45);
  const terms = Array.from({ length: 8 }, (__, exponent) => ((constant >>> exponent) & 1) ? `x·2^${exponent}` : null).filter(Boolean);
  return (
    <Figure caption="Binary constant multiplication uses one shifted x per set bit; an addition tree combines terms while dependency depth may differ from operation count.">
      <label className="text-sm font-semibold text-primary">constant c = {constant}<input className="mt-2 w-full accent-current" type="range" min="1" max="127" value={constant} onChange={(event) => setConstant(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="binary c" value={bits(constant)} /><Stat label="nonzero terms" value={terms.length.toString()} /><Stat label="expansion" value={terms.join(" + ")} tone="success" /></div>
    </Figure>
  );
}

export function HD8NafLab() {
  const [constant, setConstant] = useState(45);
  const terms = nafTerms(constant);
  const binaryTerms = popcountForSmall(constant);
  const expression = terms.slice().reverse().map((term) => `${term.digit > 0 ? "+" : "−"}2^${term.exponent}`).join(" ");
  return (
    <Figure caption="Non-adjacent signed digits allow −1 terms and eliminate adjacent nonzeros, often reducing shift-add/sub term count.">
      <label className="text-sm font-semibold text-primary">constant c = {constant}<input className="mt-2 w-full accent-current" type="range" min="1" max="127" value={constant} onChange={(event) => setConstant(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="binary 1 terms" value={binaryTerms.toString()} /><Stat label="signed terms" value={terms.length.toString()} tone={terms.length < binaryTerms ? "success" : "accent"} /><Stat label="NAF expansion" value={expression} /></div>
    </Figure>
  );
}

function popcountForSmall(value: number) {
  let x = value;
  let count = 0;
  while (x !== 0) {
    count += x & 1;
    x >>>= 1;
  }
  return count;
}

export function HD8ConstantShortcutLab() {
  const [constant, setConstant] = useState(15);
  const nextPower = 2 ** Math.ceil(Math.log2(constant));
  const subtractForm = nextPower - constant;
  return (
    <Figure caption="Constants near a power of two may use one large shift minus a small residual, such as 15x = 16x − x.">
      <label className="text-sm font-semibold text-primary">constant c = {constant}<input className="mt-2 w-full accent-current" type="range" min="3" max="63" value={constant} onChange={(event) => setConstant(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="next power" value={nextPower.toString()} /><Stat label="residual" value={subtractForm.toString()} /><Stat label="identity" value={`${constant}x = ${nextPower}x − ${subtractForm}x`} tone="success" /></div>
    </Figure>
  );
}

export function HD8OverflowLab() {
  const [left, setLeft] = useState(220);
  const [right, setRight] = useState(3);
  const product = left * right;
  const stored = product & 0xff;
  const overflow = product > 255;
  return (
    <Figure caption="Unsigned multiplication overflows a one-word result when the exact product exceeds the word maximum; the low half alone cannot reveal the lost high half.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {right}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="exact product" value={product.toString()} /><Stat label="stored low byte" value={stored.toString()} /><Stat label="overflow" value={overflow ? "yes" : "no"} tone={overflow ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function HD8WideningLab() {
  const [left, setLeft] = useState(60000);
  const right = 60000;
  const exact = left * right;
  const low32 = exact >>> 0;
  return (
    <Figure caption="Widening must happen before multiplication; widening an already wrapped narrow product cannot reconstruct the missing high bits.">
      <label className="text-sm font-semibold text-primary">16-bit x = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="65535" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="exact widened product" value={exact.toString()} tone="success" /><Stat label="low 32 bits" value={low32.toString()} /><Stat label="fits 16 bits" value={exact <= 65535 ? "yes" : "no"} tone={exact <= 65535 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD8MultiplicationCertificateLab() {
  const [width, setWidth] = useState(true);
  const [signedness, setSignedness] = useState(false);
  const [overflow, setOverflow] = useState(true);
  const complete = width && signedness && overflow;
  return (
    <Figure caption="A multiplication routine is complete when product width, signed interpretation, and overflow/result-half contract are explicit.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={width} onChange={(event) => setWidth(event.target.checked)} />product width</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={signedness} onChange={(event) => setSignedness(event.target.checked)} />signedness</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={overflow} onChange={(event) => setOverflow(event.target.checked)} />overflow contract</label></div>
      <div className="mt-4"><Stat label="multiplication certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
