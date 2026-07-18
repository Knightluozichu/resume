const boundaries = [
  ["Failure boundary", "throw -> stack unwinding -> catch", "RAII owns every resource"],
  ["Name boundary", "namespace -> qualified lookup", "headers avoid broad using directives"],
  ["Type boundary", "multiple bases -> virtual base", "most-derived class initializes virtual base"],
] as const;

export function CppLargeProgramsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ Primer第十八章异常命名空间和多重继承三类工程边界" className="grid gap-3 md:grid-cols-3">
          {boundaries.map(([title, mechanism, invariant], index) => (
            <section key={title} className="min-h-40 border border-border bg-bg/40 p-4">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{title}</strong>
              <code className="mt-4 block text-xs text-accent">{mechanism}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{invariant}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 18 将大型程序的风险分成错误传播、名字查找和类型层次三条边界。
      </figcaption>
    </figure>
  );
}
