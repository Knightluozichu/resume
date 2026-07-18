"use client";

import { useMemo, useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

export function PP2WordTokenLab() {
  const [mode, setMode] = useState<"whitespace" | "normalized" | "markup">("whitespace");
  const input = "<p>And and, AND&nbsp;pearls.</p>";
  const tokens = mode === "whitespace" ? ["<p>And", "and,", "AND&nbsp;pearls.</p>"] : mode === "normalized" ? ["and", "and", "and", "pearls"] : ["p", "And", "and", "AND", "nbsp", "pearls", "p"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">token contract<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="whitespace">book baseline: whitespace-delimited</option><option value="normalized">strip markup, punctuation, fold case</option><option value="markup">naive alphanumeric scan</option></select></label>
        <div className="mt-4 border border-border p-3 font-mono text-xs text-secondary">{input}</div>
        <div className="mt-3 flex flex-wrap gap-2">{tokens.map((token, index) => <span key={`${token}-${index}`} className="border border-accent px-2 py-1 font-mono text-xs text-accent">{token}</span>)}</div>
        <div className="mt-3 text-xs text-secondary">tokens = {tokens.length}, distinct exact strings = {new Set(tokens).size}</div>
      </Panel>
      <Caption>A “word” is an interface decision: whitespace tokenization is simple, but markup, punctuation, entities, Unicode, and case change every downstream count.</Caption>
    </figure>
  );
}

export function PP2WordFrequencyLab() {
  const [top, setTop] = useState(7);
  const rows = [["the", 62053], ["and", 38546], ["of", 34375], ["to", 13352], ["And", 12734], ["that", 12428], ["in", 12154]] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">show top {top}<input className="mt-2 w-full accent-current" type="range" min="1" max="7" value={top} onChange={(event) => setTop(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{rows.slice(0, top).map(([word, count]) => <div key={word} className="grid grid-cols-[44px_1fr_70px] items-center gap-2 text-xs"><span className="font-mono text-secondary">{word}</span><span className="h-3 bg-border"><span className="block h-full bg-accent" style={{ width: `${count / rows[0][1] * 100}%` }} /></span><span className="text-right font-mono text-primary">{count.toLocaleString()}</span></div>)}</div>
        <div className="mt-3 border border-warning p-3 text-warning">Book baseline treats “and” and “And” as distinct keys.</div>
      </Panel>
      <Caption>In the book’s King James Bible run, “the” appears 62,053 times among 789,616 whitespace-delimited tokens; exact string identity controls the result.</Caption>
    </figure>
  );
}

export function PP2HashTableLab() {
  const [bins, setBins] = useState(29989);
  const distinct = 29131;
  const load = distinct / bins;
  const collisionModel = load * load / 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">hash bins = {bins.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="60000" step="1000" value={bins} onChange={(event) => setBins(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-6 gap-1 sm:grid-cols-12">{Array.from({ length: 12 }, (_, index) => { const depth = 1 + ((index * 7 + Math.round(load * 3)) % 4); return <div key={index} className="border border-border p-1"><div className="space-y-1">{Array.from({ length: depth }, (_, j) => <div key={j} className="h-2 bg-accent/30" />)}</div></div>; })}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">distinct words <span className="float-right font-mono">29,131</span></div><div className="border border-success p-3 text-success">load factor <span className="float-right font-mono">{load.toFixed(3)}</span></div><div className="border border-warning p-3 text-warning">collision pressure <span className="float-right font-mono">{collisionModel.toFixed(3)}</span></div></div>
      </Panel>
      <Caption>The custom word-frequency table uses separate chaining, 29,989 bins, and multiplier 31; a good table keeps most chains short but gives up ordered traversal.</Caption>
    </figure>
  );
}

export function PP2SuffixArrayLab() {
  const [sorted, setSorted] = useState(true);
  const suffixes = sorted ? ["a", "ana", "anana", "banana", "na", "nana"] : ["banana", "anana", "nana", "ana", "na", "a"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="flex items-center gap-2 text-sm text-primary"><input type="checkbox" checked={sorted} onChange={(event) => setSorted(event.target.checked)} />Sort suffix pointers lexicographically</label>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">{suffixes.map((suffix, index) => <div key={`${suffix}-${index}`} className={"border p-2 font-mono text-xs " + (sorted && (suffix === "ana" || suffix === "anana") ? "border-warning text-warning" : "border-border text-secondary")}><span className="mr-3 text-accent">a[{index}]</span>{suffix}</div>)}</div>
        <div className="mt-3 border border-success p-3 text-success">longest adjacent common prefix <span className="float-right font-mono">ana · 3</span></div>
      </Panel>
      <Caption>For “banana”, sorting pointers to every suffix brings the two occurrences of “ana” together without copying the substrings.</Caption>
    </figure>
  );
}

function commonPrefix(a: string, b: string) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) ++i;
  return i;
}

export function PP2LCPNeighborLab() {
  const suffixes = ["a", "ana", "anana", "banana", "na", "nana"];
  const [pair, setPair] = useState(1);
  const length = commonPrefix(suffixes[pair], suffixes[pair + 1]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">adjacent pair = {pair}, {pair + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={pair} onChange={(event) => setPair(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{[suffixes[pair], suffixes[pair + 1]].map((suffix, row) => <div key={row} className="border border-border p-3 font-mono text-primary"><span className="text-success">{suffix.slice(0, length)}</span><span className="text-secondary">{suffix.slice(length)}</span></div>)}</div>
        <div className="mt-3 border border-accent p-3 text-accent">comlen <span className="float-right font-mono">{length}</span></div>
      </Panel>
      <Caption>Any pair with the global longest common prefix becomes adjacent in lexicographic suffix order, so one linear neighbor scan finds the longest duplicate.</Caption>
    </figure>
  );
}

export function PP2PhraseSearchLab() {
  const [query, setQuery] = useState<"ana" | "ban" | "nan" | "apple">("ana");
  const suffixes = ["a", "ana", "anana", "banana", "na", "nana"];
  const matches = suffixes.filter((suffix) => suffix.startsWith(query));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">query phrase<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={query} onChange={(event) => setQuery(event.target.value as typeof query)}><option value="ana">ana</option><option value="ban">ban</option><option value="nan">nan</option><option value="apple">apple</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{suffixes.map((suffix) => <div key={suffix} className={"border p-2 text-center font-mono text-xs " + (suffix.startsWith(query) ? "border-success text-success" : "border-border text-secondary")}>{suffix}</div>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="border border-accent p-3 text-accent">lower-bound search <span className="float-right font-mono">O(log n)</span></div><div className="border border-warning p-3 text-warning">matching suffixes <span className="float-right font-mono">{matches.length}</span></div></div>
      </Panel>
      <Caption>A preprocessed suffix array supports phrase lookup by binary-searching the first matching suffix, then scanning the contiguous matching interval.</Caption>
    </figure>
  );
}

export function PP2MarkovOrderLab() {
  const [order, setOrder] = useState(2);
  const originality = Math.max(5, 100 - order * 18);
  const coherence = Math.min(95, 15 + order * 19);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">Markov order k = {order}<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={order} onChange={(event) => setOrder(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-accent p-4 text-accent"><div className="text-xs">local coherence model</div><div className="mt-1 font-mono text-2xl">{coherence}%</div></div><div className="border border-warning p-4 text-warning"><div className="text-xs">transition novelty model</div><div className="mt-1 font-mono text-2xl">{originality}%</div></div></div>
        <div className="mt-3 text-xs text-secondary">Higher order conditions each next token on more context, but increasingly copies long phrases from the training sample.</div>
      </Panel>
      <Caption>Order-0 preserves only token frequencies; increasing k preserves longer local contexts until generated text becomes near-verbatim fragments joined at random transitions.</Caption>
    </figure>
  );
}

export function PP2MarkovSuffixLab() {
  const [phrase, setPhrase] = useState<"the" | "people," | "of">("the");
  const rows = ["by the", "for the", "of the", "people", "people, for", "people, by", "the people,", "the people", "the people,"];
  const matching = rows.filter((row) => row.startsWith(phrase));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">current k-word phrase<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={phrase} onChange={(event) => setPhrase(event.target.value as typeof phrase)}><option value="the">the</option><option value="people,">people,</option><option value="of">of</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{rows.map((row, index) => <div key={`${row}-${index}`} className={"border p-2 font-mono text-xs " + (row.startsWith(phrase) ? "border-success text-success" : "border-border text-secondary")}>{row}</div>)}</div>
        <div className="mt-3 border border-accent p-3 text-accent">equal-prefix continuation occurrences <span className="float-right font-mono">{matching.length}</span></div>
      </Panel>
      <Caption>The word-boundary suffix array groups equal k-word contexts; duplicate rows remain because their multiplicity is the empirical transition probability.</Caption>
    </figure>
  );
}

export function PP2ReservoirChoiceLab() {
  const [seen, setSeen] = useState(3);
  const chance = 1 / seen;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">equal context occurrences scanned i = {seen}<input className="mt-2 w-full accent-current" type="range" min="1" max="20" value={seen} onChange={(event) => setSeen(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="border border-warning p-4 text-warning"><div className="text-xs">replace reservoir with current occurrence</div><div className="mt-1 font-mono text-2xl">1/{seen}</div></div><div className="border border-success p-4 text-success"><div className="text-xs">each seen occurrence after step</div><div className="mt-1 font-mono text-2xl">{(chance * 100).toFixed(2)}%</div></div></div>
      </Panel>
      <Caption>Reservoir sampling chooses uniformly among an unknown-length run of equal phrases in one pass, preserving duplicate continuation frequencies without storing the run.</Caption>
    </figure>
  );
}

export function PP2StringStructureMatrixLab() {
  const [need, setNeed] = useState<"count" | "order" | "phrase" | "markov">("count");
  const choice = { count: "hash table", order: "balanced map", phrase: "character suffix array", markov: "word-boundary suffix array" }[need];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">required operation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={need} onChange={(event) => setNeed(event.target.value as typeof need)}><option value="count">fast average word count</option><option value="order">ordered word report / predecessor</option><option value="phrase">substring and duplicate search</option><option value="markov">k-word contexts and weighted continuations</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border p-3 text-secondary">hashing<br /><span className="text-[10px]">average fast, no order</span></div><div className="border border-border p-3 text-secondary">balanced tree<br /><span className="text-[10px]">worst-case bounds, sorted</span></div><div className="border border-border p-3 text-secondary">suffix array<br /><span className="text-[10px]">near strings and binary search</span></div></div>
        <div className="mt-3 border border-accent p-3 text-accent">candidate to prototype <span className="float-right font-semibold">{choice}</span></div>
      </Panel>
      <Caption>String representation follows the operation: hashing exploits characters for average speed, trees preserve order, and suffix arrays expose shared prefixes.</Caption>
    </figure>
  );
}

export function PP2StringCertificateLab() {
  const [missing, setMissing] = useState<"none" | "token" | "oracle" | "adversarial" | "distribution" | "memory">("none");
  const checks = useMemo(() => ({ tokenContract: missing !== "token", differentialOracle: missing !== "oracle", adversarialPrefixes: missing !== "adversarial", randomDistribution: missing !== "distribution", memoryBound: missing !== "memory", termination: true }), [missing]);
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">string pipeline review<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={missing} onChange={(event) => setMissing(event.target.value as typeof missing)}><option value="none">complete evidence</option><option value="token">token/normalization contract missing</option><option value="oracle">count/LCP oracle missing</option><option value="adversarial">long common-prefix tests missing</option><option value="distribution">Markov distribution test missing</option><option value="memory">input/pointer budget missing</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The string-processing claim is ready for its stated corpus." : "The string pipeline is missing required evidence."}</div>
      </Panel>
      <Caption>Release evidence covers lexical semantics, exact oracles, pathological shared prefixes, empirical sampling, bounds, and explicit generation termination.</Caption>
    </figure>
  );
}
