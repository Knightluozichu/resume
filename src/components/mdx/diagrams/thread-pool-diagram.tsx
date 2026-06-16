"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ThreadPoolDiagram>：最简线程池「固定一队工人 + 一个任务队列」的动画（HEL-238，§5 主 Demo）。
 *
 * 餐厅后厨隐喻：线程池 = 雇一队固定的帮厨待命，活儿（任务）进单子筐（任务队列），
 * 谁空了就抓一张来做，做完再抓——不用每来一道菜就新雇/解雇一个厨师。
 *
 * 布局：上方一个任务队列（4 张待办任务方块 T1..T4），下方三个工作线程 worker0/1/2。
 * 分 5 拍：
 *  ① 提交任务：T1..T4 入队列（队列方块整排亮起）；
 *  ② worker0 空闲 → 从队头取 T1 → 执行（worker0 槽亮 + T1 出队变灰）；
 *  ③ worker1 也取 T2 并行执行（worker1 槽亮 + T2 出队）；
 *  ④ worker0 做完 T1 → 再取 T3（worker0 复用：同一个工人接着干，不新建）；
 *  ⑤ worker2 取 T4，队列清空——全队复用三个固定工人，省去频繁建销线程。
 *
 * 可视化核心：固定 N 个工人循环「取任务→执行→再取」，复用线程而非来一个任务建一个。
 *
 * 时间线 = 一条 anime.js timeline，playhead 横扫 5 个关键帧分段点亮。
 * 每个 step 的 label 锚定在「对应段点亮到最亮」的时刻（lit = beat*(i+1)），与
 * CondVarWaitNotifyDiagram / MutexSerializeDiagram 同款写法，修正 off-by-one。
 *
 * 视觉全部走 DESIGN token（accent / success / warning / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 660;
const VIEW_H = 320;

// 任务队列：上方一排 4 个任务方块。
const TASK_LABELS = ["T1", "T2", "T3", "T4"] as const;
const QUEUE_Y = 78;
const TASK_W = 60;
const TASK_H = 40;
const TASK_GAP = 14;
const QUEUE_X0 = 150; // 第一个任务方块左缘（左侧留给「任务队列」标签）
const taskX = (i: number) => QUEUE_X0 + i * (TASK_W + TASK_GAP);

// 三个工作线程：下方一排三个槽。
const WORKER_LABELS = ["worker0", "worker1", "worker2"] as const;
const WORKER_Y = 210;
const WORKER_W = 150;
const WORKER_H = 56;
const WORKER_GAP = 22;
const WORKER_X0 = 60;
const workerX = (i: number) => WORKER_X0 + i * (WORKER_W + WORKER_GAP);

const QUEUE_COLOR = "var(--warning)"; // 待办任务（单子筐里的活儿）
const RUN_COLOR = "var(--success)"; // 正在执行（帮厨在干活）
const IDLE_COLOR = "var(--text-secondary)"; // 空闲工人

// 每拍点亮哪些元素。第 i 个 worker 在某拍接的任务 = runTask。
type Beat = {
  label: string;
  caption: string;
  // 这一拍队列里还「待办」的任务下标（其余视为已出队/正在被某 worker 跑）。
  pending: number[];
  // 这一拍各 worker 正在跑的任务下标（null = 空闲）。
  workerTask: (number | null)[];
};

const BEATS: readonly Beat[] = [
  {
    label: "submit",
    caption: "提交任务：T1~T4 全进任务队列（单子筐）排队等做",
    pending: [0, 1, 2, 3],
    workerTask: [null, null, null],
  },
  {
    label: "w0-take-t1",
    caption: "worker0 空闲 → 从队头抓 T1 来做（执行中）",
    pending: [1, 2, 3],
    workerTask: [0, null, null],
  },
  {
    label: "w1-take-t2",
    caption: "worker1 也空闲 → 抓 T2 并行做——两个工人同时开工",
    pending: [2, 3],
    workerTask: [0, 1, null],
  },
  {
    label: "w0-take-t3",
    caption: "worker0 做完 T1 → 同一个工人再抓 T3（复用，不新建线程）",
    pending: [3],
    workerTask: [2, 1, null],
  },
  {
    label: "w2-take-t4",
    caption: "worker2 抓 T4，队列清空——三个固定工人循环复用，干完所有活",
    pending: [],
    workerTask: [2, 1, 3],
  },
];

const STEPS: readonly TeachingStep[] = BEATS.map((b) => ({
  label: b.label,
  caption: b.caption,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  BEATS.map((b) => [b.label, b.caption]),
);

const SWEEP_LEFT = WORKER_X0 - 18;
const SWEEP_RIGHT = taskX(TASK_LABELS.length - 1) + TASK_W + 18;

export function ThreadPoolDiagram() {
  // 每拍一个覆盖层 <g>，anime 点亮（opacity 0→1），切换到该拍的快照画面。
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
        // 当前拍淡入，前一拍淡出，做到「同一时刻只显示一拍快照」。
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
          aria-label="最简线程池的动画。上方是任务队列，里面排着 T1 到 T4 四张待办任务；下方是三个固定的工作线程 worker0、worker1、worker2。第一步提交任务，T1 到 T4 全部进入任务队列排队。第二步 worker0 空闲，从队头抓走 T1 开始执行。第三步 worker1 也空闲，抓走 T2 并行执行，两个工人同时开工。第四步 worker0 做完 T1，同一个工人再抓 T3 继续做，复用线程而不是新建。第五步 worker2 抓走 T4，队列清空，三个固定工人循环复用做完所有活。播放时 playhead 从左向右横扫，可播放、暂停、单步、拖动进度。"
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
            最简线程池：固定一队工人，循环取任务
          </text>
          <text x="20" y="50" fontSize="11" fill="var(--text-secondary)">
            活儿进队列，谁空了抓一张做，做完再抓——线程复用，不频繁建销
          </text>

          {/* 任务队列标签 */}
          <text
            x="20"
            y={QUEUE_Y + TASK_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill={QUEUE_COLOR}
          >
            任务队列
          </text>

          {/* 任务队列底框（常驻） */}
          <rect
            x={QUEUE_X0 - 12}
            y={QUEUE_Y - 12}
            width={
              taskX(TASK_LABELS.length - 1) + TASK_W + 12 - (QUEUE_X0 - 12)
            }
            height={TASK_H + 24}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* 工人槽底框（常驻空闲态） */}
          {WORKER_LABELS.map((w, i) => {
            const x = workerX(i);
            return (
              <g key={`base-${w}`}>
                <rect
                  x={x}
                  y={WORKER_Y}
                  width={WORKER_W}
                  height={WORKER_H}
                  rx="8"
                  fill={IDLE_COLOR}
                  fillOpacity="0.06"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={x + 14}
                  y={WORKER_Y + 22}
                  fontSize="12.5"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {w}
                </text>
              </g>
            );
          })}

          {/* 每拍快照覆盖层：仅当前拍 opacity=1 */}
          {BEATS.map((b, bi) => (
            <g
              key={b.label}
              ref={(el) => {
                beatRefs.current[b.label] = el;
              }}
              style={{ opacity: bi === 0 ? 1 : 0 }}
            >
              {/* 队列里待办的任务方块 */}
              {TASK_LABELS.map((t, ti) => {
                if (!b.pending.includes(ti)) return null;
                const x = taskX(ti);
                return (
                  <g key={`q-${b.label}-${t}`}>
                    <rect
                      x={x}
                      y={QUEUE_Y}
                      width={TASK_W}
                      height={TASK_H}
                      rx="6"
                      fill={QUEUE_COLOR}
                      fillOpacity="0.28"
                      stroke={QUEUE_COLOR}
                      strokeWidth="1.6"
                    />
                    <text
                      x={x + TASK_W / 2}
                      y={QUEUE_Y + TASK_H / 2 + 5}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="700"
                      fill="var(--text-primary)"
                    >
                      {t}
                    </text>
                  </g>
                );
              })}

              {/* 各 worker 当前在跑的任务 */}
              {b.workerTask.map((task, wi) => {
                if (task === null) {
                  const x = workerX(wi);
                  return (
                    <text
                      key={`idle-${b.label}-${wi}`}
                      x={x + WORKER_W - 14}
                      y={WORKER_Y + WORKER_H - 12}
                      textAnchor="end"
                      fontSize="11"
                      fill={IDLE_COLOR}
                    >
                      空闲待命
                    </text>
                  );
                }
                const x = workerX(wi);
                return (
                  <g key={`run-${b.label}-${wi}`}>
                    <rect
                      x={x}
                      y={WORKER_Y}
                      width={WORKER_W}
                      height={WORKER_H}
                      rx="8"
                      fill={RUN_COLOR}
                      fillOpacity="0.18"
                      stroke={RUN_COLOR}
                      strokeWidth="2"
                    />
                    <text
                      x={x + 14}
                      y={WORKER_Y + 22}
                      fontSize="12.5"
                      fontWeight="700"
                      fill="var(--text-primary)"
                    >
                      {WORKER_LABELS[wi]}
                    </text>
                    <text
                      x={x + WORKER_W - 14}
                      y={WORKER_Y + WORKER_H - 12}
                      textAnchor="end"
                      fontSize="12"
                      fontWeight="700"
                      fill={RUN_COLOR}
                    >
                      执行 {TASK_LABELS[task]} ⚙
                    </text>
                  </g>
                );
              })}
            </g>
          ))}

          {/* 「取任务」下行箭头：从队列指向工人区 */}
          <line
            x1={QUEUE_X0 + 40}
            y1={QUEUE_Y + TASK_H + 16}
            x2={QUEUE_X0 + 40}
            y2={WORKER_Y - 8}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
            opacity="0.6"
          />
          <text
            x={QUEUE_X0 + 48}
            y={(QUEUE_Y + TASK_H + WORKER_Y) / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            取任务 ↓
          </text>

          {/* 时间轴 */}
          <line
            x1={SWEEP_LEFT}
            y1={WORKER_Y + WORKER_H + 30}
            x2={SWEEP_RIGHT}
            y2={WORKER_Y + WORKER_H + 30}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <text
            x={SWEEP_RIGHT}
            y={WORKER_Y + WORKER_H + 24}
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
              y1={QUEUE_Y - 18}
              x2="0"
              y2={WORKER_Y + WORKER_H + 12}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${QUEUE_Y - 18} L 5 ${QUEUE_Y - 18} L 0 ${QUEUE_Y - 13} z`}
              fill="var(--accent)"
            />
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="固定三个工人 worker0/1/2 循环「取任务→执行→再取」：任务进队列排队，谁空了抓一张做，做完接着抓下一张——线程被复用，省去每来一个任务就新建/销毁线程的开销。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        线程池 =
        雇一队固定的帮厨（工作线程）待命：活儿（任务）进单子筐（任务队列），谁空了就抓一张来做、做完再抓。三个工人循环复用，不必每来一道菜就新雇一个厨师——这正是省下频繁创建/销毁线程开销的关键。
      </figcaption>
    </figure>
  );
}
