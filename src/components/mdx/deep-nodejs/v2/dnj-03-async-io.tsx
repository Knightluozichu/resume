"use client";

import { useId, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const T = TEACHING_BEAT_MS;

type Resource = "file" | "socket" | "timer" | "worker";
type Fault = "none" | "blocking" | "starvation" | "duplicate";
type Queue = "poll" | "nextTick" | "immediate";

const STEPS: readonly TeachingStep[] = [
  { label: "call", caption: "调用返回，当前栈继续向下" },
  { label: "request", caption: "请求对象接管输入与取消关系" },
  { label: "observe", caption: "观察者报告外部资源的进展" },
  { label: "loop", caption: "事件循环选择可运行的阶段" },
  { label: "callback", caption: "回调取得唯一完成闸门" },
  { label: "drain", caption: "资源关闭，活动计数归零" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const RESOURCE_LABELS: Record<Resource, string> = {
  file: "文件",
  socket: "socket",
  timer: "定时器",
  worker: "线程池任务",
};

const FAULT_LABELS: Record<Fault, string> = {
  none: "基线",
  blocking: "主线程阻塞",
  starvation: "nextTick 饥饿",
  duplicate: "重复完成",
};

const QUEUE_LABELS: Record<Queue, string> = {
  poll: "poll 阶段",
  nextTick: "nextTick 队列",
  immediate: "check 阶段",
};

function verdict(resource: Resource, fault: Fault, queue: Queue) {
  if (fault === "blocking") {
    return {
      ok: false,
      color: C.danger,
      title: "主线程占住了所有阶段",
      note: `${RESOURCE_LABELS[resource]} 的完成通知还在等待，${QUEUE_LABELS[queue]} 也无法及时取得执行机会。`,
    };
  }
  if (fault === "starvation" && queue === "nextTick") {
    return {
      ok: false,
      color: C.warning,
      title: "nextTick 持续挤压 I/O",
      note: "递归的 next tick 没有让出阶段，观察者的完成事件迟迟不能进入回调路径。",
    };
  }
  if (fault === "duplicate") {
    return {
      ok: false,
      color: C.danger,
      title: "完成出口被调用两次",
      note: "成功、超时或取消路径缺少唯一闸门；迟到事件会再次通知调用方或重复释放资源。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "异步请求可以交接",
    note: "调用返回、观察进展、执行回调和资源关闭由同一 request id 串起。",
  };
}

export function DnjAsyncIoLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `dnj-async-arrow-${instanceId}`;
  const warningArrowId = `dnj-async-warning-${instanceId}`;
  const [resource, setResource] = useState<Resource>("file");
  const [fault, setFault] = useState<Fault>("none");
  const [queue, setQueue] = useState<Queue>("poll");

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const result = verdict(resource, fault, queue);

  function reset() {
    setResource("file");
    setFault("none");
    setQueue("poll");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="deep-nodejs-async-io"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Node.js · 第 3 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从调用返回追踪到资源排空
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择资源、调度位置和故障注入；沿六个阶段观察请求对象如何把外部进展交给事件循环，并检查完成是否唯一、关闭是否可见。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择异步资源">
            {(Object.entries(RESOURCE_LABELS) as [Resource, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={resource === value}
                  onClick={() => setResource(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    resource === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="flex flex-wrap gap-2" aria-label="选择异步故障">
            <span className="self-center text-xs text-secondary">故障：</span>
            {(Object.entries(FAULT_LABELS) as [Fault, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={fault === value}
                  onClick={() => setFault(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    fault === value
                      ? value === "none"
                        ? "border-accent text-accent"
                        : "border-warning text-warning"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择事件循环位置">
            <span className="self-center text-xs text-secondary">队列：</span>
            {(Object.entries(QUEUE_LABELS) as [Queue, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={queue === value}
                  onClick={() => setQueue(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    queue === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>

        <svg
          viewBox="0 0 900 700"
          role="img"
          aria-label={`Node 第 3 章异步 I/O 实验：资源为${RESOURCE_LABELS[resource]}，故障为${FAULT_LABELS[fault]}，队列为${QUEUE_LABELS[queue]}，当前结论为${result.title}。时间线展示调用返回、请求对象、观察者、事件循环、回调和资源排空六阶段；支持播放、暂停、单步、拖进度、三组条件切换和重置。`}
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id={warningArrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="700" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            调用返回 → 观察进展 → 回调完成 → 资源排空
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            异步性的证据是可解释的交接与关闭，不是某次输出看起来更快
          </text>

          <rect
            x="28"
            y="78"
            width="844"
            height="88"
            rx="12"
            fill={result.color}
            fillOpacity="0.08"
            stroke={result.color}
            strokeWidth="1.5"
          />
          <text
            x="48"
            y="108"
            fontSize="12"
            fontWeight="700"
            fill={result.color}
          >
            当前结论：{result.title} · {RESOURCE_LABELS[resource]} ·{" "}
            {FAULT_LABELS[fault]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="154" fontSize="11" fill={result.color}>
            验收条件：单次完成 · 取消可传播 · 活动资源可计数 · close 可观察
          </text>

          <text x="28" y="194" fontSize="12" fontWeight="700" fill={C.primary}>
            六阶段交接图
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="214"
              width="250"
              height="92"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="46" y="244" fontSize="12" fontWeight="700" fill={C.accent}>
              1 · 调用返回
            </text>
            <text x="46" y="272" fontSize="11" fill={C.secondary}>
              当前栈交还控制权，输入已交给请求
            </text>
            <text x="46" y="292" fontSize="11" fill={C.secondary}>
              resource：{RESOURCE_LABELS[resource]}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="324"
              y="214"
              width="250"
              height="92"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="342"
              y="244"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              2 · 请求对象
            </text>
            <text x="342" y="272" fontSize="11" fill={C.secondary}>
              保存 owner、回调、取消和 request id
            </text>
            <text x="342" y="292" fontSize="11" fill={C.secondary}>
              state：pending · completion：one
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="620"
              y="214"
              width="252"
              height="92"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="638"
              y="244"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              3 · 观察者
            </text>
            <text x="638" y="272" fontSize="11" fill={C.secondary}>
              发现外部资源出现可处理进展
            </text>
            <text x="638" y="292" fontSize="11" fill={C.secondary}>
              queue：{QUEUE_LABELS[queue]}
            </text>
          </g>

          <line
            x1="278"
            y1="260"
            x2="318"
            y2="260"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="574"
            y1="260"
            x2="614"
            y2="260"
            stroke={fault === "blocking" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "blocking" ? warningArrowId : arrowId})`}
          />

          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="350"
              width="250"
              height="92"
              rx="10"
              fill={fault === "starvation" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={fault === "starvation" ? C.warning : C.accent}
            />
            <text
              x="46"
              y="380"
              fontSize="12"
              fontWeight="700"
              fill={fault === "starvation" ? C.warning : C.accent}
            >
              4 · 事件循环
            </text>
            <text x="46" y="408" fontSize="11" fill={C.secondary}>
              阶段选择受队列、CPU 和微任务影响
            </text>
            <text x="46" y="428" fontSize="11" fill={C.secondary}>
              active：{QUEUE_LABELS[queue]}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="324"
              y="350"
              width="250"
              height="92"
              rx="10"
              fill={fault === "duplicate" ? C.danger : C.accent}
              fillOpacity="0.1"
              stroke={fault === "duplicate" ? C.danger : C.accent}
            />
            <text
              x="342"
              y="380"
              fontSize="12"
              fontWeight="700"
              fill={fault === "duplicate" ? C.danger : C.accent}
            >
              5 · 执行回调
            </text>
            <text x="342" y="408" fontSize="11" fill={C.secondary}>
              成功、错误或取消竞争唯一闸门
            </text>
            <text
              x="342"
              y="428"
              fontSize="11"
              fill={fault === "duplicate" ? C.danger : C.secondary}
            >
              completion：
              {fault === "duplicate" ? "two candidates" : "one owner"}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            opacity="0"
          >
            <rect
              x="620"
              y="350"
              width="252"
              height="92"
              rx="10"
              fill={result.ok ? C.success : C.danger}
              fillOpacity="0.1"
              stroke={result.ok ? C.success : C.danger}
            />
            <text
              x="638"
              y="380"
              fontSize="12"
              fontWeight="700"
              fill={result.ok ? C.success : C.danger}
            >
              6 · 资源排空
            </text>
            <text x="638" y="408" fontSize="11" fill={C.secondary}>
              关闭句柄、清理计时器并更新计数
            </text>
            <text
              x="638"
              y="428"
              fontSize="11"
              fill={result.ok ? C.success : C.danger}
            >
              {result.ok
                ? "active resources：0 · close：observed"
                : "close：blocked · retry：hold"}
            </text>
          </g>

          <line
            x1="745"
            y1="306"
            x2="745"
            y2="342"
            stroke={fault === "blocking" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "blocking" ? warningArrowId : arrowId})`}
          />
          <line
            x1="614"
            y1="396"
            x2="584"
            y2="396"
            stroke={fault === "duplicate" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "duplicate" ? warningArrowId : arrowId})`}
          />
          <line
            x1="318"
            y1="396"
            x2="288"
            y2="396"
            stroke={fault === "starvation" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "starvation" ? warningArrowId : arrowId})`}
          />

          <rect
            x="28"
            y="482"
            width="844"
            height="116"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="514" fontSize="12" fontWeight="700" fill={C.primary}>
            可追踪记录
          </text>
          <text x="48" y="542" fontSize="11" fill={C.secondary}>
            request：async-io-03 · owner：runtime · resource：
            {RESOURCE_LABELS[resource]}
          </text>
          <text x="48" y="566" fontSize="11" fill={C.secondary}>
            fault：{FAULT_LABELS[fault]} · queue：{QUEUE_LABELS[queue]} · first
            divergence：{result.ok ? "none" : "callback boundary"}
          </text>
          <rect
            x="48"
            y="580"
            width="804"
            height="12"
            rx="6"
            fill={result.color}
            fillOpacity="0.16"
          />
          <rect
            x="48"
            y="580"
            width={result.ok ? 804 : 510}
            height="12"
            rx="6"
            fill={result.color}
            fillOpacity="0.75"
          />

          <text x="28" y="642" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
          <text x="28" y="674" fontSize="11" fill={C.secondary}>
            先预测调用返回和完成通知的距离，再注入故障，最后确认 close
            与活动资源计数。
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="固定一个资源和一个队列，只改变一个故障条件；用 request id 对齐回调、错误、取消与关闭。"
          reset={{
            label: "重置异步 I/O 实验",
            ariaLabel: "重置 Node 异步 I/O 实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-3 text-center text-xs text-secondary">
        交互提示：先播放时间线，再切换故障；比较 first divergence 与 active
        resources，判断异步实现是否真正收敛。
      </figcaption>
    </figure>
  );
}
