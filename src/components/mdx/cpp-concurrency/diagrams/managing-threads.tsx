const contracts = [
  {
    step: "01",
    title: "Start",
    code: "thread(f, args...)",
    detail:
      "在创建线程的一侧衰减复制可调用对象和参数；新线程随后用保存的值调用任务，引用必须显式包装。",
  },
  {
    step: "02",
    title: "Own",
    code: "move only",
    detail:
      "一个 joinable 关联只能由一个 thread 对象负责；移动后源对象为空，目标对象接管收尾义务。",
  },
  {
    step: "03",
    title: "Finish",
    code: "join | detach",
    detail:
      "对象析构前必须解除关联。优先用作用域所有者自动 join；对不可控后台任务才考虑 detach。",
  },
  {
    step: "04",
    title: "Lifetime",
    code: "data outlives work",
    detail:
      "任务访问的引用、指针和服务状态必须覆盖整个执行期；detach 还需要进程级停止与错误协议。",
  },
] as const;

export function ThreadOwnershipContractDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第二章线程启动所有权收尾和数据生命周期契约图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contracts.map(({ step, title, code, detail }, index) => (
            <section
              key={title}
              className="relative min-h-44 border border-border bg-bg/40 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs tabular-nums text-secondary">
                  {step}
                </span>
                {index < contracts.length - 1 ? (
                  <span aria-hidden="true" className="text-sm text-secondary">
                    {"->"}
                  </span>
                ) : null}
              </div>
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
        Chapter 2
        的管理闭环：创建时固定参数语义，运行时保持单一所有者，退出前完成收尾，并证明数据生存期覆盖任务。
      </figcaption>
    </figure>
  );
}
