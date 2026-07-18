"use client";

import { useState } from "react";

const pattern = "ABABAC";
const text = "AABACAABABACAA";
const alphabet = ["A", "B", "C"];

function CharacterRow({ value, active = -1, matched = [] }: { value: string; active?: number; matched?: number[] }) {
  return (
    <div className="flex min-w-max gap-1">
      {Array.from(value).map((character, index) => (
        <div key={index} className={"flex size-8 items-center justify-center border font-mono text-xs " + (index === active ? "border-warning bg-warning/20 text-warning" : matched.includes(index) ? "border-success bg-success/10 text-success" : "border-border bg-background text-primary")}>{character}</div>
      ))}
    </div>
  );
}

function Alignment({ offset, activePattern = -1, matched = [] }: { offset: number; activePattern?: number; matched?: number[] }) {
  return (
    <div className="overflow-x-auto border border-border bg-background p-3">
      <div className="text-[10px] text-secondary">text</div>
      <CharacterRow value={text} active={activePattern >= 0 ? offset + activePattern : -1} matched={matched.map((index) => offset + index)} />
      <div className="mt-2 text-[10px] text-secondary">pattern offset {offset}</div>
      <div style={{ marginLeft: `${offset * 36}px` }}><CharacterRow value={pattern} active={activePattern} matched={matched} /></div>
    </div>
  );
}

export function Algs4SubstringProblemMap() {
  const [offset, setOffset] = useState(6);
  const window = text.slice(offset, offset + pattern.length);
  const matchedPrefix = Array.from({ length: pattern.length }, (_, index) => index).filter((index) => pattern[index] === window[index]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">candidate alignment i = {offset}<input className="mt-2 w-full accent-current" type="range" min="0" max={text.length - pattern.length} value={offset} onChange={(event) => setOffset(Number(event.target.value))} /></label>
        <div className="mt-4"><Alignment offset={offset} matched={matchedPrefix} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border p-3 text-secondary">N<div className="font-mono text-primary">{text.length}</div></div>
          <div className="border border-accent p-3 text-accent">M<div className="font-mono">{pattern.length}</div></div>
          <div className={"border p-3 " + (window === pattern ? "border-success text-success" : "border-warning text-warning")}>window<div className="font-mono">{window === pattern ? "match" : window}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Exact substring search返回pattern在text中的leftmost start offset；candidate window必须有M个consecutive equal characters。
      </figcaption>
    </figure>
  );
}

type BruteState = { offset: number; compared: number[]; mismatch: number; found: boolean };

function bruteTrace() {
  const states: BruteState[] = [];
  for (let offset = 0; offset <= text.length - pattern.length; offset++) {
    const compared: number[] = [];
    let mismatch = -1;
    for (let j = 0; j < pattern.length; j++) {
      compared.push(j);
      if (text[offset + j] !== pattern[j]) {
        mismatch = j;
        break;
      }
    }
    const found = mismatch === -1;
    states.push({ offset, compared, mismatch, found });
    if (found) break;
  }
  return states;
}

const bruteStates = bruteTrace();

export function Algs4BruteForceSubstringLab() {
  const [step, setStep] = useState(2);
  const state = bruteStates[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">alignment {state.offset} · {state.found ? "found" : `mismatch j=${state.mismatch}`}<input className="mt-2 w-full accent-current" type="range" min="0" max={bruteStates.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4"><Alignment offset={state.offset} activePattern={state.mismatch} matched={state.compared.filter((index) => index !== state.mismatch)} /></div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">comparisons this alignment: <span className="font-mono text-primary">{state.compared.length}</span> · next offset: <span className="font-mono text-primary">{state.found ? "stop" : state.offset + 1}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Brute force在每个offset从pattern[0]重启；此前匹配的prefix信息全部丢弃。
      </figcaption>
    </figure>
  );
}

function buildDfa() {
  const dfa = new Map<string, number[]>(alphabet.map((character) => [character, Array(pattern.length).fill(0)]));
  dfa.get(pattern[0])![0] = 1;
  let restart = 0;
  const restartStates = [0];
  for (let j = 1; j < pattern.length; j++) {
    for (const character of alphabet) dfa.get(character)![j] = dfa.get(character)![restart];
    dfa.get(pattern[j])![j] = j + 1;
    restart = dfa.get(pattern[j])![restart];
    restartStates.push(restart);
  }
  return { dfa, restartStates };
}

const kmpDfa = buildDfa();

export function Algs4KmpDfaLab() {
  const [state, setState] = useState(3);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">DFA pattern state j = {state}<input className="mt-2 w-full accent-current" type="range" min="0" max={pattern.length - 1} value={state} onChange={(event) => setState(Number(event.target.value))} /></label>
        <div className="mt-4 overflow-hidden border border-border bg-background">
          <div className="grid grid-cols-[4rem_repeat(6,minmax(2.5rem,1fr))] border-b border-border p-2 text-center text-[10px] text-secondary"><span>input</span>{Array.from(pattern).map((character, index) => <span key={index} className={index === state ? "text-warning" : ""}>{index}:{character}</span>)}</div>
          {alphabet.map((character) => <div key={character} className="grid grid-cols-[4rem_repeat(6,minmax(2.5rem,1fr))] border-b border-border p-2 text-center text-xs last:border-b-0"><span className="font-mono text-primary">{character}</span>{kmpDfa.dfa.get(character)!.map((next, index) => <span key={index} className={"font-mono " + (index === state ? "bg-accent/10 text-accent" : "text-secondary")}>{next}</span>)}</div>)}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs"><div className="border border-success p-3 text-success">match transition<div className="font-mono">{pattern[state]} → {state + 1}</div></div><div className="border border-warning p-3 text-warning">restart shadow<div className="font-mono">x = {kmpDfa.restartStates[state]}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        KMP state j表示已匹配pattern prefix length；mismatch transitions复制restart state的既有知识。
      </figcaption>
    </figure>
  );
}

type KmpState = { textIndex: number; character: string; before: number; after: number };

function kmpTrace() {
  const states: KmpState[] = [];
  let state = 0;
  for (let index = 0; index < text.length && state < pattern.length; index++) {
    const before = state;
    state = kmpDfa.dfa.get(text[index])?.[state] ?? 0;
    states.push({ textIndex: index, character: text[index], before, after: state });
  }
  return states;
}

const kmpStates = kmpTrace();

export function Algs4KmpSearchLab() {
  const [step, setStep] = useState(5);
  const state = kmpStates[step];
  const start = Math.max(0, state.textIndex - state.after + 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">consume text[{state.textIndex}] = {state.character} · state {state.before} → {state.after}<input className="mt-2 w-full accent-current" type="range" min="0" max={kmpStates.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 overflow-x-auto"><CharacterRow value={text} active={state.textIndex} matched={Array.from({ length: state.after }, (_, index) => start + index)} /></div>
        <div className="mt-4 flex gap-1">{Array.from({ length: pattern.length + 1 }, (_, index) => <div key={index} className={"min-w-0 flex-1 border p-2 text-center font-mono text-xs " + (index === state.after ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary")}>{index}</div>)}</div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">text index never moves backward · candidate start = <span className="font-mono text-primary">{state.after === pattern.length ? state.textIndex - pattern.length + 1 : start}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        KMP对每个text character做一次DFA transition；restart发生在pattern state，不回退text pointer。
      </figcaption>
    </figure>
  );
}

function boyerMooreTrace() {
  const right = new Map<string, number>();
  for (let index = 0; index < pattern.length; index++) right.set(pattern[index], index);
  const states: { offset: number; mismatch: number; bad: string; skip: number; compared: number[]; found: boolean }[] = [];
  for (let offset = 0; offset <= text.length - pattern.length;) {
    let skip = 0;
    let mismatch = -1;
    let bad = "";
    const compared: number[] = [];
    for (let j = pattern.length - 1; j >= 0; j--) {
      compared.push(j);
      if (pattern[j] !== text[offset + j]) {
        mismatch = j;
        bad = text[offset + j];
        skip = Math.max(1, j - (right.get(bad) ?? -1));
        break;
      }
    }
    const found = skip === 0;
    states.push({ offset, mismatch, bad, skip, compared, found });
    if (found) break;
    offset += skip;
  }
  return { right, states };
}

const boyer = boyerMooreTrace();

export function Algs4BoyerMooreLab() {
  const [step, setStep] = useState(0);
  const state = boyer.states[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">right-to-left alignment {state.offset} · {state.found ? "found" : `skip ${state.skip}`}<input className="mt-2 w-full accent-current" type="range" min="0" max={boyer.states.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4"><Alignment offset={state.offset} activePattern={state.mismatch} matched={state.compared.filter((index) => index !== state.mismatch)} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs"><div className="border border-border p-3 text-secondary">bad char<div className="font-mono text-primary">{state.bad || "none"}</div></div><div className="border border-accent p-3 text-accent">right[bad]<div className="font-mono">{state.bad ? boyer.right.get(state.bad) ?? -1 : "—"}</div></div><div className="border border-warning p-3 text-warning">max(1,j-right)<div className="font-mono">{state.found ? 0 : state.skip}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Official Boyer-Moore用bad-character rule从pattern右端比较；它不包含strong good-suffix rule。
      </figcaption>
    </figure>
  );
}

function modularHash(value: string, modulus: number) {
  let hash = 0;
  for (const character of value) hash = (hash * 256 + character.charCodeAt(0)) % modulus;
  return hash;
}

function rabinKarpTrace(modulus = 997) {
  const width = pattern.length;
  let rm = 1;
  for (let index = 1; index <= width - 1; index++) rm = (rm * 256) % modulus;
  const patternHash = modularHash(pattern, modulus);
  let windowHash = modularHash(text.slice(0, width), modulus);
  const states = [{ offset: 0, window: text.slice(0, width), hash: windowHash, hit: windowHash === patternHash }];
  for (let offset = 1; offset <= text.length - width; offset++) {
    const outgoing = text.charCodeAt(offset - 1);
    const incoming = text.charCodeAt(offset + width - 1);
    windowHash = (windowHash + modulus - (rm * outgoing) % modulus) % modulus;
    windowHash = (windowHash * 256 + incoming) % modulus;
    states.push({ offset, window: text.slice(offset, offset + width), hash: windowHash, hit: windowHash === patternHash });
  }
  return { modulus, rm, patternHash, states };
}

const rabin = rabinKarpTrace();

export function Algs4RabinKarpLab() {
  const [step, setStep] = useState(3);
  const state = rabin.states[step];
  const previous = rabin.states[Math.max(0, step - 1)];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">rolling window offset {state.offset}<input className="mt-2 w-full accent-current" type="range" min="0" max={rabin.states.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4"><Alignment offset={state.offset} matched={state.hit ? Array.from({ length: pattern.length }, (_, index) => index) : []} /></div>
        <div className="mt-4 grid grid-cols-4 gap-2 text-xs"><div className="border border-border p-3 text-secondary">old hash<div className="font-mono text-primary">{previous.hash}</div></div><div className="border border-warning p-3 text-warning">remove<div className="font-mono">{step > 0 ? text[step - 1] : "—"}</div></div><div className="border border-accent p-3 text-accent">add<div className="font-mono">{step > 0 ? text[step + pattern.length - 1] : "—"}</div></div><div className={"border p-3 " + (state.hit ? "border-success text-success" : "border-border text-secondary")}>hash<div className="font-mono">{state.hash} / {rabin.patternHash}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rolling hash在constant modular operations中移除outgoing high digit、左移并加入incoming character。
      </figcaption>
    </figure>
  );
}

export function Algs4HashCollisionLab() {
  const [modulus, setModulus] = useState(13);
  const [verify, setVerify] = useState(true);
  const trace = rabinKarpTrace(modulus);
  const hits = trace.states.filter((state) => state.hit);
  const falseHits = hits.filter((state) => state.window !== pattern);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">small demonstration modulus Q = {modulus}<input className="mt-2 w-full accent-current" type="range" min="5" max="47" step="2" value={modulus} onChange={(event) => setModulus(Number(event.target.value))} /></label>
        <label className="mt-3 flex items-center gap-2 text-sm text-primary"><input type="checkbox" checked={verify} onChange={(event) => setVerify(event.target.checked)} />Las Vegas exact-character verification</label>
        <div className="mt-4 overflow-hidden border border-border bg-background">{hits.map((state) => <div key={state.offset} className="grid grid-cols-[4rem_1fr_5rem_6rem] border-b border-border p-2 text-xs last:border-b-0"><span className="font-mono text-secondary">i={state.offset}</span><span className="font-mono text-primary">{state.window}</span><span className="font-mono text-accent">h={state.hash}</span><span className={state.window === pattern ? "text-success" : verify ? "text-danger" : "text-warning"}>{state.window === pattern ? "real match" : verify ? "reject collision" : "false accept"}</span></div>)}{hits.length === 0 ? <div className="p-3 text-xs text-secondary">no hash hits</div> : null}</div>
        <div className={"mt-3 border p-3 text-sm " + (falseHits.length === 0 || verify ? "border-success text-success" : "border-danger text-danger")}>{falseHits.length === 0 ? "no collision in these windows" : verify ? `${falseHits.length} collision(s) safely checked` : `${falseHits.length} false positive(s)`}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Monte Carlo trusts equal fingerprints with tiny error probability；Las Vegas recheckscharacters and never returns a collision as a match。
      </figcaption>
    </figure>
  );
}

export function Algs4SubstringCostLab() {
  const [n, setN] = useState(10000);
  const [m, setM] = useState(32);
  const [radix, setRadix] = useState(256);
  const rows = [
    { name: "Brute", preprocess: 0, search: n * m, guarantee: "worst NM" },
    { name: "KMP DFA", preprocess: radix * m, search: n, guarantee: "N + RM" },
    { name: "Boyer-Moore", preprocess: radix + m, search: n / Math.max(1, m / 3), guarantee: "bad-rule worst NM" },
    { name: "Rabin-Karp", preprocess: m, search: n, guarantee: "expected N + M" },
  ];
  const maximum = Math.max(...rows.map((row) => row.preprocess + row.search));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs text-secondary">N = {n}<input className="mt-2 w-full accent-current" type="range" min="1000" max="50000" step="1000" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-xs text-secondary">M = {m}<input className="mt-2 w-full accent-current" type="range" min="2" max="128" value={m} onChange={(event) => setM(Number(event.target.value))} /></label><label className="text-xs text-secondary">R = {radix}<input className="mt-2 w-full accent-current" type="range" min="4" max="512" step="4" value={radix} onChange={(event) => setRadix(Number(event.target.value))} /></label></div>
        <div className="mt-4 space-y-3">{rows.map((row) => <div key={row.name} className="grid grid-cols-[7rem_1fr_7rem] items-center gap-2 text-xs"><span className="font-semibold text-primary">{row.name}</span><div className="h-4 border border-border bg-background"><div className="h-full bg-accent" style={{ width: `${((row.preprocess + row.search) / maximum) * 100}%` }} /></div><span className="text-right font-mono text-secondary">{Math.round(row.preprocess + row.search).toLocaleString()}</span><span className="text-secondary">{row.guarantee}</span></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Bars是结构性估算；Boyer-Moore average skip与Rabin-Karp collision behavior依赖data，必须用真实corpus benchmark。
      </figcaption>
    </figure>
  );
}

type CertificateMode = "valid" | "nonleftmost" | "false positive" | "missed";
const certificateText = "ABABACXXABABAC";

export function Algs4SubstringCertificateLab() {
  const [mode, setMode] = useState<CertificateMode>("valid");
  const candidate = mode === "valid" ? 0 : mode === "nonleftmost" ? 8 : mode === "false positive" ? 2 : certificateText.length;
  const inRange = candidate === certificateText.length || (candidate >= 0 && candidate + pattern.length <= certificateText.length);
  const actualMatch = candidate < certificateText.length && certificateText.slice(candidate, candidate + pattern.length) === pattern;
  const noEarlier = actualMatch && certificateText.slice(0, candidate).indexOf(pattern) === -1;
  const exists = certificateText.indexOf(pattern);
  const notFoundValid = candidate === certificateText.length && exists === -1;
  const accepted = notFoundValid || (inRange && actualMatch && noEarlier);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">candidate offset<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as CertificateMode)}><option value="valid">valid leftmost</option><option value="nonleftmost">nonleftmost match</option><option value="false positive">false positive</option><option value="missed">reported not found</option></select></label>
        <div className="mt-4 overflow-x-auto"><CharacterRow value={certificateText} matched={actualMatch ? Array.from({ length: pattern.length }, (_, index) => candidate + index) : []} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs"><div className={"border p-3 " + (inRange ? "border-success text-success" : "border-danger text-danger")}>bounds<div className="font-mono">{inRange ? "pass" : "fail"}</div></div><div className={"border p-3 " + (actualMatch || notFoundValid ? "border-success text-success" : "border-danger text-danger")}>window equality<div className="font-mono">{actualMatch ? "pass" : notFoundValid ? "none exists" : "fail"}</div></div><div className={"border p-3 " + (noEarlier || notFoundValid ? "border-success text-success" : "border-danger text-danger")}>leftmost<div className="font-mono">{noEarlier || notFoundValid ? "pass" : "fail"}</div></div></div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "certificate accepted" : "certificate rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Search certificate检查offset bounds、M-character equality与leftmost requirement；hash equality不是最终证书。
      </figcaption>
    </figure>
  );
}
