const typeRows = [
  { declaration: "int age{18}", meaning: "离散整数", operations: "+ - * / %", tone: "border-sky-500/35 bg-sky-500/10" },
  { declaration: "double price{12.5}", meaning: "近似实数", operations: "+ - * /", tone: "border-violet-500/35 bg-violet-500/10" },
  { declaration: "char grade{'A'}", meaning: "字符代码单元", operations: "compare / classify", tone: "border-amber-500/35 bg-amber-500/10" },
  { declaration: "bool ready{true}", meaning: "真假状态", operations: "! && ||", tone: "border-emerald-500/35 bg-emerald-500/10" },
] as const;

export function EcpVariablesTypeStorageMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="四种基础变量声明如何把名字和存储按类型解释为不同领域值" className="grid gap-3 sm:grid-cols-2">
          {typeRows.map((row) => (
            <section key={row.declaration} className={`min-h-44 border p-4 ${row.tone}`}>
              <code className="block break-words text-sm text-accent">{row.declaration}</code>
              <strong className="mt-4 block text-xs text-primary">解释：{row.meaning}</strong>
              <span className="mt-3 block text-xs text-secondary">操作：{row.operations}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类型决定存储中的位如何解释以及哪些操作有意义，变量名只负责在源码中指向该对象。
      </figcaption>
    </figure>
  );
}

const lifecycle = [
  { phase: "声明 + 初始化", state: "int score{0}", guarantee: "生命周期开始且值有效" },
  { phase: "读取", state: "observe score", guarantee: "只读取已建立状态" },
  { phase: "赋值", state: "score = 95", guarantee: "替换已有值" },
  { phase: "离开作用域", state: "object ends", guarantee: "名字不再可见" },
] as const;

export function EcpVariablesInitializationFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="变量从初始化、读取、赋值到离开作用域的有效状态时间线" className="grid gap-2 sm:grid-cols-4">
          {lifecycle.map((item, index) => (
            <section key={item.phase} className="min-h-44 border border-cyan-500/30 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">t{index}</span>
              <strong className="mt-2 block text-sm text-primary">{item.phase}</strong>
              <code className="mt-3 block break-words text-xs text-accent">{item.state}</code>
              <span className="mt-3 block text-xs text-secondary">{item.guarantee}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        初始化与赋值不是同义词：前者开启对象状态，后者只在对象已经存在时替换状态。
      </figcaption>
    </figure>
  );
}

const conversions = [
  { source: "19.75 double", target: "19 int", loss: "fraction .75", verdict: "窄化" },
  { source: "19 int", target: "19.0 double", loss: "none now", verdict: "扩大但不恢复" },
  { source: "0 int", target: "false bool", loss: "all magnitude", verdict: "语义转换" },
] as const;

export function EcpVariablesConversionLab() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="三个变量类型转换实验展示小数丢失、扩大不恢复和整数到布尔的语义变化" className="grid gap-3 lg:grid-cols-3">
          {conversions.map((row, index) => (
            <section key={row.source} className="min-h-52 border border-rose-500/30 bg-rose-500/10 p-4">
              <span className="text-xs text-secondary">trial 0{index + 1}</span>
              <code className="mt-3 block break-words text-xs text-accent">{row.source} → {row.target}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">丢失：{row.loss}</p>
              <strong className="mt-4 block border-t border-border pt-3 text-xs text-primary">{row.verdict}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        转换后的目标值只携带仍被表示的信息；先发生的窄化不会被后续更宽类型撤销。
      </figcaption>
    </figure>
  );
}
