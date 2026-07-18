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

function isPrime(value: number) {
  if (value < 2) return false;
  for (let divisor = 2; divisor * divisor <= value; divisor += 1) {
    if (value % divisor === 0) return false;
  }
  return true;
}

function primePi(value: number) {
  let count = 0;
  for (let candidate = 2; candidate <= value; candidate += 1) if (isPrime(candidate)) count += 1;
  return count;
}

function nthPrime(index: number) {
  let count = 0;
  let candidate = 1;
  while (count < index) {
    candidate += 1;
    if (isPrime(candidate)) count += 1;
  }
  return candidate;
}

function factorialModBefore(value: number) {
  if (value <= 1) return 0;
  let residue = 1 % value;
  for (let factor = 2; factor < value; factor += 1) residue = (residue * factor) % value;
  return residue;
}

function willansIndicator(value: number) {
  if (value === 1) return 1;
  return factorialModBefore(value) === value - 1 ? 1 : 0;
}

function firstFactorPair(value: number) {
  for (let left = 2; left <= value; left += 1) {
    for (let right = 2; right <= value; right += 1) {
      if (left * right === value) return [left, right] as const;
    }
  }
  return null;
}

export function HD18FormulaVsAlgorithmLab() {
  const [index, setIndex] = useState(5);
  const prime = nthPrime(index);
  const upper = 2 ** index;
  return (
    <Figure caption="An exact nth-prime formula can encode the same predicate-and-count search as an algorithm while doing dramatically more work.">
      <label className="text-sm font-semibold text-primary">prime index n = {index}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="p_n" value={prime.toString()} tone="success" /><Stat label="Willans upper 2^n" value={upper.toString()} /><Stat label="useful candidates" value={(prime - 1).toString()} /><Stat label="outer summands" value={upper.toString()} tone="warning" /></div>
    </Figure>
  );
}

export function HD18WilsonPredicateLab() {
  const [value, setValue] = useState(7);
  const residue = factorialModBefore(value);
  const passes = residue === value - 1;
  return (
    <Figure caption="Wilson's theorem turns primality into the exact congruence (j−1)! ≡ −1 mod j for integers j greater than one.">
      <label className="text-sm font-semibold text-primary">candidate j = {value}<input className="mt-2 w-full accent-current" type="range" min="2" max="20" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="(j−1)! mod j" value={residue.toString()} /><Stat label="required residue" value={(value - 1).toString()} /><Stat label="congruence" value={passes ? "holds" : "fails"} tone={passes ? "success" : "warning"} /><Stat label="classification" value={isPrime(value) ? "prime" : "composite"} /></div>
    </Figure>
  );
}

export function HD18WillansIndicatorLab() {
  const [limit, setLimit] = useState(12);
  const values = Array.from({ length: limit }, (_, index) => index + 1);
  const sum = values.reduce((total, value) => total + willansIndicator(value), 0);
  return (
    <Figure caption="Willans's F(j) equals one for j=1 and primes, zero for composites; subtracting the j=1 sentinel recovers π(m).">
      <label className="text-sm font-semibold text-primary">prefix limit m = {limit}<input className="mt-2 w-full accent-current" type="range" min="2" max="24" value={limit} onChange={(event) => setLimit(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-6 gap-1 sm:grid-cols-12">{values.map((value) => <div key={value} className={`border p-2 text-center font-mono text-xs ${willansIndicator(value) ? "border-success text-success" : "border-border text-secondary"}`}><div>{value}</div><div>F={willansIndicator(value)}</div></div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="sum F(1..m)" value={sum.toString()} /><Stat label="π(m) = sum−1" value={(sum - 1).toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD18WillansNthPrimeLab() {
  const [index, setIndex] = useState(5);
  const upper = 2 ** index;
  const rows = Array.from({ length: upper }, (_, offset) => {
    const value = offset + 1;
    const count = primePi(value);
    return { value, count, active: count < index };
  });
  const result = 1 + rows.filter((row) => row.active).length;
  return (
    <Figure caption="Each outer Willans summand is the predicate π(m) < n, so a run of ones ends immediately before the nth prime.">
      <label className="text-sm font-semibold text-primary">target index n = {index}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-1">{rows.map((row) => <div key={row.value} title={`π(${row.value})=${row.count}`} className={`h-8 w-8 border text-center font-mono text-xs leading-8 ${row.active ? "border-accent bg-accent/15 text-accent" : "border-border text-secondary"}`}>{row.value}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="active ones" value={(result - 1).toString()} /><Stat label="1 + sum" value={result.toString()} tone="success" /><Stat label="reference p_n" value={nthPrime(index).toString()} /></div>
    </Figure>
  );
}

export function HD18UpperBoundLab() {
  const [index, setIndex] = useState(6);
  const prime = nthPrime(index);
  const bound = 2 ** index;
  return (
    <Figure caption="The finite outer sum needs a proved upper bound; p_n is below 2^n for positive n, though this bound is intentionally loose.">
      <label className="text-sm font-semibold text-primary">n = {index}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="p_n" value={prime.toString()} tone="success" /><Stat label="2^n" value={bound.toString()} /><Stat label="unused tail" value={(bound - prime + 1).toString()} tone="warning" /></div>
    </Figure>
  );
}

export function HD18WormellFactorLab() {
  const [value, setValue] = useState(11);
  const pair = firstFactorPair(value);
  const side = value - 1;
  const cells = Array.from({ length: side * side }, (_, index) => {
    const left = 2 + Math.floor(index / side);
    const right = 2 + index % side;
    const difference = value - left * right;
    return { left, right, zero: difference === 0 };
  });
  return (
    <Figure caption="Wormell's double product contains a zero factor exactly when x=ab for integers a,b at least two; that is exactly the composite case.">
      <label className="text-sm font-semibold text-primary">candidate x = {value}<input className="mt-2 w-full accent-current" type="range" min="2" max="15" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid gap-px" style={{ gridTemplateColumns: `repeat(${side}, minmax(0, 1fr))` }}>{cells.map((cell) => <div key={`${cell.left}-${cell.right}`} title={`(${value}−${cell.left}×${cell.right})²`} className={`aspect-square min-w-0 border ${cell.zero ? "border-danger bg-danger text-danger-foreground" : "border-border bg-background"}`} />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="zero factor" value={pair ? `${value}=${pair[0]}×${pair[1]}` : "none"} tone={pair ? "warning" : "success"} /><Stat label="B(x)" value={pair ? "0" : "positive integer"} /></div>
    </Figure>
  );
}

export function HD18WormellPredicateLab() {
  const [value, setValue] = useState(13);
  const productZero = firstFactorPair(value) !== null;
  const exponentParity = productZero ? "odd: 2^0 = 1" : "even: 2^B";
  const sign = productZero ? -1 : 1;
  return (
    <Figure caption="The parity switch (1 + (−1)^(2^B(x)))/2 maps B=0 to zero and every positive B to one without trigonometry.">
      <label className="text-sm font-semibold text-primary">x = {value}<input className="mt-2 w-full accent-current" type="range" min="2" max="30" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="B(x) class" value={productZero ? "zero" : "positive"} /><Stat label="2^B parity" value={exponentParity} /><Stat label="(−1)^(2^B)" value={sign.toString()} /><Stat label="prime predicate" value={((1 + sign) / 2).toString()} tone={sign === 1 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD18PrimeCountLab() {
  const [limit, setLimit] = useState(20);
  const primes = Array.from({ length: Math.max(0, limit - 1) }, (_, index) => index + 2).filter(isPrime);
  return (
    <Figure caption="Summing any exact prime predicate over x=2 through m produces the same staircase π(m); the predicate representation changes cost, not meaning.">
      <label className="text-sm font-semibold text-primary">m = {limit}<input className="mt-2 w-full accent-current" type="range" min="2" max="40" value={limit} onChange={(event) => setLimit(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{Array.from({ length: limit - 1 }, (_, index) => index + 2).map((value) => <span key={value} className={`border px-2 py-1 font-mono text-xs ${isPrime(value) ? "border-success text-success" : "border-border text-secondary"}`}>{value}</span>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="π(m)" value={primes.length.toString()} tone="success" /><Stat label="largest counted prime" value={primes.at(-1)?.toString() ?? "none"} /></div>
    </Figure>
  );
}

export function HD18FormulaFunctionClosureLab() {
  const [left, setLeft] = useState(3);
  const [right, setRight] = useState(2);
  const [operation, setOperation] = useState("compose");
  const value = operation === "add" ? left + right : operation === "multiply" ? left * right : (left + right) ** 2 - left * right;
  return (
    <Figure caption="Constants, projections, addition, subtraction, multiplication, and composition build a closed expression language, but syntax closure says nothing about efficiency.">
      <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">x = {left}<input className="mt-2 w-full accent-current" type="range" min="-6" max="6" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {right}<input className="mt-2 w-full accent-current" type="range" min="-6" max="6" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">constructor<select className="mt-2 block w-full border border-border bg-background p-2" value={operation} onChange={(event) => setOperation(event.target.value)}><option value="add">x+y</option><option value="multiply">xy</option><option value="compose">(x+y)^2−xy</option></select></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="projection x" value={left.toString()} /><Stat label="projection y" value={right.toString()} /><Stat label="formula result" value={value.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD18PredicateToSearchLab() {
  const [index, setIndex] = useState(4);
  const target = nthPrime(index);
  const rows = Array.from({ length: target + 3 }, (_, value) => ({ value, count: primePi(value), active: primePi(value) < index }));
  return (
    <Figure caption="A difficult value function can be reconstructed from a predicate by bounded counting: count every m before the first prefix that reaches n successes.">
      <label className="text-sm font-semibold text-primary">target success n = {index}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
      <div className="mt-4 flex items-end gap-1 overflow-x-auto pb-2">{rows.map((row) => <div key={row.value} className="w-8 shrink-0 text-center"><div className={`border ${row.active ? "border-accent bg-accent/15" : "border-border"}`} style={{ height: `${16 + 10 * row.count}px` }} /><div className="mt-1 font-mono text-xs text-secondary">{row.value}</div></div>)}</div>
      <div className="grid grid-cols-2 gap-2"><Stat label="first π(m)=n" value={target.toString()} tone="success" /><Stat label="1 + active count" value={(1 + rows.filter((row) => row.value >= 1 && row.active).length).toString()} /></div>
    </Figure>
  );
}

export function HD18CostExplosionLab() {
  const [index, setIndex] = useState(6);
  const upper = 2 ** index;
  let logFactorial = 0;
  for (let value = 2; value < upper; value += 1) logFactorial += Math.log10(value);
  const predicateCalls = upper * (upper + 1) / 2;
  return (
    <Figure caption="Literal evaluation nests prefix sums and factorial predicates; exact notation is compact while its expanded work and intermediate integers explode.">
      <label className="text-sm font-semibold text-primary">n = {index}<input className="mt-2 w-full accent-current" type="range" min="1" max="10" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="outer bound" value={upper.toLocaleString()} /><Stat label="nested F calls" value={predicateCalls.toLocaleString()} tone="warning" /><Stat label={`digits of (${upper - 1})!`} value={(Math.floor(logFactorial) + 1).toLocaleString()} /><Stat label="reference p_n" value={nthPrime(index).toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD18ReferenceSieveLab() {
  const [limit, setLimit] = useState(64);
  const flags = Array(limit + 1).fill(true) as boolean[];
  flags[0] = false;
  if (limit >= 1) flags[1] = false;
  let marks = 0;
  for (let prime = 2; prime * prime <= limit; prime += 1) {
    if (!flags[prime]) continue;
    for (let multiple = prime * prime; multiple <= limit; multiple += prime) {
      if (flags[multiple]) marks += 1;
      flags[multiple] = false;
    }
  }
  return (
    <Figure caption="A sieve is the engineering reference: it shares the prime predicate's result but reuses divisibility information instead of expanding a closed formula literally.">
      <label className="text-sm font-semibold text-primary">limit = {limit}<input className="mt-2 w-full accent-current" type="range" min="16" max="160" step="8" value={limit} onChange={(event) => setLimit(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="range size" value={(limit + 1).toString()} /><Stat label="composite marks" value={marks.toString()} /><Stat label="prime count" value={flags.filter(Boolean).length.toString()} tone="success" /><Stat label="π(limit) reference" value={primePi(limit).toString()} /></div>
    </Figure>
  );
}

export function HD18FormulaCertificateLab() {
  const [domain, setDomain] = useState(true);
  const [proof, setProof] = useState(false);
  const [vectors, setVectors] = useState(true);
  const [cost, setCost] = useState(false);
  const complete = domain && proof && vectors && cost;
  return (
    <Figure caption="A formula claim is complete only with a domain, a predicate proof, exact known vectors, and an honest evaluation-cost analysis.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={domain} onChange={(event) => setDomain(event.target.checked)} />domain</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={proof} onChange={(event) => setProof(event.target.checked)} />proof</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={vectors} onChange={(event) => setVectors(event.target.checked)} />vectors</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={cost} onChange={(event) => setCost(event.target.checked)} />cost</label></div>
      <div className="mt-4"><Stat label="formula certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
