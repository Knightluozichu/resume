const anatomy = [
  {
    layer: "shared_ptr handle",
    state: "object ptr + control-block ptr",
    lifetime: "copied/moved per owner",
  },
  {
    layer: "managed object",
    state: "Widget / subobject target",
    lifetime: "destroy when strong count = 0",
  },
  {
    layer: "control block",
    state: "strong + weak counts",
    lifetime: "destroy after weak observers leave",
  },
  {
    layer: "policy payload",
    state: "deleter + allocator",
    lifetime: "type-erased inside block",
  },
] as const;

export function EmcppSharedControlBlockAnatomyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="shared pointer handle managed object control block 和删除分配策略四层结构解剖图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {anatomy.map((item, index) => (
            <section
              key={item.layer}
              className="min-h-48 border border-sky-500/30 bg-sky-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.layer}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {item.state}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {item.lifetime}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        object lifetime 与 control-block lifetime 分离：strong count
        销毁对象，weak state 决定 metadata 何时释放。
      </figcaption>
    </figure>
  );
}

const duplicate = [
  ["Raw allocation", "Widget* p", "one object, no shared metadata"],
  ["Owner A", "block A: strong=1", "plans delete p"],
  ["Owner B", "block B: strong=1", "also plans delete p"],
  ["Destruction", "A deletes, B deletes again", "use-after-free / double free"],
] as const;

export function EmcppDuplicateControlBlockFailureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="同一 raw pointer 被两个独立 control blocks 管理并双重删除的故障路径图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {duplicate.map(([label, code, detail], index) => (
            <section
              key={label}
              className={`min-h-48 border p-4 ${index === 3 ? "border-rose-500/35 bg-rose-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
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
        shared ownership identity 来自 control block，不来自 raw address；相同
        get() 可能对应两个致命生命周期。
      </figcaption>
    </figure>
  );
}

const deleterRows = [
  {
    owner: "shared_ptr<Widget>",
    deleter: "default_delete",
    block: "default policy",
  },
  {
    owner: "shared_ptr<Widget>",
    deleter: "logging lambda",
    block: "lambda state erased",
  },
  {
    owner: "shared_ptr<Widget>",
    deleter: "PoolReturn{pool}",
    block: "Pool* state erased",
  },
] as const;

export function EmcppSharedDeleterTypeErasureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="相同 shared pointer Widget 类型配合默认 lambda 和 pool 三种 custom deleter 存入不同 control blocks 的图"
          className="space-y-3"
        >
          {deleterRows.map((row, index) => (
            <section
              key={row.deleter}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[1fr_1fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.owner}
              </strong>
              <code className="text-xs text-accent">{row.deleter}</code>
              <span className="text-xs text-secondary">
                control block: {row.block}
              </span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        deleter diversity 被 control block 吸收；shared_ptr handle type
        保持统一，策略成本移到动态 metadata。
      </figcaption>
    </figure>
  );
}
