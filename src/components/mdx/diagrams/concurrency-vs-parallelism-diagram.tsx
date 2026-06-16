"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ConcurrencyVsParallelismDiagram>：并发 vs 并行的「可控教学动画」旗舰图（HEL-229）。
 *
 * 餐厅后厨隐喻：任务 = 一道菜，灶台 = CPU 核，厨师在灶台上做菜。
 *  - 上半区「单核·并发」：只有一条灶台泳道，A、B 两道菜的小块交替排布
 *    （A1 B1 A2 B2 A3 B3）。一条竖直 playhead 从左扫到右，扫到哪块点亮哪块——
 *    一个厨师一个灶台轮流做两道菜：宏观像同时，微观是来回切换。
 *  - 下半区「双核·并行」：两条灶台泳道，灶台1 全做 A、灶台2 全做 B，
 *    playhead 扫过时两条同列同时点亮——两个厨师两个灶台真正同时做。
 *
 * 时间线 = 一条 anime.js timeline，分两段扫：先扫满并发 6 块（步 0..5），
 * 再把 playhead 拉回起点扫并行 3 列（步 6..8，每列上下两块一起亮）。
 * 每个 step 的 label 锚定在「对应方块点亮到最亮」的时刻（lit），
 * 与 ActivityLifecycleDiagram 同款写法，修正 label 落在淡入起点的 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经
 * useTeachingTimeline 内部动态 import 切独立 chunk（硬规则 2/6），本组件再经
 * mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

// —— 布局常量（viewBox 内坐标；间距均 4 的倍数，无魔法数字散落）——
const VIEW_W = 560;
const VIEW_H = 420;

// 三列的列心 x（并发交替块 / 并行同列块共用同一组 x 锚点，凸显「同一段时间」）。
// 并发是 6 块铺满一行，并行是 3 列各两块；为对齐演示，用 6 个 slot 排并发、
// 3 个宽 slot 排并行。两区各自独立排布、x 不必逐块对齐，重点在「交替 vs 同时」。
const BLOCK_H = 40;
const BLOCK_GAP = 8;

// 并发区：单灶台泳道，6 个等宽块交替 A/B。
const CONC_X = 120; // 泳道内容起点
const CONC_W = 416; // 泳道内容宽
const CONC_BLOCK_W = (CONC_W - 5 * BLOCK_GAP) / 6; // 6 块 + 5 间隙
const CONC_Y = 96; // 单泳道块的 y

// 并行区：两条灶台泳道，各 3 个块；同列上下对齐。
const PAR_X = 120;
const PAR_W = 416;
const PAR_COLS = 3;
const PAR_BLOCK_W = (PAR_W - (PAR_COLS - 1) * BLOCK_GAP) / PAR_COLS;
const PAR_Y1 = 268; // 灶台1（做 A）
const PAR_Y2 = PAR_Y1 + BLOCK_H + BLOCK_GAP; // 灶台2（做 B）

const A_COLOR = "var(--danger)"; // 任务 A（红）
const B_COLOR = "var(--success)"; // 任务 B（绿）

// 并发交替序列：A1 B1 A2 B2 A3 B3。
type ConcBlock = { id: string; label: string; color: string; x: number };
const CONC_BLOCKS: readonly ConcBlock[] = [
  {
    id: "c-a1",
    label: "A1",
    color: A_COLOR,
    x: CONC_X + 0 * (CONC_BLOCK_W + BLOCK_GAP),
  },
  {
    id: "c-b1",
    label: "B1",
    color: B_COLOR,
    x: CONC_X + 1 * (CONC_BLOCK_W + BLOCK_GAP),
  },
  {
    id: "c-a2",
    label: "A2",
    color: A_COLOR,
    x: CONC_X + 2 * (CONC_BLOCK_W + BLOCK_GAP),
  },
  {
    id: "c-b2",
    label: "B2",
    color: B_COLOR,
    x: CONC_X + 3 * (CONC_BLOCK_W + BLOCK_GAP),
  },
  {
    id: "c-a3",
    label: "A3",
    color: A_COLOR,
    x: CONC_X + 4 * (CONC_BLOCK_W + BLOCK_GAP),
  },
  {
    id: "c-b3",
    label: "B3",
    color: B_COLOR,
    x: CONC_X + 5 * (CONC_BLOCK_W + BLOCK_GAP),
  },
];

// 并行 3 列：每列灶台1 一块 A、灶台2 一块 B，同时点亮。
type ParCol = { id: string; aLabel: string; bLabel: string; x: number };
const PAR_COLS_DATA: readonly ParCol[] = [
  {
    id: "p-1",
    aLabel: "A1",
    bLabel: "B1",
    x: PAR_X + 0 * (PAR_BLOCK_W + BLOCK_GAP),
  },
  {
    id: "p-2",
    aLabel: "A2",
    bLabel: "B2",
    x: PAR_X + 1 * (PAR_BLOCK_W + BLOCK_GAP),
  },
  {
    id: "p-3",
    aLabel: "A3",
    bLabel: "B3",
    x: PAR_X + 2 * (PAR_BLOCK_W + BLOCK_GAP),
  },
];

// 关键帧步骤：先并发 6 步，再并行 3 步。caption 描述「当前点亮的是哪一步」。
const STEPS: readonly TeachingStep[] = [
  { label: "c-a1", caption: "单核·并发：灶台只做 A1——开始做第一道菜 A" },
  { label: "c-b1", caption: "单核·并发：切去做 B1——A 先放一边，转做菜 B" },
  { label: "c-a2", caption: "单核·并发：又切回 A2——再回来做菜 A" },
  { label: "c-b2", caption: "单核·并发：再切去 B2——同一个灶台来回轮流" },
  { label: "c-a3", caption: "单核·并发：A3——宏观看像同时，微观是飞快切换" },
  {
    label: "c-b3",
    caption: "单核·并发：B3——两道菜都在推进，但任一时刻只做一道",
  },
  {
    label: "p-1",
    caption: "双核·并行：灶台1 做 A1、灶台2 做 B1——两人同时开火",
  },
  {
    label: "p-2",
    caption: "双核·并行：A2 与 B2 同列同时——真正在同一时刻一起做",
  },
  { label: "p-3", caption: "双核·并行：A3 与 B3 收尾，两条泳道始终并肩推进" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// playhead 两段扫程的几何端点（左缘进、右缘出）。
const SWEEP_LEFT = CONC_X - BLOCK_GAP;
const SWEEP_RIGHT = CONC_X + CONC_W + BLOCK_GAP;

export function ConcurrencyVsParallelismDiagram() {
  // 并发交替块高亮层、并行上下两块高亮层、两条 playhead 的 DOM 引用。
  const concRefs = useRef<Record<string, SVGRectElement | null>>({});
  const parARefs = useRef<Record<string, SVGRectElement | null>>({});
  const parBRefs = useRef<Record<string, SVGRectElement | null>>({});
  const concPlayheadRef = useRef<SVGGElement | null>(null);
  const parPlayheadRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // —— 第一段：并发。playhead 从左扫到右，途中逐块点亮（6 beat）——
      // playhead 在 [0, 6*BEAT] 内匀速横扫整条并发泳道。
      if (concPlayheadRef.current) {
        tl.add(
          concPlayheadRef.current,
          {
            translateX: [SWEEP_LEFT, SWEEP_RIGHT],
            duration: TEACHING_BEAT_MS * 6,
            ease: "linear",
          },
          0,
        );
      }
      CONC_BLOCKS.forEach((b, i) => {
        const el = concRefs.current[b.id];
        if (!el) return;
        // 块 i 在 [BEAT*i, BEAT*(i+1)] 淡入，lit = 完全点亮时刻 = label 锚点。
        const lit = TEACHING_BEAT_MS * (i + 1);
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * i,
        );
        tl.label(b.label, lit);
      });

      // —— 第二段：并行。新的 playhead 从左扫到右，每列上下两块同时点亮（3 beat）——
      const parStart = TEACHING_BEAT_MS * 6;
      if (parPlayheadRef.current) {
        tl.add(
          parPlayheadRef.current,
          {
            translateX: [SWEEP_LEFT, SWEEP_RIGHT],
            duration: TEACHING_BEAT_MS * 3,
            ease: "linear",
          },
          parStart,
        );
      }
      PAR_COLS_DATA.forEach((col, i) => {
        const aEl = parARefs.current[col.id];
        const bEl = parBRefs.current[col.id];
        // 第 i 列在 [parStart + BEAT*i, parStart + BEAT*(i+1)] 淡入，lit = 点亮时刻。
        const colStart = parStart + TEACHING_BEAT_MS * i;
        const lit = parStart + TEACHING_BEAT_MS * (i + 1);
        if (aEl) {
          tl.add(
            aEl,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            colStart,
          );
        }
        if (bEl) {
          // 与 A 块同起同止 → 同一时刻一起亮，表达「同时」。
          tl.add(
            bEl,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            colStart,
          );
        }
        tl.label(col.id, lit);
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

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并发与并行的对照动画。上半区「单核·并发」：一条灶台泳道里任务 A 与任务 B 的小块交替排成 A1 B1 A2 B2 A3 B3，一条竖直扫描线从左到右扫过，扫到哪块哪块点亮——表示一个厨师在一个灶台上轮流做两道菜，宏观看像同时、微观上任一时刻只做一道。下半区「双核·并行」：两条灶台泳道，灶台1 全做 A、灶台2 全做 B，扫描线扫过时同一列的上下两块同时点亮——表示两个厨师在两个灶台上真正同时做。播放时先扫完上区再扫下区，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* ===== 上半区标题 + 图例 ===== */}
          <text
            x="16"
            y="32"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            单核 · 并发（Concurrency）
          </text>
          <text x="16" y="52" fontSize="11" fill="var(--text-secondary)">
            一个灶台轮流做 A、B 两道菜 — 任一时刻只做一道
          </text>

          {/* 图例：任务 A / 任务 B */}
          <rect
            x="392"
            y="22"
            width="12"
            height="12"
            rx="3"
            fill={A_COLOR}
            fillOpacity="0.85"
          />
          <text x="410" y="32" fontSize="11" fill="var(--text-secondary)">
            任务 A
          </text>
          <rect
            x="472"
            y="22"
            width="12"
            height="12"
            rx="3"
            fill={B_COLOR}
            fillOpacity="0.85"
          />
          <text x="490" y="32" fontSize="11" fill="var(--text-secondary)">
            任务 B
          </text>

          {/* 灶台标签（并发） */}
          <text
            x="16"
            y={CONC_Y + BLOCK_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            灶台
          </text>

          {/* 并发泳道底槽 */}
          <rect
            x={CONC_X - BLOCK_GAP}
            y={CONC_Y - BLOCK_GAP}
            width={CONC_W + 2 * BLOCK_GAP}
            height={BLOCK_H + 2 * BLOCK_GAP}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />

          {/* 并发交替块：底框（常驻低对比）+ 高亮层（anime.js 点亮）+ 文字 */}
          {CONC_BLOCKS.map((b) => (
            <g key={b.id}>
              <rect
                x={b.x}
                y={CONC_Y}
                width={CONC_BLOCK_W}
                height={BLOCK_H}
                rx="6"
                fill={b.color}
                fillOpacity="0.1"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <rect
                ref={(el) => {
                  concRefs.current[b.id] = el;
                }}
                x={b.x}
                y={CONC_Y}
                width={CONC_BLOCK_W}
                height={BLOCK_H}
                rx="6"
                fill={b.color}
                fillOpacity="0.35"
                stroke={b.color}
                strokeWidth="2"
                opacity="0"
              />
              <text
                x={b.x + CONC_BLOCK_W / 2}
                y={CONC_Y + BLOCK_H / 2 + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {b.label}
              </text>
            </g>
          ))}

          {/* 并发 playhead：竖直扫描线 + 顶部小三角，整体靠 translateX 横扫 */}
          <g
            ref={concPlayheadRef}
            style={{ transform: `translateX(${SWEEP_LEFT}px)` }}
          >
            <line
              x1="0"
              y1={CONC_Y - BLOCK_GAP - 6}
              x2="0"
              y2={CONC_Y + BLOCK_H + BLOCK_GAP + 6}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${CONC_Y - BLOCK_GAP - 6} L 5 ${CONC_Y - BLOCK_GAP - 6} L 0 ${CONC_Y - BLOCK_GAP - 1} z`}
              fill="var(--accent)"
            />
          </g>

          {/* 时间轴箭头（并发区下方）：标「时间 →」 */}
          <line
            x1={CONC_X - BLOCK_GAP}
            y1={CONC_Y + BLOCK_H + 36}
            x2={CONC_X + CONC_W + BLOCK_GAP}
            y2={CONC_Y + BLOCK_H + 36}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            markerEnd="url(#cvp-arrow)"
            opacity="0.6"
          />
          <text
            x={CONC_X + CONC_W + BLOCK_GAP}
            y={CONC_Y + BLOCK_H + 30}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            时间 →
          </text>

          {/* ===== 分隔线 ===== */}
          <line
            x1="16"
            y1="220"
            x2={VIEW_W - 16}
            y2="220"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== 下半区标题 ===== */}
          <text
            x="16"
            y="248"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            双核 · 并行（Parallelism）
          </text>

          {/* 灶台标签（并行） */}
          <text
            x="16"
            y={PAR_Y1 + BLOCK_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            灶台1
          </text>
          <text
            x="16"
            y={PAR_Y2 + BLOCK_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            灶台2
          </text>

          {/* 并行两条泳道底槽 */}
          <rect
            x={PAR_X - BLOCK_GAP}
            y={PAR_Y1 - BLOCK_GAP}
            width={PAR_W + 2 * BLOCK_GAP}
            height={BLOCK_H + 2 * BLOCK_GAP}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <rect
            x={PAR_X - BLOCK_GAP}
            y={PAR_Y2 - BLOCK_GAP}
            width={PAR_W + 2 * BLOCK_GAP}
            height={BLOCK_H + 2 * BLOCK_GAP}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />

          {/* 并行块：灶台1 全 A、灶台2 全 B，同列同时点亮 */}
          {PAR_COLS_DATA.map((col) => (
            <g key={col.id}>
              {/* 灶台1 的 A 块 */}
              <rect
                x={col.x}
                y={PAR_Y1}
                width={PAR_BLOCK_W}
                height={BLOCK_H}
                rx="6"
                fill={A_COLOR}
                fillOpacity="0.1"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <rect
                ref={(el) => {
                  parARefs.current[col.id] = el;
                }}
                x={col.x}
                y={PAR_Y1}
                width={PAR_BLOCK_W}
                height={BLOCK_H}
                rx="6"
                fill={A_COLOR}
                fillOpacity="0.35"
                stroke={A_COLOR}
                strokeWidth="2"
                opacity="0"
              />
              <text
                x={col.x + PAR_BLOCK_W / 2}
                y={PAR_Y1 + BLOCK_H / 2 + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {col.aLabel}
              </text>

              {/* 灶台2 的 B 块 */}
              <rect
                x={col.x}
                y={PAR_Y2}
                width={PAR_BLOCK_W}
                height={BLOCK_H}
                rx="6"
                fill={B_COLOR}
                fillOpacity="0.1"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <rect
                ref={(el) => {
                  parBRefs.current[col.id] = el;
                }}
                x={col.x}
                y={PAR_Y2}
                width={PAR_BLOCK_W}
                height={BLOCK_H}
                rx="6"
                fill={B_COLOR}
                fillOpacity="0.35"
                stroke={B_COLOR}
                strokeWidth="2"
                opacity="0"
              />
              <text
                x={col.x + PAR_BLOCK_W / 2}
                y={PAR_Y2 + BLOCK_H / 2 + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {col.bLabel}
              </text>
            </g>
          ))}

          {/* 并行 playhead：一条贯穿上下两泳道的竖线 + 顶部三角 */}
          <g
            ref={parPlayheadRef}
            style={{ transform: `translateX(${SWEEP_LEFT}px)` }}
          >
            <line
              x1="0"
              y1={PAR_Y1 - BLOCK_GAP - 6}
              x2="0"
              y2={PAR_Y2 + BLOCK_H + BLOCK_GAP + 6}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${PAR_Y1 - BLOCK_GAP - 6} L 5 ${PAR_Y1 - BLOCK_GAP - 6} L 0 ${PAR_Y1 - BLOCK_GAP - 1} z`}
              fill="var(--accent)"
            />
          </g>

          <defs>
            <marker
              id="cvp-arrow"
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
          caption="先看上区：一个灶台轮流切换两道菜（并发）；再看下区：两个灶台同时各做一道（并行）。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发 vs
        并行：并发是「一个灶台来回切换、看起来同时」，并行是「两个灶台真正同时」。
        单核机器上多任务靠飞快切换造出并发的错觉，多核机器才能真正并行。
      </figcaption>
    </figure>
  );
}
