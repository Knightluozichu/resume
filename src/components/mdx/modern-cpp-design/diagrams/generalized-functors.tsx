const commandRows = [
  { source: "free function", legacy: "function pointer", friction: "cannot hold object state" },
  { source: "object + member", legacy: "receiver base + virtual Execute", friction: "one command class per action" },
  { source: "function object", legacy: "template parameter", friction: "callable type leaks into owner" },
] as const;

export function McdCommandRigidityMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="自由函数成员函数与函数对象在传统 Command 表达中的限制比较" className="grid gap-3 lg:grid-cols-3">
          {commandRows.map((row, index) => (
            <section key={row.source} className="min-h-60 border border-rose-500/35 bg-rose-500/10 p-4">
              <span className="text-xs text-secondary">input 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.source}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.legacy}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.friction}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Generalized Functor 固定的是调用签名，不固定 callable 的具体类型与表示。
      </figcaption>
    </figure>
  );
}

const erasureLayers = [
  { layer: "Functor<R, Args...>", owns: "FunctorImpl<R, Args...>*", duty: "public value-like wrapper" },
  { layer: "FunctorImpl interface", owns: "virtual operator() + clone", duty: "erased invocation contract" },
  { layer: "FunctorHandler<F>", owns: "concrete callable F", duty: "forward arguments and preserve state" },
] as const;

export function McdFunctorErasureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Functor 包装器、抽象实现接口和具体 handler 三层类型擦除结构" className="space-y-3">
          {erasureLayers.map((row, index) => (
            <section key={row.layer} className="grid min-h-40 gap-3 border border-violet-500/35 bg-violet-500/10 p-4 md:grid-cols-[1.1fr_1.35fr_1.4fr] md:items-center">
              <strong className="text-sm text-primary">0{index + 1} · {row.layer}</strong>
              <code className="break-words text-xs text-accent">{row.owns}</code>
              <span className="text-xs text-secondary">{row.duty}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        clone 让擦除后的 callable 仍可复制；operator() 让所有来源通过同一签名调用，代价是间接分派和可能的 heap allocation。
      </figcaption>
    </figure>
  );
}

const compositionRows = [
  { operator: "BindFirst", before: "F(A, B) -> R", after: "G(B) -> R", state: "stores A" },
  { operator: "Chain", before: "F() then G()", after: "H()", state: "stores two functors" },
  { operator: "Undo command", before: "do + captured prior state", after: "undo / redo stack", state: "stores reversible intent" },
] as const;

export function McdFunctorCompositionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Functor 绑定首参数、串联请求和构造可撤销命令的组合变化图" className="grid gap-3 lg:grid-cols-3">
          {compositionRows.map((row, index) => (
            <section key={row.operator} className="min-h-64 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">transform 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.operator}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.before}</code>
              <span className="my-3 block text-center text-accent" aria-hidden="true">↓</span>
              <code className="block break-words text-xs text-primary">{row.after}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.state}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Binding 改变签名，chaining 改变执行序列，undo/redo 则要求命令同时保存足够的逆操作状态。
      </figcaption>
    </figure>
  );
}
