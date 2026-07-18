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

const numericCases = [
  { label: "整数除法", expression: "5 / 2", prediction: "both operands int → result 2", repair: "convert before division: 5.0 / 2", evidence: "operand types + output precision" },
  { label: "有符号溢出", expression: "INT_MAX + 1", prediction: "result not representable; behavior is undefined", repair: "validate bound or use wider checked type", evidence: "numeric_limits + boundary test" },
  { label: "浮点精度", expression: "0.1 + 0.2 == 0.3", prediction: "binary approximations may compare unequal", repair: "compare with domain tolerance", evidence: "setprecision + absolute/relative error" },
  { label: "窄化", expression: "int n = 3.9", prediction: "fraction discarded; n becomes 3", repair: "validate and make conversion explicit; braces reject", evidence: "source range + target range" },
] as const;

export function EppNumericBoundaryLab() {
  const [active, setActive] = useState(0);
  const current = numericCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择数值边界实验" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {numericCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-base text-accent">{current.expression}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">预测</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.prediction}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">修复</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.repair}</p></div>
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">证据</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.evidence}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换四类数值陷阱，先写类型级预测再运行；观察到一个数字并不能说明行为在边界上有定义。
      </figcaption>
    </figure>
  );
}
