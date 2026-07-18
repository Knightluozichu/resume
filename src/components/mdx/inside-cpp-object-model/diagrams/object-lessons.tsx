const representationRows = [
  {
    model: "C data abstraction",
    object: "x | y | z",
    lookup: "free function receives Point3d*",
    tradeoff: "no language-level data/function relationship",
  },
  {
    model: "Simple object model",
    object: "one slot per data/function member",
    lookup: "every slot points to external storage",
    tradeoff: "uniform model, heavy indirection and object size",
  },
  {
    model: "Table-driven model",
    object: "data-table ptr | function-table ptr",
    lookup: "member number indexes a table",
    tradeoff: "compact object, every access remains indirect",
  },
  {
    model: "Prevailing C++ model",
    object: "base subobjects | nonstatic data | optional vptr",
    lookup: "fixed offsets plus virtual-table slot",
    tradeoff: "direct common case, runtime choice pays indirection",
  },
] as const;

export function IcoObjectRepresentationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从C数据抽象到简单对象模型表格驱动模型和主流C++对象模型的存储与访问成本比较图"
          className="space-y-3"
        >
          {representationRows.map((row, index) => (
            <section
              key={row.model}
              className="grid min-h-40 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.7fr_1.2fr_1.2fr_1.2fr] md:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  model 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.model}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.object}
              </code>
              <span className="text-xs text-primary">{row.lookup}</span>
              <span className="text-xs text-secondary">{row.tradeoff}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        主流 C++ 模型把常用的 nonstatic data 留在对象内，以固定 offset
        直接访问；只有需要 runtime dispatch 的 virtual member 才进入间接路径。
      </figcaption>
    </figure>
  );
}

const inheritanceLayers = [
  {
    layer: "Base subobject",
    stored: "base nonstatic data + base representation",
    address: "fixed offset for non-virtual base",
    reason: "derived object contains a complete base view",
  },
  {
    layer: "Derived members",
    stored: "declared nonstatic data",
    address: "offset after ABI layout and padding",
    reason: "member function code is not copied into each object",
  },
  {
    layer: "Virtual dispatch",
    stored: "one or more implementation vptr fields",
    address: "vtable slot selected by virtual function",
    reason: "dynamic type chooses the final overrider",
  },
  {
    layer: "Virtual base",
    stored: "one shared base subobject",
    address: "runtime-adjusted implementation offset",
    reason: "diamond paths converge on one base instance",
  },
] as const;

export function IcoInheritanceStorageMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="派生对象中基类子对象派生成员虚分派和虚基类的布局层次图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {inheritanceLayers.map((row, index) => (
            <section
              key={row.layer}
              className="min-h-60 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">layer 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.layer}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.stored}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{row.address}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.reason}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        inheritance 不是把两份完整 class 文本拼起来，而是在一个 most-derived
        object 中安置 base subobject、derived state 与动态分派元数据。
      </figcaption>
    </figure>
  );
}

const pointerViews = [
  {
    expression: "Base* p = &derived",
    staticView: "Base interface and Base data offsets",
    dynamicFact: "complete object is Derived",
    result: "virtual call may select Derived final overrider",
  },
  {
    expression: "p->baseData",
    staticView: "member lookup and access are Base-based",
    dynamicFact: "dynamic type does not redirect data lookup",
    result: "read Base subobject field",
  },
  {
    expression: "p->nonVirtual()",
    staticView: "ordinary function resolved from Base",
    dynamicFact: "runtime identity is irrelevant",
    result: "direct Base call unless optimized otherwise",
  },
  {
    expression: "p->virtualFn()",
    staticView: "slot contract comes from Base",
    dynamicFact: "vptr represents current dynamic type",
    result: "indirect call to final overrider",
  },
] as const;

export function IcoPointerPolymorphismMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="基类指针观察派生对象时静态类型动态类型以及数据非虚函数虚函数决议方式对照图"
          className="space-y-3"
        >
          {pointerViews.map((row, index) => (
            <section
              key={row.expression}
              className="grid min-h-36 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 lg:grid-cols-[0.8fr_1.1fr_1.1fr_1.2fr] lg:items-center"
            >
              <code className="break-words text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {row.expression}
              </code>
              <span className="text-xs text-primary">{row.staticView}</span>
              <span className="text-xs text-primary">{row.dynamicFact}</span>
              <strong className="text-xs text-secondary">{row.result}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        pointer/reference 的 static type 决定可见接口；只有 virtual dispatch
        会在运行期利用 dynamic type，数据成员不会因动态类型自动改道。
      </figcaption>
    </figure>
  );
}
