const contracts = [
  ["Layout", "declaration order + padding", "成员地址遵循声明顺序，但实现可为对齐插入内部与尾部填充；sizeof 不是字段大小简单求和"],
  ["Access", "object.member / pointer->member", "点号要求结构或联合对象，箭头要求有效指针；指向结构不等于指向第一个成员的类型"],
  ["Transfer", "copy value or borrow pointer", "结构体可赋值、传值和返回，语义上复制成员；指针接口另行表达可空性、生存期和const修改权限"],
  ["Variant", "enum tag + union payload", "联合体复用存储但不记录当前含义；每次读取前先用判别枚举确认活跃成员"],
] as const;

export function CPrimerAggregateContractDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第十四章结构体布局成员访问值传递和带标签联合体契约"
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
        Chapter 14 的聚合类型检查表：布局不猜偏移，访问匹配左值类型，传递明确复制或借用，联合体读取服从判别标签。
      </figcaption>
    </figure>
  );
}
