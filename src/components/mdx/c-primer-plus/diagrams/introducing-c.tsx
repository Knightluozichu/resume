const parts = [
  ["Declarations", "headers + prototypes", "每个翻译单元先知道名字与类型"],
  ["Definitions", "objects + function bodies", "一个外部名字通常只提供一个定义"],
  ["Translation", "each .c -> object file", "源文件分别检查并生成目标代码"],
  ["Link", "objects + libraries -> program", "解析跨文件符号并生成可执行文件"],
] as const;

export function CPrimerIntroducingCDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C Primer Plus第二章声明定义独立翻译和链接程序结构" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {parts.map(([title, code, meaning], index) => (
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
        Chapter 2 的结构契约：声明供编译检查，定义提供实体，独立翻译后由链接器解析跨文件引用。
      </figcaption>
    </figure>
  );
}
