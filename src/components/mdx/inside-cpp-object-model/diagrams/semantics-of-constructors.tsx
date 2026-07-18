const defaultConstructionCases = [
  {
    trigger: "Member class object",
    injected: "call member default constructors",
    order: "member declaration order",
    untouched: "scalar members without initializers",
  },
  {
    trigger: "Base class",
    injected: "call base default constructors",
    order: "base-specifier order before members",
    untouched: "derived scalar state",
  },
  {
    trigger: "Virtual functions",
    injected: "establish implementation vptr state",
    order: "for the subobject under construction",
    untouched: "application data without initialization",
  },
  {
    trigger: "Virtual base class",
    injected: "construct shared virtual-base subobject",
    order: "most-derived constructor owns the call",
    untouched: "non-owning intermediate base request",
  },
] as const;

export function IcoDefaultConstructorSynthesisMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="成员类对象基类虚函数和虚基类四种条件下编译器默认构造支持的动作与顺序图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {defaultConstructionCases.map((row, index) => (
            <section
              key={row.trigger}
              className="min-h-60 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">case 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.trigger}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.injected}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{row.order}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                not implied: {row.untouched}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        compiler 生成 constructor work 是为了满足 member、base 与 virtual
        semantics，不是承诺把所有 bytes 自动清零。
      </figcaption>
    </figure>
  );
}

const copyDecisionRows = [
  {
    question: "User-declared copy constructor?",
    yes: "execute user body plus required subobject setup",
    no: "inspect bases and members",
    evidence: "semantic policy is explicit",
  },
  {
    question: "Nontrivial base/member copy?",
    yes: "invoke each copy operation in language order",
    no: "bitwise copy may remain possible",
    evidence: "subobject semantics prevent raw bytes",
  },
  {
    question: "Virtual function representation?",
    yes: "target keeps its class-appropriate vptr",
    no: "no dispatch metadata to repair",
    evidence: "source vptr cannot define target identity blindly",
  },
  {
    question: "Virtual base subobject?",
    yes: "copy shared base once under most-derived control",
    no: "fixed base/member traversal",
    evidence: "diamond paths must not duplicate state",
  },
] as const;

export function IcoCopyConstructionDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从用户拷贝构造到非平凡子对象虚表指针和虚基类逐层判断位拷贝是否成立的决策图"
          className="space-y-3"
        >
          {copyDecisionRows.map((row, index) => (
            <section
              key={row.question}
              className="grid min-h-40 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 lg:grid-cols-[0.9fr_1.2fr_1.1fr_1.2fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  gate 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.question}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                yes: {row.yes}
              </code>
              <span className="text-xs text-primary">no: {row.no}</span>
              <span className="text-xs text-secondary">{row.evidence}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        default memberwise initialization 不等于无条件 memcpy；只要某个
        subobject 或动态表示需要语义动作，copy path 就必须显式展开。
      </figcaption>
    </figure>
  );
}

const transformationRows = [
  {
    source: "X target(source)",
    semantic: "explicit initialization",
    lowered: "construct target from source",
    optimization: "inline or trivial-copy lowering",
  },
  {
    source: "consume(source)",
    semantic: "argument initialization",
    lowered: "initialize by-value parameter object",
    optimization: "elide/materialize per language and ABI",
  },
  {
    source: "X value = makeX()",
    semantic: "return value initialization",
    lowered: "construct into caller result storage",
    optimization: "NRVO or guaranteed copy elision when applicable",
  },
  {
    source: "Member list then body",
    semantic: "member initialization list",
    lowered: "bases then members in declaration order",
    optimization: "direct construction avoids default-then-assign",
  },
] as const;

export function IcoInitializationTransformationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="显式初始化参数初始化返回值初始化与成员初始化列表从源码语义到编译器变换和优化的对照图"
          className="space-y-3"
        >
          {transformationRows.map((row, index) => (
            <section
              key={row.source}
              className="grid min-h-36 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 md:grid-cols-[0.9fr_0.9fr_1.1fr_1.3fr] md:items-center"
            >
              <code className="break-words text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {row.source}
              </code>
              <strong className="text-xs text-primary">{row.semantic}</strong>
              <span className="text-xs text-primary">{row.lowered}</span>
              <span className="text-xs text-secondary">{row.optimization}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先确定 initialization 的语言语义，再讨论 ABI lowering 与 copy
        elision；优化可以 消除中间对象，但不能改变应构造哪个最终对象。
      </figcaption>
    </figure>
  );
}
