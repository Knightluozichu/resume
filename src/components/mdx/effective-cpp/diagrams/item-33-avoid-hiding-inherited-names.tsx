type LookupCell = readonly [
  stage: string,
  candidateSet: string,
  result: string,
];

function LookupGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly LookupCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, candidateSet, result], index) => (
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
                {candidateSet}
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

const hidingCells = [
  ["Call", "derived.mf(3.2)", "表达式先需要查找名字 mf。"],
  ["Derived scope", "mf() / mf(int)", "找到任意同名声明后形成当前候选集合。"],
  [
    "Stop lookup",
    "base mf hidden",
    "不会因 derived overload 不匹配而继续搜索 base。",
  ],
  [
    "Overload resolution",
    "derived candidates only",
    "随后才按参数、conversion 与 cv 选择。",
  ],
  ["Failure", "no viable function", "base 的 mf(double) 明明存在也不参与。"],
  [
    "Repair",
    "using Base::mf",
    "把 base overload set 引入 derived scope 后统一解析。",
  ],
] as const;

const usingCells = [
  [
    "Base overloads",
    "f() / f(int) / f(double)",
    "base 提供一个完整 name family。",
  ],
  [
    "Derived override",
    "f() override",
    "derived 定制一个签名但会先遮蔽其余同名函数。",
  ],
  [
    "Using declaration",
    "using Base::f",
    "把可访问 base declarations 引入 derived scope。",
  ],
  ["Candidate merge", "Base + Derived f", "调用点看到恢复后的 overload set。"],
  ["Virtual call", "f() dispatches", "完全匹配 override 仍进行动态分派。"],
  [
    "Other overloads",
    "f(int/double)",
    "未 override 的 base overload 继续可调用。",
  ],
] as const;

const forwardingCells = [
  [
    "Private inheritance",
    "Base implementation",
    "derived 不想公开继承全部 base interface。",
  ],
  [
    "Need one overload",
    "Base::process(int)",
    "只选择某个签名作为 derived public 能力。",
  ],
  [
    "Public wrapper",
    "process(int x)",
    "forwarding function 精确暴露参数、返回与契约。",
  ],
  [
    "Qualified call",
    "Base::process(x)",
    "实现明确转交，不触发递归或其他 overload。",
  ],
  [
    "Hidden siblings",
    "process(string) absent",
    "其余 base overload 保持不可见。",
  ],
  [
    "Contract",
    "derived API intentional",
    "选择性暴露由测试和文档固定，而非名字偶然泄漏。",
  ],
] as const;

export function EcppNameLookupStopMap() {
  return (
    <LookupGrid
      ariaLabel="调用派生作用域停止查找重载解析失败 using 修复六阶段名称遮蔽图"
      caption="C++ 先按 scope 查名字，找到 derived 同名声明就停止；只有之后才进行 overload resolution。"
      cells={hidingCells}
    />
  );
}

export function EcppUsingOverloadRestorationMap() {
  return (
    <LookupGrid
      ariaLabel="基类重载派生覆盖 using 声明候选合并虚调用其他重载六阶段恢复图"
      caption="using declaration 恢复完整 base overload family，derived override 只定制目标签名而不误伤同名接口。"
      cells={usingCells}
    />
  );
}

export function EcppSelectiveForwardingMap() {
  return (
    <LookupGrid
      ariaLabel="private 继承目标重载公开包装限定调用隐藏同胞契约六阶段选择转交图"
      caption="不希望公开全部 base overload 时，用 forwarding function 只暴露一个签名，而不是 using 整组名称。"
      cells={forwardingCells}
    />
  );
}
