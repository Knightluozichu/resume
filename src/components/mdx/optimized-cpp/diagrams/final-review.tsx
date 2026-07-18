const incidentRows = [
  {
    area: "Goal + machine + measure",
    chapters: "Ch1-3",
    symptom: "p99 220 ms; 12k events/s; RSS grows under burst",
    evidence: "Amdahl ceiling, profile, counters, raw latency samples",
  },
  {
    area: "Parse + strings + algorithms",
    chapters: "Ch4-5",
    symptom: "temporary strings, repeated conversion and scans",
    evidence: "alloc/copy/bytes ledger + one-pass/batch break-even",
  },
  {
    area: "Ownership + hot/library path",
    chapters: "Ch6-8",
    symptom: "shared nodes, per-event virtual wrapper chain",
    evidence: "owner/layout map + batch API + compatible adapter",
  },
  {
    area: "Lookup + data structures",
    chapters: "Ch9-10",
    symptom: "map<string> prefix compares and node traversal",
    evidence: "full operation mix + key/container A/B",
  },
  {
    area: "I/O + concurrency + memory",
    chapters: "Ch11-13",
    symptom: "one write/event, unbounded queue, allocator contention",
    evidence: "buffer sweep + bounded pool + storage/lifetime protocol",
  },
] as const;

export function OpcIntegratedIncidentMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="性能目标机器测量字符串算法所有权热点库查找容器IO并发和内存管理跨十三章事故因果图"
          className="space-y-3"
        >
          {incidentRows.map((row, index) => (
            <section
              key={row.area}
              className="grid min-h-44 gap-3 border border-cyan-500/35 bg-cyan-500/10 p-4 lg:grid-cols-[0.8fr_0.55fr_1.3fr_1.45fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  cause 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.area}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.chapters}
              </code>
              <span className="text-xs text-primary">{row.symptom}</span>
              <span className="text-xs text-secondary">{row.evidence}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一个端到端 incident 同时跨越 13 章；章节不是并列技巧，而是从目标/证据到
        work、 representation、boundary 和 resource control 的 causal
        decomposition。
      </figcaption>
    </figure>
  );
}

const experimentWaves = [
  {
    wave: "Wave 0 · Freeze evidence",
    change: "none",
    gate: "replayable load, output oracle, raw profile and resource baseline",
    rollback: "not applicable; reject unstable reproduction",
  },
  {
    wave: "Wave 1 · Remove parse work",
    change: "one-pass parser + borrowed slices + bounded owning output",
    gate: "same bytes/results; parse CPU/alloc/p99 decline",
    rollback: "feature flag to reference parser",
  },
  {
    wave: "Wave 2 · Replace lookup/layout",
    change: "prevalidated key IDs + flat read-mostly index",
    gate: "build/update/export semantics + lookup/RSS improve",
    rollback: "dual index and generation switch",
  },
  {
    wave: "Wave 3 · Batch I/O and bound queue",
    change: "64 KiB/deadline flush + worker budget + backpressure",
    gate: "throughput/p99/first-result/RSS/shutdown meet contract",
    rollback: "old writer and queue capacity toggle",
  },
  {
    wave: "Wave 4 · Specialize storage",
    change: "request-scoped arena only if allocation remains hot",
    gate: "alignment/lifetime/throw/thread + Amdahl system effect",
    rollback: "default/pmr upstream resource",
  },
] as const;

export function OpcExperimentWaveMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="冻结证据删除解析工作替换查找布局批量IO限制队列和专门化存储五波实验图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {experimentWaves.map((row, index) => (
            <section
              key={row.wave}
              className="relative min-h-80 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">wave 0{index}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.wave}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.change}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{row.gate}</p>
              <p className="mb-0 mt-4 text-xs text-secondary">
                rollback: {row.rollback}
              </p>
              {index < experimentWaves.length - 1 ? (
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
        每个 wave 只移动一个主要 lever，上一波结束后重新
        profile；storage/concurrency 等高风险方案 只有在前面 work-removal
        完成且仍有系统上限时才执行。
      </figcaption>
    </figure>
  );
}

const releaseGates = [
  {
    gate: "Correctness",
    pass: "byte/result oracle, ordering, error and lifetime tests",
    stop: "any semantic drift, race or invalid ownership",
  },
  {
    gate: "Material performance",
    pass: "p99 <= 110 ms; throughput >= 15k events/s",
    stop: "effect inside noise or below Amdahl/product value",
  },
  {
    gate: "Resource bounds",
    pass: "CPU not worse; RSS <= 1.2 GiB; queue age bounded",
    stop: "latency gain purchased by unbounded memory/CPU",
  },
  {
    gate: "Failure + lifecycle",
    pass: "overload/disk error/cancel/shutdown/drain all terminate",
    stop: "busy wait, wait forever, data loss outside contract",
  },
  {
    gate: "Sustainability",
    pass: "regression guard, observability, feature-flag rollback",
    stop: "cannot detect drift or safely revert",
  },
] as const;

export function OpcReleaseDecisionGateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="正确性性能资源失败生命周期和可持续性五道性能优化发布门图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {releaseGates.map((row, index) => (
            <section
              key={row.gate}
              className="min-h-72 border border-rose-500/30 bg-rose-500/10 p-4"
            >
              <span className="text-xs text-secondary">gate 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.gate}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                pass: {row.pass}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">
                stop: {row.stop}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “够快就停”是多维 release decision：达到产品目标且
        correctness/resource/lifecycle/rollback 全通过；不是某个 microbenchmark
        再也挤不出百分点。
      </figcaption>
    </figure>
  );
}
