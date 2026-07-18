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

const clusterPoints = [1, 2, 3, 8, 9, 11];

function assignClusters(points: number[], centers: number[]) {
  return points.map((point) => {
    const distances = centers.map((center) => Math.abs(point - center));
    return distances[0] <= distances[1] ? 0 : 1;
  });
}

function clusterObjective(points: number[], centers: number[]) {
  const assignments = assignClusters(points, centers);
  return points.reduce((sum, point, index) => sum + (point - centers[assignments[index]]) ** 2, 0);
}

export function CLRS4ClusteringObjectiveLab() {
  const [leftCenter, setLeftCenter] = useState(2);
  const [rightCenter, setRightCenter] = useState(9);
  const centers = [leftCenter, rightCenter];
  const assignments = assignClusters(clusterPoints, centers);
  return (
    <Figure caption="The k-means objective assigns each point to its nearest center and sums squared distances to the selected centers.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">center μ₁ = {leftCenter}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={leftCenter} onChange={(event) => setLeftCenter(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">center μ₂ = {rightCenter}<input className="mt-2 w-full accent-current" type="range" min="5" max="13" value={rightCenter} onChange={(event) => setRightCenter(Number(event.target.value))} /></label></div>
      <div className="mt-4 flex flex-wrap gap-2">{clusterPoints.map((point, index) => <div key={point} className={`border p-3 font-mono text-sm ${assignments[index] === 0 ? "border-accent text-accent" : "border-warning text-warning"}`}>{point} → C{assignments[index] + 1}</div>)}</div>
      <div className="mt-4"><Stat label="sum of squared distances" value={clusterObjective(clusterPoints, centers).toFixed(1)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4AssignmentStepLab() {
  const [boundary, setBoundary] = useState(5.5);
  const left = clusterPoints.filter((point) => point <= boundary);
  const right = clusterPoints.filter((point) => point > boundary);
  return (
    <Figure caption="With centers fixed, the assignment step independently sends every point to its nearest center and cannot increase the objective.">
      <label className="text-sm font-semibold text-primary">Voronoi boundary = {boundary.toFixed(1)}<input className="mt-2 w-full accent-current" type="range" min="2" max="10" step="0.5" value={boundary} onChange={(event) => setBoundary(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="cluster 1" value={left.join(",") || "empty"} /><Stat label="cluster 2" value={right.join(",") || "empty"} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4CenterUpdateLab() {
  const [includeOutlier, setIncludeOutlier] = useState(false);
  const points = includeOutlier ? [1, 2, 3, 15] : [1, 2, 3];
  const mean = points.reduce((sum, point) => sum + point, 0) / points.length;
  return (
    <Figure caption="With assignments fixed, the arithmetic mean minimizes the sum of squared Euclidean distances within one cluster.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={includeOutlier} onChange={(event) => setIncludeOutlier(event.target.checked)} />include point 15</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="assigned points" value={points.join(",")} /><Stat label="updated center" value={mean.toFixed(2)} tone="success" /><Stat label="outlier sensitivity" value={includeOutlier ? "high" : "baseline"} tone={includeOutlier ? "warning" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4LloydIterationLab() {
  const [iteration, setIteration] = useState(1);
  const objectives = [122, 37, 11, 7, 7];
  return (
    <Figure caption="Lloyd's algorithm alternates assignment and center updates; every phase is nonincreasing, but the final point can be only a local optimum.">
      <label className="text-sm font-semibold text-primary">completed iterations = {iteration}<input className="mt-2 w-full accent-current" type="range" min="0" max={objectives.length - 1} value={iteration} onChange={(event) => setIteration(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-5 gap-2">{objectives.map((value, index) => <Stat key={index} label={`iter ${index}`} value={value.toString()} tone={index <= iteration ? "success" : "warning"} />)}</div>
    </Figure>
  );
}

export function CLRS4InitializationLab() {
  const [strategy, setStrategy] = useState<"poor" | "spread" | "restart">("spread");
  const details = {
    poor: ["centers 1,2", "objective 122", "same basin risk"],
    spread: ["centers 2,10", "objective 7", "good separation"],
    restart: ["8 seeded runs", "best objective 7", "extra work"],
  }[strategy];
  return (
    <Figure caption="Because k-means is nonconvex, initialization changes the basin reached; spread seeds or multiple restarts reduce but do not remove that dependence.">
      <label className="text-sm font-semibold text-primary">initialization<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={strategy} onChange={(event) => setStrategy(event.target.value as typeof strategy)}><option value="poor">two nearby centers</option><option value="spread">spread centers</option><option value="restart">multiple restarts</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{details.map((detail, index) => <Stat key={detail} label={["seed", "result", "tradeoff"][index]} value={detail} tone={index === 1 ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

const expertLosses = [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
  [0, 0, 1],
  [1, 0, 0],
];

function multiplicativeWeights(rounds: number, epsilon: number) {
  let weights = [1, 1, 1];
  let learnerLoss = 0;
  const expertTotals = [0, 0, 0];
  for (let t = 0; t < rounds; t += 1) {
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    learnerLoss += expertLosses[t].reduce((sum, loss, index) => sum + weights[index] / total * loss, 0);
    expertLosses[t].forEach((loss, index) => { expertTotals[index] += loss; });
    weights = weights.map((weight, index) => weight * (1 - epsilon * expertLosses[t][index]));
  }
  return { weights, learnerLoss, expertTotals };
}

export function CLRS4ExpertWeightsLab() {
  const [rounds, setRounds] = useState(3);
  const result = multiplicativeWeights(rounds, 0.35);
  const total = result.weights.reduce((sum, weight) => sum + weight, 0);
  return (
    <Figure caption="Multiplicative weights normalizes expert weights into a distribution, incurs expected loss, then downweights experts in proportion to observed loss.">
      <label className="text-sm font-semibold text-primary">observed rounds = {rounds}<input className="mt-2 w-full accent-current" type="range" min="0" max={expertLosses.length} value={rounds} onChange={(event) => setRounds(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{result.weights.map((weight, index) => <Stat key={index} label={`expert ${index + 1}`} value={`p=${(weight / total).toFixed(2)}`} tone="success" />)}</div>
    </Figure>
  );
}

export function CLRS4LearningRateLab() {
  const [epsilon, setEpsilon] = useState(0.3);
  const result = multiplicativeWeights(expertLosses.length, epsilon);
  return (
    <Figure caption="The MW learning rate controls how aggressively losses change weights: small values adapt slowly, while large values concentrate quickly and can overreact.">
      <label className="text-sm font-semibold text-primary">ε = {epsilon.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.05" max="0.9" step="0.05" value={epsilon} onChange={(event) => setEpsilon(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="final weights" value={result.weights.map((value) => value.toFixed(2)).join(",")} /><Stat label="learner loss" value={result.learnerLoss.toFixed(2)} tone="warning" /><Stat label="best expert loss" value={Math.min(...result.expertTotals).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4RegretLab() {
  const [experts, setExperts] = useState(8);
  const [rounds, setRounds] = useState(100);
  const bound = 2 * Math.sqrt(rounds * Math.log(experts));
  return (
    <Figure caption="A tuned multiplicative-weights analysis gives sublinear regret proportional to √(T log N), so average regret vanishes as rounds grow.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">experts N = {experts}<input className="mt-2 w-full accent-current" type="range" min="2" max="64" value={experts} onChange={(event) => setExperts(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">rounds T = {rounds}<input className="mt-2 w-full accent-current" type="range" min="10" max="500" step="10" value={rounds} onChange={(event) => setRounds(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="regret bound" value={bound.toFixed(1)} /><Stat label="average regret" value={(bound / rounds).toFixed(3)} tone="success" /><Stat label="expert dependence" value="log N" tone="accent" /></div>
    </Figure>
  );
}

export function CLRS4PotentialProofLab() {
  const [round, setRound] = useState(2);
  const result = multiplicativeWeights(round, 0.25);
  const potential = result.weights.reduce((sum, value) => sum + value, 0);
  return (
    <Figure caption="The total-weight potential has an upper bound from learner loss and a lower bound from the best surviving expert; combining them yields regret.">
      <label className="text-sm font-semibold text-primary">proof checkpoint round = {round}<input className="mt-2 w-full accent-current" type="range" min="0" max={expertLosses.length} value={round} onChange={(event) => setRound(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Φₜ=sum weights" value={potential.toFixed(3)} /><Stat label="learner cumulative" value={result.learnerLoss.toFixed(3)} tone="warning" /><Stat label="best expert cumulative" value={Math.min(...result.expertTotals).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4GradientStepLab() {
  const [step, setStep] = useState(4);
  const eta = 0.2;
  let x = -4;
  for (let i = 0; i < step; i += 1) x -= eta * 2 * (x - 3);
  const value = (x - 3) ** 2;
  return (
    <Figure caption="Gradient descent follows the negative derivative of f(x)=(x−3)²; each step reduces the distance when the learning rate is stable.">
      <label className="text-sm font-semibold text-primary">gradient steps = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="xₜ" value={x.toFixed(3)} /><Stat label="gradient" value={(2 * (x - 3)).toFixed(3)} tone="warning" /><Stat label="f(xₜ)" value={value.toFixed(3)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4GradientRateLab() {
  const [eta, setEta] = useState(0.2);
  let x = -4;
  const values: number[] = [];
  for (let i = 0; i < 8; i += 1) {
    values.push((x - 3) ** 2);
    x -= eta * 2 * (x - 3);
  }
  const stable = eta > 0 && eta < 1;
  return (
    <Figure caption="For this quadratic, too-large η overshoots and diverges; step-size guarantees depend on the objective's smoothness rather than one universal constant.">
      <label className="text-sm font-semibold text-primary">step size η = {eta.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.05" max="1.4" step="0.05" value={eta} onChange={(event) => setEta(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="loss trace" value={values.map((value) => value.toFixed(1)).join(" → ")} /><Stat label="behavior" value={stable ? "contracts" : "oscillates/diverges"} tone={stable ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4GradientVectorLab() {
  const [x, setX] = useState(3);
  const [y, setY] = useState(-2);
  const gradient = [2 * x, 4 * y];
  return (
    <Figure caption="For a multivariate differentiable objective, the gradient collects partial derivatives and the negative gradient is the steepest Euclidean descent direction.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {x}<input className="mt-2 w-full accent-current" type="range" min="-5" max="5" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {y}<input className="mt-2 w-full accent-current" type="range" min="-5" max="5" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="f=x²+2y²" value={(x * x + 2 * y * y).toString()} /><Stat label="∇f" value={`(${gradient[0]},${gradient[1]})`} tone="warning" /><Stat label="descent direction" value={`(${-gradient[0]},${-gradient[1]})`} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ConvexityLab() {
  const [lambda, setLambda] = useState(0.4);
  const x = -2;
  const y = 4;
  const point = lambda * x + (1 - lambda) * y;
  const functionValue = point ** 2;
  const chordValue = lambda * x ** 2 + (1 - lambda) * y ** 2;
  return (
    <Figure caption="Convexity places the function below every chord; for differentiable convex functions, any zero-gradient point is globally optimal.">
      <label className="text-sm font-semibold text-primary">convex combination λ = {lambda.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="1" step="0.05" value={lambda} onChange={(event) => setLambda(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="mixed point" value={point.toFixed(2)} /><Stat label="f(mix)" value={functionValue.toFixed(2)} tone="success" /><Stat label="chord bound" value={chordValue.toFixed(2)} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4StoppingLab() {
  const [gradientNorm, setGradientNorm] = useState(0.08);
  const [tolerance, setTolerance] = useState(0.1);
  const stop = gradientNorm <= tolerance;
  return (
    <Figure caption="A stopping rule should report gradient norm, objective change, iteration budget, and scale; a small training loss alone is not a convergence certificate.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">gradient norm = {gradientNorm.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="1" step="0.01" value={gradientNorm} onChange={(event) => setGradientNorm(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">tolerance = {tolerance.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.01" max="0.5" step="0.01" value={tolerance} onChange={(event) => setTolerance(Number(event.target.value))} /></label></div>
      <div className="mt-4"><Stat label="optimizer decision" value={stop ? "stop with evidence" : "continue"} tone={stop ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4MLCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "objective" | "seed" | "baseline" | "convergence">("valid");
  const checks = {
    "objective and distance/loss are explicit": issue !== "objective",
    "initialization and random seed are recorded": issue !== "seed",
    "result is compared with a baseline": issue !== "baseline",
    "stopping and convergence evidence are reported": issue !== "convergence",
  };
  return (
    <Figure caption="An algorithmic ML certificate records the objective, data geometry, initialization, update trace, baseline, regret or convergence evidence, and final limitations.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">audited training run</option><option value="objective">implicit objective</option><option value="seed">initialization omitted</option><option value="baseline">no comparator</option><option value="convergence">stopped without evidence</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
