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

function normalizedRemainder(value: number, modulus: number) {
  return ((value % modulus) + modulus) % modulus;
}

function encodeNegativeBase(value: number, radix: number) {
  if (value === 0) return [0];
  const digits: number[] = [];
  let current = value;
  while (current !== 0) {
    const digit = normalizedRemainder(current, radix);
    digits.push(digit);
    current = (current - digit) / -radix;
  }
  return digits.reverse();
}

function negabinaryTrace(value: number) {
  const rows: Array<{ current: number; digit: number; next: number }> = [];
  let current = value;
  if (current === 0) return [{ current: 0, digit: 0, next: 0 }];
  while (current !== 0) {
    const digit = normalizedRemainder(current, 2);
    const next = (current - digit) / -2;
    rows.push({ current, digit, next });
    current = next;
  }
  return rows;
}

function formatDigits(digits: number[]) {
  return digits.map((digit) => digit.toString(16).toUpperCase()).join("");
}

type Gaussian = { re: number; im: number };

function gaussianDigit(value: Gaussian) {
  return normalizedRemainder(value.re + value.im, 2);
}

function divideGaussian(value: Gaussian, digit: number): Gaussian {
  return {
    re: (-value.re + digit + value.im) / 2,
    im: (-value.re + digit - value.im) / 2,
  };
}

function encodeGaussian(value: Gaussian) {
  if (value.re === 0 && value.im === 0) return [0];
  const digits: number[] = [];
  let current = value;
  for (let step = 0; step < 64 && (current.re !== 0 || current.im !== 0); step += 1) {
    const digit = gaussianDigit(current);
    digits.push(digit);
    current = divideGaussian(current, digit);
  }
  return digits.reverse();
}

function multiplyBeta(value: Gaussian): Gaussian {
  return { re: -value.re - value.im, im: value.re - value.im };
}

function addGaussian(left: Gaussian, right: Gaussian): Gaussian {
  return { re: left.re + right.re, im: left.im + right.im };
}

function formatGaussian(value: Gaussian) {
  if (value.im === 0) return value.re.toString();
  if (value.re === 0) return `${value.im}i`;
  return `${value.re}${value.im >= 0 ? "+" : ""}${value.im}i`;
}

function gaussianPath(digits: number[]) {
  const path: Gaussian[] = [{ re: 0, im: 0 }];
  let value = { re: 0, im: 0 };
  for (const digit of digits) {
    value = addGaussian(multiplyBeta(value), { re: digit, im: 0 });
    path.push(value);
  }
  return path;
}

function encodeBalancedTernary(value: number) {
  if (value === 0) return [0];
  const digits: number[] = [];
  let current = value;
  while (current !== 0) {
    let digit = normalizedRemainder(current, 3);
    if (digit === 2) digit = -1;
    digits.push(digit);
    current = (current - digit) / 3;
  }
  return digits.reverse();
}

function formatBalanced(digits: number[]) {
  return digits.map((digit) => digit === -1 ? "T" : digit.toString()).join("");
}

export function HD12NegabinaryWeightsLab() {
  const [value, setValue] = useState(-13);
  const digits = encodeNegativeBase(value, 2);
  const terms = digits.map((digit, index) => {
    const power = digits.length - 1 - index;
    return digit === 0 ? null : `${digit}·(${-2})^${power}`;
  }).filter(Boolean);
  return (
    <Figure caption="Negabinary uses alternating place weights 1, −2, 4, −8, ... so one unsigned-looking digit string covers positive and negative integers.">
      <label className="text-sm font-semibold text-primary">integer n = {value}<input className="mt-2 w-full accent-current" type="range" min="-32" max="32" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="base −2 digits" value={formatDigits(digits)} tone="success" /><Stat label="expanded terms" value={terms.join(" + ") || "0"} /><Stat label="decimal value" value={value.toString()} /></div>
    </Figure>
  );
}

export function HD12NegabinaryDivisionLab() {
  const [value, setValue] = useState(-23);
  const trace = negabinaryTrace(value);
  return (
    <Figure caption="Each conversion step chooses remainder 0 or 1, subtracts it, then divides exactly by −2; emitted remainders are read in reverse.">
      <label className="text-sm font-semibold text-primary">integer n = {value}<input className="mt-2 w-full accent-current" type="range" min="-48" max="48" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[30rem] border-collapse text-sm"><thead><tr className="text-secondary"><th className="border-b border-border p-2 text-left">current</th><th className="border-b border-border p-2 text-left">digit</th><th className="border-b border-border p-2 text-left">next quotient</th></tr></thead><tbody>{trace.map((row, index) => <tr key={`${row.current}-${index}`}><td className="border-b border-border/60 p-2 font-mono">{row.current}</td><td className="border-b border-border/60 p-2 font-mono text-accent">{row.digit}</td><td className="border-b border-border/60 p-2 font-mono">{row.next}</td></tr>)}</tbody></table></div>
      <div className="mt-4"><Stat label="reverse emitted digits" value={formatDigits(trace.map((row) => row.digit).reverse())} tone="success" /></div>
    </Figure>
  );
}

export function HD12NegabinaryRangeLab() {
  const [width, setWidth] = useState(6);
  const positivePlaces = Math.ceil(width / 2);
  const negativePlaces = Math.floor(width / 2);
  const maximum = (4 ** positivePlaces - 1) / 3;
  const minimum = -2 * (4 ** negativePlaces - 1) / 3;
  return (
    <Figure caption="A fixed negabinary width has an asymmetric but contiguous range: even positions provide the maximum and odd positions provide the minimum.">
      <label className="text-sm font-semibold text-primary">digit width = {width}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="minimum" value={minimum.toString()} /><Stat label="maximum" value={maximum.toString()} /><Stat label="values" value={(maximum - minimum + 1).toString()} tone="success" /><Stat label="patterns" value={(2 ** width).toString()} /></div>
    </Figure>
  );
}

export function HD12NegabinaryArithmeticLab() {
  const [left, setLeft] = useState(-7);
  const [right, setRight] = useState(12);
  const sum = left + right;
  return (
    <Figure caption="Negabinary arithmetic still represents ordinary integer sums; carry propagation differs because each carry has weight −2 times the current place.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">a = {left}<input className="mt-2 w-full accent-current" type="range" min="-16" max="16" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">b = {right}<input className="mt-2 w-full accent-current" type="range" min="-16" max="16" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="a in base −2" value={formatDigits(encodeNegativeBase(left, 2))} /><Stat label="b in base −2" value={formatDigits(encodeNegativeBase(right, 2))} /><Stat label="decimal sum" value={sum.toString()} /><Stat label="sum in base −2" value={formatDigits(encodeNegativeBase(sum, 2))} tone="success" /></div>
    </Figure>
  );
}

export function HD12ComplexPowersLab() {
  const [power, setPower] = useState(7);
  const values: Gaussian[] = [{ re: 1, im: 0 }];
  for (let index = 1; index <= power; index += 1) values.push(multiplyBeta(values[index - 1]));
  const current = values[values.length - 1];
  return (
    <Figure caption="Multiplication by β = −1+i rotates a Gaussian integer by 135 degrees and scales its magnitude by √2.">
      <label className="text-sm font-semibold text-primary">power k = {power}<input className="mt-2 w-full accent-current" type="range" min="0" max="12" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="β^k" value={formatGaussian(current)} tone="success" /><Stat label="coordinate path" value={values.map(formatGaussian).join(" → ")} /><Stat label="magnitude²" value={(current.re ** 2 + current.im ** 2).toString()} /></div>
    </Figure>
  );
}

export function HD12ComplexEncodeLab() {
  const [real, setReal] = useState(-3);
  const [imaginary, setImaginary] = useState(2);
  const digits = encodeGaussian({ re: real, im: imaginary });
  return (
    <Figure caption="Every Gaussian integer can be encoded with digits 0 and 1 in base −1+i by choosing the parity digit that makes the next quotient Gaussian-integral.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">real a = {real}<input className="mt-2 w-full accent-current" type="range" min="-8" max="8" value={real} onChange={(event) => setReal(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">imaginary b = {imaginary}<input className="mt-2 w-full accent-current" type="range" min="-8" max="8" value={imaginary} onChange={(event) => setImaginary(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Gaussian integer" value={formatGaussian({ re: real, im: imaginary })} /><Stat label="binary digits" value={formatDigits(digits)} tone="success" /><Stat label="digit count" value={digits.length.toString()} /></div>
    </Figure>
  );
}

export function HD12ComplexPathLab() {
  const [real, setReal] = useState(3);
  const [imaginary, setImaginary] = useState(4);
  const digits = encodeGaussian({ re: real, im: imaginary });
  const path = gaussianPath(digits);
  return (
    <Figure caption="Horner evaluation of a complex-base digit string traces a rotating, expanding path through the Gaussian integer lattice.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">real = {real}<input className="mt-2 w-full accent-current" type="range" min="-6" max="6" value={real} onChange={(event) => setReal(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">imaginary = {imaginary}<input className="mt-2 w-full accent-current" type="range" min="-6" max="6" value={imaginary} onChange={(event) => setImaginary(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="digits" value={formatDigits(digits)} /><Stat label="Horner path" value={path.map(formatGaussian).join(" → ")} /><Stat label="endpoint" value={formatGaussian(path[path.length - 1])} tone="success" /></div>
    </Figure>
  );
}

export function HD12NegativeBaseFamilyLab() {
  const [radix, setRadix] = useState(3);
  const [value, setValue] = useState(-41);
  const digits = encodeNegativeBase(value, radix);
  return (
    <Figure caption="The quotient-remainder rule generalizes to every integer base −b with canonical digits from 0 through b−1.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">base = −{radix}<input className="mt-2 w-full accent-current" type="range" min="2" max="10" value={radix} onChange={(event) => setRadix(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">integer = {value}<input className="mt-2 w-full accent-current" type="range" min="-100" max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="canonical digits" value={`0…${radix - 1}`} /><Stat label="representation" value={formatDigits(digits)} tone="success" /><Stat label="sign symbol" value="not needed" /></div>
    </Figure>
  );
}

export function HD12BalancedTernaryLab() {
  const [value, setValue] = useState(-23);
  const digits = encodeBalancedTernary(value);
  return (
    <Figure caption="Balanced ternary keeps a positive base but uses digits −1, 0, and 1; it contrasts digit-set design with negative-radix design.">
      <label className="text-sm font-semibold text-primary">integer = {value}<input className="mt-2 w-full accent-current" type="range" min="-64" max="64" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="digits" value={formatBalanced(digits)} tone="success" /><Stat label="T means" value="−1" /><Stat label="digit positions" value={digits.length.toString()} /></div>
    </Figure>
  );
}

export function HD12RadixEconomyLab() {
  const [radix, setRadix] = useState(3);
  const economy = radix / Math.log(radix);
  const binary = 2 / Math.log(2);
  return (
    <Figure caption="Under the idealized cost radix × digit count, continuous optimization chooses e and integer optimization chooses base 3.">
      <label className="text-sm font-semibold text-primary">integer radix r = {radix}<input className="mt-2 w-full accent-current" type="range" min="2" max="16" value={radix} onChange={(event) => setRadix(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="r / ln r" value={economy.toFixed(3)} tone={radix === 3 ? "success" : "accent"} /><Stat label="continuous optimum" value="e ≈ 2.718" /><Stat label="integer optimum" value="3" /><Stat label="vs binary" value={`${((economy / binary - 1) * 100).toFixed(1)}%`} /></div>
    </Figure>
  );
}

export function HD12EfficiencyAssumptionsLab() {
  const [symbolCost, setSymbolCost] = useState(true);
  const [equalReliability, setEqualReliability] = useState(false);
  const [uniformOperations, setUniformOperations] = useState(false);
  const idealized = symbolCost && equalReliability && uniformOperations;
  return (
    <Figure caption="A radix-efficiency result is conditional: change symbol cost, noise margin, wiring, arithmetic, or conversion cost and the engineering optimum can move.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={symbolCost} onChange={(event) => setSymbolCost(event.target.checked)} />cost proportional to radix</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={equalReliability} onChange={(event) => setEqualReliability(event.target.checked)} />equal symbol reliability</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={uniformOperations} onChange={(event) => setUniformOperations(event.target.checked)} />uniform operation cost</label></div>
      <div className="mt-4"><Stat label="base 3 conclusion" value={idealized ? "model applies" : "not established"} tone={idealized ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD12RepresentationCertificateLab() {
  const [digits, setDigits] = useState(true);
  const [division, setDivision] = useState(true);
  const [roundTrip, setRoundTrip] = useState(false);
  const complete = digits && division && roundTrip;
  return (
    <Figure caption="A positional representation is ready only when its digit set, exact quotient-remainder step, termination argument, and round-trip oracle agree.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={digits} onChange={(event) => setDigits(event.target.checked)} />canonical digits</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={division} onChange={(event) => setDivision(event.target.checked)} />exact division step</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={roundTrip} onChange={(event) => setRoundTrip(event.target.checked)} />round-trip oracle</label></div>
      <div className="mt-4"><Stat label="representation proof" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
