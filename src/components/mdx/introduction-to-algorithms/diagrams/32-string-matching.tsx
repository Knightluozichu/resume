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

const sampleText = "bacbabababacaca";
const samplePattern = "ababaca";

export function CLRS4AlignmentLab() {
  const [shift, setShift] = useState(4);
  const window = sampleText.slice(shift, shift + samplePattern.length);
  return (
    <Figure caption="A valid shift aligns the pattern under one length-m text window; an occurrence requires every aligned character to agree.">
      <label className="text-sm font-semibold text-primary">candidate shift s = {shift}<input className="mt-2 w-full accent-current" type="range" min="0" max={sampleText.length - samplePattern.length} value={shift} onChange={(event) => setShift(Number(event.target.value))} /></label>
      <div className="mt-4 overflow-x-auto font-mono text-sm"><div className="whitespace-pre text-secondary">{sampleText}</div><div className="whitespace-pre text-accent">{" ".repeat(shift)}{samplePattern}</div></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="aligned window" value={window} /><Stat label="occurrence" value={window === samplePattern ? "yes" : "no"} tone={window === samplePattern ? "success" : "warning"} /></div>
    </Figure>
  );
}

function comparisonCount(text: string, pattern: string, shift: number) {
  let comparisons = 0;
  for (let j = 0; j < pattern.length; j += 1) {
    comparisons += 1;
    if (text[shift + j] !== pattern[j]) return { comparisons, matched: false, mismatch: j };
  }
  return { comparisons, matched: true, mismatch: pattern.length };
}

export function CLRS4NaiveComparisonLab() {
  const [shift, setShift] = useState(2);
  const result = comparisonCount(sampleText, samplePattern, shift);
  return (
    <Figure caption="Naive matching scans left to right at every shift and forgets all partial-prefix information after the first mismatch.">
      <label className="text-sm font-semibold text-primary">tested shift = {shift}<input className="mt-2 w-full accent-current" type="range" min="0" max={sampleText.length - samplePattern.length} value={shift} onChange={(event) => setShift(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="comparisons" value={result.comparisons.toString()} /><Stat label="first mismatch j" value={result.matched ? "none" : result.mismatch.toString()} tone="warning" /><Stat label="full match" value={result.matched ? "yes" : "no"} tone={result.matched ? "success" : "accent"} /></div>
    </Figure>
  );
}

function charValue(char: string) {
  return char.charCodeAt(0) - 96;
}

function stringHash(value: string, radix: number, modulus: number) {
  return [...value].reduce((hash, char) => (hash * radix + charValue(char)) % modulus, 0);
}

export function CLRS4RollingHashLab() {
  const [shift, setShift] = useState(4);
  const modulus = 101;
  const window = sampleText.slice(shift, shift + samplePattern.length);
  const patternHash = stringHash(samplePattern, 26, modulus);
  const windowHash = stringHash(window, 26, modulus);
  return (
    <Figure caption="Rabin–Karp updates a length-m fingerprint in constant arithmetic per shift, then verifies characters only when hashes agree.">
      <label className="text-sm font-semibold text-primary">window shift = {shift}<input className="mt-2 w-full accent-current" type="range" min="0" max={sampleText.length - samplePattern.length} value={shift} onChange={(event) => setShift(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="pattern hash" value={patternHash.toString()} /><Stat label="window hash" value={windowHash.toString()} tone={windowHash === patternHash ? "warning" : "accent"} /><Stat label="action" value={windowHash === patternHash ? "verify characters" : "reject shift"} tone={windowHash === patternHash ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function CLRS4HashCollisionLab() {
  const [modulus, setModulus] = useState(11);
  const candidates = ["ababaca", "bababab", "abacaca", "bacabab", "cababac"];
  const groups = candidates.map((value) => ({ value, hash: stringHash(value, 26, modulus) }));
  const patternHash = groups[0].hash;
  const collisions = groups.filter((entry) => entry.hash === patternHash && entry.value !== samplePattern);
  return (
    <Figure caption="A hash hit is only a candidate: small moduli visibly create spurious hits, and even large randomized fingerprints require an explicit error or verification policy.">
      <label className="text-sm font-semibold text-primary">hash modulus q = {modulus}<input className="mt-2 w-full accent-current" type="range" min="2" max="31" value={modulus} onChange={(event) => setModulus(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{groups.map((entry) => <Stat key={entry.value} label={entry.value} value={entry.hash.toString()} tone={entry.hash === patternHash ? "warning" : "accent"} />)}</div>
      <div className="mt-4"><Stat label="spurious hits against pattern" value={collisions.length.toString()} tone={collisions.length === 0 ? "success" : "danger"} /></div>
    </Figure>
  );
}

function nextPrefixLength(pattern: string, current: number, char: string) {
  const candidate = pattern.slice(0, current) + char;
  for (let length = Math.min(pattern.length, candidate.length); length >= 0; length -= 1) {
    if (candidate.endsWith(pattern.slice(0, length))) return length;
  }
  return 0;
}

export function CLRS4AutomatonStateLab() {
  const [processed, setProcessed] = useState(8);
  let state = 0;
  for (const char of sampleText.slice(0, processed)) state = nextPrefixLength(samplePattern, state, char);
  return (
    <Figure caption="The string-matching automaton state q is the longest pattern prefix that is also a suffix of the processed text prefix.">
      <label className="text-sm font-semibold text-primary">processed text characters = {processed}<input className="mt-2 w-full accent-current" type="range" min="0" max={sampleText.length} value={processed} onChange={(event) => setProcessed(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="processed prefix" value={sampleText.slice(0, processed) || "ε"} /><Stat label="automaton state q" value={state.toString()} tone="success" /><Stat label="matched prefix" value={samplePattern.slice(0, state) || "ε"} /></div>
    </Figure>
  );
}

export function CLRS4TransitionTableLab() {
  const [state, setState] = useState(3);
  const alphabet = ["a", "b", "c"];
  return (
    <Figure caption="Precomputing δ(q,a) moves all fallback work into the transition table, leaving one state lookup per text character.">
      <label className="text-sm font-semibold text-primary">current state q = {state}<input className="mt-2 w-full accent-current" type="range" min="0" max={samplePattern.length} value={state} onChange={(event) => setState(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{alphabet.map((char) => <Stat key={char} label={`input '${char}'`} value={`δ=${nextPrefixLength(samplePattern, state, char)}`} tone="success" />)}</div>
    </Figure>
  );
}

function prefixFunction(pattern: string) {
  const pi = Array(pattern.length).fill(0) as number[];
  let k = 0;
  for (let q = 1; q < pattern.length; q += 1) {
    while (k > 0 && pattern[k] !== pattern[q]) k = pi[k - 1];
    if (pattern[k] === pattern[q]) k += 1;
    pi[q] = k;
  }
  return pi;
}

export function CLRS4PrefixFunctionLab() {
  const [position, setPosition] = useState(samplePattern.length - 1);
  const pi = prefixFunction(samplePattern);
  return (
    <Figure caption="π[q] stores the longest proper pattern prefix that is also a suffix ending at q, compacting all useful fallback edges.">
      <label className="text-sm font-semibold text-primary">pattern position q = {position}<input className="mt-2 w-full accent-current" type="range" min="0" max={samplePattern.length - 1} value={position} onChange={(event) => setPosition(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-7 gap-2">{[...samplePattern].map((char, index) => <div key={index} className={`border p-2 text-center font-mono text-xs ${index === position ? "border-warning text-warning" : "border-border text-secondary"}`}><div>{char}</div><div className="mt-1">π={pi[index]}</div></div>)}</div>
      <div className="mt-4"><Stat label="fallback prefix" value={samplePattern.slice(0, pi[position]) || "ε"} tone="success" /></div>
    </Figure>
  );
}

function kmpTrace(text: string, pattern: string) {
  const pi = prefixFunction(pattern);
  const states: number[] = [];
  const matches: number[] = [];
  let q = 0;
  for (let i = 0; i < text.length; i += 1) {
    while (q > 0 && pattern[q] !== text[i]) q = pi[q - 1];
    if (pattern[q] === text[i]) q += 1;
    states.push(q);
    if (q === pattern.length) {
      matches.push(i - pattern.length + 1);
      q = pi[q - 1];
    }
  }
  return { states, matches };
}

export function CLRS4KMPScanLab() {
  const [processed, setProcessed] = useState(10);
  const trace = kmpTrace(sampleText.slice(0, processed), samplePattern);
  const state = trace.states[trace.states.length - 1] ?? 0;
  return (
    <Figure caption="KMP scans the text once; mismatches change only the pattern state through π and never move the text index backward.">
      <label className="text-sm font-semibold text-primary">processed characters = {processed}<input className="mt-2 w-full accent-current" type="range" min="1" max={sampleText.length} value={processed} onChange={(event) => setProcessed(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="current q" value={state.toString()} /><Stat label="matched prefix" value={samplePattern.slice(0, state) || "ε"} tone="success" /><Stat label="occurrence shifts" value={trace.matches.length > 0 ? trace.matches.join(",") : "none"} tone={trace.matches.length > 0 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4KMPFallbackLab() {
  const [state, setState] = useState(6);
  const pi = prefixFunction(samplePattern);
  const chain: number[] = [];
  let q = state;
  while (q > 0) {
    chain.push(q);
    q = pi[q - 1];
  }
  chain.push(0);
  return (
    <Figure caption="A mismatch follows a chain of proper borders; the potential q drops on fallback and rises at most once per consumed text character.">
      <label className="text-sm font-semibold text-primary">state before mismatch = {state}<input className="mt-2 w-full accent-current" type="range" min="1" max={samplePattern.length} value={state} onChange={(event) => setState(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{chain.map((value, index) => <div key={`${value}-${index}`} className="border border-accent p-3 font-mono text-sm text-accent">q={value}</div>)}</div>
    </Figure>
  );
}

const suffixText = "banana$";
const suffixArray = Array.from({ length: suffixText.length }, (_, index) => index).sort((a, b) => suffixText.slice(a).localeCompare(suffixText.slice(b)));

export function CLRS4SuffixArrayLab() {
  const [rank, setRank] = useState(3);
  const start = suffixArray[rank];
  return (
    <Figure caption="A suffix array stores starting indices of all text suffixes in lexicographic order, replacing a pointer-heavy tree with one integer permutation.">
      <label className="text-sm font-semibold text-primary">suffix rank = {rank}<input className="mt-2 w-full accent-current" type="range" min="0" max={suffixArray.length - 1} value={rank} onChange={(event) => setRank(Number(event.target.value))} /></label>
      <div className="mt-4 space-y-2">{suffixArray.map((index, currentRank) => <div key={index} className={`grid grid-cols-[4rem_1fr] gap-2 border p-2 font-mono text-xs ${currentRank === rank ? "border-warning text-warning" : "border-border text-secondary"}`}><span>SA[{currentRank}]={index}</span><span>{suffixText.slice(index)}</span></div>)}</div>
      <div className="mt-4"><Stat label="selected suffix" value={suffixText.slice(start)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4SuffixSearchLab() {
  const [pattern, setPattern] = useState("ana");
  const hits = suffixArray.filter((start) => suffixText.slice(start).startsWith(pattern));
  const ranks = hits.map((start) => suffixArray.indexOf(start)).sort((a, b) => a - b);
  return (
    <Figure caption="All suffixes beginning with one pattern occupy a contiguous lexicographic interval, found by two binary-search boundaries.">
      <label className="text-sm font-semibold text-primary">query pattern<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={pattern} onChange={(event) => setPattern(event.target.value)}><option value="a">a</option><option value="ana">ana</option><option value="na">na</option><option value="ban">ban</option><option value="x">x</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="rank interval" value={ranks.length > 0 ? `[${ranks[0]},${ranks[ranks.length - 1]}]` : "empty"} /><Stat label="text positions" value={hits.length > 0 ? hits.join(",") : "none"} tone={hits.length > 0 ? "success" : "warning"} /><Stat label="occurrence count" value={hits.length.toString()} /></div>
    </Figure>
  );
}

function lcp(left: string, right: string) {
  let length = 0;
  while (length < left.length && length < right.length && left[length] === right[length]) length += 1;
  return length;
}

export function CLRS4LCPLab() {
  const [rank, setRank] = useState(2);
  const left = suffixText.slice(suffixArray[rank]);
  const right = suffixText.slice(suffixArray[rank + 1]);
  const length = lcp(left, right);
  return (
    <Figure caption="The LCP array stores common-prefix lengths of adjacent sorted suffixes, supporting repeated-pattern and accelerated-search queries.">
      <label className="text-sm font-semibold text-primary">adjacent rank pair = {rank},{rank + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={suffixArray.length - 2} value={rank} onChange={(event) => setRank(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left suffix" value={left} /><Stat label="right suffix" value={right} /><Stat label="LCP length" value={length.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4MatcherChoiceLab() {
  const [scenario, setScenario] = useState<"single" | "many-patterns" | "many-queries">("single");
  const recommendation = {
    single: ["KMP or verified Rabin–Karp", "preprocess pattern", "scan text once"],
    "many-patterns": ["automaton / multi-pattern index", "preprocess pattern set", "share text scan"],
    "many-queries": ["suffix array", "preprocess text", "binary-search each query"],
  }[scenario];
  return (
    <Figure caption="The right matcher depends on which object is reused: one pattern, many patterns, or one static text queried many times.">
      <label className="text-sm font-semibold text-primary">workload<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={scenario} onChange={(event) => setScenario(event.target.value as typeof scenario)}><option value="single">one pattern and one text</option><option value="many-patterns">many patterns over a stream</option><option value="many-queries">many queries over static text</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{recommendation.map((value, index) => <Stat key={value} label={["strategy", "preprocess", "query path"][index]} value={value} tone={index === 0 ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function CLRS4StringCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "empty" | "collision" | "overlap" | "encoding">("valid");
  const checks = {
    "empty-pattern policy is explicit": issue !== "empty",
    "hash hits are verified or probabilistic": issue !== "collision",
    "overlapping occurrences are retained": issue !== "overlap",
    "alphabet and indexing use one encoding": issue !== "encoding",
  };
  return (
    <Figure caption="A matching certificate fixes indexing, empty-pattern semantics, overlap policy, alphabet encoding, collision handling, and an independent occurrence oracle.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">validated matcher</option><option value="empty">empty pattern unspecified</option><option value="collision">hash equality trusted blindly</option><option value="overlap">overlapping match skipped</option><option value="encoding">bytes and code points mixed</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
