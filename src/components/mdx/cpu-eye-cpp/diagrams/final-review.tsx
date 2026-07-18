const knowledgeNodes = [
  {
    input: "Source expression",
    mechanism: "type + lifetime + control semantics",
    output: "compiler IR constraints",
  },
  {
    input: "Target ABI",
    mechanism: "layout + calling + symbol rules",
    output: "object code contract",
  },
  {
    input: "Executable + loader",
    mechanism: "mapping + relocation + startup",
    output: "process address space",
  },
  {
    input: "Thread context",
    mechanism: "instructions + memory + synchronization",
    output: "observable behavior",
  },
] as const;

export function CpuEyeFinalKnowledgeGraphMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="源码表达式经过语言约束目标ABI可执行文件加载和线程上下文形成可观察行为的全书知识图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {knowledgeNodes.map((item, index) => (
            <section
              key={item.input}
              className="min-h-52 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.input}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.mechanism}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{item.output}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书不是孤立语法清单，而是一条从 source contract 到 runtime evidence
        的可追踪链。
      </figcaption>
    </figure>
  );
}

const diagnosisCases = [
  {
    symptom: "optimized local disappears",
    firstCheck: "address taken? observable use?",
    mechanism: "register allocation / elimination",
    proof: "O0/O2 assembly + debug location",
  },
  {
    symptom: "pointer access sometimes works",
    firstCheck: "owner, bounds, lifetime",
    mechanism: "undefined behavior within mapped page",
    proof: "ASan + object-lifetime trace",
  },
  {
    symptom: "virtual call target surprises",
    firstCheck: "static/dynamic type, construction stage",
    mechanism: "dispatch or slicing",
    proof: "object layout + call target",
  },
  {
    symptom: "thread sees stale/corrupt data",
    firstCheck: "happens-before and shared accesses",
    mechanism: "data race / wrong lock protocol",
    proof: "TSan + lock/system trace",
  },
] as const;

export function CpuEyeFailureDiagnosisMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从优化变量消失指针偶发成功虚调用意外和线程数据错误到机制与验证证据的诊断图"
          className="space-y-3"
        >
          {diagnosisCases.map((item, index) => (
            <section
              key={item.symptom}
              className="grid min-h-36 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[1fr_1.1fr_1.2fr_1.1fr] md:items-center"
            >
              <strong className="text-xs text-primary">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {item.symptom}
              </strong>
              <span className="text-xs text-secondary">{item.firstCheck}</span>
              <code className="break-words text-xs text-accent">
                {item.mechanism}
              </code>
              <span className="text-xs text-primary">{item.proof}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        诊断先验证语言前提，再下钻
        ABI、地址和调度；“偶尔正常”从来不是正确性证据。
      </figcaption>
    </figure>
  );
}

const matrixRows = [
  ["Object", "type + lifetime", "layout + this/vptr", "address + bytes"],
  [
    "Function",
    "parameter + return",
    "calling convention",
    "call/ret + backtrace",
  ],
  [
    "Memory",
    "bounds + ownership",
    "mapping/allocator ABI",
    "fault + resident pages",
  ],
  [
    "Concurrency",
    "data race + happens-before",
    "atomic/mutex ABI",
    "wait + wake + schedule",
  ],
] as const;

export function CpuEyeFinalEvidenceMatrixMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="对象函数内存并发四类问题在语言ABI和运行时三层需要收集的最终证据矩阵"
          className="grid gap-3 lg:grid-cols-2"
        >
          {matrixRows.map(([topic, language, abi, runtime], index) => (
            <section
              key={topic}
              className="min-h-48 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {topic}
              </strong>
              <p className="mb-0 mt-3 text-xs text-primary">
                language: {language}
              </p>
              <code className="mt-3 block break-words text-xs text-accent">
                ABI: {abi}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                runtime: {runtime}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        最终能力是为不同问题选择正确证据，而不是对所有问题只看一段反汇编。
      </figcaption>
    </figure>
  );
}
