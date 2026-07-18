const proof = [
  ["01", "Prepare", "payload write", "普通数据写在发布操作之前完成。"],
  [
    "02",
    "Publish",
    "release operation",
    "release 把本线程此前的副作用放在同步边左侧。",
  ],
  [
    "03",
    "Observe",
    "reads-from",
    "acquire 必须读到该 release 或其 release sequence 中的值。",
  ],
  [
    "04",
    "Synchronize",
    "synchronizes-with",
    "匹配成功后，两个线程之间才出现同步边。",
  ],
  [
    "05",
    "Use",
    "happens-before",
    "同线程顺序加同步边传递到消费操作，普通数据访问才有定义。",
  ],
] as const;

export function MemoryOrderingProofMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第五章从普通数据写到release发布read-from同步和happens-before使用的证据链"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {proof.map(([step, title, code, detail]) => (
            <section
              key={step}
              className="min-h-44 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                {step}
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
        Chapter 5 的同步证明：每一条跨线程可见性结论都要能沿这五个环节逐项核对。
      </figcaption>
    </figure>
  );
}
