const policyRows = [
  { axis: "Storage", choices: "Default | Array | custom handle", owns: "pointer representation + destroy primitive" },
  { axis: "Ownership", choices: "DeepCopy | RefCounted | RefLinked | NoCopy", owns: "copy/release/share semantics" },
  { axis: "Conversion", choices: "allow | disallow raw conversion", owns: "boundary permeability" },
  { axis: "Checking", choices: "NoCheck | Assert | RejectNull", owns: "dereference precondition" },
] as const;

export function McdSmartPointerPolicyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="SmartPtr 存储所有权转换和检查四个正交策略轴及其职责" className="grid gap-3 sm:grid-cols-2">
          {policyRows.map((row, index) => (
            <section key={row.axis} className="min-h-52 border border-violet-500/35 bg-violet-500/10 p-4">
              <span className="text-xs text-secondary">axis 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.axis}Policy</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.choices}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.owns}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Policy matrix 把表示、所有权、边界转换与错误检查分开；每个组合仍必须满足共同 handle/lifetime contract。
      </figcaption>
    </figure>
  );
}

const ownershipRows = [
  { policy: "DeepCopy", copy: "clone pointee", release: "delete own clone", alias: "no shared identity" },
  { policy: "RefCounted", copy: "increment count", release: "decrement; delete at zero", alias: "shared control state" },
  { policy: "RefLinked", copy: "insert owner into ring", release: "unlink; delete last", alias: "owners form intrusive list" },
  { policy: "NoCopy / move", copy: "forbidden; transfer explicitly", release: "delete sole resource", alias: "unique identity" },
] as const;

export function McdOwnershipTransitionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="DeepCopy RefCounted RefLinked 和唯一所有权在复制释放与别名方面的状态比较" className="space-y-3">
          {ownershipRows.map((row, index) => (
            <section key={row.policy} className="grid min-h-36 gap-3 border border-emerald-500/35 bg-emerald-500/10 p-4 md:grid-cols-[0.9fr_1.15fr_1.35fr_1.2fr] md:items-center">
              <strong className="text-xs text-primary">0{index + 1} · {row.policy}</strong>
              <code className="break-words text-xs text-accent">copy: {row.copy}</code>
              <span className="text-xs text-primary">release: {row.release}</span>
              <span className="text-xs text-secondary">{row.alias}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “Smart” 的核心是 copy/release 对资源身份的语义；同一个 `T*` 可以对应完全不同的所有权协议。
      </figcaption>
    </figure>
  );
}

const boundaryRows = [
  { operation: "operator-> / *", gate: "CheckingPolicy", hazard: "null / dangling dereference", recommendation: "fail by explicit precondition" },
  { operation: "operator T*", gate: "ConversionPolicy", hazard: "ownership silently escapes", recommendation: "prefer explicit get()" },
  { operation: "operator&", gate: "Storage/ownership reset", hazard: "API overwrites live resource", recommendation: "out_ptr-style adapter" },
  { operation: "compare/order", gate: "semantic contract", hazard: "different owners, same address or vice versa", recommendation: "define pointer vs owner ordering" },
] as const;

export function McdSmartPointerBoundaryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="智能指针解引用裸指针转换取地址与比较四个边界的策略检查和风险" className="grid gap-3 sm:grid-cols-2">
          {boundaryRows.map((row, index) => (
            <section key={row.operation} className="min-h-56 border border-amber-500/35 bg-amber-500/10 p-4">
              <span className="text-xs text-secondary">boundary 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.operation}</strong>
              <code className="mt-3 block break-words text-xs text-accent">{row.gate}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">risk · {row.hazard}</p>
              <span className="mt-3 block text-xs text-primary">{row.recommendation}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Dangerous convenience concentrates at API boundaries; operators must not hide ownership transfer or resource overwrite.
      </figcaption>
    </figure>
  );
}
