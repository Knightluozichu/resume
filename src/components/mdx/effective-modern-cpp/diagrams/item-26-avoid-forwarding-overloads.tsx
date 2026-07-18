const greedyRows = [
  {
    input: "string&",
    ordinary: "const string&: qualification",
    template: "T=string&, exact",
    winner: "template",
  },
  {
    input: "const string&",
    ordinary: "exact",
    template: "exact",
    winner: "non-template tie",
  },
  {
    input: "string&&",
    ordinary: "bind const&",
    template: "T=string, exact &&",
    winner: "template",
  },
  {
    input: "char[N]",
    ordinary: "convert to string temporary",
    template: "exact array reference",
    winner: "template",
  },
] as const;

export function EmcppForwardingGreedyOverloadMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="mutable const string rvalue 和字符数组输入在普通 const reference 与 forwarding template 间的重载排序图"
          className="space-y-3"
        >
          {greedyRows.map((row, index) => (
            <section
              key={row.input}
              className="grid gap-3 border border-sky-500/30 bg-sky-500/10 p-4 md:grid-cols-[0.6fr_1.2fr_1.2fr_0.8fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.input}
              </strong>
              <span className="text-xs text-secondary">
                ordinary: {row.ordinary}
              </span>
              <code className="text-xs text-accent">
                template: {row.template}
              </code>
              <strong className="text-xs text-primary">→ {row.winner}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        forwarding template 能为每个 input 现场生成 exact reference，普通
        overload 很难稳定覆盖它。
      </figcaption>
    </figure>
  );
}

const shortTrap = [
  ["Argument", "short index", "business intent: integer overload"],
  ["Rank", "int requires promotion", "template exact short& wins"],
  ["Instantiate", "names.emplace(short)", "string construction invalid"],
  ["Diagnostic", "hard body error", "no fallback to int overload"],
] as const;

export function EmcppShortIndexOverloadTrapMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="short 参数意图调用 int 重载却被 forwarding template 精确匹配并在 body 构造 string 失败的流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {shortTrap.map(([label, code, detail], index) => (
            <section
              key={label}
              className={`min-h-48 border p-4 ${index >= 2 ? "border-rose-500/35 bg-rose-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        overload resolution 先于 body instantiation；错误约束放在 body
        已经太晚，不能触发候选回退。
      </figcaption>
    </figure>
  );
}

const hijacks = [
  {
    call: "Person copy(nonconstPerson)",
    intended: "Person(const Person&)",
    greedy: "Person(T&&), T=Person&",
    result: "template hijacks",
  },
  {
    call: "Person copy(constPerson)",
    intended: "copy exact",
    greedy: "template exact",
    result: "non-template wins tie",
  },
  {
    call: "Person move(Person{})",
    intended: "Person(Person&&)",
    greedy: "template exact",
    result: "non-template wins tie",
  },
  {
    call: "Person(specialPerson)",
    intended: "copy with derived-to-base",
    greedy: "T=SpecialPerson&, exact",
    result: "template hijacks",
  },
] as const;

export function EmcppCopyConstructorHijackMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Person mutable const copy move 与 SpecialPerson base construction 被 forwarding constructor 劫持的候选图"
          className="space-y-3"
        >
          {hijacks.map((item, index) => (
            <section
              key={item.call}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[1.1fr_1fr_1.1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.call}
              </strong>
              <span className="text-xs text-secondary">
                intended: {item.intended}
              </span>
              <code className="text-xs text-accent">
                {item.greedy} → {item.result}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        constructor template 不会取代 special-member generation，却能在 overload
        ranking 中击败已经存在的 copy path。
      </figcaption>
    </figure>
  );
}
