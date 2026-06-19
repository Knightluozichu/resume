"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <MessageBusDiagram>：多个 Agent 之间「消息传递」的可控教学动画（HEL-310，
 * 《编排·通信·终止》篇4·2，知识点 1：通信 / 消息传递）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。上一章组好了特工小队，这一章讲队员之间怎么传话。
 * 一条「消息」是结构化的一条：「谁发的（from）、发给谁（to）、内容是什么（content）」。
 * 承接上一章拓扑——这里用 supervisor（主管 + 3 worker）作场景：主管把子任务作为消息分派
 * 下去（主管 → worker），worker 干完把结果作为消息汇报回来（worker → 主管）。
 *
 * 动画：一条主管/worker 之间的消息沿拓扑边逐条流动点亮（高亮该边 + 浮出「from→to: 内容」
 * 的消息卡），label 落在每条消息「点亮完成」处（杜绝 off-by-one）。
 *
 * 首帧铁律（HEL-292）：所有节点 / 边 / 消息卡初始 opacity≈0.2 淡显（非全空），anime
 * opacity:[0.2,1] 揭示；reduced-motion 停 t=0 也是淡显态、非空盒。
 *
 * 几何铁律（HEL-296/299）：顶 caption baseline y≥20（此处 30），所有 <text> bbox 距
 * viewBox 任意边 ≥16px；单一坐标公式 nodeCx(i)；不套整圈容器大框；利用率 ≥55%。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline 内部
 * 动态 import 切独立 chunk（硬规则 2/6），再经 mdx-components 静态注册为客户端叶子。
 */

// —— 画布几何。 ——
const VIEW_W = 720;
const VIEW_H = 392;
const TOP_CAPTION_Y = 30; // 顶 caption 基线 ≥20，bbox 距顶 ≥16px

// 主管节点（上方居中）。
const BOSS = { cx: VIEW_W / 2, cy: 84, w: 176, h: 50 };

// 3 个 worker（下方横排，单一 x 公式 nodeCx(i)）。
const W_Y = 250;
const W_W = 150;
const W_H = 56;
const MARGIN_X = 56;
const INNER_W = VIEW_W - 2 * MARGIN_X;
const nodeCx = (i: number) => MARGIN_X + ((i + 0.5) * INNER_W) / 3;

const WORKERS = [
  { label: "研究员", sub: "查资料" },
  { label: "写手", sub: "写初稿" },
  { label: "审查", sub: "挑错" },
];

/** 一条结构化消息：谁发、发给谁、内容；以及它走哪条边、消息卡画在哪。 */
type Msg = {
  /** anime label。 */
  label: string;
  from: string;
  to: string;
  content: string;
  /** 边的两端坐标 + 是否「向下分派」（决定箭头朝向与配色）。 */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  down: boolean;
  /** 消息卡左上角坐标。 */
  cardX: number;
  cardY: number;
};

// —— 6 条消息：主管先把 3 件子任务分派下去（向下），3 个 worker 再各自汇报回来（向上）。 ——
// 分派边略左偏、汇报边略右偏，与上一章 supervisor 拓扑同款，避免重叠。
const bossBottom = BOSS.cy + BOSS.h / 2;
const workTop = W_Y - W_H / 2;

const MESSAGES: readonly Msg[] = [
  {
    label: "m0",
    from: "主管",
    to: "研究员",
    content: "去查这款相机的评测和参数",
    x1: BOSS.cx - 14,
    y1: bossBottom,
    x2: nodeCx(0) - 14,
    y2: workTop - 2,
    down: true,
    cardX: 18,
    cardY: 150,
  },
  {
    label: "m1",
    from: "主管",
    to: "写手",
    content: "拿研究员的资料写成初稿",
    x1: BOSS.cx - 14,
    y1: bossBottom,
    x2: nodeCx(1) - 14,
    y2: workTop - 2,
    down: true,
    cardX: VIEW_W / 2 - 118,
    cardY: 150,
  },
  {
    label: "m2",
    from: "主管",
    to: "审查",
    content: "对成稿挑错、核对事实",
    x1: BOSS.cx - 14,
    y1: bossBottom,
    x2: nodeCx(2) - 14,
    y2: workTop - 2,
    down: true,
    cardX: VIEW_W - 18 - 218,
    cardY: 150,
  },
  {
    label: "m3",
    from: "研究员",
    to: "主管",
    content: "查到 3 篇评测 + 参数表",
    x1: nodeCx(0) + 14,
    y1: workTop - 2,
    x2: BOSS.cx + 14,
    y2: bossBottom,
    down: false,
    cardX: 18,
    cardY: 326,
  },
  {
    label: "m4",
    from: "写手",
    to: "主管",
    content: "成稿 800 字测评",
    x1: nodeCx(1) + 14,
    y1: workTop - 2,
    x2: BOSS.cx + 14,
    y2: bossBottom,
    down: false,
    cardX: VIEW_W / 2 - 118,
    cardY: 326,
  },
  {
    label: "m5",
    from: "审查",
    to: "主管",
    content: "改了 5 处事实 / 措辞",
    x1: nodeCx(2) + 14,
    y1: workTop - 2,
    x2: BOSS.cx + 14,
    y2: bossBottom,
    down: false,
    cardX: VIEW_W - 18 - 218,
    cardY: 326,
  },
];

const CARD_W = 218;
const CARD_H = 44;

const STEPS: readonly TeachingStep[] = MESSAGES.map((m) => ({
  label: m.label,
  caption: m.down
    ? `① 分派消息 ${m.from} → ${m.to}：「${m.content}」——一条消息 = 发送者 + 接收者 + 内容`
    : `② 汇报消息 ${m.from} → ${m.to}：「${m.content}」——干完把结果作为消息传回去`,
}));

type NodeBoxProps = {
  cx: number;
  cy: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  filled?: boolean;
};

function NodeBox({ cx, cy, w, h, label, sub, filled }: NodeBoxProps) {
  return (
    <>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx="10"
        fill={filled ? "var(--accent-glow)" : "var(--bg)"}
        stroke="var(--accent)"
        strokeWidth="1.8"
      />
      <text
        x={cx}
        y={sub ? cy - 2 : cy + 4}
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill="var(--text-primary)"
      >
        {label}
      </text>
      {sub && (
        <text
          x={cx}
          y={cy + 15}
          textAnchor="middle"
          fontSize="10"
          fill="var(--text-secondary)"
        >
          {sub}
        </text>
      )}
    </>
  );
}

function MessageBusDiagramInner() {
  // 每条消息的「边 + 消息卡」一个 group，按 label 挂 ref。
  const groupRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      MESSAGES.forEach((m, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const g = groupRefs.current[m.label];
        if (g) {
          tl.add(
            g,
            { opacity: [0.2, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            start,
          );
        }
        tl.label(m.label, lit);
      });
    },
  });

  const labelText = Object.fromEntries(
    STEPS.map((s) => [s.label, s.caption ?? s.label]),
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Agent 之间的消息传递动画：一条消息由发送者、接收者、内容三样组成；主管把子任务作为消息逐条分派给研究员、写手、审查（向下），它们干完再把结果作为消息汇报回主管（向上）。可播放、暂停、单步、拖动进度逐条消息观察。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="mbd-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="mbd-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* 顶 caption（baseline y=30，bbox 距顶 ≥16px） */}
          <text
            x={VIEW_W / 2}
            y={TOP_CAPTION_Y}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            一条消息 = 谁发的（from）+ 发给谁（to）+ 内容是什么（content）
          </text>

          {/* 主管节点（常显基底） */}
          <NodeBox
            cx={BOSS.cx}
            cy={BOSS.cy}
            w={BOSS.w}
            h={BOSS.h}
            label="主管 supervisor"
            sub="拆活 · 分派 · 汇总"
            filled
          />

          {/* 3 个 worker 节点（常显基底） */}
          {WORKERS.map((w, i) => (
            <NodeBox
              key={`node-${i}`}
              cx={nodeCx(i)}
              cy={W_Y}
              w={W_W}
              h={W_H}
              label={w.label}
              sub={w.sub}
            />
          ))}

          {/* 6 条消息：每条 = 一条边（箭头）+ 一张消息卡，逐条 anime 揭示 */}
          {MESSAGES.map((m) => {
            const color = m.down ? "var(--accent)" : "var(--success)";
            const marker = m.down
              ? "url(#mbd-arrow-accent)"
              : "url(#mbd-arrow-success)";
            return (
              <g
                key={m.label}
                ref={(el) => {
                  groupRefs.current[m.label] = el;
                }}
                opacity="0.2"
              >
                {/* 传输边 */}
                <line
                  x1={m.x1}
                  y1={m.y1}
                  x2={m.x2}
                  y2={m.y2}
                  stroke={color}
                  strokeWidth={m.down ? 1.8 : 1.5}
                  strokeDasharray={m.down ? undefined : "5 3"}
                  markerEnd={marker}
                />
                {/* 消息卡：结构化的「from → to: 内容」 */}
                <rect
                  x={m.cardX}
                  y={m.cardY}
                  width={CARD_W}
                  height={CARD_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke={color}
                  strokeWidth="1.4"
                />
                <text
                  x={m.cardX + 10}
                  y={m.cardY + 17}
                  textAnchor="start"
                  fontSize="10.5"
                  fontWeight="700"
                  fill={color}
                >
                  {m.from} → {m.to}
                </text>
                <text
                  x={m.cardX + 10}
                  y={m.cardY + 33}
                  textAnchor="start"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  内容：{m.content}
                </text>
              </g>
            );
          })}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={labelText}
          caption="点播放：先看主管把 3 件子任务作为消息分派下去（紫色向下），再看 3 个 worker 把结果作为消息汇报回来（绿色虚线向上）。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Agent 之间靠「消息」交流——每条消息都是结构化的一条：发送者 + 接收者 +
        内容。主管 ⇄ worker 之间的分派与汇报，本质都是在收发消息。
      </figcaption>
    </figure>
  );
}

/** 动态边界：anime.js 叶子经 next/dynamic(ssr:false) 懒加载，绝不进首屏 / 公共 layout（硬规则 2/6）。 */
const MessageBusDynamic = dynamic(
  () => Promise.resolve(MessageBusDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">消息传递动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function MessageBusDiagram() {
  return <MessageBusDynamic />;
}
