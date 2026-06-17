"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <HandOverHandDiagram>：细粒度链表的「交替加锁」攀爬动画（HEL-235，§3 引出 / §5 辅 Demo）。
 *
 * 餐厅后厨隐喻：一条长料理台被分成 4 格（node1→node2→node3→node4）。厨师要沿台子
 * 从头走到尾，但绝不一把锁住整条台子（那就退化成粗粒度了）。它「手递手」地挪：
 *  - 先握住 node1 的锁；
 *  - 要去 node2，先伸手握住 node2 的锁，**再**松开 node1（握住下一格才松开当前格）；
 *  - 如此 node2→node3、node3→node4 逐格挪。
 * 故名 hand-over-hand（交替加锁）：任一时刻最多同时握「相邻两格」的锁，从不锁全表。
 *
 * 可视化核心：每一拍点亮「当前正握着哪两个相邻节点的锁」（或起步时只握一个），
 * 让读者看清细粒度链表如何在不锁全表的前提下安全遍历——别的线程能操作它没握住的节点。
 *
 * 时间线 = 一条 anime.js timeline，6 个关键帧。用一个常驻的「高亮框」(glow) 随节点平移，
 * 配合每拍「握住哪些锁」的状态点亮节点锁标记。每个 step 的 label 锚定在「该拍点亮到最亮」
 * 的时刻（lit = beat*(i+1)），与 MutexSerializeDiagram 同款写法，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时
 * next/dynamic(ssr:false) 懒加载，不进首屏。
 *
 * 视觉全部 DESIGN token（accent / success / warning / border / bg / text-*），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 660;
const VIEW_H = 256;

// 4 个节点横排。
const NODE_W = 116;
const NODE_H = 64;
const NODE_GAP = 28;
const NODE_Y = 96;
const FIRST_X = 32;
const nodeX = (i: number) => FIRST_X + i * (NODE_W + NODE_GAP);
const nodeCx = (i: number) => nodeX(i) + NODE_W / 2;

const HOLD_COLOR = "var(--accent)"; // 当前握住的锁（高亮）
const LIST_COLOR = "var(--text-secondary)";

// 每一拍：当前握着哪些节点下标的锁（最多相邻两个）+ 解说。
type HohStep = TeachingStep & { held: readonly number[] };

const STEPS: readonly HohStep[] = [
  {
    label: "lock-0",
    held: [0],
    caption: "① 先锁住 node1：开始遍历，手里只握着第一格的锁",
  },
  {
    label: "lock-0-1",
    held: [0, 1],
    caption: "② 要去 node2，先伸手锁住 node2——此刻同时握着 node1、node2 两把锁",
  },
  {
    label: "lock-1",
    held: [1],
    caption:
      "③ 握住了 node2，这才松开 node1（hand-over-hand：握下一个才放当前）",
  },
  {
    label: "lock-1-2",
    held: [1, 2],
    caption: "④ 要去 node3，先锁住 node3——此刻同时握着 node2、node3 两把锁",
  },
  {
    label: "lock-2",
    held: [2],
    caption: "⑤ 握住了 node3，松开 node2——任一刻最多只锁相邻两格，从不锁全表",
  },
  {
    label: "lock-2-3",
    held: [2, 3],
    caption:
      "⑥ 同理锁 node4、放 node3，逐格挪到尾。全程别的线程能动你没握住的节点",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 每个节点在「第 beat 拍」是否被握住：用于查表点亮。
const HELD_AT: readonly (readonly number[])[] = STEPS.map((s) => s.held);

export function HandOverHandDiagram() {
  // 每个节点一个「锁高亮层」ref（key = `n{node}` ），每拍按是否握住做 opacity 动画。
  const lockRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 对每个节点：在每一拍设定它的「握住」高亮 opacity 目标（1 握 / 0 放）。
      // anime.js 按 beat 顺序排动画，label 锚在「该拍最亮」时刻。
      STEPS.forEach((step, beat) => {
        const lit = TEACHING_BEAT_MS * (beat + 1);
        const heldThisBeat = HELD_AT[beat];
        for (let n = 0; n < 4; n++) {
          const el = lockRefs.current[`n${n}`];
          if (!el) continue;
          const target = heldThisBeat.includes(n) ? 1 : 0;
          tl.add(
            el,
            { opacity: target, duration: TEACHING_BEAT_MS, ease: "out(3)" },
            TEACHING_BEAT_MS * beat,
          );
        }
        tl.label(step.label, lit);
      });
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="细粒度链表的交替加锁（hand-over-hand）遍历动画。一条链表有四个节点 node1 到 node4 依次相连。线程沿链表从头遍历：第一步只锁住 node1；第二步要去 node2，先锁住 node2，此刻同时握着 node1 和 node2 两把锁；第三步握住了 node2 才松开 node1，握住下一个才放开当前的，这就是 hand-over-hand 交替加锁；第四步锁 node3、第五步放 node2、第六步锁 node4 放 node3，逐节点挪到尾。任一时刻最多只锁相邻两个节点，从不锁住整张表，所以别的线程能同时操作它没握住的节点。播放时按六步依次点亮当前握着哪些节点的锁，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <defs>
            <marker
              id="hoh-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L7 3.5 L0 7 z" fill={LIST_COLOR} />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x="20"
            y="32"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            hand-over-hand：握住下一格，才松开当前格
          </text>
          <text x="20" y="52" fontSize="11" fill="var(--text-secondary)">
            细粒度链表逐节点加解锁——任一刻最多锁相邻两节点，从不锁全表
          </text>

          {/* next 指针箭头（节点之间，常驻） */}
          {[0, 1, 2].map((i) => (
            <line
              key={`edge-${i}`}
              x1={nodeX(i) + NODE_W}
              y1={NODE_Y + NODE_H / 2}
              x2={nodeX(i + 1) - 4}
              y2={NODE_Y + NODE_H / 2}
              stroke={LIST_COLOR}
              strokeWidth="1.8"
              markerEnd="url(#hoh-arrow)"
              opacity="0.7"
            />
          ))}

          {/* 四个节点：底层常驻框 + 锁高亮层（anime.js 点亮） */}
          {[0, 1, 2, 3].map((i) => (
            <g key={`node-${i}`}>
              {/* 底层常驻 */}
              <rect
                x={nodeX(i)}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill="var(--text-secondary)"
                fillOpacity="0.06"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={nodeCx(i)}
                y={NODE_Y + 28}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {`node${i + 1}`}
              </text>
              <text
                x={nodeCx(i)}
                y={NODE_Y + 46}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {`第 ${i + 1} 格`}
              </text>

              {/* 锁高亮层：握住该节点时点亮（描边 + 锁徽标在框上方） */}
              <g
                ref={(el) => {
                  lockRefs.current[`n${i}`] = el;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x={nodeX(i)}
                  y={NODE_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={HOLD_COLOR}
                  fillOpacity="0.16"
                  stroke={HOLD_COLOR}
                  strokeWidth="2.6"
                />
                {/* 锁徽标：放在节点正上方，不与节点文字重叠 */}
                <rect
                  x={nodeCx(i) - 26}
                  y={NODE_Y - 28}
                  width="52"
                  height="20"
                  rx="6"
                  fill="var(--bg)"
                  stroke={HOLD_COLOR}
                  strokeWidth="1.4"
                />
                <text
                  x={nodeCx(i)}
                  y={NODE_Y - 14}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill={HOLD_COLOR}
                >
                  🔒 已锁
                </text>
              </g>
            </g>
          ))}

          {/* 底部说明 */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 20}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            高亮框 = 此刻握着锁的节点；从不出现「四格全亮」——那才是锁全表
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先锁 node1 → 锁 node2 再放 node1 → 锁 node3 再放 node2 → ……握住下一格才松开当前格，逐节点挪到尾，从不锁全表。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        hand-over-hand（交替加锁）像沿一条长料理台逐格挪：握住下一格的锁，才松开当前格的锁。
        任一时刻最多只锁住相邻两个节点，从不锁住整条链表——别的线程能同时操作你没握住的节点，
        这就是细粒度链表比「一把大锁锁全表」并发度高的原因。
      </figcaption>
    </figure>
  );
}
