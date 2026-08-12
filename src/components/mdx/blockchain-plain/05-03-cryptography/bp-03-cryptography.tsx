"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "min-h-11 rounded-control border border-border px-3 py-2 text-left text-sm text-secondary transition-colors hover:border-accent hover:text-primary";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
    >
      重置实验
    </button>
  );
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`${BUTTON_CLASS}${active ? " border-accent bg-accent/10 text-accent" : ""}`}
    >
      {children}
    </button>
  );
}

const HASH_INPUTS = [
  { label: "交易 A", detail: "alice → bob : 3", digest: "9f2a…c1" },
  { label: "交易 B", detail: "alice → bob : 4", digest: "4bd8…72" },
  { label: "区块字段", detail: "previous + root + nonce", digest: "a81e…09" },
] as const;

export function BpCryptographyHashLab() {
  const [input, setInput] = useState(0);
  const [mutated, setMutated] = useState(false);
  const active = HASH_INPUTS[input];

  function reset() {
    setInput(0);
    setMutated(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-cryptography-hash"
      aria-label={`哈希完整性实验：当前${active.label}，${mutated ? "输入已改变" : "输入未改变"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 3 · 哈希</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">改一个字段，摘要会告诉你哪里变了</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择输入并注入一个变化，观察摘要、链接和完整性结论如何联动。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择哈希输入</p>
          <div className="grid gap-2">
            {HASH_INPUTS.map((item, index) => (
              <ChoiceButton key={item.label} active={input === index} onClick={() => setInput(index)}>
                {item.label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={mutated} onClick={() => setMutated((value) => !value)}>
            {mutated ? "撤销字段变化" : "改变一个字段"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。摘要：{mutated ? "变化后的新摘要" : active.digest}。{mutated ? "完整性检查会发现差异，但哈希本身不证明谁写入。" : "先猜摘要是否仍然相同，再改变一个输入。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`哈希流程图：输入、哈希函数、摘要和链接；当前${active.label}；${mutated ? "摘要已变化" : "摘要稳定"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Input → Hash Function → Digest → Link</text>
          <rect x="38" y="88" width="172" height="124" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="124" y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">输入</text>
          <text x="124" y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.label}</text>
          <text x="124" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mutated ? "字段已改变" : active.detail}</text>
          <path d="M218 150 H286" stroke="var(--border)" strokeWidth="3" />
          <rect x="290" y="72" width="174" height="156" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="377" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">哈希函数</text>
          <text x="377" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">固定规则</text>
          <text x="377" y="172" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">单向 / 定长输出</text>
          <text x="377" y="202" textAnchor="middle" fontSize="12" fill="var(--accent)">不可逆 ≠ 保密</text>
          <path d="M472 150 H540" stroke="var(--border)" strokeWidth="3" />
          <rect x="544" y="88" width="178" height="124" rx="14" fill={mutated ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={mutated ? "var(--warning)" : "var(--success)"} strokeWidth="2" />
          <text x="633" y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">摘要</text>
          <text x="633" y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mutated ? "digest ≠ 原记录" : active.digest}</text>
          <text x="633" y="184" textAnchor="middle" fontSize="11" fill={mutated ? "var(--warning)" : "var(--success)"}>{mutated ? "完整性警报" : "可继续链接"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">区块把前块摘要放进新块，改动会沿链接暴露</text>
          <text x="380" y="296" textAnchor="middle" fontSize="11" fill={mutated ? "var(--warning)" : "var(--text-secondary)"}>{mutated ? "发现差异：转入签名与来源复核" : "当前输入的完整性摘要稳定"}</text>
        </svg>
      </div>
    </section>
  );
}

const KEY_OPERATIONS = {
  sign: { label: "签名授权", detail: "私钥签名，公钥验证", result: "可验证授权" },
  encrypt: { label: "加密传输", detail: "公钥加密，私钥解密", result: "保护机密" },
  leak: { label: "私钥泄露", detail: "攻击者获得签名能力", result: "授权边界失守" },
} as const;

type KeyOperation = keyof typeof KEY_OPERATIONS;

export function BpCryptographyKeyLab() {
  const [operation, setOperation] = useState<KeyOperation>("sign");
  const [tampered, setTampered] = useState(false);
  const active = KEY_OPERATIONS[operation];

  function reset() {
    setOperation("sign");
    setTampered(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-cryptography-keys"
      aria-label={`公私钥实验：当前${active.label}，${tampered ? "消息被改动" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 3 · 公私钥</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">签名、加密和密钥泄露是三种不同故事</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换操作，比较谁持有哪把钥匙，以及消息被修改后哪一层会拒绝。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择密钥操作</p>
          <div className="grid gap-2">
            {(Object.keys(KEY_OPERATIONS) as KeyOperation[]).map((value) => (
              <ChoiceButton key={value} active={operation === value} onClick={() => { setOperation(value); setTampered(false); }}>
                {KEY_OPERATIONS[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={tampered} onClick={() => setTampered((value) => !value)}>
            {tampered ? "撤销消息修改" : "修改已签名消息"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结果：{tampered && operation === "sign" ? "验签失败" : active.result}。{operation === "leak" ? "私钥泄露需要撤销、轮换和恢复流程。" : "不要把公开验证能力误当成私钥保密。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`公私钥流程图：发送者、消息、验证者；当前${active.label}；${tampered ? "消息被修改" : active.result}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Private Key ↔ Message ↔ Public Key</text>
          <circle cx="122" cy="146" r="58" fill={operation === "leak" ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={operation === "leak" ? "var(--warning)" : "var(--accent)"} strokeWidth="2" />
          <text x="122" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">私钥</text>
          <text x="122" y="166" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{operation === "leak" ? "已泄露" : "只由持有者控制"}</text>
          <path d="M184 146 H286" stroke="var(--border)" strokeWidth="3" />
          <rect x="290" y="82" width="174" height="132" rx="14" fill={tampered ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={tampered ? "var(--warning)" : "var(--success)"} strokeWidth="2" />
          <text x="377" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">消息</text>
          <text x="377" y="154" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{tampered ? "内容已改变" : "原始交易"}</text>
          <text x="377" y="182" textAnchor="middle" fontSize="11" fill={tampered ? "var(--warning)" : "var(--success)"}>{tampered ? "签名不再匹配" : "签名或密文"}</text>
          <path d="M472 146 H574" stroke="var(--border)" strokeWidth="3" />
          <circle cx="636" cy="146" r="58" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="636" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">公钥</text>
          <text x="636" y="166" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{operation === "encrypt" ? "用于加密" : "用于验证"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">签名证明授权，加密保护机密，二者都不替代业务规则</text>
          <text x="380" y="296" textAnchor="middle" fontSize="11" fill={tampered || operation === "leak" ? "var(--warning)" : "var(--text-secondary)"}>{tampered && operation === "sign" ? "验签失败：先保留原消息和签名" : operation === "leak" ? "风险：轮换身份并暂停继续签名" : active.result}</text>
        </svg>
      </div>
    </section>
  );
}

const ENCODINGS = {
  base64: { label: "Base64", detail: "二进制转文本", result: "可逆表示" },
  base58: { label: "Base58", detail: "去掉易混字符", result: "更适合人工抄录" },
  check: { label: "Base58Check", detail: "表示 + 校验和", result: "可发现多数抄录错误" },
} as const;

type Encoding = keyof typeof ENCODINGS;

export function BpCryptographyEncodingLab() {
  const [encoding, setEncoding] = useState<Encoding>("base64");
  const [typo, setTypo] = useState(false);
  const active = ENCODINGS[encoding];

  function reset() {
    setEncoding("base64");
    setTypo(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-cryptography-encoding"
      aria-label={`编码实验：当前${active.label}，${typo ? "字符被抄错" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 3 · 编码</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">把字节变成人能传递的文本</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择编码方式并制造抄录错误，观察表示、校验和与保密性之间的边界。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择编码方式</p>
          <div className="grid gap-2">
            {(Object.keys(ENCODINGS) as Encoding[]).map((value) => (
              <ChoiceButton key={value} active={encoding === value} onClick={() => { setEncoding(value); setTypo(false); }}>
                {ENCODINGS[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={typo} onClick={() => setTypo((value) => !value)}>
            {typo ? "撤销字符错误" : "模拟一个字符错误"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。{typo && encoding === "check" ? "校验和报告错误。" : typo ? "没有校验和时，接收者无法仅凭编码发现错误。" : active.result + "，但不是加密。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`编码流程图：字节、编码文本、校验；当前${active.label}；${typo ? "存在字符错误" : active.result}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Bytes → Text Representation → Check</text>
          <rect x="38" y="88" width="184" height="124" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="130" y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">字节</text>
          <text x="130" y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原始二进制</text>
          <text x="130" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">不适合直接抄录</text>
          <path d="M230 150 H292" stroke="var(--border)" strokeWidth="3" />
          <rect x="296" y="72" width="168" height="156" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="380" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="380" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.detail}</text>
          <text x="380" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{typo ? "文本有一处变化" : "文本可往返解码"}</text>
          <text x="380" y="202" textAnchor="middle" fontSize="12" fill="var(--accent)">可逆表示 ≠ 保密</text>
          <path d="M472 150 H534" stroke="var(--border)" strokeWidth="3" />
          <rect x="538" y="88" width="184" height="124" rx="14" fill={encoding === "check" && typo ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={encoding === "check" && typo ? "var(--warning)" : "var(--success)"} strokeWidth="2" />
          <text x="630" y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">接收检查</text>
          <text x="630" y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{encoding === "check" ? "校验和" : "只做解码"}</text>
          <text x="630" y="184" textAnchor="middle" fontSize="11" fill={encoding === "check" && typo ? "var(--warning)" : "var(--success)"}>{encoding === "check" && typo ? "发现错误" : "未发现异常"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">编码服务于传递，校验和服务于发现错误，保密需要加密</text>
          <text x="380" y="296" textAnchor="middle" fontSize="11" fill={encoding === "check" && typo ? "var(--warning)" : "var(--text-secondary)"}>{encoding === "check" && typo ? "停机：重新获取原始文本" : active.result}</text>
        </svg>
      </div>
    </section>
  );
}
