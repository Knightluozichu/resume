const contracts = [
  ["String extent", "capacity != strlen + 1 always", "数组容量、首个空字符和指针大小分开判断"],
  ["Formatted output", "format matches promoted type", "宽度是最小值，精度含义随转换变化"],
  ["Formatted input", "width + address + return count", "限制写入、传递正确目标、检查成功项数"],
  ["Line input", "fgets + newline check", "区分完整行、长行片段和 EOF"],
] as const;

export function CPrimerStringsIOContractsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C Primer Plus第四章字符串范围格式化输出格式化输入和行输入契约" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contracts.map(([title, code, meaning], index) => (
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
        Chapter 4 的边界检查：容量、格式、目标地址和读取结果必须同时成立。
      </figcaption>
    </figure>
  );
}
