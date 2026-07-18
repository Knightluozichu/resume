const choices = [
  [
    "Recurring state",
    "condition_variable",
    "状态可反复变真变假；谓词受 mutex 保护，通知只提示重新检查。",
  ],
  [
    "One result",
    "future + async",
    "任务产生一个值或异常；调用方在需要结果时 wait 或 get。",
  ],
  [
    "External producer",
    "promise | packaged_task",
    "由外部流程手动提交结果，或把可调用任务搬到指定执行器。",
  ],
  [
    "Immutable chain",
    "future data flow",
    "阶段间传值而不共享可变状态；C++17 没有标准 future.then。",
  ],
  [
    "One-shot phase",
    "latch (C++20)",
    "多个参与者递减计数，等待一次性阶段完成；计数归零后不复用。",
  ],
  [
    "Repeated phases",
    "barrier (C++20)",
    "所有参与者到达后执行阶段完成动作，再自动进入下一轮。",
  ],
] as const;

export function SynchronizationChoiceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第四章按重复状态单次结果外部生产者任务链latch和barrier选择同步工具"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {choices.map(([event, tool, detail], index) => (
            <section
              key={event}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {event}
              </strong>
              <code className="mt-3 block text-xs text-accent">{tool}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 4
        的同步选择：先判断状态是否重复、结果由谁产生，以及协作阶段是否需要复用。
      </figcaption>
    </figure>
  );
}
