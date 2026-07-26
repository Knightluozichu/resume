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

function gcd(left: number, right: number) {
  let a = Math.abs(Math.trunc(left));
  let b = Math.abs(Math.trunc(right));
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function digitsOf(value: number, radix: number) {
  if (value === 0) return [0];
  const digits: number[] = [];
  for (let current = Math.abs(Math.trunc(value)); current > 0; current = Math.floor(current / radix)) digits.unshift(current % radix);
  return digits;
}

function digitLabel(value: number) {
  return value < 10 ? value.toString() : String.fromCharCode(55 + value);
}

export function TcpPositionalLab() {
  const [value, setValue] = useState(173);
  const [radix, setRadix] = useState(8);
  const digits = digitsOf(value, radix);
  return (
    <Figure caption="A positional numeral is a polynomial in the radix; the same integer acquires different digit strings while preserving value.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">integer = {value}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="1023" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">radix = {radix}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="16" value={radix} onChange={(event) => setRadix(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${digits.length}, minmax(0, 1fr))` }}>{digits.map((digit, index) => <Stat key={`${index}-${digit}`} label={`${radix}^${digits.length - index - 1}`} value={digitLabel(digit)} tone="success" />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="digit string" value={digits.map(digitLabel).join("")} /><Stat label="decoded value" value={digits.reduce((sum, digit) => sum * radix + digit, 0).toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpFloatFormatLab() {
  const [sign, setSign] = useState(0);
  const [exponent, setExponent] = useState(3);
  const [fraction, setFraction] = useState(5);
  const bias = 3;
  const significand = 1 + fraction / 16;
  const decoded = (sign ? -1 : 1) * significand * 2 ** (exponent - bias);
  return (
    <Figure caption="This toy 1+3+4 format makes sign, biased exponent, hidden leading bit, and spacing visible without hiding them inside 64 bits.">
      <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">sign = {sign}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="1" value={sign} onChange={(event) => setSign(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">stored exponent = {exponent}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="6" value={exponent} onChange={(event) => setExponent(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">fraction = {fraction}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="15" value={fraction} onChange={(event) => setFraction(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-[1fr_3fr_4fr] gap-2"><Stat label="sign" value={sign.toString()} tone="danger" /><Stat label="exponent" value={exponent.toString(2).padStart(3, "0")} tone="warning" /><Stat label="fraction" value={fraction.toString(2).padStart(4, "0")} tone="success" /></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="significand" value={significand.toFixed(4)} /><Stat label="true exponent" value={(exponent - bias).toString()} /><Stat label="decoded" value={decoded.toString()} tone="success" /></div>
    </Figure>
  );
}

function roundTo(value: number, places: number, mode: "nearest" | "down" | "up" | "zero") {
  const scale = 10 ** places;
  const scaled = value * scale;
  const lower = Math.floor(scaled);
  const fraction = scaled - lower;
  const nearestEven = Math.abs(fraction - 0.5) < 1e-10 ? (lower % 2 === 0 ? lower : lower + 1) : Math.round(scaled);
  const rounded = mode === "nearest" ? nearestEven : mode === "down" ? Math.floor(scaled) : mode === "up" ? Math.ceil(scaled) : Math.trunc(scaled);
  return rounded / scale;
}

export function TcpRoundingLab() {
  const [value, setValue] = useState(1.235);
  const [places, setPlaces] = useState(2);
  const [mode, setMode] = useState<"nearest" | "down" | "up" | "zero">("nearest");
  const rounded = roundTo(value, places, mode);
  return (
    <Figure caption="A rounding rule is part of the arithmetic contract: it maps an exact result to one representable neighbor and determines the error sign.">
      <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">exact value = {value.toFixed(3)}<input className="mt-2 h-11 w-full accent-current" type="range" min="-3" max="3" step="0.005" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">decimal places = {places}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="3" value={places} onChange={(event) => setPlaces(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">rounding mode<select className="mt-2 block w-full border border-border bg-background p-2" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="nearest">nearest-even</option><option value="down">toward negative</option><option value="up">toward positive</option><option value="zero">toward zero</option></select></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="rounded" value={rounded.toFixed(places)} tone="success" /><Stat label="absolute error" value={Math.abs(rounded - value).toExponential(3)} /><Stat label="error direction" value={rounded === value ? "exact" : rounded > value ? "up" : "down"} tone="warning" /></div>
    </Figure>
  );
}

export function TcpCancellationLab() {
  const [power, setPower] = useState(8);
  const delta = 10 ** -power;
  const direct = Math.sqrt(1 + delta) - 1;
  const stable = delta / (Math.sqrt(1 + delta) + 1);
  const reference = delta / 2;
  return (
    <Figure caption="Algebraically equivalent formulas can have different floating-point behavior; rationalization avoids subtracting nearly equal numbers.">
      <label className="text-sm font-semibold text-primary">delta = 10^-{power}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="16" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="direct subtraction" value={direct.toExponential(8)} tone={direct === 0 ? "danger" : "warning"} /><Stat label="rationalized" value={stable.toExponential(8)} tone="success" /><Stat label="first-order reference" value={reference.toExponential(8)} /></div>
    </Figure>
  );
}

function sumRepeated(value: number, count: number) {
  let naive = 0;
  let kahan = 0;
  let correction = 0;
  for (let index = 0; index < count; index += 1) {
    naive += value;
    const adjusted = value - correction;
    const next = kahan + adjusted;
    correction = (next - kahan) - adjusted;
    kahan = next;
  }
  return { naive, kahan };
}

export function TcpCompensatedSumLab() {
  const [count, setCount] = useState(10000);
  const value = 0.1;
  const result = sumRepeated(value, count);
  const exact = value * count;
  return (
    <Figure caption="Compensated summation carries forward low-order bits lost at each addition; it improves accumulation without pretending input values are exact.">
      <label className="text-sm font-semibold text-primary">terms = {count}<input className="mt-2 h-11 w-full accent-current" type="range" min="100" max="100000" step="100" value={count} onChange={(event) => setCount(Number(event.target.value))} /></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="naive error" value={(result.naive - exact).toExponential(4)} tone="warning" /><Stat label="compensated error" value={(result.kahan - exact).toExponential(4)} tone="success" /><Stat label="target" value={exact.toString()} /></div>
    </Figure>
  );
}

function chunkAdd(left: number[], right: number[], base: number) {
  const width = Math.max(left.length, right.length);
  const result: number[] = [];
  const carries: number[] = [];
  let carry = 0;
  for (let offset = 0; offset < width; offset += 1) {
    const sum = (left[left.length - 1 - offset] ?? 0) + (right[right.length - 1 - offset] ?? 0) + carry;
    result.unshift(sum % base);
    carry = Math.floor(sum / base);
    carries.unshift(carry);
  }
  if (carry) result.unshift(carry);
  return { result, carries };
}

export function TcpMultiplePrecisionAddLab() {
  const [left, setLeft] = useState(987654);
  const [right, setRight] = useState(456789);
  const base = 1000;
  const leftChunks = [Math.floor(left / base), left % base];
  const rightChunks = [Math.floor(right / base), right % base];
  const result = chunkAdd(leftChunks, rightChunks, base);
  return (
    <Figure caption="Multiple-precision addition stores a number as radix-B limbs and propagates a bounded carry from the least significant limb.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">left = {left}<input className="mt-2 h-11 w-full accent-current" type="range" min="100000" max="999999" step="137" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">right = {right}<input className="mt-2 h-11 w-full accent-current" type="range" min="100000" max="999999" step="173" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left limbs" value={leftChunks.map((value) => value.toString().padStart(3, "0")).join(" | ")} /><Stat label="right limbs" value={rightChunks.map((value) => value.toString().padStart(3, "0")).join(" | ")} /><Stat label="carry trace" value={result.carries.join(" | ")} tone="warning" /></div>
      <div className="mt-2"><Stat label="result limbs" value={result.result.map((value, index) => index ? value.toString().padStart(3, "0") : value.toString()).join(" | ")} tone="success" /></div>
    </Figure>
  );
}

function schoolProduct(left: number, right: number) {
  const a = digitsOf(left, 10).reverse();
  const b = digitsOf(right, 10).reverse();
  const cells = Array.from({ length: a.length + b.length }, () => 0);
  for (let i = 0; i < a.length; i += 1) for (let j = 0; j < b.length; j += 1) cells[i + j] += a[i] * b[j];
  for (let i = 0; i < cells.length - 1; i += 1) { cells[i + 1] += Math.floor(cells[i] / 10); cells[i] %= 10; }
  while (cells.length > 1 && cells.at(-1) === 0) cells.pop();
  return cells.reverse();
}

export function TcpMultiplePrecisionMultiplyLab() {
  const [left, setLeft] = useState(47);
  const [right, setRight] = useState(83);
  const product = schoolProduct(left, right);
  return (
    <Figure caption="Classical multiplication forms every digit product on a diagonal and then normalizes carries; n-by-n limbs require quadratic elementary products.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">left = {left}<input className="mt-2 h-11 w-full accent-current" type="range" min="10" max="99" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">right = {right}<input className="mt-2 h-11 w-full accent-current" type="range" min="10" max="99" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="elementary products" value="4" /><Stat label="normalized digits" value={product.join(" ")} /><Stat label="decoded product" value={product.reduce((sum, digit) => sum * 10 + digit, 0).toString()} tone="success" /></div>
    </Figure>
  );
}

function extendedGcd(left: number, right: number) {
  let [oldR, r] = [left, right];
  let [oldS, s] = [1, 0];
  while (r !== 0) {
    const quotient = Math.trunc(oldR / r);
    [oldR, r] = [r, oldR - quotient * r];
    [oldS, s] = [s, oldS - quotient * s];
  }
  return { divisor: Math.abs(oldR), coefficient: oldR < 0 ? -oldS : oldS };
}

export function TcpModularLab() {
  const [value, setValue] = useState(17);
  const [modulus, setModulus] = useState(43);
  const result = extendedGcd(value, modulus);
  const inverse = result.divisor === 1 ? ((result.coefficient % modulus) + modulus) % modulus : null;
  return (
    <Figure caption="A modular inverse exists exactly when the operand and modulus are coprime; extended Euclid produces the witness coefficient.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">a = {value}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="80" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">modulus = {modulus}<input className="mt-2 h-11 w-full accent-current" type="range" min="3" max="97" value={modulus} onChange={(event) => setModulus(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="gcd(a,m)" value={result.divisor.toString()} /><Stat label="inverse" value={inverse?.toString() ?? "none"} tone={inverse === null ? "danger" : "success"} /><Stat label="verification" value={inverse === null ? "not invertible" : `${value}×${inverse} mod ${modulus} = ${(value * inverse) % modulus}`} /></div>
    </Figure>
  );
}

function divisionTrace(value: number, radix: number) {
  const rows: Array<{ value: number; quotient: number; remainder: number }> = [];
  for (let current = value; current > 0; current = Math.floor(current / radix)) rows.push({ value: current, quotient: Math.floor(current / radix), remainder: current % radix });
  return rows;
}

export function TcpRadixConversionLab() {
  const [value, setValue] = useState(347);
  const [radix, setRadix] = useState(16);
  const rows = divisionTrace(value, radix);
  return (
    <Figure caption="Repeated division exposes both the quotient invariant and the reverse remainder order used for integer radix conversion.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">source integer = {value}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="1023" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">target radix = {radix}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="16" value={radix} onChange={(event) => setRadix(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid gap-1">{rows.map((row) => <div key={row.value} className="grid grid-cols-3 border border-border bg-background p-2 text-center font-mono text-xs text-primary"><span>{row.value} div {radix}</span><span>q={row.quotient}</span><span>r={digitLabel(row.remainder)}</span></div>)}</div>
      <div className="mt-4"><Stat label="reverse remainders" value={rows.map((row) => digitLabel(row.remainder)).reverse().join("")} tone="success" /></div>
    </Figure>
  );
}

export function TcpRationalLab() {
  const [numerator, setNumerator] = useState(84);
  const [denominator, setDenominator] = useState(126);
  const divisor = gcd(numerator, denominator);
  return (
    <Figure caption="Canonical rational arithmetic reduces numerator and denominator by their gcd, making equality structural and controlling operand growth.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">numerator = {numerator}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="200" value={numerator} onChange={(event) => setNumerator(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">denominator = {denominator}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="200" value={denominator} onChange={(event) => setDenominator(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="gcd" value={divisor.toString()} /><Stat label="canonical numerator" value={(numerator / divisor).toString()} /><Stat label="canonical denominator" value={(denominator / divisor).toString()} tone="success" /></div>
    </Figure>
  );
}

function euclidSteps(left: number, right: number) {
  const rows: Array<[number, number, number]> = [];
  let a = left;
  let b = right;
  while (b !== 0) { rows.push([a, b, a % b]); [a, b] = [b, a % b]; }
  return rows;
}

export function TcpEuclidLab() {
  const [index, setIndex] = useState(10);
  const fib = [0, 1];
  for (let position = 2; position <= index + 1; position += 1) fib.push(fib[position - 1] + fib[position - 2]);
  const rows = euclidSteps(fib[index + 1], fib[index]);
  return (
    <Figure caption="Consecutive Fibonacci numbers force Euclid to take one quotient-1 step after another, exposing its logarithmic worst-case shape.">
      <label className="text-sm font-semibold text-primary">Fibonacci index = {index}<input className="mt-2 h-11 w-full accent-current" type="range" min="3" max="20" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="larger" value={fib[index + 1].toString()} /><Stat label="smaller" value={fib[index].toString()} /><Stat label="division steps" value={rows.length.toString()} tone="warning" /></div>
      <div className="mt-2 font-mono text-xs text-secondary">{rows.slice(0, 8).map(([a, b, r]) => `${a} mod ${b} = ${r}`).join(" · ")}</div>
    </Figure>
  );
}

export function TcpHornerLab() {
  const [x, setX] = useState(3);
  const coefficients = [2, -3, 5, -7];
  const trace: number[] = [coefficients[0]];
  for (const coefficient of coefficients.slice(1)) trace.push(trace.at(-1)! * x + coefficient);
  return (
    <Figure caption="Horner evaluation rewrites a degree-n polynomial as nested multiply-adds, using n multiplications and n additions with a simple invariant.">
      <label className="text-sm font-semibold text-primary">x = {x}<input className="mt-2 h-11 w-full accent-current" type="range" min="-5" max="5" value={x} onChange={(event) => setX(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{trace.map((value, index) => <Stat key={index} label={`stage ${index}`} value={value.toString()} tone={index === trace.length - 1 ? "success" : "accent"} />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="polynomial" value="2x^3−3x^2+5x−7" /><Stat label="P(x)" value={trace.at(-1)!.toString()} tone="success" /></div>
    </Figure>
  );
}

function factorial(value: number) {
  let result = 1;
  for (let factor = 2; factor <= value; factor += 1) result *= factor;
  return result;
}

export function TcpPowerSeriesLab() {
  const [x, setX] = useState(1);
  const [terms, setTerms] = useState(6);
  const approximation = Array.from({ length: terms }, (_, index) => x ** index / factorial(index)).reduce((sum, term) => sum + term, 0);
  return (
    <Figure caption="A truncated power series trades work for approximation error; recurrence between adjacent terms avoids recomputing powers and factorials.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {x.toFixed(2)}<input className="mt-2 h-11 w-full accent-current" type="range" min="-2" max="2" step="0.05" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">terms = {terms}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="14" value={terms} onChange={(event) => setTerms(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="series estimate" value={approximation.toPrecision(10)} /><Stat label="Math.exp" value={Math.exp(x).toPrecision(10)} /><Stat label="absolute error" value={Math.abs(approximation - Math.exp(x)).toExponential(3)} tone="success" /></div>
    </Figure>
  );
}

export function TcpArithmeticCertificateLab() {
  const [representation, setRepresentation] = useState(true);
  const [rounding, setRounding] = useState(false);
  const [invariant, setInvariant] = useState(true);
  const [oracle, setOracle] = useState(false);
  const complete = representation && rounding && invariant && oracle;
  return (
    <Figure caption="An arithmetic certificate records representation, rounding contract, algorithmic invariant, and an independent oracle or bound.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={representation} onChange={(event) => setRepresentation(event.target.checked)} />representation</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={rounding} onChange={(event) => setRounding(event.target.checked)} />rounding</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={invariant} onChange={(event) => setInvariant(event.target.checked)} />invariant</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={oracle} onChange={(event) => setOracle(event.target.checked)} />oracle / bound</label></div>
      <div className="mt-4"><Stat label="Chapter 4 arithmetic certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function TcpArithmeticDiagram() {
  return <TcpFloatFormatLab />;
}
