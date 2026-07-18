type SyntaxCase = Readonly<{
  context: string;
  parentheses: string;
  braces: string;
  key: string;
}>;

const syntaxCases = [
  {
    context: "Ordinary object",
    parentheses: "Widget(arg)",
    braces: "Widget{arg}",
    key: "两者都可用，但 selected overload 可能不同。",
  },
  {
    context: "Data member default",
    parentheses: "not allowed",
    braces: "int count{0}",
    key: "braces 可直接写在 member declaration。",
  },
  {
    context: "Narrowing input",
    parentheses: "int(x) allowed",
    braces: "int{x} rejected",
    key: "list-initialization 提供 compile-time narrowing gate。",
  },
  {
    context: "Empty object",
    parentheses: "Widget w() = function",
    braces: "Widget w{} = object",
    key: "empty braces 避开 most-vexing parse。",
  },
] as const satisfies readonly SyntaxCase[];

export function EmcppBraceSyntaxCoverageMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="普通对象成员默认值窄化输入和空对象四种场景下圆括号与花括号初始化差异图"
          className="space-y-3"
        >
          {syntaxCases.map((item, index) => (
            <section
              key={item.context}
              className="grid gap-3 border border-border bg-bg/40 p-4 md:grid-cols-[1fr_1fr_1fr_1.3fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
                {item.context}
              </strong>
              <code className="border-l-2 border-amber-500 pl-3 text-xs text-secondary">
                {item.parentheses}
              </code>
              <code className="border-l-2 border-emerald-500 pl-3 text-xs text-secondary">
                {item.braces}
              </code>
              <p className="m-0 text-xs leading-5 text-secondary">{item.key}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        braces 覆盖面更广并提供 narrowing protection，但普通对象上的 overload
        semantics 仍必须单独分析。
      </figcaption>
    </figure>
  );
}

const preferenceStages = [
  {
    label: "Brace call",
    code: "Widget{10, true}",
    detail: "进入 list-initialization overload resolution。",
    tone: "border-sky-500/35 bg-sky-500/10",
  },
  {
    label: "List candidate set",
    code: "initializer_list<long double>",
    detail: "只要可行，就优先于普通 int/bool constructor。",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    label: "Element conversion",
    code: "10, true -> long double",
    detail: "逐个检查转换与 narrowing。",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    label: "Selected meaning",
    code: "list constructor",
    detail: "delimiter 改变 selected overload 和 object state。",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
] as const;

export function EmcppInitializerListPreferenceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="花括号调用先建立 initializer list 候选集合再检查元素转换并选择 list constructor 的优先级流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {preferenceStages.map((stage, index) => (
            <section
              key={stage.label}
              className={`min-h-48 border p-4 ${stage.tone}`}
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage.label}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {stage.code}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {stage.detail}
              </p>
            </section>
          ))}
        </div>
        <p className="mb-0 mt-3 border-l-2 border-rose-500 bg-rose-500/10 p-3 text-xs leading-5 text-secondary">
          若 list element conversion 发生 narrowing，call
          可能直接失败，不应假设会回退到普通 constructor。
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        initializer-list preference 是两阶段选择，不是“所有 constructors
        一起比谁转换最少”。
      </figcaption>
    </figure>
  );
}

export function EmcppVectorConstructionSemanticsMap() {
  const repeated = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    value: 20,
  }));
  const listed = [10, 20];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="vector 圆括号十和二十创建十个值为二十的元素而花括号创建两个元素十和二十的语义对比图"
          className="grid gap-4 lg:grid-cols-2"
        >
          <section className="border border-amber-500/35 bg-amber-500/10 p-4">
            <strong className="text-sm text-primary">
              vector&lt;int&gt;(10, 20)
            </strong>
            <p className="mt-2 text-xs leading-5 text-secondary">
              count/value constructor：size = 10，value = 20
            </p>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {repeated.map((item) => (
                <span
                  key={item.id}
                  className="border border-amber-500/35 bg-bg/60 p-2 text-center text-xs text-primary"
                >
                  {item.value}
                </span>
              ))}
            </div>
          </section>
          <section className="border border-emerald-500/35 bg-emerald-500/10 p-4">
            <strong className="text-sm text-primary">
              vector&lt;int&gt;{`{10, 20}`}
            </strong>
            <p className="mt-2 text-xs leading-5 text-secondary">
              initializer-list constructor：size = 2，elements = 10, 20
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {listed.map((value) => (
                <span
                  key={value}
                  className="border border-emerald-500/35 bg-bg/60 p-4 text-center text-sm text-primary"
                >
                  {value}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        相同两个整数只是 token 相同；parentheses 表达数量与重复值，braces
        表达逐个列出的元素。
      </figcaption>
    </figure>
  );
}
