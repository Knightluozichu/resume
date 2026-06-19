"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <TimeScaleDiagram>：timeScale=0 暂停时，WaitForSeconds 冻住 vs WaitForSecondsRealtime 照走（HEL-283）。
 *
 * 本章关键陷阱的可视化——`Time.timeScale` 是「游戏世界的时间倍率」：=1 正常、=0.5 慢动作、
 * =0 整个暂停。`WaitForSeconds` 用的是「受 timeScale 缩放的游戏时间」，所以 timeScale=0
 * 时它的时钟**冻住、永远等不到**；而 `WaitForSecondsRealtime` 用「真实墙上时间」，**不受
 * timeScale 影响、照常走**。这就是「暂停游戏后，做暂停菜单倒计时为何必须用 Realtime」。
 *
 * 画面：左右两只秒表，下方一个 timeScale 滑块示意（从 1 调到 0）。分 3 步：
 *  ① timeScale = 1：两只表都在走（都能正常计到点）。
 *  ② 把 timeScale 调到 0（暂停游戏）：左表 WaitForSeconds 指针冻住、标红「卡死」；
 *     右表 WaitForSecondsRealtime 指针照走、标绿「照常」。
 *  ③ 结论条点亮：暂停下的倒计时 / 计时，要用 WaitForSecondsRealtime。
 *
 * label 锚定「该步动作完成」的时刻（lit = BEAT*(i+1)），修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；两只表与结论条互不重叠。
 */

const VIEW_W = 700;
const VIEW_H = 420;

// 两只秒表的圆心。
const CLOCK_R = 54;
const LEFT_CX = 180;
const RIGHT_CX = 520;
const CLOCK_CY = 168;

// timeScale 状态条 / 结论条。
const SCALE_Y = 286;
const CONC_Y = 344;
const CONC_H = 56;

function Stopwatch({
  cx,
  cy,
  color,
}: {
  cx: number;
  cy: number;
  color: string;
}) {
  // 静态表盘 + 12 点刻度（指针的「冻/走」靠各步的覆层标注表达，避免连续旋转动画带来魔法数字）。
  // 定点取整：Math.cos/sin 在 SSR(Node V8) 与浏览器 V8 末位可差 1 ULP，导致 hydration 属性不匹配；
  // 对所有由 Math 算出的坐标统一取 2 位小数，使两端序列化出完全相同的字符串（半径 54px 尺度下视觉无损）。
  const r2 = (n: number) => Math.round(n * 100) / 100;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={CLOCK_R}
        fill="var(--bg)"
        stroke={color}
        strokeWidth="2"
      />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = r2(cx + Math.cos(a) * (CLOCK_R - 8));
        const y1 = r2(cy + Math.sin(a) * (CLOCK_R - 8));
        const x2 = r2(cx + Math.cos(a) * (CLOCK_R - 3));
        const y2 = r2(cy + Math.sin(a) * (CLOCK_R - 3));
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
          />
        );
      })}
      {/* 指针（指向约 2 点钟方向，纯示意） */}
      <line
        x1={cx}
        y1={cy}
        x2={r2(cx + Math.cos(-Math.PI / 6) * (CLOCK_R - 16))}
        y2={r2(cy + Math.sin(-Math.PI / 6) * (CLOCK_R - 16))}
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="3.5" fill={color} />
    </g>
  );
}

const STEPS: readonly TeachingStep[] = [
  {
    label: "running",
    caption:
      "① Time.timeScale = 1（正常）：两只表都在走——WaitForSeconds 和 WaitForSecondsRealtime 都能正常计到点",
  },
  {
    label: "paused",
    caption:
      "② 把 timeScale 调到 0（暂停游戏）：左表 WaitForSeconds 冻住、永远等不到（用游戏时间）；右表 WaitForSecondsRealtime 照常走（用真实时间）",
  },
  {
    label: "rule",
    caption:
      "③ 结论：游戏暂停（timeScale=0）下还要计时 / 倒计时的协程，必须用 WaitForSecondsRealtime",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function TimeScaleDiagram() {
  const scaleZeroRef = useRef<SVGGElement | null>(null);
  const leftFreezeRef = useRef<SVGGElement | null>(null);
  const rightRunRef = useRef<SVGGElement | null>(null);
  const concRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步②：timeScale→0 标记 + 左表冻住红标 + 右表照常绿标（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (scaleZeroRef.current) {
        tl.add(
          scaleZeroRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      if (leftFreezeRef.current) {
        tl.add(
          leftFreezeRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      if (rightRunRef.current) {
        tl.add(
          rightRunRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      tl.label("paused", TEACHING_BEAT_MS * 2);

      // 步③：结论条淡入（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (concRef.current) {
        tl.add(
          concRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("rule", TEACHING_BEAT_MS * 3);

      tl.label("running", 0);
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
          aria-label="timeScale 等于 0 暂停时两种等待的对照动画。画面左右是两只秒表：左表代表 WaitForSeconds 用的是受 timeScale 缩放的游戏时间，右表代表 WaitForSecondsRealtime 用的是真实墙上时间。动画分三步。第一步 Time.timeScale 等于 1 正常状态，两只表都在走，两种等待都能正常计到点。第二步把 timeScale 调到 0，也就是暂停整个游戏，这时左表 WaitForSeconds 的时钟冻住、永远等不到，标红卡死，因为它的时间被 timeScale 缩放成了零；右表 WaitForSecondsRealtime 照常走，标绿照常，因为它用的是不受 timeScale 影响的真实时间。第三步给出结论：游戏暂停 timeScale 等于 0 的情况下还要计时或倒计时的协程，必须用 WaitForSecondsRealtime。动画可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={30}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            timeScale = 0 时：WaitForSeconds 冻住，Realtime 照走
          </text>
          <text
            x={VIEW_W / 2}
            y={52}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            timeScale 是「游戏世界的时间倍率」：1 正常 · 0.5 慢动作 · 0 暂停
          </text>

          {/* ===== 左表标题 ===== */}
          <text
            x={LEFT_CX}
            y={CLOCK_CY - CLOCK_R - 28}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            WaitForSeconds
          </text>
          <text
            x={LEFT_CX}
            y={CLOCK_CY - CLOCK_R - 12}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            用「游戏时间」（受 timeScale 缩放）
          </text>
          <Stopwatch cx={LEFT_CX} cy={CLOCK_CY} color="var(--warning)" />

          {/* ===== 右表标题 ===== */}
          <text
            x={RIGHT_CX}
            y={CLOCK_CY - CLOCK_R - 28}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            WaitForSecondsRealtime
          </text>
          <text
            x={RIGHT_CX}
            y={CLOCK_CY - CLOCK_R - 12}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            用「真实时间」（不受 timeScale 影响）
          </text>
          <Stopwatch cx={RIGHT_CX} cy={CLOCK_CY} color="var(--success)" />

          {/* ===== 左表「冻住」红覆层（步②） ===== */}
          <g ref={leftFreezeRef} opacity="0">
            <circle
              cx={LEFT_CX}
              cy={CLOCK_CY}
              r={CLOCK_R}
              fill="var(--danger)"
              fillOpacity="0.12"
              stroke="var(--danger)"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            <text
              x={LEFT_CX}
              y={CLOCK_CY + CLOCK_R + 22}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fill="var(--danger)"
            >
              ⏸ 冻住 · 永远等不到
            </text>
          </g>

          {/* ===== 右表「照走」绿覆层（步②） ===== */}
          <g ref={rightRunRef} opacity="0">
            <circle
              cx={RIGHT_CX}
              cy={CLOCK_CY}
              r={CLOCK_R}
              fill="var(--success)"
              fillOpacity="0.12"
              stroke="var(--success)"
              strokeWidth="2"
            />
            <text
              x={RIGHT_CX}
              y={CLOCK_CY + CLOCK_R + 22}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fill="var(--success)"
            >
              ✓ 照常走 · 仍能计到点
            </text>
          </g>

          {/* ===== timeScale 状态条 ===== */}
          <text
            x={24}
            y={SCALE_Y - 6}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            Time.timeScale
          </text>
          <rect
            x={140}
            y={SCALE_Y - 18}
            width={120}
            height={26}
            rx="6"
            fill="var(--text-secondary)"
            fillOpacity="0.08"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={200}
            y={SCALE_Y}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            = 1（正常）
          </text>
          {/* 调到 0 的覆层（步②） */}
          <g ref={scaleZeroRef} opacity="0">
            <rect
              x={300}
              y={SCALE_Y - 18}
              width={150}
              height={26}
              rx="6"
              fill="var(--danger)"
              fillOpacity="0.12"
              stroke="var(--danger)"
              strokeWidth="1.6"
            />
            <text
              x={375}
              y={SCALE_Y}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--danger)"
            >
              → = 0（暂停游戏）
            </text>
          </g>

          {/* ===== 结论条（步③） ===== */}
          <g ref={concRef} opacity="0">
            <rect
              x={24}
              y={CONC_Y}
              width={VIEW_W - 48}
              height={CONC_H}
              rx="9"
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x={VIEW_W / 2}
              y={CONC_Y + 24}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="700"
              fill="var(--accent)"
            >
              结论：暂停游戏（timeScale=0）下还要计时的协程 → 用
              WaitForSecondsRealtime
            </text>
            <text
              x={VIEW_W / 2}
              y={CONC_Y + 42}
              textAnchor="middle"
              fontSize="10.5"
              fill="var(--text-secondary)"
            >
              否则 WaitForSeconds 会随游戏一起冻住，那个 yield
              永远等不到、协程卡死在那一行
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：把 Time.timeScale 设成 0 暂停游戏，正在 WaitForSeconds(3) 等待的协程会怎样？单步走第②步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        WaitForSeconds 走「游戏时间」，会被 timeScale 缩放——timeScale=0
        时它冻住、永远等不到； WaitForSecondsRealtime 走「真实时间」，不受
        timeScale 影响。暂停下要计时，认准 Realtime。
      </figcaption>
    </figure>
  );
}
