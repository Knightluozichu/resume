const resultPaths = [
  {
    event: "Function returns value",
    thread: "return value is discarded",
    task: "future stores typed result",
  },
  {
    event: "Function throws",
    thread: "uncaught exception terminates process",
    task: "future stores exception_ptr",
  },
  {
    event: "Caller synchronizes",
    thread: "join only waits",
    task: "future.get waits and delivers outcome",
  },
] as const;

export function EmcppTaskOutcomeDeliveryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="直接线程与 async task 对函数返回值异常及调用方同步结果的传递路径对照图"
          className="space-y-3"
        >
          {resultPaths.map((item, index) => (
            <section
              key={item.event}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.9fr_1.2fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.event}
              </strong>
              <span className="text-xs text-secondary">
                thread: {item.thread}
              </span>
              <code className="text-xs text-accent">task: {item.task}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        future 是 task outcome channel：同一条 typed path
        同时承载正常返回与异常，并提供同步点。
      </figcaption>
    </figure>
  );
}

const schedulerLayers = [
  {
    layer: "Application task",
    owns: "what work and dependencies",
    avoids: "physical worker choice",
  },
  {
    layer: "C++ runtime",
    owns: "launch/defer policy and bookkeeping",
    avoids: "business result interpretation",
  },
  {
    layer: "OS threads",
    owns: "runnable entities and scheduling",
    avoids: "application task semantics",
  },
  {
    layer: "Hardware threads",
    owns: "actual parallel execution slots",
    avoids: "software oversubscription policy",
  },
] as const;

export function EmcppTaskSchedulingAbstractionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="应用任务 C++ runtime 操作系统线程和硬件线程四层并发调度责任图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {schedulerLayers.map((item, index) => (
            <section
              key={item.layer}
              className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.layer}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">
                owns: {item.owns}
              </p>
              <code className="mt-3 block text-xs text-accent">
                avoids: {item.avoids}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        task-based code states work; runtime 与 OS 可在现有 execution resources
        上安排它，减少应用层手工线程决策。
      </figcaption>
    </figure>
  );
}

const decisionRows = [
  {
    need: "return value or exception",
    task: "future is built in",
    thread: "requires promise/shared state",
    choice: "prefer task",
  },
  {
    need: "portable load balancing",
    task: "runtime retains scheduling freedom",
    thread: "one requested software thread",
    choice: "prefer task",
  },
  {
    need: "native handle / affinity / priority",
    task: "often hidden",
    thread: "native control is available",
    choice: "thread may be required",
  },
  {
    need: "designated event-loop thread",
    task: "generic scheduling is wrong",
    thread: "explicit executor/thread contract",
    choice: "use required mechanism",
  },
] as const;

export function EmcppTaskThreadDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="返回异常负载均衡原生句柄和指定事件线程需求下选择 task 或 thread 的决策图"
          className="space-y-3"
        >
          {decisionRows.map((item, index) => (
            <section
              key={item.need}
              className="grid gap-3 border border-amber-500/35 bg-amber-500/10 p-4 md:grid-cols-[0.9fr_1fr_1fr_0.8fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.need}
              </strong>
              <span className="text-xs text-secondary">task: {item.task}</span>
              <code className="text-xs text-accent">thread: {item.thread}</code>
              <strong className="text-xs text-primary">→ {item.choice}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “prefer task” 是默认抽象层选择，不是禁止 thread；当需求明确落在 native
        execution control 时再下沉。
      </figcaption>
    </figure>
  );
}
