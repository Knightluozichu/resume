const complexityRows = [
  {
    family: "Constant",
    notation: "O(1)",
    growth: "cost does not scale with n",
    question: "Which hidden state changes the constant?",
  },
  {
    family: "Logarithmic",
    notation: "O(log n)",
    growth: "discard a fraction each step",
    question: "Is random access and ordering available?",
  },
  {
    family: "Linear",
    notation: "O(n)",
    growth: "touch input proportionally",
    question: "Is the scan contiguous and vectorizable?",
  },
  {
    family: "Quadratic",
    notation: "O(n²)",
    growth: "pairwise work dominates",
    question: "Where does the target size cross over?",
  },
] as const;

export function ChpComplexityScaleMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="常数对数线性和二次复杂度从增长含义到工程验证问题的尺度图"
          className="space-y-3"
        >
          {complexityRows.map((row, index) => (
            <section
              key={row.family}
              className="grid min-h-32 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.7fr_0.55fr_1fr_1.4fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.family}
              </strong>
              <code className="text-sm text-accent">{row.notation}</code>
              <span className="text-xs text-secondary">{row.growth}</span>
              <span className="text-xs text-primary">{row.question}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渐近类别先判断方案能否随规模成立；真实交叉点仍由常数、数据布局、输入分布与目标机器共同决定。
      </figcaption>
    </figure>
  );
}

const protocolStages = [
  {
    stage: "Question",
    evidence: "metric + workload + expected cause",
    failure: "vague claim: faster",
  },
  {
    stage: "Control",
    evidence: "same build, input, hardware, boundaries",
    failure: "confounder changes with the code",
  },
  {
    stage: "Observe",
    evidence: "distribution + counters + raw samples",
    failure: "best run or mean only",
  },
  {
    stage: "Decide",
    evidence: "effect size, uncertainty, trade-offs",
    failure: "threshold without noise model",
  },
] as const;

export function ChpMeasurementProtocolMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="性能实验从提出问题控制变量收集分布到基于不确定性决策的协议图"
          className="grid gap-4 lg:grid-cols-4"
        >
          {protocolStages.map((item, index) => (
            <section
              key={item.stage}
              className="min-h-60 border border-emerald-500/30 bg-emerald-500/10 p-4"
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.evidence}
              </code>
              <p className="mb-0 mt-5 text-xs text-secondary">
                invalid when: {item.failure}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可重复不是反复得到同一个小数，而是让问题、控制条件、原始证据与决策规则都可审计。
      </figcaption>
    </figure>
  );
}

const profilerModes = [
  {
    mode: "Instrumentation",
    observes: "selected calls and events",
    strength: "counts, duration, ordering",
    blindSpot: "probe overhead can perturb behavior",
    use: "rare path or focused boundary",
  },
  {
    mode: "Sampling",
    observes: "periodic instruction + stack samples",
    strength: "low-overhead cost distribution",
    blindSpot: "short or rare events may be missed",
    use: "long-running CPU hotspot search",
  },
  {
    mode: "Combined evidence",
    observes: "sample broadly, instrument narrowly",
    strength: "direction plus causal confirmation",
    blindSpot: "both still observe one workload",
    use: "optimization and regression loop",
  },
] as const;

export function ChpProfilerEvidenceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="插桩分析采样分析与组合证据在观测内容优势盲区和用途上的对照图"
          className="grid gap-4 lg:grid-cols-3"
        >
          {profilerModes.map((item, index) => (
            <section
              key={item.mode}
              className="min-h-72 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">mode 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.mode}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.observes}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.strength}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                risk: {item.blindSpot}
              </p>
              <p className="mb-0 mt-3 text-xs text-primary">use: {item.use}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分析器输出不是结论：先明确它实际观测了什么，再把热点比例、调用路径和受扰动风险纳入解释。
      </figcaption>
    </figure>
  );
}
