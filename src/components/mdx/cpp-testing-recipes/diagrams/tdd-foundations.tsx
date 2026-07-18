"use client";

import { useState } from "react";

const rules = [
  { rule: "Rule 1", constraint: "不写生产代码，除非要让失败测试通过", protects: "避免无证据需求与预先设计", className: "border-cyan-500/35 bg-cyan-500/10" },
  { rule: "Rule 2", constraint: "只写足以失败的测试，编译失败也算失败", protects: "缩短反馈并保持失败单一", className: "border-amber-500/35 bg-amber-500/10" },
  { rule: "Rule 3", constraint: "只写足以让当前失败通过的生产代码", protects: "让下一个例子继续产生设计压力", className: "border-emerald-500/35 bg-emerald-500/10" },
] as const;

export function CtrTddThreeRulesMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="TDD 三条规则的约束和所保护的反馈边界" className="grid gap-3 lg:grid-cols-3">
          {rules.map((item) => (
            <section key={item.rule} className={`min-h-64 border p-4 ${item.className}`}>
              <strong className="block text-sm text-primary">{item.rule}</strong>
              <p className="mb-0 mt-5 text-xs text-primary">{item.constraint}</p>
              <p className="mb-0 mt-5 border-t border-border pt-4 text-xs text-secondary">protects · {item.protects}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三条规则把测试与生产代码锁在短反馈步幅内；它们约束工作顺序，不规定最终设计形状。
      </figcaption>
    </figure>
  );
}

const greenSteps = [
  { step: "observe", question: "失败消息是否精确指向目标行为？", yes: "继续", no: "修正测试或环境" },
  { step: "fake", question: "固定值能建立第一条绿灯吗？", yes: "用常量证明接口", no: "选显而易见实现" },
  { step: "triangulate", question: "第二个例子能否推翻固定值？", yes: "加入最小一般化", no: "换更有区分力的例子" },
  { step: "regress", question: "新旧测试是否全部通过？", yes: "进入重构", no: "回到最小差异" },
] as const;

export function CtrRedToGreenDecisionFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="从正确红灯经伪实现三角测量到全部绿灯的决策流程" className="space-y-3">
          {greenSteps.map((item, index) => (
            <section key={item.step} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.4fr_1.4fr_0.8fr_0.9fr] lg:items-center">
              <div><span className="text-xs text-secondary">gate 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{item.step}</strong></div>
              <span className="text-xs text-primary">{item.question}</span>
              <span className="text-xs text-emerald-300">yes · {item.yes}</span>
              <span className="text-xs text-rose-300">no · {item.no}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        最快变绿不等于猜最终算法；先用最小证据通过，再由第二个例子迫使实现一般化。
      </figcaption>
    </figure>
  );
}

const practiceCases = [
  { label: "编译失败", situation: "测试调用尚不存在的 Stack::isEmpty()", diagnosis: "有效的最小红灯，但先只补接口到可编译", next: "声明 isEmpty，再观察断言失败" },
  { label: "环境失败", situation: "所有测试因动态库找不到而无法启动", diagnosis: "伪红灯，没有证明新行为缺失", next: "先修复运行环境并恢复旧测试全绿" },
  { label: "过度实现", situation: "只要求空栈，却一次写完动态扩容和迭代器", diagnosis: "违反最小生产代码规则", next: "回到当前例子需要的最窄状态" },
  { label: "重构时机", situation: "三个栈测试全绿，push/pop 中出现重复边界检查", diagnosis: "可以在行为保护下改善结构", next: "小步提取并在每步后跑全套" },
] as const;

export function CtrTddPracticeLab() {
  const [active, setActive] = useState(0);
  const current = practiceCases[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 TDD 练习情形" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {practiceCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <strong className="block text-base text-primary">{current.situation}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><span className="text-xs text-secondary">判断</span><p className="mb-0 mt-3 text-xs text-primary">{current.diagnosis}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">下一步</span><p className="mb-0 mt-3 text-xs text-primary">{current.next}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        TDD 的关键判断不是红或绿的颜色，而是当前信号是否能证明目标行为及其最小下一步。
      </figcaption>
    </figure>
  );
}
