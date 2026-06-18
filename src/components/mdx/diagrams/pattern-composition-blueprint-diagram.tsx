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
const VIEW_H = 500;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const SHOWN = 1;
const HIDDEN = 0;
const PREVIEW = 0.18;

const TOP_Y = 56;
const CARD_W = 100;
const CARD_H = 72;
const SMALL_CARD_W = 96;
const STAGE_GAP = 12;
const FIRST_X = 24;
const stageX = (index: number) => FIRST_X + index * (CARD_W + STAGE_GAP);

const LEDGER_X = 68;
const LEDGER_Y = 384;
const LEDGER_W = 584;
const LEDGER_H = 56;

type BlueprintStep = TeachingStep & {
  intake: boolean;
  route: boolean;
  retrieve: boolean;
  guard: boolean;
  eval: boolean;
  escalate: boolean;
  ledger: boolean;
};

const STEPS: readonly BlueprintStep[] = [
  {
    label: "intake",
    caption: "① 客户问题先变成结构化输入：意图、上下文、风险信号都要看得见。",
    intake: true,
    route: false,
    retrieve: false,
    guard: false,
    eval: false,
    escalate: false,
    ledger: false,
  },
  {
    label: "route",
    caption:
      "② routing 只做分流：退款、技术、投诉分别进不同下游，不把所有事塞给一个大模型。",
    intake: true,
    route: true,
    retrieve: false,
    guard: false,
    eval: false,
    escalate: false,
    ledger: false,
  },
  {
    label: "retrieve",
    caption:
      "③ retrieval / tool 负责补事实：订单状态、知识库条目、历史工单都作为显式证据传下去。",
    intake: true,
    route: true,
    retrieve: true,
    guard: false,
    eval: false,
    escalate: false,
    ledger: false,
  },
  {
    label: "guard",
    caption:
      "④ guardrail 可以并行跑：合规、权限、PII 检查不需要等答案生成完才补救。",
    intake: true,
    route: true,
    retrieve: true,
    guard: true,
    eval: false,
    escalate: false,
    ledger: false,
  },
  {
    label: "eval",
    caption:
      "⑤ evaluator 检查答复是否命中证据和服务标准，失败就回到更早的确定步骤。",
    intake: true,
    route: true,
    retrieve: true,
    guard: true,
    eval: true,
    escalate: false,
    ledger: true,
  },
  {
    label: "escalate",
    caption:
      "⑥ 只有低置信或高风险案例，才升级给 agent / 人工；主路径仍保持可测、可回退。",
    intake: true,
    route: true,
    retrieve: true,
    guard: true,
    eval: true,
    escalate: true,
    ledger: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type StageProps = {
  x: number;
  y: number;
  width?: number;
  title: string;
  body: string;
  io: string;
  tone: string;
};

function StageCard({
  x,
  y,
  width = CARD_W,
  title,
  body,
  io,
  tone,
}: StageProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={CARD_H}
        rx={CARD_RADIUS}
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <rect
        x={x + 10}
        y={y + 10}
        width={width - 20}
        height={20}
        rx={CHIP_RADIUS}
        fill={tone}
        fillOpacity="0.14"
        stroke={tone}
      />
      <text
        x={x + width / 2}
        y={y + 24}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={tone}
      >
        {title}
      </text>
      <text
        x={x + width / 2}
        y={y + 48}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-primary)"
      >
        {body}
      </text>
      <text
        x={x + width / 2}
        y={y + 64}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-secondary)"
      >
        {io}
      </text>
    </g>
  );
}

function FlowLabel({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={TEXT_SIZE}
      fill="var(--text-secondary)"
    >
      {children}
    </text>
  );
}

export function PatternCompositionBlueprintDiagram() {
  const intakeRef = useRef<SVGGElement | null>(null);
  const routeRef = useRef<SVGGElement | null>(null);
  const retrieveRef = useRef<SVGGElement | null>(null);
  const guardRef = useRef<SVGGElement | null>(null);
  const evalRef = useRef<SVGGElement | null>(null);
  const escalateRef = useRef<SVGGElement | null>(null);
  const ledgerRef = useRef<SVGGElement | null>(null);

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

        fade(intakeRef.current, step.intake, start);
        fade(routeRef.current, step.route, start);
        fade(retrieveRef.current, step.retrieve, start);
        fade(guardRef.current, step.guard, start);
        fade(evalRef.current, step.eval, start);
        fade(escalateRef.current, step.escalate, start);
        fade(ledgerRef.current, step.ledger, start);

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
            aria-label="客户问题处理系统的模式组合蓝图。客户问题先进入 intake，变成意图、上下文和风险信号；routing 把问题分到退款、技术或投诉路径；retrieval 和工具调用补订单、知识库和历史工单证据；合规、权限和隐私检查并行形成 guardrail；evaluator 检查答案是否命中证据和服务标准；只有低置信或高风险问题才升级给 agent 或人工。图中每段输入输出都显式记录，强调系统可测、可审计、可回退。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="pcbd-arrow"
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
                id="pcbd-warn"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
              </marker>
              <marker
                id="pcbd-danger"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
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
              客户问题处理系统：把模式组合成可审计蓝图
            </text>

            <g ref={intakeRef} opacity={SHOWN}>
              <StageCard
                x={stageX(0)}
                y={TOP_Y}
                title="intake"
                body="客户问题"
                io="in: 文本 + 账户"
                tone="var(--accent)"
              />
            </g>

            <g ref={routeRef} opacity={PREVIEW}>
              <line
                x1={stageX(0) + CARD_W}
                y1={TOP_Y + CARD_H / 2}
                x2={stageX(1) - 8}
                y2={TOP_Y + CARD_H / 2}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#pcbd-arrow)"
              />
              <FlowLabel x={stageX(1) - STAGE_GAP / 2} y={TOP_Y + 28}>
                意图
              </FlowLabel>
              <StageCard
                x={stageX(1)}
                y={TOP_Y}
                title="routing"
                body="退款 / 技术"
                io="out: 路径"
                tone="var(--success)"
              />
            </g>

            <g ref={retrieveRef} opacity={PREVIEW}>
              <line
                x1={stageX(1) + CARD_W}
                y1={TOP_Y + CARD_H / 2}
                x2={stageX(2) - 8}
                y2={TOP_Y + CARD_H / 2}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#pcbd-arrow)"
              />
              <FlowLabel x={stageX(2) - STAGE_GAP / 2} y={TOP_Y + 28}>
                路径
              </FlowLabel>
              <StageCard
                x={stageX(2)}
                y={TOP_Y}
                title="retrieval"
                body="订单 / KB"
                io="out: 证据"
                tone="var(--accent)"
              />
            </g>

            <g ref={guardRef} opacity={PREVIEW}>
              <line
                x1={stageX(2) + CARD_W}
                y1={TOP_Y + CARD_H / 2}
                x2={stageX(3) - 8}
                y2={TOP_Y + CARD_H / 2}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#pcbd-arrow)"
              />
              <FlowLabel x={stageX(3) - STAGE_GAP / 2} y={TOP_Y + 28}>
                证据
              </FlowLabel>
              <StageCard
                x={stageX(3)}
                y={TOP_Y}
                title="answer"
                body="草拟答复"
                io="out: 候选"
                tone="var(--text-secondary)"
              />
              <path
                d={`M ${stageX(2) + CARD_W / 2} ${TOP_Y + CARD_H} C ${stageX(2) + CARD_W / 2} 184, ${stageX(3) + CARD_W / 2} 184, ${stageX(3) + CARD_W / 2} ${TOP_Y + CARD_H}`}
                fill="none"
                stroke="var(--warning)"
                strokeWidth="2"
                strokeDasharray="7 5"
                markerEnd="url(#pcbd-warn)"
              />
              <rect
                x={stageX(2) + 8}
                y={164}
                width={236}
                height={92}
                rx={CARD_RADIUS}
                fill="var(--warning)"
                fillOpacity="0.1"
                stroke="var(--warning)"
              />
              <text
                x={stageX(2) + 126}
                y={188}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--warning)"
              >
                parallel guardrail
              </text>
              <text
                x={stageX(2) + 42}
                y={216}
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                合规
              </text>
              <text
                x={stageX(2) + 112}
                y={216}
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                权限
              </text>
              <text
                x={stageX(2) + 182}
                y={216}
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                PII
              </text>
              <text
                x={stageX(2) + 126}
                y={240}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                out: 风险标签 + 阻断理由
              </text>
            </g>

            <g ref={evalRef} opacity={PREVIEW}>
              <line
                x1={stageX(3) + CARD_W}
                y1={TOP_Y + CARD_H / 2}
                x2={stageX(4) - 8}
                y2={TOP_Y + CARD_H / 2}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#pcbd-arrow)"
              />
              <FlowLabel x={stageX(4) - STAGE_GAP / 2} y={TOP_Y + 28}>
                候选
              </FlowLabel>
              <StageCard
                x={stageX(4)}
                y={TOP_Y}
                title="evaluator"
                body="证据 + 标准"
                io="out: pass / fix"
                tone="var(--success)"
              />
              <path
                d={`M ${stageX(4) + CARD_W / 2} ${TOP_Y + CARD_H} C ${stageX(4) + 42} 284, ${stageX(2) + 72} 284, ${stageX(2) + 72} ${TOP_Y + CARD_H + 8}`}
                fill="none"
                stroke="var(--danger)"
                strokeWidth="2"
                strokeDasharray="7 5"
                markerEnd="url(#pcbd-danger)"
              />
              <text
                x={stageX(3) + 22}
                y={294}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--danger)"
              >
                fail 回退
              </text>
            </g>

            <g ref={escalateRef} opacity={PREVIEW}>
              <line
                x1={stageX(4) + CARD_W}
                y1={TOP_Y + CARD_H / 2}
                x2={stageX(5) - 8}
                y2={TOP_Y + CARD_H / 2}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#pcbd-arrow)"
              />
              <FlowLabel x={stageX(5) - STAGE_GAP / 2} y={TOP_Y + 28}>
                低置信
              </FlowLabel>
              <StageCard
                x={stageX(5)}
                y={TOP_Y}
                width={SMALL_CARD_W}
                title="escalate"
                body="agent / 人工"
                io="只处理例外"
                tone="var(--warning)"
              />
            </g>

            <g ref={ledgerRef} opacity={PREVIEW}>
              <rect
                x={LEDGER_X}
                y={LEDGER_Y}
                width={LEDGER_W}
                height={LEDGER_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <text
                x={LEDGER_X + LEDGER_W / 2}
                y={LEDGER_Y + 23}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                透明组合账本
              </text>
              <text
                x={LEDGER_X + LEDGER_W / 2}
                y={LEDGER_Y + 43}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                每段都记录 in / out / metric：错了能定位，指标没涨能回退
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="组合不是把模式堆满，而是让每一段输入、输出、指标和回退点都清清楚楚。"
        />
      </div>
    </figure>
  );
}
