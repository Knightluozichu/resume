type DefaultCell = readonly [
  stage: string,
  expression: string,
  outcome: string,
];

function DefaultGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly DefaultCell[];
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

const mixedCells = [
  ["Create", "Rectangle rectangle", "动态对象和 override 都是 Rectangle。"],
  [
    "Base view",
    "Shape* ps = &rectangle",
    "call expression 静态类型只看 Shape declaration。",
  ],
  [
    "Insert default",
    "ps->draw(Red)",
    "compile time 用 Shape 默认参数改写调用。",
  ],
  [
    "Virtual dispatch",
    "Rectangle::draw",
    "runtime 根据动态类型选择 Rectangle body。",
  ],
  ["Derived view", "Rectangle* pr", "静态声明改为 Rectangle，默认变成 Green。"],
  [
    "Split",
    "same body, Red/Green",
    "同一 override 因静态 view 不同收到不同隐藏参数。",
  ],
] as const;

const callsiteCells = [
  [
    "Header v1",
    "color = Red",
    "客户编译时把 Red 写入 call-site machine code。",
  ],
  ["Library call", "draw(Red)", "运行时实际调用已带显式实参。"],
  ["Header v2", "color = Blue", "只修改声明不会改写旧客户 binary。"],
  [
    "Replace library",
    "new shared object",
    "旧调用仍传 Red，virtual body 更新也无法改默认。",
  ],
  ["Recompile client", "draw(Blue)", "重新编译后 call site 才采用新 default。"],
  ["Version risk", "mixed callers", "同一部署可同时存在旧/新默认值。"],
] as const;

const nviCells = [
  [
    "Public default",
    "draw(color = Red)",
    "默认只在一个 non-virtual base API 声明。",
  ],
  [
    "Static insertion",
    "Shape::draw(Red)",
    "所有 base/derived views 都调用同一入口。",
  ],
  ["Fixed wrapper", "validate / audit", "base 统一处理参数与 contract。"],
  ["Virtual hook", "doDraw(color)", "hook 不声明默认值，只接收显式参数。"],
  [
    "Dynamic override",
    "Rectangle::doDraw",
    "runtime 只选择算法，不再选择 default。",
  ],
  [
    "One policy",
    "Red everywhere",
    "静态默认与动态 body 不再来自不同 declarations。",
  ],
] as const;

export function EcppMixedBindingDefaultMap() {
  return (
    <DefaultGrid
      ariaLabel="创建基类视图插入默认虚分派派生视图行为分裂六阶段缺省参数混合绑定图"
      caption="default argument 在编译期按静态声明补入，virtual body 在运行期按动态类型选择，形成混合绑定。"
      cells={mixedCells}
    />
  );
}

export function EcppDefaultCallsiteVersionMap() {
  return (
    <DefaultGrid
      ariaLabel="旧头库调用新头替换库重编译版本风险六阶段默认参数发布图"
      caption="默认值被编译进调用方；只替换动态库不会更新旧 call sites，改默认是源码和部署兼容问题。"
      cells={callsiteCells}
    />
  );
}

export function EcppNviDefaultParameterMap() {
  return (
    <DefaultGrid
      ariaLabel="公开默认静态插入固定包装虚钩子动态覆盖统一政策六阶段 NVI 默认参数图"
      caption="默认值只属于 base non-virtual wrapper，virtual hook 永远接收显式参数，消除静态/动态来源分裂。"
      cells={nviCells}
    />
  );
}
