const contractRows = [
  { facet: "Inputs", detail: "width, height : double", proof: "types + valid range" },
  { facet: "Output", detail: "area : double", proof: "unit and meaning" },
  { facet: "Side effects", detail: "none", proof: "no caller mutation" },
  { facet: "Failure", detail: "reject negative", proof: "precondition policy" },
] as const;

export function EcpFunctionsContractMap() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="矩形面积函数的输入、输出、副作用与失败契约" className="grid gap-3 sm:grid-cols-2">{contractRows.map((row,index)=><section key={row.facet} className="min-h-40 border border-sky-500/30 bg-sky-500/10 p-4"><span className="text-xs text-secondary">0{index+1}</span><strong className="mt-2 block text-sm text-primary">{row.facet}</strong><code className="mt-3 block break-words text-xs text-accent">{row.detail}</code><span className="mt-3 block text-xs text-secondary">proof: {row.proof}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">签名表达类型边界，契约还要补充合法域、单位、副作用和失败策略。</figcaption></figure>;
}

const parameterRows = [
  { form: "T value", identity: "new local object", caller: "unchanged", use: "small input / own copy" },
  { form: "const T& value", identity: "alias caller object", caller: "read only here", use: "large read-only input" },
  { form: "T& value", identity: "alias caller object", caller: "may change", use: "explicit in-out" },
] as const;

export function EcpFunctionsParameterFlow() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="按值、const 引用和可写引用参数的对象身份及调用者变化对照" className="grid gap-3 lg:grid-cols-3">{parameterRows.map((row,index)=><section key={row.form} className="min-h-52 border border-violet-500/30 bg-violet-500/10 p-4"><span className="text-xs text-secondary">mode 0{index+1}</span><code className="mt-2 block text-sm text-accent">{row.form}</code><strong className="mt-4 block text-xs text-primary">{row.identity}</strong><span className="mt-3 block text-xs text-secondary">caller: {row.caller}</span><span className="mt-2 block text-xs text-secondary">use: {row.use}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">传参形式首先表达对象身份和修改权限，复制成本是建立正确语义后的第二层判断。</figcaption></figure>;
}

const overloadTrials = [
  { call: "maxValue(1, 2)", winner: "int,int", reason: "exact matches" },
  { call: "maxValue(1.0, 2.0)", winner: "double,double", reason: "exact matches" },
  { call: "maxValue(1, 2.0)", winner: "ambiguous", reason: "one conversion each" },
  { call: "missing(1)", winner: "link failure", reason: "declared, no definition" },
] as const;

export function EcpFunctionsOverloadLab() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="四个函数调用实验展示精确重载、二义性和缺失定义" className="grid gap-3 sm:grid-cols-2">{overloadTrials.map((trial,index)=><section key={trial.call} className="min-h-44 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{trial.call}</code><strong className="mt-3 block text-xs text-primary">{trial.winner}</strong><span className="mt-3 block text-xs text-secondary">{trial.reason}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">重载选择发生在编译期，定义可用性最终由链接验证；两种错误属于不同阶段。</figcaption></figure>;
}
