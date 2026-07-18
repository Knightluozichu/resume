type ReturnCase = readonly [source: string, result: string, verdict: string];

function ReturnGrid({
  ariaLabel,
  caption,
  cases,
}: {
  ariaLabel: string;
  caption: string;
  cases: readonly ReturnCase[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cases.map(([source, result, verdict], index) => (
            <section
              key={source}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {source}
              </strong>
              <code className="mt-3 block text-xs text-accent">{result}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {verdict}
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

const storageCases = [
  ["Local object", "return local ref", "函数退出即析构，引用立刻悬空。"],
  ["Heap object", "return *new T", "对象尚存但 ownership 丢失，调用者易泄漏。"],
  [
    "Static object",
    "return static ref",
    "调用共享同一槽位，重入、并发和别名出错。",
  ],
  ["Member object", "return member ref", "仅在 owner 存活且不失效时可借用。"],
  [
    "Input object",
    "return argument ref",
    "可返回既存对象，但结果 lifetime 不超过实参。",
  ],
  ["Fresh value", "return T", "独立计算结果按值返回，责任和 lifetime 清楚。"],
] as const;

const operatorCases = [
  ["Inputs", "a * b", "两个 Rational 只提供计算所需的借用值。"],
  ["Compute", "n = a.n*b.n", "分子分母形成全新独立状态。"],
  ["Normalize", "reduce sign/gcd", "结果在发布前建立自身 invariant。"],
  ["Construct", "Rational result", "新对象不从属于任一 operand。"],
  ["Return", "return result", "copy elision/move 由语言与编译器优化。"],
  ["Use", "Rational c", "调用者获得普通值，无 delete 和共享槽位责任。"],
] as const;

const decisionCases = [
  ["New independent value?", "yes -> T", "运算、解析、转换结果通常按值。"],
  [
    "Transfer unique resource?",
    "yes -> unique owner",
    "返回值显式携带释放责任。",
  ],
  [
    "Maybe absent?",
    "optional/result",
    "缺失和失败进入返回类型，不靠 null reference。",
  ],
  [
    "Borrow existing object?",
    "T& / const T&",
    "必须说明 owner、失效条件和 aliasing。",
  ],
  [
    "Expose sequence?",
    "span/view/range",
    "返回非 owning view 并约束底层 lifetime。",
  ],
  [
    "Shared lifetime?",
    "shared owner",
    "仅在真实共同 ownership 时共享，不为省 copy。",
  ],
] as const;

export function EcppReturnStorageLifetimeMap() {
  return (
    <ReturnGrid
      ariaLabel="局部堆静态成员输入新值六种返回存储期与生命周期判断图"
      caption="躲避值返回的三种常见替代方案分别造成悬空、泄漏和共享状态；它们不是优化。"
      cases={storageCases}
    />
  );
}

export function EcppOperatorResultOwnershipMap() {
  return (
    <ReturnGrid
      ariaLabel="输入计算归一化构造返回使用六阶段乘法操作符结果所有权图"
      caption="operator* 产生独立数学值，按值返回与领域语义一致，优化交给 copy elision。"
      cases={operatorCases}
    />
  );
}

export function EcppReturnContractDecisionMap() {
  return (
    <ReturnGrid
      ariaLabel="新值资源转移可空借用序列视图共享生命周期六类返回契约决策图"
      caption="先判断结果的 ownership 与 lifetime，再选择 value、owner、result、reference 或 view。"
      cases={decisionCases}
    />
  );
}
