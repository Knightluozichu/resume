const boundaries = [
  {
    level: "Invariant",
    question: "what must remain true?",
    action:
      "先写出数据约束和所有访问路径，锁保护的是这套协议，而不是变量名称本身。",
  },
  {
    level: "Critical section",
    question: "which operations are one unit?",
    action:
      "把会暂时破坏不变量的完整操作放进同一临界区，避免只锁半个读改写过程。",
  },
  {
    level: "Interface",
    question: "can callers split check and act?",
    action:
      "把检查、读取和移除合成一个成员操作，不把引用或指针泄漏到锁的作用域之外。",
  },
  {
    level: "Composition",
    question: "how are multiple locks acquired?",
    action:
      "用统一层级或 scoped_lock 获取多把锁，并避免持锁调用未知代码，切断等待环。",
  },
] as const;

export function SharedDataProtectionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第三章从数据不变量到多锁组合的四层共享数据保护图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {boundaries.map(({ level, question, action }, index) => (
            <section
              key={level}
              className="min-h-44 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {level}
              </strong>
              <code className="mt-3 block text-xs text-accent">{question}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {action}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 3
        的保护边界：先定义不变量，再圈定原子操作，然后收紧接口，最后处理多锁组合。
      </figcaption>
    </figure>
  );
}
