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
      className={BUTTON_CLASS + (active ? " border-accent bg-accent/10 text-accent" : "")}
    >
      {children}
    </button>
  );
}

const VALIDATION_STAGES = [
  { label: "交易", detail: "引用与签名" },
  { label: "UTXO", detail: "未花费输出" },
  { label: "区块", detail: "Merkle Root" },
  { label: "链", detail: "累计工作量" },
] as const;

export function BdpAppendixABlockLab() {
  const [stage, setStage] = useState(0);
  const [fault, setFault] = useState(false);
  const active = VALIDATION_STAGES[stage];

  function reset() {
    setStage(0);
    setFault(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-appendix-a-validation-pipeline"
      aria-label={`比特币验证管线：当前阶段${active.label}，${fault ? "已注入验证错误" : "未注入错误"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Appendix A · 验证管线</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">一笔交易怎样进入规范链</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">逐步推进交易、UTXO、区块和链选择，观察每层拒绝条件。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择验证阶段</p>
          <div className="grid gap-2">
            {VALIDATION_STAGES.map((item, index) => (
              <ChoiceButton key={item.label} active={stage === index} onClick={() => setStage(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={fault} onClick={() => setFault((value) => !value)}>注入验证错误</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前阶段：{active.label}，需要检查{active.detail}。{fault ? "错误已注入，保留首个拒绝原因并停止。" : "先预测下一层输入，再推进验证。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`比特币验证图：交易、UTXO、区块、链；当前${active.label}；${fault ? "验证错误已注入" : "验证正常"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Transaction → UTXO → Block → Chain</text>
          {VALIDATION_STAGES.map((item, index) => {
            const reached = stage >= index;
            const color = fault && index >= 1 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 26 + index * 184;
            return (
              <g key={item.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{fault && index >= 1 ? "STOP" : reached ? "已验证" : "待验证"}</text>
                {index < VALIDATION_STAGES.length - 1 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">每一层只接受上一层的可验证输出，失败不应改变前状态</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={fault ? "var(--warning)" : "var(--text-secondary)"}>{fault ? "验证停止：保存错误对象、输入和首个差异" : `当前阶段：${active.label} · ${active.detail}`}</text>
        </svg>
      </div>
    </section>
  );
}

const NODE_PROFILES = {
  regtest: { label: "隔离回归网", network: "独立数据目录 + 人工出块", result: "适合重放验证" },
  testnet: { label: "公开测试网", network: "共享节点 + 测试币", result: "适合观察真实传播" },
  mismatch: { label: "错误网络", network: "网络标识与预期不符", result: "拒绝启动结论" },
} as const;

type NodeProfile = keyof typeof NODE_PROFILES;

export function BdpAppendixANodeLab() {
  const [profile, setProfile] = useState<NodeProfile>("regtest");
  const [verified, setVerified] = useState(false);
  const active = NODE_PROFILES[profile];

  function reset() {
    setProfile("regtest");
    setVerified(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-appendix-a-node-profile"
      aria-label={`节点运行档案：${active.label}，${active.network}，${verified ? "已核对" : "未核对"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Appendix A · 节点档案</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">启动成功不等于连对网络</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换节点 profile，核对数据目录、网络标识、RPC 与链头。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择节点环境</p>
          <div className="grid gap-2">
            {(Object.keys(NODE_PROFILES) as NodeProfile[]).map((value) => (
              <ChoiceButton
                key={value}
                active={profile === value}
                onClick={() => {
                  setProfile(value);
                  setVerified(false);
                }}
              >
                {NODE_PROFILES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>
            {verified ? "撤销档案核对" : "核对节点档案"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.network}。{verified ? active.result + "；继续保存版本、创世块和链头。" : "先比较网络标识和数据目录，再相信 RPC 返回。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`节点档案图：进程、数据目录、RPC、链头；当前${active.label}；${verified ? "档案已核对" : "档案待核对"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Process → Data Directory → RPC → Chain Tip</text>
          {[
            { label: "进程", detail: "版本" },
            { label: "数据目录", detail: "隔离" },
            { label: "RPC", detail: active.network.split(" + ")[0] },
            { label: "链头", detail: "创世块 + 高度" },
          ].map((node, index) => {
            const valid = verified && profile !== "mismatch";
            const color = profile === "mismatch" && index > 0 ? "var(--warning)" : valid ? "var(--success)" : "var(--accent)";
            const x = 28 + index * 184;
            return (
              <g key={node.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{profile === "mismatch" && index > 0 ? "需停止" : valid ? "已核对" : "待核对"}</text>
                {index < 3 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">数据目录、创世块、网络标识和链头共同定义实验环境</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={profile === "mismatch" ? "var(--warning)" : verified ? "var(--success)" : "var(--text-secondary)"}>{profile === "mismatch" ? "错误网络：不接受余额、地址或高度结论" : verified ? "节点档案可重放" : "节点档案待核对"}</text>
        </svg>
      </div>
    </section>
  );
}

const UTXO_SAMPLES = {
  valid: { label: "合法转账", input: "1.50 BTC", output: "1.40 BTC", fee: "0.10 BTC", result: "接受" },
  boundary: { label: "恰好支付", input: "1.50 BTC", output: "1.50 BTC", fee: "0 BTC", result: "按规则接受" },
  invalid: { label: "超额输出", input: "1.50 BTC", output: "1.60 BTC", fee: "0.10 BTC", result: "拒绝并保持原状态" },
} as const;

type UTXOSample = keyof typeof UTXO_SAMPLES;

export function BdpAppendixAUTXOLab() {
  const [sample, setSample] = useState<UTXOSample>("valid");
  const [signature, setSignature] = useState(true);
  const [duplicate, setDuplicate] = useState(false);
  const active = UTXO_SAMPLES[sample];
  const accepted = sample !== "invalid" && signature && !duplicate;

  function reset() {
    setSample("valid");
    setSignature(true);
    setDuplicate(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-appendix-a-utxo-conservation"
      aria-label={`UTXO 守恒实验：${active.label}，输入${active.input}，输出${active.output}，${accepted ? "接受" : "拒绝"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Appendix A · UTXO 守恒</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">余额来自输入输出差额</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择金额样本，再切换签名或重复引用，观察验证结果。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择交易样本</p>
          <div className="grid gap-2">
            {(Object.keys(UTXO_SAMPLES) as UTXOSample[]).map((value) => (
              <ChoiceButton
                key={value}
                active={sample === value}
                onClick={() => {
                  setSample(value);
                  setDuplicate(false);
                }}
              >
                {UTXO_SAMPLES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceButton active={signature} onClick={() => setSignature((value) => !value)}>{signature ? "撤销签名" : "补上签名"}</ChoiceButton>
            <ChoiceButton active={duplicate} onClick={() => setDuplicate((value) => !value)}>重复输入引用</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            输入 {active.input}，输出 {active.output}，手续费 {active.fee}。{accepted ? active.result + "，状态可以转移。" : "拒绝，保存签名、引用或价值守恒的首个失败原因。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`UTXO 守恒图：输入、签名验证、输出、手续费；当前${active.label}，${accepted ? "交易可接受" : "交易被拒绝"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Inputs → Signatures → Outputs + Fee</text>
          {[
            { label: "输入", detail: active.input },
            { label: "签名", detail: signature ? "齐全" : "缺失" },
            { label: "输出", detail: active.output },
            { label: "手续费", detail: active.fee },
          ].map((node, index) => {
            const color = !signature || duplicate || sample === "invalid" ? "var(--warning)" : accepted ? "var(--success)" : "var(--accent)";
            const x = 28 + index * 184;
            return (
              <g key={node.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{accepted ? "通过" : "检查"}</text>
                {index < 3 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">输入价值必须覆盖输出与手续费；找零是显式输出，不是隐藏余额字段</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={accepted ? "var(--success)" : "var(--warning)"}>{accepted ? "守恒通过：可以生成新的未花费输出" : "守恒失败：原 UTXO 集合保持不变"}</text>
        </svg>
      </div>
    </section>
  );
}
