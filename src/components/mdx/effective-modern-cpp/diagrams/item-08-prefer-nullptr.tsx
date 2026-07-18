type IdentityRow = Readonly<{
  token: string;
  directType: string;
  pointerMeaning: string;
  templateType: string;
  tone: string;
}>;

const identities = [
  {
    token: "0",
    directType: "int",
    pointerMeaning: "only as a constant-expression conversion",
    templateType: "deduces int",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    token: "NULL",
    directType: "implementation integral type",
    pointerMeaning: "macro expansion supplies legacy context",
    templateType: "deduces that integral type",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
  {
    token: "nullptr",
    directType: "std::nullptr_t",
    pointerMeaning: "converts to any pointer target",
    templateType: "deduces std::nullptr_t",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
] as const satisfies readonly IdentityRow[];

export function EmcppNullLiteralIdentityMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="整数零 NULL 宏和 nullptr 的直接类型指针语义及模板推导类型对比图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {identities.map((item, index) => (
            <section
              key={item.token}
              className={`min-h-56 border p-4 ${item.tone}`}
            >
              <div className="flex items-center justify-between gap-3">
                <code className="text-base font-semibold text-primary">
                  {item.token}
                </code>
                <span className="text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
              </div>
              <dl className="mt-4 space-y-3 text-xs leading-5">
                <div>
                  <dt className="text-secondary">Direct type</dt>
                  <dd className="m-0 text-primary">{item.directType}</dd>
                </div>
                <div>
                  <dt className="text-secondary">Pointer meaning</dt>
                  <dd className="m-0 text-primary">{item.pointerMeaning}</dd>
                </div>
                <div>
                  <dt className="text-secondary">Template deduction</dt>
                  <dd className="m-0 text-primary">{item.templateType}</dd>
                </div>
              </dl>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三者都可能在某些调用点产生空指针值，但只有 nullptr
        的直接类型能跨变量与模板边界保存空指针语义。
      </figcaption>
    </figure>
  );
}

const overloadCalls = [
  {
    call: "inspect(0)",
    candidate: "inspect(int)",
    reason: "exact integral match beats null pointer conversion",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    call: "inspect(NULL)",
    candidate: "integral / ambiguous",
    reason: "macro's concrete integral type controls ranking",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
  {
    call: "inspect(nullptr)",
    candidate: "inspect(void*)",
    reason: "std::nullptr_t carries pointer-target conversion",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
] as const;

export function EmcppPointerOverloadResolutionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="接收 int bool 和 void pointer 的重载集合对零 NULL 和 nullptr 三种调用的选择路径图"
          className="space-y-3"
        >
          <div className="grid gap-2 border border-border bg-bg/50 p-3 text-center text-xs text-secondary sm:grid-cols-3">
            <code>inspect(int)</code>
            <code>inspect(bool)</code>
            <code>inspect(void*)</code>
          </div>
          {overloadCalls.map((item, index) => (
            <section
              key={item.call}
              className={`grid gap-3 border p-4 md:grid-cols-[0.8fr_1fr_1.4fr] md:items-center ${item.tone}`}
            >
              <code className="text-sm text-primary">
                0{index + 1} · {item.call}
              </code>
              <strong className="text-sm text-primary">{item.candidate}</strong>
              <p className="m-0 text-xs leading-5 text-secondary">
                {item.reason}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        overload resolution 比较真实类型和 conversion rank；它不会把名字 NULL
        或数字 0 自动解释成 pointer intent。
      </figcaption>
    </figure>
  );
}

type TemplatePath = Readonly<{
  argument: string;
  deduced: string;
  namedValue: string;
  secondCall: string;
  outcome: "fail" | "pass";
}>;

const templatePaths = [
  {
    argument: "0 literal",
    deduced: "Pointer = int",
    namedValue: "int pointer",
    secondCall: "int variable -> Widget*",
    outcome: "fail",
  },
  {
    argument: "NULL macro",
    deduced: "Pointer = integral type",
    namedValue: "integral pointer",
    secondCall: "integer variable -> smart pointer",
    outcome: "fail",
  },
  {
    argument: "nullptr",
    deduced: "Pointer = std::nullptr_t",
    namedValue: "nullptr_t pointer",
    secondCall: "nullptr_t -> target pointer",
    outcome: "pass",
  },
] as const satisfies readonly TemplatePath[];

export function EmcppNullTemplateDeductionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="零 NULL 和 nullptr 经过 lockAndCall 模板推导命名变量再调用真实指针函数的成功失败路径图"
          className="space-y-3"
        >
          {templatePaths.map((path, index) => (
            <section
              key={path.argument}
              className={`grid gap-3 border p-4 lg:grid-cols-[0.8fr_1fr_1fr_1.2fr_auto] lg:items-center ${
                path.outcome === "pass"
                  ? "border-emerald-500/35 bg-emerald-500/10"
                  : "border-rose-500/35 bg-rose-500/10"
              }`}
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
                {path.argument}
              </strong>
              <code className="text-xs text-accent">{path.deduced}</code>
              <code className="text-xs text-secondary">{path.namedValue}</code>
              <span className="text-xs text-secondary">{path.secondCall}</span>
              <span
                className={`w-fit border px-2 py-1 text-xs ${
                  path.outcome === "pass"
                    ? "border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                    : "border-rose-500/40 text-rose-700 dark:text-rose-300"
                }`}
              >
                {path.outcome === "pass" ? "可转换" : "类型失败"}
              </span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        wrapper 先冻结 argument type，再执行第二次调用；nullptr_t
        能保留转换能力，普通整数变量不能恢复 literal 的空指针常量身份。
      </figcaption>
    </figure>
  );
}
