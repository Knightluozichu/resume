"use client";

import { useState } from "react";

const reflectionCases = [
  { label: "Type", input: "typeof(Report)", lookup: "Type metadata", operation: "read FullName/BaseType/interfaces", failure: "none for known compile-time type" },
  { label: "GetMember", input: "type.GetProperty(\"Title\")", lookup: "name + BindingFlags", operation: "PropertyInfo.GetValue/SetValue", failure: "null when no matching property" },
  { label: "Activator", input: "Activator.CreateInstance(type)", lookup: "accessible matching constructor", operation: "create runtime-selected object", failure: "missing ctor / ctor exception" },
  { label: "Invoke", input: "method.Invoke(target,args)", lookup: "MethodInfo + target compatibility", operation: "late-bound method call", failure: "argument mismatch / wrapped target exception" },
  { label: "cache", input: "Dictionary<Type,Metadata>", lookup: "reflect once", operation: "reuse validated accessors", failure: "cache invalidation/unload policy" },
];

export function Ec7ReflectionPipelineLab() {
  const [selected, setSelected] = useState(0);
  const item = reflectionCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{reflectionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.input}</code><div className="mt-3 grid gap-3 md:grid-cols-3">{[["metadata lookup", item.lookup], ["operation", item.operation], ["failure", item.failure]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换Type/member/Activator/invoke/cache，追踪late-bound lookup、operation与failure。</figcaption></figure>;
}

const metadataCases = [
  { label: "nameof", syntax: "nameof(orderId)", target: "compile-time symbol", stored: "\"orderId\" constant", consumer: "exception/log/property notification; rename-safe" },
  { label: "class attribute", syntax: "[Table(\"orders\")]", target: "class", stored: "constructor + named arguments in metadata", consumer: "ORM/reflection tool" },
  { label: "method attribute", syntax: "[Obsolete(\"Use V2\")]", target: "method", stored: "AttributeUsage permits method", consumer: "compiler warning + reflection" },
  { label: "multiple", syntax: "[Tag(\"a\"), Tag(\"b\")]", target: "allowed target", stored: "two instances when AllowMultiple=true", consumer: "GetCustomAttributes returns both" },
  { label: "inherited", syntax: "AttributeUsage(Inherited=true)", target: "base/derived member or type", stored: "metadata remains on declaration", consumer: "lookup may include inherited attributes" },
];

export function Ec7AttributeNameofLab() {
  const [selected, setSelected] = useState(0);
  const item = metadataCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{metadataCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.syntax}</code><div className="mt-3 grid gap-3 md:grid-cols-3">{[["target", item.target], ["compiled metadata/value", item.stored], ["consumer", item.consumer]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换nameof/attribute cases，区分symbol string、target metadata与consumer behavior。</figcaption></figure>;
}

const dynamicCases = [
  { label: "static", expression: "string s; s.Missing()", compile: "member lookup fails now", runtime: "program never runs", boundary: "strong refactoring/tooling" },
  { label: "dynamic success", expression: "dynamic d = \"abc\"; d.ToUpper()", compile: "operation emitted for runtime binding", runtime: "binder finds string.ToUpper", boundary: "result is dynamic" },
  { label: "dynamic failure", expression: "dynamic d = 42; d.ToUpper()", compile: "accepted", runtime: "RuntimeBinderException", boundary: "failure moves to executed path" },
  { label: "overload", expression: "Choose(dynamicValue)", compile: "overload deferred", runtime: "runtime types select candidate", boundary: "behavior changes with value type" },
  { label: "interop", expression: "dynamic com = GetComObject()", compile: "skip verbose casts/ref args", runtime: "COM/DOM binder resolves", boundary: "validate at adapter edge" },
];

export function Ec7DynamicBindingLab() {
  const [selected, setSelected] = useState(0);
  const item = dynamicCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{dynamicCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.expression}</code><div className="mt-3 grid gap-3 md:grid-cols-3">{[["compile time", item.compile], ["runtime binder", item.runtime], ["engineering boundary", item.boundary]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换static/dynamic cases，比较member lookup时机、runtime result与failure boundary。</figcaption></figure>;
}
