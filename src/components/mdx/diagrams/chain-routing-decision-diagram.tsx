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
const VIEW_H = 520;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;

const SHOWN = 1;
const HIDDEN = 0;

const START_X = 228;
const START_Y = 40;
const START_W = 264;
const START_H = 48;

const Q1_CX = 360;
const Q1_CY = 150;
const Q1_HW = 140;
const Q1_HH = 50;

const CHAIN_X = 40;
const END_Y = 254;
const END_W = 196;
const END_H = 84;

const Q2_CX = 360;
const Q2_CY = 280;
const Q2_HW = 132;
const Q2_HH = 48;

const ROUTE_X = 262;
const AGENT_X = 484;

const CONC_X = 56;
const CONC_Y = 436;
const CONC_W = 608;
const CONC_H = 44;

type DecisionStep = TeachingStep & {
  start: boolean;
  q1: boolean;
  chain: boolean;
  q2: boolean;
  route: boolean;
  agent: boolean;
  conclusion: boolean;
};

const STEPS: readonly DecisionStep[] = [
  {
    label: "task",
    caption: "① 来了一个任务，先别急着上复杂系统，先判断它的结构。",
    start: true,
    q1: false,
    chain: false,
    q2: false,
    route: false,
    agent: false,
    conclusion: false,
  },
  {
    label: "q1",
    caption:
      "② 第一问：所有输入都要走同一串固定工序吗？如果答案是“是”，优先看链式。",
    start: true,
    q1: true,
    chain: false,
    q2: false,
    route: false,
    agent: false,
    conclusion: false,
  },
  {
    label: "chain",
    caption: "③ 是 -> 链式：把一件固定任务拆成几步，所有输入都排同一条线。",
    start: true,
    q1: true,
    chain: true,
    q2: false,
    route: false,
    agent: false,
    conclusion: false,
  },
  {
    label: "q2",
    caption:
      "④ 不是同一路？再问第二句：能不能先比较准确地分成几类，每类再走固定专线？",
    start: true,
    q1: true,
    chain: true,
    q2: true,
    route: false,
    agent: false,
    conclusion: false,
  },
  {
    label: "route",
    caption: "⑤ 能分清类别 -> 路由：先分诊，再把请求送进对应的专门流程。",
    start: true,
    q1: true,
    chain: true,
    q2: true,
    route: true,
    agent: false,
    conclusion: false,
  },
  {
    label: "boundary",
    caption:
      "⑥ 两问都答不上来 -> 已越界到工作流边界：考虑更高自主性的模式，而不是继续硬写死。",
    start: true,
    q1: true,
    chain: true,
    q2: true,
    route: true,
    agent: true,
    conclusion: true,
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function ChainRoutingDecisionDiagram() {
  const startRef = useRef<SVGGElement | null>(null);
  const q1Ref = useRef<SVGGElement | null>(null);
  const chainRef = useRef<SVGGElement | null>(null);
  const q2Ref = useRef<SVGGElement | null>(null);
  const routeRef = useRef<SVGGElement | null>(null);
  const agentRef = useRef<SVGGElement | null>(null);
  const concRef = useRef<SVGGElement | null>(null);

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
        fade(chainRef.current, step.chain, start);
        fade(q2Ref.current, step.q2, start);
        fade(routeRef.current, step.route, start);
        fade(agentRef.current, step.agent, start);
        fade(concRef.current, step.conclusion, start);

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
            aria-label="链式与路由选型决策动画，共六步。第一步，来了一个任务，先别急着上复杂系统。第二步，先问第一句：所有输入都要走同一串固定工序吗。第三步，如果答案是是，就落到左侧绿色终点链式，表示把任务拆成固定的顺序步骤，所有输入都走同一路。第四步，如果第一问答不是，再问第二句：能不能先比较准确地分成几类，每类再走自己的固定专线。第五步，如果能分清类别，就落到中间紫色终点路由，表示先分诊，再把请求送进对应专门流程。第六步，如果两问都答不上来，就落到右侧红色终点，表示这已经越过工作流边界，应该考虑更高自主性的 agent 或后续模式，而不是继续硬写死。底部总结条强调：同一路用链式，可分流用路由，列不清路线图时再考虑 agent。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="crd-arrow"
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
                id="crd-arrow-ok"
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
                id="crd-arrow-ac"
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
                id="crd-arrow-err"
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
              点播放：看任务为什么会落到链式、路由，或越界到 agent
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
                x={START_X + START_W / 2}
                y={START_Y + 30}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                来了一个新任务，先别急着选最复杂的方案
              </text>
            </g>

            <g ref={q1Ref} opacity={0}>
              <line
                x1={START_X + START_W / 2}
                y1={START_Y + START_H}
                x2={Q1_CX}
                y2={Q1_CY - Q1_HH - 10}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#crd-arrow)"
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
                fill="var(--text-primary)"
              >
                所有输入都走同一串
              </text>
              <text
                x={Q1_CX}
                y={Q1_CY + 10}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                固定工序吗？
              </text>
            </g>

            <g ref={chainRef} opacity={0}>
              <line
                x1={Q1_CX - Q1_HW}
                y1={Q1_CY}
                x2={CHAIN_X + END_W - 10}
                y2={END_Y + END_H / 2}
                stroke="var(--success)"
                strokeWidth="2"
                markerEnd="url(#crd-arrow-ok)"
              />
              <text
                x={196}
                y={208}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--success)"
              >
                是
              </text>
              <rect
                x={CHAIN_X}
                y={END_Y}
                width={END_W}
                height={END_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--success)"
              />
              <text
                x={CHAIN_X + END_W / 2}
                y={END_Y + 28}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                链式
              </text>
              <text
                x={CHAIN_X + END_W / 2}
                y={END_Y + 50}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                所有人都排同一条线
              </text>
              <text
                x={CHAIN_X + END_W / 2}
                y={END_Y + 68}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                拆成更容易做对的几步
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
                markerEnd="url(#crd-arrow)"
              />
              <text
                x={Q1_CX + 18}
                y={Q1_CY + 84}
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                否
              </text>
              <polygon
                points={`${Q2_CX},${Q2_CY - Q2_HH} ${Q2_CX + Q2_HW},${Q2_CY} ${Q2_CX},${Q2_CY + Q2_HH} ${Q2_CX - Q2_HW},${Q2_CY}`}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <text
                x={Q2_CX}
                y={Q2_CY - 12}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                能先比较准确地分成
              </text>
              <text
                x={Q2_CX}
                y={Q2_CY + 8}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                几类，各走固定专线吗？
              </text>
            </g>

            <g ref={routeRef} opacity={0}>
              <line
                x1={Q2_CX}
                y1={Q2_CY + Q2_HH}
                x2={ROUTE_X + END_W / 2}
                y2={END_Y + END_H - 2}
                stroke="var(--accent)"
                strokeWidth="2"
                markerEnd="url(#crd-arrow-ac)"
              />
              <text
                x={Q2_CX - 18}
                y={Q2_CY + 74}
                fontSize={TEXT_SIZE}
                fill="var(--accent)"
              >
                是
              </text>
              <rect
                x={ROUTE_X}
                y={END_Y}
                width={END_W}
                height={END_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--accent)"
              />
              <text
                x={ROUTE_X + END_W / 2}
                y={END_Y + 28}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--accent)"
              >
                路由
              </text>
              <text
                x={ROUTE_X + END_W / 2}
                y={END_Y + 50}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                先分流，再进专门流程
              </text>
              <text
                x={ROUTE_X + END_W / 2}
                y={END_Y + 68}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                每类只优化自己那条线
              </text>
            </g>

            <g ref={agentRef} opacity={0}>
              <line
                x1={Q2_CX + Q2_HW}
                y1={Q2_CY}
                x2={AGENT_X - 10}
                y2={END_Y + END_H / 2}
                stroke="var(--danger)"
                strokeWidth="2"
                markerEnd="url(#crd-arrow-err)"
              />
              <text
                x={522}
                y={256}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--danger)"
              >
                否
              </text>
              <rect
                x={AGENT_X}
                y={END_Y}
                width={END_W}
                height={END_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--danger)"
              />
              <text
                x={AGENT_X + END_W / 2}
                y={END_Y + 28}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--danger)"
              >
                越过工作流边界
              </text>
              <text
                x={AGENT_X + END_W / 2}
                y={END_Y + 50}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                类别列不清，路线也写不完
              </text>
              <text
                x={AGENT_X + END_W / 2}
                y={END_Y + 68}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                该回去考虑 agent 了
              </text>
            </g>

            <g ref={concRef} opacity={0}>
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
                y={CONC_Y + 18}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                记忆口诀：同一路 {"->"} 链式；能分流 {"->"} 路由；路线图列不清{" "}
                {"->"} 再考虑 agent
              </text>
              <text
                x={VIEW_W / 2}
                y={CONC_Y + 34}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-secondary)"
              >
                先把工作流用到位，再往右加自主性
              </text>
            </g>
          </svg>
        </PatternDiagramViewport>

        <TimelineControls
          timeline={timeline}
          caption="两句判断就够用：是不是同一路？如果不是，能不能稳定分流？"
          labelText={LABEL_TEXT}
        />
      </div>
    </figure>
  );
}
