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

const VIEW_W = 1000;
const VIEW_H = 440;
const CARD_W = 156;
const CARD_H = 138;
const START_X = 40;
const CARD_GAP = 25;
const CARD_Y = 126;

const STAGES = [
  { key: "message", title: "消息", detail: "带身份与意图" },
  { key: "mailbox", title: "邮箱", detail: "排队与背压" },
  { key: "actor", title: "角色状态", detail: "单一拥有者" },
  { key: "supervision", title: "监督", detail: "超时与重启" },
  { key: "response", title: "响应", detail: "契约与结果" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "message", caption: "消息：只表达意图，不直接触碰内部状态" },
  { label: "mailbox", caption: "邮箱：把到达顺序和背压变成可观察证据" },
  { label: "actor", caption: "角色状态：只有拥有者串行改变状态" },
  { label: "supervision", caption: "监督：失败、超时和重启都有回退路径" },
  { label: "response", caption: "响应：用消息契约确认是否接受副作用" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function cardX(index: number) {
  return START_X + index * (CARD_W + CARD_GAP);
}

function clampStep(step: number) {
  return Math.max(0, Math.min(Math.round(step), STAGES.length - 1));
}

export function Tpp20Topic35ActorsProcessesDiagram({
  step = 0,
  fault = false,
}: {
  step?: number;
  fault?: boolean;
}) {
  const focus = clampStep(step);
  const focusCaption =
    fault && focus >= 1
      ? "邮箱被移除：消息没有可验证的到达与排队证据"
      : STEPS[focus]?.caption ?? STEPS[0].caption;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="tpp20-topic35-actors-processes-diagram"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`角色与进程的消息链：消息、邮箱、角色状态、监督、响应。当前观察点：${focusCaption}`}
        className="mx-auto block h-auto w-full max-w-[1000px]"
      >
        <defs>
          <marker
            id="tpp20-topic35-actors-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" fill={T.secondary} />
          </marker>
        </defs>

        <DiagramTitle x={VIEW_W / 2} y={34} text="消息不共享状态：只把意图交给拥有者" />
        <text
          x={VIEW_W / 2}
          y="62"
          textAnchor="middle"
          fontSize="12"
          fill={T.secondary}
        >
          {focusCaption}
        </text>

        {STAGES.slice(0, -1).map((stage, index) => {
          const x1 = cardX(index) + CARD_W;
          const x2 = cardX(index + 1);
          const blocked = fault && stage.key === "mailbox";
          return (
            <g key={`${stage.key}-connector`} aria-hidden="true">
              <line
                x1={x1 + 3}
                y1={CARD_Y + CARD_H / 2}
                x2={x2 - 9}
                y2={CARD_Y + CARD_H / 2}
                stroke={blocked ? T.danger : T.secondary}
                strokeWidth="2"
                strokeDasharray={blocked ? "7 5" : undefined}
                markerEnd="url(#tpp20-topic35-actors-arrow)"
              />
            </g>
          );
        })}

        {STAGES.map((stage, index) => {
          const x = cardX(index);
          const active = index === focus;
          const reached = index <= focus;
          const mailboxFault = fault && stage.key === "mailbox";
          return (
            <g key={stage.key}>
              <rect
                x={x}
                y={CARD_Y}
                width={CARD_W}
                height={CARD_H}
                rx="14"
                fill={active ? T.accent : T.elevated}
                fillOpacity={active ? "0.12" : "1"}
                stroke={mailboxFault ? T.danger : active ? T.accent : T.border}
                strokeWidth={mailboxFault || active ? "2" : "1"}
                strokeDasharray={mailboxFault ? "8 5" : undefined}
              />
              <circle
                cx={x + 25}
                cy={CARD_Y + 28}
                r="13"
                fill={mailboxFault ? T.danger : active ? T.accent : reached ? T.success : T.border}
                fillOpacity={active || reached || mailboxFault ? "1" : "0.4"}
              />
              <text
                x={x + 25}
                y={CARD_Y + 33}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={T.elevated}
              >
                {index + 1}
              </text>
              <text
                x={x + CARD_W / 2 + 10}
                y={CARD_Y + 34}
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={mailboxFault ? T.danger : active ? T.accent : T.primary}
              >
                {stage.title}
              </text>
              <line
                x1={x + 18}
                y1={CARD_Y + 61}
                x2={x + CARD_W - 18}
                y2={CARD_Y + 61}
                stroke={T.border}
              />
              <text
                x={x + CARD_W / 2}
                y={CARD_Y + 94}
                textAnchor="middle"
                fontSize="12"
                fill={mailboxFault ? T.danger : T.primary}
              >
                {mailboxFault ? "缺失：无法排队" : stage.detail}
              </text>
              <text
                x={x + CARD_W / 2}
                y={CARD_Y + 122}
                textAnchor="middle"
                fontSize="11"
                fill={mailboxFault ? T.danger : active ? T.accent : reached ? T.success : T.secondary}
              >
                {mailboxFault ? "首差在此暴露" : active ? "当前观察点" : reached ? "已核对" : "等待证据"}
              </text>
            </g>
          );
        })}

        <rect
          x="40"
          y="314"
          width="920"
          height="56"
          rx="12"
          fill={fault ? T.danger : T.accent}
          fillOpacity="0.1"
          stroke={fault ? T.danger : T.border}
        />
        <text
          x={VIEW_W / 2}
          y="338"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={fault ? T.danger : T.primary}
        >
          {fault
            ? "故障注入：移除邮箱；不要伪造成功，保存首差并从原始消息重放"
            : "验收合同：每条消息都有所有者、处理边界、失败升级与可追踪响应"}
        </text>
        <text
          x={VIEW_W / 2}
          y="358"
          textAnchor="middle"
          fontSize="11"
          fill={T.secondary}
        >
          角色内部状态不直接暴露给发送者，状态变化只由消息处理产生
        </text>

        <DiagramCaption
          x={VIEW_W / 2}
          y={VIEW_H - 16}
          text="先预测首差，再用单步或故障注入验证消息链"
        />
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：消息只经过邮箱进入角色，监督负责让失败可见、响应负责让契约可核对。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic35ActorsProcessesLab() {
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
  const failureVisible = faultInjected && timeline.currentStep >= 1;
  const reset = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <section
      aria-label="角色与进程消息链实验台"
      className="my-6 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="tpp20-topic35-actors-processes-lab"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">消息到响应实验台</h3>
          <p className="mt-1 text-xs text-secondary">
            通过播放、单步和拖动进度，观察内部状态如何只被拥有者改变。
          </p>
        </div>
        <button
          type="button"
          aria-pressed={faultInjected}
          aria-label="注入单故障：移除邮箱"
          onClick={() => setFaultInjected((value) => !value)}
          className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
            faultInjected
              ? "border-danger text-danger"
              : "border-border text-secondary hover:border-accent hover:text-primary"
          }`}
        >
          {faultInjected ? "已注入：移除邮箱" : "注入单故障"}
        </button>
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="角色与进程实验台。播放、单步或拖动进度可观察消息、邮箱、角色状态、监督和响应；注入故障会移除邮箱，首差应在邮箱处暴露。"
        className="mx-auto block h-auto w-full max-w-[1000px]"
      >
        <defs>
          <marker
            id="tpp20-topic35-actors-lab-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" fill={T.secondary} />
          </marker>
        </defs>
        <DiagramTitle x={VIEW_W / 2} y={34} text="当前消息处理节点" />
        <text
          x={VIEW_W / 2}
          y="62"
          textAnchor="middle"
          fontSize="12"
          fill={T.secondary}
        >
          {currentStep.caption}
        </text>

        {STAGES.slice(0, -1).map((stage, index) => {
          const blocked = faultInjected && stage.key === "mailbox";
          return (
            <line
              key={`${stage.key}-lab-connector`}
              x1={cardX(index) + CARD_W + 3}
              y1={CARD_Y + CARD_H / 2}
              x2={cardX(index + 1) - 9}
              y2={CARD_Y + CARD_H / 2}
              stroke={blocked ? T.danger : T.secondary}
              strokeWidth="2"
              strokeDasharray={blocked ? "7 5" : undefined}
              markerEnd="url(#tpp20-topic35-actors-lab-arrow)"
            />
          );
        })}

        {STAGES.map((stage, index) => {
          const x = cardX(index);
          const reached = index <= timeline.currentStep;
          const active = index === timeline.currentStep;
          const mailboxFault = faultInjected && stage.key === "mailbox";
          return (
            <g key={stage.key}>
              <rect
                x={x}
                y={CARD_Y}
                width={CARD_W}
                height={CARD_H}
                rx="14"
                fill={T.elevated}
                stroke={mailboxFault ? T.danger : T.border}
                strokeWidth={mailboxFault ? "2" : "1"}
                strokeDasharray={mailboxFault ? "8 5" : undefined}
              />
              <rect
                ref={(element) => {
                  highlightRefs.current[stage.key] = element;
                }}
                x={x}
                y={CARD_Y}
                width={CARD_W}
                height={CARD_H}
                rx="14"
                fill={mailboxFault ? T.danger : T.accent}
                fillOpacity="0.14"
                stroke={mailboxFault ? T.danger : T.accent}
                strokeWidth="2"
                opacity={reached ? "1" : "0.14"}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
              <text
                x={x + CARD_W / 2}
                y={CARD_Y + 36}
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={mailboxFault ? T.danger : active ? T.accent : T.primary}
              >
                {stage.title}
              </text>
              <text
                x={x + CARD_W / 2}
                y={CARD_Y + 77}
                textAnchor="middle"
                fontSize="12"
                fill={mailboxFault ? T.danger : T.secondary}
              >
                {mailboxFault ? "缺失：不可验证" : stage.detail}
              </text>
              <text
                x={x + CARD_W / 2}
                y={CARD_Y + 112}
                textAnchor="middle"
                fontSize="11"
                fill={mailboxFault ? T.danger : reached ? T.accent : T.secondary}
              >
                {mailboxFault ? "停止并重放" : active ? "当前节点" : reached ? "已观察" : "待观察"}
              </text>
            </g>
          );
        })}

        <rect
          x="40"
          y="314"
          width="920"
          height="56"
          rx="12"
          fill={failureVisible ? T.danger : T.accent}
          fillOpacity="0.1"
          stroke={failureVisible ? T.danger : T.border}
        />
        <text
          x={VIEW_W / 2}
          y="338"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={failureVisible ? T.danger : T.primary}
        >
          {failureVisible
            ? "首差：邮箱无法证明到达顺序；拒绝继续改变角色状态"
            : "每一步都保留输入、当前节点、状态变化、下游接收者与拒绝条件"}
        </text>
        <text
          x={VIEW_W / 2}
          y="358"
          textAnchor="middle"
          fontSize="11"
          fill={T.secondary}
        >
          {failureVisible ? "恢复动作：还原邮箱与原始消息，再次重放" : "当前：" + currentStep.caption}
        </text>
      </svg>

      <TimelineControls
        timeline={timeline}
        labelText={LABEL_TEXT}
        caption="只有观察到消息契约与角色状态都成立，响应才可被接受。"
        reset={{
          label: "重置动画与故障",
          ariaLabel: "重置角色与进程实验台",
          onClick: reset,
        }}
      />
    </section>
  );
}
