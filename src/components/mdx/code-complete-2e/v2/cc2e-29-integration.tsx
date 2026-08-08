"use client";

import { useState } from "react";

type Focus = "order" | "batch" | "diagnose";
type Strategy = "top-down" | "bottom-up" | "risk";

const STAGES = ["构件基线", "集成顺序", "每日构建", "冒烟测试", "系统回归"] as const;
const STRATEGIES: readonly Strategy[] = ["top-down", "bottom-up", "risk"];
const STRATEGY_LABELS: Record<Strategy, string> = {
  "top-down": "自顶向下",
  "bottom-up": "自底向上",
  risk: "风险导向",
};
const CONTROL =
  "min-h-11 rounded-control border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

function Reset({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      onClick={onClick}
    >
      重置实验
    </button>
  );
}

function Header({
  eyebrow,
  title,
  description,
  onReset,
}: {
  eyebrow: string;
  title: string;
  description: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Reset onClick={onReset} />
    </div>
  );
}

function EvidenceChain({
  active,
  failure,
  subtitle,
  ariaLabel,
}: {
  active: number;
  failure: number;
  subtitle: string;
  ariaLabel: string;
}) {
  return (
    <svg viewBox="0 0 760 350" className="h-auto w-full" role="img" aria-label={ariaLabel}>
      <rect x="1" y="1" width="758" height="348" rx="18" fill="var(--bg-elevated)" stroke="var(--border)" />
      <text x="32" y="38" fontSize="17" fontWeight="700" fill="var(--text-primary)">集成证据链</text>
      <text x="32" y="64" fontSize="13" fill="var(--text-secondary)">{subtitle}</text>
      {STAGES.map((stage, index) => {
        const x = 24 + index * 148;
        const isFailure = index === failure;
        const skipped = failure >= 0 && index > failure;
        const selected = index === active;
        return (
          <g key={stage}>
            {index < STAGES.length - 1 ? (
              <path d={`M${x + 116} 170H${x + 140}`} stroke={failure >= 0 && index >= failure ? "var(--danger)" : "var(--accent)"} strokeWidth="3" strokeLinecap="round" />
            ) : null}
            <rect x={x} y="124" width="116" height="92" rx="12" fill={isFailure ? "var(--danger)" : "var(--bg)"} fillOpacity={isFailure ? 0.14 : 1} stroke={isFailure ? "var(--danger)" : selected ? "var(--accent)" : "var(--border)"} strokeWidth={isFailure || selected ? 2.5 : 1.5} strokeDasharray={skipped ? "5 4" : undefined} />
            <circle cx={x + 22} cy="148" r="11" fill={isFailure ? "var(--danger)" : selected ? "var(--accent)" : "var(--bg)"} />
            <text x={x + 22} y="152" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg)">{index + 1}</text>
            <text x={x + 58} y="153" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{stage}</text>
            <text x={x + 58} y="184" textAnchor="middle" fontSize="12" fill={isFailure ? "var(--danger)" : "var(--text-secondary)"}>{isFailure ? "首个失败" : skipped ? "未运行" : "可复核"}</text>
            <text x={x + 58} y="204" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{isFailure ? "保存偏离" : skipped ? "等待修复" : "留下记录"}</text>
          </g>
        );
      })}
      <path d="M32 268H728" stroke="var(--border)" strokeWidth="1" />
      <text x="32" y="298" fontSize="12" fill="var(--text-secondary)">每一步保留输入、构建版本、断言和回退点；故障只改变一个直接条件。</text>
      <text x="32" y="322" fontSize="12" fontWeight="600" fill={failure >= 0 ? "var(--danger)" : "var(--success)"}>{failure >= 0 ? "拒绝：先修复首个偏离，再继续后续集成" : "通过：主线保持可构建，证据可以继续累积"}</text>
    </svg>
  );
}

export function Cc2e29IntegrationLab({ focus }: { focus: Focus }) {
  const [strategy, setStrategy] = useState<Strategy>("risk");
  const [batchSize, setBatchSize] = useState(2);
  const [dailyBuild, setDailyBuild] = useState(true);
  const [fault, setFault] = useState(false);

  const reset = () => {
    setStrategy("risk");
    setBatchSize(2);
    setDailyBuild(true);
    setFault(false);
  };

  if (focus === "order") {
    const active = strategy === "top-down" ? 1 : strategy === "bottom-up" ? 3 : 0;
    const explanation = strategy === "top-down" ? "先接通可见主流程，再用替身隔离未完成的底层细节。" : strategy === "bottom-up" ? "先验证底层构件，再逐层向上接通调用者。" : "先处理依赖扇出和失败代价最高的接口，尽早暴露风险。";
    return (
      <section aria-label="集成顺序选择实验" className="not-prose my-6 rounded-card border border-border bg-card p-4 sm:p-5" data-visual-kind="cc2e-29-integration-order" data-unit-id="cc2e-29-integration">
        <Header eyebrow="29.1 集成方式的重要性 · 29.3 增量集成的策略" title="先接哪一块，决定故障能否被定位" description="先预测顺序会让哪一个节点最早获得证据，再比较三种策略。关键是让依赖、风险和回退点能被说明。" onReset={reset} />
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="space-y-3"><p className="text-sm font-medium text-foreground">选择集成策略</p><div className="grid gap-2">{STRATEGIES.map((item) => <button key={item} type="button" className={`${CONTROL} ${strategy === item ? "border-primary bg-primary/10" : ""}`} aria-pressed={strategy === item} onClick={() => setStrategy(item)}>{STRATEGY_LABELS[item]}</button>)}</div><p className="rounded-control border border-border bg-background p-3 text-sm leading-relaxed text-secondary" role="status">{explanation}</p></div>
          <div className="rounded-card border border-border bg-background p-3 sm:p-4"><EvidenceChain active={active} failure={-1} subtitle={`当前选择：${STRATEGY_LABELS[strategy]} · 先留下可复核的边界证据`} ariaLabel={`集成顺序实验，当前选择${STRATEGY_LABELS[strategy]}，证据链包含${STAGES.join("、")}`} /></div>
        </div>
      </section>
    );
  }

  if (focus === "batch") {
    const fanout = 4;
    const signal = batchSize * fanout;
    const failure = dailyBuild && batchSize <= 2 ? -1 : 3;
    const message = dailyBuild ? batchSize <= 2 ? "小批次且每日构建：失败范围窄，能在下一次构建前完成回退。" : "批次过大：一次变化触及太多依赖，定位成本上升。" : "没有每日构建：问题会穿过多个节点，直到冒烟或回归才暴露。";
    return (
      <section aria-label="阶段式与增量集成实验" className="not-prose my-6 rounded-card border border-border bg-card p-4 sm:p-5" data-visual-kind="cc2e-29-integration-batch" data-unit-id="cc2e-29-integration">
        <Header eyebrow="29.2 集成频率 · 29.4 Daily Build 与冒烟测试" title="批次越大，接口差异越难隔离" description="拖动一次合入的构件数量，观察风险信号如何随依赖扇出增长；再关闭每日构建，比较反馈窗口。" onReset={reset} />
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="space-y-3"><label className="block text-sm font-medium text-foreground">单批次构件数：{batchSize}<input aria-label="单批次构件数" className="mt-2 h-11 w-full accent-[var(--accent)]" type="range" min="1" max="5" value={batchSize} onChange={(event) => setBatchSize(Number(event.target.value))} /></label><button type="button" className={`${CONTROL} w-full ${!dailyBuild ? "border-danger bg-danger/10" : ""}`} aria-pressed={dailyBuild} onClick={() => setDailyBuild((value) => !value)}>{dailyBuild ? "每日构建：开启" : "每日构建：关闭"}</button><dl className="grid grid-cols-2 gap-2"><div className="rounded-control border border-border bg-background p-3"><dt className="text-xs text-muted-foreground">依赖扇出</dt><dd className="mt-1 text-lg font-semibold text-foreground">{fanout}</dd></div><div className="rounded-control border border-border bg-background p-3"><dt className="text-xs text-muted-foreground">风险信号</dt><dd className="mt-1 text-lg font-semibold text-foreground">{signal}</dd></div></dl><p className="rounded-control border border-border bg-background p-3 text-sm leading-relaxed text-secondary" role="status">{message}</p></div>
          <div className="rounded-card border border-border bg-background p-3 sm:p-4"><EvidenceChain active={dailyBuild ? 2 : 3} failure={failure} subtitle={`批次 ${batchSize} × 扇出 ${fanout} = 风险信号 ${signal}`} ariaLabel={`集成批次实验，单批次${batchSize}个构件，依赖扇出${fanout}，风险信号${signal}`} /></div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="集成故障诊断实验" className="not-prose my-6 rounded-card border border-border bg-card p-4 sm:p-5" data-visual-kind="cc2e-29-integration-diagnose" data-unit-id="cc2e-29-integration">
      <Header eyebrow="关键点 · 持续集成 · 系统回归" title="只注入一个接口故障，保留首个偏离" description="先看一条可通过的主线，再打开故障开关。诊断目标是记录第一个不满足合同的节点，并从同一基线重放。" onReset={reset} />
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="space-y-3"><p className="text-sm font-medium text-foreground">故障注入</p><button type="button" className={`${CONTROL} w-full ${fault ? "border-danger bg-danger/10" : ""}`} aria-pressed={fault} onClick={() => setFault((value) => !value)}>{fault ? "已注入：接口返回不兼容字段" : "注入接口不兼容故障"}</button><p className="rounded-control border border-border bg-background p-3 text-sm leading-relaxed text-secondary" role="status">{fault ? "冒烟测试应拒绝当前构建；先保存版本、输入和失败断言，再修复接口并重放。" : "所有节点都能留下证据。打开故障后，比较首个失败位置是否仍然可定位。"}</p><div className="rounded-control border border-border bg-background p-3 text-sm leading-relaxed text-secondary">复位验收：关闭故障开关后点击“重置实验”，确认策略、批次和主线状态回到初始基线。</div></div>
        <div className="rounded-card border border-border bg-background p-3 sm:p-4"><EvidenceChain active={fault ? 3 : 4} failure={fault ? 3 : -1} subtitle={fault ? "接口断言失败 · 保存偏离后停止扩散" : "基线一致 · 冒烟与回归均可继续"} ariaLabel={`集成故障诊断实验，${fault ? "接口不兼容，冒烟测试为首个失败节点" : "没有注入故障，所有节点可继续复核"}`} /></div>
      </div>
    </section>
  );
}
