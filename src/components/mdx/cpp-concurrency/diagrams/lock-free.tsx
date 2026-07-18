const obligations = [
  [
    "Linearize",
    "one winning atomic step",
    "指出操作在哪次成功 CAS 上生效，并证明失败路径只重试、不重复提交副作用。",
  ],
  [
    "Progress",
    "system or per-thread",
    "区分 lock-free 与 wait-free，并确认底层 atomic 特化在目标平台确实无锁。",
  ],
  [
    "Order",
    "publish then acquire",
    "从 seq_cst 正确版出发，再为每次降级写出 release、acquire 与 read-from 证据。",
  ],
  [
    "Reclaim",
    "protect before dereference",
    "节点摘链不等于可释放；风险指针发布后必须重新验证共享入口仍指向同一节点。",
  ],
  [
    "Validate",
    "contention + wraparound",
    "覆盖 CAS 饥饿、ABA、标签回绕、槽位耗尽、缓存乒乓和关闭生命周期。",
  ],
] as const;

export function LockFreeProofMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第七章无锁算法线性化进展内存顺序回收和验证五项证明图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {obligations.map(([title, code, detail], index) => (
            <section
              key={title}
              className="min-h-48 border border-border bg-bg/40 p-4"
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
        Chapter 7
        的验收标准：无锁代码必须同时给出线性化、进展、顺序、回收和边界验证证据。
      </figcaption>
    </figure>
  );
}
