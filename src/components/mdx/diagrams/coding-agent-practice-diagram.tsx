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
const PREVIEW = 0.18;
const HIDDEN = 0;

const LANE_X = 28;
const LANE_W = 664;
const LANE_H = 82;
const LANE_GAP = 16;
const LANE_Y0 = 68;
const laneY = (index: number) => LANE_Y0 + index * (LANE_H + LANE_GAP);

const NODE_W = 106;
const NODE_H = 50;

type CodingStep = TeachingStep & {
  read: boolean;
  edit: boolean;
  test: boolean;
  feedback: boolean;
  review: boolean;
};

const STEPS: readonly CodingStep[] = [
  {
    label: "issue",
    caption: "① issue 给出目标、约束和验收标准；这是 agent 的停机条件来源。",
    read: false,
    edit: false,
    test: false,
    feedback: false,
    review: false,
  },
  {
    label: "read",
    caption: "② 先读代码和错误上下文，不急着改；定位相关文件和调用链。",
    read: true,
    edit: false,
    test: false,
    feedback: false,
    review: false,
  },
  {
    label: "edit",
    caption: "③ 修改要小步提交：让 diff 可解释，方便失败后回滚或继续修。",
    read: true,
    edit: true,
    test: false,
    feedback: false,
    review: false,
  },
  {
    label: "test",
    caption: "④ 测试和构建是环境给出的真反馈；失败不能硬说完成。",
    read: true,
    edit: true,
    test: true,
    feedback: false,
    review: false,
  },
  {
    label: "feedback",
    caption: "⑤ 失败 stderr 回到读代码和修改，不是换个说法糊过去。",
    read: true,
    edit: true,
    test: true,
    feedback: true,
    review: false,
  },
  {
    label: "review",
    caption: "⑥ 通过后进入 PR review；人类检查设计、风险和遗漏测试。",
    read: true,
    edit: true,
    test: true,
    feedback: true,
    review: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type NodeProps = {
  x: number;
  lane: number;
  title: string;
  body: string;
  tone: string;
};

function NodeCard({ x, lane, title, body, tone }: NodeProps) {
  const y = laneY(lane) + 16;

  return (
    <g>
      <rect
        x={x - NODE_W / 2}
        y={y}
        width={NODE_W}
        height={NODE_H}
        rx={CARD_RADIUS}
        fill="var(--bg-elevated)"
        stroke={tone}
      />
      <text
        x={x}
        y={y + 21}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={tone}
      >
        {title}
      </text>
      <text
        x={x}
        y={y + 40}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-primary)"
      >
        {body}
      </text>
    </g>
  );
}

function Lane({
  index,
  title,
  note,
  tone,
}: {
  index: number;
  title: string;
  note: string;
  tone: string;
}) {
  return (
    <g>
      <rect
        x={LANE_X}
        y={laneY(index)}
        width={LANE_W}
        height={LANE_H}
        rx={CARD_RADIUS}
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <rect
        x={LANE_X + 16}
        y={laneY(index) + 14}
        width={116}
        height={24}
        rx={CHIP_RADIUS}
        fill={tone}
        fillOpacity="0.14"
        stroke={tone}
      />
      <text
        x={LANE_X + 28}
        y={laneY(index) + 31}
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={tone}
      >
        {title}
      </text>
      <text
        x={LANE_X + 28}
        y={laneY(index) + 58}
        fontSize={TEXT_SIZE}
        fill="var(--text-secondary)"
      >
        {note}
      </text>
    </g>
  );
}

export function CodingAgentPracticeDiagram() {
  const readRef = useRef<SVGGElement | null>(null);
  const editRef = useRef<SVGGElement | null>(null);
  const testRef = useRef<SVGGElement | null>(null);
  const feedbackRef = useRef<SVGGElement | null>(null);
  const reviewRef = useRef<SVGGElement | null>(null);

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

        fade(readRef.current, step.read, start);
        fade(editRef.current, step.edit, start);
        fade(testRef.current, step.test, start);
        fade(feedbackRef.current, step.feedback, start);
        fade(reviewRef.current, step.review, start);

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
            aria-label="编码 agent 的实践闭环。人类 issue 给出目标和验收标准；agent 读代码并定位上下文；随后修改代码；工具环境运行测试和构建；失败输出回到读代码和修改；全部通过后生成 PR 进入人工 review。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="coding-practice-arrow"
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
                id="coding-practice-feedback"
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
              编码 agent：失败反馈必须回到下一轮修改
            </text>

            <Lane
              index={0}
              title="Human"
              note="issue / review"
              tone="var(--warning)"
            />
            <Lane
              index={1}
              title="Coding agent"
              note="读代码 / 修改 / 解释"
              tone="var(--accent)"
            />
            <Lane
              index={2}
              title="Tools"
              note="测试 / 构建 / stderr"
              tone="var(--success)"
            />

            <NodeCard
              x={252}
              lane={0}
              title="issue"
              body="目标 + 验收"
              tone="var(--warning)"
            />

            <g ref={readRef} opacity={PREVIEW}>
              <path
                d="M 274 134 C 282 154, 282 166, 274 182"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#coding-practice-arrow)"
              />
              <NodeCard
                x={274}
                lane={1}
                title="读代码"
                body="定位上下文"
                tone="var(--accent)"
              />
            </g>

            <g ref={editRef} opacity={PREVIEW}>
              <path
                d="M 328 206 C 356 206, 374 206, 402 206"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#coding-practice-arrow)"
              />
              <NodeCard
                x={456}
                lane={1}
                title="修改"
                body="小 diff"
                tone="var(--accent)"
              />
            </g>

            <g ref={testRef} opacity={PREVIEW}>
              <path
                d="M 496 230 C 518 250, 526 264, 544 280"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#coding-practice-arrow)"
              />
              <NodeCard
                x={562}
                lane={2}
                title="测试 / 构建"
                body="环境裁判"
                tone="var(--success)"
              />
            </g>

            <g ref={feedbackRef} opacity={PREVIEW}>
              <path
                d="M 540 302 C 430 346, 322 332, 294 254"
                fill="none"
                stroke="var(--danger)"
                strokeWidth="2"
                strokeDasharray="7 5"
                markerEnd="url(#coding-practice-feedback)"
              />
              <rect
                x={306}
                y={390}
                width={190}
                height={54}
                rx={CHIP_RADIUS}
                fill="var(--danger)"
                fillOpacity="0.1"
                stroke="var(--danger)"
              />
              <text
                x={401}
                y={412}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--danger)"
              >
                失败反馈回环
              </text>
              <text
                x={401}
                y={432}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                stderr / failing test 改写下一轮计划
              </text>
            </g>

            <g ref={reviewRef} opacity={PREVIEW}>
              <path
                d="M 596 280 C 624 238, 612 158, 548 134"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#coding-practice-arrow)"
              />
              <NodeCard
                x={532}
                lane={0}
                title="PR review"
                body="人类把关"
                tone="var(--warning)"
              />
              <rect
                x={76}
                y={390}
                width={180}
                height={54}
                rx={CHIP_RADIUS}
                fill="var(--success)"
                fillOpacity="0.1"
                stroke="var(--success)"
              />
              <text
                x={166}
                y={412}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                可交付条件
              </text>
              <text
                x={166}
                y={432}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                tests + build + diff 解释
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="编码场景适合 agent，是因为仓库、测试和 review 共同提供了强反馈闭环。"
        />
      </div>
    </figure>
  );
}
