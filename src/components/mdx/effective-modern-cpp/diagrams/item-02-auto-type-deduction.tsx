type AutoCell = readonly [stage: string, declaration: string, result: string];

function AutoGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly AutoCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, declaration, result], index) => (
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
                {declaration}
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

const correspondenceCells = [
  ["Plain auto", "auto x = expr", "虚拟 ParamType 为 T，按值推导。"],
  [
    "Const auto",
    "const auto x = expr",
    "先推 auto/T，再把 const 组成变量类型。",
  ],
  ["Auto reference", "auto& x = expr", "对应 T&，保留 expression cv。"],
  ["Const auto ref", "const auto& x = expr", "对应 const T&，可绑定临时对象。"],
  ["Auto pointer", "auto* p = expr", "对应 T*，保留 pointee cv。"],
  [
    "Auto universal",
    "auto&& x = expr",
    "lvalue 推导为 lvalue ref，rvalue 为 rvalue ref。",
  ],
] as const;

const bracesCells = [
  ["Equals scalar", "auto x = 27", "x 为 int。"],
  ["Parens scalar", "auto x(27)", "x 为 int。"],
  ["Equals braces", "auto x = {27}", "推导 initializer_list<int>。"],
  ["Direct braces C++14", "auto x{27}", "本书语境推导 initializer_list<int>。"],
  ["Mixed elements", "auto x = {1, 2.0}", "元素类型不能统一，deduction 失败。"],
  [
    "Explicit list",
    "initializer_list<long>",
    "指定元素目标类型后逐项验证转换。",
  ],
] as const;

const contextCells = [
  ["Variable auto", "auto x = {1,2}", "使用 auto braced-initializer 特例。"],
  ["Function template", "f({1,2})", "普通 T 无法从无类型 braced list 推导。"],
  [
    "List parameter",
    "f(initializer_list<T>)",
    "参数模式明确时可以推导元素类型。",
  ],
  [
    "Return auto",
    "auto make(){ return expr; }",
    "使用 template deduction，不采用变量特例。",
  ],
  [
    "Generic lambda",
    "[](auto x){...}",
    "参数等价函数模板，braced list 不能直接推导。",
  ],
  [
    "Materialize",
    "auto list = {1,2}; f(list)",
    "先形成有类型对象，再进入普通 deduction。",
  ],
] as const;

export function EmcppAutoTemplateCorrespondenceMap() {
  return (
    <AutoGrid
      ariaLabel="普通 auto 常量 auto 引用 auto 常量引用 auto 指针 auto 通用引用六种推导对应图"
      caption="把 auto 看作虚拟 template parameter T：declarator 中的 const、reference、pointer 与 T 组合，沿用 Item 1 三类规则。"
      cells={correspondenceCells}
    />
  );
}

export function EmcppAutoBracedInitializerMap() {
  return (
    <AutoGrid
      ariaLabel="等号标量圆括号标量等号花括号直接花括号混合元素显式列表六类 auto 花括号推导图"
      caption="C++11/14 变量 auto 对 braced initializer 有 initializer_list 特例；元素必须能推导为同一类型。"
      cells={bracesCells}
    />
  );
}

export function EmcppAutoDeductionContextMap() {
  return (
    <AutoGrid
      ariaLabel="变量 auto 函数模板列表参数返回 auto 泛型 lambda 先物化六上下文推导差异图"
      caption="变量 auto 的花括号特例不扩散到 auto return 和 generic lambda 参数；后两者采用 function template deduction。"
      cells={contextCells}
    />
  );
}
