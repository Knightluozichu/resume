type ScopeRow = Readonly<{
  kind: string;
  declaration: string;
  lookup: string;
  collision: string;
  tone: string;
}>;

const scopeRows = [
  {
    kind: "Unscoped",
    declaration: "enum Status { running }",
    lookup: "running",
    collision: "enclosing scope owns the name",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
  {
    kind: "Scoped",
    declaration: "enum class Status { running }",
    lookup: "Status::running",
    collision: "another enum may also define running",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
] as const satisfies readonly ScopeRow[];

export function EmcppEnumeratorScopeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="传统枚举成员进入外围作用域而作用域枚举成员保留在类型边界内的名称查找对比图"
          className="grid gap-4 lg:grid-cols-2"
        >
          {scopeRows.map((row, index) => (
            <section
              key={row.kind}
              className={`min-h-56 border p-4 ${row.tone}`}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">{row.kind}</strong>
                <span className="text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
              </div>
              <code className="mt-4 block text-xs leading-5 text-accent">
                {row.declaration}
              </code>
              <div className="mt-4 border border-border bg-bg/50 p-3">
                <span className="text-xs text-secondary">lookup</span>
                <code className="mt-1 block text-sm text-primary">
                  {row.lookup}
                </code>
              </div>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {row.collision}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        scoped enum 让 enumerator name
        依附类型；调用点同时获得防冲突能力和所属领域上下文。
      </figcaption>
    </figure>
  );
}

const conversionStages = [
  {
    label: "Enum value",
    unscoped: "Color::red / red",
    scoped: "Color::red",
  },
  {
    label: "Integer overload",
    unscoped: "implicit promotion allowed",
    scoped: "compile-time blocked",
  },
  {
    label: "Arithmetic",
    unscoped: "may enter numeric expression",
    scoped: "no operator without intent",
  },
  {
    label: "Protocol boundary",
    unscoped: "conversion may be invisible",
    scoped: "explicit underlying cast",
  },
] as const;

export function EmcppEnumConversionGateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="传统枚举和作用域枚举从枚举值到整数重载算术及协议边界的隐式转换闸门图"
          className="space-y-3"
        >
          {conversionStages.map((stage, index) => (
            <section
              key={stage.label}
              className="grid gap-3 border border-border bg-bg/40 p-4 md:grid-cols-[0.9fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
                {stage.label}
              </strong>
              <p className="m-0 border-l-2 border-rose-500 pl-3 text-xs leading-5 text-secondary">
                unscoped：{stage.unscoped}
              </p>
              <p className="m-0 border-l-2 border-emerald-500 pl-3 text-xs leading-5 text-secondary">
                scoped：{stage.scoped}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        enum class
        把整数转换移动到明确边界；这不是失去能力，而是让语义变化可见、可审查。
      </figcaption>
    </figure>
  );
}

const declarationRows = [
  {
    kind: "Scoped default",
    forward: "enum class Status;",
    layout: "underlying int is known",
    definition: "enum class Status { ... };",
  },
  {
    kind: "Scoped fixed",
    forward: "enum class Code : uint8_t;",
    layout: "one-byte representation contract",
    definition: "enum class Code : uint8_t { ... };",
  },
  {
    kind: "Unscoped fixed",
    forward: "enum Color : uint8_t;",
    layout: "explicit type required to forward",
    definition: "enum Color : uint8_t { ... };",
  },
] as const;

export function EmcppEnumDeclarationLayoutMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="默认作用域枚举固定底层类型作用域枚举和固定底层类型传统枚举的前置声明布局与定义契约图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {declarationRows.map((row, index) => (
            <section
              key={row.kind}
              className="min-h-56 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {row.kind}
              </strong>
              <code className="mt-4 block border-l-2 border-sky-500 pl-3 text-xs leading-5 text-accent">
                {row.forward}
              </code>
              <p className="mt-3 text-xs leading-5 text-secondary">
                {row.layout}
              </p>
              <code className="mt-3 block border-l-2 border-emerald-500 pl-3 text-xs leading-5 text-primary">
                {row.definition}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        forward declaration 可行的前提是对象布局已知；最终 definition
        必须复用同一个 underlying type。
      </figcaption>
    </figure>
  );
}
