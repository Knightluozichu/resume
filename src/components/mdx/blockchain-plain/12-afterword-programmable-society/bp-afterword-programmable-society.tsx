"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "min-h-11 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={BUTTON_CLASS} onClick={onClick} type="button">
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
      aria-pressed={active}
      className={`${BUTTON_CLASS} ${
        active
          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
          : ""
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type BoundaryCase = "onchain" | "oracle" | "legal";

const boundaryCases: Record<
  BoundaryCase,
  { label: string; event: string; owner: string; action: string; color: string }
> = {
  onchain: {
    label: "链上资产转移",
    event: "签名与余额",
    owner: "合约验证",
    action: "自动转移",
    color: "var(--accent)",
  },
  oracle: {
    label: "预言机触发",
    event: "现实交付事件",
    owner: "预言机与审计者",
    action: "暂停或清算",
    color: "var(--warning)",
  },
  legal: {
    label: "链外强制执行",
    event: "违约与损失",
    owner: "仲裁与法律主体",
    action: "链外救济",
    color: "var(--danger)",
  },
};

export function BpAfterwordAutomationBoundaryLab() {
  const [caseId, setCaseId] = useState<BoundaryCase>("onchain");
  const [oracleOffline, setOracleOffline] = useState(false);
  const scenario = boundaryCases[caseId];
  const blocked = caseId === "oracle" && oracleOffline;
  const action = blocked ? "等待证据" : scenario.action;

  return (
    <section
      aria-label="可编程社会自动化边界实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-afterword-automation-boundary"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Automation boundary
          </p>
          <h3 className="mt-1 text-lg font-semibold">代码能自动化什么？</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            只改变一个协作条件，观察责任从合约验证转向预言机或法律主体。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setCaseId("onchain");
            setOracleOffline(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(boundaryCases) as BoundaryCase[]).map((id) => (
          <ChoiceButton
            active={caseId === id}
            key={id}
            onClick={() => setCaseId(id)}
          >
            {boundaryCases[id].label}
          </ChoiceButton>
        ))}
      </div>

      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={oracleOffline}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setOracleOffline(event.target.checked)}
          type="checkbox"
        />
        让预言机离线
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="现实事件经过预言机和合约状态后产生动作的责任流"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bp-afterword-boundary-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            责任边界：{scenario.owner}
          </text>
          {[
            { x: 35, label: "现实事件", value: scenario.event },
            { x: 215, label: "预言机", value: caseId === "onchain" ? "无需外部事实" : "来源与时间戳" },
            { x: 395, label: "合约状态", value: blocked ? "保持暂停" : "条件已验证" },
            { x: 575, label: "系统动作", value: action },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={index === 1 && caseId !== "onchain" ? scenario.color : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bp-afterword-boundary-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={blocked ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={blocked ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {blocked
              ? "预言机离线：合约不能猜测现实，暂停并等待责任主体补证据。"
              : "当前结论：自动执行只覆盖已形式化且可验证的状态。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {blocked
          ? "观察：暂停是可解释的安全动作；预言机运营者或争议机构必须补充证据。"
          : `观察：${scenario.label}由“${scenario.owner}”负责，系统动作是“${action}”。`}
      </p>
    </section>
  );
}

type GovernancePhase = "propose" | "review" | "execute";

const governancePhases: Record<
  GovernancePhase,
  { label: string; detail: string; active: number }
> = {
  propose: { label: "提出升级", detail: "公布版本、影响范围与回退方案", active: 0 },
  review: { label: "公开审议", detail: "审计代码，核对门槛与用户影响", active: 1 },
  execute: { label: "延迟执行", detail: "时间锁开启，给用户迁移或退出窗口", active: 2 },
};

export function BpAfterwordGovernanceLab() {
  const [phase, setPhase] = useState<GovernancePhase>("propose");
  const [quorumGap, setQuorumGap] = useState(false);
  const current = governancePhases[phase];
  const canExecute = phase === "execute" && !quorumGap;

  return (
    <section
      aria-label="可编程社会治理升级实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-afterword-governance-upgrade"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Governance upgrade
          </p>
          <h3 className="mt-1 text-lg font-semibold">治理不是“投票即正确”</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            沿着升级流水线前进，再只注入一个门槛缺口。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setPhase("propose");
            setQuorumGap(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(governancePhases) as GovernancePhase[]).map((id) => (
          <ChoiceButton active={phase === id} key={id} onClick={() => setPhase(id)}>
            {governancePhases[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={quorumGap}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setQuorumGap(event.target.checked)}
          type="checkbox"
        />
        撤掉一票，制造门槛缺口
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="治理提案经过审议、门槛、时间锁再升级的流程"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bp-afterword-governance-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前阶段：{current.label} · {current.detail}
          </text>
          {[
            { x: 28, label: "提案", value: "v2 + 影响说明" },
            { x: 178, label: "审议", value: "独立审计" },
            { x: 328, label: "门槛", value: quorumGap ? "少一票" : "达到 quorum" },
            { x: 478, label: "时间锁", value: phase === "execute" ? "窗口开启" : "等待开启" },
            { x: 628, label: "升级", value: canExecute ? "可执行" : "不可执行" },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="104"
                rx="12"
                stroke={index === current.active ? "var(--accent)" : "var(--border)"}
                strokeWidth="2"
                width="108"
                x={node.x}
                y="92"
              />
              <circle
                cx={node.x + 54}
                cy="116"
                fill={index <= current.active ? "var(--accent)" : "var(--muted)"}
                r="10"
              />
              <text fill="var(--surface)" fontSize="11" textAnchor="middle" x={node.x + 54} y="120">
                {index + 1}
              </text>
              <text fill="var(--accent)" fontSize="12" fontWeight="700" textAnchor="middle" x={node.x + 54} y="148">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="11" textAnchor="middle" x={node.x + 54} y="172">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bp-afterword-governance-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 108}
                  x2={nodes[index + 1].x - 10}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={quorumGap ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={quorumGap ? "var(--danger)" : "var(--border)"}
            width="704"
            x="28"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="380" y="273">
            {quorumGap
              ? "门槛不足：停止升级，公开缺口并保留用户退出窗口。"
              : "完整链路：投票决定可否改变，审计与时间锁帮助判断是否应当执行。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {quorumGap
          ? "观察：合法治理必须能拒绝未达门槛的提案，而不是用自动化掩盖证据不足。"
          : `观察：${current.label}完成后，下一步仍需审计、时间锁与退出责任。`}
      </p>
    </section>
  );
}

type ExitCase = "normal" | "dispute" | "emergency";

const exitCases: Record<
  ExitCase,
  { label: string; state: string; remedy: string; owner: string }
> = {
  normal: { label: "正常退出", state: "规则版本有效", remedy: "退款或迁移", owner: "合约" },
  dispute: { label: "争议中", state: "事实或结果有分歧", remedy: "仲裁与冻结", owner: "仲裁机构" },
  emergency: { label: "紧急暂停", state: "风险正在扩大", remedy: "暂停与复核", owner: "授权暂停者" },
};

export function BpAfterwordExitMechanismLab() {
  const [caseId, setCaseId] = useState<ExitCase>("normal");
  const [offchainAsset, setOffchainAsset] = useState(false);
  const scenario = exitCases[caseId];

  return (
    <section
      aria-label="可编程社会争议与退出实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-afterword-exit-mechanism"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Dispute and exit
          </p>
          <h3 className="mt-1 text-lg font-semibold">争议发生后，谁能让参与者离开？</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            切换结束情形，并检查链上资产和链外资产是否需要不同责任主体。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setCaseId("normal");
            setOffchainAsset(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(exitCases) as ExitCase[]).map((id) => (
          <ChoiceButton active={caseId === id} key={id} onClick={() => setCaseId(id)}>
            {exitCases[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={offchainAsset}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setOffchainAsset(event.target.checked)}
          type="checkbox"
        />
        加入链外实物资产
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="系统状态经过争议处理、链上资产和链外救济形成退出路径"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bp-afterword-exit-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            退出责任主体：{scenario.owner} · 处理：{scenario.remedy}
          </text>
          {[
            { x: 35, label: "系统状态", value: scenario.state },
            { x: 215, label: "争议入口", value: caseId === "normal" ? "无争议" : "提交证据" },
            { x: 395, label: "链上资产", value: "冻结或可返还" },
            { x: 575, label: "链外救济", value: offchainAsset ? "需要现实主体" : scenario.remedy },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={index === 3 && offchainAsset ? "var(--warning)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bp-afterword-exit-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={caseId === "dispute" || offchainAsset ? "var(--warning-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={caseId === "dispute" || offchainAsset ? "var(--warning)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {offchainAsset
              ? "链外实物不能由合约直接返还：必须指定验收、仲裁或法律执行主体。"
              : "退出路径：记录请求、冻结范围、返还结果和责任主体，避免资产永久锁定。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {offchainAsset
          ? "观察：加入链外资产后，自动退款只能覆盖链上状态，现实交付仍需要可申诉的执行机制。"
          : `观察：${scenario.label}的可执行出口是“${scenario.remedy}”，负责方是“${scenario.owner}”。`}
      </p>
    </section>
  );
}
