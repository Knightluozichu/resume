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

function maskFor(width: number) {
  return 2 ** width - 1;
}

function gray(value: number) {
  return value ^ (value >>> 1);
}

function grayToBinary(value: number) {
  let result = value;
  for (let shift = 1; shift < 32; shift *= 2) result ^= result >>> shift;
  return result >>> 0;
}

function bitString(value: number, width: number) {
  return (value & maskFor(width)).toString(2).padStart(width, "0");
}

function popcount(value: number) {
  let count = 0;
  let current = value >>> 0;
  while (current !== 0) {
    current &= current - 1;
    count += 1;
  }
  return count;
}

function hamming(left: number, right: number) {
  return popcount(left ^ right);
}

function normalizedRemainder(value: number, modulus: number) {
  return ((value % modulus) + modulus) % modulus;
}

function negabinaryBits(value: number) {
  let bits = 0;
  let position = 0;
  let current = value;
  while (current !== 0) {
    const digit = normalizedRemainder(current, 2);
    bits |= digit * 2 ** position;
    current = (current - digit) / -2;
    position += 1;
  }
  return bits;
}

function negabinaryRange(width: number) {
  return {
    minimum: -2 * (4 ** Math.floor(width / 2) - 1) / 3,
    maximum: (4 ** Math.ceil(width / 2) - 1) / 3,
  };
}

function negabinaryGray(value: number, width: number) {
  const bits = negabinaryBits(value);
  return (bits ^ (bits >>> 1)) & maskFor(width);
}

export function HD13ReflectedSequenceLab() {
  const [width, setWidth] = useState(4);
  const sequence = Array.from({ length: 2 ** width }, (_, value) => gray(value));
  return (
    <Figure caption="The reflected binary Gray sequence visits every fixed-width bit pattern once, and every adjacent pair—including the wrap—differs in one bit.">
      <label className="text-sm font-semibold text-primary">width = {width}<input className="mt-2 w-full accent-current" type="range" min="2" max="6" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{sequence.map((value, index) => <span key={index} className="border border-border px-2 py-1 font-mono text-sm text-primary">{bitString(value, width)}</span>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="patterns visited" value={sequence.length.toString()} /><Stat label="unique patterns" value={new Set(sequence).size.toString()} tone="success" /><Stat label="wrap distance" value={hamming(sequence.at(-1) ?? 0, sequence[0]).toString()} /></div>
    </Figure>
  );
}

export function HD13EncodeLab() {
  const [value, setValue] = useState(11);
  const encoded = gray(value);
  return (
    <Figure caption="Gray encoding XORs ordinary binary with a one-bit right shift, making each Gray bit the boundary difference between adjacent binary bits.">
      <label className="text-sm font-semibold text-primary">integer n = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="31" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="binary b" value={bitString(value, 6)} /><Stat label="b shifted right" value={bitString(value >>> 1, 6)} /><Stat label="Gray g" value={bitString(encoded, 6)} tone="success" /><Stat label="decimal g word" value={encoded.toString()} /></div>
    </Figure>
  );
}

export function HD13DecodeLab() {
  const [encoded, setEncoded] = useState(14);
  const stages: number[] = [encoded];
  let value = encoded;
  for (let shift = 1; shift < 6; shift += 1) {
    value ^= encoded >>> shift;
    stages.push(value);
  }
  const decoded = grayToBinary(encoded) & 0x3f;
  return (
    <Figure caption="Gray decoding is a prefix XOR scan from the most significant side; each binary bit is the XOR of its Gray bit and all higher Gray bits.">
      <label className="text-sm font-semibold text-primary">6-bit Gray word = {bitString(encoded, 6)}<input className="mt-2 w-full accent-current" type="range" min="0" max="63" value={encoded} onChange={(event) => setEncoded(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="prefix-XOR stages" value={stages.map((stage) => bitString(stage, 6)).join(" → ")} /><Stat label="binary result" value={bitString(decoded, 6)} tone="success" /><Stat label="round-trip" value={gray(decoded) === encoded ? "pass" : "fail"} tone={gray(decoded) === encoded ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function HD13HammingTransitionLab() {
  const [value, setValue] = useState(7);
  const next = value + 1;
  const binaryDistance = hamming(value, next);
  const grayDistance = hamming(gray(value), gray(next));
  return (
    <Figure caption="Binary carry can flip many bits at once, while consecutive reflected Gray words always have Hamming distance one.">
      <label className="text-sm font-semibold text-primary">transition n → n+1: {value} → {next}<input className="mt-2 w-full accent-current" type="range" min="0" max="30" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="binary transition" value={`${bitString(value, 5)} → ${bitString(next, 5)}`} /><Stat label="binary distance" value={binaryDistance.toString()} tone={binaryDistance === 1 ? "success" : "warning"} /><Stat label="Gray transition" value={`${bitString(gray(value), 5)} → ${bitString(gray(next), 5)}`} /><Stat label="Gray distance" value={grayDistance.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD13ReflectionLab() {
  const [width, setWidth] = useState(4);
  const lower = Array.from({ length: 2 ** (width - 1) }, (_, value) => bitString(gray(value), width - 1));
  const upper = [...lower].reverse();
  return (
    <Figure caption="To build n-bit reflected Gray code, prefix 0 to the previous list and prefix 1 to its reversal; the middle boundary changes only the new bit.">
      <label className="text-sm font-semibold text-primary">construct width = {width}<input className="mt-2 w-full accent-current" type="range" min="2" max="5" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label>
      <div className="mt-4 grid gap-3 sm:grid-cols-2"><div><div className="mb-2 text-xs text-secondary">forward half</div><div className="flex flex-wrap gap-2">{lower.map((bits, index) => <span key={index} className="border border-border px-2 py-1 font-mono text-sm">0{bits}</span>)}</div></div><div><div className="mb-2 text-xs text-secondary">reflected half</div><div className="flex flex-wrap gap-2">{upper.map((bits, index) => <span key={index} className="border border-border px-2 py-1 font-mono text-sm">1{bits}</span>)}</div></div></div>
      <div className="mt-4"><Stat label="middle Hamming distance" value="1" tone="success" /></div>
    </Figure>
  );
}

export function HD13DirectIncrementLab() {
  const [value, setValue] = useState(11);
  const current = gray(value);
  const next = gray(value + 1);
  const parity = popcount(current) & 1;
  const rightmost = current & -current;
  const ruleMask = parity === 0 ? 1 : rightmost << 1;
  return (
    <Figure caption="A Gray word can be incremented directly: even parity flips bit 0; odd parity flips the bit left of its rightmost set bit.">
      <label className="text-sm font-semibold text-primary">binary index = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="30" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="current Gray" value={bitString(current, 6)} /><Stat label="parity" value={parity === 0 ? "even" : "odd"} /><Stat label="rule flip mask" value={bitString(ruleMask, 6)} /><Stat label="next Gray" value={bitString(next, 6)} tone={(current ^ ruleMask) === next ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function HD13IncrementBoundaryLab() {
  const [width, setWidth] = useState(4);
  const [offset, setOffset] = useState(15);
  const modulus = 2 ** width;
  const value = offset % modulus;
  const nextIndex = (value + 1) % modulus;
  const current = gray(value);
  const next = gray(nextIndex);
  return (
    <Figure caption="At the final fixed-width Gray word, non-wrapping increment needs a wider bit; cyclic increment instead flips the top bit and returns to zero.">
      <label className="text-sm font-semibold text-primary">width = {width}<input className="mt-2 w-full accent-current" type="range" min="2" max="6" value={width} onChange={(event) => { const nextWidth = Number(event.target.value); setWidth(nextWidth); setOffset((old) => old % (2 ** nextWidth)); }} /></label>
      <label className="mt-4 block text-sm font-semibold text-primary">index = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max={modulus - 1} value={value} onChange={(event) => setOffset(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="current" value={bitString(current, width)} /><Stat label="next index" value={nextIndex.toString()} /><Stat label="cyclic next" value={bitString(next, width)} tone="success" /><Stat label="distance" value={hamming(current, next).toString()} /></div>
    </Figure>
  );
}

export function HD13NegabinaryGrayLab() {
  const [width, setWidth] = useState(4);
  const [offset, setOffset] = useState(0);
  const range = negabinaryRange(width);
  const count = 2 ** width;
  const safeOffset = offset % count;
  const value = range.minimum + safeOffset;
  const baseBits = negabinaryBits(value) & maskFor(width);
  const encoded = negabinaryGray(value, width);
  return (
    <Figure caption="Negabinary Gray code orders integers across the fixed-width base −2 range, then applies the same shift-XOR transform to each negabinary word.">
      <label className="text-sm font-semibold text-primary">width = {width}<input className="mt-2 w-full accent-current" type="range" min="2" max="7" value={width} onChange={(event) => { const nextWidth = Number(event.target.value); setWidth(nextWidth); setOffset((old) => old % (2 ** nextWidth)); }} /></label>
      <label className="mt-4 block text-sm font-semibold text-primary">sorted-range offset = {safeOffset}<input className="mt-2 w-full accent-current" type="range" min="0" max={count - 1} value={safeOffset} onChange={(event) => setOffset(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="integer" value={value.toString()} /><Stat label="base −2 word" value={bitString(baseBits, width)} /><Stat label="negabinary Gray" value={bitString(encoded, width)} tone="success" /><Stat label="numeric range" value={`${range.minimum}…${range.maximum}`} /></div>
    </Figure>
  );
}

export function HD13NegabinaryCycleLab() {
  const [width, setWidth] = useState(4);
  const range = negabinaryRange(width);
  const sequence = Array.from({ length: 2 ** width }, (_, index) => negabinaryGray(range.minimum + index, width));
  const distances = sequence.map((value, index) => hamming(value, sequence[(index + 1) % sequence.length]));
  return (
    <Figure caption="Across the entire fixed-width negabinary numeric range—including the last-to-first wrap—the transformed sequence is a cyclic one-bit code.">
      <label className="text-sm font-semibold text-primary">width = {width}<input className="mt-2 w-full accent-current" type="range" min="2" max="6" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{sequence.map((value, index) => <span key={index} className="border border-border px-2 py-1 font-mono text-sm">{bitString(value, width)}</span>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="integer range" value={`${range.minimum}…${range.maximum}`} /><Stat label="all distances" value={distances.every((distance) => distance === 1) ? "one" : "violation"} tone={distances.every((distance) => distance === 1) ? "success" : "danger"} /><Stat label="cyclic" value={distances.at(-1) === 1 ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD13EncoderAmbiguityLab() {
  const [value, setValue] = useState(7);
  const next = value + 1;
  const binaryChanges = hamming(value, next);
  const grayChanges = hamming(gray(value), gray(next));
  return (
    <Figure caption="During an asynchronous physical transition, k changing binary tracks can expose many transient combinations; a one-step Gray transition changes only one track.">
      <label className="text-sm font-semibold text-primary">position transition = {value} → {next}<input className="mt-2 w-full accent-current" type="range" min="0" max="30" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="binary tracks changing" value={binaryChanges.toString()} tone={binaryChanges > 1 ? "warning" : "accent"} /><Stat label="possible bit combinations" value={(2 ** binaryChanges).toString()} /><Stat label="Gray tracks changing" value={grayChanges.toString()} tone="success" /><Stat label="Gray endpoints" value="2" /></div>
    </Figure>
  );
}

export function HD13KarnaughAdjacencyLab() {
  const labels = ["00", "01", "11", "10"];
  const [column, setColumn] = useState(0);
  const next = (column + 1) % labels.length;
  return (
    <Figure caption="Gray ordering labels Karnaugh-map axes so neighboring cells, including edge wrap, differ in exactly one Boolean variable.">
      <label className="text-sm font-semibold text-primary">axis cell = {column}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={column} onChange={(event) => setColumn(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{labels.map((label, index) => <div key={label} className={`border p-4 text-center font-mono ${index === column || index === next ? "border-accent text-accent" : "border-border text-secondary"}`}>{label}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="adjacent labels" value={`${labels[column]} ↔ ${labels[next]}`} /><Stat label="Hamming distance" value={hamming(Number.parseInt(labels[column], 2), Number.parseInt(labels[next], 2)).toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD13ApplicationContractLab() {
  const [unitStep, setUnitStep] = useState(true);
  const [synchronizers, setSynchronizers] = useState(false);
  const [skewBound, setSkewBound] = useState(false);
  const complete = unitStep && synchronizers && skewBound;
  return (
    <Figure caption="Gray coding reduces multi-bit transition ambiguity; clock-domain crossing still needs unit-step assumptions, synchronizers, and inter-bit skew constraints.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={unitStep} onChange={(event) => setUnitStep(event.target.checked)} />unit-step updates</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={synchronizers} onChange={(event) => setSynchronizers(event.target.checked)} />bit synchronizers</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={skewBound} onChange={(event) => setSkewBound(event.target.checked)} />skew constraint</label></div>
      <div className="mt-4"><Stat label="CDC contract" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD13GrayCertificateLab() {
  const [bijective, setBijective] = useState(true);
  const [adjacent, setAdjacent] = useState(true);
  const [wrap, setWrap] = useState(false);
  const complete = bijective && adjacent && wrap;
  return (
    <Figure caption="A fixed-width Gray implementation is certified by full coverage, uniqueness, one-bit adjacency, and—when promised—one-bit cyclic wrap.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={bijective} onChange={(event) => setBijective(event.target.checked)} />bijective coverage</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={adjacent} onChange={(event) => setAdjacent(event.target.checked)} />adjacent distance one</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={wrap} onChange={(event) => setWrap(event.target.checked)} />cyclic wrap</label></div>
      <div className="mt-4"><Stat label="Gray certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
