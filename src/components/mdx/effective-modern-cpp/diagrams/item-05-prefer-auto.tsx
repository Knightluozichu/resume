type DeclarationCase = Readonly<{
  context: string;
  explicit: string;
  inferred: string;
  failure: string;
}>;

const declarationCases = [
  {
    context: "Local scalar",
    explicit: "int value;",
    inferred: "auto value = 0;",
    failure: "显式类型允许漏掉初始化；auto 无 initializer 就不能推导。",
  },
  {
    context: "Iterator value",
    explicit: "iterator_traits<It>::value_type",
    inferred: "auto value = *it;",
    failure: "重复 iterator 知识，重构时容易与 expression 脱节。",
  },
  {
    context: "Lambda closure",
    explicit: "unnamed / std::function",
    inferred: "auto callable = lambda;",
    failure: "closure 无可写名称；wrapper 可能增加存储和调用成本。",
  },
  {
    context: "Container size",
    explicit: "unsigned size",
    inferred: "auto size = c.size();",
    failure: "手写宽度可能与 size_type 在 64-bit 平台不一致。",
  },
] as const satisfies readonly DeclarationCase[];

export function EmcppAutoDeclarationCostMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="局部标量迭代器值 lambda closure 与容器 size 的显式声明和 auto 声明成本比较图"
          className="grid gap-3 lg:grid-cols-2"
        >
          {declarationCases.map((item, index) => (
            <section
              key={item.context}
              className="border border-border bg-bg/40 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">{item.context}</strong>
                <span className="text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="border border-rose-500/30 bg-rose-500/10 p-3">
                  <span className="text-xs text-secondary">显式重复</span>
                  <code className="mt-2 block text-xs text-primary">
                    {item.explicit}
                  </code>
                </div>
                <div className="border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <span className="text-xs text-secondary">由表达式推导</span>
                  <code className="mt-2 block text-xs text-primary">
                    {item.inferred}
                  </code>
                </div>
              </div>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {item.failure}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        auto 的收益来自让 initializer
        成为类型事实源：强制初始化、保存不可命名类型，并跟随 API
        的精确返回类型。
      </figcaption>
    </figure>
  );
}

export function EmcppMapLoopConversionMap() {
  const stages = [
    {
      label: "Map node",
      type: "pair<const string, int>",
      detail: "key 必须 const，保证 hash/index invariant。",
      tone: "border-sky-500/35 bg-sky-500/10",
    },
    {
      label: "Wrong loop type",
      type: "const pair<string, int>&",
      detail: "目标 pair 的 key 不再 const，类型并不相同。",
      tone: "border-amber-500/35 bg-amber-500/10",
    },
    {
      label: "Hidden conversion",
      type: "temporary pair<string, int>",
      detail: "每轮复制 key/value，再把 reference 绑定临时对象。",
      tone: "border-rose-500/35 bg-rose-500/10",
    },
    {
      label: "Exact binding",
      type: "const auto&",
      detail: "直接引用 map node，不构造 temporary，identity 保持。",
      tone: "border-emerald-500/35 bg-emerald-500/10",
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="unordered map node 因错误 pair 显式类型产生每轮转换临时对象并由 const auto reference 修复的路径图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {stages.map((stage, index) => (
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
                {stage.type}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {stage.detail}
              </p>
            </section>
          ))}
        </div>
        <div className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
          <p className="m-0 border-l-2 border-rose-500 pl-3 text-secondary">
            错误路径：node → converting constructor → temporary → body → destroy
          </p>
          <p className="m-0 border-l-2 border-emerald-500 pl-3 text-secondary">
            正确路径：node → const auto reference → body，零转换且地址稳定
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “显式 reference”仍可能隐藏复制：只有 loop variable 与 range element
        的真实类型一致，reference 才直接绑定 node。
      </figcaption>
    </figure>
  );
}

type Decision = Readonly<{
  question: string;
  yes: string;
  no: string;
}>;

const decisions = [
  {
    question: "initializer 是否清晰且紧邻声明？",
    yes: "优先 auto，并用准确变量名表达 intent。",
    no: "先改善 factory/name 或缩小 scope。",
  },
  {
    question: "类型是否冗长、不可命名或实现相关？",
    yes: "auto 移除无意义的 spelling coupling。",
    no: "仍可 auto，但检查是否需要领域 alias。",
  },
  {
    question: "语义是否依赖 width、ABI、ownership 或 conversion？",
    yes: "加入 alias、typed initializer 或 static assertion。",
    no: "让 expression contract 决定局部类型。",
  },
  {
    question: "是否需要 reference 而非 value copy？",
    yes: "明确写 const auto&、auto& 或 auto&&。",
    no: "plain auto 表达拥有一个独立 value。",
  },
] as const satisfies readonly Decision[];

export function EmcppAutoDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从 initializer 可读性类型可命名性精确语义契约和引用需求决定 auto 使用方式的决策图"
          className="space-y-3"
        >
          {decisions.map((decision, index) => (
            <section
              key={decision.question}
              className="grid gap-3 border border-border bg-bg/40 p-4 md:grid-cols-[1.2fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-3 text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
                {decision.question}
              </strong>
              <p className="m-0 border-l-2 border-emerald-500 pl-3 text-xs leading-5 text-secondary">
                是：{decision.yes}
              </p>
              <p className="m-0 border-l-2 border-amber-500 pl-3 text-xs leading-5 text-secondary">
                否：{decision.no}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        默认使用 auto 不等于隐藏契约：当 width、ABI、ownership 或 conversion
        重要时，用更强的类型约束补足。
      </figcaption>
    </figure>
  );
}
