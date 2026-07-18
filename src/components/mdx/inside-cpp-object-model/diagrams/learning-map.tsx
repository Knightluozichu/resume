const officialChapters = [
  {
    number: "01",
    title: "Object Lessons",
    question: "对象、class 与 pointer view 如何表示？",
    evidence: "layout + static/dynamic type",
  },
  {
    number: "02",
    title: "Semantics of Constructors",
    question: "compiler 何时合成 default/copy work？",
    evidence: "subobject calls + elision",
  },
  {
    number: "03",
    title: "Semantics of Data",
    question: "member 怎样绑定、布局和访问？",
    evidence: "offset + inheritance adjustment",
  },
  {
    number: "04",
    title: "Semantics of Function",
    question: "this、slot、thunk 与 inline 怎样工作？",
    evidence: "call lowering + dispatch",
  },
  {
    number: "05",
    title: "Construction / Destruction / Copy",
    question: "完整 object state 如何建立、复制和撤销？",
    evidence: "phase order + vptr state",
  },
  {
    number: "06",
    title: "Runtime Semantics",
    question: "storage、new/delete 与 temporary 如何组合？",
    evidence: "lifetime + rollback",
  },
  {
    number: "07",
    title: "Cusp of the Object Model",
    question: "template、exception、RTTI 怎样推迟决议？",
    evidence: "instantiation + runtime metadata",
  },
] as const;

export function IcoOfficialChapterRouteMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="深度探索C++对象模型官方七章从对象初识到模板异常RTTI边缘机制的学习路线图"
          className="space-y-3"
        >
          {officialChapters.map((chapter) => (
            <section
              key={chapter.number}
              className="grid min-h-36 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.45fr_1.2fr_1.4fr_1.1fr] md:items-center"
            >
              <span className="text-lg font-semibold text-accent">
                {chapter.number}
              </span>
              <strong className="text-sm text-primary">{chapter.title}</strong>
              <span className="text-xs text-primary">{chapter.question}</span>
              <code className="break-words text-xs text-secondary">
                {chapter.evidence}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        七章依次回答 representation、generated work、data/function
        lowering、完整 lifetime 与 late-bound mechanisms；后章始终复用前章的
        object/subobject 模型。
      </figcaption>
    </figure>
  );
}

const dependencyRows = [
  {
    layer: "Representation",
    chapters: "Ch 1 + Ch 3",
    input: "class declaration and hierarchy",
    output: "subobjects, offsets, vptr/virtual-base metadata",
  },
  {
    layer: "Program transformation",
    chapters: "Ch 2 + Ch 4",
    input: "initialization and member calls",
    output: "hidden this/result, copy, slots, thunks, inline",
  },
  {
    layer: "Lifetime state machine",
    chapters: "Ch 5 + Ch 6",
    input: "storage duration, owners and failure paths",
    output: "construction/copy/destruction/unwind protocol",
  },
  {
    layer: "Deferred decisions",
    chapters: "Ch 7",
    input: "actual template types, throw point, dynamic type",
    output: "specialization, handler, checked runtime view",
  },
] as const;

export function IcoMechanismDependencyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="对象表示程序变换生命周期状态机和延迟决议四层依赖与章节对应图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {dependencyRows.map((row, index) => (
            <section
              key={row.layer}
              className="min-h-60 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">layer 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.layer}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.chapters}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">in: {row.input}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                out: {row.output}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        学习时不要把 vtable、constructor 和 RTTI 分成孤岛；每个 late-bound
        operation 都建立在既有 representation、call lowering 与 lifetime state
        上。
      </figcaption>
    </figure>
  );
}

const evidenceRows = [
  {
    column: "Language guarantee",
    ask: "observable semantics 必须是什么？",
    tools: "standard wording, type rules, lifetime/order",
    verdict: "portable conclusion",
  },
  {
    column: "Implementation / ABI",
    ask: "compiler 如何满足该语义？",
    tools: "ABI docs, record layouts, symbols, exception tables",
    verdict: "target-scoped mechanism",
  },
  {
    column: "Experiment",
    ask: "当前 build 实际留下什么？",
    tools: "sizeof/addresses, assembly, counters, profiler",
    verdict: "reproducible observation",
  },
  {
    column: "Decision",
    ask: "这份证据能支持哪种设计？",
    tools: "correctness test, benchmark, ABI compatibility review",
    verdict: "bounded engineering action",
  },
] as const;

export function IcoEvidenceBoundaryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="语言保证实现ABI实验观察和工程决策四栏证据边界图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {evidenceRows.map((row, index) => (
            <section
              key={row.column}
              className="min-h-64 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">gate 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.column}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.ask}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.tools}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.verdict}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        书中 implementation model 用于解释成本，不是把某个 vptr offset
        升格为标准；每个结论都要标注保证、ABI 与实验的边界。
      </figcaption>
    </figure>
  );
}
