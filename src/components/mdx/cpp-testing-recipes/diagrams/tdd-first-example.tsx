"use client";

import { useState } from "react";

const ruleLadder = [
  { test: "A -> A000", rule: "保留首字母并补零到四位", design: "head + zeroPad", color: "border-cyan-500/35 bg-cyan-500/10" },
  { test: "Ab -> A100", rule: "B/F/P/V 编码为 1", design: "encodedDigit", color: "border-emerald-500/35 bg-emerald-500/10" },
  { test: "Aei -> A000", rule: "元音不产生数字", design: "isComplete / skip", color: "border-amber-500/35 bg-amber-500/10" },
  { test: "Axrxr -> A626", rule: "最多保留三个数字", design: "maxLength", color: "border-violet-500/35 bg-violet-500/10" },
  { test: "Abfcg -> A122", rule: "相邻同码只保留一个", design: "lastDigit state", color: "border-rose-500/35 bg-rose-500/10" },
] as const;

export function CtrSoundexRuleLadder() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Soundex 从首字母补零到编码元音长度和重复规则的增量测试梯子" className="space-y-3">
          {ruleLadder.map((item, index) => (
            <section key={item.test} className={`grid min-h-28 gap-3 border p-4 lg:grid-cols-[0.4fr_0.8fr_1.4fr_0.8fr] lg:items-center ${item.color}`}>
              <span className="text-xs text-secondary">rule 0{index + 1}</span>
              <code className="break-words text-xs text-accent">{item.test}</code>
              <span className="text-xs text-primary">{item.rule}</span>
              <span className="text-xs text-secondary">design · {item.design}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个例子只引入一个新行为；测试顺序同时决定实现暴露设计压力的顺序。
      </figcaption>
    </figure>
  );
}

const cycleStates = [
  { state: "RED", question: "失败是否来自刚写的行为？", evidence: "正确用例名 · 正确差值 · 无编译噪声", action: "只写一个最小失败例" },
  { state: "GREEN", question: "最小实现是否只满足当前证据？", evidence: "新测试和全部旧测试通过", action: "允许暂时具体，禁止偷偷扩需求" },
  { state: "REFACTOR", question: "能否删除重复并命名职责？", evidence: "行为不变 · 全套持续为绿", action: "提取 head / zeroPad / encodedDigit" },
] as const;

export function CtrRedGreenRefactorEvidence() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="红绿重构三阶段各自的问题证据和动作" className="grid gap-3 lg:grid-cols-3">
          {cycleStates.map((item, index) => (
            <section key={item.state} className="min-h-64 border border-border bg-background/60 p-4">
              <span className="text-xs text-secondary">phase 0{index + 1}</span>
              <strong className="mt-2 block text-base text-primary">{item.state}</strong>
              <p className="mb-0 mt-4 text-xs text-primary">{item.question}</p>
              <p className="mb-0 mt-4 border-t border-border pt-3 text-xs text-secondary">evidence · {item.evidence}</p>
              <p className="mb-0 mt-3 text-xs text-accent">action · {item.action}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        红证明测试能看见缺失行为，绿建立回归保护，重构只改变结构；缺任一证据都不是完整一轮。
      </figcaption>
    </figure>
  );
}

const boundaryCases = [
  { label: "空输入", input: '""', expected: "明确拒绝或约定 0000", risk: "访问 word[0] 越界", next: "先决定 API 前置条件，再写失败测试" },
  { label: "只有元音", input: '"Aeio"', expected: "A000", risk: "错误地给元音生成数字", next: "让 skip 规则独立于补零" },
  { label: "超长编码", input: '"Axrxrxr"', expected: "A626", risk: "写出超过四位或继续扫描无意义字符", next: "在达到 maxLength 时停止" },
  { label: "相邻同码", input: '"Abfp"', expected: "A100", risk: "得到 A111，重复编码", next: "保存上一个有效数字并比较" },
] as const;

export function CtrSoundexBoundaryLab() {
  const [active, setActive] = useState(0);
  const current = boundaryCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 Soundex 边界用例" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {boundaryCases.map((item, index) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <span className="text-xs text-secondary">input · {current.input}</span>
          <strong className="mt-3 block text-base text-primary">expected · {current.expected}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4">
              <span className="text-xs text-secondary">未覆盖风险</span>
              <p className="mb-0 mt-3 text-xs text-primary">{current.risk}</p>
            </div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">下一小步</span>
              <p className="mb-0 mt-3 text-xs text-primary">{current.next}</p>
            </div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        边界测试不是最后补齐的清单；它会迫使 API 提前说明空输入、长度和重复状态的契约。
      </figcaption>
    </figure>
  );
}
