const interleavings = [
  ["Allocate", "new Widget", "raw pointer exists"],
  ["Other argument", "computePriority()", "may throw here"],
  ["Owner construct", "shared_ptr(raw)", "too late if throw"],
  ["make alternative", "make_shared<Widget>()", "owner complete before return"],
] as const;

export function EmcppNewExceptionInterleavingMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="direct new 分配后其他参数抛异常再构造 owner 的泄漏交错与 make 修复图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {interleavings.map(([label, code, detail], index) => (
            <section
              key={label}
              className={`min-h-48 border p-4 ${index === 1 ? "border-rose-500/35 bg-rose-500/10" : index === 3 ? "border-emerald-500/35 bg-emerald-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {code}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        make 的异常安全来自不可交错的 function-call 边界：resource 在 factory
        返回前已经属于 smart owner。
      </figcaption>
    </figure>
  );
}

const allocations = [
  {
    path: "direct shared_ptr(new T)",
    object: "allocation A: T",
    control: "allocation B: control block",
    release: "object and block freed separately",
  },
  {
    path: "make_shared<T>()",
    object: "allocation A: T + block",
    control: "same allocation",
    release: "storage waits for weak count zero",
  },
] as const;

export function EmcppMakeAllocationTopologyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="direct shared pointer 双分配与 make shared object control block 单分配的拓扑和释放时机对比图"
          className="grid gap-4 lg:grid-cols-2"
        >
          {allocations.map((item, index) => (
            <section
              key={item.path}
              className={`min-h-56 border p-4 ${index === 1 ? "border-emerald-500/35 bg-emerald-500/10" : "border-sky-500/35 bg-sky-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.path}
              </strong>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <code className="border border-border bg-bg/50 p-3 text-xs text-accent">
                  {item.object}
                </code>
                <code className="border border-border bg-bg/50 p-3 text-xs text-accent">
                  {item.control}
                </code>
              </div>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.release}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        单分配降低 allocator 成本，却把 object storage release 与 control-block
        weak lifetime 绑定。
      </figcaption>
    </figure>
  );
}

const decisions = [
  {
    question: "ordinary new/delete ownership?",
    yes: "make_unique / make_shared",
    no: "inspect resource protocol",
  },
  {
    question: "custom deleter required?",
    yes: "direct smart owner, immediate handoff",
    no: "continue",
  },
  {
    question: "custom allocator required?",
    yes: "allocate_shared",
    no: "continue",
  },
  {
    question: "private ctor or braced list?",
    yes: "passkey/enabler or typed initializer",
    no: "make function",
  },
  {
    question: "huge T + long weak lifetime?",
    yes: "measure split allocation",
    no: "prefer make_shared",
  },
] as const;

export function EmcppMakeFunctionDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="按普通资源 custom deleter allocator private constructor 花括号和 weak lifetime 选择 make 或 direct 构造的决策图"
          className="space-y-3"
        >
          {decisions.map((item, index) => (
            <section
              key={item.question}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[1.1fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.question}
              </strong>
              <p className="m-0 border-l-2 border-emerald-500 pl-3 text-xs text-secondary">
                是：{item.yes}
              </p>
              <p className="m-0 border-l-2 border-amber-500 pl-3 text-xs text-secondary">
                否：{item.no}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        make 是安全高效的默认；例外必须由 ownership、allocation 或 access
        contract 的具体证据驱动。
      </figcaption>
    </figure>
  );
}
