const contracts = [
  ["Interface", "prototype -> checked call", "头文件发布函数类型；每个调用点都应在完整原型可见后接受参数与返回类型检查"],
  ["Activation", "arguments -> parameters", "C 只传值；实现为每次调用保存独立状态，但局部对象不保证都物理放在机器栈上"],
  ["Recurse", "base case + progress", "递归的每条路径都要逼近基准；尾调用优化是实现选择，不能作为正确性前提"],
  ["Link", "source -> object -> program", "声明可被多个翻译单元包含，具有外部链接的函数定义通常只能在整个程序中出现一次"],
] as const;

export function CPrimerFunctionContractDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第九章函数原型值传递递归和多翻译单元链接契约"
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
        Chapter 9 的函数契约：原型约束调用，值进入独立调用状态，递归必须收敛，多源文件最终由链接器组成程序。
      </figcaption>
    </figure>
  );
}
