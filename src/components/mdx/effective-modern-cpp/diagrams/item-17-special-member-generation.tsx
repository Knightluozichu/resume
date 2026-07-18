const generationRows = [
  {
    operation: "Default ctor",
    condition: "no user-declared constructor",
    blocker: "any constructor declaration",
  },
  {
    operation: "Copy ctor/assign",
    condition: "member/base copyable",
    blocker: "move declaration or uncopyable member",
  },
  {
    operation: "Move ctor/assign",
    condition: "no copy/move/destructor declarations",
    blocker: "any user-declared copy/move/dtor",
  },
  {
    operation: "Destructor",
    condition: "member/base destructible",
    blocker: "deleted/inaccessible member destructor",
  },
] as const;

export function EmcppSpecialMemberGenerationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="默认构造复制移动和析构特殊成员函数的生成条件与阻断条件矩阵图"
          className="space-y-3"
        >
          {generationRows.map((row, index) => (
            <section
              key={row.operation}
              className="grid gap-3 border border-sky-500/30 bg-sky-500/10 p-4 md:grid-cols-[0.8fr_1.2fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.operation}
              </strong>
              <p className="m-0 border-l-2 border-emerald-500 pl-3 text-xs text-secondary">
                生成：{row.condition}
              </p>
              <p className="m-0 border-l-2 border-rose-500 pl-3 text-xs text-secondary">
                阻断：{row.blocker}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        特殊成员不是独立开关；一个 user declaration 会改变其他 operations
        的生成资格。
      </figcaption>
    </figure>
  );
}

const suppression = [
  ["Add destructor", "~StringTable() { log(); }", "user-declared lifecycle"],
  ["Suppress move", "no implicit move ctor", "rvalue has no move candidate"],
  ["Copy remains", "copy(const T&)", "const reference binds rvalue"],
  ["Observed behavior", "deep copy map", "correct result, hidden cost"],
] as const;

export function EmcppDestructorSuppressesMoveFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="添加日志析构函数抑制隐式移动导致右值绑定复制并产生深复制成本的四阶段图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {suppression.map(([label, code, detail], index) => (
            <section
              key={label}
              className={`min-h-48 border p-4 ${index === 3 ? "border-rose-500/35 bg-rose-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {code}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        最危险的回退没有编译错误：copy const-reference 合法接住 rvalue，只有
        trait/counter 能揭示 move 已消失。
      </figcaption>
    </figure>
  );
}

const ownership = [
  {
    member: "unique_ptr<Socket>",
    copy: "deleted",
    move: "transfer handle",
    destroy: "close once",
  },
  {
    member: "string",
    copy: "deep value copy",
    move: "transfer buffer",
    destroy: "release buffer",
  },
  {
    member: "vector<Message>",
    copy: "copy elements",
    move: "transfer storage",
    destroy: "destroy elements",
  },
  {
    member: "Session aggregate",
    copy: "deleted by unique_ptr",
    move: "memberwise move",
    destroy: "memberwise cleanup",
  },
] as const;

export function EmcppRuleOfZeroOwnershipMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="unique pointer string vector 成员的复制移动析构能力组合成 Session 零法则所有权语义图"
          className="space-y-3"
        >
          {ownership.map((row, index) => (
            <section
              key={row.member}
              className="grid gap-3 border border-emerald-500/30 bg-emerald-500/10 p-4 md:grid-cols-[1fr_1fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.member}
              </strong>
              <span className="text-xs text-secondary">copy: {row.copy}</span>
              <span className="text-xs text-secondary">move: {row.move}</span>
              <span className="text-xs text-secondary">
                destroy: {row.destroy}
              </span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rule of Zero 不是放弃 ownership，而是让经过验证的 RAII member types
        组合出外层资源语义。
      </figcaption>
    </figure>
  );
}
