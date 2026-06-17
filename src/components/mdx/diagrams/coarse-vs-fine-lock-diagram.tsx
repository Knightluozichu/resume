"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <CoarseVsFineLockDiagram>：粗粒度锁 vs 细粒度锁的对照动画（HEL-235，§5 主 Demo）。
 *
 * 餐厅后厨隐喻：
 *  - 上区「粗粒度」= 整个后厨只有一把总钥匙：谁进去操作谁就锁全场，别的厨师全在门口等
 *    → 三个线程的操作被强行串行，吞吐低。
 *  - 下区「细粒度」= 每个操作台各配一把小锁：动不同台子的厨师互不干扰、可同时开工
 *    → 线程 A 动块1、线程 B 动块3 并行；只有撞同一块（C 也要块1）才排队等。
 *
 * 可视化核心：把一把大锁拆成多把小锁，不冲突的操作就能并行——同样三个操作，
 * 粗粒度铺满整条时间轴（串行），细粒度挤在前段就做完（并行），一眼看出吞吐差距。
 *
 * 时间线 = 一条 anime.js timeline，分 6 个关键帧分步点亮上、下两区的操作块，
 * 每个 step 的 label 锚定在「对应块点亮到最亮」的时刻（lit = beat*(i+1)），
 * 与 MutexSerializeDiagram / DeadlockCycleDiagram 同款写法，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时
 * next/dynamic(ssr:false) 懒加载，不进首屏。
 *
 * 视觉全部 DESIGN token（accent / success / warning / danger / border / bg / text-*），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 660;
const VIEW_H = 360;

// 时间轴内容区横向范围（左侧留给区/泳道标签）。
const TRACK_X = 116;
const SLOT_W = 150; // 一个「操作块」的标称宽（占满 1 个时间单位）
const ROW_H = 34;

// 上区（粗粒度）：单条「后厨总钥匙」泳道，三个操作首尾相接占满 3 个时间单位。
const COARSE_Y = 70;

// 下区（细粒度）：三条小锁泳道（块1/块2/块3），不同块可在同一时间并行。
const FINE_Y0 = 200; // 第一条泳道 y
const FINE_GAP = ROW_H + 12;
const fineRowY = (i: number) => FINE_Y0 + i * FINE_GAP;

const A_COLOR = "var(--accent)"; // 线程 A
const B_COLOR = "var(--success)"; // 线程 B
const C_COLOR = "var(--warning)"; // 线程 C
const WAIT_COLOR = "var(--danger)"; // 阻塞等待

// 时间单位 → x。t 从 0 起，宽度 span 个单位。
const slotX = (t: number) => TRACK_X + t * SLOT_W;

type Block = {
  id: string;
  y: number;
  startT: number; // 起始时间单位
  span: number; // 占几个时间单位
  color: string;
  text: string;
  wait?: boolean; // 阻塞等待块（虚线 + 红）
};

// 上区粗粒度：A、B、C 三段串行铺满 t=0..3（同一把大锁，谁占谁锁全场）。
const COARSE_BLOCKS: readonly Block[] = [
  {
    id: "coarse-a",
    y: COARSE_Y,
    startT: 0,
    span: 1,
    color: A_COLOR,
    text: "A 操作",
  },
  {
    id: "coarse-wait",
    y: COARSE_Y,
    startT: 1,
    span: 2,
    color: WAIT_COLOR,
    text: "B、C 全在门口等",
    wait: true,
  },
];

// 下区细粒度：A 动块1、B 动块3 → t=0 并行；C 也要块1 → 撞 A，等到 t=1 才能动。
const FINE_BLOCKS: readonly Block[] = [
  {
    id: "fine-a",
    y: fineRowY(0),
    startT: 0,
    span: 1,
    color: A_COLOR,
    text: "A 操作",
  },
  {
    id: "fine-b",
    y: fineRowY(2),
    startT: 0,
    span: 1,
    color: B_COLOR,
    text: "B 操作",
  },
  {
    id: "fine-c-wait",
    y: fineRowY(0),
    startT: 1,
    span: 1,
    color: WAIT_COLOR,
    text: "C 等 A 放块1",
    wait: true,
  },
  {
    id: "fine-c",
    y: fineRowY(0),
    startT: 2,
    span: 1,
    color: C_COLOR,
    text: "C 操作",
  },
];

// 关键帧叙事顺序（与点亮 beat 对齐；BEAT 即 STEPS 下标）。
const STEPS: readonly TeachingStep[] = [
  {
    label: "coarse-a",
    caption: "粗粒度：A 拿到唯一的总钥匙，锁住整个结构开始操作",
  },
  {
    label: "coarse-wait",
    caption: "B、C 想动别的部分也没用——总钥匙在 A 手里，全在门口干等（串行）",
  },
  {
    label: "fine-a",
    caption: "细粒度：每个操作台一把小锁。A 拿块1 的小锁开始操作",
  },
  {
    label: "fine-b",
    caption: "B 要动的是块3、另一把锁——和 A 互不干扰，同一时刻并行开工",
  },
  {
    label: "fine-c-wait",
    caption: "C 也要块1，撞上 A 的小锁——只有它得等（只为这一块排队）",
  },
  {
    label: "fine-c",
    caption:
      "A 放开块1，C 立刻接手。同样三个操作，细粒度挤在前段就干完，吞吐高得多",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

const ALL_BLOCKS = [...COARSE_BLOCKS, ...FINE_BLOCKS];

// playhead 扫程端点（覆盖两区全部时间单位 t=0..3）。
const SWEEP_LEFT = TRACK_X - 8;
const SWEEP_RIGHT = slotX(3) + 8;

export function CoarseVsFineLockDiagram() {
  const blockRefs = useRef<Record<string, SVGGElement | null>>({});
  const playheadRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // playhead 横扫全部 6 beat。
      if (playheadRef.current) {
        tl.add(
          playheadRef.current,
          {
            translateX: [SWEEP_LEFT, SWEEP_RIGHT],
            duration: TEACHING_BEAT_MS * STEPS.length,
            ease: "linear",
          },
          0,
        );
      }
      ALL_BLOCKS.forEach((blk) => {
        const el = blockRefs.current[blk.id];
        if (!el) return;
        const beat = BEAT_OF[blk.id] ?? 0;
        const lit = TEACHING_BEAT_MS * (beat + 1);
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
        tl.label(blk.id, lit);
      });
    },
  });

  const blockRect = (blk: Block) => {
    const x = slotX(blk.startT);
    const w = blk.span * SLOT_W - 6;
    return { x, y: blk.y, w, h: ROW_H };
  };

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
          aria-label="粗粒度锁与细粒度锁的吞吐对照动画。上半区是粗粒度：整个数据结构只有一把总钥匙，线程 A 拿到它就锁住整个结构，线程 B、C 哪怕想动别的部分也只能在门口等，三个操作被强行串行，铺满整条时间轴，吞吐低。下半区是细粒度：每个操作台各配一把小锁，线程 A 拿块1 的锁、线程 B 拿块3 的锁，互不干扰、在同一时刻并行开工；线程 C 也要块1，撞上 A 的锁，只有它需要排队等到 A 放开块1 才接手。同样三个操作，细粒度挤在前段就做完，吞吐明显高于粗粒度。播放时 playhead 从左向右横扫，依次点亮各操作块，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <defs>
            <marker
              id="cvf-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 上区标题 */}
          <text
            x="20"
            y="32"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            粗粒度锁：一把总钥匙锁全场
          </text>
          <text x="20" y="50" fontSize="11" fill="var(--text-secondary)">
            谁进谁锁整个结构，别人全等——串行，吞吐低
          </text>

          {/* 上区泳道标签 */}
          <text
            x="20"
            y={COARSE_Y + ROW_H / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            整把大锁
          </text>

          {/* 上区底层常驻轨 */}
          <rect
            x={TRACK_X}
            y={COARSE_Y}
            width={3 * SLOT_W - 6}
            height={ROW_H}
            rx="6"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* 上区块（高亮层 anime.js 点亮） */}
          {COARSE_BLOCKS.map((blk) => {
            const { x, y, w, h } = blockRect(blk);
            return (
              <g
                key={blk.id}
                ref={(el) => {
                  blockRefs.current[blk.id] = el;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="6"
                  fill={blk.color}
                  fillOpacity={blk.wait ? 0.14 : 0.28}
                  stroke={blk.color}
                  strokeWidth="2"
                  strokeDasharray={blk.wait ? "5 4" : undefined}
                />
                <text
                  x={x + w / 2}
                  y={y + h / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {blk.text}
                </text>
              </g>
            );
          })}

          {/* 分隔线 */}
          <line
            x1="20"
            y1="150"
            x2={VIEW_W - 20}
            y2="150"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />

          {/* 下区标题 */}
          <text
            x="20"
            y="178"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            细粒度锁：每个操作台一把小锁
          </text>

          {/* 下区三条泳道标签 + 底层轨 */}
          {["块1（A、C 争用）", "块2", "块3"].map((name, i) => (
            <g key={name}>
              <text
                x="20"
                y={fineRowY(i) + ROW_H / 2 + 4}
                fontSize="11"
                fontWeight="600"
                fill="var(--text-secondary)"
              >
                {name}
              </text>
              <rect
                x={TRACK_X}
                y={fineRowY(i)}
                width={3 * SLOT_W - 6}
                height={ROW_H}
                rx="6"
                fill="var(--text-secondary)"
                fillOpacity="0.06"
                stroke="var(--border)"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* 下区块（高亮层 anime.js 点亮） */}
          {FINE_BLOCKS.map((blk) => {
            const { x, y, w, h } = blockRect(blk);
            return (
              <g
                key={blk.id}
                ref={(el) => {
                  blockRefs.current[blk.id] = el;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="6"
                  fill={blk.color}
                  fillOpacity={blk.wait ? 0.14 : 0.28}
                  stroke={blk.color}
                  strokeWidth="2"
                  strokeDasharray={blk.wait ? "5 4" : undefined}
                />
                <text
                  x={x + w / 2}
                  y={y + h / 2 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {blk.text}
                </text>
              </g>
            );
          })}

          {/* 时间轴（底部） */}
          <line
            x1={SWEEP_LEFT}
            y1={fineRowY(2) + ROW_H + 20}
            x2={SWEEP_RIGHT}
            y2={fineRowY(2) + ROW_H + 20}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            markerEnd="url(#cvf-arrow)"
            opacity="0.6"
          />
          <text
            x={SWEEP_RIGHT}
            y={fineRowY(2) + ROW_H + 14}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            时间 →
          </text>

          {/* playhead（贯穿两区） */}
          <g
            ref={playheadRef}
            style={{ transform: `translateX(${SWEEP_LEFT}px)` }}
          >
            <line
              x1="0"
              y1={COARSE_Y - 8}
              x2="0"
              y2={fineRowY(2) + ROW_H + 8}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${COARSE_Y - 8} L 5 ${COARSE_Y - 8} L 0 ${COARSE_Y - 3} z`}
              fill="var(--accent)"
            />
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="同样三个操作：粗粒度（一把大锁）铺满整条时间轴串行做完；细粒度（多把小锁）不冲突的并行、只有撞同一块才等——挤在前段就干完。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        粗粒度锁像后厨只有一把总钥匙——谁进谁锁全场，别人全等；细粒度锁像每个操作台
        各配一把小锁——动不同台子的厨师可同时开工，只有撞同一台才排队。把一把大锁拆成
        多把小锁，就是用更复杂的加锁换更高的并发。
      </figcaption>
    </figure>
  );
}
