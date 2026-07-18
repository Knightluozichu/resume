const executionModels = [
  {
    model: "Concurrent on one core",
    schedule: "A slice -> B slice -> A slice",
    benefit: "responsiveness and overlap",
    cost: "switching without compute speedup",
  },
  {
    model: "Parallel on many cores",
    schedule: "A and B execute together",
    benefit: "CPU throughput when work partitions",
    cost: "sync + bandwidth + imbalance",
  },
  {
    model: "Oversubscribed",
    schedule: "runnable threads exceed resources",
    benefit: "may hide blocking",
    cost: "run queue + cache displacement",
  },
] as const;

export function ChpConcurrencyParallelismMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="单核并发多核并行和超额线程从调度到收益与成本的执行模型图"
          className="grid gap-4 lg:grid-cols-3"
        >
          {executionModels.map((item, index) => (
            <section
              key={item.model}
              className="min-h-64 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">model 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.model}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.schedule}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.benefit}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                cost: {item.cost}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        concurrency描述进度结构，parallelism描述同时执行；线程数只有在work、blocking和hardware匹配时才转化为收益。
      </figcaption>
    </figure>
  );
}

const sharedStateStages = [
  {
    stage: "Protect invariant",
    primitive: "mutex + scoped lock",
    proof: "all conflicting paths share protocol",
  },
  {
    stage: "Wait for state",
    primitive: "condition variable + predicate",
    proof: "state survives missed notification",
  },
  {
    stage: "Deliver result",
    primitive: "task + future / promise",
    proof: "value or exception reaches consumer",
  },
  {
    stage: "Control overload",
    primitive: "bounded queue + cancellation",
    proof: "backpressure and shutdown are explicit",
  },
] as const;

export function ChpSharedStateTaskMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="共享状态从互斥保护条件等待任务结果到过载控制的同步协议图"
          className="space-y-3"
        >
          {sharedStateStages.map((item, index) => (
            <section
              key={item.stage}
              className="grid min-h-36 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1.2fr_1.6fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.stage}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.primitive}
              </code>
              <span className="text-xs text-secondary">{item.proof}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同步原语各自只解决一层：互斥、等待、结果传递和过载控制必须组成完整lifecycle。
      </figcaption>
    </figure>
  );
}

const contentionPaths = [
  {
    path: "Mutex path",
    mechanism: "block / wake around critical section",
    pressure: "waiters and convoying",
    remedy: "shard, shorten, batch",
  },
  {
    path: "Atomic CAS path",
    mechanism: "retry read-modify-write",
    pressure: "cache-line ping-pong",
    remedy: "backoff, partition, proven algorithm",
  },
  {
    path: "False sharing path",
    mechanism: "independent writes share coherence block",
    pressure: "invalidations without logical sharing",
    remedy: "separate writers by layout",
  },
  {
    path: "Affinity path",
    mechanism: "pin work to topology",
    pressure: "load imbalance or wrong NUMA node",
    remedy: "compare pinned and scheduler baseline",
  },
] as const;

export function ChpAtomicLockFreeContentionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="互斥原子CAS伪共享和线程亲和从机制到压力与缓解手段的争用图"
          className="grid gap-4 md:grid-cols-2"
        >
          {contentionPaths.map((item, index) => (
            <section
              key={item.path}
              className="min-h-56 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">path 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.path}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.mechanism}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.pressure}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                action: {item.remedy}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        锁、CAS、cache
        line和topology都可能形成contention；先识别共享resource，再选blocking、partition或layout策略。
      </figcaption>
    </figure>
  );
}
