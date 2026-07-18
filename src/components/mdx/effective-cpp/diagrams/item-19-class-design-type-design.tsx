type DesignCell = readonly [
  question: string,
  decision: string,
  evidence: string,
];

function TypeDesignGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly DesignCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([question, decision, evidence], index) => (
            <section
              key={question}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                Q{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {question}
              </strong>
              <code className="mt-3 block text-xs text-accent">{decision}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {evidence}
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

const questionCells = [
  [
    "哪些值合法？",
    "invariant",
    "构造成功后，任何 public operation 都保持合法状态。",
  ],
  [
    "怎样创建销毁？",
    "factory + destructor",
    "入口、失败语义与资源释放必须成对设计。",
  ],
  [
    "复制还是移动？",
    "value / identity",
    "先判断对象代表值还是身份，再决定 special members。",
  ],
  [
    "允许哪些转换？",
    "explicit boundary",
    "只保留语义无损、不会制造歧义的转换。",
  ],
  [
    "支持哪些操作？",
    "minimal algebra",
    "操作集合应符合领域规律，而不是照搬底层表示。",
  ],
  [
    "需要继承吗？",
    "is-a contract",
    "只有 substitutability 成立时才建立 public inheritance。",
  ],
] as const;

const lifecycleCells = [
  ["Raw input", "Money::from", "检查 currency、scale 和数值范围。"],
  ["Initialization", "Money{rep}", "一次建立 invariant，不先默认再补字段。"],
  ["Copy", "independent value", "值对象复制后共享语义，不共享可变身份。"],
  ["Assignment", "replace value", "处理 self-assignment，并保持失败前原值。"],
  ["Move", "valid source", "移动后源对象仍可析构和重新赋值。"],
  ["Destruction", "noexcept release", "资源和审计状态完整结束，不抛异常。"],
] as const;

const boundaryCells = [
  ["Integer", "explicit Money", "整数缺少 currency，不能隐式进入金额运算。"],
  ["Currency", "same-unit only", "不同币种相加必须经过显式汇率上下文。"],
  ["Serialization", "named factory", "wire value 先验证，再发布领域对象。"],
  ["Base interface", "public is-a", "派生对象必须满足所有 base 可观察契约。"],
  [
    "Implementation reuse",
    "composition",
    "只复用实现时优先成员对象，不伪造 is-a。",
  ],
  ["Operator", "domain law", "只提供能定义恒等、闭包和错误语义的操作。"],
] as const;

export function EcppTypeDesignQuestionMap() {
  return (
    <TypeDesignGrid
      ariaLabel="合法值创建销毁复制移动类型转换操作继承六项 class 类型设计问题图"
      caption="class 声明之前先回答类型问题；每个答案都应落到可观察契约，而不是实现偏好。"
      cells={questionCells}
    />
  );
}

export function EcppLifecycleContractMap() {
  return (
    <TypeDesignGrid
      ariaLabel="原始输入初始化复制赋值移动销毁六阶段对象生命周期契约图"
      caption="初始化与赋值不是语法细节，它们决定对象何时建立不变量以及失败后保留什么状态。"
      cells={lifecycleCells}
    />
  );
}

export function EcppConversionInheritanceDecisionMap() {
  return (
    <TypeDesignGrid
      ariaLabel="整数币种序列化基类实现复用运算符六类转换继承边界决策图"
      caption="转换、继承和运算符都在扩大类型的合法表达式集合，必须用领域规律约束。"
      cells={boundaryCells}
    />
  );
}
