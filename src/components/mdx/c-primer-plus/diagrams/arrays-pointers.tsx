const contracts = [
  ["Extent", "array object owns N elements", "长度属于数组对象，不随退化后的指针传播；下标只能落在零到 N-1"],
  ["Convert", "array expression -> pointer", "多数表达式把数组转换为首元素指针；sizeof 与一元取地址等语境保留数组类型"],
  ["Bound", "same array or one-past", "指针加减和有序比较只能在同一数组及其尾后位置内形成；尾后指针不可解引用"],
  ["Qualify", "const element access", "数组形参会调整为指针，长度必须另传；const 约束函数不能经该参数修改元素"],
] as const;

export function CPrimerArrayPointerContractDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第十章数组长度退化指针边界和const形参契约"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contracts.map(([title, code, meaning], index) => (
            <section key={title} className="min-h-40 border border-border bg-bg/40 p-4">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{title}</strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 10 的数组指针契约：对象持有长度，表达式可能退化，运算受同一数组边界约束，函数接口必须显式携带长度和可修改性。
      </figcaption>
    </figure>
  );
}
