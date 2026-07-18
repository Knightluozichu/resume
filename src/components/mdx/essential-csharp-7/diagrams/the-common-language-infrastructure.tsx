"use client";

import { useState } from "react";

const cliCases = [
  { label: "CLI", role: "standardized execution and type-system contract", includes: "CTS, metadata, CIL, execution system, file format", excludes: "one vendor product or one OS", consequence: "multiple languages and implementations share a binary model" },
  { label: "CTS", role: "defines types, members, visibility, inheritance and value/reference rules", includes: "richer runtime type system", excludes: "source-language syntax", consequence: "compilers agree on cross-language type identity" },
  { label: "CLS", role: "interoperable subset of CTS rules", includes: "public surface rules for language consumers", excludes: "many valid private/internal CTS features", consequence: "library API is consumable by more CLI languages" },
  { label: "BCL", role: "shared library contracts and implementations", includes: "collections, I/O, threading, text and core types", excludes: "the runtime execution engine itself", consequence: "portable code depends on available API surface" },
  { label: ".NET Standard", role: "versioned API contract implemented by platforms", includes: "common library surface", excludes: "runtime, deployment package or executable", consequence: "targeting contract broadens compatible implementations" },
];

export function Ec7CliContractLab() {
  const [selected, setSelected] = useState(0);
  const item = cliCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{cliCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["role", item.role], ["includes", item.includes], ["does not mean", item.excludes], ["design consequence", item.consequence]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换CLI、CTS、CLS、BCL与.NET Standard，区分execution、type和API contracts。</figcaption></figure>;
}

const compilationCases = [
  { label: "compile", input: "C# source + references", artifact: "PE assembly: CIL + metadata + manifest", timing: "build time", observation: "inspect with IL disassembler and metadata reader" },
  { label: "load", input: "assembly identity and dependency graph", artifact: "verified types/method bodies available to runtime", timing: "process load / first use", observation: "loader resolves manifest references and modules" },
  { label: "JIT", input: "CIL method + exact runtime context", artifact: "native code for current architecture", timing: "typically first execution of method", observation: "startup cost traded for runtime specialization" },
  { label: "AOT", input: "assembly closure known ahead of execution", artifact: "precompiled native image/package", timing: "publish/build time", observation: "startup improves; dynamic behavior may need declarations" },
  { label: "GC/runtime", input: "executing managed code and object graph", artifact: "allocation, collection, exceptions and thread services", timing: "throughout execution", observation: "managed does not mean no native code or no resources" },
];

export function Ec7CompilationPipelineLab() {
  const [selected, setSelected] = useState(0);
  const item = compilationCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{compilationCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">input</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.input}</strong></div><div className="flex min-h-12 items-center justify-center text-xl text-violet-400">→</div><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">artifact/service</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.artifact}</strong></div></div><div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-3 text-sm text-secondary">when: {item.timing}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">inspect: {item.observation}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">沿compile、load、JIT/AOT和runtime阶段追踪C#如何成为当前平台的machine code。</figcaption></figure>;
}

const assemblyCases = [
  { label: "assembly", identity: "name, version, culture, public key identity", payload: "one or more modules plus resources", metadata: "assembly-level manifest", loader: "unit of reference, versioning and deployment" },
  { label: "manifest", identity: "declares containing assembly", payload: "file list, exported types, resources, dependencies", metadata: "manifest tables live in one module", loader: "answers what belongs here and what is required" },
  { label: "module", identity: "physical PE file inside an assembly", payload: "CIL method bodies, type metadata and data", metadata: "module/type/member tables", loader: "not normally the public versioning boundary alone" },
  { label: "CIL method", identity: "metadata token identifies method/type operands", payload: "stack-based instructions and exception regions", metadata: "signature and local variable types", loader: "JIT validates/resolves tokens before native execution" },
  { label: "reflection", identity: "runtime assembly/type/member objects", payload: "query metadata; optionally invoke or construct", metadata: "same compiled descriptions used by loader", loader: "dynamic access can hide dependencies from AOT analysis" },
];

export function Ec7AssemblyMetadataLab() {
  const [selected, setSelected] = useState(0);
  const item = assemblyCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{assemblyCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["identity", item.identity], ["payload", item.payload], ["metadata", item.metadata], ["loader/runtime meaning", item.loader]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换assembly、manifest、module、CIL method与reflection，定位identity、payload和loader责任。</figcaption></figure>;
}
