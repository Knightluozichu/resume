"use client";

import { useId, useState } from "react";

type Identity = "anonymous" | "alice" | "bob";
type ObjectId = "11" | "22" | "999";
const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  accent: "var(--accent)",
  bg: "var(--bg-elevated)",
};
const initial = {
  identity: "alice" as Identity,
  method: "GET" as "GET" | "POST",
  objectId: "11" as ObjectId,
  csrf: true,
  valid: true,
};

/** A bounded model of edit_entry, not a browser session or a security implementation. */
export function PccUserAccountsLab() {
  const [request, setRequest] = useState(initial);
  const id = useId();
  const { identity, method, objectId, csrf, valid } = request;
  const post = method === "POST";
  const owner = objectId === "11" ? "alice" : objectId === "22" ? "bob" : null;
  const csrfDenied = post && !csrf;
  const anonymous = identity === "anonymous";
  const authorized = owner !== null && owner === identity;
  // CsrfViewMiddleware runs before the decorated view: even anonymous POST can be 403.
  const boundary = csrfDenied
    ? 0
    : anonymous
      ? 1
      : !authorized
        ? 2
        : post && !valid
          ? 3
          : 4;
  const status = csrfDenied
    ? "403：缺少 CSRF，未进入视图"
    : anonymous
      ? "302：转到登录页，带站内 next"
      : !authorized
        ? "404：自己的查询范围内没有此对象"
        : !post
          ? "200：展示带原文的编辑表单"
          : !valid
            ? "200：保留输入与错误，不写数据库"
            : "302 → GET 200：保存，再读取主题页";
  const stages = [
    "CSRF 中间件",
    "登录检查",
    "限定 owner 查找",
    "校验 text",
    "响应 / PRG",
  ];
  const ownerX = owner === "alice" ? 78 : 254;
  const identityX = identity === "alice" ? 78 : 254;
  const title = `编辑 Entry ${objectId}：${identity}，${method}，${status}`;
  const selectClass =
    "min-h-11 w-full rounded-control border border-border bg-elevated px-2 text-base text-primary";

  return (
    <section
      className="not-prose my-6 min-w-0 rounded-card border border-border p-3 text-primary"
      aria-label="用户身份与对象授权实验"
    >
      <h3 className="mb-2 text-lg font-semibold">
        一张凭证，不是全部对象的通行证
      </h3>
      <p className="mb-3 text-sm text-secondary">
        只模拟编辑请求，不会登录真实账户。s_alice
        等是示意标识，不是真实会话密钥。无动画；重置恢复全部五项。
      </p>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">
          浏览器身份
          <select
            className={selectClass}
            value={identity}
            onChange={(e) =>
              setRequest({ ...request, identity: e.target.value as Identity })
            }
          >
            <option value="anonymous">匿名（未认证）</option>
            <option value="alice">Alice</option>
            <option value="bob">Bob</option>
          </select>
        </label>
        <label className="text-sm">
          请求方法
          <select
            className={selectClass}
            value={method}
            onChange={(e) =>
              setRequest({
                ...request,
                method: e.target.value as "GET" | "POST",
              })
            }
          >
            <option>GET</option>
            <option>POST</option>
          </select>
        </label>
        <label className="col-span-2 text-sm">
          URL 中的 Entry 对象
          <select
            className={selectClass}
            value={objectId}
            onChange={(e) =>
              setRequest({ ...request, objectId: e.target.value as ObjectId })
            }
          >
            <option value="11">Entry 11 → Topic 1 → Alice</option>
            <option value="22">Entry 22 → Topic 2 → Bob</option>
            <option value="999">Entry 999（不存在）</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="h-11 w-11 shrink-0 accent-[var(--accent)]"
            checked={csrf}
            onChange={(e) => setRequest({ ...request, csrf: e.target.checked })}
          />
          有效 CSRF
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="h-11 w-11 shrink-0 accent-[var(--accent)]"
            checked={valid}
            onChange={(e) =>
              setRequest({ ...request, valid: e.target.checked })
            }
          />
          text 非空
        </label>
      </div>
      <svg
        viewBox="0 0 332 760"
        role="img"
        aria-labelledby={`${id}-title`}
        className="mx-auto mt-3 block w-full max-w-[380px]"
        style={{ fontSize: 16 }}
      >
        <title id={`${id}-title`}>{title}</title>
        <g fill="none" stroke={C.line} strokeWidth="2">
          {/* Browser chrome, session key and server-side user branches. */}
          <rect x="12" y="10" width="308" height="72" rx="8" />
          <path d="M12 34H320" />
          <circle cx="26" cy="22" r="3" />
          <circle cx="38" cy="22" r="3" />
          {!anonymous && (
            <path
              d={`M166 82V106H${identityX}V166`}
              stroke={C.accent}
              strokeWidth="3"
            />
          )}
          {anonymous && <path d="M155 92l22 22m0-22l-22 22" stroke={C.muted} />}
          <path d="M12 126H320" strokeDasharray="5 5" />
        </g>
        <g fill={C.ink} textAnchor="middle">
          <text x="166" y="60">
            {anonymous
              ? "cookie：匿名或无 sessionid"
              : `cookie：sessionid = s_${identity}`}
          </text>
          <text x="166" y="149">
            服务端 session → user_id
          </text>
        </g>
        {(["alice", "bob"] as const).map((user, i) => {
          const x = i === 0 ? 78 : 254;
          return (
            <g
              key={user}
              stroke={identity === user ? C.accent : C.line}
              strokeWidth="2"
              fill="none"
            >
              <circle cx={x} cy="182" r="14" />
              <path d={`M${x - 23} 222v-10q23-27 46 0v10`} />
              <text
                x={x}
                y="248"
                fill={C.ink}
                stroke="none"
                textAnchor="middle"
              >
                {user === "alice" ? "Alice · 1" : "Bob · 2"}
              </text>
            </g>
          );
        })}
        {owner ? (
          <g
            stroke={authorized && !anonymous ? C.accent : C.muted}
            strokeWidth="2"
            fill="none"
          >
            <path d={`M${ownerX} 258V282H166V305`} />
            {/* Folder represents Topic; the page attached beneath it represents Entry. */}
            <path d="M95 308v-13h58l10 13h75v53H95Z" fill={C.bg} />
            <path d="M166 361v15M128 376h64l18 18v56h-82Z" fill={C.bg} />
            <path d="M192 376v18h18M140 419h58M140 432h38" />
            <g fill={C.ink} stroke="none" textAnchor="middle">
              <text x="166" y="333">
                {`Topic ${objectId === "11" ? "1" : "2"}`}
              </text>
              <text x="166" y="354">
                {`owner_id = ${owner === "alice" ? "1" : "2"}`}
              </text>
              <text x="166" y="413">
                {`Entry ${objectId}`}
              </text>
            </g>
          </g>
        ) : (
          <g stroke={C.muted} fill="none" strokeWidth="2">
            <path d="M128 298h64l18 18v95h-82Z" strokeDasharray="6 5" />
            <path d="M128 310l82 100m0-100l-82 100" />
            <text
              x="166"
              y="443"
              fill={C.ink}
              stroke="none"
              textAnchor="middle"
            >
              没有 Entry，也没有归属边
            </text>
          </g>
        )}
        <path d="M12 470H320" stroke={C.line} />
        <text x="16" y="494" fill={C.ink}>
          实际到达的请求边界
        </text>
        {stages.map((stage, i) => {
          const y = 524 + i * 43;
          const reached = i <= boundary;
          const stopped = i === boundary && boundary < 4;
          const bypass = i === 0 && !post;
          return (
            <g key={stage}>
              {i > 0 && (
                <path
                  d={`M30 ${y - 32}V${y - 10}`}
                  stroke={reached ? C.accent : C.line}
                  strokeWidth="3"
                  strokeDasharray={reached ? undefined : "4 4"}
                />
              )}
              {stopped ? (
                <path
                  d={`M17 ${y - 10}H43V${y + 10}H17Z M20 ${y - 7}L40 ${y + 7}`}
                  stroke={C.accent}
                  strokeWidth="3"
                  fill={C.bg}
                />
              ) : (
                <circle
                  cx="30"
                  cy={y}
                  r="10"
                  fill={reached && !bypass ? C.accent : C.bg}
                  stroke={reached ? C.accent : C.line}
                  strokeWidth="2"
                />
              )}
              <text x="52" y={y + 5} fill={reached ? C.ink : C.muted}>
                {i === 3 && !post
                  ? "GET：不绑定、不写入"
                  : bypass
                    ? "GET：跳过令牌校验"
                    : stage}
              </text>
              {i === 4 && boundary === 4 && post && (
                <path
                  d={`M290 ${y - 16}q28 0 28 20t-28 20m0-5l-6 5 6 5`}
                  fill="none"
                  stroke={C.accent}
                  strokeWidth="2"
                />
              )}
            </g>
          );
        })}
        <text x="16" y="746" fill={C.muted}>
          实线：到达　斜杠：拦截　虚线：未到达
        </text>
      </svg>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-2 min-h-12 break-words text-base font-medium"
      >
        {status}
      </p>
      <p className="my-2 text-sm text-secondary">
        {post
          ? "POST 的 owner/topic 即使伪造也不会改变上方归属边；服务器只接收 text。"
          : "GET 不写数据；CSRF 勾选不影响 GET。身份和归属是两次不同的判断。"}
      </p>
      <button
        type="button"
        onClick={() => setRequest({ ...initial })}
        className="min-h-11 min-w-11 rounded-control border border-border px-4 text-base focus-visible:outline-2 focus-visible:outline-accent"
      >
        重置全部请求条件
      </button>
    </section>
  );
}
