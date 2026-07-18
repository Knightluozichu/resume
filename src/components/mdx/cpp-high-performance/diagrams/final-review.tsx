const chapterMatrix = [
  [
    "01-02",
    "What does the interface represent?",
    "types · ownership · captures",
  ],
  ["03", "Is the evidence valid?", "metrics · workload · profile"],
  ["04-06", "Is useful work minimal?", "layout · iterator · algorithm"],
  ["07", "Where do storage and lifetime end?", "pages · RAII · arena"],
  ["08-09", "When is work selected/evaluated?", "constexpr · proxy · lazy"],
  ["10", "How is shared state ordered?", "mutex · atomic · lock-free"],
  ["11", "Can work scale across resources?", "policies · reduce · GPU"],
] as const;

export function ChpFinalKnowledgeMatrixMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="官方11章从接口测量数据生命周期到并行执行的知识矩阵图"
          className="space-y-3"
        >
          {chapterMatrix.map(([chapters, question, evidence]) => (
            <section
              key={chapters}
              className="grid min-h-32 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.5fr_1.5fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">Ch {chapters}</strong>
              <span className="text-xs text-primary">{question}</span>
              <code className="break-words text-xs text-accent">
                {evidence}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        11章可压缩成七个审计问题；每个性能症状都应先找到它违反的contract或缺失的evidence。
      </figcaption>
    </figure>
  );
}

const failureTrace = [
  ["p99 spike", "queue · fault · rehash", "distribution + event timeline"],
  ["allocator hot", "object churn · ownership", "allocation stack + lifetime"],
  ["poor scaling", "lock · false sharing · bandwidth", "wait + c2c + scaling"],
  ["GPU slower", "transfer · launch · small n", "end-to-end stage timing"],
] as const;

export function ChpOptimizationFailureTraceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从p99分配器并行扩展和GPU症状追到候选原因与证据的诊断图"
          className="grid gap-4 md:grid-cols-2"
        >
          {failureTrace.map(([symptom, causes, evidence], index) => (
            <section
              key={symptom}
              className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">trace 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {symptom}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {causes}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">
                prove with: {evidence}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        热点名不是根因；沿调用、lifetime、timeline和resource
        evidence追到可修改cause。
      </figcaption>
    </figure>
  );
}

const evidenceChain = [
  ["Oracle", "correct result + contract tests"],
  ["Baseline", "distribution + resource metrics"],
  ["Cause", "profile stack + mechanism proof"],
  ["Patch", "one attributable change"],
  ["Verification", "effect + trade-offs + sanitizers"],
  ["Guard", "CI benchmark + route/link checks"],
] as const;

export function ChpCapstoneEvidenceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="性能修复从正确性基准根因修改验证到回归门禁的证据链图"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {evidenceChain.map(([stage, proof], index) => (
            <section
              key={stage}
              className="min-h-40 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">gate 0{index + 1}</span>
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
        证据链同时证明程序仍正确、原因被处理、收益可重复且回归可发现。
      </figcaption>
    </figure>
  );
}
