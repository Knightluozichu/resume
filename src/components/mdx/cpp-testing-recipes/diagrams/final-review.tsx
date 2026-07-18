"use client";

import { useState } from "react";

const matrixRows = [
  { risk: "wrong rule", evidence: "unit example + boundary", failureOwner: "domain code", chapters: "2-4, 7" },
  { risk: "uncontrolled dependency", evidence: "stub/spy/fake + adapter contract", failureOwner: "port or adapter", chapters: "5-6" },
  { risk: "unknown legacy behavior", evidence: "characterization + seam", failureOwner: "legacy compatibility", chapters: "8" },
  { risk: "race/lifecycle", evidence: "event control + invariant + TSan", failureOwner: "concurrency protocol", chapters: "9" },
  { risk: "workflow/performance", evidence: "acceptance + benchmark", failureOwner: "system/value budget", chapters: "10" },
  { risk: "feedback decay", evidence: "CI health + owner + team standard", failureOwner: "delivery system", chapters: "11" },
] as const;

export function CtrTddEvidenceMatrixMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="从规则依赖遗留并发工作流性能到反馈衰退的 TDD 风险证据矩阵" className="space-y-3">
          {matrixRows.map((item, index) => (
            <section key={item.risk} className="grid min-h-28 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.35fr_0.9fr_1.4fr_1.2fr_0.6fr] lg:items-center">
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="text-sm text-primary">{item.risk}</strong>
              <span className="text-xs text-accent">proof · {item.evidence}</span>
              <span className="text-xs text-primary">owner · {item.failureOwner}</span>
              <code className="text-xs text-secondary">Ch {item.chapters}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先按风险选择证据，再让失败指向明确 owner；测试数量和层级名称都不能替代这一映射。
      </figcaption>
    </figure>
  );
}

const diagnosisSteps = [
  { gate: "signal", question: "失败是目标行为还是环境/旧失败？", next: "先恢复已知全绿与可重复入口" },
  { gate: "scope", question: "最窄哪层能复现：unit/integration/acceptance?", next: "下沉输入并保留外层场景" },
  { gate: "dependency", question: "时间、I/O、随机或线程是否不可控？", next: "建立窄 seam 与事件探针" },
  { gate: "change", question: "这是行为变化还是结构重构？", next: "分开提交与测试状态" },
  { gate: "sustain", question: "修复是否进入 CI、owner 和标准？", next: "让同类失败更早更清楚" },
] as const;

export function CtrFailureDiagnosisFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="从信号层次依赖变化到持续机制的 TDD 失败诊断流程" className="space-y-3">
          {diagnosisSteps.map((item, index) => (
            <section key={item.gate} className="grid min-h-28 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.4fr_0.7fr_1.6fr_1.3fr] lg:items-center">
              <span className="text-xs text-secondary">gate 0{index + 1}</span>
              <strong className="text-sm text-primary">{item.gate}</strong>
              <span className="text-xs text-primary">{item.question}</span>
              <span className="text-xs text-accent">next · {item.next}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        诊断从确认信号可信开始，逐层缩小责任，最后把修复固化到共享反馈系统，而不是只让当前测试变绿。
      </figcaption>
    </figure>
  );
}

const capstoneCases = [
  { label: "环境门", requirement: "干净目录一键构建，故意失败使 CI 红", proof: "版本/测试数/退出码", missing: "只在 IDE 点击成功" },
  { label: "设计门", requirement: "外部依赖显式，替身角色有理由", proof: "port + fake/spy + contract", missing: "大量内部 EXPECT_CALL" },
  { label: "复杂门", requirement: "遗留或并发风险有专门探针", proof: "characterization/seam 或 latch/invariant/TSan", missing: "只跑普通 happy path" },
  { label: "团队门", requirement: "红主干、随机测试、快层预算有 owner", proof: "CI policy + trend + deadline", missing: "只有覆盖率百分比" },
] as const;

export function CtrCapstoneReadinessLab() {
  const [active, setActive] = useState(0);
  const current = capstoneCases[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择现代 C++ TDD 综合项目验收门" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {capstoneCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <strong className="block text-base text-primary">{current.requirement}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">验收证据</span><p className="mb-0 mt-3 text-xs text-primary">{current.proof}</p></div>
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4"><span className="text-xs text-secondary">仍不合格</span><p className="mb-0 mt-3 text-xs text-primary">{current.missing}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        综合验收同时检查环境、设计、复杂风险与团队机制；任何一门缺证据，都不能用更多普通测试数量补偿。
      </figcaption>
    </figure>
  );
}
