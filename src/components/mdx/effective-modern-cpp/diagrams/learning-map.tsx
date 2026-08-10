"use client";

import { useState } from "react";

const chapters = [
  ["01", "Deducing Types", "Items 1-4", "template / auto / decltype / inspect"],
  ["02", "auto", "Items 5-6", "prefer auto / typed initializer"],
  [
    "03",
    "Moving to Modern C++",
    "Items 7-17",
    "initialization / nullptr / enum / special members",
  ],
  [
    "04",
    "Smart Pointers",
    "Items 18-22",
    "unique / shared / weak / make / Pimpl",
  ],
  [
    "05",
    "Rvalue & Forwarding",
    "Items 23-30",
    "move / forward / collapse / failure cases",
  ],
  [
    "06",
    "Lambda Expressions",
    "Items 31-34",
    "capture / init capture / generic lambda / bind",
  ],
  [
    "07",
    "Concurrency API",
    "Items 35-40",
    "task / async / thread / future / atomic",
  ],
  ["08", "Tweaks", "Items 41-42", "pass by value / emplacement"],
] as const;

export function EmcppEightChapterJourneyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Effective Modern C++ 八章四十二个 Items 的官方学习旅程图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {chapters.map(([index, title, items, concepts]) => (
            <section
              key={title}
              className="border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">CHAPTER {index}</span>
              <strong className="mt-2 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-2 block text-xs text-accent">{items}</code>
              <p className="mb-0 mt-2 text-xs text-secondary">{concepts}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        八章顺序从“看清类型”递进到 ownership、value category、callable 与
        concurrency，最后用两项成本微调收束。
      </figcaption>
    </figure>
  );
}

const dependencies = [
  ["Type deduction", "Items 1-6", "read generated types and APIs"],
  ["Modern object rules", "Items 7-17", "build predictable value semantics"],
  ["Ownership", "Items 18-22", "make resource lifetime explicit"],
  ["Value category", "Items 23-30", "move and forward without hijacking"],
  ["Closures", "Items 31-34", "store dependencies and adapt calls"],
  ["Concurrency", "Items 35-40", "compose tasks, outcomes and synchronization"],
  ["Cost choices", "Items 41-42", "optimize only under proven conditions"],
] as const;

export function EmcppPrincipleDependencyFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="类型推导对象规则 ownership value category closure concurrency 和成本选择的前置依赖流程图"
          className="space-y-3"
        >
          {dependencies.map(([name, items, outcome], index) => (
            <section
              key={name}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_0.7fr_1.5fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {name}
              </strong>
              <code className="text-xs text-accent">{items}</code>
              <span className="text-xs text-secondary">→ {outcome}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后续章节反复使用前置模型；跳过推导、ownership 或 value
        category，会把并发与 lambda 问题误诊成语法问题。
      </figcaption>
    </figure>
  );
}

const evidence = [
  ["Predict", "write selected type/overload/lifetime before compiling"],
  ["Reproduce", "build the smallest failing or surprising case"],
  ["Explain", "trace deduction, ownership, ordering or construction path"],
  ["Repair", "apply the narrow Item rule with explicit constraints"],
  ["Disprove", "add negative inputs and boundary paths"],
  ["Transfer", "migrate one real API and measure behavior"],
] as const;

export function EmcppItemEvidenceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="每个 Effective Modern C++ Item 从预测复现解释修复反证到迁移的证据链图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {evidence.map(([step, detail], index) => (
            <section
              key={step}
              className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {step}
              </strong>
              <p className="mb-0 mt-2 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        能复述条款不算掌握；必须留下类型、诊断、调用路径、负例和真实迁移证据。
      </figcaption>
    </figure>
  );
}

type IssueId = "type" | "ownership" | "forwarding" | "async" | "cost";

const issueRoutes: Record<
  IssueId,
  {
    label: string;
    entry: string;
    prerequisite: string;
    next: string;
    evidence: readonly string[];
  }
> = {
  type: {
    label: "auto 推导或重载类型不对",
    entry: "Items 1–6 · Deducing Types + auto",
    prerequisite: "先写出 T、parameter 与 expression type，再编译验证。",
    next: "回到 Items 7–17，检查初始化、nullptr、enum 和声明契约。",
    evidence: [
      "预测：把 decltype、cv、reference、array/function 规则写在代码旁。",
      "复现：用最小 static_assert 或 compiler diagnostic 固定实际类型。",
      "迁移：把一个冗长声明替换为 auto，并记录 proxy 或 initializer_list 边界。",
    ],
  },
  ownership: {
    label: "资源提前释放或 shared_ptr 循环",
    entry: "Items 18–22 · Smart Pointers",
    prerequisite: "补回 Items 7–17 的 special-member 与对象生命周期规则。",
    next: "再看 Items 23–30，确认 move、copy 和 deleter 的转移边界。",
    evidence: [
      "预测：画 owner、observer、control block 和最后一次释放的位置。",
      "复现：用析构计数、weak_ptr::expired 与异常路径检查 lifetime。",
      "迁移：把一个真实资源 API 标出唯一 owner、观察者和 cycle break。",
    ],
  },
  forwarding: {
    label: "完美转发重载劫持或 value category 丢失",
    entry: "Items 23–30 · Rvalue References、Move 与 Forwarding",
    prerequisite: "先能从 Items 1–6 推导 forwarding reference 的 T 和 collapsing 结果。",
    next: "回到 Items 7–17，检查 special members、noexcept 和隐式转换。",
    evidence: [
      "预测：列出 lvalue、const、rvalue、braced list 各自命中的 overload。",
      "复现：用 selected-overload compile probe 和最小 forwarding wrapper 对照。",
      "迁移：为真实泛型 API 增加约束、负例和 move/copy 计数。",
    ],
  },
  async: {
    label: "异步回调偶发悬空、等待或数据竞争",
    entry: "Items 31–40 · Lambda Expressions + Concurrency API",
    prerequisite: "先回补 ownership、value category 和 closure capture 的 lifetime。",
    next: "最后用 Items 41–42 的成本模型检查等待、分配与构造代价。",
    evidence: [
      "预测：画 capture、shared state、future 和线程结束的 happens-before。",
      "复现：分别构造 dangling capture、deferred、broken promise 和 data race 负例。",
      "迁移：给真实 task 加 lifetime 记录、异常路径测试和 release/acquire 证据。",
    ],
  },
  cost: {
    label: "“优化”后收益不稳定或构造失败",
    entry: "Items 41–42 · Tweaks",
    prerequisite: "回看前面所有语义契约，先证明 copy/move/ownership 仍然正确。",
    next: "用真实输入、分配次数和 constructor path 复盘，而不是只看一次时间。",
    evidence: [
      "预测：列出按值传参或 emplace 的适用条件与明确反例。",
      "复现：固定编译参数、输入规模、分配次数和构造成功率。",
      "迁移：保留基准、语义断言与回退方案，证明局部收益没有换来风险。",
    ],
  },
};

export function EmcppLearningMapDecisionLab() {
  const [issue, setIssue] = useState<IssueId>("type");
  const [evidenceStep, setEvidenceStep] = useState(0);
  const route = issueRoutes[issue];

  function reset() {
    setIssue("type");
    setEvidenceStep(0);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="Effective Modern C++ 学习地图决策实验：根据故障选择入口章节并逐步检查证据链"
      data-visual-kind="emcpp-learning-map-decision"
    >
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Effective Modern C++ · Learning map</p>
            <h3 className="mt-1 text-lg font-semibold text-primary">问题驱动回补：从故障找到正确入口</h3>
            <p className="mt-1 max-w-2xl text-sm text-secondary">选择一个真实故障，再推进证据链；结果由目录依赖和当前步骤决定，不是预设评分。</p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">▷ 可交互</span>
        </div>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 rounded-card border border-border bg-surface p-4">
          <div className="grid gap-3 md:grid-cols-2" role="img" aria-label={`当前问题 ${route.label} 的学习入口与证据链`}>
            {["问题", "入口", "前置", "证据", "迁移"].map((label, index) => {
              const active = index <= evidenceStep + 1;
              return (
                <div key={label} className="relative min-h-28 rounded-card border p-3" style={{ borderColor: active ? "var(--accent)" : "var(--border)", backgroundColor: active ? "color-mix(in srgb, var(--accent) 12%, var(--surface))" : "var(--surface)" }}>
                  <span className="text-[11px] font-semibold text-secondary">0{index + 1} · {label}</span>
                  <strong className="mt-2 block text-sm text-primary">{index === 0 ? route.label : index === 1 ? route.entry : index === 2 ? route.prerequisite : index === 3 ? route.evidence[evidenceStep] : route.next}</strong>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-card border border-border bg-elevated p-3 text-sm text-secondary">
            <strong className="text-primary">当前检查点：</strong> {route.evidence[evidenceStep]}
          </div>
        </div>
        <aside className="space-y-4 rounded-card border border-border bg-surface p-4">
          <div>
            <label htmlFor="emcpp-map-issue" className="mb-1 block text-xs font-semibold text-primary">遇到的故障</label>
            <select id="emcpp-map-issue" value={issue} onChange={(event) => { setIssue(event.target.value as IssueId); setEvidenceStep(0); }} className="min-h-[44px] w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary">
              {Object.entries(issueRoutes).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs"><label htmlFor="emcpp-map-evidence" className="font-semibold text-primary">推进证据链</label><span className="font-mono text-accent">{evidenceStep + 1}/3</span></div>
            <input id="emcpp-map-evidence" type="range" min={0} max={2} value={evidenceStep} onChange={(event) => setEvidenceStep(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
          </div>
          <div className="rounded-card border border-border bg-elevated p-3 text-xs text-secondary"><p className="font-semibold text-primary">路线约束</p><p className="mt-2">入口：<span className="text-success">{route.entry}</span></p><p className="mt-2">下一跳：<span className="text-warning">{route.next}</span></p></div>
          <button type="button" onClick={reset} className="min-h-[44px] w-full rounded-control border border-border px-3 py-2 text-xs font-semibold text-secondary hover:border-accent hover:text-accent">重置实验</button>
        </aside>
      </div>
      <div className="border-t border-border px-5 py-3 text-xs text-secondary">每个选择都保留“预测 → 复现 → 迁移”的学习证据；路线图用于决定先读什么，不替代真实编译、测试和代码审查。</div>
    </section>
  );
}
