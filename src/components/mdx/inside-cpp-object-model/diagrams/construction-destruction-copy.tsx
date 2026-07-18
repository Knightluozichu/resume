const declarationContracts = [
  {
    declaration: "virtual ~Base() = 0",
    semantic: "abstract interface and polymorphic destruction",
    implementation: "still requires an out-of-class definition",
    failure: "missing definition breaks base teardown linkage",
  },
  {
    declaration: "virtual double value() const",
    semantic: "const is part of the member-function type",
    implementation: "override must preserve the cv contract",
    failure: "non-const overload does not override",
  },
  {
    declaration: "virtual void update()",
    semantic: "runtime replacement is allowed",
    implementation: "object carries polymorphic representation",
    failure: "virtual-by-default widens cost and invariant surface",
  },
  {
    declaration: "final / nonvirtual operation",
    semantic: "target can remain statically fixed",
    implementation: "direct call or easier devirtualization",
    failure: "wrong choice prevents intended specialization",
  },
] as const;

export function IcoClassDeclarationContractMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="纯虚析构常量虚函数普通虚函数和final非虚函数的接口语义实现责任与失败风险图"
          className="space-y-3"
        >
          {declarationContracts.map((row, index) => (
            <section
              key={row.declaration}
              className="grid min-h-40 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 lg:grid-cols-[0.9fr_1.2fr_1.3fr_1.2fr] lg:items-center"
            >
              <code className="break-words text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {row.declaration}
              </code>
              <strong className="text-xs text-primary">{row.semantic}</strong>
              <span className="text-xs text-primary">{row.implementation}</span>
              <span className="text-xs text-secondary">{row.failure}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        virtual specification 是 interface
        contract，不只是性能开关；destructor、const qualifier 与 override shape
        共同决定哪些动态对象操作是合法的。
      </figcaption>
    </figure>
  );
}

const constructionPhases = [
  {
    phase: "Virtual bases",
    owner: "most-derived constructor",
    representation: "construct each shared base once",
    observable: "base invariants only",
  },
  {
    phase: "Direct bases",
    owner: "current class in base-list order",
    representation: "each base establishes its own phase",
    observable: "virtual behavior limited to active base",
  },
  {
    phase: "Current vptr state",
    owner: "compiler/ABI augmentation",
    representation: "select current class virtual tables",
    observable: "current class overrides become active",
  },
  {
    phase: "Members then body",
    owner: "declaration order then user code",
    representation: "complete local invariant",
    observable: "most-derived behavior only after completion",
  },
] as const;

export function IcoConstructionStateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="最派生对象从虚基类直接基类当前虚表指针状态到成员与构造函数体的构造阶段图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {constructionPhases.map((row, index) => (
            <section
              key={row.phase}
              className="min-h-72 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">phase 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.phase}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.owner}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">
                {row.representation}
              </p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                {row.observable}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        object 的 dynamic behavior 随 construction phase 逐层建立；在 derived
        invariant 完成前，base constructor 不能调度到尚未构造的 derived state。
      </figcaption>
    </figure>
  );
}

const lifecycleRows = [
  {
    operation: "Copy construction",
    bases: "copy virtual/direct bases under target ownership",
    members: "copy-construct in declaration order",
    virtualState: "establish target vptr; do not treat as payload",
  },
  {
    operation: "Copy assignment",
    bases: "assign base subobjects as defined",
    members: "assign existing members",
    virtualState: "dynamic identity remains target's identity",
  },
  {
    operation: "Destruction body",
    bases: "not yet destroyed",
    members: "still alive while body begins",
    virtualState: "dispatch restricted to active class phase",
  },
  {
    operation: "Reverse teardown",
    bases: "direct bases reverse, virtual bases last",
    members: "reverse declaration order",
    virtualState: "representation retreats with each subobject",
  },
] as const;

export function IcoCopyDestructionStateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="拷贝构造拷贝赋值析构函数体和逆序拆解对基类成员及虚表状态处理的对照图"
          className="space-y-3"
        >
          {lifecycleRows.map((row, index) => (
            <section
              key={row.operation}
              className="grid min-h-40 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 md:grid-cols-[0.8fr_1.3fr_1.2fr_1.3fr] md:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  state 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.operation}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.bases}
              </code>
              <span className="text-xs text-primary">{row.members}</span>
              <span className="text-xs text-secondary">{row.virtualState}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        copy 处理“新/已有状态”，destruction 逆序撤销状态；vptr 表示 dynamic
        identity， 不应被 raw-copy 或 assignment 当普通业务字段处理。
      </figcaption>
    </figure>
  );
}
