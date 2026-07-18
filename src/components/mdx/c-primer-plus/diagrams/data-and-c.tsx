const checks = [
  ["Integer model", "CHAR_BIT + limits.h", "标准给下限与顺序，实现选择具体宽度"],
  ["Portable widths", "stdint.h + inttypes.h", "用可选定宽类型和匹配格式宏表达协议"],
  ["Floating model", "float.h", "查询有效数字、指数范围与舍入特征"],
  ["Runtime boundary", "complex.h + fflush", "复数运算和输出时机都遵守库契约"],
] as const;

export function CPrimerDataModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C Primer Plus第三章整数可移植类型浮点模型复数和输出刷新检查图" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {checks.map(([title, api, meaning], index) => (
            <section key={title} className="min-h-36 border border-border bg-bg/40 p-4">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{title}</strong>
              <code className="mt-3 block text-xs text-accent">{api}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 3 不背平台数值：从标准约束出发，用头文件宏和运算符查询当前实现。
      </figcaption>
    </figure>
  );
}
