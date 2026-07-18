const correctnessLayers = [
  {
    layer: "Interleaving",
    question: "which operations may appear in either order?",
    failure: "assumed timing/order without a happens-before edge",
  },
  {
    layer: "Shared state",
    question: "which locations have concurrent conflicting access?",
    failure: "data race and undefined behavior",
  },
  {
    layer: "Atomicity",
    question: "what multi-step invariant must appear indivisible?",
    failure: "individual atomic fields do not protect compound state",
  },
  {
    layer: "Synchronization",
    question: "which mutex/message/atomic edge publishes data?",
    failure: "visibility, lost wakeup or inconsistent snapshot",
  },
] as const;

export function OpcConcurrencyCorrectnessMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="交错执行共享状态原子性和同步四层并发正确性检查图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {correctnessLayers.map((row, index) => (
            <section
              key={row.layer}
              className="min-h-72 border border-cyan-500/35 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">layer 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.layer}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.question}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                reject: {row.failure}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        sequential consistency
        是便于推理的可见顺序模型，不是“线程按源码轮流执行”；race-free
        correctness 先于 lock-free 或 relaxed ordering 优化。
      </figcaption>
    </figure>
  );
}

const executionChoices = [
  {
    choice: "std::async + future",
    fit: "few structured independent computations",
    budget: "explicit launch policy and exception/result join",
  },
  {
    choice: "Thread pool + task queue",
    fit: "many bounded tasks over reusable workers",
    budget: "workers near runnable core budget; queue/backpressure",
  },
  {
    choice: "Dedicated I/O thread",
    fit: "blocking source/sink isolated from compute path",
    budget: "bounded handoff, cancellation and close/wakeup",
  },
  {
    choice: "Partitioned ownership",
    fit: "each shard/thread owns mutable state",
    budget: "messages/batches cross boundaries; no hidden sharing",
  },
] as const;

export function OpcConcurrencyExecutionModelMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="异步future线程池任务队列独立IO线程和分区所有权四种并发执行模型图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {executionChoices.map((row, index) => (
            <section
              key={row.choice}
              className="min-h-64 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">model 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.choice}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.fit}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                prove: {row.budget}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        runnable CPU threads 通常以可用 cores 为起点；blocking I/O、task
        granularity 与 queueing 会改变预算，但无限 thread/task 不会产生无限
        parallelism。
      </figcaption>
    </figure>
  );
}

const contentionFailures = [
  {
    failure: "Wide critical section",
    symptom: "serialized work and long queue wait",
    repair: "move pure work out; protect one invariant",
  },
  {
    failure: "Thundering herd",
    symptom: "many waiters wake for little available work",
    repair: "targeted notify, semaphore/work ownership",
  },
  {
    failure: "Lock convoy",
    symptom: "preempted/slow owner stalls a line of waiters",
    repair: "shard, shorten, reduce oversubscription",
  },
  {
    failure: "Busy-wait / wait forever",
    symptom: "burned CPU or shutdown hang",
    repair: "bounded predicate wait, stop/deadline and wakeup",
  },
  {
    failure: "Unbounded producer queue",
    symptom: "latency/RSS grows while throughput looks stable",
    repair: "capacity, backpressure, admission/drop policy",
  },
  {
    failure: "One global mutex",
    symptom: "unrelated state contends on one ownership domain",
    repair: "own mutex per invariant/shard with lock-order policy",
  },
] as const;

export function OpcConcurrencyContentionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="宽临界区惊群锁队列忙等永等无界生产队列和全局锁六类并发退化模式图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {contentionFailures.map((row, index) => (
            <section
              key={row.failure}
              className="min-h-64 border border-rose-500/30 bg-rose-500/10 p-4"
            >
              <span className="text-xs text-secondary">
                failure 0{index + 1}
              </span>
              <strong className="mt-2 block text-sm text-primary">
                {row.failure}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.symptom}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.repair}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        contention 优化同时观察 throughput、queue wait、critical hold、runnable
        threads、CPU、RSS 和 shutdown；只看 lock 指令或平均吞吐会漏掉 tail
        与资源失控。
      </figcaption>
    </figure>
  );
}
