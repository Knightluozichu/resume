"use client";

import { useState } from "react";

const VIEW_W = 880;
const VIEW_H = 310;
const ACCENT = "var(--accent)";
const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const ELEVATED = "var(--bg-elevated)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

// 视觉语料与 manifest 的 21 个目录概念保持同名，供本章的目录—证据审计逐项核对。
const OFFICIAL_NODES = [
  "第19章 一般控制问题",
  "19.1 布尔表达式",
  "用true和false做布尔判断",
  "简化复杂的表达式",
  "编写肯定形式的布尔表达式",
  "用括号使布尔表达式更清晰",
  "理解布尔表达式是如何求值的",
  "按照数轴的顺序编写数值表达式",
  "与0比较的指导原则",
  "布尔表达式的常见问题",
  "19.2 复合语句（块）",
  "19.3 空语句",
  "19.4 驯服危险的深层嵌套",
  "对减少嵌套层次的技术的总结",
  "19.5 编程基础：结构化编程",
  "结构化编程的三个组成部分",
  "19.6 控制结构与复杂度",
  "复杂度的重要性",
  "降低复杂度的一般原则",
  "其它类型的复杂度",
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

const PATH_NODES = [
  { label: "输入域", detail: "正常 / 边界 / 故障", x: 92 },
  { label: "布尔判断", detail: "命名且互斥", x: 268 },
  { label: "结构化块", detail: "边界与出口", x: 444 },
  { label: "动作顺序", detail: "副作用可追踪", x: 620 },
  { label: "重放证据", detail: "基线可恢复", x: 796 },
] as const;

function scenarioCopy(scenario: Scenario) {
  if (scenario === "boundary") {
    return {
      active: 1,
      color: WARNING,
      status: "边界：先拒绝不满足前提的输入，再进入结构化块。",
      detail: "边界样本应拥有明确归属，不能靠默认分支悄悄吞掉。",
    };
  }
  if (scenario === "fault") {
    return {
      active: 2,
      color: DANGER,
      status: "拒绝：深层出口跳过清理，路径合同不成立。",
      detail: "首个偏离在块边界：减少缩进不能替代出口责任复核。",
    };
  }
  if (scenario === "repair") {
    return {
      active: 4,
      color: SUCCESS,
      status: "通过：命名条件与统一出口让基线可以重放。",
      detail: "修复后的差异只应出现在预期节点，其余后置条件保持不变。",
    };
  }
  return {
    active: 0,
    color: ACCENT,
    status: "基线：先固定输入、状态、动作和输出，再比较控制结构。",
    detail: "控制路径不是猜测；它是可以逐边记录并复核的执行路线。",
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
      aria-label="重置实验"
      onClick={onClick}
      className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
    >
      重置实验
    </button>
  );
}

function LabShell({
  kind,
  label,
  eyebrow,
  title,
  description,
  controls,
  status,
  children,
  onReset,
}: {
  kind: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  controls: React.ReactNode;
  status: React.ReactNode;
  children: React.ReactNode;
  onReset: () => void;
}) {
  return (
    <section
      aria-label={label}
      data-visual-kind={kind}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">{title}</h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            {description}
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

export function Cc2e19GeneralControlIssuesMechanismLab() {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const copy = scenarioCopy(scenario);

  const reset = () => setScenario("baseline");

  return (
    <LabShell
      kind="cc2e-19-general-control-issues-path-contract"
      label="第19章：一般控制问题控制路径专属实验"
      eyebrow="实验一 · 控制路径"
      title="把一般控制问题画成一条可复核路径"
      description="先预测首个偏离，再切换边界或故障；最后用同一输入重放，判断结构是否真的降低了控制负担。"
      onReset={reset}
      controls={
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择控制路径场景"
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
        aria-label={`控制路径机制图：输入域、布尔判断、结构化块、动作顺序、重放证据。当前场景为${SCENARIOS.find((item) => item.id === scenario)?.label}。`}
        className="mx-auto block h-auto w-full min-w-[330px] max-w-[880px]"
      >
        <text x="28" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
          输入 → 判断 → 块 → 动作 → 重放
        </text>
        <text x="28" y="54" fontSize="12" fill={MUTED}>
          只改变一个条件，首个偏离应落在可以解释的节点
        </text>
        <path
          d="M92 166H796"
          fill="none"
          stroke={BORDER}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {PATH_NODES.slice(0, -1).map((node, index) => (
          <path
            key={`path-link-${node.label}`}
            d={`M${node.x + 58} 166H${PATH_NODES[index + 1].x - 58}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth="2"
          />
        ))}
        {PATH_NODES.map((node, index) => {
          const focused = index === copy.active;
          const color = focused ? copy.color : BORDER;
          return (
            <g key={node.label}>
              <rect
                x={node.x - 58}
                y="98"
                width="116"
                height="136"
                rx="14"
                fill={SURFACE}
                stroke={color}
                strokeWidth={focused ? 3 : 1.5}
              />
              <circle cx={node.x} cy="126" r="17" fill={color} />
              <text
                x={node.x}
                y="132"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={SURFACE}
              >
                {index + 1}
              </text>
              <text
                x={node.x}
                y="174"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={PRIMARY}
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y="199"
                textAnchor="middle"
                fontSize="12"
                fill={MUTED}
              >
                {node.detail}
              </text>
            </g>
          );
        })}
      </svg>
    </LabShell>
  );
}

type BooleanScenario = "normal" | "boundary" | "fault";

const BOOLEAN_SCENARIOS: readonly {
  id: BooleanScenario;
  label: string;
  predicate: string;
  result: string;
  color: string;
  note: string;
}[] = [
  {
    id: "normal",
    label: "正常值",
    predicate: "hasInput && isReady",
    result: "进入块",
    color: SUCCESS,
    note: "两个前提都为真，动作拥有清楚的输入合同。",
  },
  {
    id: "boundary",
    label: "恰好边界",
    predicate: "hasInput && !isReady",
    result: "早拒绝",
    color: WARNING,
    note: "边界归入拒绝路径，避免默认分支掩盖状态不完整。",
  },
  {
    id: "fault",
    label: "故障输入",
    predicate: "!hasInput && isReady",
    result: "拒绝并记录",
    color: DANGER,
    note: "输入缺失优先于动作执行，首个失败点可直接定位。",
  },
];

export function Cc2e19GeneralControlIssuesBooleanLab() {
  const [scenario, setScenario] = useState<BooleanScenario>("normal");
  const selected = BOOLEAN_SCENARIOS.find((item) => item.id === scenario)!;

  return (
    <LabShell
      kind="cc2e-19-general-control-issues-boolean-spec"
      label="第19章：一般控制问题布尔规范专属实验"
      eyebrow="实验二 · 布尔规范"
      title="用真值组合检查互斥、覆盖与短路"
      description="切换正常、边界和故障输入，观察同一个结构化块如何在明确的布尔规范下选择路径。"
      onReset={() => setScenario("normal")}
      controls={
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-3"
          aria-label="选择布尔表达式输入"
        >
          {BOOLEAN_SCENARIOS.map((item) => (
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
          <span className="font-semibold" style={{ color: selected.color }}>
            {selected.result}
          </span>{" "}
          {selected.note}
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`布尔规范图：输入前提、命名表达式、结构化块和路径结果。当前表达式为${selected.predicate}，结果为${selected.result}。`}
        className="mx-auto block h-auto w-full min-w-[330px] max-w-[880px]"
      >
        <text x="28" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
          布尔表达式的求值顺序
        </text>
        <text x="28" y="54" fontSize="12" fill={MUTED}>
          命名条件先表达意图，括号与早拒绝再固定路径边界
        </text>
        <path
          d="M110 170H770"
          fill="none"
          stroke={BORDER}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M218 170H300M420 170H502M622 170H704"
          fill="none"
          stroke={ACCENT}
          strokeWidth="2"
        />
        {[
          { x: 110, label: "输入前提", detail: selected.predicate },
          { x: 360, label: "命名条件", detail: "hasInput && isReady" },
          { x: 562, label: "结构化块", detail: "if / else" },
          { x: 770, label: "路径结果", detail: selected.result },
        ].map((node, index) => (
          <g key={node.label}>
            <rect
              x={node.x - 72}
              y="102"
              width="144"
              height="136"
              rx="14"
              fill={SURFACE}
              stroke={index === 3 ? selected.color : BORDER}
              strokeWidth={index === 3 ? 3 : 1.5}
            />
            <circle
              cx={node.x}
              cy="130"
              r="17"
              fill={index === 3 ? selected.color : ACCENT}
            />
            <text
              x={node.x}
              y="136"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={SURFACE}
            >
              {index + 1}
            </text>
            <text
              x={node.x}
              y="178"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={PRIMARY}
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y="204"
              textAnchor="middle"
              fontSize="12"
              fill={MUTED}
            >
              {node.detail}
            </text>
          </g>
        ))}
      </svg>
    </LabShell>
  );
}

type ComplexityMode = "compressed" | "named" | "expanded";

const COMPLEXITY_MODES: readonly {
  id: ComplexityMode;
  label: string;
  title: string;
  detail: string;
  color: string;
}[] = [
  {
    id: "compressed",
    label: "压缩条件",
    title: "一行混合多个职责",
    detail: "行数少，但边界与副作用顺序难以核对。",
    color: DANGER,
  },
  {
    id: "named",
    label: "命名条件",
    title: "把判断拆成职责",
    detail: "每个谓词可单独测试，默认路径也有名字。",
    color: WARNING,
  },
  {
    id: "expanded",
    label: "展开路径",
    title: "逐条标出出口",
    detail: "正常、边界和故障出口都能与后置条件对照。",
    color: SUCCESS,
  },
];

export function Cc2e19GeneralControlIssuesComplexityLab() {
  const [mode, setMode] = useState<ComplexityMode>("compressed");
  const selected = COMPLEXITY_MODES.find((item) => item.id === mode)!;

  return (
    <LabShell
      kind="cc2e-19-general-control-issues-complexity"
      label="第19章：一般控制问题复杂度专属实验"
      eyebrow="实验三 · 复杂度测量"
      title="比较嵌套外形与真正的控制负担"
      description="依次把混合条件命名、把出口展开，再复核独立路径数；压平缩进只是起点，不是完成标准。"
      onReset={() => setMode("compressed")}
      controls={
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-3"
          aria-label="选择复杂度重构方式"
        >
          {COMPLEXITY_MODES.map((item) => (
            <ToggleButton
              key={item.id}
              active={mode === item.id}
              onClick={() => setMode(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
      }
      status={
        <>
          <span className="font-semibold" style={{ color: selected.color }}>
            {selected.title}
          </span>{" "}
          {selected.detail}
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`复杂度测量图：当前模式为${selected.label}，${selected.title}。`}
        className="mx-auto block h-auto w-full min-w-[330px] max-w-[880px]"
      >
        <text x="28" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
          嵌套层次减少 ≠ 路径已经可数
        </text>
        <text x="28" y="54" fontSize="12" fill={MUTED}>
          用命名、块边界和独立出口把认知负担显性化
        </text>
        <path
          d="M110 178H770"
          fill="none"
          stroke={BORDER}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {[
          { x: 110, label: "需求", detail: "一个改变" },
          { x: 330, label: "命名", detail: "条件职责" },
          { x: 550, label: "出口", detail: "路径可数" },
          { x: 770, label: "复核", detail: "后置条件" },
        ].map((node, index) => {
          const focused =
            (mode === "compressed" && index === 0) ||
            (mode === "named" && index === 1) ||
            (mode === "expanded" && index === 2);
          return (
            <g key={node.label}>
              <rect
                x={node.x - 70}
                y="106"
                width="140"
                height="142"
                rx="14"
                fill={SURFACE}
                stroke={focused ? selected.color : BORDER}
                strokeWidth={focused ? 3 : 1.5}
              />
              <circle
                cx={node.x}
                cy="134"
                r="17"
                fill={focused ? selected.color : ACCENT}
              />
              <text
                x={node.x}
                y="140"
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
                y="210"
                textAnchor="middle"
                fontSize="12"
                fill={MUTED}
              >
                {node.detail}
              </text>
            </g>
          );
        })}
      </svg>
    </LabShell>
  );
}
