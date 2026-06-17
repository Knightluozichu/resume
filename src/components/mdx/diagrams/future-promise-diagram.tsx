"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <FuturePromiseDiagram>：std::async + future 取结果时阻塞的双泳道动画（HEL-232，§5 辅 Demo）。
 *
 * 餐厅后厨隐喻：future = 点单换的「取餐凭证」；凭证到厨房取菜 = future.get()；
 * promise 是厨师手动把做好的菜摆上取餐台 = set_value。
 * 主线程泳道（顾客）+ 后台任务泳道（厨师）+ 中间一张「取餐台 / 共享状态」。分 6 拍：
 *  ① 主线程 auto f = std::async(task)：下单，换回一张取餐凭证（future）；
 *  ② 后台任务开始跑（厨师做菜，泳道点亮「计算中…」）；
 *  ③ 主线程 f.get()：拿凭证去取餐——此刻菜还没好，主线程被阻塞等待 ⏳；
 *  ④ 后台任务算完，把返回值「摆上取餐台」（共享状态就绪）；
 *  ⑤ 取餐台亮起「就绪：42」；
 *  ⑥ 主线程 get() 拿到值，解除阻塞继续。
 *
 * 可视化核心：异步任务在后台独立跑，future.get() 会阻塞主线程直到结果就绪——「凭证—取餐」
 * 一来一回；promise 版（旁注）则是另一线程手动 set_value 把值摆上台，配对的 future.get() 取到。
 *
 * 时间线 = 一条 anime.js timeline，playhead 横扫 6 个关键帧，分段点亮。
 * 每个 step 的 label 锚定在「对应段点亮到最亮」的时刻（lit = beat*(i+1)），与
 * MutexSerializeDiagram 同款写法，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册后由 page 侧懒加载。
 *
 * 视觉全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 648;
const VIEW_H = 284; // 时间轴在 TASK_Y+LANE_H+26=266，留 ~18px 到底边（收紧死空白提利用率）

const TRACK_X = 132;
const TRACK_W = 496; // 到 viewBox 右缘留 ≥16px
const LANE_H = 40;
const SEG_GAP = 6;

// 6 个时间槽。
const SLOTS = 6;
const SLOT_W = (TRACK_W - (SLOTS - 1) * SEG_GAP) / SLOTS;
const slotX = (i: number) => TRACK_X + i * (SLOT_W + SEG_GAP);

// 三行 y：主线程（上）、取餐台/共享状态（中）、后台任务（下）。
const MAIN_Y = 84;
const STATE_Y = MAIN_Y + LANE_H + 18;
const TASK_Y = STATE_Y + LANE_H + 18;

const MAIN_COLOR = "var(--accent)"; // 主线程（顾客）
const TASK_COLOR = "var(--success)"; // 后台任务（厨师）
const WAIT_COLOR = "var(--warning)"; // 阻塞等待
const READY_COLOR = "var(--success)"; // 结果就绪

type SegKind = "act" | "block" | "compute" | "ready";
type Seg = {
  id: string;
  y: number;
  fromSlot: number;
  toSlot: number;
  kind: SegKind;
  color: string;
  text: string;
};

// 主线程：async 下单(0-1) → get 阻塞(2-5 ⏳) → 拿到值(5-6)；
// 后台任务：compute(1-4 计算中)；取餐台：ready(4-6 就绪:42)。
const SEGS: readonly Seg[] = [
  {
    id: "main-async",
    y: MAIN_Y,
    fromSlot: 0,
    toSlot: 2,
    kind: "act",
    color: MAIN_COLOR,
    text: "f = std::async(task)：换回取餐凭证",
  },
  {
    id: "task-compute",
    y: TASK_Y,
    fromSlot: 1,
    toSlot: 4,
    kind: "compute",
    color: TASK_COLOR,
    text: "后台任务计算中…（厨师做菜）",
  },
  {
    id: "main-block",
    y: MAIN_Y,
    fromSlot: 2,
    toSlot: 5,
    kind: "block",
    color: WAIT_COLOR,
    text: "f.get()：菜没好，阻塞等待 ⏳",
  },
  {
    id: "task-done",
    y: TASK_Y,
    fromSlot: 4,
    toSlot: 5,
    kind: "ready",
    color: TASK_COLOR,
    text: "算完·摆上台",
  },
  {
    id: "state-ready",
    y: STATE_Y,
    fromSlot: 4,
    toSlot: 6,
    kind: "ready",
    color: READY_COLOR,
    text: "取餐台就绪：返回值 42",
  },
  {
    id: "main-got",
    y: MAIN_Y,
    fromSlot: 5,
    toSlot: 6,
    kind: "act",
    color: MAIN_COLOR,
    text: "拿到 42·继续",
  },
];

// 叙事顺序（与点亮 beat 对齐）。
const STEPS: readonly TeachingStep[] = [
  {
    label: "main-async",
    caption:
      "主线程 std::async(task) 下单：换回一张取餐凭证 future（任务已在后台起跑）",
  },
  {
    label: "task-compute",
    caption: "后台任务独立开跑——厨师在后厨做菜，主线程暂时还能干别的",
  },
  {
    label: "main-block",
    caption: "主线程 f.get() 去取餐：菜还没好，于是被阻塞、停下来等 ⏳",
  },
  {
    label: "task-done",
    caption: "后台任务算完，把返回值摆上取餐台（共享状态就绪）",
  },
  {
    label: "state-ready",
    caption: "取餐台亮起「就绪：42」——结果已可领取",
  },
  {
    label: "main-got",
    caption: "主线程 get() 拿到 42，解除阻塞继续往下跑。凭证—取餐一来一回完成",
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

export function FuturePromiseDiagram() {
  const segRefs = useRef<Record<string, SVGGElement | null>>({});
  const playheadRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
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
          aria-label="std::async 加 future 取结果时阻塞的双泳道动画。上泳道是主线程（顾客），中间是取餐台（共享状态），下泳道是后台任务（厨师）。第一步主线程调用 std::async 启动任务，换回一张取餐凭证 future。第二步后台任务独立开始计算。第三步主线程调用 future 的 get 去取结果，但结果还没好，于是被阻塞、停下来等待。第四步后台任务算完，把返回值摆上取餐台。第五步取餐台亮起就绪，返回值为 42。第六步主线程 get 拿到 42，解除阻塞继续。可视化异步任务在后台独立跑，而 future 的 get 会阻塞主线程直到结果就绪。播放时 playhead 从左向右横扫，依次点亮各段，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[648px]"
        >
          <defs>
            <marker
              id="fpd-arrow"
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
            y="30"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            future：取餐凭证，菜没好就阻塞等
          </text>
          <text x="20" y="50" fontSize="11" fill="var(--text-secondary)">
            async 起后台任务，get() 阻塞主线程直到结果就绪
          </text>

          {/* 泳道标签 */}
          <text
            x="20"
            y={MAIN_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={MAIN_COLOR}
          >
            主线程
          </text>
          <text
            x="20"
            y={STATE_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            取餐台
          </text>
          <text
            x="20"
            y={TASK_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={TASK_COLOR}
          >
            后台任务
          </text>

          {/* 各段 */}
          {SEGS.map((seg) => {
            const { x, y, w, h } = segRect(seg);
            const dashed = seg.kind === "block";
            return (
              <g key={seg.id}>
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
                      seg.kind === "ready"
                        ? 0.3
                        : seg.kind === "block"
                          ? 0.18
                          : 0.26
                    }
                    stroke={seg.color}
                    strokeWidth="2"
                    strokeDasharray={dashed ? "5 4" : undefined}
                  />
                  <text
                    x={x + w / 2}
                    y={y + h / 2 + 4}
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight={seg.kind === "ready" ? 700 : 600}
                    fill={
                      seg.kind === "block" || seg.kind === "ready"
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

          {/* 摆上台竖线：任务完成处指向取餐台（slot 4 起点） */}
          <line
            x1={slotX(4) - SEG_GAP / 2}
            y1={STATE_Y + LANE_H + 4}
            x2={slotX(4) - SEG_GAP / 2}
            y2={TASK_Y - 4}
            stroke="var(--success)"
            strokeWidth="1.6"
            strokeDasharray="4 3"
            opacity="0.75"
          />

          {/* 时间轴 */}
          <line
            x1={SWEEP_LEFT}
            y1={TASK_Y + LANE_H + 26}
            x2={SWEEP_RIGHT}
            y2={TASK_Y + LANE_H + 26}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            markerEnd="url(#fpd-arrow)"
            opacity="0.6"
          />
          <text
            x={SWEEP_RIGHT}
            y={TASK_Y + LANE_H + 20}
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
              y1={MAIN_Y - 8}
              x2="0"
              y2={TASK_Y + LANE_H + 8}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${MAIN_Y - 8} L 5 ${MAIN_Y - 8} L 0 ${MAIN_Y - 3} z`}
              fill="var(--accent)"
            />
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="async 起后台任务、换回 future 凭证；任务在后台跑，主线程 get() 取餐时菜没好就阻塞；任务算完把值摆上台，get() 才拿到结果继续。promise 版则是另一线程手动 set_value 摆上台。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        future（取餐凭证）配 std::async：任务在后台独立跑，主线程拿凭证 get()
        取结果时若还没就绪就阻塞等待，直到任务把返回值「摆上取餐台」。promise
        版同理——只是改由另一线程手动 set_value 把值摆上台，配对的 future.get()
        取到。
      </figcaption>
    </figure>
  );
}
