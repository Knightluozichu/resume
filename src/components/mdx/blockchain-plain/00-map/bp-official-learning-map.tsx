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

const MAP_LAYERS = [
  { label: "对象", detail: "区块、交易、账户、UTXO" },
  { label: "规则", detail: "签名、链接、共识、权限" },
  { label: "平台", detail: "以太坊、Fabric、钱包" },
  { label: "实验", detail: "微链、故障、回放、风险" },
] as const;

export function BpOfficialLearningMapPathLab() {
  const [layer, setLayer] = useState(0);
  const [mismatch, setMismatch] = useState(false);
  const active = MAP_LAYERS[layer];

  function reset() {
    setLayer(0);
    setMismatch(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-official-learning-map-path"
      aria-label={`学习地图四层路径实验：当前${active.label}层，${mismatch ? "已注入层级错配" : "层级一致"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Learning map · 四层路径</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先找对象，再追到实验</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">沿对象、规则、平台和实验推进，观察概念如何落到可验证动作。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择地图层</p>
          <div className="grid gap-2">
            {MAP_LAYERS.map((item, index) => (
              <ChoiceButton key={item.label} active={layer === index} onClick={() => setLayer(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={mismatch} onClick={() => setMismatch((value) => !value)}>
            注入层级错配
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.label}（{active.detail}）。{mismatch ? "层级错配已注入，暂停并回到对象定义。" : "先预测下一层要验证什么，再向前移动。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`学习地图图：对象、规则、平台、实验；当前${active.label}；${mismatch ? "层级错配" : "路径一致"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Object → Rule → Platform → Experiment</text>
          {MAP_LAYERS.map((item, index) => {
            const reached = layer >= index;
            const stopped = mismatch && index >= layer;
            const color = stopped ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 188;
            return (
              <g key={item.label}>
                <rect x={x} y="82" width="150" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 75} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 75} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.detail}</text>
                <text x={x + 75} y="178" textAnchor="middle" fontSize="11" fill={color}>{stopped ? "回退" : reached ? "已定位" : "待定位"}</text>
                {index < MAP_LAYERS.length - 1 ? <path d={`M${x + 156} 148 H${x + 180}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">每个目录节点都要能落到对象、规则或实验记录</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={mismatch ? "var(--warning)" : "var(--text-secondary)"}>{mismatch ? "停止：层级错配，不能跳过对象定义" : `当前层：${active.label}`}</text>
        </svg>
      </div>
    </section>
  );
}

const MAP_GROUPS = {
  foundation: { label: "原理基础", detail: "密码、共识、区块结构", nodes: ["哈希", "签名", "共识"] },
  platform: { label: "开发平台", detail: "以太坊与超级账本", nodes: ["账户", "合约", "Fabric"] },
  practice: { label: "动手实验", detail: "微链与开发环境", nodes: ["环境", "区块", "回放"] },
  risk: { label: "风险治理", detail: "分叉、攻击与社会应用", nodes: ["攻击", "恢复", "边界"] },
} as const;

type MapGroup = keyof typeof MAP_GROUPS;

export function BpOfficialLearningMapCoverageLab() {
  const [group, setGroup] = useState<MapGroup>("foundation");
  const [covered, setCovered] = useState(false);
  const active = MAP_GROUPS[group];

  function reset() {
    setGroup("foundation");
    setCovered(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-official-learning-map-coverage"
      aria-label={`学习地图覆盖矩阵实验：${active.label}，${covered ? "已绑定证据" : "未绑定证据"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Learning map · 覆盖矩阵</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">目录覆盖不等于学习完成</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换四类知识群，再为选中的群组绑定定义、实现和失败证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择知识群</p>
          <div className="grid gap-2">
            {(Object.keys(MAP_GROUPS) as MapGroup[]).map((value) => (
              <ChoiceButton key={value} active={group === value} onClick={() => { setGroup(value); setCovered(false); }}>
                {MAP_GROUPS[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={covered} onClick={() => setCovered((value) => !value)}>
            {covered ? "撤销证据绑定" : "绑定三类证据"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{covered ? "定义、实现和失败记录已绑定到节点。" : "先预测这个知识群缺少哪一类证据。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`学习地图覆盖图：${active.label}；${active.nodes.join("、")}；${covered ? "证据已绑定" : "证据待绑定"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">{active.label} · {active.detail}</text>
          {active.nodes.map((node, index) => {
            const color = covered ? "var(--success)" : "var(--accent)";
            const x = 54 + index * 238;
            return (
              <g key={node}>
                <rect x={x} y="88" width="190" height="116" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 95} y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node}</text>
                <text x={x + 95} y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{covered ? "定义 + 实现" : "待绑定"}</text>
                <text x={x + 95} y="181" textAnchor="middle" fontSize="11" fill={color}>{covered ? "可追溯" : "缺证据"}</text>
                {index < active.nodes.length - 1 ? <path d={`M${x + 196} 146 H${x + 228}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="260" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">节点、概念与实验要共享同一张覆盖表</text>
          <text x="380" y="288" textAnchor="middle" fontSize="11" fill={covered ? "var(--success)" : "var(--text-secondary)"}>{covered ? "覆盖完成：可以进入复核" : "覆盖未完成：先补齐证据"}</text>
        </svg>
      </div>
    </section>
  );
}

const EVIDENCE_MODES = {
  concept: { label: "概念定义", detail: "对象、规则和边界", result: "可解释" },
  implementation: { label: "代码实现", detail: "输入、输出和状态", result: "可运行" },
  failure: { label: "失败回放", detail: "拒绝、回退和恢复", result: "可复核" },
} as const;

type EvidenceMode = keyof typeof EVIDENCE_MODES;

export function BpOfficialLearningMapEvidenceLab() {
  const [mode, setMode] = useState<EvidenceMode>("concept");
  const [replayed, setReplayed] = useState(false);
  const active = EVIDENCE_MODES[mode];

  function reset() {
    setMode("concept");
    setReplayed(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-official-learning-map-evidence"
      aria-label={`学习地图回放实验：${active.label}，${replayed ? "已完成回放" : "等待回放"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Learning map · 回放证据</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从地图节点走到独立复核</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择证据类型并执行回放，判断结果能否脱离作者口头说明。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择证据模式</p>
          <div className="grid gap-2">
            {(Object.keys(EVIDENCE_MODES) as EvidenceMode[]).map((value) => (
              <ChoiceButton key={value} active={mode === value} onClick={() => { setMode(value); setReplayed(false); }}>
                {EVIDENCE_MODES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={replayed} onClick={() => setReplayed((value) => !value)}>
            {replayed ? "撤销回放记录" : "执行一次回放"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{replayed ? active.result + "；把原始输入和观察结果一并保存。" : "先预测独立复核者会需要哪个原始对象。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`学习地图证据图：来源、实验、观察；当前${active.label}；${replayed ? "回放完成" : "回放待执行"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Source → Run → Observe</text>
          {[
            { label: "来源", detail: "目录与定义" },
            { label: "实验", detail: active.detail },
            { label: "观察", detail: active.result },
          ].map((node, index) => {
            const color = replayed ? "var(--success)" : "var(--accent)";
            const x = 54 + index * 238;
            return (
              <g key={node.label}>
                <rect x={x} y="88" width="190" height="116" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 95} y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 95} y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 95} y="181" textAnchor="middle" fontSize="11" fill={color}>{replayed ? "已记录" : "待记录"}</text>
                {index < 2 ? <path d={`M${x + 196} 146 H${x + 228}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="260" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">地图不是目录截图，而是可执行的复核路线</text>
          <text x="380" y="288" textAnchor="middle" fontSize="11" fill={replayed ? "var(--success)" : "var(--text-secondary)"}>{replayed ? "回放闭环：他人可以重建这一节点" : "回放未完成：证据链仍然断开"}</text>
        </svg>
      </div>
    </section>
  );
}
