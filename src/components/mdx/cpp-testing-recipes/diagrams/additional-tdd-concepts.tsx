"use client";

import { useState } from "react";

const evidenceScopes = [
  { scope: "unit", question: "一个窄行为在可控协作者下是否正确？", speed: "ms", failure: "规则或对象协作", artifact: "function/object tests", className: "border-cyan-500/35 bg-cyan-500/10" },
  { scope: "integration", question: "真实适配器与外部边界是否契合？", speed: "ms-s", failure: "mapping/protocol/config", artifact: "database/file/API contract", className: "border-amber-500/35 bg-amber-500/10" },
  { scope: "acceptance", question: "系统是否交付业务方可识别的价值？", speed: "s-min", failure: "workflow/policy/deployment", artifact: "executable examples", className: "border-emerald-500/35 bg-emerald-500/10" },
] as const;

export function CtrTestScopeEvidenceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="单元集成和验收测试各自问题速度失败范围和产物" className="grid gap-3 lg:grid-cols-3">
          {evidenceScopes.map((item) => (
            <section key={item.scope} className={`min-h-72 border p-4 ${item.className}`}>
              <strong className="block text-sm text-primary">{item.scope}</strong>
              <p className="mb-0 mt-4 text-xs text-primary">{item.question}</p>
              <code className="mt-4 block break-words text-xs text-accent">{item.artifact}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">feedback · {item.speed}</p>
              <p className="mb-0 mt-2 text-xs text-secondary">locates · {item.failure}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三类测试回答不同问题；更外层证据不能替代内层诊断，更内层全绿也不能证明用户工作流成立。
      </figcaption>
    </figure>
  );
}

const transformations = [
  { priority: "{} -> nil", meaning: "无代码到返回常量", example: "return 0" },
  { priority: "nil -> constant", meaning: "缺失结果到具体值", example: "return 1" },
  { priority: "constant -> variable", meaning: "固定值由输入决定", example: "return n" },
  { priority: "statement -> recursion/iteration", meaning: "单例扩展到序列", example: "for each item" },
  { priority: "unconditional -> conditional", meaning: "加入可区分分支", example: "if boundary" },
] as const;

export function CtrTransformationPriorityFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="从常量变量迭代到条件的转换优先级示意流程" className="space-y-3">
          {transformations.map((item, index) => (
            <section key={item.priority} className="grid min-h-28 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.4fr_1.1fr_1.4fr_1fr] lg:items-center">
              <span className="text-xs text-secondary">0{index + 1}</span>
              <code className="break-words text-xs text-accent">{item.priority}</code>
              <span className="text-xs text-primary">{item.meaning}</span>
              <code className="break-words text-xs text-secondary">{item.example}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        TPP 是选择下一个例子和最小代码变换的启发式，不是固定算法；低阶变换优先保持反馈单一。
      </figcaption>
    </figure>
  );
}

const assertionFirstCases = [
  { label: "返回值", desired: "EXPECT_EQ(4200, total.cents())", derive: "需要 Money total", arrange: "构造两条订单行" },
  { label: "异常", desired: "EXPECT_THROW(pop(), EmptyStack)", derive: "需要空 Stack 与 pop API", arrange: "默认构造即可" },
  { label: "交互", desired: "EXPECT_CALL(notifier, send(id))", derive: "通知是领域结果", arrange: "注入 notifier 并触发到期" },
  { label: "验收", desired: "Then receipt status is paid", derive: "需可观察订单查询", arrange: "Given unpaid order / When pay" },
] as const;

export function CtrAssertionsFirstLab() {
  const [active, setActive] = useState(0);
  const current = assertionFirstCases[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择断言优先情形" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {assertionFirstCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.desired}</code>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">反推观察点</span><p className="mb-0 mt-3 text-xs text-primary">{current.derive}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">最小准备</span><p className="mb-0 mt-3 text-xs text-primary">{current.arrange}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先写最终观察，再反推动作和最少准备，能减少测试在 setup 中迷路并迫使 API 暴露用户真正关心的结果。
      </figcaption>
    </figure>
  );
}
