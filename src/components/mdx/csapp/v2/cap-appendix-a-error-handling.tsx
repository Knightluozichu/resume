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

type Stage = "invoke" | "check" | "capture" | "context" | "cleanup" | "outcome";
type Failure = "normal" | "missing" | "interrupted";

const CONCEPTS = [
  "附录A 错误处理",
  "A.1 Unix系统中的错误处理",
  "A.2 错误处理包装函数",
] as const;

const STAGES: readonly {
  id: Stage;
  label: string;
  focus: string;
  evidence: string;
}[] = [
  {
    id: "invoke",
    label: "调用接口",
    focus: "request → syscall",
    evidence: "先固定调用参数、前置资源和成功承诺，再执行一次接口调用。",
  },
  {
    id: "check",
    label: "检查返回值",
    focus: "ret → branch",
    evidence:
      "返回值是控制流入口；成功、失败、短计数和可重试中断必须分成明确分支。",
  },
  {
    id: "capture",
    label: "保存错误码",
    focus: "errno → snapshot",
    evidence:
      "失败后立即保存 errno 或等价错误状态，后续日志和清理不能覆盖原始原因。",
  },
  {
    id: "context",
    label: "补充调用上下文",
    focus: "operation + object",
    evidence: "把操作名、对象、参数、调用位置和错误码组合成可行动的诊断记录。",
  },
  {
    id: "cleanup",
    label: "清理已获资源",
    focus: "owner → reverse cleanup",
    evidence:
      "部分成功也要沿已获资源的逆序路径清理，不能因为错误路径而重复释放或泄漏。",
  },
  {
    id: "outcome",
    label: "传播或终止",
    focus: "recover / return / abort",
    evidence:
      "按错误类别选择重试、降级、向上返回或终止，并保留恢复后的状态证据。",
  },
] as const;

const FAILURES: readonly {
  id: Failure;
  label: string;
  result: string;
  detail: string;
}[] = [
  {
    id: "normal",
    label: "成功调用",
    result: "正常提交",
    detail: "系统调用成功，返回值满足契约，资源沿正常路径交给下一个 owner。",
  },
  {
    id: "missing",
    label: "不存在路径",
    result: "ENOENT 诊断",
    detail:
      "open 找不到目标；错误码先被保存，再附加路径上下文，已有 fd 按逆序关闭。",
  },
  {
    id: "interrupted",
    label: "信号中断",
    result: "EINTR 分支",
    detail:
      "接口被信号打断；包装层根据可重试契约决定重试或返回，同时保留调用快照。",
  },
] as const;

const NODES: readonly {
  id: string;
  label: string;
  artifact: string;
  x: number;
  y: number;
}[] = [
  { id: "caller", label: "调用者", artifact: "op=open", x: 28, y: 132 },
  {
    id: "syscall",
    label: "Unix 接口",
    artifact: "ret / errno",
    x: 174,
    y: 132,
  },
  {
    id: "snapshot",
    label: "错误快照",
    artifact: "saved=ENOENT",
    x: 320,
    y: 132,
  },
  { id: "context", label: "调用上下文", artifact: "path + op", x: 466, y: 132 },
  { id: "cleanup", label: "资源清理", artifact: "fd / child", x: 612, y: 132 },
  {
    id: "handler",
    label: "错误处理器",
    artifact: "retry / return",
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

function ErrorNode({
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

/** 附录 A 专属实验：把返回值、errno、诊断上下文和部分成功后的清理串成错误证据链。 */
export function CapAppendixAErrorHandlingLab() {
  const [stageId, setStageId] = useState<Stage>("invoke");
  const [failureId, setFailureId] = useState<Failure>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const stage = useMemo(
    () => STAGES.find((item) => item.id === stageId) ?? STAGES[0],
    [stageId],
  );
  const failure = useMemo(
    () => FAILURES.find((item) => item.id === failureId) ?? FAILURES[0],
    [failureId],
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
    setStageId("invoke");
    setFailureId("normal");
    timeline.goToStep(0);
  }

  const stageIndex = STAGES.findIndex((item) => item.id === stageId);
  const failureIsActive = failureId !== "normal";

  return (
    <section
      aria-label={`附录 A 错误处理专属返回值、errno 与资源清理实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-13"
      data-visual-kind="cap-appendix-a-error-handling-return-cleanup"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CapAppendixAErrorHandlingLab · 失败路径追踪台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从返回值追到诊断、清理与恢复
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择错误处理阶段和故障样本，逐帧查看返回值分支、原始
            errno、调用上下文、部分成功资源与最终处理策略。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前阶段</div>
          <div>{stage.label}</div>
          <div>{stage.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="错误处理阶段">
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
        <div className="flex flex-wrap gap-2" aria-label="错误样本">
          {FAILURES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === failureId}
              onClick={() => setFailureId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${stage.label}阶段的错误处理轨迹：${failure.result}`}
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
            call → return check → errno snapshot → context → cleanup → outcome
          </text>
          <text x="28" y="78" fontSize="12" fill={COLORS.secondary}>
            {failure.detail}
          </text>
          {NODES.slice(0, -1).map((node, index) => {
            const next = NODES[index + 1];
            const edgeActive = stageIndex > index;
            const edgeWarning =
              (failureId === "missing" && index === 1) ||
              (failureId === "interrupted" && index === 2);
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
            <ErrorNode
              key={node.id}
              node={node}
              active={stageIndex >= index}
              warning={
                (failureId === "missing" && node.id === "snapshot") ||
                (failureId === "interrupted" && node.id === "syscall")
              }
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.invoke = node;
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
              timelineRefs.current.check = node;
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
              timelineRefs.current.capture = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="392"
              cy="288"
              r="28"
              fill={failureIsActive ? COLORS.danger : COLORS.accent}
              fillOpacity="0.16"
              stroke={failureIsActive ? COLORS.danger : COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.context = node;
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
              timelineRefs.current.cleanup = node;
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
              timelineRefs.current.outcome = node;
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
            错误状态快照
          </text>
          <text x="32" y="452" fontSize="12" fill={COLORS.secondary}>
            ret=-1 · errno=
            {failureId === "missing"
              ? "ENOENT"
              : failureId === "interrupted"
                ? "EINTR"
                : "0"}{" "}
            · acquired=fd=3 · owner=caller
          </text>
          <text
            x="32"
            y="478"
            fontSize="12"
            fill={failureIsActive ? COLORS.danger : COLORS.success}
          >
            {failure.result} · 当前阶段：{stage.label}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看调用、返回值、错误码快照、上下文、部分成功清理和传播策略。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置错误处理实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
