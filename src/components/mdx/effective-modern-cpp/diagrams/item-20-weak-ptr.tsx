const lifetime = [
  ["Strong owners exist", "strong > 0", "object + control block alive"],
  ["Weak observer added", "weak count grows", "object lifetime unchanged"],
  ["Last owner leaves", "strong = 0", "object destroyed"],
  ["Observer remains", "weak still present", "expired block retained"],
  ["Last weak leaves", "weak metadata gone", "control block released"],
] as const;

export function EmcppWeakLifecycleMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="强 owner 弱观察者对象销毁过期控制块和最终控制块释放的五阶段生命周期图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {lifetime.map(([label, code, detail], index) => (
            <section
              key={label}
              className={`min-h-48 border p-4 ${index >= 2 ? "border-amber-500/35 bg-amber-500/10" : "border-sky-500/35 bg-sky-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        weak_ptr 不延长 object lifetime，却延长 control-block metadata
        lifetime，以便安全报告过期。
      </figcaption>
    </figure>
  );
}

const upgrades = [
  {
    approach: "expired() then use",
    check: "snapshot only",
    result: "TOCTOU race",
    safe: false,
  },
  {
    approach: "shared_ptr(weak)",
    check: "atomic acquire",
    result: "owner or bad_weak_ptr",
    safe: true,
  },
  {
    approach: "weak.lock()",
    check: "atomic acquire",
    result: "owner or empty",
    safe: true,
  },
] as const;

export function EmcppWeakLockAtomicUpgradeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="expired 后使用 throwing shared construction 与 weak lock 三种升级方式的原子性对比图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {upgrades.map((item, index) => (
            <section
              key={item.approach}
              className={`min-h-48 border p-4 ${item.safe ? "border-emerald-500/35 bg-emerald-500/10" : "border-rose-500/35 bg-rose-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.approach}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {item.check}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.result}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        安全访问需要一次 control-block 原子操作同时确认存活并取得 owner；单独
        expired 无法提供使用窗口。
      </figcaption>
    </figure>
  );
}

const graphRows = [
  {
    graph: "All strong",
    forward: "Parent --shared--> Child",
    back: "Child --shared--> Parent",
    outcome: "cycle: counts never reach zero",
  },
  {
    graph: "Owned tree",
    forward: "Parent --shared--> Child",
    back: "Child --weak--> Parent",
    outcome: "root reset destroys both",
  },
  {
    graph: "Use back edge",
    forward: "child.parent.lock()",
    back: "temporary owner during call",
    outcome: "handles expired parent safely",
  },
] as const;

export function EmcppOwnershipCycleBreakMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="parent child 全强引用环改为 weak 反向边并在使用时 lock 的打破引用环图"
          className="space-y-3"
        >
          {graphRows.map((row, index) => (
            <section
              key={row.graph}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.7fr_1fr_1fr_1.3fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.graph}
              </strong>
              <code className="text-xs text-accent">{row.forward}</code>
              <code className="text-xs text-accent">{row.back}</code>
              <span className="text-xs text-secondary">{row.outcome}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        cycle prevention 的本质是让强 ownership subgraph 可归零；weak back edge
        只在实际使用期间临时升级。
      </figcaption>
    </figure>
  );
}
