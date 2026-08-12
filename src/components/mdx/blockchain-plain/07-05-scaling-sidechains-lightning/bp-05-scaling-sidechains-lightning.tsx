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

const CAPACITY_MODES = {
  base: {
    label: "1 MB 基线",
    detail: "传播窗口较短，更多交易需要等待后续区块",
    result: "验证与存储压力较低",
  },
  expanded: {
    label: "2 MB 区块",
    detail: "单块容纳更多交易，但传播和验证窗口变长",
    result: "吞吐提高，节点门槛上升",
  },
} as const;

type CapacityMode = keyof typeof CAPACITY_MODES;

export function BpScalingCapacityLab() {
  const [mode, setMode] = useState<CapacityMode>("base");
  const [slowNode, setSlowNode] = useState(false);
  const active = CAPACITY_MODES[mode];

  function reset() {
    setMode("base");
    setSlowNode(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-scaling-capacity-tradeoff"
      aria-label={`区块扩容实验：${active.label}，${slowNode ? "慢节点传播延迟" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 5 · 区块扩容</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">吞吐提升会把压力搬到哪里？</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换区块容量，再注入慢节点，沿传播、验证和去中心化边界追踪代价。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择容量与网络条件</p>
          <div className="grid gap-2">
            {(Object.keys(CAPACITY_MODES) as CapacityMode[]).map((value) => (
              <ChoiceButton
                key={value}
                active={mode === value}
                onClick={() => setMode(value)}
              >
                {CAPACITY_MODES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={slowNode} onClick={() => setSlowNode((value) => !value)}>
            {slowNode ? "恢复快速传播" : "制造慢节点"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{slowNode ? "传播延迟放大，轻节点和低带宽节点更难跟上" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`区块扩容图：容量、传播、验证和去中心化；当前${active.label}；${slowNode ? "慢节点传播延迟" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Block Size → Propagation → Validation → Decentralization</text>
          <rect x="28" y="90" width="154" height="126" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="105" y="126" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">容量</text>
          <text x="105" y="158" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="105" y="188" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mode === "expanded" ? "更多交易" : "较少交易"}</text>
          <path d="M190 153 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="252" y="90" width="154" height="126" rx="14" fill={slowNode ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={slowNode ? "var(--warning)" : "var(--accent)"} strokeWidth="2" />
          <text x="329" y="126" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">传播</text>
          <text x="329" y="158" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{slowNode ? "窗口变长" : "消息扩散"}</text>
          <text x="329" y="188" textAnchor="middle" fontSize="11" fill={slowNode ? "var(--warning)" : "var(--text-secondary)"}>{slowNode ? "慢节点掉队" : "节点同步"}</text>
          <path d="M414 153 H472" stroke="var(--border)" strokeWidth="3" />
          <rect x="476" y="90" width="122" height="126" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="537" y="126" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">验证</text>
          <text x="537" y="158" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{mode === "expanded" ? "更重" : "可控"}</text>
          <text x="537" y="188" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">规则不变</text>
          <path d="M606 153 H664" stroke="var(--border)" strokeWidth="3" />
          <rect x="668" y="90" width="70" height="126" rx="14" fill={mode === "expanded" || slowNode ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={mode === "expanded" || slowNode ? "var(--warning)" : "var(--success)"} strokeWidth="2" />
          <text x="703" y="126" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">门槛</text>
          <text x="703" y="158" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mode === "expanded" || slowNode ? "上升" : "稳定"}</text>
          <text x="703" y="188" textAnchor="middle" fontSize="11" fill={mode === "expanded" || slowNode ? "var(--warning)" : "var(--success)"}>{mode === "expanded" || slowNode ? "注意" : "可扩展"}</text>
          <text x="380" y="264" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">扩大区块不改变验证规则，却改变每个节点承担的数据与传播成本</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={mode === "expanded" || slowNode ? "var(--warning)" : "var(--text-secondary)"}>{slowNode ? "慢节点样本：先记录传播延迟，再讨论吞吐" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const LIGHTNING_PHASES = {
  open: { label: "开启通道", detail: "资金先锁在主链，多签状态定义分配边界", result: "等待资金确认" },
  update: { label: "更新状态", detail: "双方在链下交换新承诺，余额变化不必逐笔上链", result: "在线监控旧状态" },
  close: { label: "关闭通道", detail: "用最新承诺结算，争议窗口保护被动一方", result: "等待最终确认" },
} as const;

type LightningPhase = keyof typeof LIGHTNING_PHASES;

export function BpScalingLightningLab() {
  const [phase, setPhase] = useState<LightningPhase>("open");
  const [staleState, setStaleState] = useState(false);
  const active = LIGHTNING_PHASES[phase];

  function reset() {
    setPhase("open");
    setStaleState(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-scaling-lightning-lifecycle"
      aria-label={`闪电网络通道实验：${active.label}，${staleState ? "发现旧状态关闭风险" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 5 · 闪电网络</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">链下更新快，结算边界仍在链上</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换通道生命周期，再提交旧状态，观察在线监控和争议窗口为何不可省略。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择通道阶段</p>
          <div className="grid gap-2">
            {(Object.keys(LIGHTNING_PHASES) as LightningPhase[]).map((value) => (
              <ChoiceButton key={value} active={phase === value} onClick={() => setPhase(value)}>
                {LIGHTNING_PHASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={staleState} onClick={() => setStaleState((value) => !value)}>
            {staleState ? "撤销旧状态攻击" : "提交旧状态"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{staleState ? "必须由 Watchtower 或在线方在争议窗口内提交最新证据" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`闪电网络生命周期图：开启、更新、关闭；当前${active.label}；${staleState ? "发现旧状态关闭风险" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Funding → Off-chain Update → On-chain Settlement</text>
          <circle cx="112" cy="145" r="56" fill="var(--accent)" fillOpacity="0.12" stroke={phase === "open" ? "var(--accent)" : "var(--border)"} strokeWidth="3" />
          <text x="112" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">主链资金</text>
          <text x="112" y="170" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">2-of-2 锁定</text>
          <path d="M174 145 H276" stroke="var(--border)" strokeWidth="3" />
          <polygon points="276,145 262,137 262,153" fill="var(--border)" />
          <rect x="280" y="84" width="194" height="122" rx="14" fill={staleState ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={staleState ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="377" y="121" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">链下承诺</text>
          <text x="377" y="151" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{phase === "update" ? "版本 n+1" : "版本 n"}</text>
          <text x="377" y="180" textAnchor="middle" fontSize="11" fill={staleState ? "var(--warning)" : "var(--text-secondary)"}>{staleState ? "旧状态被提交" : "双方签名交换"}</text>
          <path d="M478 145 H580" stroke="var(--border)" strokeWidth="3" />
          <polygon points="580,145 566,137 566,153" fill="var(--border)" />
          <circle cx="644" cy="145" r="56" fill={staleState ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={staleState ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="644" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">关闭交易</text>
          <text x="644" y="170" textAnchor="middle" fontSize="11" fill={staleState ? "var(--warning)" : "var(--text-secondary)"}>{staleState ? "争议窗口" : "最新余额"}</text>
          <text x="380" y="258" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">支付路由成功只表示链下承诺更新，不等于主链最终结算</text>
          <text x="380" y="286" textAnchor="middle" fontSize="11" fill={staleState ? "var(--warning)" : "var(--text-secondary)"}>{staleState ? "风险样本：离线方需要 Watchtower 提交惩罚证据" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const INTERCHAIN_MODES = {
  sidechain: { label: "侧链锚定", detail: "主链资产映射到另一条执行链", result: "核对双向锚定与退出窗口" },
  bridge: { label: "跨链桥", detail: "中继证明把一条链上的事件带到另一条链", result: "核对验证者或证明检查" },
  multichain: { label: "多链应用", detail: "业务状态拆到多条链并通过消息组合", result: "核对消息顺序与最终性" },
} as const;

type InterchainMode = keyof typeof INTERCHAIN_MODES;

export function BpScalingInterchainLab() {
  const [mode, setMode] = useState<InterchainMode>("sidechain");
  const [finalityGap, setFinalityGap] = useState(false);
  const active = INTERCHAIN_MODES[mode];

  function reset() {
    setMode("sidechain");
    setFinalityGap(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-scaling-interchain-proof"
      aria-label={`多链交互实验：${active.label}，${finalityGap ? "存在最终性间隙" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 5 · 多链交互</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">跨链消息先证明，再组合业务状态</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换侧链、跨链桥和多链应用，制造最终性间隙，观察中继如何避免提前释放资产。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择交互模式</p>
          <div className="grid gap-2">
            {(Object.keys(INTERCHAIN_MODES) as InterchainMode[]).map((value) => (
              <ChoiceButton key={value} active={mode === value} onClick={() => setMode(value)}>
                {INTERCHAIN_MODES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={finalityGap} onClick={() => setFinalityGap((value) => !value)}>
            {finalityGap ? "恢复最终性" : "制造最终性间隙"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{finalityGap ? "Relay Proof 不能只证明消息出现，还要证明来源链已达到最终性" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`多链交互图：来源链、Relay Proof 和目标链；当前${active.label}；${finalityGap ? "存在最终性间隙" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Chain A → Relay Proof → Chain B</text>
          <rect x="42" y="92" width="182" height="124" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="133" y="126" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">来源链 A</text>
          <text x="133" y="158" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="133" y="188" textAnchor="middle" fontSize="11" fill={finalityGap ? "var(--warning)" : "var(--text-secondary)"}>{finalityGap ? "未最终确认" : "事件已确认"}</text>
          <path d="M232 154 H302" stroke="var(--border)" strokeWidth="3" />
          <polygon points="302,154 288,146 288,162" fill="var(--border)" />
          <rect x="306" y="74" width="148" height="160" rx="14" fill={finalityGap ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={finalityGap ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="380" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Relay Proof</text>
          <text x="380" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">事件 + 高度</text>
          <text x="380" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">签名 / 轻客户端</text>
          <text x="380" y="204" textAnchor="middle" fontSize="11" fill={finalityGap ? "var(--warning)" : "var(--text-secondary)"}>{finalityGap ? "等待最终性" : "证明可复核"}</text>
          <path d="M462 154 H532" stroke="var(--border)" strokeWidth="3" />
          <polygon points="532,154 518,146 518,162" fill="var(--border)" />
          <rect x="536" y="92" width="182" height="124" rx="14" fill={finalityGap ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={finalityGap ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="627" y="126" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">目标链 B</text>
          <text x="627" y="158" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{finalityGap ? "不释放" : "更新状态"}</text>
          <text x="627" y="188" textAnchor="middle" fontSize="11" fill={finalityGap ? "var(--warning)" : "var(--success)"}>{finalityGap ? "防止提前执行" : "可组合业务"}</text>
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">跨链安全性取决于来源链最终性、证明验证和目标链执行顺序</text>
          <text x="380" y="296" textAnchor="middle" fontSize="11" fill={finalityGap ? "var(--warning)" : "var(--text-secondary)"}>{finalityGap ? "最终性间隙样本：拒绝提前释放资产" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}
