const cells = [80, 92, 76, 88, 95] as const;

export function EcpArraysLayoutMap() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="长度五的 int 数组从下标零到四及尾后位置的连续布局" className="grid grid-cols-6 gap-1">{cells.map((value,index)=><section key={index} className="min-h-32 border border-sky-500/30 bg-sky-500/10 p-2 text-center"><span className="text-xs text-secondary">[{index}]</span><strong className="mt-4 block text-sm text-primary">{value}</strong><code className="mt-3 block text-[11px] text-accent">base + {index}</code></section>)}<section className="min-h-32 border border-dashed border-rose-500/40 bg-rose-500/5 p-2 text-center"><span className="text-xs text-secondary">[5]</span><strong className="mt-4 block text-xs text-primary">one past</strong><code className="mt-3 block text-[11px] text-accent">no element</code></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">数组长度是 5，合法元素只有下标 0 到 4；尾后位置属于遍历边界而非第六个元素。</figcaption></figure>;
}

const gridRows = [["[0][0]","[0][1]","[0][2]"],["[1][0]","[1][1]","[1][2]"]] as const;

export function EcpArraysIndexFlow() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="二行三列数组按行外循环、列内循环访问六个元素的顺序" className="space-y-2">{gridRows.map((row,rowIndex)=><div key={rowIndex} className="grid grid-cols-3 gap-2">{row.map((cell,columnIndex)=><section key={cell} className="min-h-28 border border-violet-500/30 bg-violet-500/10 p-3 text-center"><code className="text-xs text-accent">{cell}</code><strong className="mt-3 block text-sm text-primary">step {rowIndex*3+columnIndex+1}</strong><span className="mt-2 block text-xs text-secondary">row {rowIndex}, col {columnIndex}</span></section>)}</div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">二维数组是数组的数组；每行连续访问三列，再推进到下一行，总计六次。</figcaption></figure>;
}

const bounds = [
  { index: "-1", classification: "before begin", action: "never access" },
  { index: "0", classification: "first element", action: "valid" },
  { index: "4", classification: "last element", action: "valid" },
  { index: "5", classification: "one past end", action: "compare only" },
] as const;

export function EcpArraysBoundsLab() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="长度五数组在下标负一、零、四和五处的边界实验" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{bounds.map((trial,index)=><section key={trial.index} className="min-h-44 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block text-lg text-accent">[{trial.index}]</code><strong className="mt-3 block text-xs text-primary">{trial.classification}</strong><span className="mt-3 block text-xs text-secondary">{trial.action}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">先分类地址相对范围，再决定是否能解引用；sanitizer 用于观察越界诊断，不把未定义行为纳入正常流程。</figcaption></figure>;
}
