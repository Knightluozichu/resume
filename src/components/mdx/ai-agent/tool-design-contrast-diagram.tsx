const ROWS = [
  {
    label: "描述清晰度",
    bad: "`run_task`：执行一些操作",
    good: "`search_docs`：只搜索公开文档，不读取本地文件",
  },
  {
    label: "参数粒度",
    bad: "`payload: string` 让模型自己拼一整坨文本",
    good: "`query` / `limit` / `source` 分开校验",
  },
  {
    label: "错误信息",
    bad: "失败就抛异常，主循环断掉",
    good: "`{ok:false, error:{code,message}}` 回灌",
  },
  {
    label: "权限边界",
    bad: "能读写所有路径、能执行任意命令",
    good: "白名单路径、只读默认、危险操作先确认",
  },
] as const;

export function AaToolDesignContrastDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <p className="mb-4 text-sm font-semibold text-primary">
          好工具 vs 坏工具：模型看到的不是函数源码，而是这份说明书
        </p>
        <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
          <section className="rounded-card border border-border bg-bg p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-warning" />
              <h3 className="text-sm font-semibold text-primary">
                坏工具：像万能电话
              </h3>
            </div>
            <div className="space-y-3">
              {ROWS.map((row) => (
                <div
                  key={row.label}
                  className="rounded-control border border-border p-3"
                >
                  <p className="text-xs font-semibold text-warning">
                    {row.label}
                  </p>
                  <p className="mt-1 break-words font-mono text-xs leading-relaxed text-secondary">
                    {row.bad}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-card border border-accent bg-bg p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" />
              <h3 className="text-sm font-semibold text-primary">
                好工具：像有标签的专线
              </h3>
            </div>
            <div className="space-y-3">
              {ROWS.map((row) => (
                <div
                  key={row.label}
                  className="rounded-control border border-border p-3"
                >
                  <p className="text-xs font-semibold text-success">
                    {row.label}
                  </p>
                  <p className="mt-1 break-words font-mono text-xs leading-relaxed text-primary">
                    {row.good}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        工具设计越具体，模型越容易选对；权限边界越窄，运行时越容易守住安全线。
      </figcaption>
    </figure>
  );
}
