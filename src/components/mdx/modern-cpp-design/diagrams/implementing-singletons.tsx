const staticRows = [
  { property: "Identity", namespace: "no object identity", singleton: "exactly one controlled instance" },
  { property: "Construction", namespace: "static initialization rules", singleton: "lazy/eager CreationPolicy" },
  { property: "Destruction", namespace: "translation-unit ordering", singleton: "LifetimePolicy + dead-reference rule" },
  { property: "Substitution", namespace: "hard-coded global functions", singleton: "holder can select policies / instance type" },
] as const;

export function McdStaticVersusSingletonMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="静态数据加函数与受控 Singleton 在身份构造销毁和替换上的差异表" className="space-y-3">
          {staticRows.map((row, index) => (
            <section key={row.property} className="grid min-h-36 gap-3 border border-cyan-500/35 bg-cyan-500/10 p-4 md:grid-cols-[0.7fr_1.25fr_1.4fr] md:items-center">
              <strong className="text-xs text-primary">0{index + 1} · {row.property}</strong>
              <span className="text-xs text-secondary">static · {row.namespace}</span>
              <code className="break-words text-xs text-accent">singleton · {row.singleton}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Singleton 的难点不在 `Instance()` 拼写，而在一个对象的身份、创建、销毁和并发协议。
      </figcaption>
    </figure>
  );
}

const timelineRows = [
  { time: "t0", event: "A constructed", state: "A alive" },
  { time: "t1", event: "B constructed and uses A", state: "A + B alive" },
  { time: "exit 1", event: "A destroyed first", state: "A dead · B alive" },
  { time: "exit 2", event: "B destructor calls A::Instance()", state: "dead reference" },
  { time: "policy", event: "reject | Phoenix | longevity order", state: "explicit consequence" },
] as const;

export function McdDeadReferenceTimelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Singleton A 与 B 构造销毁顺序导致 dead reference 以及三种策略的时间线" className="grid gap-3 lg:grid-cols-5">
          {timelineRows.map((row, index) => (
            <section key={row.time} className={`relative min-h-56 border p-4 ${row.time === "exit 2" ? "border-rose-500/40 bg-rose-500/10" : "border-violet-500/35 bg-violet-500/10"}`}>
              <span className="text-xs text-secondary">{row.time}</span>
              <strong className="mt-3 block text-xs text-primary">{row.event}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.state}</code>
              {index < timelineRows.length - 1 ? <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden text-accent lg:block">→</span> : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Dead reference 是 shutdown dependency 的可观察结果；Phoenix 与 longevity 只是不同语义选择，不是无条件修复。
      </figcaption>
    </figure>
  );
}

const policyRows = [
  { axis: "CreationPolicy", choices: "CreateUsingNew | CreateStatic | CreateUsingMalloc", contract: "create/destroy raw instance" },
  { axis: "LifetimePolicy", choices: "DefaultLifetime | Phoenix | Longevity", contract: "schedule destruction / dead reference" },
  { axis: "ThreadingModel", choices: "SingleThreaded | ClassLevelLockable", contract: "serialize first publication" },
] as const;

export function McdSingletonHolderMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="SingletonHolder 组合创建生命周期和线程三个策略并输出受控实例" className="space-y-3">
          <div className="grid gap-3 lg:grid-cols-3">
            {policyRows.map((row) => (
              <section key={row.axis} className="min-h-48 border border-emerald-500/35 bg-emerald-500/10 p-4">
                <strong className="text-sm text-primary">{row.axis}</strong>
                <code className="mt-3 block break-words text-xs text-accent">{row.choices}</code>
                <p className="mb-0 mt-3 text-xs text-secondary">{row.contract}</p>
              </section>
            ))}
          </div>
          <section className="border border-amber-500/35 bg-amber-500/10 p-4 text-center">
            <code className="text-xs text-accent">SingletonHolder&lt;T, Creation, Lifetime, Threading&gt;::Instance()</code>
            <span className="mt-3 block text-xs text-primary">one policy-selected lifecycle · one published T</span>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Holder 集中唯一性与状态机，Policies 定义变化点；业务类型 T 不应自行复制这套全局生命周期代码。
      </figcaption>
    </figure>
  );
}
