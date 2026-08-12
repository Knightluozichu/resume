"use client";

import { useMemo, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 880;
const VIEW_H = 520;
const T = TEACHING_BEAT_MS;

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type Phase = "trap" | "kernel" | "context" | "schedule" | "deliver" | "resume";
type Scenario = "normal" | "zombie" | "race";

const CONCEPTS = [
  "第8章 异常控制流",
  "8.1 异常",
  "8.1.1 异常处理",
  "8.1.2 异常的类别",
  "8.1.3 Linux/x86-64系统中的异常",
  "8.2 进程",
  "8.2.1 逻辑控制流",
  "8.2.2 并发流",
  "8.2.3 私有地址空间",
  "8.2.4 用户模式和内核模式",
  "8.2.5 上下文切换",
  "8.3 系统调用错误处理",
  "8.4 进程控制",
  "8.4.1 获取进程ID",
  "8.4.2 创建和终止进程",
  "8.4.3 回收子进程",
  "8.4.4 让进程休眠",
  "8.4.5 加载并运行程序",
  "8.4.6 利用fork和execve运行程序",
  "8.5 信号",
  "8.5.1 信号术语",
  "8.5.2 发送信号",
  "8.5.3 接收信号",
  "8.5.4 阻塞和解除阻塞信号",
  "8.5.5 编写信号处理程序",
  "8.5.6 同步流以避免讨厌的并发错误",
  "8.5.7 显式地等待信号",
  "8.6 非本地跳转",
  "8.7 操作进程的工具",
  "8.8 小结",
] as const;

const PHASES: readonly {
  id: Phase;
  label: string;
  focus: string;
  evidence: string;
}[] = [
  {
    id: "trap",
    label: "触发异常",
    focus: "事件 → 入口",
    evidence: "硬件或软件事件把控制权交给受保护的入口。",
  },
  {
    id: "kernel",
    label: "进入内核",
    focus: "权限 → 处理例程",
    evidence: "内核依据向量、权限和错误码选择处理路径。",
  },
  {
    id: "context",
    label: "保存上下文",
    focus: "PC / 寄存器 / 掩码",
    evidence: "返回所需的程序计数器、寄存器和信号状态被保存。",
  },
  {
    id: "schedule",
    label: "调度逻辑流",
    focus: "父进程 ↔ 子进程",
    evidence: "调度器在可运行流之间切换，私有地址空间仍保持隔离。",
  },
  {
    id: "deliver",
    label: "递送信号",
    focus: "pending / blocked / handler",
    evidence: "信号在阻塞集合允许时递送，处理器获得受控入口。",
  },
  {
    id: "resume",
    label: "恢复或终止",
    focus: "返回 / exit / reap",
    evidence: "流恢复、执行 execve，或终止并由父进程回收。",
  },
] as const;

const SCENARIOS: readonly {
  id: Scenario;
  label: string;
  result: string;
  detail: string;
}[] = [
  {
    id: "normal",
    label: "正常返回",
    result: "上下文闭合",
    detail: "处理器返回原逻辑流，子进程退出状态已被父进程读取。",
  },
  {
    id: "zombie",
    label: "未回收子进程",
    result: "僵尸残留",
    detail: "子进程已终止但退出状态未被 wait 类调用取得。",
  },
  {
    id: "race",
    label: "信号竞争",
    result: "共享状态冲突",
    detail: "主流程与处理器交错修改同一状态，阻塞窗口不足以保护契约。",
  },
] as const;

const NODES: readonly {
  id: string;
  label: string;
  artifact: string;
  x: number;
  y: number;
}[] = [
  { id: "user", label: "用户流", artifact: "PC=0x401", x: 28, y: 132 },
  { id: "cpu", label: "CPU入口", artifact: "vector=14", x: 188, y: 132 },
  {
    id: "kernel",
    label: "内核例程",
    artifact: "errno / frame",
    x: 348,
    y: 132,
  },
  { id: "scheduler", label: "调度器", artifact: "run queue", x: 508, y: 132 },
  { id: "handler", label: "信号处理器", artifact: "sigaction", x: 668, y: 132 },
  { id: "parent", label: "父进程", artifact: "wait status", x: 348, y: 296 },
] as const;

const PHASE_STEPS: readonly TeachingStep[] = PHASES.map((phase) => ({
  label: phase.id,
  caption: phase.evidence,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  PHASE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function PhaseButton({
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
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function FlowNode({
  node,
  active,
  warning,
}: {
  node: (typeof NODES)[number];
  active: boolean;
  warning: boolean;
}) {
  const stroke = warning
    ? COLORS.danger
    : active
      ? COLORS.accent
      : COLORS.border;
  const dot = warning
    ? COLORS.danger
    : active
      ? COLORS.accent
      : COLORS.secondary;
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width="132"
        height="86"
        rx="12"
        fill={COLORS.elevated}
        stroke={stroke}
        strokeWidth={active || warning ? 2.5 : 1.2}
      />
      <circle cx={node.x + 20} cy={node.y + 22} r="6" fill={dot} />
      <text
        x={node.x + 34}
        y={node.y + 27}
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {node.label}
      </text>
      <text
        x={node.x + 14}
        y={node.y + 57}
        fontSize="12"
        fill={COLORS.secondary}
      >
        {node.artifact}
      </text>
    </g>
  );
}

/** 第 8 章专属实验：把异常入口、进程调度、信号递送和回收结果串成状态轨迹。 */
export function Cap08ExceptionalControlLab() {
  const [phaseId, setPhaseId] = useState<Phase>("trap");
  const [scenarioId, setScenarioId] = useState<Scenario>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const phase = useMemo(
    () => PHASES.find((item) => item.id === phaseId) ?? PHASES[0],
    [phaseId],
  );
  const scenario = useMemo(
    () => SCENARIOS.find((item) => item.id === scenarioId) ?? SCENARIOS[0],
    [scenarioId],
  );
  const timeline = useTeachingTimeline({
    steps: PHASE_STEPS,
    build: (tl) => {
      PHASE_STEPS.forEach((step, index) => {
        const node = timelineRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.25, 1],
            scale: [0.95, 1],
            duration: T * 0.65,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  function reset() {
    setPhaseId("trap");
    setScenarioId("normal");
    timeline.goToStep(0);
  }

  const phaseIndex = PHASES.findIndex((item) => item.id === phaseId);
  const scenarioIsFault = scenarioId !== "normal";

  return (
    <section
      aria-label={`第 8 章异常控制流专属状态转移实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-08"
      data-visual-kind="cap-08-exceptional-control-state-trace"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap08ExceptionalControlLab · 控制流状态台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从异常入口追到信号、调度和子进程回收
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择状态阶段与故障样本，逐帧查看控制权、上下文和资源所有权如何变化。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前阶段</div>
          <div>{phase.label}</div>
          <div>{phase.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="控制流阶段">
          {PHASES.map((item) => (
            <PhaseButton
              key={item.id}
              active={item.id === phaseId}
              onClick={() => setPhaseId(item.id)}
            >
              {item.label}
            </PhaseButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="故障样本">
          {SCENARIOS.map((item) => (
            <PhaseButton
              key={item.id}
              active={item.id === scenarioId}
              onClick={() => setScenarioId(item.id)}
            >
              {item.label}
            </PhaseButton>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${phase.label}阶段的异常控制流：${scenario.result}`}
          className="h-auto w-full"
        >
          <rect
            x="10"
            y="18"
            width="860"
            height="474"
            rx="16"
            fill={COLORS.elevated}
            stroke={COLORS.border}
          />
          <text
            x="28"
            y="52"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.primary}
          >
            event → kernel → frame → schedule → signal → return/reap
          </text>
          <text x="28" y="78" fontSize="12" fill={COLORS.secondary}>
            {scenario.detail}
          </text>
          {NODES.slice(0, 5).map((node, index) => {
            const next = NODES[index + 1];
            const edgeActive = phaseIndex >= index;
            const edgeWarning =
              scenarioIsFault &&
              ((scenarioId === "zombie" && index === 3) ||
                (scenarioId === "race" && index === 4));
            return (
              <g key={`${node.id}-${next.id}`}>
                <line
                  x1={node.x + 132}
                  y1={node.y + 43}
                  x2={next.x}
                  y2={next.y + 43}
                  stroke={
                    edgeWarning
                      ? COLORS.danger
                      : edgeActive
                        ? COLORS.accent
                        : COLORS.border
                  }
                  strokeWidth={edgeWarning || edgeActive ? 3 : 1.2}
                  strokeDasharray={edgeWarning ? "6 5" : undefined}
                />
                <text
                  x={(node.x + 132 + next.x) / 2 - 18}
                  y={node.y + 34}
                  fontSize="11"
                  fill={edgeWarning ? COLORS.danger : COLORS.secondary}
                >
                  {edgeWarning ? "冲突" : edgeActive ? "已确认" : "待确认"}
                </text>
              </g>
            );
          })}
          <path
            d="M414 218v64h0"
            fill="none"
            stroke={phaseIndex >= 3 ? COLORS.accent : COLORS.border}
            strokeWidth="3"
          />
          <path
            d="M414 382h170v-64"
            fill="none"
            stroke={phaseIndex >= 5 ? COLORS.success : COLORS.border}
            strokeWidth="3"
          />
          {NODES.map((node, index) => (
            <FlowNode
              key={node.id}
              node={node}
              active={phaseIndex >= index}
              warning={
                scenarioId === "zombie"
                  ? node.id === "parent"
                  : scenarioId === "race" && node.id === "handler"
              }
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.trap = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="30"
              y="244"
              width="146"
              height="72"
              rx="10"
              fill={COLORS.accent}
              fillOpacity="0.12"
              stroke={COLORS.accent}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.kernel = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path d="M214 280h112" stroke={COLORS.accent} strokeWidth="4" />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.context = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="414"
              cy="280"
              r="27"
              fill={COLORS.accent}
              fillOpacity="0.16"
              stroke={COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.schedule = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M470 280h116v-38"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth="4"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.deliver = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="620"
              y="244"
              width="174"
              height="72"
              rx="10"
              fill={COLORS.warning}
              fillOpacity="0.1"
              stroke={COLORS.warning}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.resume = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M580 382h118"
              fill="none"
              stroke={COLORS.success}
              strokeWidth="4"
            />
          </g>
          <text
            x="32"
            y="426"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            状态快照
          </text>
          <text x="32" y="450" fontSize="12" fill={COLORS.secondary}>
            pid=4172 · child=4173 · blocked=SIGCHLD · frame=restorable
          </text>
          <text
            x="32"
            y="476"
            fontSize="12"
            fill={scenarioIsFault ? COLORS.danger : COLORS.success}
          >
            {scenario.result} · 当前阶段：{phase.label}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看异常入口、上下文保存、调度、信号递送和恢复动作。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置异常控制流实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
