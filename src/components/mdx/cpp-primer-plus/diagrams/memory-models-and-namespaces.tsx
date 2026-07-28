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
