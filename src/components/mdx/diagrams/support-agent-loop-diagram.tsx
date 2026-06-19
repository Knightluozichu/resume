"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";
import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 480;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const SHOWN = 1;
const PREVIEW = 0.18;
const HIDDEN = 0;

const FLOW_Y = 76;
const CARD_W = 112;
const CARD_H = 76;
const FIRST_X = 24;
const GAP = 26;
const stageX = (index: number) => FIRST_X + index * (CARD_W + GAP);

const OUTCOME_Y = 300;

type SupportStep = TeachingStep & {
  intent: boolean;
  lookup: boolean;
  action: boolean;
  outcome: boolean;
  escalate: boolean;
};

const STEPS: readonly SupportStep[] = [
  {
    label: "dialog",
    caption:
      "① 用户对话先进入 intake：保留原话，同时提取账号、订单号和情绪信号。",
    intent: false,
    lookup: false,
    action: false,
    outcome: false,
    escalate: false,
  },
  {
    label: "intent",
    caption:
      "② 识别意图不是直接回答，而是把问题分成退款、物流、技术或投诉路径。",
    intent: true,
    lookup: false,
    action: false,
    outcome: false,
    escalate: false,
  },
  {
    label: "lookup",
    caption:
      "③ 先查事实：订单系统和知识库给 agent 可引用的证据，避免凭感觉承诺。",
    intent: true,
    lookup: true,
    action: false,
    outcome: false,
    escalate: false,
  },
  {
    label: "action",
    caption: "④ 只有权限、规则和证据都满足时，才执行退款、改地址或更新工单。",
    intent: true,
    lookup: true,
    action: true,
    outcome: false,
    escalate: false,
  },
  {
    label: "outcome",
    caption: "⑤ 结果被量化成解决率；不确定或高风险案例进入人工升级。",
    intent: true,
    lookup: true,
    action: true,
    outcome: true,
    escalate: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type StageCardProps = {
  x: number;
  y: number;
  title: string;
  body: string;
  note: string;
  tone: string;
};

function StageCard({ x, y, title, body, note, tone }: StageCardProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={CARD_W}
        height={CARD_H}
        rx={CARD_RADIUS}
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <rect
        x={x + 10}
        y={y + 10}
        width={CARD_W - 20}
        height={22}
        rx={CHIP_RADIUS}
        fill={tone}
        fillOpacity="0.14"
        stroke={tone}
      />
      <text
        x={x + CARD_W / 2}
        y={y + 26}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={tone}
      >
        {title}
      </text>
      <text
        x={x + CARD_W / 2}
        y={y + 50}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-primary)"
      >
        {body}
      </text>
      <text
        x={x + CARD_W / 2}
        y={y + 66}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-secondary)"
      >
        {note}
      </text>
    </g>
  );
}

function FlowArrow({ from, to }: { from: number; to: number }) {
  return (
    <line
      x1={stageX(from) + CARD_W}
      y1={FLOW_Y + CARD_H / 2}
      x2={stageX(to) - 8}
      y2={FLOW_Y + CARD_H / 2}
      stroke="var(--text-secondary)"
      strokeWidth="2"
      markerEnd="url(#support-loop-arrow)"
    />
  );
}

export function SupportAgentLoopDiagram() {
  const intentRef = useRef<SVGGElement | null>(null);
  const lookupRef = useRef<SVGGElement | null>(null);
  const actionRef = useRef<SVGGElement | null>(null);
  const outcomeRef = useRef<SVGGElement | null>(null);
  const escalateRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (el: SVGGElement | null, on: boolean, start: number) => {
        if (!el) return;
        tl.add(
          el,
          {
            opacity: on ? SHOWN : HIDDEN,
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          start,
        );
      };

      STEPS.forEach((step, index) => {
        const start = TEACHING_BEAT_MS * index;
        const lit = TEACHING_BEAT_MS * (index + 1);

        fade(intentRef.current, step.intent, start);
        fade(lookupRef.current, step.lookup, start);
        fade(actionRef.current, step.action, start);
        fade(outcomeRef.current, step.outcome, start);
        fade(escalateRef.current, step.escalate, start);

        tl.label(step.label, lit);
      });
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="客服 agent 的闭环图。用户对话进入系统后，agent 识别退款、物流、技术或投诉意图；再查订单系统和知识库取得证据；规则和权限允许时执行退款、改地址或更新工单；最后把结果记为解决率。高金额退款、低置信或规则冲突会升级给人工。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="support-loop-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
              </marker>
              <marker
                id="support-loop-warning"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
              </marker>
            </defs>

            <text
              x={VIEW_W / 2}
              y={28}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              客服 agent：对话、查证、行动、升级
            </text>

            <StageCard
              x={stageX(0)}
              y={FLOW_Y}
              title="对话"
              body="用户问题"
              note="原话 + 账号"
              tone="var(--accent)"
            />

            <g ref={intentRef} opacity={PREVIEW}>
              <FlowArrow from={0} to={1} />
              <StageCard
                x={stageX(1)}
                y={FLOW_Y}
                title="意图"
                body="退款 / 物流"
                note="技术 / 投诉"
                tone="var(--success)"
              />
            </g>

            <g ref={lookupRef} opacity={PREVIEW}>
              <FlowArrow from={1} to={2} />
              <StageCard
                x={stageX(2)}
                y={FLOW_Y}
                title="查证"
                body="订单 + KB"
                note="显式证据"
                tone="var(--accent)"
              />
              <rect
                x={stageX(2) - 4}
                y={190}
                width={CARD_W + 8}
                height={72}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <text
                x={stageX(2) + CARD_W / 2}
                y={214}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                工具返回
              </text>
              <text
                x={stageX(2) + CARD_W / 2}
                y={236}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                可引用事实
              </text>
              <line
                x1={stageX(2) + CARD_W / 2}
                y1={190}
                x2={stageX(2) + CARD_W / 2}
                y2={FLOW_Y + CARD_H}
                stroke="var(--text-secondary)"
                strokeWidth="1.6"
                strokeDasharray="5 4"
              />
            </g>

            <g ref={actionRef} opacity={PREVIEW}>
              <FlowArrow from={2} to={3} />
              <StageCard
                x={stageX(3)}
                y={FLOW_Y}
                title="动作"
                body="退款 / 改单"
                note="更新工单"
                tone="var(--warning)"
              />
            </g>

            <g ref={outcomeRef} opacity={PREVIEW}>
              <FlowArrow from={3} to={4} />
              <StageCard
                x={stageX(4)}
                y={FLOW_Y}
                title="结果"
                body="解决率"
                note="CSAT / 关闭"
                tone="var(--success)"
              />
              <rect
                x={90}
                y={OUTCOME_Y}
                width={250}
                height={68}
                rx={CARD_RADIUS}
                fill="var(--success)"
                fillOpacity="0.1"
                stroke="var(--success)"
              />
              <text
                x={215}
                y={326}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                自动解决
              </text>
              <text
                x={215}
                y={348}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                有证据、有权限、有明确完成标准
              </text>
            </g>

            <g ref={escalateRef} opacity={PREVIEW}>
              <path
                d={`M ${stageX(3) + CARD_W / 2} ${FLOW_Y + CARD_H} C 500 212, 494 282, 466 ${OUTCOME_Y}`}
                fill="none"
                stroke="var(--warning)"
                strokeWidth="2"
                strokeDasharray="7 5"
                markerEnd="url(#support-loop-warning)"
              />
              <rect
                x={380}
                y={OUTCOME_Y}
                width={250}
                height={68}
                rx={CARD_RADIUS}
                fill="var(--warning)"
                fillOpacity="0.1"
                stroke="var(--warning)"
              />
              <text
                x={505}
                y={326}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--warning)"
              >
                人工升级
              </text>
              <text
                x={505}
                y={348}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                高金额 / 低置信 / 规则冲突
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="客服场景适合 agent，是因为它同时有对话入口、可靠工具、明确动作和人工兜底。"
        />
      </div>
    </figure>
  );
}
