const systemRows = [
  { layer: "Compile-time design", chapters: "Ch1-3", component: "Policies · traits · type schemas", contract: "compatible combinations + generated interface" },
  { layer: "Runtime substrate", chapters: "Ch4-7", component: "arena · callbacks · lifecycle · owners", contract: "allocation/call/shutdown/resource lifetime" },
  { layer: "Creation boundary", chapters: "Ch8-9", component: "plugin Factory · backend family", contract: "ID/module lease + family consistency" },
  { layer: "Operation dispatch", chapters: "Ch10-11", component: "node Visitor · collision Multimethod", contract: "element/pair coverage + unknown behavior" },
] as const;

export function McdIntegratedSceneSystemMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="十一章映射到插件式场景系统的编译期设计运行时基座创建边界和操作分派四层架构" className="space-y-3">
          {systemRows.map((row, index) => (
            <section key={row.layer} className="grid min-h-40 gap-3 border border-cyan-500/35 bg-cyan-500/10 p-4 lg:grid-cols-[0.8fr_0.55fr_1.35fr_1.5fr] lg:items-center">
              <div><span className="text-xs text-secondary">layer 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.layer}</strong></div>
              <code className="text-xs text-accent">{row.chapters}</code>
              <span className="text-xs text-primary">{row.component}</span>
              <span className="text-xs text-secondary">{row.contract}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        11章不是并列模式清单；它们共同形成从 compile-time schema 到 runtime ownership、creation 和 dispatch 的一条系统链。
      </figcaption>
    </figure>
  );
}

const contractRows = [
  { asset: "Type / key", proof: "traits + ProductList + type pair", failure: "wrong handler or family slot" },
  { asset: "Object / resource", proof: "unique/shared owner + deleter", failure: "leak, cycle, cross-module delete" },
  { asset: "Callable / code", proof: "Functor target + module lease", failure: "callback into unloaded plugin" },
  { asset: "Global lifecycle", proof: "explicit startup/shutdown DAG", failure: "dead reference / late access" },
  { asset: "Memory domain", proof: "arena/pool owner + size/alignment", failure: "wrong allocator or stale block" },
] as const;

export function McdContractLedgerMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="类型键对象资源可调用代码全局生命周期和内存域五类契约证据与失败账本" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {contractRows.map((row, index) => (
            <section key={row.asset} className="min-h-72 border border-violet-500/35 bg-violet-500/10 p-4">
              <span className="text-xs text-secondary">ledger 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.asset}</strong>
              <code className="mt-4 block break-words text-xs text-accent">proof · {row.proof}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">failure · {row.failure}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个生成类型、registry entry 和 callback 都要回到 ownership/lifetime evidence；“模板能编译”只覆盖账本的一小部分。
      </figcaption>
    </figure>
  );
}

const releaseRows = [
  { gate: "Semantic fit", pass: "selection time + extension direction match", reject: "template/registry used for fashion" },
  { gate: "Ownership/lifecycle", pass: "owners, shutdown, unload and callbacks proven", reject: "raw aliases or dead references" },
  { gate: "Modern baseline", pass: "standard facility compared first", reject: "reimplement Loki limitations" },
  { gate: "Cost evidence", pass: "compile/binary/runtime/RSS measured", reject: "zero-overhead assumed" },
  { gate: "Evolution", pass: "new type/operation/plugin rehearsal passes", reject: "ABI/schema drift without version" },
] as const;

export function McdModernizationReleaseMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="语义所有权现代基线成本与演进五道 Modern C++ Design 方案发布门" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {releaseRows.map((row, index) => (
            <section key={row.gate} className="min-h-72 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">gate 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.gate}</strong>
              <code className="mt-4 block break-words text-xs text-accent">pass · {row.pass}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">reject · {row.reject}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        现代化不是把所有 Loki 代码重写一遍；只有标准设施不满足且通过五道门的自定义组件才进入生产。
      </figcaption>
    </figure>
  );
}
