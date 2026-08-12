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

const THREAT_CASES = {
  fork: { label: "规则分叉", detail: "节点对区块有效性的规则版本不一致", result: "协调升级与保护用户" },
  majority: { label: "多数排序攻击", detail: "攻击者获得足够出块权，尝试重组或审查交易", result: "增加确认并监控重组" },
  contract: { label: "合约权限漏洞", detail: "代码按规则执行，但规则允许错误调用者改变资产", result: "暂停入口并审计权限" },
} as const;

type ThreatCase = keyof typeof THREAT_CASES;

export function BpRiskThreatModelLab() {
  const [threat, setThreat] = useState<ThreatCase>("fork");
  const [evidenceGap, setEvidenceGap] = useState(false);
  const active = THREAT_CASES[threat];

  function reset() {
    setThreat("fork");
    setEvidenceGap(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-risk-threat-model"
      aria-label={`区块链威胁模型实验：${active.label}，${evidenceGap ? "证据缺口" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 9 · 威胁模型</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先写攻击者能力，再谈“不可篡改”</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换规则分叉、多数排序和合约权限风险，再隐藏一条证据，观察结论为什么会失去边界。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择威胁类型</p>
          <div className="grid gap-2">
            {(Object.keys(THREAT_CASES) as ThreatCase[]).map((value) => (
              <ChoiceButton key={value} active={threat === value} onClick={() => setThreat(value)}>
                {THREAT_CASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={evidenceGap} onClick={() => setEvidenceGap((value) => !value)}>
            {evidenceGap ? "恢复失败证据" : "隐藏关键证据"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{evidenceGap ? "没有资产、能力或首个异常证据，不能声称风险已被控制" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`威胁模型图：资产、攻击者能力、异常证据和响应；当前${active.label}；${evidenceGap ? "证据缺口" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Asset → Attacker Capability → Evidence → Response</text>
          <rect x="28" y="94" width="158" height="118" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="107" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">资产</text>
          <text x="107" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{threat === "contract" ? "合约余额" : "确认历史"}</text>
          <text x="107" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">用户可用性</text>
          <path d="M194 153 H250" stroke="var(--border)" strokeWidth="3" />
          <polygon points="250,153 236,145 236,161" fill="var(--border)" />
          <rect x="254" y="80" width="162" height="146" rx="14" fill={evidenceGap ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={evidenceGap ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="335" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">能力</text>
          <text x="335" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.label}</text>
          <text x="335" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">入口 / 前置条件</text>
          <text x="335" y="206" textAnchor="middle" fontSize="11" fill={evidenceGap ? "var(--warning)" : "var(--text-secondary)"}>{evidenceGap ? "未记录" : "已界定"}</text>
          <path d="M428 153 H484" stroke="var(--border)" strokeWidth="3" />
          <polygon points="484,153 470,145 470,161" fill="var(--border)" />
          <rect x="488" y="80" width="126" height="146" rx="14" fill={evidenceGap ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={evidenceGap ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="551" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">证据</text>
          <text x="551" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">异常高度</text>
          <text x="551" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">签名 / 日志</text>
          <text x="551" y="206" textAnchor="middle" fontSize="11" fill={evidenceGap ? "var(--warning)" : "var(--success)"}>{evidenceGap ? "缺失" : "可复核"}</text>
          <path d="M626 153 H666" stroke="var(--border)" strokeWidth="3" />
          <polygon points="666,153 652,145 652,161" fill="var(--border)" />
          <rect x="670" y="94" width="68" height="118" rx="14" fill={evidenceGap ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={evidenceGap ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="704" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">响应</text>
          <text x="704" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{evidenceGap ? "未知" : "可执行"}</text>
          <text x="704" y="190" textAnchor="middle" fontSize="11" fill={evidenceGap ? "var(--warning)" : "var(--success)"}>{evidenceGap ? "暂停" : "监控"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">风险结论必须能从资产、能力、证据和响应四列反向复核</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={evidenceGap ? "var(--warning)" : "var(--text-secondary)"}>{evidenceGap ? "失败证据：缺字段时只能隔离，不能过度承诺" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const CONFIRMATION_MODES = {
  spv: { label: "SPV 证明", detail: "用区块头与 Merkle 路径证明交易包含性", result: "仍依赖头链来源" },
  full: { label: "全节点验证", detail: "下载交易并独立检查脚本、UTXO 和区块规则", result: "验证边界更完整" },
  finality: { label: "等待最终性", detail: "用更多确认或协议最终性降低回滚概率", result: "降低结算风险" },
} as const;

type ConfirmationMode = keyof typeof CONFIRMATION_MODES;

export function BpRiskConfirmationLab() {
  const [mode, setMode] = useState<ConfirmationMode>("spv");
  const [conflictingHeader, setConflictingHeader] = useState(false);
  const active = CONFIRMATION_MODES[mode];

  function reset() {
    setMode("spv");
    setConflictingHeader(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-risk-confirmation-finality"
      aria-label={`确认与轻钱包实验：${active.label}，${conflictingHeader ? "头链冲突" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 9 · 证明与确认</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">包含性证明不等于完整最终性</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换 SPV、全节点和等待最终性，再制造冲突头链，观察钱包需要信任什么。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择确认方式</p>
          <div className="grid gap-2">
            {(Object.keys(CONFIRMATION_MODES) as ConfirmationMode[]).map((value) => (
              <ChoiceButton key={value} active={mode === value} onClick={() => setMode(value)}>
                {CONFIRMATION_MODES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={conflictingHeader} onClick={() => setConflictingHeader((value) => !value)}>
            {conflictingHeader ? "恢复单一头链" : "制造冲突头链"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{conflictingHeader ? "先交叉验证累计工作量或最终性，不要只凭一条远端头链付款" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`确认图：交易、证明、头链与结算；当前${active.label}；${conflictingHeader ? "头链冲突" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Transaction → Proof → Header Chain → Settlement</text>
          <rect x="30" y="94" width="154" height="118" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="107" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">交易</text>
          <text x="107" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">tx hash</text>
          <text x="107" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">等待确认</text>
          <path d="M192 153 H250" stroke="var(--border)" strokeWidth="3" />
          <polygon points="250,153 236,145 236,161" fill="var(--border)" />
          <rect x="254" y="94" width="150" height="118" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="329" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">证明</text>
          <text x="329" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mode === "spv" ? "Merkle 路径" : "全交易验证"}</text>
          <text x="329" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">包含性</text>
          <path d="M414 153 H472" stroke="var(--border)" strokeWidth="3" />
          <polygon points="472,153 458,145 458,161" fill="var(--border)" />
          <rect x="476" y="80" width="132" height="146" rx="14" fill={conflictingHeader ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={conflictingHeader ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="542" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">头链</text>
          <text x="542" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{conflictingHeader ? "两条候选" : "累计工作"}</text>
          <text x="542" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mode === "finality" ? "确认深度" : "来源可信"}</text>
          <text x="542" y="206" textAnchor="middle" fontSize="11" fill={conflictingHeader ? "var(--warning)" : "var(--text-secondary)"}>{conflictingHeader ? "需交叉验证" : "可继续"}</text>
          <path d="M616 153 H666" stroke="var(--border)" strokeWidth="3" />
          <polygon points="666,153 652,145 652,161" fill="var(--border)" />
          <rect x="670" y="94" width="68" height="118" rx="14" fill={conflictingHeader ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={conflictingHeader ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="704" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">结算</text>
          <text x="704" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{conflictingHeader ? "暂停" : "可用"}</text>
          <text x="704" y="190" textAnchor="middle" fontSize="11" fill={conflictingHeader ? "var(--warning)" : "var(--success)"}>{conflictingHeader ? "不付款" : "完成"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">SPV 减少下载量，也把头链来源和最终性判断交给外部证据</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={conflictingHeader ? "var(--warning)" : "var(--text-secondary)"}>{conflictingHeader ? "失败证据：头链冲突时冻结高价值结算" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const RECOVERY_PHASES = {
  detect: { label: "发现异常", detail: "通过重组、异常权限或余额变化发现事件", result: "保留现场证据" },
  contain: { label: "隔离影响", detail: "暂停高风险入口、冻结出金或切换只读模式", result: "控制损失范围" },
  restore: { label: "恢复与复盘", detail: "从可信快照恢复并验证密钥、配置和补偿路径", result: "记录不可恢复边界" },
} as const;

type RecoveryPhase = keyof typeof RECOVERY_PHASES;

export function BpRiskRecoveryRunbookLab() {
  const [phase, setPhase] = useState<RecoveryPhase>("detect");
  const [keyLoss, setKeyLoss] = useState(false);
  const active = RECOVERY_PHASES[phase];

  function reset() {
    setPhase("detect");
    setKeyLoss(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-risk-recovery-runbook"
      aria-label={`事故响应实验：${active.label}，${keyLoss ? "私钥丢失" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 9 · 恢复顺序</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">缓解动作要和不可恢复边界一起写</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换发现、隔离和恢复阶段，再模拟私钥丢失，观察哪些资产能暂停、回滚或只能接受损失。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择响应阶段</p>
          <div className="grid gap-2">
            {(Object.keys(RECOVERY_PHASES) as RecoveryPhase[]).map((value) => (
              <ChoiceButton key={value} active={phase === value} onClick={() => setPhase(value)}>
                {RECOVERY_PHASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={keyLoss} onClick={() => setKeyLoss((value) => !value)}>
            {keyLoss ? "恢复密钥备份" : "模拟私钥丢失"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{keyLoss ? "没有可用私钥时不能凭治理记录伪造签名，只能执行预先设计的迁移或补偿路径" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`事故响应图：发现、隔离、恢复与不可恢复边界；当前${active.label}；${keyLoss ? "私钥丢失" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Detect → Contain → Restore → Boundary</text>
          <rect x="26" y="94" width="154" height="118" rx="14" fill={phase === "detect" ? "var(--accent)" : "var(--border)"} fillOpacity="0.12" stroke={phase === "detect" ? "var(--accent)" : "var(--border)"} strokeWidth="3" />
          <text x="103" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">发现</text>
          <text x="103" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">异常日志</text>
          <text x="103" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">重组 / 越权</text>
          <path d="M188 153 H246" stroke="var(--border)" strokeWidth="3" />
          <polygon points="246,153 232,145 232,161" fill="var(--border)" />
          <rect x="250" y="94" width="154" height="118" rx="14" fill={phase === "contain" ? "var(--accent)" : "var(--border)"} fillOpacity="0.12" stroke={phase === "contain" ? "var(--accent)" : "var(--border)"} strokeWidth="3" />
          <text x="327" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">隔离</text>
          <text x="327" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">暂停 / 冻结</text>
          <text x="327" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">控制出金</text>
          <path d="M412 153 H470" stroke="var(--border)" strokeWidth="3" />
          <polygon points="470,153 456,145 456,161" fill="var(--border)" />
          <rect x="474" y="94" width="154" height="118" rx="14" fill={phase === "restore" ? "var(--accent)" : "var(--border)"} fillOpacity="0.12" stroke={phase === "restore" ? "var(--accent)" : "var(--border)"} strokeWidth="3" />
          <text x="551" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">恢复</text>
          <text x="551" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">快照 / 密钥</text>
          <text x="551" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">验证补偿</text>
          <path d="M636 153 H668" stroke="var(--border)" strokeWidth="3" />
          <polygon points="668,153 654,145 654,161" fill="var(--border)" />
          <rect x="672" y="94" width="66" height="118" rx="14" fill={keyLoss ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={keyLoss ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="705" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">边界</text>
          <text x="705" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{keyLoss ? "不可签名" : "已记录"}</text>
          <text x="705" y="190" textAnchor="middle" fontSize="11" fill={keyLoss ? "var(--warning)" : "var(--success)"}>{keyLoss ? "接受" : "复盘"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">恢复手册不能创造丢失的私钥，只能提前定义隔离、迁移和补偿</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={keyLoss ? "var(--warning)" : "var(--text-secondary)"}>{keyLoss ? "失败证据：私钥丢失是不可逆边界，不可伪造签名" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}
