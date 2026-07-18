const constructionRows = [
  {
    call: "push_back(Widget(args))",
    outside: "construct temporary",
    inside: "move into container",
    result: "temporary then destroy",
  },
  {
    call: "emplace_back(args)",
    outside: "forward raw arguments",
    inside: "construct Widget in slot",
    result: "no value temporary",
  },
  {
    call: "push_back(existing)",
    outside: "existing Widget lvalue",
    inside: "copy into container",
    result: "emplace gives no advantage",
  },
] as const;

export function EmcppInsertionConstructionPathMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="push back temporary emplace back arguments 和 existing lvalue 三种插入的容器外构造容器内构造路径图"
          className="space-y-3"
        >
          {constructionRows.map((item, index) => (
            <section
              key={item.call}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[1.1fr_1fr_1fr_1fr] md:items-center"
            >
              <code className="text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {item.call}
              </code>
              <span className="text-xs text-secondary">
                outside: {item.outside}
              </span>
              <strong className="text-xs text-primary">
                inside: {item.inside}
              </strong>
              <span className="text-xs text-secondary">{item.result}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        emplacement 的潜在收益是消除 value_type temporary；若 caller 已有
        value_type object，就没有这条构造链可消除。
      </figcaption>
    </figure>
  );
}

const acceptanceSteps = [
  {
    phase: "Receive arguments",
    insert: "already has value_type/key",
    emplace: "constructor arguments only",
  },
  {
    phase: "Check duplicate",
    insert: "may inspect key before new object",
    emplace: "implementation may construct candidate",
  },
  {
    phase: "Duplicate found",
    insert: "reject existing value",
    emplace: "destroy rejected candidate",
  },
  {
    phase: "Observed cost",
    insert: "no speculative construction",
    emplace: "allocation/construction may be wasted",
  },
] as const;

export function EmcppAssociativeEmplaceRejectionFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="关联容器插入重复键时 insert 可先检查而 emplace 可能先构造再拒绝候选对象的流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {acceptanceSteps.map((item, index) => (
            <section
              key={item.phase}
              className={`min-h-52 border p-4 ${index >= 2 ? "border-rose-500/35 bg-rose-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.phase}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">
                insert: {item.insert}
              </p>
              <code className="mt-3 block text-xs text-accent">
                emplace: {item.emplace}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        emplace 直接构造不保证一定被容器接受；unique-key containers 的 rejection
        path 也要进入成本模型。
      </figcaption>
    </figure>
  );
}

const safetyRows = [
  {
    input: "explicit constructor arguments",
    insertion: "implicit conversion may be rejected",
    emplacement: "direct construction accepts them",
    review: "emplace widens accepted call sites",
  },
  {
    input: "raw new Widget pointer",
    insertion: "smart-pointer temporary owns before call",
    emplacement: "ownership begins inside container",
    review: "allocation failure may leak raw pointer",
  },
  {
    input: "make_shared<Widget>()",
    insertion: "owned smart pointer",
    emplacement: "owned smart pointer",
    review: "ownership is safe before container work",
  },
] as const;

export function EmcppEmplacementSafetyBoundaryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="explicit 构造参数 raw pointer 和 make shared 在 insertion 与 emplacement 中的类型检查和资源所有权安全边界图"
          className="space-y-3"
        >
          {safetyRows.map((item, index) => (
            <section
              key={item.input}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.9fr_1.1fr_1.1fr_1.1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.input}
              </strong>
              <span className="text-xs text-secondary">
                insert: {item.insertion}
              </span>
              <code className="text-xs text-accent">
                emplace: {item.emplacement}
              </code>
              <strong className="text-xs text-primary">{item.review}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        直接构造同时绕过一层 implicit-conversion 检查并推迟 resource
        ownership；性能选择必须连同 API safety 一起审查。
      </figcaption>
    </figure>
  );
}
