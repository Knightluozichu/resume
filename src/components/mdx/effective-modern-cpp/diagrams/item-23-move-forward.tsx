const moveStages = [
  ["Named source", "Widget source", "expression is lvalue"],
  ["std::move", "static_cast<Widget&&>", "produces xvalue only"],
  ["Overload set", "copy(const&) / move(&&)", "best viable candidate"],
  ["Operation", "selected function body", "resource may move or copy"],
] as const;

export function EmcppMoveCastPipelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="命名源对象经 std move 转为 xvalue 进入重载集合后才执行复制或移动的流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {moveStages.map(([label, code, detail], index) => (
            <section
              key={label}
              className="min-h-48 border border-sky-500/30 bg-sky-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {code}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        std::move 只改变第 2 阶段的表达式类别；资源行为由第 3/4 阶段的 selected
        overload 决定。
      </figcaption>
    </figure>
  );
}

const forwardRows = [
  {
    caller: "lvalue Widget",
    deduced: "T = Widget&",
    parameter: "Widget& after collapse",
    forwarded: "lvalue",
  },
  {
    caller: "rvalue Widget",
    deduced: "T = Widget",
    parameter: "Widget&&",
    forwarded: "rvalue",
  },
  {
    caller: "const lvalue",
    deduced: "T = const Widget&",
    parameter: "const Widget&",
    forwarded: "const lvalue",
  },
] as const;

export function EmcppForwardConditionalMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="lvalue rvalue 和 const lvalue 经过模板推导引用折叠与 std forward 恢复值类别的条件转换图"
          className="space-y-3"
        >
          {forwardRows.map((row, index) => (
            <section
              key={row.caller}
              className="grid gap-3 border border-emerald-500/30 bg-emerald-500/10 p-4 md:grid-cols-[0.8fr_1fr_1.2fr_0.8fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.caller}
              </strong>
              <code className="text-xs text-accent">{row.deduced}</code>
              <code className="text-xs text-accent">{row.parameter}</code>
              <span className="text-xs text-secondary">
                forward → {row.forwarded}
              </span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        std::forward 不无条件制造 rvalue；它读取 T 中保存的 caller
        category，只恢复原始语义。
      </figcaption>
    </figure>
  );
}

const constPaths = [
  ["const source", "const string text", "cannot be modified"],
  ["move cast", "const string&&", "const preserved"],
  ["move candidate", "string(string&&)", "not viable: drops const"],
  ["copy candidate", "string(const string&)", "viable and selected"],
] as const;

export function EmcppConstRvalueOverloadMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="const string 经 std move 得到 const rvalue 后移动候选不可行并选择复制候选的重载图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {constPaths.map(([label, code, detail], index) => (
            <section
              key={label}
              className={`min-h-48 border p-4 ${index === 3 ? "border-amber-500/35 bg-amber-500/10" : "border-violet-500/30 bg-violet-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        rvalue category 不会覆盖 cv contract；move 通常需要修改 source，因此
        const rvalue 合法但常只能 copy。
      </figcaption>
    </figure>
  );
}
