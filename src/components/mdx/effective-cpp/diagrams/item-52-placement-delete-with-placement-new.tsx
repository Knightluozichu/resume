type PlacementCell = readonly [
  stage: string,
  signature: string,
  effect: string,
];

function PlacementGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly PlacementCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, signature, effect], index) => (
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
                {signature}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {effect}
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

const failureCells = [
  [
    "Select new",
    "new(log) Widget",
    "overload resolution 选择带 log 参数的 allocation。",
  ],
  ["Allocate", "operator new(size, log)", "取得 raw storage 并记录上下文。"],
  ["Construct", "Widget::Widget", "在返回 storage 上开始构造。"],
  [
    "Throw",
    "constructor exception",
    "对象未完成，普通 delete expression 不存在。",
  ],
  [
    "Find match",
    "operator delete(ptr, log)",
    "语言按额外参数类型寻找 placement delete。",
  ],
  ["Release", "matching deallocator", "找到则自动回收；缺失则 storage 泄漏。"],
] as const;

const pairCells = [
  ["Normal", "new(size) / delete(ptr)", "普通 new/delete expression 使用。"],
  [
    "Standard placement",
    "new(size, void*) / delete(ptr, void*)",
    "构造失败时配对，buffer 本身通常不释放。",
  ],
  [
    "Nothrow",
    "new(size, nothrow) / delete(ptr, nothrow)",
    "allocation form 的额外参数必须匹配。",
  ],
  [
    "Logging",
    "new(size, ostream&) / delete(ptr, ostream&)",
    "自定义 placement pair 共享同一日志参数。",
  ],
  [
    "Aligned",
    "new(size, align) / delete(ptr, align)",
    "over-aligned family 保持 alignment。",
  ],
  [
    "Sized normal",
    "delete(ptr, size)",
    "正常释放可有 size，但不是 placement 参数配对替代。",
  ],
] as const;

const hidingCells = [
  [
    "Declare one",
    "Widget::operator new(size, log)",
    "class scope 名称隐藏 global/base 同名 forms。",
  ],
  ["Normal call", "new Widget", "若 normal form 未提供，可能无法解析。"],
  [
    "Placement call",
    "new(buffer) Widget",
    "标准 placement form 也可能被隐藏。",
  ],
  [
    "Provide base",
    "StandardNewDeleteForms",
    "集中转发 normal、void pointer、nothrow forms。",
  ],
  [
    "Re-expose",
    "using Base::operator new",
    "把标准 overload set 引回 Widget scope。",
  ],
  [
    "Add custom pair",
    "new/delete with log",
    "在保留 normal forms 后增加业务 placement pair。",
  ],
] as const;

export function EcppPlacementConstructorFailureMap() {
  return (
    <PlacementGrid
      ariaLabel="选择 placement new 分配构造抛异常查找匹配释放六阶段构造失败回收图"
      caption="constructor 抛出时，语言按 placement new 的额外参数类型寻找 matching placement delete；缺失就无法自动回收 storage。"
      cells={failureCells}
    />
  );
}

export function EcppPlacementSignaturePairsMap() {
  return (
    <PlacementGrid
      ariaLabel="普通形式标准 placement nothrow 日志 placement 对齐形式 sized normal 六类 new delete 签名配对图"
      caption="每个 allocation form 都需要语义和参数兼容的 deallocation form；placement delete 服务构造失败，不替代普通 delete。"
      cells={pairCells}
    />
  );
}

export function EcppAllocationNameHidingMap() {
  return (
    <PlacementGrid
      ariaLabel="声明一个函数普通调用 placement 调用标准形式基类 using 重新暴露增加自定义配对六阶段名称遮蔽图"
      caption="class 中声明任何 operator new/delete 会隐藏同名外层 forms；通过完整 overload set 或 using 恢复标准调用。"
      cells={hidingCells}
    />
  );
}
