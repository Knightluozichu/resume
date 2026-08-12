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

const APPLICATION_STAGES = [
  { label: "价值", detail: "账户、余额、资产" },
  { label: "规则", detail: "代码、权限、回滚" },
  { label: "结算", detail: "净额、交割、追索" },
  { label: "事实", detail: "来源、预言机、审计" },
] as const;

export function BpApplicationTrackLab() {
  const [stage, setStage] = useState(0);
  const [mismatch, setMismatch] = useState(false);
  const active = APPLICATION_STAGES[stage];

  function reset() {
    setStage(0);
    setMismatch(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-application-track"
      aria-label={`区块链应用路径实验：当前${active.label}，${mismatch ? "链外证据不匹配" : "边界清晰"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 2 · 应用路径</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">一条业务链不只是一笔上链交易</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">沿价值、规则、结算和事实四层推进，观察哪一层需要链外信任。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择应用层</p>
          <div className="grid gap-2">
            {APPLICATION_STAGES.map((item, index) => (
              <ChoiceButton key={item.label} active={stage === index} onClick={() => setStage(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={mismatch} onClick={() => setMismatch((value) => !value)}>
            注入链外事实不匹配
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.label}（{active.detail}）。{mismatch ? "链上摘要仍可验证，但业务事实需要重新审计。" : "先区分链上状态，再声明链外事实的信任假设。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`区块链应用路径图：价值、规则、结算、事实；当前${active.label}；${mismatch ? "链外证据不匹配" : "边界清晰"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Value → Rules → Settlement → Facts</text>
          {APPLICATION_STAGES.map((item, index) => {
            const reached = stage >= index;
            const blocked = mismatch && index === 3;
            const color = blocked ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 188;
            return (
              <g key={item.label}>
                <rect x={x} y="82" width="150" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 75} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 75} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.detail}</text>
                <text x={x + 75} y="178" textAnchor="middle" fontSize="11" fill={color}>{blocked ? "复核" : reached ? "已定位" : "待定位"}</text>
                {index < APPLICATION_STAGES.length - 1 ? <path d={`M${x + 156} 148 H${x + 180}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">上链能固定状态和证据指纹，不能自动创造现实履约</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={mismatch ? "var(--warning)" : "var(--text-secondary)"}>{mismatch ? "停在事实层：保留摘要，启动审计和争议流程" : `当前层：${active.label}`}</text>
        </svg>
      </div>
    </section>
  );
}

const CONTRACT_CASES = {
  deterministic: { label: "确定性执行", detail: "同一前状态 + 输入", result: "得到同一后状态" },
  gas: { label: "资源耗尽", detail: "执行超过资源上限", result: "原子回滚" },
  permission: { label: "权限失败", detail: "调用者不满足条件", result: "拒绝变更" },
} as const;

type ContractCase = keyof typeof CONTRACT_CASES;

export function BpApplicationContractLab() {
  const [caseName, setCaseName] = useState<ContractCase>("deterministic");
  const active = CONTRACT_CASES[caseName];

  function reset() {
    setCaseName("deterministic");
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-application-contract"
      aria-label={`智能合约执行实验：${active.label}，${active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 2 · 智能合约</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">代码能确定执行，不等于业务天然可信</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换正常、资源耗尽和权限失败，比较调用前后状态与回滚证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择执行样本</p>
          <div className="grid gap-2">
            {(Object.keys(CONTRACT_CASES) as ContractCase[]).map((value) => (
              <ChoiceButton key={value} active={caseName === value} onClick={() => setCaseName(value)}>
                {CONTRACT_CASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。执行结果：{active.result}。把代码结果和权限、价格、身份等外部假设分开记录。
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`智能合约执行图：输入、确定性代码、状态结果；当前${active.label}，结果${active.result}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Before State → Code → After State</text>
          <rect x="38" y="86" width="184" height="128" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="130" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">输入</text>
          <text x="130" y="154" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">前状态 + 调用者</text>
          <text x="130" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">参数 + 资源预算</text>
          <path d="M230 150 H292" stroke="var(--border)" strokeWidth="3" />
          <rect x="296" y="70" width="168" height="160" rx="14" fill={caseName === "deterministic" ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={caseName === "deterministic" ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="380" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">代码</text>
          <text x="380" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">权限 / 资源 / 逻辑</text>
          <text x="380" y="166" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同输入应同结果</text>
          <text x="380" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill={caseName === "deterministic" ? "var(--success)" : "var(--warning)"}>{active.result}</text>
          <path d="M472 150 H534" stroke="var(--border)" strokeWidth="3" />
          <rect x="538" y="86" width="184" height="128" rx="14" fill={caseName === "deterministic" ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={caseName === "deterministic" ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="630" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">结果</text>
          <text x="630" y="154" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{caseName === "deterministic" ? "后状态可重放" : "前状态保持不变"}</text>
          <text x="630" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{caseName === "permission" ? "拒绝原因可审计" : "事件与回执可保留"}</text>
          <text x="380" y="274" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">确定性是执行合同，现实输入和治理仍需要额外信任证据</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={caseName === "deterministic" ? "var(--success)" : "var(--warning)"}>{active.result}</text>
        </svg>
      </div>
    </section>
  );
}

const FACT_CASES = {
  digest: { label: "内容摘要", detail: "文件与摘要一致", needed: "保存内容哈希与来源" },
  sensor: { label: "传感器读数", detail: "设备报告温度", needed: "校准、身份与审计" },
  delivery: { label: "实物交付", detail: "货物抵达仓库", needed: "交接、责任与争议" },
} as const;

type FactCase = keyof typeof FACT_CASES;

export function BpApplicationBoundaryLab() {
  const [caseName, setCaseName] = useState<FactCase>("digest");
  const [attested, setAttested] = useState(false);
  const active = FACT_CASES[caseName];

  function reset() {
    setCaseName("digest");
    setAttested(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-application-boundary"
      aria-label={`链上链外边界实验：${active.label}，${attested ? "证据已补齐" : "仍需外部证据"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 2 · 现实履约</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">摘要一致不等于事实真实</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择一个链外事实，再补齐对应的身份、来源和争议证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择业务事实</p>
          <div className="grid gap-2">
            {(Object.keys(FACT_CASES) as FactCase[]).map((value) => (
              <ChoiceButton key={value} active={caseName === value} onClick={() => { setCaseName(value); setAttested(false); }}>
                {FACT_CASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={attested} onClick={() => setAttested((value) => !value)}>
            {attested ? "撤销外部证据" : "补齐外部证据"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。需要：{active.needed}。{attested ? "证据已挂接，仍需保留原始材料和争议路径。" : "先不要把摘要写成真实性证明。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`链上链外边界图：业务事实、摘要、外部证据；当前${active.label}；${attested ? "证据已补齐" : "证据缺失"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Reality → Evidence → On-chain Digest</text>
          <rect x="38" y="86" width="184" height="128" rx="14" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="2" />
          <text x="130" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">事实</text>
          <text x="130" y="154" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.label}</text>
          <text x="130" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.detail}</text>
          <path d="M230 150 H292" stroke="var(--border)" strokeWidth="3" />
          <rect x="296" y="70" width="168" height="160" rx="14" fill={attested ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={attested ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="380" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">证据</text>
          <text x="380" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">身份 / 来源 / 审计</text>
          <text x="380" y="166" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">交接 / 争议 / 回退</text>
          <text x="380" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill={attested ? "var(--success)" : "var(--warning)"}>{attested ? "已补齐" : "待补齐"}</text>
          <path d="M472 150 H534" stroke="var(--border)" strokeWidth="3" />
          <rect x="538" y="86" width="184" height="128" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="630" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">摘要</text>
          <text x="630" y="154" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">内容完整性</text>
          <text x="630" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">不是事实真实性</text>
          <text x="380" y="274" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">链上记录保存证据指纹，外部制度决定事实如何被证明与追索</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={attested ? "var(--success)" : "var(--warning)"}>{attested ? "可以验证摘要并追溯外部材料" : "证据缺口：暂停真实性结论"}</text>
        </svg>
      </div>
    </section>
  );
}
