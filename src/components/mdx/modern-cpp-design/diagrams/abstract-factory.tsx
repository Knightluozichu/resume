const familyRows = [
  { family: "Desktop", products: "DesktopButton · DesktopMenu · DesktopDialog", invariant: "same interaction/theme contract" },
  { family: "Touch", products: "TouchButton · TouchMenu · TouchDialog", invariant: "gesture + size contract" },
  { family: "Test", products: "FakeButton · FakeMenu · FakeDialog", invariant: "deterministic observation" },
] as const;

export function McdProductFamilyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Desktop Touch Test 三个相容产品族分别包含 Button Menu Dialog 的矩阵" className="grid gap-3 lg:grid-cols-3">
          {familyRows.map((row, index) => (
            <section key={row.family} className="min-h-60 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">family 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.family}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.products}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.invariant}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Abstract Factory 的原子选择单位是 product family；混入另一行会破坏跨产品一致性。
      </figcaption>
    </figure>
  );
}

const generationRows = [
  { stage: "ProductList", form: "TypeList<Button, Menu, Dialog>", output: "family schema" },
  { stage: "GenScatterHierarchy", form: "AbstractCreator<Button> + ...", output: "one virtual Make per product" },
  { stage: "ConcreteFactory", form: "OpNewFactoryUnit<Concrete>", output: "family-specific implementations" },
  { stage: "Client", form: "Create<Button>()", output: "abstract owner" },
] as const;

export function McdAbstractFactoryGenerationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Typelist 经散射层次生成抽象创建接口再由 ConcreteFactory 实现的四阶段流程" className="grid gap-3 lg:grid-cols-4">
          {generationRows.map((row, index) => (
            <section key={row.stage} className="relative min-h-64 border border-violet-500/35 bg-violet-500/10 p-4">
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.stage}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.form}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.output}</p>
              {index < generationRows.length - 1 ? <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden text-accent lg:block">→</span> : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ProductList 是单一 schema；接口与实现层次由它生成，新增产品不会要求手写两套平行 virtual declarations。
      </figcaption>
    </figure>
  );
}

const prototypeRows = [
  { state: "prototype slots", content: "Button* · Menu* · Dialog*", concern: "ownership and completeness" },
  { state: "Create<T>", content: "locate prototype T", concern: "missing prototype policy" },
  { state: "clone", content: "preserve dynamic concrete type/state", concern: "deep-copy semantics" },
  { state: "replace prototype", content: "new family configuration", concern: "atomic family consistency" },
] as const;

export function McdPrototypeFactoryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Prototype Abstract Factory 保存每种抽象产品样板并按类型克隆与替换的状态流" className="space-y-3">
          {prototypeRows.map((row, index) => (
            <section key={row.state} className="grid min-h-36 gap-3 border border-emerald-500/35 bg-emerald-500/10 p-4 md:grid-cols-[0.9fr_1.3fr_1.4fr] md:items-center">
              <strong className="text-xs text-primary">0{index + 1} · {row.state}</strong>
              <code className="break-words text-xs text-accent">{row.content}</code>
              <span className="text-xs text-secondary">{row.concern}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Prototype implementation 将“concrete class 写死在 factory type”改为“concrete state 装入 prototype slots”，因此可在运行时配置整族。
      </figcaption>
    </figure>
  );
}
