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
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 532;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;

const SHOWN = 1;
const HIDDEN = 0;

const START_X = 196;
const START_Y = 48;
const START_W = 328;
const START_H = 52;

const Q1_CX = 360;
const Q1_CY = 164;
const Q1_HW = 160;
const Q1_HH = 50;

const WORKFLOW_X = 44;
const OUTCOME_Y = 286;
const OUTCOME_W = 204;
const OUTCOME_H = 92;

const Q2_CX = 360;
const Q2_CY = 330;
const Q2_HW = 156;
const Q2_HH = 48;

const AGENT_X = 472;
const AGENT_Y = 392;
const SAFETY_X = 44;
const SAFETY_Y = 392;
const CONC_X = 60;
const CONC_Y = 472;
const CONC_W = 600;
const CONC_H = 40;

type DecisionStep = TeachingStep & {
  start: boolean;
  q1: boolean;
  workflow: boolean;
  q2: boolean;
  safety: boolean;
  agent: boolean;
  conclusion: boolean;
};

const STEPS: readonly DecisionStep[] = [
  {
    label: "task",
    caption:
      "① 先看任务路径：不要因为 agent 听起来高级，就跳过最便宜的固定流程。",
    start: true,
    q1: false,
    workflow: false,
    q2: false,
    safety: false,
    agent: false,
    conclusion: false,
  },
  {
    label: "fixed",
    caption:
      "② 第一问：路径能否预设？如果每次都是固定几步，workflow 更稳、更便宜。",
    start: true,
    q1: true,
    workflow: false,
    q2: false,
    safety: false,
    agent: false,
    conclusion: false,
  },
  {
    label: "workflow",
    caption:
      "③ 能预设路径 -> 用 workflow：写死步骤、关卡和错误处理，让模型只填局部判断。",
    start: true,
    q1: true,
    workflow: true,
    q2: false,
    safety: false,
    agent: false,
    conclusion: false,
  },
  {
    label: "open",
    caption:
      "④ 如果路径无法预设，再问：它是否开放多步、需要边做边观察真实环境？",
    start: true,
    q1: true,
    workflow: true,
    q2: true,
    safety: false,
    agent: false,
    conclusion: false,
  },
  {
    label: "guard",
    caption: "⑤ 开放多步还不够：环境必须可信，且有沙盒、权限边界和停机条件。",
    start: true,
    q1: true,
    workflow: true,
    q2: true,
    safety: true,
    agent: false,
    conclusion: false,
  },
  {
    label: "agent",
    caption:
      "⑥ 同时满足开放路径、环境反馈可信、边界清楚，才值得上 autonomous agent。",
    start: true,
    q1: true,
    workflow: true,
    q2: true,
    safety: true,
    agent: true,
    conclusion: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function AutonomousAgentDecisionDiagram() {
  const startRef = useRef<SVGGElement | null>(null);
  const q1Ref = useRef<SVGGElement | null>(null);
  const workflowRef = useRef<SVGGElement | null>(null);
  const q2Ref = useRef<SVGGElement | null>(null);
  const safetyRef = useRef<SVGGElement | null>(null);
  const agentRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

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

        fade(startRef.current, step.start, start);
        fade(q1Ref.current, step.q1, start);
        fade(workflowRef.current, step.workflow, start);
        fade(q2Ref.current, step.q2, start);
        fade(safetyRef.current, step.safety, start);
        fade(agentRef.current, step.agent, start);
        fade(conclusionRef.current, step.conclusion, start);

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
            aria-label="固定 workflow 与自主智能体的选型决策动画。先判断任务路径能不能预设，能预设就用固定 workflow。不能预设时，再判断是否开放多步、需要真实环境反馈，并检查环境可信、沙盒、权限和停机条件。只有这些条件同时成立，才使用 autonomous agent。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="aadd-arrow"
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
                id="aadd-ok"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
              </marker>
              <marker
                id="aadd-warn"
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
                id="aadd-accent"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
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
              先问能否写死路径，再问是否值得放权
            </text>

            <g ref={startRef} opacity={HIDDEN}>
              <rect
                x={START_X}
                y={START_Y}
                width={START_W}
                height={START_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <text
                x={VIEW_W / 2}
                y={START_Y + 22}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                来了一个复杂自动化任务
              </text>
              <text
                x={VIEW_W / 2}
                y={START_Y + 40}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                先选最小够用的控制结构
              </text>
            </g>

            <g ref={q1Ref} opacity={HIDDEN}>
              <line
                x1={VIEW_W / 2}
                y1={START_Y + START_H}
                x2={Q1_CX}
                y2={Q1_CY - Q1_HH - 10}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#aadd-arrow)"
              />
              <polygon
                points={`${Q1_CX},${Q1_CY - Q1_HH} ${Q1_CX + Q1_HW},${Q1_CY} ${Q1_CX},${Q1_CY + Q1_HH} ${Q1_CX - Q1_HW},${Q1_CY}`}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <text
                x={Q1_CX}
                y={Q1_CY - 10}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                路径能否预设？
              </text>
              <text
                x={Q1_CX}
                y={Q1_CY + 12}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                步骤、分支、错误处理能写清吗？
              </text>
            </g>

            <g ref={workflowRef} opacity={HIDDEN}>
              <line
                x1={Q1_CX - Q1_HW}
                y1={Q1_CY}
                x2={WORKFLOW_X + OUTCOME_W - 10}
                y2={OUTCOME_Y + OUTCOME_H / 2}
                stroke="var(--success)"
                strokeWidth="2"
                markerEnd="url(#aadd-ok)"
              />
              <text
                x={142}
                y={236}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                能
              </text>
              <rect
                x={WORKFLOW_X}
                y={OUTCOME_Y}
                width={OUTCOME_W}
                height={OUTCOME_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--success)"
              />
              <text
                x={WORKFLOW_X + OUTCOME_W / 2}
                y={OUTCOME_Y + 28}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                固定 workflow
              </text>
              <text
                x={WORKFLOW_X + OUTCOME_W / 2}
                y={OUTCOME_Y + 52}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                结构写死，模型填局部
              </text>
              <text
                x={WORKFLOW_X + OUTCOME_W / 2}
                y={OUTCOME_Y + 72}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                更稳、更便宜、可审计
              </text>
            </g>

            <g ref={q2Ref} opacity={HIDDEN}>
              <line
                x1={Q1_CX}
                y1={Q1_CY + Q1_HH}
                x2={Q2_CX}
                y2={Q2_CY - Q2_HH - 10}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#aadd-arrow)"
              />
              <text
                x={390}
                y={236}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-secondary)"
              >
                不能
              </text>
              <polygon
                points={`${Q2_CX},${Q2_CY - Q2_HH} ${Q2_CX + Q2_HW},${Q2_CY} ${Q2_CX},${Q2_CY + Q2_HH} ${Q2_CX - Q2_HW},${Q2_CY}`}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <text
                x={Q2_CX}
                y={Q2_CY - 10}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                开放多步 + 真实反馈？
              </text>
              <text
                x={Q2_CX}
                y={Q2_CY + 12}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                下一步要靠环境结果决定吗？
              </text>
            </g>

            <g ref={safetyRef} opacity={HIDDEN}>
              <line
                x1={Q2_CX - Q2_HW}
                y1={Q2_CY}
                x2={SAFETY_X + OUTCOME_W}
                y2={SAFETY_Y + OUTCOME_H / 2}
                stroke="var(--warning)"
                strokeWidth="2"
                markerEnd="url(#aadd-warn)"
              />
              <rect
                x={SAFETY_X}
                y={SAFETY_Y}
                width={OUTCOME_W}
                height={OUTCOME_H}
                rx={CARD_RADIUS}
                fill="var(--warning)"
                fillOpacity="0.1"
                stroke="var(--warning)"
                strokeDasharray="6 5"
              />
              <text
                x={SAFETY_X + OUTCOME_W / 2}
                y={SAFETY_Y + 28}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--warning)"
              >
                先补安全边界
              </text>
              <text
                x={SAFETY_X + OUTCOME_W / 2}
                y={SAFETY_Y + 52}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                沙盒 / 权限 / 停机
              </text>
              <text
                x={SAFETY_X + OUTCOME_W / 2}
                y={SAFETY_Y + 72}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                没有这些，先别放权
              </text>
            </g>

            <g ref={agentRef} opacity={HIDDEN}>
              <line
                x1={Q2_CX + Q2_HW}
                y1={Q2_CY}
                x2={AGENT_X}
                y2={AGENT_Y + OUTCOME_H / 2}
                stroke="var(--accent)"
                strokeWidth="2"
                markerEnd="url(#aadd-accent)"
              />
              <text
                x={574}
                y={350}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--accent)"
              >
                成立
              </text>
              <rect
                x={AGENT_X}
                y={AGENT_Y}
                width={OUTCOME_W}
                height={OUTCOME_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--accent)"
              />
              <text
                x={AGENT_X + OUTCOME_W / 2}
                y={AGENT_Y + 28}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--accent)"
              >
                autonomous agent
              </text>
              <text
                x={AGENT_X + OUTCOME_W / 2}
                y={AGENT_Y + 52}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                运行中滚动规划
              </text>
              <text
                x={AGENT_X + OUTCOME_W / 2}
                y={AGENT_Y + 72}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                由环境反馈决定下一步
              </text>
            </g>

            <g ref={conclusionRef} opacity={HIDDEN}>
              <rect
                x={CONC_X}
                y={CONC_Y}
                width={CONC_W}
                height={CONC_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <text
                x={VIEW_W / 2}
                y={CONC_Y + 25}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                判断口诀：路径可预设用 workflow；路径开放且环境可信，才让 agent
                自主走
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="选型不是越自主越好：可预设路径优先 workflow，只有开放多步且有可信反馈与边界时才上 autonomous agent。"
        />
      </div>
    </figure>
  );
}
