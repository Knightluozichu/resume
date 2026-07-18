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

function sqrtNewtonTrace(value: number) {
  if (value === 0) return [0];
  const bitLength = Math.floor(Math.log2(value)) + 1;
  let estimate = 2 ** Math.ceil(bitLength / 2);
  const trace = [estimate];
  while (true) {
    const next = Math.floor((estimate + Math.floor(value / estimate)) / 2);
    if (next >= estimate) return trace;
    estimate = next;
    trace.push(estimate);
  }
}

function cubeRootFloor(value: number) {
  let result = 0;
  while ((result + 1) ** 3 <= value) result += 1;
  return result;
}

function cubeNewtonTrace(value: number) {
  if (value === 0) return [0];
  const bitLength = Math.floor(Math.log2(value)) + 1;
  let estimate = 2 ** Math.ceil(bitLength / 3);
  while (estimate ** 3 < value) estimate *= 2;
  const trace = [estimate];
  while (true) {
    const next = Math.floor((2 * estimate + Math.floor(value / (estimate * estimate))) / 3);
    if (next >= estimate) return trace;
    estimate = next;
    trace.push(estimate);
  }
}

function integerLog(value: number, base: number) {
  let exponent = 0;
  let power = 1;
  while (power <= Math.floor(value / base)) {
    power *= base;
    exponent += 1;
  }
  return { exponent, power };
}

export function HD11SqrtBoundsLab() {
  const [value, setValue] = useState(173);
  const root = Math.floor(Math.sqrt(value));
  const remainder = value - root * root;
  return (
    <Figure caption="Floor integer square root is certified by r² ≤ n < (r+1)²; the remainder n−r² measures distance from the lower square.">
      <label className="text-sm font-semibold text-primary">n = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="1023" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="isqrt n" value={root.toString()} tone="success" /><Stat label="r²" value={(root * root).toString()} /><Stat label="(r+1)²" value={((root + 1) ** 2).toString()} /><Stat label="remainder" value={remainder.toString()} /></div>
    </Figure>
  );
}

export function HD11SqrtNewtonLab() {
  const [value, setValue] = useState(1000);
  const trace = sqrtNewtonTrace(value);
  const root = trace[trace.length - 1];
  return (
    <Figure caption="Integer Newton iteration starts above the root and repeatedly averages x with floor(n/x), descending to floor sqrt(n).">
      <label className="text-sm font-semibold text-primary">n = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="4095" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="initial estimate" value={trace[0].toString()} /><Stat label="trace" value={trace.join(" → ")} /><Stat label="result" value={root.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD11SqrtBitPairsLab() {
  const [value, setValue] = useState(0b10101101);
  const root = Math.floor(Math.sqrt(value));
  const groups = value.toString(2).padStart(8, "0").match(/.{1,2}/g) ?? [];
  return (
    <Figure caption="Digit-by-digit square root consumes binary digits in pairs because each new root bit changes the square at twice its position.">
      <label className="text-sm font-semibold text-primary">8-bit n = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="bit pairs" value={groups.join(" · ")} /><Stat label="root bits" value={root.toString(2).padStart(4, "0")} tone="success" /><Stat label="root decimal" value={root.toString()} /></div>
    </Figure>
  );
}

export function HD11CubeBoundsLab() {
  const [value, setValue] = useState(1000);
  const root = cubeRootFloor(value);
  return (
    <Figure caption="Floor integer cube root is certified by r³ ≤ n < (r+1)³, including an exact negative extension when signed policy is defined.">
      <label className="text-sm font-semibold text-primary">nonnegative n = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="4095" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="icbrt n" value={root.toString()} tone="success" /><Stat label="r³" value={(root ** 3).toString()} /><Stat label="(r+1)³" value={((root + 1) ** 3).toString()} /><Stat label="remainder" value={(value - root ** 3).toString()} /></div>
    </Figure>
  );
}

export function HD11CubeNewtonLab() {
  const [value, setValue] = useState(3000);
  const trace = cubeNewtonTrace(value);
  const result = trace[trace.length - 1];
  return (
    <Figure caption="Cube-root Newton uses floor((2x+n/x²)/3); an above-root initial estimate keeps the integer sequence descending.">
      <label className="text-sm font-semibold text-primary">n = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="4095" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="trace" value={trace.join(" → ")} /><Stat label="iterations" value={(trace.length - 1).toString()} /><Stat label="result" value={result.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD11ExponentiationLab() {
  const [base, setBase] = useState(3);
  const [exponent, setExponent] = useState(13);
  let result = 1;
  let factor = base;
  let remaining = exponent;
  let multiplies = 0;
  const actions: string[] = [];
  while (remaining > 0) {
    if ((remaining & 1) !== 0) {
      result *= factor;
      multiplies += 1;
      actions.push(`take ${factor}`);
    }
    remaining >>>= 1;
    if (remaining > 0) {
      factor *= factor;
      multiplies += 1;
    }
  }
  return (
    <Figure caption="Exponentiation by squaring scans exponent bits: square the current factor each level and multiply it into the result only for set bits.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">base a = {base}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={base} onChange={(event) => setBase(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">exponent e = {exponent}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={exponent} onChange={(event) => setExponent(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="exponent bits" value={exponent.toString(2)} /><Stat label="selected factors" value={actions.join(", ") || "identity"} /><Stat label="multiplications" value={multiplies.toString()} /><Stat label="a^e" value={result.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD11PowerOverflowLab() {
  const [base, setBase] = useState(7);
  const [exponent, setExponent] = useState(4);
  const exact = base ** exponent;
  const stored = exact & 0xff;
  return (
    <Figure caption="Exponentiation magnifies overflow: every square and conditional multiply must be checked, not only the final result.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">base = {base}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={base} onChange={(event) => setBase(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">exponent = {exponent}<input className="mt-2 w-full accent-current" type="range" min="0" max="8" value={exponent} onChange={(event) => setExponent(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="exact power" value={exact.toString()} /><Stat label="stored 8-bit" value={stored.toString()} /><Stat label="fits byte" value={exact <= 255 ? "yes" : "no"} tone={exact <= 255 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD11Log2Lab() {
  const [value, setValue] = useState(173);
  const exponent = Math.floor(Math.log2(value));
  return (
    <Figure caption="For positive integers, floor log2 is the highest set-bit position and equals word width minus one minus CLZ.">
      <label className="text-sm font-semibold text-primary">positive n = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="floor log2" value={exponent.toString()} tone="success" /><Stat label="2^k" value={(2 ** exponent).toString()} /><Stat label="2^(k+1)" value={(2 ** (exponent + 1)).toString()} /><Stat label="CLZ8" value={(7 - exponent).toString()} /></div>
    </Figure>
  );
}

export function HD11LogBaseLab() {
  const [value, setValue] = useState(1000);
  const [base, setBase] = useState(10);
  const result = integerLog(value, base);
  return (
    <Figure caption="Integer logarithm in arbitrary base returns the largest k with b^k ≤ n; guarded multiplication avoids computing a power past the range.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">n = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="4095" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">base b = {base}<input className="mt-2 w-full accent-current" type="range" min="2" max="16" value={base} onChange={(event) => setBase(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="floor log_b n" value={result.exponent.toString()} tone="success" /><Stat label="b^k" value={result.power.toString()} /><Stat label="next power" value={(result.power * base).toString()} /><Stat label="bounds hold" value={result.power <= value && value < result.power * base ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD11MonotonePredicateLab() {
  const [value, setValue] = useState(173);
  const candidate = Math.floor(Math.sqrt(value));
  const lower = candidate * candidate <= value;
  const next = (candidate + 1) * (candidate + 1) > value;
  return (
    <Figure caption="Root and logarithm routines can be viewed as finding the last integer whose monotone power predicate remains true.">
      <label className="text-sm font-semibold text-primary">n = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="1023" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="candidate r" value={candidate.toString()} /><Stat label="r²≤n" value={lower ? "yes" : "no"} /><Stat label="(r+1)²>n" value={next ? "yes" : "no"} tone={lower && next ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function HD11RoundingContractLab() {
  const [floorRoot, setFloorRoot] = useState(true);
  const [zero, setZero] = useState(true);
  const [negative, setNegative] = useState(false);
  const complete = floorRoot && zero && negative;
  return (
    <Figure caption="An integer elementary function needs an explicit rounding rule, zero behavior, and signed-domain policy before optimization.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={floorRoot} onChange={(event) => setFloorRoot(event.target.checked)} />floor rule</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={zero} onChange={(event) => setZero(event.target.checked)} />zero case</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={negative} onChange={(event) => setNegative(event.target.checked)} />negative domain</label></div>
      <div className="mt-4"><Stat label="rounding contract" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD11ElementaryCertificateLab() {
  const [bounds, setBounds] = useState(true);
  const [overflow, setOverflow] = useState(false);
  const [oracle, setOracle] = useState(true);
  const complete = bounds && overflow && oracle;
  return (
    <Figure caption="An integer elementary function is ready when adjacent-value bounds, intermediate overflow guards, and an independent oracle all pass.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={bounds} onChange={(event) => setBounds(event.target.checked)} />adjacent bounds</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={overflow} onChange={(event) => setOverflow(event.target.checked)} />overflow guards</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={oracle} onChange={(event) => setOracle(event.target.checked)} />oracle</label></div>
      <div className="mt-4"><Stat label="elementary certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
