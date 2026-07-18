const destructorRows = [
  {
    handle: "joinable std::thread",
    source: "direct thread creation",
    destructor: "std::terminate",
    rationale: "no implicit join/detach choice",
  },
  {
    handle: "ordinary future",
    source: "promise / packaged_task",
    destructor: "release shared-state reference",
    rationale: "normally neither wait nor terminate",
  },
  {
    handle: "last async future",
    source: "async policy actually selected",
    destructor: "wait for task completion",
    rationale: "special async shared-state rule",
  },
  {
    handle: "deferred future",
    source: "deferred policy selected",
    destructor: "discard without running task",
    rationale: "no asynchronous execution exists",
  },
] as const;

export function EmcppHandleDestructorBehaviorMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="joinable thread 普通 future async future 与 deferred future 析构行为对照图"
          className="space-y-3"
        >
          {destructorRows.map((item, index) => (
            <section
              key={item.handle}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.9fr_1.1fr_1fr_1.1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.handle}
              </strong>
              <span className="text-xs text-secondary">{item.source}</span>
              <code className="text-xs text-accent">{item.destructor}</code>
              <strong className="text-xs text-primary">{item.rationale}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “线程句柄”只是统称；析构语义由具体 handle 类型、shared-state
        来源、launch policy 与引用计数共同决定。
      </figcaption>
    </figure>
  );
}

const sharedStateParts = [
  {
    part: "Provider",
    example: "promise / packaged_task / async task",
    owns: "writes value or exception",
  },
  {
    part: "Shared state",
    example: "result + readiness + synchronization",
    owns: "lives independently of stack handles",
  },
  {
    part: "Consumer",
    example: "future / shared_future",
    owns: "reads or waits for outcome",
  },
  {
    part: "Last reference",
    example: "final consumer/provider release",
    owns: "destroys state; async may first wait",
  },
] as const;

export function EmcppFutureSharedStateOwnershipMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="provider future shared state consumer 与最后引用之间的结果和生命周期关系图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {sharedStateParts.map((item, index) => (
            <section
              key={item.part}
              className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.part}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {item.example}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.owns}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        future 是 consumer handle，不是 task 本体；move/shared_future
        改变的是哪个 handle 最后释放 shared state。
      </figcaption>
    </figure>
  );
}

const temporaryEvents = [
  {
    phase: "Statement 1 launch",
    first: "firstTask starts",
    second: "not launched",
  },
  {
    phase: "Semicolon",
    first: "temporary future destructs and waits",
    second: "still not launched",
  },
  {
    phase: "Statement 1 completes",
    first: "firstTask done",
    second: "next statement may begin",
  },
  {
    phase: "Statement 2 launch",
    first: "already finished",
    second: "secondTask starts",
  },
] as const;

export function EmcppDiscardedAsyncFutureFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="连续丢弃两个 launch async 返回的 temporary future 在分号析构等待后变成串行执行的时间线"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {temporaryEvents.map((item, index) => (
            <section
              key={item.phase}
              className={`min-h-48 border p-4 ${index === 1 ? "border-rose-500/35 bg-rose-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.phase}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">
                first: {item.first}
              </p>
              <code className="mt-3 block text-xs text-accent">
                second: {item.second}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        命名并同时保留 futures 才能让两个 async tasks 重叠；丢弃 temporary
        会在每个完整表达式末尾等待。
      </figcaption>
    </figure>
  );
}
