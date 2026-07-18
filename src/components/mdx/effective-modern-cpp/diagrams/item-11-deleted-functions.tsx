const failureRows = [
  {
    caller: "Ordinary caller",
    privateUndefined: "private access error",
    deleted: "use of deleted function",
  },
  {
    caller: "Class member",
    privateUndefined: "compiles, then link failure",
    deleted: "use of deleted function",
  },
  {
    caller: "Friend",
    privateUndefined: "compiles, then link failure",
    deleted: "use of deleted function",
  },
] as const;

export function EmcppDeletedFunctionFailureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="普通调用者成员和 friend 使用私有未定义函数与删除函数时的失败阶段对比图"
          className="space-y-3"
        >
          {failureRows.map((row, index) => (
            <section
              key={row.caller}
              className="grid gap-3 border border-border bg-bg/40 p-4 md:grid-cols-[0.8fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.caller}
              </strong>
              <p className="m-0 border-l-2 border-rose-500 pl-3 text-xs text-secondary">
                private undefined：{row.privateUndefined}
              </p>
              <p className="m-0 border-l-2 border-emerald-500 pl-3 text-xs text-secondary">
                deleted：{row.deleted}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        delete 消除调用者身份差异：任何 selected deleted function
        都在使用点产生编译错误。
      </figcaption>
    </figure>
  );
}

const overloadRows = [
  { input: "int", best: "isLucky(int)", outcome: "allowed", pass: true },
  {
    input: "char",
    best: "isLucky(char) = delete",
    outcome: "blocked exact match",
    pass: false,
  },
  {
    input: "bool",
    best: "isLucky(bool) = delete",
    outcome: "blocked exact match",
    pass: false,
  },
  {
    input: "float/double",
    best: "isLucky(double) = delete",
    outcome: "blocked before int conversion",
    pass: false,
  },
] as const;

export function EmcppDeletedOverloadFirewallMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="int char bool 和浮点输入经过删除重载候选选择形成类型防火墙的路径图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {overloadRows.map((row, index) => (
            <section
              key={row.input}
              className={`min-h-48 border p-4 ${row.pass ? "border-emerald-500/35 bg-emerald-500/10" : "border-rose-500/35 bg-rose-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {row.input}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {row.best}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {row.outcome}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        deleted candidates 必须参与 ranking；它们以更精确匹配拦截原本会隐式转进
        int API 的输入。
      </figcaption>
    </figure>
  );
}

const pointerGroups = [
  {
    family: "Object",
    examples: "Widget*, const Widget*",
    policy: "supported",
    pass: true,
  },
  {
    family: "Void",
    examples: "void*, const/volatile void*",
    policy: "deleted specializations",
    pass: false,
  },
  {
    family: "Text",
    examples: "char*, const char*",
    policy: "deleted specializations",
    pass: false,
  },
  {
    family: "Byte chars",
    examples: "signed/unsigned char* + cv",
    policy: "audit each semantic case",
    pass: false,
  },
] as const;

export function EmcppDeletedPointerSpecializationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="普通对象 void text 和字节字符指针模板特化允许与删除矩阵图"
          className="space-y-3"
        >
          {pointerGroups.map((group, index) => (
            <section
              key={group.family}
              className={`grid gap-3 border p-4 md:grid-cols-[0.7fr_1.3fr_1fr_auto] md:items-center ${group.pass ? "border-emerald-500/35 bg-emerald-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {group.family}
              </strong>
              <code className="text-xs text-accent">{group.examples}</code>
              <span className="text-xs text-secondary">{group.policy}</span>
              <span className="border border-current px-2 py-1 text-xs text-secondary">
                {group.pass ? "允许" : "禁止"}
              </span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        删除一个 base pointer specialization 不会自动覆盖全部
        cv/signedness；禁止集合必须形成可审计矩阵。
      </figcaption>
    </figure>
  );
}
