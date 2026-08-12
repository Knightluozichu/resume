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

type Arrival = "ordered" | "duplicate" | "late";
type Clock = "event" | "processing";
type Recovery = "checkpoint" | "replay" | "none";
type Effect = "idempotent" | "direct";

const STEPS: readonly TeachingStep[] = [
  { label: "ingest", caption: "事件携带 id、schema 和 event time 进入流" },
  { label: "partition", caption: "分区日志用 offset 保留局部顺序和回放位置" },
  {
    label: "watermark",
    caption: "水位线决定窗口何时关闭，迟到事件仍有补偿边界",
  },
  { label: "state", caption: "有状态算子维护窗口聚合并记录状态版本" },
  { label: "join", caption: "流表或双流连接等待匹配记录并处理不对称到达" },
  { label: "recover", caption: "检查点、重放和幂等副作用共同收束失败" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const ARRIVAL_LABELS: Record<Arrival, string> = {
  ordered: "按序事件",
  duplicate: "重复事件",
  late: "迟到事件",
};

const CLOCK_LABELS: Record<Clock, string> = {
  event: "事件时间",
  processing: "处理时间",
};

const RECOVERY_LABELS: Record<Recovery, string> = {
  checkpoint: "检查点",
  replay: "从日志重放",
  none: "无恢复记录",
};

const EFFECT_LABELS: Record<Effect, string> = {
  idempotent: "幂等副作用",
  direct: "直接副作用",
};

function resultFor(
  arrival: Arrival,
  clock: Clock,
  recovery: Recovery,
  effect: Effect,
) {
  if (effect === "direct" && arrival !== "ordered") {
    return {
      ok: false,
      color: C.danger,
      title: "外部副作用可能重复",
      note: "重放或重复事件会再次扣款、发信或写入外部系统；流处理器内部的 exactly-once 不能替外部系统撤销副作用。",
    };
  }
  if (clock === "processing" && arrival === "late") {
    return {
      ok: false,
      color: C.warning,
      title: "窗口可能提前关闭",
      note: "按处理时间聚合时，迟到事件到达得太晚；要么进入补偿流，要么接受它不再改变已发布窗口。",
    };
  }
  if (recovery === "none" && arrival !== "ordered") {
    return {
      ok: false,
      color: C.danger,
      title: "状态边界不可恢复",
      note: "没有 offset、检查点或可重放日志，无法知道状态已经处理到哪里；重启后既可能遗漏也可能重复。",
    };
  }
  if (arrival === "duplicate" && recovery === "replay") {
    return {
      ok: true,
      color: C.success,
      title: "按事件 id 去重后可收束",
      note: "日志保留原始事件，状态更新和外部写入使用事件 id 幂等；重放可以重新计算窗口而不会扩大副作用。",
    };
  }
  if (arrival === "late" && clock === "event" && recovery !== "none") {
    return {
      ok: true,
      color: C.success,
      title: "迟到事件进入补偿边界",
      note: "事件时间配合水位线和允许迟到区间，窗口可以重开或产生修正结果；检查点保留恢复位置。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "可回放收束",
    note: "事件、分区 offset、窗口状态和副作用边界都可追踪；故障后能从明确位置恢复并验证结果。",
  };
}

export function Ddi11StreamProcessingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-11-stream-arrow-${instanceId}`;
  const warningArrowId = `ddia-11-stream-warning-${instanceId}`;
  const [arrival, setArrival] = useState<Arrival>("late");
  const [clock, setClock] = useState<Clock>("event");
  const [recovery, setRecovery] = useState<Recovery>("checkpoint");
  const [effect, setEffect] = useState<Effect>("idempotent");

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
  const result = resultFor(arrival, clock, recovery, effect);
  const late = arrival === "late";
  const unsafe = !result.ok;

  function reset() {
    setArrival("late");
    setClock("event");
    setRecovery("checkpoint");
    setEffect("idempotent");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-11-stream-processing"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 11 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              用时间、状态和回放驯服事件流
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择事件到达方式、时间语义、恢复记录和外部副作用；沿六阶段时间线观察窗口、连接与重放如何共同决定结果。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择事件到达方式">
            {(Object.entries(ARRIVAL_LABELS) as [Arrival, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={arrival === value}
                  onClick={() => setArrival(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    arrival === value
                      ? value === "ordered"
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
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="flex flex-wrap gap-2" aria-label="选择时间语义">
            <span className="self-center text-xs text-secondary">时钟：</span>
            {(Object.entries(CLOCK_LABELS) as [Clock, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={clock === value}
                  onClick={() => setClock(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    clock === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择恢复记录">
            <span className="self-center text-xs text-secondary">恢复：</span>
            {(Object.entries(RECOVERY_LABELS) as [Recovery, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={recovery === value}
                  onClick={() => setRecovery(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    recovery === value
                      ? value === "none"
                        ? "border-danger text-danger"
                        : "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择外部副作用">
            <span className="self-center text-xs text-secondary">副作用：</span>
            {(Object.entries(EFFECT_LABELS) as [Effect, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={effect === value}
                  onClick={() => setEffect(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    effect === value
                      ? value === "direct"
                        ? "border-danger text-danger"
                        : "border-accent text-accent"
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
          aria-label={`流处理实验图：事件为${ARRIVAL_LABELS[arrival]}，时间语义为${CLOCK_LABELS[clock]}，恢复方式为${RECOVERY_LABELS[recovery]}，副作用为${EFFECT_LABELS[effect]}，当前结论为${result.title}。时间线展示摄取、分区、水位线、状态、连接和恢复六阶段；支持播放、暂停、单步、拖进度、四个条件切换和重置。`}
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
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="700" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            事件 → 分区 → 水位线 → 状态 → 连接 → 检查点与回放
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            流处理的可靠性来自可识别的事件、可追踪的 offset 和可恢复的状态边界
          </text>

          <rect
            x="28"
            y="80"
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
            当前结论：{result.title} · {ARRIVAL_LABELS[arrival]} ·{" "}
            {CLOCK_LABELS[clock]} · {RECOVERY_LABELS[recovery]} ·{" "}
            {EFFECT_LABELS[effect]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="156" fontSize="11" fill={result.color}>
            验收条件：
            {result.ok
              ? "事件、状态和副作用可追踪并可恢复"
              : "先划出补偿边界，再发布结果"}
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="202"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="44" y="232" fontSize="12" fontWeight="700" fill={C.accent}>
              摄取
            </text>
            <text x="44" y="260" fontSize="11" fill={C.secondary}>
              order-1042
            </text>
            <text x="44" y="284" fontSize="11" fill={C.secondary}>
              id · schema · event time
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="170"
              y="202"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="186"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              分区日志
            </text>
            <text x="186" y="260" fontSize="11" fill={C.secondary}>
              p-03 · offset 1842
            </text>
            <text x="186" y="284" fontSize="11" fill={C.secondary}>
              局部顺序可回放
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="312"
              y="202"
              width="128"
              height="112"
              rx="10"
              fill={late ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={late ? C.warning : C.accent}
            />
            <text
              x="328"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={late ? C.warning : C.accent}
            >
              水位线
            </text>
            <text x="328" y="260" fontSize="11" fill={C.secondary}>
              {clock === "event" ? "event time" : "processing time"}
            </text>
            <text x="328" y="284" fontSize="11" fill={C.secondary}>
              {late ? "允许迟到 5 min" : "按窗口顺序关闭"}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="454"
              y="202"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="470"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              有状态窗口
            </text>
            <text x="470" y="260" fontSize="11" fill={C.secondary}>
              sum(amount) · v18
            </text>
            <text x="470" y="284" fontSize="11" fill={C.secondary}>
              状态与 offset 对齐
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="596"
              y="202"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="612"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              流连接
            </text>
            <text x="612" y="260" fontSize="11" fill={C.secondary}>
              stream ↔ table
            </text>
            <text x="612" y="284" fontSize="11" fill={C.secondary}>
              等待匹配与版本
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            opacity="0"
          >
            <rect
              x="738"
              y="202"
              width="134"
              height="112"
              rx="10"
              fill={unsafe ? C.danger : C.success}
              fillOpacity="0.1"
              stroke={unsafe ? C.danger : C.success}
            />
            <text
              x="754"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={unsafe ? C.danger : C.success}
            >
              恢复
            </text>
            <text x="754" y="260" fontSize="11" fill={C.secondary}>
              {recovery === "none" ? "无边界" : RECOVERY_LABELS[recovery]}
            </text>
            <text x="754" y="284" fontSize="11" fill={C.secondary}>
              {effect === "direct" ? "外部写入重做" : "事件 id 幂等"}
            </text>
          </g>

          <line
            x1="156"
            y1="258"
            x2="166"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="298"
            y1="258"
            x2="308"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="440"
            y1="258"
            x2="450"
            y2="258"
            stroke={late ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${late ? warningArrowId : arrowId})`}
          />
          <line
            x1="582"
            y1="258"
            x2="592"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="724"
            y1="258"
            x2="734"
            y2="258"
            stroke={unsafe ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${unsafe ? warningArrowId : arrowId})`}
          />

          <rect
            x="28"
            y="350"
            width="404"
            height="112"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="380" fontSize="12" fontWeight="700" fill={C.primary}>
            窗口与状态证据
          </text>
          <text x="48" y="408" fontSize="11" fill={C.secondary}>
            时钟：{CLOCK_LABELS[clock]} · 水位线：
            {late ? "允许迟到 5 min" : "按序关闭"}
          </text>
          <text
            x="48"
            y="436"
            fontSize="11"
            fill={late ? C.warning : C.secondary}
          >
            {late
              ? "迟到事件：记录补偿路径，不要静默丢弃或覆盖已发布窗口。"
              : "按序事件：仍需保存窗口边界、状态版本和已提交 offset。"}
          </text>

          <rect
            x="460"
            y="350"
            width="412"
            height="112"
            rx="12"
            fill={result.color}
            fillOpacity="0.08"
            stroke={result.color}
          />
          <text
            x="480"
            y="380"
            fontSize="12"
            fontWeight="700"
            fill={result.color}
          >
            恢复与副作用
          </text>
          <text x="480" y="408" fontSize="11" fill={C.secondary}>
            恢复：{RECOVERY_LABELS[recovery]} · 副作用：{EFFECT_LABELS[effect]}
          </text>
          <text x="480" y="436" fontSize="11" fill={result.color}>
            {result.ok
              ? "可交接：从明确 offset 恢复，并用事件 id 验证外部写入"
              : "不可交接：先停止发布，补齐日志、状态或幂等边界"}
          </text>

          <rect
            x="28"
            y="500"
            width="844"
            height="136"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="530" fontSize="12" fontWeight="700" fill={C.primary}>
            外部证据表：事件、offset、窗口、水位线和副作用必须能互相对上
          </text>
          <text x="48" y="558" fontSize="11" fill={C.secondary}>
            事件：order-1042 · 分区：p-03 · offset：1842 · schema：v7
          </text>
          <text x="48" y="584" fontSize="11" fill={C.secondary}>
            窗口：10:00–10:05 · 水位线：
            {clock === "event" ? "event-time + 5 min" : "到达即关闭"} ·
            状态：v18
          </text>
          <rect
            x="48"
            y="600"
            width="804"
            height="22"
            rx="7"
            fill={result.color}
            fillOpacity="0.12"
          />
          <text
            x="450"
            y="616"
            textAnchor="middle"
            fontSize="11"
            fill={result.color}
          >
            {result.ok
              ? "通过条件：重放不丢事件、不扩大副作用，窗口修正路径可追踪"
              : "通过条件：划出迟到、重复或未知状态的补偿边界后再发布"}
          </text>

          <text x="30" y="676" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测迟到或重复事件会在哪个边界产生问题，再只改变一个时间、恢复或副作用条件并重放。"
          reset={{
            label: "重置第 11 章实验",
            ariaLabel: "重置流处理第 11 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        流处理的关键不是把事件尽快算完，而是让时间、状态、连接与副作用都能在失败后被解释和恢复。
      </figcaption>
    </figure>
  );
}
