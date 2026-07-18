const chapters = [
  ["01", "Deducing Types", "Items 1-4", "template / auto / decltype / inspect"],
  ["02", "auto", "Items 5-6", "prefer auto / typed initializer"],
  [
    "03",
    "Moving to Modern C++",
    "Items 7-17",
    "initialization / nullptr / enum / special members",
  ],
  [
    "04",
    "Smart Pointers",
    "Items 18-22",
    "unique / shared / weak / make / Pimpl",
  ],
  [
    "05",
    "Rvalue & Forwarding",
    "Items 23-30",
    "move / forward / collapse / failure cases",
  ],
  [
    "06",
    "Lambda Expressions",
    "Items 31-34",
    "capture / init capture / generic lambda / bind",
  ],
  [
    "07",
    "Concurrency API",
    "Items 35-40",
    "task / async / thread / future / atomic",
  ],
  ["08", "Tweaks", "Items 41-42", "pass by value / emplacement"],
] as const;

export function EmcppEightChapterJourneyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Effective Modern C++ 八章四十二个 Items 的官方学习旅程图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {chapters.map(([index, title, items, concepts]) => (
            <section
              key={title}
              className="border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">CHAPTER {index}</span>
              <strong className="mt-2 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-2 block text-xs text-accent">{items}</code>
              <p className="mb-0 mt-2 text-xs text-secondary">{concepts}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        八章顺序从“看清类型”递进到 ownership、value category、callable 与
        concurrency，最后用两项成本微调收束。
      </figcaption>
    </figure>
  );
}

const dependencies = [
  ["Type deduction", "Items 1-6", "read generated types and APIs"],
  ["Modern object rules", "Items 7-17", "build predictable value semantics"],
  ["Ownership", "Items 18-22", "make resource lifetime explicit"],
  ["Value category", "Items 23-30", "move and forward without hijacking"],
  ["Closures", "Items 31-34", "store dependencies and adapt calls"],
  ["Concurrency", "Items 35-40", "compose tasks, outcomes and synchronization"],
  ["Cost choices", "Items 41-42", "optimize only under proven conditions"],
] as const;

export function EmcppPrincipleDependencyFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="类型推导对象规则 ownership value category closure concurrency 和成本选择的前置依赖流程图"
          className="space-y-3"
        >
          {dependencies.map(([name, items, outcome], index) => (
            <section
              key={name}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_0.7fr_1.5fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {name}
              </strong>
              <code className="text-xs text-accent">{items}</code>
              <span className="text-xs text-secondary">→ {outcome}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后续章节反复使用前置模型；跳过推导、ownership 或 value
        category，会把并发与 lambda 问题误诊成语法问题。
      </figcaption>
    </figure>
  );
}

const evidence = [
  ["Predict", "write selected type/overload/lifetime before compiling"],
  ["Reproduce", "build the smallest failing or surprising case"],
  ["Explain", "trace deduction, ownership, ordering or construction path"],
  ["Repair", "apply the narrow Item rule with explicit constraints"],
  ["Disprove", "add negative inputs and boundary paths"],
  ["Transfer", "migrate one real API and measure behavior"],
] as const;

export function EmcppItemEvidenceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="每个 Effective Modern C++ Item 从预测复现解释修复反证到迁移的证据链图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {evidence.map(([step, detail], index) => (
            <section
              key={step}
              className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {step}
              </strong>
              <p className="mb-0 mt-2 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        能复述条款不算掌握；必须留下类型、诊断、调用路径、负例和真实迁移证据。
      </figcaption>
    </figure>
  );
}
