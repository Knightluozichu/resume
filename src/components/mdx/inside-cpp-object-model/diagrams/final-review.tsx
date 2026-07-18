const chapterMatrix = [
  {
    chapter: "Ch 1 Object Lessons",
    inspect: "host view vs plugin dynamic object",
    evidence: "subobjects, static/dynamic type, slicing",
    fix: "opaque handle keeps representation private",
  },
  {
    chapter: "Ch 2 Constructor Semantics",
    inspect: "generated base/member/copy work",
    evidence: "vptr target state and copy elision",
    fix: "factory constructs final object directly",
  },
  {
    chapter: "Ch 3 Data Semantics",
    inspect: "MI/virtual-base data offsets",
    evidence: "base views, padding, member locator",
    fix: "versioned records avoid native layout",
  },
  {
    chapter: "Ch 4 Function Semantics",
    inspect: "virtual slot and secondary-base thunk",
    evidence: "incoming this, adjustment, target body",
    fix: "C ABI dispatch at module boundary",
  },
  {
    chapter: "Ch 5 Lifecycle State",
    inspect: "constructor hook, copy, virtual destruction",
    evidence: "active vptr phase and reverse teardown",
    fix: "post-construction start + module destroy",
  },
  {
    chapter: "Ch 6 Runtime Semantics",
    inspect: "pool storage, placement, array rollback",
    evidence: "lifetime start/end and matching release",
    fix: "typed slot owner with destroy callback",
  },
  {
    chapter: "Ch 7 Object-Model Cusp",
    inspect: "template IDs, exception, RTTI across DSO",
    evidence: "instantiation/runtime/ABI identity",
    fix: "stable IDs + translated errors + versioned ABI",
  },
] as const;

export function IcoFinalKnowledgeMatrixMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="官方七章在跨动态库多态对象池事故中的检查对象证据和修复知识矩阵"
          className="space-y-3"
        >
          {chapterMatrix.map((row, index) => (
            <section
              key={row.chapter}
              className="grid min-h-40 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 lg:grid-cols-[0.9fr_1.2fr_1.25fr_1.2fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  gate 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.chapter}
                </strong>
              </div>
              <span className="text-xs text-primary">{row.inspect}</span>
              <code className="break-words text-xs text-accent">
                {row.evidence}
              </code>
              <span className="text-xs text-secondary">{row.fix}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        综合诊断不能停在“vptr 坏了”：七章分别约束 representation、generated
        work、 access/call lowering、lifetime 和跨 module identity。
      </figcaption>
    </figure>
  );
}

const failureTrace = [
  {
    step: "Shared bytes arrive",
    hidden: "record contains foreign-process vptr/raw pointer",
    symptom: "first virtual call jumps to invalid address",
    boundary: "Ch 1/3/7 representation violation",
  },
  {
    step: "Host raw-copies slot",
    hidden: "target identity/resources are byte-copied",
    symptom: "double free, stale self-pointer, wrong vptr",
    boundary: "Ch 2/5 copy-semantics violation",
  },
  {
    step: "Constructor calls hook",
    hidden: "active class is only the current base phase",
    symptom: "derived registration never runs",
    boundary: "Ch 4/5 dispatch-phase violation",
  },
  {
    step: "Host destroys plugin node",
    hidden: "allocator/destructor ABI ownership crossed module",
    symptom: "partial teardown or heap corruption",
    boundary: "Ch 5/6/7 release violation",
  },
  {
    step: "Exception/RTTI crosses DSO",
    hidden: "runtime/type identity differs or is hidden",
    symptom: "catch/cast fails despite similar class names",
    boundary: "Ch 7 ABI identity violation",
  },
] as const;

export function IcoPluginFailureTraceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="跨进程对象字节到原始复制构造期回调跨模块销毁和异常类型识别失败的事故链图"
          className="space-y-3"
        >
          {failureTrace.map((row, index) => (
            <section
              key={row.step}
              className="grid min-h-40 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.75fr_1.35fr_1.2fr_1.25fr] md:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  event 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.step}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.hidden}
              </code>
              <span className="text-xs text-primary">{row.symptom}</span>
              <span className="text-xs text-secondary">{row.boundary}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        故障从 foreign representation 开始，经错误 copy/lifetime 放大，最终在
        virtual call、 destruction 或 RTTI 处暴露；崩溃点不一定是根因点。
      </figcaption>
    </figure>
  );
}

const redesignGates = [
  {
    gate: "Stable data boundary",
    contract: "version + size + stable type ID + relative offsets",
    localWork: "deserialize into process-local values",
    proof: "no vptr/raw address in wire/shared record",
  },
  {
    gate: "Module-owned behavior",
    contract: "C ABI create/invoke/destroy on opaque handle",
    localWork: "plugin owns allocator, hierarchy and RTTI",
    proof: "all lifetime operations return to creator module",
  },
  {
    gate: "Phase-safe object pool",
    contract: "aligned slot + construct/destroy callback",
    localWork: "placement construct after slot claim",
    proof: "generation counter rejects stale handles",
  },
  {
    gate: "Contained late decisions",
    contract: "templates/exception/RTTI stay behind ABI",
    localWork: "explicit instantiation, catch-and-translate",
    proof: "cross-version compatibility and fault tests",
  },
] as const;

export function IcoCapstoneEvidenceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="稳定数据边界模块拥有行为阶段安全对象池和受控延迟决议的综合改造验收图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {redesignGates.map((row, index) => (
            <section
              key={row.gate}
              className="min-h-64 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">gate 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.gate}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.contract}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{row.localWork}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.proof}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        最终方案不是取消 C++ 对象模型，而是把高效的 local hierarchy 留在 module
        内， 用稳定 data/ownership/error protocol 穿越 ABI 与进程边界。
      </figcaption>
    </figure>
  );
}
