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
const VIEW_H = 454;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const SHOWN = 1;
const MUTED = 0.26;
const HIDDEN = 0;

type AciCheckId = "description" | "schema" | "result" | "errors" | "eval";

type AciCheck = {
  id: AciCheckId;
  title: string;
  note: string;
  x: number;
  y: number;
  tone: string;
  ready: boolean;
};

const CARD_W = 122;
const CARD_H = 110;

const CHECKS: readonly AciCheck[] = [
  {
    id: "description",
    title: "description",
    note: "何时该用",
    x: 40,
    y: 118,
    tone: "var(--success)",
    ready: true,
  },
  {
    id: "schema",
    title: "schema",
    note: "参数可校验",
    x: 178,
    y: 118,
    tone: "var(--success)",
    ready: true,
  },
  {
    id: "result",
    title: "result",
    note: "返回可解释",
    x: 316,
    y: 118,
    tone: "var(--success)",
    ready: true,
  },
  {
    id: "errors",
    title: "errors",
    note: "失败语义缺失",
    x: 454,
    y: 118,
    tone: "var(--danger)",
    ready: false,
  },
  {
    id: "eval",
    title: "eval",
    note: "回归样例",
    x: 592,
    y: 118,
    tone: "var(--success)",
    ready: true,
  },
] as const;

type AciStep = TeachingStep & {
  active: AciCheckId;
  inspected: readonly AciCheckId[];
  score: number;
  verdict: "checking" | "blocked";
};

const STEPS: readonly AciStep[] = [
  {
    label: "description",
    caption: "① description：模型必须知道什么时候该用、什么时候不该用。",
    active: "description",
    inspected: ["description"],
    score: 1,
    verdict: "checking",
  },
  {
    label: "schema",
    caption: "② schema：参数类型、必填项、枚举和边界都要能被机器检查。",
    active: "schema",
    inspected: ["description", "schema"],
    score: 2,
    verdict: "checking",
  },
  {
    label: "result",
    caption: "③ result：返回值语义要清楚，agent 才能把结果转成用户答案。",
    active: "result",
    inspected: ["description", "schema", "result"],
    score: 3,
    verdict: "checking",
  },
  {
    label: "errors",
    caption: "④ errors：失败形态没约定，agent 不知道该重试、改参还是升级给人。",
    active: "errors",
    inspected: ["description", "schema", "result", "errors"],
    score: 3,
    verdict: "blocked",
  },
  {
    label: "eval",
    caption: "⑤ eval：即使有回归样例，errors 缺失仍然阻断上线。",
    active: "eval",
    inspected: ["description", "schema", "result", "errors", "eval"],
    score: 4,
    verdict: "blocked",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function CheckCard({
  check,
  active,
  inspected,
  cardRef,
}: {
  check: AciCheck;
  active: boolean;
  inspected: boolean;
  cardRef: (el: SVGGElement | null) => void;
}) {
  const tone = inspected ? check.tone : "var(--border)";
  const textTone = inspected ? check.tone : "var(--text-secondary)";

  return (
    <g ref={cardRef} opacity={inspected ? SHOWN : MUTED}>
      <rect
        x={check.x}
        y={check.y}
        width={CARD_W}
        height={CARD_H}
        rx={CARD_RADIUS}
        fill={active ? check.tone : "var(--bg)"}
        fillOpacity={active ? 0.12 : 1}
        stroke={tone}
        strokeWidth={active || (inspected && !check.ready) ? 2 : 1}
      />
      <circle
        cx={check.x + CARD_W / 2}
        cy={check.y + 30}
        r={16}
        fill={inspected ? check.tone : "var(--bg-elevated)"}
        fillOpacity={check.ready ? 0.16 : 0.2}
        stroke={tone}
      />
      <text
        x={check.x + CARD_W / 2}
        y={check.y + 36}
        textAnchor="middle"
        fontSize={TITLE_SIZE}
        fontWeight="700"
        fill={textTone}
      >
        {check.ready ? "✓" : "!"}
      </text>
      <text
        x={check.x + CARD_W / 2}
        y={check.y + 68}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={textTone}
      >
        {check.title}
      </text>
      <text
        x={check.x + CARD_W / 2}
        y={check.y + 91}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-secondary)"
      >
        {check.note}
      </text>
    </g>
  );
}

export function AgentAciReadinessDiagram() {
  const cardRefs = useRef<Record<AciCheckId, SVGGElement | null>>({
    description: null,
    schema: null,
    result: null,
    errors: null,
    eval: null,
  });
  const barRef = useRef<SVGRectElement | null>(null);
  const blockedRef = useRef<SVGGElement | null>(null);

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

        CHECKS.forEach((check) => {
          const inspected = step.inspected.includes(check.id);
          fade(cardRefs.current[check.id], inspected ? SHOWN : MUTED, start);
        });
        if (barRef.current) {
          tl.add(
            barRef.current,
            {
              width: 92 * step.score,
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
        }
        fade(
          blockedRef.current,
          step.verdict === "blocked" ? SHOWN : HIDDEN,
          start,
        );

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
            aria-label="ACI readiness scorecard 动画。五格分别检查 description、schema、result、errors、eval。description、schema、result 和 eval 通过，errors 缺失亮红，所以最终结论是缺一格就不该上线。"
            className="block h-auto w-[720px]"
          >
            <text
              x={VIEW_W / 2}
              y={30}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              ACI readiness：工具接口要像产品接口一样验收
            </text>
            <text
              x={VIEW_W / 2}
              y={54}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              description / schema / result / errors /
              eval，五格缺一格就先别上线
            </text>

            {CHECKS.map((check) => (
              <CheckCard
                key={check.id}
                check={check}
                active={check.id === "description"}
                inspected={check.id === "description"}
                cardRef={(el) => {
                  cardRefs.current[check.id] = el;
                }}
              />
            ))}

            <rect
              x={130}
              y={272}
              width={460}
              height={22}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <rect
              ref={barRef}
              x={130}
              y={272}
              width={92}
              height={22}
              rx={CHIP_RADIUS}
              fill="var(--success)"
              fillOpacity="0.22"
              stroke="var(--success)"
            />
            <text
              x={VIEW_W / 2}
              y={288}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              readiness scorecard：通过项会增加，但缺一格仍阻断上线
            </text>

            <g
              ref={(el) => {
                blockedRef.current = el;
              }}
              opacity={HIDDEN}
            >
              <rect
                x={108}
                y={326}
                width={504}
                height={70}
                rx={CARD_RADIUS}
                fill="var(--danger)"
                fillOpacity="0.12"
                stroke="var(--danger)"
                strokeWidth="2"
              />
              <text
                x={VIEW_W / 2}
                y={354}
                textAnchor="middle"
                fontSize={TITLE_SIZE}
                fontWeight="700"
                fill="var(--danger)"
              >
                阻断上线
              </text>
              <text
                x={VIEW_W / 2}
                y={378}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                缺 errors 就没有恢复策略：失败时无法判断重试、改参还是交给人
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="分数不是平均分：ACI 缺任一关键格，生产环境就可能在失败时失控。"
        />
      </div>
    </figure>
  );
}
