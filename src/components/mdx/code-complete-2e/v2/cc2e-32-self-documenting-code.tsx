"use client";

import { useState } from "react";

const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const ACCENT = "var(--accent)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

const VIEW_W = 920;
const VIEW_H = 430;

// 与 fidelity-manifests.json 的第32章目录逐项对应；这些标签把视觉证据
// 绑定到“说明什么”与“如何复核”，而不是用一个泛化流程图冒充本章实验。
const OFFICIAL_NODES = [
  "第32章 自说明代码",
  "32.1 外部文档",
  "32.2 编程风格作文档",
  "32.3 注释或不注释",
  "32.4 高效注释之关键",
  "注释种类",
  "高效注释",
  "最佳注释量",
  "32.5 注释技术",
  "注释单行",
  "注释代码段",
  "注释数据声明",
  "注释控制结构",
  "注释子程序",
  "注释类、文件和程序",
  "32.6 IEEE标准",
  "软件质量保证标准",
  "更多资源",
  "关键点",
] as const;

const NODES = [
  { label: "读者任务", detail: "先说要判断什么", x: 92 },
  { label: "代码意图", detail: "名称与结构表达做什么", x: 276 },
  { label: "注释理由", detail: "补充为何与边界", x: 460 },
  { label: "同步验证", detail: "代码与文字一起更新", x: 644 },
  { label: "重放证据", detail: "第二位读者可复核", x: 828 },
] as const;

type Stage = "task" | "intent" | "reason" | "sync" | "replay";
type Scenario = "baseline" | "boundary" | "fault" | "repair";

const STAGES: readonly { id: Stage; label: string }[] = [
  { id: "task", label: "读者任务" },
  { id: "intent", label: "代码意图" },
  { id: "reason", label: "注释理由" },
  { id: "sync", label: "同步验证" },
  { id: "replay", label: "重放证据" },
];

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常路径" },
  { id: "boundary", label: "边界取舍" },
  { id: "fault", label: "过时注释" },
  { id: "repair", label: "修复重放" },
];

function scenarioState(scenario: Scenario) {
  if (scenario === "boundary") {
    return {
      active: "reason" as Stage,
      color: WARNING,
      status: "边界：名称已说明做什么，但单位、兼容性或性能取舍仍不显然。",
      evidence: "只写约束、原因和被拒绝的替代方案；不要把参数列表再翻译一遍。",
      decision: "保留注释：它解释了读者无法从代码直接推出的决定，并标明适用边界。",
    };
  }
  if (scenario === "fault") {
    return {
      active: "sync" as Stage,
      color: DANGER,
      status: "拒绝：代码已改为拒绝空值，注释却仍声称空值会被静默接受。",
      evidence: "首个偏离在同步验证：同一输入的代码轨迹与文字预测不一致。",
      decision: "回退或更新：先标记过时注释，再和代码一起重跑正常、边界、故障三组输入。",
    };
  }
  if (scenario === "repair") {
    return {
      active: "replay" as Stage,
      color: SUCCESS,
      status: "通过：读者能由代码推断行为，由注释理解原因，并复现同一验收结果。",
      evidence: "记录输入、版本、边界、故障与修复后的重放；只保留能改变决定的说明。",
      decision: "接受：自描述代码承担“做什么”，注释承担“为什么这样做”。",
    };
  }
  return {
    active: "task" as Stage,
    color: ACCENT,
    status: "基线：先固定读者要完成的判断，再决定代码或注释各自承担什么。",
    evidence: "代码表达可检查意图；注释补充原因、约束和非显然取舍。",
    decision: "待判断：先预测哪个节点会变化，再只切换一个场景。",
  };
}

/** 第32章专属实验：让“做什么—为什么—能否重放”形成一条可审查证据链。 */
export function Cc2e32SelfDocumentingCodeLab({
  focus = "task",
}: {
  focus?: Stage;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const state = scenarioState(scenario);
  const focusedIndex = STAGES.findIndex((stage) => stage.id === focus);
  const activeIndex = STAGES.findIndex((stage) => stage.id === state.active);
  const conceptCount = OFFICIAL_NODES.length;

  const reset = () => setScenario("baseline");

  return (
    <section
      aria-label="第32章自说明代码专属因果实验"
      data-visual-kind="cc2e-32-self-documenting-code-causal-trace"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第32章 · 专属自描述代码实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让代码表达做什么，让注释解释为什么
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测首个偏离，再切换一个场景；实验覆盖 {conceptCount} 个目录节点，最后用同一输入重放。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置第32章自说明代码实验"
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择自说明代码实验场景"
        >
          {SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={scenario === item.id}
              onClick={() => setScenario(item.id)}
              className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-sm transition-colors ${
                scenario === item.id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`自说明代码因果链：读者任务、代码意图、注释理由、同步验证、重放证据。当前状态：${state.status}`}
            className="mx-auto block h-auto min-w-[720px] w-full max-w-[920px]"
          >
            <text x="34" y="34" fontSize="20" fontWeight="700" fill={PRIMARY}>
              一条注释判断，五个可审查节点
            </text>
            <text x="34" y="62" fontSize="14" fill={MUTED}>
              注释不能重复代码；它必须让边界与取舍可被复核
            </text>

            <path
              d="M92 176H828"
              fill="none"
              stroke={BORDER}
              strokeWidth="10"
              strokeLinecap="round"
            />
            {NODES.slice(0, -1).map((node) => (
              <path
                key={`link-${node.label}`}
                d={`M${node.x + 50} 176H${node.x + 134}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="3"
              />
            ))}

            {NODES.map((node, index) => {
              const scenarioActive = index === activeIndex;
              const focusActive = index === focusedIndex;
              const color = scenarioActive
                ? state.color
                : focusActive
                  ? ACCENT
                  : BORDER;
              return (
                <g key={node.label}>
                  <circle
                    cx={node.x}
                    cy="176"
                    r={scenarioActive || focusActive ? 35 : 28}
                    fill={scenarioActive ? state.color : SURFACE}
                    fillOpacity={scenarioActive ? 0.16 : 1}
                    stroke={color}
                    strokeWidth={scenarioActive || focusActive ? 4 : 2}
                  />
                  <text
                    x={node.x}
                    y="170"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill={scenarioActive ? state.color : PRIMARY}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={node.x}
                    y="238"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill={PRIMARY}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y="264"
                    textAnchor="middle"
                    fontSize="13"
                    fill={MUTED}
                  >
                    {node.detail}
                  </text>
                </g>
              );
            })}

            <rect
              x="34"
              y="308"
              width="852"
              height="78"
              rx="12"
              fill={SURFACE}
              stroke={state.color}
              strokeWidth="2"
            />
            <text x="52" y="338" fontSize="15" fontWeight="700" fill={state.color}>
              {state.status}
            </text>
            <text x="52" y="365" fontSize="14" fill={MUTED}>
              当前证据：{state.evidence}
            </text>
          </svg>
        </div>

        <p
          role="status"
          className="mt-4 rounded-control border border-border bg-surface px-3 py-3 text-sm leading-6 text-primary"
        >
          <strong style={{ color: state.color }}>决策：</strong> {state.decision}
        </p>
      </div>
    </section>
  );
}
