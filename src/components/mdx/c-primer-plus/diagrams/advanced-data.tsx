const contracts = [
  ["Own", "root -> reachable nodes", "head、front或root是所有权入口；插入失败不改结构，删除先重连再释放，销毁后清空入口"],
  ["Invariant", "empty / singleton / many", "队列空时front和rear同时为空，单节点时二者相等；树节点左侧键小、右侧键大"],
  ["Cost", "representation chooses tradeoff", "数组随机访问快但中间移动贵；链式结构定位慢，已知连接点后的局部修改可为常数时间"],
  ["Release", "postorder or saved next", "链表释放前保存next，树用后序先销毁子树；每个成功分配节点恰好释放一次"],
] as const;

export function CPrimerDataStructureContractDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第十七章链表队列树的所有权不变量复杂度和释放契约"
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
        Chapter 17 的数据结构契约：先确定所有权根和空结构不变量，再核对表示复杂度，最后证明所有节点都有唯一释放路径。
      </figcaption>
    </figure>
  );
}
