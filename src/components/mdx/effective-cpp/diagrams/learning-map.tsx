type MapCell = readonly [stage: string, items: string, outcome: string];

function LearningGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly MapCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, items, outcome], index) => (
            <section
              key={stage}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage}
              </strong>
              <code className="mt-3 block text-xs text-accent">{items}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {outcome}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const journeyCells = [
  ["Accustoming", "Items 1-4", "语言联邦、const、初始化建立基础语义。"],
  ["Special members", "Items 5-12", "控制生成函数、析构、赋值和完整复制。"],
  ["Resources", "Items 13-17", "RAII、ownership 和 new/delete 配对。"],
  ["Design declarations", "Items 18-25", "让接口易正确、封装且支持自然转换。"],
  ["Implementations", "Items 26-31", "变量时机、cast、异常、inline 和依赖。"],
  ["Inheritance/OOD", "Items 32-40", "is-a、virtual、NVI、组合和多继承。"],
  ["Templates", "Items 41-48", "隐式接口、traits、查找和 TMP。"],
  ["New/delete", "Items 49-52", "handler、替换、常规与 placement 配对。"],
  ["Miscellany", "Items 53-55", "warnings、标准库、TR1 与 Boost。"],
] as const;

const dependencyCells = [
  ["Value semantics", "initialize + copy", "先保证对象出生、复制和销毁一致。"],
  ["Ownership", "RAII + smart pointer", "对象语义承载资源生命周期。"],
  ["Interface", "easy correct + encapsulation", "把违规状态挡在调用边界。"],
  [
    "Implementation",
    "exception + dependency",
    "在不泄漏 contract 下优化内部。",
  ],
  ["Polymorphism", "is-a + virtual/NVI", "有稳定对象和接口后再建立层次。"],
  [
    "Generic/system",
    "templates + allocation",
    "最后泛化 contract 并控制底层机制。",
  ],
] as const;

const evidenceCells = [
  ["Read", "state the Item", "用一句话写出原条款和禁止的错误。"],
  [
    "Predict",
    "before compile",
    "先预测 overload、lifetime、dispatch 或 failure path。",
  ],
  ["Reproduce", "minimal counterexample", "保留能触发问题的最小代码。"],
  [
    "Refactor",
    "apply language mechanism",
    "用 RAII、override、traits 等建立 contract。",
  ],
  ["Test", "positive + negative", "验证正确路径和必须拒绝的错误路径。"],
  ["Transfer", "review real code", "在真实模块定位同类风险并记录证据。"],
] as const;

export function EcppNineChapterJourneyMap() {
  return (
    <LearningGrid
      ariaLabel="Effective C++ 九章五十五条完整学习旅程图"
      caption="第三版 55 Items 按九章推进：从语言和对象语义，经资源、接口、实现与继承，走到 templates、allocation 和工程生态。"
      cells={journeyCells}
    />
  );
}

export function EcppPrincipleDependencyMap() {
  return (
    <LearningGrid
      ariaLabel="值语义所有权接口实现多态泛型底层六阶段知识依赖图"
      caption="后续原则依赖前置 contract：没有正确对象语义就没有可靠 RAII，没有稳定接口就不应急于继承或泛化。"
      cells={dependencyCells}
    />
  );
}

export function EcppChapterEvidenceMap() {
  return (
    <LearningGrid
      ariaLabel="阅读预测复现重构测试迁移六阶段条款学习证据图"
      caption="每个 Item 都以预测、最小复现、语言机制修复和正反测试验收，避免把记住口号误作掌握。"
      cells={evidenceCells}
    />
  );
}
