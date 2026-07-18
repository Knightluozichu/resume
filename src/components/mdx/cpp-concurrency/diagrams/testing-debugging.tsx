const evidenceLayers = [
  [
    "Contract",
    "invariants + outcomes",
    "先定义返回值、状态不变量、异常与关闭语义；没有可判定契约，压力再大也只是运行程序。",
  ],
  [
    "Schedule",
    "barrier + seed + replay",
    "用屏障对齐关键窗口，记录随机种子、线程数和操作序列，使失败调度至少可近似重放。",
  ],
  [
    "Observe",
    "TSan + traces + stacks",
    "TSan 检查本次已执行且被插桩的访问；超时后线程栈与低扰动事件轨迹补足进展证据。",
  ],
  [
    "Progress",
    "deadline + heartbeat",
    "为阻塞测试设置截止时间并记录完成计数；卡住后区分等待环、持续重试、饥饿和外部阻塞。",
  ],
  [
    "History",
    "model + linearization",
    "并发容器要记录调用与返回历史，再与顺序参考模型比较；最终计数正确不足以证明所有操作合法。",
  ],
  [
    "Performance",
    "release build + scaling",
    "正确性检测与性能测试分开；在非消毒器构建上测吞吐、尾延迟、核数曲线和资源上限。",
  ],
] as const;

export function ConcurrentTestEvidenceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第十一章契约调度观测进展历史和性能六层测试证据图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {evidenceLayers.map(([title, code, detail], index) => (
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
        Chapter 11
        的证据链：测试不能证明所有调度都正确，但可以让契约、覆盖、失败现场和性能结论都可核查。
      </figcaption>
    </figure>
  );
}
