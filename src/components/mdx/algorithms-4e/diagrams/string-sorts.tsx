"use client";

import { useMemo, useState } from "react";

type TaggedString = { value: string; id: string };

const fixedWords = ["dab", "cab", "fad", "bad", "dad", "ebb", "ace", "add"];
const variableWords = ["she", "sells", "sea", "shells", "shore", "by", "the", "surely"];

function characterCode(value: string, digit: number) {
  return digit < value.length ? value.charCodeAt(digit) - 97 : -1;
}

function wordCells(word: string, activeDigit?: number) {
  return (
    <span className="inline-flex font-mono">
      {Array.from(word).map((character, index) => (
        <span key={index} className={index === activeDigit ? "bg-warning/20 text-warning" : "text-primary"}>{character}</span>
      ))}
      {activeDigit === word.length ? <span className="bg-danger/10 px-0.5 text-danger">∅</span> : null}
    </span>
  );
}

export function Algs4AlphabetCostMap() {
  const [alphabet, setAlphabet] = useState<"DNA" | "lowercase" | "ASCII" | "Unicode">("lowercase");
  const configurations = {
    DNA: { size: 4, sample: "ACTG", countSpace: 5 },
    lowercase: { size: 26, sample: "algorithm", countSpace: 27 },
    ASCII: { size: 256, sample: "A7!z", countSpace: 257 },
    Unicode: { size: 1114112, sample: "字符🙂", countSpace: 1114113 },
  };
  const current = configurations[alphabet];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          alphabet contract
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={alphabet} onChange={(event) => setAlphabet(event.target.value as keyof typeof configurations)}>
            {Object.keys(configurations).map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-accent p-3 text-accent">radix R<div className="font-mono">{current.size.toLocaleString()}</div></div>
          <div className="border border-warning p-3 text-warning">count slots<div className="font-mono">{current.countSpace.toLocaleString()}</div></div>
          <div className="border border-success p-3 text-success">sample<div className="font-mono break-all">{current.sample}</div></div>
        </div>
        <div className="mt-4 grid grid-cols-[7rem_1fr] items-center gap-3 border border-border bg-background p-3 text-xs">
          <span className="text-secondary">direct count array</span>
          <div className="h-3 bg-border"><div className="h-3 bg-accent" style={{ width: `${Math.max(1, Math.min(100, (current.countSpace / 257) * 100))}%` }} /></div>
          <span className="text-secondary">engineering verdict</span>
          <span className={current.size <= 256 ? "text-success" : "text-danger"}>{current.size <= 256 ? "dense radix array is practical" : "compress alphabet or avoid dense R-sized arrays"}</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        String sorts把字符映射为0到R-1的keys；R同时决定count array空间与每轮初始化成本。
      </figcaption>
    </figure>
  );
}

const countingInput: TaggedString[] = [
  { value: "B", id: "B₀" },
  { value: "D", id: "D₀" },
  { value: "A", id: "A₀" },
  { value: "C", id: "C₀" },
  { value: "B", id: "B₁" },
  { value: "A", id: "A₁" },
  { value: "D", id: "D₁" },
  { value: "B", id: "B₂" },
];

function countingData() {
  const radix = 4;
  const frequencies = Array(radix).fill(0);
  for (const item of countingInput) frequencies[item.value.charCodeAt(0) - 65]++;
  const starts = Array(radix + 1).fill(0);
  for (let key = 0; key < radix; key++) starts[key + 1] = starts[key] + frequencies[key];
  const next = starts.slice(0, radix);
  const output: TaggedString[] = Array(countingInput.length);
  for (const item of countingInput) {
    const key = item.value.charCodeAt(0) - 65;
    output[next[key]++] = item;
  }
  return { frequencies, starts, output };
}

const counting = countingData();

export function Algs4KeyIndexedCountingLab() {
  const [phase, setPhase] = useState(0);
  const phases = ["input", "frequency", "cumulates", "stable distribute"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          phase {phase + 1} · {phases[phase]}
          <input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={phase} onChange={(event) => setPhase(Number(event.target.value))} />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {(phase === 3 ? counting.output : countingInput).map((item, index) => (
            <div key={`${item.id}-${index}`} className="min-w-12 border border-border bg-background p-2 text-center">
              <div className="font-mono text-sm text-primary">{item.id}</div>
              <div className="text-[10px] text-secondary">index {index}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {["A", "B", "C", "D"].map((key, index) => (
            <div key={key} className="border border-border bg-background p-3 text-center text-xs">
              <div className="font-semibold text-primary">{key}</div>
              <div className="font-mono text-secondary">freq {phase >= 1 ? counting.frequencies[index] : "?"}</div>
              <div className="font-mono text-accent">start {phase >= 2 ? counting.starts[index] : "?"}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Key-indexed counting依次做frequency、cumulates、left-to-right distribute和copy-back，成本Theta(N+R)。
      </figcaption>
    </figure>
  );
}

export function Algs4StabilityLab() {
  const [stable, setStable] = useState(true);
  const stableOutput = counting.output;
  const unstableOutput = ["A", "B", "C", "D"].flatMap((key) => countingInput.filter((item) => item.value === key).reverse());
  const output = stable ? stableOutput : unstableOutput;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={stable} onChange={(event) => setStable(event.target.checked)} />left-to-right stable distribution</label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="border border-border bg-background p-3">
            <div className="text-xs text-secondary">before</div>
            <div className="mt-2 flex flex-wrap gap-1">{countingInput.map((item) => <span key={item.id} className="border border-border px-2 py-1 font-mono text-xs text-primary">{item.id}</span>)}</div>
          </div>
          <div className={"border bg-background p-3 " + (stable ? "border-success" : "border-danger")}>
            <div className={stable ? "text-xs text-success" : "text-xs text-danger"}>{stable ? "equal-key order preserved" : "equal-key order reversed"}</div>
            <div className="mt-2 flex flex-wrap gap-1">{output.map((item) => <span key={item.id} className="border border-border px-2 py-1 font-mono text-xs text-primary">{item.id}</span>)}</div>
          </div>
        </div>
        <div className="mt-3 border border-warning p-3 text-xs text-warning">B identities: {output.filter((item) => item.value === "B").map((item) => item.id).join(" → ")}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LSD下一轮必须保留上一轮建立的less-significant-digit order；不稳定distribution会摧毁它。
      </figcaption>
    </figure>
  );
}

function stableCountDigit(input: string[], digit: number) {
  const radix = 26;
  const count = Array(radix + 1).fill(0);
  for (const word of input) count[characterCode(word, digit) + 1]++;
  for (let key = 0; key < radix; key++) count[key + 1] += count[key];
  const output = Array(input.length).fill("");
  for (const word of input) output[count[characterCode(word, digit)]++] = word;
  return output;
}

function lsdTrace() {
  const states: { digit: number; before: string[]; after: string[] }[] = [];
  let current = [...fixedWords];
  for (let digit = 2; digit >= 0; digit--) {
    const before = [...current];
    current = stableCountDigit(current, digit);
    states.push({ digit, before, after: [...current] });
  }
  return states;
}

const lsdStates = lsdTrace();

export function Algs4LsdRadixLab() {
  const [pass, setPass] = useState(0);
  const state = lsdStates[pass];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          LSD pass {pass + 1} · digit d={state.digit}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={lsdStates.length - 1} value={pass} onChange={(event) => setPass(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="border border-border bg-background p-3"><div className="text-xs text-secondary">before</div><div className="mt-2 grid grid-cols-4 gap-1">{state.before.map((word) => <div key={word} className="border border-border p-2 text-center text-sm">{wordCells(word, state.digit)}</div>)}</div></div>
          <div className="border border-success bg-background p-3"><div className="text-xs text-success">after stable counting</div><div className="mt-2 grid grid-cols-4 gap-1">{state.after.map((word) => <div key={word} className="border border-border p-2 text-center text-sm">{wordCells(word, state.digit)}</div>)}</div></div>
        </div>
        <div className="mt-3 border border-accent p-3 text-xs text-accent">sorted suffix width = {pass + 1} · order = <span className="font-mono">{state.after.join(" ")}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LSD从rightmost digit向left推进；每轮稳定后，已经处理的suffix保持lexicographically sorted。
      </figcaption>
    </figure>
  );
}

const signedIntegers = [-256, -2, -1, 0, 1, 255, 256];

function integerBytes(value: number) {
  return Array.from({ length: 4 }, (_, byte) => (value >> (byte * 8)) & 0xff);
}

export function Algs4SignedIntegerRadixLab() {
  const [index, setIndex] = useState(1);
  const value = signedIntegers[index];
  const bytes = integerBytes(value);
  const unsignedMsbRank = bytes[3];
  const signedMsbRank = unsignedMsbRank >= 128 ? unsignedMsbRank - 256 : unsignedMsbRank;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          32-bit integer = {value}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={signedIntegers.length - 1} value={index} onChange={(event) => setIndex(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {bytes.map((byte, digit) => <div key={digit} className={"border p-3 text-center " + (digit === 3 ? "border-warning" : "border-border")}><div className="text-[10px] text-secondary">byte d={digit}</div><div className="font-mono text-primary">{byte.toString(16).padStart(2, "0").toUpperCase()}</div><div className="font-mono text-xs text-secondary">{byte}</div></div>)}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-danger p-3 text-danger">unsigned MSB bucket<div className="font-mono">{unsignedMsbRank}</div></div>
          <div className="border border-success p-3 text-success">signed ordering rank<div className="font-mono">{signedMsbRank}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Integer LSD在most-significant byte需把0x80到0xFF buckets移到前面，才能让negative ints先于nonnegative ints。
      </figcaption>
    </figure>
  );
}

type MsdState = {
  lo: number;
  hi: number;
  digit: number;
  before: string[];
  after: string[];
  buckets: { key: number; words: string[] }[];
};

function msdTrace() {
  const array = [...variableWords];
  const states: MsdState[] = [];

  function sort(lo: number, hi: number, digit: number) {
    if (hi <= lo) return;
    const before = array.slice(lo, hi + 1);
    const groups = new Map<number, string[]>();
    for (const word of before) {
      const key = characterCode(word, digit);
      groups.set(key, [...(groups.get(key) ?? []), word]);
    }
    const buckets = [...groups.entries()].sort(([left], [right]) => left - right).map(([key, words]) => ({ key, words }));
    const after = buckets.flatMap((bucket) => bucket.words);
    array.splice(lo, after.length, ...after);
    states.push({ lo, hi, digit, before, after: [...after], buckets });
    let offset = lo;
    for (const bucket of buckets) {
      const next = offset + bucket.words.length;
      if (bucket.key >= 0 && bucket.words.length > 1) sort(offset, next - 1, digit + 1);
      offset = next;
    }
  }

  sort(0, array.length - 1, 0);
  return states;
}

const msdStates = msdTrace();

export function Algs4MsdRadixLab() {
  const [step, setStep] = useState(0);
  const state = msdStates[Math.min(step, msdStates.length - 1)];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          MSD recursive subarray [{state.lo},{state.hi}] · digit d={state.digit}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={msdStates.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">{state.after.map((word, index) => <div key={`${word}-${index}`} className="border border-border bg-background p-2 text-sm">{wordCells(word, state.digit)}</div>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {state.buckets.map((bucket) => <div key={bucket.key} className="border border-border bg-background p-3 text-xs"><div className={bucket.key === -1 ? "font-mono text-danger" : "font-mono text-accent"}>{bucket.key === -1 ? "sentinel -1" : `char ${String.fromCharCode(bucket.key + 97)}`}</div><div className="mt-1 font-mono text-primary">{bucket.words.join(" · ")}</div></div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MSD先按current digit分buckets，只对non-sentinel buckets递归到下一字符；不同prefix很早就停止比较。
      </figcaption>
    </figure>
  );
}

export function Algs4SentinelPrefixLab() {
  const [digit, setDigit] = useState(3);
  const pair = ["sea", "seashells"];
  const codes = pair.map((word) => characterCode(word, digit));
  const verdict = codes[0] === codes[1] ? "continue" : codes[0] < codes[1] ? "sea first" : "seashells first";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          compare digit d={digit}
          <input className="mt-2 w-full accent-current" type="range" min="0" max="8" value={digit} onChange={(event) => setDigit(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {pair.map((word, index) => <div key={word} className="border border-border bg-background p-4 text-center"><div className="text-lg">{wordCells(word, digit)}</div><div className="mt-2 font-mono text-xs text-secondary">charAt = {codes[index]}</div></div>)}
        </div>
        <div className={"mt-3 border p-3 text-center text-sm " + (verdict === "continue" ? "border-warning text-warning" : "border-success text-success")}>{verdict}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        charAt返回-1表示string结束；sentinel小于任何字符，保证prefix string排在其longer extension之前。
      </figcaption>
    </figure>
  );
}

type Quick3State = {
  lo: number;
  hi: number;
  digit: number;
  pivot: number;
  lt: number;
  gt: number;
  array: string[];
};

function quick3Trace() {
  const array = [...variableWords];
  const states: Quick3State[] = [];

  function sort(lo: number, hi: number, digit: number) {
    if (hi <= lo) return;
    let lt = lo;
    let gt = hi;
    const pivot = characterCode(array[lo], digit);
    let index = lo + 1;
    while (index <= gt) {
      const key = characterCode(array[index], digit);
      if (key < pivot) {
        [array[lt], array[index]] = [array[index], array[lt]];
        lt++;
        index++;
      } else if (key > pivot) {
        [array[index], array[gt]] = [array[gt], array[index]];
        gt--;
      } else {
        index++;
      }
    }
    states.push({ lo, hi, digit, pivot, lt, gt, array: [...array] });
    sort(lo, lt - 1, digit);
    if (pivot >= 0) sort(lt, gt, digit + 1);
    sort(gt + 1, hi, digit);
  }

  sort(0, array.length - 1, 0);
  return states;
}

const quick3States = quick3Trace();

export function Algs4Quick3StringLab() {
  const [step, setStep] = useState(0);
  const state = quick3States[Math.min(step, quick3States.length - 1)];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          3-way partition [{state.lo},{state.hi}] · d={state.digit} · pivot {state.pivot === -1 ? "∅" : String.fromCharCode(state.pivot + 97)}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={quick3States.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {state.array.map((word, index) => {
            const zone = index < state.lo || index > state.hi ? "border-border text-secondary" : index < state.lt ? "border-accent text-accent" : index <= state.gt ? "border-success text-success" : "border-warning text-warning";
            return <div key={`${word}-${index}`} className={`border bg-background p-2 text-sm ${zone}`}>{wordCells(word, state.digit)}</div>;
          })}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-accent p-3 text-accent">less<div className="font-mono">[{state.lo},{state.lt - 1}] same d</div></div>
          <div className="border border-success p-3 text-success">equal<div className="font-mono">[{state.lt},{state.gt}] d+1</div></div>
          <div className="border border-warning p-3 text-warning">greater<div className="font-mono">[{state.gt + 1},{state.hi}] same d</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        3-way string quicksort只让equal-character middle region前进到d+1；less与greater仍比较current digit。
      </figcaption>
    </figure>
  );
}

export function Algs4StringSortCostLab() {
  const [count, setCount] = useState(1000);
  const [width, setWidth] = useState(8);
  const [radix, setRadix] = useState(256);
  const estimates = [
    { name: "LSD", work: width * (count + radix), space: count + radix, promise: "fixed W" },
    { name: "MSD", work: count * Math.max(2, Math.log2(width + 1)) + radix, space: count + radix, promise: "variable keys" },
    { name: "Quick3", work: count * Math.log2(Math.max(2, count)), space: Math.log2(Math.max(2, count)), promise: "small effective R" },
  ];
  const maximum = Math.max(...estimates.map((item) => item.work));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs text-secondary">N = {count}<input className="mt-2 w-full accent-current" type="range" min="100" max="5000" step="100" value={count} onChange={(event) => setCount(Number(event.target.value))} /></label>
          <label className="text-xs text-secondary">W / average length = {width}<input className="mt-2 w-full accent-current" type="range" min="2" max="32" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label>
          <label className="text-xs text-secondary">R = {radix}<input className="mt-2 w-full accent-current" type="range" min="4" max="1024" step="4" value={radix} onChange={(event) => setRadix(Number(event.target.value))} /></label>
        </div>
        <div className="mt-4 space-y-3">
          {estimates.map((item) => <div key={item.name} className="grid grid-cols-[5rem_1fr_7rem] items-center gap-2 text-xs"><span className="font-semibold text-primary">{item.name}</span><div className="h-4 border border-border bg-background"><div className="h-full bg-accent" style={{ width: `${(item.work / maximum) * 100}%` }} /></div><span className="text-right font-mono text-secondary">{Math.round(item.work).toLocaleString()}</span><span className="text-secondary">{item.promise}</span><span className="col-span-2 font-mono text-[10px] text-secondary">extra state ≈ {Math.round(item.space).toLocaleString()}</span></div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Radix algorithms的成本依赖N、examined characters、R与input promise；这里只显示结构量级，不替代实际benchmark。
      </figcaption>
    </figure>
  );
}

type CertificateMode = "valid" | "prefix inversion" | "unstable equals" | "lost item";

const certificateInput: TaggedString[] = [
  { value: "sea", id: "sea₀" },
  { value: "shell", id: "shell₀" },
  { value: "sea", id: "sea₁" },
  { value: "shore", id: "shore₀" },
  { value: "she", id: "she₀" },
];

function validCertificateOutput() {
  return [...certificateInput].sort((left, right) => left.value < right.value ? -1 : left.value > right.value ? 1 : 0);
}

export function Algs4StringSortCertificateLab() {
  const [mode, setMode] = useState<CertificateMode>("valid");
  const output = useMemo(() => {
    const candidate = validCertificateOutput();
    if (mode === "prefix inversion") {
      const sea = candidate.findIndex((item) => item.value === "sea");
      const she = candidate.findIndex((item) => item.value === "she");
      [candidate[sea], candidate[she]] = [candidate[she], candidate[sea]];
    }
    if (mode === "unstable equals") {
      const equalIndices = candidate.flatMap((item, index) => item.value === "sea" ? [index] : []);
      [candidate[equalIndices[0]], candidate[equalIndices[1]]] = [candidate[equalIndices[1]], candidate[equalIndices[0]]];
    }
    if (mode === "lost item") candidate.pop();
    return candidate;
  }, [mode]);

  const sorted = output.every((item, index) => index === 0 || output[index - 1].value <= item.value);
  const inputIds = new Set(certificateInput.map((item) => item.id));
  const outputIds = new Set(output.map((item) => item.id));
  const permutation = output.length === certificateInput.length && inputIds.size === outputIds.size && [...inputIds].every((id) => outputIds.has(id));
  const originalRanks = new Map(certificateInput.map((item, index) => [item.id, index]));
  const stable = output.every((item, index) => index === 0 || output[index - 1].value !== item.value || (originalRanks.get(output[index - 1].id) ?? 0) < (originalRanks.get(item.id) ?? 0));
  const accepted = sorted && permutation && stable;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          candidate output
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as CertificateMode)}>
            <option value="valid">valid</option>
            <option value="prefix inversion">prefix inversion</option>
            <option value="unstable equals">unstable equals</option>
            <option value="lost item">lost item</option>
          </select>
        </label>
        <div className="mt-4 flex flex-wrap gap-2">{output.map((item) => <div key={item.id} className="border border-border bg-background p-2"><div className="font-mono text-sm text-primary">{item.value}</div><div className="font-mono text-[10px] text-secondary">{item.id}</div></div>)}</div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className={"border p-3 " + (sorted ? "border-success text-success" : "border-danger text-danger")}>lexicographic<div className="font-mono">{sorted ? "pass" : "fail"}</div></div>
          <div className={"border p-3 " + (permutation ? "border-success text-success" : "border-danger text-danger")}>permutation<div className="font-mono">{permutation ? "pass" : "fail"}</div></div>
          <div className={"border p-3 " + (stable ? "border-success text-success" : "border-danger text-danger")}>stability<div className="font-mono">{stable ? "pass" : "fail"}</div></div>
        </div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "certificate accepted" : "certificate rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Sort验收同时检查lexicographic order、input permutation与需要时的equal-key stability，不能只看首尾元素。
      </figcaption>
    </figure>
  );
}
