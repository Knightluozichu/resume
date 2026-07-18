const requirements = [
  ["Virtual slot", "base function is virtual", "required"],
  ["Name", "same function name", "required"],
  ["Parameters", "exact parameter types", "required"],
  ["Object cv", "same const/volatile state", "required"],
  ["Ref qualifier", "same & or && constraint", "required"],
  ["Return/except", "same or compatible contract", "compatible"],
] as const;

export function EmcppOverrideRequirementsMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="virtual slot 名称参数 const 引用限定符返回和异常规范六项覆盖条件图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {requirements.map(([label, detail, status], index) => (
            <section
              key={label}
              className="min-h-36 border border-emerald-500/30 bg-emerald-500/10 p-4"
            >
              <div className="flex justify-between gap-3">
                <strong className="text-sm text-primary">{label}</strong>
                <span className="text-xs text-secondary">0{index + 1}</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-secondary">{detail}</p>
              <code className="mt-2 block text-xs text-accent">{status}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        override 把六维 function contract 交给 compiler
        核对，而不是只比较肉眼可见的名称。
      </figcaption>
    </figure>
  );
}

const mismatches = [
  { base: "run() const", derived: "run()", reason: "missing const" },
  { base: "set(int)", derived: "set(unsigned)", reason: "parameter mismatch" },
  { base: "save() nonvirtual", derived: "save()", reason: "no virtual slot" },
  {
    base: "execute() &",
    derived: "execute() &&",
    reason: "ref qualifier mismatch",
  },
] as const;

export function EmcppSilentOverrideMismatchMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="const 参数类型非 virtual 和引用限定符四类静默覆盖签名不匹配图"
          className="space-y-3"
        >
          {mismatches.map((item, index) => (
            <section
              key={item.base}
              className="grid gap-3 border border-rose-500/30 bg-rose-500/10 p-4 md:grid-cols-[1fr_1fr_1.2fr] md:items-center"
            >
              <code className="text-xs text-primary">
                0{index + 1} · Base::{item.base}
              </code>
              <code className="text-xs text-primary">
                Derived::{item.derived}
              </code>
              <p className="m-0 border-l-2 border-rose-500 pl-3 text-xs text-secondary">
                not override：{item.reason}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        没有 override 时，这些 declarations 都可能作为新函数存在；加上 override
        后在声明点失败。
      </figcaption>
    </figure>
  );
}

const dispatchPaths = [
  {
    owner: "Widget lvalue",
    call: "widget.data()",
    selected: "data() &",
    result: "Data& borrow",
    tone: "border-sky-500/35 bg-sky-500/10",
  },
  {
    owner: "Widget rvalue",
    call: "makeWidget().data()",
    selected: "data() &&",
    result: "Data value by move",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
] as const;

export function EmcppRefQualifiedDispatchMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Widget 左值和右值对象分别选择引用限定 data 成员并返回借用或移动值的分派图"
          className="grid gap-4 lg:grid-cols-2"
        >
          {dispatchPaths.map((path, index) => (
            <section
              key={path.owner}
              className={`min-h-52 border p-4 ${path.tone}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {path.owner}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {path.call}
              </code>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <p className="m-0 border border-border bg-bg/50 p-3 text-xs text-secondary">
                  select {path.selected}
                </p>
                <p className="m-0 border border-border bg-bg/50 p-3 text-xs text-secondary">
                  return {path.result}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ref qualifier 把 owner lifetime 写进 overload
        set：稳定对象可借用，temporary 必须交出独立 value。
      </figcaption>
    </figure>
  );
}
