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

export function TcpBooleanBasicsLab() {
  const [operation, setOperation] = useState<"and" | "or" | "xor" | "imp">("xor");
  const rows = [[0, 0], [0, 1], [1, 0], [1, 1]].map(([left, right]) => {
    const value = operation === "and" ? left & right : operation === "or" ? left | right : operation === "xor" ? left ^ right : Number(!left || Boolean(right));
    return { left, right, value };
  });
  return (
    <Figure caption="A Boolean operator is completely specified by its truth table; algebraic identities must agree on every assignment, not only on a sample row.">
      <label className="text-sm font-semibold text-primary">operator<select className="mt-2 block w-full border border-border bg-background p-2" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="and">AND</option><option value="or">OR</option><option value="xor">XOR</option><option value="imp">implication</option></select></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{rows.map((row) => <Stat key={`${row.left}${row.right}`} label={`${row.left} ${operation} ${row.right}`} value={row.value.toString()} tone={row.value ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

const FORMULAS = {
  majority: (x: number, y: number, z: number) => Number(x + y + z >= 2),
  parity: (x: number, y: number, z: number) => x ^ y ^ z,
  mux: (x: number, y: number, z: number) => x ? y : z,
};

export function TcpBooleanEvaluationLab() {
  const [formula, setFormula] = useState<keyof typeof FORMULAS>("majority");
  const values = Array.from({ length: 8 }, (_, mask) => FORMULAS[formula]((mask >> 2) & 1, (mask >> 1) & 1, mask & 1));
  return (
    <Figure caption="Boolean evaluation maps each assignment to one output bit; bit-parallel truth vectors make equivalence and model counting explicit.">
      <label className="text-sm font-semibold text-primary">function<select className="mt-2 block w-full border border-border bg-background p-2" value={formula} onChange={(event) => setFormula(event.target.value as keyof typeof FORMULAS)}><option value="majority">majority(x,y,z)</option><option value="parity">parity(x,y,z)</option><option value="mux">x ? y : z</option></select></label>
      <div className="mt-4 grid grid-cols-8 gap-1">{values.map((value, mask) => <div key={mask} className={`border p-2 text-center font-mono text-xs ${value ? "border-success bg-success/20 text-success" : "border-border bg-background text-primary"}`}><span className="block text-secondary">{mask.toString(2).padStart(3, "0")}</span>{value}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="truth vector" value={values.join("")} /><Stat label="satisfying assignments" value={values.filter(Boolean).length.toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpBitwiseLab() {
  const [left, setLeft] = useState(0b10110110);
  const [right, setRight] = useState(0b01101100);
  const [operation, setOperation] = useState<"and" | "or" | "xor">("and");
  const result = operation === "and" ? left & right : operation === "or" ? left | right : left ^ right;
  return (
    <Figure caption="Bitwise operations apply a Boolean operator in parallel to every bit position; masks turn set membership and field extraction into word operations.">
      <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">left = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">right = {right}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">operation<select className="mt-2 block w-full border border-border bg-background p-2" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="and">AND</option><option value="or">OR</option><option value="xor">XOR</option></select></label></div>
      <div className="mt-4 grid gap-2"><Stat label="left bits" value={left.toString(2).padStart(8, "0")} /><Stat label="right bits" value={right.toString(2).padStart(8, "0")} /><Stat label="result bits" value={result.toString(2).padStart(8, "0")} tone="success" /></div>
      <div className="mt-2"><Stat label="set bits in result" value={result.toString(2).split("1").length - 1 + ""} tone="warning" /></div>
    </Figure>
  );
}

function bddNodeCount(order: Array<"x" | "y" | "z">) {
  const unique = new Map<string, number>();
  const build = (level: number, assignment: Partial<Record<"x" | "y" | "z", number>>): number => {
    if (level === order.length) return FORMULAS.mux(assignment.x!, assignment.y!, assignment.z!);
    const variable = order[level];
    const low = build(level + 1, { ...assignment, [variable]: 0 });
    const high = build(level + 1, { ...assignment, [variable]: 1 });
    if (low === high) return low;
    const key = `${variable}:${low}:${high}`;
    if (!unique.has(key)) unique.set(key, unique.size + 2);
    return unique.get(key)!;
  };
  build(0, {});
  return unique.size;
}

export function TcpBddLab() {
  const [orderName, setOrderName] = useState<"xyz" | "yzx" | "zxy">("xyz");
  const order = orderName.split("") as Array<"x" | "y" | "z">;
  const nodes = bddNodeCount(order);
  return (
    <Figure caption="A reduced ordered BDD merges equal residual functions and removes redundant tests; variable order can change graph size even for the same Boolean function.">
      <label className="text-sm font-semibold text-primary">variable order<select className="mt-2 block w-full border border-border bg-background p-2" value={orderName} onChange={(event) => setOrderName(event.target.value as typeof orderName)}><option value="xyz">x,y,z</option><option value="yzx">y,z,x</option><option value="zxy">z,x,y</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="function" value="x ? y : z" /><Stat label="decision nodes" value={nodes.toString()} tone={nodes <= 3 ? "success" : "warning"} /><Stat label="terminal nodes" value="2" /></div>
    </Figure>
  );
}

export function TcpGrayCodeLab() {
  const [bits, setBits] = useState(4);
  const [index, setIndex] = useState(5);
  const modulus = 2 ** bits;
  const current = (index % modulus) ^ ((index % modulus) >> 1);
  const nextIndex = (index + 1) % modulus;
  const next = nextIndex ^ (nextIndex >> 1);
  const changed = current ^ next;
  return (
    <Figure caption="Binary-reflected Gray order visits every bit tuple cyclically while changing one coordinate per step, a minimal-change generation contract.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">bits = {bits}<input className="mt-2 w-full accent-current" type="range" min="2" max="6" value={bits} onChange={(event) => { setBits(Number(event.target.value)); setIndex(0); }} /></label><label className="text-sm font-semibold text-primary">index = {index}<input className="mt-2 w-full accent-current" type="range" min="0" max={modulus - 1} value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="gray(index)" value={current.toString(2).padStart(bits, "0")} /><Stat label="gray(next)" value={next.toString(2).padStart(bits, "0")} /><Stat label="changed mask" value={changed.toString(2).padStart(bits, "0")} tone={changed > 0 && (changed & (changed - 1)) === 0 ? "success" : "danger"} /></div>
    </Figure>
  );
}

function mixedRadixTuple(rank: number, radices: number[]) {
  const tuple = Array.from({ length: radices.length }, () => 0);
  let remaining = rank;
  for (let index = radices.length - 1; index >= 0; index -= 1) { tuple[index] = remaining % radices[index]; remaining = Math.floor(remaining / radices[index]); }
  return tuple;
}

export function TcpTupleLab() {
  const [rank, setRank] = useState(7);
  const radices = [2, 3, 4];
  const count = radices.reduce((product, radix) => product * radix, 1);
  const tuple = mixedRadixTuple(rank, radices);
  return (
    <Figure caption="Mixed-radix ranking gives every tuple one integer in a contiguous range; incrementing with carries enumerates all tuples without duplicates.">
      <label className="text-sm font-semibold text-primary">rank = {rank}<input className="mt-2 w-full accent-current" type="range" min="0" max={count - 1} value={rank} onChange={(event) => setRank(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{tuple.map((digit, index) => <Stat key={index} label={`coordinate ${index}, radix ${radices[index]}`} value={digit.toString()} tone="success" />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="tuple" value={`(${tuple.join(", ")})`} /><Stat label="total tuples" value={count.toString()} /></div>
    </Figure>
  );
}

function nextPermutation(values: number[]) {
  const output = [...values];
  let pivot = output.length - 2;
  while (pivot >= 0 && output[pivot] >= output[pivot + 1]) pivot -= 1;
  if (pivot < 0) return { output: output.reverse(), wrapped: true };
  let successor = output.length - 1;
  while (output[successor] <= output[pivot]) successor -= 1;
  [output[pivot], output[successor]] = [output[successor], output[pivot]];
  for (let left = pivot + 1, right = output.length - 1; left < right; left += 1, right -= 1) [output[left], output[right]] = [output[right], output[left]];
  return { output, wrapped: false };
}

export function TcpPermutationGeneratorLab() {
  const [mode, setMode] = useState<"1234" | "2413" | "4321">("2413");
  const input = mode.split("").map(Number);
  const result = nextPermutation(input);
  return (
    <Figure caption="Lexicographic successor changes the rightmost possible pivot and restores the smallest suffix, producing each permutation exactly once in rank order.">
      <label className="text-sm font-semibold text-primary">current permutation<select className="mt-2 block w-full border border-border bg-background p-2" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="1234">1 2 3 4</option><option value="2413">2 4 1 3</option><option value="4321">4 3 2 1</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="current" value={input.join(" ")} /><Stat label="next" value={result.output.join(" ")} tone="success" /><Stat label="wrapped" value={result.wrapped ? "yes" : "no"} tone={result.wrapped ? "warning" : "accent"} /></div>
    </Figure>
  );
}

function combinations(n: number, k: number) {
  const output: number[][] = [];
  const visit = (next: number, chosen: number[]) => {
    if (chosen.length === k) { output.push(chosen); return; }
    for (let value = next; value <= n - (k - chosen.length) + 1; value += 1) visit(value + 1, [...chosen, value]);
  };
  visit(1, []);
  return output;
}

export function TcpCombinationGeneratorLab() {
  const [n, setN] = useState(6);
  const [k, setK] = useState(3);
  const values = combinations(n, Math.min(k, n));
  const [rank, setRank] = useState(0);
  const safeRank = rank % values.length;
  return (
    <Figure caption="A k-combination is an increasing tuple; prefix feasibility bounds prevent duplicates and give a direct lexicographic generator.">
      <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="3" max="9" value={n} onChange={(event) => { setN(Number(event.target.value)); setRank(0); }} /></label><label className="text-sm font-semibold text-primary">k = {Math.min(k, n)}<input className="mt-2 w-full accent-current" type="range" min="1" max={n} value={Math.min(k, n)} onChange={(event) => { setK(Number(event.target.value)); setRank(0); }} /></label><label className="text-sm font-semibold text-primary">rank = {safeRank}<input className="mt-2 w-full accent-current" type="range" min="0" max={values.length - 1} value={safeRank} onChange={(event) => setRank(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="combination" value={`{${values[safeRank].join(", ")}}`} tone="success" /><Stat label="count" value={values.length.toString()} /></div>
    </Figure>
  );
}

function integerPartitions(total: number, maximum = total): number[][] {
  if (total === 0) return [[]];
  const output: number[][] = [];
  for (let first = Math.min(total, maximum); first >= 1; first -= 1) for (const rest of integerPartitions(total - first, first)) output.push([first, ...rest]);
  return output;
}

export function TcpIntegerPartitionLab() {
  const [total, setTotal] = useState(6);
  const [rank, setRank] = useState(0);
  const values = integerPartitions(total);
  const safeRank = rank % values.length;
  return (
    <Figure caption="An integer partition is a nonincreasing positive sequence with fixed sum; bounding the next part by the previous part removes order duplicates.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">integer n = {total}<input className="mt-2 w-full accent-current" type="range" min="1" max="9" value={total} onChange={(event) => { setTotal(Number(event.target.value)); setRank(0); }} /></label><label className="text-sm font-semibold text-primary">partition rank = {safeRank}<input className="mt-2 w-full accent-current" type="range" min="0" max={values.length - 1} value={safeRank} onChange={(event) => setRank(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="partition" value={values[safeRank].join(" + ")} tone="success" /><Stat label="sum" value={values[safeRank].reduce((sum, value) => sum + value, 0).toString()} /><Stat label="p(n)" value={values.length.toString()} /></div>
    </Figure>
  );
}

function setPartitions(size: number) {
  const output: number[][] = [];
  const visit = (sequence: number[]) => {
    if (sequence.length === size) { output.push(sequence); return; }
    const maximum = sequence.length ? Math.max(...sequence) : -1;
    for (let label = 0; label <= maximum + 1; label += 1) visit([...sequence, label]);
  };
  visit([0]);
  return size === 0 ? [[]] : output;
}

export function TcpSetPartitionLab() {
  const [size, setSize] = useState(4);
  const [rank, setRank] = useState(3);
  const values = setPartitions(size);
  const safeRank = rank % values.length;
  const sequence = values[safeRank];
  const blocks = Array.from({ length: Math.max(...sequence) + 1 }, (_, label) => sequence.map((value, index) => value === label ? index + 1 : null).filter((value): value is number => value !== null));
  return (
    <Figure caption="Restricted-growth strings canonically label set partitions by order of first block appearance, avoiding permutations of block names.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">set size = {size}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={size} onChange={(event) => { setSize(Number(event.target.value)); setRank(0); }} /></label><label className="text-sm font-semibold text-primary">rank = {safeRank}<input className="mt-2 w-full accent-current" type="range" min="0" max={values.length - 1} value={safeRank} onChange={(event) => setRank(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="restricted-growth string" value={sequence.join("")} /><Stat label="blocks" value={blocks.map((block) => `{${block.join(",")}}`).join(" ")} tone="success" /><Stat label="Bell count" value={values.length.toString()} /></div>
    </Figure>
  );
}

function decodePrufer(code: number[]) {
  const size = code.length + 2;
  const degree = Array.from({ length: size + 1 }, () => 1);
  for (const value of code) degree[value] += 1;
  const edges: Array<[number, number]> = [];
  for (const value of code) {
    let leaf = 1;
    while (degree[leaf] !== 1) leaf += 1;
    edges.push([leaf, value]);
    degree[leaf] -= 1;
    degree[value] -= 1;
  }
  const remaining = degree.map((value, index) => value === 1 ? index : 0).filter(Boolean);
  edges.push([remaining[0], remaining[1]]);
  return edges;
}

export function TcpTreeGeneratorLab() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(4);
  const [c, setC] = useState(2);
  const code = [a, b, c];
  const edges = decodePrufer(code);
  return (
    <Figure caption="A Prüfer sequence of length n−2 bijects with labeled trees on n vertices; decoding repeatedly connects the smallest degree-one label.">
      <div className="grid gap-4 sm:grid-cols-3">{code.map((value, index) => <label key={index} className="text-sm font-semibold text-primary">code[{index}] = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={value} onChange={(event) => [setA, setB, setC][index](Number(event.target.value))} /></label>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Prüfer code" value={code.join(" ")} /><Stat label="tree edges" value={edges.map(([left, right]) => `${left}-${right}`).join(" · ")} tone="success" /><Stat label="edge count" value={edges.length.toString()} /></div>
    </Figure>
  );
}

export function TcpGenerationCertificateLab() {
  const [valid, setValid] = useState(true);
  const [unique, setUnique] = useState(false);
  const [complete, setComplete] = useState(true);
  const [transition, setTransition] = useState(false);
  const certified = valid && unique && complete && transition;
  return (
    <Figure caption="A combinatorial generator certificate checks validity, uniqueness, exact count or rank coverage, and the promised transition or amortized-cost rule.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={valid} onChange={(event) => setValid(event.target.checked)} />valid objects</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={unique} onChange={(event) => setUnique(event.target.checked)} />unique</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={complete} onChange={(event) => setComplete(event.target.checked)} />complete count</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={transition} onChange={(event) => setTransition(event.target.checked)} />transition cost</label></div>
      <div className="mt-4"><Stat label="Volume 4A generation certificate" value={certified ? "complete" : "incomplete"} tone={certified ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function TcpPolynomialsDiagram() {
  return <TcpBooleanBasicsLab />;
}
