type FriendCell = readonly [stage: string, expression: string, result: string];

function FriendGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly FriendCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, expression, result], index) => (
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
              <code className="mt-3 block text-xs text-accent">
                {expression}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {result}
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

const deductionCells = [
  ["Candidate", "operator*<T>", "namespace function template 需要先推导 T。"],
  ["Left argument", "Rational<int>", "第一参数建议 T 为 int。"],
  ["Right argument", "2", "第二参数模式 Rational<T> 与 int 不匹配。"],
  ["Deduction rule", "no user conversion", "推导阶段不调用 Rational(int)。"],
  [
    "Candidate failure",
    "deduction conflict",
    "函数模板不形成可调用 specialization。",
  ],
  ["No call", "oneHalf * 2", "还没进入普通 conversion sequence 就失败。"],
] as const;

const friendCells = [
  [
    "Instantiate class",
    "Rational<int>",
    "生成该 specialization 的 friend 定义。",
  ],
  [
    "Concrete signature",
    "operator*(R<int>, R<int>)",
    "friend 是 ordinary non-template function。",
  ],
  ["Unqualified call", "oneHalf * 2", "operator syntax 触发关联作用域查找。"],
  [
    "ADL finds friend",
    "Rational associated",
    "hidden friend 因 Rational 参数进入候选集。",
  ],
  [
    "Normal conversion",
    "2 -> Rational<int>",
    "候选已确定后允许 converting constructor。",
  ],
  ["Invoke", "multiply rationals", "左右操作数语义对称。"],
] as const;

const helperCells = [
  ["Thin friend", "operator*", "每个 T 提供可由 ADL 找到的非模板入口。"],
  [
    "Public access",
    "numerator / denominator",
    "friend 可读取接口或 private state。",
  ],
  ["Delegate", "doMultiply<T>", "重算法转交 namespace helper template。"],
  [
    "Inline wrapper",
    "small concrete call",
    "friend 本身只负责转换与查找边界。",
  ],
  ["Shared concern", "code size", "helper 便于独立优化和审查实例体积。"],
  [
    "Contract gate",
    "both operand orders",
    "测试 Rational*int 与 int*Rational。",
  ],
] as const;

export function EcppTemplateDeductionConversionMap() {
  return (
    <FriendGrid
      ariaLabel="模板候选左参数右参数推导规则候选失败调用失败六阶段模板推导转换顺序图"
      caption="function template 必须先完成 argument deduction；用户定义转换不会为了匹配 Rational 参数而参与该阶段。"
      cells={deductionCells}
    />
  );
}

export function EcppHiddenFriendConversionMap() {
  return (
    <FriendGrid
      ariaLabel="类实例具体签名无限定调用关联查找普通转换执行乘法六阶段隐藏友元转换图"
      caption="class specialization 生成 concrete ordinary friend；ADL 先找到候选，随后 int 才可转换为 Rational。"
      cells={friendCells}
    />
  );
}

export function EcppFriendHelperFactoringMap() {
  return (
    <FriendGrid
      ariaLabel="薄友元公开访问委托辅助内联包装代码尺寸契约门禁六阶段友元辅助抽离图"
      caption="把查找与转换留在 class 内 friend，把重算法委托 helper，可同时保持 ADL、对称转换和实现可维护性。"
      cells={helperCells}
    />
  );
}
