const reviews = [
  [
    "Work",
    "independent units + grain",
    "先确认依赖，再设最小粒度；任务小于调度成本时保留顺序路径。",
  ],
  [
    "Resources",
    "cores, blocking, NUMA",
    "hardware_concurrency 只是提示；线程预算还受阻塞比例、其他负载和内存拓扑约束。",
  ],
  [
    "Data",
    "locality without sharing",
    "让单线程数据靠近、跨线程热写数据分离，同时核算填充造成的容量损失。",
  ],
  [
    "Coordination",
    "contention + backpressure",
    "测量锁、原子热点、慢流水段与队列增长，建立有界背压。",
  ],
  [
    "Failure",
    "cancel, join, propagate",
    "任一任务失败都要通知同伴停止，等待所有执行单元收尾，再向调用者传播异常。",
  ],
  [
    "Measure",
    "baseline + scaling curve",
    "同时记录顺序基线、吞吐、尾延迟和核数曲线，用数据验证 Amdahl 假设。",
  ],
] as const;

export function ConcurrentDesignReviewMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第八章工作资源数据协调失败和测量六项并发设计评审图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reviews.map(([title, code, detail], index) => (
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
        Chapter 8
        的并发设计评审：工作可拆只是起点，资源、数据、协调、失败与测量缺一不可。
      </figcaption>
    </figure>
  );
}
