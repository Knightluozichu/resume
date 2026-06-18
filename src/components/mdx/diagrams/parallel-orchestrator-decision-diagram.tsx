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
  PATTERN_RADIUS_CARD,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 532;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;

const SHOWN = 1;
const HIDDEN = 0;

const START_X = 196;
const START_Y = 40;
const START_W = 328;
const START_H = 52;

const Q1_CX = 360;
const Q1_CY = 154;
const Q1_HW = 156;
const Q1_HH = 50;

const PAR_X = 32;
const END_Y = 260;
const END_W = 208;
const END_H = 92;

const Q2_CX = 360;
const Q2_CY = 292;
const Q2_HW = 148;
const Q2_HH = 48;

const ORCH_X = 256;
const BOUNDARY_X = 480;

const CONC_X = 52;
const CONC_Y = 444;
const CONC_W = 616;
const CONC_H = 48;

type DecisionStep = TeachingStep & {
  start: boolean;
  q1: boolean;
  parallel: boolean;
  q2: boolean;
  orchestrator: boolean;
  boundary: boolean;
  conclusion: boolean;
};

const STEPS: readonly DecisionStep[] = [
  {
    label: "task",
    caption: "① 先看任务结构，不要一上来就选最重的模式。",
    start: true,
    q1: false,
    parallel: false,
    q2: false,
    orchestrator: false,
    boundary: false,
    conclusion: false,
  },
  {
    label: "q1",
    caption:
      "② 第一问：子任务能否预先列清，而且彼此互不依赖？能，优先考虑并行。",
    start: true,
    q1: true,
    parallel: false,
    q2: false,
    orchestrator: false,
    boundary: false,
    conclusion: false,
  },
  {
    label: "parallel",
    caption: "③ 能列清且独立 -> 并行：fan-out 一起做，再 fan-in 汇总。",
    start: true,
    q1: true,
    parallel: true,
    q2: false,
    orchestrator: false,
    boundary: false,
    conclusion: false,
  },
  {
    label: "q2",
    caption:
      "④ 如果不能预先列清，再问第二句：需不需要先有一个编排者读任务，再动态拆活？",
    start: true,
    q1: true,
    parallel: true,
    q2: true,
    orchestrator: false,
    boundary: false,
    conclusion: false,
  },
  {
    label: "orchestrator",
    caption: "⑤ 需要先拆活 -> 编排-工作者：先理解任务，再决定派几个 worker。",
    start: true,
    q1: true,
    parallel: true,
    q2: true,
    orchestrator: true,
    boundary: false,
    conclusion: false,
  },
  {
    label: "boundary",
    caption:
      "⑥ 两个问题都答不上来，说明它已越过这章边界，需要更高自主性的模式。",
    start: true,
    q1: true,
    parallel: true,
    q2: true,
    orchestrator: true,
    boundary: true,
    conclusion: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function ParallelOrchestratorDecisionDiagram() {
  const startRef = useRef<SVGGElement | null>(null);
  const q1Ref = useRef<SVGGElement | null>(null);
  const parallelRef = useRef<SVGGElement | null>(null);
  const q2Ref = useRef<SVGGElement | null>(null);
  const orchestratorRef = useRef<SVGGElement | null>(null);
  const boundaryRef = useRef<SVGGElement | null>(null);
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
        fade(parallelRef.current, step.parallel, start);
        fade(q2Ref.current, step.q2, start);
        fade(orchestratorRef.current, step.orchestrator, start);
        fade(boundaryRef.current, step.boundary, start);
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
            aria-label="并行与编排-工作者选型决策动画，共六步。第一步先看任务结构。第二步问第一个问题：子任务能否预先列清，而且彼此互不依赖。第三步如果能，就落到左侧绿色的并行终点，表示 fan-out 一起做再 fan-in 汇总。第四步如果不能预先列清，再问第二个问题：是否需要先有一个编排者读任务，再动态拆出若干 worker。第五步如果需要，就落到中间紫色的编排-工作者终点。第六步如果两个问题都答不上来，就落到右侧红色边界，表示这已经越过本章工作流范围，需要更高自主性的 agent 模式。底部总结条强调：列得清且独立用并行，列不清但能先拆活用编排者，再往外才考虑更高自主性。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="pod-arrow"
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
                id="pod-arrow-ok"
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
                id="pod-arrow-accent"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
              </marker>
              <marker
                id="pod-arrow-danger"
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
              y={22}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              点播放：看任务会落到并行、编排-工作者，还是越界到更高自主性
            </text>

            <g ref={startRef} opacity={0}>
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
                来了一个复杂任务，先别急着上最重的模式
              </text>
              <text
                x={VIEW_W / 2}
                y={START_Y + 40}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                先问它的子任务结构，再决定怎么拆
              </text>
            </g>

            <g ref={q1Ref} opacity={0}>
              <line
                x1={VIEW_W / 2}
                y1={START_Y + START_H}
                x2={Q1_CX}
                y2={Q1_CY - Q1_HH - 10}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#pod-arrow)"
              />
              <polygon
                points={`${Q1_CX},${Q1_CY - Q1_HH} ${Q1_CX + Q1_HW},${Q1_CY} ${Q1_CX},${Q1_CY + Q1_HH} ${Q1_CX - Q1_HW},${Q1_CY}`}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <text
                x={Q1_CX}
                y={Q1_CY - 12}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                子任务能否预先列清
              </text>
              <text
                x={Q1_CX}
                y={Q1_CY + 8}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                且彼此互不依赖？
              </text>
            </g>

            <g ref={parallelRef} opacity={0}>
              <line
                x1={Q1_CX - Q1_HW}
                y1={Q1_CY}
                x2={PAR_X + END_W - 10}
                y2={END_Y + END_H / 2}
                stroke="var(--success)"
                strokeWidth="2"
                markerEnd="url(#pod-arrow-ok)"
              />
              <text
                x={132}
                y={212}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                能
              </text>
              <rect
                x={PAR_X}
                y={END_Y}
                width={END_W}
                height={END_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--success)"
                strokeWidth="1.6"
              />
              <text
                x={PAR_X + END_W / 2}
                y={END_Y + 26}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                并行
              </text>
              <text
                x={PAR_X + END_W / 2}
                y={END_Y + 48}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                fan-out 一起做
              </text>
              <text
                x={PAR_X + END_W / 2}
                y={END_Y + 68}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                fan-in 再统一收口
              </text>
            </g>

            <g ref={q2Ref} opacity={0}>
              <line
                x1={Q1_CX}
                y1={Q1_CY + Q1_HH}
                x2={Q2_CX}
                y2={Q2_CY - Q2_HH - 10}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#pod-arrow)"
              />
              <text
                x={388}
                y={226}
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
                是否需要先有编排者
              </text>
              <text
                x={Q2_CX}
                y={Q2_CY + 10}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                读任务再动态拆活？
              </text>
            </g>

            <g ref={orchestratorRef} opacity={0}>
              <line
                x1={Q2_CX}
                y1={Q2_CY + Q2_HH}
                x2={ORCH_X + END_W / 2}
                y2={END_Y + END_H + 22}
                stroke="var(--accent)"
                strokeWidth="2"
                markerEnd="url(#pod-arrow-accent)"
              />
              <text
                x={320}
                y={382}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--accent)"
              >
                需要
              </text>
              <rect
                x={ORCH_X}
                y={END_Y + 118}
                width={END_W}
                height={END_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth="1.6"
              />
              <text
                x={ORCH_X + END_W / 2}
                y={END_Y + 144}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--accent)"
              >
                编排-工作者
              </text>
              <text
                x={ORCH_X + END_W / 2}
                y={END_Y + 166}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                先理解任务
              </text>
              <text
                x={ORCH_X + END_W / 2}
                y={END_Y + 186}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                再决定派几个 worker
              </text>
            </g>

            <g ref={boundaryRef} opacity={0}>
              <line
                x1={Q2_CX + Q2_HW}
                y1={Q2_CY}
                x2={BOUNDARY_X}
                y2={END_Y + END_H / 2}
                stroke="var(--danger)"
                strokeWidth="2"
                markerEnd="url(#pod-arrow-danger)"
              />
              <text
                x={522}
                y={252}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--danger)"
              >
                不止这些
              </text>
              <rect
                x={BOUNDARY_X}
                y={END_Y}
                width={END_W}
                height={END_H}
                rx={CARD_RADIUS}
                fill="var(--danger)"
                opacity="0.12"
              />
              <rect
                x={BOUNDARY_X}
                y={END_Y}
                width={END_W}
                height={END_H}
                rx={CARD_RADIUS}
                fill="none"
                stroke="var(--danger)"
                strokeWidth="1.6"
                strokeDasharray="5 4"
              />
              <text
                x={BOUNDARY_X + END_W / 2}
                y={END_Y + 26}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--danger)"
              >
                更高自主性边界
              </text>
              <text
                x={BOUNDARY_X + END_W / 2}
                y={END_Y + 48}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                不是先并行或先拆活
              </text>
              <text
                x={BOUNDARY_X + END_W / 2}
                y={END_Y + 68}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                而是需要更强的临场决策
              </text>
            </g>

            <g ref={conclusionRef} opacity={0}>
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
                y={CONC_Y + 21}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                先问结构：列得清且独立用并行，列不清但能先拆活用编排者
              </text>
              <text
                x={VIEW_W / 2}
                y={CONC_Y + 39}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                两条都不够时，才越过本章边界去考虑更高自主性模式
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          caption="先判断任务能否预先并行；再判断是否需要编排者动态拆活。"
          labelText={LABEL_TEXT}
        />
      </div>
    </figure>
  );
}
