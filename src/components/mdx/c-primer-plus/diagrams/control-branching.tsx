const contracts = [
  ["Partition", "ordered if chain", "条件从上到下检查，先命中的分支决定结果；区间边界必须无缝且不重叠"],
  ["Dispatch", "promoted integer -> case", "switch 控制表达式经整数提升；case 必须是互不重复的整数常量表达式"],
  ["Transfer", "break / continue", "break 离开最内层循环或 switch；continue 只推进最内层循环的下一轮"],
  ["Guard", "safe && dangerous", "&& 和 || 从左到右求值并短路，把合法性检查放在危险操作之前"],
] as const;

export function CPrimerBranchingContractDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第七章条件分区switch分派break continue转移和短路保护四项控制流契约"
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
        Chapter 7 的控制流审查表：分区、分派、转移和短路保护分别回答“走哪条路、从哪跳转、何时离开、什么不能求值”。
      </figcaption>
    </figure>
  );
}
