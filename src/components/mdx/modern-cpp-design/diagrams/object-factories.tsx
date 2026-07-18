const creationRows = [
  { approach: "central switch", extension: "edit factory + recompile", coupling: "all products known centrally" },
  { approach: "virtual constructor", extension: "not supported by language", coupling: "type needed before construction" },
  { approach: "registered creator", extension: "add key → callable", coupling: "factory knows only abstract product" },
] as const;

export function McdFactoryNeedMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="中央 switch、虚构造函数和注册 creator 三种运行时对象创建方式比较" className="grid gap-3 lg:grid-cols-3">
          {creationRows.map((row, index) => (
            <section key={row.approach} className="min-h-60 border border-rose-500/35 bg-rose-500/10 p-4">
              <span className="text-xs text-secondary">option 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.approach}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.extension}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.coupling}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Object Factory 把 runtime identifier 映射到 creator，解除中央创建代码对 concrete product 集合的编译期依赖。
      </figcaption>
    </figure>
  );
}

const lifecycleRows = [
  { phase: "Register", input: "ID + creator", gate: "duplicate policy", output: "registry entry" },
  { phase: "Create", input: "ID", gate: "lookup + unknown policy", output: "owned AbstractProduct" },
  { phase: "Use", input: "abstract interface", gate: "product invariant", output: "business behavior" },
  { phase: "Unregister", input: "ID / plugin", gate: "no in-flight creator", output: "safe code unload" },
] as const;

export function McdFactoryRegistryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="对象工厂注册创建使用和卸载的生命周期以及每阶段守卫" className="grid gap-3 lg:grid-cols-4">
          {lifecycleRows.map((row, index) => (
            <section key={row.phase} className="relative min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">phase 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.phase}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.input}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">gate · {row.gate}</p>
              <span className="mt-3 block text-xs text-primary">{row.output}</span>
              {index < lifecycleRows.length - 1 ? <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden text-accent lg:block">→</span> : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Registry 不止一次 lookup；plugin 场景必须把 creator code lifetime 与已创建 objects 的 lifetime 纳入卸载协议。
      </figcaption>
    </figure>
  );
}

const cloneRows = [
  { input: "prototype type/index", action: "lookup prototype", result: "prototype.clone()", risk: "slicing / clone contract" },
  { input: "source object", action: "dynamic type key", result: "registered copier(source)", risk: "RTTI/module boundary" },
  { input: "serialized schema ID", action: "lookup creator + decode", result: "new owned object", risk: "version/security validation" },
] as const;

export function McdCloneFactoryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Prototype clone、源对象动态类型复制与 schema 反序列化三类工厂流程比较" className="grid gap-3 lg:grid-cols-3">
          {cloneRows.map((row, index) => (
            <section key={row.input} className="min-h-64 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">flow 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.input}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.action} → {row.result}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">risk · {row.risk}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CloneFactory 用已有对象或 prototype 定义 construction state；普通 Factory 只凭 identifier 创建默认/参数化实例。
      </figcaption>
    </figure>
  );
}
