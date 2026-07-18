"use client";

import { useState, type ReactNode } from "react";

type BinaryMode = "and" | "or" | "xor" | "add" | "sub" | "mul";

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

function bits(value: number, width = 8) {
  return (value & (2 ** width - 1)).toString(2).padStart(width, "0");
}

function popcount(value: number) {
  let current = value >>> 0;
  let count = 0;
  while (current !== 0) {
    current &= current - 1;
    count += 1;
  }
  return count;
}

function nlz8(value: number) {
  return value === 0 ? 8 : 8 - Math.floor(Math.log2(value)) - 1;
}

function ntz8(value: number) {
  if (value === 0) return 8;
  let count = 0;
  let current = value;
  while ((current & 1) === 0) {
    current >>>= 1;
    count += 1;
  }
  return count;
}

function reverse8(value: number) {
  let result = 0;
  for (let index = 0; index < 8; index += 1) result |= ((value >>> index) & 1) << (7 - index);
  return result;
}

function compress8(value: number, mask: number) {
  let result = 0;
  let destination = 0;
  for (let source = 0; source < 8; source += 1) {
    if (((mask >>> source) & 1) === 0) continue;
    result |= ((value >>> source) & 1) << destination;
    destination += 1;
  }
  return result;
}

function compressLeft8(value: number, mask: number) {
  const count = popcount(mask & 0xff);
  return (compress8(value, mask) << (8 - count)) & 0xff;
}

function sag8(value: number, mask: number) {
  return compressLeft8(value, mask) | compress8(value, (~mask) & 0xff);
}

function rotl8(value: number, amount: number) {
  const shift = ((amount % 8) + 8) % 8;
  return shift === 0 ? value & 0xff : ((value << shift) | (value >>> (8 - shift))) & 0xff;
}

function binaryValue(mode: BinaryMode, x: number, y: number) {
  if (mode === "and") return x & y;
  if (mode === "or") return x | y;
  if (mode === "xor") return x ^ y;
  if (mode === "add") return x + y;
  if (mode === "sub") return x - y;
  return x * y;
}

function heatColor(value: number, minimum: number, maximum: number) {
  const ratio = maximum === minimum ? 0.5 : Math.max(0, Math.min(1, (value - minimum) / (maximum - minimum)));
  const hue = 210 - ratio * 190;
  const lightness = 24 + ratio * 38;
  return `hsl(${hue} 72% ${lightness}%)`;
}

function Heatmap({ rows = 16, columns = 16, valueAt, minimum, maximum, label }: { rows?: number; columns?: number; valueAt: (x: number, y: number) => number; minimum: number; maximum: number; label: string }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <div className="mx-auto grid aspect-square min-w-[19rem] max-w-[32rem] border border-border bg-background p-1" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }} role="img" aria-label={label}>
        {Array.from({ length: rows * columns }, (_, index) => {
          const x = index % columns;
          const y = Math.floor(index / columns);
          const value = valueAt(x, y);
          return <div key={index} className="aspect-square border border-black/5" style={{ backgroundColor: heatColor(value, minimum, maximum) }} title={`x=${x}, y=${y}, f=${value}`} />;
        })}
      </div>
    </div>
  );
}

function BitStrip({ value, mask }: { value: number; mask?: number }) {
  return <div className="grid grid-cols-8 gap-1">{Array.from({ length: 8 }, (_, index) => 7 - index).map((bit) => <div key={bit} className={`aspect-square min-w-0 border p-1 text-center font-mono text-xs sm:text-sm ${((value >>> bit) & 1) !== 0 ? "border-success bg-success/20 text-success" : "border-border bg-background text-secondary"} ${mask !== undefined && ((mask >>> bit) & 1) !== 0 ? "ring-1 ring-warning" : ""}`} title={`bit ${bit}`}>{(value >>> bit) & 1}</div>)}</div>;
}

function ModeSelect({ value, onChange, modes }: { value: string; onChange: (value: string) => void; modes: Array<[string, string]> }) {
  return <label className="text-sm font-semibold text-primary">function<select className="mt-2 block w-full border border-border bg-background p-2" value={value} onChange={(event) => onChange(event.target.value)}>{modes.map(([key, title]) => <option key={key} value={key}>{title}</option>)}</select></label>;
}

export function HDAppendixCLogicalHeatmapLab() {
  const [mode, setMode] = useState<"and" | "or" | "xor">("xor");
  return (
    <Figure caption="AND, OR, and XOR turn a 16×16 integer domain into periodic two-dimensional textures whose blocks expose bit significance.">
      <ModeSelect value={mode} onChange={(value) => setMode(value as typeof mode)} modes={[["and", "x AND y"], ["or", "x OR y"], ["xor", "x XOR y"]]} />
      <Heatmap valueAt={(x, y) => binaryValue(mode, x, y)} minimum={0} maximum={15} label={`${mode} heatmap for integers 0 through 15`} />
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="f(5, 3)" value={binaryValue(mode, 5, 3).toString()} /><Stat label="symmetry" value="f(x,y)=f(y,x)" tone="success" /><Stat label="range" value="0..15" /></div>
    </Figure>
  );
}

export function HDAppendixCBitPlaneLab() {
  const [mode, setMode] = useState<"and" | "or" | "xor">("xor");
  const [bit, setBit] = useState(2);
  return (
    <Figure caption="Selecting one output bit removes magnitude color and reveals the exact square-wave period contributed by that bit plane.">
      <div className="grid gap-4 sm:grid-cols-2"><ModeSelect value={mode} onChange={(value) => setMode(value as typeof mode)} modes={[["and", "x AND y"], ["or", "x OR y"], ["xor", "x XOR y"]]} /><label className="text-sm font-semibold text-primary">output bit = {bit}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={bit} onChange={(event) => setBit(Number(event.target.value))} /></label></div>
      <Heatmap valueAt={(x, y) => (binaryValue(mode, x, y) >>> bit) & 1} minimum={0} maximum={1} label={`bit ${bit} plane of ${mode}`} />
      <div className="mt-4"><Stat label="axis period" value={(2 ** (bit + 1)).toString()} tone="success" /></div>
    </Figure>
  );
}

export function HDAppendixCArithmeticHeatmapLab() {
  const [mode, setMode] = useState<"add" | "sub" | "mul">("mul");
  const [wrapped, setWrapped] = useState(true);
  const rawBounds = mode === "sub" ? [-15, 15] : mode === "add" ? [0, 30] : [0, 225];
  const valueAt = (x: number, y: number) => {
    const raw = binaryValue(mode, x, y);
    return wrapped ? ((raw % 16) + 16) % 16 : raw;
  };
  return (
    <Figure caption="Addition produces diagonal level sets, subtraction reverses their slope, and multiplication exposes repeated factors; modulo 16 folds every surface onto a machine word.">
      <div className="grid gap-4 sm:grid-cols-2"><ModeSelect value={mode} onChange={(value) => setMode(value as typeof mode)} modes={[["add", "x + y"], ["sub", "x - y"], ["mul", "x × y"]]} /><label className="flex items-center gap-2 self-end border border-border bg-background p-3 text-sm font-semibold text-primary"><input type="checkbox" checked={wrapped} onChange={(event) => setWrapped(event.target.checked)} />show modulo 16 machine result</label></div>
      <Heatmap valueAt={valueAt} minimum={wrapped ? 0 : rawBounds[0]} maximum={wrapped ? 15 : rawBounds[1]} label={`${mode} ${wrapped ? "modulo 16" : "raw"} heatmap`} />
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="raw f(13,9)" value={binaryValue(mode, 13, 9).toString()} /><Stat label="displayed" value={valueAt(13, 9).toString()} tone={wrapped ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function HDAppendixCArithmeticSectionLab() {
  const [mode, setMode] = useState<"add" | "sub" | "mul">("add");
  const [fixedY, setFixedY] = useState(7);
  const values = Array.from({ length: 16 }, (_, x) => binaryValue(mode, x, fixedY));
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const yTo = (value: number) => 190 - (maximum === minimum ? 80 : ((value - minimum) / (maximum - minimum)) * 150);
  const points = values.map((value, x) => `${30 + x * 35},${yTo(value)}`).join(" ");
  return (
    <Figure caption="Holding y fixed turns a two-dimensional arithmetic surface into a one-dimensional cross-section, making slope and wrap boundaries measurable.">
      <div className="grid gap-4 sm:grid-cols-2"><ModeSelect value={mode} onChange={(value) => setMode(value as typeof mode)} modes={[["add", "x + y"], ["sub", "x - y"], ["mul", "x × y"]]} /><label className="text-sm font-semibold text-primary">fixed y = {fixedY}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={fixedY} onChange={(event) => setFixedY(Number(event.target.value))} /></label></div>
      <svg className="mt-4 h-auto w-full border border-border bg-background" viewBox="0 0 600 220" role="img" aria-label={`${mode} cross-section at y equals ${fixedY}`}><line x1="30" y1="190" x2="565" y2="190" stroke="currentColor" className="text-border" /><polyline points={points} fill="none" stroke="currentColor" strokeWidth="4" className="text-accent" />{values.map((value, x) => <circle key={x} cx={30 + x * 35} cy={yTo(value)} r="4" fill="currentColor" className="text-warning"><title>{`x=${x}, f=${value}`}</title></circle>)}</svg>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="minimum" value={minimum.toString()} /><Stat label="maximum" value={maximum.toString()} /><Stat label="samples" value="16" tone="success" /></div>
    </Figure>
  );
}

export function HDAppendixCDivisionHeatmapLab() {
  const [mode, setMode] = useState<"quotient" | "remainder">("quotient");
  const valueAt = (x: number, yIndex: number) => {
    const divisor = yIndex + 1;
    return mode === "quotient" ? Math.floor(x / divisor) : x % divisor;
  };
  return (
    <Figure caption="Unsigned quotient forms stair-step wedges while remainder forms repeating bands; rows begin at divisor one so division by zero is outside the plotted domain.">
      <ModeSelect value={mode} onChange={(value) => setMode(value as typeof mode)} modes={[["quotient", "floor(x / y)"], ["remainder", "x mod y"]]} />
      <Heatmap valueAt={valueAt} minimum={0} maximum={15} label={`${mode} heatmap for x zero through fifteen and divisor one through sixteen`} />
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x domain" value="0..15" /><Stat label="y domain" value="1..16" /><Stat label="zero divisor" value="excluded" tone="warning" /></div>
    </Figure>
  );
}

export function HDAppendixCDivisionDiscontinuityLab() {
  const [divisor, setDivisor] = useState(5);
  const quotient = Array.from({ length: 64 }, (_, x) => Math.floor(x / divisor));
  const remainder = Array.from({ length: 64 }, (_, x) => x % divisor);
  const qPoints = quotient.map((value, x) => `${20 + x * 8.8},${188 - value * (150 / Math.max(1, quotient.at(-1)!))}`).join(" ");
  const rPoints = remainder.map((value, x) => `${20 + x * 8.8},${188 - value * (150 / Math.max(1, divisor - 1))}`).join(" ");
  return (
    <Figure caption="For a fixed divisor, quotient jumps at multiples of y and remainder ramps from zero to y−1 before resetting at the same boundaries.">
      <label className="text-sm font-semibold text-primary">divisor y = {divisor}<input className="mt-2 w-full accent-current" type="range" min="1" max="16" value={divisor} onChange={(event) => setDivisor(Number(event.target.value))} /></label>
      <svg className="mt-4 h-auto w-full border border-border bg-background" viewBox="0 0 600 220" role="img" aria-label={`quotient and remainder for divisor ${divisor}`}><line x1="20" y1="188" x2="580" y2="188" stroke="currentColor" className="text-border" /><polyline points={qPoints} fill="none" stroke="currentColor" strokeWidth="3" className="text-accent" /><polyline points={rPoints} fill="none" stroke="currentColor" strokeWidth="3" className="text-warning" /></svg>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="blue" value="floor(x/y)" /><Stat label="orange" value="x mod y" tone="warning" /></div>
    </Figure>
  );
}

export function HDAppendixCCompressLab() {
  const [value, setValue] = useState(0b11010110);
  const [mask, setMask] = useState(0b10110100);
  const packed = compress8(value, mask);
  return (
    <Figure caption="Compress scans selected source positions from low to high and packs their bits into consecutive low-order destinations.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">mask = {bits(mask)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={mask} onChange={(event) => setMask(Number(event.target.value))} /></label></div>
      <div className="mt-4 space-y-3"><div><div className="mb-1 text-xs text-secondary">source, selected positions outlined</div><BitStrip value={value} mask={mask} /></div><div><div className="mb-1 text-xs text-secondary">packed low bits</div><BitStrip value={packed} /></div></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="selected" value={popcount(mask).toString()} /><Stat label="compress" value={bits(packed)} tone="success" /><Stat label="decimal" value={packed.toString()} /></div>
    </Figure>
  );
}

export function HDAppendixCSAGLab() {
  const [value, setValue] = useState(0b11010110);
  const [mask, setMask] = useState(0b10110100);
  const left = compressLeft8(value, mask);
  const right = compress8(value, (~mask) & 0xff);
  const result = sag8(value, mask);
  return (
    <Figure caption="SAG is a stable partition of all source bits: mask-selected bits gather left and unselected bits gather right without losing population.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">mask = {bits(mask)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={mask} onChange={(event) => setMask(Number(event.target.value))} /></label></div>
      <div className="mt-4 space-y-3"><BitStrip value={value} mask={mask} /><div className="grid grid-cols-2 gap-2"><Stat label="selected → left" value={bits(left)} /><Stat label="unselected → right" value={bits(right)} /></div><BitStrip value={result} /></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="SAG" value={bits(result)} tone="success" /><Stat label="ones before" value={popcount(value).toString()} /><Stat label="ones after" value={popcount(result).toString()} /></div>
    </Figure>
  );
}

export function HDAppendixCRotateLeftLab() {
  const [value, setValue] = useState(0b10010110);
  const [amount, setAmount] = useState(3);
  const result = rotl8(value, amount);
  const mapping = Array.from({ length: 8 }, (_, source) => ({ source, destination: (source + amount) % 8 }));
  return (
    <Figure caption="Rotate left is a cyclic permutation rather than a shift: bits crossing the high boundary re-enter at the low boundary.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">rotation k = {amount}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label></div>
      <div className="mt-4 space-y-3"><BitStrip value={value} /><div className="grid grid-cols-8 gap-1">{mapping.slice().reverse().map(({ source, destination }) => <div key={source} className="border border-border bg-background p-1 text-center font-mono text-[10px] text-secondary">{source}→{destination}</div>)}</div><BitStrip value={result} /></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="rotl8" value={bits(result)} tone="success" /><Stat label="ones before" value={popcount(value).toString()} /><Stat label="ones after" value={popcount(result).toString()} /></div>
    </Figure>
  );
}

type UnaryMode = "popcount" | "nlz" | "ntz" | "gray" | "reverse";

function unaryValue(mode: UnaryMode, value: number) {
  if (mode === "popcount") return popcount(value);
  if (mode === "nlz") return nlz8(value);
  if (mode === "ntz") return ntz8(value);
  if (mode === "gray") return value ^ (value >>> 1);
  return reverse8(value);
}

export function HDAppendixCUnaryPlotLab() {
  const [mode, setMode] = useState<UnaryMode>("popcount");
  const values = Array.from({ length: 256 }, (_, value) => unaryValue(mode, value));
  const maximum = Math.max(...values);
  const points = values.map((value, x) => `${20 + x * (560 / 255)},${190 - value * (155 / Math.max(1, maximum))}`).join(" ");
  return (
    <Figure caption="A 2D unary plot places integer input on the horizontal axis and function value vertically, revealing spikes, plateaus, self-similarity, and permutations.">
      <ModeSelect value={mode} onChange={(value) => setMode(value as UnaryMode)} modes={[["popcount", "population count"], ["nlz", "leading-zero count"], ["ntz", "trailing-zero count"], ["gray", "binary to Gray code"], ["reverse", "reverse 8 bits"]]} />
      <svg className="mt-4 h-auto w-full border border-border bg-background" viewBox="0 0 600 220" role="img" aria-label={`${mode} values over all eight bit integers`}><line x1="20" y1="190" x2="580" y2="190" stroke="currentColor" className="text-border" /><polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" /></svg>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="domain" value="0..255" /><Stat label="maximum" value={maximum.toString()} /><Stat label="samples" value="256" tone="success" /></div>
    </Figure>
  );
}

export function HDAppendixCScaleLab() {
  const [mode, setMode] = useState<"raw" | "modulo" | "bit">("raw");
  const [bit, setBit] = useState(3);
  const valueAt = (x: number, y: number) => {
    const product = x * y;
    if (mode === "raw") return product;
    if (mode === "modulo") return product & 15;
    return (product >>> bit) & 1;
  };
  const bounds = mode === "raw" ? [0, 225] : mode === "modulo" ? [0, 15] : [0, 1];
  return (
    <Figure caption="The same multiplication table tells different truths under raw magnitude, machine-word wrapping, or a selected bit plane; the plotting contract is part of the result.">
      <div className="grid gap-4 sm:grid-cols-2"><ModeSelect value={mode} onChange={(value) => setMode(value as typeof mode)} modes={[["raw", "raw x × y"], ["modulo", "x × y modulo 16"], ["bit", "selected product bit"]]} /><label className="text-sm font-semibold text-primary">bit plane = {bit}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={bit} disabled={mode !== "bit"} onChange={(event) => setBit(Number(event.target.value))} /></label></div>
      <Heatmap valueAt={valueAt} minimum={bounds[0]} maximum={bounds[1]} label={`multiplication shown as ${mode}`} />
      <div className="mt-4"><Stat label="active interpretation" value={mode === "raw" ? "integer magnitude" : mode === "modulo" ? "4-bit word" : `output bit ${bit}`} tone="warning" /></div>
    </Figure>
  );
}

export function HDAppendixCGraphCertificateLab() {
  const [domain, setDomain] = useState(true);
  const [range, setRange] = useState(false);
  const [convention, setConvention] = useState(true);
  const [invariant, setInvariant] = useState(false);
  const complete = domain && range && convention && invariant;
  return (
    <Figure caption="A discrete graph is reproducible only when domain, color/range mapping, signed and wrapping conventions, and an executable invariant are all stated.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={domain} onChange={(event) => setDomain(event.target.checked)} />finite domain</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={range} onChange={(event) => setRange(event.target.checked)} />range legend</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={convention} onChange={(event) => setConvention(event.target.checked)} />word convention</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={invariant} onChange={(event) => setInvariant(event.target.checked)} />test invariant</label></div>
      <div className="mt-4"><Stat label="graph certificate" value={complete ? "reproducible" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
