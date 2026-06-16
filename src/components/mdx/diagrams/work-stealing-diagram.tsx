"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <WorkStealingDiagram>：工作窃取（work stealing）的动画（HEL-238，§5 辅 Demo）。
 *
 * 餐厅后厨隐喻：每个帮厨手边有自己的一小筐活儿（本地双端队列）。自己筐空了，就去
 * 隔壁忙不过来的同事筐尾巴上偷一张活干——全队不闲着。
 *
 * 布局：横排三个 worker，各有一条本地双端队列（deque）。worker0 筐里堆了 3 张活、还在忙；
 * worker1 有 1 张；worker2 筐空了、闲着。分 4 拍：
 *  ① 各 worker 从「自己队列的本端（front）」取任务做（LIFO，本地无争用）；
 *  ② worker2 筐空了 → 闲下来（高亮「空了」）；
 *  ③ worker2 去 worker0「队列另一端（tail/尾）」偷一张（steal，一条偷取箭头）；
 *  ④ 偷到的活在 worker2 手里跑起来——全队都不闲着，负载被均衡。
 *
 * 可视化核心：本地队列减少争用（各取各的本端）+ 工作窃取从队尾偷来均衡负载。
 *
 * 时间线 = anime.js timeline，playhead 横扫 4 拍分段点亮（每拍一个快照覆盖层）。
 * label 锚定「点亮到最亮」时刻（lit = beat*(i+1)），同款写法。
 *
 * 视觉全部 DESIGN token，无裸 hex；时长走 TEACHING_BEAT_MS（硬规则 5）。
 */

const VIEW_W = 660;
const VIEW_H = 322;

// 三个 worker 横排，各占一列。
const WORKER_LABELS = ["worker0", "worker1", "worker2"] as const;
const COL_W = 190;
const COL_GAP = 25;
const COL_X0 = 22;
const colX = (i: number) => COL_X0 + i * (COL_W + COL_GAP);

// 队列方块竖排：本端（front，上）在上，尾端（tail，下）在下。
const CELL_W = 150;
const CELL_H = 36;
const CELL_GAP = 8;
const QUEUE_TOP = 96; // 第一格（front）顶部
const cellY = (slot: number) => QUEUE_TOP + slot * (CELL_H + CELL_GAP);
const cellX = (col: number) => colX(col) + (COL_W - CELL_W) / 2;

const BUSY_COLOR = "var(--success)"; // 本地在干
const STEAL_COLOR = "var(--accent)"; // 偷取动作
const IDLE_COLOR = "var(--warning)"; // 空闲 / 待偷

// 初始：worker0 队列 [A, B, C]（A 在本端，C 在尾），worker1 [D]，worker2 []。
// 用「当前各 worker 队列内容（从本端 front 到 tail）」描述每拍快照。
type Beat = {
  label: string;
  caption: string;
  // 每个 worker 队列里还剩的任务（从 front 到 tail）。
  queues: string[][];
  // 每个 worker 当前手里在跑的任务（null = 空闲）。
  running: (string | null)[];
  // 这一拍是否画一条 worker2 ← worker0 队尾的偷取箭头。
  steal: boolean;
  // worker2 是否高亮「空了」。
  idle2: boolean;
};

const BEATS: readonly Beat[] = [
  {
    label: "local-take",
    caption:
      "各 worker 从自己队列的「本端（front）」取活做（LIFO）——本地取放，互不争用",
    queues: [["B", "C"], [], []],
    running: ["A", "D", null],
    steal: false,
    idle2: false,
  },
  {
    label: "w2-empty",
    caption: "worker2 自己的筐本来就空，干完没活了 → 闲下来（不能让它白站着）",
    queues: [["B", "C"], [], []],
    running: ["A", null, null],
    steal: false,
    idle2: true,
  },
  {
    label: "w2-steal",
    caption:
      "worker2 去 worker0 队列的「另一端（尾 tail）」偷一张 C——偷尾不抢本端，少冲突",
    queues: [["B"], [], []],
    running: ["A", null, null],
    steal: true,
    idle2: true,
  },
  {
    label: "all-busy",
    caption: "偷来的 C 在 worker2 手里跑起来——全队都不闲着，负载被均衡",
    queues: [["B"], [], []],
    running: ["A", null, "C"],
    steal: false,
    idle2: false,
  },
];

const STEPS: readonly TeachingStep[] = BEATS.map((b) => ({
  label: b.label,
  caption: b.caption,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  BEATS.map((b) => [b.label, b.caption]),
);

const SWEEP_LEFT = COL_X0 - 6;
const SWEEP_RIGHT = colX(2) + COL_W + 6;

export function WorkStealingDiagram() {
  const beatRefs = useRef<Record<string, SVGGElement | null>>({});
  const playheadRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      if (playheadRef.current) {
        tl.add(
          playheadRef.current,
          {
            translateX: [SWEEP_LEFT, SWEEP_RIGHT],
            duration: TEACHING_BEAT_MS * BEATS.length,
            ease: "linear",
          },
          0,
        );
      }
      BEATS.forEach((b, i) => {
        const el = beatRefs.current[b.label];
        if (!el) return;
        const lit = TEACHING_BEAT_MS * (i + 1);
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * i,
        );
        if (i > 0) {
          const prev = beatRefs.current[BEATS[i - 1].label];
          if (prev) {
            tl.add(
              prev,
              { opacity: [1, 0], duration: TEACHING_BEAT_MS, ease: "out(3)" },
              TEACHING_BEAT_MS * i,
            );
          }
        }
        tl.label(b.label, lit);
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
          aria-label="工作窃取的动画。横排三个工作线程 worker0、worker1、worker2，各有一条自己的本地双端队列。worker0 队列里堆着 A、B、C 三张活，worker1 有 D，worker2 队列是空的。第一步各 worker 从自己队列的本端取活来做，本地取放互不争用。第二步 worker2 自己没活了，闲下来。第三步 worker2 去 worker0 队列的另一端，也就是队尾，偷走一张 C，偷队尾而不抢本端、减少冲突。第四步偷来的 C 在 worker2 手里跑起来，全队都不闲着，负载被均衡。播放时 playhead 从左向右横扫，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* 标题 */}
          <text
            x="20"
            y="30"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            工作窃取：自己筐空了，去同事队尾偷一张
          </text>
          <text x="20" y="50" fontSize="11" fill="var(--text-secondary)">
            每人一条本地双端队列：本端取放减争用，闲了去别人队尾偷来均衡负载
          </text>

          {/* 各 worker 列头标签 + 队列底框（常驻） */}
          {WORKER_LABELS.map((w, i) => {
            const x = colX(i);
            return (
              <g key={`head-${w}`}>
                <text
                  x={x + COL_W / 2}
                  y="72"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {w}
                </text>
                <rect
                  x={cellX(i) - 8}
                  y={QUEUE_TOP - 8}
                  width={CELL_W + 16}
                  height={3 * (CELL_H + CELL_GAP) - CELL_GAP + 16}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
              </g>
            );
          })}

          {/* 本端 / 队尾 标注：只在 worker0 列标一次，放左侧栏内（避免右缘溢出） */}
          <text
            x={cellX(0) - 8}
            y={cellY(0) + CELL_H / 2 + 4}
            textAnchor="end"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            本端
          </text>
          <text
            x={cellX(0) - 8}
            y={cellY(2) + CELL_H / 2 + 4}
            textAnchor="end"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            队尾
          </text>

          {/* 每拍快照覆盖层 */}
          {BEATS.map((b, bi) => (
            <g
              key={b.label}
              ref={(el) => {
                beatRefs.current[b.label] = el;
              }}
              style={{ opacity: bi === 0 ? 1 : 0 }}
            >
              {/* 各 worker 队列里剩余的任务方块（front 在上、tail 在下） */}
              {b.queues.map((q, ci) =>
                q.map((t, slot) => {
                  const x = cellX(ci);
                  const y = cellY(slot);
                  return (
                    <g key={`cell-${b.label}-${ci}-${t}`}>
                      <rect
                        x={x}
                        y={y}
                        width={CELL_W}
                        height={CELL_H}
                        rx="6"
                        fill={IDLE_COLOR}
                        fillOpacity="0.22"
                        stroke={IDLE_COLOR}
                        strokeWidth="1.4"
                      />
                      <text
                        x={x + CELL_W / 2}
                        y={y + CELL_H / 2 + 5}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="700"
                        fill="var(--text-primary)"
                      >
                        {t}
                      </text>
                    </g>
                  );
                }),
              )}

              {/* 各 worker 手里在跑的任务（画在队列下方的「执行槽」） */}
              {b.running.map((t, ci) => {
                const x = cellX(ci);
                const y = cellY(3) + 6;
                if (t === null) {
                  if (ci === 2 && b.idle2) {
                    return (
                      <g key={`runslot-${b.label}-${ci}`}>
                        <rect
                          x={x}
                          y={y}
                          width={CELL_W}
                          height={CELL_H}
                          rx="6"
                          fill={IDLE_COLOR}
                          fillOpacity="0.12"
                          stroke={IDLE_COLOR}
                          strokeWidth="1.6"
                          strokeDasharray="5 4"
                        />
                        <text
                          x={x + CELL_W / 2}
                          y={y + CELL_H / 2 + 5}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="700"
                          fill={IDLE_COLOR}
                        >
                          空了！闲着 💤
                        </text>
                      </g>
                    );
                  }
                  return (
                    <text
                      key={`runslot-${b.label}-${ci}`}
                      x={x + CELL_W / 2}
                      y={y + CELL_H / 2 + 5}
                      textAnchor="middle"
                      fontSize="11"
                      fill="var(--text-secondary)"
                    >
                      （无）
                    </text>
                  );
                }
                return (
                  <g key={`runslot-${b.label}-${ci}`}>
                    <rect
                      x={x}
                      y={y}
                      width={CELL_W}
                      height={CELL_H}
                      rx="6"
                      fill={BUSY_COLOR}
                      fillOpacity="0.2"
                      stroke={BUSY_COLOR}
                      strokeWidth="2"
                    />
                    <text
                      x={x + CELL_W / 2}
                      y={y + CELL_H / 2 + 5}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill={BUSY_COLOR}
                    >
                      执行 {t} ⚙
                    </text>
                  </g>
                );
              })}

              {/* 偷取箭头：worker0 队尾 → worker2（仅 steal 拍） */}
              {b.steal && (
                <g>
                  <path
                    d={`M ${cellX(0) + CELL_W} ${cellY(2) + CELL_H / 2}
                        C ${cellX(0) + CELL_W + 120} ${cellY(2) + CELL_H / 2},
                          ${cellX(2) - 40} ${cellY(0) + CELL_H / 2},
                          ${cellX(2)} ${cellY(0) + CELL_H / 2}`}
                    fill="none"
                    stroke={STEAL_COLOR}
                    strokeWidth="2.2"
                    strokeDasharray="6 4"
                    markerEnd="url(#ws-steal-arrow)"
                  />
                  <text
                    x={cellX(2) + CELL_W / 2}
                    y={cellY(0) - 6}
                    textAnchor="middle"
                    fontSize="11.5"
                    fontWeight="700"
                    fill={STEAL_COLOR}
                  >
                    偷取 steal：搬走 C
                  </text>
                </g>
              )}
            </g>
          ))}

          <defs>
            <marker
              id="ws-steal-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* playhead */}
          <g
            ref={playheadRef}
            style={{ transform: `translateX(${SWEEP_LEFT}px)` }}
          >
            <line
              x1="0"
              y1={QUEUE_TOP - 24}
              x2="0"
              y2={cellY(3) + CELL_H + 12}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${QUEUE_TOP - 24} L 5 ${QUEUE_TOP - 24} L 0 ${QUEUE_TOP - 19} z`}
              fill="var(--accent)"
            />
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="每个 worker 有自己的本地双端队列：平时从「本端」取放任务（互不争用一个全局队列）；自己空了就去别人队列的「另一端（尾）」偷一张干——本地队列减争用、工作窃取均衡负载。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        工作窃取（work
        stealing）：每个工作线程有一条自己的本地双端队列（deque），平时从本端取放、互不争抢一个全局队列；一旦自己筐空了，就去隔壁忙不过来的同事队列「另一端（队尾）」偷一张活——本地队列减少争用，工作窃取让全队都不闲着、负载均衡。
      </figcaption>
    </figure>
  );
}
