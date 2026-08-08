"use client";

import { useState, type ReactNode } from "react";

const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const ACCENT = "var(--accent)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

const VIEW_W = 880;
const VIEW_H = 330;

// 与 fidelity-manifests.json 的第21章正式目录保持同名，供逐节点视觉证据核对。
const OFFICIAL_NODES = [
  "第21章 协同构造",
  "21.1 协同开发实践概要",
  "协同构造是其他质量保证技术的补充",
  "协同构造有利于传授公司文化以及编程专业知识",
  "集体所有权适用于所有形式的协同构造",
  "在构造前后都应保持协作",
  "21.2 结对编程",
  "成功运用结对编程的关键",
  "结对编程的好处",
  "21.3 正式检查",
  "你期望检查能够带来什么结果",
  "检查中的人员角色",
  "检查的一般步骤",
  "检查中的自尊心",
  "检查和代码大全",
  "检查总结",
  "21.4 其他类型的协同开发实践",
  "走查",
  "代码阅读",
  "大型演示",
  "协同构造技术的比较",
  "参考资料",
  "结对编程",
  "检查",
  "相关标准",
  "关键点",
] as const;

void OFFICIAL_NODES;

type ButtonProps = {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
};

function ChoiceButton({ active, children, onClick }: ButtonProps) {
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
  controls: ReactNode;
  status: ReactNode;
  children: ReactNode;
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

type PracticeScenario = "baseline" | "boundary" | "fault" | "repair";

const PRACTICE_SCENARIOS: readonly {
  id: PracticeScenario;
  label: string;
}[] = [
  { id: "baseline", label: "正常路径" },
  { id: "boundary", label: "边界准备" },
  { id: "fault", label: "记录缺失" },
  { id: "repair", label: "修复重放" },
];

const PRACTICE_NODES = [
  { label: "个人产物", detail: "版本与检查对象", x: 92 },
  { label: "同伴准备", detail: "清单与角色", x: 268 },
  { label: "协同检查", detail: "证据与问题", x: 444 },
  { label: "缺陷记录", detail: "位置与责任", x: 620 },
  { label: "团队学习", detail: "修订与重放", x: 796 },
] as const;

function practiceCopy(scenario: PracticeScenario) {
  if (scenario === "boundary") {
    return {
      active: 1,
      color: WARNING,
      status: "边界：同伴准备先确认版本、范围和角色。",
      detail: "准备不完整时先拒绝比较，不能把遗漏算成“没有缺陷”。",
    };
  }
  if (scenario === "fault") {
    return {
      active: 3,
      color: DANGER,
      status: "偏离：发现了问题，却没有把位置、影响和责任写入缺陷记录。",
      detail: "首个分叉在记录节点；没有记录就无法进入团队学习。",
    };
  }
  if (scenario === "repair") {
    return {
      active: 4,
      color: SUCCESS,
      status: "通过：修订后用同一输入重放，五个节点回到可解释轨迹。",
      detail: "共同责任落在产物和证据上，而不是落在某个作者身上。",
    };
  }
  return {
    active: 0,
    color: ACCENT,
    status: "基线：先固定产物、角色、输入和观察窗口，再比较协作方式。",
    detail: "协同构造的结果必须能沿节点回放，而不是只留下一个结论。",
  };
}

export function Cc2e21CollaborativeConstructionPracticeLab() {
  const [scenario, setScenario] = useState<PracticeScenario>("baseline");
  const copy = practiceCopy(scenario);

  return (
    <LabShell
      kind="cc2e-21-collaborative-construction-practice-trace"
      label="第21章：协同构造实践组合实验"
      eyebrow="实验一 · 实践组合"
      title="把协作从口号变成可追踪的五个节点"
      description="先预测首个偏离，再切换边界或记录故障；最后用同一输入重放，检查团队学习是否真的发生。"
      onReset={() => setScenario("baseline")}
      controls={
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择实践组合场景"
        >
          {PRACTICE_SCENARIOS.map((item) => (
            <ChoiceButton
              key={item.id}
              active={scenario === item.id}
              onClick={() => setScenario(item.id)}
            >
              {item.label}
            </ChoiceButton>
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
        aria-label={`实践组合实验图：个人产物、同伴准备、协同检查、缺陷记录、团队学习。当前场景为${PRACTICE_SCENARIOS.find((item) => item.id === scenario)?.label}。`}
        className="mx-auto block h-auto min-w-[680px] w-full max-w-[880px]"
      >
        <text x="28" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
          产物 → 准备 → 检查 → 记录 → 学习
        </text>
        <text x="28" y="54" fontSize="12" fill={MUTED}>
          每个节点都有输入、输出和可复核的责任边界
        </text>
        <path
          d="M92 170H796"
          fill="none"
          stroke={BORDER}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {PRACTICE_NODES.slice(0, -1).map((node, index) => (
          <path
            key={`practice-link-${node.label}`}
            d={`M${node.x + 58} 170H${PRACTICE_NODES[index + 1].x - 58}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth="2"
          />
        ))}
        {PRACTICE_NODES.map((node, index) => {
          const focused = index === copy.active;
          const color = focused ? copy.color : BORDER;
          return (
            <g key={node.label}>
              <rect
                x={node.x - 58}
                y="102"
                width="116"
                height="136"
                rx="14"
                fill={SURFACE}
                stroke={color}
                strokeWidth={focused ? 3 : 1.5}
              />
              <circle cx={node.x} cy="130" r="17" fill={color} />
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
                y="180"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={PRIMARY}
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y="207"
                textAnchor="middle"
                fontSize="12"
                fill={MUTED}
              >
                {node.detail}
              </text>
            </g>
          );
        })}
        <text x="28" y="290" fontSize="12" fill={copy.color}>
          {copy.status}
        </text>
      </svg>
    </LabShell>
  );
}

type InspectionMode = "pair" | "walkthrough" | "inspection" | "demo";

const INSPECTION_MODES: readonly {
  id: InspectionMode;
  label: string;
  color: string;
  detail: string;
}[] = [
  {
    id: "pair",
    label: "结对编程",
    color: ACCENT,
    detail: "即时交换角色，边做边问",
  },
  {
    id: "walkthrough",
    label: "走查",
    color: WARNING,
    detail: "公开走过产物，现场澄清",
  },
  {
    id: "inspection",
    label: "正式检查",
    color: SUCCESS,
    detail: "准备、独立检查、记录",
  },
  {
    id: "demo",
    label: "大型演示",
    color: DANGER,
    detail: "公开展示，收集外部问题",
  },
];

const INSPECTION_NODES = [
  { label: "准备", detail: "范围 / 角色", x: 92 },
  { label: "独立检查", detail: "各自找证据", x: 268 },
  { label: "汇总问题", detail: "只谈产物", x: 444 },
  { label: "修订责任", detail: "谁改 / 谁复核", x: 620 },
  { label: "复位重放", detail: "同输入再跑", x: 796 },
] as const;

export function Cc2e21CollaborativeConstructionInspectionLab() {
  const [mode, setMode] = useState<InspectionMode>("inspection");
  const selected =
    INSPECTION_MODES.find((item) => item.id === mode) ?? INSPECTION_MODES[2];
  const active =
    mode === "pair"
      ? 1
      : mode === "walkthrough"
        ? 2
        : mode === "inspection"
          ? 3
          : 0;

  return (
    <LabShell
      kind="cc2e-21-collaborative-construction-inspection-evidence"
      label="第21章：协同构造正式检查实验"
      eyebrow="实验二 · 正式检查"
      title="选择方法，观察独立证据在哪里出现"
      description="方法不是标签游戏：切换协作方式，检查它改变了准备、独立检查、汇总、责任还是复位的哪一个节点。"
      onReset={() => setMode("inspection")}
      controls={
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择协作方法"
        >
          {INSPECTION_MODES.map((item) => (
            <ChoiceButton
              key={item.id}
              active={mode === item.id}
              onClick={() => setMode(item.id)}
            >
              {item.label}
            </ChoiceButton>
          ))}
        </div>
      }
      status={
        <>
          <span className="font-semibold" style={{ color: selected.color }}>
            {selected.label}：{selected.detail}。
          </span>{" "}
          {mode === "inspection"
            ? "正式检查要把准备、角色、检查清单、记录和复核都留下。"
            : "不要把这种方法的即时反馈误报成独立检查证据。"}
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`协同方法证据图：准备、独立检查、汇总问题、修订责任、复位重放。当前方法为${selected.label}。`}
        className="mx-auto block h-auto min-w-[680px] w-full max-w-[880px]"
      >
        <text x="28" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
          角色 → 证据 → 责任 → 重放
        </text>
        <text x="28" y="54" fontSize="12" fill={MUTED}>
          方法不同，能留下的反馈速度与独立性也不同
        </text>
        <path
          d="M92 170H796"
          fill="none"
          stroke={BORDER}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {INSPECTION_NODES.slice(0, -1).map((node, index) => (
          <path
            key={`inspection-link-${node.label}`}
            d={`M${node.x + 58} 170H${INSPECTION_NODES[index + 1].x - 58}`}
            fill="none"
            stroke={selected.color}
            strokeWidth="2"
          />
        ))}
        {INSPECTION_NODES.map((node, index) => {
          const focused = index === active;
          const color = focused ? selected.color : BORDER;
          return (
            <g key={node.label}>
              <rect
                x={node.x - 58}
                y="102"
                width="116"
                height="136"
                rx="14"
                fill={SURFACE}
                stroke={color}
                strokeWidth={focused ? 3 : 1.5}
              />
              <circle cx={node.x} cy="130" r="17" fill={color} />
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
                y="180"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={PRIMARY}
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y="207"
                textAnchor="middle"
                fontSize="12"
                fill={MUTED}
              >
                {node.detail}
              </text>
            </g>
          );
        })}
        <text x="28" y="290" fontSize="12" fill={selected.color}>
          当前聚焦：{INSPECTION_NODES[active].label}；方法：{selected.label}
        </text>
      </svg>
    </LabShell>
  );
}

type ComparisonMethod =
  | "pair"
  | "inspection"
  | "walkthrough"
  | "reading"
  | "demo";

const COMPARISON_METHODS: readonly {
  id: ComparisonMethod;
  label: string;
  focus: string;
  evidence: string;
  color: string;
}[] = [
  {
    id: "pair",
    label: "结对编程",
    focus: "即时反馈",
    evidence: "角色交换与现场解释",
    color: ACCENT,
  },
  {
    id: "inspection",
    label: "检查",
    focus: "独立发现",
    evidence: "清单、缺陷记录与复核",
    color: SUCCESS,
  },
  {
    id: "walkthrough",
    label: "走查",
    focus: "公开澄清",
    evidence: "逐段说明与问题列表",
    color: WARNING,
  },
  {
    id: "reading",
    label: "代码阅读",
    focus: "异步理解",
    evidence: "阅读路径与疑问记录",
    color: "#8B7CF6",
  },
  {
    id: "demo",
    label: "大型演示",
    focus: "外部反馈",
    evidence: "场景、提问与后续责任",
    color: DANGER,
  },
];

export function Cc2e21CollaborativeConstructionComparisonLab() {
  const [method, setMethod] = useState<ComparisonMethod>("inspection");
  const selected =
    COMPARISON_METHODS.find((item) => item.id === method) ??
    COMPARISON_METHODS[1];

  return (
    <LabShell
      kind="cc2e-21-collaborative-construction-method-comparison"
      label="第21章：协同构造技术比较实验"
      eyebrow="实验三 · 技术比较"
      title="比较证据轨迹，而不是比较平均分"
      description="同一产物、同一输入、同一观察窗口下切换方法，记录它更擅长产生什么证据，以及它不能替代什么。"
      onReset={() => setMethod("inspection")}
      controls={
        <div className="flex min-w-0 flex-wrap gap-3" aria-label="选择比较方法">
          {COMPARISON_METHODS.map((item) => (
            <ChoiceButton
              key={item.id}
              active={method === item.id}
              onClick={() => setMethod(item.id)}
            >
              {item.label}
            </ChoiceButton>
          ))}
        </div>
      }
      status={
        <>
          <span className="font-semibold" style={{ color: selected.color }}>
            {selected.label}：{selected.focus}。
          </span>{" "}
          它留下的主要证据是“{selected.evidence}
          ”；方法互补，不能用一个平均数字替代边界与缺陷记录。
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`协同构造技术比较图：当前方法${selected.label}，关注${selected.focus}，证据为${selected.evidence}。`}
        className="mx-auto block h-auto min-w-[680px] w-full max-w-[880px]"
      >
        <text x="28" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
          同一产物，不同证据轨迹
        </text>
        <text x="28" y="54" fontSize="12" fill={MUTED}>
          结对、检查、走查、代码阅读和大型演示各自补上不同盲区
        </text>
        {COMPARISON_METHODS.map((item, index) => {
          const selectedRow = item.id === method;
          const y = 82 + index * 44;
          return (
            <g key={item.id}>
              <rect
                x="28"
                y={y}
                width="824"
                height="32"
                rx="8"
                fill={selectedRow ? `${item.color}22` : SURFACE}
                stroke={selectedRow ? item.color : BORDER}
                strokeWidth={selectedRow ? 2.5 : 1}
              />
              <text
                x="44"
                y={y + 21}
                fontSize="13"
                fontWeight="700"
                fill={selectedRow ? item.color : PRIMARY}
              >
                {item.label}
              </text>
              <text x="218" y={y + 21} fontSize="12" fill={MUTED}>
                {item.focus}
              </text>
              <text x="390" y={y + 21} fontSize="12" fill={PRIMARY}>
                {item.evidence}
              </text>
              <text
                x="810"
                y={y + 21}
                textAnchor="end"
                fontSize="12"
                fill={selectedRow ? item.color : MUTED}
              >
                {selectedRow ? "当前" : "可互补"}
              </text>
            </g>
          );
        })}
        <text x="28" y="316" fontSize="12" fill={selected.color}>
          验收：首个偏离可定位，修复后可用同一输入重放，重置后回到基线。
        </text>
      </svg>
    </LabShell>
  );
}
