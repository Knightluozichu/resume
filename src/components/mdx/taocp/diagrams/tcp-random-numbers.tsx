"use client";

import { useMemo, useState, type ReactNode } from "react";

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

function lcg(seed: number, multiplier: number, increment: number, modulus: number, count: number) {
  const values: number[] = [];
  let state = ((seed % modulus) + modulus) % modulus;
  for (let index = 0; index < count; index += 1) {
    state = (multiplier * state + increment) % modulus;
    values.push(state);
  }
  return values;
}

function xorshift(seed: number) {
  let state = seed >>> 0 || 0x9e3779b9;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 2 ** 32;
  };
}

export function TcpLcgLab() {
  const [seed, setSeed] = useState(1);
  const [multiplier, setMultiplier] = useState(5);
  const [increment, setIncrement] = useState(1);
  const modulus = 16;
  const values = lcg(seed, multiplier, increment, modulus, 16);
  return (
    <Figure caption="A linear congruential generator is a deterministic state machine; changing seed or parameters changes the orbit, not the recurrence law.">
      <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">seed = {seed}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="15" value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">a = {multiplier}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="15" value={multiplier} onChange={(event) => setMultiplier(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">c = {increment}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="15" value={increment} onChange={(event) => setIncrement(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-8 gap-1">{values.map((value, index) => <div key={index} className="border border-border bg-background p-2 text-center font-mono text-xs text-primary">{value}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="distinct states" value={new Set(values).size.toString()} /><Stat label="modulus" value={modulus.toString()} tone="success" /></div>
    </Figure>
  );
}

function orbitLength(seed: number, a: number, c: number, m: number) {
  const seen = new Map<number, number>();
  let state = seed % m;
  let step = 0;
  while (!seen.has(state)) {
    seen.set(state, step++);
    state = (a * state + c) % m;
  }
  return { prefix: seen.get(state)!, period: step - seen.get(state)! };
}

export function TcpPeriodLab() {
  const [multiplier, setMultiplier] = useState(5);
  const [increment, setIncrement] = useState(1);
  const result = orbitLength(0, multiplier, increment, 16);
  return (
    <Figure caption="Finite state guarantees eventual repetition; full period means the orbit visits every residue before returning, a necessary but insufficient quality condition.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">a = {multiplier}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="15" value={multiplier} onChange={(event) => setMultiplier(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">c = {increment}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="15" value={increment} onChange={(event) => setIncrement(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="transient prefix" value={result.prefix.toString()} /><Stat label="period" value={result.period.toString()} tone={result.period === 16 ? "success" : "warning"} /><Stat label="full-period" value={result.period === 16 ? "yes" : "no"} tone={result.period === 16 ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function TcpLatticeLab() {
  const [multiplier, setMultiplier] = useState(1103515245);
  const values = lcg(1, multiplier, 12345, 2 ** 31, 257);
  const points = values.slice(0, -1).map((value, index) => `${20 + (value / 2 ** 31) * 560},${200 - (values[index + 1] / 2 ** 31) * 170}`).join(" ");
  return (
    <Figure caption="Plotting consecutive outputs exposes lattice structure that a one-dimensional histogram cannot see; recurrence parameters determine the visible planes.">
      <label className="text-sm font-semibold text-primary">multiplier family<select className="mt-2 block w-full border border-border bg-background p-2" value={multiplier} onChange={(event) => setMultiplier(Number(event.target.value))}><option value="1103515245">classic 31-bit parameters</option><option value="65539">RANDU multiplier</option><option value="1664525">32-bit family</option></select></label>
      <svg className="mt-4 h-auto w-full border border-border bg-background" viewBox="0 0 600 220" role="img" aria-label="scatter plot of consecutive LCG outputs"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="0" />{values.slice(0, -1).map((value, index) => <circle key={index} cx={20 + (value / 2 ** 31) * 560} cy={200 - (values[index + 1] / 2 ** 31) * 170} r="2" fill="currentColor" className="text-accent" />)}</svg>
      <div className="mt-4"><Stat label="plotted pairs" value="256" tone="success" /></div>
    </Figure>
  );
}

function frequency(seed: number, count: number, buckets: number) {
  const next = xorshift(seed);
  const values = Array.from({ length: buckets }, () => 0);
  for (let index = 0; index < count; index += 1) values[Math.floor(next() * buckets)] += 1;
  return values;
}

export function TcpFrequencyTestLab() {
  const [seed, setSeed] = useState(7);
  const [count, setCount] = useState(512);
  const buckets = useMemo(() => frequency(seed, count, 8), [seed, count]);
  const expected = count / 8;
  const chiSquare = buckets.reduce((sum, value) => sum + (value - expected) ** 2 / expected, 0);
  return (
    <Figure caption="A frequency test compares observed bucket counts with a uniform expectation; the statistic is evidence against a model, not proof of randomness.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">seed = {seed}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="99" value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">samples = {count}<input className="mt-2 h-11 w-full accent-current" type="range" min="64" max="2048" step="64" value={count} onChange={(event) => setCount(Number(event.target.value))} /></label></div>
      <div className="mt-4 flex h-40 items-end gap-2 border border-border bg-background p-2">{buckets.map((value, index) => <div key={index} className="flex-1 bg-accent/70" style={{ height: `${Math.max(2, value / Math.max(...buckets) * 100)}%` }} title={`bucket ${index}: ${value}`} />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="expected / bucket" value={expected.toFixed(1)} /><Stat label="chi-square" value={chiSquare.toFixed(3)} tone="success" /></div>
    </Figure>
  );
}

export function TcpSerialTestLab() {
  const [lag, setLag] = useState(1);
  const values = lcg(3, 109, 37, 1024, 1024 + lag);
  const bins = Array.from({ length: 64 }, () => 0);
  for (let index = 0; index < 1024; index += 1) bins[Math.floor(values[index] / 128) * 8 + Math.floor(values[index + lag] / 128)] += 1;
  const expected = 16;
  const statistic = bins.reduce((sum, value) => sum + (value - expected) ** 2 / expected, 0);
  return (
    <Figure caption="A serial test bins pairs separated by a chosen lag; uniform marginals can coexist with strongly nonuniform transitions.">
      <label className="text-sm font-semibold text-primary">lag = {lag}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="8" value={lag} onChange={(event) => setLag(Number(event.target.value))} /></label>
      <div className="mt-4 grid aspect-square max-w-[26rem] grid-cols-8 gap-1">{bins.map((value, index) => <div key={index} className={`aspect-square border ${value > expected * 1.5 ? "border-warning bg-warning/30" : "border-border bg-accent/15"}`} title={`pair bin ${index}: ${value}`} />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="pair bins" value="64" /><Stat label="serial statistic" value={statistic.toFixed(2)} tone="warning" /></div>
    </Figure>
  );
}

export function TcpRunsTestLab() {
  const [seed, setSeed] = useState(11);
  const next = xorshift(seed);
  const bits = Array.from({ length: 64 }, () => next() >= 0.5 ? 1 : 0);
  const runs = 1 + bits.slice(1).filter((bit, index) => bit !== bits[index]).length;
  return (
    <Figure caption="A runs test ignores exact magnitudes and asks how often a binary classification changes; too few or too many runs signals dependence.">
      <label className="text-sm font-semibold text-primary">seed = {seed}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="99" value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-16 gap-1">{bits.map((bit, index) => <div key={index} className={`aspect-square border ${bit ? "border-success bg-success/30" : "border-border bg-background"}`} />)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="zeros" value={bits.filter((bit) => bit === 0).length.toString()} /><Stat label="ones" value={bits.filter((bit) => bit === 1).length.toString()} /><Stat label="runs" value={runs.toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpDistributionLab() {
  const [u, setU] = useState(0.5);
  const [rate, setRate] = useState(1.5);
  const exponential = -Math.log1p(-u) / rate;
  return (
    <Figure caption="Inverse transformation converts a uniform variate through a target quantile; endpoint policy is essential because logarithms diverge at u=1.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">uniform u = {u.toFixed(3)}<input className="mt-2 h-11 w-full accent-current" type="range" min="0.001" max="0.999" step="0.001" value={u} onChange={(event) => setU(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">rate lambda = {rate.toFixed(1)}<input className="mt-2 h-11 w-full accent-current" type="range" min="0.1" max="5" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="u" value={u.toFixed(6)} /><Stat label="−ln(1−u)" value={(-Math.log1p(-u)).toFixed(6)} /><Stat label="sample x" value={exponential.toFixed(6)} tone="success" /></div>
    </Figure>
  );
}

export function TcpRejectionLab() {
  const [samples, setSamples] = useState(1000);
  const next = xorshift(12345);
  let accepted = 0;
  for (let index = 0; index < samples; index += 1) {
    const x = next();
    const y = next();
    if (x * x + y * y <= 1) accepted += 1;
  }
  return (
    <Figure caption="Rejection sampling draws from an easy proposal and keeps points inside a target region; acceptance rate controls work per output sample.">
      <label className="text-sm font-semibold text-primary">proposals = {samples}<input className="mt-2 h-11 w-full accent-current" type="range" min="100" max="10000" step="100" value={samples} onChange={(event) => setSamples(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="accepted" value={accepted.toString()} /><Stat label="acceptance" value={(accepted / samples).toFixed(4)} /><Stat label="4 × rate" value={(4 * accepted / samples).toFixed(5)} tone="success" /></div>
    </Figure>
  );
}

function shuffled(size: number, seed: number) {
  const values = Array.from({ length: size }, (_, index) => index + 1);
  const next = xorshift(seed);
  for (let index = size - 1; index > 0; index -= 1) {
    const chosen = Math.floor(next() * (index + 1));
    [values[index], values[chosen]] = [values[chosen], values[index]];
  }
  return values;
}

export function TcpShuffleLab() {
  const [seed, setSeed] = useState(17);
  const values = shuffled(10, seed);
  return (
    <Figure caption="Fisher–Yates chooses uniformly among the remaining positions at each step; shrinking the choice range is what makes all permutations equiprobable.">
      <label className="text-sm font-semibold text-primary">seed = {seed}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="99" value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-10 gap-1">{values.map((value) => <div key={value} className="border border-border bg-background p-2 text-center font-mono text-sm text-primary">{value}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="permutation" value={values.join(" ")} /><Stat label="unique items" value={new Set(values).size.toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpReservoirLab() {
  const [seen, setSeen] = useState(20);
  const [capacity, setCapacity] = useState(4);
  const next = xorshift(91);
  const reservoir: number[] = [];
  for (let item = 1; item <= seen; item += 1) {
    if (item <= capacity) reservoir.push(item);
    else {
      const chosen = Math.floor(next() * item);
      if (chosen < capacity) reservoir[chosen] = item;
    }
  }
  return (
    <Figure caption="Reservoir sampling keeps k uniform items from an unknown-length stream using O(k) memory; item i is admitted with probability k/i.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">stream items = {seen}<input className="mt-2 h-11 w-full accent-current" type="range" min="4" max="100" value={seen} onChange={(event) => setSeen(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">reservoir k = {capacity}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="10" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-5 gap-2">{reservoir.map((value, index) => <Stat key={index} label={`slot ${index}`} value={value.toString()} tone="success" />)}</div>
    </Figure>
  );
}

export function TcpRandomSequenceLab() {
  const [mode, setMode] = useState<"alternating" | "lcg" | "xorshift">("alternating");
  const sequence = mode === "alternating" ? Array.from({ length: 32 }, (_, index) => index % 2) : mode === "lcg" ? lcg(1, 5, 1, 16, 32).map((value) => value & 1) : (() => { const next = xorshift(42); return Array.from({ length: 32 }, () => next() >= 0.5 ? 1 : 0); })();
  const runs = 1 + sequence.slice(1).filter((bit, index) => bit !== sequence[index]).length;
  return (
    <Figure caption="Equal zero/one counts do not imply a random-looking sequence; alternation passes frequency perfectly while failing dependence-sensitive tests.">
      <label className="text-sm font-semibold text-primary">sequence<select className="mt-2 block w-full border border-border bg-background p-2" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="alternating">0101 deterministic</option><option value="lcg">LCG low bit</option><option value="xorshift">xorshift high threshold</option></select></label>
      <div className="mt-4 grid grid-cols-16 gap-1">{sequence.map((bit, index) => <div key={index} className={`aspect-square border ${bit ? "border-success bg-success/30" : "border-border bg-background"}`} />)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="ones" value={sequence.filter(Boolean).length.toString()} /><Stat label="runs" value={runs.toString()} /><Stat label="predictable by count?" value="not decidable" tone="warning" /></div>
    </Figure>
  );
}

export function TcpRandomCertificateLab() {
  const [state, setState] = useState(true);
  const [period, setPeriod] = useState(false);
  const [tests, setTests] = useState(true);
  const [replay, setReplay] = useState(false);
  const complete = state && period && tests && replay;
  return (
    <Figure caption="A pseudorandom certificate records state transition and period evidence, a battery of prespecified tests, and exact replay metadata.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={state} onChange={(event) => setState(event.target.checked)} />state rule</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={period} onChange={(event) => setPeriod(event.target.checked)} />period</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={tests} onChange={(event) => setTests(event.target.checked)} />test battery</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={replay} onChange={(event) => setReplay(event.target.checked)} />seed + version</label></div>
      <div className="mt-4"><Stat label="random-stream certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
