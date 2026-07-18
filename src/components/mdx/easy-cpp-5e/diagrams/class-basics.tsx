const boundaryRows = [
  { zone: "public API", members: "set(value), get()", responsibility: "validate + expose behavior" },
  { zone: "private state", members: "int value_", responsibility: "representation hidden" },
  { zone: "invariant", members: "0 <= value_ <= 100", responsibility: "always true at boundary" },
] as const;

export function EcpClassBasicsBoundaryMap() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="Score 类的公开接口、私有状态和不变量三层封装边界" className="grid gap-3 lg:grid-cols-3">{boundaryRows.map((row,index)=><section key={row.zone} className="min-h-52 border border-sky-500/30 bg-sky-500/10 p-4"><span className="text-xs text-secondary">layer 0{index+1}</span><strong className="mt-2 block text-sm text-primary">{row.zone}</strong><code className="mt-4 block break-words text-xs text-accent">{row.members}</code><span className="mt-4 block text-xs text-secondary">{row.responsibility}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">调用者依赖行为，私有状态承载表示，不变量连接两者并约束每个公开入口。</figcaption></figure>;
}

const messageStages = [
  { stage: "call", detail: "math.set(95)", object: "math" },
  { stage: "bind", detail: "this = &math", object: "current object" },
  { stage: "validate", detail: "0 <= 95 <= 100", object: "parameter" },
  { stage: "write", detail: "math.value_ = 95", object: "private member" },
] as const;

export function EcpClassBasicsMessageFlow() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="math.set 调用从选择对象、绑定 this、验证参数到写入私有成员的流程" className="grid gap-2 sm:grid-cols-4">{messageStages.map((row,index)=><section key={row.stage} className="min-h-44 border border-violet-500/30 bg-violet-500/10 p-3"><span className="text-xs text-secondary">0{index+1} · {row.stage}</span><code className="mt-3 block break-words text-xs text-accent">{row.detail}</code><strong className="mt-4 block text-xs text-primary">{row.object}</strong></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">成员调用先确定当前对象，方法再在该对象的私有状态上维护契约。</figcaption></figure>;
}

const invariantTrials = [
  { input: "-1", expected: "0", invariant: "holds" },
  { input: "0", expected: "0", invariant: "holds" },
  { input: "100", expected: "100", invariant: "holds" },
  { input: "101", expected: "100", invariant: "holds" },
] as const;

export function EcpClassBasicsInvariantLab() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="Score 类对负一、零、一百和一百零一输入的公开接口边界实验" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{invariantTrials.map((trial,index)=><section key={trial.input} className="min-h-44 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block text-lg text-accent">set({trial.input})</code><strong className="mt-3 block text-xs text-primary">get() = {trial.expected}</strong><span className="mt-3 block text-xs text-secondary">invariant {trial.invariant}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">从公开入口测试阈值两侧，证明每次稳定状态都满足 0 到 100，而不依赖私有表示。</figcaption></figure>;
}
