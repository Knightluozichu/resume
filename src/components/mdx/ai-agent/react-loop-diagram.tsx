"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AaReactLoopDiagram>：ReAct 循环旗舰动画（HEL-312）。
 *
 * 用「失忆天才小屋」的电话隐喻演示 Reasoning + Acting 的主循环：
 * 想一步（Thought）→ 打电话（Action）→ 看回执（Observation）→ 再想下一步 →
 * Final Answer 停止。动画可暂停、单步、拖进度；颜色与动效均走 DESIGN token。
 */

const VIEW_W = 920;
const VIEW_H = 430;
const NODE_W = 142;
const NODE_H = 78;

type LoopNode = {
  id: string;
  x: number;
  y: number;
  index: string;
  title: string;
  sub: string;
  color: string;
};

const NODES: readonly LoopNode[] = [
  {
    id: "task",
    x: 76,
    y: 164,
    index: "0",
    title: "用户任务",
    sub: "订明早会议室",
    color: "var(--text-secondary)",
  },
  {
    id: "thought1",
    x: 262,
    y: 76,
    index: "1",
    title: "Thought",
    sub: "先查空闲时间",
    color: "var(--accent)",
  },
  {
    id: "action1",
    x: 518,
    y: 76,
    index: "2",
    title: "Action",
    sub: "calendar.search",
    color: "var(--warning)",
  },
  {
    id: "obs1",
    x: 688,
    y: 164,
    index: "3",
    title: "Observation",
    sub: "10:00 有空",
    color: "var(--success)",
  },
  {
    id: "thought2",
    x: 518,
    y: 264,
    index: "4",
    title: "Thought",
    sub: "现在可以预订",
    color: "var(--accent)",
  },
  {
    id: "final",
    x: 262,
    y: 264,
    index: "5",
    title: "Final Answer",
    sub: "已帮你订好",
    color: "var(--success)",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "task",
    caption: "0 用户把任务塞进小屋：帮我订明早会议室。",
  },
  {
    label: "thought1",
    caption: "1 天才先想一步：不能直接答，得先查明早哪些时间有空。",
  },
  {
    label: "action1",
    caption: "2 他写出 Action：请外部运行时拨 calendar.search 这通电话。",
  },
  {
    label: "obs1",
    caption: "3 运行时把 Observation 回灌回来：10:00 有空。",
  },
  {
    label: "thought2",
    caption: "4 天才基于回执再想下一步：已有可用时间，现在可以预订。",
  },
  {
    label: "final",
    caption: "5 当任务办成，模型输出 Final Answer，Agent.run 主循环停止。",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function AaReactLoopDiagram() {
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      NODES.forEach((node, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const el = nodeRefs.current[node.id];
        if (el) {
          tl.add(
            el,
            {
              opacity: [0.2, 1],
              scale: [0.98, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        tl.label(node.id, lit);
      });
    },
  });

  function renderNode(node: LoopNode) {
    const cx = node.x + NODE_W / 2;
    return (
      <g
        key={node.id}
        ref={(el) => {
          nodeRefs.current[node.id] = el;
        }}
        opacity="0.2"
        style={{ transformOrigin: `${cx}px ${node.y + NODE_H / 2}px` }}
      >
        <rect
          x={node.x}
          y={node.y}
          width={NODE_W}
          height={NODE_H}
          rx="10"
          fill={node.color}
          fillOpacity="0.1"
          stroke={node.color}
          strokeWidth="1.6"
        />
        <text
          x={cx}
          y={node.y + 23}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill={node.color}
        >
          {node.index}
        </text>
        <text
          x={cx}
          y={node.y + 43}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="var(--text-primary)"
        >
          {node.title}
        </text>
        <text
          x={cx}
          y={node.y + 62}
          textAnchor="middle"
          fontSize="10"
          fill="var(--text-secondary)"
        >
          {node.sub}
        </text>
      </g>
    );
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="ReAct 循环教学动画：用户任务进入小屋，模型先 Thought 想一步，再 Action 请求工具，运行时执行后把 Observation 回灌，模型再基于回执继续 Thought，直到输出 Final Answer 停止。"
          className="mx-auto block h-auto w-full max-w-[920px]"
        >
          <defs>
            <marker
              id="aarl-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          <text
            x="24"
            y="32"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ReAct 循环：每一轮只想下一步，不一口气编完整计划
          </text>
          <text x="24" y="54" fontSize="11" fill="var(--text-secondary)">
            Thought → Action → Observation → Thought → ... → Final Answer
          </text>

          <path
            d="M218 182 C250 106 310 92 402 112"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aarl-arrow)"
            opacity="0.6"
          />
          <line
            x1="406"
            y1="115"
            x2="512"
            y2="115"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aarl-arrow)"
            opacity="0.6"
          />
          <path
            d="M660 116 C716 120 746 136 756 158"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aarl-arrow)"
            opacity="0.6"
          />
          <path
            d="M756 244 C742 284 698 300 660 304"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aarl-arrow)"
            opacity="0.6"
          />
          <line
            x1="518"
            y1="303"
            x2="410"
            y2="303"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aarl-arrow)"
            opacity="0.6"
          />
          <path
            d="M518 278 C470 210 476 166 520 138"
            fill="none"
            stroke="var(--accent)"
            strokeDasharray="5 6"
            strokeWidth="1.4"
            markerEnd="url(#aarl-arrow)"
            opacity="0.55"
          />
          <text x="440" y="220" fontSize="10" fill="var(--accent)">
            需要更多信息就继续循环
          </text>

          {NODES.map((node) => renderNode(node))}
        </svg>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="关键不是多一次函数调用，而是每次拿到 Observation 后重新思考下一步。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ReAct 把「想」和「做」交替起来：模型负责 Thought / Action / Final
        Answer，运行时负责真正执行工具并回灌 Observation。
      </figcaption>
    </figure>
  );
}
