const policyBranches = [
  {
    policy: "launch::async",
    start: "new execution thread is started",
    runs: "independently of get/wait",
    identity: "not the caller thread",
  },
  {
    policy: "launch::deferred",
    start: "no execution at async call",
    runs: "only on get/wait",
    identity: "the waiting caller thread",
  },
  {
    policy: "default async | deferred",
    start: "implementation selects either",
    runs: "timing is not fixed by caller",
    identity: "thread identity is uncertain",
  },
] as const;

export function EmcppAsyncLaunchPolicyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="std launch async deferred 与默认组合策略在启动时机执行条件和线程身份上的分支图"
          className="grid gap-3 md:grid-cols-3"
        >
          {policyBranches.map((item, index) => (
            <section
              key={item.policy}
              className="min-h-56 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.policy}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                start: {item.start}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                runs: {item.runs}
              </p>
              <p className="mb-0 mt-2 text-xs text-secondary">
                thread: {item.identity}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        默认 std::async 不等于“立即异步”：它允许 implementation 在 async 与
        deferred 两条语义不同的路径间选择。
      </figcaption>
    </figure>
  );
}

const waitStates = [
  {
    status: "ready",
    meaning: "task completed",
    loop: "exit polling and call get",
    risk: "none",
  },
  {
    status: "timeout",
    meaning: "async task still running",
    loop: "perform progress then poll again",
    risk: "bound polling frequency",
  },
  {
    status: "deferred",
    meaning: "task has not started",
    loop: "do not poll forever; run via get/wait",
    risk: "naive != ready loop never exits",
  },
] as const;

export function EmcppFutureWaitStatusFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="future wait_for 返回 ready timeout deferred 三种状态及等待循环处理方式的流程图"
          className="space-y-3"
        >
          {waitStates.map((item, index) => (
            <section
              key={item.status}
              className={`grid gap-3 border p-4 md:grid-cols-[0.6fr_1fr_1.2fr_1fr] md:items-center ${
                index === 2
                  ? "border-rose-500/35 bg-rose-500/10"
                  : "border-amber-500/35 bg-amber-500/10"
              }`}
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.status}
              </strong>
              <span className="text-xs text-secondary">{item.meaning}</span>
              <code className="text-xs text-accent">{item.loop}</code>
              <strong className="text-xs text-primary">
                risk: {item.risk}
              </strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        wait_for 的 deferred 不是一种
        timeout；它表示任务未启动，继续轮询不会推进 shared state。
      </figcaption>
    </figure>
  );
}

const executionEffects = [
  {
    concern: "thread_local state",
    async: "worker has its own instance",
    deferred: "uses caller instance",
  },
  {
    concern: "locks held by caller",
    async: "may run concurrently and block",
    deferred: "runs inside wait/get call stack",
  },
  {
    concern: "task may never run",
    async: "starts regardless of result consumption",
    deferred: "future abandoned means no execution",
  },
  {
    concern: "progress guarantee",
    async: "independent progress after launch",
    deferred: "requires a waiting consumer",
  },
] as const;

export function EmcppAsyncDeferredExecutionContextMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="async 与 deferred 对 thread local 锁调用栈任务执行和进度保证影响的上下文对照图"
          className="space-y-3"
        >
          {executionEffects.map((item, index) => (
            <section
              key={item.concern}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1.2fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.concern}
              </strong>
              <span className="text-xs text-secondary">
                async: {item.async}
              </span>
              <code className="text-xs text-accent">
                deferred: {item.deferred}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        launch policy 会改变执行上下文，而不只是性能；依赖
        thread-local、锁或独立进度时必须把 policy 写进契约。
      </figcaption>
    </figure>
  );
}
