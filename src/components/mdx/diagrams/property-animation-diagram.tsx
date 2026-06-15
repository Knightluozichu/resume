"use client";

import { useRef } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <PropertyAnimationDiagram>：《Android 编程权威指南》advanced-ui-animation/property-animation
 * 章「属性动画原理」配图（HEL-200）。
 *
 * 「可控教学动画」：把一次 `ObjectAnimator.ofFloat(view,"translationX",0f,300f)`
 * 拆开演示，看清属性动画到底在每一帧干了什么——
 *   ① 左侧「目标对象」方块停在起点（translationX = 0），右侧画一条
 *      AccelerateDecelerate 插值器的 S 形曲线（横轴 = 时间进度 0~1，
 *      纵轴 = 插值后的比例 fraction），曲线上一个进度点停在左下角原点 →
 *   ② ValueAnimator 每帧按 interpolator 算出当前进度对应的中间值：
 *      进度点爬到约 0.25 处（S 形左段平缓 = 慢启动），fraction≈0.15、
 *      方块沿 translationX 移到约 45px →
 *   ③ 进度到中段（约 0.5）：S 形最陡（加速），fraction=0.5、方块到 150px →
 *   ④ 接近结束（约 0.75）：S 形右段重新变缓（减速），fraction≈0.85、方块到 255px →
 *   ⑤ 到终值：进度点抵达右上角（1,1），fraction=1、方块停在终点 300px。
 *
 * 三件套同步：进度点的「纵向高度」体现 S 形（慢-快-慢），方块的「水平位移」
 * 与之一一对应（fraction × 300px），底部读数 `translationX: 0 → 300` 同步跳动。
 * 这就是 ObjectAnimator 自动反射 set 属性、ValueAnimator 只算值的全过程。
 *
 * 时序照 ConfigChangeViewModelDiagram / GradleBuildPipelineDiagram：步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，label 落在呈现完成处 BEAT*(i+1)，末步停在亮态不淡出
 * （表示动画跑完、方块停在终点），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量、几何布局常量均为
 * 4 的倍数且具名（硬规则 5）。
 */

// —— 画布常量（均为 4 的倍数）。 ——
const VIEW_W = 680;
const VIEW_H = 360;

// —— 左侧「目标对象」轨道：方块沿 translationX 从 TRACK_X0 平移到 TRACK_X1。 ——
const BOX_SIZE = 48;
const BOX_Y = 64; // 方块顶边 y
const TRACK_X0 = 48; // translationX = 0 的水平位置（轨道起点）
const TRACK_X1 = 348; // translationX = 300 的水平位置（轨道终点）
const TRACK_Y = BOX_Y + BOX_SIZE + 16; // 轨道刻度线 y
// 属性最大值（dp），方块位移 = fraction × TRANSLATION_MAX 的等比映射。
const TRANSLATION_MAX = 300;

// —— 右侧插值器曲线坐标系（横轴 = 时间进度 0~1，纵轴 = 插值后 fraction 0~1）。 ——
const PLOT_X = 432; // 曲线区左边界（纵轴所在 x）
const PLOT_Y = 56; // 曲线区上边界（fraction = 1 处）
const PLOT_W = 200; // 横轴像素宽（对应进度 0~1）
const PLOT_H = 200; // 纵轴像素高（对应 fraction 0~1）
const PLOT_BOTTOM = PLOT_Y + PLOT_H; // fraction = 0 处 y（原点）

// AccelerateDecelerate 插值器：fraction(t) = (1 - cos(πt)) / 2（慢-快-慢 S 形）。
const accelDecel = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;

// 进度 t（0~1）→ 曲线区像素坐标 {cx, cy}。纵轴向下，故 cy 用 PLOT_BOTTOM 减去高度。
const plotPoint = (t: number) => ({
  cx: PLOT_X + t * PLOT_W,
  cy: PLOT_BOTTOM - accelDecel(t) * PLOT_H,
});

// 采样足够密的点连成 S 形曲线路径（只读常量，渲染期一次成型）。
const CURVE_PATH = (() => {
  const SAMPLES = 48; // 4 的倍数，足够平滑
  let d = "";
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const { cx, cy } = plotPoint(t);
    d += `${i === 0 ? "M" : "L"} ${cx.toFixed(2)} ${cy.toFixed(2)} `;
  }
  return d.trim();
})();

// —— 关键帧步骤：每步给定进度 t，派生出 fraction、方块 x、读数。 ——
type Frame = {
  /** 时间进度 0~1（横轴）。 */
  t: number;
};

const FRAMES: readonly Frame[] = [
  { t: 0 }, // ① 起点
  { t: 0.25 }, // ② 慢启动（S 形左段平缓）
  { t: 0.5 }, // ③ 中段最陡（加速）
  { t: 0.75 }, // ④ 右段重新变缓（减速）
  { t: 1 }, // ⑤ 终值
];

// 由进度 t 派生：插值后 fraction、方块水平位置 x、translationX 读数（整数）。
const fractionAt = (t: number) => accelDecel(t);
const boxXAt = (t: number) => TRACK_X0 + fractionAt(t) * (TRACK_X1 - TRACK_X0);
const translationAt = (t: number) => Math.round(fractionAt(t) * TRANSLATION_MAX);

const STEPS: readonly TeachingStep[] = [
  {
    label: "define",
    caption:
      "① ObjectAnimator.ofFloat(view,\"translationX\",0f,300f)：目标方块停在起点，translationX = 0",
  },
  {
    label: "slow-start",
    caption:
      "② ValueAnimator 每帧按插值器算值：进度点爬到约 0.25，S 形左段平缓=慢启动，translationX ≈ 45",
  },
  {
    label: "fastest",
    caption:
      "③ 进度到中段约 0.5：S 形最陡=加速最快，fraction = 0.5，方块移到 translationX = 150",
  },
  {
    label: "slow-end",
    caption:
      "④ 接近结束约 0.75：S 形右段重新变缓=减速，fraction ≈ 0.85，translationX ≈ 255",
  },
  {
    label: "finish",
    caption:
      "⑤ 到终值：进度点抵达右上角(1,1)，ObjectAnimator 反射调 setTranslationX(300)，方块停在终点",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function PropertyAnimationDiagram() {
  // anime.js 驱动的 DOM 引用：被平移的目标方块组、曲线上的进度点、translationX 读数。
  const boxRef = useRef<SVGGElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const readoutRef = useRef<SVGTextElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      FRAMES.forEach((frame, i) => {
        // 步 i 呈现占 [BEAT*i, BEAT*(i+1)]，lit = BEAT*(i+1) = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const { cx, cy } = plotPoint(frame.t);
        const boxX = boxXAt(frame.t);
        const tx = translationAt(frame.t);

        if (i === 0) {
          // 起始帧：方块、进度点、读数都已在初始位置（见 JSX 初值），
          // 这里只做一次轻提（淡入到位），不平移——把「定义动画、停在起点」演出来。
          if (boxRef.current) {
            tl.add(
              boxRef.current,
              { opacity: [0.5, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
              start,
            );
          }
          if (dotRef.current) {
            tl.add(
              dotRef.current,
              { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
              start,
            );
          }
          tl.label("define", lit);
          return;
        }

        // 后续帧：方块沿 translationX 平移、进度点沿 S 形曲线移动、读数跳到当前 translationX。
        // 三者占同一时间窗 [start, lit]，故水平位移与曲线高度严格同步。
        if (boxRef.current) {
          tl.add(
            boxRef.current,
            { x: boxX, duration: TEACHING_BEAT_MS, ease: "linear" },
            start,
          );
        }
        if (dotRef.current) {
          tl.add(
            dotRef.current,
            { cx, cy, duration: TEACHING_BEAT_MS, ease: "linear" },
            start,
          );
        }
        if (readoutRef.current) {
          // 读数用整数步进：每帧把文本内容设为当前 translationX（无补间，避免出现小数抖动）。
          tl.add(
            readoutRef.current,
            {
              duration: TEACHING_BEAT_MS,
              onUpdate: () => {
                if (readoutRef.current) {
                  readoutRef.current.textContent = `translationX = ${tx}`;
                }
              },
            },
            start,
          );
        }
        tl.label(STEPS[i].label, lit);
      });
    },
  });

  // 初始（t = 0）几何：方块在起点、进度点在原点、读数为 0。
  const startPoint = plotPoint(0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签（与站内 Demo 容器气质一致） */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="属性动画原理：把一次 ObjectAnimator.ofFloat(view, translationX, 0f, 300f) 拆开演示。画面分两部分：左侧是被动画的目标对象（一个方块）沿一条水平轨道做 translationX 平移，轨道起点标 0、终点标 300；右侧是一条 AccelerateDecelerate 插值器的 S 形曲线，横轴是时间进度 0 到 1，纵轴是插值后的比例 fraction 0 到 1，曲线上有一个随进度移动的圆点；下方是当前属性值读数 translationX。五步演示：① ObjectAnimator 定义好，目标方块停在起点，translationX 等于 0，进度点在曲线左下角原点；② ValueAnimator 每帧按插值器算值，进度点爬到约 0.25 处，此时 S 形曲线左段很平缓，代表慢启动，fraction 约 0.15，方块移到约 45px；③ 进度到中段约 0.5，S 形曲线在这里最陡，代表加速最快，fraction 等于 0.5，方块移到 translationX 等于 150；④ 接近结束约 0.75，S 形曲线右段重新变缓，代表减速，fraction 约 0.85，translationX 约 255；⑤ 到终值，进度点抵达右上角坐标 1 比 1，ObjectAnimator 通过反射自动调用 setTranslationX 把属性设为 300，方块停在终点。核心是进度点的纵向高度体现 S 形的慢快慢节奏，方块的水平位移与之一一对应。说明：ValueAnimator 只负责算出每帧的值，需要你在 onUpdate 里手动 set；ObjectAnimator 则自动通过反射 set 目标对象的属性；TimeInterpolator 控制快慢节奏；AnimatorSet 用来编排多个动画。可播放、暂停、单步、拖动进度逐帧观察。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="pa-axis-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* ===== 左半区：被动画的目标对象 + translationX 平移轨道 ===== */}
          <text
            x={TRACK_X0}
            y={32}
            textAnchor="start"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            目标对象（ObjectAnimator 反射 set 属性）
          </text>

          {/* 平移轨道（常驻参照） + 起点/终点刻度 */}
          <line
            x1={TRACK_X0}
            y1={TRACK_Y}
            x2={TRACK_X1 + BOX_SIZE}
            y2={TRACK_Y}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            markerEnd="url(#pa-axis-arrow)"
            opacity="0.6"
          />
          {/* 起点刻度 0 */}
          <line
            x1={TRACK_X0}
            y1={TRACK_Y - 6}
            x2={TRACK_X0}
            y2={TRACK_Y + 6}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <text
            x={TRACK_X0}
            y={TRACK_Y + 24}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            0
          </text>
          {/* 终点刻度 300 */}
          <line
            x1={TRACK_X1}
            y1={TRACK_Y - 6}
            x2={TRACK_X1}
            y2={TRACK_Y + 6}
            stroke="var(--success)"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <text
            x={TRACK_X1}
            y={TRACK_Y + 24}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
          >
            300
          </text>

          {/* 目标方块（anime.js 驱动其 x；初始在起点 TRACK_X0）。 */}
          <g ref={boxRef} opacity={0.5}>
            <rect
              x={TRACK_X0}
              y={BOX_Y}
              width={BOX_SIZE}
              height={BOX_SIZE}
              rx="8"
              fill="var(--accent)"
              fillOpacity="0.16"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x={TRACK_X0 + BOX_SIZE / 2}
              y={BOX_Y + BOX_SIZE / 2 + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              view
            </text>
          </g>

          {/* translationX 读数（anime.js 每帧改 textContent；初始 0）。 */}
          <text
            x={TRACK_X0}
            y={VIEW_H - 40}
            textAnchor="start"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            当前属性值（ValueAnimator 只算值，需手动 set）：
          </text>
          <text
            ref={readoutRef}
            x={TRACK_X0}
            y={VIEW_H - 18}
            textAnchor="start"
            fontSize="16"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            translationX = 0
          </text>

          {/* ===== 右半区：AccelerateDecelerate 插值器曲线（时间→fraction） ===== */}
          <text
            x={PLOT_X}
            y={32}
            textAnchor="start"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            TimeInterpolator（控制快慢节奏）
          </text>

          {/* 坐标系：纵轴（fraction）+ 横轴（时间进度） */}
          <line
            x1={PLOT_X}
            y1={PLOT_Y}
            x2={PLOT_X}
            y2={PLOT_BOTTOM}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <line
            x1={PLOT_X}
            y1={PLOT_BOTTOM}
            x2={PLOT_X + PLOT_W}
            y2={PLOT_BOTTOM}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            opacity="0.5"
          />
          {/* 轴标注 */}
          <text
            x={PLOT_X - 8}
            y={PLOT_Y + 4}
            textAnchor="end"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            1
          </text>
          <text
            x={PLOT_X - 8}
            y={PLOT_BOTTOM + 4}
            textAnchor="end"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            0
          </text>
          <text
            x={PLOT_X - 12}
            y={(PLOT_Y + PLOT_BOTTOM) / 2}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
            transform={`rotate(-90 ${PLOT_X - 12} ${(PLOT_Y + PLOT_BOTTOM) / 2})`}
          >
            fraction
          </text>
          <text
            x={PLOT_X + PLOT_W}
            y={PLOT_BOTTOM + 18}
            textAnchor="end"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            时间进度 →
          </text>
          {/* 对角线参照（匀速 = LinearInterpolator），衬托 S 形的慢快慢 */}
          <line
            x1={PLOT_X}
            y1={PLOT_BOTTOM}
            x2={PLOT_X + PLOT_W}
            y2={PLOT_Y}
            stroke="var(--text-secondary)"
            strokeWidth="1"
            strokeDasharray="3 4"
            opacity="0.35"
          />
          <text
            x={PLOT_X + PLOT_W - 8}
            y={PLOT_Y + 44}
            textAnchor="end"
            fontSize="8.5"
            fill="var(--text-secondary)"
            opacity="0.7"
          >
            匀速(Linear)参照
          </text>

          {/* S 形插值曲线（AccelerateDecelerate） */}
          <path
            d={CURVE_PATH}
            fill="none"
            stroke="var(--warning)"
            strokeWidth="2.4"
          />
          <text
            x={PLOT_X + PLOT_W / 2}
            y={PLOT_BOTTOM + 34}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--warning)"
          >
            AccelerateDecelerate（慢→快→慢）
          </text>

          {/* 沿曲线移动的进度点（anime.js 驱动 cx/cy；初始在原点）。 */}
          <circle
            ref={dotRef}
            cx={startPoint.cx}
            cy={startPoint.cy}
            r="6"
            fill="var(--accent)"
            stroke="var(--bg)"
            strokeWidth="2"
            opacity={0}
          />

          {/* 编排说明：AnimatorSet 编排多个动画 */}
          <text
            x={VIEW_W - 16}
            y={VIEW_H - 18}
            textAnchor="end"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            多个这样的动画可用 AnimatorSet 编排（同时 / 顺序）
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放：左侧方块沿 translationX 平移、右侧进度点沿插值曲线移动、底部读数同步跳动——三者同一时间窗严格对应。可暂停、单步、拖进度逐帧观察 S 形的慢→快→慢。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        属性动画原理：ValueAnimator 每帧按 TimeInterpolator（这里是 S 形的
        AccelerateDecelerate）算出 0~1 的 fraction，再映射成 translationX；
        ObjectAnimator 则通过反射自动把这个值 set 到 view 上——所以方块的位移
        与曲线高度一一对应：慢启动、中段加速、临近终点减速。
      </figcaption>
    </figure>
  );
}
