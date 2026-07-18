type CastCell = readonly [kind: string, intent: string, risk: string];

function CastGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly CastCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([kind, intent, risk], index) => (
            <section
              key={kind}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {kind}
              </strong>
              <code className="mt-3 block text-xs text-accent">{intent}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {risk}
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

const taxonomyCells = [
  [
    "static_cast",
    "defined conversion",
    "可能 narrowing，向下转型不做运行期类型检查。",
  ],
  [
    "dynamic_cast",
    "checked polymorphic cast",
    "失败可检测，但有 RTTI/分支成本并暴露设计气味。",
  ],
  [
    "const_cast",
    "change cv qualification",
    "原对象真实 const 时写入会产生未定义行为。",
  ],
  [
    "reinterpret_cast",
    "representation reinterpretation",
    "结果低层、平台相关，不能建立普通对象语义。",
  ],
  [
    "C-style cast",
    "multiple cast families",
    "意图不明确，可组合去 const 与重解释且难搜索。",
  ],
  [
    "No cast",
    "typed API / virtual / variant",
    "让 compiler 和抽象边界保留正确性信息。",
  ],
] as const;

const layoutCells = [
  ["Derived start", "Derived* d", "指针指向完整对象起始或 ABI 定义位置。"],
  [
    "Base A subobject",
    "static_cast<BaseA*>(d)",
    "可能保持地址，也可能按布局偏移。",
  ],
  [
    "Base B subobject",
    "static_cast<BaseB*>(d)",
    "multiple inheritance 下通常需要 pointer adjustment。",
  ],
  ["Round trip", "cast back", "只有动态类型与路径正确时才能恢复原对象地址。"],
  [
    "Reinterpret",
    "raw same bits",
    "不执行合法 subobject adjustment，可能指向错误成员。",
  ],
  [
    "ABI boundary",
    "layout may vary",
    "编译器、继承和 virtual base 决定实际 offset。",
  ],
] as const;

const dispatchCells = [
  [
    "Type switch",
    "dynamic_cast chain",
    "每新增 derived 都修改集中分支，重复 RTTI 与 downcast。",
  ],
  [
    "Virtual operation",
    "base.draw()",
    "把变化交给 override，调用者不认识 concrete type。",
  ],
  [
    "Visitor",
    "accept(visitor)",
    "固定类型集合、扩展操作时集中 double dispatch。",
  ],
  [
    "Variant",
    "visit(sum type)",
    "封闭类型集合由 compiler 检查 exhaustive handling。",
  ],
  [
    "Typed container",
    "vector<Special*>",
    "若业务只处理一种 concrete type，直接保存其正确类型。",
  ],
  [
    "Boundary adapter",
    "one checked cast",
    "无法改外部 API 时在窄边界检查并返回 typed result。",
  ],
] as const;

export function EcppCastTaxonomyRiskMap() {
  return (
    <CastGrid
      ariaLabel="静态动态常量重解释旧式无转型六类类型转换意图风险图"
      caption="四种命名 cast 把危险类别显式化；真正目标仍是缩小 cast 数量和作用域，而非只换语法。"
      cells={taxonomyCells}
    />
  );
}

export function EcppBaseSubobjectAdjustmentMap() {
  return (
    <CastGrid
      ariaLabel="派生起点两个基类子对象回转重解释 ABI 六阶段对象布局指针调整图"
      caption="base/derived 转换可能调整地址；reinterpret 相同位模式不会替你定位正确 base subobject。"
      cells={layoutCells}
    />
  );
}

export function EcppCastFreeDispatchDecisionMap() {
  return (
    <CastGrid
      ariaLabel="类型判断虚函数访问者变体类型容器边界适配六种无转型分派方案图"
      caption="反复 dynamic_cast 往往说明抽象缺少 operation 或容器类型错误，应先修正 dispatch 设计。"
      cells={dispatchCells}
    />
  );
}
