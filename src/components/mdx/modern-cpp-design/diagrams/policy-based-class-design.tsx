const failureRows = [
  {
    design: "Do-it-all interface",
    shape: "Create(kind) + flags + branches",
    pressure: "每加一种行为，所有调用者和实现都理解更多状态",
    result: "closed combination set",
  },
  {
    design: "Inheritance matrix",
    shape: "Creator x Lifetime x Locking",
    pressure: "正交维度被编码成派生类笛卡尔积",
    result: "class explosion",
  },
  {
    design: "Runtime strategy",
    shape: "interface pointer + virtual call",
    pressure: "能运行时替换，但对象、间接调用与生命周期进入成本模型",
    result: "dynamic flexibility",
  },
] as const;

export function McdPolicyFailureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="万能接口、继承矩阵和运行时策略在多设计维度下的压力比较"
          className="grid gap-3 lg:grid-cols-3"
        >
          {failureRows.map((row, index) => (
            <section
              key={row.design}
              className="min-h-64 border border-rose-500/35 bg-rose-500/10 p-4"
            >
              <span className="text-xs text-secondary">failure 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.design}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.shape}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.pressure}</p>
              <span className="mt-5 block border-t border-border pt-3 text-xs text-primary">
                {row.result}
              </span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        问题不是“继承一定错误”，而是多个独立变化轴被压进一个接口或一棵类树后，组合成本失控。
      </figcaption>
    </figure>
  );
}

const policyAxes = [
  { axis: "Creation", options: "OpNewCreator | MallocCreator | PrototypeCreator", tone: "border-cyan-500/35 bg-cyan-500/10" },
  { axis: "Lifetime", options: "DefaultLifetime | PhoenixLifetime | LongevityLifetime", tone: "border-violet-500/35 bg-violet-500/10" },
  { axis: "Threading", options: "SingleThreaded | ObjectLevelLockable | ClassLevelLockable", tone: "border-amber-500/35 bg-amber-500/10" },
] as const;

export function McdPolicyCompositionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="三个策略轴注入 Host 模板并形成一个具体类型的组合图" className="space-y-3">
          <div className="grid gap-3 lg:grid-cols-3">
            {policyAxes.map((row) => (
              <section key={row.axis} className={`min-h-40 border p-4 ${row.tone}`}>
                <strong className="text-sm text-primary">{row.axis} policy</strong>
                <code className="mt-3 block break-words text-xs text-accent">{row.options}</code>
              </section>
            ))}
          </div>
          <div className="text-center text-xl text-accent" aria-hidden="true">↓</div>
          <section className="border border-emerald-500/35 bg-emerald-500/10 p-4 text-center">
            <strong className="block text-sm text-primary">Host&lt;Creation, Lifetime, Threading&gt;</strong>
            <code className="mt-3 block break-words text-xs text-accent">
              WidgetManager&lt;PrototypeCreator, PhoenixLifetime, ObjectLevelLockable&gt;
            </code>
            <span className="mt-3 block text-xs text-secondary">一个组合就是一个静态类型；调用点可内联，非法组合可在编译期拒绝</span>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个 Policy 只拥有一个变化轴，Host 负责协议和编排；组合空间扩大时，无需同步扩张派生类层次。
      </figcaption>
    </figure>
  );
}

const decompositionChecks = [
  { question: "会独立变化吗？", yes: "候选 policy axis", no: "保留为 Host invariant" },
  { question: "需要运行时切换吗？", yes: "type erasure / virtual strategy", no: "compile-time policy" },
  { question: "接口契约能写清吗？", yes: "concept/static assertion", no: "重新划分责任" },
  { question: "两个策略彼此偷看吗？", yes: "不兼容或并非正交", no: "可自由组合" },
] as const;

export function McdPolicyDecompositionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="把类分解为策略时从变化、切换时机、协议和兼容性逐项判断的决策图" className="grid gap-3 sm:grid-cols-2">
          {decompositionChecks.map((row, index) => (
            <section key={row.question} className="min-h-48 border border-sky-500/30 bg-sky-500/10 p-4">
              <span className="text-xs text-secondary">check 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.question}</strong>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <span className="border border-emerald-500/30 bg-emerald-500/10 p-2 text-primary">YES · {row.yes}</span>
                <span className="border border-rose-500/30 bg-rose-500/10 p-2 text-primary">NO · {row.no}</span>
              </div>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Policy 分解先识别变化时机和依赖，再写协议；模板参数数量不是目标，正交且可验证的责任边界才是目标。
      </figcaption>
    </figure>
  );
}
