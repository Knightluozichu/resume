"use client";

import { useState } from "react";

const buildRows = [
  { file: "counter.hpp", owns: "declarations + type definitions", becomes: "included text in each TU", gate: "guarded, no accidental object definition" },
  { file: "counter.cpp", owns: "one non-inline function/object definition", becomes: "counter.o", gate: "signature matches shared declaration" },
  { file: "main.cpp", owns: "call sites + program entry", becomes: "main.o", gate: "uses only declared interface" },
  { file: "link command", owns: "main.o + counter.o + libraries", becomes: "executable", gate: "every external symbol exactly resolved" },
] as const;

export function EppTranslationUnitBuildMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="头文件实现源文件调用源文件和链接命令在分离编译中的所有权产物与闸门" className="space-y-3">
          {buildRows.map((row, index) => (
            <section key={row.file} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.6fr_1.1fr_0.8fr_1.2fr] lg:items-center">
              <div><span className="text-xs text-secondary">unit 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.file}</strong></div>
              <span className="text-xs text-primary">owns · {row.owns}</span>
              <code className="break-words text-xs text-accent">→ {row.becomes}</code>
              <span className="text-xs text-secondary">gate · {row.gate}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        头文件被复制进翻译单元，源文件各自生成目标文件；链接器看到的是符号，不是 include 层级。
      </figcaption>
    </figure>
  );
}

const lifetimeRows = [
  { example: "block local", duration: "automatic", scope: "block", linkage: "none", evidence: "construct on entry, destroy on exit" },
  { example: "function static", duration: "static", scope: "block", linkage: "none", evidence: "one object for program lifetime" },
  { example: "namespace object", duration: "static", scope: "namespace", linkage: "external or internal", evidence: "definition and initialization order" },
  { example: "new object", duration: "dynamic", scope: "name independent", linkage: "not an object-name property", evidence: "owner controls delete" },
] as const;

export function EppStorageScopeLinkageFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="块局部函数静态命名空间对象和动态对象的存储期作用域链接性与证据矩阵" className="grid gap-3 lg:grid-cols-2">
          {lifetimeRows.map((row) => (
            <section key={row.example} className="min-h-56 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <strong className="text-sm text-primary">{row.example}</strong>
              <code className="mt-3 block text-xs text-accent">duration · {row.duration}</code>
              <p className="mt-4 text-xs text-primary">scope · {row.scope}</p>
              <p className="mt-3 text-xs text-primary">linkage · {row.linkage}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">proof · {row.evidence}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        生命周期、名字可见范围和跨翻译单元身份是三个问题；一个 static 关键字在不同位置也不代表同一语义。
      </figcaption>
    </figure>
  );
}

const symbolCases = [
  { label: "缺少定义", setup: "extern int count; but no definition linked", symptom: "undefined reference", evidence: "inspect objects/link command", fix: "provide one definition and link its object" },
  { label: "重复定义", setup: "int count = 0; in a header included twice", symptom: "multiple definition", evidence: "each TU emitted external symbol", fix: "extern declaration + one definition or inline variable" },
  { label: "内部链接", setup: "static int count in two .cpp files", symptom: "two independent counters", evidence: "local symbols / distinct addresses", fix: "intentional internal state or shared external owner" },
  { label: "命名歧义", setup: "using namespace alpha; using namespace beta; run()", symptom: "ambiguous lookup", evidence: "both namespaces export run", fix: "qualify alpha::run or narrow using declaration" },
] as const;

export function EppSymbolBoundaryLab() {
  const [active, setActive] = useState(0);
  const current = symbolCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择符号和命名空间故障" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {symbolCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.setup}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-40 border border-rose-500/35 bg-rose-500/10 p-4"><strong className="text-sm text-primary">现象</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.symptom}</p></div>
            <div className="min-h-40 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">证据</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.evidence}</p></div>
            <div className="min-h-40 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">修复</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.fix}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四类现象分别属于定义数量、链接身份与名字查找；“多加 include”可能把缺定义变成重复定义。
      </figcaption>
    </figure>
  );
}
