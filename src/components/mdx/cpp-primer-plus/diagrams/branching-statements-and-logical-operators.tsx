"use client";

import { useState } from "react";

const partitionRows = [
  { domain: "invalid low", interval: "score < 0", branch: "reject", boundary: "-1" },
  { domain: "retry", interval: "0 <= score < 60", branch: "retry", boundary: "0, 59" },
  { domain: "pass", interval: "60 <= score < 90", branch: "pass", boundary: "60, 89" },
  { domain: "excellent", interval: "90 <= score <= 100", branch: "A", boundary: "90, 100" },
  { domain: "invalid high", interval: "score > 100", branch: "reject", boundary: "101" },
] as const;

export function EppBranchPartitionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="成绩输入域划分为低非法重试通过优秀和高非法五个互斥分支及边界样例" className="space-y-3">
          {partitionRows.map((row, index) => (
            <section key={row.domain} className="grid min-h-28 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.7fr_1fr_0.7fr_0.7fr] lg:items-center">
              <div><span className="text-xs text-secondary">case 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.domain}</strong></div>
              <code className="break-words text-xs text-accent">{row.interval}</code>
              <span className="text-xs text-primary">→ {row.branch}</span>
              <span className="text-xs text-secondary">test · {row.boundary}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先划分完整输入域，再翻译成 if/else；每个边界应恰好落入一个分支，非法域也必须有 owner。
      </figcaption>
    </figure>
  );
}

const logicalRows = [
  { expression: "left && right", left: "false", right: "not evaluated", use: "left proves right precondition" },
  { expression: "left && right", left: "true", right: "evaluated", use: "both must hold" },
  { expression: "left || right", left: "true", right: "not evaluated", use: "fallback is skipped" },
  { expression: "left || right", left: "false", right: "evaluated", use: "try alternate condition" },
] as const;

export function EppLogicalShortCircuitFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="逻辑与和逻辑或按左操作数结果决定右操作数是否求值的短路流程" className="grid gap-3 lg:grid-cols-2">
          {logicalRows.map((row, index) => (
            <section key={`${row.expression}-${row.left}`} className="min-h-52 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">path 0{index + 1}</span>
              <code className="mt-2 block text-sm text-accent">{row.expression}</code>
              <p className="mt-4 text-xs text-primary">left = {row.left} → right {row.right}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">use · {row.use}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        短路可以保护索引、指针和读取前置条件，但关键副作用不应藏在可能跳过的右操作数中。
      </figcaption>
    </figure>
  );
}

const branchCases = [
  { label: "边界重叠", code: "if (score >= 60) pass; else if (score >= 90) A;", fault: "90+ is consumed by first branch", proof: "test 89, 90, 100; order most specific or partition first", fix: "validate then check >=90 before >=60" },
  { label: "cctype 参数", code: "std::isdigit(ch) where char is negative", fault: "argument outside unsigned char/EOF domain", proof: "use non-ASCII byte under signed-char implementation", fix: "cast to unsigned char before cctype" },
  { label: "switch 贯穿", code: "case 1: start(); case 2: stop();", fault: "missing break executes next case", proof: "choice 1 invokes both operations", fix: "break or explicit [[fallthrough]] with reason" },
  { label: "文件失败", code: "ifstream in{path}; while (in >> value)", fault: "missing file looks like empty input if open not checked", proof: "log path and open state separately", fix: "check !in immediately, then classify read exit" },
] as const;

export function EppBranchCoverageLab() {
  const [active, setActive] = useState(0);
  const current = branchCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择分支覆盖故障" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {branchCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.code}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-40 border border-rose-500/35 bg-rose-500/10 p-4"><strong className="text-sm text-primary">故障</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.fault}</p></div>
            <div className="min-h-40 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">证据</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.proof}</p></div>
            <div className="min-h-40 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">修复</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.fix}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分支测试既要覆盖每条路径，也要验证条件求值前提、case 退出和外部资源失败分类。
      </figcaption>
    </figure>
  );
}
