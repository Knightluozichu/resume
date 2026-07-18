const guarantees = [
  {
    title: "Atomicity",
    code: "one indivisible operation",
    fact: "单次 load、store 或读改写不可被观察为半完成；组合多个原子操作不会自动变成一个事务。",
  },
  {
    title: "Modification order",
    code: "per atomic object",
    fact: "同一个原子对象的所有修改有唯一全序；x 与 y 各有自己的顺序，没有天然的跨对象总序。",
  },
  {
    title: "Visibility",
    code: "memory_order contract",
    fact: "是否把其他普通数据发布给另一线程取决于内存顺序；relaxed 只提供原子性和单对象顺序。",
  },
  {
    title: "Progress",
    code: "is_lock_free is separate",
    fact: "语义原子不等于实现无锁；除 atomic_flag 外都要查询目标平台，且无锁也不等于无等待。",
  },
] as const;

export function AtomicGuaranteeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第五章原子性修改顺序内存可见性和无锁进展四项保证边界图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {guarantees.map(({ title, code, fact }, index) => (
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
                {fact}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 5
        的四条边界：操作不可分割、单对象有序、跨对象可见性另算、实现进展保证另查。
      </figcaption>
    </figure>
  );
}
