type EvidenceTone = "observe" | "prove" | "warn";

type EvidenceCard = Readonly<{
  eyebrow: string;
  title: string;
  detail: string;
  evidence: string;
  tone: EvidenceTone;
}>;

const toneClasses: Record<EvidenceTone, string> = {
  observe: "border-sky-500/35 bg-sky-500/10",
  prove: "border-emerald-500/35 bg-emerald-500/10",
  warn: "border-amber-500/35 bg-amber-500/10",
};

function EvidenceBoard({
  ariaLabel,
  caption,
  cards,
}: {
  ariaLabel: string;
  caption: string;
  cards: readonly EvidenceCard[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card, index) => (
            <section
              key={card.title}
              className={`min-h-52 border p-4 ${toneClasses[card.tone]}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium uppercase text-secondary">
                  {card.eyebrow}
                </span>
                <span className="text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
              </div>
              <strong className="mt-4 block text-sm text-primary">
                {card.title}
              </strong>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {card.detail}
              </p>
              <code className="mt-4 block border-l-2 border-current pl-3 text-xs leading-5 text-accent">
                {card.evidence}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const inspectionMethods = [
  {
    eyebrow: "Edit time",
    title: "IDE hover",
    detail: "最快获得变量或 expression 的静态类型提示，适合局部探索。",
    evidence: "hover(x) -> int",
    tone: "observe",
  },
  {
    eyebrow: "Compile time",
    title: "Diagnostic probe",
    detail: "实例化 incomplete TD，让错误消息包含真实 template argument。",
    evidence: "TD<decltype(y)>",
    tone: "observe",
  },
  {
    eyebrow: "Run time",
    title: "type_info name",
    detail: "在运行路径输出实现相关名称，适合日志，不保证完整或可移植。",
    evidence: "typeid(y).name()",
    tone: "warn",
  },
  {
    eyebrow: "Contract",
    title: "Static assertion",
    detail: "把已知 expected type 变成构建门禁，适合长期回归保护。",
    evidence: "is_same_v<Actual, Expected>",
    tone: "prove",
  },
] as const satisfies readonly EvidenceCard[];

export function EmcppTypeInspectionMethodsMap() {
  return (
    <EvidenceBoard
      ariaLabel="IDE 悬停编译器诊断运行期 type info 与静态断言四种推导类型查看方法"
      caption="四种方法处在不同阶段：hover、diagnostics 与 typeid 提供观察，static assertion 才能把明确预期固化为编译期契约。"
      cards={inspectionMethods}
    />
  );
}

type TypeLayer = Readonly<{
  layer: string;
  source: string;
  diagnostic: string;
  runtime: string;
  status: "kept" | "at-risk" | "lost";
}>;

const typeLayers = [
  {
    layer: "Base object",
    source: "Widget",
    diagnostic: "Widget",
    runtime: "Widget",
    status: "kept",
  },
  {
    layer: "Pointee cv",
    source: "const Widget",
    diagnostic: "const Widget",
    runtime: "const Widget",
    status: "kept",
  },
  {
    layer: "Pointer",
    source: "const Widget*",
    diagnostic: "const Widget*",
    runtime: "const Widget*",
    status: "kept",
  },
  {
    layer: "Top-level cv",
    source: "const Widget* const",
    diagnostic: "often kept",
    runtime: "usually omitted",
    status: "at-risk",
  },
  {
    layer: "Reference",
    source: "const Widget* const&",
    diagnostic: "often kept",
    runtime: "not represented",
    status: "lost",
  },
] as const satisfies readonly TypeLayer[];

const layerStatus = {
  kept: {
    label: "保留",
    className:
      "border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  "at-risk": {
    label: "可能省略",
    className:
      "border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  lost: {
    label: "不表示",
    className:
      "border-rose-500/35 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
} as const;

export function EmcppTypeDisplayLossMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从 Widget 到 const Widget pointer const reference 的五层类型以及诊断和运行期显示损失图"
          className="space-y-3"
        >
          <div className="hidden grid-cols-[1.1fr_1.3fr_1fr_1fr_auto] gap-3 px-3 text-xs font-medium text-secondary md:grid">
            <span>类型层</span>
            <span>完整 source type</span>
            <span>diagnostic</span>
            <span>typeid/name</span>
            <span>结果</span>
          </div>
          {typeLayers.map((item, index) => {
            const status = layerStatus[item.status];
            return (
              <section
                key={item.layer}
                className="grid gap-3 border border-border bg-bg/40 p-3 md:grid-cols-[1.1fr_1.3fr_1fr_1fr_auto] md:items-center"
              >
                <strong className="text-sm text-primary">
                  <span className="mr-2 text-xs tabular-nums text-secondary">
                    0{index + 1}
                  </span>
                  {item.layer}
                </strong>
                <code className="text-xs text-accent">{item.source}</code>
                <span className="text-xs text-secondary">
                  {item.diagnostic}
                </span>
                <span className="text-xs text-secondary">{item.runtime}</span>
                <span
                  className={`w-fit border px-2 py-1 text-xs ${status.className}`}
                >
                  {status.label}
                </span>
              </section>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        param 的完整类型是 const pointer to const Widget 的 reference；typeid
        可保留 pointee const，却不编码 reference，并会忽略最外层 cv。
      </figcaption>
    </figure>
  );
}

const evidenceWorkflow = [
  {
    eyebrow: "Language",
    title: "先预测",
    detail: "从 expression、value category 与 ParamType 写出逐层 deduction。",
    evidence: "Expected = const Widget* const&",
    tone: "prove",
  },
  {
    eyebrow: "Observe",
    title: "再查看",
    detail: "用 hover 或 TD diagnostic 定位差异，不把格式当作 contract。",
    evidence: "TD<decltype(param)>",
    tone: "observe",
  },
  {
    eyebrow: "Assert",
    title: "锁定类型",
    detail: "用 is_same 把 cv、pointer 与 reference 全层纳入 CI。",
    evidence: "static_assert(is_same_v<...>)",
    tone: "prove",
  },
  {
    eyebrow: "Behavior",
    title: "验证语义",
    detail: "检查 aliasing、mutation、overload 与 lifetime 的可观察效果。",
    evidence: "compile-fail + mutation test",
    tone: "warn",
  },
] as const satisfies readonly EvidenceCard[];

export function EmcppTypeEvidenceWorkflowMap() {
  return (
    <EvidenceBoard
      ariaLabel="先预测语言类型再查看工具输出然后静态断言最后验证行为的四步类型证据流程"
      caption="可靠的停止条件不是得到一条漂亮的类型字符串，而是语言推导、编译期断言与实际行为三者一致。"
      cards={evidenceWorkflow}
    />
  );
}
