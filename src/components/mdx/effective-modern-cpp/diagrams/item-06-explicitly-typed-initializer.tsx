type LifetimeStage = Readonly<{
  label: string;
  code: string;
  state: string;
  tone: string;
}>;

const proxyLifetimeStages = [
  {
    label: "Create owner",
    code: "features(widget)",
    state: "temporary vector<bool> owns packed words",
    tone: "border-sky-500/35 bg-sky-500/10",
  },
  {
    label: "Create proxy",
    code: "operator[](5)",
    state: "reference proxy stores word address + bit mask",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    label: "Deduce auto",
    code: "auto highPriority",
    state: "variable owns proxy object, not the packed word",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    label: "End expression",
    code: "; destroy vector",
    state: "word storage dies; proxy address becomes dangling",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
] as const satisfies readonly LifetimeStage[];

export function EmcppProxyLifetimeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="temporary vector bool 创建 bit proxy 被 auto 保存后 owner 在完整表达式结束时销毁并导致代理悬空的四阶段图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {proxyLifetimeStages.map((stage, index) => (
            <section
              key={stage.label}
              className={`min-h-52 border p-4 ${stage.tone}`}
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage.label}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {stage.code}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {stage.state}
              </p>
            </section>
          ))}
        </div>
        <div className="mt-3 border-l-2 border-rose-500 bg-rose-500/10 p-3 text-xs leading-5 text-secondary">
          关键断点：proxy local 仍存在，但它借用的 packed word 已随 temporary
          owner 销毁。
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        auto 保存的是 initializer 的直接 proxy type；变量 lifetime 与 proxy
        指向的 owner lifetime 必须分别推导。
      </figcaption>
    </figure>
  );
}

const typedInitializerStages = [
  {
    label: "Source expression",
    value: "features(widget)[5]",
    detail: "产生借用 temporary vector storage 的 bit proxy。",
    accent: "border-violet-500/35 bg-violet-500/10",
  },
  {
    label: "Target conversion",
    value: "static_cast<bool>(proxy)",
    detail: "owner 仍活着时读取 bit，明确调用方要 value snapshot。",
    accent: "border-amber-500/35 bg-amber-500/10",
  },
  {
    label: "Auto deduction",
    value: "auto highPriority = bool",
    detail: "auto 推导 conversion result，最终变量是独立 bool。",
    accent: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    label: "Owner destruction",
    value: "temporary vector dies",
    detail: "bool 已拥有值，不再依赖 packed storage。",
    accent: "border-sky-500/35 bg-sky-500/10",
  },
] as const;

export function EmcppTypedInitializerMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="proxy source 经 static cast 目标转换后由 auto 推导独立 bool 并安全越过 owner 销毁的流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {typedInitializerStages.map((stage, index) => (
            <section
              key={stage.label}
              className={`min-h-48 border p-4 ${stage.accent}`}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">{stage.label}</strong>
                <span className="text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
              </div>
              <code className="mt-4 block text-xs leading-5 text-accent">
                {stage.value}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {stage.detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        typed initializer 把 materialization 放在 owner 销毁之前：cast
        负责目标语义，auto 负责采用 cast result type。
      </figcaption>
    </figure>
  );
}

type AuditRow = Readonly<{
  question: string;
  keepProxy: string;
  materialize: string;
}>;

const auditRows = [
  {
    question: "Direct type 是 owning value 还是 proxy/view？",
    keepProxy: "owning value 可直接保存；proxy 继续检查 owner。",
    materialize: "需要 snapshot 时指定 target value type。",
  },
  {
    question: "Owner 能否覆盖变量全部使用期？",
    keepProxy: "能：限制 scope，并记录 mutation/read-through 语义。",
    materialize: "不能：在当前 full expression 内生成 owning value。",
  },
  {
    question: "调用方需要 write-through/lazy behavior 吗？",
    keepProxy: "需要：保留 proxy，测试写回或延迟求值。",
    materialize: "不需要：cast 或具名 API 切断借用。",
  },
  {
    question: "Conversion 会损失范围、精度或状态吗？",
    keepProxy: "若损失不可接受，重新设计目标 contract。",
    materialize: "若有意转换，验证 precondition 与 boundary cases。",
  },
] as const satisfies readonly AuditRow[];

export function EmcppAutoProxyAuditMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="按直接类型 owner 生命周期写回或惰性需求和转换损失判断保留 proxy 还是物化 value 的审计图"
          className="space-y-3"
        >
          {auditRows.map((row, index) => (
            <section
              key={row.question}
              className="grid gap-3 border border-border bg-bg/40 p-4 md:grid-cols-[1.2fr_1fr_1fr]"
            >
              <strong className="text-sm leading-6 text-primary">
                <span className="mr-3 text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
                {row.question}
              </strong>
              <p className="m-0 border-l-2 border-violet-500 pl-3 text-xs leading-5 text-secondary">
                保留代理：{row.keepProxy}
              </p>
              <p className="m-0 border-l-2 border-emerald-500 pl-3 text-xs leading-5 text-secondary">
                物化值：{row.materialize}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        不以“是不是 auto”做机械判断；从 direct type、owner、所需语义与
        conversion loss 决定保存 proxy 还是立即 materialize。
      </figcaption>
    </figure>
  );
}
