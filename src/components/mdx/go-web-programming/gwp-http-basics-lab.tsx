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
};

export type Method = "GET" | "DELETE" | "POST";
export function requestEffect(method: Method, count: number) {
  if (method === "GET") return { count, status: 200 };
  if (method === "DELETE") return { count: 0, status: count ? 204 : 404 };
  return { count: count + 1, status: 201 };
}

// Model only the final response commit; not TCP bytes, 1xx, or trailers.
export function responseSnapshot(late: boolean, step: number) {
  return {
    committed: late ? step >= 1 : step >= 2,
    status: step === 0 || (!late && step < 2) ? null : late ? 200 : 400,
    localHeader: step >= (late ? 2 : 1) ? "checked" : "—",
    sentHeader: !late && step >= 2 ? "checked" : "—",
    body: step >= (late ? 1 : 3) ? "bad name\\n" : "—",
  };
}

const buttonClass =
  "min-h-11 min-w-11 rounded-lg border border-border px-3 py-2 text-sm whitespace-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:opacity-50";

export function GwpHttpBasicsLab() {
  const id = useId();
  const [mode, setMode] = useState<"repeat" | "commit">("repeat");
  const [method, setMethod] = useState<Method>("GET");
  const [statuses, setStatuses] = useState<number[]>([]);
  const [count, setCount] = useState(1);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [late, setLate] = useState(false);
  const [step, setStep] = useState(0);
  const [statusPrediction, setStatusPrediction] = useState<number | null>(null);
  const snapshot = responseSnapshot(late, step);
  const path = method === "POST" ? "/notes" : "/notes/7";
  const instructions = late
    ? [
        "待执行",
        'Write("bad name\\n")',
        'Set("X-Phase", "checked")',
        "WriteHeader(400)",
      ]
    : [
        "待执行",
        'Set("X-Phase", "checked")',
        "WriteHeader(400)",
        'Write("bad name\\n")',
      ];

  function chooseMethod(next: Method) {
    setMethod(next);
    setStatuses([]);
    setCount(1);
    setPrediction(null);
  }
  function reset() {
    setMode("repeat");
    chooseMethod("GET");
    setLate(false);
    setStep(0);
    setStatusPrediction(null);
  }

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="not-prose my-8 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5"
      data-testid="gwp-http-basics-lab"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id={`${id}-title`} className="m-0 text-lg font-semibold">
          HTTP：请求效果与响应提交
        </h3>
        <button type="button" className={buttonClass} onClick={reset}>
          重置全部实验
        </button>
      </div>
      <p className="my-3 text-sm text-secondary">
        本地确定性协议模型，不发送网络请求。先预测，再手动执行，最后解释；无自动播放。
        Go 实测另用正文的 httptest 入口，不把模型当网络抓包。
      </p>
      <div
        role="group"
        aria-label="选择协议实验"
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          className={buttonClass}
          aria-pressed={mode === "repeat"}
          onClick={() => setMode("repeat")}
        >
          重复请求实验
        </button>
        <button
          type="button"
          className={buttonClass}
          aria-pressed={mode === "commit"}
          onClick={() => setMode("commit")}
        >
          响应提交实验
        </button>
      </div>

      {mode === "repeat" ? (
        <div className="mt-4 min-w-0">
          <p className="text-sm">
            初始有一条笔记 #7。预测：执行两次完全相同的请求后，集合还剩几条？
          </p>
          <div
            role="group"
            aria-label="请求方法"
            className="my-3 flex flex-wrap gap-2"
          >
            {(["GET", "DELETE", "POST"] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={buttonClass}
                aria-pressed={method === value}
                onClick={() => chooseMethod(value)}
              >
                {value} 请求
              </button>
            ))}
          </div>
          <div
            role="group"
            aria-label="预测两次请求后的资源数"
            className="flex flex-wrap gap-2"
          >
            {[0, 1, 3].map((value) => (
              <button
                key={value}
                type="button"
                className={buttonClass}
                aria-pressed={prediction === value}
                disabled={statuses.length > 0}
                onClick={() => setPrediction(value)}
              >
                预测 {value} 条
              </button>
            ))}
          </div>
          <pre
            aria-label="请求协议对象"
            className="my-3 whitespace-pre-wrap break-words rounded-lg border border-border p-3 text-sm"
          >
            {`${method} ${path} HTTP/1.1\nHost: example.test${method === "POST" ? "\nContent-Type: text/plain\n\nGo" : "\n\n"}`}
          </pre>
          <svg
            viewBox="0 0 280 350"
            role="img"
            aria-label={`重复请求状态图：笔记 ${count} 条，访问日志 ${statuses.length} 条`}
            className="mx-auto block w-full max-w-sm"
            style={{ fontSize: 18 }}
          >
            <g fill={C.text}>
              <text x="12" y="26">
                资源集合 /notes
              </text>
              <path
                d="M12 42 V128 H268 V42"
                stroke={C.border}
                fill="none"
                strokeWidth="2"
              />
              {Array.from({ length: count }, (_, i) => (
                <g key={i}>
                  <circle
                    cx={52 + i * 86}
                    cy="78"
                    r="23"
                    fill={C.accent}
                    fillOpacity="0.15"
                    stroke={C.accent}
                    strokeWidth="2"
                  />
                  <text x={52 + i * 86} y="85" textAnchor="middle">
                    #{7 + i}
                  </text>
                </g>
              ))}
              {count === 0 && (
                <path
                  d="M112 61 L168 102 M168 61 L112 102"
                  stroke={C.danger}
                  strokeWidth="3"
                />
              )}
              <text x="16" y="158">
                当前资源：{count} 条
              </text>
              <text x="16" y="194">
                独立的访问日志
              </text>
              {[0, 1].map((i) => (
                <g key={i}>
                  <rect
                    x="16"
                    y={210 + i * 50}
                    width="248"
                    height="39"
                    rx="5"
                    fill={statuses[i] ? C.accent : C.bg}
                    fillOpacity={statuses[i] ? 0.12 : 1}
                    stroke={statuses[i] ? C.accent : C.border}
                  />
                  <text x="28" y={236 + i * 50}>
                    {i + 1}.{" "}
                    {statuses[i] ? `${method} → ${statuses[i]}` : "尚未执行"}
                  </text>
                </g>
              ))}
              <text x="16" y="337">
                日志条数：{statuses.length}（另计）
              </text>
            </g>
          </svg>
          <button
            type="button"
            className={buttonClass}
            disabled={prediction === null || statuses.length === 2}
            onClick={() => {
              const next = requestEffect(method, count);
              setCount(next.count);
              setStatuses([...statuses, next.status]);
            }}
          >
            执行一次相同请求
          </button>
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="mt-3 text-sm"
          >
            {prediction === null
              ? "请选择预测后再执行。"
              : `已执行 ${statuses.length}/2 次；资源 ${count} 条；日志 ${statuses.length} 条。`}
            {statuses.length === 2 && (
              <p>
                {prediction === count
                  ? "预测正确。"
                  : `预测为 ${prediction} 条，实际为 ${count} 条。`}
                {method === "GET"
                  ? "GET 没有请求改变笔记，却留下两条日志；安全不是零副作用。"
                  : method === "DELETE"
                    ? "第一次 204、第二次 404；两次之后都没有 #7，响应不同不破坏幂等。"
                    : "本例每次 POST 都新增一条，1→2→3；POST 没有通用的幂等保证。"}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 min-w-0">
          <p className="text-sm">
            同样想返回 400 和 X-Phase: checked。预测：首次写 body
            在前，最终还能把 200 改成 400 吗？
          </p>
          <button
            type="button"
            className={`${buttonClass} my-3`}
            aria-pressed={late}
            onClick={() => {
              setLate(!late);
              setStep(0);
              setStatusPrediction(null);
            }}
          >
            故障：先写 body
          </button>
          <div
            role="group"
            aria-label="预测最终状态码"
            className="flex flex-wrap gap-2"
          >
            {[200, 400].map((value) => (
              <button
                key={value}
                type="button"
                className={buttonClass}
                aria-pressed={statusPrediction === value}
                disabled={step > 0}
                onClick={() => setStatusPrediction(value)}
              >
                预测状态 {value}
              </button>
            ))}
          </div>
          <svg
            viewBox="0 0 280 350"
            role="img"
            aria-label={`响应提交边界：步骤 ${step}，已提交 ${snapshot.committed ? "是" : "否"}，状态 ${snapshot.status ?? "未定"}`}
            className="mx-auto block w-full max-w-sm"
            style={{ fontSize: 18 }}
          >
            <g fill={C.text}>
              <text x="12" y="26">
                处理器内的 Header map
              </text>
              <rect
                x="12"
                y="39"
                width="256"
                height="52"
                rx="5"
                stroke={C.border}
                fill={C.bg}
              />
              <text x="22" y="71">
                X-Phase: {snapshot.localHeader}
              </text>
              <path
                d="M140 94 V133 M133 124 L140 135 L147 124"
                fill="none"
                stroke={C.accent}
                strokeWidth="2"
              />
              <path
                d="M12 143 H268"
                stroke={snapshot.committed ? C.danger : C.border}
                strokeWidth="3"
                strokeDasharray={snapshot.committed ? undefined : "6 5"}
              />
              <text x="12" y="171">
                {snapshot.committed ? "已提交：不能回写 ↑" : "未提交：仍可修改"}
              </text>
              <rect
                x="12"
                y="188"
                width="256"
                height="116"
                rx="5"
                fill={C.bg}
                stroke={snapshot.committed ? C.accent : C.border}
                strokeWidth="2"
              />
              <text x="22" y="215">
                状态：{snapshot.status ?? "—"}
              </text>
              <text x="22" y="249">
                X-Phase: {snapshot.sentHeader}
              </text>
              <text x="22" y="283">
                body: {snapshot.body}
              </text>
              {[0, 1, 2, 3].map((n) => (
                <circle
                  key={n}
                  cx={50 + n * 60}
                  cy="330"
                  r="9"
                  fill={n <= step ? C.accent : C.bg}
                  stroke={C.border}
                />
              ))}
            </g>
          </svg>
          <p aria-label="当前执行语句" className="break-words text-sm">
            步骤 {step}/3：<code>{instructions[step]}</code>
          </p>
          <button
            type="button"
            className={buttonClass}
            disabled={statusPrediction === null || step === 3}
            onClick={() => setStep(step + 1)}
          >
            执行下一条写响应语句
          </button>
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="mt-3 text-sm"
          >
            {statusPrediction === null
              ? "请选择最终状态预测后再执行。"
              : `当前状态：${snapshot.status ?? "未提交"}；响应 X-Phase：${snapshot.sentHeader}。`}
            {step === 3 && (
              <p>
                {statusPrediction === snapshot.status
                  ? "预测正确。"
                  : "预测不符。"}
                {late
                  ? "首次 Write 隐含提交 200；随后本地 Header map 可变，但已提交响应不含 X-Phase，晚写 400 无效。"
                  : "先设置头、再提交 400、最后写 body；响应包含 X-Phase: checked。"}
                这里的提交不代表数据此刻已物理发送到网卡。
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
