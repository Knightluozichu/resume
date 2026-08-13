"use client";

import { useState } from "react";

type LensId = "stream" | "message" | "identity";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "第7章 网络编程; 7.1 构建TCP服务; 7.1.1 TCP; 7.1.2 创建TCP服务器端; 7.1.3 TCP服务的事件; 7.2 构建UDP服务; 7.2.1 创建UDP套接字; 7.2.2 创建UDP服务器端; 7.2.3 创建UDP客户端; 7.2.4 UDP套接字事件; 7.3 构建HTTP服务; 7.3.1 HTTP; 7.3.2 HTTP模块; 7.3.3 HTTP客户端; 7.4 构建WebSocket服务; 7.4.1 WebSocket握手; 7.4.2 WebSocket数据传输; 7.4.3 小结; 7.5 网络服务与安全; 7.5.1 TLS/SSL; 7.5.2 TLS服务; 7.5.3 HTTPS服务; 7.6 总结; 7.7 参考资源";

const LENSES: readonly Lens[] = [
  {
    id: "stream",
    label: "Transport / owner",
    question: "字节流、数据报和连接资源分别由谁创建、限制和关闭？",
    evidence: "socket state + input limit + timeout owner + close/error ordering + resource count",
    accent: "var(--accent)",
    concepts: [
      "第7章 网络编程",
      "7.1 构建TCP服务",
      "7.1.1 TCP",
      "7.1.2 创建TCP服务器端",
      "7.1.3 TCP服务的事件",
      "7.2 构建UDP服务",
      "7.2.1 创建UDP套接字",
      "7.2.2 创建UDP服务器端",
    ],
  },
  {
    id: "message",
    label: "Message / flow",
    question: "请求、frame、body 与背压如何保证边界、顺序和唯一完成？",
    evidence: "framing state + body budget + idempotency key + queue depth + abort/retry matrix",
    accent: "var(--warning)",
    concepts: [
      "7.2.3 创建UDP客户端",
      "7.2.4 UDP套接字事件",
      "7.3 构建HTTP服务",
      "7.3.1 HTTP",
      "7.3.2 HTTP模块",
      "7.3.3 HTTP客户端",
      "7.4 构建WebSocket服务",
      "7.4.1 WebSocket握手",
    ],
  },
  {
    id: "identity",
    label: "TLS / lifecycle",
    question: "握手身份、消息传输和 graceful shutdown 如何一起 fail closed？",
    evidence: "CA + hostname + expiry + frame policy + close code + drain/recovery replay",
    accent: "var(--success)",
    concepts: [
      "7.4.2 WebSocket数据传输",
      "7.4.3 小结",
      "7.5 网络服务与安全",
      "7.5.1 TLS/SSL",
      "7.5.2 TLS服务",
      "7.5.3 HTTPS服务",
      "7.6 总结",
      "7.7 参考资源",
    ],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function DnjNetworkProtocolMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("stream");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Network Programming 验收图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从 transport 走到可关闭的 identity</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 transport/owner、message/flow 或 TLS/lifecycle 视角，观察目录节点如何落到边界、背压、身份和关闭证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Network Programming 验收图"
          onClick={() => setActiveId("stream")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Network Programming 验收视角" className="grid gap-2 md:grid-cols-3">
          {LENSES.map((lens) => {
            const selected = lens.id === activeId;
            return (
              <button
                key={lens.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => setActiveId(lens.id)}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {lens.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <svg
          viewBox="0 0 560 820"
          role="img"
          aria-label={`Network Programming protocol map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Network Programming protocol map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            input → framing → protocol → close
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            bytes、datagram、request、frame、identity 与 owner
          </text>

          {["raw input", "bounded message", "verified identity", "drained resource"].map((stage, index) => {
            const x = 20 + index * 136;
            return (
              <g key={stage}>
                <rect
                  x={x}
                  y="68"
                  width="112"
                  height="34"
                  rx="9"
                  fill="var(--bg)"
                  stroke={index === 2 ? activeLens.accent : "var(--border)"}
                  strokeWidth={index === 2 ? "1.8" : "1"}
                />
                <text x={x + 56} y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600">
                  {stage}
                </text>
                {index < 3 && <path d={`M${x + 116} 85 H${x + 130}`} stroke="var(--text-secondary)" strokeWidth="1.5" />}
              </g>
            );
          })}

          {CONCEPTS.map((concept, index) => {
            const column = index % 3;
            const row = Math.floor(index / 3);
            const x = 20 + column * 176;
            const y = 126 + row * 48;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="168"
                  height="38"
                  rx="8"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 13} cy={y + 19} r="4.5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 24} y={y + 24} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 530 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="555" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="578" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="602" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="630" width="520" height="126" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="656" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Network boundary gate
          </text>
          <text x="40" y="679" fill="var(--text-secondary)" fontSize="11">
            framing：明确长度、分隔符、最大值与残留 bytes，data 事件不等于 message 完成。
          </text>
          <text x="40" y="701" fill="var(--text-secondary)" fontSize="11">
            flow：慢 consumer 触发 backpressure；retry 带 idempotency，abort 共享同一 deadline。
          </text>
          <text x="40" y="723" fill="var(--text-secondary)" fontSize="11">
            identity：校验 CA、hostname、expiry、Origin 和协议版本，再进入业务处理。
          </text>
          <text x="280" y="790" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            打开连接只是开始，排空 owner 才是完成
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 7-1：网络编程的验收路径；把 framing、背压、TLS identity 和资源关闭放进同一张可重放的状态图。
      </figcaption>
    </figure>
  );
}
