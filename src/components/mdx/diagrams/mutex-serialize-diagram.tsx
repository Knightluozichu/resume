"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <MutexSerializeDiagram>：mutex 把临界区串行化的双泳道动画（HEL-231，§3 引出 / §5 辅 Demo）。
 *
 * 餐厅后厨隐喻：共享砧板只有一块，切它必须先拿到「唯一的那把厨刀」（mutex）。
 * 两线程 A、B 都想进入临界区（操作共享砧板）：
 *  - A 先 lock 拿到刀 → 进入临界区切砧板（高亮）→ unlock 放下刀；
 *  - B 在 A 持刀期间被挡住等待（⏳ blocked）；A unlock 后 B 才 lock → 进入 → unlock。
 *
 * 可视化的核心：互斥量保证「任一时刻只有一个线程在改共享数据」——两段临界区在时间上
 * 永不重叠，被强行串行化。
 *
 * 时间线 = 一条 anime.js timeline，playhead 横扫 8 个时间槽，分段点亮（6 个关键帧）。
 * 每个 step 的 label 锚定在「对应段点亮到最亮」的时刻（lit = beat*(i+1)），与
 * JoinVsDetachTimeline 同款写法，修正 label 落在淡入起点的 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时
 * next/dynamic(ssr:false) 懒加载，不进首屏。
 *
 * 视觉全部 DESIGN token（accent / success / warning / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 648;
const VIEW_H = 244;

// 时间轴几何：泳道内容区横向范围。
const TRACK_X = 120; // 泳道内容起点（左侧留给泳道标签）
const TRACK_W = 504; // 泳道内容宽（到 viewBox 右缘留 ≥24px）
const LANE_H = 40;
const SEG_GAP = 6;

// 8 个时间槽。
const SLOTS = 8;
const SLOT_W = (TRACK_W - (SLOTS - 1) * SEG_GAP) / SLOTS;
const slotX = (i: number) => TRACK_X + i * (SLOT_W + SEG_GAP);

// 两条泳道 y（A 上、B 下），居中铺在标题下方。
const A_Y = 96;
const B_Y = A_Y + LANE_H + 18;

const A_COLOR = "var(--accent)"; // 线程 A
const B_COLOR = "var(--success)"; // 线程 B
const CRIT_COLOR = "var(--warning)"; // 临界区高亮
const WAIT_COLOR = "var(--warning)"; // 等待 / blocked

// 段：所在泳道行 y、起止槽、色、样式（lock/unlock 窄块、crit 高亮、wait 阻塞）。
type SegKind = "lock" | "crit" | "unlock" | "wait";
type Seg = {
  id: string;
  y: number;
  fromSlot: number;
  toSlot: number;
  kind: SegKind;
  color: string;
  text: string;
};

// A：lock(0-1) → crit(1-4) → unlock(4-5)；B：wait(0-5 被挡) → lock(5-6) → crit(6-8)。
const SEGS: readonly Seg[] = [
  {
    id: "a-lock",
    y: A_Y,
    fromSlot: 0,
    toSlot: 1,
    kind: "lock",
    color: A_COLOR,
    text: "lock",
  },
  {
    id: "a-crit",
    y: A_Y,
    fromSlot: 1,
    toSlot: 4,
    kind: "crit",
    color: CRIT_COLOR,
    text: "临界区：切砧板",
  },
  {
    id: "a-unlock",
    y: A_Y,
    fromSlot: 4,
    toSlot: 5,
    kind: "unlock",
    color: A_COLOR,
    text: "unlock",
  },
  {
    id: "b-wait",
    y: B_Y,
    fromSlot: 0,
    toSlot: 5,
    kind: "wait",
    color: WAIT_COLOR,
    text: "⏳ 等待（刀被 A 占着）",
  },
  {
    id: "b-lock",
    y: B_Y,
    fromSlot: 5,
    toSlot: 6,
    kind: "lock",
    color: B_COLOR,
    text: "lock",
  },
  {
    id: "b-crit",
    y: B_Y,
    fromSlot: 6,
    toSlot: 8,
    kind: "crit",
    color: CRIT_COLOR,
    text: "临界区：切砧板",
  },
];

// 关键帧叙事顺序（与点亮 beat 对齐）。
const STEPS: readonly TeachingStep[] = [
  {
    label: "a-lock",
    caption: "线程 A 先 lock：拿到唯一的那把厨刀（mutex）",
  },
  {
    label: "a-crit",
    caption: "A 进入临界区操作共享砧板——此刻只有 A 在改数据",
  },
  {
    label: "b-wait",
    caption: "线程 B 也想拿刀，但刀被 A 占着——B 被挡住空等（blocked）",
  },
  {
    label: "a-unlock",
    caption: "A 切完，unlock 放下刀——临界区让出来了",
  },
  {
    label: "b-lock",
    caption: "B 这才拿到刀（lock 成功）——它一直等到现在",
  },
  {
    label: "b-crit",
    caption: "B 进入临界区操作砧板——两段临界区前后错开，永不重叠",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 每段点亮的 beat（= STEPS 顺序里的下标）。
const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

// playhead 扫程端点。
const SWEEP_LEFT = TRACK_X - SEG_GAP;
const SWEEP_RIGHT = TRACK_X + TRACK_W + SEG_GAP;

export function MutexSerializeDiagram() {
  const segRefs = useRef<Record<string, SVGGElement | null>>({});
  const playheadRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // playhead 横扫 6 beat（与 6 个关键帧同步）。
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
      SEGS.forEach((seg) => {
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
          aria-label="互斥量把临界区串行化的双泳道动画。上泳道是线程 A，下泳道是线程 B，两者都想进入临界区操作同一块共享砧板，而切砧板必须先用 lock 拿到唯一的一把厨刀（mutex）。线程 A 先 lock 拿到刀，进入临界区（高亮）操作砧板，再 unlock 放下刀；线程 B 在 A 持刀期间被挡住、空等待（blocked）；A 解锁后 B 才 lock 拿到刀、进入临界区、再 unlock。两段临界区在时间上前后错开、永不重叠，可视化「任一时刻只有一个线程在改共享数据」。播放时 playhead 从左向右横扫，依次点亮各段，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[648px]"
        >
          <defs>
            <marker
              id="msd-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x="20"
            y="32"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            mutex：谁拿到刀，谁才能切砧板
          </text>
          <text x="20" y="52" fontSize="11" fill="var(--text-secondary)">
            临界区被串行化——任一时刻只有一个线程在改共享数据
          </text>

          {/* 泳道标签 */}
          <text
            x="20"
            y={A_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={A_COLOR}
          >
            线程 A
          </text>
          <text
            x="20"
            y={B_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={B_COLOR}
          >
            线程 B
          </text>

          {/* 各段：底层常驻低对比 + 高亮层（anime.js 点亮）+ 段内文字 */}
          {SEGS.map((seg) => {
            const { x, y, w, h } = segRect(seg);
            const dashed = seg.kind === "wait";
            return (
              <g key={seg.id}>
                {/* 底层常驻 */}
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="6"
                  fill={seg.color}
                  fillOpacity="0.08"
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray={dashed ? "5 4" : undefined}
                />
                {/* 高亮层 */}
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
                    fill={seg.color}
                    fillOpacity={
                      seg.kind === "crit"
                        ? 0.32
                        : seg.kind === "wait"
                          ? 0.18
                          : 0.24
                    }
                    stroke={seg.color}
                    strokeWidth="2"
                    strokeDasharray={dashed ? "5 4" : undefined}
                  />
                  <text
                    x={x + w / 2}
                    y={y + h / 2 + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={seg.kind === "crit" ? 700 : 600}
                    fill={
                      seg.kind === "crit" || seg.kind === "wait"
                        ? "var(--text-primary)"
                        : seg.color
                    }
                  >
                    {seg.text}
                  </text>
                </g>
              </g>
            );
          })}

          {/* 临界区互斥竖线：A unlock 与 B lock 的交接处（slot 5 起点） */}
          <line
            x1={slotX(5) - SEG_GAP / 2}
            y1={A_Y - 10}
            x2={slotX(5) - SEG_GAP / 2}
            y2={B_Y + LANE_H + 10}
            stroke="var(--warning)"
            strokeWidth="1.6"
            strokeDasharray="4 3"
            opacity="0.7"
          />
          <text
            x={slotX(5) - SEG_GAP / 2}
            y={A_Y - 14}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--warning)"
          >
            交接：刀从 A 到 B
          </text>

          {/* 时间轴 */}
          <line
            x1={SWEEP_LEFT}
            y1={B_Y + LANE_H + 30}
            x2={SWEEP_RIGHT}
            y2={B_Y + LANE_H + 30}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            markerEnd="url(#msd-arrow)"
            opacity="0.6"
          />
          <text
            x={SWEEP_RIGHT}
            y={B_Y + LANE_H + 24}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            时间 →
          </text>

          {/* playhead */}
          <g
            ref={playheadRef}
            style={{ transform: `translateX(${SWEEP_LEFT}px)` }}
          >
            <line
              x1="0"
              y1={A_Y - 8}
              x2="0"
              y2={B_Y + LANE_H + 8}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${A_Y - 8} L 5 ${A_Y - 8} L 0 ${A_Y - 3} z`}
              fill="var(--accent)"
            />
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="只有一把刀（mutex）：A 持刀切砧板时 B 只能等；A 放下刀 B 才拿。两段临界区永不重叠。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        互斥量（mutex）像后厨那把唯一的厨刀：谁 lock
        拿到它，谁才能进入临界区操作 共享砧板，别的线程只能等它
        unlock。临界区因此被串行化，任一刻只有一个线程在改数据。
      </figcaption>
    </figure>
  );
}
