"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const VIEW_W = 920;
const VIEW_H = 420;
const NODE_W = 132;
const NODE_H = 68;

type SafetyNode = {
  id: string;
  x: number;
  y: number;
  title: string;
  sub: string;
  tone: string;
};

const NODES: readonly SafetyNode[] = [
  {
    id: "call",
    x: 36,
    y: 160,
    title: "收到调用",
    sub: "模型纸条",
    tone: "var(--text-secondary)",
  },
  {
    id: "validate",
    x: 190,
    y: 160,
    title: "校验参数",
    sub: "类型 / 必填 / 范围",
    tone: "var(--accent)",
  },
  {
    id: "reject",
    x: 344,
    y: 62,
    title: "不合格拦下",
    sub: "不执行真实函数",
    tone: "var(--warning)",
  },
  {
    id: "sandbox",
    x: 344,
    y: 256,
    title: "沙箱执行",
    sub: "白名单 / 超时 / 权限",
    tone: "var(--success)",
  },
  {
    id: "catch",
    x: 522,
    y: 256,
    title: "捕获错误",
    sub: "异常不炸主循环",
    tone: "var(--warning)",
  },
  {
    id: "result",
    x: 698,
    y: 142,
    title: "结构化返回",
    sub: "ok / value / error",
    tone: "var(--success)",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "call",
    caption: "收到模型写来的工具调用请求：名字和参数都只是纸条。",
  },
  {
    label: "validate",
    caption: "先校验参数：缺字段、类型错、越界，都在这里发现。",
  },
  {
    label: "reject",
    caption: "不合格就直接拦下，返回结构化错误，不碰真实工具。",
  },
  {
    label: "sandbox",
    caption: "合格请求进入沙箱：按白名单、权限和超时限制执行。",
  },
  {
    label: "catch",
    caption: "真实函数报错也要捕获，避免 Agent.run 主循环直接崩掉。",
  },
  {
    label: "result",
    caption: "无论成功或失败，都包装成 Observation 回灌给下一轮 ReAct。",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function AaToolInvokeSafetyDiagram() {
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      NODES.forEach((node, index) => {
        const start = TEACHING_BEAT_MS * index;
        const lit = TEACHING_BEAT_MS * (index + 1);
        const el = nodeRefs.current[node.id];
        if (el) {
          tl.add(
            el,
            {
              opacity: [0.18, 1],
              scale: [0.96, 1],
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

  function renderNode(node: SafetyNode) {
    const cx = node.x + NODE_W / 2;
    return (
      <g
        key={node.id}
        ref={(el) => {
          nodeRefs.current[node.id] = el;
        }}
        opacity="0.18"
        style={{ transformOrigin: `${cx}px ${node.y + NODE_H / 2}px` }}
      >
        <rect
          x={node.x}
          y={node.y}
          width={NODE_W}
          height={NODE_H}
          rx="10"
          fill={node.tone}
          fillOpacity="0.1"
          stroke={node.tone}
          strokeWidth="1.6"
        />
        <text
          x={cx}
          y={node.y + 29}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="var(--text-primary)"
        >
          {node.title}
        </text>
        <text
          x={cx}
          y={node.y + 50}
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
          aria-label="工具安全执行管线：收到调用后先校验参数，不合格拦下，合格进入沙箱执行，捕获异常后把结果或错误结构化回灌。"
          className="mx-auto block h-auto w-full max-w-[920px]"
        >
          <defs>
            <marker
              id="aats-arrow"
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
            y="34"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Tool.invoke() 安全管线：先防呆，再执行，最后回灌
          </text>
          <text x="24" y="56" fontSize="11" fill="var(--text-secondary)">
            validate → sandbox → try / except → Observation
          </text>

          <line
            x1="168"
            y1="194"
            x2="184"
            y2="194"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aats-arrow)"
          />
          <path
            d="M322 176 C344 132 356 112 382 98"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.6"
            markerEnd="url(#aats-arrow)"
          />
          <path
            d="M322 212 C344 248 356 278 382 290"
            fill="none"
            stroke="var(--success)"
            strokeWidth="1.6"
            markerEnd="url(#aats-arrow)"
          />
          <line
            x1="476"
            y1="290"
            x2="516"
            y2="290"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aats-arrow)"
          />
          <path
            d="M654 280 C692 252 710 228 730 210"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aats-arrow)"
          />
          <path
            d="M476 96 C580 96 646 116 718 158"
            fill="none"
            stroke="var(--warning)"
            strokeDasharray="5 6"
            strokeWidth="1.4"
            markerEnd="url(#aats-arrow)"
          />
          <text x="382" y="151" fontSize="10" fill="var(--warning)">
            参数错误也回灌
          </text>
          <text x="390" y="238" fontSize="10" fill="var(--success)">
            合格才真正行动
          </text>

          {NODES.map((node) => renderNode(node))}
        </svg>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="这条管线把模型请求变成可控行动：失败不是崩溃，而是一条可读的 Observation。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        好的 Tool.invoke()
        像电话上的防呆和保险丝：先拦危险纸条，再把成功或失败都交还给下一轮判断。
      </figcaption>
    </figure>
  );
}
