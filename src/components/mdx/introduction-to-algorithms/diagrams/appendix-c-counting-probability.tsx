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

function factorial(n: number) {
  let value = 1;
  for (let index = 2; index <= n; index += 1) value *= index;
  return value;
}

function choose(n: number, k: number) {
  if (k < 0 || k > n) return 0;
  const small = Math.min(k, n - k);
  let value = 1;
  for (let index = 1; index <= small; index += 1) value = value * (n - small + index) / index;
  return Math.round(value);
}

export function CLRS4CountingRuleLab() {
  const [first, setFirst] = useState(3);
  const [second, setSecond] = useState(4);
  return (
    <Figure caption="Mutually exclusive alternatives add, while sequential independent choices multiply; the rule follows the structure of the construction.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">first choice count = {first}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={first} onChange={(event) => setFirst(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">second choice count = {second}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={second} onChange={(event) => setSecond(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="alternative total" value={(first + second).toString()} /><Stat label="two-stage total" value={(first * second).toString()} tone="success" /><Stat label="structure" value="sum vs product" /></div>
    </Figure>
  );
}

export function CLRS4PermutationLab() {
  const [n, setN] = useState(6);
  const [k, setK] = useState(3);
  const boundedK = Math.min(k, n);
  const permutations = factorial(n) / factorial(n - boundedK);
  const combinations = choose(n, boundedK);
  return (
    <Figure caption="Ordered k-selections count permutations n!/(n−k)!, while unordered selections divide out the k! internal orderings.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">objects n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="10" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">selected k = {boundedK}<input className="mt-2 w-full accent-current" type="range" min="0" max={n} value={boundedK} onChange={(event) => setK(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="ordered P(n,k)" value={permutations.toLocaleString()} /><Stat label="unordered C(n,k)" value={combinations.toLocaleString()} tone="success" /><Stat label="order multiplier" value={factorial(boundedK).toLocaleString()} /></div>
    </Figure>
  );
}

export function CLRS4BinomialCoefficientLab() {
  const [n, setN] = useState(8);
  const [k, setK] = useState(3);
  const boundedK = Math.min(k, n);
  return (
    <Figure caption="Binomial coefficients count k-subsets, are symmetric in k and n−k, and satisfy Pascal's recurrence.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="20" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">k = {boundedK}<input className="mt-2 w-full accent-current" type="range" min="0" max={n} value={boundedK} onChange={(event) => setK(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="C(n,k)" value={choose(n, boundedK).toLocaleString()} tone="success" /><Stat label="C(n,n−k)" value={choose(n, n - boundedK).toLocaleString()} /><Stat label="Pascal sum" value={(choose(n - 1, boundedK - 1) + choose(n - 1, boundedK)).toLocaleString()} /></div>
    </Figure>
  );
}

export function CLRS4ProbabilitySpaceLab() {
  const [faces, setFaces] = useState(6);
  const [threshold, setThreshold] = useState(4);
  const favorable = Math.max(0, faces - threshold + 1);
  return (
    <Figure caption="For equally likely finite outcomes, event probability is favorable outcome count divided by sample-space size.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">die faces = {faces}<input className="mt-2 w-full accent-current" type="range" min="2" max="20" value={faces} onChange={(event) => setFaces(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">event result ≥ {Math.min(threshold, faces)}<input className="mt-2 w-full accent-current" type="range" min="1" max={faces} value={Math.min(threshold, faces)} onChange={(event) => setThreshold(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="sample space" value={faces.toString()} /><Stat label="favorable" value={favorable.toString()} /><Stat label="probability" value={(favorable / faces).toFixed(3)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ConditionalProbabilityLab() {
  const [intersection, setIntersection] = useState(20);
  const [condition, setCondition] = useState(40);
  const validIntersection = Math.min(intersection, condition);
  return (
    <Figure caption="Conditioning restricts the sample space to B, so P(A|B) is the A∩B mass divided by the B mass.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">P(A∩B) percent = {validIntersection}<input className="mt-2 w-full accent-current" type="range" min="0" max={condition} value={validIntersection} onChange={(event) => setIntersection(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">P(B) percent = {condition}<input className="mt-2 w-full accent-current" type="range" min="1" max="100" value={condition} onChange={(event) => setCondition(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="joint mass" value={`${validIntersection}%`} /><Stat label="condition mass" value={`${condition}%`} /><Stat label="P(A|B)" value={(validIntersection / condition).toFixed(3)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4BayesLab() {
  const [prevalence, setPrevalence] = useState(0.1);
  const sensitivity = 0.9;
  const falsePositive = 0.05;
  const positive = sensitivity * prevalence + falsePositive * (1 - prevalence);
  const posterior = sensitivity * prevalence / positive;
  return (
    <Figure caption="Bayes' rule combines likelihood and prior; a high-sensitivity test can still have a modest posterior when the prior event is rare.">
      <label className="text-sm font-semibold text-primary">prior P(H) = {prevalence.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.01" max="0.8" step="0.01" value={prevalence} onChange={(event) => setPrevalence(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="P(+|H)" value={sensitivity.toString()} /><Stat label="P(+)" value={positive.toFixed(3)} /><Stat label="P(H|+)" value={posterior.toFixed(3)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4IndependenceLab() {
  const [joint, setJoint] = useState(0.24);
  const pA = 0.4;
  const pB = 0.6;
  const product = pA * pB;
  const independent = Math.abs(joint - product) < 0.005;
  return (
    <Figure caption="Events A and B are independent exactly when their joint probability factors as P(A)P(B); disjoint nonempty events are not independent.">
      <label className="text-sm font-semibold text-primary">joint P(A∩B) = {joint.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="0.4" step="0.01" value={joint} onChange={(event) => setJoint(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="P(A)P(B)" value={product.toFixed(2)} /><Stat label="joint" value={joint.toFixed(2)} /><Stat label="independent" value={independent ? "yes" : "no"} tone={independent ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4UnionBoundLab() {
  const [events, setEvents] = useState(4);
  const each = 0.03;
  const bound = Math.min(1, events * each);
  const independentExact = 1 - (1 - each) ** events;
  return (
    <Figure caption="The union bound needs no independence and upper-bounds any failure by the sum of individual failure probabilities.">
      <label className="text-sm font-semibold text-primary">failure events = {events}<input className="mt-2 w-full accent-current" type="range" min="1" max="20" value={events} onChange={(event) => setEvents(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="each probability" value={each.toString()} /><Stat label="union bound" value={bound.toFixed(3)} tone="success" /><Stat label="if independent" value={independentExact.toFixed(3)} /></div>
    </Figure>
  );
}

const diePmf = [1, 2, 3, 4, 5, 6].map((value) => ({ value, probability: 1 / 6 }));

export function CLRS4RandomVariablePMFLab() {
  const [threshold, setThreshold] = useState(4);
  const cdf = diePmf.filter((item) => item.value <= threshold).reduce((sum, item) => sum + item.probability, 0);
  return (
    <Figure caption="A discrete random variable maps outcomes to numeric values; its PMF sums to one and its CDF accumulates mass up to a threshold.">
      <label className="text-sm font-semibold text-primary">CDF threshold x = {threshold}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="support" value="1,2,3,4,5,6" /><Stat label="PMF mass" value="1.000" tone="success" /><Stat label="F(x)" value={cdf.toFixed(3)} /></div>
    </Figure>
  );
}

export function CLRS4ExpectationLab() {
  const [probability, setProbability] = useState(0.3);
  const trials = 10;
  const expectation = trials * probability;
  return (
    <Figure caption="Linearity of expectation gives E[ΣXᵢ]=ΣE[Xᵢ] even when the random variables are dependent.">
      <label className="text-sm font-semibold text-primary">indicator success p = {probability.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="1" step="0.05" value={probability} onChange={(event) => setProbability(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="indicators" value={trials.toString()} /><Stat label="each expectation" value={probability.toFixed(2)} /><Stat label="sum expectation" value={expectation.toFixed(2)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4VarianceLab() {
  const [probability, setProbability] = useState(0.5);
  const mean = probability;
  const variance = probability * (1 - probability);
  return (
    <Figure caption="A Bernoulli variable has mean p and variance p(1−p); variance measures squared spread and peaks at p=1/2.">
      <label className="text-sm font-semibold text-primary">Bernoulli p = {probability.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="1" step="0.05" value={probability} onChange={(event) => setProbability(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="mean" value={mean.toFixed(3)} /><Stat label="variance" value={variance.toFixed(3)} tone="success" /><Stat label="std deviation" value={Math.sqrt(variance).toFixed(3)} /></div>
    </Figure>
  );
}

export function CLRS4GeometricDistributionLab() {
  const [probability, setProbability] = useState(0.25);
  const [trial, setTrial] = useState(4);
  const mass = (1 - probability) ** (trial - 1) * probability;
  return (
    <Figure caption="A geometric variable counts trials until the first success; memorylessness comes from repeated independent Bernoulli failures.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">success p = {probability.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.05" max="0.95" step="0.05" value={probability} onChange={(event) => setProbability(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">first success k = {trial}<input className="mt-2 w-full accent-current" type="range" min="1" max="15" value={trial} onChange={(event) => setTrial(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="P(X=k)" value={mass.toFixed(4)} /><Stat label="E[X]" value={(1 / probability).toFixed(2)} tone="success" /><Stat label="tail P(X>k)" value={((1 - probability) ** trial).toFixed(4)} /></div>
    </Figure>
  );
}

export function CLRS4BinomialDistributionLab() {
  const [n, setN] = useState(10);
  const [k, setK] = useState(3);
  const [probability, setProbability] = useState(0.3);
  const boundedK = Math.min(k, n);
  const mass = choose(n, boundedK) * probability ** boundedK * (1 - probability) ** (n - boundedK);
  return (
    <Figure caption="A binomial variable counts successes in n independent Bernoulli trials, combining C(n,k) success positions with their probabilities.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">k = {boundedK}<input className="mt-2 w-full accent-current" type="range" min="0" max={n} value={boundedK} onChange={(event) => setK(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">p = {probability.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.05" max="0.95" step="0.05" value={probability} onChange={(event) => setProbability(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="P(X=k)" value={mass.toFixed(5)} /><Stat label="mean np" value={(n * probability).toFixed(2)} tone="success" /><Stat label="variance np(1−p)" value={(n * probability * (1 - probability)).toFixed(2)} /></div>
    </Figure>
  );
}

export function CLRS4BinomialTailLab() {
  const [n, setN] = useState(40);
  const probability = 0.5;
  const [delta, setDelta] = useState(0.4);
  const mean = n * probability;
  const threshold = (1 + delta) * mean;
  const bound = Math.exp(-delta * delta * mean / 3);
  return (
    <Figure caption="A multiplicative Chernoff upper tail decays exponentially in δ²μ for independent Bernoulli sums and 0<δ≤1.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">trials n = {n}<input className="mt-2 w-full accent-current" type="range" min="10" max="200" step="10" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">deviation δ = {delta.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.05" max="1" step="0.05" value={delta} onChange={(event) => setDelta(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="mean μ" value={mean.toFixed(1)} /><Stat label="threshold (1+δ)μ" value={threshold.toFixed(1)} /><Stat label="Chernoff bound" value={bound.toExponential(2)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4TailComparisonLab() {
  const [standardDeviations, setStandardDeviations] = useState(3);
  const chebyshev = 1 / standardDeviations ** 2;
  const gaussianLike = 2 * Math.exp(-(standardDeviations ** 2) / 3);
  return (
    <Figure caption="Chebyshev uses only variance and is broadly applicable; Chernoff uses independence and bounded trials to obtain exponentially smaller tails.">
      <label className="text-sm font-semibold text-primary">deviation scale = {standardDeviations} units<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={standardDeviations} onChange={(event) => setStandardDeviations(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Chebyshev-style" value={chebyshev.toExponential(2)} /><Stat label="Chernoff-style" value={gaussianLike.toExponential(2)} tone="success" /><Stat label="extra premise" value="independent bounded trials" /></div>
    </Figure>
  );
}

export function CLRS4ProbabilityCertificateLab() {
  const [space, setSpace] = useState(true);
  const [dependence, setDependence] = useState(false);
  const [guarantee, setGuarantee] = useState(true);
  const complete = space && dependence && guarantee;
  return (
    <Figure caption="A probability certificate records the sample space, random variables, dependence assumptions, parameterization, and exact type of tail guarantee.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={space} onChange={(event) => setSpace(event.target.checked)} />sample space</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={dependence} onChange={(event) => setDependence(event.target.checked)} />dependence</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={guarantee} onChange={(event) => setGuarantee(event.target.checked)} />guarantee</label></div>
      <div className="mt-4"><Stat label="probability argument" value={complete ? "auditable" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
