const classifications = [
  {
    syntax: "template<T> f(T&&)",
    deduction: "T deduced now",
    kind: "forwarding reference",
  },
  {
    syntax: "template<T> f(const T&&)",
    deduction: "T deduced, form modified",
    kind: "rvalue reference",
  },
  {
    syntax: "f(Widget&&)",
    deduction: "no type deduction",
    kind: "rvalue reference",
  },
  {
    syntax: "Vector<T>::push(T&&)",
    deduction: "T fixed by class",
    kind: "rvalue reference",
  },
  {
    syntax: "emplace<Arg>(Arg&&)",
    deduction: "Arg deduced now",
    kind: "forwarding reference",
  },
] as const;

export function EmcppReferenceClassificationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="五种双 ampersand 声明按当前推导和精确形式分类 forwarding 或 rvalue reference 的图"
          className="space-y-3"
        >
          {classifications.map((item, index) => (
            <section
              key={item.syntax}
              className="grid gap-3 border border-sky-500/30 bg-sky-500/10 p-4 md:grid-cols-[1.2fr_1fr_1fr] md:items-center"
            >
              <code className="text-xs text-primary">
                0{index + 1} · {item.syntax}
              </code>
              <span className="text-xs text-secondary">{item.deduction}</span>
              <strong className="text-xs text-accent">{item.kind}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分类公式只有两问：类型是否在当前调用推导，parameter 是否精确为该 deduced
        type 的 double ampersand。
      </figcaption>
    </figure>
  );
}

const deductionRows = [
  {
    argument: "Widget lvalue",
    deduced: "T = Widget&",
    formed: "Widget& &&",
    collapsed: "Widget&",
  },
  {
    argument: "const Widget lvalue",
    deduced: "T = const Widget&",
    formed: "const Widget& &&",
    collapsed: "const Widget&",
  },
  {
    argument: "Widget rvalue",
    deduced: "T = Widget",
    formed: "Widget&&",
    collapsed: "Widget&&",
  },
] as const;

export function EmcppForwardingDeductionCollapseMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="mutable lvalue const lvalue 与 rvalue 经过 T 推导 reference formation 和 collapsing 的结果图"
          className="space-y-3"
        >
          {deductionRows.map((row, index) => (
            <section
              key={row.argument}
              className="grid gap-3 border border-emerald-500/30 bg-emerald-500/10 p-4 md:grid-cols-[0.9fr_1fr_1fr_0.8fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.argument}
              </strong>
              <code className="text-xs text-accent">{row.deduced}</code>
              <code className="text-xs text-accent">{row.formed}</code>
              <span className="text-xs text-secondary">→ {row.collapsed}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        forwarding reference 的双重身份来自 deduction + collapsing，不是 T&&
        在运行时改变类型。
      </figcaption>
    </figure>
  );
}

const autoCases = [
  {
    context: "Variable from lvalue",
    source: "auto&& x = widget",
    result: "Widget&",
  },
  {
    context: "Variable from rvalue",
    source: "auto&& x = Widget{}",
    result: "Widget&&",
  },
  {
    context: "Range-for",
    source: "for (auto&& e : range)",
    result: "deduce dereference category",
  },
  {
    context: "Generic lambda",
    source: "[](auto&& arg)",
    result: "forwarding call parameter",
  },
] as const;

export function EmcppAutoForwardingRangeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="auto double ampersand 在 lvalue rvalue 变量 range for 和 generic lambda 中的推导图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {autoCases.map((item, index) => (
            <section
              key={item.context}
              className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.context}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {item.source}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.result}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        auto&& 复用 forwarding deduction；它能保存来源 category，但不会自动解决
        proxy 或 lifetime ownership。
      </figcaption>
    </figure>
  );
}
