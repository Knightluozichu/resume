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

const FAILURE_MODELS = {
  crash: { label: "崩溃故障", detail: "节点停止响应", result: "多数仍可推进" },
  delay: { label: "网络延迟", detail: "消息晚到或乱序", result: "暂时等待" },
  byzantine: { label: "拜占庭故障", detail: "节点发送矛盾消息", result: "必须验证来源" },
} as const;

type FailureModel = keyof typeof FAILURE_MODELS;

export function BpConsensusFailureModelLab() {
  const [model, setModel] = useState<FailureModel>("crash");
  const [conflict, setConflict] = useState(false);
  const active = FAILURE_MODELS[model];

  function reset() {
    setModel("crash");
    setConflict(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-consensus-failure-model"
      aria-label={`共识故障模型实验：当前${active.label}，${conflict ? "候选冲突" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 4 · 故障模型</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先定义坏节点，再谈共识保证</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换崩溃、延迟和拜占庭故障，观察协议为什么会选择等待或继续。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择故障模型</p>
          <div className="grid gap-2">
            {(Object.keys(FAILURE_MODELS) as FailureModel[]).map((value) => (
              <ChoiceButton key={value} active={model === value} onClick={() => { setModel(value); setConflict(false); }}>
                {FAILURE_MODELS[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={conflict} onClick={() => setConflict((value) => !value)}>
            {conflict ? "撤销候选冲突" : "制造候选冲突"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{conflict ? "冲突出现，必须依据协议选择，不能用最后到达的消息代替规则。" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`共识故障模型图：输入、故障、协议动作；当前${active.label}；${conflict ? "候选冲突" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Failure Model → Evidence → Protocol Action</text>
          <rect x="38" y="88" width="184" height="124" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="130" y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">输入</text>
          <text x="130" y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.label}</text>
          <text x="130" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.detail}</text>
          <path d="M230 150 H292" stroke="var(--border)" strokeWidth="3" />
          <rect x="296" y="72" width="168" height="156" rx="14" fill={conflict || model === "byzantine" ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={conflict || model === "byzantine" ? "var(--warning)" : "var(--accent)"} strokeWidth="2" />
          <text x="380" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">证据</text>
          <text x="380" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">消息 / 签名 / 超时</text>
          <text x="380" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{conflict ? "候选不一致" : "等待或验证"}</text>
          <text x="380" y="202" textAnchor="middle" fontSize="12" fill={conflict || model === "byzantine" ? "var(--warning)" : "var(--accent)"}>{model === "byzantine" ? "检查来源" : "观察时序"}</text>
          <path d="M472 150 H534" stroke="var(--border)" strokeWidth="3" />
          <rect x="538" y="88" width="184" height="124" rx="14" fill={conflict ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={conflict ? "var(--warning)" : "var(--success)"} strokeWidth="2" />
          <text x="630" y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">动作</text>
          <text x="630" y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{conflict ? "延迟选择" : active.result}</text>
          <text x="630" y="184" textAnchor="middle" fontSize="11" fill={conflict ? "var(--warning)" : "var(--success)"}>{conflict ? "保留失败证据" : "可继续回放"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">协议保证写在故障模型之后，不能脱离假设谈安全</text>
          <text x="380" y="296" textAnchor="middle" fontSize="11" fill={conflict ? "var(--warning)" : "var(--text-secondary)"}>{conflict ? "候选冲突：不要把暂时状态写成最终历史" : `当前结论：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const QUORUM_CASES = {
  enough: { label: "2f+1 背书", detail: "n=4、f=1 时收到 3 份", result: "可以提交" },
  short: { label: "少一份背书", detail: "只收到 2 份有效消息", result: "继续等待" },
  conflict: { label: "两组候选", detail: "不同提案争夺同一高度", result: "拒绝冲突提交" },
} as const;

type QuorumCase = keyof typeof QUORUM_CASES;

export function BpConsensusQuorumLab() {
  const [caseName, setCaseName] = useState<QuorumCase>("enough");
  const active = QUORUM_CASES[caseName];

  function reset() {
    setCaseName("enough");
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bp-consensus-quorum" aria-label={`法定人数实验：${active.label}，${active.result}。`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 4 · 法定人数</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">2f+1 不是魔法数字，而是交集保证</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换背书数量和候选冲突，检查诚实节点如何让两个提交集合相交。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择背书情形</p>
          <div className="grid gap-2">
            {(Object.keys(QUORUM_CASES) as QuorumCase[]).map((value) => (
              <ChoiceButton key={value} active={caseName === value} onClick={() => setCaseName(value)}>{QUORUM_CASES[value].label}</ChoiceButton>
            ))}
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。判定：{active.result}。先数不同节点的有效签名，再讨论消息内容。
          </p>
        </div>
        <svg viewBox="0 0 760 330" role="img" aria-label={`法定人数图：节点背书、交集和提交；当前${active.label}；${active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Nodes → Quorum → Commit</text>
          {[0,1,2,3].map((index) => {
            const activeNode = caseName === "enough" ? index < 3 : caseName === "short" ? index < 2 : index < 3;
            const x = 92 + index * 154;
            return <g key={`node-${index}`}><circle cx={x} cy="132" r="34" fill={activeNode ? "var(--success)" : "var(--accent)"} fillOpacity="0.14" stroke={activeNode ? "var(--success)" : "var(--accent)"} strokeWidth="2" /><text x={x} y="137" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">N{index + 1}</text><text x={x} y="192" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{activeNode ? "有效背书" : "未到达"}</text></g>;
          })}
          <path d="M90 224 H670" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="380" y="252" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">n=3f+1，f=1 时至少需要 2f+1=3 个不同节点</text>
          <text x="380" y="280" textAnchor="middle" fontSize="13" fontWeight="700" fill={active.result === "可以提交" ? "var(--success)" : "var(--warning)"}>{active.result}</text>
          <text x="380" y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{caseName === "conflict" ? "两组法定人数必须共享诚实节点，冲突提案不能同时提交" : "法定人数负责交集，不负责替应用写业务规则"}</text>
        </svg>
      </div>
    </section>
  );
}

const PROTOCOLS = {
  pow: { label: "PoW", detail: "外部计算成本", safety: "重写成本", liveness: "等待累计工作" },
  pos: { label: "PoS", detail: "权益与惩罚", safety: "经济约束", liveness: "验证者轮换" },
  dpos: { label: "DPoS", detail: "委托代表", safety: "治理与代表", liveness: "固定代表出块" },
} as const;

type Protocol = keyof typeof PROTOCOLS;

export function BpConsensusTradeoffLab() {
  const [protocol, setProtocol] = useState<Protocol>("pow");
  const [partition, setPartition] = useState(false);
  const active = PROTOCOLS[protocol];

  function reset() {
    setProtocol("pow");
    setPartition(false);
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bp-consensus-tradeoff" aria-label={`共识机制取舍实验：当前${active.label}，${partition ? "网络分区" : "网络正常"}。`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 4 · 机制取舍</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">安全、活性和治理要一起比较</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换 PoW、PoS、DPoS，并制造网络分区，观察每种机制牺牲或保留什么。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择共识机制</p>
          <div className="grid gap-2">
            {(Object.keys(PROTOCOLS) as Protocol[]).map((value) => (
              <ChoiceButton key={value} active={protocol === value} onClick={() => setProtocol(value)}>{PROTOCOLS[value].label}</ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={partition} onClick={() => setPartition((value) => !value)}>{partition ? "恢复网络连接" : "制造网络分区"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。安全侧：{active.safety}；活性侧：{active.liveness}。{partition ? "分区中不要把暂时停顿误判为永久失败。" : "先写出威胁模型，再比较速度和成本。"}
          </p>
        </div>
        <svg viewBox="0 0 760 330" role="img" aria-label={`共识机制取舍图：${active.label}、安全性、活性和治理；${partition ? "网络分区" : "网络正常"}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Safety ↔ Liveness ↔ Governance</text>
          <path d="M380 78 L622 220 L138 220 Z" fill="var(--accent)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="2" />
          <circle cx="380" cy="78" r="42" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="2" />
          <text x="380" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{active.safety}</text>
          <circle cx="622" cy="220" r="42" fill={partition ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={partition ? "var(--warning)" : "var(--accent)"} strokeWidth="2" />
          <text x="622" y="224" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{active.liveness}</text>
          <circle cx="138" cy="220" r="42" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="138" y="224" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">治理</text>
          <text x="380" y="154" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="380" y="182" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{partition ? "分区：活性可能下降，安全边界仍需保持" : "正常：三者取舍由协议和治理决定"}</text>
          <text x="380" y="278" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">没有脱离威胁模型的“最快共识”</text>
          <text x="380" y="304" textAnchor="middle" fontSize="11" fill={partition ? "var(--warning)" : "var(--text-secondary)"}>{partition ? "恢复后重放候选与选择证据" : `当前机制：${active.label}`}</text>
        </svg>
      </div>
    </section>
  );
}
