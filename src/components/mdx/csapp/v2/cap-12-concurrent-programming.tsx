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

type Stage = "partition" | "model" | "shared" | "sync" | "liveness" | "reclaim";
type Model = "process" | "multiplex" | "thread";
type Fault = "normal" | "race" | "deadlock";

const CONCEPTS = [
  "第12章 并发编程",
  "12.1 基于进程的并发编程",
  "12.1.1 基于进程的并发服务器",
  "12.1.2 进程的优劣",
  "12.2 基于I/O多路复用的并发编程",
  "12.2.1 基于I/O多路复用的并发事件驱动服务器",
  "12.2.2 I/O多路复用的优劣",
  "12.3 基于线程的并发编程",
  "12.3.1 线程执行模型",
  "12.3.2 Posix线程",
  "12.3.3 创建线程",
  "12.3.4 终止线程",
  "12.3.5 回收已终止的线程",
  "12.3.6 分离线程",
  "12.3.7 初始化线程",
  "12.3.8 基于线程的并发服务器",
  "12.4 多线程程序中的共享变量",
  "12.4.1 线程内存模型",
  "12.4.2 将变量映射到内存",
  "12.4.3 共享变量",
  "12.5 用信号量同步线程",
  "12.5.1 进度图",
  "12.5.2 信号量",
  "12.5.3 使用信号量实现互斥",
  "12.5.4 利用信号量来调度共享资源",
  "12.5.5 综合：基于预线程化的并发服务器",
  "12.6 使用线程提高并行性",
  "12.7 其他并发问题",
  "12.7.1 线程安全",
  "12.7.2 可重入性",
  "12.7.3 在线程化的程序中使用已存在的库函数",
  "12.7.4 竞争",
  "12.7.5 死锁",
  "12.8 小结",
] as const;

const STAGES: readonly {
  id: Stage;
  label: string;
  focus: string;
  evidence: string;
}[] = [
  {
    id: "partition",
    label: "划分并发任务",
    focus: "request → flows",
    evidence:
      "先把请求、逻辑流和生命周期分开，避免把并发模型选择误当成同步保证。",
  },
  {
    id: "model",
    label: "选择并发模型",
    focus: "process / select / thread",
    evidence:
      "进程强调隔离，I/O 多路复用强调事件循环，线程强调共享地址空间；取舍必须可测量。",
  },
  {
    id: "shared",
    label: "标记共享状态",
    focus: "memory + ownership",
    evidence:
      "每个共享变量都要标明读写者、保护方式和不变量，否则无法判断一次交错是否合法。",
  },
  {
    id: "sync",
    label: "建立同步顺序",
    focus: "semaphore / lock order",
    evidence:
      "信号量和锁把允许的先后关系写进进度图，互斥保护不变量，计数信号量表示资源数量。",
  },
  {
    id: "liveness",
    label: "验证活性",
    focus: "race / starvation / deadlock",
    evidence:
      "安全性关注不该发生的结果，活性关注应该发生的进展；竞争、饥饿和死锁必须分开诊断。",
  },
  {
    id: "reclaim",
    label: "回收全部资源",
    focus: "join / detach / cleanup",
    evidence:
      "线程、子进程、事件注册和锁都要有终止路径；回收证据与最终输出同样重要。",
  },
] as const;

const MODELS: readonly {
  id: Model;
  label: string;
  detail: string;
}[] = [
  {
    id: "process",
    label: "进程模型",
    detail: "地址空间隔离；父子进程通过描述符、管道或共享映射交换有限状态。",
  },
  {
    id: "multiplex",
    label: "I/O 多路复用",
    detail:
      "单个事件循环管理多个连接；共享状态少，但每个事件都必须推进且不阻塞。",
  },
  {
    id: "thread",
    label: "线程模型",
    detail:
      "线程共享地址空间；创建和切换开销低，但每个共享访问都要有同步契约。",
  },
] as const;

const FAULTS: readonly {
  id: Fault;
  label: string;
  result: string;
  detail: string;
}[] = [
  {
    id: "normal",
    label: "同步正常",
    result: "计数守恒",
    detail: "生产、消费、关闭和回收顺序一致，最终计数与资源余额都能重放。",
  },
  {
    id: "race",
    label: "注入竞争",
    result: "访问交错",
    detail:
      "两个流同时读改写共享计数；未受保护的临界区产生不同输出或丢失更新。",
  },
  {
    id: "deadlock",
    label: "锁顺序反转",
    result: "进度停滞",
    detail:
      "流 A 持有 lock-A 等待 lock-B，流 B 反向等待；进度图出现闭环且没有可释放边。",
  },
] as const;

const NODES: readonly {
  id: string;
  label: string;
  artifact: string;
  x: number;
  y: number;
}[] = [
  { id: "input", label: "请求队列", artifact: "jobs=8", x: 28, y: 132 },
  { id: "flowA", label: "逻辑流 A", artifact: "pc=read", x: 174, y: 132 },
  { id: "flowB", label: "逻辑流 B", artifact: "pc=update", x: 320, y: 132 },
  { id: "shared", label: "共享状态", artifact: "count=3", x: 466, y: 132 },
  { id: "sync", label: "同步边", artifact: "sem=1 / lock", x: 612, y: 132 },
  { id: "reclaim", label: "回收器", artifact: "join=2", x: 758, y: 132 },
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

function ConcurrencyNode({
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

/** 第 12 章专属实验：把并发模型、共享变量、同步边、活性和资源回收串成可重放的调度证据链。 */
export function Cap12ConcurrentProgrammingLab() {
  const [stageId, setStageId] = useState<Stage>("partition");
  const [modelId, setModelId] = useState<Model>("thread");
  const [faultId, setFaultId] = useState<Fault>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const stage = useMemo(
    () => STAGES.find((item) => item.id === stageId) ?? STAGES[0],
    [stageId],
  );
  const model = useMemo(
    () => MODELS.find((item) => item.id === modelId) ?? MODELS[0],
    [modelId],
  );
  const fault = useMemo(
    () => FAULTS.find((item) => item.id === faultId) ?? FAULTS[0],
    [faultId],
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
    setStageId("partition");
    setModelId("thread");
    setFaultId("normal");
    timeline.goToStep(0);
  }

  const stageIndex = STAGES.findIndex((item) => item.id === stageId);
  const faultIsActive = faultId !== "normal";

  return (
    <section
      aria-label={`第 12 章并发编程专属调度、共享状态与同步实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-12"
      data-visual-kind="cap-12-concurrent-programming-schedule-sync"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap12ConcurrentProgrammingLab · 调度与同步追踪台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从逻辑流追到同步边、活性与回收
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择并发模型和故障样本，逐帧查看任务划分、共享状态、信号量、竞争或死锁，以及最终
            join、detach 和清理责任。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前阶段</div>
          <div>{stage.label}</div>
          <div>{stage.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="并发阶段">
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
        <div className="flex flex-wrap gap-2" aria-label="并发模型">
          {MODELS.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === modelId}
              onClick={() => setModelId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="并发故障样本">
          {FAULTS.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === faultId}
              onClick={() => setFaultId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${stage.label}阶段的并发轨迹：${fault.result}`}
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
            request → logical flows → shared state → synchronization → progress
            → reclaim
          </text>
          <text x="28" y="78" fontSize="12" fill={COLORS.secondary}>
            {fault.detail} 当前模型：{model.label}；{model.detail}
          </text>
          {NODES.slice(0, -1).map((node, index) => {
            const next = NODES[index + 1];
            const edgeActive = stageIndex > index;
            const edgeWarning =
              (faultId === "race" && index === 2) ||
              (faultId === "deadlock" && index === 4);
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
            <ConcurrencyNode
              key={node.id}
              node={node}
              active={stageIndex >= index}
              warning={
                (faultId === "race" && node.id === "shared") ||
                (faultId === "deadlock" && node.id === "sync")
              }
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.partition = node;
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
              timelineRefs.current.model = node;
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
              timelineRefs.current.shared = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="392"
              cy="288"
              r="28"
              fill={faultIsActive ? COLORS.danger : COLORS.accent}
              fillOpacity="0.16"
              stroke={faultIsActive ? COLORS.danger : COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.sync = node;
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
              timelineRefs.current.liveness = node;
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
              fill={faultId === "deadlock" ? COLORS.danger : COLORS.warning}
              fillOpacity="0.1"
              stroke={faultId === "deadlock" ? COLORS.danger : COLORS.warning}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.reclaim = node;
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
            并发状态快照
          </text>
          <text x="32" y="452" fontSize="12" fill={COLORS.secondary}>
            model={model.id} · flowA=hold-A · flowB=wait-B · shared.count=3 ·
            sem=1 · owner=pool
          </text>
          <text
            x="32"
            y="478"
            fontSize="12"
            fill={faultIsActive ? COLORS.danger : COLORS.success}
          >
            {fault.result} · 当前阶段：{stage.label}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看任务划分、模型选择、共享状态、同步顺序、活性检查和资源回收。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置并发编程实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
