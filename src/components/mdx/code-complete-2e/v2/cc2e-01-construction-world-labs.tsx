"use client";

import { useState } from "react";

type PipelineStage = {
  label: string;
  artifact: string;
  boundary: string;
  signal: string;
};

const PIPELINE_STAGES: readonly PipelineStage[] = [
  {
    label: "问题定义",
    artifact: "需求与完成标准",
    boundary: "要解决什么",
    signal: "输入可被复核",
  },
  {
    label: "架构边界",
    artifact: "职责与接口",
    boundary: "谁负责什么",
    signal: "依赖可追踪",
  },
  {
    label: "详细设计",
    artifact: "可执行方案",
    boundary: "怎么实现",
    signal: "取舍有理由",
  },
  {
    label: "编码与测试",
    artifact: "可运行构件",
    boundary: "怎样证明",
    signal: "反馈足够快",
  },
  {
    label: "集成交接",
    artifact: "构建证据包",
    boundary: "何时可以交付",
    signal: "结果可重放",
  },
];

const CHAPTER_NODES = [
  "第1章 欢迎进入软件构建的世界",
  "1.1 什么是软件构建",
  "1.2 软件构建为何如此重要",
  "1.3 如何阅读本书",
  "关键点",
] as const;

type EvidenceScenario = {
  label: string;
  summary: string;
  firstBreak: number;
  repair: string;
};

const EVIDENCE_SCENARIOS: readonly EvidenceScenario[] = [
  {
    label: "正常交接",
    summary: "需求、构件、测试和集成日志彼此相连。",
    firstBreak: -1,
    repair: "保留版本、输入、命令和结果，第二位读者可以重放。",
  },
  {
    label: "缺少测试证据",
    summary: "代码可以运行，但没有证明边界输入被覆盖。",
    firstBreak: 3,
    repair: "补一个恰好边界样本，再把失败与修复绑定到同一基线。",
  },
  {
    label: "跨边界交付",
    summary: "构建完成被误当成系统测试和运维已经完成。",
    firstBreak: 4,
    repair: "在交接处列出未覆盖的责任，并拒绝用成功日志替代契约。",
  },
];

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
    >
      重置实验
    </button>
  );
}

function LabHeader({
  eyebrow,
  title,
  description,
  onReset,
}: {
  eyebrow: string;
  title: string;
  description: string;
  onReset: () => void;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-primary">{title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
          {description}
        </p>
      </div>
      <ResetButton onClick={onReset} />
    </header>
  );
}

export function Cc2eConstructionWorldBoundaryLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failureInjected, setFailureInjected] = useState(false);
  const active = PIPELINE_STAGES[activeIndex];
  const firstBreak = failureInjected ? 3 : -1;

  return (
    <section
      aria-label="构建边界交互图"
      data-visual-kind="cc2e-construction-boundary"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <LabHeader
        eyebrow="1.1 什么是软件构建"
        title="构建边界：从问题到可交接构件"
        description="选择一个阶段，观察它应留下的产物和边界。再注入一次“没有测试证据”的故障，看看首个拒绝点为什么出现在交接前。"
        onReset={() => {
          setActiveIndex(0);
          setFailureInjected(false);
        }}
      />
      <div className="min-w-0 space-y-5 p-5">
        <div className="grid gap-2 sm:grid-cols-5" aria-label="构建阶段">
          {PIPELINE_STAGES.map((stage, index) => (
            <button
              key={`${stage.label}-${index}`}
              type="button"
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`min-h-14 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                activeIndex === index
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="block font-mono text-[11px] text-accent">
                0{index + 1}
              </span>
              <span className="mt-1 block font-semibold">{stage.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-secondary">
            故障模式：
          </span>
          {[
            [false, "正常交接"],
            [true, "缺少测试证据"],
          ].map(([value, label]) => (
            <button
              key={String(label)}
              type="button"
              aria-pressed={failureInjected === value}
              onClick={() => setFailureInjected(Boolean(value))}
              className={`rounded-full border px-3 py-2 text-xs transition-colors ${
                failureInjected === value
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <svg
          viewBox="0 0 760 270"
          role="img"
          aria-label="五个构建阶段从问题定义流向集成交接；故障模式会在编码与测试节点标出首个拒绝点"
          className="h-auto w-full rounded-card border border-border bg-surface text-primary"
        >
          <line
            x1="40"
            y1="112"
            x2="720"
            y2="112"
            stroke="currentColor"
            strokeOpacity="0.25"
          />
          {PIPELINE_STAGES.map((stage, index) => {
            const x = 18 + index * 146;
            const blocked = firstBreak === index;
            const selected = activeIndex === index;
            return (
              <g key={`${stage.label}-node-${index}`}>
                {index < PIPELINE_STAGES.length - 1 ? (
                  <path
                    d={`M ${x + 124} 112 H ${x + 140}`}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.45"
                    strokeWidth="2"
                  />
                ) : null}
                <rect
                  x={x}
                  y="58"
                  width="124"
                  height="108"
                  rx="10"
                  fill="currentColor"
                  fillOpacity={selected ? 0.14 : 0.06}
                  stroke="currentColor"
                  strokeOpacity={blocked ? 0.9 : selected ? 0.8 : 0.35}
                  strokeWidth={blocked || selected ? 2 : 1}
                />
                <circle
                  cx={x + 18}
                  cy="82"
                  r="8"
                  fill="currentColor"
                  fillOpacity={blocked ? 0.95 : selected ? 0.85 : 0.38}
                />
                <text
                  x={x + 34}
                  y="86"
                  fontSize="13"
                  fill="currentColor"
                  fontWeight="600"
                >
                  {stage.label}
                </text>
                <text x={x + 12} y="116" fontSize="12" fill="currentColor">
                  {stage.artifact}
                </text>
                <text
                  x={x + 12}
                  y="138"
                  fontSize="12"
                  fill="currentColor"
                  opacity="0.78"
                >
                  {stage.boundary}
                </text>
                <text
                  x={x + 12}
                  y="158"
                  fontSize="12"
                  fill="currentColor"
                  opacity="0.78"
                >
                  {blocked ? "首个拒绝点" : stage.signal}
                </text>
              </g>
            );
          })}
          <text
            x="20"
            y="220"
            fontSize="13"
            fill="currentColor"
            fontWeight="600"
          >
            当前检查点：{active.label}
          </text>
          <text x="20" y="244" fontSize="12" fill="currentColor" opacity="0.78">
            {failureInjected
              ? "只改变一个条件：没有测试证据，构件不能直接进入交接。"
              : "每一步都留下下一步可以复核的输入和产物。"}
          </text>
        </svg>
      </div>
    </section>
  );
}

export function Cc2eConstructionWorldActivityLab() {
  const [designShare, setDesignShare] = useState(28);
  const [testShare, setTestShare] = useState(22);
  const codingShare = Math.max(0, 100 - designShare - testShare);
  const bars = [
    ["详细设计", designShare, "text-accent"],
    ["编码", codingShare, "text-primary"],
    ["测试与集成", testShare, "text-success"],
  ] as const;

  return (
    <section
      aria-label="活动取舍交互图"
      data-visual-kind="cc2e-construction-activity"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <LabHeader
        eyebrow="1.2 软件构建为何如此重要"
        title="活动取舍：编码不是全部构建"
        description="拖动详细设计和测试与集成的比例，观察剩余时间才是编码。比例只是讨论起点，不能替代风险、质量和交接证据。"
        onReset={() => {
          setDesignShare(28);
          setTestShare(22);
        }}
      />
      <div className="grid min-w-0 gap-5 p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-5 rounded-card border border-border bg-surface p-4">
          <label className="block text-sm text-primary">
            <span className="flex justify-between gap-3">
              <span>详细设计</span>
              <span className="font-mono text-xs text-accent">
                {designShare}%
              </span>
            </span>
            <input
              type="range"
              min="10"
              max="50"
              value={designShare}
              onChange={(event) => setDesignShare(Number(event.target.value))}
              className="mdx-range mt-3 h-1 w-full cursor-pointer accent-accent"
              aria-label="详细设计比例"
            />
          </label>
          <label className="block text-sm text-primary">
            <span className="flex justify-between gap-3">
              <span>测试与集成</span>
              <span className="font-mono text-xs text-success">
                {testShare}%
              </span>
            </span>
            <input
              type="range"
              min="10"
              max="40"
              value={testShare}
              onChange={(event) => setTestShare(Number(event.target.value))}
              className="mdx-range mt-3 h-1 w-full cursor-pointer accent-accent"
              aria-label="测试与集成比例"
            />
          </label>
          <p className="border-l-2 border-warning pl-3 text-xs leading-5 text-secondary">
            当前信号：还剩 {codingShare}%
            的时间用于编码；若比例变化，却没有对应风险和证据，数字就只是装饰。
          </p>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-surface p-4">
          <svg
            viewBox="0 0 660 260"
            role="img"
            aria-label={`构建活动比例图：详细设计 ${designShare}%，编码 ${codingShare}%，测试与集成 ${testShare}%`}
            className="h-auto w-full text-primary"
          >
            <text
              x="24"
              y="28"
              fontSize="14"
              fill="currentColor"
              fontWeight="600"
            >
              同一构建窗口的活动分布
            </text>
            {bars.map(([label, value, tone], index) => {
              const y = 64 + index * 54;
              const width = value * 4.9;
              return (
                <g key={`${label}-${index}`}>
                  <text x="24" y={y + 14} fontSize="13" fill="currentColor">
                    {label}
                  </text>
                  <rect
                    x="142"
                    y={y}
                    width="490"
                    height="24"
                    rx="6"
                    fill="currentColor"
                    fillOpacity="0.08"
                  />
                  <rect
                    x="142"
                    y={y}
                    width={width}
                    height="24"
                    rx="6"
                    fill="currentColor"
                    fillOpacity={tone === "text-primary" ? 0.55 : 0.8}
                    className={tone}
                  />
                  <text
                    x={Math.min(616, 150 + width)}
                    y={y + 17}
                    fontSize="12"
                    fill="currentColor"
                  >
                    {value}%
                  </text>
                </g>
              );
            })}
            <line
              x1="142"
              y1="236"
              x2="632"
              y2="236"
              stroke="currentColor"
              strokeOpacity="0.3"
            />
            <text
              x="142"
              y="253"
              fontSize="12"
              fill="currentColor"
              opacity="0.78"
            >
              讨论重点：活动比例 → 风险反馈 → 完成定义
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

export function Cc2eConstructionWorldEvidenceLab() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = EVIDENCE_SCENARIOS[scenarioIndex];

  return (
    <section
      aria-label="构建证据交互图"
      data-visual-kind="cc2e-construction-evidence"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <LabHeader
        eyebrow="1.3 如何阅读本书 · 关键点"
        title="证据门：找到首差再交接"
        description="选择一个场景，沿着目录节点检查它在哪一步失去证据。正常输出不是终点；能定位首差、修复并重放，才是构建证据。"
        onReset={() => setScenarioIndex(0)}
      />
      <div className="min-w-0 space-y-5 p-5">
        <div className="grid gap-2 sm:grid-cols-3" aria-label="证据场景">
          {EVIDENCE_SCENARIOS.map((item, index) => (
            <button
              key={`${item.label}-${index}`}
              type="button"
              aria-pressed={scenarioIndex === index}
              onClick={() => setScenarioIndex(index)}
              className={`min-h-14 rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                scenarioIndex === index
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs leading-5 text-secondary">
                {item.summary}
              </span>
            </button>
          ))}
        </div>
        <svg
          viewBox="0 0 760 220"
          role="img"
          aria-label={`${scenario.label}的五节点证据轨迹，${scenario.firstBreak < 0 ? "全部通过" : `第${scenario.firstBreak + 1}个节点为首个偏离`}`}
          className="h-auto w-full rounded-card border border-border bg-surface text-primary"
        >
          <line
            x1="72"
            y1="88"
            x2="688"
            y2="88"
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="3"
          />
          {CHAPTER_NODES.map((node, index) => {
            const x = 72 + index * 154;
            const broken = scenario.firstBreak === index;
            const passed =
              scenario.firstBreak < 0 || index < scenario.firstBreak;
            return (
              <g key={`${node}-${index}`}>
                <circle
                  cx={x}
                  cy="88"
                  r="18"
                  fill="currentColor"
                  fillOpacity={broken ? 0.9 : passed ? 0.65 : 0.16}
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y="94"
                  textAnchor="middle"
                  fontSize="13"
                  fill="currentColor"
                  fontWeight="600"
                >
                  {index + 1}
                </text>
                <text
                  x={x}
                  y="132"
                  textAnchor="middle"
                  fontSize="12"
                  fill="currentColor"
                >
                  {node.length > 12 ? `${node.slice(0, 12)}…` : node}
                </text>
                <text
                  x={x}
                  y="154"
                  textAnchor="middle"
                  fontSize="12"
                  fill="currentColor"
                  opacity="0.78"
                >
                  {broken ? "首差" : passed ? "有证据" : "待核对"}
                </text>
              </g>
            );
          })}
          <text
            x="24"
            y="30"
            fontSize="13"
            fill="currentColor"
            fontWeight="600"
          >
            证据轨迹
          </text>
          <text x="24" y="194" fontSize="12" fill="currentColor" opacity="0.78">
            {scenario.firstBreak < 0
              ? "正常样本：五个目录节点都能指向可复核产物。"
              : `故障样本：在“${CHAPTER_NODES[scenario.firstBreak]}”处先记录偏离。`}
          </text>
        </svg>
        <div
          className="rounded-card border border-border bg-surface p-4"
          aria-live="polite"
        >
          <p className="text-xs font-semibold text-accent">修复动作</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {scenario.repair}
          </p>
        </div>
      </div>
    </section>
  );
}
