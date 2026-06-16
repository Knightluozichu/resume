"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <CondVarWaitNotifyDiagram>：条件变量「等待—通知」握手的双泳道动画（HEL-232，§5 主 Demo）。
 *
 * 餐厅后厨隐喻：condition_variable = 服务员等「上菜」的铃，厨师做好后按铃（notify）叫醒服务员。
 * 消费者泳道（服务员）+ 生产者泳道（厨师）+ 中间一个共享队列（取餐台）。分 6 拍：
 *  ① 消费者 cv.wait(lk, pred)：队列空 → 谓词 false → 释放锁并睡眠（消费者泳道变灰「等待中💤」）；
 *  ② 消费者持续沉睡（灰带常驻，表示它一直挂着等铃）；
 *  ③ 生产者 push 数据进队列（共享队列里冒出一格数据）；
 *  ④ 生产者 cv.notify_one()：按铃叫醒消费者；
 *  ⑤ 消费者被唤醒 → 重新抢回锁（re-lock）；
 *  ⑥ 消费者再查谓词：队列非空 → true → 取数据继续。
 *
 * 可视化核心：wait 不是「忙等」而是「释放锁 + 睡眠」，notify 把它叫醒，醒来必须再查一次谓词
 * （防虚假唤醒/丢失唤醒）。这正是「带谓词的 wait」之所以必要的原因。
 *
 * 时间线 = 一条 anime.js timeline，playhead 横扫 6 个关键帧，分段点亮。
 * 每个 step 的 label 锚定在「对应段点亮到最亮」的时刻（lit = beat*(i+1)），与
 * MutexSerializeDiagram / DeadlockCycleDiagram 同款写法，修正 label 落在淡入起点的 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册后由 page 侧懒加载。
 *
 * 视觉全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 648;
const VIEW_H = 284; // 时间轴在 PROD_Y+LANE_H+26=266，留 ~18px 到底边（收紧死空白提利用率）

// 泳道几何：内容区横向范围（左侧留给泳道标签）。
const TRACK_X = 124;
const TRACK_W = 504; // 到 viewBox 右缘留 ≥16px
const LANE_H = 40;
const SEG_GAP = 6;

// 6 个时间槽（与 6 拍一一对应）。
const SLOTS = 6;
const SLOT_W = (TRACK_W - (SLOTS - 1) * SEG_GAP) / SLOTS;
const slotX = (i: number) => TRACK_X + i * (SLOT_W + SEG_GAP);

// 三行 y：消费者泳道（上）、共享队列（中）、生产者泳道（下）。
const CONS_Y = 84;
const QUEUE_Y = CONS_Y + LANE_H + 18;
const PROD_Y = QUEUE_Y + LANE_H + 18;

const CONS_COLOR = "var(--accent)"; // 消费者（服务员）
const PROD_COLOR = "var(--success)"; // 生产者（厨师）
const WAIT_COLOR = "var(--warning)"; // 等待 / 睡眠
const DATA_COLOR = "var(--success)"; // 队列里的数据格

type SegKind = "act" | "wait" | "data" | "notify";
type Seg = {
  id: string;
  y: number;
  fromSlot: number;
  toSlot: number;
  kind: SegKind;
  color: string;
  text: string;
};

// 消费者：wait(0-2 释放锁睡) → relock(4-5) → take(5-6)；
// 生产者：work(0-2) → push(2-3，队列冒数据) → notify(3-4 按铃)；
// 队列数据格在 push 时（slot 2-3）出现，落在 QUEUE 行。
const SEGS: readonly Seg[] = [
  {
    id: "cons-wait",
    y: CONS_Y,
    fromSlot: 0,
    toSlot: 4,
    kind: "wait",
    color: WAIT_COLOR,
    text: "cv.wait(lk, pred)：队列空→释放锁并睡眠 💤",
  },
  {
    id: "prod-push",
    y: PROD_Y,
    fromSlot: 2,
    toSlot: 3,
    kind: "data",
    color: PROD_COLOR,
    text: "push 数据",
  },
  {
    id: "queue-data",
    y: QUEUE_Y,
    fromSlot: 2,
    toSlot: 4,
    kind: "data",
    color: DATA_COLOR,
    text: "队列：[ 一格数据 ]",
  },
  {
    id: "prod-notify",
    y: PROD_Y,
    fromSlot: 3,
    toSlot: 4,
    kind: "notify",
    color: WAIT_COLOR,
    text: "notify_one 🔔",
  },
  {
    id: "cons-relock",
    y: CONS_Y,
    fromSlot: 4,
    toSlot: 5,
    kind: "act",
    color: CONS_COLOR,
    text: "醒来·抢回锁",
  },
  {
    id: "cons-take",
    y: CONS_Y,
    fromSlot: 5,
    toSlot: 6,
    kind: "act",
    color: CONS_COLOR,
    text: "再查谓词→真→取数据",
  },
];

// 关键帧叙事顺序（与点亮 beat 对齐）。
const STEPS: readonly TeachingStep[] = [
  {
    label: "cons-wait",
    caption:
      "消费者 cv.wait(lk, pred)：发现队列空→谓词假→释放锁睡过去（不忙等）",
  },
  {
    label: "prod-push",
    caption: "生产者把一道菜 push 进共享队列——队列从此非空",
  },
  {
    label: "queue-data",
    caption: "共享队列里冒出一格数据：谓词的「料」备齐了",
  },
  {
    label: "prod-notify",
    caption: "生产者 cv.notify_one() 按铃 🔔，叫醒正在睡的消费者",
  },
  {
    label: "cons-relock",
    caption: "消费者被唤醒，先重新抢回那把锁（wait 返回前会替你 re-lock）",
  },
  {
    label: "cons-take",
    caption: "醒来必须再查一次谓词：队列非空→真→取走数据继续。握手完成",
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

export function CondVarWaitNotifyDiagram() {
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
          aria-label="条件变量等待与通知握手的双泳道动画。上泳道是消费者（服务员），中间是共享队列（取餐台），下泳道是生产者（厨师）。第一步消费者调用 cv.wait 并带谓词，发现队列空、谓词为假，于是释放锁并睡过去，不做忙等。第二步生产者把一份数据 push 进共享队列，队列变为非空。第三步共享队列里出现一格数据。第四步生产者调用 notify_one 按铃，叫醒正在睡的消费者。第五步消费者被唤醒后重新抢回那把锁。第六步消费者醒来必须再查一次谓词，发现队列非空、谓词为真，于是取走数据继续，握手完成。播放时 playhead 从左向右横扫，依次点亮各段，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[648px]"
        >
          <defs>
            <marker
              id="cvwn-arrow"
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
            条件变量：等「上菜」铃，按铃才叫醒
          </text>
          <text x="20" y="50" fontSize="11" fill="var(--text-secondary)">
            wait 释放锁睡眠，notify 叫醒，醒来再查谓词
          </text>

          {/* 泳道标签 */}
          <text
            x="20"
            y={CONS_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={CONS_COLOR}
          >
            消费者
          </text>
          <text
            x="20"
            y={QUEUE_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            共享队列
          </text>
          <text
            x="20"
            y={PROD_Y + LANE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={PROD_COLOR}
          >
            生产者
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
                      seg.kind === "data"
                        ? 0.3
                        : seg.kind === "wait"
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
                    fontWeight={seg.kind === "data" ? 700 : 600}
                    fill={
                      seg.kind === "wait" || seg.kind === "data"
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

          {/* notify 叫醒竖线：从生产者 notify 段指向消费者，标「叫醒」 */}
          <line
            x1={slotX(4) - SEG_GAP / 2}
            y1={CONS_Y + LANE_H + 4}
            x2={slotX(4) - SEG_GAP / 2}
            y2={PROD_Y - 4}
            stroke="var(--warning)"
            strokeWidth="1.6"
            strokeDasharray="4 3"
            opacity="0.75"
          />
          <text
            x={slotX(4) - SEG_GAP / 2 + 4}
            y={QUEUE_Y + LANE_H / 2 + 4}
            fontSize="10"
            fontWeight="700"
            fill="var(--warning)"
          >
            🔔 叫醒
          </text>

          {/* 时间轴 */}
          <line
            x1={SWEEP_LEFT}
            y1={PROD_Y + LANE_H + 26}
            x2={SWEEP_RIGHT}
            y2={PROD_Y + LANE_H + 26}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            markerEnd="url(#cvwn-arrow)"
            opacity="0.6"
          />
          <text
            x={SWEEP_RIGHT}
            y={PROD_Y + LANE_H + 20}
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
              y1={CONS_Y - 8}
              x2="0"
              y2={PROD_Y + LANE_H + 8}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${CONS_Y - 8} L 5 ${CONS_Y - 8} L 0 ${CONS_Y - 3} z`}
              fill="var(--accent)"
            />
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="wait 不是忙等：队列空就释放锁睡眠；生产者 push 后 notify 按铃叫醒；消费者醒来再查一次谓词才取数据。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        条件变量（condition_variable）像服务员等的那只「上菜」铃：队列空时
        cv.wait 释放锁并睡眠（不空转占 CPU）；生产者 push 数据后 notify
        按铃叫醒它；消费者醒来必须再查一次谓词，确认真有数据才取——这就是防虚假唤醒的关键。
      </figcaption>
    </figure>
  );
}
