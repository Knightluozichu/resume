"use client";

import { useId, useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const COLORS = {
  background: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const STAGES = [
  {
    key: "contract",
    label: "合同",
    detail: "shared state / invariant",
    evidence: "写出不变量",
  },
  {
    key: "publish",
    label: "发布",
    detail: "start / happens-before",
    evidence: "标出同步边",
  },
  {
    key: "schedule",
    label: "调度",
    detail: "carrier / state",
    evidence: "保存线程状态",
  },
  {
    key: "contend",
    label: "竞争",
    detail: "lock / queue",
    evidence: "保留等待者",
  },
  {
    key: "observe",
    label: "观察",
    detail: "dump / ordering",
    evidence: "关联 PID 与时间",
  },
  {
    key: "replay",
    label: "重放",
    detail: "same input / exit",
    evidence: "核对反例与恢复",
  },
] as const;

const BOUNDARIES = [
  {
    key: "memory",
    label: "内存边界",
    value: "visibility + ordering",
    signal: "写入、读取、同步边",
  },
  {
    key: "carrier",
    label: "线程边界",
    value: "platform + virtual",
    signal: "载体、状态、生命周期",
  },
  {
    key: "lock",
    label: "锁边界",
    value: "owner + waiter",
    signal: "拥有者、等待者、队列",
  },
  {
    key: "dump",
    label: "观测边界",
    value: "pid + timestamp",
    signal: "转储、锁事件、采集窗口",
  },
  {
    key: "replay",
    label: "重放边界",
    value: "fresh process + exit",
    signal: "输入哈希、退出码、清理",
  },
] as const;

const OFFICIAL_NODES = ["第五部分 高效并发"] as const;

type Lens = "correctness" | "contention" | "replay";

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  correctness: {
    label: "正确性",
    title: "先证明可见性与顺序",
    note: "每次共享读都要回到明确的同步边或安全发布，不能把一次“看起来正确”当成证明。",
  },
  contention: {
    label: "竞争",
    title: "再分离等待与吞吐",
    note: "锁拥有者、等待者和调度状态解释竞争；吞吐数字不能替代等待时间与尾延迟记录。",
  },
  replay: {
    label: "重放",
    title: "最后核对同输入恢复",
    note: "相同 Class、输入摘要和采集窗口配合全新进程，才能排除旧状态与上一轮日志污染。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Part5ConcurrencyEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-part5-concurrency-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("correctness");
  const [boundary, setBoundary] =
    useState<(typeof BOUNDARIES)[number]["key"]>("memory");
  const [failureInjected, setFailureInjected] = useState(false);
  const [carrier, setCarrier] = useState<"platform" | "virtual">("platform");
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STAGES.forEach((stage, index) => {
        const element = stageRefs.current[index];
        if (element) {
          tl.add(
            element,
            {
              opacity: [0.18, 1],
              translateX: [-12, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            index * TEACHING_BEAT_MS,
          );
        }
        tl.label(stage.key, index * TEACHING_BEAT_MS);
      });
    },
  });

  const activeStage = STAGES[timeline.currentStep] ?? STAGES[0];
  const selectedBoundary =
    BOUNDARIES.find((item) => item.key === boundary) ?? BOUNDARIES[0];
  const lensState = LENSES[lens];
  const statusColor = failureInjected ? COLORS.warning : COLORS.success;

  function reset() {
    setLens("correctness");
    setBoundary("memory");
    setFailureInjected(false);
    setCarrier("platform");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-part5-concurrency-evidence"
      data-unit-id="duj3-part-5-concurrency"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第五部分
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              并发同步合同与故障重放台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿合同、发布、调度、竞争、观察和重放推进；状态只表达证据顺序，不把一次成功运行伪装成线程安全证明。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置并发证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择并发证据镜头">
            <span className="self-center text-xs text-secondary">镜头：</span>
            {(Object.entries(LENSES) as [Lens, (typeof LENSES)[Lens]][]).map(
              ([value, item]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={lens === value}
                  onClick={() => setLens(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                    lens === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            aria-pressed={failureInjected}
            onClick={() => setFailureInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              failureInjected
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {failureInjected ? "恢复基线" : "注入可见性故障"}
          </button>
        </div>

        <div
          className="mb-4 grid gap-2 sm:grid-cols-2"
          aria-label="选择线程载体"
        >
          <button
            type="button"
            aria-pressed={carrier === "platform"}
            onClick={() => setCarrier("platform")}
            className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
              carrier === "platform"
                ? "border-accent text-accent"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            平台线程：一个载体对应一个 OS 线程
          </button>
          <button
            type="button"
            aria-pressed={carrier === "virtual"}
            onClick={() => setCarrier("virtual")}
            className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
              carrier === "virtual"
                ? "border-accent text-accent"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            虚拟线程：载体与 OS 线程分离
          </button>
        </div>

        <svg
          aria-label="并发证据图：同步合同经过发布、线程调度、锁竞争、线程转储和全新进程重放；支持镜头切换、线程载体切换、故障注入、播放、暂停、单步和进度拖动。"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 700 1030"
        >
          <defs>
            <marker
              id={arrowId}
              markerHeight="8"
              markerWidth="8"
              orient="auto"
              refX="6"
              refY="4"
              viewBox="0 0 8 8"
            >
              <path d="M0 0 L8 4 L0 8 Z" fill={COLORS.border} />
            </marker>
          </defs>

          <text
            x="54"
            y="28"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            当前阶段 · {activeStage.label}
          </text>
          <text x="54" y="50" fontSize="12" fill={COLORS.secondary}>
            {activeStage.detail} · {activeStage.evidence} · {carrier} carrier
          </text>

          {STAGES.map((stage, index) => {
            const y = 72 + index * 60;
            const selected = index === timeline.currentStep;
            return (
              <g
                key={stage.key}
                ref={(element) => {
                  stageRefs.current[index] = element;
                }}
              >
                {index < STAGES.length - 1 ? (
                  <line
                    x1="350"
                    y1={y + 46}
                    x2="350"
                    y2={y + 58}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="46"
                  rx="10"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <circle
                  cx="88"
                  cy={y + 23}
                  r="13"
                  fill={selected ? COLORS.background : COLORS.accent}
                />
                <text
                  x="88"
                  y={y + 28}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.background}
                >
                  {index + 1}
                </text>
                <text
                  x="118"
                  y={y + 20}
                  fontSize="13"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {stage.label}
                </text>
                <text x="118" y={y + 36} fontSize="12" fill={COLORS.secondary}>
                  {stage.detail} · {stage.evidence}
                </text>
                <circle
                  cx="614"
                  cy={y + 23}
                  r="5"
                  fill={selected ? COLORS.success : COLORS.border}
                />
              </g>
            );
          })}

          <text
            x="54"
            y="452"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            当前证据边界 · {selectedBoundary.label} ({selectedBoundary.value})
          </text>
          {BOUNDARIES.map((item, index) => {
            const y = 476 + index * 38;
            const selected = boundary === item.key;
            return (
              <g key={item.key}>
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="29"
                  rx="8"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <text
                  x="72"
                  y={y + 19}
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {item.label} · {item.value}
                </text>
                <text x="310" y={y + 19} fontSize="12" fill={COLORS.secondary}>
                  证据：{item.signal}
                </text>
              </g>
            );
          })}

          <rect
            x="54"
            y="704"
            width="592"
            height="154"
            rx="10"
            fill={COLORS.background}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="76"
            y="734"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {failureInjected ? "失败模式" : "当前观察镜头"} · {lensState.label}
          </text>
          <text
            x="76"
            y="764"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {failureInjected
              ? "首次可见性异常：保留输入、同步边与转储"
              : lensState.title}
          </text>
          <text x="76" y="794" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "记录共享读写、线程载体、锁状态、PID、采集窗口和完整日志，不先重启覆盖现场。"
              : lensState.note}
          </text>
          <text x="76" y="824" fontSize="12" fill={COLORS.secondary}>
            当前边界：{selectedBoundary.label} · 下一份记录：
            {activeStage.detail}
          </text>

          <line
            x1="54"
            y1="888"
            x2="646"
            y2="888"
            stroke={COLORS.border}
            strokeDasharray="5 4"
          />
          <text x="54" y="918" fontSize="12" fill={COLORS.secondary}>
            结论格式：固定输入 · 同步边 · 原始转储 · 全新进程重放
          </text>
          <text x="54" y="944" fontSize="12" fill={COLORS.secondary}>
            未测量的调度顺序、默认值与跨版本差异保留为 unknowns。
          </text>
          <text x="54" y="982" fontSize="12" fill={COLORS.accent}>
            正式单元：{OFFICIAL_NODES.join(" · ")}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先写不变量，再标同步边；出现异常就保存现场，用同输入启动全新进程重放。"
          reset={{
            label: "重置并发证据链",
            ariaLabel: "重置并发证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        专属证据地图：把第五部分的正确性、竞争与重放收束为一条可观察状态链。
      </figcaption>
    </figure>
  );
}
