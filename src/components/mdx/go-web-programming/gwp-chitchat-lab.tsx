"use client";

import { useId, useState } from "react";

export type SessionCase =
  | "valid"
  | "missing"
  | "invalid"
  | "expired"
  | "revoked";
export type Fault = "none" | "session-db" | "thread-db" | "template";
export type Route = "thread" | "static";
export function chitchatTrace(
  session: SessionCase,
  fault: Fault,
  route: Route,
) {
  if (route === "static")
    return {
      status: 200,
      stop: 1,
      lookup: false,
      query: false,
      render: false,
      reason: "静态资源旁路：不读 sessions，不查 threads",
    };
  if (session === "missing")
    return {
      status: 403,
      stop: 1,
      lookup: false,
      query: false,
      render: false,
      reason: "没有 sid；不能从请求猜 user_id",
    };
  if (fault === "session-db")
    return {
      status: 503,
      stop: 1,
      lookup: true,
      query: false,
      render: false,
      reason: "会话存储不可用；不是登录失败",
    };
  if (session !== "valid")
    return {
      status: 403,
      stop: 1,
      lookup: true,
      query: false,
      render: false,
      reason:
        session === "expired"
          ? "expires_at ≤ 固定时钟；命中也必须拒绝"
          : session === "revoked"
            ? "已撤销行；旧 cookie 重放仍然拒绝"
            : "sid 未命中；客户端 user_id 不构成凭证",
    };
  if (fault === "thread-db")
    return {
      status: 503,
      stop: 2,
      lookup: true,
      query: true,
      render: false,
      reason: "主题存储失败；不把错误伪装成空列表",
    };
  if (fault === "template")
    return {
      status: 500,
      stop: 3,
      lookup: true,
      query: true,
      render: true,
      reason: "模板执行失败；丢弃缓冲区，未提交半页 200",
    };
  return {
    status: 200,
    stop: 3,
    lookup: true,
    query: true,
    render: true,
    reason: "会话授权成功；独立 SQL 参数 → 转义 HTML",
  };
}

const C = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  bg: "var(--bg-elevated)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 rounded-md border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export function GwpChitchatLab() {
  const id = useId();
  const [session, setSession] = useState<SessionCase>("valid");
  const [fault, setFault] = useState<Fault>("none");
  const [route, setRoute] = useState<Route>("thread");
  const [unsafeTitle, setUnsafeTitle] = useState(false);
  const [step, setStep] = useState(0);
  const trace = chitchatTrace(session, fault, route);
  const done = step >= trace.stop;
  const authorized = step >= 1 && trace.query;
  const sql = step >= 2 && trace.query;
  const rendered = step >= 3 && trace.render;
  const bad = trace.status !== 200;
  const reset = () => {
    setSession("valid");
    setFault("none");
    setRoute("thread");
    setUnsafeTitle(false);
    setStep(0);
  };
  const edge = (active: boolean) => (active ? C.accent : C.border);
  const token = {
    valid: "k_live",
    missing: "无 cookie",
    invalid: "k_unknown",
    expired: "k_old",
    revoked: "k_deleted",
  }[session];
  return (
    <section
      aria-label="ChitChat 请求与会话实验"
      className="not-prose my-8 min-w-0 rounded-xl border p-3 sm:p-5"
      style={{ color: C.text, borderColor: C.border }}
    >
      <h3 className="text-lg font-semibold">一张 cookie 能否换回主题页面？</h3>
      <p className="my-2 text-sm">
        教学内存模型，不连接 PostgreSQL。固定时钟 12:00；有效行到期
        12:30，过期行到期 11:59。先选参数，再逐步发出请求。
        无有效会话时直接拒绝为 403；本例不发 HTTP 认证挑战或登录跳转。
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <fieldset className="min-w-0">
          <legend className="mb-1 font-medium">会话 cookie</legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["valid", "有效会话"],
                ["missing", "无 cookie"],
                ["invalid", "无效会话"],
                ["expired", "过期会话"],
                ["revoked", "已注销会话"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={control}
                aria-pressed={session === value}
                onClick={() => {
                  setSession(value);
                  setStep(0);
                }}
                style={{ borderColor: session === value ? C.accent : C.border }}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="min-w-0">
          <legend className="mb-1 font-medium">错误边界</legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["none", "无故障"],
                ["session-db", "会话库失败"],
                ["thread-db", "主题库失败"],
                ["template", "模板失败"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={control}
                aria-pressed={fault === value}
                onClick={() => {
                  setFault(value);
                  setStep(0);
                }}
                style={{ borderColor: fault === value ? C.accent : C.border }}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="min-w-0">
          <legend className="mb-1 font-medium">请求路径</legend>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={control}
              aria-pressed={route === "thread"}
              onClick={() => {
                setRoute("thread");
                setStep(0);
              }}
            >
              GET /threads/7
            </button>
            <button
              type="button"
              className={control}
              aria-pressed={route === "static"}
              onClick={() => {
                setRoute("static");
                setStep(0);
              }}
            >
              GET /static/site.css
            </button>
          </div>
        </fieldset>
        <div className="flex items-end">
          <button
            type="button"
            className={control}
            aria-pressed={unsafeTitle}
            onClick={() => {
              setUnsafeTitle(!unsafeTitle);
              setStep(0);
            }}
          >
            不可信标题：{unsafeTitle ? "开启" : "关闭"}
          </button>
        </div>
      </div>
      <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2">
        <svg
          viewBox="0 0 280 660"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="mx-auto block w-full max-w-[360px]"
          style={{ fontSize: 14 }}
        >
          <title id={`${id}-title`}>
            cookie 探针、会话记录、SQL 绑定与响应路径
          </title>
          <desc
            id={`${id}-desc`}
          >{`步骤 ${step}。${token}。${done ? trace.reason : "沿高亮线单步追踪"}。users 42 只在会话有效时交给主题处理器。`}</desc>
          <defs>
            <marker
              id={`${id}-arrow`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6" fill={C.accent} />
            </marker>
          </defs>
          <g fill={C.text}>
            <rect
              x="8"
              y="8"
              width="264"
              height="66"
              rx="8"
              fill={C.bg}
              stroke={C.accent}
            />
            <text x="20" y="32">
              {route === "thread" ? "GET /threads/7" : "GET /static/site.css"}
            </text>
            <text x="20" y="56">
              sid = {token}
            </text>
            <path
              d="M140 74 V116"
              stroke={edge(step >= 1 && trace.lookup)}
              strokeWidth="3"
              markerEnd={
                step >= 1 && trace.lookup ? `url(#${id}-arrow)` : undefined
              }
            />
            <text x="150" y="101">
              按 token 查找
            </text>
            <rect
              x="8"
              y="121"
              width="264"
              height="148"
              rx="5"
              fill={C.bg}
              stroke={C.border}
            />
            <text x="18" y="144">
              sessions：key / user / 有效期
            </text>
            {[
              ["k_live", "42", "12:30"],
              ["k_old", "42", "11:59"],
              ["k_deleted", "—", "已删除"],
            ].map((row, i) => (
              <g key={row[0]}>
                <rect
                  x="14"
                  y={155 + i * 35}
                  width="252"
                  height="32"
                  fill={C.bg}
                  stroke={
                    step >= 1 &&
                    trace.lookup &&
                    fault !== "session-db" &&
                    token === row[0]
                      ? session === "valid"
                        ? C.accent
                        : C.danger
                      : C.border
                  }
                  strokeWidth="2"
                />
                <text x="21" y={177 + i * 35}>
                  {row[0]}
                </text>
                <text x="133" y={177 + i * 35}>
                  {row[1]}
                </text>
                <text x="185" y={177 + i * 35}>
                  {row[2]}
                </text>
              </g>
            ))}
            <path
              d="M80 269 V320 H140"
              fill="none"
              stroke={edge(authorized)}
              strokeWidth="3"
            />
            <circle
              cx="157"
              cy="320"
              r="20"
              fill={C.bg}
              stroke={edge(authorized)}
              strokeWidth="3"
            />
            <text x="148" y="325">
              42
            </text>
            <text x="185" y="325">
              users.id
            </text>
            <path d="M157 340 V370" stroke={edge(sql)} strokeWidth="3" />
            <rect
              x="8"
              y="374"
              width="264"
              height="112"
              rx="5"
              fill={C.bg}
              stroke={edge(sql)}
              strokeWidth="2"
            />
            <text x="18" y="396">
              threads：SQL 与值分开
            </text>
            <text x="18" y="422">
              WHERE id = $1
            </text>
            <rect
              x="18"
              y="435"
              width="89"
              height="36"
              rx="4"
              fill={C.bg}
              stroke={edge(sql)}
            />
            <text x="27" y="458">
              $1 ← 7
            </text>
            <text x="120" y="458">
              不拼接字符串
            </text>
            <path d="M140 486 V520" stroke={edge(rendered)} strokeWidth="3" />
            <path
              d="M18 524 H245 L263 543 V586 H18 Z M245 524 V543 H263"
              fill={C.bg}
              stroke={edge(rendered)}
              strokeWidth="2"
            />
            <text x="28" y="550">
              html/template → buffer
            </text>
            <text x="28" y="574">
              {rendered
                ? fault === "template"
                  ? "执行失败：丢弃半页"
                  : unsafeTitle
                    ? "<script> → &lt;script&gt;"
                    : "主题：Go 讨论"
                : "未执行，不提前写 200"}
            </text>
            <path
              d="M140 586 V614"
              stroke={edge(done && !bad && route === "thread")}
              strokeWidth="3"
            />
            {done && bad && (
              <path
                d={`M265 ${trace.stop === 1 ? 280 : trace.stop === 2 ? 490 : 590} H275 V635 H249`}
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
              />
            )}
            {step >= 1 && route === "static" && (
              <path
                d="M9 64 H3 V635 H28"
                fill="none"
                stroke={C.accent}
                strokeWidth="3"
              />
            )}
            <rect
              x="29"
              y="615"
              width="220"
              height="40"
              rx="7"
              fill={C.bg}
              stroke={done && bad ? C.danger : edge(done)}
              strokeWidth="2"
            />
            <text x="43" y="640">
              {done
                ? `HTTP ${trace.status} · ${bad ? "拒绝 / 错误" : "响应提交"}`
                : "HTTP 状态尚未提交"}
            </text>
          </g>
        </svg>
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={control}
              disabled={done}
              onClick={() => setStep(Math.min(step + 1, trace.stop))}
            >
              下一步
            </button>
            <button
              type="button"
              className={control}
              disabled={step === 0}
              onClick={() => setStep(Math.max(step - 1, 0))}
            >
              上一步
            </button>
            <button type="button" className={control} onClick={reset}>
              重置全部参数
            </button>
          </div>
          <p role="status" aria-live="polite" className="my-3 break-words">
            步骤 {step}/{trace.stop}：
            {done
              ? trace.reason
              : step === 0
                ? "已备好请求；尚未访问存储"
                : step === 1
                  ? "有效会话提供 user_id=42；准备查询主题7"
                  : "取得主题；尚未提交 HTML"}
          </p>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt>会话 lookup</dt>
            <dd>{step >= 1 && trace.lookup ? "1 次（模拟）" : "0 次"}</dd>
            <dt>主题 SQL</dt>
            <dd>{sql ? "1 次（模拟）" : "0 次"}</dd>
            <dt>响应状态</dt>
            <dd>{done ? trace.status : "未提交"}</dd>
          </dl>
          <h4 className="mt-4 font-semibold">响应源文本（不是可执行 HTML）</h4>
          <pre className="mt-2 whitespace-pre-wrap break-all rounded-md border p-3 text-sm">
            {!done
              ? "等待处理完成"
              : bad
                ? `${trace.status}: ${trace.status === 403 ? "forbidden" : trace.status === 503 ? "store unavailable" : "render failed"}`
                : route === "static"
                  ? "body { margin: 0; }"
                  : unsafeTitle
                    ? "<h1>&lt;script&gt;alert(1)&lt;/script&gt;</h1>"
                    : "<h1>Go 讨论</h1>"}
          </pre>
          <p className="mt-3 text-sm">
            这里保护的是教学主题页；不是说所有论坛浏览都必须登录。未命中、过期和注销均阻断主题查询。故障只在实际到达的边界生效，静态路径不受数据库开关影响。
          </p>
        </div>
      </div>
    </section>
  );
}
