"use client";

import { useState } from "react";

const VIEW_W = 920;
const VIEW_H = 440;
const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const ACCENT = "var(--accent)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

// 这组目录节点与 fidelity-manifests.json 的 cc2e-33-personal-character 对齐。
// 图把“性格”落成可观察的行为链，不把人的品质压缩成分数或标签。
const OFFICIAL_NODES = [
  "第33章 个人性格",
  "33.1 个人性格是否和本书话题无关",
  "33.2 聪明和谦虚",
  "33.3 求知欲",
  "33.4 诚实",
  "33.5 交流与合作",
  "33.6 创造力和纪律",
  "33.7 偷懒",
  "33.8 不像你想象中那样起作用的性格",
  "矜持",
  "经验",
  "编程狂人",
  "33.9 习惯",
  "更多资源",
  "关键点",
] as const;

const NODES = [
  { label: "能力边界", detail: "承认未知", x: 104 },
  { label: "反馈学习", detail: "寻求反馈", x: 282 },
  { label: "诚实报告", detail: "记录失败", x: 460 },
  { label: "合作实践", detail: "讨论产物", x: 638 },
  { label: "习惯固化", detail: "持续复盘", x: 816 },
] as const;

type Mode = "baseline" | "humility" | "feedback" | "honesty" | "shortcut";

const MODES: readonly { id: Mode; label: string }[] = [
  { id: "baseline", label: "固定基线" },
  { id: "humility", label: "承认未知" },
  { id: "feedback", label: "寻求反馈" },
  { id: "honesty", label: "报告失败" },
  { id: "shortcut", label: "只靠经验" },
];

function modeState(mode: Mode) {
  if (mode === "humility") {
    return {
      active: 0,
      color: ACCENT,
      status: "边界变清楚：承认未知，先把假设写出来。",
      detail: "未知被显式记录后，反馈才有明确对象，经验也不再冒充证明。",
    };
  }
  if (mode === "feedback") {
    return {
      active: 1,
      color: SUCCESS,
      status: "学习发生：第二位实践者能复现并指出差异。",
      detail: "反馈必须连接到输入、观察窗口和下一次修订，而不是泛泛地说“再仔细些”。",
    };
  }
  if (mode === "honesty") {
    return {
      active: 2,
      color: WARNING,
      status: "证据保留下来：失败被报告，修订理由可追溯。",
      detail: "诚实不是自我否定，而是让团队知道当前结论的适用边界和下一步。",
    };
  }
  if (mode === "shortcut") {
    return {
      active: 0,
      color: DANGER,
      status: "首个偏离在能力边界：自信和经验没有替未知提供证据。",
      detail: "跳过假设、反馈和失败报告，会让后面的合作与习惯只是在放大误判。",
    };
  }
  return {
    active: -1,
    color: ACCENT,
    status: "基线：固定输入、版本、观察窗口和当前行为记录。",
    detail: "先预测哪一个节点会变化，再只改变一个行为条件，最后从同一基线重放。",
  };
}

export function Cc2e33PersonalCharacterLab() {
  const [mode, setMode] = useState<Mode>("baseline");
  const state = modeState(mode);
  const selectedLabel =
    MODES.find((item) => item.id === mode)?.label ?? "固定基线";

  function reset() {
    setMode("baseline");
  }

  return (
    <section
      aria-label="第33章：个人性格专属因果实验"
      data-visual-kind="cc2e-33-personal-character-habit-chain"
      data-unit-id="cc2e-33-personal-character"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第33章 · 五节点习惯链
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            性格只有变成行为，才会改变技术判断
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先固定基线，再切换一个行为条件，观察首个偏离落在哪个节点；重置后确认同一输入仍能重建轨迹。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置第33章个人性格实验"
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-5"
          aria-label="选择个人性格实验场景"
        >
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={mode === item.id}
              onClick={() => setMode(item.id)}
              className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-sm transition-colors ${
                mode === item.id
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
            aria-label={`第33章个人性格五节点习惯链，覆盖${OFFICIAL_NODES.length}个目录节点。当前场景为${selectedLabel}。${state.status}`}
            className="mx-auto block h-auto w-full min-w-[330px] max-w-[920px]"
          >
            <text x="30" y="31" fontSize="18" fontWeight="700" fill={PRIMARY}>
              能力边界 → 反馈学习 → 诚实报告 → 合作实践 → 习惯固化
            </text>
            <text x="30" y="57" fontSize="12" fill={MUTED}>
              把谦虚、求知和诚实转成别人可以观察、复现和反馈的动作
            </text>

            <path
              d="M104 190H816"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {NODES.slice(0, -1).map((node, index) => (
              <path
                key={`link-${node.label}`}
                d={`M${node.x + 58} 190H${NODES[index + 1].x - 58}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
              />
            ))}

            {NODES.map((node, index) => {
              const active = index === state.active;
              const color = active ? state.color : BORDER;
              return (
                <g key={node.label}>
                  <rect
                    x={node.x - 62}
                    y="108"
                    width="124"
                    height="164"
                    rx="14"
                    fill={SURFACE}
                    stroke={color}
                    strokeWidth={active ? 3 : 1.5}
                  />
                  <circle cx={node.x} cy="138" r="18" fill={color} />
                  <text
                    x={node.x}
                    y="143"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={SURFACE}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={node.x}
                    y="190"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill={PRIMARY}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y="220"
                    textAnchor="middle"
                    fontSize="12"
                    fill={MUTED}
                  >
                    {node.detail}
                  </text>
                  <text
                    x={node.x}
                    y="248"
                    textAnchor="middle"
                    fontSize="11"
                    fill={active ? state.color : MUTED}
                  >
                    {active ? "当前观察点" : `第 ${index + 1} 步`}
                  </text>
                </g>
              );
            })}

            <rect
              x="30"
              y="316"
              width="860"
              height="78"
              rx="12"
              fill={SURFACE}
              stroke={state.color}
              strokeWidth="1.8"
            />
            <text x="50" y="347" fontSize="13" fontWeight="700" fill={state.color}>
              {state.status}
            </text>
            <text x="50" y="375" fontSize="12" fill={MUTED}>
              记录：输入 · 版本 · 首个偏离 · 失败理由 · 重置后的同一轨迹
            </text>
          </svg>
        </div>

        <p
          role="status"
          className="mt-4 rounded-control border border-border bg-surface px-3 py-3 text-sm leading-6 text-primary"
        >
          <span className="font-semibold" style={{ color: state.color }}>
            {state.status}
          </span>{" "}
          {state.detail}
        </p>
      </div>
    </section>
  );
}
