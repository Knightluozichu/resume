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

const LEDGER_STAGES = [
  { label: "构造", detail: "输入、输出、签名" },
  { label: "验证", detail: "所有权与规则" },
  { label: "传播", detail: "节点交换候选" },
  { label: "提交", detail: "区块进入规范链" },
] as const;

export function BpFirstBlockchainLedgerFlowLab() {
  const [stage, setStage] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const active = LEDGER_STAGES[stage];

  function reset() {
    setStage(0);
    setInvalid(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-first-blockchain-ledger-flow"
      aria-label={`共同账本流程实验：当前${active.label}，${invalid ? "交易无效" : "交易有效"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 1 · 共同账本</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从一笔交易走到共同状态</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">逐阶段推进候选交易，观察“传播”为什么不能直接等于“提交”。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择流程位置</p>
          <div className="grid gap-2">
            {LEDGER_STAGES.map((item, index) => (
              <ChoiceButton key={item.label} active={stage === index} onClick={() => setStage(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={invalid} onClick={() => setInvalid((value) => !value)}>
            注入签名错误
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.label}（{active.detail}）。{invalid ? "验证门会拒绝候选，传播不会把它变成有效状态。" : "候选仍须经过规则验证，最后才可能进入规范链。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`共同账本流程图：构造、验证、传播、提交；当前${active.label}；${invalid ? "签名错误将被拒绝" : "交易通过当前检查"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Construct → Verify → Relay → Commit</text>
          {LEDGER_STAGES.map((item, index) => {
            const reached = stage >= index;
            const blocked = invalid && index >= 1;
            const color = blocked ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 188;
            return (
              <g key={item.label}>
                <rect x={x} y="82" width="150" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 75} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 75} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.detail}</text>
                <text x={x + 75} y="178" textAnchor="middle" fontSize="11" fill={color}>{blocked ? "拒绝" : reached ? "已通过" : "待处理"}</text>
                {index < LEDGER_STAGES.length - 1 ? <path d={`M${x + 156} 148 H${x + 180}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">广播只搬运候选数据，验证与提交才改变共同状态</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={invalid ? "var(--warning)" : "var(--text-secondary)"}>{invalid ? "停在验证门：错误证据不能继续传播" : `当前阶段：${active.label}`}</text>
        </svg>
      </div>
    </section>
  );
}

const UTXO_CASES = {
  valid: { label: "正常找零", detail: "输入 7 + 4，输出 8 + 3", result: "接受" },
  duplicate: { label: "重复输入", detail: "同一输入被引用两次", result: "拒绝" },
  unsigned: { label: "签名错误", detail: "授权与输入所有者不匹配", result: "拒绝" },
} as const;

type UtxoCase = keyof typeof UTXO_CASES;

export function BpFirstBlockchainUtxoLab() {
  const [caseName, setCaseName] = useState<UtxoCase>("valid");
  const active = UTXO_CASES[caseName];

  function reset() {
    setCaseName("valid");
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-first-blockchain-utxo"
      aria-label={`UTXO 验证实验：${active.label}，结果${active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 1 · 交易验证</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">输入、授权和找零必须同时成立</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换三个样本，比较同一套规则如何区分合法交易与拒绝原因。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择交易样本</p>
          <div className="grid gap-2">
            {(Object.keys(UTXO_CASES) as UtxoCase[]).map((value) => (
              <ChoiceButton key={value} active={caseName === value} onClick={() => setCaseName(value)}>
                {UTXO_CASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。节点判定：{active.result}。把“签名正确”与“输入未消费、价值守恒”分开检查。
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`UTXO 验证图：输入、规则门、输出；当前样本${active.label}，判定${active.result}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Inputs → Rule Gate → Outputs</text>
          <rect x="38" y="86" width="184" height="128" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="130" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">输入</text>
          <text x="130" y="154" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{caseName === "valid" ? "7 + 4 未消费" : caseName === "duplicate" ? "同一引用 × 2" : "授权不匹配"}</text>
          <text x="130" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">引用 + 所有者证据</text>
          <path d="M230 150 H292" stroke="var(--border)" strokeWidth="3" />
          <rect x="296" y="70" width="168" height="160" rx="14" fill={active.result === "接受" ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={active.result === "接受" ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="380" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">规则门</text>
          <text x="380" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">签名 / 唯一引用</text>
          <text x="380" y="166" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输入未消费 / 价值守恒</text>
          <text x="380" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill={active.result === "接受" ? "var(--success)" : "var(--warning)"}>{active.result}</text>
          <path d="M472 150 H534" stroke="var(--border)" strokeWidth="3" />
          <rect x="538" y="86" width="184" height="128" rx="14" fill={active.result === "接受" ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={active.result === "接受" ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="630" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">输出</text>
          <text x="630" y="154" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.result === "接受" ? "8 支付 + 3 找零" : "不产生新状态"}</text>
          <text x="630" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.result === "接受" ? "新的未消费对象" : "保留拒绝证据"}</text>
          <text x="380" y="274" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">状态转移不是余额相减：每个输入都要被唯一、授权地消费</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={active.result === "接受" ? "var(--success)" : "var(--warning)"}>{active.result === "接受" ? "可进入候选区块" : `拒绝原因：${active.label}`}</text>
        </svg>
      </div>
    </section>
  );
}

const CONSENSUS_STAGES = [
  { label: "传播", detail: "节点交换候选区块" },
  { label: "比较", detail: "验证规则与累计工作" },
  { label: "确认", detail: "选择规范历史" },
] as const;

export function BpFirstBlockchainConsensusLab() {
  const [stage, setStage] = useState(0);
  const [fork, setFork] = useState(false);
  const active = CONSENSUS_STAGES[stage];

  function reset() {
    setStage(0);
    setFork(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-first-blockchain-consensus"
      aria-label={`共识选择实验：当前${active.label}，${fork ? "存在临时分叉" : "历史一致"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 1 · 顺序与确认</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">看到两个候选，不等于看到两个最终历史</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换共识阶段并制造临时分叉，观察节点何时能说出规范链。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择共识阶段</p>
          <div className="grid gap-2">
            {CONSENSUS_STAGES.map((item, index) => (
              <ChoiceButton key={item.label} active={stage === index} onClick={() => setStage(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={fork} onClick={() => setFork((value) => !value)}>
            {fork ? "撤销临时分叉" : "制造临时分叉"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{fork ? "分叉暴露了排序问题；先验证规则，再等待选择结果。" : "单一候选不代表永久性，确认要依赖规范历史和后续深度。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`共识流程图：传播、比较、确认；当前${active.label}；${fork ? "临时分叉待选择" : "候选历史单一"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Relay → Compare → Confirm</text>
          <path d="M92 144 H668" stroke="var(--border)" strokeWidth="3" />
          {CONSENSUS_STAGES.map((item, index) => {
            const reached = stage >= index;
            const color = fork && index >= 1 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 116 + index * 264;
            return (
              <g key={item.label}>
                <circle cx={x} cy="144" r="54" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x} y="139" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x} y="164" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{reached ? "已观察" : "待观察"}</text>
                <text x={x} y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.detail}</text>
              </g>
            );
          })}
          {fork ? <path d="M380 144 C430 82 496 82 548 144" fill="none" stroke="var(--warning)" strokeWidth="2" strokeDasharray="6 4" /> : null}
          {fork ? <text x="464" y="78" textAnchor="middle" fontSize="11" fill="var(--warning)">候选 A / 候选 B</text> : null}
          <text x="380" y="274" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">共识解决的是“哪个可验证历史成为共同参考”，不是让错误交易变正确</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={fork ? "var(--warning)" : "var(--text-secondary)"}>{fork ? "等待比较与选择：暂时不要宣称最终确认" : `当前阶段：${active.label}`}</text>
        </svg>
      </div>
    </section>
  );
}
