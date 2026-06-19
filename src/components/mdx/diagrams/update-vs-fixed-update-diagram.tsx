"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <UpdateVsFixedUpdateDiagram>：Update 与 FixedUpdate 触发节拍的对照教学动画（HEL-281）。
 *
 * 同一段时间轴上两条时间线对照：
 *  - 上轨 Update：按「渲染帧」触发，帧间隔随帧率波动（deltaTime 变），刻度疏密不均。
 *  - 下轨 FixedUpdate：按固定步长触发（如每 0.02s 一次），与帧率脱钩，刻度完全均匀。
 *
 * 核心要讲清：一个渲染帧内，FixedUpdate 可能跑 0 次、1 次或多次——当某帧特别慢（卡顿），
 * 引擎会「补跑」多次 FixedUpdate 来追上固定的物理节拍。所以物理代码放 FixedUpdate，
 * 才不会因帧率忽高忽低而表现失真。
 *
 * 分 5 步：
 *  ① 公共时间轴。
 *  ② 上轨 Update 刻度逐个落下（间隔不均，标注 deltaTime 大小不一）。
 *  ③ 下轨 FixedUpdate 刻度逐个落下（间隔完全相等 = 0.02s）。
 *  ④ 高亮一个「慢帧」区间：这一个 Update 帧里挤进了多次 FixedUpdate。
 *  ⑤ 结论条：物理 / 力 放 FixedUpdate（与帧率脱钩，步长恒定）。
 *
 * 时间线 = 一条 anime.js timeline（5 个 beat）。每步内若有多刻度则错峰淡入，
 * 整步在 beat 末点亮完成；label 锚定 lit = BEAT*(i+1)，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6）。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-*），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 700;
const VIEW_H = 400;

// 公共时间轴几何。
const AXIS_X0 = 60; // 轴左端 x（t=0）
const AXIS_X1 = 640; // 轴右端 x（t=最大）
const AXIS_SPAN = AXIS_X1 - AXIS_X0;

const UPDATE_Y = 132; // 上轨基线 y
const FIXED_Y = 290; // 下轨基线 y
const TICK_H = 30; // 刻度竖线高度（从基线向上）

// 时间轴归一化 [0,1] → x。
const tx = (t: number) => AXIS_X0 + t * AXIS_SPAN;

// 上轨 Update 的「渲染帧」时刻（归一化），间隔故意不均——模拟帧率波动。
// 第 3、4 帧之间拉得很开 = 一个「慢帧」（卡顿），用来演示 FixedUpdate 补跑。
const UPDATE_TICKS: readonly number[] = [0.0, 0.16, 0.3, 0.72, 0.86, 1.0];
// 各帧的 deltaTime 标注（仅示意大小，相邻帧间隔）。
const UPDATE_DT: readonly string[] = ["16ms", "14ms", "42ms", "14ms", "14ms"];

// 下轨 FixedUpdate 的固定步长刻度（归一化）——完全均匀，与帧率无关。
const FIXED_COUNT = 9;
const FIXED_TICKS: readonly number[] = Array.from(
  { length: FIXED_COUNT },
  (_, i) => i / (FIXED_COUNT - 1),
);

// 「慢帧」高亮区间：第 3 帧(0.3) 到第 4 帧(0.72) 之间。
const SLOW_FROM = 0.3;
const SLOW_TO = 0.72;

const STEPS: readonly TeachingStep[] = [
  {
    label: "axis",
    caption: "① 同一段时间，两条轨道对照：上轨看 Update，下轨看 FixedUpdate",
  },
  {
    label: "update",
    caption:
      "② Update 按「渲染帧」触发——帧间隔随帧率忽快忽慢，deltaTime 时大时小，刻度疏密不均",
  },
  {
    label: "fixed",
    caption:
      "③ FixedUpdate 按固定步长（0.02s）触发——与帧率脱钩，刻度间隔完全相等",
  },
  {
    label: "catchup",
    caption:
      "④ 看这个「慢帧」：这一帧 Update 卡了很久，引擎在它之间补跑了好几次 FixedUpdate 来追物理节拍",
  },
  {
    label: "conclude",
    caption:
      "⑤ 结论：物理 / 加力 放 FixedUpdate——步长恒定，效果不随帧率高低而失真",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function UpdateVsFixedUpdateDiagram() {
  const axisRef = useRef<SVGGElement | null>(null);
  const updateRefs = useRef<Record<string, SVGGElement | null>>({});
  const fixedRefs = useRef<Record<string, SVGGElement | null>>({});
  const slowRef = useRef<SVGGElement | null>(null);
  const concludeRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fadeIn = (
        el: SVGElement | null,
        start: number,
        dur = TEACHING_BEAT_MS,
      ) => {
        if (!el) return;
        tl.add(el, { opacity: [0, 1], duration: dur, ease: "out(3)" }, start);
      };

      // ① 公共时间轴。
      fadeIn(axisRef.current, 0);
      tl.label("axis", TEACHING_BEAT_MS);

      // ② 上轨 Update 刻度错峰落下，整步在 t2+BEAT 点亮完成。
      const t2 = TEACHING_BEAT_MS;
      UPDATE_TICKS.forEach((_, i) => {
        const stagger = (TEACHING_BEAT_MS / UPDATE_TICKS.length) * i;
        fadeIn(
          updateRefs.current[`u-${i}`],
          t2 + stagger,
          TEACHING_BEAT_MS / UPDATE_TICKS.length,
        );
      });
      tl.label("update", TEACHING_BEAT_MS * 2);

      // ③ 下轨 FixedUpdate 刻度错峰落下。
      const t3 = TEACHING_BEAT_MS * 2;
      FIXED_TICKS.forEach((_, i) => {
        const stagger = (TEACHING_BEAT_MS / FIXED_TICKS.length) * i;
        fadeIn(
          fixedRefs.current[`f-${i}`],
          t3 + stagger,
          TEACHING_BEAT_MS / FIXED_TICKS.length,
        );
      });
      tl.label("fixed", TEACHING_BEAT_MS * 3);

      // ④ 慢帧高亮区间点亮。
      const t4 = TEACHING_BEAT_MS * 3;
      fadeIn(slowRef.current, t4);
      tl.label("catchup", TEACHING_BEAT_MS * 4);

      // ⑤ 结论条点亮。
      const t5 = TEACHING_BEAT_MS * 4;
      fadeIn(concludeRef.current, t5);
      tl.label("conclude", TEACHING_BEAT_MS * 5);
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
          aria-label="Update 与 FixedUpdate 触发节拍对照动画。同一段时间轴上有上下两条轨道。上轨是 Update，它按渲染帧触发，帧间隔随帧率忽快忽慢，相邻刻度疏密不均，deltaTime 时大时小。下轨是 FixedUpdate，它按固定步长零点零二秒触发，与帧率脱钩，刻度间隔完全相等。动画特别高亮一个慢帧区间：这一帧 Update 卡了很久，引擎在它之间补跑了好几次 FixedUpdate 来追上固定的物理节拍，说明一个渲染帧内 FixedUpdate 可能跑零次、一次或多次。结论是物理和加力的代码应放在 FixedUpdate 里，因为步长恒定，效果不随帧率高低而失真。动画分五步逐步演示，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            同一段时间里，两者触发的次数并不一样
          </text>

          {/* ===== ① 公共时间轴（上下两轨的基线 + 轴标）===== */}
          <g ref={axisRef} opacity="0">
            {/* 上轨基线 */}
            <line
              x1={AXIS_X0}
              y1={UPDATE_Y}
              x2={AXIS_X1}
              y2={UPDATE_Y}
              stroke="var(--border)"
              strokeWidth="2"
              markerEnd="url(#uvf-arrow)"
            />
            {/* 下轨基线 */}
            <line
              x1={AXIS_X0}
              y1={FIXED_Y}
              x2={AXIS_X1}
              y2={FIXED_Y}
              stroke="var(--border)"
              strokeWidth="2"
              markerEnd="url(#uvf-arrow)"
            />
            {/* 轨道名 */}
            <text
              x={AXIS_X0}
              y={UPDATE_Y - TICK_H - 16}
              fontSize="13"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--warning)"
            >
              Update()
            </text>
            <text
              x={AXIS_X0 + 88}
              y={UPDATE_Y - TICK_H - 16}
              fontSize="10.5"
              fill="var(--text-secondary)"
            >
              按渲染帧 · 间隔随帧率波动
            </text>
            <text
              x={AXIS_X0}
              y={FIXED_Y - TICK_H - 16}
              fontSize="13"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--success)"
            >
              FixedUpdate()
            </text>
            <text
              x={AXIS_X0 + 116}
              y={FIXED_Y - TICK_H - 16}
              fontSize="10.5"
              fill="var(--text-secondary)"
            >
              固定步长 0.02s · 与帧率脱钩
            </text>
            {/* 时间方向标 */}
            <text
              x={AXIS_X1}
              y={FIXED_Y + 22}
              textAnchor="end"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              时间 →
            </text>
          </g>

          {/* ===== ② 上轨 Update 刻度（间隔不均）===== */}
          {UPDATE_TICKS.map((t, i) => {
            const x = tx(t);
            return (
              <g
                key={`u-${i}`}
                ref={(el) => {
                  updateRefs.current[`u-${i}`] = el;
                }}
                opacity="0"
              >
                <line
                  x1={x}
                  y1={UPDATE_Y}
                  x2={x}
                  y2={UPDATE_Y - TICK_H}
                  stroke="var(--warning)"
                  strokeWidth="2.4"
                />
                <circle
                  cx={x}
                  cy={UPDATE_Y - TICK_H}
                  r="4"
                  fill="var(--warning)"
                />
                {/* deltaTime 标注：画在本帧与下一帧之间的中点上方 */}
                {i < UPDATE_TICKS.length - 1 && (
                  <text
                    x={(x + tx(UPDATE_TICKS[i + 1])) / 2}
                    y={UPDATE_Y + 18}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {UPDATE_DT[i]}
                  </text>
                )}
              </g>
            );
          })}

          {/* ===== ③ 下轨 FixedUpdate 刻度（间隔完全相等）===== */}
          {FIXED_TICKS.map((t, i) => {
            const x = tx(t);
            return (
              <g
                key={`f-${i}`}
                ref={(el) => {
                  fixedRefs.current[`f-${i}`] = el;
                }}
                opacity="0"
              >
                <line
                  x1={x}
                  y1={FIXED_Y}
                  x2={x}
                  y2={FIXED_Y - TICK_H}
                  stroke="var(--success)"
                  strokeWidth="2.4"
                />
                <circle
                  cx={x}
                  cy={FIXED_Y - TICK_H}
                  r="4"
                  fill="var(--success)"
                />
              </g>
            );
          })}

          {/* ===== ④ 慢帧高亮：一个 Update 帧区间内挤进多次 FixedUpdate ===== */}
          <g ref={slowRef} opacity="0">
            <rect
              x={tx(SLOW_FROM)}
              y={UPDATE_Y - TICK_H - 8}
              width={tx(SLOW_TO) - tx(SLOW_FROM)}
              height={FIXED_Y - (UPDATE_Y - TICK_H - 8) + 4}
              rx="8"
              fill="var(--danger)"
              fillOpacity="0.08"
              stroke="var(--danger)"
              strokeWidth="1.6"
              strokeDasharray="6 4"
            />
            <text
              x={(tx(SLOW_FROM) + tx(SLOW_TO)) / 2}
              y={UPDATE_Y + 40}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="700"
              fill="var(--danger)"
            >
              一个「慢帧」：Update 只走 1 次
            </text>
            <text
              x={(tx(SLOW_FROM) + tx(SLOW_TO)) / 2}
              y={UPDATE_Y + 56}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="700"
              fill="var(--danger)"
            >
              它之间 FixedUpdate 补跑了好几次
            </text>
          </g>

          {/* ===== ⑤ 结论条 ===== */}
          <g ref={concludeRef} opacity="0">
            <rect
              x={AXIS_X0}
              y={VIEW_H - 50}
              width={AXIS_SPAN}
              height="32"
              rx="7"
              fill="var(--accent)"
              fillOpacity="0.12"
              stroke="var(--accent)"
              strokeWidth="1.4"
            />
            <text
              x={VIEW_W / 2}
              y={VIEW_H - 30}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="600"
              fill="var(--accent)"
            >
              所以：移动 / 加力 等物理代码放
              FixedUpdate，效果才不随帧率高低而失真
            </text>
          </g>

          <defs>
            <marker
              id="uvf-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--border)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：游戏卡顿、帧率掉到一半时，FixedUpdate 一秒还会执行那么多次吗？单步到第 ④ 步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Update 跟着渲染帧走，帧率一波动它的间隔就变；FixedUpdate
        走固定步长，与帧率脱钩。 一个渲染帧里 FixedUpdate 可能跑 0 / 1 /
        多次——所以物理代码归 FixedUpdate 管。
      </figcaption>
    </figure>
  );
}
