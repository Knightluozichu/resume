"use client";

import { useId, useState } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;

type Method = "GET" | "HEAD" | "POST";
type Path = "/posts/latest" | "/posts/42" | "/posts" | "/missing";
type Parameters = {
  method: Method;
  path: Path;
  fallback: boolean;
  allowed: boolean;
  conflict: boolean;
};
const initial: Parameters = {
  method: "GET",
  path: "/posts/latest",
  fallback: false,
  allowed: true,
  conflict: false,
};
const patterns = ["/posts/latest", "/posts/{id}", "/posts/", "/"];
const handlers = ["latest", "post", "tree", "fallback"];

// Deliberately bounded to the controls below, not an implementation of ServeMux.
// All 24 method/path/fallback combinations are checked against Go1.26.0 httptest.
function route(p: Parameters) {
  const read = p.method === "GET" || p.method === "HEAD";
  const candidates = [
    read && p.path === "/posts/latest",
    read && (p.path === "/posts/latest" || p.path === "/posts/42"),
    read && p.path.startsWith("/posts/"),
    p.fallback,
  ];
  if (read && p.path === "/posts") {
    return {
      candidates,
      winner: -1,
      status: 307,
      allow: "",
      location: "/posts/",
      handler: "",
      reason: "补尾斜杠：先返回307；本次不调用tree。",
    };
  }
  const winner = candidates.findIndex(Boolean);
  if (winner >= 0) {
    return {
      candidates,
      winner,
      status: winner === 3 ? 404 : 200,
      allow: "",
      location: "",
      handler: handlers[winner],
      reason:
        winner === 3
          ? "无方法限制的根模式已匹配，由fallback自行返回404。"
          : "选取请求集合最小的候选；其余匹配者不执行。",
    };
  }
  const methodMismatch = !read && p.path !== "/missing";
  return {
    candidates,
    winner: -1,
    status: methodMismatch ? 405 : 404,
    allow: methodMismatch ? "GET, HEAD" : "",
    location: "",
    handler: "",
    reason: methodMismatch
      ? "路径可被其他方法处理；mux生成405和Allow。"
      : "没有路径匹配；mux自身生成404。",
  };
}

type Frame = {
  event: string;
  stack: string[];
  note: string;
  returning: boolean;
};
function frames(p: Parameters, result: ReturnType<typeof route>): Frame[] {
  const start: Frame[] = [
    {
      event: "ready",
      stack: [],
      note: "注册完成。请求尚未进入audit；图中的连线是集合包含，不是扫描次序。",
      returning: false,
    },
    {
      event: "audit.before",
      stack: ["audit"],
      note: "外层audit先入栈，再调用gate。",
      returning: false,
    },
    {
      event: "gate.before",
      stack: ["audit", "gate"],
      note: "gate检查演示准入开关。拒绝时不调用next。",
      returning: false,
    },
  ];
  if (!p.allowed) {
    return [
      ...start,
      {
        event: "gate.reject",
        stack: ["audit"],
        note: "gate写403后立即返回并出栈；没有mux帧，也没有gate.after。",
        returning: true,
      },
      {
        event: "audit.after",
        stack: [],
        note: "外层恢复执行，记录audit.after后出栈；请求结束。",
        returning: true,
      },
    ];
  }
  return [
    ...start,
    {
      event: "mux.match",
      stack: ["audit", "gate", "mux"],
      note: result.reason,
      returning: false,
    },
    {
      event: result.handler || `mux.${result.status}`,
      stack: ["audit", "gate", "mux", result.handler || String(result.status)],
      note: result.handler
        ? `${result.handler}写响应；没有同时调用更宽泛的业务处理器。`
        : `由mux生成${result.status}响应，不存在业务handler调用。`,
      returning: false,
    },
    {
      event: "mux.return",
      stack: ["audit", "gate"],
      note: "分派完成，业务/内建响应和mux帧退出，回到gate。",
      returning: true,
    },
    {
      event: "gate.after",
      stack: ["audit"],
      note: "gate记录after后退出，回到外层audit。",
      returning: true,
    },
    {
      event: "audit.after",
      stack: [],
      note: "audit最后记录after并退出。空栈表示请求已完成。",
      returning: true,
    },
  ];
}

const buttonClass =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

// A small, chapter-local button group. All options remain keyboard reachable;
// aria-pressed reports selection without inventing incomplete radio key handling.
function Choices<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-sm font-semibold text-primary">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            className={buttonClass}
            style={{
              background: value === option.value ? C.elevated : C.bg,
              borderColor: value === option.value ? C.accent : C.border,
            }}
            onClick={() => onChange(option.value)}
          >
            {value === option.value ? "✓ " : ""}
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function GwpRoutingLab() {
  const [p, setParameters] = useState<Parameters>(initial);
  const [frame, setFrame] = useState(0);
  const id = useId().replace(/:/g, "");
  const result = route(p);
  const trace = frames(p, result);
  const current = trace[frame];
  const reachedMux = p.allowed && frame >= 3 && !p.conflict;
  const responded = !p.conflict && frame >= (p.allowed ? 4 : 3);
  const status = p.allowed ? result.status : 403;
  function change<K extends keyof Parameters>(key: K, value: Parameters[K]) {
    setParameters((previous) => ({ ...previous, [key]: value }));
    setFrame(0);
  }
  function reset() {
    setParameters({ ...initial });
    setFrame(0);
  }
  const summary = p.conflict
    ? "注册panic：GET /posts/{id}与GET /{kind}/latest交叉，服务未启动；没有HTTP响应。先关闭冲突或重置。"
    : `帧${frame}/${trace.length - 1}，${current.event}。${current.note}${responded ? ` 状态${status}。` : " 尚无响应。"}`;

  return (
    <section
      id="gwp-routing-lab"
      aria-label="路由优先级与中间件回栈实验"
      className="not-prose my-6 min-w-0 rounded-card border border-border p-3 sm:p-4"
      style={{ overflowWrap: "anywhere" }}
    >
      <h3 className="text-lg font-semibold text-primary">
        最具体匹配 × 调用回栈
      </h3>
      <p className="mt-2 text-sm text-secondary">
        Go1.22+路由，Go1.26.0测试对照。固定样例模型，不是Go运行时。手动推进，无定时器、无自动动画。
      </p>
      <div className="my-4 grid min-w-0 gap-4">
        <Choices
          label="请求方法"
          value={p.method}
          options={[
            { value: "GET", label: "GET" },
            { value: "HEAD", label: "HEAD" },
            { value: "POST", label: "POST" },
          ]}
          onChange={(v) => change("method", v)}
        />
        <Choices
          label="请求路径"
          value={p.path}
          options={[
            { value: "/posts/latest", label: "/posts/latest" },
            { value: "/posts/42", label: "/posts/42" },
            { value: "/posts", label: "/posts" },
            { value: "/missing", label: "/missing" },
          ]}
          onChange={(v) => change("path", v)}
        />
        <Choices
          label="根fallback（返回404）"
          value={p.fallback ? "on" : "off"}
          options={[
            { value: "off", label: "关闭" },
            { value: "on", label: "开启 /" },
          ]}
          onChange={(v) => change("fallback", v === "on")}
        />
        <Choices
          label="gate准入（仅演示，非认证）"
          value={p.allowed ? "allow" : "deny"}
          options={[
            { value: "allow", label: "允许" },
            { value: "deny", label: "拒绝403" },
          ]}
          onChange={(v) => change("allowed", v === "allow")}
        />
        <Choices
          label="启动前注册冲突"
          value={p.conflict ? "conflict" : "valid"}
          options={[
            { value: "valid", label: "有效注册" },
            { value: "conflict", label: "注入交叉模式" },
          ]}
          onChange={(v) => change("conflict", v === "conflict")}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={buttonClass}
          onClick={() => setFrame((n) => Math.max(0, n - 1))}
          disabled={p.conflict || frame === 0}
        >
          上一步
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => setFrame((n) => Math.min(trace.length - 1, n + 1))}
          disabled={p.conflict || frame === trace.length - 1}
        >
          下一步
        </button>
        <button type="button" className={buttonClass} onClick={reset}>
          重置全部
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="my-4 min-h-16 text-sm text-primary"
      >
        {summary}
      </p>
      <div className="grid min-w-0 gap-5 lg:grid-cols-2">
        <figure className="m-0 min-w-0">
          <figcaption className="mb-2 text-sm font-semibold text-primary">
            模式集合：上方更具体，向下包含
          </figcaption>
          <svg
            viewBox="0 0 280 440"
            role="img"
            aria-label={
              p.conflict
                ? "交叉模式不能确定唯一更具体者，注册panic"
                : `路由集合图；${reachedMux ? `${result.reason} 选中${result.handler || "mux内建响应"}` : "尚未进入mux"}`
            }
            className="mx-auto block h-auto w-full max-w-[360px]"
            fontSize={18}
            fill={C.text}
          >
            <defs>
              <marker
                id={`${id}-route`}
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0 0 L8 4 L0 8Z" fill={C.muted} />
              </marker>
            </defs>
            {p.conflict ? (
              <g>
                <text x="140" y="30" textAnchor="middle" fill={C.danger}>
                  注册时相交 ≠ 包含
                </text>
                <ellipse
                  cx="109"
                  cy="160"
                  rx="91"
                  ry="80"
                  fill={C.elevated}
                  stroke={C.accent}
                  strokeWidth="3"
                />
                <ellipse
                  cx="172"
                  cy="210"
                  rx="91"
                  ry="80"
                  fill="none"
                  stroke={C.danger}
                  strokeWidth="3"
                />
                <text x="25" y="130">
                  /posts/42
                </text>
                <text x="116" y="248">
                  /news/latest
                </text>
                <circle cx="140" cy="182" r="7" fill={C.danger} />
                <path d="M140 189 L140 325" stroke={C.danger} strokeWidth="3" />
                <text x="140" y="315" textAnchor="middle">
                  /posts/latest
                </text>
                <text x="140" y="358" textAnchor="middle" fill={C.danger}>
                  panic → 无请求栈
                </text>
                <text x="140" y="397" textAnchor="middle">
                  不是 HTTP 500
                </text>
              </g>
            ) : (
              patterns.map((pattern, index) => {
                const y = 25 + index * 101;
                const registered = index !== 3 || p.fallback;
                const candidate = reachedMux && result.candidates[index];
                const won = reachedMux && result.winner === index;
                const redirect =
                  reachedMux && result.status === 307 && index === 2;
                const color = won || redirect ? C.accent : C.muted;
                return (
                  <g key={pattern}>
                    {index > 0 && (
                      <path
                        d={`M140 ${y - 28} L140 ${y - 4}`}
                        stroke={C.muted}
                        strokeWidth="2"
                        strokeDasharray={registered ? undefined : "4 4"}
                        markerEnd={`url(#${id}-route)`}
                      />
                    )}
                    <rect
                      x="10"
                      y={y}
                      width="260"
                      height="73"
                      rx="8"
                      fill={won ? C.elevated : C.bg}
                      stroke={registered ? color : C.border}
                      strokeWidth={won ? 4 : 2}
                      strokeDasharray={registered ? undefined : "5 5"}
                    />
                    <text
                      x="22"
                      y={y + 24}
                      fontFamily="ui-monospace, monospace"
                    >
                      {index === 3 ? "ANY /" : `GET ${pattern}`}
                    </text>
                    <text x="22" y={y + 53} fill={color}>
                      {!registered
                        ? "未注册"
                        : !reachedMux
                          ? "待分派"
                          : won
                            ? "✓ 胜出 → 仅它执行"
                            : redirect
                              ? "↳ 重定向的目标子树"
                              : candidate
                                ? result.status === 307
                                  ? "候选；先处理尾斜杠"
                                  : "候选；被更具体者排除"
                                : "× 不匹配"}
                    </text>
                  </g>
                );
              })
            )}
            {!p.conflict && (
              <text x="140" y="428" textAnchor="middle">
                {p.method === "HEAD" ? "HEAD 也匹配 GET" : "顺序不是注册优先级"}
              </text>
            )}
          </svg>
        </figure>
        <figure className="m-0 min-w-0">
          <figcaption className="mb-2 text-sm font-semibold text-primary">
            调用帧：进入压栈，返回弹栈
          </figcaption>
          <svg
            viewBox="0 0 280 440"
            role="img"
            aria-label={
              p.conflict
                ? "注册失败，没有调用栈"
                : `当前栈：${current.stack.join(" → ") || "空"}；${current.returning ? "返回" : "进入"}`
            }
            className="mx-auto block h-auto w-full max-w-[360px]"
            fontSize={18}
            fill={C.text}
          >
            <defs>
              <marker
                id={`${id}-stack`}
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0 0 L8 4 L0 8Z" fill={C.accent} />
              </marker>
            </defs>
            <text x="140" y="30" textAnchor="middle">
              {p.conflict
                ? "未监听"
                : current.returning
                  ? "↑ 返回调用者"
                  : "↓ 调用下一层"}
            </text>
            {["audit", "gate", "mux", result.handler || "内建响应"].map(
              (name, index) => {
                const active = !p.conflict && current.stack.length > index;
                const y = 60 + index * 69;
                return (
                  <g key={index}>
                    <rect
                      x={14 + index * 12}
                      y={y}
                      width={248 - index * 24}
                      height="49"
                      rx="5"
                      fill={active ? C.elevated : C.bg}
                      stroke={active ? C.accent : C.border}
                      strokeWidth={active ? 3 : 1}
                      strokeDasharray={active ? undefined : "4 4"}
                    />
                    <text
                      x="140"
                      y={y + 30}
                      textAnchor="middle"
                      fill={active ? C.text : C.muted}
                    >
                      {name}
                      {active ? " · 在栈" : " · 不在栈"}
                    </text>
                    {active && index > 0 && (
                      <path
                        d={
                          current.returning
                            ? `M${19 + index * 12} ${y + 9} L${19 + index * 12} ${y - 15}`
                            : `M${19 + index * 12} ${y - 15} L${19 + index * 12} ${y + 9}`
                        }
                        stroke={C.accent}
                        strokeWidth="2"
                        markerEnd={`url(#${id}-stack)`}
                      />
                    )}
                  </g>
                );
              },
            )}
            <text x="140" y="377" textAnchor="middle">
              {p.conflict ? "注册已中止" : `栈深度 ${current.stack.length}`}
            </text>
            <text
              x="140"
              y="413"
              textAnchor="middle"
              fill={!p.allowed ? C.danger : C.muted}
            >
              {!p.allowed ? "拒绝：mux永不入栈" : "内层先退，外层后退"}
            </text>
          </svg>
        </figure>
      </div>
      <div className="mt-4 border-t border-border pt-4 text-sm text-primary">
        <p>
          <strong>当前请求：</strong>
          {p.method} {p.path}
        </p>
        <p>
          <strong>响应：</strong>
          {p.conflict ? "无（注册失败）" : responded ? status : "尚未写入"}
          {responded && p.allowed && result.allow
            ? `；Allow: ${result.allow}`
            : ""}
          {responded && p.allowed && result.location
            ? `；Location: ${result.location}`
            : ""}
        </p>
        {responded && p.method === "HEAD" && (
          <p>
            HEAD提示：路由仍可执行GET处理器；真实服务不发送响应正文。Recorder直接调用不等于线上传输。
          </p>
        )}
        <p className="mt-2">
          <strong>已执行轨迹：</strong>
          {p.conflict
            ? "注册panic"
            : trace
                .slice(0, frame + 1)
                .map((step) => step.event)
                .join(" → ")}
        </p>
        <p className="mt-2 text-secondary">
          虚线表示未注册或不在栈，✓表示选中，×表示不匹配；颜色不是唯一线索。图不覆盖host规则、转义路径或panic后的清理；after仅代表正常返回。
        </p>
      </div>
    </section>
  );
}
