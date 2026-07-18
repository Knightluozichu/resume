const axes = [
  ["Scope", "where the name is visible", "由声明位置和语法上下文决定；块作用域、文件作用域与函数原型作用域不能和生存期混为一谈"],
  ["Linkage", "which declarations share an entity", "无链接、内部链接、外部链接决定不同作用域或翻译单元中的声明是否指向同一实体"],
  ["Duration", "when the object exists", "自动、静态、线程和分配存储期描述对象生存时间，不承诺具体位于机器栈、数据段或堆"],
  ["Ownership", "allocate -> use -> release", "动态块要记录元素数和容量，检查大小乘法，并保证每条退出路径只释放一次"],
] as const;

export function CPrimerStorageOwnershipDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第十二章作用域链接存储期和动态内存所有权四轴模型"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {axes.map(([title, code, meaning], index) => (
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
        Chapter 12 的四轴检查法：名字看作用域与链接，对象看存储期，动态块再看容量、所有权和唯一释放路径。
      </figcaption>
    </figure>
  );
}
