"use client";

import { useState } from "react";

const representationRows = [
  { family: "integer", examples: "short · int · long · long long", contract: "exact discrete values within range", inspect: "sizeof + numeric_limits", className: "border-cyan-500/35 bg-cyan-500/10" },
  { family: "floating", examples: "float · double · long double", contract: "approximate real values with finite precision", inspect: "digits + max_exponent", className: "border-violet-500/35 bg-violet-500/10" },
  { family: "character", examples: "char · wchar_t · char16_t", contract: "code units and small integer behavior", inspect: "literal + encoding boundary", className: "border-amber-500/35 bg-amber-500/10" },
  { family: "logical", examples: "bool", contract: "false or true; conversion is contextual", inspect: "predicate meaning", className: "border-emerald-500/35 bg-emerald-500/10" },
] as const;

export function EppDataRepresentationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ 整数浮点字符和布尔四类内置数据表示的示例契约与检查方法" className="grid gap-3 lg:grid-cols-2">
          {representationRows.map((row) => (
            <section key={row.family} className={`min-h-52 border p-4 ${row.className}`}>
              <strong className="text-sm text-primary">{row.family}</strong>
              <code className="mt-3 block break-words text-xs text-accent">{row.examples}</code>
              <p className="mt-4 text-xs text-primary">{row.contract}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">inspect · {row.inspect}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类型选择先回答值域、精度和语义，再用当前实现的 limits 取证；类型名本身不保证固定字节数。
      </figcaption>
    </figure>
  );
}

const conversionRows = [
  { stage: "literal", question: "literal suffix and value fit?", action: "choose source type", risk: "unexpected unsigned or floating type" },
  { stage: "usual arithmetic", question: "operand types differ?", action: "promote / convert before operation", risk: "signed–unsigned comparison" },
  { stage: "operation", question: "result representable?", action: "compute in common type", risk: "overflow or integer division" },
  { stage: "destination", question: "target loses range/precision?", action: "reject, validate, or explicit cast", risk: "narrowing hides data loss" },
] as const;

export function EppDataConversionFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ 字面量经过通常算术转换运算结果再到目标类型的四阶段转换流程" className="space-y-3">
          {conversionRows.map((row, index) => (
            <section key={row.stage} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.55fr_1fr_1fr_1fr] lg:items-center">
              <div><span className="text-xs text-secondary">step 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.stage}</strong></div>
              <span className="text-xs text-primary">{row.question}</span>
              <code className="break-words text-xs text-accent">{row.action}</code>
              <span className="text-xs text-secondary">risk · {row.risk}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        转换可能在运算前已经发生；只查看最终赋值类型，会漏掉中间 common type 中的除法、比较与溢出。
      </figcaption>
    </figure>
  );
}
