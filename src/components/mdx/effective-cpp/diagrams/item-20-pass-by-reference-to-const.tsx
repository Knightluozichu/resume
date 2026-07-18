type PassingCase = readonly [
  stage: string,
  expression: string,
  consequence: string,
];

function PassingGrid({
  ariaLabel,
  caption,
  cases,
}: {
  ariaLabel: string;
  caption: string;
  cases: readonly PassingCase[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cases.map(([stage, expression, consequence], index) => (
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
                {consequence}
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

const copyCases = [
  [
    "Caller",
    "WindowWithScrollBars w",
    "完整派生对象包含 base、成员和资源状态。",
  ],
  ["Copy parameter", "validate(Window w)", "按值构造新的 base 参数对象。"],
  ["Base copy", "Window::Window", "base subobject 与其成员逐层复制。"],
  ["Derived lost", "scroll state omitted", "参数静态和动态类型都只剩 Window。"],
  ["Destroy copy", "~Window", "函数退出还要销毁临时参数及其成员。"],
  [
    "Const reference",
    "validate(const Window&)",
    "不复制且保留原对象动态类型。",
  ],
] as const;

const slicingCases = [
  ["Derived object", "SpecialWindow", "override display 并保存派生状态。"],
  ["By value", "draw(Window)", "只复制 Window subobject，发生 slicing。"],
  [
    "Dispatch",
    "parameter.display()",
    "参数动态类型已是 Window，调用 base 实现。",
  ],
  [
    "By const ref",
    "draw(const Window&)",
    "reference 绑定完整对象，不创建 base 副本。",
  ],
  ["Virtual call", "window.display()", "动态派发到 SpecialWindow override。"],
  ["Read-only", "const contract", "callee 借用对象且不能通过该引用修改。"],
] as const;

const decisionCases = [
  ["Observe only", "const T&", "非平凡对象只读借用，避免复制并保留多态。"],
  ["Mutate caller", "T&", "修改必须回写原对象，接口明确非 const borrow。"],
  [
    "Consume owner",
    "T / T&&",
    "函数取得值或 ownership，按实现与调用频率选择。",
  ],
  ["Small scalar", "int / pointer", "内置类型通常按值更简单且可能更快。"],
  ["Iterator/function", "by value", "约定为小型可复制对象，按值符合泛型生态。"],
  [
    "View",
    "span / string_view",
    "借用连续数据并显式携带范围，但需验证 lifetime。",
  ],
] as const;

export function EcppCopyCostAnatomyMap() {
  return (
    <PassingGrid
      ariaLabel="调用者参数复制基类复制派生丢失临时析构常量引用六阶段传值成本图"
      caption="pass-by-value 不只复制一个字段；它会构造完整参数对象、切掉派生部分并在退出时销毁副本。"
      cases={copyCases}
    />
  );
}

export function EcppSlicingDispatchMap() {
  return (
    <PassingGrid
      ariaLabel="派生对象按值切割分派常量引用虚调用只读六阶段对象切割图"
      caption="const reference 既消除副本，也保留动态类型；这两项收益彼此独立。"
      cases={slicingCases}
    />
  );
}

export function EcppParameterDecisionMap() {
  return (
    <PassingGrid
      ariaLabel="只读借用修改借用消费小标量迭代器视图六类参数传递决策图"
      caption="参数形式首先表达语义，再结合对象尺寸、复制成本、多态和 lifetime 选择。"
      cases={decisionCases}
    />
  );
}
