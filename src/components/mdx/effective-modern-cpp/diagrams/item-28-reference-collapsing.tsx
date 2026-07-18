const collapseRules = [
  { inner: "T&", outer: "&", formed: "T& &", result: "T&" },
  { inner: "T&", outer: "&&", formed: "T& &&", result: "T&" },
  { inner: "T&&", outer: "&", formed: "T&& &", result: "T&" },
  { inner: "T&&", outer: "&&", formed: "T&& &&", result: "T&&" },
] as const;

export function EmcppReferenceCollapseRuleMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="四种引用组合只有右值引用加右值引用保留右值引用其余均折叠为左值引用的规则图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {collapseRules.map((rule, index) => (
            <section
              key={rule.formed}
              className={`min-h-40 border p-4 ${
                index === 3
                  ? "border-emerald-500/35 bg-emerald-500/10"
                  : "border-amber-500/35 bg-amber-500/10"
              }`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <code className="mt-3 block text-sm text-accent">
                {rule.formed}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                inner {rule.inner} + outer {rule.outer}
              </p>
              <strong className="mt-3 block text-sm text-primary">
                → {rule.result}
              </strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        lvalue reference wins：组合中只要出现一个 &，结果就是 &；只有 && + &&
        仍是 &&。
      </figcaption>
    </figure>
  );
}

const deductionPaths = [
  {
    argument: "Widget lvalue",
    deduced: "T = Widget&",
    substitute: "T&& = Widget& &&",
    collapse: "Widget&",
  },
  {
    argument: "const Widget lvalue",
    deduced: "T = const Widget&",
    substitute: "T&& = const Widget& &&",
    collapse: "const Widget&",
  },
  {
    argument: "Widget rvalue",
    deduced: "T = Widget",
    substitute: "T&& = Widget&&",
    collapse: "Widget&&",
  },
] as const;

export function EmcppForwardingDeductionCollapseFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Widget 左值 const 左值和右值经过 T 推导 T 双右值引用替换及引用折叠得到最终参数类型的流程图"
          className="space-y-3"
        >
          {deductionPaths.map((path, index) => (
            <section
              key={path.argument}
              className="grid gap-3 border border-sky-500/30 bg-sky-500/10 p-4 md:grid-cols-[0.9fr_1fr_1.2fr_0.8fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {path.argument}
              </strong>
              <code className="text-xs text-accent">{path.deduced}</code>
              <code className="text-xs text-accent">{path.substitute}</code>
              <strong className="text-xs text-primary">
                → {path.collapse}
              </strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        forwarding reference 同时依赖特殊的 lvalue deduction
        规则和引用折叠；二者缺一不可。
      </figcaption>
    </figure>
  );
}

const contexts = [
  {
    context: "Template instantiation",
    source: "template<class T> f(T&&)",
    formed: "substitute deduced T",
    example: "T=Widget& → Widget&",
  },
  {
    context: "auto deduction",
    source: "auto&& value = expr",
    formed: "auto follows forwarding rules",
    example: "lvalue expr → Widget&",
  },
  {
    context: "typedef / using",
    source: "using R = Widget&&",
    formed: "apply another reference",
    example: "R& → Widget&",
  },
  {
    context: "decltype",
    source: "decltype(expr)&&",
    formed: "decltype yields a reference",
    example: "decltype((w))&& → Widget&",
  },
] as const;

export function EmcppReferenceCollapsingContextMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="引用折叠发生在模板实例化 auto 推导 typedef using 别名和 decltype 四类上下文的地图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {contexts.map((item, index) => (
            <section
              key={item.context}
              className="border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.context}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {item.source}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.formed}</p>
              <code className="mt-2 block text-xs text-primary">
                {item.example}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        只要语言机制先形成“引用的引用”，同一套 collapse rules
        就会把它规范成合法类型。
      </figcaption>
    </figure>
  );
}
