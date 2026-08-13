"use client";

import { useState } from "react";

type ProxyMode = "lazy" | "remote" | "guarded";
type Outcome = "ready" | "denied" | "stale";

const MODES: Record<
  ProxyMode,
  { label: string; proxyAction: string; realAction: string; result: string }
> = {
  lazy: {
    label: "延迟创建",
    proxyAction: "检查是否进入视口",
    realAction: "创建并加载图片",
    result: "只在需要时创建真实对象",
  },
  remote: {
    label: "远程代理",
    proxyAction: "转发请求并记录边界",
    realAction: "访问远程图片服务",
    result: "把位置差异藏在同一合同后",
  },
  guarded: {
    label: "访问控制",
    proxyAction: "检查权限与缓存",
    realAction: "读取受保护图片",
    result: "拒绝未授权访问并保留原因",
  },
};

const OUTCOMES: Record<
  Outcome,
  { label: string; proxyResult: string; realResult: string; tone: "success" | "warning" }
> = {
  ready: {
    label: "访问正常",
    proxyResult: "允许委托",
    realResult: "返回已校验图片",
    tone: "success",
  },
  denied: {
    label: "权限拒绝",
    proxyResult: "拒绝并报告原因",
    realResult: "不会被调用",
    tone: "warning",
  },
  stale: {
    label: "缓存过期",
    proxyResult: "重新校验后再委托",
    realResult: "等待新版本",
    tone: "warning",
  },
};

type TraceEvent = {
  id: number;
  label: string;
  detail: string;
  tone: "success" | "warning" | "neutral";
};

function toneClass(tone: TraceEvent["tone"]) {
  if (tone === "success") return "border-success text-success";
  if (tone === "warning") return "border-warning text-warning";
  return "border-border text-secondary";
}

export function ProxyAccessBoundaryLab() {
  const [mode, setMode] = useState<ProxyMode>("lazy");
  const [outcome, setOutcome] = useState<Outcome>("ready");
  const [bypassProxy, setBypassProxy] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [events, setEvents] = useState<TraceEvent[]>([]);

  const currentMode = MODES[mode];
  const currentOutcome = OUTCOMES[outcome];

  function addEvent(
    label: string,
    detail: string,
    tone: TraceEvent["tone"],
  ) {
    setEvents((items) => [
      ...items,
      { id: items.length + 1, label, detail, tone },
    ]);
  }

  function chooseMode(next: ProxyMode) {
    setMode(next);
    addEvent(
      "选择代理职责",
      MODES[next].label +
        "：代理仍然遵守同一个 display() 合同，真实对象只承担自己的工作。",
      "success",
    );
  }

  function chooseOutcome(next: Outcome) {
    setOutcome(next);
    addEvent(
      "注入访问结果",
      OUTCOMES[next].label +
        "：先观察代理是否应该委托，再决定真实对象是否被调用。",
      next === "ready" ? "success" : "warning",
    );
  }

  function toggleBypass() {
    const next = !bypassProxy;
    setBypassProxy(next);
    addEvent(
      next ? "启用反例" : "回到代理边界",
      next
        ? "客户端直接持有真实对象，延迟、权限和远程失败处理开始向调用方泄漏。"
        : "客户端重新只依赖 display()，代理恢复访问控制边界。",
      next ? "warning" : "success",
    );
  }

  function runRequest() {
    setRunCount((count) => count + 1);
    addEvent(
      bypassProxy ? "直接调用真实对象" : "调用 Proxy.display()",
      bypassProxy
        ? "反例路径：客户端必须知道创建时机、访问策略和真实对象位置。"
        : currentOutcome.tone === "success"
          ? currentMode.result + "；" + currentOutcome.realResult + "。"
          : currentOutcome.proxyResult + "，真实对象" + currentOutcome.realResult + "。",
      bypassProxy ? "warning" : currentOutcome.tone,
    );
  }

  function reset() {
    setMode("lazy");
    setOutcome("ready");
    setBypassProxy(false);
    setRunCount(0);
    setEvents([]);
  }

  const boundaryTone = bypassProxy
    ? "border-warning text-warning"
    : outcome === "ready"
      ? "border-success text-success"
      : "border-warning text-warning";

  return (
    <section
      aria-label="代理模式访问边界实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-17"
      data-visual-kind="proxy-access-boundary-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              PROXY · ACCESS BOUNDARY
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              代理与真实对象访问边界实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择代理要控制的成本，再注入权限或缓存结果，比较统一合同和直接访问的差异。
            </p>
          </div>
          <button
            aria-label="重置代理模式访问边界实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-xs font-semibold text-secondary">代理职责</p>
              <div className="mt-2 grid gap-2">
                {(Object.keys(MODES) as ProxyMode[]).map((key) => (
                  <button
                    aria-pressed={mode === key}
                    className={
                      "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                      (mode === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary")
                    }
                    key={key}
                    onClick={() => chooseMode(key)}
                    type="button"
                  >
                    {MODES[key].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-secondary">访问结果</p>
              <div className="mt-2 grid gap-2">
                {(Object.keys(OUTCOMES) as Outcome[]).map((key) => (
                  <button
                    aria-pressed={outcome === key}
                    className={
                      "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                      (outcome === key
                        ? key === "ready"
                          ? "border-success text-success"
                          : "border-warning text-warning"
                        : "border-border text-secondary hover:border-accent hover:text-primary")
                    }
                    key={key}
                    onClick={() => chooseOutcome(key)}
                    type="button"
                  >
                    {OUTCOMES[key].label}
                  </button>
                ))}
              </div>
            </div>

            <button
              aria-pressed={bypassProxy}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                (bypassProxy
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary")
              }
              onClick={toggleBypass}
              type="button"
            >
              {bypassProxy
                ? "关闭反例：回到 Proxy.display()"
                : "注入反例：绕过代理直接访问真实对象"}
            </button>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={runRequest}
              type="button"
            >
              {bypassProxy ? "运行直接访问反例" : "运行 Proxy.display()"}
            </button>
            <p className="text-xs leading-5 text-secondary">
              先预测真实对象是否会被调用，再运行一次；代理只控制访问，不改变真实对象的核心职责。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                CLIENT → PROXY → REAL SUBJECT
              </p>
              <span className={"rounded-control border px-2 py-1 text-xs " + boundaryTone}>
                {bypassProxy
                  ? "边界被绕过"
                  : outcome === "ready"
                    ? "允许委托"
                    : "代理先做决策"}
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-control border border-border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-secondary">Client</p>
                  <span className="font-mono text-xs text-primary">
                    {bypassProxy ? "知道实现细节" : "只知道 display()"}
                  </span>
                </div>
                <p className="mt-2 font-mono text-sm text-primary">
                  {bypassProxy ? "new RemoteImage().display()" : "proxy.display()"}
                </p>
              </div>

              <div className="rounded-control border border-accent p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-accent">Proxy</p>
                  <span className="font-mono text-xs text-accent">
                    {bypassProxy ? "未调用" : currentMode.label}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-secondary">
                  {bypassProxy
                    ? "反例：创建、位置、权限与缓存策略全部泄漏给客户端。"
                    : currentMode.proxyAction + "；通过后才委托真实对象。"}
                </p>
              </div>

              <div
                className={
                  "rounded-control border p-3 " +
                  (bypassProxy || outcome === "ready"
                    ? "border-success"
                    : "border-warning")
                }
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-secondary">RealSubject</p>
                  <span className="font-mono text-xs text-primary">
                    {bypassProxy ? "直接暴露" : currentOutcome.realResult}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-secondary">
                  {bypassProxy
                    ? "客户端现在负责决定何时创建、访问哪个位置以及失败如何处理。"
                    : currentMode.realAction + "；真实对象不承担代理策略。"}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">客户端知识</p>
                <p className="mt-2 font-mono text-lg text-primary">
                  {bypassProxy ? "4" : "1"}
                </p>
              </div>
              <div className={"rounded-control border p-3 " + boundaryTone}>
                <p className="text-xs font-semibold">当前决策</p>
                <p className="mt-2 text-xs leading-5 text-primary">
                  {bypassProxy ? "客户端自行委托" : currentOutcome.proxyResult}
                </p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">运行次数</p>
                <p className="mt-2 font-mono text-lg text-primary">{runCount}</p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={"mt-4 rounded-control border p-4 " + boundaryTone}
              role="status"
            >
              <p className="text-sm font-semibold">
                {bypassProxy
                  ? "反例：真实对象的访问策略正在向客户端扩散"
                  : currentOutcome.tone === "success"
                    ? "合同观察：代理允许一次受控委托"
                    : "合同观察：代理先拒绝或重新校验"
                }
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {bypassProxy
                  ? "代理的价值是控制访问成本、位置或权限，不是把真实对象复制一份或吞掉错误。"
                  : "Proxy 与 RealSubject 共享同一使用合同；代理增加访问控制，真实对象仍保留核心职责。"}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">边界轨迹</p>
                <span className="text-xs text-secondary">{events.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {events.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    选择代理职责、注入访问结果或运行一次后，这里会记录决策证据。
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      className={"rounded-control border px-3 py-2 text-xs " + toneClass(event.tone)}
                      key={event.id}
                    >
                      <p className="font-semibold">{event.label}</p>
                      <p className="mt-1 text-secondary">{event.detail}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
