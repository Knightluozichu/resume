"use client";

import { useState } from "react";

type Scenario = "accepted" | "guest" | "quota" | "unhandled";

const SCENARIOS: Record<
  Scenario,
  {
    label: string;
    request: string;
    stopAt: string;
    result: string;
    tone: "success" | "warning";
  }
> = {
  accepted: {
    label: "已登录且有额度",
    request: "POST /reports",
    stopAt: "RouteHandler",
    result: "路由处理成功",
    tone: "success",
  },
  guest: {
    label: "未登录请求",
    request: "POST /reports",
    stopAt: "AuthHandler",
    result: "身份拒绝，后续不再调用",
    tone: "warning",
  },
  quota: {
    label: "额度已用尽",
    request: "POST /reports",
    stopAt: "QuotaHandler",
    result: "配额拒绝，后续不再调用",
    tone: "warning",
  },
  unhandled: {
    label: "没有匹配路由",
    request: "POST /unknown",
    stopAt: "ChainTail",
    result: "链尾显式报告未处理",
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

export function ChainOfResponsibilityRequestPipelineLab() {
  const [scenario, setScenario] = useState<Scenario>("accepted");
  const [silentTail, setSilentTail] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [events, setEvents] = useState<TraceEvent[]>([]);

  const current = SCENARIOS[scenario];
  const visitedCount = silentTail && scenario === "unhandled" ? 3 : scenario === "accepted" ? 3 : scenario === "guest" ? 1 : scenario === "quota" ? 2 : 3;

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

  function chooseScenario(next: Scenario) {
    setScenario(next);
    addEvent(
      "选择请求",
      SCENARIOS[next].label +
        "：沿 Auth → Quota → Route 顺序传递，只有一个节点应该给出终局结果。",
      next === "accepted" ? "success" : "warning",
    );
  }

  function toggleSilentTail() {
    const next = !silentTail;
    setSilentTail(next);
    addEvent(
      next ? "注入链尾反例" : "恢复显式链尾",
      next
        ? "未匹配请求到达链尾后被静默丢弃，调用方无法区分成功、拒绝和配置错误。"
        : "链尾重新返回可追踪的未处理结果，配置错误不会伪装成无响应。",
      next ? "warning" : "success",
    );
  }

  function runChain() {
    setRunCount((count) => count + 1);
    addEvent(
      silentTail && scenario === "unhandled" ? "静默丢弃请求" : "运行责任链",
      silentTail && scenario === "unhandled"
        ? "反例路径：三个处理者都放行后，链尾没有结果，调用方无法完成一次性验收。"
        : current.result + "；终局节点是 " + current.stopAt + "。",
      silentTail && scenario === "unhandled" ? "warning" : current.tone,
    );
  }

  function reset() {
    setScenario("accepted");
    setSilentTail(false);
    setRunCount(0);
    setEvents([]);
  }

  const nodes = [
    {
      name: "AuthHandler",
      detail: scenario === "guest" ? "拒绝请求" : "放行",
      active: visitedCount >= 1,
      stop: scenario === "guest",
    },
    {
      name: "QuotaHandler",
      detail: scenario === "quota" ? "拒绝请求" : "放行",
      active: visitedCount >= 2,
      stop: scenario === "quota",
    },
    {
      name: "RouteHandler",
      detail: scenario === "unhandled" ? "继续到链尾" : "处理请求",
      active: visitedCount >= 3,
      stop: scenario === "accepted",
    },
  ];
  const resultTone = silentTail && scenario === "unhandled" ? "border-warning text-warning" : current.tone === "success" ? "border-success text-success" : "border-warning text-warning";

  return (
    <section
      aria-label="责任链模式请求处理实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-18"
      data-visual-kind="chain-of-responsibility-request-pipeline-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CHAIN · SINGLE TERMINAL RESULT
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              身份、配额与路由责任链实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择请求场景，观察处理者何时停止传递，以及链尾为何必须返回可追踪结果。
            </p>
          </div>
          <button
            aria-label="重置责任链模式请求处理实验"
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
              <p className="text-xs font-semibold text-secondary">请求场景</p>
              <div className="mt-2 grid gap-2">
                {(Object.keys(SCENARIOS) as Scenario[]).map((key) => (
                  <button
                    aria-pressed={scenario === key}
                    className={
                      "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                      (scenario === key
                        ? key === "accepted"
                          ? "border-success text-success"
                          : "border-warning text-warning"
                        : "border-border text-secondary hover:border-accent hover:text-primary")
                    }
                    key={key}
                    onClick={() => chooseScenario(key)}
                    type="button"
                  >
                    {SCENARIOS[key].label}
                  </button>
                ))}
              </div>
            </div>

            <button
              aria-pressed={silentTail}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                (silentTail
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary")
              }
              onClick={toggleSilentTail}
              type="button"
            >
              {silentTail ? "关闭反例：恢复显式链尾" : "注入反例：链尾静默丢弃"}
            </button>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={runChain}
              type="button"
            >
              运行责任链
            </button>
            <p className="text-xs leading-5 text-secondary">
              先预测请求会在哪个节点终止，再运行一次；每个请求只能得到一次成功、拒绝或未处理结果。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                REQUEST → HANDLERS → RESULT
              </p>
              <span className={"rounded-control border px-2 py-1 text-xs " + resultTone}>
                {silentTail && scenario === "unhandled"
                  ? "结果丢失"
                  : current.tone === "success"
                    ? "终局成功"
                    : "终局拒绝"}
              </span>
            </div>

            <div className="mt-4 rounded-control border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">Request</p>
                <span className="font-mono text-xs text-primary">{current.request}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-secondary">
                请求只携带上下文，不需要知道哪个处理者会最终接手。
              </p>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {nodes.map((node) => (
                <div
                  className={
                    "rounded-control border p-3 " +
                    (node.stop
                      ? "border-warning"
                      : node.active
                        ? "border-accent"
                        : "border-border")
                  }
                  key={node.name}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-primary">{node.name}</p>
                    <span className="font-mono text-[11px] text-secondary">
                      {node.active ? "已访问" : "未访问"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-secondary">{node.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-control border border-border px-3 py-2 text-center font-mono text-xs text-secondary">
              {silentTail && scenario === "unhandled"
                ? "RouteHandler → ∅"
                : scenario === "accepted"
                  ? "Auth → Quota → Route → ✓"
                  : scenario === "guest"
                    ? "Auth → ✕"
                    : scenario === "quota"
                      ? "Auth → Quota → ✕"
                      : "Auth → Quota → Route → ChainTail"}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">已访问节点</p>
                <p className="mt-2 font-mono text-lg text-primary">{visitedCount}</p>
              </div>
              <div className={"rounded-control border p-3 " + resultTone}>
                <p className="text-xs font-semibold">当前结果</p>
                <p className="mt-2 text-xs leading-5 text-primary">
                  {silentTail && scenario === "unhandled" ? "无结果" : current.result}
                </p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">运行次数</p>
                <p className="mt-2 font-mono text-lg text-primary">{runCount}</p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={"mt-4 rounded-control border p-4 " + resultTone}
              role="status"
            >
              <p className="text-sm font-semibold">
                {silentTail && scenario === "unhandled"
                  ? "反例：链尾没有终局结果，掉单被伪装成正常无响应"
                  : current.tone === "success"
                    ? "合同观察：RouteHandler 一次性处理请求"
                    : "合同观察：" + current.stopAt + " 给出可追踪拒绝"}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {silentTail && scenario === "unhandled"
                  ? "责任链允许请求无人处理，但必须显式报告；否则调用方无法区分配置错误与业务成功。"
                  : "处理者只需要知道自己的规则和后继者，不需要让请求发送者了解整条链的具体顺序。"}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">传递轨迹</p>
                <span className="text-xs text-secondary">{events.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {events.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    选择请求、注入链尾反例或运行一次后，这里会记录处理证据。
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
