"use client";

import { useState } from "react";

const forces = [
  { priority: "01", force: "passes tests", question: "所有已声明行为是否成立？", evidence: "新旧测试全绿", className: "border-emerald-500/35 bg-emerald-500/10" },
  { priority: "02", force: "reveals intention", question: "名字与边界能否说明领域？", evidence: "调用者无需读实现", className: "border-cyan-500/35 bg-cyan-500/10" },
  { priority: "03", force: "no duplication", question: "同一知识是否散落多处？", evidence: "规则有单一来源", className: "border-amber-500/35 bg-amber-500/10" },
  { priority: "04", force: "fewest elements", question: "是否存在无当前价值的抽象？", evidence: "删除后仍清晰全绿", className: "border-violet-500/35 bg-violet-500/10" },
] as const;

export function CtrSimpleDesignForcesMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="简单设计四项力量按通过测试表达意图消除重复和最少元素排序" className="grid gap-3 md:grid-cols-2">
          {forces.map((item) => (
            <section key={item.force} className={`min-h-56 border p-4 ${item.className}`}>
              <span className="text-xs text-secondary">priority {item.priority}</span>
              <strong className="mt-2 block text-sm text-primary">{item.force}</strong>
              <p className="mb-0 mt-4 text-xs text-primary">{item.question}</p>
              <p className="mb-0 mt-4 text-xs text-secondary">evidence · {item.evidence}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        简单不是代码最短；先保持行为，再让意图和知识边界清晰，最后删除无证据结构。
      </figcaption>
    </figure>
  );
}

const decisionRows = [
  { decision: "外部协议/数据兼容", timing: "提前验证", method: "spike + 契约测试", reversible: "低", output: "边界与风险记录" },
  { decision: "类与 helper 划分", timing: "由例子增量演化", method: "红绿重构", reversible: "高", output: "当前最简单结构" },
  { decision: "性能目标", timing: "提前定义指标，延后优化", method: "基准 + 画像", reversible: "中", output: "可测预算" },
  { decision: "框架/存储选型", timing: "风险点先试验", method: "walking skeleton", reversible: "低至中", output: "最薄端到端证据" },
] as const;

export function CtrDesignTimingMatrixMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="外部协议类划分性能目标和技术选型的设计时机矩阵" className="space-y-3">
          {decisionRows.map((item, index) => (
            <section key={item.decision} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.45fr_1.2fr_1.1fr_0.9fr_0.5fr_1fr] lg:items-center">
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="text-sm text-primary">{item.decision}</strong>
              <span className="text-xs text-primary">{item.timing}</span>
              <code className="break-words text-xs text-accent">{item.method}</code>
              <span className="text-xs text-secondary">rev · {item.reversible}</span>
              <span className="text-xs text-secondary">{item.output}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        增量设计不回避低可逆风险；它用短试验提前获得知识，把高可逆内部结构留给持续反馈。
      </figcaption>
    </figure>
  );
}

const inhibitors = [
  { label: "慢测试", symptom: "全套 15 分钟，开发者一天只跑两次", damage: "重构反馈太晚，批量改动扩大", treatment: "隔离 I/O，拆快层并监控时长" },
  { label: "共享状态", symptom: "测试顺序变化就随机失败", damage: "无法判断失败来自当前改动", treatment: "每例独立 fixture，显式注入时间与数据" },
  { label: "无安全网", symptom: "核心行为只有人工检查", damage: "团队不敢移动责任或删重复", treatment: "先加 characterization tests，再小步重构" },
  { label: "大批提交", symptom: "数日行为和结构混在一个差异中", damage: "回退与评审都失去局部因果", treatment: "小绿点提交，行为与重构分开" },
] as const;

export function CtrRefactoringInhibitorLab() {
  const [active, setActive] = useState(0);
  const current = inhibitors[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择重构阻碍" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {inhibitors.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <strong className="block text-base text-primary">{current.symptom}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4"><span className="text-xs text-secondary">损害</span><p className="mb-0 mt-3 text-xs text-primary">{current.damage}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">治理</span><p className="mb-0 mt-3 text-xs text-primary">{current.treatment}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        重构停滞通常不是态度问题，而是反馈速度、隔离、安全网和变更粒度的系统条件出了问题。
      </figcaption>
    </figure>
  );
}
