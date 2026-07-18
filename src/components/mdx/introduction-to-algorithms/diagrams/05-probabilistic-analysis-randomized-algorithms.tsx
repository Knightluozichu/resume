"use client";

import { useMemo, useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><Caption>{caption}</Caption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-base">{value}</div></div>;
}

function harmonic(n: number) {
  let sum = 0;
  for (let i = 1; i <= n; i += 1) sum += 1 / i;
  return sum;
}

export function CLRS4HiringTraceLab() {
  const [seen, setSeen] = useState(1);
  const ranks = [3, 1, 5, 2, 8, 6, 9, 4, 10, 7];
  let best = 0;
  const records = ranks.map((rank, index) => {
    const hired = index < seen && rank > best;
    if (index < seen) best = Math.max(best, rank);
    return { rank, hired };
  });
  return (
    <Figure caption="HIRE-ASSISTANT hires exactly the record-breaking candidates encountered so far; input order determines how often replacement occurs.">
      <label className="text-sm font-semibold text-primary">candidates interviewed = {seen}<input className="mt-2 w-full accent-current" type="range" min="1" max={ranks.length} value={seen} onChange={(event) => setSeen(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">{records.map((item, index) => <div key={index} className={`border p-2 text-center ${index >= seen ? "border-border text-secondary" : item.hired ? "border-success bg-success/10 text-success" : "border-warning text-warning"}`}><div className="font-mono">{item.rank}</div><div className="text-[10px]">{item.hired ? "hire" : index < seen ? "skip" : "wait"}</div></div>)}</div>
    </Figure>
  );
}

export function CLRS4HiringCostLab() {
  const [n, setN] = useState(100);
  const [hireCost, setHireCost] = useState(20);
  const expectedHires = harmonic(n);
  return (
    <Figure caption="Expected total cost separates n unavoidable interviews from approximately ln n expensive hires under a uniformly random order.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">candidates n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="500" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-sm text-primary">hire / interview cost = {hireCost}<input className="mt-2 w-full accent-current" type="range" min="1" max="100" value={hireCost} onChange={(event) => setHireCost(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="expected hires Hn" value={expectedHires.toFixed(2)} tone="success" /><Stat label="expected cost" value={(n + hireCost * expectedHires).toFixed(1)} /><Stat label="worst cost" value={(n + hireCost * n).toLocaleString()} tone="danger" /></div>
    </Figure>
  );
}

export function CLRS4RecordProbabilityLab() {
  const [i, setI] = useState(8);
  return (
    <Figure caption="Among the first i candidates in a random permutation, each is equally likely to be best, so candidate i sets a new record with probability 1/i.">
      <label className="text-sm font-semibold text-primary">candidate position i = {i}<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={i} onChange={(event) => setI(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="possible best positions" value={i.toString()} /><Stat label="favorable position" value="1" tone="warning" /><Stat label="P(candidate i hired)" value={`1/${i} = ${(1 / i).toFixed(3)}`} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4IndicatorSumLab() {
  const [n, setN] = useState(20);
  const bars = Array.from({ length: Math.min(n, 20) }, (_, index) => 1 / (index + 1));
  return (
    <Figure caption="Linearity of expectation sums individual record probabilities even though the hire indicators are not independent.">
      <label className="text-sm font-semibold text-primary">number of indicators n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="100" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 flex h-28 items-end gap-1">{bars.map((value, index) => <div key={index} className="min-w-0 flex-1 bg-accent" style={{ height: `${100 * value}%` }} title={`E[I${index + 1}] = ${value.toFixed(3)}`} />)}</div>
      <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="Σ E[Iᵢ]" value={harmonic(n).toFixed(3)} tone="success" /><Stat label="approximation" value={`ln n + γ ≈ ${(Math.log(n) + 0.577).toFixed(3)}`} /></div>
    </Figure>
  );
}

export function CLRS4RandomnessBoundaryLab() {
  const [source, setSource] = useState<"input" | "algorithm">("algorithm");
  const rows = {
    input: ["probabilistic analysis", "assume a distribution over external inputs", "can fail if workload distribution changes"],
    algorithm: ["randomized algorithm", "take expectation over internal random bits", "guarantee can hold for every fixed input"],
  }[source];
  return (
    <Figure caption="Probabilistic analysis models uncertain input; randomized algorithms deliberately create a probability space inside the procedure.">
      <label className="text-sm font-semibold text-primary">source of randomness<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={source} onChange={(event) => setSource(event.target.value as typeof source)}><option value="input">input distribution</option><option value="algorithm">algorithm random bits</option></select></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="analysis type" value={rows[0]} /><Stat label="expectation over" value={rows[1]} tone="warning" /><Stat label="boundary" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

function seededShuffle(seed: number) {
  const values = [1, 2, 3, 4, 5, 6, 7, 8];
  let state = seed + 1;
  const next = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
  for (let i = 0; i < values.length; i += 1) {
    const j = i + Math.floor(next() * (values.length - i));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}

export function CLRS4FisherYatesLab() {
  const [seed, setSeed] = useState(3);
  const values = useMemo(() => seededShuffle(seed), [seed]);
  return (
    <Figure caption="RANDOMIZE-IN-PLACE chooses uniformly from the unfilled suffix, establishing a uniform random permutation by a loop invariant.">
      <label className="text-sm font-semibold text-primary">deterministic demo seed = {seed}<input className="mt-2 w-full accent-current" type="range" min="0" max="20" value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-8 gap-2">{values.map((value, index) => <div key={index} className="border border-accent p-3 text-center font-mono text-accent">{value}</div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">at step i, swap A[i] with A[random i…n]</div>
    </Figure>
  );
}

export function CLRS4PermutationUniformityLab() {
  const [step, setStep] = useState(3);
  const n = 6;
  const prefixProbability = 1 / Array.from({ length: step }, (_, index) => n - index).reduce((a, b) => a * b, 1);
  return (
    <Figure caption="After i shuffle steps, every ordered i-element prefix has probability (n-i)!/n!, yielding 1/n! for every complete permutation.">
      <label className="text-sm font-semibold text-primary">fixed prefix length i = {step}<input className="mt-2 w-full accent-current" type="range" min="1" max={n} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="total n" value={n.toString()} /><Stat label="prefix probability" value={prefixProbability.toFixed(5)} tone="warning" /><Stat label="complete probability" value={`1/${Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1)}`} tone="success" /></div>
    </Figure>
  );
}

function birthdayCollisionProbability(k: number, days: number) {
  let distinct = 1;
  for (let i = 0; i < k; i += 1) distinct *= Math.max(0, (days - i) / days);
  return 1 - distinct;
}

export function CLRS4BirthdayLab() {
  const [people, setPeople] = useState(23);
  const probability = birthdayCollisionProbability(people, 365);
  return (
    <Figure caption="Pair indicators explain the expected number of birthday matches; the exact no-collision product converts it to collision probability.">
      <label className="text-sm font-semibold text-primary">people = {people}<input className="mt-2 w-full accent-current" type="range" min="2" max="60" value={people} onChange={(event) => setPeople(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="pairs" value={(people * (people - 1) / 2).toString()} /><Stat label="expected matches" value={(people * (people - 1) / (2 * 365)).toFixed(3)} tone="warning" /><Stat label="P(any match)" value={`${(100 * probability).toFixed(1)}%`} tone={probability >= 0.5 ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function CLRS4BallsBinsLab() {
  const [balls, setBalls] = useState(20);
  const [bins, setBins] = useState(20);
  const emptyExpected = bins * (1 - 1 / bins) ** balls;
  return (
    <Figure caption="Occupancy indicators turn global balls-and-bins questions into sums of per-bin events with simple probabilities.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">balls = {balls}<input className="mt-2 w-full accent-current" type="range" min="1" max="100" value={balls} onChange={(event) => setBalls(Number(event.target.value))} /></label><label className="text-sm text-primary">bins = {bins}<input className="mt-2 w-full accent-current" type="range" min="2" max="100" value={bins} onChange={(event) => setBins(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="load average" value={(balls / bins).toFixed(2)} /><Stat label="P(a bin empty)" value={((1 - 1 / bins) ** balls).toFixed(3)} tone="warning" /><Stat label="expected empty bins" value={emptyExpected.toFixed(2)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4StreakOnlineLab() {
  const [scenario, setScenario] = useState<"streak" | "online">("streak");
  const rows = {
    streak: ["coin-toss streaks", "split into candidate windows", "longest run is Θ(lg n) with high probability"],
    online: ["online hiring", "observe sample, set threshold, then commit", "balances exploration and selection"],
  }[scenario];
  return (
    <Figure caption="Indicator variables support both repeated-window events such as streaks and threshold decisions such as online hiring.">
      <label className="text-sm font-semibold text-primary">application<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={scenario} onChange={(event) => setScenario(event.target.value as typeof scenario)}><option value="streak">streaks</option><option value="online">online hiring</option></select></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="problem" value={rows[0]} /><Stat label="indicator view" value={rows[1]} tone="warning" /><Stat label="conclusion" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}
