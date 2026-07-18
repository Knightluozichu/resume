const alternatives = [
  {
    name: "Distinct names",
    mechanism: "separate API domains",
    strength: "clearest intent and diagnostics",
    cost: "callers must choose a name",
  },
  {
    name: "const T&",
    mechanism: "one stable read-only input",
    strength: "simple and never greedy",
    cost: "may create an extra temporary/copy",
  },
  {
    name: "Pass by value",
    mechanism: "copy or move at boundary",
    strength: "good for stored copyable values",
    cost: "lvalues pay copy plus move",
  },
  {
    name: "Tag dispatch",
    mechanism: "classify then call implementation",
    strength: "keeps one public function name",
    cost: "adds internal dispatch machinery",
  },
  {
    name: "Constrained template",
    mechanism: "remove invalid candidates",
    strength: "preserves perfect forwarding",
    cost: "traits and diagnostics need care",
  },
] as const;

export function EmcppForwardingAlternativeTradeoffMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="不同函数名 const reference 按值 标签分派和约束模板五种 forwarding 重载替代方案的取舍图"
          className="space-y-3"
        >
          {alternatives.map((item, index) => (
            <section
              key={item.name}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.8fr_1fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.name}
              </strong>
              <code className="text-xs text-accent">{item.mechanism}</code>
              <span className="text-xs text-secondary">
                gain: {item.strength}
              </span>
              <span className="text-xs text-secondary">cost: {item.cost}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        没有一种方案在清晰度、效率和泛化能力上同时最优；先缩小 API
        输入域，再决定是否需要 forwarding。
      </figcaption>
    </figure>
  );
}

const tagDispatchSteps = [
  {
    label: "Public entry",
    code: "logAndAdd(T&& value)",
    detail: "deduce T and preserve value category",
  },
  {
    label: "Classify",
    code: "is_integral<remove_reference_t<T>>",
    detail: "materialize true_type or false_type tag",
  },
  {
    label: "true_type",
    code: "logAndAddImpl(index, true_type)",
    detail: "lookup name, then re-enter the string path",
  },
  {
    label: "false_type",
    code: "logAndAddImpl(value, false_type)",
    detail: "forward value directly into the name store",
  },
] as const;

export function EmcppTagDispatchFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="公开 forwarding 入口根据去引用后的类型是否为整数生成 true 或 false 标签并调用不同实现的流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {tagDispatchSteps.map((step, index) => (
            <section
              key={step.label}
              className={`min-h-48 border p-4 ${
                index < 2
                  ? "border-amber-500/35 bg-amber-500/10"
                  : "border-emerald-500/35 bg-emerald-500/10"
              }`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {step.label}
              </strong>
              <code className="mt-3 block break-words text-xs text-accent">
                {step.code}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{step.detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分类发生在 implementation overload set 中；公开接口不再把整数 overload
        与贪婪 forwarding overload 并列竞争。
      </figcaption>
    </figure>
  );
}

const constructorGates = [
  {
    gate: "Normalize",
    expression: "decay_t<T>",
    pass: "remove reference and cv",
    reject: "none",
  },
  {
    gate: "Self-family gate",
    expression: "!is_base_of_v<Person, decay_t<T>>",
    pass: "name-like inputs",
    reject: "Person and derived types",
  },
  {
    gate: "Construction gate",
    expression: "is_constructible_v<string, T&&>",
    pass: "valid string sources",
    reject: "unrelated types",
  },
  {
    gate: "Overload result",
    expression: "copy/move or forwarding ctor",
    pass: "one intended candidate",
    reject: "greedy hijacking",
  },
] as const;

export function EmcppConstrainedConstructorGateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Person forwarding 构造函数先规范化类型再排除 Person 派生类并检查 string 可构造性的候选门控图"
          className="space-y-3"
        >
          {constructorGates.map((item, index) => (
            <section
              key={item.gate}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1.4fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.gate}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.expression}
              </code>
              <span className="text-xs text-secondary">pass: {item.pass}</span>
              <span className="text-xs text-secondary">
                reject: {item.reject}
              </span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        约束把错误类型从候选集合移走：self/derived 交给
        copy/move，真正的姓名输入才进入 forwarding constructor。
      </figcaption>
    </figure>
  );
}
