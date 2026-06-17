"use client";

import { useRef } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AgentLoopDiagram>：智能体循环（Agent Loop）的「可控教学动画」旗舰图（HEL-271）。
 *
 * 失忆天才小屋隐喻：把「感知—决策—行动—观察」四个环节画成一个环，一个高亮脉冲
 * 沿环依次点亮每个节点，转完一圈再回到起点——这正是智能体「自主循环」的灵魂。
 *  - 上半区「聊天机器人」：一条直线 用户问 → 模型答 → 结束，无回环——一次性交互。
 *  - 下半区「智能体」：环形 4 节点 感知(Perceive) → 决策(Decide·大脑) →
 *    行动(Act·工具) → 观察(Observe) →（闭环回到感知），脉冲沿环转圈点亮。
 *
 * 时间线 = 一条 anime.js timeline：先点亮直线 3 段（步 0..2，演聊天机器人一次性直
 * 线），再依次点亮环上 4 节点 + 闭环回边（步 3..7）。每个 step 的 label 锚在「对应
 * 节点/段点亮到最亮」的时刻（lit = BEAT*(i+1)），与 ActivityLifecycleDiagram 同款
 * 写法，修正 label 落在淡入起点的 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部动态 import("animejs") 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册
 * 时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

// —— 布局常量（viewBox 内坐标；间距均 2 的倍数，无魔法数字散落）——
const VIEW_W = 560;
const VIEW_H = 600;

// 上半区：聊天机器人直线（用户问 → 模型答 → 结束）。三段等宽块横排。
const LINE_BOX_W = 132;
const LINE_BOX_H = 52;
const LINE_GAP = 28; // 块间留给箭头
const LINE_Y = 88; // 块顶 y
const LINE_LEFT = (VIEW_W - (3 * LINE_BOX_W + 2 * LINE_GAP)) / 2; // 居中起点

type LineSeg = { id: string; title: string; color: string };
const LINE_SEGS: readonly LineSeg[] = [
  { id: "ask", title: "用户提问", color: "var(--text-secondary)" },
  { id: "answer", title: "模型回答", color: "var(--accent)" },
  { id: "end", title: "结束", color: "var(--text-secondary)" },
];
const lineX = (i: number) => LINE_LEFT + i * (LINE_BOX_W + LINE_GAP);

// 下半区：智能体环形 4 节点。圆心 + 半径足够摆下 128×58 的中文节点。
const CX = 280;
const CY = 388;
const RING_R = 150;
const NODE_W = 128;
const NODE_H = 58;

type RingNode = {
  /** anime.js timeline label = 关键帧锚点。 */
  id: string;
  title: string; // 环节名（中文 + 英文）
  sub: string; // 一句话该环节在干嘛
  /** 极角（度）：top=-90 感知、right=0 决策、bottom=90 行动、left=180 观察。 */
  deg: number;
  color: string;
};

const RING_NODES: readonly RingNode[] = [
  {
    id: "perceive",
    title: "感知 Perceive",
    sub: "读懂当前处境",
    deg: -90,
    color: "var(--accent)",
  },
  {
    id: "decide",
    title: "决策 Decide",
    sub: "大脑想下一步",
    deg: 0,
    color: "var(--warning)",
  },
  {
    id: "act",
    title: "行动 Act",
    sub: "调工具做事",
    deg: 90,
    color: "var(--success)",
  },
  {
    id: "observe",
    title: "观察 Observe",
    sub: "看结果如何",
    deg: 180,
    color: "var(--danger)",
  },
];

/** 节点中心坐标（极坐标 → 直角坐标，单一公式，无逐节点近似）。 */
function nodeCenter(deg: number): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + RING_R * Math.cos(rad), y: CY + RING_R * Math.sin(rad) };
}

// 关键帧步骤：先聊天机器人直线 3 步，再智能体环 4 节点 + 闭环回边 1 步（共 8 步）。
const STEPS: readonly TeachingStep[] = [
  { label: "ask", caption: "聊天机器人：用户问一句——一次性交互的起点" },
  { label: "answer", caption: "聊天机器人：模型答一句——读完纸条就回话" },
  { label: "end", caption: "聊天机器人：到此结束——没有下一步，是一条直线" },
  {
    label: "perceive",
    caption: "智能体①感知：先读懂现在的处境（任务、上一步结果、环境）",
  },
  {
    label: "decide",
    caption: "智能体②决策：大脑根据感知到的信息，想清楚下一步该做什么",
  },
  {
    label: "act",
    caption: "智能体③行动：调用工具真去做事（搜索、算账、写文件……）",
  },
  {
    label: "observe",
    caption: "智能体④观察：看看行动产生了什么结果，作为下一轮的输入",
  },
  {
    label: "loop",
    caption: "闭环：观察完回到感知——智能体自己转圈，直到把任务干完",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function AgentLoopDiagram() {
  // 直线 3 段高亮层 + 环 4 节点高亮层 + 闭环回边高亮层的 DOM 引用。
  const lineRefs = useRef<Record<string, SVGRectElement | null>>({});
  const ringRefs = useRef<Record<string, SVGRectElement | null>>({});
  const loopEdgeRef = useRef<SVGPathElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // —— 第一段：聊天机器人直线，3 段依次点亮（3 beat）——
      LINE_SEGS.forEach((seg, i) => {
        const el = lineRefs.current[seg.id];
        if (!el) return;
        const lit = TEACHING_BEAT_MS * (i + 1);
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * i,
        );
        tl.label(seg.id, lit);
      });

      // —— 第二段：智能体环，4 节点依次点亮（4 beat），上一节点淡出衔接 ——
      const ringStart = TEACHING_BEAT_MS * 3;
      RING_NODES.forEach((n, i) => {
        const el = ringRefs.current[n.id];
        if (!el) return;
        const start = ringStart + TEACHING_BEAT_MS * i;
        const lit = ringStart + TEACHING_BEAT_MS * (i + 1);
        tl.add(
          el,
          {
            opacity: [0, 1],
            scale: [0.96, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          start,
        );
        tl.label(n.id, lit);
        // 离开本节点时淡出到低亮（保留余晖），与下一节点淡入接力，保证同一时刻只有当前最亮。
        tl.add(
          el,
          {
            opacity: [1, 0.22],
            duration: TEACHING_BEAT_MS * 0.5,
            ease: "in(2)",
          },
          lit,
        );
      });

      // —— 闭环回边：观察 → 感知，最后一步点亮（强调「自己转圈」）——
      const loopStart = ringStart + TEACHING_BEAT_MS * 4;
      if (loopEdgeRef.current) {
        tl.add(
          loopEdgeRef.current,
          { opacity: [0.25, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          loopStart,
        );
      }
      // 闭环时把感知节点重新点亮，呼应「回到起点继续下一轮」。
      const perceiveEl = ringRefs.current["perceive"];
      if (perceiveEl) {
        tl.add(
          perceiveEl,
          { opacity: [0.22, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          loopStart,
        );
      }
      tl.label("loop", loopStart + TEACHING_BEAT_MS);
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

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="聊天机器人与智能体的对照动画。上半区「聊天机器人」是一条直线：用户提问 → 模型回答 → 结束，三段依次点亮，没有回环——一次性交互。下半区「智能体」是一个环：顶部「感知 Perceive」读懂当前处境、右侧「决策 Decide」大脑想下一步、底部「行动 Act」调工具做事、左侧「观察 Observe」看结果，四个节点沿顺时针依次点亮，最后一条回边从观察连回感知形成闭环——智能体自己转圈、自主循环，直到把任务干完。可播放、暂停、单步、拖动进度查看。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="agl-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="agl-arrow-accent"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 上半区标题（聊天机器人）===== */}
          <text
            x={LINE_LEFT}
            y="36"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            聊天机器人：一条直线，问完即止
          </text>
          <text
            x={LINE_LEFT}
            y="56"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            一问一答，没有下一步——做不了需要多步推进的事
          </text>

          {/* 直线 3 段块：底框 + 高亮层（anime.js 点亮）+ 文字 */}
          {LINE_SEGS.map((seg, i) => {
            const x = lineX(i);
            return (
              <g key={seg.id}>
                <rect
                  x={x}
                  y={LINE_Y}
                  width={LINE_BOX_W}
                  height={LINE_BOX_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                <rect
                  ref={(el) => {
                    lineRefs.current[seg.id] = el;
                  }}
                  x={x}
                  y={LINE_Y}
                  width={LINE_BOX_W}
                  height={LINE_BOX_H}
                  rx="8"
                  fill={seg.color}
                  fillOpacity="0.16"
                  stroke={seg.color}
                  strokeWidth="2"
                  opacity="0"
                />
                <text
                  x={x + LINE_BOX_W / 2}
                  y={LINE_Y + LINE_BOX_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {seg.title}
                </text>
              </g>
            );
          })}

          {/* 直线段间箭头（从块 i 右缘到块 i+1 左缘） */}
          {[0, 1].map((i) => (
            <line
              key={`line-edge-${i}`}
              x1={lineX(i) + LINE_BOX_W}
              y1={LINE_Y + LINE_BOX_H / 2}
              x2={lineX(i + 1)}
              y2={LINE_Y + LINE_BOX_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
              markerEnd="url(#agl-arrow)"
              opacity="0.7"
            />
          ))}

          {/* ===== 分隔线 ===== */}
          <line
            x1="24"
            y1="172"
            x2={VIEW_W - 24}
            y2="172"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== 下半区标题（智能体）===== */}
          <text
            x="24"
            y="198"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            智能体：一个环，自己转圈把活干完
          </text>

          {/* —— 环上 4 段连线（弧形箭头，沿顺时针：感知→决策→行动→观察）—— */}
          {RING_NODES.map((n, i) => {
            const next = RING_NODES[(i + 1) % RING_NODES.length];
            // 闭环回边（观察→感知）单独画成高亮 accent 弧，这里只画前 3 段普通弧。
            if (i === RING_NODES.length - 1) return null;
            const from = nodeCenter(n.deg);
            const to = nodeCenter(next.deg);
            // 用大半径圆弧连接相邻节点中心，A 命令走圆周外侧（sweep=1 顺时针）。
            return (
              <path
                key={`ring-edge-${n.id}`}
                d={`M ${from.x.toFixed(1)} ${from.y.toFixed(1)} A ${RING_R} ${RING_R} 0 0 1 ${to.x.toFixed(1)} ${to.y.toFixed(1)}`}
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="1.6"
                markerEnd="url(#agl-arrow)"
                opacity="0.55"
              />
            );
          })}

          {/* —— 闭环回边：观察 → 感知（accent 高亮，anime.js 最后一步点亮）—— */}
          <path
            ref={loopEdgeRef}
            d={(() => {
              const from = nodeCenter(RING_NODES[3].deg); // 观察 left
              const to = nodeCenter(RING_NODES[0].deg); // 感知 top
              return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} A ${RING_R} ${RING_R} 0 0 1 ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
            })()}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.4"
            markerEnd="url(#agl-arrow-accent)"
            opacity="0.25"
          />

          {/* 圆心提示：「自主循环」 */}
          <text
            x={CX}
            y={CY - 6}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            自主循环
          </text>
          <text
            x={CX}
            y={CY + 14}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            转到任务完成才停
          </text>

          {/* —— 环上 4 节点：底框 + 高亮层（anime.js 驱动）+ 文字 —— */}
          {RING_NODES.map((n) => {
            const c = nodeCenter(n.deg);
            const x = c.x - NODE_W / 2;
            const y = c.y - NODE_H / 2;
            return (
              <g key={n.id}>
                <rect
                  x={x}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                <rect
                  ref={(el) => {
                    ringRefs.current[n.id] = el;
                  }}
                  x={x}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={n.color}
                  fillOpacity="0.14"
                  stroke={n.color}
                  strokeWidth="2"
                  opacity="0"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                <text
                  x={c.x}
                  y={y + 24}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {n.title}
                </text>
                <text
                  x={c.x}
                  y={y + 42}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先看上区：聊天机器人是一条问完即止的直线；再看下区：智能体感知→决策→行动→观察转成一个圈，自己循环把活干完。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        聊天机器人是一次性的直线（问→答→结束）；智能体把「感知—决策—行动—观察」连成一个自主循环，
        每观察一次就回到感知再来一轮，直到任务完成——这个循环就是智能体的灵魂。
      </figcaption>
    </figure>
  );
}
