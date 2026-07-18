"use client";

import { useState } from "react";

const phases = [
  { phase: "01 · establish", chapters: "Ch1-3", focus: "环境 · Soundex · TDD 基础", exit: "能稳定完成正确红灯到全绿重构", className: "border-cyan-500/35 bg-cyan-500/10" },
  { phase: "02 · construct", chapters: "Ch4-7", focus: "构造 · 替身 · 增量设计 · 测试质量", exit: "能写快、独立、可诊断且不锁死实现的测试", className: "border-emerald-500/35 bg-emerald-500/10" },
  { phase: "03 · evolve", chapters: "Ch8-10", focus: "遗留 · 线程 · 证据层/启发式", exit: "能在复杂边界保持小步和多层证据", className: "border-amber-500/35 bg-amber-500/10" },
  { phase: "04 · sustain", chapters: "Ch11", focus: "团队学习 · CI · 标准 · 社区", exit: "能运营长期可信的共享反馈系统", className: "border-violet-500/35 bg-violet-500/10" },
] as const;

export function CtrLearningPathMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="现代 C++ TDD 全书从建立反馈构造测试演化复杂系统到团队持续的四阶段路线" className="grid gap-3 md:grid-cols-2">
          {phases.map((item) => (
            <section key={item.phase} className={`min-h-60 border p-4 ${item.className}`}>
              <strong className="block text-sm text-primary">{item.phase}</strong>
              <code className="mt-3 block text-xs text-accent">{item.chapters}</code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.focus}</p>
              <p className="mb-0 mt-4 border-t border-border pt-3 text-xs text-secondary">exit · {item.exit}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        学习顺序从个人反馈循环开始，逐步扩展到依赖、设计、遗留、并发和团队系统；每阶段都有可验收出口。
      </figcaption>
    </figure>
  );
}

const dependencyRows = [
  { from: "Global Setup", enables: "可信红绿信号", to: "First Example / Foundations" },
  { from: "Test Construction", enables: "可读断言与快慢入口", to: "Test Doubles / Quality Tests" },
  { from: "Test Doubles", enables: "显式依赖与可控边界", to: "Incremental Design / Legacy" },
  { from: "Legacy Challenges", enables: "护栏与接缝", to: "Threading / larger systems" },
  { from: "Additional Concepts", enables: "多层与性能证据", to: "Growing and Sustaining" },
] as const;

export function CtrChapterDependencyFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="全书章节之间由可信信号测试构造依赖接缝和多层证据形成的依赖流程" className="space-y-3">
          {dependencyRows.map((item, index) => (
            <section key={item.from} className="grid min-h-28 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.4fr_1fr_1.4fr_1.2fr] lg:items-center">
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="text-sm text-primary">{item.from}</strong>
              <span className="text-xs text-accent">enables · {item.enables}</span>
              <span className="text-xs text-secondary">next · {item.to}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后续章节不是独立技巧清单；没有前面的可信反馈与依赖边界，遗留、线程和团队实践都会退化为不稳定仪式。
      </figcaption>
    </figure>
  );
}

const routes = [
  { label: "从零系统学", start: "Ch1", sequence: "1→2→3→4→5→6→7→8→9→10→11", checkpoint: "每章完成练习并复做前章一个红绿循环" },
  { label: "已有单测", start: "Ch3", sequence: "3→4→5→6→7，再补 1-2 的证据缺口", checkpoint: "用 FIRST 和替身决策审计现有套件" },
  { label: "遗留改造", start: "Ch8", sequence: "先读 3/5/7，再做 8，按风险进入 9/10", checkpoint: "一条特征护栏 + 一个显式 seam + 新红灯" },
  { label: "团队落地", start: "Ch11", sequence: "先测 CI/坏测试健康，再回补 4/7/8", checkpoint: "主干红 owner、快层预算、随机项期限" },
] as const;

export function CtrReadingRouteLab() {
  const [active, setActive] = useState(0);
  const current = routes[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择现代 C++ TDD 阅读路线" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {routes.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <span className="text-xs text-secondary">start · {current.start}</span>
          <strong className="mt-3 block text-base text-primary">{current.sequence}</strong>
          <div className="mt-5 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">验收点</span><p className="mb-0 mt-3 text-xs text-primary">{current.checkpoint}</p></div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可以按目标跳读，但必须回补前置证据；每条路线以可执行产物验收，而不是仅标记“读完”。
      </figcaption>
    </figure>
  );
}
