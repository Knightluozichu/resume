const recordMembers = [
  { name: "id", type: "int", value: "1001" },
  { name: "name", type: "std::string", value: "Mina" },
  { name: "score", type: "double", value: "92.5" },
] as const;

export function EcpVariousTypesRecordMap() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="Student 结构体同时拥有编号、姓名和分数三个异类成员" className="grid gap-3 lg:grid-cols-3">{recordMembers.map((member,index)=><section key={member.name} className="min-h-48 border border-sky-500/30 bg-sky-500/10 p-4"><span className="text-xs text-secondary">member 0{index+1}</span><code className="mt-2 block text-sm text-accent">{member.type} {member.name}</code><strong className="mt-4 block text-xs text-primary">value: {member.value}</strong><span className="mt-3 block text-xs text-secondary">exists together</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">结构体成员同时存在并共同描述一个实体；成员名承载语义，不依赖位置猜测。</figcaption></figure>;
}

const stateTransitions = [
  { from: "disconnected", event: "connect()", to: "connecting" },
  { from: "connecting", event: "success", to: "connected" },
  { from: "connecting", event: "failure", to: "disconnected" },
  { from: "connected", event: "close()", to: "disconnected" },
] as const;

export function EcpVariousTypesEnumFlow() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="连接枚举的 disconnected、connecting、connected 状态与事件转换" className="grid gap-3 sm:grid-cols-2">{stateTransitions.map((row,index)=><section key={`${row.from}-${row.event}`} className="grid min-h-32 grid-cols-[1fr_auto_1fr] items-center gap-2 border border-violet-500/30 bg-violet-500/10 p-4 text-center"><code className="text-xs text-accent">{row.from}</code><span className="text-xs text-secondary">--{row.event}→</span><code className="text-xs text-accent">{row.to}</code><span className="col-span-3 text-xs text-secondary">transition 0{index+1}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">枚举只定义允许状态集合，状态图进一步定义哪些事件能产生合法转换。</figcaption></figure>;
}

const unionTrials = [
  { action: "write integer=42", active: "integer", read: "integer only" },
  { action: "write real=3.5", active: "real", read: "real only" },
  { action: "read stale integer", active: "real", read: "invalid contract" },
  { action: "tag says int, payload real", active: "mismatch", read: "broken invariant" },
] as const;

export function EcpVariousTypesUnionLab() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="联合体写入整数、写入实数、读取旧成员和标签失配四个活动成员实验" className="grid gap-3 sm:grid-cols-2">{unionTrials.map((trial,index)=><section key={trial.action} className="min-h-44 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{trial.action}</code><strong className="mt-3 block text-xs text-primary">active: {trial.active}</strong><span className="mt-3 block text-xs text-secondary">read: {trial.read}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">联合体存储复用要求跟踪唯一活动成员；标签与 payload 必须原子地保持一致。</figcaption></figure>;
}
