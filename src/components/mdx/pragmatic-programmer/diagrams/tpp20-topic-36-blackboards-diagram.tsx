"use client";

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

const VIEW_W = 1040;
const VIEW_H = 450;
const NODE_W = 168;
const NODE_H = 126;
const NODE_Y = 138;
const NODE_X = [36, 230, 436, 642, 836] as const;

const STAGES = [
  { key: "fact", title: "事实输入", detail: "带身份与边界" },
  { key: "board", title: "黑板", detail: "共享知识空间" },
  { key: "agents", title: "代理触发", detail: "按规则领取" },
  { key: "evidence", title: "新事实", detail: "贡献可追踪" },
  { key: "converge", title: "收敛", detail: "满足验收条件" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "fact", caption: "事实：先冻结输入身份、边界和拒绝条件" },
  { label: "board", caption: "黑板：把知识放进可观察的共享事实空间" },
  { label: "agents", caption: "代理触发：彼此不了解实现，只按规则消费" },
  { label: "evidence", caption: "新事实：每次贡献都留下来源与状态变化" },
  { label: "converge", caption: "收敛：直到验收条件成立，不靠最后一条消息伪造成功" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function clampStep(step: number) {
  return Math.max(0, Math.min(Math.round(step), STAGES.length - 1));
}

function stageX(index: number) {
  return NODE_X[index];
}

export function Tpp20Topic36BlackboardsDiagram({
  step = 0,
  fault = false,
}: {
  step?: number;
  fault?: boolean;
}) {
  const focus = clampStep(step);
  const faultVisible = fault && focus >= 2;
  const focusCaption = faultVisible
    ? "代理失效：黑板仍保存事实，但没有代理消费并贡献新事实"
    : STEPS[focus]?.caption ?? STEPS[0].caption;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="tpp20-topic-36-blackboards-diagram"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`黑板协作图：事实输入进入黑板，独立代理按规则消费并贡献新事实，最后按收敛条件验收。当前观察点：${focusCaption}`}
        className="mx-auto block h-auto w-full max-w-[1040px]"
      >
        <defs>
          <marker
            id="tpp20-topic36-blackboards-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" fill={T.secondary} />
          </marker>
          <marker
            id="tpp20-topic36-blackboards-fault-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" fill={T.danger} />
          </marker>
        </defs>

        <DiagramTitle x={VIEW_W / 2} y={34} text="黑板把协作从直接调用变成可观察的知识流" />
        <text
          x={VIEW_W / 2}
          y="64"
          textAnchor="middle"
          fontSize="12"
          fill={T.secondary}
        >
          {focusCaption}
        </text>

        {STAGES.slice(0, -1).map((stage, index) => {
          const blocked = faultVisible && stage.key === "agents";
          return (
            <line
              key={`${stage.key}-edge`}
              x1={stageX(index) + NODE_W + 4}
              y1={NODE_Y + NODE_H / 2}
              x2={stageX(index + 1) - 10}
              y2={NODE_Y + NODE_H / 2}
              stroke={blocked ? T.danger : T.secondary}
              strokeWidth="2"
              strokeDasharray={blocked ? "7 5" : undefined}
              markerEnd={`url(#${blocked ? "tpp20-topic36-blackboards-fault-arrow" : "tpp20-topic36-blackboards-arrow"})`}
            />
          );
        })}

        {STAGES.map((stage, index) => {
          const x = stageX(index);
          const active = index === focus;
          const reached = index <= focus;
          const agentFault = faultVisible && stage.key === "agents";
          return (
            <g key={stage.key}>
              <rect
                x={x}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx="14"
                fill={active ? T.accent : T.elevated}
                fillOpacity={active ? "0.12" : "1"}
                stroke={agentFault ? T.danger : active ? T.accent : T.border}
                strokeWidth={agentFault || active ? "2" : "1"}
                strokeDasharray={agentFault ? "8 5" : undefined}
              />
              <circle
                cx={x + 25}
                cy={NODE_Y + 28}
                r="13"
                fill={agentFault ? T.danger : active ? T.accent : reached ? T.success : T.border}
                fillOpacity={active || reached || agentFault ? "1" : "0.4"}
              />
              <text
                x={x + 25}
                y={NODE_Y + 33}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={T.elevated}
              >
                {index + 1}
              </text>
              <text
                x={x + NODE_W / 2 + 10}
                y={NODE_Y + 34}
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={agentFault ? T.danger : active ? T.accent : T.primary}
              >
                {stage.title}
              </text>
              <line
                x1={x + 18}
                y1={NODE_Y + 61}
                x2={x + NODE_W - 18}
                y2={NODE_Y + 61}
                stroke={T.border}
              />
              <text
                x={x + NODE_W / 2}
                y={NODE_Y + 94}
                textAnchor="middle"
                fontSize="12"
                fill={agentFault ? T.danger : T.primary}
              >
                {agentFault ? "缺失：无人消费" : stage.detail}
              </text>
              <text
                x={x + NODE_W / 2}
                y={NODE_Y + 118}
                textAnchor="middle"
                fontSize="11"
                fill={agentFault ? T.danger : active ? T.accent : reached ? T.success : T.secondary}
              >
                {agentFault ? "首差在此暴露" : active ? "当前观察点" : reached ? "已核对" : "等待证据"}
              </text>
            </g>
          );
        })}

        <rect
          x="36"
          y="318"
          width="968"
          height="62"
          rx="12"
          fill={faultVisible ? T.danger : T.accent}
          fillOpacity="0.1"
          stroke={faultVisible ? T.danger : T.border}
        />
        <text
          x={VIEW_W / 2}
          y="343"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={faultVisible ? T.danger : T.primary}
        >
          {faultVisible
            ? "故障注入：代理失效；保留黑板证据，拒绝伪造新事实并从原始输入重放"
            : "验收合同：代理只通过黑板协作，每份新事实都有来源、状态和收敛条件"}
        </text>
        <text
          x={VIEW_W / 2}
          y="365"
          textAnchor="middle"
          fontSize="11"
          fill={T.secondary}
        >
          黑板不是万能缓存：规则、事实所有者和拒绝条件必须能被独立复核
        </text>

        <DiagramCaption
          x={VIEW_W / 2}
          y={VIEW_H - 16}
          text="先预测首差，再用单步或故障注入验证黑板上的知识是否真的收敛"
        />
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：黑板保存共享事实，独立代理通过规则触发贡献，收敛必须由证据而不是最终消息证明。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic36BlackboardsLab() {
  const [faultInjected, setFaultInjected] = useState(false);
  const highlightRefs = useRef<Record<string, SVGRectElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((stage, index) => {
        const element = highlightRefs.current[stage.label];
        if (!element) return;
        const start = TEACHING_BEAT_MS * index;
        tl.add(
          element,
          {
            opacity: [0.14, 1],
            scale: [0.96, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          start,
        );
        tl.label(stage.label, start);
      });
    },
  });

  const currentStep = STEPS[timeline.currentStep] ?? STEPS[0];
  const failureVisible = faultInjected && timeline.currentStep >= 2;
  const reset = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <section
      aria-label="黑板协作实验台"
      className="my-6 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="tpp20-topic-36-blackboards-lab"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">黑板协作实验台</h3>
          <p className="mt-1 text-xs text-secondary">
            通过播放、单步和拖动进度，观察知识怎样被独立代理消费、贡献并收敛。
          </p>
        </div>
        <button
          type="button"
          aria-pressed={faultInjected}
          aria-label="注入单故障：代理失效"
          onClick={() => setFaultInjected((value) => !value)}
          className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
            faultInjected
              ? "border-danger text-danger"
              : "border-border text-secondary hover:border-accent hover:text-primary"
          }`}
        >
          {faultInjected ? "已注入：代理失效" : "注入单故障"}
        </button>
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="黑板协作实验台。播放、单步或拖动进度可观察事实输入、黑板、代理触发、新事实和收敛；注入故障会使代理失效，首差应在代理触发处暴露。"
        className="mx-auto block h-auto w-full max-w-[1040px]"
      >
        <defs>
          <marker
            id="tpp20-topic36-blackboards-lab-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" fill={T.secondary} />
          </marker>
        </defs>
        <DiagramTitle x={VIEW_W / 2} y={34} text="当前黑板协作节点" />
        <text
          x={VIEW_W / 2}
          y="64"
          textAnchor="middle"
          fontSize="12"
          fill={T.secondary}
        >
          {currentStep.caption}
        </text>

        {STAGES.slice(0, -1).map((stage, index) => {
          const blocked = faultInjected && stage.key === "agents";
          return (
            <line
              key={`${stage.key}-lab-edge`}
              x1={stageX(index) + NODE_W + 4}
              y1={NODE_Y + NODE_H / 2}
              x2={stageX(index + 1) - 10}
              y2={NODE_Y + NODE_H / 2}
              stroke={blocked ? T.danger : T.secondary}
              strokeWidth="2"
              strokeDasharray={blocked ? "7 5" : undefined}
              markerEnd="url(#tpp20-topic36-blackboards-lab-arrow)"
            />
          );
        })}

        {STAGES.map((stage, index) => {
          const x = stageX(index);
          const reached = index <= timeline.currentStep;
          const active = index === timeline.currentStep;
          const agentFault = faultInjected && stage.key === "agents";
          return (
            <g key={stage.key}>
              <rect
                x={x}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx="14"
                fill={T.elevated}
                stroke={agentFault ? T.danger : T.border}
                strokeWidth={agentFault ? "2" : "1"}
                strokeDasharray={agentFault ? "8 5" : undefined}
              />
              <rect
                ref={(element) => {
                  highlightRefs.current[stage.key] = element;
                }}
                x={x}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx="14"
                fill={agentFault ? T.danger : T.accent}
                fillOpacity="0.14"
                stroke={agentFault ? T.danger : T.accent}
                strokeWidth="2"
                opacity={reached ? "1" : "0.14"}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
              <text
                x={x + NODE_W / 2}
                y={NODE_Y + 36}
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={agentFault ? T.danger : active ? T.accent : T.primary}
              >
                {stage.title}
              </text>
              <text
                x={x + NODE_W / 2}
                y={NODE_Y + 77}
                textAnchor="middle"
                fontSize="12"
                fill={agentFault ? T.danger : T.secondary}
              >
                {agentFault ? "缺失：不可触发" : stage.detail}
              </text>
              <text
                x={x + NODE_W / 2}
                y={NODE_Y + 112}
                textAnchor="middle"
                fontSize="11"
                fill={agentFault ? T.danger : reached ? T.accent : T.secondary}
              >
                {agentFault ? "停止并重放" : active ? "当前节点" : reached ? "已观察" : "待观察"}
              </text>
            </g>
          );
        })}

        <rect
          x="36"
          y="318"
          width="968"
          height="62"
          rx="12"
          fill={failureVisible ? T.danger : T.accent}
          fillOpacity="0.1"
          stroke={failureVisible ? T.danger : T.border}
        />
        <text
          x={VIEW_W / 2}
          y="343"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={failureVisible ? T.danger : T.primary}
        >
          {failureVisible
            ? "首差：代理没有消费黑板事实；拒绝继续生成新事实"
            : "每一步都保留输入、当前节点、贡献来源、拒绝条件与收敛依据"}
        </text>
        <text
          x={VIEW_W / 2}
          y="365"
          textAnchor="middle"
          fontSize="11"
          fill={T.secondary}
        >
          {failureVisible
            ? "恢复动作：还原代理与原始黑板，再次重放"
            : `当前：${currentStep.caption}`}
        </text>
      </svg>

      <TimelineControls
        timeline={timeline}
        labelText={LABEL_TEXT}
        caption="只有黑板事实、代理规则和收敛条件都可核对，结果才可被接受。"
        reset={{
          label: "重置动画与故障",
          ariaLabel: "重置黑板协作实验台",
          onClick: reset,
        }}
      />
    </section>
  );
}
