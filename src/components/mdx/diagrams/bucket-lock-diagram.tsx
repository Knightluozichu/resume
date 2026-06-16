"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <BucketLockDiagram>：线程安全查找表的「分桶锁」动画（HEL-235，§3 引出 / §5 辅 Demo）。
 *
 * 餐厅后厨隐喻：按食材种类把后厨分成几个独立料理区（桶），每区各配一把小锁。厨师按手里
 * 食材的种类走到对应区——动不同区的厨师互不相干，可同时开工；只有挤进同一区才排队等。
 *
 * 一个哈希表 4 个桶，每桶一把独立 mutex：
 *  - 线程 A 的 key 哈希落到桶0 → 锁桶0；
 *  - 线程 B 的 key 落到桶2 → 锁桶2 → 与 A 是不同锁 → 并行；
 *  - 线程 C 的 key 也落到桶0 → 要锁桶0 → 与 A 争同一把锁 → 串行（等 A 放）。
 *
 * 可视化核心：分桶把「一把大锁」拆成「每桶一把锁」——落不同桶的访问并行，只有落同一桶
 * 才相互排队，降低争用。
 *
 * 时间线 = 一条 anime.js timeline，5 个关键帧：哈希落桶 → A 锁桶0 / B 锁桶2 并行 →
 * C 落桶0 等待 → A 放、C 接手。每个 step 的 label 锚定在「该拍点亮到最亮」时刻
 * （lit = beat*(i+1)），与 BucketLockDiagram 同书别图同款，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时
 * next/dynamic(ssr:false) 懒加载，不进首屏。
 *
 * 视觉全部 DESIGN token（accent / success / warning / danger / border / bg / text-*），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 660;
const VIEW_H = 320;

// 4 个桶横排。
const N_BUCKETS = 4;
const BUCKET_W = 120;
const BUCKET_H = 84;
const BUCKET_GAP = 24;
const BUCKET_Y = 150;
const FIRST_X = 36;
const bucketX = (i: number) => FIRST_X + i * (BUCKET_W + BUCKET_GAP);
const bucketCx = (i: number) => bucketX(i) + BUCKET_W / 2;

const A_COLOR = "var(--accent)"; // 线程 A
const B_COLOR = "var(--success)"; // 线程 B
const C_COLOR = "var(--warning)"; // 线程 C
const WAIT_COLOR = "var(--danger)"; // 等待

// 线程入场位置（顶部一排），落到哪个桶。
type ThreadInfo = {
  id: string;
  label: string;
  color: string;
  bucket: number; // 哈希落到的桶下标
  startX: number; // 顶部入场 x
};
const THREADS: readonly ThreadInfo[] = [
  {
    id: "A",
    label: 'A · key="apple"',
    color: A_COLOR,
    bucket: 0,
    startX: 96,
  },
  {
    id: "B",
    label: 'B · key="melon"',
    color: B_COLOR,
    bucket: 2,
    startX: 384,
  },
  {
    id: "C",
    label: 'C · key="acorn"',
    color: C_COLOR,
    bucket: 0,
    startX: 240,
  },
];

// 关键帧。
const STEPS: readonly TeachingStep[] = [
  {
    label: "hash",
    caption:
      "三个线程各拿一个 key，先哈希算出落到哪个桶（apple→桶0、melon→桶2、acorn→桶0）",
  },
  {
    label: "a-lock-0",
    caption: "线程 A 锁住桶0 的小锁，开始操作桶0",
  },
  {
    label: "b-lock-2",
    caption: "线程 B 落在桶2、另一把锁——和 A 互不相干，同一时刻并行开工",
  },
  {
    label: "c-wait",
    caption:
      "线程 C 也落桶0，要的是和 A 同一把锁——只有它得排队等（争用同一个桶）",
  },
  {
    label: "c-lock-0",
    caption:
      "A 放开桶0 的锁，C 立刻接手。分桶把一把大锁拆成多把，只有撞同一桶才串行",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

export function BucketLockDiagram() {
  // 每个桶一个「锁高亮层」ref：被某线程持有时点亮该色。
  const bucketLockRefs = useRef<Record<string, SVGGElement | null>>({});
  // 每个线程的「落桶连线 + 标记」ref。
  const threadRefs = useRef<Record<string, SVGGElement | null>>({});
  // C 的等待标记 ref。
  const cWaitRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // beat0 hash：三个线程的落桶连线一起淡入。
      THREADS.forEach((t) => {
        const el = threadRefs.current[t.id];
        if (el) {
          tl.add(
            el,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            TEACHING_BEAT_MS * BEAT_OF["hash"],
          );
        }
      });
      tl.label("hash", TEACHING_BEAT_MS * (BEAT_OF["hash"] + 1));

      // beat1 A 锁桶0。
      if (bucketLockRefs.current["b0-A"]) {
        tl.add(
          bucketLockRefs.current["b0-A"],
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * BEAT_OF["a-lock-0"],
        );
      }
      tl.label("a-lock-0", TEACHING_BEAT_MS * (BEAT_OF["a-lock-0"] + 1));

      // beat2 B 锁桶2（与 A 并行）。
      if (bucketLockRefs.current["b2-B"]) {
        tl.add(
          bucketLockRefs.current["b2-B"],
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * BEAT_OF["b-lock-2"],
        );
      }
      tl.label("b-lock-2", TEACHING_BEAT_MS * (BEAT_OF["b-lock-2"] + 1));

      // beat3 C 等待桶0（红虚线标记淡入）。
      if (cWaitRef.current) {
        tl.add(
          cWaitRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * BEAT_OF["c-wait"],
        );
      }
      tl.label("c-wait", TEACHING_BEAT_MS * (BEAT_OF["c-wait"] + 1));

      // beat4 A 放、C 接手：A 的锁标记淡出，C 的锁标记淡入，等待标记淡出。
      if (bucketLockRefs.current["b0-A"]) {
        tl.add(
          bucketLockRefs.current["b0-A"],
          { opacity: 0, duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * BEAT_OF["c-lock-0"],
        );
      }
      if (cWaitRef.current) {
        tl.add(
          cWaitRef.current,
          { opacity: 0, duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * BEAT_OF["c-lock-0"],
        );
      }
      if (bucketLockRefs.current["b0-C"]) {
        tl.add(
          bucketLockRefs.current["b0-C"],
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * BEAT_OF["c-lock-0"],
        );
      }
      tl.label("c-lock-0", TEACHING_BEAT_MS * (BEAT_OF["c-lock-0"] + 1));
    },
  });

  // 桶锁高亮层（描边 + 桶底「🔒 线程X」徽标）。
  const renderBucketLock = (
    key: string,
    bucket: number,
    color: string,
    holderText: string,
  ) => (
    <g
      ref={(el) => {
        bucketLockRefs.current[key] = el;
      }}
      style={{ opacity: 0 }}
    >
      <rect
        x={bucketX(bucket)}
        y={BUCKET_Y}
        width={BUCKET_W}
        height={BUCKET_H}
        rx="10"
        fill={color}
        fillOpacity="0.16"
        stroke={color}
        strokeWidth="2.6"
      />
      <text
        x={bucketCx(bucket)}
        y={BUCKET_Y + BUCKET_H - 12}
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill={color}
      >
        {holderText}
      </text>
    </g>
  );

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
          aria-label="线程安全查找表的分桶锁动画。一个哈希表有四个桶，每个桶各配一把独立的锁。第一步三个线程各拿一个 key 先哈希算出落到哪个桶：线程 A 的 key apple 落桶0，线程 B 的 key melon 落桶2，线程 C 的 key acorn 也落桶0。第二步线程 A 锁住桶0 开始操作。第三步线程 B 落在桶2、是另一把锁，和 A 互不相干，在同一时刻并行开工。第四步线程 C 也落桶0，要的是和 A 同一把锁，只有它需要排队等待。第五步 A 放开桶0 的锁，C 立刻接手。分桶把一把大锁拆成每桶一把锁，落不同桶的访问并行，只有落同一桶才相互串行排队，降低锁争用。播放时按五步依次点亮，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* 标题 */}
          <text
            x="20"
            y="30"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            分桶锁：每个桶一把独立的锁
          </text>
          <text x="20" y="48" fontSize="11" fill="var(--text-secondary)">
            key 先哈希落桶——落不同桶并行，落同一桶才排队
          </text>

          {/* 三个线程的落桶连线 + 顶部标记（hash 步淡入） */}
          {THREADS.map((t) => {
            const isC = t.id === "C";
            return (
              <g
                key={`th-${t.id}`}
                ref={(el) => {
                  threadRefs.current[t.id] = el;
                }}
                style={{ opacity: 0 }}
              >
                {/* 线程标记胶囊（顶部，宽 124、各居中于 startX，互不重叠） */}
                <rect
                  x={t.startX - 62}
                  y="64"
                  width="124"
                  height="22"
                  rx="6"
                  fill="var(--bg)"
                  stroke={t.color}
                  strokeWidth="1.4"
                />
                <text
                  x={t.startX}
                  y="79"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill={t.color}
                >
                  {t.label}
                </text>
                {/* 落桶连线（C 用虚线，强调它要去争已被占的桶） */}
                <line
                  x1={t.startX}
                  y1="88"
                  x2={bucketCx(t.bucket)}
                  y2={BUCKET_Y - 4}
                  stroke={t.color}
                  strokeWidth="1.8"
                  strokeDasharray={isC ? "6 4" : undefined}
                  opacity="0.8"
                />
              </g>
            );
          })}

          {/* 四个桶：底层常驻框 + 锁高亮层 */}
          {Array.from({ length: N_BUCKETS }, (_, i) => (
            <g key={`bucket-${i}`}>
              <rect
                x={bucketX(i)}
                y={BUCKET_Y}
                width={BUCKET_W}
                height={BUCKET_H}
                rx="10"
                fill="var(--text-secondary)"
                fillOpacity="0.06"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={bucketCx(i)}
                y={BUCKET_Y + 24}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {`桶 ${i}`}
              </text>
              <text
                x={bucketCx(i)}
                y={BUCKET_Y + 42}
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                各一把 mutex
              </text>
            </g>
          ))}

          {/* 锁高亮层：A 锁桶0 / B 锁桶2 / C 锁桶0（A 放后才亮） */}
          {renderBucketLock("b0-A", 0, A_COLOR, "🔒 A 持有")}
          {renderBucketLock("b2-B", 2, B_COLOR, "🔒 B 持有")}
          {renderBucketLock("b0-C", 0, C_COLOR, "🔒 C 持有")}

          {/* C 等待桶0 的红色标记（c-wait 步淡入，放桶0 上方不与 A 持有徽标重叠） */}
          <g ref={cWaitRef} style={{ opacity: 0 }}>
            <rect
              x={bucketCx(0) - 40}
              y={BUCKET_Y + BUCKET_H + 8}
              width="80"
              height="20"
              rx="6"
              fill="var(--bg)"
              stroke={WAIT_COLOR}
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />
            <text
              x={bucketCx(0)}
              y={BUCKET_Y + BUCKET_H + 22}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={WAIT_COLOR}
            >
              ⏳ C 等桶0
            </text>
          </g>

          {/* 并行标注：B 在桶2 与 A 并行（放桶2 下方） */}
          <text
            x={bucketCx(2)}
            y={BUCKET_Y + BUCKET_H + 22}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            与 A 并行 ✓
          </text>

          {/* 底部说明 */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 18}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            落不同桶 = 不同锁 = 并行；落同一桶 = 同一把锁 = 排队
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="A 落桶0、B 落桶2——不同锁，并行；C 也落桶0——和 A 争同一把锁，排队。分桶把一把大锁拆成多把，只有撞同一桶才串行。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分桶锁像按食材种类把后厨分成几个独立料理区，各区各一把小锁：动不同区的厨师可同时
        开工，只有挤进同一区才排队。key
        先哈希落桶，落不同桶的访问用的是不同的锁，因此并行；
        只有落到同一个桶才争同一把锁、相互串行——这就是「分桶降低锁争用」。
      </figcaption>
    </figure>
  );
}
