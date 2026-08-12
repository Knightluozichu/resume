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

type Stage = "open" | "meta" | "transfer" | "retry" | "share" | "close";
type Sample = "normal" | "short" | "redirect";

const CONCEPTS = [
  "第10章 系统级I/O",
  "10.1 Unix I/O",
  "10.2 文件",
  "10.3 打开和关闭文件",
  "10.4 读和写文件",
  "10.5 用RIO包健壮地读写",
  "10.5.1 RIO的无缓冲的输入输出函数",
  "10.5.2 RIO的带缓冲的输入函数",
  "10.6 读取文件元数据",
  "10.7 读取目录内容",
  "10.8 共享文件",
  "10.9 I/O重定向",
  "10.10 标准I/O",
  "10.11 综合：我该使用哪些I/O函数？",
  "10.12 小结",
] as const;

const STAGES: readonly {
  id: Stage;
  label: string;
  focus: string;
  evidence: string;
}[] = [
  {
    id: "open",
    label: "打开对象",
    focus: "path → fd",
    evidence: "open 返回描述符，内核为对象建立打开文件表项。",
  },
  {
    id: "meta",
    label: "读取元数据",
    focus: "stat / mode / size",
    evidence: "元数据说明对象类型、大小、权限和当前偏移的观察坐标。",
  },
  {
    id: "transfer",
    label: "传输字节",
    focus: "read / write",
    evidence: "读写调用只承诺实际传输的字节数，短计数需要由调用者解释。",
  },
  {
    id: "retry",
    label: "处理短计数",
    focus: "EINTR / EOF / retry",
    evidence: "RIO 循环把短读、短写、中断和 EOF 转成明确的状态分支。",
  },
  {
    id: "share",
    label: "共享与重定向",
    focus: "dup2 / offset",
    evidence: "dup2 和 fork 可能共享内核表项，重定向改变描述符到对象的边。",
  },
  {
    id: "close",
    label: "关闭并清理",
    focus: "owner → close",
    evidence: "每个成功打开都要沿唯一所有权路径关闭，并释放缓冲状态。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  result: string;
  detail: string;
}[] = [
  {
    id: "normal",
    label: "完整传输",
    result: "字节闭环",
    detail: "请求长度、实际长度、EOF 和关闭动作一致，数据可重放。",
  },
  {
    id: "short",
    label: "短读中断",
    result: "循环恢复",
    detail: "read 返回较少字节或 EINTR，RIO 保留进度并继续或报告 EOF。",
  },
  {
    id: "redirect",
    label: "重定向共享",
    result: "偏移可追踪",
    detail: "两个描述符指向同一打开文件表项，共享偏移的变化可见。",
  },
] as const;

const NODES: readonly {
  id: string;
  label: string;
  artifact: string;
  x: number;
  y: number;
}[] = [
  { id: "app", label: "应用", artifact: "buffer / count", x: 28, y: 132 },
  { id: "fd", label: "描述符", artifact: "fd=3", x: 182, y: 132 },
  { id: "oft", label: "打开表项", artifact: "offset / flags", x: 336, y: 132 },
  { id: "object", label: "内核对象", artifact: "file / pipe", x: 490, y: 132 },
  { id: "rio", label: "RIO缓冲", artifact: "unread bytes", x: 644, y: 132 },
  { id: "sink", label: "输出端", artifact: "stdout / file", x: 798, y: 132 },
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

function IoNode({
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
        width="124"
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

/** 第 10 章专属实验：把文件描述符、内核表项、短计数和重定向串成 I/O 证据链。 */
export function Cap10SystemIoLab() {
  const [stageId, setStageId] = useState<Stage>("open");
  const [sampleId, setSampleId] = useState<Sample>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const stage = useMemo(
    () => STAGES.find((item) => item.id === stageId) ?? STAGES[0],
    [stageId],
  );
  const sample = useMemo(
    () => SAMPLES.find((item) => item.id === sampleId) ?? SAMPLES[0],
    [sampleId],
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
    setStageId("open");
    setSampleId("normal");
    timeline.goToStep(0);
  }

  const stageIndex = STAGES.findIndex((item) => item.id === stageId);
  const sampleIsFault = sampleId !== "normal";

  return (
    <section
      aria-label={`第 10 章系统级 I/O 专属描述符与短计数实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-10"
      data-visual-kind="cap-10-system-io-descriptor-stream"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap10SystemIoLab · 描述符流转台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从 fd 追到表项、字节流与清理
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择 I/O
            阶段和异常样本，逐帧查看短计数、共享偏移、重定向与关闭责任。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前阶段</div>
          <div>{stage.label}</div>
          <div>{stage.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="I/O 阶段">
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
        <div className="flex flex-wrap gap-2" aria-label="I/O 样本">
          {SAMPLES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === sampleId}
              onClick={() => setSampleId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${stage.label}阶段的系统级 I/O 轨迹：${sample.result}`}
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
            app → fd → open file table → object → RIO → sink
          </text>
          <text x="28" y="78" fontSize="12" fill={COLORS.secondary}>
            {sample.detail}
          </text>
          {NODES.slice(0, -1).map((node, index) => {
            const next = NODES[index + 1];
            const edgeActive = stageIndex >= index;
            const edgeWarning =
              (sampleId === "short" && index === 2) ||
              (sampleId === "redirect" && index === 4);
            return (
              <g key={`${node.id}-${next.id}`}>
                <line
                  x1={node.x + 124}
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
                  x={(node.x + 124 + next.x) / 2 - 18}
                  y={node.y + 34}
                  fontSize="11"
                  fill={edgeWarning ? COLORS.danger : COLORS.secondary}
                >
                  {edgeWarning ? "异常" : edgeActive ? "已确认" : "待确认"}
                </text>
              </g>
            );
          })}
          {NODES.map((node, index) => (
            <IoNode
              key={node.id}
              node={node}
              active={stageIndex >= index}
              warning={
                (sampleId === "short" && node.id === "rio") ||
                (sampleId === "redirect" && node.id === "oft")
              }
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.open = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="30"
              y="252"
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
              timelineRefs.current.meta = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path d="M214 288h112" stroke={COLORS.accent} strokeWidth="4" />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.transfer = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="414"
              cy="288"
              r="27"
              fill={COLORS.accent}
              fillOpacity="0.16"
              stroke={COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.retry = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M470 288h116v-38"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth="4"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.share = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="620"
              y="252"
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
              timelineRefs.current.close = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M580 392h118"
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
            I/O 状态快照
          </text>
          <text x="32" y="452" fontSize="12" fill={COLORS.secondary}>
            fd=3 · requested=64 · actual=17 · offset=0x40 · owner=reader
          </text>
          <text
            x="32"
            y="478"
            fontSize="12"
            fill={sampleIsFault ? COLORS.danger : COLORS.success}
          >
            {sample.result} · 当前阶段：{stage.label}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看打开、元数据、传输、短计数、共享重定向和关闭清理。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置系统级 I/O 实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
