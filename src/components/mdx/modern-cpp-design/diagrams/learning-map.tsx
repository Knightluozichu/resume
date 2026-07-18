const routeRows = [
  { phase: "Part I · Design", chapters: "Ch1 Policy-Based Class Design", question: "which decisions vary independently?", artifact: "Host + compatible Policy contracts" },
  { phase: "Part I · Meta tools", chapters: "Ch2 Techniques · Ch3 Typelists", question: "how can types be tested, mapped and generated?", artifact: "traits/tags + type schema + hierarchy" },
  { phase: "Part I · Runtime state", chapters: "Ch4 Small-Object Allocation", question: "how does layered policy meet memory state?", artifact: "Chunk → FixedAllocator → router" },
  { phase: "Part II · Core components", chapters: "Ch5 Functor · Ch6 Singleton · Ch7 SmartPtr", question: "how are call, lifetime and ownership represented?", artifact: "erased callable + lifecycle + resource owner" },
  { phase: "Part II · Creation", chapters: "Ch8 Object Factory · Ch9 Abstract Factory", question: "one product or a compatible family?", artifact: "registry + generated family schema" },
  { phase: "Part II · Dispatch", chapters: "Ch10 Visitor · Ch11 Multimethods", question: "one or several dynamic types choose operation?", artifact: "double dispatch + type-pair engine" },
] as const;

export function McdOfficialChapterRouteMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Modern C++ Design 官方十一章从 Policy 元工具 allocator 到组件工厂和分派的六段路线" className="space-y-3">
          {routeRows.map((row, index) => (
            <section key={row.chapters} className="grid min-h-40 gap-3 border border-cyan-500/35 bg-cyan-500/10 p-4 lg:grid-cols-[0.75fr_1.35fr_1.3fr_1.35fr] lg:items-center">
              <div><span className="text-xs text-secondary">route 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.phase}</strong></div>
              <code className="break-words text-xs text-accent">{row.chapters}</code>
              <span className="text-xs text-primary">{row.question}</span>
              <span className="text-xs text-secondary">{row.artifact}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        官方结构是 Techniques 4章 + Components 7章；后半部不断复用前半部的 Policy、traits、Typelist 与分层状态机。
      </figcaption>
    </figure>
  );
}

const timingRows = [
  { known: "build / source", choose: "template Policy · trait · Typelist", example: "storage/deleter fixed per binary", cost: "types, compile time, ABI" },
  { known: "startup / configuration", choose: "Factory · prototype · immutable registry", example: "backend family selected once", cost: "validation, ownership, unload" },
  { known: "per call / dynamic objects", choose: "Functor · Visitor · Multimethod", example: "callback or type pair changes", cost: "indirect call, lookup, RTTI" },
] as const;

export function McdDecisionTimingMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="设计决定在编译期启动期或每次调用期已知时的机制选择和成本" className="grid gap-3 lg:grid-cols-3">
          {timingRows.map((row, index) => (
            <section key={row.known} className="min-h-64 border border-violet-500/35 bg-violet-500/10 p-4">
              <span className="text-xs text-secondary">time 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">known at {row.known}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.choose}</code>
              <span className="mt-4 block text-xs text-primary">{row.example}</span>
              <p className="mb-0 mt-3 text-xs text-secondary">cost · {row.cost}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        核心问题不是“模板还是虚函数”，而是设计决定何时已知，以及哪种成本能被系统接受。
      </figcaption>
    </figure>
  );
}

const dependencyRows = [
  { foundation: "Policy + Techniques", reusedBy: "SingletonHolder · SmartPtr", invariant: "compatible protocols + diagnostics" },
  { foundation: "Typelist + hierarchy generation", reusedBy: "AbstractFactory · generic Visitor", invariant: "unique ordered schema + pair mapping" },
  { foundation: "Functor type erasure", reusedBy: "Factory creators · FnDispatcher", invariant: "signature + callable/module lifetime" },
  { foundation: "Allocator + ownership", reusedBy: "all runtime components", invariant: "size/alignment/owner/shutdown" },
] as const;

export function McdChapterDependencyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="前四章基础如何被 Singleton SmartPtr Factory Visitor Multimethod 复用的依赖表" className="grid gap-3 sm:grid-cols-2">
          {dependencyRows.map((row, index) => (
            <section key={row.foundation} className="min-h-52 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">link 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.foundation}</strong>
              <code className="mt-4 block break-words text-xs text-accent">→ {row.reusedBy}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">gate · {row.invariant}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        读书时追踪“基础机制被谁复用、语义不变量是什么”，比记住模板签名更能迁移到现代 C++。
      </figcaption>
    </figure>
  );
}
