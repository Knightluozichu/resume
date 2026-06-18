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
const MUTED = 0.22;

type LoopNodeId = "goal" | "read" | "decide" | "observe" | "eval";

type LoopNode = {
  id: LoopNodeId;
  title: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  tone: string;
};

const NODES: readonly LoopNode[] = [
  {
    id: "goal",
    title: "用户目标",
    sub: "要办什么事",
    x: 268,
    y: 64,
    w: 184,
    tone: "var(--accent)",
  },
  {
    id: "read",
    title: "模型读工具说明",
    sub: "名字 / 描述 / schema",
    x: 500,
    y: 174,
    w: 176,
    tone: "var(--warning)",
  },
  {
    id: "decide",
    title: "选择或拒绝",
    sub: "use / refuse / ask",
    x: 420,
    y: 340,
    w: 188,
    tone: "var(--accent)",
  },
  {
    id: "observe",
    title: "观察结果",
    sub: "工具输出是真反馈",
    x: 112,
    y: 340,
    w: 188,
    tone: "var(--success)",
  },
  {
    id: "eval",
    title: "eval 迭代说明",
    sub: "误选样本 -> 改描述",
    x: 44,
    y: 174,
    w: 176,
    tone: "var(--danger)",
  },
];

type SelectionStep = TeachingStep & {
  active: LoopNodeId;
  choose: boolean;
  refuse: boolean;
  feedback: boolean;
};

const STEPS: readonly SelectionStep[] = [
  {
    label: "goal",
    caption: "① 从用户目标出发：先问这件事到底需要外部事实还是内部推理。",
    active: "goal",
    choose: false,
    refuse: false,
    feedback: false,
  },
  {
    label: "read",
    caption: "② 模型读工具说明：description 决定它看见的是按钮，还是一团雾。",
    active: "read",
    choose: false,
    refuse: false,
    feedback: false,
  },
  {
    label: "decide",
    caption: "③ 选择或拒绝工具都应该是合格动作：该调才调，不该调就拒绝或追问。",
    active: "decide",
    choose: true,
    refuse: true,
    feedback: false,
  },
  {
    label: "observe",
    caption: "④ 观察工具结果：真实返回值会暴露误选、漏参、返回格式太吵等问题。",
    active: "observe",
    choose: true,
    refuse: true,
    feedback: false,
  },
  {
    label: "eval",
    caption: "⑤ 用 eval 收集误选样本，不是骂模型，而是回头改工具说明。",
    active: "eval",
    choose: true,
    refuse: true,
    feedback: true,
  },
  {
    label: "iterate",
    caption: "⑥ 改完说明再回到下一轮用户目标，形成工具提示词的迭代闭环。",
    active: "goal",
    choose: true,
    refuse: true,
    feedback: true,
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
        width={node.w + 12}
        height={86}
        rx={CARD_RADIUS}
        fill="var(--accent-glow)"
        stroke={node.tone}
        strokeWidth="2"
        opacity={node.id === "goal" ? SHOWN : MUTED}
      />
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={74}
        rx={CARD_RADIUS}
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <text
        x={node.x + node.w / 2}
        y={node.y + 29}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={node.tone}
      >
        {node.title}
      </text>
      <text
        x={node.x + node.w / 2}
        y={node.y + 54}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-primary)"
      >
        {node.sub}
      </text>
    </g>
  );
}

export function ToolSelectionFeedbackDiagram() {
  const nodeRefs = useRef<Record<LoopNodeId, SVGRectElement | null>>({
    goal: null,
    read: null,
    decide: null,
    observe: null,
    eval: null,
  });
  const chooseRef = useRef<SVGGElement | null>(null);
  const refuseRef = useRef<SVGGElement | null>(null);
  const feedbackRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const setOpacity = (
        el: SVGRectElement | SVGGElement | null,
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

        NODES.forEach((node) => {
          setOpacity(
            nodeRefs.current[node.id],
            node.id === step.active ? SHOWN : MUTED,
            start,
          );
        });
        setOpacity(chooseRef.current, step.choose ? SHOWN : 0, start);
        setOpacity(refuseRef.current, step.refuse ? SHOWN : 0, start);
        setOpacity(feedbackRef.current, step.feedback ? SHOWN : 0, start);

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
            aria-label="工具选择反馈闭环动画。用户目标进入模型，模型读取工具说明，再选择工具、拒绝工具或追问。随后观察工具真实结果，用 eval 收集误选和误拒样本，回头迭代工具说明，再进入下一轮用户目标。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="tsfd-arrow"
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
                id="tsfd-feedback"
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
              y={32}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              工具说明不是一次写完，而是靠选择反馈迭代
            </text>

            <path
              d="M 452 104 C 560 112, 640 150, 602 180"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
              markerEnd="url(#tsfd-arrow)"
              opacity="0.55"
            />
            <path
              d="M 574 248 C 584 300, 550 326, 514 340"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
              markerEnd="url(#tsfd-arrow)"
              opacity="0.55"
            />
            <path
              d="M 420 384 C 350 430, 266 430, 300 384"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
              markerEnd="url(#tsfd-arrow)"
              opacity="0.55"
            />
            <path
              d="M 154 340 C 112 312, 102 274, 132 248"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
              markerEnd="url(#tsfd-arrow)"
              opacity="0.55"
            />
            <path
              d="M 220 184 C 260 120, 304 104, 268 104"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
              markerEnd="url(#tsfd-arrow)"
              opacity="0.55"
            />

            {NODES.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                highlightRef={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
              />
            ))}

            <g ref={chooseRef} opacity={0}>
              <rect
                x={340}
                y={256}
                width={96}
                height={34}
                rx={CHIP_RADIUS}
                fill="var(--success)"
                fillOpacity="0.14"
                stroke="var(--success)"
              />
              <text
                x={388}
                y={278}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                调工具
              </text>
            </g>
            <g ref={refuseRef} opacity={0}>
              <rect
                x={284}
                y={300}
                width={152}
                height={34}
                rx={CHIP_RADIUS}
                fill="var(--warning)"
                fillOpacity="0.14"
                stroke="var(--warning)"
              />
              <text
                x={360}
                y={322}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--warning)"
              >
                拒绝 / 追问也算正确
              </text>
            </g>
            <g ref={feedbackRef} opacity={0}>
              <path
                d="M 132 174 C 126 82, 260 36, 340 62"
                fill="none"
                stroke="var(--danger)"
                strokeWidth="2"
                strokeDasharray="7 5"
                markerEnd="url(#tsfd-feedback)"
              />
              <rect
                x={236}
                y={436}
                width={248}
                height={38}
                rx={CHIP_RADIUS}
                fill="var(--danger)"
                fillOpacity="0.12"
                stroke="var(--danger)"
              />
              <text
                x={360}
                y={460}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--danger)"
              >
                eval 记录：误选 / 误拒 / 漏参，回头改 description
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="工具选择质量要看真实样本：选错了，通常是说明还不够像按钮标签。"
        />
      </div>
    </figure>
  );
}
