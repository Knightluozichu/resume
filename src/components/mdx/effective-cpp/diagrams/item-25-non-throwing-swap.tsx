"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "non-throwing swap",
  "member swap",
  "pimpl idiom",
  "std::swap specialization",
  "ADL",
] as const;

const CARD_CLASS = "rounded-card border border-border bg-bg/40 p-4";

const COST_STEPS = [
  {
    label: "A",
    title: "move/copy construct temp",
    detail: "完整对象、invariant 与 allocator 规则一起参与。",
    tone: "var(--warning)",
  },
  {
    label: "B",
    title: "assign a from b",
    detail: "可能释放并重新分配，异常点出现在中途。",
    tone: "var(--danger)",
  },
  {
    label: "C",
    title: "assign b from temp",
    detail: "最终才恢复旧值；成本随表示复杂度增长。",
    tone: "var(--warning)",
  },
] as const;

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <line
      x1={x1}
      y1={y}
      x2={x2}
      y2={y}
      stroke="var(--border-strong)"
      strokeWidth="2"
      markerEnd="url(#item25-arrow)"
    />
  );
}

export function EcppItem25SwapCostMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-7">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={`通用 swap 与 pimpl member swap 成本对照：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
        >
          <svg
            viewBox="0 0 920 300"
            role="img"
            aria-label="通用 swap 经过临时对象和两次赋值；pimpl member swap 只交换 owner"
            className="mx-auto hidden h-auto w-full max-w-[920px] md:block"
          >
            <defs>
              <marker
                id="item25-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--border-strong)" />
              </marker>
            </defs>
            <text x="28" y="28" fill="var(--text-primary)" fontSize="16" fontWeight="700">
              std::swap fallback：完整对象搬运
            </text>
            <text x="28" y="52" fill="var(--text-secondary)" fontSize="13">
              临时对象 + 两次 assignment；可能触发分配、复制或异常
            </text>
            {COST_STEPS.map((step, index) => {
              const x = 30 + index * 290;
              return (
                <g key={step.label}>
                  <rect
                    x={x}
                    y="78"
                    width="230"
                    height="74"
                    rx="12"
                    fill="var(--bg)"
                    stroke={step.tone}
                    strokeWidth="2"
                  />
                  <text x={x + 18} y="104" fill={step.tone} fontSize="14" fontWeight="700">
                    {step.label} · {step.title}
                  </text>
                  <text x={x + 18} y="128" fill="var(--text-secondary)" fontSize="12">
                    {step.detail}
                  </text>
                  {index < COST_STEPS.length - 1 ? <Arrow x1={x + 238} x2={x + 278} y={115} /> : null}
                </g>
              );
            })}
            <text x="28" y="194" fill="var(--text-primary)" fontSize="16" fontWeight="700">
              pimpl member swap：只交换 implementation owner
            </text>
            <rect x="30" y="218" width="230" height="52" rx="12" fill="var(--bg)" stroke="var(--success)" strokeWidth="2" />
            <text x="48" y="241" fill="var(--success)" fontSize="14" fontWeight="700">
              Widget::swap
            </text>
            <text x="48" y="259" fill="var(--text-secondary)" fontSize="12">
              pImpl_.swap(other.pImpl_)
            </text>
            <Arrow x1={268} x2={360} y={244} />
            <rect x="372" y="218" width="230" height="52" rx="12" fill="var(--bg)" stroke="var(--success)" strokeWidth="2" />
            <text x="390" y="241" fill="var(--success)" fontSize="14" fontWeight="700">
              两个 unique owner 互换
            </text>
            <text x="390" y="259" fill="var(--text-secondary)" fontSize="12">
              O(1) · no allocation · noexcept
            </text>
            <Arrow x1={610} x2={702} y={244} />
            <rect x="714" y="218" width="176" height="52" rx="12" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="2" />
            <text x="732" y="241" fill="var(--success)" fontSize="14" fontWeight="700">
              交换身份
            </text>
            <text x="732" y="259" fill="var(--text-secondary)" fontSize="12">
              资源仍各自归属
            </text>
          </svg>

          <div className="grid gap-3 md:hidden">
            <div className={CARD_CLASS}>
              <p className="mb-1 text-sm font-semibold text-primary">std::swap fallback</p>
              <p className="mb-0 text-xs leading-5 text-secondary">
                临时对象 → 两次 assignment；可能分配、复制，异常也可能发生在中途。
              </p>
            </div>
            <div className={`${CARD_CLASS} border-l-4 border-l-success`}>
              <p className="mb-1 text-sm font-semibold text-success">pimpl member swap</p>
              <p className="mb-0 text-xs leading-5 text-secondary">
                只交换两个 unique owner，O(1)、不分配，并把交换变成可靠的 non-throwing swap。
              </p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        交换表示，而不是搬运整个对象：这是 pimpl 类型值得提供 member swap 的核心理由。
      </figcaption>
    </figure>
  );
}

const RESOLUTION_ROWS = [
  ["generic call", "using std::swap", "先保留标准 fallback"],
  ["ordinary lookup + ADL", "swap(a, b)", "类型 namespace 的 overload 可进入候选"],
  ["user customization", "ui::swap → member swap", "直接交换 private representation"],
  ["no customization", "std::swap fallback", "仍有可用的通用后备路径"],
] as const;

export function EcppItem25SwapResolutionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-7">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={`ADL-aware swap 查找协议：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
        >
          <svg
            viewBox="0 0 920 240"
            role="img"
            aria-label="using std swap 后非限定调用，ADL 选择类型 namespace overload，找不到时回退标准 swap"
            className="mx-auto hidden h-auto w-full max-w-[920px] md:block"
          >
            <defs>
              <marker
                id="item25-resolution-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--border-strong)" />
              </marker>
            </defs>
            <rect x="24" y="76" width="170" height="72" rx="12" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
            <text x="44" y="105" fill="var(--accent)" fontSize="15" fontWeight="700">using std::swap;</text>
            <text x="44" y="128" fill="var(--text-secondary)" fontSize="12">导入 fallback</text>
            <line x1="202" y1="112" x2="286" y2="112" stroke="var(--border-strong)" strokeWidth="2" markerEnd="url(#item25-resolution-arrow)" />
            <rect x="302" y="76" width="170" height="72" rx="12" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
            <text x="333" y="105" fill="var(--accent)" fontSize="15" fontWeight="700">swap(a, b)</text>
            <text x="333" y="128" fill="var(--text-secondary)" fontSize="12">非限定调用</text>
            <line x1="480" y1="112" x2="564" y2="112" stroke="var(--border-strong)" strokeWidth="2" markerEnd="url(#item25-resolution-arrow)" />
            <rect x="580" y="34" width="300" height="64" rx="12" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="2" />
            <text x="604" y="61" fill="var(--success)" fontSize="14" fontWeight="700">ADL 命中 ui::swap</text>
            <text x="604" y="83" fill="var(--text-secondary)" fontSize="12">→ member swap → owner 交换</text>
            <line x1="650" y1="118" x2="650" y2="158" stroke="var(--border-strong)" strokeWidth="2" markerEnd="url(#item25-resolution-arrow)" />
            <rect x="580" y="168" width="300" height="48" rx="12" fill="var(--bg)" stroke="var(--border-strong)" strokeWidth="2" />
            <text x="604" y="198" fill="var(--text-primary)" fontSize="14" fontWeight="700">无专用 overload → std::swap fallback</text>
          </svg>

          <div className="grid gap-2 md:hidden">
            {RESOLUTION_ROWS.map(([stage, call, result]) => (
              <div key={stage} className={CARD_CLASS}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <strong className="text-sm text-primary">{stage}</strong>
                  <code className="text-xs text-accent">{call}</code>
                </div>
                <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        非限定调用同时保留标准后备与 ADL 定制；直接写 std::swap 会跳过这条发现路径。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    id: "pimpl",
    label: "pimpl owner",
    tone: "var(--success)",
    title: "member swap 只交换 implementation owner",
    path: "ui::swap → Widget::swap → unique_ptr::swap",
    result: "通过：O(1)，不分配，noexcept 可以由成员保证支撑。",
    note: "交换身份，不搬运 WidgetImpl；适合作为 copy-and-swap 的 commit point。",
  },
  {
    id: "fallback",
    label: "generic fallback",
    tone: "var(--warning)",
    title: "没有定制时回到完整对象搬运",
    path: "using std::swap → swap(a,b) → std::swap<T>",
    result: "观察：仍然正确，但可能有临时对象、assignment 成本和异常点。",
    note: "fallback 是安全网，不是 pimpl/resource type 的最佳性能路径。",
  },
  {
    id: "allocator",
    label: "allocator mismatch",
    tone: "var(--danger)",
    title: "不传播且 allocator 不等时不能盲目交换 pointer",
    path: "Buffer::swap → owner swap? → deallocator mismatch",
    result: "拦截：降级为符合 allocator contract 的值交换，或明确禁止该操作。",
    note: "noexcept 只在资源释放责任仍匹配时成立；pointer swap 本身不是充分条件。",
  },
] as const;

type LabScenarioId = (typeof LAB_SCENARIOS)[number]["id"];

export function EcppItem25SwapLab() {
  const [scenarioId, setScenarioId] = useState<LabScenarioId>("pimpl");
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="ecpp-item-25-swap-resolution-lab"
      aria-label="Effective C++ Item 25 swap 查找与异常安全实验"
      aria-labelledby="ecpp-item-25-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Lab</p>
          <h3 id="ecpp-item-25-lab-title" className="mt-1 text-lg font-semibold text-primary">
            先预测：这次 swap 会走哪条路径？
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            切换样本，观察查找入口、资源 owner 和 noexcept 结论如何一起变化。
          </p>
        </div>
        <button
          type="button"
          className="min-h-11 rounded-button border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-accent"
          onClick={() => setScenarioId("pimpl")}
          aria-label="重置 swap 实验"
        >
          重置实验
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3" role="tablist" aria-label="swap 实验场景选择">
        {LAB_SCENARIOS.map((item) => {
          const selected = item.id === scenarioId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-pressed={selected}
              className={`min-h-11 rounded-button border px-3 py-2 text-left text-sm transition ${
                selected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-accent"
              }`}
              onClick={() => setScenarioId(item.id)}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs opacity-80">样本 {item.id === "pimpl" ? "1" : item.id === "fallback" ? "2" : "3"}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-card border border-border p-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: scenario.tone }} />
            <p className="font-semibold text-primary">{scenario.title}</p>
          </div>
          <div className="mt-4 rounded-card bg-bg/60 p-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-secondary">resolution trace</p>
            <code className="block break-words text-xs leading-5 text-accent">{scenario.path}</code>
          </div>
          <p className="mb-0 mt-3 text-sm leading-6 text-secondary">{scenario.note}</p>
        </div>
        <div className="rounded-card border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">判定</p>
          <p className="mt-2 text-base font-semibold" style={{ color: scenario.tone }}>
            {scenario.result}
          </p>
          <svg
            viewBox="0 0 360 104"
            role="img"
            aria-label={`${scenario.label} 的 swap 结果状态`}
            className="mt-4 h-auto w-full"
          >
            <rect x="4" y="12" width="352" height="80" rx="14" fill="var(--bg)" stroke={scenario.tone} strokeWidth="2" />
            <text x="24" y="46" fill={scenario.tone} fontSize="15" fontWeight="700">{scenario.label}</text>
            <text x="24" y="70" fill="var(--text-secondary)" fontSize="13">owner / lookup / exception contract</text>
          </svg>
        </div>
      </div>
      <p className="mt-4 text-xs text-secondary" role="status" aria-live="polite">
        当前样本：{scenario.label}；记录查找轨迹、owner 变化与 noexcept 前提，切换后可用重置回到 pimpl 基线。
      </p>
    </section>
  );
}
