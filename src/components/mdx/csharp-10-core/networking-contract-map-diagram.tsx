"use client";

import { useState } from "react";

type LensId = "identity" | "lifecycle" | "protocol";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "Network Architecture; Addresses and Ports; URIs; HttpClient; Writing an HTTP Server; Using DNS; Sending Mail with SmtpClient; Using TCP";

const LENSES: readonly Lens[] = [
  {
    id: "identity",
    label: "Endpoint identity",
    question: "URI、name、resolved address、port 与 TLS name 是否仍指向同一意图？",
    evidence: "normalized URI + DNS answers + selected endpoint + TLS hostname + redirect trace",
    accent: "var(--accent)",
    concepts: ["Network Architecture", "Addresses and Ports", "URIs", "Using DNS"],
  },
  {
    id: "lifecycle",
    label: "Connection lifecycle",
    question: "谁拥有 handler、request、response body 与 shutdown deadline？",
    evidence: "pool/lifetime + phase timeout + cancellation + dispose + server load-shed trace",
    accent: "var(--warning)",
    concepts: ["HttpClient", "Writing an HTTP Server", "Sending Mail with SmtpClient"],
  },
  {
    id: "protocol",
    label: "Framing / retry",
    question: "partial bytes、message boundary 与副作用提交状态能否决定安全动作？",
    evidence: "length/delimiter limits + fragmented I/O + attempt ledger + idempotency result",
    accent: "var(--success)",
    concepts: ["HttpClient", "Sending Mail with SmtpClient", "Using TCP", "Writing an HTTP Server"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10NetworkingContractMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("identity");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Networking 契约图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先确认 identity，再处理 bytes 与副作用</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 endpoint identity、connection lifecycle 或 framing/retry 视角，追踪网络请求从名字到结果的证据链。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Networking 契约图"
          onClick={() => setActiveId("identity")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Networking 验收视角" className="grid gap-2 md:grid-cols-3">
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
          viewBox="0 0 560 720"
          role="img"
          aria-label={`Networking contract map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Networking contract map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            name → endpoint → connection → framed result
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            DNS、TLS、HTTP/TCP、deadline、partial transfer 与 retry safety
          </text>

          {["logical URI", "resolved endpoint", "protocol bytes", "business result"].map((stage, index) => {
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
                  stroke={index === 1 ? activeLens.accent : "var(--border)"}
                  strokeWidth={index === 1 ? "1.8" : "1"}
                />
                <text x={x + 56} y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600">
                  {stage}
                </text>
                {index < 3 && <path d={`M${x + 116} 85 H${x + 130}`} stroke="var(--text-secondary)" strokeWidth="1.5" />}
              </g>
            );
          })}

          {CONCEPTS.map((concept, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 20 : 290;
            const y = 126 + row * 53;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="250"
                  height="42"
                  rx="9"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 17} cy={y + 21} r="5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 31} y={y + 26} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 385 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="410" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="433" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="457" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="485" width="520" height="138" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="511" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Network boundary gate
          </text>
          <text x="40" y="534" fill="var(--text-secondary)" fontSize="11">
            identity：记录 normalized URI、DNS answers、selected address、TLS name 与 redirect 变化。
          </text>
          <text x="40" y="556" fill="var(--text-secondary)" fontSize="11">
            lifecycle：复用 handler/pool，分别限制 connect、headers、body、idle 与 overall deadline。
          </text>
          <text x="40" y="578" fill="var(--text-secondary)" fontSize="11">
            protocol：TCP 只给 ordered bytes；用 length/delimiter framing、上限、partial read 与 EOF 规则。
          </text>
          <text x="40" y="600" fill="var(--text-secondary)" fontSize="11">
            retry：只有幂等或有业务 key 且提交状态可判断时，才按有限 attempt 重试并记录结果。
          </text>
          <text x="280" y="664" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            分层 identity、生命周期与消息契约，才能让网络故障可解释、可恢复
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 16-1：Networking 的契约验收路径；名字、连接、字节和业务副作用必须分别定义边界。
      </figcaption>
    </figure>
  );
}
