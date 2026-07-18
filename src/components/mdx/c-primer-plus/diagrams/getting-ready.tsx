const foundations = [
  ["Why C", "efficiency + portability + control", "理解语言取舍，不把优点写成绝对保证"],
  ["Standards", "C89 -> C99 -> C11", "区分标准规则、实现定义与扩展"],
  ["Seven steps", "goal -> design -> code -> test", "开发是带反馈的循环"],
  ["Mechanics", "source -> object -> executable", "编译器驱动协调工具链与库"],
] as const;

export function CPrimerGettingReadyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C Primer Plus第一章语言取舍标准编程七步和编译机制总览" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {foundations.map(([title, mechanism, meaning], index) => (
            <section key={title} className="min-h-36 border border-border bg-bg/40 p-4">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{title}</strong>
              <code className="mt-3 block text-xs text-accent">{mechanism}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 1 的四个入口：为什么选择 C、标准如何约束实现、开发如何迭代、源码如何变成程序。
      </figcaption>
    </figure>
  );
}
