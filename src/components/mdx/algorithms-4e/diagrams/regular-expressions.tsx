"use client";

import { useMemo, useState } from "react";

const regexp = "(A*B|AC)D";

type BuildStep = { index: number; token: string; stack: number[]; added: [number, number][] };

function buildEpsilonGraph(expression: string) {
  const size = expression.length;
  const adjacency = Array.from({ length: size + 1 }, () => [] as number[]);
  const operators: number[] = [];
  const steps: BuildStep[] = [];

  function addEdge(from: number, to: number, added: [number, number][]) {
    if (!adjacency[from].includes(to)) adjacency[from].push(to);
    added.push([from, to]);
  }

  for (let index = 0; index < size; index++) {
    let leftParenthesis = index;
    const added: [number, number][] = [];
    if (expression[index] === "(" || expression[index] === "|") {
      operators.push(index);
    } else if (expression[index] === ")") {
      const operator = operators.pop();
      if (operator === undefined) throw new Error("invalid regular expression");
      if (expression[operator] === "|") {
        const left = operators.pop();
        if (left === undefined) throw new Error("invalid regular expression");
        leftParenthesis = left;
        addEdge(leftParenthesis, operator + 1, added);
        addEdge(operator, index, added);
      } else {
        leftParenthesis = operator;
      }
    }
    if (index < size - 1 && expression[index + 1] === "*") {
      addEdge(leftParenthesis, index + 1, added);
      addEdge(index + 1, leftParenthesis, added);
    }
    if (expression[index] === "(" || expression[index] === "*" || expression[index] === ")") {
      addEdge(index, index + 1, added);
    }
    steps.push({ index, token: expression[index], stack: [...operators], added });
  }
  return { adjacency, steps };
}

const graph = buildEpsilonGraph(regexp);

function epsilonClosure(sources: number[], adjacency = graph.adjacency) {
  const visited = new Set<number>();
  const stack = [...sources];
  while (stack.length > 0) {
    const vertex = stack.pop();
    if (vertex === undefined || visited.has(vertex)) continue;
    visited.add(vertex);
    for (const next of adjacency[vertex] ?? []) if (!visited.has(next)) stack.push(next);
  }
  return [...visited].sort((left, right) => left - right);
}

type SimulationState = {
  character: string;
  before: number[];
  matched: number[];
  after: number[];
};

function simulate(expression: string, input: string, adjacency = buildEpsilonGraph(expression).adjacency) {
  let possible = epsilonClosure([0], adjacency);
  const states: SimulationState[] = [];
  for (const character of input) {
    const matched = possible.flatMap((state) => state < expression.length && (expression[state] === character || expression[state] === ".") ? [state + 1] : []);
    const after = epsilonClosure(matched, adjacency);
    states.push({ character, before: possible, matched, after });
    possible = after;
  }
  return { accepted: possible.includes(expression.length), final: possible, states };
}

export function Algs4RegexSyntaxMap() {
  const [input, setInput] = useState("AAAABD");
  const result = simulate(regexp, input);
  const operators = [
    { symbol: "AB", name: "concatenation", meaning: "A then B" },
    { symbol: "A|B", name: "alternation", meaning: "A or B" },
    { symbol: "A*", name: "closure", meaning: "zero or more A" },
    { symbol: ".", name: "wildcard", meaning: "one character" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{operators.map((operator) => <div key={operator.name} className="border border-border bg-background p-3 text-center"><div className="font-mono text-accent">{operator.symbol}</div><div className="text-xs font-semibold text-primary">{operator.name}</div><div className="text-[10px] text-secondary">{operator.meaning}</div></div>)}</div>
        <label className="mt-4 block text-sm font-semibold text-primary">regexp = {regexp}<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={input} onChange={(event) => setInput(event.target.value)}>{["AAAABD", "ACD", "BD", "AAAAC", "ABCD"].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <div className={"mt-3 border p-3 text-sm " + (result.accepted ? "border-success text-success" : "border-danger text-danger")}>{result.accepted ? "full-string accepted" : "rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Regular expression描述一个language；recognizer判断entire input是否存在一条NFA path到accept state。
      </figcaption>
    </figure>
  );
}

export function Algs4EpsilonDigraphLab() {
  const [state, setState] = useState(2);
  const outgoing = graph.adjacency[state] ?? [];
  const allEdges = graph.adjacency.flatMap((targets, from) => targets.map((to) => [from, to] as const));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">NFA state {state} · token {state === regexp.length ? "accept" : regexp[state]}<input className="mt-2 w-full accent-current" type="range" min="0" max={regexp.length} value={state} onChange={(event) => setState(Number(event.target.value))} /></label>
        <div className="mt-4 flex gap-1 overflow-x-auto">{Array.from({ length: regexp.length + 1 }, (_, index) => <div key={index} className={"min-w-12 border p-2 text-center " + (index === state ? "border-accent bg-accent/10" : outgoing.includes(index) ? "border-success bg-success/10" : "border-border bg-background")}><div className="font-mono text-xs text-primary">{index}</div><div className="font-mono text-[10px] text-secondary">{index === regexp.length ? "accept" : regexp[index]}</div></div>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{allEdges.map(([from, to]) => <div key={`${from}-${to}`} className={"border p-2 font-mono text-xs " + (from === state ? "border-warning text-warning" : "border-border text-secondary")}>{from} ε→ {to}</div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Epsilon edges consume no input；literal和dot transitions隐含为state i读取regexp[i]后到i+1。
      </figcaption>
    </figure>
  );
}

export function Algs4NfaConstructionLab() {
  const [step, setStep] = useState(4);
  const state = graph.steps[step];
  const cumulativeEdges = graph.steps.slice(0, step + 1).flatMap((item) => item.added);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">scan regexp[{state.index}] = {state.token}<input className="mt-2 w-full accent-current" type="range" min="0" max={graph.steps.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex gap-1 overflow-x-auto">{Array.from(regexp).map((token, index) => <div key={index} className={"min-w-10 border p-2 text-center font-mono text-xs " + (index === state.index ? "border-warning text-warning" : index < state.index ? "border-success text-success" : "border-border text-secondary")}>{token}<div className="text-[9px]">{index}</div></div>)}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs"><div className="border border-accent p-3 text-accent">operator stack<div className="font-mono">{state.stack.join(" · ") || "empty"}</div></div><div className="border border-warning p-3 text-warning">edges added now<div className="font-mono">{state.added.map(([from, to]) => `${from}→${to}`).join(" · ") || "none"}</div></div><div className="border border-border p-3 text-secondary">total epsilon edges<div className="font-mono text-primary">{cumulativeEdges.length}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Operator stack把left parenthesis与alternation位置配对；star在lookahead阶段同时建立forward与back edge。
      </figcaption>
    </figure>
  );
}

export function Algs4EpsilonClosureLab() {
  const [source, setSource] = useState(0);
  const closure = epsilonClosure([source]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">epsilon closure source = {source}<input className="mt-2 w-full accent-current" type="range" min="0" max={regexp.length} value={source} onChange={(event) => setSource(Number(event.target.value))} /></label>
        <div className="mt-4 flex gap-1 overflow-x-auto">{Array.from({ length: regexp.length + 1 }, (_, index) => <div key={index} className={"min-w-12 border p-2 text-center " + (closure.includes(index) ? "border-success bg-success/10" : "border-border bg-background")}><div className="font-mono text-xs text-primary">{index}</div><div className="font-mono text-[10px] text-secondary">{index === regexp.length ? "accept" : regexp[index]}</div></div>)}</div>
        <div className="mt-3 border border-success p-3 text-xs text-success">closure = <span className="font-mono">{`{${closure.join(", ")}}`}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Epsilon closure是从source set只沿epsilon edges可达的全部states；每次字符匹配前后都要闭包。
      </figcaption>
    </figure>
  );
}

export function Algs4NfaSimulationLab() {
  const [input, setInput] = useState("AAAABD");
  const result = useMemo(() => simulate(regexp, input), [input]);
  const [step, setStep] = useState(2);
  const boundedStep = Math.min(step, Math.max(0, result.states.length - 1));
  const state = result.states[boundedStep];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">input<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={input} onChange={(event) => { setInput(event.target.value); setStep(0); }}>{["AAAABD", "ACD", "BD", "AAAAC", "ABCD"].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="mt-4 block text-xs text-secondary">consume step {boundedStep + 1} / {result.states.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={Math.max(0, result.states.length - 1)} value={boundedStep} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex gap-1">{Array.from(input).map((character, index) => <div key={index} className={"min-w-9 border p-2 text-center font-mono text-sm " + (index === boundedStep ? "border-warning text-warning" : index < boundedStep ? "border-success text-success" : "border-border text-secondary")}>{character}</div>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 text-xs"><div className="border border-border p-3 text-secondary">before closure<div className="font-mono text-primary">{`{${state?.before.join(",") ?? ""}}`}</div></div><div className="border border-warning p-3 text-warning">consume {state?.character}<div className="font-mono">{`{${state?.matched.join(",") ?? ""}}`}</div></div><div className="border border-success p-3 text-success">after closure<div className="font-mono">{`{${state?.after.join(",") ?? ""}}`}</div></div></div>
        <div className={"mt-3 border p-3 text-sm " + (boundedStep === result.states.length - 1 ? result.accepted ? "border-success text-success" : "border-danger text-danger" : "border-border text-secondary")}>{boundedStep === result.states.length - 1 ? result.accepted ? "accept state reachable" : "accept state absent" : "simulation continues"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Simulation维护possible states set，而非猜一条path；每个input character并行推进所有matching literal/dot states。
      </figcaption>
    </figure>
  );
}

export function Algs4AlternationLab() {
  const [branch, setBranch] = useState<"A*B" | "AC">("A*B");
  const selectedStates = branch === "A*B" ? [1, 2, 3] : [5, 6];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">alternation branch<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={branch} onChange={(event) => setBranch(event.target.value as "A*B" | "AC")}><option value="A*B">A*B</option><option value="AC">AC</option></select></label>
        <div className="mt-4 flex gap-1 overflow-x-auto">{Array.from(regexp).map((token, index) => <div key={index} className={"min-w-10 border p-2 text-center font-mono text-xs " + (selectedStates.includes(index) ? "border-accent bg-accent/10 text-accent" : token === "|" || token === "(" || token === ")" ? "border-warning text-warning" : "border-border text-secondary")}>{token}<div className="text-[9px]">{index}</div></div>)}</div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs"><div className="border border-success p-3 text-success">entry epsilon<div className="font-mono">{branch === "A*B" ? "0→1" : "0→5"}</div></div><div className="border border-warning p-3 text-warning">join epsilon<div className="font-mono">{branch === "A*B" ? "4→7" : "arrive at 7"}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Alternation在left parenthesis处分叉、right parenthesis前汇合；两条choices都consume同一外层后续D。
      </figcaption>
    </figure>
  );
}

export function Algs4ClosureOperatorLab() {
  const [copies, setCopies] = useState(3);
  const input = `${"A".repeat(copies)}BD`;
  const result = simulate(regexp, input);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">A* repetitions = {copies}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={copies} onChange={(event) => setCopies(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap items-center gap-2"><div className="border border-accent p-3 font-mono text-accent">state 1 · A</div><span className="text-warning">ε loop via *</span><div className="border border-warning p-3 font-mono text-warning">state 2 · *</div><span className="text-secondary">exit to B</span><div className="border border-success p-3 font-mono text-success">state 3 · B</div></div>
        <div className="mt-4 border border-border bg-background p-3 text-xs text-secondary">input = <span className="font-mono text-primary">{input}</span> · loop traversals = <span className="font-mono text-primary">{copies}</span></div>
        <div className={"mt-3 border p-3 text-sm " + (result.accepted ? "border-success text-success" : "border-danger text-danger")}>{result.accepted ? "zero-or-more closure accepted" : "rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kleene star通过lp到star的skip edge支持zero copies，通过star回lp的back edge支持another copy。
      </figcaption>
    </figure>
  );
}

const grepLines = ["CAB taxi", "alpha beta", "ACD route", "AAAABD accepted", "plain text", "AB marker"];

export function Algs4GrepLab() {
  const [needle, setNeedle] = useState("AB");
  const wrapped = `(.*${needle}.*)`;
  const matching = grepLines.filter((line) => line.includes(needle));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">grep query<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={needle} onChange={(event) => setNeedle(event.target.value)}>{["AB", "ACD", "text", "ZZ"].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <div className="mt-3 border border-accent p-3 text-xs text-accent">wrapped regexp = <span className="font-mono">{wrapped}</span></div>
        <div className="mt-4 overflow-hidden border border-border bg-background">{grepLines.map((line) => <div key={line} className={"border-b border-border p-2 text-xs last:border-b-0 " + (matching.includes(line) ? "bg-success/10 text-success" : "text-secondary")}>{line}</div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GREP把query包成dot-star前后缀，让full-string recognizer实现“line contains a matching substring”。
      </figcaption>
    </figure>
  );
}

export function Algs4RegexCostLab() {
  const [expressionLength, setExpressionLength] = useState(20);
  const [inputLength, setInputLength] = useState(30);
  const nfaWork = expressionLength * inputLength;
  const backtrackingWork = 2 ** Math.min(20, inputLength);
  const maximum = Math.max(nfaWork, backtrackingWork);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">M = {expressionLength}<input className="mt-2 w-full accent-current" type="range" min="4" max="60" value={expressionLength} onChange={(event) => setExpressionLength(Number(event.target.value))} /></label><label className="text-xs text-secondary">N = {inputLength}<input className="mt-2 w-full accent-current" type="range" min="4" max="50" value={inputLength} onChange={(event) => setInputLength(Number(event.target.value))} /></label></div>
        <div className="mt-4 space-y-3"><div className="grid grid-cols-[8rem_1fr_7rem] items-center gap-2 text-xs"><span className="font-semibold text-primary">Thompson NFA</span><div className="h-4 border border-border bg-background"><div className="h-full bg-success" style={{ width: `${(nfaWork / maximum) * 100}%` }} /></div><span className="text-right font-mono text-success">{nfaWork.toLocaleString()}</span></div><div className="grid grid-cols-[8rem_1fr_7rem] items-center gap-2 text-xs"><span className="font-semibold text-primary">naive backtrack</span><div className="h-4 border border-border bg-background"><div className="h-full bg-danger" style={{ width: `${(backtrackingWork / maximum) * 100}%` }} /></div><span className="text-right font-mono text-danger">{backtrackingWork.toLocaleString()}</span></div></div>
        <div className="mt-3 text-[10px] text-secondary">Backtracking bar is an adversarial exponential illustration, not a claim for every library or input.</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Thompson simulation构图O(M)、匹配O(MN)；pathological backtracking可因重复探索同一state/input pair指数增长。
      </figcaption>
    </figure>
  );
}

type CertificateMode = "valid" | "missing star loop" | "false accept" | "missed accept";
const corpus = ["AAAABD", "ACD", "BD", "AAAAC", "ABCD"];

export function Algs4NfaCertificateLab() {
  const [mode, setMode] = useState<CertificateMode>("valid");
  const candidateAdjacency = useMemo(() => {
    const adjacency = graph.adjacency.map((targets) => [...targets]);
    if (mode === "missing star loop") {
      adjacency[2] = adjacency[2].filter((target) => target !== 1);
    }
    return adjacency;
  }, [mode]);
  const expected = corpus.map((input) => simulate(regexp, input).accepted);
  const candidate = corpus.map((input) => {
    if (mode === "false accept" && input === "AAAAC") return true;
    if (mode === "missed accept" && input === "ACD") return false;
    return simulate(regexp, input, candidateAdjacency).accepted;
  });
  const edgeSet = new Set(graph.adjacency.flatMap((targets, from) => targets.map((to) => `${from}-${to}`)));
  const candidateEdgeSet = new Set(candidateAdjacency.flatMap((targets, from) => targets.map((to) => `${from}-${to}`)));
  const graphCorrect = edgeSet.size === candidateEdgeSet.size && [...edgeSet].every((edge) => candidateEdgeSet.has(edge));
  const decisionsCorrect = expected.every((value, index) => value === candidate[index]);
  const accepted = graphCorrect && decisionsCorrect;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">candidate recognizer<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as CertificateMode)}><option value="valid">valid</option><option value="missing star loop">missing star loop</option><option value="false accept">false accept</option><option value="missed accept">missed accept</option></select></label>
        <div className="mt-4 overflow-hidden border border-border bg-background">{corpus.map((input, index) => <div key={input} className="grid grid-cols-[1fr_6rem_6rem] border-b border-border p-2 text-xs last:border-b-0"><span className="font-mono text-primary">{input}</span><span className="text-secondary">oracle {String(expected[index])}</span><span className={expected[index] === candidate[index] ? "text-success" : "text-danger"}>candidate {String(candidate[index])}</span></div>)}</div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs"><div className={"border p-3 " + (graphCorrect ? "border-success text-success" : "border-danger text-danger")}>epsilon graph<div className="font-mono">{graphCorrect ? "pass" : "mismatch"}</div></div><div className={"border p-3 " + (decisionsCorrect ? "border-success text-success" : "border-danger text-danger")}>corpus decisions<div className="font-mono">{decisionsCorrect ? "pass" : "mismatch"}</div></div></div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "certificate accepted" : "certificate rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        NFA certificate同时核对epsilon graph与reference-language corpus；只测一个accepted example无法发现missing branch或loop。
      </figcaption>
    </figure>
  );
}
