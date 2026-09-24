"use client";

import { useState } from "react";

export type ChainRequest = {
  id: string;
  traceId: string;
  authenticated: boolean;
  quota: number;
  path: string;
};
export type ChainResult =
  | { kind: "handled"; handler: string }
  | { kind: "rejected"; handler: string; reason: string }
  | { kind: "unhandled"; requestId: string; reason: string };

export abstract class Handler {
  constructor(protected readonly next?: Handler) {}
  abstract handle(
    request: ChainRequest,
    trace: string[],
  ): ChainResult | undefined;
  protected forward(request: ChainRequest, trace: string[]) {
    return (this.next ?? new ChainTail()).handle(request, trace);
  }
}

export class AuthHandler extends Handler {
  handle(request: ChainRequest, trace: string[]): ChainResult | undefined {
    trace.push("AuthHandler");
    if (!request.authenticated) {
      return { kind: "rejected", handler: "AuthHandler", reason: "未登录" };
    }
    return this.forward(request, trace);
  }
}
export class QuotaHandler extends Handler {
  handle(request: ChainRequest, trace: string[]): ChainResult | undefined {
    trace.push("QuotaHandler");
    if (request.quota <= 0) {
      return {
        kind: "rejected",
        handler: "QuotaHandler",
        reason: "额度已用尽",
      };
    }
    return this.forward(request, trace);
  }
}

export class RouteHandler extends Handler {
  handle(request: ChainRequest, trace: string[]): ChainResult | undefined {
    trace.push("RouteHandler");
    return request.path === "/reports"
      ? { kind: "handled", handler: "RouteHandler" }
      : this.forward(request, trace);
  }
}
export class ChainTail extends Handler {
  constructor(private readonly silent = false) {
    super();
  }
  handle(request: ChainRequest, trace: string[]): ChainResult | undefined {
    trace.push("ChainTail");
    if (this.silent) return undefined; // 仅供故障注入，非合法终态
    return { kind: "unhandled", requestId: request.id, reason: "没有匹配路由" };
  }
}

export function dispatch(
  request: ChainRequest,
  head?: Handler,
  trace: string[] = [],
): ChainResult {
  const result = (head ?? new ChainTail()).handle(request, trace);
  if (result === undefined) throw new Error("链尾静默丢弃请求");
  return result;
}
export function buildChain(silentTail = false): Handler {
  return new AuthHandler(
    new QuotaHandler(new RouteHandler(new ChainTail(silentTail))),
  );
}
export function runRequestPipeline(request: ChainRequest, silentTail = false) {
  const trace: string[] = [];
  const result = buildChain(silentTail).handle(request, trace);
  return { result, trace }; // 实验保留故障空值；正常调用方使用 dispatch
}

type Scenario = "accepted" | "guest" | "quota" | "unhandled";
const BASE_REQUEST: ChainRequest = {
  id: "r1",
  traceId: "t1",
  authenticated: true,
  quota: 1,
  path: "/reports",
};
const SCENARIOS: Record<Scenario, { label: string; request: ChainRequest }> = {
  accepted: { label: "已登录且有额度", request: BASE_REQUEST },
  guest: {
    label: "未登录请求",
    request: { ...BASE_REQUEST, authenticated: false },
  },
  quota: { label: "额度已用尽", request: { ...BASE_REQUEST, quota: 0 } },
  unhandled: {
    label: "没有匹配路由",
    request: { ...BASE_REQUEST, path: "/unknown" },
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
  // 选择/切换时执行无副作用模型作预览，运行按钮保存同一模型的轨迹。
  const execution = runRequestPipeline(current.request, silentTail);
  const { result, trace } = execution;
  const lost = result === undefined;
  const visitedCount = trace.length;
  const resultLabel = !result
    ? "无结果：链尾静默丢弃"
    : result.kind === "handled"
      ? "路由处理成功"
      : result.kind === "rejected"
        ? result.reason
        : "未处理：" + result.reason;
  const stopAt =
    result && result.kind !== "unhandled" ? result.handler : "ChainTail";
  const resultKindLabel = !result
    ? "结果丢失"
    : result.kind === "handled"
      ? "终局成功"
      : result.kind === "rejected"
        ? "终局拒绝"
        : "终局未处理";
  const resultTone =
    result?.kind === "handled"
      ? "border-success text-success"
      : "border-warning text-warning";

  function addEvent(label: string, detail: string, tone: TraceEvent["tone"]) {
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
      "neutral",
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
    const run = runRequestPipeline(current.request, silentTail);
    setRunCount((count) => count + 1);
    const outcome = run.result;
    setEvents((items) => [
      ...items,
      ...run.trace.map((name, index) => ({
        id: items.length + index + 1,
        label: name,
        detail:
          index < run.trace.length - 1
            ? "转交后继"
            : !outcome
              ? "静默丢弃：没有合法终态"
              : outcome.kind === "handled"
                ? "处理成功，停止传递"
                : outcome.kind === "rejected"
                  ? "拒绝：" + outcome.reason
                  : "未处理：" + outcome.reason + "；请求 " + outcome.requestId,
        tone:
          index < run.trace.length - 1
            ? ("neutral" as const)
            : outcome?.kind === "handled"
              ? ("success" as const)
              : ("warning" as const),
      })),
    ]);
  }

  function reset() {
    setScenario("accepted");
    setSilentTail(false);
    setRunCount(0);
    setEvents([]);
  }

  const nodes = [
    "AuthHandler",
    "QuotaHandler",
    "RouteHandler",
    "ChainTail",
  ].map((name) => {
    const active = trace.includes(name);
    const stop = active && name === trace.at(-1);
    return {
      name,
      active,
      stop,
      detail: !active ? "未访问" : stop ? resultLabel : "转交后继",
    };
  });

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
              选择请求场景，预览实际执行轨迹；运行按钮记录一次执行。访问数包含实际到达的链尾。
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
                        ? "border-accent text-accent"
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
              <span
                className={
                  "rounded-control border px-2 py-1 text-xs " + resultTone
                }
              >
                {resultKindLabel}
              </span>
            </div>

            <div className="mt-4 rounded-control border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">Request</p>
                <span className="font-mono text-xs text-primary">
                  {"POST " + current.request.path}
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-secondary">
                请求只携带上下文，不需要知道哪个处理者会最终接手。
              </p>
            </div>

            <svg
              aria-label={
                "请求执行路径：" + trace.join(" → ") + "；" + resultLabel
              }
              className="mt-4 block h-auto w-full"
              data-result-kind={result?.kind ?? "silent-fault"}
              data-trace={trace.join(",")}
              role="img"
              viewBox="0 0 330 410"
            >
              <title>实际请求路径与终止边界</title>
              <text x="12" y="26" fill="var(--text-secondary)" fontSize="20">
                实线：已访问 · 虚线：未执行
              </text>
              {nodes.map((node, index) => {
                const y = 63 + index * 90;
                const terminalColor =
                  result?.kind === "handled"
                    ? "var(--success)"
                    : "var(--warning)";
                const color = node.stop
                  ? terminalColor
                  : node.active
                    ? "var(--accent)"
                    : "var(--text-secondary)";
                return (
                  <g
                    data-node={node.name}
                    data-visited={node.active}
                    data-stop={node.stop}
                    key={node.name}
                  >
                    {index < nodes.length - 1 && (
                      <line
                        x1="38"
                        y1={y + 15}
                        x2="38"
                        y2={y + 75}
                        stroke={
                          nodes[index + 1].active
                            ? "var(--accent)"
                            : "var(--border)"
                        }
                        strokeWidth="3"
                        strokeDasharray={
                          nodes[index + 1].active ? "none" : "5 5"
                        }
                      />
                    )}
                    <circle
                      cx="38"
                      cy={y}
                      r="14"
                      fill="var(--bg)"
                      stroke={color}
                      strokeWidth="3"
                    />
                    {node.active && (
                      <circle cx="38" cy={y} r="6" fill={color} />
                    )}
                    <text x="69" y={y - 2} fill={color} fontSize="20">
                      {node.name}
                    </text>
                    <text
                      x="69"
                      y={y + 24}
                      fill="var(--text-secondary)"
                      fontSize="20"
                    >
                      {node.detail}
                    </text>
                    {node.stop && (
                      <g
                        data-terminal-boundary={result?.kind ?? "silent-fault"}
                      >
                        <polygon
                          points={`5,${y - 7} 18,${y} 5,${y + 7}`}
                          fill={terminalColor}
                        />
                        <line
                          x1="18"
                          y1={y + 31}
                          x2="58"
                          y2={y + 31}
                          stroke={terminalColor}
                          strokeWidth="4"
                        />
                        <text
                          x="69"
                          y={y + 50}
                          fill={terminalColor}
                          fontSize="20"
                        >
                          {lost
                            ? "故障：终局丢失"
                            : result?.kind === "unhandled"
                              ? "尾部：明确未处理"
                              : "终止：不再传递"}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="mt-3 rounded-control border border-border px-3 py-2 text-center font-mono text-xs text-secondary">
              {trace.join(" → ") +
                (lost
                  ? " → ∅"
                  : result?.kind === "handled"
                    ? " → ✓"
                    : result?.kind === "rejected"
                      ? " → ✕"
                      : " → 未处理")}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">已访问节点</p>
                <p className="mt-2 font-mono text-lg text-primary">
                  {visitedCount}
                </p>
              </div>
              <div className={"rounded-control border p-3 " + resultTone}>
                <p className="text-xs font-semibold">当前结果</p>
                <p className="mt-2 text-xs leading-5 text-primary">
                  {resultLabel}
                </p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">运行次数</p>
                <p className="mt-2 font-mono text-lg text-primary">
                  {runCount}
                </p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={"mt-4 rounded-control border p-4 " + resultTone}
              role="status"
            >
              <p className="text-sm font-semibold">
                {lost
                  ? "反例：链尾没有终局结果，掉单被伪装成正常无响应"
                  : result?.kind === "handled"
                    ? "合同观察：RouteHandler 一次性处理请求"
                    : result?.kind === "unhandled"
                      ? "合同观察：ChainTail 显式报告未处理"
                      : "合同观察：" + stopAt + " 给出可追踪拒绝"}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {lost
                  ? "责任链允许请求无人处理，但必须显式报告；否则调用方无法区分配置错误与业务成功。"
                  : "处理者只需要知道自己的规则和后继者，不需要让请求发送者了解整条链的具体顺序。"}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">传递轨迹</p>
                <span className="text-xs text-secondary">
                  {events.length} 条
                </span>
              </div>
              <div className="mt-2 space-y-2">
                {events.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    选择请求、注入链尾反例或运行一次后，这里会记录处理证据。
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      className={
                        "rounded-control border px-3 py-2 text-xs " +
                        toneClass(event.tone)
                      }
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
