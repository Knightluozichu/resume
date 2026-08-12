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

const VIEW_W = 800;
const VIEW_H = 460;
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

type Route = "representation" | "execution" | "resources" | "concurrency";
type Sample = "normal" | "boundary" | "failure";

const ROUTES: readonly {
  id: Route;
  label: string;
  focus: string;
  next: string;
}[] = [
  {
    id: "representation",
    label: "位与字节",
    focus: "宽度、编码、溢出",
    next: "第2章 信息的表示和处理",
  },
  {
    id: "execution",
    label: "指令与处理器",
    focus: "寄存器、栈、流水线",
    next: "第3章 程序的机器级表示",
  },
  {
    id: "resources",
    label: "缓存与地址",
    focus: "命中、页、权限",
    next: "第6章 存储器层次结构",
  },
  {
    id: "concurrency",
    label: "通信与并发",
    focus: "字节流、锁、生命周期",
    next: "第11章 网络编程 / 第12章 并发编程",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  observation: string;
  evidence: string;
}[] = [
  {
    id: "normal",
    label: "正常样本",
    observation: "输入到输出稳定",
    evidence: "基线快照",
  },
  {
    id: "boundary",
    label: "边界样本",
    observation: "位宽或容量接近边界",
    evidence: "范围与权限",
  },
  {
    id: "failure",
    label: "失败样本",
    observation: "结果偏离或资源未清理",
    evidence: "首个偏差",
  },
] as const;

const LAYERS: readonly { id: string; label: string; artifact: string }[] = [
  { id: "bits", label: "位与字节", artifact: "hex / width" },
  { id: "machine", label: "指令与处理器", artifact: "asm / registers" },
  { id: "memory", label: "缓存与地址", artifact: "trace / mapping" },
  { id: "process", label: "进程与 I/O", artifact: "fd / syscall" },
  { id: "network", label: "网络", artifact: "bytes / protocol" },
  { id: "threads", label: "并发", artifact: "lock / lifecycle" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "observe", caption: "描述观察对象。" },
  { label: "model", caption: "选择抽象层。" },
  { label: "trace", caption: "保存中间证据。" },
  { label: "compare", caption: "比较正常与边界。" },
  { label: "replay", caption: "重放并安排下一章。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
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

function LayerCard({
  layer,
  index,
  route,
  sample,
}: {
  layer: (typeof LAYERS)[number];
  index: number;
  route: Route;
  sample: Sample;
}) {
  const routeLayer =
    route === "representation"
      ? index === 0
      : route === "execution"
        ? index === 1
        : route === "resources"
          ? index === 2 || index === 3
          : index >= 4;
  const isFault = sample === "failure" && routeLayer;
  const isBoundary = sample === "boundary" && routeLayer;
  const color = isFault
    ? COLORS.danger
    : isBoundary
      ? COLORS.warning
      : routeLayer
        ? COLORS.accent
        : COLORS.border;
  const state = isFault
    ? "首个偏差"
    : isBoundary
      ? "边界"
      : routeLayer
        ? "重点"
        : "可跳过";
  return (
    <g>
      <rect
        x={24 + index * 124}
        y="112"
        width="106"
        height="100"
        rx="12"
        fill={COLORS.elevated}
        stroke={color}
        strokeWidth={routeLayer ? 2 : 1.2}
      />
      <circle cx={44 + index * 124} cy="134" r="6" fill={color} />
      <text
        x={58 + index * 124}
        y="139"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {layer.label}
      </text>
      <text x={38 + index * 124} y="168" fontSize="12" fill={COLORS.secondary}>
        {layer.artifact}
      </text>
      <text x={38 + index * 124} y="195" fontSize="13" fill={color}>
        {state}
      </text>
    </g>
  );
}

function LayerArrow({ index }: { index: number }) {
  return (
    <line
      x1={130 + index * 124}
      y1="162"
      x2={142 + index * 124}
      y2="162"
      stroke={COLORS.border}
      strokeWidth="2"
      markerEnd="url(#cap-learning-map-arrow)"
    />
  );
}

/** CSAPP 导学页专属实验：按观察对象选择抽象层，并重放到下一章。 */
export function CapOfficialLearningMapLab() {
  const [route, setRoute] = useState<Route>("representation");
  const [sample, setSample] = useState<Sample>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const currentRoute = useMemo(
    () => ROUTES.find((item) => item.id === route) ?? ROUTES[0],
    [route],
  );
  const currentSample = useMemo(
    () => SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0],
    [sample],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = timelineRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.3, 1],
            scale: [0.94, 1],
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
    setRoute("representation");
    setSample("normal");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="CSAPP 权威学习地图专属六层路线实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cap-official-learning-map-layer-route"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CapOfficialLearningMapLab · 六层学习路线台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让当前现象决定下一章，而不是让目录决定焦虑
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：一个字段发生变化时，哪一层的产物最值得先收集？
          </p>
        </div>
      </header>

      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择学习路线">
          {ROUTES.map((item) => (
            <ToggleButton
              key={item.id}
              active={route === item.id}
              onClick={() => setRoute(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择学习样本">
          {SAMPLES.map((item) => (
            <ToggleButton
              key={item.id}
              active={sample === item.id}
              onClick={() => setSample(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`CSAPP 六层学习路线可视化；当前路线${currentRoute.label}，关注${currentRoute.focus}，样本为${currentSample.label}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cap-learning-map-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.border} />
              </marker>
            </defs>
            <rect
              x="0"
              y="0"
              width={VIEW_W}
              height={VIEW_H}
              rx="12"
              fill="var(--bg)"
            />
            <text
              x="28"
              y="42"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {currentRoute.label} · {currentSample.label}
            </text>
            <text x="28" y="68" fontSize="13" fill={COLORS.secondary}>
              关注 {currentRoute.focus}，下一站：{currentRoute.next}
            </text>
            <g aria-hidden="true" opacity="0" pointerEvents="none">
              {STEPS.map((step, index) => (
                <g
                  key={step.label}
                  ref={(element) => {
                    timelineRefs.current[step.label] = element;
                  }}
                  transform={`translate(${42 + index * 146} 82)`}
                >
                  <rect width="116" height="22" rx="6" fill={COLORS.accent} />
                  <text x="10" y="16" fontSize="11" fill="var(--bg)">
                    T{index} · {step.label}
                  </text>
                </g>
              ))}
            </g>
            {LAYERS.map((layer, index) => (
              <g key={layer.id}>
                <LayerCard
                  layer={layer}
                  index={index}
                  route={route}
                  sample={sample}
                />
                {index < LAYERS.length - 1 && <LayerArrow index={index} />}
              </g>
            ))}
            <rect
              x="24"
              y="246"
              width="752"
              height="78"
              rx="12"
              fill={
                sample === "failure"
                  ? COLORS.danger
                  : sample === "boundary"
                    ? COLORS.warning
                    : COLORS.success
              }
              fillOpacity="0.12"
              stroke={
                sample === "failure"
                  ? COLORS.danger
                  : sample === "boundary"
                    ? COLORS.warning
                    : COLORS.success
              }
              strokeWidth="2"
            />
            <text
              x="44"
              y="274"
              fontSize="14"
              fontWeight="700"
              fill={
                sample === "failure"
                  ? COLORS.danger
                  : sample === "boundary"
                    ? COLORS.warning
                    : COLORS.success
              }
            >
              {sample === "failure"
                ? "先停在首个偏差，不要跨层猜测"
                : sample === "boundary"
                  ? "边界样本：比较范围、权限与资源状态"
                  : "正常样本：建立可重放的路线基线"}
            </text>
            <text x="44" y="300" fontSize="13" fill={COLORS.secondary}>
              {currentSample.observation}；首轮证据：{currentSample.evidence}。
            </text>
            <g transform="translate(24 356)">
              <text
                x="0"
                y="0"
                fontSize="13"
                fontWeight="700"
                fill={COLORS.primary}
              >
                下一步学习动作
              </text>
              <rect
                x="0"
                y="16"
                width="752"
                height="44"
                rx="9"
                fill={COLORS.elevated}
                stroke={COLORS.border}
              />
              <circle cx="20" cy="38" r="6" fill={COLORS.accent} />
              <text x="38" y="43" fontSize="13" fill={COLORS.primary}>
                运行 {currentRoute.label} 探针，保存 {currentSample.evidence}
                ，再进入 {currentRoute.next}
              </text>
            </g>
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            {currentRoute.label}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {sample === "failure"
              ? "先收集首个偏差所在层的产物；后续层只作为连锁结果记录。"
              : sample === "boundary"
                ? "把边界值、容量或权限写进实验，比较预测与实际状态后再换路线。"
                : `先建立正常基线，再用同一输入重放；下一站是 ${currentRoute.next}。`}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单步回放 observe、model、trace、compare 和 replay；重置后可用同一条路线重新选择样本。"
          reset={{
            label: "重置学习路线",
            ariaLabel: "重置 CSAPP 权威学习地图专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
