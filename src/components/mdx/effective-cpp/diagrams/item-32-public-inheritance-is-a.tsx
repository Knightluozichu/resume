type ContractCell = readonly [
  question: string,
  basePromise: string,
  derivedDuty: string,
];

function ContractGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly ContractCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([question, basePromise, derivedDuty], index) => (
            <section
              key={question}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {question}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {basePromise}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {derivedDuty}
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

const substitutionCells = [
  [
    "Accepted inputs",
    "base precondition",
    "derived 不能要求更多，否则合法 base 调用会被拒绝。",
  ],
  [
    "Returned result",
    "base postcondition",
    "derived 不能少承诺，客户仍应依赖相同结果。",
  ],
  [
    "Object state",
    "base invariant",
    "每次 override 后都保持 base 可观察不变量。",
  ],
  [
    "Failure",
    "base error model",
    "不能把正常 base 用法改成意外异常或无定义状态。",
  ],
  [
    "Lifetime",
    "base ownership",
    "copy/move/destruction 与 borrowed handles 保持契约。",
  ],
  [
    "Behavior",
    "client observation",
    "客户只依赖 base 时，替换 derived 仍得到正确程序。",
  ],
] as const;

const squareCells = [
  [
    "Base contract",
    "setWidth changes width",
    "Rectangle 客户可假定 height 保持不变。",
  ],
  [
    "Square invariant",
    "width == height",
    "Square 不能只改 width 而保持自身合法。",
  ],
  [
    "Override",
    "setWidth changes both",
    "为维护 Square invariant，derived 改写了 base 后置条件。",
  ],
  [
    "Substitute",
    "Rectangle& = Square",
    "类型系统允许客户按 Rectangle contract 调用。",
  ],
  [
    "Assertion",
    "oldHeight == height",
    "Square 行为让原本正确的 Rectangle 客户失败。",
  ],
  [
    "Redesign",
    "Shape / value composition",
    "共享几何能力，不宣称可独立调宽高的 is-a。",
  ],
] as const;

const decisionCells = [
  [
    "All base operations valid?",
    "yes -> continue",
    "逐项检查，不以名称相似或数据相同替代。",
  ],
  [
    "Stronger precondition?",
    "yes -> reject",
    "derived 不能缩小 base 接受的状态和输入集合。",
  ],
  [
    "Weaker postcondition?",
    "yes -> reject",
    "derived 必须至少提供 base 承诺的结果。",
  ],
  [
    "Only reuse code?",
    "composition",
    "has-a / implementation reuse 不应伪装 public is-a。",
  ],
  [
    "Optional capability?",
    "small interface",
    "Flyable、Serializable 等按能力单独建契约。",
  ],
  [
    "Contract suite passes?",
    "public inheritance",
    "所有 derived 重跑 base tests 后才接受层次关系。",
  ],
] as const;

export function EcppSubstitutionContractMap() {
  return (
    <ContractGrid
      ariaLabel="输入后置对象状态失败生命周期行为六项 public 继承替换契约图"
      caption="public inheritance 是可替换性承诺：derived 必须接受 base 的所有合法用法，并维持同等或更强结果。"
      cells={substitutionCells}
    />
  );
}

export function EcppSquareRectangleFailureMap() {
  return (
    <ContractGrid
      ariaLabel="长方形契约正方形不变量覆盖替换断言重构六阶段 Square Rectangle 失败图"
      caption="Square 为保持边长相等而改变 Rectangle::setWidth 的后置条件，导致正确 base 客户在替换后失败。"
      cells={squareCells}
    />
  );
}

export function EcppInheritanceDecisionMap() {
  return (
    <ContractGrid
      ariaLabel="基类操作前置后置代码复用可选能力契约测试六项 public 继承决策图"
      caption="先证明 base contract suite 对 derived 全部成立；只复用实现或部分能力时选择 composition/小接口。"
      cells={decisionCells}
    />
  );
}
