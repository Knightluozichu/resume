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
const VIEW_H = 548;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;

const SHOWN = 1;
const HIDDEN = 0;

const START_X = 208;
const START_Y = 40;
const START_W = 304;
const START_H = 48;

const Q1_CX = 360;
const Q1_CY = 150;
const Q1_HW = 154;
const Q1_HH = 50;

const EVAL_X = 40;
const EVAL_Y = 248;
const EVAL_W = 220;
const EVAL_H = 84;

const Q2_CX = 360;
const Q2_CY = 286;
const Q2_HW = 152;
const Q2_HH = 48;

const LOOP_X = 256;
const LOOP_Y = 394;
const LOOP_W = 216;
const LOOP_H = 88;

const BOUNDARY_X = 500;
const BOUNDARY_Y = 394;
const BOUNDARY_W = 180;
const BOUNDARY_H = 88;

const CONC_X = 56;
const CONC_Y = 500;
const CONC_W = 608;
const CONC_H = 32;

type DecisionStep = TeachingStep & {
  start: boolean;
  q1: boolean;
  evaluator: boolean;
  q2: boolean;
  loop: boolean;
  boundary: boolean;
  conclusion: boolean;
};

const STEPS: readonly DecisionStep[] = [
  {
    label: "task",
    caption: "① 先看这是不是一份需要反复打磨的产物，而不是一条查完就走的简单结果。",
    start: true,
    q1: false,
    evaluator: false,
    q2: false,
    loop: false,
    boundary: false,
    conclusion: false,
  },
  {
    label: "q1",
    caption:
      "② 第一问：你能不能写出明确、稳定的评估标准？能打分，才有 evaluator 的位置。",
    start: true,
    q1: true,
    evaluator: false,
    q2: false,
    loop: false,
    boundary: false,
    conclusion: false,
  },
  {
    label: "evaluator",
    caption:
      "③ 标准清楚 -> 先立 evaluator：它按 rubric 打分，并把“差在哪里”说成可执行问题。",
    start: true,
    q1: true,
    evaluator: true,
    q2: false,
    loop: false,
    boundary: false,
    conclusion: false,
  },
  {
    label: "q2",
    caption:
      "④ 第二问：看完这些反馈再改一版，结果会不会真的变好？还是只会围着旧错误重写？",
    start: true,
    q1: true,
    evaluator: true,
    q2: true,
    loop: false,
    boundary: false,
    conclusion: false,
  },
  {
    label: "loop",
    caption:
      "⑤ 两问都成立 -> 评估-优化：评一次、改一版，再按 pass 条件或轮次上限决定要不要继续。",
    start: true,
    q1: true,
    evaluator: true,
    q2: true,
    loop: true,
    boundary: false,
    conclusion: false,
  },
  {
    label: "boundary",
    caption:
      "⑥ 如果标准太虚、缺新事实，或任务本身不靠返工提升，就别硬套这个 loop，换更合适的方案。",
    start: true,
    q1: true,
    evaluator: true,
    q2: true,
    loop: true,
    boundary: true,
    conclusion: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function EvaluatorOptimizerDecisionDiagram() {
  const startRef = useRef<SVGGElement | null>(null);
  const q1Ref = useRef<SVGGElement | null>(null);
  const evaluatorRef = useRef<SVGGElement | null>(null);
  const q2Ref = useRef<SVGGElement | null>(null);
  const loopRef = useRef<SVGGElement | null>(null);
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
        fade(evaluatorRef.current, step.evaluator, start);
        fade(q2Ref.current, step.q2, start);
        fade(loopRef.current, step.loop, start);
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
            aria-label="评估-优化选型决策动画，共六步。第一步先看任务是不是在打磨同一份产物。第二步问第一句：能不能写出明确、稳定的评估标准。第三步如果能，就先立 evaluator，让它按 rubric 打分并指出差在哪里。第四步再问第二句：看完这些反馈再改一版，结果会不会真的变好。第五步如果两者都成立，就进入评估-优化回环：评一次、改一版，再决定要不要继续。第六步如果标准太虚、缺新事实，或者返工并不会带来实质提升，就落到右侧边界，表示不要硬套这个 loop。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="eodd-arrow"
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
                id="eodd-arrow-ok"
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
                id="eodd-arrow-danger"
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
              点播放：看一个任务能不能用评估-优化闭环
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
                y={START_Y + 20}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                任务来了：要不要用 evaluator-optimizer？
              </text>
              <text
                x={VIEW_W / 2}
                y={START_Y + 38}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                先判断它是不是在打磨同一份产物
              </text>
            </g>

            <g ref={q1Ref} opacity={0}>
              <line
                x1={VIEW_W / 2}
                y1={START_Y + START_H}
                x2={VIEW_W / 2}
                y2={Q1_CY - Q1_HH - 10}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#eodd-arrow)"
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
                fill="var(--accent)"
              >
                能写出明确评估标准吗？
              </text>
              <text
                x={Q1_CX}
                y={Q1_CY + 12}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                能稳定打分，才值得放 evaluator
              </text>
            </g>

            <g ref={evaluatorRef} opacity={0}>
              <line
                x1={Q1_CX - Q1_HW}
                y1={Q1_CY}
                x2={EVAL_X + EVAL_W - 10}
                y2={EVAL_Y + 18}
                stroke="var(--success)"
                strokeWidth="2"
                markerEnd="url(#eodd-arrow-ok)"
              />
              <text
                x={202}
                y={214}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--success)"
              >
                能
              </text>
              <rect
                x={EVAL_X}
                y={EVAL_Y}
                width={EVAL_W}
                height={EVAL_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <rect
                x={EVAL_X + 12}
                y={EVAL_Y + 12}
                width={88}
                height={20}
                rx={CARD_RADIUS}
                fill="var(--accent)"
                fillOpacity="0.14"
                stroke="var(--accent)"
              />
              <text
                x={EVAL_X + 20}
                y={EVAL_Y + 26}
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--accent)"
              >
                evaluator
              </text>
              <text
                x={EVAL_X + EVAL_W / 2}
                y={EVAL_Y + 50}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                先按 rubric 打分
              </text>
              <text
                x={EVAL_X + EVAL_W / 2}
                y={EVAL_Y + 68}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                再把问题说成可执行修改意见
              </text>
            </g>

            <g ref={q2Ref} opacity={0}>
              <line
                x1={EVAL_X + EVAL_W}
                y1={EVAL_Y + EVAL_H / 2}
                x2={Q2_CX - Q2_HW - 12}
                y2={Q2_CY}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#eodd-arrow)"
              />
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
                fill="var(--accent)"
              >
                看完反馈再改一版，会不会真的变好？
              </text>
              <text
                x={Q2_CX}
                y={Q2_CY + 12}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                只会重写旧错误的任务，不适合进回环
              </text>
            </g>

            <g ref={loopRef} opacity={0}>
              <line
                x1={Q2_CX}
                y1={Q2_CY + Q2_HH}
                x2={Q2_CX}
                y2={LOOP_Y - 12}
                stroke="var(--success)"
                strokeWidth="2"
                markerEnd="url(#eodd-arrow-ok)"
              />
              <text
                x={Q2_CX - 18}
                y={356}
                textAnchor="end"
                fontSize={TEXT_SIZE}
                fill="var(--success)"
              >
                能
              </text>
              <rect
                x={LOOP_X}
                y={LOOP_Y}
                width={LOOP_W}
                height={LOOP_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <rect
                x={LOOP_X + 12}
                y={LOOP_Y + 12}
                width={126}
                height={20}
                rx={CARD_RADIUS}
                fill="var(--success)"
                fillOpacity="0.14"
                stroke="var(--success)"
              />
              <text
                x={LOOP_X + 20}
                y={LOOP_Y + 26}
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                {"evaluator -> optimizer"}
              </text>
              <text
                x={LOOP_X + LOOP_W / 2}
                y={LOOP_Y + 52}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                评一次，改一版
              </text>
              <text
                x={LOOP_X + LOOP_W / 2}
                y={LOOP_Y + 72}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                直到 pass 或命中轮次上限
              </text>
            </g>

            <g ref={boundaryRef} opacity={0}>
              <line
                x1={Q2_CX + Q2_HW}
                y1={Q2_CY}
                x2={BOUNDARY_X - 12}
                y2={BOUNDARY_Y + 22}
                stroke="var(--danger)"
                strokeWidth="2"
                markerEnd="url(#eodd-arrow-danger)"
              />
              <line
                x1={Q1_CX + Q1_HW}
                y1={Q1_CY}
                x2={BOUNDARY_X - 20}
                y2={BOUNDARY_Y + 54}
                stroke="var(--danger)"
                strokeWidth="2"
                markerEnd="url(#eodd-arrow-danger)"
              />
              <text
                x={526}
                y={332}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--danger)"
              >
                不成立
              </text>
              <rect
                x={BOUNDARY_X}
                y={BOUNDARY_Y}
                width={BOUNDARY_W}
                height={BOUNDARY_H}
                rx={CARD_RADIUS}
                fill="var(--danger)"
                fillOpacity="0.1"
                stroke="var(--danger)"
              />
              <text
                x={BOUNDARY_X + BOUNDARY_W / 2}
                y={BOUNDARY_Y + 28}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--danger)"
              >
                别硬套这个 loop
              </text>
              <text
                x={BOUNDARY_X + BOUNDARY_W / 2}
                y={BOUNDARY_Y + 50}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                标准太虚 / 缺新事实
              </text>
              <text
                x={BOUNDARY_X + BOUNDARY_W / 2}
                y={BOUNDARY_Y + 70}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                或返工本身不会带来提升
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
                fill="var(--text-secondary)"
              >
                判断口诀：标准写得清 + 改一轮真会更好，再补上 stop rule，才上评估-优化
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一个任务会不会落到 evaluator-optimizer：先问评估标准够不够清，再问返工是否真能提质。两问都成立，再给它补上 pass 条件或轮次上限。"
        />
      </div>
    </figure>
  );
}
