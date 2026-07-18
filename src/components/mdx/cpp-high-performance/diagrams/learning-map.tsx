const chapters = [
  ["01", "C++ contracts", "value · ownership · failures"],
  ["02", "Modern concepts", "auto · lambda · move · optional/any"],
  ["03", "Measurement", "complexity · tests · profilers"],
  ["04", "Data structures", "memory · containers · parallel arrays"],
  ["05", "Iterators", "categories · traits · linear range"],
  ["06", "Algorithms", "predicates · partial sort · ranges"],
  ["07", "Memory", "pages · lifetime · RAII · arena"],
  ["08", "Compile time", "traits · constexpr · reflection/hash"],
  ["09", "Lazy proxies", "strings · distance · operators"],
  ["10", "Concurrency", "mutex · atomics · lock-free"],
  ["11", "Parallel STL", "policies · reduce · GPU"],
] as const;

export function ChpOfficialChapterRouteMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++ High Performance第一版官方11章路线图"
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          {chapters.map(([number, title, concepts]) => (
            <section
              key={number}
              className="min-h-36 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">chapter {number}</span>
              <strong className="mt-2 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {concepts}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        11章依次建立contract、evidence、representation、evaluation与execution；后章依赖前章的可核查结论。
      </figcaption>
    </figure>
  );
}

const loop = [
  ["Hypothesis", "metric + workload + expected cause"],
  ["Baseline", "correctness oracle + distribution"],
  ["Profile", "hot stack + resource evidence"],
  ["Change", "one causal variable"],
  ["Re-test", "effect + uncertainty + trade-offs"],
  ["Re-profile", "hotspot removed or moved"],
] as const;

export function ChpPerformanceDecisionLoopMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="性能优化从假设到重新剖析的证据闭环图"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {loop.map(([stage, proof], index) => (
            <section
              key={stage}
              className="min-h-40 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">step 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {proof}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每轮只改变一个可归因因素；复测和再剖析同时证明收益与瓶颈转移。
      </figcaption>
    </figure>
  );
}

const gates = [
  ["Correctness", "tests · invariants · sanitizer"],
  ["Fidelity", "official unit coverage"],
  ["Measurement", "benchmark · profile · raw evidence"],
  ["Regression", "repeatability · CI · route/link checks"],
] as const;

export function ChpEvidenceGateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="正确性原书忠实度性能测量和回归四重证据门禁图"
          className="grid gap-4 md:grid-cols-2"
        >
          {gates.map(([gate, evidence], index) => (
            <section
              key={gate}
              className="min-h-44 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">gate 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {gate}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {evidence}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        没有同时通过四类门禁的优化或章节仍是候选状态，不能用单一绿色检查替代全范围证据。
      </figcaption>
    </figure>
  );
}
