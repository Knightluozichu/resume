"use client";

import { useMemo, useState } from "react";

const keys = ["by", "sea", "sells", "she", "shell", "shells", "shore", "the"];
const values = new Map(keys.map((key, index) => [key, index]));

function prefixSet(items: string[]) {
  const prefixes = new Set<string>([""]);
  for (const item of items) {
    for (let length = 1; length <= item.length; length++) prefixes.add(item.slice(0, length));
  }
  return prefixes;
}

const allPrefixes = prefixSet(keys);

function terminal(prefix: string) {
  return values.has(prefix);
}

export function Algs4StringSymbolTableMap() {
  const [length, setLength] = useState(6);
  const [alphabet, setAlphabet] = useState(26);
  const rows = [
    { name: "hash table", exact: "expected L", prefix: "scan all keys", structure: "buckets" },
    { name: "balanced BST", exact: "L log N", prefix: "range query", structure: "whole-key compare" },
    { name: "R-way trie", exact: "L", prefix: "L + output", structure: `${alphabet} links/node` },
    { name: "TST", exact: "L + compares", prefix: "L + output", structure: "3 links/node" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-secondary">key length L = {length}<input className="mt-2 w-full accent-current" type="range" min="2" max="24" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label>
          <label className="text-xs text-secondary">alphabet R = {alphabet}<input className="mt-2 w-full accent-current" type="range" min="4" max="256" step="2" value={alphabet} onChange={(event) => setAlphabet(Number(event.target.value))} /></label>
        </div>
        <div className="mt-4 overflow-hidden border border-border bg-background">
          <div className="grid grid-cols-[7rem_1fr_1fr_1fr] border-b border-border p-2 text-[10px] text-secondary"><span>structure</span><span>exact lookup</span><span>prefix</span><span>state</span></div>
          {rows.map((row) => <div key={row.name} className="grid grid-cols-[7rem_1fr_1fr_1fr] border-b border-border p-2 text-xs last:border-b-0"><span className="font-semibold text-primary">{row.name}</span><span className="text-secondary">{row.exact.replace("L", String(length))}</span><span className="text-secondary">{row.prefix.replace("L", String(length))}</span><span className="font-mono text-accent">{row.structure}</span></div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        String symbol table选择不仅看exact lookup；prefix、wildcard与longest-prefix operations决定tries的结构优势。
      </figcaption>
    </figure>
  );
}

export function Algs4RWayTrieLab() {
  const [query, setQuery] = useState("shells");
  const path = new Set(Array.from({ length: query.length + 1 }, (_, length) => query.slice(0, length)));
  const levels = Array.from({ length: Math.max(...keys.map((key) => key.length)) + 1 }, (_, depth) => [...allPrefixes].filter((prefix) => prefix.length === depth).sort());

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          query path
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={query} onChange={(event) => setQuery(event.target.value)}>
            {[...keys, "shark"].map((key) => <option key={key} value={key}>{key}</option>)}
          </select>
        </label>
        <div className="mt-4 space-y-2 overflow-x-auto">
          {levels.map((level, depth) => <div key={depth} className="grid grid-cols-[3rem_1fr] items-start gap-2"><span className="pt-2 text-[10px] text-secondary">d={depth}</span><div className="flex min-w-max gap-2">{level.map((prefix) => <div key={prefix || "root"} className={"min-w-12 border p-2 text-center text-xs " + (path.has(prefix) ? "border-accent bg-accent/10" : "border-border bg-background")}><div className="font-mono text-primary">{prefix || "root"}</div><div className={terminal(prefix) ? "text-success" : "text-secondary"}>{terminal(prefix) ? `val ${values.get(prefix)}` : "path"}</div></div>)}</div></div>)}
        </div>
        <div className={"mt-4 border p-3 text-sm " + (values.has(query) ? "border-success text-success" : allPrefixes.has(query) ? "border-warning text-warning" : "border-danger text-danger")}>{values.has(query) ? `exact key · value ${values.get(query)}` : allPrefixes.has(query) ? "prefix exists, but no value" : "first missing link ends search"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        R-way trie每个node代表一个prefix；node存在不等于key存在，只有non-null value标记word boundary。
      </figcaption>
    </figure>
  );
}

export function Algs4TrieGetPutLab() {
  const [operation, setOperation] = useState<"get" | "put">("get");
  const [digit, setDigit] = useState(3);
  const key = "shells";
  const boundedDigit = Math.min(digit, key.length);
  const prefix = key.slice(0, boundedDigit);
  const exists = allPrefixes.has(prefix);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          operation
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={operation} onChange={(event) => setOperation(event.target.value as "get" | "put")}>
            <option value="get">get(shells)</option>
            <option value="put">put(shells, 99)</option>
          </select>
        </label>
        <label className="mt-4 block text-xs text-secondary">digit d = {boundedDigit}<input className="mt-2 w-full accent-current" type="range" min="0" max={key.length} value={digit} onChange={(event) => setDigit(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap items-center gap-1">
          <div className="border border-accent p-2 font-mono text-xs text-accent">root</div>
          {Array.from(key).map((character, index) => <div key={index} className="contents"><span className="text-secondary">→</span><div className={"border p-2 font-mono text-xs " + (index < boundedDigit ? "border-accent text-accent" : "border-border text-secondary")}>{character}</div></div>)}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border p-3 text-secondary">prefix<div className="font-mono text-primary">{prefix || "root"}</div></div>
          <div className={"border p-3 " + (exists ? "border-success text-success" : "border-danger text-danger")}>node<div className="font-mono">{exists ? "exists" : operation === "put" ? "allocate" : "null"}</div></div>
          <div className="border border-warning p-3 text-warning">terminal action<div className="font-mono">{boundedDigit === key.length ? operation === "put" ? "replace val" : `return ${values.get(key)}` : "continue"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        get沿key characters走现有links；put遇null就allocate，并只在d等于key length时写value。
      </figcaption>
    </figure>
  );
}

export function Algs4PrefixCollectionLab() {
  const [prefix, setPrefix] = useState("sh");
  const matches = keys.filter((key) => key.startsWith(prefix));
  const visited = [...allPrefixes].filter((candidate) => candidate.startsWith(prefix));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          keysWithPrefix
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={prefix} onChange={(event) => setPrefix(event.target.value)}>
            {["", "s", "sh", "she", "se", "x"].map((item) => <option key={item || "all"} value={item}>{item || "(empty)"}</option>)}
          </select>
        </label>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_2fr]">
          <div className={"border p-3 text-xs " + (allPrefixes.has(prefix) ? "border-success text-success" : "border-danger text-danger")}>prefix node<div className="font-mono">{allPrefixes.has(prefix) ? prefix || "root" : "null"}</div></div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">subtrie nodes<div className="mt-1 font-mono text-primary">{visited.join(" · ") || "none"}</div></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{matches.map((key) => <div key={key} className="border border-accent bg-accent/10 px-3 py-2 font-mono text-sm text-primary">{key}</div>)}{matches.length === 0 ? <div className="text-sm text-secondary">no keys</div> : null}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Prefix query先用get定位prefix node，再只collect该subtrie中的terminal nodes，成本与prefix和output相关。
      </figcaption>
    </figure>
  );
}

function wildcardMatches(pattern: string, key: string) {
  return key.length === pattern.length && Array.from(pattern).every((character, index) => character === "." || character === key[index]);
}

export function Algs4WildcardLab() {
  const [pattern, setPattern] = useState(".he.l.");
  const [digit, setDigit] = useState(2);
  const boundedDigit = Math.min(digit, pattern.length);
  const candidates = keys.filter((key) => key.length >= boundedDigit && Array.from(pattern.slice(0, boundedDigit)).every((character, index) => character === "." || character === key[index]));
  const matches = keys.filter((key) => wildcardMatches(pattern, key));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          wildcard pattern
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={pattern} onChange={(event) => { setPattern(event.target.value); setDigit(0); }}>
            {[".he.l.", "s..", "sh...", "..e", "....."].map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="mt-4 block text-xs text-secondary">matched prefix length = {boundedDigit}<input className="mt-2 w-full accent-current" type="range" min="0" max={pattern.length} value={digit} onChange={(event) => setDigit(Number(event.target.value))} /></label>
        <div className="mt-4 flex gap-2">{Array.from(pattern).map((character, index) => <div key={index} className={"min-w-9 border p-2 text-center font-mono text-sm " + (index < boundedDigit ? character === "." ? "border-warning text-warning" : "border-accent text-accent" : "border-border text-secondary")}>{character}</div>)}</div>
        <div className="mt-4 border border-border bg-background p-3 text-xs text-secondary">active branches: <span className="font-mono text-primary">{candidates.join(" · ") || "none"}</span></div>
        <div className="mt-3 border border-success p-3 text-xs text-success">full matches: <span className="font-mono">{matches.join(" · ") || "none"}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Literal只沿一个child；dot wildcard枚举所有non-null children。只有pattern恰好耗尽且node有value才输出key。
      </figcaption>
    </figure>
  );
}

export function Algs4LongestPrefixLab() {
  const [query, setQuery] = useState("shellsort");
  const [digit, setDigit] = useState(5);
  const boundedDigit = Math.min(digit, query.length);
  const prefixes = Array.from({ length: boundedDigit + 1 }, (_, length) => query.slice(0, length));
  const boundaries = prefixes.filter((prefix) => values.has(prefix));
  const longest = keys.filter((key) => query.startsWith(key)).sort((left, right) => right.length - left.length)[0] ?? null;
  const pathAlive = allPrefixes.has(query.slice(0, boundedDigit));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          longestPrefixOf
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={query} onChange={(event) => { setQuery(event.target.value); setDigit(0); }}>
            {["shellsort", "shoreline", "seaside", "theory", "quicksort"].map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="mt-4 block text-xs text-secondary">scan d = {boundedDigit}<input className="mt-2 w-full accent-current" type="range" min="0" max={query.length} value={digit} onChange={(event) => setDigit(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap gap-1">{Array.from(query).map((character, index) => <div key={index} className={"border p-2 font-mono text-sm " + (index < boundedDigit ? "border-accent text-accent" : "border-border text-secondary")}>{character}</div>)}</div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className={"border p-3 " + (pathAlive ? "border-success text-success" : "border-danger text-danger")}>path<div className="font-mono">{pathAlive ? "alive" : "null"}</div></div>
          <div className="border border-warning p-3 text-warning">last boundary<div className="font-mono">{boundaries.at(-1) ?? "none"}</div></div>
          <div className="border border-accent p-3 text-accent">final answer<div className="font-mono">{longest ?? "null"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Longest-prefix scan每遇到non-null value就更新best length；link断开或query结束时返回最后一次word boundary。
      </figcaption>
    </figure>
  );
}

export function Algs4TrieDeleteLab() {
  const [key, setKey] = useState("shell");
  const [eager, setEager] = useState(true);
  const remaining = keys.filter((item) => item !== key);
  const livePrefixes = prefixSet(remaining);
  const retainedPrefixes = eager ? livePrefixes : allPrefixes;
  const dead = [...retainedPrefixes].filter((prefix) => prefix !== "" && !remaining.some((item) => item.startsWith(prefix)));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">delete key<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={key} onChange={(event) => setKey(event.target.value)}>{keys.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="mt-3 flex items-center gap-2 text-sm text-primary"><input type="checkbox" checked={eager} onChange={(event) => setEager(event.target.checked)} />eager prune empty subtries</label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border p-3 text-secondary">terminal action<div className="font-mono text-primary">val({key}) = null</div></div>
          <div className="border border-accent p-3 text-accent">retained nodes<div className="font-mono">{retainedPrefixes.size}</div></div>
          <div className={"border p-3 " + (dead.length === 0 ? "border-success text-success" : "border-warning text-warning")}>dead nodes<div className="font-mono">{dead.join(" · ") || "none"}</div></div>
        </div>
        <div className="mt-4 border border-border bg-background p-3 text-xs text-secondary">remaining keys: <span className="font-mono text-primary">{remaining.join(" · ")}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lazy delete只清value；eager delete回溯并删除无value且无children的nodes，但绝不能剪掉其他keys共享的prefix。
      </figcaption>
    </figure>
  );
}

type TstNode = {
  character: string;
  terminal: boolean;
  left: TstNode | null;
  middle: TstNode | null;
  right: TstNode | null;
};

function buildTst() {
  let root: TstNode | null = null;
  function put(node: TstNode | null, key: string, digit: number): TstNode {
    const character = key[digit];
    if (!node) node = { character, terminal: false, left: null, middle: null, right: null };
    if (character < node.character) node.left = put(node.left, key, digit);
    else if (character > node.character) node.right = put(node.right, key, digit);
    else if (digit < key.length - 1) node.middle = put(node.middle, key, digit + 1);
    else node.terminal = true;
    return node;
  }
  for (const key of keys) root = put(root, key, 0);
  return root;
}

const tstRoot = buildTst();

function tstTrace(query: string) {
  const steps: { node: string; keyCharacter: string; relation: "left" | "middle" | "right" | "match" }[] = [];
  let node = tstRoot;
  let digit = 0;
  while (node && digit < query.length) {
    const keyCharacter = query[digit];
    if (keyCharacter < node.character) {
      steps.push({ node: node.character, keyCharacter, relation: "left" });
      node = node.left;
    } else if (keyCharacter > node.character) {
      steps.push({ node: node.character, keyCharacter, relation: "right" });
      node = node.right;
    } else if (digit < query.length - 1) {
      steps.push({ node: node.character, keyCharacter, relation: "middle" });
      digit++;
      node = node.middle;
    } else {
      steps.push({ node: node.character, keyCharacter, relation: "match" });
      break;
    }
  }
  return steps;
}

function flattenTst(node: TstNode | null, output: TstNode[] = []) {
  if (!node) return output;
  output.push(node);
  flattenTst(node.left, output);
  flattenTst(node.middle, output);
  flattenTst(node.right, output);
  return output;
}

const tstNodes = flattenTst(tstRoot);

export function Algs4TstLab() {
  const [query, setQuery] = useState("shore");
  const [step, setStep] = useState(2);
  const trace = tstTrace(query);
  const state = trace[Math.min(step, trace.length - 1)];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">TST query<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={query} onChange={(event) => { setQuery(event.target.value); setStep(0); }}>{[...keys, "shark"].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="mt-4 block text-xs text-secondary">comparison step {Math.min(step + 1, trace.length)} of {trace.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={Math.max(0, trace.length - 1)} value={Math.min(step, trace.length - 1)} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border p-3 text-secondary">key char<div className="font-mono text-primary">{state?.keyCharacter ?? "∅"}</div></div>
          <div className="border border-accent p-3 text-accent">node char<div className="font-mono">{state?.node ?? "null"}</div></div>
          <div className="border border-warning p-3 text-warning">branch<div className="font-mono">{state?.relation ?? "stop"}</div></div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">{tstNodes.map((node, index) => <div key={`${node.character}-${index}`} className={"border p-2 text-center text-xs " + (state?.node === node.character ? "border-accent bg-accent/10" : "border-border bg-background")}><div className="font-mono text-primary">{node.character}</div><div className={node.terminal ? "text-success" : "text-secondary"}>{node.terminal ? "value" : "path"}</div><div className="font-mono text-[9px] text-secondary">{node.left?.character ?? "·"} | {node.middle?.character ?? "·"} | {node.right?.character ?? "·"}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        TST比较失败走left/right且不前进digit；字符相等才走middle并消费一个key character。
      </figcaption>
    </figure>
  );
}

export function Algs4TrieMemoryLab() {
  const [nodes, setNodes] = useState(1000);
  const [radix, setRadix] = useState(256);
  const pointerBytes = 8;
  const rWay = nodes * radix * pointerBytes;
  const tst = nodes * 3 * pointerBytes;
  const sparse = nodes * 2 * pointerBytes;
  const maximum = Math.max(rWay, tst, sparse);
  const rows = [
    { name: "dense R-way", bytes: rWay, note: `${radix} links/node` },
    { name: "TST", bytes: tst, note: "3 links/node" },
    { name: "sparse map", bytes: sparse, note: "illustrative 2 links/node" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">nodes = {nodes}<input className="mt-2 w-full accent-current" type="range" min="100" max="10000" step="100" value={nodes} onChange={(event) => setNodes(Number(event.target.value))} /></label><label className="text-xs text-secondary">R = {radix}<input className="mt-2 w-full accent-current" type="range" min="4" max="512" step="4" value={radix} onChange={(event) => setRadix(Number(event.target.value))} /></label></div>
        <div className="mt-4 space-y-3">{rows.map((row) => <div key={row.name} className="grid grid-cols-[7rem_1fr_6rem] items-center gap-2 text-xs"><span className="font-semibold text-primary">{row.name}</span><div className="h-4 border border-border bg-background"><div className="h-full bg-accent" style={{ width: `${(row.bytes / maximum) * 100}%` }} /></div><span className="text-right font-mono text-secondary">{(row.bytes / 1024).toFixed(1)} KiB</span><span className="text-secondary">{row.note}</span></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        图中只比较child-pointer量级；real objects还有headers、values与allocator overhead，但dense R-way的R倍风险仍清晰。
      </figcaption>
    </figure>
  );
}

type CertificateMode = "valid" | "missing terminal" | "extra terminal" | "dead node";

export function Algs4TrieCertificateLab() {
  const [mode, setMode] = useState<CertificateMode>("valid");
  const candidate = useMemo(() => {
    const terminals = new Set(keys);
    const nodes = new Set(allPrefixes);
    if (mode === "missing terminal") terminals.delete("she");
    if (mode === "extra terminal") terminals.add("sh");
    if (mode === "dead node") nodes.add("shz");
    return { terminals, nodes };
  }, [mode]);
  const expected = new Set(keys);
  const keySetCorrect = candidate.terminals.size === expected.size && [...expected].every((key) => candidate.terminals.has(key));
  const pathsExist = [...candidate.terminals].every((key) => Array.from({ length: key.length + 1 }, (_, length) => key.slice(0, length)).every((prefix) => candidate.nodes.has(prefix)));
  const noDeadNodes = [...candidate.nodes].every((prefix) => prefix === "" || [...candidate.terminals].some((key) => key.startsWith(prefix)));
  const accepted = keySetCorrect && pathsExist && noDeadNodes;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">candidate trie<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as CertificateMode)}><option value="valid">valid</option><option value="missing terminal">missing terminal</option><option value="extra terminal">extra terminal</option><option value="dead node">dead node</option></select></label>
        <div className="mt-4 flex flex-wrap gap-2">{[...candidate.terminals].sort().map((key) => <div key={key} className="border border-border bg-background px-3 py-2 font-mono text-xs text-primary">{key}</div>)}</div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className={"border p-3 " + (keySetCorrect ? "border-success text-success" : "border-danger text-danger")}>enumerated keys<div className="font-mono">{keySetCorrect ? "pass" : "mismatch"}</div></div>
          <div className={"border p-3 " + (pathsExist ? "border-success text-success" : "border-danger text-danger")}>terminal paths<div className="font-mono">{pathsExist ? "pass" : "missing node"}</div></div>
          <div className={"border p-3 " + (noDeadNodes ? "border-success text-success" : "border-danger text-danger")}>eager pruning<div className="font-mono">{noDeadNodes ? "pass" : "dead node"}</div></div>
        </div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "certificate accepted" : "certificate rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Trie certificate核对enumerated terminal set、每个terminal完整path及eager模式无dead nodes；node count alone没有证明力。
      </figcaption>
    </figure>
  );
}
