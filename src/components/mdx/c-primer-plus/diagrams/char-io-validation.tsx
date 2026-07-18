const boundaries = [
  ["Stream", "stdin / stdout / stderr", "程序读写抽象字节流；文件、终端和管道由运行环境连接到这些流"],
  ["Observe", "int ch = getchar()", "int 同时表示全部 unsigned char 值与负值 EOF；再用 feof 或 ferror 区分原因"],
  ["Validate", "conversion count + domain", "先检查格式转换是否成功，再检查数值范围；失败数据不能进入业务分支"],
  ["Recover", "discard until NL or EOF", "清理当前记录时必须同时识别换行和 EOF，否则输入结束会让重试循环失控"],
] as const;

export function CPrimerCharacterIOBoundaryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第八章标准流字符读取输入验证和EOF恢复边界"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {boundaries.map(([title, code, meaning], index) => (
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
        Chapter 8 的输入边界：识别流来源、保留 EOF、分层验证，并让错误恢复在换行或输入结束处可靠停止。
      </figcaption>
    </figure>
  );
}
