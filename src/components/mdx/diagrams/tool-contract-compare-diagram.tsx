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
const HIDDEN = 0;
const MUTED = 0.2;

const PANEL_Y = 72;
const PANEL_W = 312;
const PANEL_H = 344;
const LEFT_X = 32;
const RIGHT_X = 376;

type ContractStep = TeachingStep & {
  leftGuess: boolean;
  leftStuck: boolean;
  contract: boolean;
  action: boolean;
  result: boolean;
};

const STEPS: readonly ContractStep[] = [
  {
    label: "input",
    caption: "① 同一个用户目标进入两种工具定义：左边含糊，右边像合同。",
    leftGuess: false,
    leftStuck: false,
    contract: false,
    action: false,
    result: false,
  },
  {
    label: "guess",
    caption:
      "② 含糊定义只给一个名字，模型只能猜：什么时候用、传什么、错了怎么办。",
    leftGuess: true,
    leftStuck: false,
    contract: false,
    action: false,
    result: false,
  },
  {
    label: "stuck",
    caption: "③ 猜错后没有边界和错误协议，容易原地重试或编答案。",
    leftGuess: true,
    leftStuck: true,
    contract: false,
    action: false,
    result: false,
  },
  {
    label: "contract",
    caption: "④ agent-ready 契约把用途、参数、失败和返回语义摆成可执行条款。",
    leftGuess: true,
    leftStuck: true,
    contract: true,
    action: false,
    result: false,
  },
  {
    label: "act",
    caption: "⑤ 有了契约，模型不是凭感觉猜，而是沿着条款选择、填参、恢复。",
    leftGuess: true,
    leftStuck: true,
    contract: true,
    action: true,
    result: false,
  },
  {
    label: "answer",
    caption: "⑥ 右边产出可解释结果；左边仍困在猜测里。",
    leftGuess: true,
    leftStuck: true,
    contract: true,
    action: true,
    result: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function Clause({
  x,
  y,
  label,
  tone,
}: {
  x: number;
  y: number;
  label: string;
  tone: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={112}
        height={34}
        rx={CHIP_RADIUS}
        fill={tone}
        fillOpacity="0.13"
        stroke={tone}
      />
      <text
        x={x + 56}
        y={y + 22}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={tone}
      >
        {label}
      </text>
    </g>
  );
}

export function ToolContractCompareDiagram() {
  const leftGuessRef = useRef<SVGGElement | null>(null);
  const leftStuckRef = useRef<SVGGElement | null>(null);
  const contractRef = useRef<SVGGElement | null>(null);
  const actionRef = useRef<SVGGElement | null>(null);
  const resultRef = useRef<SVGGElement | null>(null);

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

        fade(leftGuessRef.current, step.leftGuess, start);
        fade(leftStuckRef.current, step.leftStuck, start);
        fade(contractRef.current, step.contract, start);
        fade(actionRef.current, step.action, start);
        fade(resultRef.current, step.result, start);

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
            aria-label="含糊工具定义和 agent-ready 工具契约的对比动画。左边只有模糊名字，模型只能猜用途和参数，错误后卡住。右边把用途、参数、示例、错误和结果语义写成合同条款，模型沿着条款选择工具、填写参数、处理错误并解释结果。"
            className="block h-auto w-full"
          >
            <defs>
              <marker
                id="tccd-arrow"
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
                id="tccd-ok"
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
              y={32}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              左边让模型猜，右边让模型按合同行动
            </text>

            <rect
              x={254}
              y={46}
              width={212}
              height={34}
              rx={CHIP_RADIUS}
              fill="var(--accent-glow)"
              stroke="var(--accent)"
            />
            <text
              x={360}
              y={68}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              用户目标：查订单能否退款
            </text>

            <rect
              x={LEFT_X}
              y={PANEL_Y}
              width={PANEL_W}
              height={PANEL_H}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--danger)"
              strokeWidth="1.5"
            />
            <text
              x={LEFT_X + PANEL_W / 2}
              y={PANEL_Y + 30}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--danger)"
            >
              含糊工具定义
            </text>
            <rect
              x={LEFT_X + 88}
              y={PANEL_Y + 60}
              width={136}
              height={52}
              rx={CARD_RADIUS}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
            />
            <text
              x={LEFT_X + PANEL_W / 2}
              y={PANEL_Y + 92}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              lookup_data()
            </text>
            <text
              x={LEFT_X + PANEL_W / 2}
              y={PANEL_Y + 136}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              没说用途 · 没说参数 · 没说错误
            </text>

            <g ref={leftGuessRef} opacity={HIDDEN}>
              <path
                d="M 188 232 C 120 190, 122 306, 188 266 C 254 226, 254 318, 188 296"
                fill="none"
                stroke="var(--warning)"
                strokeWidth="2"
                strokeDasharray="6 6"
                markerEnd="url(#tccd-arrow)"
              />
              <text
                x={LEFT_X + PANEL_W / 2}
                y={222}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--warning)"
              >
                guess?
              </text>
              <text
                x={LEFT_X + PANEL_W / 2}
                y={318}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                该不该调、传什么，全靠临场猜
              </text>
            </g>

            <g ref={leftStuckRef} opacity={HIDDEN}>
              <rect
                x={LEFT_X + 70}
                y={344}
                width={172}
                height={44}
                rx={CHIP_RADIUS}
                fill="var(--danger)"
                fillOpacity="0.12"
                stroke="var(--danger)"
              />
              <text
                x={LEFT_X + PANEL_W / 2}
                y={372}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--danger)"
              >
                错了也没有恢复路线
              </text>
            </g>

            <rect
              x={RIGHT_X}
              y={PANEL_Y}
              width={PANEL_W}
              height={PANEL_H}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--success)"
              strokeWidth="1.5"
            />
            <text
              x={RIGHT_X + PANEL_W / 2}
              y={PANEL_Y + 30}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--success)"
            >
              agent-ready 工具契约
            </text>
            <g opacity={MUTED}>
              <Clause
                x={RIGHT_X + 32}
                y={PANEL_Y + 58}
                label="用途"
                tone="var(--accent)"
              />
              <Clause
                x={RIGHT_X + 168}
                y={PANEL_Y + 58}
                label="参数"
                tone="var(--warning)"
              />
              <Clause
                x={RIGHT_X + 32}
                y={PANEL_Y + 108}
                label="示例"
                tone="var(--warning)"
              />
              <Clause
                x={RIGHT_X + 168}
                y={PANEL_Y + 108}
                label="错误"
                tone="var(--danger)"
              />
              <Clause
                x={RIGHT_X + 100}
                y={PANEL_Y + 158}
                label="结果语义"
                tone="var(--success)"
              />
            </g>

            <g ref={contractRef} opacity={HIDDEN}>
              <rect
                x={RIGHT_X + 20}
                y={PANEL_Y + 48}
                width={PANEL_W - 40}
                height={150}
                rx={CARD_RADIUS}
                fill="var(--accent-glow)"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
            </g>

            <g ref={actionRef} opacity={HIDDEN}>
              <line
                x1={RIGHT_X + PANEL_W / 2}
                y1={PANEL_Y + 212}
                x2={RIGHT_X + PANEL_W / 2}
                y2={PANEL_Y + 268}
                stroke="var(--success)"
                strokeWidth="2"
                markerEnd="url(#tccd-ok)"
              />
              <rect
                x={RIGHT_X + 76}
                y={PANEL_Y + 268}
                width={160}
                height={54}
                rx={CARD_RADIUS}
                fill="var(--bg-elevated)"
                stroke="var(--success)"
              />
              <text
                x={RIGHT_X + PANEL_W / 2}
                y={PANEL_Y + 290}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                select + fill args
              </text>
              <text
                x={RIGHT_X + PANEL_W / 2}
                y={PANEL_Y + 310}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                按条款行动
              </text>
            </g>

            <g ref={resultRef} opacity={HIDDEN}>
              <rect
                x={RIGHT_X + 60}
                y={344}
                width={192}
                height={44}
                rx={CHIP_RADIUS}
                fill="var(--success)"
                fillOpacity="0.14"
                stroke="var(--success)"
              />
              <text
                x={RIGHT_X + PANEL_W / 2}
                y={372}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                可解释结果转成用户答案
              </text>
            </g>

            <text
              x={VIEW_W / 2}
              y={456}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              好契约不是多写字，而是把模型要做的判断变成可遵守的边界。
            </text>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="同一个工具，实现不变；契约质量决定模型是在猜，还是在执行。"
        />
      </div>
    </figure>
  );
}
