"use client";

/**
 * Topic 19 专属图示：把版本控制从“保存一份代码”展开为可追溯的发布链。
 * 故障实验只移除提交元数据，读者可以观察审查阶段先失去证据，并从原始状态重置。
 */
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

const VIEW_W = 1020;
const VIEW_H = 490;
const CARD_W = 170;
const CARD_H = 148;
const START_X = 28;
const START_Y = 108;
const GAP = 28;

const STAGES = [
  { key: "change", title: "变更", detail: "工作树 / 输入" },
  { key: "commit", title: "原子提交", detail: "对象 / 作者 / 父项" },
  { key: "review", title: "审查", detail: "差异 / 决定" },
  { key: "tag", title: "发布标签", detail: "版本 / 入口" },
  { key: "recover", title: "灾难恢复", detail: "干净环境 / 重建" },
] as const;

type StageKey = (typeof STAGES)[number]["key"];

const STEPS: readonly TeachingStep[] = [
  { label: "change", caption: "变更：先确认工作树中的对象和边界" },
  { label: "commit", caption: "原子提交：保存可定位、可比较的历史对象" },
  { label: "review", caption: "审查：用差异和决定把变化交给下一位" },
  { label: "tag", caption: "发布标签：给可重建的状态一个稳定入口" },
  { label: "recover", caption: "灾难恢复：在干净环境按证据重建" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function stageFocus(step: 1 | 2 | 3) {
  return step === 1 ? 0 : step === 2 ? 2 : 4;
}

function stageCaption(step: 1 | 2 | 3) {
  return step === 1
    ? "先把变更变成可定位的对象，再谈保存"
    : step === 2
      ? "原子提交连接差异与审查，发布不能跳过证据"
      : "标签只是入口，真正的恢复要能在干净环境重建";
}

function StageCard({
  index,
  active,
  reached,
  faulty,
  reference,
}: {
  index: number;
  active: boolean;
  reached: boolean;
  faulty?: boolean;
  reference?: (element: SVGRectElement | null) => void;
}) {
  const stage = STAGES[index];
  const x = stageX(index);
  const fill = faulty ? T.danger : active ? T.accent : T.primary;
  return (
    <g>
      <rect
        x={x}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={T.primary}
        fillOpacity="0.025"
        stroke={faulty ? T.danger : T.border}
        strokeWidth={faulty || active ? "1.8" : "1.2"}
      />
      <rect
        ref={reference}
        x={x}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={fill}
        fillOpacity={faulty ? "0.14" : active ? "0.13" : "0.06"}
        stroke={fill}
        strokeWidth={active || faulty ? "1.8" : "1"}
        opacity={reached ? "1" : "0.2"}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <circle
        cx={x + 22}
        cy={START_Y + 24}
        r="11"
        fill={fill}
        fillOpacity="0.18"
        stroke={fill}
        strokeWidth="1"
      />
      <text
        x={x + 22}
        y={START_Y + 28}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={fill}
      >
        {index + 1}
      </text>
      <text
        x={x + CARD_W / 2 + 10}
        y={START_Y + 31}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={faulty ? T.danger : active ? T.accent : T.primary}
      >
        {stage.title}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 60}
        textAnchor="middle"
        fontSize="11"
        fill={faulty ? T.danger : T.secondary}
      >
        {faulty ? "元数据缺失" : stage.detail}
      </text>
      {index === 0 && (
        <>
          <rect
            x={x + 24}
            y={START_Y + 82}
            width="118"
            height="12"
            rx="3"
            fill={fill}
            fillOpacity="0.24"
          />
          <rect
            x={x + 38}
            y={START_Y + 102}
            width="92"
            height="8"
            rx="3"
            fill={T.secondary}
            fillOpacity="0.3"
          />
        </>
      )}
      {index === 1 && (
        <>
          <path
            d={`M ${x + 26} ${START_Y + 88} h 118 M ${x + 40} ${START_Y + 106} h 88`}
            stroke={fill}
            strokeWidth="5"
            strokeLinecap="round"
            strokeOpacity="0.42"
          />
          <circle
            cx={x + 38}
            cy={START_Y + 88}
            r="5"
            fill={fill}
            fillOpacity="0.65"
          />
        </>
      )}
      {index === 2 && (
        <>
          <rect
            x={x + 25}
            y={START_Y + 81}
            width="120"
            height="34"
            rx="4"
            fill={fill}
            fillOpacity="0.08"
            stroke={fill}
            strokeDasharray="4 3"
          />
          <path
            d={`M ${x + 37} ${START_Y + 96} l 9 8 l 15 -17 M ${x + 76} ${START_Y + 99} h 52`}
            fill="none"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
      {index === 3 && (
        <>
          <path
            d={`M ${x + 84} ${START_Y + 80} l 31 20 l -31 20 l -31 -20 z`}
            fill={fill}
            fillOpacity="0.12"
            stroke={fill}
            strokeWidth="1.8"
          />
          <text
            x={x + 84}
            y={START_Y + 104}
            textAnchor="middle"
            fontSize="11"
            fill={fill}
          >
            v1.4.0
          </text>
        </>
      )}
      {index === 4 && (
        <>
          <circle
            cx={x + 56}
            cy={START_Y + 99}
            r="16"
            fill="none"
            stroke={fill}
            strokeWidth="2"
          />
          <path
            d={`M ${x + 56} ${START_Y + 87} v 12 l 8 5 M ${x + 92} ${START_Y + 103} l 8 8 l 18 -24`}
            fill="none"
            stroke={fill}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      <text
        x={x + CARD_W / 2}
        y={START_Y + 137}
        textAnchor="middle"
        fontSize="11"
        fill={faulty ? T.danger : active ? T.accent : T.secondary}
      >
        {faulty ? "首差在此暴露" : reached ? "证据已留下" : "等待输入"}
      </text>
    </g>
  );
}

function FlowArrows({
  faultInjected = false,
  markerId = "tpp20-topic19-arrow",
}: {
  faultInjected?: boolean;
  markerId?: string;
}) {
  return (
    <>
      {STAGES.slice(0, -1).map((stage, index) => {
        const x = stageX(index);
        const broken = faultInjected && stage.key === "commit";
        return (
          <line
            key={stage.key}
            x1={x + CARD_W + 5}
            y1={START_Y + CARD_H / 2}
            x2={x + CARD_W + GAP - 7}
            y2={START_Y + CARD_H / 2}
            stroke={broken ? T.danger : T.secondary}
            strokeWidth="1.6"
            strokeDasharray={broken ? "5 4" : undefined}
            markerEnd={`url(#${markerId})`}
          />
        );
      })}
    </>
  );
}

function EvidenceContract({ failed }: { failed: boolean }) {
  return (
    <>
      <rect
        x="94"
        y="318"
        width="832"
        height="64"
        rx="12"
        fill={failed ? T.danger : T.accent}
        fillOpacity="0.07"
        stroke={failed ? T.danger : T.border}
        strokeWidth="1"
      />
      <text
        x={VIEW_W / 2}
        y="345"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={failed ? T.danger : T.primary}
      >
        {failed
          ? "拒绝：提交元数据缺失，审查不能确认来源"
          : "验收合同：每个发布状态都能定位、比较，并从干净环境恢复"}
      </text>
      <text
        x={VIEW_W / 2}
        y="366"
        textAnchor="middle"
        fontSize="11"
        fill={failed ? T.danger : T.secondary}
      >
        {failed
          ? "修法：恢复原始记录，重新生成原子提交，再按同一标签重放"
          : "传递对象：变更决定 → 差异证据 → 发布入口 → 重建结果"}
      </text>
    </>
  );
}

export function Tpp20Topic19VersionControlDiagram({
  step = 1,
}: {
  step?: 1 | 2 | 3;
}) {
  const focus = stageFocus(step);
  const caption = stageCaption(step);
  const markerId = `tpp20-topic19-arrow-static-${step}`;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-19-version-control-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`19 版本控制专属因果图。${caption}。链路依次经过变更、原子提交、审查、发布标签和灾难恢复。`}
          className="mx-auto block h-auto w-full max-w-[1020px]"
        >
          <defs>
            <marker
              id={markerId}
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
            text="提示28：永远使用版本控制"
          />
          <text
            x={VIEW_W / 2}
            y="59"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {caption}
          </text>
          <g>
            <FlowArrows markerId={markerId} />
          </g>
          {STAGES.map((stage, index) => (
            <StageCard
              key={stage.key}
              index={index}
              active={index === focus}
              reached={index <= focus}
            />
          ))}
          <EvidenceContract failed={false} />
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 16}
            text="先预测首个失去证据的节点，再用链路逐站核对"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        版本控制的价值不止是保存历史，而是让发布结果有可追溯的入口和恢复路径。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic19VersionControlLab() {
  const [faultInjected, setFaultInjected] = useState(false);
  const highlightRefs = useRef<Record<StageKey, SVGRectElement | null>>({
    change: null,
    commit: null,
    review: null,
    tag: null,
    recover: null,
  });
  const markerId = useId().replace(/:/g, "");
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((stage, index) => {
        const element = highlightRefs.current[stage.label as StageKey];
        const start = TEACHING_BEAT_MS * index;
        if (element) {
          tl.add(
            element,
            {
              opacity: [0.2, 1],
              scale: [0.96, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        tl.label(stage.label, start);
      });
    },
  });
  const currentStage = STEPS[timeline.currentStep] ?? STEPS[0];
  const reachedFailure = faultInjected && timeline.currentStep >= 2;
  const reset = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-19-version-control-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            提示28 · 发布追溯实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入单故障：删除提交元数据"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：元数据缺失" : "注入单故障"}
          </button>
        </div>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="版本控制发布追溯实验台。通过播放、暂停、单步或拖动进度观察变更、原子提交、审查、发布标签和灾难恢复；注入删除提交元数据的故障后，审查阶段应拒绝继续。"
          className="mx-auto block h-auto w-full max-w-[1020px]"
        >
          <defs>
            <marker
              id={`tpp20-topic19-arrow-${markerId}`}
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
            text="一次发布如何留下可恢复的历史"
          />
          <text
            x={VIEW_W / 2}
            y="59"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            当前：{currentStage.caption}
          </text>
          <FlowArrows
            faultInjected={faultInjected}
            markerId={`tpp20-topic19-arrow-${markerId}`}
          />
          {STAGES.map((stage, index) => (
            <StageCard
              key={stage.key}
              index={index}
              active={index === timeline.currentStep}
              reached={index <= timeline.currentStep}
              faulty={faultInjected && stage.key === "review"}
              reference={(element) => {
                highlightRefs.current[stage.key] = element;
              }}
            />
          ))}
          {reachedFailure && (
            <path
              d={`M ${stageX(2) + CARD_W / 2} 274 C ${stageX(2) + CARD_W / 2} 300, ${stageX(1) + CARD_W / 2} 300, ${stageX(1) + CARD_W / 2} 274`}
              fill="none"
              stroke={T.danger}
              strokeWidth="1.6"
              strokeDasharray="5 4"
            />
          )}
          <EvidenceContract failed={reachedFailure} />
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 16}
            text="只删除提交元数据，观察审查先拒绝，再从原始记录重置"
          />
        </svg>
        <div className="mt-3 min-h-11 rounded-control border border-border bg-elevated px-3 py-2 text-center text-xs text-secondary">
          <p role="status">
            当前：第 {timeline.currentStep + 1} 步 · {currentStage.caption}
            {faultInjected ? " · 故障样本需要恢复提交元数据" : ""}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先猜首个拒绝点，再用单步或播放验证。"
          reset={{
            label: "重置版本控制实验台",
            ariaLabel: "重置版本控制发布追溯实验台",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        删除提交元数据试试看：标签仍可能存在，但审查不能证明它指向了什么。
      </figcaption>
    </figure>
  );
}
