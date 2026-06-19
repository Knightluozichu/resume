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
const VIEW_H = 452;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const SHOWN = 1;
const HIDDEN = 0;
const MUTED = 0.28;

const STAGE_Y = 112;
const STAGE_W = 164;
const STAGE_H = 84;
const SINGLE_X = 48;
const WORKFLOW_X = 278;
const AGENT_X = 508;
const GATE_X = 86;
const GATE_Y = 252;
const GATE_W = 126;
const GATE_H = 58;
const GATE_GAP = 44;

type GateId = "evidence" | "path" | "feedback" | "guardrails";

type Gate = {
  id: GateId;
  title: string;
  note: string;
  tone: string;
};

const GATES: readonly Gate[] = [
  {
    id: "evidence",
    title: "收益证据",
    note: "eval 胜过成本",
    tone: "var(--success)",
  },
  {
    id: "path",
    title: "开放路径",
    note: "步骤不能预写死",
    tone: "var(--accent)",
  },
  {
    id: "feedback",
    title: "可靠反馈",
    note: "错误能被看见",
    tone: "var(--warning)",
  },
  {
    id: "guardrails",
    title: "边界护栏",
    note: "权限 / 人审 / 回滚",
    tone: "var(--danger)",
  },
] as const;

type ComplexityStep = TeachingStep & {
  activeStage: "single" | "workflow" | "agent";
  passedGates: readonly GateId[];
  workflowArrow: boolean;
  agentArrow: boolean;
  unlock: boolean;
};

const STEPS: readonly ComplexityStep[] = [
  {
    label: "single",
    caption: "① 从 single LLM 开始：一次请求能解决，就不要先加循环和状态。",
    activeStage: "single",
    passedGates: [],
    workflowArrow: false,
    agentArrow: false,
    unlock: false,
  },
  {
    label: "evidence",
    caption: "② 先看收益证据：eval 没证明提升，复杂度闸门不开。",
    activeStage: "workflow",
    passedGates: ["evidence"],
    workflowArrow: true,
    agentArrow: false,
    unlock: false,
  },
  {
    label: "path",
    caption:
      "③ 再看路径是否开放：如果步骤固定，workflow 就够；开放路径才继续考虑 agent。",
    activeStage: "workflow",
    passedGates: ["evidence", "path"],
    workflowArrow: true,
    agentArrow: false,
    unlock: false,
  },
  {
    label: "feedback",
    caption: "④ agent 需要可靠反馈：工具结果、测试、日志要能告诉它走错了。",
    activeStage: "workflow",
    passedGates: ["evidence", "path", "feedback"],
    workflowArrow: true,
    agentArrow: false,
    unlock: false,
  },
  {
    label: "guardrails",
    caption: "⑤ 最后补边界护栏：权限、预算、人工接管、回滚都齐，才允许升级。",
    activeStage: "agent",
    passedGates: ["evidence", "path", "feedback", "guardrails"],
    workflowArrow: true,
    agentArrow: true,
    unlock: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function stageCenter(x: number) {
  return x + STAGE_W / 2;
}

function StageCard({
  x,
  title,
  note,
  tone,
  activeRef,
  active,
}: {
  x: number;
  title: string;
  note: string;
  tone: string;
  activeRef: (el: SVGRectElement | null) => void;
  active: boolean;
}) {
  return (
    <g>
      <rect
        ref={activeRef}
        x={x - 8}
        y={STAGE_Y - 8}
        width={STAGE_W + 16}
        height={STAGE_H + 16}
        rx={CARD_RADIUS}
        fill={tone}
        fillOpacity="0.12"
        stroke={tone}
        strokeWidth="2"
        opacity={active ? SHOWN : MUTED}
      />
      <rect
        x={x}
        y={STAGE_Y}
        width={STAGE_W}
        height={STAGE_H}
        rx={CARD_RADIUS}
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <text
        x={stageCenter(x)}
        y={STAGE_Y + 32}
        textAnchor="middle"
        fontSize={TITLE_SIZE}
        fontWeight="700"
        fill={tone}
      >
        {title}
      </text>
      <text
        x={stageCenter(x)}
        y={STAGE_Y + 58}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-secondary)"
      >
        {note}
      </text>
    </g>
  );
}

function GateCard({
  gate,
  index,
  activeRef,
}: {
  gate: Gate;
  index: number;
  activeRef: (el: SVGGElement | null) => void;
}) {
  const x = GATE_X + index * (GATE_W + GATE_GAP);
  return (
    <g ref={activeRef} opacity={MUTED}>
      <rect
        x={x}
        y={GATE_Y}
        width={GATE_W}
        height={GATE_H}
        rx={CARD_RADIUS}
        fill="var(--bg)"
        stroke={gate.tone}
      />
      <circle
        cx={x + 20}
        cy={GATE_Y + 20}
        r={8}
        fill={gate.tone}
        fillOpacity="0.16"
        stroke={gate.tone}
      />
      <text
        x={x + 20}
        y={GATE_Y + 24}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={gate.tone}
      >
        ✓
      </text>
      <text
        x={x + 68}
        y={GATE_Y + 22}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={gate.tone}
      >
        {gate.title}
      </text>
      <text
        x={x + GATE_W / 2}
        y={GATE_Y + 44}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-secondary)"
      >
        {gate.note}
      </text>
    </g>
  );
}

export function AgentComplexityGateDiagram() {
  const singleRef = useRef<SVGRectElement | null>(null);
  const workflowRef = useRef<SVGRectElement | null>(null);
  const agentRef = useRef<SVGRectElement | null>(null);
  const workflowArrowRef = useRef<SVGGElement | null>(null);
  const agentArrowRef = useRef<SVGGElement | null>(null);
  const unlockRef = useRef<SVGGElement | null>(null);
  const gateRefs = useRef<Record<GateId, SVGGElement | null>>({
    evidence: null,
    path: null,
    feedback: null,
    guardrails: null,
  });

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fadeRect = (
        el: SVGRectElement | null,
        opacity: number,
        start: number,
      ) => {
        if (!el) return;
        tl.add(
          el,
          {
            opacity,
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          start,
        );
      };
      const fadeGroup = (
        el: SVGGElement | null,
        opacity: number,
        start: number,
      ) => {
        if (!el) return;
        tl.add(
          el,
          {
            opacity,
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          start,
        );
      };

      STEPS.forEach((step, index) => {
        const start = TEACHING_BEAT_MS * index;
        const lit = TEACHING_BEAT_MS * (index + 1);

        fadeRect(
          singleRef.current,
          step.activeStage === "single" ? SHOWN : MUTED,
          start,
        );
        fadeRect(
          workflowRef.current,
          step.activeStage === "workflow" ? SHOWN : MUTED,
          start,
        );
        fadeRect(
          agentRef.current,
          step.activeStage === "agent" ? SHOWN : MUTED,
          start,
        );
        fadeGroup(
          workflowArrowRef.current,
          step.workflowArrow ? SHOWN : MUTED,
          start,
        );
        fadeGroup(
          agentArrowRef.current,
          step.agentArrow ? SHOWN : MUTED,
          start,
        );
        fadeGroup(unlockRef.current, step.unlock ? SHOWN : HIDDEN, start);

        GATES.forEach((gate) => {
          fadeGroup(
            gateRefs.current[gate.id],
            step.passedGates.includes(gate.id) ? SHOWN : MUTED,
            start,
          );
        });

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
            aria-label="复杂度闸门动画。从 single LLM 出发，经过 workflow，最后才到 agent。四个闸门依次是收益证据、开放路径、可靠反馈、边界护栏。只有四个闸门都满足时，agent 升级箭头才亮起。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="acgd-arrow"
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
                id="acgd-arrow-ok"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
              </marker>
            </defs>

            <text
              x={VIEW_W / 2}
              y={30}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              复杂度闸门：不是想上 agent，而是被证据推到 agent
            </text>
            <text
              x={VIEW_W / 2}
              y={54}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              每升一级都要过闸；缺任一项，就停在更简单的方案
            </text>

            <StageCard
              x={SINGLE_X}
              title="single LLM"
              note="一次请求"
              tone="var(--text-secondary)"
              active={true}
              activeRef={(el) => {
                singleRef.current = el;
              }}
            />
            <StageCard
              x={WORKFLOW_X}
              title="workflow"
              note="路径可编排"
              tone="var(--accent)"
              active={false}
              activeRef={(el) => {
                workflowRef.current = el;
              }}
            />
            <StageCard
              x={AGENT_X}
              title="agent"
              note="滚动决策"
              tone="var(--danger)"
              active={false}
              activeRef={(el) => {
                agentRef.current = el;
              }}
            />

            <g
              ref={(el) => {
                workflowArrowRef.current = el;
              }}
              opacity={MUTED}
            >
              <line
                x1={SINGLE_X + STAGE_W + 18}
                y1={STAGE_Y + STAGE_H / 2}
                x2={WORKFLOW_X - 18}
                y2={STAGE_Y + STAGE_H / 2}
                stroke="var(--accent)"
                strokeWidth="2"
                markerEnd="url(#acgd-arrow)"
              />
              <text
                x={245}
                y={STAGE_Y + 32}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--accent)"
              >
                编排
              </text>
            </g>
            <g
              ref={(el) => {
                agentArrowRef.current = el;
              }}
              opacity={MUTED}
            >
              <line
                x1={WORKFLOW_X + STAGE_W + 18}
                y1={STAGE_Y + STAGE_H / 2}
                x2={AGENT_X - 18}
                y2={STAGE_Y + STAGE_H / 2}
                stroke="var(--success)"
                strokeWidth="2"
                markerEnd="url(#acgd-arrow-ok)"
              />
              <text
                x={475}
                y={STAGE_Y + 32}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--success)"
              >
                解锁
              </text>
            </g>

            {GATES.map((gate, index) => (
              <GateCard
                key={gate.id}
                gate={gate}
                index={index}
                activeRef={(el) => {
                  gateRefs.current[gate.id] = el;
                }}
              />
            ))}

            <g
              ref={(el) => {
                unlockRef.current = el;
              }}
              opacity={HIDDEN}
            >
              <rect
                x={132}
                y={354}
                width={456}
                height={42}
                rx={CHIP_RADIUS}
                fill="var(--success)"
                fillOpacity="0.12"
                stroke="var(--success)"
              />
              <text
                x={VIEW_W / 2}
                y={381}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                四项全亮：才允许从 workflow 升级到 agent
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="复杂度是成本，不是奖杯；闸门让升级有证据、有反馈、有边界。"
        />
      </div>
    </figure>
  );
}
