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
const VIEW_H = 508;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const SHOWN = 1;
const MUTED = 0.28;

const CENTER_X = 250;
const CENTER_Y = 184;
const CENTER_W = 220;
const CENTER_H = 116;

type AnatomyPartId =
  | "name"
  | "description"
  | "schema"
  | "examples"
  | "errors"
  | "result";

type AnatomyPart = {
  id: AnatomyPartId;
  title: string;
  body: string;
  x: number;
  y: number;
  w: number;
  tone: string;
};

const PARTS: readonly AnatomyPart[] = [
  {
    id: "name",
    title: "name",
    body: "怎么点名",
    x: 36,
    y: 84,
    w: 148,
    tone: "var(--accent)",
  },
  {
    id: "description",
    title: "description",
    body: "何时该用",
    x: 536,
    y: 84,
    w: 148,
    tone: "var(--accent)",
  },
  {
    id: "schema",
    title: "schema",
    body: "参数边界",
    x: 36,
    y: 218,
    w: 148,
    tone: "var(--warning)",
  },
  {
    id: "examples",
    title: "examples",
    body: "少猜一步",
    x: 536,
    y: 218,
    w: 148,
    tone: "var(--warning)",
  },
  {
    id: "errors",
    title: "errors",
    body: "失败怎么救",
    x: 36,
    y: 352,
    w: 148,
    tone: "var(--danger)",
  },
  {
    id: "result",
    title: "result",
    body: "结果怎么读",
    x: 536,
    y: 352,
    w: 148,
    tone: "var(--success)",
  },
];

type AnatomyStep = TeachingStep & {
  active: AnatomyPartId;
  guideTitle: string;
  guideText: string;
};

const STEPS: readonly AnatomyStep[] = [
  {
    label: "name",
    caption: "① name 让模型能稳定点名，不把工具和普通文字混在一起。",
    active: "name",
    guideTitle: "先能点名",
    guideText: "get_order_status",
  },
  {
    label: "description",
    caption: "② description 是选择说明：讲清适用场景，而不是只说「查数据」。",
    active: "description",
    guideTitle: "再会判断",
    guideText: "何时用 / 何时不用",
  },
  {
    label: "schema",
    caption: "③ schema 把参数做成可检查的轨道：必填、类型、枚举、范围都写清。",
    active: "schema",
    guideTitle: "参数有护栏",
    guideText: "required + type + enum",
  },
  {
    label: "examples",
    caption: "④ examples 给模型一两个正确姿势，减少它临场猜格式。",
    active: "examples",
    guideTitle: "示范少走弯路",
    guideText: "goal -> call",
  },
  {
    label: "errors",
    caption: "⑤ errors 提前约定失败形态，模型才能知道是否重试、改参或升级。",
    active: "errors",
    guideTitle: "失败也有路标",
    guideText: "retryable / fix",
  },
  {
    label: "result",
    caption: "⑥ result semantics 说明返回值含义，让模型把结果翻译成用户答案。",
    active: "result",
    guideTitle: "最后读懂结果",
    guideText: "status means what",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function partCenter(part: AnatomyPart): { x: number; y: number } {
  return { x: part.x + part.w / 2, y: part.y + 40 };
}

function ActivePartCard({
  part,
  highlightRef,
}: {
  part: AnatomyPart;
  highlightRef: (el: SVGRectElement | null) => void;
}) {
  return (
    <g>
      <rect
        ref={highlightRef}
        x={part.x - 6}
        y={part.y - 6}
        width={part.w + 12}
        height={92}
        rx={CARD_RADIUS}
        fill="var(--accent-glow)"
        stroke={part.tone}
        strokeWidth="2"
        opacity={part.id === "name" ? SHOWN : MUTED}
      />
      <rect
        x={part.x}
        y={part.y}
        width={part.w}
        height={80}
        rx={CARD_RADIUS}
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <rect
        x={part.x + 14}
        y={part.y + 12}
        width={part.w - 28}
        height={22}
        rx={CHIP_RADIUS}
        fill={part.tone}
        fillOpacity="0.14"
        stroke={part.tone}
      />
      <text
        x={part.x + part.w / 2}
        y={part.y + 28}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={part.tone}
      >
        {part.title}
      </text>
      <text
        x={part.x + part.w / 2}
        y={part.y + 58}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-primary)"
      >
        {part.body}
      </text>
    </g>
  );
}

export function ToolPromptAnatomyDiagram() {
  const highlightRefs = useRef<Record<AnatomyPartId, SVGRectElement | null>>({
    name: null,
    description: null,
    schema: null,
    examples: null,
    errors: null,
    result: null,
  });
  const guideRefs = useRef<(SVGGElement | null)[]>(
    Array.from({ length: STEPS.length }, () => null),
  );

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

        PARTS.forEach((part) => {
          setOpacity(
            highlightRefs.current[part.id],
            part.id === step.active ? SHOWN : MUTED,
            start,
          );
        });
        guideRefs.current.forEach((el, guideIndex) => {
          setOpacity(el, guideIndex === index ? SHOWN : 0, start);
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
            aria-label="工具提示词解剖动画。六个部件围绕中间的工具标签：name、description、schema、examples、errors、result semantics。每一步点亮一个部件，说明它如何帮助模型点名工具、判断是否使用、传对参数、参考示例、从错误中恢复，并读懂返回结果。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="tpad-arrow"
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
              y={32}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              工具定义不是说明文字，而是 agent 能读懂的工具标签
            </text>

            <rect
              x={CENTER_X}
              y={CENTER_Y}
              width={CENTER_W}
              height={CENTER_H}
              rx={CARD_RADIUS}
              fill="var(--accent-glow)"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x={CENTER_X + CENTER_W / 2}
              y={CENTER_Y + 34}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              Agent 读工具标签
            </text>
            <text
              x={CENTER_X + CENTER_W / 2}
              y={CENTER_Y + 62}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              选不选 · 怎么传 · 如何解释
            </text>
            {STEPS.map((step, index) => (
              <g
                key={step.label}
                ref={(el) => {
                  guideRefs.current[index] = el;
                }}
                opacity={index === 0 ? SHOWN : 0}
              >
                <rect
                  x={CENTER_X + 28}
                  y={CENTER_Y + 78}
                  width={CENTER_W - 56}
                  height={24}
                  rx={CHIP_RADIUS}
                  fill="var(--bg)"
                  stroke="var(--border)"
                />
                <text
                  x={CENTER_X + CENTER_W / 2}
                  y={CENTER_Y + 94}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {step.guideTitle} · {step.guideText}
                </text>
              </g>
            ))}

            {PARTS.map((part) => {
              const center = partCenter(part);
              const targetX =
                center.x < CENTER_X ? CENTER_X : CENTER_X + CENTER_W;
              const targetY =
                center.y < CENTER_Y + CENTER_H / 2
                  ? CENTER_Y + 32
                  : CENTER_Y + CENTER_H - 32;
              return (
                <g key={`line-${part.id}`}>
                  <line
                    x1={center.x}
                    y1={center.y}
                    x2={targetX}
                    y2={targetY}
                    stroke="var(--text-secondary)"
                    strokeWidth="1.4"
                    strokeDasharray="5 5"
                    opacity="0.55"
                    markerEnd="url(#tpad-arrow)"
                  />
                </g>
              );
            })}

            {PARTS.map((part) => (
              <ActivePartCard
                key={part.id}
                part={part}
                highlightRef={(el) => {
                  highlightRefs.current[part.id] = el;
                }}
              />
            ))}

            <rect
              x={118}
              y={456}
              width={484}
              height={32}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={477}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              六块合在一起，模型才少猜：该不该用、参数怎么填、结果怎么转成答案。
            </text>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="一张工具定义要同时服务选择、调用、纠错和结果解释。"
        />
      </div>
    </figure>
  );
}
