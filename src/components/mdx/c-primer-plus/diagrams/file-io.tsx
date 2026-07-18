const states = [
  ["Open", "fopen -> FILE or null", "模式决定允许的方向、是否截断与是否追加；失败时先保留 errno 再报告路径上下文"],
  ["Transfer", "return value owns truth", "读写循环由本次函数返回值驱动；短读短写后再用 feof 和 ferror 区分结束原因"],
  ["Position", "flush / seek between modes", "更新流在读写方向切换时遵守刷新或定位规则；成功定位还会清除流的EOF状态"],
  ["Close", "fclose result is part of write", "缓冲输出可能到刷新或关闭才失败；只有检查 fclose，才能确认最后一批数据是否提交"],
] as const;

export function CPrimerFileIOStateDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第十三章文件流打开传输定位和关闭状态机"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {states.map(([title, code, meaning], index) => (
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
        Chapter 13 的流状态机：打开建立模式，传输检查计数，方向切换先同步位置，关闭结果完成最后一次错误检查。
      </figcaption>
    </figure>
  );
}
