type ConventionCell = readonly [stage: string, rule: string, reason: string];

function ConventionGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly ConventionCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, rule, reason], index) => (
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
              <code className="mt-3 block text-xs text-accent">{rule}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {reason}
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

const newCells = [
  ["Receive", "size bytes", "请求只是 raw storage，不构造对象。"],
  ["Normalize zero", "size = 1", "成功调用仍返回独特可释放地址。"],
  ["Try allocate", "pool / system", "保持目标 alignment 和 metadata。"],
  ["On failure", "get_new_handler", "throwing form 不直接返回 null。"],
  [
    "Invoke or throw",
    "handler() / bad_alloc",
    "无 handler 时结束，handler 返回则重试。",
  ],
  ["Return", "non-null storage", "成功结果满足大小、对齐和配对释放。"],
] as const;

const sizeCells = [
  [
    "Base request",
    "size == sizeof(Base)",
    "class pool 可处理精确 Base object。",
  ],
  [
    "Derived request",
    "size != sizeof(Base)",
    "继承来的 static operator new 也可能被调用。",
  ],
  ["Do not truncate", "fixed block unsafe", "派生对象可能更大或对齐不同。"],
  ["Delegate", "::operator new(size)", "未知尺寸交给通用分配函数。"],
  [
    "Delete mirror",
    "sized delete check",
    "非 Base 大小转交 matching global delete。",
  ],
  ["Array caution", "raw byte count", "new[] 大小含多个元素和实现 overhead。"],
] as const;

const deleteCells = [
  ["Null input", "if (!ptr) return", "delete null 必须无效果。"],
  [
    "Recover metadata",
    "header / pool owner",
    "确认 pointer 属于正确 allocation domain。",
  ],
  ["Validate", "guards / state / size", "诊断错误但不能读越界 metadata。"],
  ["Match form", "scalar / array / aligned", "释放函数必须对应分配 family。"],
  ["No throw", "noexcept", "deallocation 不向析构路径传播异常。"],
  ["Release", "pool or global", "归还最初取得 storage 的 allocator。"],
] as const;

export function EcppOperatorNewConventionMap() {
  return (
    <ConventionGrid
      ariaLabel="接收请求零字节正规化尝试分配失败处理调用或抛出成功返回六阶段 operator new 常规图"
      caption="throwing operator new 正规化零请求、在失败时遵循 new-handler 循环，并只在成功时返回非空合规 storage。"
      cells={newCells}
    />
  );
}

export function EcppBaseClassAllocationSizeMap() {
  return (
    <ConventionGrid
      ariaLabel="基类尺寸派生尺寸禁止截断全局委托释放镜像数组警告六阶段基类分配尺寸图"
      caption="class-specific operator new 是 static 且可被 derived 继承；非精确 Base size 必须转交能处理任意字节数的 allocator。"
      cells={sizeCells}
    />
  );
}

export function EcppOperatorDeleteConventionMap() {
  return (
    <ConventionGrid
      ariaLabel="空指针恢复元数据验证配对形式不抛异常释放来源六阶段 operator delete 常规图"
      caption="operator delete 对 null 无操作，验证后按 scalar/array/aligned family 与原 allocator identity 配对释放。"
      cells={deleteCells}
    />
  );
}
