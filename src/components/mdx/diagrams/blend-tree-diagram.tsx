"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <BlendTreeDiagram>：辅图——「1D 混合树：按 Speed 在多个 clip 间平滑混合」（HEL-286）。
 *
 * 一条 Speed 轴（0 → 1），轴上三个 clip 锚点：Idle 在 0、Walk 在 0.5、Run 在 1。
 * 一个「当前 Speed」游标沿轴滑动，到三个采样位置时下方三根权重条按混合权重升降：
 *  - Speed=0   → Idle 100% / Walk 0%   / Run 0%
 *  - Speed=0.3 → Idle 40%  / Walk 60%  / Run 0%（线性插值：0.3 落在 0~0.5 段）
 *  - Speed=0.75→ Idle 0%   / Walk 50%  / Run 50%（0.75 落在 0.5~1 段）
 *  - Speed=1   → Idle 0%   / Walk 0%   / Run 100%
 *
 * 动画分 4 步（lit = BEAT*(i+1)）：游标滑到各采样点，权重条 scaleY 升降。
 *
 * 权重条用 scaleY（transform-origin 设在条底）缩放，避免改 height 触发 re-layout；
 * 游标用 translateX 沿轴滑动。所有锚点 / 条 / 游标坐标都是整数常量（无 Math 浮点算坐标）。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px。
 */

const VIEW_W = 736;
// VIEW_H=336：最低内容是权重条标签底 312，下留 24px。纵向利用率 ~86%。
const VIEW_H = 336;

// Speed 轴：水平，整数端点。
const AXIS_Y = 96;
const AXIS_X0 = 96; // Speed=0
const AXIS_X1 = 640; // Speed=1
const AXIS_LEN = AXIS_X1 - AXIS_X0; // 544（整数）
// 三个 clip 锚点 x（Idle=0、Walk=0.5、Run=1）。0.5 处 = 中点（544 偶数，整数）。
const IDLE_X = AXIS_X0; // 96
const WALK_X = AXIS_X0 + AXIS_LEN / 2; // 368
const RUN_X = AXIS_X1; // 640

// 游标四个采样位置（Speed 0 / 0.3 / 0.75 / 1）对应的 x（预算为整数，零 Math）。
// 0.3 → 96 + 544*0.3 = 96 + 163.2 → 取整 259；0.75 → 96 + 408 = 504。
const CUR_X0 = AXIS_X0; // Speed=0 → 96
const CUR_X1 = 259; // Speed=0.3
const CUR_X2 = 504; // Speed=0.75
const CUR_X3 = AXIS_X1; // Speed=1 → 640
// 游标相对初始位（Speed=0）的整数位移。
const CUR_DX1 = CUR_X1 - CUR_X0; // 163
const CUR_DX2 = CUR_X2 - CUR_X0; // 408
const CUR_DX3 = CUR_X3 - CUR_X0; // 544

// 三根权重条：底对齐 BAR_BASE_Y，满高 BAR_MAX_H，按权重 scaleY。
const BAR_BASE_Y = 258; // 条底 y
const BAR_MAX_H = 96; // 满权重(100%)的条高
const BAR_W = 56;
const BAR_TOP_Y = BAR_BASE_Y - BAR_MAX_H; // 条顶 y（满高时）
// 三根条的中心 x（与三个 clip 锚点对齐）。
const BAR_IDLE_CX = IDLE_X + 60;
const BAR_WALK_CX = WALK_X;
const BAR_RUN_CX = RUN_X - 60;

// 各采样点处三 clip 的权重（0~1，预算常量）。
// 0~0.5 段：Idle 权重 = 1 - s/0.5，Walk = s/0.5；0.5~1 段：Walk = 1-(s-0.5)/0.5，Run = (s-0.5)/0.5。
const WEIGHTS = {
  s0: { idle: 1, walk: 0, run: 0 }, // Speed=0
  s1: { idle: 0.4, walk: 0.6, run: 0 }, // Speed=0.3 → 0.3/0.5=0.6
  s2: { idle: 0, walk: 0.5, run: 0.5 }, // Speed=0.75 → (0.75-0.5)/0.5=0.5
  s3: { idle: 0, walk: 0, run: 1 }, // Speed=1
} as const;

const STEPS: readonly TeachingStep[] = [
  {
    label: "s0",
    caption: "① Speed = 0：完全播 Idle（权重 Idle 100%）——站着不动",
  },
  {
    label: "s1",
    caption:
      "② Speed = 0.3：落在 Idle(0) 与 Walk(0.5) 之间 → 按比例混合 Idle 40% + Walk 60%，看着像「慢慢迈步」",
  },
  {
    label: "s2",
    caption:
      "③ Speed = 0.75：落在 Walk(0.5) 与 Run(1) 之间 → 混合 Walk 50% + Run 50%，看着像「小跑」",
  },
  {
    label: "s3",
    caption: "④ Speed = 1：完全播 Run（权重 Run 100%）——全速跑",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function BlendTreeDiagram() {
  const cursorRef = useRef<SVGGElement | null>(null);
  const barIdleRef = useRef<SVGRectElement | null>(null);
  const barWalkRef = useRef<SVGRectElement | null>(null);
  const barRunRef = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 把三根条某步的权重写进 scaleY（条 transform-origin 在底，故 scaleY=权重）。
      const setBars = (
        at: number,
        from: { idle: number; walk: number; run: number },
        to: { idle: number; walk: number; run: number },
      ) => {
        if (barIdleRef.current) {
          tl.add(
            barIdleRef.current,
            {
              scaleY: [from.idle, to.idle],
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            at,
          );
        }
        if (barWalkRef.current) {
          tl.add(
            barWalkRef.current,
            {
              scaleY: [from.walk, to.walk],
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            at,
          );
        }
        if (barRunRef.current) {
          tl.add(
            barRunRef.current,
            {
              scaleY: [from.run, to.run],
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            at,
          );
        }
      };

      // 步①：游标在 Speed=0，权重 Idle 满（其余 0）。
      const s0 = TEACHING_BEAT_MS * 0;
      if (cursorRef.current) {
        tl.add(
          cursorRef.current,
          { translateX: [0, 0], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s0,
        );
      }
      setBars(s0, WEIGHTS.s0, WEIGHTS.s0);
      tl.label("s0", TEACHING_BEAT_MS * 1);

      // 步②：游标滑到 Speed=0.3，权重切到 Idle40/Walk60。
      const s1 = TEACHING_BEAT_MS * 1;
      if (cursorRef.current) {
        tl.add(
          cursorRef.current,
          {
            translateX: [0, CUR_DX1],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s1,
        );
      }
      setBars(s1, WEIGHTS.s0, WEIGHTS.s1);
      tl.label("s1", TEACHING_BEAT_MS * 2);

      // 步③：游标滑到 Speed=0.75，权重切到 Walk50/Run50。
      const s2 = TEACHING_BEAT_MS * 2;
      if (cursorRef.current) {
        tl.add(
          cursorRef.current,
          {
            translateX: [CUR_DX1, CUR_DX2],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s2,
        );
      }
      setBars(s2, WEIGHTS.s1, WEIGHTS.s2);
      tl.label("s2", TEACHING_BEAT_MS * 3);

      // 步④：游标滑到 Speed=1，权重 Run 满。
      const s3 = TEACHING_BEAT_MS * 3;
      if (cursorRef.current) {
        tl.add(
          cursorRef.current,
          {
            translateX: [CUR_DX2, CUR_DX3],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s3,
        );
      }
      setBars(s3, WEIGHTS.s2, WEIGHTS.s3);
      tl.label("s3", TEACHING_BEAT_MS * 4);
    },
  });

  // 三根权重条渲染数据。
  const bars = [
    {
      ref: barIdleRef,
      cx: BAR_IDLE_CX,
      t: "Idle",
      color: "var(--text-secondary)",
    },
    { ref: barWalkRef, cx: BAR_WALK_CX, t: "Walk", color: "var(--success)" },
    { ref: barRunRef, cx: BAR_RUN_CX, t: "Run", color: "var(--accent)" },
  ];

  // 三个 clip 锚点渲染数据。
  const anchors = [
    { x: IDLE_X, t: "Idle", v: "0" },
    { x: WALK_X, t: "Walk", v: "0.5" },
    { x: RUN_X, t: "Run", v: "1" },
  ];

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
          aria-label="一维混合树的动画。有一条 Speed 轴，从 0 到 1。轴上三个动画 clip 锚点：Idle 在 0、Walk 在 0.5、Run 在 1。一个当前 Speed 游标沿轴滑动。下方有三根权重条，分别对应 Idle、Walk、Run 三个 clip 的混合权重。动画分四步：Speed 等于 0 时完全播 Idle，Idle 权重 100%；Speed 等于 0.3 落在 Idle 和 Walk 之间，按比例混合 Idle 40% 加 Walk 60%；Speed 等于 0.75 落在 Walk 和 Run 之间，混合 Walk 50% 加 Run 50%；Speed 等于 1 时完全播 Run，Run 权重 100%。核心是混合树按一个参数在多个动画 clip 之间平滑插值出混合权重，让动画无缝过渡而不是硬切。可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[736px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            1D 混合树：按 Speed 在 Idle / Walk / Run 间平滑混合
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            一个状态内部按参数给几个 clip 算混合权重，无缝过渡——不是硬切
          </text>

          {/* ===== Speed 轴 ===== */}
          <line
            x1={AXIS_X0}
            y1={AXIS_Y}
            x2={AXIS_X1}
            y2={AXIS_Y}
            stroke="var(--text-secondary)"
            strokeWidth="2"
            markerEnd="url(#bt-axis-arrow)"
          />
          <text
            x={AXIS_X1 + 16}
            y={AXIS_Y + 4}
            textAnchor="start"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            Speed
          </text>
          {/* 三个 clip 锚点（轴上的刻度圆点 + 标签） */}
          {anchors.map((a) => (
            <g key={a.t}>
              <circle
                cx={a.x}
                cy={AXIS_Y}
                r="5"
                fill="var(--bg)"
                stroke="var(--text-secondary)"
                strokeWidth="2"
              />
              <text
                x={a.x}
                y={AXIS_Y - 16}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {a.t}
              </text>
              <text
                x={a.x}
                y={AXIS_Y + 22}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                {a.v}
              </text>
            </g>
          ))}

          {/* ===== 当前 Speed 游标（三角 + 竖线，靠 translateX 滑动） ===== */}
          <g ref={cursorRef}>
            <path
              d={`M ${AXIS_X0 - 7} ${AXIS_Y - 30} L ${AXIS_X0 + 7} ${AXIS_Y - 30} L ${AXIS_X0} ${AXIS_Y - 18} z`}
              fill="var(--warning)"
            />
            <line
              x1={AXIS_X0}
              y1={AXIS_Y - 18}
              x2={AXIS_X0}
              y2={AXIS_Y + 6}
              stroke="var(--warning)"
              strokeWidth="2.4"
            />
            <text
              x={AXIS_X0}
              y={AXIS_Y - 36}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fill="var(--warning)"
            >
              当前 Speed
            </text>
          </g>

          {/* ===== 权重条基线 ===== */}
          <line
            x1={AXIS_X0 - 16}
            y1={BAR_BASE_Y}
            x2={AXIS_X1 + 16}
            y2={BAR_BASE_Y}
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={AXIS_X0 - 16}
            y={BAR_TOP_Y - 8}
            textAnchor="start"
            fontSize="10"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            混合权重（条越高，这个 clip 占比越大）
          </text>

          {/* ===== 三根权重条（scaleY 缩放，origin 在底） ===== */}
          {bars.map((b) => (
            <g key={b.t}>
              <rect
                ref={b.ref}
                x={b.cx - BAR_W / 2}
                y={BAR_TOP_Y}
                width={BAR_W}
                height={BAR_MAX_H}
                rx="5"
                fill={b.color}
                fillOpacity="0.28"
                stroke={b.color}
                strokeWidth="2"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center bottom",
                }}
              />
              <text
                x={b.cx}
                y={BAR_BASE_Y + 18}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill={b.color}
              >
                {b.t}
              </text>
              <text
                x={b.cx}
                y={BAR_BASE_Y + 32}
                textAnchor="middle"
                fontSize="8.5"
                fill="var(--text-secondary)"
              >
                clip 权重
              </text>
            </g>
          ))}

          <defs>
            <marker
              id="bt-axis-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：Speed = 0.3 时，角色是「纯走」还是「站着 + 走」按比例掺在一起？单步走第②步看权重条。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        混合树（Blend Tree）是**一个状态内部**的玩法：按一个参数（这里是
        `Speed`）在多个 clip 间算**混合权重**、平滑插值，让 Idle→Walk→Run
        无缝过渡，而不是生硬切换。1D 只按一个参数，2D 按两个参数（如方向 +
        速度）。这一切在编辑器里配，**不用写代码**。
      </figcaption>
    </figure>
  );
}
