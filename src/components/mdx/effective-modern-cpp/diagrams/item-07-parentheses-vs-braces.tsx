"use client";

import { useState } from "react";

type SyntaxCase = Readonly<{
  context: string;
  parentheses: string;
  braces: string;
  key: string;
}>;

const syntaxCases = [
  {
    context: "Ordinary object",
    parentheses: "Widget(arg)",
    braces: "Widget{arg}",
    key: "两者都可用，但 selected overload 可能不同。",
  },
  {
    context: "Data member default",
    parentheses: "not allowed",
    braces: "int count{0}",
    key: "braces 可直接写在 member declaration。",
  },
  {
    context: "Narrowing input",
    parentheses: "int(x) allowed",
    braces: "int{x} rejected",
    key: "list-initialization 提供 compile-time narrowing gate。",
  },
  {
    context: "Empty object",
    parentheses: "Widget w() = function",
    braces: "Widget w{} = object",
    key: "empty braces 避开 most-vexing parse。",
  },
] as const satisfies readonly SyntaxCase[];

export function EmcppBraceSyntaxCoverageMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="普通对象成员默认值窄化输入和空对象四种场景下圆括号与花括号初始化差异图"
          className="space-y-3"
        >
          {syntaxCases.map((item, index) => (
            <section
              key={item.context}
              className="grid gap-3 border border-border bg-bg/40 p-4 md:grid-cols-[1fr_1fr_1fr_1.3fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
                {item.context}
              </strong>
              <code className="border-l-2 border-amber-500 pl-3 text-xs text-secondary">
                {item.parentheses}
              </code>
              <code className="border-l-2 border-emerald-500 pl-3 text-xs text-secondary">
                {item.braces}
              </code>
              <p className="m-0 text-xs leading-5 text-secondary">{item.key}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        braces 覆盖面更广并提供 narrowing protection，但普通对象上的 overload
        semantics 仍必须单独分析。
      </figcaption>
    </figure>
  );
}

const preferenceStages = [
  {
    label: "Brace call",
    code: "Widget{10, true}",
    detail: "进入 list-initialization overload resolution。",
    tone: "border-sky-500/35 bg-sky-500/10",
  },
  {
    label: "List candidate set",
    code: "initializer_list<long double>",
    detail: "只要可行，就优先于普通 int/bool constructor。",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    label: "Element conversion",
    code: "10, true -> long double",
    detail: "逐个检查转换与 narrowing。",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    label: "Selected meaning",
    code: "list constructor",
    detail: "delimiter 改变 selected overload 和 object state。",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
] as const;

export function EmcppInitializerListPreferenceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="花括号调用先建立 initializer list 候选集合再检查元素转换并选择 list constructor 的优先级流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {preferenceStages.map((stage, index) => (
            <section
              key={stage.label}
              className={`min-h-48 border p-4 ${stage.tone}`}
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage.label}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {stage.code}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {stage.detail}
              </p>
            </section>
          ))}
        </div>
        <p className="mb-0 mt-3 border-l-2 border-rose-500 bg-rose-500/10 p-3 text-xs leading-5 text-secondary">
          若 list element conversion 发生 narrowing，call
          可能直接失败，不应假设会回退到普通 constructor。
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        initializer-list preference 是两阶段选择，不是“所有 constructors
        一起比谁转换最少”。
      </figcaption>
    </figure>
  );
}

export function EmcppVectorConstructionSemanticsMap() {
  const repeated = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    value: 20,
  }));
  const listed = [10, 20];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="vector 圆括号十和二十创建十个值为二十的元素而花括号创建两个元素十和二十的语义对比图"
          className="grid gap-4 lg:grid-cols-2"
        >
          <section className="border border-amber-500/35 bg-amber-500/10 p-4">
            <strong className="text-sm text-primary">
              vector&lt;int&gt;(10, 20)
            </strong>
            <p className="mt-2 text-xs leading-5 text-secondary">
              count/value constructor：size = 10，value = 20
            </p>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {repeated.map((item) => (
                <span
                  key={item.id}
                  className="border border-amber-500/35 bg-bg/60 p-2 text-center text-xs text-primary"
                >
                  {item.value}
                </span>
              ))}
            </div>
          </section>
          <section className="border border-emerald-500/35 bg-emerald-500/10 p-4">
            <strong className="text-sm text-primary">
              vector&lt;int&gt;{`{10, 20}`}
            </strong>
            <p className="mt-2 text-xs leading-5 text-secondary">
              initializer-list constructor：size = 2，elements = 10, 20
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {listed.map((value) => (
                <span
                  key={value}
                  className="border border-emerald-500/35 bg-bg/60 p-4 text-center text-sm text-primary"
                >
                  {value}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        相同两个整数只是 token 相同；parentheses 表达数量与重复值，braces
        表达逐个列出的元素。
      </figcaption>
    </figure>
  );
}

type DecisionId = "count" | "elements" | "initializer" | "narrowing" | "vexing";

type ConstructionDecision = Readonly<{
  label: string;
  call: string;
  path: readonly string[];
  outcome: string;
  evidence: string;
  next: string;
}>;

const decisions: Record<DecisionId, ConstructionDecision> = {
  count: {
    label: "vector：数量与重复值",
    call: "std::vector<int> values(10, 20);",
    path: ["parentheses", "普通 constructors", "count/value", "size 10 · 每项 20"],
    outcome: "构造成功：容器有 10 个元素，每个元素等于 20。",
    evidence: "记录 size=10 和 values.front()=20；这是数量语义，不是列出两个元素。",
    next: "如果需求是逐项列出 10、20，切换到 braces 场景。",
  },
  elements: {
    label: "vector：列举元素",
    call: "std::vector<int> values{10, 20};",
    path: ["braces", "initializer_list", "element-list", "size 2 · 10, 20"],
    outcome: "构造成功：容器有 2 个元素，依次为 10 和 20。",
    evidence: "记录 size=2、values[0]=10；delimiter 改变了 object state。",
    next: "如果元素类型会发生隐式窄化，先切换到 narrowing 场景检查编译期保护。",
  },
  initializer: {
    label: "Widget：initializer-list 优先",
    call: "Widget widget{10, true};",
    path: ["braces", "initializer_list candidate", "long double conversion", "list constructor"],
    outcome: "优先选择 initializer-list constructor，而不是看似精确的 int/bool overload。",
    evidence: "用 overload probe 或构造函数日志确认 selected overload，不只断言“能编译”。",
    next: "若 list element conversion 发生 narrowing，不要假设会回退普通 constructor。",
  },
  narrowing: {
    label: "int：拒绝窄化",
    call: "double value = 3.2; int result{value};",
    path: ["braces", "list-initialization", "narrowing check", "compile-time rejection"],
    outcome: "编译失败：花括号拒绝可能损失小数部分的隐式转换。",
    evidence: "保留编译器诊断；若业务确实要截断，改用具名策略或显式 cast 并做范围检查。",
    next: "切换到 parentheses 可看到语法允许并不代表语义安全。",
  },
  vexing: {
    label: "Widget：避开 most-vexing parse",
    call: "Widget widget{};",
    path: ["empty braces", "无函数声明解释", "default constructor", "object"],
    outcome: "创建对象；对比 Widget widget()，后者会被解析成函数声明。",
    evidence: "用 sizeof、成员访问或类型检查证明 widget 是 object，而不是 function。",
    next: "若要传入空 initializer-list，使用额外 parentheses 或 nested braces 明确意图。",
  },
};

const decisionOrder: readonly DecisionId[] = [
  "count",
  "elements",
  "initializer",
  "narrowing",
  "vexing",
];

export function EmcppItem07ConstructionDecisionLab() {
  const [decisionId, setDecisionId] = useState<DecisionId>("count");
  const decision = decisions[decisionId];

  function advanceDecision() {
    const currentIndex = decisionOrder.indexOf(decisionId);
    setDecisionId(decisionOrder[(currentIndex + 1) % decisionOrder.length]);
  }

  function reset() {
    setDecisionId("count");
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="Effective Modern C++ Item 7 构造语义决策实验：切换圆括号、花括号、initializer-list 和 narrowing 场景"
      data-visual-kind="emcpp-item-07-construction-decision"
    >
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Effective Modern C++ · Item 7</p>
            <h3 className="mt-1 text-lg font-semibold text-primary">delimiter 改变了什么？</h3>
            <p className="mt-1 max-w-2xl text-sm text-secondary">选择一个构造场景，沿着候选集合、转换检查和最终 object state 逐步核对语义。</p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">▷ 可交互</span>
        </div>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0 rounded-card border border-border bg-surface p-4">
          <code className="block overflow-x-auto rounded-card border border-border bg-elevated p-3 text-sm text-accent">{decision.call}</code>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="img" aria-label={`${decision.label}：${decision.path.join("，")}`}>
            {decision.path.map((step, index) => <div key={`${step}-${index}`} className="min-h-24 rounded-card border border-accent/40 bg-accent/10 p-3"><span className="text-[11px] font-semibold text-secondary">0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{step}</strong></div>)}
          </div>
          <div className="mt-4 rounded-card border border-border bg-elevated p-3 text-sm text-secondary"><strong className="text-primary">结果：</strong> {decision.outcome}</div>
          <div className="mt-3 rounded-card border border-border bg-elevated p-3 text-sm text-secondary"><strong className="text-primary">验收证据：</strong> {decision.evidence}</div>
        </div>
        <aside className="space-y-4 rounded-card border border-border bg-surface p-4">
          <button type="button" onClick={advanceDecision} className="min-h-[44px] w-full rounded-control border border-accent px-3 py-2 text-xs font-semibold text-accent hover:bg-accent/10">切换到下一个场景</button>
          <div>
            <label htmlFor="emcpp-item07-decision" className="mb-1 block text-xs font-semibold text-primary">构造场景</label>
            <select id="emcpp-item07-decision" value={decisionId} onChange={(event) => setDecisionId(event.target.value as DecisionId)} className="min-h-[44px] w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary">
              {Object.entries(decisions).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}
            </select>
          </div>
          <div className="rounded-card border border-border bg-elevated p-3 text-xs text-secondary"><p className="font-semibold text-primary">下一步</p><p className="mt-2">{decision.next}</p></div>
          <button type="button" onClick={reset} className="min-h-[44px] w-full rounded-control border border-border px-3 py-2 text-xs font-semibold text-secondary hover:border-accent hover:text-accent">重置实验</button>
        </aside>
      </div>
      <div className="border-t border-border px-5 py-3 text-xs text-secondary">实验只展示语言规则与可复核证据；真实 API 还应补充 overload probe、编译器诊断和 object-state 测试。</div>
    </section>
  );
}
