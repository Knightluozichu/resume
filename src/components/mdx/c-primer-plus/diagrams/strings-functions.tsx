const contracts = [
  ["Represent", "bytes + terminating NUL", "容量、当前长度和终止符是三个不同事实；库函数只看终止符，不知道目标容量"],
  ["Read", "fgets -> newline or truncation", "成功读取后检查是否包含换行；没有换行可能是文件末尾，也可能是当前记录被截断"],
  ["Transform", "array of char pointers", "排序字符串列表通常只交换指针；比较器接收指向数组元素的指针，再调用 strcmp"],
  ["Parse", "strtol + endptr + range", "先清 errno，再检查是否消费字符、尾部是否合法和结果是否超出目标整数范围"],
] as const;

export function CPrimerStringBoundaryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第十一章字符串终止读行截断指针排序和strtol解析边界"
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
        Chapter 11 的字符串边界：终止符界定内容，读行识别截断，排序移动指针，数值转换验证完整输入与范围。
      </figcaption>
    </figure>
  );
}
