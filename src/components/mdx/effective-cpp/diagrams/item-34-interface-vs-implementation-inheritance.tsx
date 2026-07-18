type InheritanceCell = readonly [
  declaration: string,
  inheritedMeaning: string,
  derivedAction: string,
];

function InheritanceGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly InheritanceCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(
            ([declaration, inheritedMeaning, derivedAction], index) => (
              <section
                key={declaration}
                className="min-h-40 border border-border bg-bg/40 p-4"
              >
                <span className="text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
                <strong className="mt-3 block text-sm text-primary">
                  {declaration}
                </strong>
                <code className="mt-3 block text-xs text-accent">
                  {inheritedMeaning}
                </code>
                <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                  {derivedAction}
                </p>
              </section>
            ),
          )}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const semanticsCells = [
  [
    "pure virtual",
    "interface only",
    "每个 concrete derived 必须显式 override。",
  ],
  [
    "pure virtual + body",
    "interface required",
    "仍必须 override，但可显式调用 base shared implementation。",
  ],
  [
    "impure virtual",
    "interface + default",
    "derived 可 override，也可无声明继承默认行为。",
  ],
  [
    "non-virtual",
    "interface + invariant implementation",
    "derived 继承统一行为，不应重定义。",
  ],
  [
    "protected helper",
    "implementation only",
    "不成为 public polymorphic operation，只供 derived 复用。",
  ],
  [
    "NVI wrapper",
    "stable public + virtual hook",
    "base 固定流程，derived 只定制受控步骤。",
  ],
] as const;

const accidentalCells = [
  ["Base default", "Airplane::fly", "默认飞行适合 ModelA/ModelB。"],
  ["ModelA", "inherits fly", "未 override，静默接受默认实现。"],
  ["ModelB", "inherits fly", "未 override，静默接受默认实现。"],
  ["ModelC added", "different protocol", "新机型实际需要完全不同飞行算法。"],
  [
    "Override omitted",
    "compiles",
    "忘记 override 时错误默认仍合法，测试可能漏掉。",
  ],
  [
    "Runtime harm",
    "wrong flight behavior",
    "接口设计没有迫使作者确认默认是否适用。",
  ],
] as const;

const explicitCells = [
  [
    "Required interface",
    "virtual fly = 0",
    "所有 concrete models 必须写出 override。",
  ],
  [
    "Shared helper",
    "defaultFly",
    "base protected implementation 提供可选复用。",
  ],
  ["ModelA override", "defaultFly(dest)", "显式选择默认，code review 可见。"],
  ["ModelB override", "defaultFly(dest)", "显式选择默认，可单独测试契约。"],
  ["ModelC override", "customFly(dest)", "不能因遗漏而继承错误行为。"],
  [
    "New model gate",
    "abstract until choice",
    "未来 derived 未实现就 compile fail。",
  ],
] as const;

export function EcppFunctionInheritanceSemanticsMap() {
  return (
    <InheritanceGrid
      ariaLabel="纯虚纯虚实现普通虚非虚保护助手 NVI 六种接口实现继承语义图"
      caption="函数声明形式编码 inherited contract：只要接口、接口加默认、或接口加强制实现必须有意选择。"
      cells={semanticsCells}
    />
  );
}

export function EcppAccidentalDefaultInheritanceMap() {
  return (
    <InheritanceGrid
      ariaLabel="基类默认 A 型 B 型 C 型遗漏覆盖运行危害六阶段意外默认继承图"
      caption="impure virtual 允许无声明继承默认；当新 subtype 不适用默认时，遗漏 override 仍能编译并产生错误行为。"
      cells={accidentalCells}
    />
  );
}

export function EcppExplicitDefaultReuseMap() {
  return (
    <InheritanceGrid
      ariaLabel="强制接口共享助手 A 显式 B 显式 C 自定义新模型门禁六阶段默认复用图"
      caption="pure virtual 迫使每个 subtype 选择；适用默认的类型显式调用 protected helper，不适用者实现自己的算法。"
      cells={explicitCells}
    />
  );
}
