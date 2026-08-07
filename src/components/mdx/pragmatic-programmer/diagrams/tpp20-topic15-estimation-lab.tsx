"use client";

/**
 * Tpp20Topic15EstimationLab：用时间线和单故障开关观察估算如何被校准。
 * 官方单元证据覆盖：15 估算、提示23：通过估算来避免意外、提示24：根据代码不断迭代进度表。
 */
import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";
import {
  DiagramCaption,
  DiagramTitle,
  T,
} from "../../poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 760;
const VIEW_H = 330;
const NODE_W = 124;
const NODE_H = 72;
const GAP = 26;
const START_X = 18;
const START_Y = 72;

const STEPS: readonly TeachingStep[] = [
  { label: "split", caption: "拆分：先固定对象和边界" },
  { label: "unit", caption: "单位：把工作变成可数块" },
  { label: "scale", caption: "数量级：选择足够早的粗粒度" },
  { label: "range", caption: "区间：把假设和不确定性说出来" },
  { label: "calibrate", caption: "校准：用实际进度更新剩余工作" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const NODES = [
  { label: "问题拆分", key: "split", evidence: "对象 / 边界" },
  { label: "估算单位", key: "unit", evidence: "工作块" },
  { label: "数量级", key: "scale", evidence: "规模" },
  { label: "误差区间", key: "range", evidence: "假设" },
  { label: "校准", key: "calibrate", evidence: "实绩" },
] as const;

export function Tpp20Topic15EstimationLab() {
  const [faultInjected, setFaultInjected] = useState(false);
  const highlightRefs = useRef<Record<string, SVGRectElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const element = highlightRefs.current[step.label];
        if (!element) return;
        const start = TEACHING_BEAT_MS * index;
        tl.add(
          element,
          {
            opacity: [0.18, 1],
            scale: [0.97, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          start,
        );
        // 每一步的 label 放在该步动画起点，拖动或单步时字幕与画面同步。
        tl.label(step.label, start);
      });
    },
  });

  const reset = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  const currentStep = STEPS[timeline.currentStep] ?? STEPS[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic15-estimation-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            估算实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入单故障：移除误差区间"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：移除误差区间" : "注入单故障"}
          </button>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="估算实验台：通过播放、暂停、单步或拖动进度观察问题拆分、单位、数量级、区间和校准依次发生；点击注入单故障可移除误差区间，观察校准被迫回退。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker
              id="tpp20-topic15-lab-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={T.secondary} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="把一个日期拆成五次可观察的判断"
          />

          {NODES.map((node, index) => {
            const x = START_X + index * (NODE_W + GAP);
            const center = x + NODE_W / 2;
            const isFaultNode = node.key === "range" && faultInjected;
            return (
              <g key={node.key}>
                {index < NODES.length - 1 && (
                  <line
                    x1={x + NODE_W + 4}
                    y1={START_Y + NODE_H / 2}
                    x2={x + NODE_W + GAP - 5}
                    y2={START_Y + NODE_H / 2}
                    stroke={
                      faultInjected && node.key === "range"
                        ? T.danger
                        : T.secondary
                    }
                    strokeWidth="1.4"
                    strokeDasharray={
                      faultInjected && node.key === "range" ? "5 4" : undefined
                    }
                    markerEnd="url(#tpp20-topic15-lab-arrow)"
                  />
                )}
                <rect
                  x={x}
                  y={START_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={T.primary}
                  fillOpacity="0.03"
                  stroke={isFaultNode ? T.danger : T.border}
                  strokeWidth={isFaultNode ? "1.8" : "1.2"}
                />
                <rect
                  ref={(element) => {
                    highlightRefs.current[node.key] = element;
                  }}
                  x={x}
                  y={START_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={isFaultNode ? T.danger : T.accent}
                  fillOpacity="0.14"
                  stroke={isFaultNode ? T.danger : T.accent}
                  strokeWidth="1.8"
                  opacity="0.18"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
                <text
                  x={center}
                  y={START_Y + 28}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={isFaultNode ? T.danger : T.primary}
                >
                  {node.label}
                </text>
                <text
                  x={center}
                  y={START_Y + 50}
                  textAnchor="middle"
                  fontSize="11"
                  fill={T.secondary}
                >
                  {isFaultNode ? "缺失 → 回退" : node.evidence}
                </text>
              </g>
            );
          })}

          {faultInjected && (
            <g>
              <path
                d="M 510 170 C 510 224, 252 224, 252 170"
                fill="none"
                stroke={T.danger}
                strokeWidth="1.4"
                strokeDasharray="5 4"
              />
              <text
                x="381"
                y="244"
                textAnchor="middle"
                fontSize="11"
                fill={T.danger}
              >
                首差：没有区间，校准不能假装完成
              </text>
            </g>
          )}

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="先预测首差，再只改变一个条件；恢复时从原始输入重放"
          />
        </svg>

        <div className="mt-3 min-h-11 rounded-control border border-border bg-elevated px-3 py-2 text-center text-xs text-secondary">
          <p role="status">
            当前：第 {timeline.currentStep + 1} 步 · {currentStep.caption}
            {faultInjected ? " · 故障样本要求回退到区间假设" : ""}
          </p>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先猜下一步会改变什么，再用单步或播放验证。"
          reset={{
            label: "重置估算",
            ariaLabel: "重置估算实验台",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        试着注入“缺少误差区间”的故障：如果链路仍显示完成，说明验收点错了。
      </figcaption>
    </figure>
  );
}
