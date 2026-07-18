const lifecycle = [
  [
    "Accept",
    "submit while running",
    "在同一状态锁下判断接受状态并入队；排空开始后，新提交必须明确失败。",
  ],
  [
    "Schedule",
    "global | local | steal",
    "先本地执行以保局部性，空闲 worker 再帮助全局或其他本地队列。",
  ],
  [
    "Execute",
    "outside queue lock",
    "任务边界捕获结果与异常；执行用户代码时不持调度器内部锁。",
  ],
  [
    "Complete",
    "value | exception",
    "每个已接受任务都要让 future 以值、异常或取消状态结束，不能永久悬空。",
  ],
  [
    "Drain",
    "close + notify_all",
    "关闭入口、唤醒阻塞 worker，按约定排空或取消队列，并等待所有线程退出。",
  ],
  [
    "Stop",
    "joined, no callers",
    "析构发生在非 worker 所有者线程，且所有 submit 调用者已经离开对象生存期。",
  ],
] as const;

export function ThreadPoolLifecycleMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第九章线程池接受调度执行完成排空和停止生命周期图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {lifecycle.map(([title, code, detail], index) => (
            <section
              key={title}
              className="min-h-40 border border-border bg-bg/40 p-4"
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
        Chapter 9
        的线程池协议：任务从被接受到结果就绪，再到排空和线程回收，每一步都要有唯一责任方。
      </figcaption>
    </figure>
  );
}
