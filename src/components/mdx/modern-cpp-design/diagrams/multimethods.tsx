const problemRows = [
  { lhs: "Ship", rhs: "Asteroid", action: "damage hull + split asteroid", order: "symmetric? domain decides" },
  { lhs: "Ship", rhs: "Station", action: "dock or reject", order: "asymmetric roles" },
  { lhs: "Asteroid", rhs: "Asteroid", action: "merge/fracture", order: "symmetric" },
] as const;

export function McdMultimethodProblemMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Ship Asteroid Station 两个动态对象组合选择不同碰撞操作以及是否对称" className="grid gap-3 lg:grid-cols-3">
          {problemRows.map((row, index) => (
            <section key={`${row.lhs}-${row.rhs}`} className="min-h-60 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">pair 0{index + 1}</span>
              <code className="mt-2 block break-words text-xs text-accent">({row.lhs}, {row.rhs})</code>
              <strong className="mt-4 block text-xs text-primary">{row.action}</strong>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.order}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Multimethod 的 dispatch key 是动态类型 tuple；是否把 (A,B) 与 (B,A) 合并由 operation symmetry 决定。
      </figcaption>
    </figure>
  );
}

const strategyRows = [
  { strategy: "Brute-force casts", lookup: "nested type tests", update: "edit central chain", cost: "up to O(N²) tests" },
  { strategy: "Logarithmic dispatcher", lookup: "ordered pair map", update: "register handler", cost: "O(log M) + indirect call" },
  { strategy: "Fast matrix/hash", lookup: "dense index or hash pair", update: "register/index types", cost: "expected O(1), more state" },
] as const;

export function McdDispatcherStrategyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="暴力类型测试、对数 map dispatcher 和常数时间矩阵哈希 dispatcher 比较" className="grid gap-3 lg:grid-cols-3">
          {strategyRows.map((row, index) => (
            <section key={row.strategy} className="min-h-64 border border-violet-500/35 bg-violet-500/10 p-4">
              <span className="text-xs text-secondary">engine 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.strategy}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.lookup}</code>
              <span className="mt-4 block text-xs text-primary">extend · {row.update}</span>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.cost}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        查找复杂度只是一个维度；registration、unknown pair、code unload、cast safety 与 operation cost 同样决定引擎选择。
      </figcaption>
    </figure>
  );
}

const safetyRows = [
  { step: "Canonicalize", action: "if symmetric, order type IDs", proof: "one handler covers (A,B)/(B,A)" },
  { step: "Lookup", action: "find exact registered pair", proof: "no fallback cast guesses" },
  { step: "Convert", action: "dynamic_cast in checked adapter", proof: "key/object agreement verified" },
  { step: "Invoke", action: "Functor(A&, B&)", proof: "typed operation sees correct roles" },
] as const;

export function McdDispatcherSafetyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="对称类型对规范化、精确查找、受检转换和 typed Functor 调用四阶段安全链" className="grid gap-3 lg:grid-cols-4">
          {safetyRows.map((row, index) => (
            <section key={row.step} className="relative min-h-64 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">gate 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.step}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.action}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.proof}</p>
              {index < safetyRows.length - 1 ? <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden text-accent lg:block">→</span> : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        static_cast 只能在 registry invariant 已证明时使用；checked adapter 把 type-key mismatch 变成明确错误而非 undefined behavior。
      </figcaption>
    </figure>
  );
}
