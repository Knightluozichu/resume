"use client";

import { useState } from "react";

type LensId = "threat" | "envelope" | "asymmetric";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "Overview; Windows Data Protection; Hashing; Hashing Passwords; Symmetric Encryption; Key Management; Public-Key Encryption and Signing";

const LENSES: readonly Lens[] = [
  {
    id: "threat",
    label: "Threat / primitive",
    question: "攻击者能力与安全目标分别要求 hash、HMAC、KDF 还是 AEAD？",
    evidence: "threat contract + asset/goal matrix + parameter policy + offline guessing and replay tests",
    accent: "var(--accent)",
    concepts: ["Overview", "Hashing", "Hashing Passwords"],
  },
  {
    id: "envelope",
    label: "Envelope / lifecycle",
    question: "密钥、nonce、AAD 与版本怎样组成可轮换且可恢复的加密信封？",
    evidence: "key id/version + wrapped DEK + nonce ledger + AAD schema + rotation/recovery rehearsal",
    accent: "var(--warning)",
    concepts: ["Windows Data Protection", "Symmetric Encryption", "Key Management"],
  },
  {
    id: "asymmetric",
    label: "Public key / proof",
    question: "公钥加密与签名如何证明来源，并在篡改、重放和换 key 时 fail closed？",
    evidence: "trusted key registry + canonical bytes + domain/expiry + tamper/wrong-key/algorithm matrix",
    accent: "var(--success)",
    concepts: ["Public-Key Encryption and Signing", "Symmetric Encryption", "Key Management"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10CryptographyEnvelopeMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("threat");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Cryptography 协议图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先绑定 Threat，再验证信封生命周期</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 threat/primitive、envelope/lifecycle 或 public key/proof 视角，观察每个密码学概念需要留下的验收证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Cryptography 协议图"
          onClick={() => setActiveId("threat")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Cryptography 验收视角" className="grid gap-2 md:grid-cols-3">
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
          aria-label={`Cryptography envelope map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Cryptography envelope map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            threat → primitive → envelope → verified result
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            goal、key、nonce、AAD、tag、version 与 recovery
          </text>

          {["attacker / asset", "approved primitive", "versioned envelope", "fail-closed result"].map((stage, index) => {
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

          <path d="M20 332 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="357" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="380" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="404" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="432" width="520" height="154" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="458" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Cryptography protocol gate
          </text>
          <text x="40" y="481" fill="var(--text-secondary)" fontSize="11">
            goal：先写 confidentiality、integrity、authenticity、guessing 与 replay，再选择 primitive。
          </text>
          <text x="40" y="503" fill="var(--text-secondary)" fontSize="11">
            envelope：固定 version、algorithm、key id、nonce、AAD、ciphertext、tag 与长度上限。
          </text>
          <text x="40" y="525" fill="var(--text-secondary)" fontSize="11">
            lifecycle：active writer、旧版 reader、rotation、backup、recovery 和 revoke 都要演练。
          </text>
          <text x="40" y="547" fill="var(--text-secondary)" fontSize="11">
            proof：先做 allowlist、canonical bytes、trusted key 与 expiry 检查，再解析或使用 plaintext。
          </text>
          <text x="280" y="625" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            算法提供能力，协议与生命周期决定它是否安全可运营
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 20-1：Cryptography 的协议证据路径；从 threat contract 走到可轮换、可恢复且 fail-closed 的结果。
      </figcaption>
    </figure>
  );
}
