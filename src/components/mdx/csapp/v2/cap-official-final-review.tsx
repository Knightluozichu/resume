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

const VIEW_W = 900;
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

type Stage =
  | "represent"
  | "execute"
  | "translate"
  | "runtime"
  | "communicate"
  | "certify";
type Scenario = "normal" | "boundary" | "failure";

const CONCEPTS = [
  "第1章 计算机系统漫游",
  "第2章 信息的表示和处理",
  "第3章 程序的机器级表示",
  "第4章 处理器体系结构",
  "第5章 优化程序性能",
  "第6章 存储器层次结构",
  "第7章 链接",
  "第8章 异常控制流",
  "第9章 虚拟内存",
  "第10章 系统级I/O",
  "第11章 网络编程",
  "第12章 并发编程",
  "附录A 错误处理",
] as const;

const STAGES: readonly {
  id: Stage;
  label: string;
  focus: string;
  evidence: string;
}[] = [
  {
    id: "represent",
    label: "还原表示",
    focus: "source → bits",
    evidence:
      "从源码、数据表示和指令编码确定输入含义，先锁定位宽、符号和不变量。",
  },
  {
    id: "execute",
    label: "解释执行",
    focus: "instruction → state",
    evidence:
      "用程序计数器、寄存器、条件码和内存状态解释机器执行，而不是只看最终输出。",
  },
  {
    id: "translate",
    label: "核对翻译",
    focus: "address → mapping",
    evidence: "把编译、链接、缓存和虚拟地址转换为可检查的映射与访问轨迹。",
  },
  {
    id: "runtime",
    label: "追踪运行时",
    focus: "process → resource",
    evidence:
      "记录进程、异常、页、描述符、堆块和线程的 owner，检查部分成功后的清理路径。",
  },
  {
    id: "communicate",
    label: "验证交互",
    focus: "I/O → network → concurrency",
    evidence: "把短计数、连接、调度、共享访问和同步边放进同一条交互证据链。",
  },
  {
    id: "certify",
    label: "签发证据",
    focus: "predict → replay",
    evidence:
      "用正常、边界、失败和恢复样本重放首个偏离，并同时验收结果、状态和清理。",
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
    label: "正常链路",
    result: "证据闭合",
    detail:
      "同一个输入经过表示、执行、地址、资源和通信边界，输出与清理都满足预期。",
  },
  {
    id: "boundary",
    label: "边界链路",
    result: "边界受控",
    detail:
      "溢出、缺页、短写、分段和高争用同时受到各层契约约束，没有跨层掩盖。",
  },
  {
    id: "failure",
    label: "失败链路",
    result: "首个偏离",
    detail:
      "符号缺失、错误码、断连或竞争在第一处违约被记录，并沿 owner 路径恢复。",
  },
] as const;

const NODES: readonly {
  id: string;
  label: string;
  artifact: string;
  x: number;
  y: number;
}[] = [
  {
    id: "source",
    label: "源码与数据",
    artifact: "bits / types",
    x: 28,
    y: 132,
  },
  { id: "machine", label: "机器状态", artifact: "pc / regs", x: 174, y: 132 },
  {
    id: "mapping",
    label: "地址与映射",
    artifact: "reloc / page",
    x: 320,
    y: 132,
  },
  {
    id: "runtime",
    label: "运行时资源",
    artifact: "proc / fd / heap",
    x: 466,
    y: 132,
  },
  {
    id: "exchange",
    label: "I/O 与交互",
    artifact: "bytes / peer",
    x: 612,
    y: 132,
  },
  {
    id: "evidence",
    label: "证据账本",
    artifact: "replay / verdict",
    x: 758,
    y: 132,
  },
] as const;

const STAGE_STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.id,
  caption: stage.evidence,
}));
const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STAGE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function ToggleButton({
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

function ReviewNode({
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
        width="116"
        height="86"
        rx="12"
        fill={COLORS.elevated}
        stroke={stroke}
        strokeWidth={active || warning ? 2.5 : 1.2}
      />
      <circle cx={node.x + 19} cy={node.y + 22} r="6" fill={dot} />
      <text
        x={node.x + 32}
        y={node.y + 27}
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {node.label}
      </text>
      <text
        x={node.x + 12}
        y={node.y + 57}
        fontSize="12"
        fill={COLORS.secondary}
      >
        {node.artifact}
      </text>
    </g>
  );
}

/** 全书总复习专属实验：把 13 个学习单元压缩为可重放的系统生命周期与证据链。 */
export function CapOfficialFinalReviewLab() {
  const [stageId, setStageId] = useState<Stage>("represent");
  const [scenarioId, setScenarioId] = useState<Scenario>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const stage = useMemo(
    () => STAGES.find((item) => item.id === stageId) ?? STAGES[0],
    [stageId],
  );
  const scenario = useMemo(
    () => SCENARIOS.find((item) => item.id === scenarioId) ?? SCENARIOS[0],
    [scenarioId],
  );
  const timeline = useTeachingTimeline({
    steps: STAGE_STEPS,
    build: (tl) => {
      STAGE_STEPS.forEach((step, index) => {
        const node = timelineRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.24, 1],
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
    setStageId("represent");
    setScenarioId("normal");
    timeline.goToStep(0);
  }

  const stageIndex = STAGES.findIndex((item) => item.id === stageId);
  const scenarioIsFault = scenarioId !== "normal";

  return (
    <section
      aria-label={`全书总复习专属系统生命周期与证据链实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="csapp-final-review-lifecycle-evidence"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CapOfficialFinalReviewLab · 系统生命周期复盘台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从位模式追到可发布的证据链
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择生命周期阶段和复盘样本，逐帧查看表示、机器、地址、运行时、交互和最终证据如何互相约束。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前阶段</div>
          <div>{stage.label}</div>
          <div>{stage.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="复盘阶段">
          {STAGES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === stageId}
              onClick={() => setStageId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="复盘样本">
          {SCENARIOS.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === scenarioId}
              onClick={() => setScenarioId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${stage.label}阶段的全书复盘轨迹：${scenario.result}`}
          className="h-auto w-full"
        >
          <rect
            x="10"
            y="18"
            width="880"
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
            source → machine → mapping → runtime → exchange → evidence
          </text>
          <text x="28" y="78" fontSize="12" fill={COLORS.secondary}>
            {scenario.detail}
          </text>
          {NODES.slice(0, -1).map((node, index) => {
            const next = NODES[index + 1];
            const edgeActive = stageIndex > index;
            const edgeWarning =
              (scenarioId === "boundary" && index === 2) ||
              (scenarioId === "failure" && index === 4);
            return (
              <g key={`${node.id}-${next.id}`}>
                <line
                  x1={node.x + 116}
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
                  x={(node.x + 116 + next.x) / 2 - 18}
                  y={node.y + 34}
                  fontSize="11"
                  fill={edgeWarning ? COLORS.danger : COLORS.secondary}
                >
                  {edgeWarning ? "分叉" : edgeActive ? "已确认" : "待确认"}
                </text>
              </g>
            );
          })}
          {NODES.map((node, index) => (
            <ReviewNode
              key={node.id}
              node={node}
              active={stageIndex >= index}
              warning={
                (scenarioId === "boundary" && node.id === "mapping") ||
                (scenarioId === "failure" && node.id === "exchange")
              }
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.represent = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="32"
              y="252"
              width="164"
              height="72"
              rx="10"
              fill={COLORS.accent}
              fillOpacity="0.12"
              stroke={COLORS.accent}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.execute = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M224 288h86"
              fill="none"
              stroke={COLORS.accent}
              strokeWidth="4"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.translate = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="392"
              cy="288"
              r="28"
              fill={scenarioIsFault ? COLORS.danger : COLORS.accent}
              fillOpacity="0.16"
              stroke={scenarioIsFault ? COLORS.danger : COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.runtime = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M452 288h128m-16-12 16 12-16 12"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth="4"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.communicate = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="604"
              y="252"
              width="164"
              height="72"
              rx="10"
              fill={COLORS.warning}
              fillOpacity="0.1"
              stroke={COLORS.warning}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.certify = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M684 392h146"
              fill="none"
              stroke={COLORS.success}
              strokeWidth="4"
            />
          </g>
          <text
            x="32"
            y="428"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            全书证据快照
          </text>
          <text x="32" y="452" fontSize="12" fill={COLORS.secondary}>
            input=stable · first-divergence=tracked · owner=explicit ·
            replay=ready · chapters=13
          </text>
          <text
            x="32"
            y="478"
            fontSize="12"
            fill={scenarioIsFault ? COLORS.danger : COLORS.success}
          >
            {scenario.result} · 当前阶段：{stage.label}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看表示、执行、地址映射、运行时资源、通信并发和证据签发。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置全书总复习实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
