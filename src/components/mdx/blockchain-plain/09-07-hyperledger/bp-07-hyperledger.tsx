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

const ENDORSEMENT_POLICIES = {
  majority: { label: "OutOf(2, 3)", detail: "三个组织中至少两个不同组织有效背书", result: "可以进入排序" },
  single: { label: "单组织背书", detail: "一个背书节点即可满足策略，信任集中", result: "可提交但风险集中" },
  conflict: { label: "读写集冲突", detail: "背书时读取的版本已经不是当前世界状态版本", result: "提交节点拒绝" },
} as const;

type EndorsementPolicy = keyof typeof ENDORSEMENT_POLICIES;

export function BpFabricEndorsementLab() {
  const [policy, setPolicy] = useState<EndorsementPolicy>("majority");
  const [badSignature, setBadSignature] = useState(false);
  const active = ENDORSEMENT_POLICIES[policy];
  const rejected = badSignature || policy === "conflict";

  function reset() {
    setPolicy("majority");
    setBadSignature(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-fabric-endorsement-policy"
      aria-label={`Fabric 背书策略实验：${active.label}，${badSignature ? "签名无效" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 7 · 背书策略</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">许可身份仍然需要逐笔验证</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换背书策略，再注入伪造签名，观察策略门槛、签名和读写集版本如何共同决定去留。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择背书与版本条件</p>
          <div className="grid gap-2">
            {(Object.keys(ENDORSEMENT_POLICIES) as EndorsementPolicy[]).map((value) => (
              <ChoiceButton key={value} active={policy === value} onClick={() => setPolicy(value)}>
                {ENDORSEMENT_POLICIES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={badSignature} onClick={() => setBadSignature((value) => !value)}>
            {badSignature ? "恢复有效签名" : "制造伪造签名"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{badSignature ? "即使数量达标，提交节点也必须拒绝无效背书" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`Fabric 背书图：提案、背书、策略和读写集检查；当前${active.label}；${badSignature ? "签名无效" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Proposal → Endorsement → Policy + Version → Order</text>
          <rect x="28" y="94" width="150" height="118" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="103" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">提案</text>
          <text x="103" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">链码 + 参数</text>
          <text x="103" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">读集版本 v8</text>
          <path d="M186 153 H242" stroke="var(--border)" strokeWidth="3" />
          <polygon points="242,153 228,145 228,161" fill="var(--border)" />
          <rect x="246" y="80" width="160" height="146" rx="14" fill={badSignature ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={badSignature ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="326" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">背书</text>
          <text x="326" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Org1 / Org2 / Org3</text>
          <text x="326" y="178" textAnchor="middle" fontSize="12" fill={badSignature ? "var(--warning)" : "var(--text-secondary)"}>{badSignature ? "一份签名无效" : "读写集 + 签名"}</text>
          <text x="326" y="206" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">模拟执行不写账本</text>
          <path d="M414 153 H470" stroke="var(--border)" strokeWidth="3" />
          <polygon points="470,153 456,145 456,161" fill="var(--border)" />
          <rect x="474" y="80" width="126" height="146" rx="14" fill={rejected ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={rejected ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="537" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">检查</text>
          <text x="537" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">策略 / 签名</text>
          <text x="537" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">MVCC 版本</text>
          <text x="537" y="206" textAnchor="middle" fontSize="11" fill={rejected ? "var(--warning)" : "var(--success)"}>{rejected ? "拒绝" : "通过"}</text>
          <path d="M608 153 H664" stroke="var(--border)" strokeWidth="3" />
          <polygon points="664,153 650,145 650,161" fill="var(--border)" />
          <rect x="668" y="94" width="70" height="118" rx="14" fill={rejected ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={rejected ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="703" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">排序</text>
          <text x="703" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{rejected ? "不进入" : "进入"}</text>
          <text x="703" y="190" textAnchor="middle" fontSize="11" fill={rejected ? "var(--warning)" : "var(--success)"}>{rejected ? "拒绝" : "批次"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">背书证明模拟执行结果，提交节点仍要验证策略和版本冲突</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={rejected ? "var(--warning)" : "var(--text-secondary)"}>{badSignature ? "失败证据：签名无效，数量不能掩盖身份错误" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const PIPELINE_PHASES = {
  proposal: { label: "提案与背书", detail: "客户端收集满足策略的背书响应", result: "准备排序" },
  ordering: { label: "排序与区块", detail: "排序服务只负责形成顺序，不替代有效性检查", result: "等待提交验证" },
  commit: { label: "验证与提交", detail: "提交节点检查背书、MVCC 和区块结构后更新账本", result: "写入世界状态" },
} as const;

type PipelinePhase = keyof typeof PIPELINE_PHASES;

export function BpFabricCommitPipelineLab() {
  const [phase, setPhase] = useState<PipelinePhase>("proposal");
  const [versionConflict, setVersionConflict] = useState(false);
  const active = PIPELINE_PHASES[phase];

  function reset() {
    setPhase("proposal");
    setVersionConflict(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-fabric-commit-pipeline"
      aria-label={`Fabric 提交流水线实验：${active.label}，${versionConflict ? "MVCC 冲突" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 7 · 排序与提交</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">排序只决定顺序，不能替验证背书</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换提案、排序和提交阶段，再修改读集版本，观察无效交易如何在最后一道门被拒绝。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择流水线阶段</p>
          <div className="grid gap-2">
            {(Object.keys(PIPELINE_PHASES) as PipelinePhase[]).map((value) => (
              <ChoiceButton key={value} active={phase === value} onClick={() => setPhase(value)}>
                {PIPELINE_PHASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={versionConflict} onClick={() => setVersionConflict((value) => !value)}>
            {versionConflict ? "恢复读集版本" : "制造 MVCC 冲突"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{versionConflict ? "区块可以排序，但冲突交易不能更新世界状态" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`Fabric 提交流水线图：提案、排序、验证和提交；当前${active.label}；${versionConflict ? "MVCC 冲突" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Client → Endorser → Ordering → Committer</text>
          <rect x="26" y="92" width="150" height="122" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke={phase === "proposal" ? "var(--accent)" : "var(--border)"} strokeWidth="3" />
          <text x="101" y="126" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">客户端</text>
          <text x="101" y="158" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">提案 / 签名响应</text>
          <text x="101" y="188" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">收集策略证据</text>
          <path d="M184 153 H236" stroke="var(--border)" strokeWidth="3" />
          <polygon points="236,153 222,145 222,161" fill="var(--border)" />
          <rect x="240" y="92" width="150" height="122" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke={phase === "proposal" ? "var(--accent)" : "var(--border)"} strokeWidth="3" />
          <text x="315" y="126" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">背书节点</text>
          <text x="315" y="158" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">模拟链码</text>
          <text x="315" y="188" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">读写集 / 签名</text>
          <path d="M398 153 H450" stroke="var(--border)" strokeWidth="3" />
          <polygon points="450,153 436,145 436,161" fill="var(--border)" />
          <rect x="454" y="92" width="126" height="122" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke={phase === "ordering" ? "var(--accent)" : "var(--border)"} strokeWidth="3" />
          <text x="517" y="126" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">排序</text>
          <text x="517" y="158" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">区块批次</text>
          <text x="517" y="188" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">只定顺序</text>
          <path d="M588 153 H640" stroke="var(--border)" strokeWidth="3" />
          <polygon points="640,153 626,145 626,161" fill="var(--border)" />
          <rect x="644" y="92" width="94" height="122" rx="14" fill={versionConflict ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={versionConflict ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="691" y="126" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">提交</text>
          <text x="691" y="158" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{versionConflict ? "MVCC 拒绝" : "状态更新"}</text>
          <text x="691" y="188" textAnchor="middle" fontSize="11" fill={versionConflict ? "var(--warning)" : "var(--success)"}>{versionConflict ? "不写入" : "账本"}</text>
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">背书执行、排序顺序与提交有效性是三个不同证据层</text>
          <text x="380" y="296" textAnchor="middle" fontSize="11" fill={versionConflict ? "var(--warning)" : "var(--text-secondary)"}>{versionConflict ? "失败证据：排序成功不等于版本检查成功" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const IDENTITY_ROLES = {
  client: { label: "客户端身份", detail: "提交者用证书证明组织归属并请求某个通道操作", result: "可以发起提案" },
  peer: { label: "Peer 身份", detail: "节点依据 MSP、通道策略和本地账本参与背书或提交", result: "可以验证状态" },
  admin: { label: "管理员身份", detail: "管理员能修改部分配置，但也受配置策略和签名约束", result: "可以提交治理配置" },
} as const;

type IdentityRole = keyof typeof IDENTITY_ROLES;

export function BpFabricIdentityAccessLab() {
  const [role, setRole] = useState<IdentityRole>("client");
  const [revoked, setRevoked] = useState(false);
  const active = IDENTITY_ROLES[role];
  const accepted = !revoked;

  function reset() {
    setRole("client");
    setRevoked(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-fabric-identity-access"
      aria-label={`Fabric 身份与访问实验：${active.label}，${revoked ? "证书已撤销" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 7 · 许可身份</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">证书证明归属，策略决定动作</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换客户端、Peer 和管理员身份，再撤销证书，观察 MSP 与通道 ACL 如何阻止过期身份继续写入。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择身份与证书状态</p>
          <div className="grid gap-2">
            {(Object.keys(IDENTITY_ROLES) as IdentityRole[]).map((value) => (
              <ChoiceButton key={value} active={role === value} onClick={() => setRole(value)}>
                {IDENTITY_ROLES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={revoked} onClick={() => setRevoked((value) => !value)}>
            {revoked ? "恢复证书" : "撤销证书"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{revoked ? "MSP 应拒绝该身份，即使它曾经拥有有效证书" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`Fabric 身份访问图：证书、MSP、ACL 与通道状态；当前${active.label}；${revoked ? "证书已撤销" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Certificate → MSP → Channel ACL → Ledger Action</text>
          <rect x="32" y="94" width="160" height="120" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="112" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">证书</text>
          <text x="112" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="112" y="190" textAnchor="middle" fontSize="11" fill={revoked ? "var(--warning)" : "var(--text-secondary)"}>{revoked ? "已撤销" : "签名有效"}</text>
          <path d="M202 154 H260" stroke="var(--border)" strokeWidth="3" />
          <polygon points="260,154 246,146 246,162" fill="var(--border)" />
          <rect x="264" y="80" width="150" height="148" rx="14" fill={revoked ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={revoked ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="339" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">MSP</text>
          <text x="339" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">组织归属</text>
          <text x="339" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">证书状态</text>
          <text x="339" y="206" textAnchor="middle" fontSize="11" fill={revoked ? "var(--warning)" : "var(--success)"}>{revoked ? "不通过" : "通过"}</text>
          <path d="M426 154 H484" stroke="var(--border)" strokeWidth="3" />
          <polygon points="484,154 470,146 470,162" fill="var(--border)" />
          <rect x="488" y="94" width="116" height="120" rx="14" fill={revoked ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={revoked ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="546" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">ACL</text>
          <text x="546" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">通道策略</text>
          <text x="546" y="190" textAnchor="middle" fontSize="11" fill={revoked ? "var(--warning)" : "var(--text-secondary)"}>{revoked ? "拒绝" : "允许动作"}</text>
          <path d="M616 154 H664" stroke="var(--border)" strokeWidth="3" />
          <polygon points="664,154 650,146 650,162" fill="var(--border)" />
          <rect x="668" y="94" width="70" height="120" rx="14" fill={accepted ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={accepted ? "var(--success)" : "var(--warning)"} strokeWidth="3" />
          <text x="703" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">账本</text>
          <text x="703" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{accepted ? "动作" : "不写"}</text>
          <text x="703" y="190" textAnchor="middle" fontSize="11" fill={accepted ? "var(--success)" : "var(--warning)"}>{accepted ? "记录" : "隔离"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">身份认证、访问控制和账本动作是连续但独立的检查</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={revoked ? "var(--warning)" : "var(--text-secondary)"}>{revoked ? "失败证据：过期证书不能凭旧权限写账本" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}
