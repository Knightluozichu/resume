"use client";

/**
 * Tpp20Topic16PlainTextLab：提示 25 的五站文本迁移实验台。
 *
 * 时间线展示知识如何经过编码、结构、历史和独立读取；故障开关只移除
 * 结构格式，读者可以观察首个拒绝点并从原始输入重置。每个 label 都在
 * 对应动画的起点，保证单步、拖动和字幕同步。
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
const VIEW_H = 410;
const NODE_W = 126;
const NODE_H = 102;
const GAP = 20;
const START_X = 20;
const START_Y = 82;

const STEPS: readonly TeachingStep[] = [
  { label: "knowledge", caption: "知识：先挑一个可交接对象" },
  { label: "encoding", caption: "编码：声明字节如何还原字符" },
  { label: "structure", caption: "结构：声明键、值和层级" },
  { label: "history", caption: "历史：提交一次最小差异" },
  { label: "reading", caption: "读取：让另一种工具复核" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const NODES = [
  { key: "knowledge", title: "知识", evidence: "对象 / 边界" },
  { key: "encoding", title: "编码", evidence: "UTF-8 / 换行" },
  { key: "structure", title: "结构格式", evidence: "键 / 值 / 层级" },
  { key: "history", title: "版本控制", evidence: "最小差异" },
  { key: "reading", title: "独立读取", evidence: "脚本 / 人" },
] as const;

export function Tpp20Topic16PlainTextLab() {
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
            opacity: [0.16, 1],
            scale: [0.97, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          start,
        );
        tl.label(step.label, start);
      });
    },
  });

  const reset = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  const currentStep = STEPS[timeline.currentStep] ?? STEPS[0];
  const reachedFailure = faultInjected && timeline.currentStep >= 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic16-plain-text-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            提示25 · 文本迁移实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入单故障：移除结构格式"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：移除结构格式" : "注入单故障"}
          </button>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="提示25：将知识用纯文本保存的五站实验台。通过播放、暂停、单步或拖动进度观察知识、编码、结构格式、版本控制和独立读取；注入单故障会移除结构格式，首差应在结构站暴露并回退。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker
              id="tpp20-topic16-lab-arrow"
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
            y={32}
            text="把一份知识交给五个可复核的站点"
          />

          {NODES.map((node, index) => {
            const x = START_X + index * (NODE_W + GAP);
            const center = x + NODE_W / 2;
            const isFaultNode = node.key === "structure" && faultInjected;
            return (
              <g key={node.key}>
                {index < NODES.length - 1 && (
                  <line
                    x1={x + NODE_W + 4}
                    y1={START_Y + NODE_H / 2}
                    x2={x + NODE_W + GAP - 5}
                    y2={START_Y + NODE_H / 2}
                    stroke={
                      faultInjected && node.key === "structure"
                        ? T.danger
                        : T.secondary
                    }
                    strokeWidth="1.4"
                    strokeDasharray={
                      faultInjected && node.key === "structure"
                        ? "5 4"
                        : undefined
                    }
                    markerEnd="url(#tpp20-topic16-lab-arrow)"
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
                  opacity="0.16"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
                <text
                  x={center}
                  y={START_Y + 34}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={isFaultNode ? T.danger : T.primary}
                >
                  {node.title}
                </text>
                <text
                  x={center}
                  y={START_Y + 59}
                  textAnchor="middle"
                  fontSize="11"
                  fill={isFaultNode ? T.danger : T.secondary}
                >
                  {isFaultNode ? "缺失 → 拒绝" : node.evidence}
                </text>
                <text
                  x={center}
                  y={START_Y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={isFaultNode ? T.danger : T.accent}
                >
                  {index + 1}
                </text>
              </g>
            );
          })}

          {reachedFailure && (
            <g>
              <path
                d="M 590 228 C 590 294, 286 294, 286 228"
                fill="none"
                stroke={T.danger}
                strokeWidth="1.5"
                strokeDasharray="5 4"
              />
              <text
                x={438}
                y={318}
                textAnchor="middle"
                fontSize="11"
                fill={T.danger}
              >
                首差：没有结构，版本和读取都必须回退
              </text>
            </g>
          )}

          <rect
            x="84"
            y="350"
            width="592"
            height="26"
            rx="8"
            fill={reachedFailure ? T.danger : T.success}
            fillOpacity="0.08"
            stroke={reachedFailure ? T.danger : T.success}
            strokeWidth="1"
          />
          <text
            x={VIEW_W / 2}
            y="368"
            textAnchor="middle"
            fontSize="11"
            fill={reachedFailure ? T.danger : T.success}
          >
            {reachedFailure
              ? "拒绝：先恢复结构格式，再从原始文本重放"
              : "验收：同一文本由人和另一种工具读出同一语义"}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="先预测首差，再只改变一个条件；恢复时回到原始输入"
          />
        </svg>

        <div className="mt-3 min-h-11 rounded-control border border-border bg-elevated px-3 py-2 text-center text-xs text-secondary">
          <p role="status">
            当前：第 {timeline.currentStep + 1} 步 · {currentStep.caption}
            {faultInjected ? " · 故障样本等待结构恢复" : ""}
          </p>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先猜下一站会改变什么，再用单步或播放验证。"
          reset={{
            label: "重置文本实验台",
            ariaLabel: "重置文本迁移实验台",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        移除结构格式试试看：如果实验仍显示成功，验收点就没有覆盖真正的知识。
      </figcaption>
    </figure>
  );
}
