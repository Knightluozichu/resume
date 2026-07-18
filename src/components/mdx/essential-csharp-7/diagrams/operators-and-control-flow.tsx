"use client";

import { useMemo, useState } from "react";

const operatorCases = [
  { label: "precedence", expression: "2 + 3 * 4", result: "14", evidence: "multiplication binds before addition" },
  { label: "grouping", expression: "(2 + 3) * 4", result: "20", evidence: "parentheses make the intended tree explicit" },
  { label: "integer division", expression: "7 / 2", result: "3", evidence: "both operands are int; the fractional part is discarded" },
  { label: "remainder", expression: "7 % 2", result: "1", evidence: "remainder is separate from quotient" },
  { label: "compound", expression: "x += 3", result: "x = 8", evidence: "read x, add, convert if required, then assign" },
];

export function Ec7OperatorEvaluationLab() {
  const [selected, setSelected] = useState(0);
  const [bits, setBits] = useState(0b0011);
  const item = operatorCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{operatorCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">expression</span><code className="mt-2 block text-lg text-primary">{item.expression}</code><strong className="mt-3 block text-2xl text-cyan-400">{item.result}</strong><p className="mt-2 text-xs leading-5 text-secondary">{item.evidence}</p></div><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">bit mask</span><div className="mt-3 grid grid-cols-4 gap-2">{[3, 2, 1, 0].map(bit => <button key={bit} type="button" onClick={() => setBits(value => value ^ (1 << bit))} className={`min-h-11 border font-mono text-sm ${bits & (1 << bit) ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border text-secondary"}`}>{(bits >> bit) & 1}</button>)}</div><p className="mt-3 font-mono text-sm text-primary">value = {bits} · left shift = {(bits << 1) & 0b1111}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换operator case并翻转bit mask，观察precedence、integer arithmetic与shift结果。</figcaption></figure>;
}

export function Ec7BranchShortCircuitLab() {
  const [hasUser, setHasUser] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState("reader");
  const trace = useMemo(() => {
    const entries = ["evaluate hasUser"];
    if (hasUser) entries.push("evaluate isActive");
    else entries.push("short-circuit: skip isActive");
    return entries;
  }, [hasUser]);
  const granted = hasUser && isActive;
  const branch = !granted ? "deny" : role === "admin" ? "admin dashboard" : role === "editor" ? "editor workspace" : "read-only view";
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setHasUser(value => !value)} className={`min-h-12 border text-sm ${hasUser ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>hasUser = {String(hasUser)}</button><button type="button" onClick={() => setIsActive(value => !value)} className={`min-h-12 border text-sm ${isActive ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>isActive = {String(isActive)}</button></div><div className="mt-3 grid grid-cols-3 border border-border">{["reader", "editor", "admin"].map(value => <button key={value} type="button" onClick={() => setRole(value)} className={`min-h-11 text-xs ${role === value ? "bg-primary text-bg" : "bg-bg text-primary"}`}>{value}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2"><ol className="border border-border bg-bg p-4 text-sm leading-7 text-secondary">{trace.map(entry => <li key={entry}>{entry}</li>)}</ol><div className="border border-violet-500/40 bg-violet-500/10 p-4"><span className="text-xs text-secondary">selected branch</span><strong className="mt-2 block text-lg text-primary">{branch}</strong><p className="mt-2 text-xs text-secondary">if guards access; switch-like role selection runs only after the guard passes.</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换conditions与role，读取短路trace及唯一被选择的branch。</figcaption></figure>;
}

const flowCases = [
  { label: "continue", trace: ["i=0 process", "i=1 skip", "i=2 process", "i=3 process"], exit: "loop condition becomes false" },
  { label: "break", trace: ["i=0 process", "i=1 process", "i=2 break"], exit: "nearest loop terminates" },
  { label: "return", trace: ["i=0 inspect", "i=1 match", "return index 1"], exit: "method and loop both terminate" },
  { label: "#if DEBUG", trace: ["compile symbol DEBUG?", "include diagnostic statement", "compile resulting source"], exit: "directive changes compiled tokens, not runtime branch" },
];

export function Ec7LoopJumpDirectiveLab() {
  const [selected, setSelected] = useState(0);
  const [loop, setLoop] = useState("for");
  const item = flowCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border">{["for", "while", "foreach"].map(value => <button key={value} type="button" onClick={() => setLoop(value)} className={`min-h-11 text-sm ${loop === value ? "bg-primary text-bg" : "bg-bg text-primary"}`}>{value}</button>)}</div><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{flowCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr]"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">construct</span><strong className="mt-2 block text-xl text-primary">{selected === 3 ? "preprocessor" : loop}</strong><p className="mt-3 text-xs leading-5 text-secondary">{item.exit}</p></div><ol className="border border-border bg-bg p-4 text-sm leading-7 text-primary">{item.trace.map((entry, index) => <li key={`${entry}-${index}`}><span className="mr-2 text-cyan-400">{index + 1}</span>{entry}</li>)}</ol></div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较loop constructs、jump target与compile-time directive的执行边界。</figcaption></figure>;
}
