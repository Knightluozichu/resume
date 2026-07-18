type CompositionCell = readonly [
  label: string,
  code: string,
  explanation: string,
];

function CompositionGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly CompositionCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([label, code, explanation], index) => (
            <section
              key={label}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {explanation}
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

const relationshipCells = [
  ["State the sentence", "Car has-an Engine", "先用领域语言说出对象关系。"],
  [
    "Test substitution",
    "Car is-an Engine? false",
    "不能替换就排除 public inheritance。",
  ],
  ["Choose ownership", "Engine engine_", "值成员表达独占、同寿命的组成部分。"],
  [
    "Choose indirection",
    "unique_ptr<Engine>",
    "可选、多态或延迟创建时使用拥有指针。",
  ],
  [
    "Expose behavior",
    "car.start()",
    "外部依赖 Car 的职责，不直接依赖内部 Engine。",
  ],
  [
    "Protect invariant",
    "one semantic owner",
    "组合让所有权、销毁和不变量边界一致。",
  ],
] as const;

const lifetimeCells = [
  ["Allocate whole", "Person person", "完整对象的存储一次确定。"],
  [
    "Construct members",
    "name -> address",
    "成员按声明顺序构造，与 initializer 顺序无关。",
  ],
  [
    "Construct owner",
    "Person body",
    "成员就绪后才进入 owner constructor body。",
  ],
  ["Use invariant", "person.relocate()", "owner 协调成员，维持跨成员约束。"],
  ["Destroy owner", "~Person body", "先执行 owner destructor body。"],
  [
    "Destroy reverse",
    "address -> name",
    "成员按声明逆序自动销毁，不需手工清理。",
  ],
] as const;

const adapterCells = [
  ["Wanted model", "Set<T>", "客户要唯一元素与 membership 语义。"],
  ["Reuse mechanism", "list<T> data_", "实现域借用顺序容器的存储与遍历。"],
  ["Translate insert", "find then push_back", "Set wrapper 补上唯一性规则。"],
  ["Translate erase", "find then erase", "只暴露集合语义需要的操作。"],
  ["Hide mismatch", "no push_front", "客户无法调用破坏抽象的 list API。"],
  ["Replace later", "list -> hash", "内部机制可替换，Set contract 保持稳定。"],
] as const;

export function EcppCompositionRelationshipMap() {
  return (
    <CompositionGrid
      ariaLabel="领域句子替换检验所有权选择间接层选择行为暴露不变量保护六阶段组合关系选择图"
      caption="先判断 is-a 是否成立；不成立而对象确实包含组成部分时，用 composition 明确所有权和职责。"
      cells={relationshipCells}
    />
  );
}

export function EcppCompositionLifetimeMap() {
  return (
    <CompositionGrid
      ariaLabel="整体分配成员构造拥有者构造不变量使用拥有者析构成员逆序析构六阶段组合生命周期图"
      caption="值组合把成员生命周期嵌入完整对象：声明顺序构造、逆序销毁，owner 可以依赖确定的不变量。"
      cells={lifetimeCells}
    />
  );
}

export function EcppSetOverListMap() {
  return (
    <CompositionGrid
      ariaLabel="集合目标列表机制插入翻译删除翻译隐藏错配替换实现六阶段根据某物实现适配图"
      caption="Set 不是 List，却可以根据 List 实现；组合隐藏语义错配，只把底层机制变成私有实现细节。"
      cells={adapterCells}
    />
  );
}
