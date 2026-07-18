const stringEvents = [
  {
    event: "Construct / grow",
    possibleWork: "allocate capacity + copy characters + terminator",
    evidence: "allocation count, bytes moved, capacity transitions",
    caveat: "SSO and growth policy are implementation-specific",
  },
  {
    event: "Copy value",
    possibleWork: "new owned storage + character copy",
    evidence: "copy sites, owner count, bytes copied",
    caveat: "move/RVO can transfer or construct ownership",
  },
  {
    event: "Mutate",
    possibleWork: "search/shift/reallocate and iterator invalidation",
    evidence: "size/capacity before and after each operation",
    caveat: "in-place mutation still moves overlapping ranges",
  },
  {
    event: "Convert / encode",
    possibleWork: "scan, validate, transcode and allocate output",
    evidence: "boundary conversions and invalid-input policy",
    caveat: "byte count differs from code points/graphemes",
  },
] as const;

export function OpcStringValueCostLedgerMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="字符串构造增长复制修改和编码转换四类事件的隐藏工作证据与边界图"
          className="space-y-3"
        >
          {stringEvents.map((row, index) => (
            <section
              key={row.event}
              className="grid min-h-40 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 lg:grid-cols-[0.7fr_1.35fr_1.2fr_1.2fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  event 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.event}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.possibleWork}
              </code>
              <span className="text-xs text-primary">{row.evidence}</span>
              <span className="text-xs text-secondary">{row.caveat}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        std::string 是 value abstraction；每个 value event
        是否分配、复制或失效引用， 必须按具体实现、长度和 capacity
        观测，不能用“字符串一定慢”代替成本账本。
      </figcaption>
    </figure>
  );
}

const ownershipPaths = [
  {
    path: "Read-only argument",
    defaultChoice: "string_view / const reference / iterator range",
    avoids: "temporary owning string and deep copy",
    obligation: "source lifetime and termination contract",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    path: "Built result",
    defaultChoice: "return string by value",
    avoids: "manual output ownership and unsafe buffer protocol",
    obligation: "allow RVO/move; do not return borrowed local data",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    path: "Append / mutation",
    defaultChoice: "reserve once, append ranges in place",
    avoids: "geometric reallocations and chained temporaries",
    obligation: "estimate bound and account for iterator invalidation",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    path: "External C buffer",
    defaultChoice: "pointer + validated length at the boundary",
    avoids: "repeated strlen and C-string-to-string conversion",
    obligation: "capacity, null termination, encoding and ownership",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
] as const;

export function OpcStringOwnershipPathMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="只读参数返回值就地拼接和外部字符数组四条字符串所有权路径比较图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {ownershipPaths.map((row, index) => (
            <section
              key={row.path}
              className={`min-h-72 border p-4 ${row.tone}`}
            >
              <span className="text-xs text-secondary">path 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.path}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.defaultChoice}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">
                avoids: {row.avoids}
              </p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                prove: {row.obligation}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        消除 copying 不是把所有 owning string 改成 view；先按
        argument、result、mutation 与 external buffer 决定谁拥有
        storage，再选择不会悬空的 representation。
      </figcaption>
    </figure>
  );
}

const strategyLadder = [
  {
    rank: "01",
    lever: "Eliminate conversion / work",
    test: "can bytes stay in one representation across the pipeline?",
    risk: "wrong encoding or validation policy",
  },
  {
    rank: "02",
    lever: "Better algorithm",
    test: "can one pass replace repeated find/erase/concatenate?",
    risk: "changed edge-case semantics",
  },
  {
    rank: "03",
    lever: "Better compiler / library",
    test: "does a mature implementation already optimize the primitive?",
    risk: "benchmarking debug mode or mismatched contract",
  },
  {
    rank: "04",
    lever: "Better allocator",
    test: "are unavoidable allocations still a measured hot spot?",
    risk: "lifetime, fragmentation and maintenance complexity",
  },
] as const;

export function OpcStringOptimizationStrategyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="消除转换改进算法复用编译器字符串库最后评估分配器的字符串优化策略阶梯图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {strategyLadder.map((row) => (
            <section
              key={row.rank}
              className="min-h-72 border border-fuchsia-500/30 bg-fuchsia-500/10 p-4"
            >
              <span className="text-xs text-secondary">lever {row.rank}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.lever}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.test}</p>
              <p className="mb-0 mt-4 border-t border-border pt-4 text-xs text-secondary">
                {row.risk}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        优先删除 conversion、temporary 和 repeated scans；只有 allocation
        无法消除且仍是 profile hotspot 时，better allocator 才进入候选。
      </figcaption>
    </figure>
  );
}
