"use client";

import { useId, useMemo, useState } from "react";

export type HttpExperimentModel = {
  title: string;
  focus: string;
  concepts: string[];
  fault: string;
  evidence: string;
};

type Props = {
  model: HttpExperimentModel;
  mode: "message" | "flow" | "evidence";
};

function MessageLab({ model }: { model: HttpExperimentModel }) {
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [framing, setFraming] = useState<"length" | "chunked">("length");
  const [connection, setConnection] = useState<"keep-alive" | "close">(
    "keep-alive",
  );
  const body = method === "POST" ? "hello=web" : "";
  const request = [
    `${method} /resource?chapter=${encodeURIComponent(model.title.slice(0, 18))} HTTP/1.1`,
    "Host: example.test",
    `Connection: ${connection}`,
    ...(method === "POST"
      ? framing === "length"
        ? [`Content-Length: ${body.length}`, "", body]
        : ["Transfer-Encoding: chunked", "", "9", body, "0", ""]
      : ["", ""]),
  ].join("\r\n");
  const boundary =
    method === "GET"
      ? "首部空行结束请求"
      : framing === "length"
        ? `再读取 ${body.length} 字节`
        : "读取 chunk size 直到 0";

  return (
    <div
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-sky-200 bg-sky-50 shadow-sm dark:border-sky-900 dark:bg-sky-950/35"
      data-visual-kind={`http-message-${model.title}`}
    >
      <div className="border-b border-sky-200 px-4 py-3 dark:border-sky-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase dark:text-sky-300">
          HTTP/1.1 message laboratory
        </p>
        <h3 className="mt-1 font-semibold">{model.title}</h3>
        <p className="mt-1 break-words text-sm text-slate-600 dark:text-slate-300">
          {model.focus}
        </p>
      </div>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="min-w-0 space-y-4">
          <fieldset>
            <legend className="text-xs font-semibold text-slate-500">
              请求方法
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["GET", "POST"] as const).map((value) => (
                <button
                  className={`min-h-11 rounded-lg border px-3 py-2 text-sm ${
                    method === value
                      ? "border-sky-600 bg-sky-600 text-white"
                      : "border-sky-200 bg-white dark:border-sky-800 dark:bg-slate-950"
                  }`}
                  key={value}
                  onClick={() => setMethod(value)}
                  type="button"
                >
                  {value}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block text-sm">
            主体边界
            <select
              className="mt-2 min-h-11 w-full rounded-lg border border-sky-200 bg-white px-3 py-2 dark:border-sky-800 dark:bg-slate-950"
              onChange={(event) =>
                setFraming(event.target.value as "length" | "chunked")
              }
              value={framing}
            >
              <option value="length">Content-Length</option>
              <option value="chunked">chunked</option>
            </select>
          </label>

          <button
            className="min-h-11 w-full rounded-lg border border-sky-300 bg-white px-3 py-2 text-left text-sm dark:border-sky-800 dark:bg-slate-950"
            onClick={() =>
              setConnection((value) =>
                value === "keep-alive" ? "close" : "keep-alive",
              )
            }
            type="button"
          >
            Connection: <strong>{connection}</strong>
          </button>
        </div>

        <div className="min-w-0">
          <pre className="min-h-52 min-w-0 overflow-x-auto whitespace-pre-wrap break-all rounded-xl bg-slate-950 p-4 text-xs leading-6 text-emerald-300">
            {request}
          </pre>
          <div className="mt-3 rounded-lg border border-sky-200 bg-white p-3 text-sm dark:border-sky-800 dark:bg-slate-950">
            <span className="text-slate-500">解析边界：</span>
            <strong className="break-words">{boundary}</strong>
          </div>
          <p className="mt-3 break-words text-xs text-slate-500">
            章内坐标：{model.concepts.slice(0, 8).join("、")}
          </p>
        </div>
      </div>
    </div>
  );
}

function FlowLab({ model }: { model: HttpExperimentModel }) {
  const markerId = useId().replaceAll(":", "");
  const [cacheState, setCacheState] = useState<"miss" | "fresh" | "revalidate">(
    "revalidate",
  );
  const [proxyEnabled, setProxyEnabled] = useState(true);
  const nodes = [
    { x: 68, label: "Client", color: "#0369a1" },
    ...(proxyEnabled ? [{ x: 235, label: "Proxy", color: "#7c3aed" }] : []),
    { x: proxyEnabled ? 402 : 320, label: "Cache", color: "#b45309" },
    { x: 570, label: "Origin", color: "#047857" },
  ];
  const outcome = {
    miss: { status: "200", source: "Origin", age: "0" },
    fresh: { status: "200", source: "Cache", age: "47" },
    revalidate: {
      status: "304 → cached 200",
      source: "Origin + Cache",
      age: "0",
    },
  }[cacheState];

  return (
    <div
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50 shadow-sm dark:border-violet-900 dark:bg-violet-950/30"
      data-visual-kind={`http-flow-${model.title}`}
    >
      <div className="border-b border-violet-200 px-4 py-3 dark:border-violet-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-violet-700 uppercase dark:text-violet-300">
          Intermediary and cache flow
        </p>
        <h3 className="mt-1 font-semibold">逐跳状态与端到端语义</h3>
      </div>

      <div className="min-w-0 p-4 sm:p-5">
        <div className="min-w-0 overflow-hidden rounded-xl bg-slate-950 p-3">
          <svg
            aria-label={`${model.title} 的客户端、中间实体与源站链路`}
            className="h-auto w-full"
            viewBox="0 0 650 230"
          >
            <defs>
              <marker
                id={markerId}
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0,0 L8,4 L0,8 z" fill="#c4b5fd" />
              </marker>
            </defs>
            <rect
              fill="#0f172a"
              height="206"
              rx="16"
              width="626"
              x="12"
              y="12"
            />
            {nodes.slice(0, -1).map((node, index) => (
              <g key={`${node.label}-${nodes[index + 1].label}`}>
                <line
                  markerEnd={`url(#${markerId})`}
                  stroke="#c4b5fd"
                  strokeWidth="4"
                  x1={node.x + 32}
                  x2={nodes[index + 1].x - 36}
                  y1="90"
                  y2="90"
                />
                <line
                  markerEnd={`url(#${markerId})`}
                  stroke="#67e8f9"
                  strokeDasharray="7 5"
                  strokeWidth="3"
                  x1={nodes[index + 1].x - 32}
                  x2={node.x + 36}
                  y1="150"
                  y2="150"
                />
              </g>
            ))}
            {nodes.map((node) => (
              <g key={node.label}>
                <rect
                  fill={node.color}
                  height="58"
                  rx="12"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                  width="92"
                  x={node.x - 46}
                  y="91"
                />
                <text
                  fill="#fff"
                  fontSize="13"
                  fontWeight="700"
                  textAnchor="middle"
                  x={node.x}
                  y="124"
                >
                  {node.label}
                </text>
              </g>
            ))}
            <text fill="#c4b5fd" fontSize="12" x="28" y="47">
              Request → request-target · Via · validators
            </text>
            <text fill="#67e8f9" fontSize="12" x="28" y="198">
              ← Response · status · Age · representation
            </text>
          </svg>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="grid grid-cols-3 gap-2">
            {(["miss", "fresh", "revalidate"] as const).map((value) => (
              <button
                className={`min-h-11 min-w-0 rounded-lg border px-2 py-2 text-xs ${
                  cacheState === value
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-violet-200 bg-white dark:border-violet-800 dark:bg-slate-950"
                }`}
                key={value}
                onClick={() => setCacheState(value)}
                type="button"
              >
                {value === "miss"
                  ? "未命中"
                  : value === "fresh"
                    ? "新鲜命中"
                    : "再验证"}
              </button>
            ))}
          </div>
          <button
            className="min-h-11 rounded-lg border border-violet-300 bg-white px-3 py-2 text-xs dark:border-violet-800 dark:bg-slate-950"
            onClick={() => setProxyEnabled((value) => !value)}
            type="button"
          >
            Proxy：{proxyEnabled ? "存在" : "移除"}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-white p-2 dark:bg-slate-950">
            <span className="block text-slate-500">status</span>
            <strong className="break-words">{outcome.status}</strong>
          </div>
          <div className="rounded-lg bg-white p-2 dark:bg-slate-950">
            <span className="block text-slate-500">source</span>
            <strong className="break-words">{outcome.source}</strong>
          </div>
          <div className="rounded-lg bg-white p-2 dark:bg-slate-950">
            <span className="block text-slate-500">Age</span>
            <strong>{outcome.age}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function EvidenceLab({ model }: { model: HttpExperimentModel }) {
  const [faultInjected, setFaultInjected] = useState(false);
  const [run, setRun] = useState(1);
  const events = useMemo(
    () => [
      {
        phase: "request",
        value: `run=${run} · Host/example.test · ${model.concepts[0] ?? "HTTP"}`,
        pass: true,
      },
      {
        phase: "intermediary",
        value: faultInjected ? model.fault : "逐跳字段已消费，端到端字段保留",
        pass: !faultInjected,
      },
      {
        phase: "response",
        value: faultInjected
          ? "首个报文或状态分叉已标记"
          : "原始字节与期望一致",
        pass: !faultInjected,
      },
      {
        phase: "recovery",
        value: faultInjected ? "等待撤销故障" : "同一输入重放通过",
        pass: !faultInjected,
      },
    ],
    [faultInjected, model.concepts, model.fault, run],
  );

  return (
    <div
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`http-evidence-${model.title}`}
    >
      <div className="border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase dark:text-emerald-300">
          Raw-message evidence
        </p>
        <h3 className="mt-1 font-semibold">正常、故障、恢复报文链</h3>
      </div>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.62fr_1.38fr]">
        <div className="min-w-0 space-y-3">
          <button
            className={`min-h-11 w-full rounded-lg px-3 py-2 text-sm font-semibold text-white ${
              faultInjected ? "bg-rose-600" : "bg-emerald-700"
            }`}
            onClick={() => setFaultInjected((value) => !value)}
            type="button"
          >
            {faultInjected ? "撤销故障" : "注入单变量故障"}
          </button>
          <button
            className="min-h-11 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-950"
            onClick={() => setRun((value) => value + 1)}
            type="button"
          >
            以同一输入重放
          </button>
          <p className="break-words text-xs text-slate-500">
            必存证据：{model.evidence}
          </p>
        </div>

        <div className="min-w-0 space-y-2">
          {events.map((event, index) => (
            <div
              className={`min-w-0 rounded-lg border p-3 ${
                event.pass
                  ? "border-emerald-300 bg-white dark:border-emerald-800 dark:bg-slate-950"
                  : "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40"
              }`}
              key={event.phase}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm">
                  {index + 1}. {event.phase}
                </strong>
                <span className="text-xs">{event.pass ? "一致" : "分叉"}</span>
              </div>
              <p className="mt-1 break-words text-xs text-slate-600 dark:text-slate-300">
                {event.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OfficialHttpTransactionLab({ model, mode }: Props) {
  if (mode === "message") return <MessageLab model={model} />;
  if (mode === "flow") return <FlowLab model={model} />;
  return <EvidenceLab model={model} />;
}
