type AliasCase = Readonly<{
  context: string;
  typedefForm: string;
  aliasForm: string;
  benefit: string;
}>;

const aliasCases = [
  {
    context: "Container owner",
    typedefForm: "typedef LongType Name",
    aliasForm: "using Name = LongType",
    benefit: "名称固定在左侧，目标类型完整留在右侧。",
  },
  {
    context: "Function pointer",
    typedefForm: "typedef void (*Name)(int)",
    aliasForm: "using Name = void (*)(int)",
    benefit: "无需从 pointer declarator 中寻找 alias name。",
  },
  {
    context: "Parameterized family",
    typedefForm: "wrapper<T>::type",
    aliasForm: "Alias<T>",
    benefit: "alias template 直接产生最终类型。",
  },
] as const satisfies readonly AliasCase[];

export function EmcppAliasReadabilityMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="容器所有权函数指针和参数化类型族三种场景中 typedef 与 using 别名声明阅读顺序对比图"
          className="space-y-3"
        >
          {aliasCases.map((item, index) => (
            <section
              key={item.context}
              className="grid gap-3 border border-border bg-bg/40 p-4 md:grid-cols-[0.8fr_1fr_1fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
                {item.context}
              </strong>
              <code className="border-l-2 border-amber-500 pl-3 text-xs text-secondary">
                {item.typedefForm}
              </code>
              <code className="border-l-2 border-emerald-500 pl-3 text-xs text-secondary">
                {item.aliasForm}
              </code>
              <p className="m-0 text-xs leading-5 text-secondary">
                {item.benefit}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        using 把所有声明统一成 Name = Type；最大能力差异是 alias declaration
        可以直接成为 template。
      </figcaption>
    </figure>
  );
}

const expansionRows = [
  {
    stage: "Definition",
    wrapper: "struct MyList { typedef ... type; }",
    alias: "using MyList = list<T, Alloc<T>>",
  },
  {
    stage: "Instantiation",
    wrapper: "MyList<Widget>",
    alias: "MyList<Widget>",
  },
  {
    stage: "Extract result",
    wrapper: "typename ...::type",
    alias: "already the final type",
  },
  {
    stage: "Member declaration",
    wrapper: "typename MyList<T>::type items",
    alias: "MyList<T> items",
  },
] as const;

export function EmcppAliasTemplateExpansionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="传统 typedef 包装与 alias template 从定义实例化提取结果到成员声明的四阶段展开对比图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {expansionRows.map((row, index) => (
            <section
              key={row.stage}
              className="min-h-52 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {row.stage}
              </strong>
              <div className="mt-4 border-l-2 border-amber-500 pl-3">
                <span className="text-xs text-secondary">wrapper</span>
                <code className="mt-1 block text-xs leading-5 text-primary">
                  {row.wrapper}
                </code>
              </div>
              <div className="mt-4 border-l-2 border-emerald-500 pl-3">
                <span className="text-xs text-secondary">alias</span>
                <code className="mt-1 block text-xs leading-5 text-primary">
                  {row.alias}
                </code>
              </div>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        alias template 删除的不是类型计算，而是 wrapper class、nested type
        extraction 与 dependent typename 三层机械结构。
      </figcaption>
    </figure>
  );
}

const traitStages = [
  {
    label: "Input",
    code: "const Widget&",
    detail: "含 reference 与底层 const。",
    tone: "border-sky-500/35 bg-sky-500/10",
  },
  {
    label: "Remove reference",
    code: "remove_reference_t<T>",
    detail: "得到 const Widget。",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    label: "Remove cv",
    code: "remove_cv_t<...>",
    detail: "得到 Widget。",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    label: "Assert contract",
    code: "is_same_v<Result, Widget>",
    detail: "编译期固定规范化结果。",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
] as const;

export function EmcppTraitAliasPipelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="const Widget reference 依次经过 remove reference 和 remove cv 类型别名并由 static assertion 验证的 trait 流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {traitStages.map((stage, index) => (
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
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后缀 t aliases 把 nested metafunction extraction
        变成可组合的类型表达式，最终语义仍由 traits 与 assertions 决定。
      </figcaption>
    </figure>
  );
}
