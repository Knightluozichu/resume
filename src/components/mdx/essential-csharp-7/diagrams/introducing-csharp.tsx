"use client";

import { useState } from "react";

const pipeline = [
  { label: "Program.cs", artifact: "C# source text", check: "syntax + project inclusion" },
  { label: "C# compiler", artifact: "assembly + CIL + metadata", check: "compile diagnostics" },
  { label: "CLR loader", artifact: "verified managed types", check: "target framework/runtime available" },
  { label: "JIT", artifact: "native machine code", check: "method compiled for current CPU" },
  { label: "process", artifact: "Console output + exit code", check: "runtime behavior" },
];

export function Ec7CompilationPipelineLab() {
  const [selected, setSelected] = useState(0);
  const item = pipeline[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{pipeline.map((entry,index)=><button key={entry.label} type="button" onClick={()=>setSelected(index)} className={`min-h-14 border px-2 text-xs ${selected===index?"border-cyan-500 bg-cyan-500/15 text-primary":"border-border bg-bg text-secondary"}`}>{index+1}. {entry.label}</button>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-2"><p className="border border-violet-500/40 bg-violet-500/10 p-3 text-sm text-primary">artifact: {item.artifact}</p><p className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">evidence: {item.check}</p></div></div><figcaption className="mt-2 text-center text-sm text-secondary">逐阶段追踪C# source经compiler、CIL/metadata、CLR/JIT成为运行process。</figcaption></figure>;
}

const syntaxCases = [
  { label: "statement", code: "Console.WriteLine(message);", rule: "semicolon terminates statement; parentheses contain arguments" },
  { label: "variable", code: "string message = Console.ReadLine();", rule: "static type + identifier + assignment; input may be null" },
  { label: "method", code: "static int Main(string[] args) { return 0; }", rule: "return type/name/parameters/body form the entry method" },
  { label: "invalid identifier", code: "string 2name = \"Ada\";", rule: "compile-time diagnostic: identifier cannot start with digit" },
];

export function Ec7SyntaxVariableLab() {
  const [selected,setSelected]=useState(1); const item=syntaxCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 border border-border sm:grid-cols-4">{syntaxCases.map((entry,index)=><button key={entry.label} type="button" onClick={()=>setSelected(index)} className={`min-h-12 px-2 text-xs ${selected===index?"bg-primary text-bg":"bg-bg text-primary"}`}>{entry.label}</button>)}</div><code className="mt-4 block min-h-20 border border-border bg-bg p-4 text-sm leading-7 text-primary">{item.code}</code><p className="mt-3 border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">{item.rule}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">切换statement、variable、Main与invalid identifier，读取syntax contract和compiler outcome。</figcaption></figure>;
}

const runtimeCases = [
  { target: ".NET Framework 4.7", language: "C# 7.0 compiler", runtime: "Windows CLR", result: "framework-specific managed application" },
  { target: ".NET Core 2.0", language: "C# 7.x compiler", runtime: "CoreCLR on Windows/Linux/macOS", result: "cross-platform application" },
  { target: ".NET Standard library", language: "C# source", runtime: "consumed by compatible implementations", result: "portable API contract, not an executable runtime" },
  { target: "missing runtime", language: "assembly already compiled", runtime: "target implementation unavailable", result: "launch failure before Main executes" },
];

export function Ec7RuntimeFrameworkLab() {
  const [selected,setSelected]=useState(1); const item=runtimeCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">target scenario<select value={selected} onChange={e=>setSelected(Number(e.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3">{runtimeCases.map((entry,index)=><option key={entry.target} value={index}>{entry.target}</option>)}</select></label><div className="mt-4 grid gap-3 sm:grid-cols-3"><p className="border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">language: {item.language}</p><p className="border border-violet-500/40 bg-violet-500/10 p-3 text-sm text-primary">runtime: {item.runtime}</p><p className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">outcome: {item.result}</p></div></div><figcaption className="mt-2 text-center text-sm text-secondary">区分C#语言版本、target framework、.NET implementation与runtime availability。</figcaption></figure>;
}
