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

type Focus = "gap" | "source" | "plan" | "artifact" | "review";
type Scenario = "baseline" | "boundary" | "fault" | "repair";

const STAGES: readonly { id: Focus; label: string; detail: string }[] = [
  { id: "gap", label: "能力缺口", detail: "先说不会什么" },
  { id: "source", label: "来源选择", detail: "按主张选资料" },
  { id: "plan", label: "阅读计划", detail: "安排验证窗口" },
  { id: "artifact", label: "实践产物", detail: "把阅读变成动作" },
  { id: "review", label: "同行反馈", detail: "由别人复查" },
] as const;

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常路径" },
  { id: "boundary", label: "能力边界" },
  { id: "fault", label: "注入误区" },
  { id: "repair", label: "复位重放" },
];

function scenarioState(scenario: Scenario) {
  if (scenario === "boundary") {
    return {
      active: "source" as Focus,
      color: WARNING,
      status: "边界：资料很多，但与当前主张无关或没有版本与复核期限。",
      evidence: "保留主张、来源理由、版本、阅读窗口和待验证问题。",
      decision: "只接受能改变下一步实践的资料，不用收藏数量代替学习结果。",
    };
  }
  if (scenario === "fault") {
    return {
      active: "artifact" as Focus,
      color: DANGER,
      status: "拒绝：完成阅读清单却没有产物，同行也无法重现结论。",
      evidence: "首个偏离在实践产物：没有输入、预期输出或复查记录。",
      decision: "回退到能力缺口，删掉无关来源，并补一条可被别人复查的任务。",
    };
  }
  if (scenario === "repair") {
    return {
      active: "review" as Focus,
      color: SUCCESS,
      status: "通过：资料选择、行动产物和同行反馈形成可重放闭环。",
      evidence: "记录版本、输入、首个偏离、修订理由和复位后的同一结果。",
      decision: "接受：下一次学习从新的能力缺口开始，而不是从无尽收藏开始。",
    };
  }
  return {
    active: "gap" as Focus,
    color: ACCENT,
    status: "基线：先写能力缺口，再决定需要哪一种来源和哪一个实践动作。",
    evidence: "每个节点都要有输入、预期、实际结果和适用边界。",
    decision: "待判断：先预测改变一个决定后哪一段会先变化。",
  };
}

/** 第35章专属实验：把继续学习从资料收藏转成可审查的行动反馈链。 */
export function Cc2e35MoreInformationLab({
  focus = "gap",
}: {
  focus?: Focus;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const state = scenarioState(scenario);
  const activeIndex = STAGES.findIndex((stage) => stage.id === state.active);
  const focusIndex = STAGES.findIndex((stage) => stage.id === focus);
  const focusLabel = STAGES.find((stage) => stage.id === focus)?.label ?? "能力缺口";

  return (
    <section
      aria-label="第35章何处有更多信息专属因果实验"
      data-visual-kind="cc2e-35-more-information-learning-loop"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第35章 · 继续学习因果实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            缺口 → 来源 → 计划 → 产物 → 反馈
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            当前焦点：{focusLabel}。先预测首个偏离，再只切换一个场景；最后重置并复查同一条基线。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setScenario("baseline")}
          aria-label="重置第35章继续学习实验"
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div className="grid min-w-0 gap-3 sm:grid-cols-4" aria-label="选择继续学习实验场景">
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
            viewBox="0 0 920 430"
            role="img"
            aria-label={`继续学习五节点因果图，当前状态：${state.status}`}
            className="mx-auto block h-auto min-w-[720px] w-full max-w-[920px]"
          >
            <text x="34" y="34" fontSize="20" fontWeight="700" fill={PRIMARY}>
              资料只有进入反馈闭环才产生学习证据
            </text>
            <text x="34" y="62" fontSize="14" fill={MUTED}>
              固定版本、输入和观察窗口，只改变一个学习决定
            </text>

            <path
              d="M92 176H828"
              fill="none"
              stroke={BORDER}
              strokeWidth="10"
              strokeLinecap="round"
            />
            {STAGES.slice(0, -1).map((stage, index) => {
              const x = 92 + index * 184;
              return (
                <path
                  key={`link-${stage.id}`}
                  d={`M${x + 44} 176H${x + 140}`}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="3"
                />
              );
            })}

            {STAGES.map((stage, index) => {
              const x = 92 + index * 184;
              const selected = index === activeIndex;
              const focused = index === focusIndex;
              const color = selected ? state.color : focused ? ACCENT : BORDER;
              return (
                <g key={stage.id}>
                  <rect
                    x={x - 54}
                    y="98"
                    width="108"
                    height="160"
                    rx="14"
                    fill={selected ? state.color : SURFACE}
                    fillOpacity={selected ? 0.14 : 1}
                    stroke={color}
                    strokeWidth={selected || focused ? 3 : 1.5}
                  />
                  <circle cx={x} cy="130" r="18" fill={color} />
                  <text
                    x={x}
                    y="136"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={SURFACE}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={x}
                    y="188"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={PRIMARY}
                  >
                    {stage.label}
                  </text>
                  <text
                    x={x}
                    y="213"
                    textAnchor="middle"
                    fontSize="12"
                    fill={MUTED}
                  >
                    {stage.detail}
                  </text>
                  <text
                    x={x}
                    y="238"
                    textAnchor="middle"
                    fontSize="11"
                    fill={focused ? ACCENT : MUTED}
                  >
                    {focused ? "当前焦点" : "可复核"}
                  </text>
                </g>
              );
            })}

            <rect
              x="34"
              y="300"
              width="852"
              height="92"
              rx="12"
              fill={SURFACE}
              stroke={state.color}
              strokeWidth="2"
            />
            <text x="56" y="329" fontSize="13" fontWeight="700" fill={state.color}>
              {state.status}
            </text>
            <text x="56" y="355" fontSize="12" fill={PRIMARY}>
              证据：{state.evidence}
            </text>
            <text x="56" y="378" fontSize="12" fill={MUTED}>
              裁决：{state.decision}
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
