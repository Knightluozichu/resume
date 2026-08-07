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
import {
  DiagramCaption,
  DiagramTitle,
  T,
} from "../../poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 980;
const VIEW_H = 470;
const CARD_W = 150;
const CARD_H = 148;
const START_X = 20;
const START_Y = 104;
const GAP = 36;

const STAGES = [
  { key: "coupling", title: "边界解耦", detail: "耦合 · 所有权" },
  { key: "events", title: "事件协调", detail: "事件流 · 时序" },
  { key: "transform", title: "数据变换", detail: "输入 → 输出" },
  { key: "delegation", title: "组合复用", detail: "委托 · 能力" },
  { key: "config", title: "策略外置", detail: "配置 · 版本" },
] as const;

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.title}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

type StageRefs = {
  current: Record<string, SVGRectElement | null>;
};

function BendChainSvg({
  current,
  fault,
  ariaLabel,
  stageRefs,
}: {
  current: number;
  fault: boolean;
  ariaLabel: string;
  stageRefs?: StageRefs;
}) {
  const markerId = useId().replace(/:/g, "");
  const firstChanged = fault && current >= 2;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={ariaLabel}
      className="mx-auto block h-auto w-full max-w-[980px]"
    >
      <defs>
        <marker
          id={`tpp20-chapter05-arrow-${markerId}`}
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="4.5"
          orient="auto"
        >
          <path d="M0 0 L9 4.5 L0 9 z" fill={T.accent} />
        </marker>
      </defs>

      <DiagramTitle
        x={VIEW_W / 2}
        y={30}
        text="宁弯不折：变化沿边界传递，断点在首个缺证处暴露"
      />
      <text
        x={VIEW_W / 2}
        y="58"
        textAnchor="middle"
        fontSize="12"
        fill={T.secondary}
      >
        当前：第 {current + 1} 步 · {STAGES[current].title} · {STAGES[current].detail}
      </text>

      {STAGES.slice(0, -1).map((stage, index) => {
        const active = index < current;
        const broken = firstChanged && index >= 2;
        return (
          <line
            key={`arrow-${stage.key}`}
            x1={stageX(index) + CARD_W + 4}
            y1={START_Y + CARD_H / 2}
            x2={stageX(index + 1) - 8}
            y2={START_Y + CARD_H / 2}
            stroke={broken ? T.danger : active ? T.accent : T.border}
            strokeWidth={broken || active ? "2" : "1.2"}
            strokeDasharray={broken ? "7 4" : undefined}
            markerEnd={`url(#tpp20-chapter05-arrow-${markerId})`}
          />
        );
      })}

      {STAGES.map((stage, index) => {
        const reached = index <= current;
        const failed = firstChanged && index >= 2;
        const x = stageX(index);
        return (
          <g key={stage.key}>
            <rect
              ref={(element) => {
                if (stageRefs) stageRefs.current[stage.key] = element;
              }}
              x={x}
              y={START_Y}
              width={CARD_W}
              height={CARD_H}
              rx="12"
              fill={failed ? T.danger : reached ? T.accent : T.elevated}
              fillOpacity={failed || reached ? "0.09" : "1"}
              stroke={failed ? T.danger : reached ? T.accent : T.border}
              strokeWidth={failed || reached ? "2" : "1.2"}
            />
            <circle
              cx={x + 22}
              cy={START_Y + 25}
              r="10"
              fill={failed ? T.danger : reached ? T.accent : T.border}
            />
            <text
              x={x + 22}
              y={START_Y + 29}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={T.elevated}
            >
              {index + 1}
            </text>
            <text
              x={x + CARD_W / 2}
              y={START_Y + 29}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={failed ? T.danger : reached ? T.accent : T.primary}
            >
              {failed && index === 2 ? "首差：数据变换" : stage.title}
            </text>
            <text
              x={x + CARD_W / 2}
              y={START_Y + 72}
              textAnchor="middle"
              fontSize="11"
              fill={T.secondary}
            >
              {stage.detail}
            </text>
            <text
              x={x + CARD_W / 2}
              y={START_Y + 101}
              textAnchor="middle"
              fontSize="11"
              fill={failed && index === 2 ? T.danger : T.secondary}
            >
              {failed && index === 2 ? "中间值缺失" : "输入 / 输出可追踪"}
            </text>
            <text
              x={x + CARD_W / 2}
              y={START_Y + 132}
              textAnchor="middle"
              fontSize="11"
              fill={reached ? T.primary : T.secondary}
            >
              {reached ? "证据已写入" : "等待观察"}
            </text>
          </g>
        );
      })}

      <rect
        x="88"
        y="330"
        width="804"
        height="88"
        rx="12"
        fill={firstChanged ? T.danger : T.elevated}
        fillOpacity={firstChanged ? "0.08" : "1"}
        stroke={firstChanged ? T.danger : T.border}
        strokeWidth="1.2"
      />
      <text
        x={VIEW_W / 2}
        y="358"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={firstChanged ? T.danger : T.accent}
      >
        {firstChanged
          ? "拒绝继续：变换没有产出可验证的中间结果"
          : "验收合同：每次变化都能局部替换、重放并回退"}
      </text>
      <text
        x={VIEW_W / 2}
        y="384"
        textAnchor="middle"
        fontSize="11"
        fill={T.secondary}
      >
        {firstChanged
          ? "修法：从原始输入恢复数据变换，不用最后一个成功标记掩盖首差"
          : "耦合 → 事件流 → 变换 → 委托 → 配置：沿边界传递证据"}
      </text>
      <DiagramCaption
        x={VIEW_W / 2}
        y={VIEW_H - 16}
        text="先猜首个断点，再用单步、播放或故障注入验证"
      />
    </svg>
  );
}

export function Tpp20Chapter05BendChainDiagram({
  step = 5,
}: {
  step?: number;
}) {
  const current = Math.min(STAGES.length - 1, Math.max(0, step - 1));
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-chapter-05-bend-or-break-chain"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <BendChainSvg
          current={current}
          fault={false}
          ariaLabel="第5章宁弯不折的五节点变化链：边界解耦、事件协调、数据变换、组合复用和策略外置；每个节点都展示输入输出证据。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        变化被限制在边界内，链上的每个节点都留下可重放证据。
      </figcaption>
    </figure>
  );
}

export function Tpp20Chapter05BendFailureDiagram({
  step = 2,
}: {
  step?: number;
}) {
  const current = Math.min(STAGES.length - 1, Math.max(2, step));
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-chapter-05-bend-or-break-failure"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <BendChainSvg
          current={current}
          fault={true}
          ariaLabel="第5章宁弯不折的单故障图：只移除数据变换，第三个节点显示首差，后续委托和配置不应伪装成成功。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        只改变一个节点；首差应在数据变换处显现，而不是延迟到最终结果。
      </figcaption>
    </figure>
  );
}

export function Tpp20Chapter05BendOrBreakLab() {
  const [fault, setFault] = useState(false);
  const highlightRefs = useRef<Record<string, SVGRectElement | null>>({});
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STAGES.forEach((stage, index) => {
        const element = highlightRefs.current[stage.key];
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
        tl.label(stage.key, start);
      });
    },
  });
  const current = timeline.currentStep;
  const firstChanged = fault && current >= 2;
  const reset = () => {
    setFault(false);
    timeline.goToStep(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-chapter-05-bend-or-break-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            第5章 · 弯折链实验台
          </span>
          <button
            type="button"
            aria-pressed={fault}
            aria-label="注入数据变换缺失故障"
            onClick={() => setFault((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              fault
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {fault ? "已注入：变换缺失" : "注入单故障"}
          </button>
        </div>
        <BendChainSvg
          current={current}
          fault={fault}
          stageRefs={highlightRefs}
          ariaLabel="弯折链交互实验台，可播放、暂停、单步或拖动五个节点；注入数据变换缺失后，首差在第三个节点出现，重置会恢复完整链路。"
        />
        <p
          className="mt-3 text-center text-xs text-secondary"
          role="status"
          aria-live="polite"
        >
          {firstChanged
            ? "首差：数据变换没有产出中间值；停止继续委托，恢复后再读配置。"
            : `第 ${current + 1} / ${STAGES.length} 步：${STAGES[current].title} 已留下可复核证据。`}
        </p>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测哪一个节点会拒绝，再用时间线和单故障验证。"
          reset={{
            label: "重置弯折链实验台",
            ariaLabel: "重置弯折链实验台",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可变系统的韧性来自可替换边界、显式证据和及时回退，不来自永远成功的假设。
      </figcaption>
    </figure>
  );
}
