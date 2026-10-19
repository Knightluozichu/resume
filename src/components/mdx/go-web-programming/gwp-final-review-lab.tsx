"use client";

import { useId, useState } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

export type ReviewConfig = {
  mode: "html" | "json";
  strategy: "buffer" | "early";
  fault:
    | "none"
    | "session"
    | "input"
    | "data"
    | "render"
    | "cancel"
    | "release";
};
export const initialReviewConfig: ReviewConfig = {
  mode: "html",
  strategy: "buffer",
  fault: "none",
};
const faultLabels: Record<ReviewConfig["fault"], string> = {
  none: "无故障",
  session: "会话无效",
  input: "重复 id",
  data: "数据不可用",
  render: "表示生成失败",
  cancel: "合作取消",
  release: "候选不一致",
};

/** Explanatory finite model; the browser never executes Go or deploys a service. */
export function deriveReviewState(config: ReviewConfig, frame: number) {
  const early = config.strategy === "early";
  const renderAt = early ? 6 : 5;
  const stopAt = {
    none: 7,
    session: 2,
    input: 3,
    data: 4,
    render: renderAt,
    cancel: 4,
    release: 0,
  }[config.fault];
  const attempted = {
    none: 200,
    session: 401,
    input: 400,
    data: 503,
    render: 500,
    cancel: 503,
    release: null,
  }[config.fault];
  const terminal = frame >= stopAt;
  const earlyCommitted = early && frame >= 5 && stopAt >= 5;
  const successCommitted = config.fault === "none" && frame >= (early ? 5 : 6);
  const status =
    earlyCommitted || successCommitted ? 200 : terminal ? attempted : null;
  const labels = [
    "候选摘要门",
    config.mode === "html" ? "GET /thread" : "GET /api/thread",
    "sid → 会话替身",
    "RawQuery → 唯一 id",
    "Load(context, id)",
    early
      ? "Write(nil) → 200"
      : config.mode === "html"
        ? "HTML 本地缓冲"
        : "JSON Marshal",
    early
      ? config.mode === "html"
        ? "HTML 本地缓冲"
        : "JSON Marshal"
      : "Header → Write",
    "客户端观察边界",
  ];
  const trace = labels.slice(0, Math.min(frame, stopAt) + 1);
  if (terminal && config.fault !== "none") {
    trace.push(
      config.fault === "release"
        ? "阻止启动：没有 HTTP 响应"
        : `故障：${faultLabels[config.fault]}；尝试 ${attempted}`,
    );
  }
  if (config.fault === "cancel" && terminal)
    trace.push(
      "两个 ready → cancel → 两个 stopped → Wait 返回；退出先后不指定",
    );
  if (earlyCommitted && config.fault === "render" && terminal)
    trace.push("500 被已提交的 200 阻挡；错误正文仍可写入");
  if (status !== null)
    trace.push(
      `已提交状态 ${status}；Load 调用 ${frame >= 4 && stopAt >= 4 ? 1 : 0}`,
    );
  return {
    stopAt,
    renderAt,
    terminal,
    status,
    attempted: terminal ? attempted : null,
    earlyCommitted,
    loadCalls: frame >= 4 && stopAt >= 4 ? 1 : 0,
    labels,
    trace,
  };
}

export function ReviewDiagrams({
  config,
  frame,
}: {
  config: ReviewConfig;
  frame: number;
}) {
  const state = deriveReviewState(config, frame);
  const id = useId().replaceAll(":", "");
  const failed = state.terminal && config.fault !== "none";
  const branch = failed && config.fault !== "release";
  const cancel = config.fault === "cancel" && state.terminal;
  return (
    <div className="grid gap-5 lg:grid-cols-2" data-testid="review-diagrams">
      <figure className="m-0 min-w-0">
        <figcaption className="mb-3 text-sm" style={{ color: C.secondary }}>
          请求可达性：实线已走过，虚线未执行；红色回边是错误传播。
        </figcaption>
        <svg
          viewBox="-15 0 330 665"
          role="img"
          aria-label="请求流水线与失败传播"
          className="mx-auto block w-full max-w-[340px]"
          data-testid="review-pipeline"
          data-stop-at={state.stopAt}
        >
          <defs>
            <marker
              id={`${id}-arrow`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L8 4 L0 8 Z" fill={C.secondary} />
            </marker>
            <marker
              id={`${id}-error`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L8 4 L0 8 Z" fill={C.danger} />
            </marker>
          </defs>
          {state.labels.map((label, index) => {
            const reached = index <= frame && index <= state.stopAt;
            const response =
              index === 7 && state.terminal && config.fault !== "release";
            const blocked = index > state.stopAt && index < 7;
            const fault = failed && index === state.stopAt;
            const y = 12 + index * 80;
            return (
              <g
                key={index}
                data-node={index}
                data-state={
                  fault
                    ? "fault"
                    : response || reached
                      ? "reached"
                      : blocked
                        ? "blocked"
                        : "pending"
                }
              >
                {index > 0 && !(failed && index > state.stopAt) && (
                  <path
                    d={`M140 ${y - 23} V${y - 5}`}
                    fill="none"
                    stroke={reached ? C.accent : C.secondary}
                    strokeWidth="2"
                    strokeDasharray={reached ? undefined : "5 4"}
                    markerEnd={`url(#${id}-arrow)`}
                  />
                )}
                <rect
                  x="10"
                  y={y}
                  width="260"
                  height="57"
                  rx="9"
                  fill={C.elevated}
                  stroke={
                    fault ? C.danger : response || reached ? C.accent : C.border
                  }
                  strokeWidth="2"
                  strokeDasharray={blocked ? "5 4" : undefined}
                />
                <text x="23" y={y + 23} fontSize="16" fill={C.primary}>
                  {label}
                </text>
                <text x="23" y={y + 45} fontSize="16" fill={C.secondary}>
                  {index === 7
                    ? state.terminal
                      ? state.status === null
                        ? "未启动 · 无 HTTP"
                        : `已提交 ${state.status}`
                      : "尚无终态"
                    : fault
                      ? faultLabels[config.fault]
                      : blocked
                        ? "被前序故障截断"
                        : reached
                          ? "已到达"
                          : "尚未执行"}
                </text>
              </g>
            );
          })}
          {branch && (
            <path
              data-testid="review-error-edge"
              d={`M270 ${40 + state.stopAt * 80} H288 V650 H140 V635`}
              fill="none"
              stroke={C.danger}
              strokeWidth="3"
              markerEnd={`url(#${id}-error)`}
            />
          )}
          {failed && config.fault === "release" && (
            <path
              data-testid="review-no-http"
              d="M20 88 L260 88 M133 79 L147 97 M147 79 L133 97"
              stroke={C.danger}
              strokeWidth="3"
            />
          )}
        </svg>
      </figure>
      <div className="min-w-0 space-y-5">
        <figure className="m-0">
          <figcaption className="mb-3 text-sm" style={{ color: C.secondary }}>
            提交闸：状态与错误正文可以分离。
          </figcaption>
          <svg
            viewBox="-15 0 330 330"
            role="img"
            aria-label="响应提交状态机"
            className="mx-auto block w-full max-w-[340px]"
            data-testid="review-commit"
            data-committed={state.status !== null}
          >
            <rect
              x="10"
              y="10"
              width="280"
              height="60"
              rx="10"
              fill={C.elevated}
              stroke={C.border}
            />
            <text x="24" y="35" fontSize="17" fill={C.primary}>
              表示 / 错误准备
            </text>
            <text x="24" y="57" fontSize="16" fill={C.secondary}>
              {state.terminal
                ? `尝试 ${state.attempted ?? "无 HTTP"}`
                : "等待阶段完成"}
            </text>
            <path
              d="M150 72 V122"
              stroke={C.secondary}
              strokeWidth="3"
              fill="none"
              markerEnd={`url(#${id}-arrow)`}
            />
            {state.earlyCommitted && (
              <path
                data-testid="review-commit-barrier"
                d="M45 93 H255 M45 103 H255"
                stroke={C.warning}
                strokeWidth="4"
              />
            )}
            <rect
              x="10"
              y="136"
              width="280"
              height="110"
              rx="10"
              fill={C.elevated}
              stroke={state.status === 200 && failed ? C.danger : C.accent}
              strokeWidth="2"
            />
            <text x="24" y="164" fontSize="18" fill={C.primary}>
              {state.status === null
                ? "尚未提交最终状态"
                : `客户端状态 ${state.status}`}
            </text>
            <text x="24" y="190" fontSize="16" fill={C.secondary}>
              {state.earlyCommitted
                ? "200 已锁定，不能改成 500"
                : config.fault === "release"
                  ? "候选门关闭，不造 HTTP 码"
                  : "生成成功或明确错误才提交"}
            </text>
            <text x="24" y="218" fontSize="16" fill={C.secondary}>
              {config.mode === "html"
                ? "HTML：失败丢弃部分缓冲"
                : "JSON：编码失败不是成功响应"}
            </text>
          </svg>
        </figure>
        <figure className="m-0">
          <figcaption className="mb-3 text-sm" style={{ color: C.secondary }}>
            取消子实验：分叉与汇合是偏序，不是耗时图。
          </figcaption>
          <svg
            viewBox="-15 0 330 330"
            role="img"
            aria-label="两个合作任务取消后汇合"
            className="mx-auto block w-full max-w-[340px]"
            data-testid="review-cancel"
            data-active={cancel}
          >
            <text
              x="150"
              y="26"
              textAnchor="middle"
              fontSize="17"
              fill={C.primary}
            >
              {cancel ? "两个 ready 后发 cancel" : "此路径未启动取消子实验"}
            </text>
            <path
              d="M150 38 V57 H70 V83 M150 57 H230 V83"
              fill="none"
              stroke={cancel ? C.accent : C.secondary}
              strokeWidth="2"
              strokeDasharray={cancel ? undefined : "5 4"}
            />
            {[25, 175].map((x, i) => (
              <g key={x}>
                <rect
                  x={x}
                  y="87"
                  width="100"
                  height="74"
                  rx="9"
                  fill={C.elevated}
                  stroke={cancel ? C.success : C.border}
                />
                <text
                  x={x + 50}
                  y="114"
                  textAnchor="middle"
                  fontSize="16"
                  fill={C.primary}
                >
                  任务 {i + 1}
                </text>
                <text
                  x={x + 50}
                  y="142"
                  textAnchor="middle"
                  fontSize="16"
                  fill={C.secondary}
                >
                  {cancel ? "stopped" : "未执行"}
                </text>
              </g>
            ))}
            <path
              d="M75 164 V190 H150 M225 164 V190 H150 V215"
              fill="none"
              stroke={cancel ? C.success : C.secondary}
              strokeWidth="2"
              strokeDasharray={cancel ? undefined : "5 4"}
              markerEnd={`url(#${id}-arrow)`}
            />
            <rect
              x="30"
              y="225"
              width="240"
              height="58"
              rx="9"
              fill={C.elevated}
              stroke={cancel ? C.success : C.border}
            />
            <text
              x="150"
              y="249"
              textAnchor="middle"
              fontSize="17"
              fill={C.primary}
            >
              {cancel ? "Wait 返回 → Load 错误" : "收齐退出才能继续"}
            </text>
            <text
              x="150"
              y="272"
              textAnchor="middle"
              fontSize="16"
              fill={C.secondary}
            >
              {cancel ? "handler 映射为 503" : "cancel 本身不等待任务"}
            </text>
          </svg>
        </figure>
      </div>
    </div>
  );
}

export function GwpFinalReviewLab() {
  const [config, setConfig] = useState<ReviewConfig>(initialReviewConfig);
  const [frame, setFrame] = useState(0);
  const id = useId();
  const state = deriveReviewState(config, frame);
  const change = <K extends keyof ReviewConfig>(
    key: K,
    value: ReviewConfig[K],
  ) => {
    setConfig((previous) => ({ ...previous, [key]: value }));
    setFrame(0);
  };
  return (
    <section
      className="not-prose my-8 min-w-0 rounded-xl border p-3 sm:p-5"
      style={{ background: C.bg, color: C.primary, borderColor: C.border }}
      aria-label="综合请求诊断实验"
      data-testid="review-lab"
    >
      <h3 className="mb-2 text-lg font-semibold">
        同一故障，能否改写最后的状态？
      </h3>
      <p className="mb-4 text-sm" style={{ color: C.secondary }}>
        有限步骤解释模型，不在浏览器运行
        Go。会话、数据与候选发布门均为教学替身；本地真实测试证据见正文。
      </p>
      <div className="space-y-3">
        <fieldset>
          <legend className="font-semibold">表示方式</legend>
          <div className="flex flex-wrap gap-2">
            {(["html", "json"] as const).map((mode) => (
              <label
                key={mode}
                className="flex min-h-11 min-w-11 cursor-pointer items-center gap-2 rounded border px-3"
                style={{ borderColor: C.border }}
              >
                <input
                  type="radio"
                  name={`${id}-mode`}
                  value={mode}
                  checked={config.mode === mode}
                  onChange={() => change("mode", mode)}
                  className="h-5 w-5 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ accentColor: C.accent }}
                />
                {mode === "html" ? "HTML 页面" : "JSON API"}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-semibold">提交策略</legend>
          <div className="flex flex-wrap gap-2">
            {(["buffer", "early"] as const).map((strategy) => (
              <label
                key={strategy}
                className="flex min-h-11 min-w-11 cursor-pointer items-center gap-2 rounded border px-3"
                style={{ borderColor: C.border }}
              >
                <input
                  type="radio"
                  name={`${id}-strategy`}
                  value={strategy}
                  checked={config.strategy === strategy}
                  onChange={() => change("strategy", strategy)}
                  className="h-5 w-5 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ accentColor: C.accent }}
                />
                {strategy === "buffer" ? "缓冲后提交" : "提前提交"}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-semibold">注入单一故障</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(faultLabels) as ReviewConfig["fault"][]).map(
              (fault) => (
                <label
                  key={fault}
                  className="flex min-h-11 min-w-11 cursor-pointer items-center gap-2 rounded border px-3"
                  style={{ borderColor: C.border }}
                >
                  <input
                    type="radio"
                    name={`${id}-fault`}
                    value={fault}
                    checked={config.fault === fault}
                    onChange={() => change("fault", fault)}
                    className="h-5 w-5 focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ accentColor: C.accent }}
                  />
                  {faultLabels[fault]}
                </label>
              ),
            )}
          </div>
        </fieldset>
      </div>
      <div className="my-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="min-h-11 min-w-11 rounded border px-3 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
          style={{ borderColor: C.border }}
          disabled={frame === 0}
          onClick={() => setFrame((value) => value - 1)}
        >
          上一步
        </button>
        <button
          type="button"
          className="min-h-11 min-w-11 rounded border px-3 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
          style={{ borderColor: C.border }}
          disabled={frame === 7}
          onClick={() => setFrame((value) => value + 1)}
        >
          下一步
        </button>
        <button
          type="button"
          className="min-h-11 min-w-11 rounded border px-3 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ borderColor: C.border }}
          onClick={() => {
            setConfig(initialReviewConfig);
            setFrame(0);
          }}
        >
          重置全部
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-testid="review-status"
        data-frame={frame}
        data-status={state.status ?? "none"}
        data-load-calls={state.loadCalls}
        className="mb-4 break-words font-medium"
      >
        步骤 {frame}/7 · {faultLabels[config.fault]} ·{" "}
        {state.terminal
          ? state.status === null
            ? "无 HTTP 响应"
            : `已提交 ${state.status}`
          : state.status !== null
            ? "已提交 200，等待观察终态"
            : "尚未提交"}{" "}
        · Load {state.loadCalls} 次
      </p>
      <ReviewDiagrams config={config} frame={frame} />
      <div
        className="mt-5 rounded-lg border p-3"
        style={{ borderColor: C.border }}
      >
        <h4 className="font-semibold">可访问轨迹（与图同步）</h4>
        <ol
          className="mt-2 list-decimal space-y-1 break-words pl-5 text-sm"
          data-testid="review-trace"
        >
          {state.trace.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ol>
        <p className="mt-3 text-sm" style={{ color: C.secondary }}>
          {config.strategy === "early"
            ? "提前提交后再设置 Content-Type 太迟；Recorder 与真实 Server 的自动探测可能不同，不能以 Header() 当前值代替已提交头。"
            : "本例仅缓冲很小的表示；真实大响应必须另外设计大小限制、流式协议与中途失败语义。"}
        </p>
        <p className="mt-2 text-sm" style={{ color: C.secondary }}>
          只有手动步进，无播放、计时器或动画；reduced-motion
          下相同。参数变化回到步骤0，重置同时恢复
          HTML、缓冲、无故障及全部派生状态。
        </p>
      </div>
    </section>
  );
}
