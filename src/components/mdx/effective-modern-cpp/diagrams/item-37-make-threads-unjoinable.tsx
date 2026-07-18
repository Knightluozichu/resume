const threadStates = [
  { event: "default construct", before: "no thread", after: "unjoinable" },
  { event: "start callable", before: "unjoinable", after: "joinable" },
  {
    event: "move from owner",
    before: "joinable source",
    after: "source unjoinable",
  },
  { event: "join", before: "joinable", after: "unjoinable" },
  { event: "detach", before: "joinable", after: "unjoinable" },
] as const;

export function EmcppThreadJoinableStateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="std thread 经默认构造启动移动 join detach 变化 joinable 状态的状态图"
          className="space-y-3"
        >
          {threadStates.map((item, index) => (
            <section
              key={item.event}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.8fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.event}
              </strong>
              <code className="text-xs text-accent">{item.before}</code>
              <strong className="text-xs text-primary">→ {item.after}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        joinable 表示 thread object
        仍关联底层执行线程，不表示该线程此刻仍在运行。
      </figcaption>
    </figure>
  );
}

const escapeEvents = [
  { phase: "Create", owner: "thread is joinable", worker: "reads local state" },
  {
    phase: "Work",
    owner: "function may throw/return",
    worker: "still running",
  },
  {
    phase: "Unwind",
    owner: "thread destructor runs",
    worker: "association remains",
  },
  {
    phase: "Failure",
    owner: "joinable destructor calls terminate",
    worker: "process stops",
  },
] as const;

export function EmcppJoinableExceptionPathFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="线程创建后函数异常展开导致 joinable thread 析构调用 terminate 的时间线"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {escapeEvents.map((item, index) => (
            <section
              key={item.phase}
              className={`min-h-48 border p-4 ${index >= 2 ? "border-rose-500/35 bg-rose-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.phase}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">
                owner: {item.owner}
              </p>
              <code className="mt-3 block text-xs text-accent">
                worker: {item.worker}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        正常路径末尾的一次 join 不能覆盖 early return 与 exception；ownership
        cleanup 必须绑定 scope exit。
      </figcaption>
    </figure>
  );
}

const policies = [
  {
    policy: "join",
    lifetime: "worker completes before owner exits",
    risk: "destructor may block",
    fit: "worker references local state",
  },
  {
    policy: "detach",
    lifetime: "worker outlives thread object",
    risk: "dangling references / lost errors",
    fit: "self-owned independent service only",
  },
  {
    policy: "jthread",
    lifetime: "request stop then join",
    risk: "work must cooperate",
    fit: "C++20 structured ownership",
  },
] as const;

export function EmcppThreadRaiiPolicyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="RAII thread 析构选择 join detach 或 jthread 的寿命保证风险和适用边界图"
          className="space-y-3"
        >
          {policies.map((item, index) => (
            <section
              key={item.policy}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.6fr_1.2fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.policy}
              </strong>
              <span className="text-xs text-secondary">{item.lifetime}</span>
              <code className="text-xs text-accent">risk: {item.risk}</code>
              <strong className="text-xs text-primary">fit: {item.fit}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        RAII 保证每条路径执行 policy；policy 本身仍必须与 worker 捕获对象的
        lifetime 和 shutdown contract 匹配。
      </figcaption>
    </figure>
  );
}
