type PrivateInheritanceCell = readonly [
  phase: string,
  expression: string,
  consequence: string,
];

function PrivateInheritanceGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly PrivateInheritanceCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([phase, expression, consequence], index) => (
            <section
              key={phase}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {phase}
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

const semanticsCells = [
  ["Declare", "class Widget : private Timer", "客户看不到 Widget is-a Timer。"],
  ["Reuse", "Timer::start()", "Widget members 可复用 base implementation。"],
  ["Access", "protected tick state", "Widget 可访问 Timer protected members。"],
  [
    "Override",
    "void onTick() override",
    "private derived 仍参与 virtual dispatch。",
  ],
  ["Block conversion", "Widget* -> Timer*", "外部隐式 upcast 不可访问。"],
  ["Meaning", "implemented-in-terms-of", "关系只描述私有实现，不承诺替换。"],
] as const;

const timerCells = [
  ["Need", "Widget receives ticks", "Widget 需要 Timer 机制，不是 Timer。"],
  [
    "Private option",
    "Widget : private Timer",
    "直接 override，耦合到 base internals。",
  ],
  [
    "Member option",
    "WidgetTimer timer_",
    "Widget 按 composition 保存 adapter。",
  ],
  [
    "Nested adapter",
    "WidgetTimer : public Timer",
    "只有 adapter 承担真正的 is-a。",
  ],
  [
    "Callback",
    "owner_.handleTick()",
    "adapter 把 virtual event 转回 Widget 意图。",
  ],
  ["Decision", "prefer member", "除非 protected/override 需求无法合理隔离。"],
] as const;

const eboCells = [
  ["Empty type", "struct Policy {}", "独立完整对象仍需可区分地址。"],
  ["Member form", "Policy policy_; int x_", "padding 与唯一地址常使对象变大。"],
  ["Base form", "private Policy", "空 base subobject 可不占额外存储。"],
  ["EBO result", "sizeof == sizeof(int)", "常见 ABI 将 policy 压入现有布局。"],
  [
    "Modern form",
    "[[no_unique_address]]",
    "C++20 可对空成员表达同类优化意图。",
  ],
  [
    "Guard",
    "static_assert / benchmark",
    "布局依赖类型、ABI 与成员组合，必须测量。",
  ],
] as const;

export function EcppPrivateInheritanceSemanticsMap() {
  return (
    <PrivateInheritanceGrid
      ariaLabel="私有继承声明实现复用保护访问虚函数覆盖阻止转换关系含义六阶段语义图"
      caption="private inheritance 允许实现侧访问和覆盖，却阻止客户把 derived 当 base；它表达的是 implemented-in-terms-of。"
      cells={semanticsCells}
    />
  );
}

export function EcppTimerAdapterDecisionMap() {
  return (
    <PrivateInheritanceGrid
      ariaLabel="计时需求私有继承选项成员选项嵌套适配虚回调决策六阶段组合替代图"
      caption="把真正需要继承 Timer 的角色收缩到私有 adapter，Widget 自身继续用 composition 保持窄耦合。"
      cells={timerCells}
    />
  );
}

export function EcppEmptyBaseOptimizationMap() {
  return (
    <PrivateInheritanceGrid
      ariaLabel="空类型成员形式基类形式空基类优化现代空成员优化测量防线六阶段对象布局图"
      caption="EBO 可让 empty policy base 不增加对象大小，但它是低层布局理由，必须用测量和可维护性共同判断。"
      cells={eboCells}
    />
  );
}
