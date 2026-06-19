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
const VIEW_H = 474;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;

const SHOWN = 1;
const MUTED = 0.22;
const HIDDEN = 0;

type ReviewStepId =
  | "goal"
  | "plan"
  | "tools"
  | "results"
  | "checkpoint"
  | "review";

type ReviewNode = {
  id: ReviewStepId;
  title: string;
  note: string;
  x: number;
  y: number;
  tone: string;
};

const NODE_W = 166;
const NODE_H = 64;

const NODES: readonly ReviewNode[] = [
  {
    id: "goal",
    title: "user goal",
    note: "原始请求",
    x: 28,
    y: 100,
    tone: "var(--accent)",
  },
  {
    id: "plan",
    title: "plan",
    note: "可解释步骤",
    x: 276,
    y: 100,
    tone: "var(--success)",
  },
  {
    id: "tools",
    title: "tool calls",
    note: "参数 / 权限",
    x: 526,
    y: 100,
    tone: "var(--warning)",
  },
  {
    id: "results",
    title: "results",
    note: "返回值 / 错误",
    x: 526,
    y: 244,
    tone: "var(--warning)",
  },
  {
    id: "checkpoint",
    title: "checkpoint",
    note: "暂停点 / diff",
    x: 276,
    y: 244,
    tone: "var(--danger)",
  },
  {
    id: "review",
    title: "human review",
    note: "批准 / 打回",
    x: 28,
    y: 244,
    tone: "var(--success)",
  },
] as const;

type TransparencyStep = TeachingStep & {
  active: ReviewStepId;
  visible: readonly ReviewStepId[];
  ledger: number;
};

const STEPS: readonly TransparencyStep[] = [
  {
    label: "goal",
    caption: "① user goal：先保存用户目标，后面所有动作都要能追溯回它。",
    active: "goal",
    visible: ["goal"],
    ledger: 1,
  },
  {
    label: "plan",
    caption: "② plan：把意图拆成可审步骤，人能先看懂它准备做什么。",
    active: "plan",
    visible: ["goal", "plan"],
    ledger: 2,
  },
  {
    label: "tools",
    caption: "③ tool calls：记录工具名、参数、权限范围，不让调用变成黑盒。",
    active: "tools",
    visible: ["goal", "plan", "tools"],
    ledger: 3,
  },
  {
    label: "results",
    caption: "④ results：保存结果和错误，审查人能复盘每一步为什么继续或停止。",
    active: "results",
    visible: ["goal", "plan", "tools", "results"],
    ledger: 4,
  },
  {
    label: "checkpoint",
    caption: "⑤ checkpoint：高风险动作前停住，带着证据、diff、日志请人看。",
    active: "checkpoint",
    visible: ["goal", "plan", "tools", "results", "checkpoint"],
    ledger: 5,
  },
  {
    label: "review",
    caption: "⑥ human review：人类不是补锅，而是在可审记录上批准或打回。",
    active: "review",
    visible: ["goal", "plan", "tools", "results", "checkpoint", "review"],
    ledger: 6,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function NodeCard({
  node,
  nodeRef,
  active,
  visible,
}: {
  node: ReviewNode;
  nodeRef: (el: SVGGElement | null) => void;
  active: boolean;
  visible: boolean;
}) {
  return (
    <g ref={nodeRef} opacity={visible ? (active ? SHOWN : 0.62) : MUTED}>
      <rect
        x={node.x}
        y={node.y}
        width={NODE_W}
        height={NODE_H}
        rx={CARD_RADIUS}
        fill={active ? node.tone : "var(--bg)"}
        fillOpacity={active ? 0.12 : 1}
        stroke={active ? node.tone : "var(--border)"}
        strokeWidth={active ? 2 : 1}
      />
      <text
        x={node.x + NODE_W / 2}
        y={node.y + 25}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={active ? node.tone : "var(--text-primary)"}
      >
        {node.title}
      </text>
      <text
        x={node.x + NODE_W / 2}
        y={node.y + 48}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-secondary)"
      >
        {node.note}
      </text>
    </g>
  );
}

function nodeById(id: ReviewStepId) {
  return NODES.find((node) => node.id === id)!;
}

function center(node: ReviewNode) {
  return {
    x: node.x + NODE_W / 2,
    y: node.y + NODE_H / 2,
  };
}

export function AgentTransparencyReviewDiagram() {
  const nodeRefs = useRef<Record<ReviewStepId, SVGGElement | null>>({
    goal: null,
    plan: null,
    tools: null,
    results: null,
    checkpoint: null,
    review: null,
  });
  const ledgerRefs = useRef<(SVGGElement | null)[]>(
    Array.from({ length: STEPS.length }, () => null),
  );

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (el: SVGGElement | null, opacity: number, start: number) => {
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

        NODES.forEach((node) => {
          const visible = step.visible.includes(node.id);
          const opacity = visible
            ? step.active === node.id
              ? SHOWN
              : 0.62
            : MUTED;
          fade(nodeRefs.current[node.id], opacity, start);
        });
        ledgerRefs.current.forEach((el, ledgerIndex) => {
          fade(el, ledgerIndex < step.ledger ? SHOWN : HIDDEN, start);
        });

        tl.label(step.label, lit);
      });
    },
  });

  const pairs: readonly [ReviewStepId, ReviewStepId][] = [
    ["goal", "plan"],
    ["plan", "tools"],
    ["tools", "results"],
    ["results", "checkpoint"],
    ["checkpoint", "review"],
  ];

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
            aria-label="透明审查时间线动画。从 user goal 到 plan，再到 tool calls、results、checkpoint，最后进入 human review。右下角审计记录逐步累积，强调每一步都可以追溯和审查。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="atrd-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
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
              透明审查：让 agent 的每一步都能被复盘
            </text>
            <text
              x={VIEW_W / 2}
              y={54}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              审查不是最后一句“看起来对”，而是一条可追溯的行动链
            </text>

            {pairs.map(([fromId, toId]) => {
              const from = center(nodeById(fromId));
              const to = center(nodeById(toId));
              return (
                <line
                  key={`${fromId}-${toId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.4"
                  strokeDasharray="6 5"
                  opacity="0.5"
                  markerEnd="url(#atrd-arrow)"
                />
              );
            })}

            {NODES.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                active={node.id === "goal"}
                visible={node.id === "goal"}
                nodeRef={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
              />
            ))}

            <rect
              x={92}
              y={354}
              width={536}
              height={84}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={124}
              y={380}
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              audit log
            </text>
            {STEPS.map((step, index) => (
              <g
                key={`ledger-${step.label}`}
                ref={(el) => {
                  ledgerRefs.current[index] = el;
                }}
                opacity={index === 0 ? SHOWN : HIDDEN}
              >
                <circle
                  cx={126 + index * 84}
                  cy={410}
                  r={8}
                  fill="var(--accent)"
                  fillOpacity="0.16"
                  stroke="var(--accent)"
                />
                <text
                  x={126 + index * 84}
                  y={414}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {index + 1}
                </text>
                <text
                  x={126 + index * 84}
                  y={432}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fill="var(--text-secondary)"
                >
                  {step.label}
                </text>
              </g>
            ))}
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="可审记录让人类 review 有证据：目标、计划、调用、结果、停机点都在链上。"
        />
      </div>
    </figure>
  );
}
