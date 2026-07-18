const mechanismRows = [
  {
    mechanism: "atomic flag polling",
    state: "atomic<bool>",
    wait: "repeated load / sleep",
    fit: "simple but wastes or adds latency",
  },
  {
    mechanism: "condition variable",
    state: "mutex + predicate",
    wait: "predicate wait handles wakeups",
    fit: "reusable event/state changes",
  },
  {
    mechanism: "promise<void> / future<void>",
    state: "shared ready state",
    wait: "wait/get once",
    fit: "one-shot event and error channel",
  },
] as const;

export function EmcppOneShotMechanismTradeoffMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="atomic 轮询 condition variable 与 void promise future 三种事件通信机制的状态等待和适用场景对照图"
          className="space-y-3"
        >
          {mechanismRows.map((item, index) => (
            <section
              key={item.mechanism}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.9fr_0.9fr_1.1fr_1.1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.mechanism}
              </strong>
              <code className="text-xs text-accent">{item.state}</code>
              <span className="text-xs text-secondary">{item.wait}</span>
              <strong className="text-xs text-primary">{item.fit}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        void future 把一次性 ready transition 直接编码进 shared
        state；条件变量更适合反复变化的 predicate。
      </figcaption>
    </figure>
  );
}

const handshakeEvents = [
  {
    phase: "Create channel",
    detector: "owns promise<void>",
    reactor: "owns future<void>",
  },
  {
    phase: "Wait first",
    detector: "still detecting",
    reactor: "wait blocks on not-ready state",
  },
  {
    phase: "Signal",
    detector: "set_value makes state ready",
    reactor: "unblocks with happens-before",
  },
  {
    phase: "Signal first",
    detector: "state may become ready early",
    reactor: "later wait returns immediately",
  },
] as const;

export function EmcppPromiseFutureHandshakeFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="promise void detector 与 future void reactor 在先等待或先发送两种顺序下都完成一次性握手的时间线"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {handshakeEvents.map((item, index) => (
            <section
              key={item.phase}
              className="min-h-48 border border-emerald-500/35 bg-emerald-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.phase}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">
                producer: {item.detector}
              </p>
              <code className="mt-3 block text-xs text-accent">
                consumer: {item.reactor}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ready state 会被保存，不是瞬时 notification；因此 set_value 早于 wait
        也不会丢失事件。
      </figcaption>
    </figure>
  );
}

const fanoutSteps = [
  {
    phase: "Single future",
    state: "future<void>",
    receivers: "one consumer; get once",
  },
  {
    phase: "Convert",
    state: "future.share()",
    receivers: "future becomes invalid",
  },
  {
    phase: "Copy handles",
    state: "shared_future<void>",
    receivers: "one copy per waiting task",
  },
  {
    phase: "Publish",
    state: "promise.set_value()",
    receivers: "all copies observe ready",
  },
] as const;

export function EmcppSharedFutureFanoutMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="单个 future void 经 share 转换为多个 shared future receivers 并由一次 promise set value 同时唤醒的扇出图"
          className="space-y-3"
        >
          {fanoutSteps.map((item, index) => (
            <section
              key={item.phase}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1fr_1.4fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.phase}
              </strong>
              <code className="text-xs text-accent">{item.state}</code>
              <span className="text-xs text-secondary">{item.receivers}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        shared_future 扩展 consumer 数量，不改变 promise 只能完成 shared state
        一次的 one-shot 性质。
      </figcaption>
    </figure>
  );
}
