const routePhases = [
  {
    phase: "Phase 1 · Build evidence",
    chapters: "Ch1 Overview · Ch2 Computer Behavior · Ch3 Measure",
    question: "what matters, how machines behave, how to prove it",
    artifact: "goal + cost hypothesis + reproducible baseline/profile",
    tone: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    phase: "Phase 2 · Remove work",
    chapters: "Ch4 Strings · Ch5 Algorithms · Ch6 Dynamic Variables",
    question: "which copies, allocations, computations can disappear?",
    artifact: "operation ledger + break-even + ownership/lifetime map",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    phase: "Phase 2 · Reshape code",
    chapters: "Ch7 Hot Statements · Ch8 Better Libraries",
    question: "which hot loops/calls/layers block optimization?",
    artifact: "optimized call path + compatible library boundary",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    phase: "Phase 3 · Optimize systems",
    chapters: "Ch9 Search/Sort · Ch10 Data Structures · Ch11 I/O",
    question: "which representation and boundary fits the workload?",
    artifact: "full-lifecycle A/B + container/key/I/O contract",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    phase: "Phase 3 · Control resources",
    chapters: "Ch12 Concurrency · Ch13 Memory Management",
    question: "how are execution and storage bounded safely?",
    artifact: "race-free model + backpressure + storage/lifetime protocol",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
] as const;

export function OpcOfficialChapterRouteMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Optimized C++第一版十三章从建立证据删除工作重塑代码到优化系统资源的官方路线图"
          className="space-y-3"
        >
          {routePhases.map((row, index) => (
            <section
              key={`${row.phase}-${row.chapters}`}
              className={`grid min-h-44 gap-3 border p-4 lg:grid-cols-[0.75fr_1.35fr_1.25fr_1.25fr] lg:items-center ${row.tone}`}
            >
              <div>
                <span className="text-xs text-secondary">
                  route 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.phase}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.chapters}
              </code>
              <span className="text-xs text-primary">{row.question}</span>
              <span className="text-xs text-secondary">{row.artifact}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        官方 13 章不是技巧清单：前 3 章建立证据，中间 5 章删除/重塑 work，后 5
        章把 lookup/container/I-O/concurrency/storage 放回系统资源约束。
      </figcaption>
    </figure>
  );
}

const leverageLevels = [
  {
    level: "Goal / workload",
    move: "remove irrelevant optimization candidates",
    expected: "material end-to-end ceiling",
  },
  {
    level: "Algorithm / work",
    move: "lower growth, precompute, skip, batch, cache",
    expected: "orders of magnitude or work eliminated",
  },
  {
    level: "Representation / ownership",
    move: "reduce copy/allocation/conversion; improve locality",
    expected: "less memory traffic and fewer boundaries",
  },
  {
    level: "Library / call path",
    move: "reuse tuned primitives; flatten measured forwarding",
    expected: "better implementation visibility and amortization",
  },
  {
    level: "Statements / manager",
    move: "inline/hoist/operator/pool only on proven hotspot",
    expected: "smaller constants after larger levers are exhausted",
  },
] as const;

export function OpcOptimizationLeverageMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="目标工作负载算法工作表示所有权库调用路径和热点语句内存管理五级优化杠杆图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {leverageLevels.map((row, index) => (
            <section
              key={row.level}
              className="min-h-72 border border-fuchsia-500/30 bg-fuchsia-500/10 p-4"
            >
              <span className="text-xs text-secondary">
                leverage 0{index + 1}
              </span>
              <strong className="mt-2 block text-sm text-primary">
                {row.level}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.move}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.expected}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从左到右杠杆通常递减、context specificity 增加；每轮重新
        profile，因为更大的 lever 会移动 bottleneck，不能沿旧 hotspot 无限微调。
      </figcaption>
    </figure>
  );
}

const evidenceGates = [
  {
    gate: "Predict",
    evidence: "cost model + Amdahl ceiling + failure hypothesis",
    reject: "no product metric or expected mechanism",
  },
  {
    gate: "Baseline",
    evidence: "versioned workload + raw samples + correctness",
    reject: "before state cannot be reproduced",
  },
  {
    gate: "Controlled change",
    evidence: "one lever + counters/profile + edge cases",
    reject: "multiple causes or changed semantics",
  },
  {
    gate: "System validation",
    evidence: "end-to-end effect + tails + CPU/RSS + bottleneck shift",
    reject: "local win, system regression",
  },
  {
    gate: "Guard / rollback",
    evidence: "regression threshold + observability + reversible rollout",
    reject: "result cannot be sustained or safely removed",
  },
] as const;

export function OpcOptimizationEvidenceLoopMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="预测基线单变量系统验证回归守卫五道优化证据门图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {evidenceGates.map((row, index) => (
            <section
              key={row.gate}
              className="relative min-h-72 border border-sky-500/30 bg-sky-500/10 p-4"
            >
              <span className="text-xs text-secondary">gate 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.gate}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.evidence}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">
                reject: {row.reject}
              </p>
              {index < evidenceGates.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 z-10 hidden text-accent lg:block"
                >
                  →
                </span>
              ) : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        任何章节的 technique 都必须经过同一证据门；失败实验进入 lab notebook
        并回滚代码， 成功实验转成 regression guard，再从新 profile 开始下一轮。
      </figcaption>
    </figure>
  );
}
