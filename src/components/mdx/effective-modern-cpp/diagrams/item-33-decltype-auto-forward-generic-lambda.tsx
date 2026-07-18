const desugaringRows = [
  {
    lambda: "[](auto&& value)",
    generated: "template<class T> operator()(T&& value)",
    role: "value is a forwarding reference",
  },
  {
    lambda: "decltype(value)",
    generated: "the declared parameter type T&&",
    role: "records collapsed reference type",
  },
  {
    lambda: "std::forward<decltype(value)>(value)",
    generated: "std::forward<T&&>(value)",
    role: "restores the caller category",
  },
] as const;

export function EmcppGenericLambdaDesugaringMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="泛型 lambda 的 auto 双右值引用参数 decltype 和 std forward 分别对应生成闭包类模板调用运算符中的类型结构图"
          className="space-y-3"
        >
          {desugaringRows.map((item, index) => (
            <section
              key={item.lambda}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[1fr_1.4fr_1fr] md:items-center"
            >
              <code className="break-words text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {item.lambda}
              </code>
              <code className="break-words text-xs text-primary">
                → {item.generated}
              </code>
              <span className="text-xs text-secondary">{item.role}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        generic lambda 没有可写出的 T；decltype(parameter) 从生成的 call
        operator 参数中取回 forwarding 所需类型。
      </figcaption>
    </figure>
  );
}

const forwardingRows = [
  {
    caller: "Widget lvalue",
    parameter: "Widget&",
    decltypeResult: "decltype(value) = Widget&",
    forwarded: "Widget& (lvalue)",
  },
  {
    caller: "const Widget lvalue",
    parameter: "const Widget&",
    decltypeResult: "decltype(value) = const Widget&",
    forwarded: "const Widget& (lvalue)",
  },
  {
    caller: "Widget rvalue",
    parameter: "Widget&&",
    decltypeResult: "decltype(value) = Widget&&",
    forwarded: "Widget&& (rvalue)",
  },
] as const;

export function EmcppDecltypeForwardingProofMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Widget 左值 const 左值和右值经过 auto 双右值引用参数类型 decltype 结果及 std forward 后类别的证明表"
          className="space-y-3"
        >
          {forwardingRows.map((item, index) => (
            <section
              key={item.caller}
              className="grid gap-3 border border-amber-500/35 bg-amber-500/10 p-4 md:grid-cols-[0.8fr_0.8fr_1.2fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.caller}
              </strong>
              <code className="text-xs text-accent">{item.parameter}</code>
              <code className="break-words text-xs text-accent">
                {item.decltypeResult}
              </code>
              <strong className="text-xs text-primary">
                → {item.forwarded}
              </strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        decltype 对未加括号的 parameter name 返回声明类型；引用折叠使 forward
        的返回类型与调用者 category 一致。
      </figcaption>
    </figure>
  );
}

const packSteps = [
  {
    phase: "Receive",
    code: "auto&&... args",
    detail: "deduce each argument independently",
  },
  {
    phase: "Recover types",
    code: "decltype(args)...",
    detail: "preserve each collapsed parameter type",
  },
  {
    phase: "Forward",
    code: "std::forward<decltype(args)>(args)...",
    detail: "expand one forward expression per argument",
  },
  {
    phase: "Invoke",
    code: "target(forwarded pack)",
    detail: "retain mixed lvalue/rvalue categories",
  },
] as const;

export function EmcppVariadicGenericForwardingFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="可变参数泛型 lambda 从 auto 双右值引用参数包恢复每个 decltype 并逐项 std forward 展开的流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {packSteps.map((item, index) => (
            <section
              key={item.phase}
              className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.phase}
              </strong>
              <code className="mt-3 block break-words text-xs text-accent">
                {item.code}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        parameter pack 中每个 argument 都有独立 category；decltype 与 forward
        必须在 pack expansion 内逐项配对。
      </figcaption>
    </figure>
  );
}
