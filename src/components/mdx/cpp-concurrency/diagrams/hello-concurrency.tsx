const questions = [
  ["Goal", "responsiveness or throughput?", "先区分关注点分离、延迟、吞吐和资源利用率；不同目标需要不同并发结构与指标"],
  ["Work", "independent enough to overlap?", "只有依赖足够少、粒度足够大的任务或数据分片，才可能覆盖线程创建、调度和同步成本"],
  ["Budget", "cores + contention + memory", "线程数受硬件并行度、阻塞比例、共享状态争用和每线程资源共同约束，不是越多越快"],
  ["Stop", "when is sequential better?", "工作太小、依赖太强、状态难同步或没有可测收益时，顺序实现更简单且更可靠"],
] as const;

export function ConcurrencyDecisionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第一章并发目标工作划分资源预算和停止条件决策图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {questions.map(([title, code, meaning], index) => (
            <section key={title} className="min-h-40 border border-border bg-bg/40 p-4">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{title}</strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 1 的并发决策：先定义收益，再确认可重叠工作，核算硬件与协调预算，最后保留退回顺序实现的停止条件。
      </figcaption>
    </figure>
  );
}
