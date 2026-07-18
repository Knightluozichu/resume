type InterfaceCell = readonly [
  stage: string,
  evidence: string,
  meaning: string,
];

function InterfaceGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly InterfaceCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, evidence, meaning], index) => (
            <section
              key={stage}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage}
              </strong>
              <code className="mt-3 block text-xs text-accent">{evidence}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {meaning}
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

const comparisonCells = [
  ["Class client", "Widget&", "参数类型明确写出。"],
  [
    "Explicit interface",
    "size / normalize",
    "declarations 给出 names 与 signatures。",
  ],
  ["Runtime choice", "virtual call", "对象动态类型选择 override。"],
  ["Template client", "T&", "参数类型在实例化点才确定。"],
  [
    "Implicit interface",
    "valid expressions",
    "template body 形成表达式约束集合。",
  ],
  [
    "Compile-time choice",
    "instantiate / overload",
    "编译器为具体 T 选择并生成代码。",
  ],
] as const;

const expressionCells = [
  ["Read body", "value.size()", "T 必须支持可调用 size expression。"],
  ["Compose", "size() > 10", "结果只需能与 10 做有效比较。"],
  [
    "Compare",
    "value != sentinel",
    "可由 member、free function 或 conversion 满足。",
  ],
  ["Copy", "T temp(value)", "表达式要求从 value 构造 temp。"],
  ["Normalize", "temp.normalize()", "返回类型未使用，不需固定为 void。"],
  ["Swap", "temp.swap(value)", "完整表达式有效才属于候选实例。"],
] as const;

const contractCells = [
  ["Raw template", "template<class T>", "约束隐藏在 function body。"],
  ["Instantiate", "process<Order>", "编译器逐个检查所需 expressions。"],
  ["Failure", "no normalize", "错误可能在深层实例化栈暴露。"],
  [
    "Named concept",
    "Processable<T>",
    "把表达式集合提升为公开编译期 contract。",
  ],
  [
    "Constrained overload",
    "requires Processable<T>",
    "不满足者在候选选择时被排除。",
  ],
  ["Contract test", "static_assert", "正反类型验证边界而非只测一个实现。"],
] as const;

export function EcppExplicitImplicitInterfaceMap() {
  return (
    <InterfaceGrid
      ariaLabel="类客户显式接口运行期选择模板客户隐式接口编译期选择六阶段多态对照图"
      caption="classes 围绕声明形成 explicit interface 与 runtime polymorphism；templates 围绕有效表达式形成 implicit interface 与 compile-time polymorphism。"
      cells={comparisonCells}
    />
  );
}

export function EcppValidExpressionRequirementMap() {
  return (
    <InterfaceGrid
      ariaLabel="读取模板体组合比较哨兵比较复制构造规范化交换六阶段有效表达式约束图"
      caption="模板的隐式接口是完整 expressions 的可成立条件，不等于要求每个类型提供完全相同的成员签名。"
      cells={expressionCells}
    />
  );
}

export function EcppImplicitContractEvolutionMap() {
  return (
    <InterfaceGrid
      ariaLabel="原始模板具体实例化表达式失败命名概念受限重载契约测试六阶段隐式接口显式化图"
      caption="C++20 concept 不改变隐式接口本质，而是为表达式约束命名，让选择、诊断和测试边界更清晰。"
      cells={contractCells}
    />
  );
}
