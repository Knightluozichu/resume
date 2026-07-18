"use client";

import { useMemo, useState } from "react";

const tokenStream = ["A", "B", "A", "C", "D", "B", "E", "C", "F", "A"] as const;
const policySet = new Set(["A", "C", "E"]);

type FilterMode = "dedup" | "allowlist" | "blocklist";

function filterPrefix(prefix: readonly string[], mode: FilterMode) {
  const seen = new Set<string>();
  const output: string[] = [];
  for (const token of prefix) {
    if (mode === "dedup") {
      if (!seen.has(token)) output.push(token);
      seen.add(token);
    } else if (mode === "allowlist") {
      if (policySet.has(token)) output.push(token);
    } else if (!policySet.has(token)) {
      output.push(token);
    }
  }
  return { output, seen };
}

export function Algs4SetFilterLab() {
  const [mode, setMode] = useState<FilterMode>("dedup");
  const [count, setCount] = useState(7);
  const prefix = tokenStream.slice(0, count);
  const result = filterPrefix(prefix, mode);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="set client">
          {(["dedup", "allowlist", "blocklist"] as FilterMode[]).map((option) => (
            <button key={option} type="button" onClick={() => setMode(option)} className={"min-h-10 border-r border-border px-2 py-2 text-xs last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}>{option}</button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">
          consumed tokens = {count}
          <input className="mt-2 w-full accent-current" type="range" min="1" max={tokenStream.length} value={count} onChange={(event) => setCount(Number(event.target.value))} />
        </label>
        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="border border-border bg-background p-3">
            <div className="mb-2 text-xs text-secondary">input stream</div>
            <div className="flex flex-wrap gap-1">{prefix.map((token, index) => <span key={index} className="border border-border px-2 py-1 font-mono text-xs text-primary">{token}</span>)}</div>
          </div>
          <div className="text-center font-mono text-secondary">→ SET →</div>
          <div className="border border-success bg-success/10 p-3">
            <div className="mb-2 text-xs text-secondary">output stream</div>
            <div className="flex flex-wrap gap-1">{result.output.map((token, index) => <span key={index} className="border border-success px-2 py-1 font-mono text-xs text-success">{token}</span>)}</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-secondary">
          <div className="border border-accent p-3">policy set<div className="font-mono text-accent">A C E</div></div>
          <div className="border border-warning p-3">seen keys<div className="font-mono text-warning">{[...result.seen].join(" ") || "not used"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SET只表达membership；同一个contains/add API通过predicate变化即可组成dedup、allowlist与blocklist clients。
      </figcaption>
    </figure>
  );
}

type SetOperation = "union" | "intersection" | "difference";
const setA = new Set(["A", "C", "E", "G", "I"]);
const setB = new Set(["B", "C", "E", "H", "I"]);

function applySetOperation(mode: SetOperation) {
  if (mode === "union") return [...new Set([...setA, ...setB])].sort();
  if (mode === "intersection") return [...setA].filter((key) => setB.has(key));
  return [...setA].filter((key) => !setB.has(key));
}

export function Algs4SetAlgebraLab() {
  const [mode, setMode] = useState<SetOperation>("intersection");
  const result = applySetOperation(mode);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="set operation">
          {(["union", "intersection", "difference"] as SetOperation[]).map((option) => (
            <button key={option} type="button" onClick={() => setMode(option)} className={"min-h-10 border-r border-border px-2 py-2 text-xs last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}>{option}</button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="border border-accent bg-accent/10 p-4 text-center"><div className="text-xs text-secondary">set A</div><div className="mt-2 font-mono text-accent">{[...setA].join(" ")}</div></div>
          <div className="border border-warning bg-warning/10 p-4 text-center"><div className="text-xs text-secondary">set B</div><div className="mt-2 font-mono text-warning">{[...setB].join(" ")}</div></div>
          <div className="border border-success bg-success/10 p-4 text-center"><div className="text-xs text-secondary">result</div><div className="mt-2 font-mono text-success">{result.join(" ") || "empty"}</div></div>
        </div>
        <div className="mt-4 border border-border bg-background p-3 text-xs text-secondary">
          Iterate <span className="font-mono text-primary">{mode === "intersection" ? "the smaller input" : "set A"}</span>; each membership test is delegated to the other SET.
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Set algebra不需要dummy values；intersection优先遍历smaller set可把contains次数限制在较小输入规模。
      </figcaption>
    </figure>
  );
}

const csvRows = [
  ["AU", "Gold", "79"],
  ["AG", "Silver", "47"],
  ["CU", "Copper", "29"],
  ["FE", "Iron", "26"],
  ["SI", "Silicon", "14"],
] as const;

export function Algs4DictionaryLookupLab() {
  const [keyField, setKeyField] = useState(0);
  const [valueField, setValueField] = useState(1);
  const [queryRow, setQueryRow] = useState(2);
  const query = csvRows[queryRow][keyField];
  const table = useMemo(() => new Map(csvRows.map((row) => [row[keyField], row[valueField]])), [keyField, valueField]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-primary">key field = {keyField}<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={keyField} onChange={(event) => setKeyField(Number(event.target.value))} /></label>
          <label className="text-sm font-semibold text-primary">value field = {valueField}<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={valueField} onChange={(event) => setValueField(Number(event.target.value))} /></label>
        </div>
        <div className="mt-5 overflow-hidden border border-border bg-background">
          {csvRows.map((row, rowIndex) => (
            <button key={row[0]} type="button" onClick={() => setQueryRow(rowIndex)} className={"grid w-full grid-cols-3 border-b border-border text-left text-xs last:border-b-0 " + (queryRow === rowIndex ? "bg-warning/10" : "") }>
              {row.map((cell, columnIndex) => <span key={columnIndex} className={"border-r border-border p-2 font-mono last:border-r-0 " + (columnIndex === keyField ? "text-accent" : columnIndex === valueField ? "text-success" : "text-secondary")}>{cell}</span>)}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center text-xs">
          <div className="border border-accent p-3 font-mono text-accent">get({query})</div>
          <div className="text-secondary">→</div>
          <div className="border border-success p-3 font-mono text-success">{table.get(query) ?? "Not found"}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Dictionary client把external records投影成one-key/one-value associations；field choice决定duplicate overwrite语义。
      </figcaption>
    </figure>
  );
}

const movieRows = [
  { movie: "Apollo", people: ["Ada", "Lin"] },
  { movie: "Binary", people: ["Lin", "Mina"] },
  { movie: "Cipher", people: ["Ada", "Noah"] },
  { movie: "Delta", people: ["Mina", "Noah"] },
] as const;

function buildBidirectionalIndex() {
  const movieToPeople = new Map<string, Set<string>>();
  const personToMovies = new Map<string, Set<string>>();
  for (const row of movieRows) {
    movieToPeople.set(row.movie, new Set(row.people));
    for (const person of row.people) {
      if (!personToMovies.has(person)) personToMovies.set(person, new Set());
      personToMovies.get(person)?.add(row.movie);
    }
  }
  return { movieToPeople, personToMovies };
}

type IndexDirection = "movie → people" | "person → movies";

export function Algs4BidirectionalIndexLab() {
  const [direction, setDirection] = useState<IndexDirection>("person → movies");
  const [queryIndex, setQueryIndex] = useState(1);
  const index = useMemo(() => buildBidirectionalIndex(), []);
  const options = direction === "movie → people" ? [...index.movieToPeople.keys()] : [...index.personToMovies.keys()];
  const query = options[queryIndex % options.length];
  const values = direction === "movie → people" ? index.movieToPeople.get(query) : index.personToMovies.get(query);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border" role="group" aria-label="index direction">
          {(["movie → people", "person → movies"] as IndexDirection[]).map((option) => <button key={option} type="button" onClick={() => { setDirection(option); setQueryIndex(0); }} className={"min-h-10 border-r border-border px-2 py-2 text-xs last:border-r-0 " + (direction === option ? "bg-primary text-background" : "bg-background text-secondary")}>{option}</button>)}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">query = {query}<input className="mt-2 w-full accent-current" type="range" min="0" max={Math.max(0, options.length - 1)} value={queryIndex} onChange={(event) => setQueryIndex(Number(event.target.value))} /></label>
        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="border border-accent bg-accent/10 p-4 text-center font-mono text-accent">{query}</div>
          <div className="text-center text-secondary">→ ST.get →</div>
          <div className="flex min-h-14 flex-wrap items-center justify-center gap-2 border border-success bg-success/10 p-3">{[...(values ?? [])].map((value) => <span key={value} className="border border-success px-2 py-1 font-mono text-xs text-success">{value}</span>)}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Multi-value relation仍是one value per key：value本身是SET；reverse lookup需要第二张ST，而不是扫描全部records。
      </figcaption>
    </figure>
  );
}

const documents = [
  { name: "alpha.txt", text: "graph search tree path" },
  { name: "beta.txt", text: "hash table search index" },
  { name: "gamma.txt", text: "graph index sparse path" },
  { name: "delta.txt", text: "tree sparse matrix search" },
] as const;
const queryPairs = [["graph"], ["search"], ["graph", "path"], ["sparse", "search"], ["index", "tree"]] as const;

function buildFileIndex() {
  const index = new Map<string, Set<string>>();
  for (const document of documents) {
    for (const term of new Set(document.text.split(/\s+/))) {
      if (!index.has(term)) index.set(term, new Set());
      index.get(term)?.add(document.name);
    }
  }
  return index;
}

export function Algs4FileIndexLab() {
  const [queryIndex, setQueryIndex] = useState(2);
  const index = useMemo(() => buildFileIndex(), []);
  const query = queryPairs[queryIndex];
  const postings = query.map((term) => index.get(term) ?? new Set<string>());
  const result = postings.length === 1 ? [...postings[0]] : [...postings[0]].filter((file) => postings.slice(1).every((set) => set.has(file)));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">query = {query.join(" AND ")}<input className="mt-2 w-full accent-current" type="range" min="0" max={queryPairs.length - 1} value={queryIndex} onChange={(event) => setQueryIndex(Number(event.target.value))} /></label>
        <div className="mt-5 space-y-2">
          {query.map((term, indexPosition) => <div key={term} className="grid grid-cols-[6rem_1fr] border border-border bg-background text-xs"><div className="border-r border-border p-3 font-mono text-accent">{term}</div><div className="flex flex-wrap gap-1 p-2">{[...postings[indexPosition]].map((file) => <span key={file} className="border border-border px-2 py-1 font-mono text-secondary">{file}</span>)}</div></div>)}
        </div>
        <div className="mt-4 border border-success bg-success/10 p-3 text-xs text-secondary">intersection result: <span className="font-mono text-success">{result.join(" ") || "empty"}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Inverted index把term映射到files SET；多词AND query是postings intersection，先从smallest set开始最省contains calls。
      </figcaption>
    </figure>
  );
}

const baseSparse = new Map([[1, 0.5], [4, 2.0], [7, -1.5], [10, 3.0]]);

export function Algs4SparseVectorLab() {
  const [index, setIndex] = useState(4);
  const [zero, setZero] = useState(false);
  const entries = useMemo(() => {
    const result = new Map(baseSparse);
    if (zero) result.delete(index);
    else result.set(index, ((index % 5) - 2) || 1);
    return result;
  }, [index, zero]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">coordinate i = {index}<input className="mt-2 w-full accent-current" type="range" min="0" max="11" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
        <label className="mt-3 flex items-center gap-2 text-xs text-secondary"><input type="checkbox" checked={zero} onChange={(event) => setZero(event.target.checked)} />put(i, 0.0) deletes the association</label>
        <div className="mt-5 grid grid-cols-6 gap-2 sm:grid-cols-12">
          {Array.from({ length: 12 }, (_, coordinate) => <div key={coordinate} className={"min-h-16 border p-2 text-center " + (entries.has(coordinate) ? "border-accent bg-accent/10" : "border-border bg-background")}><div className="font-mono text-[9px] text-secondary">{coordinate}</div><div className="mt-2 font-mono text-xs text-primary">{entries.get(coordinate) ?? 0}</div></div>)}
        </div>
        <div className="mt-4 border border-success bg-success/10 p-3 text-xs text-secondary">ST entries ({entries.size} nonzeros): <span className="font-mono text-success">{[...entries].map(([i, value]) => `${i}:${value}`).join(" · ")}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Sparse vector只保存nonzero index-value pairs；zero由absence隐式表达，put zero必须delete旧entry。
      </figcaption>
    </figure>
  );
}

const sparseA = new Map([[0, 2], [3, -1], [7, 4], [10, 0.5]]);
const sparseB = new Map([[1, 5], [3, 3], [7, -2], [8, 6], [10, 4], [11, 1]]);

export function Algs4SparseDotProductLab() {
  const [step, setStep] = useState(2);
  const entries = [...sparseA];
  const prefix = entries.slice(0, step + 1);
  const products = prefix.map(([index, value]) => ({ index, left: value, right: sparseB.get(index) ?? 0, product: value * (sparseB.get(index) ?? 0) }));
  const sum = products.reduce((total, item) => total + item.product, 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">iterate smaller nnz set · step {step + 1}/{entries.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={entries.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-5 overflow-hidden border border-border bg-background">
          {products.map((item) => <div key={item.index} className="grid grid-cols-4 border-b border-border text-center font-mono text-xs last:border-b-0"><span className="p-2 text-secondary">i={item.index}</span><span className="p-2 text-accent">{item.left}</span><span className="p-2 text-warning">{item.right}</span><span className="p-2 text-success">{item.product}</span></div>)}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary"><div className="border border-accent p-3">nnz(a)<div className="font-mono text-accent">{sparseA.size}</div></div><div className="border border-warning p-3">nnz(b)<div className="font-mono text-warning">{sparseB.size}</div></div><div className="border border-success p-3">partial dot<div className="font-mono text-success">{sum}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Dot product遍历nnz较少的vector，只在另一张ST做contains/get；dense zeros从不进入loop。
      </figcaption>
    </figure>
  );
}

type Workload = "exact lookup" | "ordered range" | "membership" | "sparse numeric";

const choices: Record<Workload, { api: string; structure: string; reason: string }> = {
  "exact lookup": { api: "Map<K,V>", structure: "HashMap", reason: "Expected constant get/put; no ordering contract required." },
  "ordered range": { api: "NavigableMap<K,V>", structure: "TreeMap", reason: "Worst-case log N plus floor, ceiling and range views." },
  membership: { api: "Set<K>", structure: "HashSet / TreeSet", reason: "No dummy values; choose hash or order by client contract." },
  "sparse numeric": { api: "ST<Integer,Double>", structure: "ordered or hashed ST", reason: "Store only nonzeros; iteration and update mix decide implementation." },
};

export function Algs4SystemSymbolTableMap() {
  const [workload, setWorkload] = useState<Workload>("ordered range");
  const choice = choices[workload];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="client workload">
          {(["exact lookup", "ordered range", "membership", "sparse numeric"] as Workload[]).map((option) => <button key={option} type="button" onClick={() => setWorkload(option)} className={"min-h-12 border-b border-r border-border px-2 py-2 text-xs sm:border-b-0 last:border-r-0 " + (workload === option ? "bg-primary text-background" : "bg-background text-secondary")}>{option}</button>)}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="border border-accent bg-accent/10 p-4"><div className="text-xs text-secondary">required API</div><div className="mt-2 font-mono text-accent">{choice.api}</div></div>
          <div className="border border-success bg-success/10 p-4"><div className="text-xs text-secondary">system structure</div><div className="mt-2 font-mono text-success">{choice.structure}</div></div>
          <div className="border border-warning bg-warning/10 p-4"><div className="text-xs text-secondary">decision reason</div><div className="mt-2 text-xs text-warning">{choice.reason}</div></div>
        </div>
        <div className="mt-4 border border-border bg-background p-3 text-xs text-secondary">System collections may allow null values and expose different iteration/concurrency contracts; program to the documented API, not the textbook implementation details.</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        容器选择从client-required operations出发：unordered exact lookup、ordered queries与membership不是同一个contract。
      </figcaption>
    </figure>
  );
}
