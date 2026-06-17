"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ExecutionPolicyDiagram>：C++17 三档执行策略并排对照「可控教学动画」（HEL-239，§5 主 Demo）。
 *
 * 同一个 for_each 处理一批 8 个元素，三档并排，演示「执行策略决定并行/向量化程度」：
 *  ① seq（一个厨师顺序做）：单条泳道，8 个元素逐个点亮——严格一个接一个。
 *  ② par（多个厨师分批同时做）：4 条泳道分块并行，4 条泳道同列的元素同时点亮——
 *     多线程各处理一块。
 *  ③ par_unseq（多厨师 + 每人还能一手颠两个锅 = 向量化）：4 条泳道 + 每条泳道内
 *     每拍同时处理 2 个元素（SIMD 向量化标记），并行 + 向量化双重叠加，最先做完。
 *
 * 餐厅后厨隐喻：执行策略 = 给「把这批菜处理一遍」下指令时附带的并行档位。
 * seq 一个厨师顺序做、par 多个厨师分批同时做、par_unseq 多厨师且每人一手同时颠两锅。
 *
 * 时间线 = 一条 anime.js timeline，分三段：seq 扫 8 拍、par 扫 2 拍（每拍 4 元素）、
 * par_unseq 扫 1 拍（一次 8 元素：4 泳道 × 2 向量通道）。每个 step 的 label 锚定在
 * 「该段处理的元素点亮到最亮」的时刻（lit），与 ConcurrencyVsParallelismDiagram 同款
 * 写法，修正 label 落在淡入起点的 off-by-one。三段之间用一个「结果带」步骤收束，
 * 直观对比三档的「用时长短」。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏。
 *
 * 视觉全部 DESIGN token（accent / success / warning / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。几何：每个 <text> 距 viewBox 边 ≥14px，
 * 三档泳道块互不重叠，无叠字。
 */

const VIEW_W = 660;
const VIEW_H = 432;

// 三档区块的纵向起点（每档：标题 + 泳道 + 用时条）。
// par 四条泳道占 y[200, 316]；UNSEQ_Y 下移到 348，使 sep2(=UNSEQ_Y-22=326) 落在
// par 底(316)之下 10px、不压任何泳道框；unseq 行底 374 + 文字 16 = 390，距 viewBox 底 42px。
const SEQ_Y = 64; // seq 泳道 y
const PAR_Y = 200; // par 第一条泳道 y（4 条往下排）
const UNSEQ_Y = 348; // par_unseq 第一条泳道 y

// 泳道内容横向范围（左侧留给档名标签）。
const TRACK_X = 132;
const TRACK_W = 504; // 到右缘 660-132-504=24px
const CELL_GAP = 6;
const CELL_H = 26;
const PAR_LANE_H = 26; // par 四条窄泳道高
const PAR_LANE_GAP = 4;

// seq：8 个等宽格铺一行。
const N = 8;
const CELL_W = (TRACK_W - (N - 1) * CELL_GAP) / N;
const cellX = (i: number) => TRACK_X + i * (CELL_W + CELL_GAP);

const SEQ_COLOR = "var(--text-secondary)"; // seq（灰，最朴素）
const PAR_COLOR = "var(--accent)"; // par（紫）
const UNSEQ_COLOR = "var(--success)"; // par_unseq（绿，最快）

// par：4 条泳道，每条 2 个格（列 0/1）。lane r 处理元素 r 与 r+4。
const PAR_LANES = 4;
const PAR_COLS = 2;
const parLaneY = (r: number) => PAR_Y + r * (PAR_LANE_H + PAR_LANE_GAP);
// par 用大格：每条泳道横向放 2 个格。
const PAR_CELL_W = (TRACK_W - (PAR_COLS - 1) * CELL_GAP) / PAR_COLS;
const parCellX = (c: number) => TRACK_X + c * (PAR_CELL_W + CELL_GAP);

// 关键帧步骤：seq 三个采样拍 + par 两拍 + par_unseq 一拍 + 收束对比。
// 为控制步数（≤认知过载），seq 用 3 个采样关键帧（起/中/末），但动画仍逐格点亮。
const STEPS: readonly TeachingStep[] = [
  { label: "seq-start", caption: "seq：一个厨师顺序做——元素 0 先处理" },
  { label: "seq-mid", caption: "seq：还是同一个，逐个往后做（4/8）" },
  { label: "seq-end", caption: "seq：8 个全做完——最慢，但顺序确定" },
  {
    label: "par-1",
    caption: "par：4 个厨师分 4 块同时做——第一拍 4 个元素一起处理",
  },
  {
    label: "par-2",
    caption: "par：第二拍另 4 个元素一起处理——两拍做完，比 seq 快得多",
  },
  {
    label: "unseq",
    caption:
      "par_unseq：4 厨师 + 每人一手颠两锅（向量化）——一拍 8 个全处理，最快",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function ExecutionPolicyDiagram() {
  const seqRefs = useRef<Record<number, SVGRectElement | null>>({});
  // par：[lane][col] → rect
  const parRefs = useRef<Record<string, SVGRectElement | null>>({});
  // par_unseq：[lane][vec] → rect（每泳道 2 个向量通道）
  const unseqRefs = useRef<Record<string, SVGRectElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // —— 第一段：seq，8 格逐个点亮（占 8 beat）。采样 label 落在 1/4/8 格点亮时刻 ——
      for (let i = 0; i < N; i++) {
        const el = seqRefs.current[i];
        if (!el) continue;
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * i,
        );
      }
      tl.label("seq-start", TEACHING_BEAT_MS * 1);
      tl.label("seq-mid", TEACHING_BEAT_MS * 4);
      tl.label("seq-end", TEACHING_BEAT_MS * 8);

      // —— 第二段：par，两拍，每拍 4 条泳道的同一列同时点亮（占 2 beat）——
      const parStart = TEACHING_BEAT_MS * 8;
      for (let c = 0; c < PAR_COLS; c++) {
        const colStart = parStart + TEACHING_BEAT_MS * c;
        for (let r = 0; r < PAR_LANES; r++) {
          const el = parRefs.current[`${r}-${c}`];
          if (!el) continue;
          tl.add(
            el,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            colStart,
          );
        }
        tl.label(c === 0 ? "par-1" : "par-2", colStart + TEACHING_BEAT_MS);
      }

      // —— 第三段：par_unseq，一拍，4 泳道 × 2 向量通道 = 8 元素同时点亮（占 1 beat）——
      const unseqStart = parStart + TEACHING_BEAT_MS * PAR_COLS;
      for (let r = 0; r < PAR_LANES; r++) {
        for (let v = 0; v < 2; v++) {
          const el = unseqRefs.current[`${r}-${v}`];
          if (!el) continue;
          tl.add(
            el,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            unseqStart,
          );
        }
      }
      tl.label("unseq", unseqStart + TEACHING_BEAT_MS);
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
          aria-label="C++17 三档执行策略并排对照动画。同一个 for_each 处理 8 个元素，三档纵向排列。第一档 seq（顺序）：单条泳道，8 个元素一个接一个逐个点亮，像一个厨师顺序做，最慢但顺序确定。第二档 par（并行）：4 条泳道分块并行，每拍 4 条泳道同一列的元素同时点亮，两拍做完，像 4 个厨师分批同时做。第三档 par_unseq（并行加向量化）：4 条泳道，每条泳道内每拍同时处理 2 个元素（SIMD 向量化），并行加向量化双重叠加，一拍 8 个全处理完，最快，像 4 个厨师且每人一手同时颠两个锅。播放时依次演示三档的处理节奏，越往下用时越短，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x="16"
            y="28"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            执行策略：给「处理这批 8 个元素」附带的并行档位
          </text>
          <text x="16" y="48" fontSize="11" fill="var(--text-secondary)">
            同一个 for_each，换不同策略 → 并行 / 向量化程度不同 → 用时不同
          </text>

          {/* ===== ① seq 单泳道 ===== */}
          <text
            x="16"
            y={SEQ_Y + CELL_H / 2 + 4}
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill={SEQ_COLOR}
          >
            seq
          </text>
          <text
            x="16"
            y={SEQ_Y - 12}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            一个厨师顺序做（8 拍）
          </text>
          {Array.from({ length: N }, (_, i) => (
            <g key={`seq-${i}`}>
              <rect
                x={cellX(i)}
                y={SEQ_Y}
                width={CELL_W}
                height={CELL_H}
                rx="5"
                fill={SEQ_COLOR}
                fillOpacity="0.08"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <rect
                ref={(el) => {
                  seqRefs.current[i] = el;
                }}
                x={cellX(i)}
                y={SEQ_Y}
                width={CELL_W}
                height={CELL_H}
                rx="5"
                fill={SEQ_COLOR}
                fillOpacity="0.34"
                stroke={SEQ_COLOR}
                strokeWidth="1.6"
                opacity="0"
              />
              <text
                x={cellX(i) + CELL_W / 2}
                y={SEQ_Y + CELL_H / 2 + 4}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {i}
              </text>
            </g>
          ))}

          {/* 分隔线 */}
          <line
            x1="16"
            y1={SEQ_Y + CELL_H + 22}
            x2={VIEW_W - 16}
            y2={SEQ_Y + CELL_H + 22}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== ② par 四泳道 ===== */}
          <text
            x="16"
            y={PAR_Y + (PAR_LANES * (PAR_LANE_H + PAR_LANE_GAP)) / 2 - 2}
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill={PAR_COLOR}
          >
            par
          </text>
          <text
            x="16"
            y={PAR_Y - 12}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            4 厨师分块同时做（2 拍）
          </text>
          {Array.from({ length: PAR_LANES }, (_, r) => (
            <g key={`par-lane-${r}`}>
              {Array.from({ length: PAR_COLS }, (_, c) => {
                const idx = r + c * PAR_LANES; // 该格代表的元素编号
                return (
                  <g key={`par-${r}-${c}`}>
                    <rect
                      x={parCellX(c)}
                      y={parLaneY(r)}
                      width={PAR_CELL_W}
                      height={PAR_LANE_H}
                      rx="5"
                      fill={PAR_COLOR}
                      fillOpacity="0.07"
                      stroke="var(--border)"
                      strokeWidth="1"
                    />
                    <rect
                      ref={(el) => {
                        parRefs.current[`${r}-${c}`] = el;
                      }}
                      x={parCellX(c)}
                      y={parLaneY(r)}
                      width={PAR_CELL_W}
                      height={PAR_LANE_H}
                      rx="5"
                      fill={PAR_COLOR}
                      fillOpacity="0.3"
                      stroke={PAR_COLOR}
                      strokeWidth="1.6"
                      opacity="0"
                    />
                    <text
                      x={parCellX(c) + PAR_CELL_W / 2}
                      y={parLaneY(r) + PAR_LANE_H / 2 + 4}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
                      fill="var(--text-primary)"
                    >
                      {`线程${r} · 元素${idx}`}
                    </text>
                  </g>
                );
              })}
            </g>
          ))}

          {/* 分隔线 */}
          <line
            x1="16"
            y1={UNSEQ_Y - 22}
            x2={VIEW_W - 16}
            y2={UNSEQ_Y - 22}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== ③ par_unseq 四泳道 + 每泳道 2 向量通道 ===== */}
          <text
            x="16"
            y={UNSEQ_Y + CELL_H / 2 + 4}
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill={UNSEQ_COLOR}
          >
            par_unseq
          </text>
          <text
            x="16"
            y={UNSEQ_Y - 12}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            4 厨师 + 每人颠两锅（向量化，1 拍）
          </text>
          {Array.from({ length: PAR_LANES }, (_, r) => {
            // 4 条泳道横排：把 TRACK_W 均分 4 段，每段内放 2 个向量通道。
            const laneW = (TRACK_W - (PAR_LANES - 1) * CELL_GAP) / PAR_LANES;
            const laneStartX = TRACK_X + r * (laneW + CELL_GAP);
            const vecW = (laneW - CELL_GAP) / 2;
            return (
              <g key={`unseq-lane-${r}`}>
                {[0, 1].map((v) => {
                  const idx = r * 2 + v;
                  const vx = laneStartX + v * (vecW + CELL_GAP);
                  return (
                    <g key={`unseq-${r}-${v}`}>
                      <rect
                        x={vx}
                        y={UNSEQ_Y}
                        width={vecW}
                        height={CELL_H}
                        rx="5"
                        fill={UNSEQ_COLOR}
                        fillOpacity="0.07"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      <rect
                        ref={(el) => {
                          unseqRefs.current[`${r}-${v}`] = el;
                        }}
                        x={vx}
                        y={UNSEQ_Y}
                        width={vecW}
                        height={CELL_H}
                        rx="5"
                        fill={UNSEQ_COLOR}
                        fillOpacity="0.32"
                        stroke={UNSEQ_COLOR}
                        strokeWidth="1.6"
                        opacity="0"
                      />
                      <text
                        x={vx + vecW / 2}
                        y={UNSEQ_Y + CELL_H / 2 + 4}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="var(--font-mono)"
                        fill="var(--text-primary)"
                      >
                        {idx}
                      </text>
                    </g>
                  );
                })}
                {/* 泳道内「同一线程的两锅」括注：只在泳道下方标一处线程号 */}
                <text
                  x={laneStartX + laneW / 2}
                  y={UNSEQ_Y + CELL_H + 16}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {`线程${r}`}
                </text>
              </g>
            );
          })}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="同一个 for_each：seq 一个个做（8 拍）、par 分 4 块同时做（2 拍）、par_unseq 再叠加向量化一拍做完。档位越强、用时越短——但并非无脑选最强（见正文）。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++17 三档执行策略：seq（顺序）、par（多线程并行）、par_unseq（并行 +
        每线程内向量化）。给同一个算法传不同策略，就决定了它并行到什么程度、向量化到什么程度。
      </figcaption>
    </figure>
  );
}
