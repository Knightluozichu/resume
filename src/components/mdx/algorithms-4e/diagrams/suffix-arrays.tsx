"use client";

import { useMemo, useState } from "react";

function compareSuffix(text: string, left: number, right: number) {
  let i = left;
  let j = right;
  while (i < text.length && j < text.length) {
    if (text.charCodeAt(i) !== text.charCodeAt(j)) return text.charCodeAt(i) - text.charCodeAt(j);
    i += 1;
    j += 1;
  }
  return (text.length - left) - (text.length - right);
}

function makeSuffixArray(text: string) {
  return Array.from({ length: text.length }, (_, index) => index)
    .sort((left, right) => compareSuffix(text, left, right));
}

function lcpAt(text: string, left: number, right: number) {
  let length = 0;
  while (left + length < text.length && right + length < text.length && text[left + length] === text[right + length]) {
    length += 1;
  }
  return length;
}

function makeLcpArray(text: string, suffixArray: number[]) {
  return suffixArray.map((offset, rank) => rank === 0 ? 0 : lcpAt(text, suffixArray[rank - 1], offset));
}

function compareQuery(text: string, query: string, offset: number) {
  let index = 0;
  while (index < query.length && offset + index < text.length) {
    if (query.charCodeAt(index) !== text.charCodeAt(offset + index)) {
      return query.charCodeAt(index) - text.charCodeAt(offset + index);
    }
    index += 1;
  }
  return query.length - (text.length - offset);
}

function rankTrace(text: string, suffixArray: number[], query: string) {
  let low = 0;
  let high = suffixArray.length - 1;
  const steps: { low: number; high: number; middle: number; comparison: number }[] = [];
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    const comparison = compareQuery(text, query, suffixArray[middle]);
    steps.push({ low, high, middle, comparison });
    if (comparison < 0) high = middle - 1;
    else if (comparison > 0) low = middle + 1;
    else return { rank: middle, steps };
  }
  return { rank: low, steps };
}

function longestRepeatedSubstring(text: string, suffixArray: number[]) {
  const lcp = makeLcpArray(text, suffixArray);
  let bestRank = 0;
  for (let rank = 1; rank < lcp.length; rank++) {
    if (lcp[rank] > lcp[bestRank]) bestRank = rank;
  }
  return {
    value: text.slice(suffixArray[bestRank], suffixArray[bestRank] + lcp[bestRank]),
    length: lcp[bestRank],
    rank: bestRank,
  };
}

const samples = ["ABRACADABRA!", "MISSISSIPPI", "BANANA", "ABACADABA"];

export function Algs4SuffixSetMap() {
  const [text, setText] = useState("BANANA");
  const [offset, setOffset] = useState(2);
  const boundedOffset = Math.min(offset, text.length - 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">text<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={text} onChange={(event) => { setText(event.target.value); setOffset(0); }}>{samples.map((sample) => <option key={sample}>{sample}</option>)}</select></label>
        <label className="mt-3 block text-xs text-secondary">suffix offset = {boundedOffset}<input className="mt-2 w-full accent-current" type="range" min="0" max={Math.max(0, text.length - 1)} value={boundedOffset} onChange={(event) => setOffset(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap gap-1">{Array.from(text).map((character, index) => <div key={index} className={"grid h-10 w-10 place-items-center border font-mono " + (index >= boundedOffset ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary")}>{character}<span className="text-[8px]">{index}</span></div>)}</div>
        <div className="mt-3 border border-accent p-3 font-mono text-accent">text[{boundedOffset}..N) = {text.slice(boundedOffset)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        A length-N text has exactly N nonempty suffixes；each suffix is represented by one offset into the original text.
      </figcaption>
    </figure>
  );
}

export function Algs4SuffixSortLab() {
  const [text, setText] = useState("BANANA");
  const suffixArray = useMemo(() => makeSuffixArray(text), [text]);
  const [rank, setRank] = useState(2);
  const boundedRank = Math.min(rank, suffixArray.length - 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">source<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={text} onChange={(event) => { setText(event.target.value); setRank(0); }}>{samples.map((sample) => <option key={sample}>{sample}</option>)}</select></label>
        <label className="mt-3 block text-xs text-secondary">sorted rank = {boundedRank}<input className="mt-2 w-full accent-current" type="range" min="0" max={Math.max(0, suffixArray.length - 1)} value={boundedRank} onChange={(event) => setRank(Number(event.target.value))} /></label>
        <div className="mt-4 max-h-64 overflow-auto border border-border bg-background">{suffixArray.map((offset, index) => <div key={offset} className={"grid grid-cols-[3rem_3rem_1fr] border-b border-border p-2 font-mono text-xs last:border-b-0 " + (index === boundedRank ? "bg-warning/10 text-warning" : "text-secondary")}><span>r{index}</span><span>i{offset}</span><span className="truncate">{text.slice(offset)}</span></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Suffix sorting orders all text[i..N) lexicographically；suffix array stores the corresponding offsets in rank order.
      </figcaption>
    </figure>
  );
}

export function Algs4OffsetRepresentationLab() {
  const [length, setLength] = useState(10000);
  const copiedCharacters = length * (length + 1) / 2;
  const offsetBytes = length * 4;
  const copiedBytes = copiedCharacters * 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">text length N = {length.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="50000" step="1000" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-danger p-4 text-center"><div className="text-xs text-secondary">copy every suffix</div><div className="font-mono text-xl text-danger">{(copiedBytes / 1_000_000).toFixed(1)} MB</div></div><div className="border border-success p-4 text-center"><div className="text-xs text-secondary">int offset array</div><div className="font-mono text-xl text-success">{(offsetBytes / 1000).toFixed(1)} KB</div></div></div>
        <div className="mt-3 text-[10px] text-secondary">Illustration assumes 2-byte code units and 4-byte offsets, excluding runtime object overhead.</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Materializing all suffix strings is quadratic space；offset views keep the index linear in N.
      </figcaption>
    </figure>
  );
}

export function Algs4LcpArrayLab() {
  const [text, setText] = useState("BANANA");
  const suffixArray = useMemo(() => makeSuffixArray(text), [text]);
  const lcp = useMemo(() => makeLcpArray(text, suffixArray), [text, suffixArray]);
  const [rank, setRank] = useState(3);
  const boundedRank = Math.max(1, Math.min(rank, suffixArray.length - 1));
  const length = lcp[boundedRank];
  const left = text.slice(suffixArray[boundedRank - 1]);
  const right = text.slice(suffixArray[boundedRank]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">text<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={text} onChange={(event) => { setText(event.target.value); setRank(1); }}>{samples.map((sample) => <option key={sample}>{sample}</option>)}</select></label>
        <label className="mt-3 block text-xs text-secondary">adjacent rank pair {boundedRank - 1}/{boundedRank}<input className="mt-2 w-full accent-current" type="range" min="1" max={Math.max(1, suffixArray.length - 1)} value={boundedRank} onChange={(event) => setRank(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="border border-border p-3 font-mono text-xs text-primary"><span className="bg-success/20 text-success">{left.slice(0, length)}</span>{left.slice(length)}</div><div className="border border-border p-3 font-mono text-xs text-primary"><span className="bg-success/20 text-success">{right.slice(0, length)}</span>{right.slice(length)}</div></div>
        <div className="mt-3 border border-success p-3 text-sm text-success">lcp({boundedRank}) = {length} · {right.slice(0, length) || "empty"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LCP array stores longest common prefix length for each adjacent pair in lexicographic suffix order.
      </figcaption>
    </figure>
  );
}

export function Algs4LongestRepeatedSubstringLab() {
  const [text, setText] = useState("BANANA");
  const suffixArray = useMemo(() => makeSuffixArray(text), [text]);
  const lcp = useMemo(() => makeLcpArray(text, suffixArray), [text, suffixArray]);
  const best = longestRepeatedSubstring(text, suffixArray);
  const maximum = Math.max(1, ...lcp);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">text<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={text} onChange={(event) => setText(event.target.value)}>{samples.map((sample) => <option key={sample}>{sample}</option>)}</select></label>
        <div className="mt-4 flex h-32 items-end gap-1 border-b border-border">{lcp.map((value, rank) => <div key={rank} className={"min-w-5 flex-1 " + (rank === best.rank ? "bg-warning" : "bg-accent")} style={{ height: `${Math.max(4, value / maximum * 100)}%` }} title={`rank ${rank}: ${value}`} />)}</div>
        <div className="mt-3 border border-warning p-3 text-center"><div className="text-xs text-secondary">longest repeated substring</div><div className="font-mono text-xl text-warning">{best.value || "none"} · length {best.length}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Any repeated substring prefixes at least two suffixes；its two closest lexicographic witnesses make the optimum appear in adjacent LCP.
      </figcaption>
    </figure>
  );
}

export function Algs4SuffixRankLab() {
  const text = "ABRACADABRA!";
  const suffixArray = useMemo(() => makeSuffixArray(text), []);
  const [query, setQuery] = useState("ABRA");
  const result = rankTrace(text, suffixArray, query);
  const [step, setStep] = useState(0);
  const boundedStep = Math.min(step, result.steps.length - 1);
  const current = result.steps[boundedStep];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">query<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={query} onChange={(event) => { setQuery(event.target.value); setStep(0); }}><option>ABRA</option><option>CAD</option><option>RA</option><option>XYZ</option></select></label>
        <label className="mt-3 block text-xs text-secondary">binary-search step {boundedStep + 1} / {result.steps.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={Math.max(0, result.steps.length - 1)} value={boundedStep} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs"><div className="border border-border p-3 text-secondary">lo<div className="font-mono text-primary">{current.low}</div></div><div className="border border-warning p-3 text-warning">mid {current.middle}<div className="truncate font-mono">{text.slice(suffixArray[current.middle])}</div></div><div className="border border-border p-3 text-secondary">hi<div className="font-mono text-primary">{current.high}</div></div></div>
        <div className="mt-3 border border-accent p-3 text-sm text-accent">rank(query) = {result.rank}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rank is the insertion position among sorted suffixes；binary search costs O(K log N) character work in the basic implementation.
      </figcaption>
    </figure>
  );
}

const kwicText = "it was the best of times it was the worst of times and the age of wisdom";

export function Algs4KwicLab() {
  const suffixArray = useMemo(() => makeSuffixArray(kwicText), []);
  const [query, setQuery] = useState("times");
  const [context, setContext] = useState(8);
  const start = rankTrace(kwicText, suffixArray, query).rank;
  const matches: number[] = [];
  for (let rank = start; rank < suffixArray.length; rank++) {
    const offset = suffixArray[rank];
    if (!kwicText.startsWith(query, offset)) break;
    matches.push(offset);
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">keyword<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={query} onChange={(event) => setQuery(event.target.value)}><option>times</option><option>the</option><option>was</option><option>missing</option></select></label><label className="text-xs text-secondary">context = {context}<input className="mt-2 w-full accent-current" type="range" min="3" max="15" value={context} onChange={(event) => setContext(Number(event.target.value))} /></label></div>
        <div className="mt-4 space-y-2">{matches.map((offset) => { const from = Math.max(0, offset - context); const to = Math.min(kwicText.length, offset + query.length + context); return <div key={offset} className="border border-border bg-background p-3 font-mono text-xs text-secondary">{kwicText.slice(from, offset)}<span className="bg-warning/20 text-warning">{query}</span>{kwicText.slice(offset + query.length, to)}</div>; })}{matches.length === 0 ? <div className="border border-danger p-3 text-danger">no occurrences</div> : null}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Keyword in context starts at rank(query) and scans one contiguous suffix interval while prefixes equal the query.
      </figcaption>
    </figure>
  );
}

export function Algs4ThreeWaySuffixSortLab() {
  const text = "BANANA\0";
  const offsets = [0, 1, 2, 3, 4, 5];
  const [depth, setDepth] = useState(0);
  const pivot = text.charCodeAt(offsets[0] + depth) || 0;
  const groups = {
    less: offsets.filter((offset) => (text.charCodeAt(offset + depth) || 0) < pivot),
    equal: offsets.filter((offset) => (text.charCodeAt(offset + depth) || 0) === pivot),
    greater: offsets.filter((offset) => (text.charCodeAt(offset + depth) || 0) > pivot),
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">character depth d = {depth}<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={depth} onChange={(event) => setDepth(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-3">{Object.entries(groups).map(([name, values], groupIndex) => <div key={name} className={"border p-3 " + (groupIndex === 0 ? "border-success text-success" : groupIndex === 1 ? "border-warning text-warning" : "border-accent text-accent")}><div className="text-xs font-semibold">{name} pivot {pivot === 0 ? "sentinel" : String.fromCharCode(pivot)}</div><div className="mt-2 space-y-1">{values.map((offset) => <div key={offset} className="font-mono text-xs">{offset}: {text.slice(offset).replace("\0", "␀")}</div>)}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SuffixArrayX uses 3-way radix quicksort on text[index[i] + d]；only equal partition recurses at depth d+1.
      </figcaption>
    </figure>
  );
}

export function Algs4SuffixCostLab() {
  const [length, setLength] = useState(10000);
  const comparisonSort = length * Math.log2(length);
  const worstCharacterWork = comparisonSort * length;
  const doublingWork = length * Math.log2(length);
  const maximum = worstCharacterWork;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">N = {length.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="50000" step="1000" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-3">{[{ name: "naive suffix compare worst scale", value: worstCharacterWork, tone: "bg-danger" }, { name: "rank-doubling target scale", value: doublingWork, tone: "bg-success" }].map((item) => <div key={item.name} className="grid grid-cols-[11rem_1fr_7rem] items-center gap-2 text-xs"><span className="text-primary">{item.name}</span><div className="h-4 border border-border bg-background"><div className={`h-full ${item.tone}`} style={{ width: `${Math.max(1, item.value / maximum * 100)}%` }} /></div><span className="text-right font-mono text-secondary">{Math.round(item.value).toLocaleString()}</span></div>)}</div>
        <div className="mt-3 text-[10px] text-secondary">Bars compare asymptotic work models; constants and alphabet/input distribution matter.</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Comparison sorting N suffix views may inspect long common prefixes；doubling algorithms reuse ranks to target O(N log N).
      </figcaption>
    </figure>
  );
}

export function Algs4LcpCertificateLab() {
  const text = "MISSISSIPPI";
  const suffixArray = useMemo(() => makeSuffixArray(text), []);
  const lcp = useMemo(() => makeLcpArray(text, suffixArray), [suffixArray]);
  const [rank, setRank] = useState(4);
  const boundedRank = Math.max(1, Math.min(rank, suffixArray.length - 1));
  const length = lcp[boundedRank];
  const left = suffixArray[boundedRank - 1];
  const right = suffixArray[boundedRank];
  const prefixEqual = text.slice(left, left + length) === text.slice(right, right + length);
  const maximal = left + length === text.length || right + length === text.length || text[left + length] !== text[right + length];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">LCP rank = {boundedRank}<input className="mt-2 w-full accent-current" type="range" min="1" max={suffixArray.length - 1} value={boundedRank} onChange={(event) => setRank(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className={"border p-3 text-xs " + (prefixEqual ? "border-success text-success" : "border-danger text-danger")}>first {length} chars equal<div className="font-mono">{String(prefixEqual)}</div></div><div className={"border p-3 text-xs " + (maximal ? "border-success text-success" : "border-danger text-danger")}>next char differs/end<div className="font-mono">{String(maximal)}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Exact LCP certificate proves both lower bound (prefix equal) and maximality (next symbols differ or one suffix ends).
      </figcaption>
    </figure>
  );
}

type SuffixCertificateMode = "valid" | "swap ranks" | "duplicate offset" | "wrong LCP";

export function Algs4SuffixCertificateLab() {
  const text = "BANANA";
  const [mode, setMode] = useState<SuffixCertificateMode>("valid");
  const expected = makeSuffixArray(text);
  const candidate = [...expected];
  if (mode === "swap ranks") [candidate[2], candidate[3]] = [candidate[3], candidate[2]];
  if (mode === "duplicate offset") candidate[2] = candidate[1];
  const candidateLcp = makeLcpArray(text, candidate);
  if (mode === "wrong LCP") candidateLcp[3] += 1;
  const permutation = new Set(candidate).size === text.length && candidate.every((offset) => offset >= 0 && offset < text.length);
  const sorted = candidate.every((offset, rank) => rank === 0 || compareSuffix(text, candidate[rank - 1], offset) < 0);
  const exactLcp = candidateLcp.every((value, rank) => rank === 0 || value === lcpAt(text, candidate[rank - 1], candidate[rank]));
  const inverse = candidate.every((offset, rank) => rankTrace(text, candidate, text.slice(offset)).rank === rank);
  const accepted = permutation && sorted && exactLcp && inverse;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">candidate index<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as SuffixCertificateMode)}><option>valid</option><option>swap ranks</option><option>duplicate offset</option><option>wrong LCP</option></select></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{[["permutation", permutation], ["sorted", sorted], ["exact LCP", exactLcp], ["rank/select", inverse]].map(([name, valid]) => <div key={String(name)} className={"border p-3 text-center text-xs " + (valid ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{valid ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "suffix-array certificate accepted" : "suffix-array certificate rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Certificate checks offset permutation、strict suffix order、exact adjacent LCP and rank(select(i)) = i.
      </figcaption>
    </figure>
  );
}
