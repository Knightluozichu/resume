const invariants = [
  ["Initialize", "state is valid before first test", "入口条件循环可能一次不执行"],
  ["Guard", "condition matches valid domain", "边界和哨兵不能吞掉正常数据"],
  ["Progress", "every repeated path advances", "continue、失败输入和嵌套路径都要检查"],
  ["Postcondition", "exit reason is observable", "区分正常结束、哨兵、EOF 与格式错误"],
] as const;

export function CPrimerLoopInvariantDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C Primer Plus第六章循环初始化条件进展和退出后置条件" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {invariants.map(([title, code, meaning], index) => (
            <section key={title} className="min-h-36 border border-border bg-bg/40 p-4">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{title}</strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 6 的循环审查表：合法初态、准确守卫、全路径推进、明确退出原因。
      </figcaption>
    </figure>
  );
}
