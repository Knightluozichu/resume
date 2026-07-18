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

function formatComplex(real: number, imaginary: number) {
  const r = Math.abs(real) < 1e-9 ? 0 : real;
  const i = Math.abs(imaginary) < 1e-9 ? 0 : imaginary;
  return `${r.toFixed(2)} ${i < 0 ? "−" : "+"} ${Math.abs(i).toFixed(2)}i`;
}

export function CLRS4PolynomialRepresentationLab() {
  const [representation, setRepresentation] = useState<"coefficient" | "values">("coefficient");
  const entries = representation === "coefficient" ? ["a₀=2", "a₁=−1", "a₂=3"] : ["A(0)=2", "A(1)=4", "A(2)=12"];
  return (
    <Figure caption="The same degree-2 polynomial can be stored by coefficients or by values at three distinct points; the useful operation depends on the representation.">
      <div className="grid grid-cols-2 gap-2"><button type="button" className={`border p-2 text-sm ${representation === "coefficient" ? "border-accent text-accent" : "border-border text-secondary"}`} onClick={() => setRepresentation("coefficient")}>coefficients</button><button type="button" className={`border p-2 text-sm ${representation === "values" ? "border-accent text-accent" : "border-border text-secondary"}`} onClick={() => setRepresentation("values")}>point values</button></div>
      <div className="mt-4 grid grid-cols-3 gap-2">{entries.map((entry) => <Stat key={entry} label={representation} value={entry} tone="success" />)}</div>
    </Figure>
  );
}

function convolve(left: number[], right: number[]) {
  const result = Array(left.length + right.length - 1).fill(0) as number[];
  left.forEach((a, i) => right.forEach((b, j) => { result[i + j] += a * b; }));
  return result;
}

export function CLRS4ConvolutionLab() {
  const [scale, setScale] = useState(1);
  const left = [1, 2, 1];
  const right = [2, -1].map((value) => value * scale);
  const product = convolve(left, right);
  return (
    <Figure caption="Coefficient-form multiplication is discrete convolution: every pair aᵢbⱼ contributes to coefficient cᵢ₊ⱼ.">
      <label className="text-sm font-semibold text-primary">second polynomial scale = {scale}<input className="mt-2 w-full accent-current" type="range" min="-3" max="3" value={scale} onChange={(event) => setScale(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="A coefficients" value={left.join(", ")} /><Stat label="B coefficients" value={right.join(", ")} tone="warning" /><Stat label="A·B coefficients" value={product.join(", ")} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4RootsOfUnityLab() {
  const [n, setN] = useState(8);
  const roots = Array.from({ length: n }, (_, k) => `${k}: ${formatComplex(Math.cos(2 * Math.PI * k / n), Math.sin(2 * Math.PI * k / n))}`);
  return (
    <Figure caption="Powers of a primitive nth root are equally spaced on the complex unit circle and close under squaring, inversion, and rotation.">
      <label className="text-sm font-semibold text-primary">number of roots n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="16" step="2" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{roots.map((root) => <div key={root} className="border border-accent p-2 text-center font-mono text-xs text-accent">{root}</div>)}</div>
    </Figure>
  );
}

const dftInput = [1, 2, 0, 1];

function dftAt(values: number[], k: number, inverse = false) {
  const sign = inverse ? 1 : -1;
  return values.reduce((sum, value, j) => {
    const angle = sign * 2 * Math.PI * j * k / values.length;
    return { real: sum.real + value * Math.cos(angle), imaginary: sum.imaginary + value * Math.sin(angle) };
  }, { real: 0, imaginary: 0 });
}

export function CLRS4DFTLab() {
  const [frequency, setFrequency] = useState(1);
  const value = dftAt(dftInput, frequency);
  return (
    <Figure caption="One DFT output is the polynomial evaluated at one root of unity, or equivalently the correlation with one complex frequency.">
      <label className="text-sm font-semibold text-primary">frequency index k = {frequency}<input className="mt-2 w-full accent-current" type="range" min="0" max={dftInput.length - 1} value={frequency} onChange={(event) => setFrequency(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="input coefficients" value={dftInput.join(",")} /><Stat label={`ω^${frequency}`} value={formatComplex(Math.cos(2 * Math.PI * frequency / dftInput.length), -Math.sin(2 * Math.PI * frequency / dftInput.length))} tone="warning" /><Stat label={`DFT[${frequency}]`} value={formatComplex(value.real, value.imaginary)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4InverseDFTLab() {
  const [scaled, setScaled] = useState(true);
  return (
    <Figure caption="The inverse DFT reuses the transform with the inverse root and divides by n; omitting the scale reconstructs n times the coefficients.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={scaled} onChange={(event) => setScaled(event.target.checked)} />apply the 1/n scale</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="root direction" value="ω⁻¹" /><Stat label="normalization" value={scaled ? "1/n" : "missing"} tone={scaled ? "success" : "danger"} /><Stat label="reconstruction" value={scaled ? "[1,2,0,1]" : "[4,8,0,4]"} tone={scaled ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4EvenOddSplitLab() {
  const [showOdd, setShowOdd] = useState(true);
  const coefficients = [3, 1, 4, 1, 5, 9, 2, 6];
  const selected = coefficients.filter((_, index) => (index % 2 === 1) === showOdd);
  return (
    <Figure caption="Splitting coefficient indices into even and odd creates two half-size polynomials evaluated at squared roots.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={showOdd} onChange={(event) => setShowOdd(event.target.checked)} />show odd-index polynomial</label>
      <div className="mt-4 grid grid-cols-4 gap-2">{selected.map((value, index) => <Stat key={index} label={`${showOdd ? "a" : "a"}${2 * index + (showOdd ? 1 : 0)}`} value={value.toString()} tone={showOdd ? "warning" : "accent"} />)}</div>
    </Figure>
  );
}

export function CLRS4ButterflyLab() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [twiddleIndex, setTwiddleIndex] = useState(0);
  const angle = -2 * Math.PI * twiddleIndex / 8;
  const wr = Math.cos(angle);
  const wi = Math.sin(angle);
  const tr = b * wr;
  const ti = b * wi;
  return (
    <Figure caption="A radix-2 butterfly combines two half transforms as u+ωᵏv and u−ωᵏv, sharing one twiddle multiplication.">
      <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">u = {a}<input className="mt-2 w-full accent-current" type="range" min="-5" max="5" value={a} onChange={(event) => setA(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">v = {b}<input className="mt-2 w-full accent-current" type="range" min="-5" max="5" value={b} onChange={(event) => setB(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">twiddle k = {twiddleIndex}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={twiddleIndex} onChange={(event) => setTwiddleIndex(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="upper wing u+ωᵏv" value={formatComplex(a + tr, ti)} tone="success" /><Stat label="lower wing u−ωᵏv" value={formatComplex(a - tr, -ti)} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4FFTRecursionLab() {
  const [n, setN] = useState(16);
  const levels = Math.log2(n);
  return (
    <Figure caption="Radix-2 FFT halves two subproblems recursively and performs linear total butterfly work at every level.">
      <label className="text-sm font-semibold text-primary">transform size n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="64" step="2" value={n} onChange={(event) => { const value = Number(event.target.value); setN(2 ** Math.round(Math.log2(value))); }} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="recursion levels" value={levels.toString()} /><Stat label="butterflies / level" value={(n / 2).toString()} tone="warning" /><Stat label="total butterflies" value={(n * levels / 2).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4PolynomialMultiplyLab() {
  const [padding, setPadding] = useState(8);
  const left = [1, 2, 3];
  const right = [2, 0, 1, 1];
  const required = left.length + right.length - 1;
  const valid = padding >= required;
  return (
    <Figure caption="FFT multiplication pads beyond the product degree, transforms both operands, multiplies pointwise, and applies the inverse transform.">
      <label className="text-sm font-semibold text-primary">transform length n = {padding}<input className="mt-2 w-full accent-current" type="range" min="2" max="16" step="2" value={padding} onChange={(event) => setPadding(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="required coefficients" value={required.toString()} /><Stat label="padding" value={valid ? "no circular wrap" : "aliases"} tone={valid ? "success" : "danger"} /><Stat label="exact convolution" value={valid ? convolve(left, right).join(",") : "invalid length"} tone={valid ? "accent" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4ZeroPaddingLab() {
  const [degreeA, setDegreeA] = useState(3);
  const [degreeB, setDegreeB] = useState(4);
  const coefficients = degreeA + degreeB + 1;
  const length = 2 ** Math.ceil(Math.log2(coefficients));
  return (
    <Figure caption="Zero padding chooses a transform length at least deg A + deg B + 1, usually rounded to a convenient power of two.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">deg A = {degreeA}<input className="mt-2 w-full accent-current" type="range" min="0" max="12" value={degreeA} onChange={(event) => setDegreeA(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">deg B = {degreeB}<input className="mt-2 w-full accent-current" type="range" min="0" max="12" value={degreeB} onChange={(event) => setDegreeB(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="minimum samples" value={coefficients.toString()} /><Stat label="radix-2 length" value={length.toString()} tone="success" /></div>
    </Figure>
  );
}

function bitReverse(value: number, bits: number) {
  let result = 0;
  for (let i = 0; i < bits; i += 1) result = (result << 1) | ((value >> i) & 1);
  return result;
}

export function CLRS4FFTCircuitLab() {
  const [stage, setStage] = useState(1);
  const n = 8;
  const levels = Math.log2(n);
  const order = Array.from({ length: n }, (_, index) => bitReverse(index, levels));
  return (
    <Figure caption="The recursive FFT unfolds into log₂n butterfly stages; bit-reversed addressing aligns inputs with an in-place iterative schedule.">
      <label className="text-sm font-semibold text-primary">completed circuit stages = {stage}<input className="mt-2 w-full accent-current" type="range" min="0" max={levels} value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">{order.map((source, index) => <div key={index} className="border border-accent p-2 text-center font-mono text-xs text-accent">{index}←{source}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2">{Array.from({ length: levels }, (_, index) => <Stat key={index} label={`stage ${index + 1}`} value={index < stage ? "butterflies done" : "pending"} tone={index < stage ? "success" : "warning"} />)}</div>
    </Figure>
  );
}

export function CLRS4FFTCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "padding" | "sign" | "scale" | "order">("valid");
  const checks = {
    "transform length prevents aliasing": issue !== "padding",
    "forward and inverse signs agree": issue !== "sign",
    "inverse includes normalization": issue !== "scale",
    "bit-reversal convention is tested": issue !== "order",
  };
  return (
    <Figure caption="An FFT certificate checks algebraic convention, padding, root sign, inverse scale, index order, and reconstruction error.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">validated FFT pipeline</option><option value="padding">insufficient zero padding</option><option value="sign">same sign used incorrectly</option><option value="scale">missing inverse 1/n</option><option value="order">bit-reversed output ignored</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
