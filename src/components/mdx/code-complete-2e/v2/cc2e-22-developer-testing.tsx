"use client";

import { useState } from "react";

const VIEW_W = 880;
const VIEW_H = 340;
const ACCENT = "var(--accent)";
const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const ELEVATED = "var(--bg-elevated)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

type Scenario = "baseline" | "boundary" | "fault" | "regression";

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常用例" },
  { id: "boundary", label: "恰好边界" },
  { id: "fault", label: "故障注入" },
  { id: "regression", label: "回归重放" },
];

const NODES = [
  { label: "输入域", detail: "正常 / 边界 / 错误", x: 92 },
  { label: "用例设计", detail: "预言与等价类", x: 268 },
  { label: "测试脚手架", detail: "隔离 / 清理", x: 444 },
  { label: "故障断言", detail: "首个偏离", x: 620 },
  { label: "回归记录", detail: "同输入重放", x: 796 },
] as const;

function scenarioCopy(scenario: Scenario) {
  if (scenario === "boundary") {
    return {
      active: 0,
      color: WARNING,
      status: "边界：样本被明确分到拒绝路径。",
      detail: "恰好边界不是“差不多正常”，它应有自己的预言和断言。",
    };
  }
  if (scenario === "fault") {
    return {
      active: 2,
      color: DANGER,
      status: "变红：故障被注入，断言在首个偏离处拒绝。",
      detail: "若只看到最终输出，无法判断是代码、数据还是脚手架先出错。",
    };
  }
  if (scenario === "regression") {
    return {
      active: 4,
      color: SUCCESS,
      status: "通过：重置后同一输入重放出同一基线。",
      detail: "修复改变了预期故障节点，旧用例的输入、状态和结果仍然稳定。",
    };
  }
  return {
    active: 1,
    color: ACCENT,
    status: "基线：先把输入、预言和隔离边界固定下来。",
    detail: "好的测试从可检验预期开始，而不是从“这次命令通过了”开始。",
  };
}

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
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

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="重置开发者测试实验"
      onClick={onClick}
      className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
    >
      重置实验
    </button>
  );
}

function LabShell({
  controls,
  status,
  children,
  onReset,
}: {
  controls: React.ReactNode;
  status: React.ReactNode;
  children: React.ReactNode;
  onReset: () => void;
}) {
  return (
    <section
      aria-label="第22章：开发者测试专属机制实验"
      data-visual-kind="cc2e-22-developer-testing-test-contract"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属实验 · 测试合同
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让测试从“会通过”变成“能暴露指定故障”
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            切换一个直接条件，观察首个偏离落在哪个节点；重置后用同一输入重放，检查测试合同是否仍然成立。
          </p>
        </div>
        <ResetButton onClick={onReset} />
      </header>
      <div className="min-w-0 p-5">
        {controls}
        <div className="mt-4 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          {children}
        </div>
        <p
          role="status"
          className="mt-4 rounded-control border border-border bg-surface px-3 py-3 text-sm leading-6 text-primary"
        >
          {status}
        </p>
      </div>
    </section>
  );
}

export function Cc2e22DeveloperTestingMechanismLab() {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const copy = scenarioCopy(scenario);
  const selectedLabel =
    SCENARIOS.find((item) => item.id === scenario)?.label ?? "正常用例";

  return (
    <LabShell
      onReset={() => setScenario("baseline")}
      controls={
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择开发者测试场景"
        >
          {SCENARIOS.map((item) => (
            <ToggleButton
              key={item.id}
              active={scenario === item.id}
              onClick={() => setScenario(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
      }
      status={
        <>
          <span className="font-semibold" style={{ color: copy.color }}>
            {copy.status}
          </span>{" "}
          {copy.detail}
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`开发者测试机制图：输入域、用例设计、测试脚手架、故障断言和回归记录五个节点。当前场景为${selectedLabel}。`}
        className="mx-auto block h-auto w-full min-w-[330px] max-w-[880px]"
      >
        <text x="28" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
          输入 → 预言 → 隔离 → 断言 → 重放
        </text>
        <text x="28" y="55" fontSize="12" fill={MUTED}>
          一次只改变一个条件，首个偏离才有可解释的位置
        </text>
        <path
          d="M92 177H796"
          fill="none"
          stroke={BORDER}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {NODES.slice(0, -1).map((node, index) => (
          <path
            key={`link-${node.label}`}
            d={`M${node.x + 58} 177H${NODES[index + 1].x - 58}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth="2"
          />
        ))}
        {NODES.map((node, index) => {
          const focused = index === copy.active;
          const color = focused ? copy.color : BORDER;
          return (
            <g key={node.label}>
              <rect
                x={node.x - 58}
                y="104"
                width="116"
                height="146"
                rx="14"
                fill={SURFACE}
                stroke={color}
                strokeWidth={focused ? 3 : 1.5}
              />
              <circle cx={node.x} cy="132" r="18" fill={color} />
              <text
                x={node.x}
                y="138"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={SURFACE}
              >
                {index + 1}
              </text>
              <text
                x={node.x}
                y="184"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={PRIMARY}
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y="209"
                textAnchor="middle"
                fontSize="12"
                fill={MUTED}
              >
                {node.detail}
              </text>
              {focused ? (
                <text
                  x={node.x}
                  y="278"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={copy.color}
                >
                  首个观察点
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </LabShell>
  );
}
