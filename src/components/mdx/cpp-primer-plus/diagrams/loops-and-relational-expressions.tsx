"use client";

import { useState } from "react";

const contractRows = [
  { phase: "initialize", question: "what state exists before first test?", proof: "counter/range/input state is valid" },
  { phase: "condition", question: "which exact states continue?", proof: "relational expression matches half-open boundary" },
  { phase: "body", question: "what remains true each iteration?", proof: "loop invariant preserved" },
  { phase: "progress", question: "what moves toward termination?", proof: "counter/input/work set strictly advances" },
  { phase: "exit", question: "why did loop stop?", proof: "condition false or input exhausted, postcondition holds" },
] as const;

export function EppLoopContractMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="循环初始化条件不变量推进和退出五阶段证明契约" className="space-y-3">
          {contractRows.map((row, index) => (
            <section key={row.phase} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.5fr_1.2fr_1.2fr] lg:items-center">
              <div><span className="text-xs text-secondary">phase 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.phase}</strong></div>
              <span className="text-xs text-primary">{row.question}</span>
              <code className="break-words text-xs text-accent">proof · {row.proof}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        循环正确性由初始状态、不变量、推进和退出后置条件共同决定，不能由“跑了 N 次”替代。
      </figcaption>
    </figure>
  );
}

const selectionRows = [
  { form: "for", known: "counter/range and update are local", strength: "header shows lifecycle", risk: "off-by-one or changing bound" },
  { form: "while", known: "repeat while external state/input is valid", strength: "condition is primary", risk: "forgotten progress" },
  { form: "do while", known: "body must execute at least once", strength: "post-test protocol", risk: "invalid first execution" },
  { form: "range for", known: "visit each element of a range", strength: "no manual index", risk: "copy vs reference semantics" },
] as const;

export function EppLoopSelectionFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="for while do while 和范围 for 按已知信息优势与风险选择" className="grid gap-3 lg:grid-cols-4">
          {selectionRows.map((row) => (
            <section key={row.form} className="min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <strong className="text-sm text-primary">{row.form}</strong>
              <p className="mt-4 text-xs text-primary">when · {row.known}</p>
              <code className="mt-4 block break-words text-xs text-accent">strength · {row.strength}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">risk · {row.risk}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四种循环表达不同控制契约；选择让不变量和推进最清楚的形式，而不是按个人偏好统一。
      </figcaption>
    </figure>
  );
}

const boundaryCases = [
  { label: "尾后边界", loop: "for (i = 0; i <= count; ++i)", violation: "i == count is not an element", result: "one out-of-bounds access", correction: "i < count and assert count matches range" },
  { label: "缺少推进", loop: "while (remaining > 0) { work(); }", violation: "remaining never changes", result: "condition stays true forever", correction: "consume work or update remaining each successful iteration" },
  { label: "字符输入", loop: "while (ch != '#') { cin >> ch; }", violation: "stream failure is not represented", result: "old ch may repeat after EOF", correction: "while (cin.get(ch) && ch != '#')" },
  { label: "二维索引", loop: "for k < rows*cols: grid[k][k]", violation: "one counter is used for two dimensions", result: "row/column bounds diverge", correction: "nested row < rows and col < cols" },
] as const;

export function EppLoopBoundaryLab() {
  const [active, setActive] = useState(0);
  const current = boundaryCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择循环边界故障" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {boundaryCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.loop}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">破坏</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.violation}</p></div>
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4"><strong className="text-sm text-primary">结果</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.result}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">修正</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.correction}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个循环故障都对应一个可写出的契约缺口：元素边界、推进、输入状态或逐维范围。
      </figcaption>
    </figure>
  );
}
