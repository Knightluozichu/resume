const addressNodes = [
  { name: "score", type: "int object", content: "80", location: "0x1000" },
  { name: "pointer", type: "int* object", content: "0x1000", location: "0x2000" },
  { name: "*pointer", type: "int lvalue", content: "alias score", location: "follows 0x1000" },
] as const;

export function EcpPointersAddressMap() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="int 对象、指针对象及解引用别名的地址与内容关系" className="grid gap-3 lg:grid-cols-3">{addressNodes.map((node,index)=><section key={node.name} className="min-h-52 border border-sky-500/30 bg-sky-500/10 p-4"><span className="text-xs text-secondary">node 0{index+1}</span><code className="mt-2 block text-sm text-accent">{node.name}</code><strong className="mt-3 block text-xs text-primary">{node.type}</strong><span className="mt-3 block text-xs text-secondary">content: {node.content}</span><span className="mt-2 block text-xs text-secondary">location: {node.location}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">指针也是对象，有自己的存储；它的内容是目标地址，解引用沿地址访问目标而不复制对象。</figcaption></figure>;
}

const aliasRows = [
  { interface: "void f(int value)", target: "copy", nullable: "no", writeBack: "no" },
  { interface: "void f(int& value)", target: "caller object", nullable: "no", writeBack: "yes" },
  { interface: "bool f(int* value)", target: "optional object", nullable: "yes", writeBack: "after check" },
] as const;

export function EcpPointersAliasFlow() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="按值、引用和指针接口对目标身份、可空性与写回能力的比较" className="grid gap-3 lg:grid-cols-3">{aliasRows.map((row,index)=><section key={row.interface} className="min-h-52 border border-violet-500/30 bg-violet-500/10 p-4"><span className="text-xs text-secondary">contract 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{row.interface}</code><strong className="mt-4 block text-xs text-primary">{row.target}</strong><span className="mt-3 block text-xs text-secondary">nullable: {row.nullable}</span><span className="mt-2 block text-xs text-secondary">write back: {row.writeBack}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">参数形式编码身份、可选性和修改权限；不要只按字符多少选择。</figcaption></figure>;
}

const lifetimeTrials = [
  { path: "new -> use -> delete", state: "released once", verdict: "valid" },
  { path: "new -> return", state: "owner lost", verdict: "leak" },
  { path: "p=q -> delete p -> *q", state: "q dangles", verdict: "use after lifetime" },
  { path: "new[] -> delete", state: "wrong deallocator form", verdict: "undefined" },
] as const;

export function EcpPointersLifetimeLab() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="动态对象正常释放、泄漏、悬空和错误 delete 形式的四个生命周期实验" className="grid gap-3 sm:grid-cols-2">{lifetimeTrials.map((trial,index)=><section key={trial.path} className="min-h-44 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{trial.path}</code><strong className="mt-3 block text-xs text-primary">{trial.verdict}</strong><span className="mt-3 block text-xs text-secondary">{trial.state}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">所有权审计覆盖每条退出路径和每个别名；非空检查不能替代生命周期证明。</figcaption></figure>;
}
