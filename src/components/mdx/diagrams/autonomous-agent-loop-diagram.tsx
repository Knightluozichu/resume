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
const VIEW_H = 512;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const SHOWN = 1;
const HIDDEN = 0;

const NODE_W = 148;
const NODE_H = 72;

const CLARIFY_X = 52;
const CLARIFY_Y = 124;
const PLAN_X = 286;
const PLAN_Y = 72;
const ACT_X = 520;
const ACT_Y = 124;
const ENV_X = 520;
const ENV_Y = 292;
const DECIDE_X = 286;
const DECIDE_Y = 344;
const STOP_X = 52;
const STOP_Y = 292;

const CENTER_X = 360;
const CENTER_Y = 244;
const CENTER_W = 164;
const CENTER_H = 72;

type LoopNode = {
  id: "clarify" | "plan" | "act" | "env" | "decide" | "stop";
  title: string;
  sub: string;
  x: number;
  y: number;
  tone: string;
};

const NODES: readonly LoopNode[] = [
  {
    id: "clarify",
    title: "目标澄清",
    sub: "缺口先问人",
    x: CLARIFY_X,
    y: CLARIFY_Y,
    tone: "var(--warning)",
  },
  {
    id: "plan",
    title: "计划",
    sub: "只定下一两步",
    x: PLAN_X,
    y: PLAN_Y,
    tone: "var(--accent)",
  },
  {
    id: "act",
    title: "工具行动",
    sub: "读文件 / 改码 / 跑命令",
    x: ACT_X,
    y: ACT_Y,
    tone: "var(--accent)",
  },
  {
    id: "env",
    title: "环境结果",
    sub: "测试与 ground truth",
    x: ENV_X,
    y: ENV_Y,
    tone: "var(--success)",
  },
  {
    id: "decide",
    title: "判断下一步",
    sub: "继续 / 回问 / 停止",
    x: DECIDE_X,
    y: DECIDE_Y,
    tone: "var(--success)",
  },
  {
    id: "stop",
    title: "停机出口",
    sub: "交付或请求人工",
    x: STOP_X,
    y: STOP_Y,
    tone: "var(--danger)",
  },
] as const;

type LoopStep = TeachingStep & {
  active: LoopNode["id"];
  feedbackOn: boolean;
};

const STEPS: readonly LoopStep[] = [
  {
    label: "clarify",
    caption: "① 先澄清目标：范围、权限、验收标准不清时，不要假装已经知道。",
    active: "clarify",
    feedbackOn: false,
  },
  {
    label: "plan",
    caption:
      "② 计划只规划近处：把开放任务拆成下一两个可验证动作，而不是一次写死全路径。",
    active: "plan",
    feedbackOn: false,
  },
  {
    label: "act",
    caption: "③ 工具行动：真正读仓库、改文件、跑命令，动作必须落到环境里。",
    active: "act",
    feedbackOn: false,
  },
  {
    label: "observe",
    caption:
      "④ 环境返回 ground truth：测试、编译、diff、API 响应，比模型自评更可信。",
    active: "env",
    feedbackOn: true,
  },
  {
    label: "decide",
    caption: "⑤ 用反馈判断下一步：继续修、回问人，或满足条件后停机。",
    active: "decide",
    feedbackOn: true,
  },
  {
    label: "stop",
    caption:
      "⑥ 达到停机条件就退出；没达到就带着真实反馈回到计划，而不是空想下一轮。",
    active: "stop",
    feedbackOn: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function NodeCard({
  node,
  highlightRef,
}: {
  node: LoopNode;
  highlightRef: (el: SVGRectElement | null) => void;
}) {
  return (
    <g>
      <rect
        ref={highlightRef}
        x={node.x - 6}
        y={node.y - 6}
        width={NODE_W + 12}
        height={NODE_H + 12}
        rx={CARD_RADIUS}
        fill="var(--accent-glow)"
        stroke={node.tone}
        strokeWidth="2"
        opacity={HIDDEN}
      />
      <rect
        x={node.x}
        y={node.y}
        width={NODE_W}
        height={NODE_H}
        rx={CARD_RADIUS}
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <rect
        x={node.x + 12}
        y={node.y + 12}
        width={86}
        height={20}
        rx={CHIP_RADIUS}
        fill={node.tone}
        fillOpacity="0.14"
        stroke={node.tone}
      />
      <text
        x={node.x + 20}
        y={node.y + 26}
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={node.tone}
      >
        {node.title}
      </text>
      <text
        x={node.x + NODE_W / 2}
        y={node.y + 52}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-primary)"
      >
        {node.sub}
      </text>
    </g>
  );
}

export function AutonomousAgentLoopDiagram() {
  const nodeRefs = useRef<Record<LoopNode["id"], SVGRectElement | null>>({
    clarify: null,
    plan: null,
    act: null,
    env: null,
    decide: null,
    stop: null,
  });
  const feedbackRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (
        el: SVGRectElement | SVGGElement | null,
        on: boolean,
        start: number,
      ) => {
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

        NODES.forEach((node) => {
          fade(nodeRefs.current[node.id], node.id === step.active, start);
        });
        fade(feedbackRef.current, step.feedbackOn, start);

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
            aria-label="自主智能体闭环动画。流程从目标澄清开始，进入计划、工具行动、环境结果和 ground truth，再判断下一步：继续、回问人或停止。图中特别强调环境反馈会回到计划，避免模型只靠自我感觉循环。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="aald-arrow"
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
                id="aald-feedback-arrow"
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
              y={28}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              自主智能体：每一圈都必须接住环境反馈
            </text>

            <rect
              x={CENTER_X - CENTER_W / 2}
              y={CENTER_Y - CENTER_H / 2}
              width={CENTER_W}
              height={CENTER_H}
              rx={CARD_RADIUS}
              fill="var(--bg-elevated)"
              stroke="var(--accent)"
              strokeDasharray="6 5"
            />
            <text
              x={CENTER_X}
              y={CENTER_Y - 8}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              agent controller
            </text>
            <text
              x={CENTER_X}
              y={CENTER_Y + 14}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              根据反馈改下一步
            </text>

            <path
              d={`M ${CLARIFY_X + NODE_W} ${CLARIFY_Y + NODE_H / 2} C 236 120, 250 96, ${PLAN_X - 12} ${PLAN_Y + NODE_H / 2}`}
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#aald-arrow)"
            />
            <path
              d={`M ${PLAN_X + NODE_W} ${PLAN_Y + NODE_H / 2} C 462 96, 486 120, ${ACT_X - 12} ${ACT_Y + NODE_H / 2}`}
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#aald-arrow)"
            />
            <line
              x1={ACT_X + NODE_W / 2}
              y1={ACT_Y + NODE_H}
              x2={ENV_X + NODE_W / 2}
              y2={ENV_Y - 12}
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#aald-arrow)"
            />
            <path
              d={`M ${ENV_X} ${ENV_Y + NODE_H / 2} C 476 380, 450 384, ${DECIDE_X + NODE_W} ${DECIDE_Y + NODE_H / 2}`}
              fill="none"
              stroke="var(--success)"
              strokeWidth="2"
              markerEnd="url(#aald-feedback-arrow)"
            />
            <path
              d={`M ${DECIDE_X} ${DECIDE_Y + NODE_H / 2} C 230 384, 220 350, ${STOP_X + NODE_W} ${STOP_Y + NODE_H / 2}`}
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#aald-arrow)"
            />
            <path
              d={`M ${DECIDE_X + NODE_W / 2} ${DECIDE_Y} C 250 284, 250 182, ${PLAN_X + NODE_W / 2} ${PLAN_Y + NODE_H}`}
              fill="none"
              stroke="var(--success)"
              strokeWidth="2"
              strokeDasharray="7 5"
              markerEnd="url(#aald-feedback-arrow)"
            />

            <g ref={feedbackRef} opacity={HIDDEN}>
              <rect
                x={226}
                y={214}
                width={268}
                height={60}
                rx={CARD_RADIUS}
                fill="var(--success)"
                fillOpacity="0.1"
                stroke="var(--success)"
              />
              <text
                x={360}
                y={238}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                环境反馈闭环
              </text>
              <text
                x={360}
                y={258}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                测试 / diff / 真实状态决定下一圈
              </text>
            </g>

            {NODES.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                highlightRef={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
              />
            ))}

            <rect
              x={88}
              y={468}
              width={544}
              height={28}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={486}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              口诀：开放任务可以让 agent 走路，但每一步都要被环境校验
            </text>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点播放逐步看：自主不是无限自由，而是在真实环境反馈里滚动计划、行动和停机。"
        />
      </div>
    </figure>
  );
}
