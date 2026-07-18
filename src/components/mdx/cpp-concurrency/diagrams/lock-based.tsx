const decisions = [
  [
    "Contract",
    "atomic user operation",
    "先定义调用者需要的一次完整动作，避免把 check 与 act 拆成竞态接口。",
  ],
  [
    "Ownership",
    "no borrowed internals",
    "返回值、不可变共享所有权或受控回调，不泄漏容器内部引用。",
  ],
  [
    "Partition",
    "head | tail | bucket | node",
    "按互不破坏的不变量拆锁，让不相交操作真正并行。",
  ],
  [
    "Composition",
    "one global lock order",
    "跨分区操作按稳定顺序获取锁，并明确异常、关闭和快照协议。",
  ],
] as const;

export function LockBasedStructureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第六章从线程安全接口内部所有权锁分区到多锁组合的数据结构设计图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {decisions.map(([title, code, detail], index) => (
            <section
              key={title}
              className="min-h-44 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 6
        的设计顺序：先收紧线程安全接口，再控制所有权，随后拆锁，最后证明组合操作不会死锁。
      </figcaption>
    </figure>
  );
}
