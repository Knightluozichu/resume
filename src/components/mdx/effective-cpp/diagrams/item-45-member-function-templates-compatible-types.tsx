type CompatibleCell = readonly [
  stage: string,
  expression: string,
  outcome: string,
];

function CompatibleGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly CompatibleCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, expression, outcome], index) => (
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

const latticeCells = [
  ["Same type", "Widget* -> Widget*", "普通复制方向合法。"],
  ["Upcast", "Derived* -> Base*", "公开继承允许安全向上转换。"],
  ["Add const", "T* -> const T*", "增加 cv 限定合法。"],
  ["Combined", "Derived* -> const Base*", "向上转换与增加 const 可组合。"],
  ["Downcast", "Base* -/-> Derived*", "隐式转换必须拒绝潜在类型错误。"],
  ["Drop const", "const T* -/-> T*", "不能通过 wrapper 绕过 const safety。"],
] as const;

const constructorCells = [
  ["Source", "SmartPtr<U>", "member template 推导源 element type U。"],
  ["Candidate", "SmartPtr<T>(source)", "泛化 constructor 进入 overload set。"],
  ["Extract", "source.get()", "得到 U pointer，不改变 ownership 语义。"],
  ["Validate", "U* -> T*", "底层 pointer 初始化决定兼容方向。"],
  ["Accept", "Derived -> Base", "合法转换构造目标 wrapper。"],
  ["Reject", "Base -> Derived", "不兼容实例在约束或初始化处失败。"],
] as const;

const specialMemberCells = [
  ["Member template", "SmartPtr<U> ctor", "处理跨 element types 的转换。"],
  [
    "Not a copy ctor",
    "U may equal T",
    "语法仍不是语言定义的 copy constructor。",
  ],
  [
    "Compiler action",
    "implicit copy ctor",
    "若未声明，compiler 仍可能生成同类型复制。",
  ],
  [
    "Declare copy",
    "SmartPtr(const SmartPtr&)",
    "明确 ownership、引用计数与异常语义。",
  ],
  [
    "Declare assignment",
    "operator=(const SmartPtr&)",
    "同类型 assignment 也需独立控制。",
  ],
  [
    "Converting assign",
    "operator=<U>",
    "跨类型赋值作为另一组受约束 templates。",
  ],
] as const;

export function EcppCompatiblePointerLatticeMap() {
  return (
    <CompatibleGrid
      ariaLabel="同类型向上转换增加常量组合转换向下拒绝去常量拒绝六阶段兼容指针转换图"
      caption="Smart pointer 的跨类型构造应模仿原始 pointer 的安全转换格：允许 upcast 和增加 const，拒绝 downcast 与去 const。"
      cells={latticeCells}
    />
  );
}

export function EcppGeneralizedCopyConstructorMap() {
  return (
    <CompatibleGrid
      ariaLabel="源智能指针构造候选提取底层指针兼容验证接受转换拒绝转换六阶段泛化复制构造图"
      caption="member function template 接受任意 U 作为候选，真正兼容性由 U pointer 能否安全初始化 T pointer 决定。"
      cells={constructorCells}
    />
  );
}

export function EcppMemberTemplateSpecialMembersMap() {
  return (
    <CompatibleGrid
      ariaLabel="成员模板非复制构造编译器动作显式复制显式赋值转换赋值六阶段特殊成员共存图"
      caption="generalized copy constructor 不会抑制普通 copy operations；同类型和跨类型语义必须分别声明、测试。"
      cells={specialMemberCells}
    />
  );
}
