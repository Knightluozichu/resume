const lifecycle = [
  { phase: "storage", state: "memory reserved", invariant: "not yet object" },
  { phase: "member init", state: "declaration order", invariant: "members constructed" },
  { phase: "constructor body", state: "validate / finish", invariant: "publicly usable" },
  { phase: "destructor", state: "release owned resources", invariant: "lifetime ends" },
] as const;

export function EcpClassFeaturesLifecycleFlow() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="对象从存储、成员初始化、构造完成到析构结束的生命周期" className="grid gap-2 sm:grid-cols-4">{lifecycle.map((row,index)=><section key={row.phase} className="min-h-48 border border-sky-500/30 bg-sky-500/10 p-3"><span className="text-xs text-secondary">0{index+1}</span><strong className="mt-2 block text-sm text-primary">{row.phase}</strong><code className="mt-3 block break-words text-xs text-accent">{row.state}</code><span className="mt-3 block text-xs text-secondary">{row.invariant}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">对象只在构造完成到析构开始之间向外提供稳定类不变量，成员初始化先于构造函数体。</figcaption></figure>;
}

const ownershipRows = [
  { scope: "object A", state: "id_=1", access: "this -> A" },
  { scope: "object B", state: "id_=2", access: "this -> B" },
  { scope: "class Ticket", state: "issued_=2", access: "shared static" },
] as const;

export function EcpClassFeaturesOwnershipMap() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="两个 Ticket 对象各自 id 成员与类共享 issued 静态成员的所有权关系" className="grid gap-3 lg:grid-cols-3">{ownershipRows.map((row,index)=><section key={row.scope} className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-4"><span className="text-xs text-secondary">state 0{index+1}</span><strong className="mt-2 block text-sm text-primary">{row.scope}</strong><code className="mt-4 block text-xs text-accent">{row.state}</code><span className="mt-3 block text-xs text-secondary">{row.access}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">this 选择当前实例状态；static 状态不属于任一实例，所有对象与静态函数看到同一实体。</figcaption></figure>;
}

const operatorTrials = [
  { expression: "c = a + b", changes: "c only", returns: "new Point" },
  { expression: "a += b", changes: "a", returns: "Point& to a" },
  { expression: "out << a", changes: "stream", returns: "ostream&" },
  { expression: "copy owning raw pointer", changes: "two owners", returns: "double-delete risk" },
] as const;

export function EcpClassFeaturesOperatorLab() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="加法、复合赋值、流输出和资源拥有者复制的运算符语义实验" className="grid gap-3 sm:grid-cols-2">{operatorTrials.map((trial,index)=><section key={trial.expression} className="min-h-44 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{trial.expression}</code><strong className="mt-3 block text-xs text-primary">changes: {trial.changes}</strong><span className="mt-3 block text-xs text-secondary">returns: {trial.returns}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">运算符的修改对象、返回类型和资源语义必须符合惯例，并由边界实验验证。</figcaption></figure>;
}
