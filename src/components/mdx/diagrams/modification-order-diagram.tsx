"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ModificationOrderDiagram>：单个原子变量的「修改顺序」全序动画（HEL-233）。
 *
 * 餐厅后厨隐喻：原子变量 x = 账上的一条账目；它的「修改顺序」= 这一条账目的官方
 * 流水台账。三个厨师（线程）各自对 x 改了几笔（x=1、x=2、x=3…），可他们动手的
 * 先后随调度乱成一团。可台账上每一笔写入都会落到唯一一条时间线上，排成一个
 * 全序——所有厨师回头看这条账目的改动先后，看法完全一致。
 *
 * 上区：三条线程泳道，各自冒出自己那几笔写入（散乱、不同时）。
 * 下区：一条「修改顺序」全序时间线，每写一笔就按真实发生顺序落到线上排成一串。
 * 强调：这是「单变量」的全序（对 x 一个对象），不是跨变量的内存序（ch6 再讲）。
 *
 * 时间线 = 一条 anime.js timeline，6 拍：每拍点亮「某线程发出的一笔写入」+
 * 「它落到全序线上的那一格」。label 锚定在「该格点亮到最亮」时刻（lit = beat 累加），
 * 与 CondVarWaitNotifyDiagram 同款写法，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 动态
 * import 切独立 chunk（硬规则 2/6），经 mdx-components 注册后 page 侧懒加载。
 *
 * 视觉全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 600;
const VIEW_H = 392; // 全序时间轴在 ORDER_Y+CELL_H+34=358，留 ~34px 到底边

// 上区三条线程泳道。
const LANE_X = 116;
const LANE_W = 460; // 内容右缘 576，到 viewBox 右缘 600 留 24px
const LANE_H = 36;
const T1_Y = 76;
const T2_Y = T1_Y + LANE_H + 12;
const T3_Y = T2_Y + LANE_H + 12;

// 下区「修改顺序」全序，6 格等宽串成一条线。
const ORDER_Y = 268;
const ORDER_N = 6;
const CELL_GAP = 8;
const CELL_W = (LANE_W - (ORDER_N - 1) * CELL_GAP) / ORDER_N;
const CELL_H = 44;
const cellX = (i: number) => LANE_X + i * (CELL_W + CELL_GAP);

const T1_COLOR = "var(--accent)"; // 厨师1
const T2_COLOR = "var(--success)"; // 厨师2
const T3_COLOR = "var(--warning)"; // 厨师3

// 每一笔写入：哪个线程发出（决定颜色与上区泳道）、写成什么值、它在全序里的位次。
type Write = {
  id: string;
  thread: 1 | 2 | 3;
  y: number;
  color: string;
  laneSlot: number; // 该线程泳道内第几个槽（同线程内左右排开）
  value: number; // x 被写成的值
  orderIndex: number; // 落到全序的第几格（即真实发生先后）
};

// 三个线程各写 2 笔，真实发生顺序（全序）：T1=1, T2=2, T1=3, T3=4, T2=5, T3=6。
// 上区每条泳道内，同线程的两笔按各自先后左右排开（laneSlot 0/1），凸显「线程内有序」；
// 但跨线程的总先后由 orderIndex 给出，落到下区全序线。
const WRITES: readonly Write[] = [
  {
    id: "w1",
    thread: 1,
    y: T1_Y,
    color: T1_COLOR,
    laneSlot: 0,
    value: 1,
    orderIndex: 0,
  },
  {
    id: "w2",
    thread: 2,
    y: T2_Y,
    color: T2_COLOR,
    laneSlot: 0,
    value: 2,
    orderIndex: 1,
  },
  {
    id: "w3",
    thread: 1,
    y: T1_Y,
    color: T1_COLOR,
    laneSlot: 1,
    value: 3,
    orderIndex: 2,
  },
  {
    id: "w4",
    thread: 3,
    y: T3_Y,
    color: T3_COLOR,
    laneSlot: 0,
    value: 4,
    orderIndex: 3,
  },
  {
    id: "w5",
    thread: 2,
    y: T2_Y,
    color: T2_COLOR,
    laneSlot: 1,
    value: 5,
    orderIndex: 4,
  },
  {
    id: "w6",
    thread: 3,
    y: T3_Y,
    color: T3_COLOR,
    laneSlot: 1,
    value: 6,
    orderIndex: 5,
  },
];

// 上区泳道内一笔写入的 x（同线程两笔分别放在泳道前段 / 后段，留间隙）。
const laneWriteX = (laneSlot: number) => LANE_X + 16 + laneSlot * (LANE_W / 2);
const LANE_WRITE_W = LANE_W / 2 - 32;

const STEPS: readonly TeachingStep[] = [
  {
    label: "w1",
    caption: "厨师1 写 x=1——这笔最先落账，排进全序第 1 位",
  },
  {
    label: "w2",
    caption: "厨师2 写 x=2——紧接着落账，全序第 2 位",
  },
  {
    label: "w3",
    caption: "厨师1 又写 x=3——同一线程内它一定在 x=1 之后，全序第 3 位",
  },
  {
    label: "w4",
    caption: "厨师3 写 x=4——插进来，全序第 4 位",
  },
  {
    label: "w5",
    caption: "厨师2 再写 x=5——全序第 5 位",
  },
  {
    label: "w6",
    caption: "厨师3 写 x=6 收尾。这条「修改顺序」全序，三个线程看法完全一致 ✓",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

export function ModificationOrderDiagram() {
  // 上区每笔写入块 + 下区每格全序的高亮层引用。
  const laneRefs = useRef<Record<string, SVGGElement | null>>({});
  const orderRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      WRITES.forEach((w) => {
        const beat = BEAT_OF[w.id] ?? 0;
        const start = TEACHING_BEAT_MS * beat;
        const lit = TEACHING_BEAT_MS * (beat + 1);
        const laneEl = laneRefs.current[w.id];
        const orderEl = orderRefs.current[w.id];
        if (laneEl) {
          tl.add(
            laneEl,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            start,
          );
        }
        if (orderEl) {
          // 全序格与上区写入块同起同止：写出来就同步落到台账上。
          tl.add(
            orderEl,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            start,
          );
        }
        tl.label(w.id, lit);
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
          aria-label="单个原子变量修改顺序的全序动画。上半区是三条线程泳道，三个线程各自对同一个原子变量 x 写了两笔，先后散乱。下半区是一条修改顺序的全序时间线，每写一笔就按真实发生的先后落到线上排成一串：x 等于 1、2、3、4、5、6。强调对这一个变量 x 的所有写入存在唯一一个所有线程都认同的先后顺序，且同一线程内的写入在全序里一定保持本线程内的先后。这是单变量的全序，不是跨变量的内存序。播放时依次点亮每一笔写入及它落到全序线上的格子，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* 标题 */}
          <text
            x="20"
            y="30"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            修改顺序：一条账目的官方流水台账
          </text>
          <text x="20" y="50" fontSize="11" fill="var(--text-secondary)">
            三个线程乱序写同一个原子变量 x，但对 x 的所有写入有唯一全序
          </text>

          {/* ===== 上区：三条线程泳道 ===== */}
          {[
            { y: T1_Y, label: "线程1", color: T1_COLOR },
            { y: T2_Y, label: "线程2", color: T2_COLOR },
            { y: T3_Y, label: "线程3", color: T3_COLOR },
          ].map((lane) => (
            <g key={lane.label}>
              <text
                x="20"
                y={lane.y + LANE_H / 2 + 4}
                fontSize="12"
                fontWeight="600"
                fill={lane.color}
              >
                {lane.label}
              </text>
              <rect
                x={LANE_X}
                y={lane.y}
                width={LANE_W}
                height={LANE_H}
                rx="6"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* 上区每笔写入块（散乱排布，按线程上色） */}
          {WRITES.map((w) => (
            <g
              key={w.id}
              ref={(el) => {
                laneRefs.current[w.id] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect
                x={laneWriteX(w.laneSlot)}
                y={w.y + 4}
                width={LANE_WRITE_W}
                height={LANE_H - 8}
                rx="5"
                fill={w.color}
                fillOpacity="0.26"
                stroke={w.color}
                strokeWidth="2"
              />
              <text
                x={laneWriteX(w.laneSlot) + LANE_WRITE_W / 2}
                y={w.y + LANE_H / 2 + 4}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {`x = ${w.value}`}
              </text>
            </g>
          ))}

          {/* ===== 中间：向下汇聚的提示 ===== */}
          <text
            x={VIEW_W / 2}
            y="240"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            ↓ 所有写入按真实发生先后，落到同一条全序线 ↓
          </text>

          {/* ===== 下区：修改顺序全序线 ===== */}
          <text
            x="20"
            y={ORDER_Y - 14}
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            x 的修改顺序（全序，所有线程一致）
          </text>

          {/* 全序底线 */}
          <line
            x1={LANE_X}
            y1={ORDER_Y + CELL_H / 2}
            x2={LANE_X + LANE_W}
            y2={ORDER_Y + CELL_H / 2}
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* 全序每格：底框常驻 + 高亮层（点亮）+ 序号 + 值 */}
          {WRITES.map((w) => {
            const x = cellX(w.orderIndex);
            return (
              <g key={`order-${w.id}`}>
                {/* 底框常驻 */}
                <rect
                  x={x}
                  y={ORDER_Y}
                  width={CELL_W}
                  height={CELL_H}
                  rx="6"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                {/* 高亮层 */}
                <g
                  ref={(el) => {
                    orderRefs.current[w.id] = el;
                  }}
                  style={{ opacity: 0 }}
                >
                  <rect
                    x={x}
                    y={ORDER_Y}
                    width={CELL_W}
                    height={CELL_H}
                    rx="6"
                    fill={w.color}
                    fillOpacity="0.28"
                    stroke={w.color}
                    strokeWidth="2"
                  />
                  <text
                    x={x + CELL_W / 2}
                    y={ORDER_Y + 18}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {`第 ${w.orderIndex + 1} 笔`}
                  </text>
                  <text
                    x={x + CELL_W / 2}
                    y={ORDER_Y + 36}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    fill="var(--text-primary)"
                  >
                    {`x=${w.value}`}
                  </text>
                </g>
              </g>
            );
          })}

          {/* 全序时间轴箭头 */}
          <line
            x1={LANE_X}
            y1={ORDER_Y + CELL_H + 22}
            x2={LANE_X + LANE_W}
            y2={ORDER_Y + CELL_H + 22}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            markerEnd="url(#mod-arrow)"
            opacity="0.6"
          />
          <text
            x={LANE_X + LANE_W}
            y={ORDER_Y + CELL_H + 16}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            先 → 后
          </text>

          <defs>
            <marker
              id="mod-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="三个线程乱序写同一个原子变量 x，但每写一笔就落到下方唯一一条全序线上——这条「修改顺序」所有线程看法一致。注意这是单变量全序，不是跨变量内存序。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        修改顺序（modification order）：对任意一个对象（这里是原子变量
        x），它的所有写入存在唯一一个全序，所有线程对这条「流水台账」的先后看法完全一致。注意这是单个变量的全序，不是跨多个变量的内存序——后者下一章再讲。
      </figcaption>
    </figure>
  );
}
