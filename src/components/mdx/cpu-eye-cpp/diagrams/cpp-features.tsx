const objectStages = [
  {
    stage: "Storage acquired",
    state: "raw aligned bytes",
    thisRole: "future object address",
    lifetime: "object not started",
  },
  {
    stage: "Base construction",
    state: "base subobjects initialized",
    thisRole: "may point at base view",
    lifetime: "base lifetime active",
  },
  {
    stage: "Member construction",
    state: "declaration order",
    thisRole: "access initialized parts only",
    lifetime: "partial object",
  },
  {
    stage: "Constructor body",
    state: "invariants completed",
    thisRole: "implicit object parameter",
    lifetime: "most-derived object forming",
  },
  {
    stage: "Normal use",
    state: "complete object",
    thisRole: "member access and dispatch",
    lifetime: "fully active",
  },
] as const;

export function CpuEyeThisConstructorLayoutMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="对象从原始存储经基类成员和构造函数体形成完整生命周期并由this定位当前子对象的图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {objectStages.map((item, index) => (
            <section
              key={item.stage}
              className="min-h-52 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.stage}
              </strong>
              <code className="mt-3 block break-words text-xs text-accent">
                {item.state}
              </code>
              <p className="mb-0 mt-3 text-xs text-primary">
                this: {item.thisRole}
              </p>
              <p className="mb-0 mt-2 text-xs text-secondary">
                {item.lifetime}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `this` 标识当前对象或子对象；constructor 按基类和成员规则逐步建立
        lifetime，并非一次把所有字节变成完整对象。
      </figcaption>
    </figure>
  );
}

const dispatchPaths = [
  {
    mode: "Non-virtual member",
    target: "known function symbol",
    machine: "direct call or inline",
    optimizer: "target known statically",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    mode: "Virtual polymorphism",
    target: "object -> vptr -> slot",
    machine: "indirect call",
    optimizer: "may devirtualize with proof",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    mode: "Template polymorphism",
    target: "instantiated concrete type",
    machine: "direct call or inline",
    optimizer: "code generated per use",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
] as const;

export function CpuEyeVirtualPolymorphismDispatchMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="普通成员调用虚函数动态多态与模板静态多态三种目标解析和机器调用路径比较图"
          className="grid gap-4 lg:grid-cols-3"
        >
          {dispatchPaths.map((item, index) => (
            <section
              key={item.mode}
              className={`min-h-60 border p-4 ${item.tone}`}
            >
              <span className="text-xs text-secondary">path 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.mode}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.target}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.machine}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                {item.optimizer}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        vtable/vptr 是主流 ABI
        的实现策略，不是标准规定的对象字节布局；可证明实际类型时，优化器仍可能去虚化。
      </figcaption>
    </figure>
  );
}

const allocationRows = [
  {
    operation: "malloc(bytes)",
    storage: "raw suitably aligned storage",
    lifetime: "no C++ object construction",
    release: "free(pointer)",
  },
  {
    operation: "new T(args)",
    storage: "operator new(sizeof(T))",
    lifetime: "construct T in storage",
    release: "destroy T, operator delete",
  },
  {
    operation: "placement new (p) T",
    storage: "caller supplies storage",
    lifetime: "start T lifetime at p",
    release: "explicit destruction rules",
  },
] as const;

export function CpuEyeAllocationDependencyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="malloc new expression placement new 的存储与对象生命周期路径以及高层策略通过抽象依赖低层分配实现的图"
          className="space-y-5"
        >
          <div className="space-y-3">
            {allocationRows.map((item) => (
              <section
                key={item.operation}
                className="grid min-h-36 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 md:grid-cols-[0.8fr_1.2fr_1.1fr_0.9fr] md:items-center"
              >
                <code className="break-words text-xs text-accent">
                  {item.operation}
                </code>
                <strong className="text-xs text-primary">{item.storage}</strong>
                <span className="text-xs text-secondary">{item.lifetime}</span>
                <span className="text-xs text-primary">{item.release}</span>
              </section>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
            <section className="min-h-28 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <strong className="text-sm text-primary">
                High-level policy
              </strong>
              <p className="mb-0 mt-2 text-xs text-secondary">
                owns business invariant
              </p>
            </section>
            <span className="self-center text-center text-xs text-secondary">
              depends on
            </span>
            <section className="min-h-28 border border-violet-500/35 bg-violet-500/10 p-4">
              <strong className="text-sm text-primary">Abstraction</strong>
              <p className="mb-0 mt-2 text-xs text-secondary">
                interface or template contract
              </p>
            </section>
            <span className="self-center text-center text-xs text-secondary">
              implemented by
            </span>
            <section className="min-h-28 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <strong className="text-sm text-primary">Low-level detail</strong>
              <p className="mb-0 mt-2 text-xs text-secondary">
                allocator / device / storage
              </p>
            </section>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分配 API 决定 storage 与 lifetime
        起点；依赖反转让高层规则面向稳定契约，具体策略可用动态或静态多态注入。
      </figcaption>
    </figure>
  );
}
