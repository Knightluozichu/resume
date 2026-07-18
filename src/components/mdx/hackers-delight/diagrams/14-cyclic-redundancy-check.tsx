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

function degree(value: number) {
  return value === 0 ? -1 : Math.floor(Math.log2(value));
}

function polynomialRemainder(dividend: number, generator: number) {
  let remainder = dividend;
  const generatorDegree = degree(generator);
  while (degree(remainder) >= generatorDegree) {
    remainder ^= generator << (degree(remainder) - generatorDegree);
  }
  return remainder;
}

function bits(value: number, width: number) {
  return value.toString(2).padStart(width, "0");
}

function crc8(bytes: number[], initial = 0) {
  let crc = initial & 0xff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x80) !== 0 ? ((crc << 1) ^ 0x07) & 0xff : (crc << 1) & 0xff;
    }
  }
  return crc;
}

function crc32Update(state: number, bytes: number[]) {
  let crc = state >>> 0;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      const mask = -(crc & 1);
      crc = ((crc >>> 1) ^ (0xedb88320 & mask)) >>> 0;
    }
  }
  return crc;
}

function crc32(bytes: number[]) {
  return (~crc32Update(0xffffffff, bytes)) >>> 0;
}

function bytesOf(text: string) {
  return Array.from(text, (character) => character.charCodeAt(0) & 0xff);
}

function hex(value: number, width: number) {
  return value.toString(16).toUpperCase().padStart(width, "0");
}

function reverse32(value: number) {
  let input = value >>> 0;
  let output = 0;
  for (let bit = 0; bit < 32; bit += 1) {
    output = ((output << 1) | (input & 1)) >>> 0;
    input >>>= 1;
  }
  return output >>> 0;
}

function crc32TableEntry(index: number) {
  let crc = index;
  for (let bit = 0; bit < 8; bit += 1) {
    const mask = -(crc & 1);
    crc = ((crc >>> 1) ^ (0xedb88320 & mask)) >>> 0;
  }
  return crc;
}

export function HD14PolynomialDivisionLab() {
  const [message, setMessage] = useState(0b10110101);
  const generator = 0b10011;
  const augmented = message << 4;
  const remainder = polynomialRemainder(augmented, generator);
  const codeword = augmented ^ remainder;
  return (
    <Figure caption="A CRC appends r zero coefficients, divides the augmented message by a degree-r generator over GF(2), and inserts the remainder.">
      <label className="text-sm font-semibold text-primary">8-bit message = {bits(message, 8)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={message} onChange={(event) => setMessage(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="generator" value="10011" /><Stat label="augmented" value={bits(augmented, 12)} /><Stat label="remainder" value={bits(remainder, 4)} tone="success" /><Stat label="codeword" value={bits(codeword, 12)} /></div>
    </Figure>
  );
}

export function HD14XorArithmeticLab() {
  const [left, setLeft] = useState(0b101101);
  const [right, setRight] = useState(0b011011);
  return (
    <Figure caption="Polynomial coefficients live in GF(2): addition and subtraction are both XOR, with no carries or borrows.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">A = {bits(left, 6)}<input className="mt-2 w-full accent-current" type="range" min="0" max="63" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">B = {bits(right, 6)}<input className="mt-2 w-full accent-current" type="range" min="0" max="63" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="A + B" value={bits(left ^ right, 6)} tone="success" /><Stat label="A − B" value={bits(left ^ right, 6)} /><Stat label="carry count" value="0" /></div>
    </Figure>
  );
}

export function HD14CodewordSyndromeLab() {
  const [message, setMessage] = useState(0b10110101);
  const [errorBit, setErrorBit] = useState(3);
  const generator = 0b10011;
  const remainder = polynomialRemainder(message << 4, generator);
  const codeword = (message << 4) ^ remainder;
  const received = codeword ^ (1 << errorBit);
  const syndrome = polynomialRemainder(received, generator);
  return (
    <Figure caption="A valid augmented codeword is divisible by the generator; a nonzero received remainder is the error syndrome.">
      <label className="text-sm font-semibold text-primary">message = {bits(message, 8)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={message} onChange={(event) => setMessage(Number(event.target.value))} /></label>
      <label className="mt-4 block text-sm font-semibold text-primary">flip codeword bit = {errorBit}<input className="mt-2 w-full accent-current" type="range" min="0" max="11" value={errorBit} onChange={(event) => setErrorBit(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="valid syndrome" value={bits(polynomialRemainder(codeword, generator), 4)} /><Stat label="received" value={bits(received, 12)} /><Stat label="error syndrome" value={bits(syndrome, 4)} tone={syndrome === 0 ? "danger" : "success"} /><Stat label="detected" value={syndrome === 0 ? "no" : "yes"} /></div>
    </Figure>
  );
}

export function HD14BurstGuaranteeLab() {
  const [burstLength, setBurstLength] = useState(4);
  const degreeValue = 4;
  return (
    <Figure caption="A degree-r CRC generator with nonzero end coefficients detects every nonzero burst whose span is at most r bits.">
      <label className="text-sm font-semibold text-primary">burst span = {burstLength}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={burstLength} onChange={(event) => setBurstLength(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="generator degree r" value={degreeValue.toString()} /><Stat label="guaranteed region" value={`1…${degreeValue}`} /><Stat label="all such bursts detected" value={burstLength <= degreeValue ? "guaranteed" : "not guaranteed"} tone={burstLength <= degreeValue ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD14LinearityLab() {
  const [message, setMessage] = useState(0b10101100);
  const [error, setError] = useState(0b00010110);
  const generator = 0b10011;
  const remMessage = polynomialRemainder(message << 4, generator);
  const remError = polynomialRemainder(error << 4, generator);
  const remCombined = polynomialRemainder((message ^ error) << 4, generator);
  return (
    <Figure caption="With zero initialization and no final affine masks, polynomial remainder is linear: CRC(M XOR E) equals CRC(M) XOR CRC(E).">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">message = {bits(message, 8)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={message} onChange={(event) => setMessage(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">error = {bits(error, 8)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={error} onChange={(event) => setError(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="CRC(M XOR E)" value={bits(remCombined, 4)} /><Stat label="CRC(M) XOR CRC(E)" value={bits(remMessage ^ remError, 4)} /><Stat label="identity" value={remCombined === (remMessage ^ remError) ? "pass" : "fail"} tone={remCombined === (remMessage ^ remError) ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function HD14ParameterModelLab() {
  const [reflected, setReflected] = useState(true);
  const [nonzeroInit, setNonzeroInit] = useState(true);
  const [finalXor, setFinalXor] = useState(true);
  const complete = reflected && nonzeroInit && finalXor;
  return (
    <Figure caption="A CRC name is not a complete specification; width, polynomial, init, input/output reflection, xorout, check, and residue identify the model.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={reflected} onChange={(event) => setReflected(event.target.checked)} />RefIn / RefOut</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={nonzeroInit} onChange={(event) => setNonzeroInit(event.target.checked)} />Init FFFFFFFF</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={finalXor} onChange={(event) => setFinalXor(event.target.checked)} />XorOut FFFFFFFF</label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="width / poly" value="32 / 04C11DB7" /><Stat label="selected model" value={complete ? "CRC-32/ISO-HDLC" : "different variant"} tone={complete ? "success" : "warning"} /><Stat label="check 123456789" value={complete ? "CBF43926" : "must recompute"} /></div>
    </Figure>
  );
}

export function HD14BitwiseRegisterLab() {
  const [byte, setByte] = useState(0x41);
  const states: number[] = [];
  let crc = byte;
  states.push(crc);
  for (let bit = 0; bit < 8; bit += 1) {
    crc = (crc & 0x80) !== 0 ? ((crc << 1) ^ 0x07) & 0xff : (crc << 1) & 0xff;
    states.push(crc);
  }
  return (
    <Figure caption="A bitwise CRC register shifts once per input bit and XORs the truncated generator exactly when the outgoing top coefficient is one.">
      <label className="text-sm font-semibold text-primary">input byte = 0x{hex(byte, 2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={byte} onChange={(event) => setByte(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="CRC-8 polynomial" value="0x07" /><Stat label="register trace" value={states.map((state) => hex(state, 2)).join(" → ")} /><Stat label="final register" value={`0x${hex(crc, 2)}`} tone="success" /></div>
    </Figure>
  );
}

export function HD14ReflectionLab() {
  const normal = 0x04c11db7;
  const reflected = reverse32(normal);
  return (
    <Figure caption="Left-shifting MSB-first and right-shifting LSB-first implementations describe the same CRC orientation with bit-reversed truncated polynomial constants.">
      <div className="grid grid-cols-3 gap-2"><Stat label="normal polynomial" value={`0x${hex(normal, 8)}`} /><Stat label="bit reversal" value="32 bits" /><Stat label="reflected polynomial" value={`0x${hex(reflected, 8)}`} tone="success" /></div>
    </Figure>
  );
}

export function HD14LookupTableLab() {
  const [index, setIndex] = useState(0x41);
  const entry = crc32TableEntry(index);
  return (
    <Figure caption="A 256-entry table precomputes the effect of one reflected input byte, replacing eight conditional polynomial steps with one lookup.">
      <label className="text-sm font-semibold text-primary">table index = 0x{hex(index, 2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="index" value={`0x${hex(index, 2)}`} /><Stat label="table[index]" value={`0x${hex(entry, 8)}`} tone="success" /><Stat label="table bytes" value="1024" /></div>
    </Figure>
  );
}

export function HD14StreamingLab() {
  const [split, setSplit] = useState(4);
  const data = bytesOf("123456789");
  const first = data.slice(0, split);
  const second = data.slice(split);
  const state = crc32Update(0xffffffff, first);
  const streamed = (~crc32Update(state, second)) >>> 0;
  const oneShot = crc32(data);
  return (
    <Figure caption="CRC state composes across chunks: carrying the unfinalized register across boundaries produces the same checksum as one-shot processing.">
      <label className="text-sm font-semibold text-primary">split after byte = {split}<input className="mt-2 w-full accent-current" type="range" min="0" max="9" value={split} onChange={(event) => setSplit(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="chunk A" value={`"${String.fromCharCode(...first)}"`} /><Stat label="chunk B" value={`"${String.fromCharCode(...second)}"`} /><Stat label="streamed" value={hex(streamed, 8)} /><Stat label="one-shot" value={hex(oneShot, 8)} tone={streamed === oneShot ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function HD14CheckVectorLab() {
  const [message, setMessage] = useState("123456789");
  const checksum = crc32(bytesOf(message));
  const checksum8 = crc8(bytesOf(message));
  return (
    <Figure caption="The standard ASCII check string 123456789 distinguishes CRC parameter sets; CRC-32/ISO-HDLC must return CBF43926.">
      <label className="text-sm font-semibold text-primary">check message<select className="mt-2 block w-full border border-border bg-background p-2" value={message} onChange={(event) => setMessage(event.target.value)}><option value="123456789">123456789</option><option value="hello">hello</option><option value="Gray">Gray</option><option value="">empty</option></select></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="message bytes" value={bytesOf(message).map((byte) => hex(byte, 2)).join(" ") || "none"} /><Stat label="CRC-8/SMBUS" value={hex(checksum8, 2)} /><Stat label="CRC-32" value={hex(checksum, 8)} tone="success" /><Stat label="canonical checks" value={message === "123456789" && checksum8 === 0xf4 && checksum === 0xcbf43926 ? "pass" : "not selected"} /></div>
    </Figure>
  );
}

export function HD14CRCVsCorrectionLab() {
  const [detected, setDetected] = useState(true);
  const [locationKnown, setLocationKnown] = useState(false);
  const [retransmission, setRetransmission] = useState(true);
  const actionable = detected && (locationKnown || retransmission);
  return (
    <Figure caption="A CRC syndrome normally detects corruption but does not identify the error location; recovery needs retransmission or a separate correction code.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={detected} onChange={(event) => setDetected(event.target.checked)} />nonzero syndrome</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={locationKnown} onChange={(event) => setLocationKnown(event.target.checked)} />location known</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={retransmission} onChange={(event) => setRetransmission(event.target.checked)} />retransmission available</label></div>
      <div className="mt-4"><Stat label="recovery path" value={actionable ? "actionable" : "detection only"} tone={actionable ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD14CRCCertificateLab() {
  const [parameters, setParameters] = useState(true);
  const [checkVector, setCheckVector] = useState(true);
  const [crossImplementation, setCrossImplementation] = useState(false);
  const complete = parameters && checkVector && crossImplementation;
  return (
    <Figure caption="A CRC implementation is ready when its complete parameter tuple, canonical check/residue vectors, and bitwise-versus-table cross-check all agree.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={parameters} onChange={(event) => setParameters(event.target.checked)} />parameter tuple</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={checkVector} onChange={(event) => setCheckVector(event.target.checked)} />check and residue</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={crossImplementation} onChange={(event) => setCrossImplementation(event.target.checked)} />bitwise/table match</label></div>
      <div className="mt-4"><Stat label="CRC certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
