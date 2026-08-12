"use client";

import { useState, type CSSProperties } from "react";

const shellStyle = {
  "--event-accent": "#c2410c",
  "--event-accent-soft": "#ffedd5",
  "--event-ink": "#172033",
  "--event-muted": "#94a3b8",
  "--event-warning": "#b45309",
} as CSSProperties;

const conceptLabels = [
  "Designing a Type That Exposes an Event",
  "Defining EventArgs Data and the Event Member",
  "Raising and Translating Events",
  "How the Compiler Implements an Event",
  "Designing a Type That Listens for an Event",
  "Explicitly Implementing an Event",
] as const;

function ResetButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      {label}
    </button>
  );
}

export function CvcEventTimelineLab() {
  const [committed, setCommitted] = useState(true);
  const stages = committed ? ["validate", "commit", "snapshot", "raise"] : ["validate", "raise", "commit", "inconsistent"];

  return (
    <section aria-label="event fact timeline lab" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Event Fact Timeline</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先决定事件代表哪个已提交事实</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">事件应在状态提交后发布；切换到过早 raise，观察 subscriber 可能看到尚未成立的状态。</p>
        </div>
        <ResetButton onClick={() => setCommitted(true)} label="重置时序" />
      </header>

      <div className="p-4">
        <svg viewBox="0 0 720 250" role="img" aria-label={committed ? "提交状态后发布事件" : "提交状态前发布事件"} className="h-auto w-full rounded-control border border-border bg-bg">
          <title>{committed ? "Committed event timeline" : "Early event timeline"}</title>
          <line x1="78" y1="110" x2="642" y2="110" stroke="var(--event-muted)" strokeWidth="4" />
          {stages.map((stage, index) => {
            const x = 78 + index * 188;
            const bad = !committed && stage === "inconsistent";
            return (
              <g key={stage}>
                <circle cx={x} cy="110" r={bad ? 28 : 23} fill={bad ? "#fef3c7" : index === 3 ? "var(--event-accent)" : "white"} stroke={bad ? "var(--event-warning)" : index === 3 ? "var(--event-accent)" : "var(--event-muted)"} strokeWidth="4" />
                <text x={x} y="115" textAnchor="middle" fontSize="12" fontWeight="700" fill={bad ? "var(--event-ink)" : index === 3 ? "white" : "var(--event-ink)"}>{index + 1}</text>
                <text x={x} y="56" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--event-ink)">{stage}</text>
                <text x={x} y="174" textAnchor="middle" fontSize="11" fill="var(--event-ink)">{stage === "commit" ? "state fact" : stage === "snapshot" ? "immutable args" : stage === "raise" ? "external code" : stage === "inconsistent" ? "wrong order" : "input"}</text>
              </g>
            );
          })}
          <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={committed ? "var(--event-accent)" : "var(--event-warning)"}>{committed ? "推荐：commit → snapshot → raise" : "风险：raise 早于 commit，通知不再代表已提交事实"}</text>
        </svg>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-relaxed text-secondary">当前路径：{committed ? "提交后通知" : "过早通知"}。</p>
          <button type="button" aria-pressed={!committed} onClick={() => setCommitted((value) => !value)} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-warning hover:text-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{committed ? "注入过早 raise" : "恢复提交后 raise"}</button>
        </div>
      </div>
    </section>
  );
}

export function CvcEventDispatchLab() {
  const [failure, setFailure] = useState(false);
  const handlers = failure ? ["handler A", "throws", "skipped"] : ["handler A", "handler B", "handler C"];

  return (
    <section aria-label="event delegate dispatch lab" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Delegate Dispatch</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">snapshot 稳定列表，不替你决定异常策略</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">切换第一个 handler 失败，观察默认 multicast Invoke 如何停止，以及逐个隔离时需要的显式 policy。</p>
        </div>
        <ResetButton onClick={() => setFailure(false)} label="重置分发" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-wrap content-start gap-2">
          <button type="button" aria-pressed={!failure} onClick={() => setFailure(false)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${!failure ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>全部成功</button>
          <button type="button" aria-pressed={failure} onClick={() => setFailure(true)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${failure ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>首个失败</button>
          <p className="w-full rounded-control border border-border bg-bg p-3 text-sm leading-relaxed text-secondary">若要继续通知后续 handler，应使用 GetInvocationList 逐个调用、记录异常并定义 aggregate/fail-fast 规则。</p>
        </div>
        <div className="rounded-control border border-border bg-bg p-3">
          <svg viewBox="0 0 720 250" role="img" aria-label={failure ? "第一个事件handler失败并中断" : "三个事件handler按顺序调用"} className="h-auto w-full">
            <title>Multicast delegate dispatch</title>
            <line x1="96" y1="110" x2="624" y2="110" stroke="var(--event-muted)" strokeWidth="4" />
            {handlers.map((handler, index) => {
              const x = 96 + index * 264;
              const bad = failure && index === 1;
              return (
                <g key={handler}>
                  <rect x={x - 70} y="76" width="140" height="68" rx="12" fill={bad ? "#fef3c7" : "var(--event-accent-soft)"} stroke={bad ? "var(--event-warning)" : "var(--event-accent)"} strokeWidth="3" />
                  <text x={x} y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--event-ink)">{handler}</text>
                  <text x={x} y="127" textAnchor="middle" fontSize="11" fill="var(--event-ink)">{bad ? "exception" : index === 0 ? "snapshot" : failure && index === 2 ? "not invoked" : "invoked"}</text>
                </g>
              );
            })}
            <text x="360" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill={failure ? "var(--event-warning)" : "var(--event-accent)"}>{failure ? "默认 Invoke：handler B 之后的通知被中断" : "默认 Invoke：按 invocation list 同步、有序调用"}</text>
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">当前策略：{failure ? "fail-fast" : "顺序通知"}；snapshot 不会自动隔离 handler 异常。</p>
        </div>
      </div>
    </section>
  );
}

export function CvcSubscriptionLifetimeLab() {
  const [disposed, setDisposed] = useState(false);
  const nodes = disposed ? ["publisher", "registration", "released"] : ["publisher", "delegate", "subscriber"];

  return (
    <section aria-label="event subscription lifetime lab" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Subscription Lifetime</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">把退订责任交给明确 owner</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">publisher 的 delegate 会强引用 subscriber；切换 Dispose，观察可达性是否解除。</p>
        </div>
        <ResetButton onClick={() => setDisposed(false)} label="重置订阅" />
      </header>

      <div className="p-4">
        <svg viewBox="0 0 720 250" role="img" aria-label={disposed ? "订阅释放后publisher与subscriber解除引用" : "publisher通过delegate强引用subscriber"} className="h-auto w-full rounded-control border border-border bg-bg">
          <title>{disposed ? "Disposed event subscription" : "Strong event subscription"}</title>
          <line x1="115" y1="110" x2="605" y2="110" stroke={disposed ? "var(--event-muted)" : "var(--event-accent)"} strokeWidth="5" strokeDasharray={disposed ? "10 10" : undefined} />
          {nodes.map((node, index) => {
            const x = 115 + index * 245;
            return (
              <g key={node}>
                <circle cx={x} cy="110" r="31" fill={index === 1 && !disposed ? "var(--event-accent)" : "white"} stroke={index === 1 && !disposed ? "var(--event-accent)" : "var(--event-muted)"} strokeWidth="4" />
                <text x={x} y="115" textAnchor="middle" fontSize="12" fontWeight="700" fill={index === 1 && !disposed ? "white" : "var(--event-ink)"}>{index + 1}</text>
                <text x={x} y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--event-ink)">{node}</text>
                <text x={x} y="174" textAnchor="middle" fontSize="11" fill="var(--event-ink)">{index === 0 ? "long-lived" : index === 1 ? (disposed ? "IDisposable" : "delegate") : (disposed ? "collectable" : "strong root")}</text>
              </g>
            );
          })}
          <text x="360" y="210" textAnchor="middle" fontSize="12" fontWeight="700" fill={disposed ? "var(--event-accent)" : "var(--event-warning)"}>{disposed ? "Dispose / unsubscribe：subscriber 可进入回收判定" : "未退订：long-lived publisher 保持 subscriber 可达"}</text>
        </svg>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-relaxed text-secondary">当前状态：{disposed ? "subscription 已释放" : "subscription 仍持有"}。</p>
          <button type="button" aria-pressed={disposed} onClick={() => setDisposed((value) => !value)} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{disposed ? "重新订阅" : "Dispose / 退订"}</button>
        </div>
      </div>
    </section>
  );
}

export const cvcEventsConceptLabels = conceptLabels;
