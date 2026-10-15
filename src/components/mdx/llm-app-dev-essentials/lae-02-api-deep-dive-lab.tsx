"use client";

import { useId, useReducer, type ReactNode } from "react";

// 本章需求清单：HTTP/流式帧→双泳道时序；重试→按毫秒成比例的等待区间；
// token→上下文堆叠与溢出。三个独立根、故障/恢复/重置、44px控件、移动端可读。
// 所有时间、token 与价格均为教学输入；不发网络请求，不接收真实密钥。
const C = {
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
};
const control =
  "min-h-11 min-w-11 max-w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50";

function Lab({
  kind,
  title,
  reset,
  children,
}: {
  kind: string;
  title: string;
  reset: () => void;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <section
      data-visual-kind={kind}
      aria-labelledby={id}
      className="not-prose my-6 min-w-0 space-y-4 rounded-xl border border-[var(--border)] p-3 text-[var(--text-primary)] sm:p-5"
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h3 id={id} className="text-base font-semibold">
          {title}
        </h3>
        <button className={control} onClick={reset}>
          重置实验
        </button>
      </header>
      {children}
    </section>
  );
}

export type ApiFamily = "responses" | "chat";
export type StreamFault = "none" | "disconnect" | "parser";
export type StreamState = {
  family: ApiFamily;
  fault: StreamFault;
  step: number;
};
export const initialStream: StreamState = {
  family: "responses",
  fault: "none",
  step: 0,
};
export type StreamAction =
  | { type: "reset" | "next" }
  | { type: "family"; value: ApiFamily }
  | { type: "fault"; value: StreamFault };

export function streamFrames(state: StreamState) {
  const chat = state.family === "chat";
  const frames = [
    {
      ms: 0,
      label: "POST 请求",
      wire: chat ? "/v1/chat/completions" : "/v1/responses",
      outbound: true,
      text: "",
      failed: false,
    },
    {
      ms: 120,
      label: "HTTP 200 / SSE",
      wire: "Content-Type: text/event-stream",
      outbound: false,
      text: "",
      failed: false,
    },
    {
      ms: 300,
      label: "文本增量 1",
      wire: chat
        ? 'choices[0].delta.content = "你好"'
        : 'response.output_text.delta: "你好"',
      outbound: false,
      text: "你好",
      failed: false,
    },
    {
      ms: 540,
      label: "文本增量 2",
      wire: chat
        ? 'choices[0].delta.content = "，世界"'
        : 'response.output_text.delta: "，世界"',
      outbound: false,
      text: "，世界",
      failed: false,
    },
    {
      ms: 800,
      label: "流结束",
      wire: chat ? "finish_reason: stop → data: [DONE]" : "response.completed",
      outbound: false,
      text: "",
      failed: false,
    },
  ];
  if (state.fault === "parser") {
    return [
      ...frames.slice(0, 2),
      { ...frames[2], label: "解析器不匹配", text: "", failed: true },
    ];
  }
  if (state.fault === "disconnect") {
    return [
      ...frames.slice(0, 3),
      {
        ...frames[3],
        label: "连接中断",
        wire: "连接关闭；未收到完成标记",
        text: "",
        failed: true,
      },
    ];
  }
  return frames;
}

export function streamReducer(
  state: StreamState,
  action: StreamAction,
): StreamState {
  switch (action.type) {
    case "reset":
      return initialStream;
    case "next":
      return {
        ...state,
        step: Math.min(state.step + 1, streamFrames(state).length),
      };
    case "family":
      return { ...state, family: action.value, step: 0 };
    case "fault":
      return { ...state, fault: action.value, step: 0 };
  }
}

export function Lae02ApiDeepDiveRequestContractLab() {
  const [state, dispatch] = useReducer(streamReducer, initialStream);
  const frames = streamFrames(state);
  const visible = frames.slice(0, state.step);
  const last = visible.at(-1);
  const finished = state.step === frames.length;
  const text = visible.map((frame) => frame.text).join("");
  const endpoint =
    state.family === "responses" ? "/v1/responses" : "/v1/chat/completions";
  return (
    <Lab
      kind="api-http-stream-timeline"
      title="① HTTP 请求与流式帧"
      reset={() => dispatch({ type: "reset" })}
    >
      <p className="text-sm">
        先预测：HTTP 200
        是否意味着内容已完整？逐帧观察接收缓冲区。时间为教学假设，省略非文本事件；一帧不等于一个
        token。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          接口合同
          <select
            className={control}
            value={state.family}
            onChange={(event) =>
              dispatch({
                type: "family",
                value: event.target.value as ApiFamily,
              })
            }
          >
            <option value="responses">Responses（现行迁移轨）</option>
            <option value="chat">Chat Completions（仍受支持）</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          故障注入（更改后回到第 0 帧）
          <select
            className={control}
            value={state.fault}
            onChange={(event) =>
              dispatch({
                type: "fault",
                value: event.target.value as StreamFault,
              })
            }
          >
            <option value="none">正常</option>
            <option value="disconnect">首段文本后断流</option>
            <option value="parser">误用另一接口的流式解析器</option>
          </select>
        </label>
      </div>
      <pre className="whitespace-pre-wrap break-all rounded-lg border border-[var(--border)] p-3 text-xs">{`POST ${endpoint}\nAuthorization: Bearer <仅服务端注入>\nContent-Type: application/json\n${JSON.stringify(state.family === "responses" ? { model: "<部署时选择>", input: "问好", stream: true } : { model: "<部署时选择>", messages: [{ role: "user", content: "问好" }], stream: true }, null, 2)}`}</pre>
      <svg
        viewBox="0 0 320 360"
        role="img"
        aria-label={`HTTP双泳道时间线，已接收${state.step}个事件，${last?.label ?? "待发送"}`}
        className="mx-auto block w-full max-w-[400px]"
      >
        <text x="6" y="20" fill={C.secondary} fontSize="14">
          ms ↓
        </text>
        <text x="90" y="20" textAnchor="middle" fill={C.primary} fontSize="14">
          服务端
        </text>
        <text x="274" y="20" textAnchor="middle" fill={C.primary} fontSize="14">
          API
        </text>
        <line
          x1="90"
          x2="90"
          y1="32"
          y2="335"
          stroke={C.border}
          strokeWidth="2"
        />
        <line
          x1="274"
          x2="274"
          y1="32"
          y2="335"
          stroke={C.border}
          strokeWidth="2"
        />
        {frames.map((frame, index) => {
          const y = 58 + frame.ms * 0.32;
          const active = index < state.step;
          const color = !active
            ? C.secondary
            : frame.failed
              ? C.danger
              : C.accent;
          const end = frame.outbound ? 274 : 90;
          return (
            <g key={frame.ms} opacity={active ? 1 : 0.45}>
              <text x="6" y={y + 4} fill={C.secondary} fontSize="14">
                {frame.ms}
              </text>
              <line
                x1="90"
                x2="274"
                y1={y}
                y2={y}
                stroke={color}
                strokeWidth={active ? 3 : 1}
                strokeDasharray={active ? undefined : "4 4"}
              />
              <path
                d={
                  frame.outbound
                    ? `M ${end - 7} ${y - 5} L ${end} ${y} L ${end - 7} ${y + 5}`
                    : `M ${end + 7} ${y - 5} L ${end} ${y} L ${end + 7} ${y + 5}`
                }
                stroke={color}
                fill="none"
                strokeWidth="2"
              />
              <text
                x="182"
                y={y - 10}
                textAnchor="middle"
                fill={color}
                fontSize="14"
              >
                {frame.label}
              </text>
              {frame.failed && active && (
                <path
                  d={`M 85 ${y - 5} l 10 10 m 0 -10 l -10 10`}
                  stroke={C.danger}
                  strokeWidth="3"
                />
              )}
            </g>
          );
        })}
      </svg>
      <button
        className={control}
        disabled={finished}
        onClick={() => dispatch({ type: "next" })}
      >
        推进下一帧（{state.step}/{frames.length}）
      </button>
      <div
        role="status"
        aria-live="polite"
        className="space-y-2 break-words text-sm"
      >
        <p>
          当前事件：
          <code className="break-all">{last?.wire ?? "尚未发出请求"}</code>
        </p>
        <p>
          文本缓冲区：<strong>{text || "（空）"}</strong>
        </p>
        <p>
          {last?.failed
            ? "拒绝交付：保留失败轨迹；局部文本不是完整响应。"
            : finished
              ? "传输完整：接下来仍须验证内容；工具调用必须另行授权。"
              : "尚未完成：HTTP 成功与业务交付是两个状态。"}
        </p>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">
        恢复：选“正常”后重放；重置则恢复 Responses、正常、第 0 帧。历史 SDK 名称
        ChatCompletion
        不等于现行接口已下线。图中的帧是语义事件摘要，不是完整网络抓包。
      </p>
    </Lab>
  );
}

export type RetryFault =
  | "none"
  | "rate-limit"
  | "auth"
  | "quota"
  | "unavailable";
export type RetryState = {
  fault: RetryFault;
  base: number;
  retryAfter: number;
  jitter: boolean;
  attempts: number;
};
export const initialRetry: RetryState = {
  fault: "rate-limit",
  base: 500,
  retryAfter: 0,
  jitter: false,
  attempts: 0,
};
export type RetryAction =
  | { type: "reset" | "next" }
  | { type: "fault"; value: RetryFault }
  | { type: "base" | "retryAfter"; value: number }
  | { type: "jitter"; value: boolean };

export function retrySchedule(state: RetryState) {
  const statusCodes =
    state.fault === "none"
      ? [200]
      : state.fault === "rate-limit"
        ? [429, 429, 200]
        : state.fault === "auth"
          ? [401]
          : state.fault === "quota"
            ? [429]
            : [503, 503, 503];
  let end = 0;
  return statusCodes.map((status, index) => {
    const previousEnd = end;
    // 最多重试两次，退避上限 4000ms；Retry-After 是模拟响应头输入。
    const backoff =
      index === 0 ? 0 : Math.min(4000, state.base * 2 ** (index - 1));
    const jitter = index === 0 || !state.jitter ? 0 : [0, 37, 83][index];
    const wait =
      index === 0
        ? 0
        : Math.max(
            backoff,
            state.fault === "rate-limit" ? state.retryAfter : 0,
          ) + jitter;
    const start = previousEnd + wait;
    end = start + 200;
    return { status, start, end, wait, previousEnd };
  });
}

export function retryReducer(
  state: RetryState,
  action: RetryAction,
): RetryState {
  switch (action.type) {
    case "reset":
      return initialRetry;
    case "next":
      return {
        ...state,
        attempts: Math.min(state.attempts + 1, retrySchedule(state).length),
      };
    case "fault":
      return { ...state, fault: action.value, attempts: 0 };
    case "base":
      return { ...state, base: action.value, attempts: 0 };
    case "retryAfter":
      return { ...state, retryAfter: action.value, attempts: 0 };
    case "jitter":
      return { ...state, jitter: action.value, attempts: 0 };
  }
}

export function Lae02ApiDeepDiveExecutionTraceLab() {
  const [state, dispatch] = useReducer(retryReducer, initialRetry);
  const schedule = retrySchedule(state);
  const visible = schedule.slice(0, state.attempts);
  const last = visible.at(-1);
  const done = state.attempts === schedule.length;
  const end = last?.end ?? 0;
  const scale = (ms: number) => 24 + (ms / 8000) * 276;
  return (
    <Lab
      kind="api-retry-backoff-timeline"
      title="② 有限重试与退避"
      reset={() => dispatch({ type: "reset" })}
    >
      <p className="text-sm">
        先预测：连续两次临时限流后，第三次请求何时开始？每次请求固定耗时
        200ms，最多重试 2 次。这是应用策略模拟，不是 SDK 默认值。
      </p>
      <label className="grid gap-1 text-sm">
        服务端结果（更改参数将清空运行）
        <select
          className={control}
          value={state.fault}
          onChange={(event) =>
            dispatch({ type: "fault", value: event.target.value as RetryFault })
          }
        >
          <option value="none">正常：200</option>
          <option value="rate-limit">临时限流：429 → 429 → 200</option>
          <option value="auth">认证失败：401，不重试</option>
          <option value="quota">配额不足：429，不重试</option>
          <option value="unavailable">持续不可用：503，耗尽后停止</option>
        </select>
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid text-sm">
          基础退避：{state.base}ms
          <input
            className="h-11 min-h-11 min-w-11 w-full"
            type="range"
            min="250"
            max="2000"
            step="250"
            value={state.base}
            onChange={(event) =>
              dispatch({ type: "base", value: Number(event.target.value) })
            }
          />
        </label>
        <label className="grid text-sm">
          模拟 Retry-After：{state.retryAfter}ms（仅临时 429）
          <input
            className="h-11 min-h-11 min-w-11 w-full"
            type="range"
            min="0"
            max="3000"
            step="250"
            value={state.retryAfter}
            disabled={state.fault !== "rate-limit"}
            onChange={(event) =>
              dispatch({
                type: "retryAfter",
                value: Number(event.target.value),
              })
            }
          />
        </label>
      </div>
      <label className="flex min-h-11 items-center gap-3 text-sm">
        <input
          className="h-11 w-11 min-h-11 min-w-11 shrink-0"
          type="checkbox"
          checked={state.jitter}
          onChange={(event) =>
            dispatch({ type: "jitter", value: event.target.checked })
          }
        />
        加抖动（固定样本 +37/+83ms，便于复现）
      </label>
      <svg
        viewBox="0 0 320 340"
        role="img"
        aria-label={`退避时间轴，已尝试${state.attempts}次，总耗时${end}毫秒`}
        className="mx-auto block w-full max-w-[400px]"
      >
        {[0, 2000, 4000, 6000, 8000].map((ms) => (
          <g key={ms}>
            <line
              x1={scale(ms)}
              x2={scale(ms)}
              y1="38"
              y2="279"
              stroke={C.border}
              strokeDasharray="3 3"
            />
            <text
              x={scale(ms)}
              y="24"
              textAnchor="middle"
              fill={C.secondary}
              fontSize="14"
            >
              {ms / 1000}s
            </text>
          </g>
        ))}
        {[0, 1, 2].map((index) => {
          const attempt = visible[index];
          const y = 76 + index * 78;
          return (
            <g key={index}>
              <text x="24" y={y - 12} fill={C.primary} fontSize="14">
                尝试 {index + 1}
                {attempt ? `：HTTP ${attempt.status}` : "：未执行"}
              </text>
              <line
                x1="24"
                x2="300"
                y1={y + 12}
                y2={y + 12}
                stroke={C.border}
              />
              {attempt && (
                <>
                  <rect
                    x={scale(attempt.previousEnd)}
                    y={y}
                    width={scale(attempt.wait) - 24}
                    height="24"
                    fill={C.warning}
                    opacity="0.5"
                  />
                  <rect
                    x={scale(attempt.start)}
                    y={y}
                    width={scale(200) - 24}
                    height="24"
                    fill={attempt.status === 200 ? C.success : C.danger}
                  />
                  <text x="24" y={y + 41} fill={C.secondary} fontSize="14">
                    等待 {attempt.wait}ms；起点 {attempt.start}ms
                  </text>
                </>
              )}
            </g>
          );
        })}
        <rect
          x="24"
          y="303"
          width="14"
          height="14"
          fill={C.warning}
          opacity="0.5"
        />
        <text x="44" y="315" fill={C.primary} fontSize="14">
          等待
        </text>
        <rect x="102" y="303" width="14" height="14" fill={C.danger} />
        <text x="122" y="315" fill={C.primary} fontSize="14">
          失败
        </text>
        <rect x="181" y="303" width="14" height="14" fill={C.success} />
        <text x="201" y="315" fill={C.primary} fontSize="14">
          成功
        </text>
      </svg>
      <button
        className={control}
        disabled={done}
        onClick={() => dispatch({ type: "next" })}
      >
        执行下一次尝试（含等待）
      </button>
      <div role="status" aria-live="polite" className="space-y-2 text-sm">
        <p>
          累计等待 {visible.reduce((sum, attempt) => sum + attempt.wait, 0)}
          ms；总耗时 {end}ms；已发送 {state.attempts} 次。
        </p>
        <p>
          {!last
            ? "待执行；没有真实等待或网络调用。"
            : last.status === 200
              ? "成功：停止重试，进入响应验证。"
              : !done
                ? `可重试：下一次先等 ${schedule[state.attempts].wait}ms。`
                : state.fault === "auth"
                  ? "终止：修正服务端凭证后才能重新发起。"
                  : state.fault === "quota"
                    ? "终止：配额问题不能靠退避修复。"
                    : "终止：重试耗尽，记录错误并向调用者返回失败。"}
        </p>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">
        等待 = max(指数退避, 可用的 Retry-After) +
        抖动。图中用毫秒表达等待；真实响应头需解析其格式。恢复可选“正常”；重置恢复
        500ms、无抖动、临时限流。含副作用的业务不能仅凭可重试状态码盲目重放。
      </p>
    </Lab>
  );
}

export type BudgetState = {
  history: number;
  output: number;
  allowance: number;
};
export const initialBudget: BudgetState = {
  history: 1024,
  output: 1024,
  allowance: 8,
};
export type BudgetAction =
  | { type: "reset" | "overflow" }
  | { type: "history" | "output" | "allowance"; value: number };
export function budgetReducer(
  state: BudgetState,
  action: BudgetAction,
): BudgetState {
  switch (action.type) {
    case "reset":
      return initialBudget;
    case "overflow":
      return { ...state, history: 3072 };
    case "history":
      return { ...state, history: action.value };
    case "output":
      return { ...state, output: action.value };
    case "allowance":
      return { ...state, allowance: action.value };
  }
}

export function tokenBudget(state: BudgetState) {
  const capacity = 4096;
  const overhead = 640;
  const user = 512;
  const input = overhead + user + state.history;
  const reserved = input + state.output;
  // 虚构价格：每千输入 1 单位，每千输出 3 单位，仅估算本次预留费用。
  const cost = input / 1000 + (state.output / 1000) * 3;
  return {
    capacity,
    overhead,
    user,
    input,
    reserved,
    cost,
    overflow: Math.max(0, reserved - capacity),
    remaining: Math.max(0, capacity - reserved),
    allowed: reserved <= capacity && cost <= state.allowance,
  };
}

export function Lae02ApiDeepDiveAuthorizationGateLab() {
  const [state, dispatch] = useReducer(budgetReducer, initialBudget);
  const budget = tokenBudget(state);
  const segments = [
    { name: "规则/工具/封装", value: budget.overhead, color: C.secondary },
    { name: "历史", value: state.history, color: C.accent },
    { name: "本轮输入", value: budget.user, color: C.warning },
    { name: "输出预留", value: state.output, color: C.success },
  ];
  let offset = 0;
  // 图轴固定 6400，超限时不缩放掩盖溢出，右侧保留红色越界区。
  const x = (tokens: number) => 16 + (tokens / 6400) * 288;
  return (
    <Lab
      kind="api-token-context-budget"
      title="③ 上下文与费用准入"
      reset={() => dispatch({ type: "reset" })}
    >
      <p className="text-sm">
        先预测：减少输出预留能否修复输入本身超限？窗口 4096、封装等开销
        640、本轮输入 512 均为虚构 token 数；不是分词器实测或任何模型规格。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid text-sm">
          历史消息：{state.history} token
          <input
            className="h-11 min-h-11 min-w-11 w-full"
            type="range"
            min="0"
            max="3072"
            step="128"
            value={state.history}
            onChange={(event) =>
              dispatch({ type: "history", value: Number(event.target.value) })
            }
          />
        </label>
        <label className="grid text-sm">
          输出预留：{state.output} token
          <input
            className="h-11 min-h-11 min-w-11 w-full"
            type="range"
            min="256"
            max="2048"
            step="128"
            value={state.output}
            onChange={(event) =>
              dispatch({ type: "output", value: Number(event.target.value) })
            }
          />
        </label>
        <label className="grid text-sm">
          单次费用上限：{state.allowance} 单位
          <input
            className="h-11 min-h-11 min-w-11 w-full"
            type="range"
            min="1"
            max="12"
            step="1"
            value={state.allowance}
            onChange={(event) =>
              dispatch({ type: "allowance", value: Number(event.target.value) })
            }
          />
        </label>
      </div>
      <button
        className={control}
        onClick={() => dispatch({ type: "overflow" })}
      >
        注入故障：历史膨胀至 3072
      </button>
      <svg
        viewBox="0 0 320 340"
        role="img"
        aria-label={`上下文预留${budget.reserved}，容量4096，溢出${budget.overflow}，${budget.allowed ? "允许发送" : "本地拒绝"}`}
        className="mx-auto block w-full max-w-[400px]"
      >
        <text x="16" y="24" fill={C.primary} fontSize="14">
          上下文占用（固定比例）
        </text>
        <rect
          x="16"
          y="62"
          width={x(budget.capacity) - 16}
          height="38"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
        />
        {segments.map((segment) => {
          const start = offset;
          offset += segment.value;
          return (
            <rect
              key={segment.name}
              x={x(start)}
              y="62"
              width={x(segment.value) - 16}
              height="38"
              fill={segment.color}
            />
          );
        })}
        <line
          x1={x(budget.capacity)}
          x2={x(budget.capacity)}
          y1="50"
          y2="124"
          stroke={C.danger}
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <text
          x={x(budget.capacity)}
          y="45"
          textAnchor="middle"
          fill={C.danger}
          fontSize="14"
        >
          4096 上限
        </text>
        <text x="16" y="132" fill={C.secondary} fontSize="14">
          0
        </text>
        <text x="304" y="132" textAnchor="end" fill={C.secondary} fontSize="14">
          6400 token
        </text>
        {budget.overflow > 0 && (
          <path
            d={`M ${x(budget.capacity)} 105 v 8 H ${x(budget.reserved)} v -8`}
            fill="none"
            stroke={C.danger}
            strokeWidth="3"
          />
        )}
        {segments.map((segment, index) => (
          <g key={segment.name}>
            <rect
              x="16"
              y={143 + index * 27}
              width="14"
              height="14"
              fill={segment.color}
            />
            <text x="39" y={155 + index * 27} fill={C.primary} fontSize="14">
              {segment.name}：{segment.value}
            </text>
          </g>
        ))}
        <text
          x="16"
          y="272"
          fill={budget.overflow ? C.danger : C.primary}
          fontSize="14"
        >
          {budget.overflow
            ? `溢出 ${budget.overflow} token`
            : `可用余量 ${budget.remaining} token`}
        </text>
        <rect
          x="16"
          y="290"
          width="288"
          height="20"
          fill="none"
          stroke={C.border}
        />
        <rect
          x="16"
          y="290"
          width={Math.min(288, (budget.cost / 12) * 288)}
          height="20"
          fill={budget.cost > state.allowance ? C.danger : C.accent}
        />
        <line
          x1={16 + (state.allowance / 12) * 288}
          x2={16 + (state.allowance / 12) * 288}
          y1="284"
          y2="314"
          stroke={C.primary}
          strokeWidth="2"
        />
        <text x="16" y="334" fill={C.primary} fontSize="14">
          费用 {budget.cost.toFixed(3)} / 上限 {state.allowance} 单位
        </text>
      </svg>
      <div role="status" aria-live="polite" className="space-y-2 text-sm">
        <p>
          输入 {budget.input} + 输出预留 {state.output} = {budget.reserved} /{" "}
          {budget.capacity} token。
        </p>
        <p>
          假设每千输入 1 单位、每千输出 3 单位：{budget.input}/1000 +{" "}
          {state.output}/1000 × 3 = {budget.cost.toFixed(3)} 单位。
        </p>
        <p>
          <strong>
            {budget.allowed ? "允许发送（仅通过本地预算检查）" : "本地拒绝发送"}
          </strong>
          {budget.overflow > 0
            ? `；超出上下文 ${budget.overflow} token。`
            : "；上下文检查通过。"}
          {budget.cost > state.allowance ? "费用超限。" : "费用检查通过。"}
        </p>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">
        恢复：缩短历史或调整预留/费用；重置恢复
        1024/1024/8。此处不自动删消息，也不模拟真实计费；实际须核对模型上下文、最大输出、推理
        token、缓存、工具费用和服务端 usage。预算通过不代表业务动作已获授权。
      </p>
    </Lab>
  );
}
