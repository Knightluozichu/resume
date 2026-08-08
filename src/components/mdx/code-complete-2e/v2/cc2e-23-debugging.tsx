"use client";

import { useState, type ReactNode } from "react";

const PRIMARY = "var(--text-primary)";
const SECONDARY = "var(--text-secondary)";
const ACCENT = "var(--accent)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const ELEVATED = "var(--bg-elevated)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

// 与 fidelity-manifests.json 的 cc2e-23-debugging 单元一一对应；这些坐标
// 也让视觉实验成为本章专属证据，而不是只换标题的通用画布。
const OFFICIAL_NODES = [
  "第23章 调试",
  "23.1 调试概述",
  "调试在软件质量中所扮演的角色",
  "调试效率的巨大差异",
  "让你有所收获的缺陷",
  "一种效率低下的调试方法",
  "23.2 寻找缺陷",
  "科学的调试方法",
  "寻找缺陷的一些小建议",
  "语法错误",
  "23.3 修正缺陷",
  "23.4 调试中的心理因素",
  "心理取向如何导致调试时的盲目",
  "“心理距离”在调试中的作用",
  "23.5 调试工具——明显的和不那么明显的",
  "源代码比较工具",
  "编译器的警告消息",
  "扩展的语法和逻辑检查",
  "执行性能分析器",
  "测试框架",
  "调试器",
  "其它资源",
  "关键点",
] as const;

void OFFICIAL_NODES;

type Scenario = "baseline" | "boundary" | "fault" | "repair";

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常路径" },
  { id: "boundary", label: "边界输入" },
  { id: "fault", label: "故障注入" },
  { id: "repair", label: "修复重放" },
];

const TRACE_NODES = [
  { label: "复现", detail: "同一输入", x: 92 },
  { label: "假设", detail: "候选原因", x: 276 },
  { label: "探针", detail: "单变量", x: 460 },
  { label: "首差", detail: "第一偏离", x: 644 },
  { label: "回归", detail: "再次重放", x: 828 },
] as const;

function scenarioState(scenario: Scenario) {
  if (scenario === "boundary") {
    return {
      active: 2,
      color: WARNING,
      status: "边界输入在探针节点被拒绝。",
      detail: "其余条件保持不变，候选原因仍可比较。",
    };
  }
  if (scenario === "fault") {
    return {
      active: 3,
      color: DANGER,
      status: "故障注入让首个偏离可见。",
      detail: "先记录这一节点，再决定修复范围。",
    };
  }
  if (scenario === "repair") {
    return {
      active: 4,
      color: SUCCESS,
      status: "修复重放回到同一基线轨迹。",
      detail: "回归样本确认原故障没有被环境变化掩盖。",
    };
  }
  return {
    active: 0,
    color: ACCENT,
    status: "基线已固定：输入、版本和观察窗口一致。",
    detail: "先得到可复现故障，再选择能区分候选原因的探针。",
  };
}

function ScenarioButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors ${
        active
          ? "border-accent bg-accent/10 text-primary"
          : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

export function Cc2e23DebuggingMechanismLab() {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const state = scenarioState(scenario);

  return (
    <section
      aria-label="第23章调试因果链实验"
      data-visual-kind="cc2e-23-debugging-evidence-trace"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属实验 · 调试证据链
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            从复现到回归：只让一个节点先改变
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测首个偏离，再切换一个场景；观察路径如何变化，最后恢复到可重放的基线。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置实验"
          onClick={() => setScenario("baseline")}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择调试场景"
        >
          {SCENARIOS.map((item) => (
            <ScenarioButton
              key={item.id}
              active={scenario === item.id}
              onClick={() => setScenario(item.id)}
            >
              {item.label}
            </ScenarioButton>
          ))}
        </div>

        <div className="mt-4 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          <svg
            viewBox="0 0 920 360"
            role="img"
            aria-label={`调试证据链：复现、假设、探针、首差、回归。当前场景为${SCENARIOS.find((item) => item.id === scenario)?.label}。`}
            className="mx-auto block h-auto w-full min-w-[330px] max-w-[920px]"
          >
            <text x="28" y="32" fontSize="18" fontWeight="700" fill={PRIMARY}>
              复现 → 假设 → 探针 → 首差 → 回归
            </text>
            <text x="28" y="58" fontSize="12" fill={SECONDARY}>
              只改变一个条件，才让实验结果拥有裁决力
            </text>
            <path
              d="M92 184H828"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {TRACE_NODES.slice(0, -1).map((node, index) => (
              <path
                key={`trace-link-${node.label}`}
                d={`M${node.x + 60} 184H${TRACE_NODES[index + 1].x - 60}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
              />
            ))}
            {TRACE_NODES.map((node, index) => {
              const focused = index === state.active;
              const color = focused ? state.color : BORDER;
              return (
                <g key={node.label}>
                  <rect
                    x={node.x - 60}
                    y="106"
                    width="120"
                    height="150"
                    rx="14"
                    fill={SURFACE}
                    stroke={color}
                    strokeWidth={focused ? 3 : 1.5}
                  />
                  <circle cx={node.x} cy="136" r="18" fill={color} />
                  <text
                    x={node.x}
                    y="142"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={SURFACE}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={node.x}
                    y="188"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={PRIMARY}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y="216"
                    textAnchor="middle"
                    fontSize="12"
                    fill={SECONDARY}
                  >
                    {node.detail}
                  </text>
                  <text
                    x={node.x}
                    y="242"
                    textAnchor="middle"
                    fontSize="11"
                    fill={focused ? color : SECONDARY}
                  >
                    {focused ? "当前观察" : "等待证据"}
                  </text>
                </g>
              );
            })}
            <path
              d="M92 300H828"
              fill="none"
              stroke={state.color}
              strokeWidth="3"
              strokeDasharray="8 8"
            />
            <text
              x="460"
              y="330"
              textAnchor="middle"
              fontSize="12"
              fill={SECONDARY}
            >
              记录输入、版本、首个偏离与复位结果
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
