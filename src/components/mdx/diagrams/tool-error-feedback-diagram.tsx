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
const MUTED = 0.22;

type RoadStep = TeachingStep & {
  crash: boolean;
  envelope: boolean;
  map: boolean;
  retry: boolean;
  done: boolean;
};

const STEPS: readonly RoadStep[] = [
  {
    label: "fail",
    caption: "① 工具失败不可怕；可怕的是只返回一串崩溃文本。",
    crash: true,
    envelope: false,
    map: false,
    retry: false,
    done: false,
  },
  {
    label: "envelope",
    caption:
      "② 把错误包成结构化结果：code、message、retryable、fix_hint、partial。",
    crash: true,
    envelope: true,
    map: false,
    retry: false,
    done: false,
  },
  {
    label: "map",
    caption: "③ 字段本身就是路线图：改参数、换工具、追问人、或升级人工。",
    crash: true,
    envelope: true,
    map: true,
    retry: false,
    done: false,
  },
  {
    label: "retry",
    caption: "④ agent 根据路线图改参重试，而不是盲目原样再撞一次。",
    crash: true,
    envelope: true,
    map: true,
    retry: true,
    done: false,
  },
  {
    label: "done",
    caption: "⑤ 成功结果也要结构化，让模型知道哪些字段能直接回答用户。",
    crash: true,
    envelope: true,
    map: true,
    retry: true,
    done: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function Field({
  y,
  name,
  value,
  tone,
}: {
  y: number;
  name: string;
  value: string;
  tone: string;
}) {
  return (
    <g>
      <rect
        x={304}
        y={y}
        width={248}
        height={32}
        rx={CHIP_RADIUS}
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <text
        x={318}
        y={y + 21}
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={tone}
      >
        {name}
      </text>
      <text
        x={432}
        y={y + 21}
        fontSize={TEXT_SIZE}
        fontFamily="var(--font-mono)"
        fill="var(--text-primary)"
      >
        {value}
      </text>
    </g>
  );
}

export function ToolErrorFeedbackDiagram() {
  const crashRef = useRef<SVGGElement | null>(null);
  const envelopeRef = useRef<SVGGElement | null>(null);
  const mapRef = useRef<SVGGElement | null>(null);
  const retryRef = useRef<SVGGElement | null>(null);
  const doneRef = useRef<SVGGElement | null>(null);

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

        fade(crashRef.current, step.crash, start);
        fade(envelopeRef.current, step.envelope, start);
        fade(mapRef.current, step.map, start);
        fade(retryRef.current, step.retry, start);
        fade(doneRef.current, step.done, start);

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
            aria-label="工具错误反馈路线图动画。左侧展示裸崩溃文本只能让模型卡住；中间展示结构化错误结果，包含错误码、是否可重试、修复提示和部分数据；右侧把这些字段变成恢复路线图，让 agent 改参数、重试并最终读懂成功结果。"
            className="block h-auto w-full"
          >
            <defs>
              <marker
                id="tefd-arrow"
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
                id="tefd-ok"
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
              错误返回和结果格式，是 agent 的恢复路线图
            </text>

            <rect
              x={36}
              y={74}
              width={220}
              height={318}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--danger)"
            />
            <text
              x={146}
              y={104}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--danger)"
            >
              裸崩溃文本
            </text>
            <g ref={crashRef} opacity={SHOWN}>
              <rect
                x={60}
                y={132}
                width={172}
                height={92}
                rx={CHIP_RADIUS}
                fill="var(--danger)"
                fillOpacity="0.12"
                stroke="var(--danger)"
              />
              <text
                x={76}
                y={160}
                fontSize={TEXT_SIZE}
                fontFamily="var(--font-mono)"
                fill="var(--danger)"
              >
                KeyError: order_id
              </text>
              <text
                x={76}
                y={184}
                fontSize={TEXT_SIZE}
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                at tool.py:42
              </text>
              <text
                x={146}
                y={254}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                模型只知道「坏了」
              </text>
              <text
                x={146}
                y={278}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                不知道该改什么
              </text>
            </g>
            <g opacity={MUTED}>
              <path
                d="M 88 320 C 132 292, 164 348, 204 320"
                fill="none"
                stroke="var(--danger)"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <text
                x={146}
                y={354}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--danger)"
              >
                原样重试循环
              </text>
            </g>

            <rect
              x={280}
              y={74}
              width={296}
              height={318}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--accent)"
            />
            <text
              x={428}
              y={104}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              结构化错误结果
            </text>
            <g ref={envelopeRef} opacity={HIDDEN}>
              <Field y={130} name="ok" value="false" tone="var(--danger)" />
              <Field y={174} name="code" value="BAD_ID" tone="var(--warning)" />
              <Field
                y={218}
                name="retryable"
                value="true"
                tone="var(--success)"
              />
              <Field
                y={262}
                name="fix_hint"
                value="A + 4 digits"
                tone="var(--accent)"
              />
              <Field
                y={306}
                name="partial"
                value="order found?"
                tone="var(--text-secondary)"
              />
            </g>
            <g opacity={MUTED}>
              <text
                x={428}
                y={364}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                字段少，但每个字段都能指导下一步
              </text>
            </g>

            <g ref={mapRef} opacity={HIDDEN}>
              <line
                x1={576}
                y1={234}
                x2={640}
                y2={234}
                stroke="var(--success)"
                strokeWidth="2"
                markerEnd="url(#tefd-ok)"
              />
              <rect
                x={604}
                y={118}
                width={88}
                height={52}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--warning)"
              />
              <text
                x={648}
                y={149}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--warning)"
              >
                改参数
              </text>
              <rect
                x={604}
                y={206}
                width={88}
                height={52}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--success)"
              />
              <text
                x={648}
                y={237}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                可重试
              </text>
              <rect
                x={604}
                y={294}
                width={88}
                height={52}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--danger)"
              />
              <text
                x={648}
                y={325}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--danger)"
              >
                升级人
              </text>
            </g>

            <g ref={retryRef} opacity={HIDDEN}>
              <path
                d="M 648 206 C 650 78, 424 52, 376 126"
                fill="none"
                stroke="var(--success)"
                strokeWidth="2"
                strokeDasharray="7 5"
                markerEnd="url(#tefd-ok)"
              />
              <rect
                x={250}
                y={420}
                width={220}
                height={34}
                rx={CHIP_RADIUS}
                fill="var(--success)"
                fillOpacity="0.14"
                stroke="var(--success)"
              />
              <text
                x={360}
                y={442}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                agent 改成 order_id=A0123 再试
              </text>
            </g>

            <g ref={doneRef} opacity={HIDDEN}>
              <rect
                x={486}
                y={420}
                width={188}
                height={34}
                rx={CHIP_RADIUS}
                fill="var(--accent-glow)"
                stroke="var(--accent)"
              />
              <text
                x={580}
                y={442}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--accent)"
              >
                ok: true，模型可回答用户
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="错误和成功结果都要结构化：让模型知道下一步是什么，而不是猜异常含义。"
        />
      </div>
    </figure>
  );
}
