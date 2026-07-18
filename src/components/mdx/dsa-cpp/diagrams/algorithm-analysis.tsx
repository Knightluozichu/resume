"use client";

import { useMemo, useState } from "react";

const growthFunctions = [
  { name: "log₂N", value: (n: number) => Math.log2(n), tone: "text-success" },
  { name: "N", value: (n: number) => n, tone: "text-accent" },
  { name: "N log₂N", value: (n: number) => n * Math.log2(n), tone: "text-primary" },
  { name: "N²", value: (n: number) => n * n, tone: "text-warning" },
  { name: "2ᴺ", value: (n: number) => 2 ** Math.min(n, 52), tone: "text-danger" },
] as const;

export function DsaAsymptoticGrowthLab() {
  const [power, setPower] = useState(10);
  const n = 2 ** power;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">N = 2^{power} = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="3" max="20" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {growthFunctions.map((item) => <div key={item.name} className="border border-border bg-background p-3 text-center"><div className={"font-mono text-xs font-semibold " + item.tone}>{item.name}</div><div className="mt-2 break-all font-mono text-xs text-secondary">{item.value(n).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div></div>)}
        </div>
        <p className="mb-0 mt-3 text-sm text-secondary">常数倍会平移数值，增长阶却决定 N 放大后哪一项最终支配。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">同一输入规模下并排计算常见增长率，观察 logarithmic、linear、polynomial 与 exponential 的分离。</figcaption>
    </figure>
  );
}

const modelAssumptions = [
  { label: "primitive", detail: "assignment, comparison, arithmetic = O(1)", risk: "integer width ignored" },
  { label: "memory", detail: "random access = O(1)", risk: "cache and I/O ignored" },
  { label: "input", detail: "N measures relevant data size", risk: "encoding size may differ" },
] as const;

export function DsaCostModelDiagram() {
  const [selected, setSelected] = useState(0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-3">
          {modelAssumptions.map((item, index) => <button key={item.label} type="button" onClick={() => setSelected(index)} className={"min-h-20 border p-3 text-left " + (selected === index ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-secondary")}><span className="block font-mono text-xs font-semibold">{item.label}</span><span className="mt-2 block text-xs">{item.detail}</span></button>)}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="border border-success bg-success/10 p-3 text-xs text-secondary">模型作用<div className="mt-1 font-semibold text-success">隔离算法随 N 增长的结构成本</div></div><div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">被忽略项<div className="mt-1 font-semibold text-warning">{modelAssumptions[selected].risk}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">RAM-style model 用统一 primitive cost 支撑渐近分析；结论必须连同假设一起交付。</figcaption>
    </figure>
  );
}

const cases = {
  best: { label: "best case", sequence: "[target, ...]", comparisons: 1, meaning: "存在一个幸运输入" },
  average: { label: "average case", sequence: "random position", comparisons: 50, meaning: "依赖明确的概率分布" },
  worst: { label: "worst case", sequence: "[..., no target]", comparisons: 100, meaning: "对所有同规模输入给上界" },
} as const;
type CaseKey = keyof typeof cases;

export function DsaAnalysisTargetLab() {
  const [kind, setKind] = useState<CaseKey>("worst");
  const current = cases[kind];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">{(Object.keys(cases) as CaseKey[]).map((key) => <button key={key} type="button" onClick={() => setKind(key)} className={"min-h-11 border px-2 text-xs font-semibold " + (kind === key ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{cases[key].label}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-xs text-secondary">N=100 linear search<div className="mt-1 font-mono text-primary">{current.sequence}</div></div><div className="border border-success bg-success/10 p-3 text-xs text-secondary">comparisons<div className="mt-1 font-mono text-success">{current.comparisons}</div></div><div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">claim<div className="mt-1 font-semibold text-warning">{current.meaning}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">“运行时间”必须说明输入尺寸、计数操作与 best/average/worst case；average case 还必须给分布。</figcaption>
    </figure>
  );
}

const loopPatterns = {
  sequence: { label: "顺序循环", formula: "N + N", count: (n: number) => 2 * n },
  nested: { label: "完整嵌套", formula: "N × N", count: (n: number) => n * n },
  triangle: { label: "三角嵌套", formula: "Σ(i+1)", count: (n: number) => n * (n + 1) / 2 },
  halving: { label: "反复减半", formula: "⌊log₂N⌋+1", count: (n: number) => Math.floor(Math.log2(n)) + 1 },
} as const;
type LoopPattern = keyof typeof loopPatterns;

export function DsaLoopCountingLab() {
  const [pattern, setPattern] = useState<LoopPattern>("triangle");
  const [n, setN] = useState(16);
  const active = loopPatterns[pattern];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={pattern} onChange={(event) => setPattern(event.target.value as LoopPattern)}>{(Object.keys(loopPatterns) as LoopPattern[]).map((key) => <option key={key} value={key}>{loopPatterns[key].label}</option>)}</select>
        <label className="mt-4 block text-sm font-semibold text-primary">N = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="64" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-xs text-secondary">count expression<div className="mt-1 font-mono text-primary">{active.formula}</div></div><div className="border border-success bg-success/10 p-3 text-xs text-secondary">exact count<div className="mt-1 font-mono text-success">{active.count(n).toLocaleString()}</div></div><div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">dominant order<div className="mt-1 font-semibold text-warning">{pattern === "nested" || pattern === "triangle" ? "Θ(N²)" : pattern === "halving" ? "Θ(log N)" : "Θ(N)"}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">顺序 blocks 相加、嵌套 blocks 相乘、依赖边界写求和、减半循环数 logarithm。</figcaption>
    </figure>
  );
}

const maxSumCosts = [
  { name: "cubic", order: "N³", count: (n: number) => n ** 3 },
  { name: "quadratic", order: "N²", count: (n: number) => n ** 2 },
  { name: "divide", order: "N log N", count: (n: number) => Math.ceil(n * Math.log2(n)) },
  { name: "linear", order: "N", count: (n: number) => n },
] as const;

export function DsaMaxSubsequenceComparisonLab() {
  const [power, setPower] = useState(8);
  const n = 2 ** power;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">sequence length N = {n}<input className="mt-2 w-full accent-current" type="range" min="3" max="12" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{maxSumCosts.map((item, index) => <div key={item.name} className={"border p-3 " + (index === 3 ? "border-success bg-success/10" : "border-border bg-background")}><div className="font-mono text-xs font-semibold text-primary">{item.name}</div><div className="mt-1 text-xs text-secondary">{item.order}</div><div className="mt-2 break-all font-mono text-xs text-accent">{item.count(n).toLocaleString()}</div></div>)}</div>
        <p className="mb-0 mt-3 text-sm text-secondary">四个官方实现返回同一结果；差别来自是否重复计算区间和、是否分治、是否丢弃负前缀。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">最大连续子序列和把“算法正确”与“算法可扩展”分开：同一规格可以有四个增长阶。</figcaption>
    </figure>
  );
}

const binarySearchValues = [0, 2, 4, 6, 8, 10, 12, 14] as const;

export function DsaBinarySearchTraceLab() {
  const [target, setTarget] = useState(10);
  const steps = useMemo(() => {
    const result: { low: number; mid: number; high: number; decision: string }[] = [];
    let low = 0;
    let high = binarySearchValues.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const decision = binarySearchValues[mid] === target ? "found" : binarySearchValues[mid] < target ? "move low" : "move high";
      result.push({ low, mid, high, decision });
      if (decision === "found") break;
      if (binarySearchValues[mid] < target) low = mid + 1;
      else high = mid - 1;
    }
    return result;
  }, [target]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">target = {target}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
        <div className="mt-4 flex gap-1">{binarySearchValues.map((value, index) => <span key={value} className={"flex-1 border p-2 text-center font-mono text-xs " + (value === target ? "border-success bg-success/10 text-success" : "border-border bg-background text-primary")}>{value}<span className="mt-1 block text-[10px] text-muted">{index}</span></span>)}</div>
        <div className="mt-3 space-y-1">{steps.map((step, index) => <div key={index} className="grid grid-cols-4 border border-border bg-background p-2 font-mono text-xs text-secondary"><span>low {step.low}</span><span>mid {step.mid}</span><span>high {step.high}</span><span className="text-accent">{step.decision}</span></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每次比较排除至少一半候选区间，因此八个元素至多经历四层，而不是扫描八次。</figcaption>
    </figure>
  );
}

function gcdSteps(a: number, b: number) {
  const rows: string[] = [];
  while (b !== 0) {
    rows.push(`${a} mod ${b} = ${a % b}`);
    [a, b] = [b, a % b];
  }
  return { rows, result: a };
}

export function DsaLogarithmicAlgorithmsLab() {
  const [mode, setMode] = useState<"gcd" | "power">("gcd");
  const trace = gcdSteps(1989, 1590);
  const powers = [21, 10, 5, 2, 1, 0];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-2"><button type="button" onClick={() => setMode("gcd")} className={"min-h-10 flex-1 border px-3 text-sm font-semibold " + (mode === "gcd" ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>Euclid GCD</button><button type="button" onClick={() => setMode("power")} className={"min-h-10 flex-1 border px-3 text-sm font-semibold " + (mode === "power" ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>fast power</button></div>
        <div className="mt-4 space-y-1">{(mode === "gcd" ? trace.rows : powers.map((n) => `pow(x, ${n}) → exponent ${Math.floor(n / 2)}`)).map((line, index) => <div key={index} className="border border-border bg-background p-2 font-mono text-xs text-primary">{line}</div>)}</div>
        <div className="mt-3 border border-success bg-success/10 p-3 text-sm text-success">{mode === "gcd" ? `gcd = ${trace.result}; remainder shrinks the second operand` : "exponent halves each recursive level; odd exponents add one final multiply"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Euclid 和快速幂的代码不同，但都由严格缩小的整数参数解释 logarithmic depth。</figcaption>
    </figure>
  );
}
