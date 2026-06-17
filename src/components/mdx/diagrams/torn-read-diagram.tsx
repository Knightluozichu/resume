"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <TornReadDiagram>：撕裂读 vs 原子操作的对照动画（HEL-233，§5 主 Demo）。
 *
 * 餐厅后厨隐喻：一个 64 位变量 = 账上一笔「分两栏写的大数」（高 32 位 + 低 32 位）。
 *  - 上半区「非原子」：线程 A 分两步写（先写高位、再写低位），两步之间留了个缝。
 *    线程 B 偏偏在这个缝里读，读到「高位是新、低位是旧」的撕裂值（红色乱码）。
 *  - 下半区「原子」：写入不可分割（一笔记完、中途不开缝），线程 B 要么读到全旧、
 *    要么读到全新，绝不会撕裂——这就是「要么全做、要么全不做，没有中间态」。
 *
 * 时间线 = 一条 anime.js timeline，分两段：上区 4 拍（写高→读撕裂→写低→撕裂值定格），
 * 下区 3 拍（A 一笔写完→B 读→读到完整值）。每个 step 的 label 锚定在「对应段
 * 点亮到最亮」的时刻（lit = beat 累加点），与 CondVarWaitNotifyDiagram 同款写法，
 * 修正 label 落在淡入起点的 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册后由 page 侧懒加载。
 *
 * 视觉全部 DESIGN token（accent / success / danger / warning / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 600;
const VIEW_H = 484; // 下区时间轴在 ATM_PROD_Y(404)+LANE_H(38)+24=466、其文字 baseline 460，留 ≥18px 到底边

// 列：左侧泳道标签 + 内容区。
const TRACK_X = 116;
const TRACK_W = 460; // 内容右缘 576，到 viewBox 右缘 600 留 24px
const LANE_H = 38;
const SEG_GAP = 6;

// 4 个时间槽（上区 4 拍用满；下区 3 拍用前 3 个）。
const SLOTS = 4;
const SLOT_W = (TRACK_W - (SLOTS - 1) * SEG_GAP) / SLOTS;
const slotX = (i: number) => TRACK_X + i * (SLOT_W + SEG_GAP);

// ===== 上半区（非原子·撕裂读）三行 y =====
const TORN_A_Y = 92; // 线程 A（写）
const TORN_VAL_Y = TORN_A_Y + LANE_H + 16; // 变量当前值（高|低两栏）
const TORN_B_Y = TORN_VAL_Y + LANE_H + 16; // 线程 B（读）

// ===== 下半区（原子）三行 y =====
const ATM_A_Y = 296; // 线程 A（一笔写完）
const ATM_VAL_Y = ATM_A_Y + LANE_H + 16; // 变量当前值
const ATM_PROD_Y = ATM_VAL_Y + LANE_H + 16; // 线程 B（读）

const WRITE_COLOR = "var(--accent)"; // 写线程
const READ_COLOR = "var(--success)"; // 读线程
const OLD_COLOR = "var(--text-secondary)"; // 旧值
const NEW_COLOR = "var(--success)"; // 新值
const TORN_COLOR = "var(--danger)"; // 撕裂的乱码值

type SegKind = "write" | "read" | "old" | "new" | "torn";
type Seg = {
  id: string;
  y: number;
  fromSlot: number;
  toSlot: number;
  kind: SegKind;
  text: string;
};

// —— 上区：非原子，分两步写、中途被读 ——
// A 写高位(slot0) → B 在缝里读(slot1) → A 写低位(slot2) → 撕裂值定格(slot1，与读对齐)
const TORN_SEGS: readonly Seg[] = [
  {
    id: "torn-write-hi",
    y: TORN_A_Y,
    fromSlot: 0,
    toSlot: 1,
    kind: "write",
    text: "①写高32位 = 新",
  },
  {
    id: "torn-read",
    y: TORN_B_Y,
    fromSlot: 1,
    toSlot: 2,
    kind: "read",
    text: "②趁缝里读整个 64 位",
  },
  {
    id: "torn-write-lo",
    y: TORN_A_Y,
    fromSlot: 2,
    toSlot: 3,
    kind: "write",
    text: "③写低32位 = 新",
  },
  {
    id: "torn-result",
    y: TORN_B_Y,
    fromSlot: 2,
    toSlot: 4,
    kind: "torn",
    text: "B 读到：高=新|低=旧 → 撕裂乱码 💥",
  },
];

// —— 下区：原子，一笔写完、读到完整值 ——
const ATM_SEGS: readonly Seg[] = [
  {
    id: "atm-write",
    y: ATM_A_Y,
    fromSlot: 0,
    toSlot: 1,
    kind: "write",
    text: "①一笔写完整个 64 位（不可分割）",
  },
  {
    id: "atm-read",
    y: ATM_PROD_Y,
    fromSlot: 1,
    toSlot: 2,
    kind: "read",
    text: "②此后才读",
  },
  {
    id: "atm-result",
    y: ATM_PROD_Y,
    fromSlot: 2,
    toSlot: 4,
    kind: "new",
    text: "B 读到：高=新|低=新 → 完整新值 ✓",
  },
];

// 关键帧叙事（先上区 4 拍，再下区 3 拍，共 7 拍）。
const STEPS: readonly TeachingStep[] = [
  {
    label: "torn-write-hi",
    caption: "非原子：线程 A 先把高 32 位写成新值（写一半，留了个缝）",
  },
  {
    label: "torn-read",
    caption: "线程 B 偏在这个缝里读整个 64 位变量",
  },
  {
    label: "torn-write-lo",
    caption: "线程 A 接着才写低 32 位——可惜 B 已经读过了",
  },
  {
    label: "torn-result",
    caption: "B 拿到「高新+低旧」的撕裂值：一个谁都没写过的乱码，未定义行为 💥",
  },
  {
    label: "atm-write",
    caption: "原子：线程 A 一笔写完整个 64 位，中途不开缝（不可分割）",
  },
  {
    label: "atm-read",
    caption: "线程 B 此后才读——它看不到「写一半」的中间态",
  },
  {
    label: "atm-result",
    caption: "B 要么读到全旧、要么读到全新；这里读到完整新值，绝不撕裂 ✓",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

const SWEEP_LEFT = TRACK_X - SEG_GAP;
const SWEEP_RIGHT = TRACK_X + TRACK_W + SEG_GAP;
// 上区 playhead 扫前 4 拍，下区 playhead 扫后 3 拍。
const TORN_BEATS = 4;
const ATM_BEATS = 3;
const ATM_START = TEACHING_BEAT_MS * TORN_BEATS;

export function TornReadDiagram() {
  const segRefs = useRef<Record<string, SVGGElement | null>>({});
  const tornPlayheadRef = useRef<SVGGElement | null>(null);
  const atmPlayheadRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 上区 playhead 扫前 4 拍。
      if (tornPlayheadRef.current) {
        tl.add(
          tornPlayheadRef.current,
          {
            translateX: [SWEEP_LEFT, SWEEP_RIGHT],
            duration: TEACHING_BEAT_MS * TORN_BEATS,
            ease: "linear",
          },
          0,
        );
      }
      // 下区 playhead 扫后 3 拍（从上区扫完后接上）。
      if (atmPlayheadRef.current) {
        tl.add(
          atmPlayheadRef.current,
          {
            translateX: [SWEEP_LEFT, SWEEP_RIGHT],
            duration: TEACHING_BEAT_MS * ATM_BEATS,
            ease: "linear",
          },
          ATM_START,
        );
      }
      [...TORN_SEGS, ...ATM_SEGS].forEach((seg) => {
        const el = segRefs.current[seg.id];
        if (!el) return;
        const beat = BEAT_OF[seg.id] ?? 0;
        const lit = TEACHING_BEAT_MS * (beat + 1);
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
        tl.label(seg.id, lit);
      });
    },
  });

  // 一段矩形：横跨 [fromSlot, toSlot) 槽。
  const segRect = (seg: Seg) => {
    const x = slotX(seg.fromSlot);
    const w = slotX(seg.toSlot - 1) + SLOT_W - x;
    return { x, y: seg.y, w, h: LANE_H };
  };

  const segColor = (kind: SegKind): string => {
    switch (kind) {
      case "write":
        return WRITE_COLOR;
      case "read":
        return READ_COLOR;
      case "torn":
        return TORN_COLOR;
      case "new":
        return NEW_COLOR;
      case "old":
        return OLD_COLOR;
    }
  };

  const renderSeg = (seg: Seg) => {
    const { x, y, w, h } = segRect(seg);
    const color = segColor(seg.kind);
    return (
      <g key={seg.id}>
        {/* 底层常驻低对比 */}
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx="6"
          fill={color}
          fillOpacity="0.08"
          stroke="var(--border)"
          strokeWidth="1"
        />
        {/* 高亮层（anime.js 点亮） */}
        <g
          ref={(el) => {
            segRefs.current[seg.id] = el;
          }}
          style={{ opacity: 0 }}
        >
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            rx="6"
            fill={color}
            fillOpacity={seg.kind === "torn" ? 0.32 : 0.24}
            stroke={color}
            strokeWidth="2"
          />
          <text
            x={x + w / 2}
            y={y + h / 2 + 4}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight={seg.kind === "torn" || seg.kind === "new" ? 700 : 600}
            fill={
              seg.kind === "torn"
                ? TORN_COLOR
                : seg.kind === "new"
                  ? "var(--text-primary)"
                  : color
            }
          >
            {seg.text}
          </text>
        </g>
      </g>
    );
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
          aria-label="撕裂读与原子操作的对照动画。上半区是非原子的 64 位变量：线程 A 把这个变量分两步写，先写高 32 位、后写低 32 位；线程 B 偏偏在两步之间的缝里读了整个 64 位，结果读到「高位是新、低位是旧」的撕裂值，是一个谁都没写过的乱码，属于未定义行为。下半区是原子变量：线程 A 一笔写完整个 64 位，不可分割、中途不开缝；线程 B 此后才读，它看不到写一半的中间态，要么读到全旧、要么读到全新，这里读到完整新值，绝不撕裂。播放时扫描线从左到右先扫上区再扫下区，依次点亮各段，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="torn-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* ===== 上半区标题 ===== */}
          <text
            x="20"
            y="30"
            fontSize="15"
            fontWeight="700"
            fill="var(--danger)"
          >
            非原子：写一半被看见 → 撕裂读
          </text>
          <text x="20" y="50" fontSize="11" fill="var(--text-secondary)">
            64 位变量分两步写（高位 + 低位），B 在缝里读到乱码
          </text>

          {/* 上区泳道标签 */}
          <text
            x="20"
            y={TORN_A_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={WRITE_COLOR}
          >
            线程 A 写
          </text>
          <text
            x="20"
            y={TORN_VAL_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            变量值
          </text>
          <text
            x="20"
            y={TORN_B_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={READ_COLOR}
          >
            线程 B 读
          </text>

          {/* 上区「变量值」常驻：高|低两栏，A 写高位后高位变新、低位仍旧 */}
          <g>
            <rect
              x={slotX(0)}
              y={TORN_VAL_Y}
              width={SLOT_W * 2 + SEG_GAP}
              height={LANE_H}
              rx="6"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <line
              x1={slotX(0) + SLOT_W + SEG_GAP / 2}
              y1={TORN_VAL_Y}
              x2={slotX(0) + SLOT_W + SEG_GAP / 2}
              y2={TORN_VAL_Y + LANE_H}
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x={slotX(0) + SLOT_W / 2}
              y={TORN_VAL_Y + LANE_H / 2 + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill={NEW_COLOR}
            >
              高32=新
            </text>
            <text
              x={slotX(1) + SLOT_W / 2}
              y={TORN_VAL_Y + LANE_H / 2 + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill={OLD_COLOR}
            >
              低32=旧
            </text>
          </g>

          {TORN_SEGS.map(renderSeg)}

          {/* 上区 playhead */}
          <g
            ref={tornPlayheadRef}
            style={{ transform: `translateX(${SWEEP_LEFT}px)` }}
          >
            <line
              x1="0"
              y1={TORN_A_Y - 8}
              x2="0"
              y2={TORN_B_Y + LANE_H + 8}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${TORN_A_Y - 8} L 5 ${TORN_A_Y - 8} L 0 ${TORN_A_Y - 3} z`}
              fill="var(--accent)"
            />
          </g>

          {/* ===== 分隔线 ===== */}
          <line
            x1="20"
            y1="252"
            x2={VIEW_W - 20}
            y2="252"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== 下半区标题 ===== */}
          <text
            x="20"
            y="280"
            fontSize="15"
            fontWeight="700"
            fill="var(--success)"
          >
            原子：一笔写完，没有中间态
          </text>

          {/* 下区泳道标签 */}
          <text
            x="20"
            y={ATM_A_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={WRITE_COLOR}
          >
            线程 A 写
          </text>
          <text
            x="20"
            y={ATM_VAL_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            变量值
          </text>
          <text
            x="20"
            y={ATM_PROD_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={READ_COLOR}
          >
            线程 B 读
          </text>

          {/* 下区「变量值」常驻：高|低一起翻新 */}
          <g>
            <rect
              x={slotX(0)}
              y={ATM_VAL_Y}
              width={SLOT_W * 2 + SEG_GAP}
              height={LANE_H}
              rx="6"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <line
              x1={slotX(0) + SLOT_W + SEG_GAP / 2}
              y1={ATM_VAL_Y}
              x2={slotX(0) + SLOT_W + SEG_GAP / 2}
              y2={ATM_VAL_Y + LANE_H}
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x={slotX(0) + SLOT_W / 2}
              y={ATM_VAL_Y + LANE_H / 2 + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill={NEW_COLOR}
            >
              高32=新
            </text>
            <text
              x={slotX(1) + SLOT_W / 2}
              y={ATM_VAL_Y + LANE_H / 2 + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill={NEW_COLOR}
            >
              低32=新
            </text>
          </g>

          {ATM_SEGS.map(renderSeg)}

          {/* 下区时间轴 */}
          <line
            x1={SWEEP_LEFT}
            y1={ATM_PROD_Y + LANE_H + 24}
            x2={SWEEP_RIGHT}
            y2={ATM_PROD_Y + LANE_H + 24}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            markerEnd="url(#torn-arrow)"
            opacity="0.6"
          />
          <text
            x={SWEEP_RIGHT}
            y={ATM_PROD_Y + LANE_H + 18}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            时间 →
          </text>

          {/* 下区 playhead */}
          <g
            ref={atmPlayheadRef}
            style={{ transform: `translateX(${SWEEP_LEFT}px)` }}
          >
            <line
              x1="0"
              y1={ATM_A_Y - 8}
              x2="0"
              y2={ATM_PROD_Y + LANE_H + 8}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${ATM_A_Y - 8} L 5 ${ATM_A_Y - 8} L 0 ${ATM_A_Y - 3} z`}
              fill="var(--accent)"
            />
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="上区：非原子变量写一半被读 → 撕裂乱码（UB）；下区：原子变量一笔写完，读到的要么全旧、要么全新。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        撕裂读 vs 原子：非原子的 64
        位变量分两步写，另一线程趁缝里读会拿到「高新+低旧」的乱码（未定义行为）；原子操作不可分割——写入要么全做、要么全不做，读到的永远是一个完整的值。
      </figcaption>
    </figure>
  );
}
