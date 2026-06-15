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
 * <TouchEventSequenceDiagram>：《Android 编程权威指南》custom-views-touch 章「触摸事件序列」配图（HEL-199）。
 *
 * 「可控教学动画」：画一块 View 画布，一根「手指」（圆点）沿一条轨迹走完**一次完整触摸手势**，
 * 看清一次「按下—拖动—抬起」拆成的 MotionEvent 序列怎样回调进 onTouchEvent：
 *   ① ACTION_DOWN（手指在起点按下，记录 x,y，返回 true 表示要消费这次手势）→
 *   ② ACTION_MOVE（手指拖到中段，坐标更新，连续回调一次 → View invalidate 重绘）→
 *   ③ 继续 ACTION_MOVE（拖到更远，又是一次连续回调）→
 *   ④ ACTION_UP（手指抬起，手势结束，触发 performClick）。
 *
 * 每步：手指圆点沿轨迹 translate 滑到该步落点 + 轨迹线逐段画出（描边淡亮）+
 * 当前 MotionEvent 类型徽标在三类型间高亮切换 + 坐标读数随步刷新。
 *
 * 时序照 MvcDataFlowDiagram / GradleBuildPipelineDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起把上一段轨迹/上一个类型徽标淡回
 * （最后一步 ACTION_UP 停在亮态，表示手势已结束），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：动作类型用语义色 token 区分（DOWN=--accent / MOVE=--warning / UP=--success），
 * 全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 * 几何常量具名且为 4 的倍数。
 */

// —— 画布与布局常量（间距走 4 倍数）。 ——
const VIEW_W = 600;
const VIEW_H = 360;

// View 画布（手指在其中活动的矩形区域）。
const CANVAS_X = 24;
const CANVAS_Y = 64;
const CANVAS_W = 360;
const CANVAS_H = 256;

// 右侧读数面板。
const PANEL_X = 408;
const PANEL_W = 168;

// 手指圆点半径。
const FINGER_R = 12;

// —— 手势轨迹的四个落点（按下→拖动→拖动→抬起）。坐标即「该步手指停在哪」。 ——
type Point = { x: number; y: number };

const P_DOWN: Point = { x: CANVAS_X + 56, y: CANVAS_Y + 196 };
const P_MOVE1: Point = { x: CANVAS_X + 168, y: CANVAS_Y + 96 };
const P_MOVE2: Point = { x: CANVAS_X + 276, y: CANVAS_Y + 152 };
const P_UP: Point = { x: CANVAS_X + 320, y: CANVAS_Y + 56 };

// —— 一步 = 一个 MotionEvent。type 决定动作徽标点亮哪种语义色。 ——
type ActionKind = "down" | "move" | "up";

type TouchStep = {
  /** anime.js timeline label = 关键帧锚点（与 STEPS 对应）。 */
  id: string;
  /** 该步触发的 MotionEvent 动作类型。 */
  kind: ActionKind;
  /** 该步手指停留点（轨迹落点）。 */
  point: Point;
  /** 控制条朗读文案。 */
  caption: string;
};

const TOUCH_STEPS: readonly TouchStep[] = [
  {
    id: "down",
    kind: "down",
    point: P_DOWN,
    caption:
      "① ACTION_DOWN：手指按下，记录起点 (x, y)。onTouchEvent 返回 true 消费手势，后续 MOVE / UP 才会继续回调到本 View",
  },
  {
    id: "move1",
    kind: "move",
    point: P_MOVE1,
    caption:
      "② ACTION_MOVE：手指拖动，event.x / event.y 更新为新位置——一次连续回调，处理逻辑里调 invalidate() 触发 View 重绘",
  },
  {
    id: "move2",
    kind: "move",
    point: P_MOVE2,
    caption:
      "③ ACTION_MOVE：继续拖动，坐标持续刷新——拖动期间会密集回调多次 ACTION_MOVE，每次都拿到最新坐标",
  },
  {
    id: "up",
    kind: "up",
    point: P_UP,
    caption:
      "④ ACTION_UP：手指抬起，手势结束，触发 performClick()。一次完整手势 = 一个 DOWN + 若干 MOVE + 一个 UP",
  },
];

const STEPS: readonly TeachingStep[] = TOUCH_STEPS.map((s) => ({
  label: s.id,
  caption: s.caption,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  TOUCH_STEPS.map((s) => [s.id, s.caption]),
);

// —— 动作类型 → 语义色 token（DOWN/MOVE/UP 三类型徽标各自的高亮色）。 ——
const KIND_COLOR: Record<ActionKind, string> = {
  down: "var(--accent)",
  move: "var(--warning)",
  up: "var(--success)",
};

const KIND_LABEL: Record<ActionKind, string> = {
  down: "ACTION_DOWN",
  move: "ACTION_MOVE",
  up: "ACTION_UP",
};

// 三个动作类型徽标在右侧面板的纵向排布。
const BADGE_KINDS: readonly ActionKind[] = ["down", "move", "up"];
const BADGE_X = PANEL_X + 16;
const BADGE_W = PANEL_W - 32;
const BADGE_H = 36;
const BADGE_GAP = 16;
const BADGE_TOP = CANVAS_Y + 8;

// 坐标读数在每个落点相对画布原点的「View 坐标」（event.x / event.y，原点在 View 左上角）。
function viewCoord(p: Point): { x: number; y: number } {
  return { x: p.x - CANVAS_X, y: p.y - CANVAS_Y };
}

export function TouchEventSequenceDiagram() {
  // 手指圆点、各动作类型徽标高亮层、各段轨迹线、各步坐标读数文本的 DOM 引用，喂给 anime.js。
  const fingerRef = useRef<SVGGElement | null>(null);
  const badgeHi = useRef<Record<ActionKind, SVGRectElement | null>>({
    down: null,
    move: null,
    up: null,
  });
  // 轨迹分段：第 i 段 = 从 step[i-1] 落点到 step[i] 落点（i 从 1 起，共 3 段）。
  const segHi = useRef<Record<string, SVGLineElement | null>>({});
  // 每步对应的坐标读数文本（默认透明，轮到该步淡入，离开淡回）。
  const readoutHi = useRef<Record<string, SVGTextElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      TOUCH_STEPS.forEach((step, i) => {
        // 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全呈现时刻 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === TOUCH_STEPS.length - 1;
        const prev = i > 0 ? TOUCH_STEPS[i - 1] : null;

        // 1) 手指圆点滑到该步落点（首步从起点直接淡入定位，后续步沿轨迹平移）。
        const finger = fingerRef.current;
        if (finger) {
          if (prev) {
            tl.add(
              finger,
              {
                translateX: [prev.point.x - step.point.x, 0],
                translateY: [prev.point.y - step.point.y, 0],
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          } else {
            tl.add(
              finger,
              {
                opacity: [0, 1],
                scale: [0.6, 1],
                duration: TEACHING_BEAT_MS,
                ease: "out(3)",
              },
              start,
            );
          }
        }

        // 2) 轨迹线逐段画出（连接上一步落点 → 本步落点；首步无前驱，不画段）。
        if (prev) {
          const seg = segHi.current[step.id];
          if (seg) {
            tl.add(
              seg,
              { opacity: [0, 1], duration: TEACHING_BEAT_MS * 0.5, ease: "out(2)" },
              start,
            );
          }
        }

        // 3) 当前 MotionEvent 类型徽标点亮（淡入 + 描边变色），离开时淡回（末步停亮）。
        const badge = badgeHi.current[step.kind];
        if (badge) {
          tl.add(
            badge,
            {
              opacity: [0, 1],
              scale: [0.96, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }

        // 4) 坐标读数随步淡入（离开淡回，末步停亮）。
        const readout = readoutHi.current[step.id];
        if (readout) {
          tl.add(
            readout,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS * 0.6, ease: "out(2)" },
            start,
          );
        }

        tl.label(step.id, lit);

        if (!isLast) {
          // 离开第 i 步：徽标淡回（下一步若同类型会再次点亮）、读数淡回。
          if (badge) {
            tl.add(
              badge,
              { opacity: [1, 0.16], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
              lit,
            );
          }
          if (readout) {
            tl.add(
              readout,
              { opacity: [1, 0], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
              lit,
            );
          }
        }
      });
    },
  });

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
          aria-label="一次完整触摸手势拆成的 MotionEvent 序列。左侧是一块 View 画布，一根手指（圆点）沿轨迹走四步：① ACTION_DOWN——手指在画布左下按下，记录起点坐标，onTouchEvent 返回 true 消费手势，否则后续事件不会再发来；② ACTION_MOVE——手指拖到中段，event.x / event.y 更新，连续回调一次并调 invalidate 触发 View 重绘；③ ACTION_MOVE——继续拖到更远，拖动期间密集回调多次，每次拿到最新坐标；④ ACTION_UP——手指抬起，手势结束，触发 performClick。右侧面板显示三类动作类型徽标（DOWN / MOVE / UP）随步高亮切换，以及当前事件的 View 坐标读数。事件分发链为 dispatchTouchEvent → onInterceptTouchEvent → onTouchEvent。可播放、暂停、单步、拖动进度逐帧观察一次按下—拖动—抬起如何被拆成一串 MotionEvent 回调。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="tes-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* —— 标题：事件分发链标注（常驻，帮读者把整链路对齐到当前步）—— */}
          <text
            x={CANVAS_X}
            y={CANVAS_Y - 32}
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            dispatchTouchEvent → onInterceptTouchEvent → onTouchEvent
          </text>
          <text
            x={CANVAS_X}
            y={CANVAS_Y - 14}
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            View 画布（onTouchEvent 返回 true 才能收到后续事件）
          </text>

          {/* —— View 画布底框 —— */}
          <rect
            x={CANVAS_X}
            y={CANVAS_Y}
            width={CANVAS_W}
            height={CANVAS_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />

          {/* —— 轨迹分段：底线（常驻、低对比）+ 高亮线（默认灭，轮到该步淡亮）—— */}
          {TOUCH_STEPS.slice(1).map((step, idx) => {
            const from = TOUCH_STEPS[idx].point;
            const to = step.point;
            return (
              <g key={`seg-${step.id}`}>
                {/* 底线（常驻、虚线、低对比） */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.35"
                />
                {/* 高亮线（默认灭，该步沿轨迹画出） */}
                <line
                  ref={(el) => {
                    segHi.current[step.id] = el;
                  }}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--warning)"
                  strokeWidth="2.4"
                  markerEnd="url(#tes-arrow)"
                  opacity="0"
                />
              </g>
            );
          })}

          {/* —— 四个落点标记（常驻小圆 + 序号，帮把动画对齐到第几步）—— */}
          {TOUCH_STEPS.map((step, i) => (
            <g key={`dot-${step.id}`}>
              <circle
                cx={step.point.x}
                cy={step.point.y}
                r="4"
                fill="var(--bg-elevated)"
                stroke={KIND_COLOR[step.kind]}
                strokeWidth="1.6"
              />
              <text
                x={step.point.x}
                y={step.point.y - 12}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill={KIND_COLOR[step.kind]}
              >
                {`0${i + 1}`}
              </text>
            </g>
          ))}

          {/* —— 手指圆点（anime.js 驱动，沿轨迹平移）—— */}
          <g
            ref={fingerRef}
            opacity="0"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle
              cx={P_UP.x}
              cy={P_UP.y}
              r={FINGER_R}
              fill="var(--accent)"
              fillOpacity="0.28"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle cx={P_UP.x} cy={P_UP.y} r="4" fill="var(--accent)" />
          </g>

          {/* —— 右侧面板：标题 + 三类动作类型徽标 + 坐标读数 —— */}
          <text
            x={PANEL_X + PANEL_W / 2}
            y={CANVAS_Y - 14}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            当前 MotionEvent
          </text>

          {/* 三类动作类型徽标：底框 + 高亮层（anime.js 点亮当前步类型）+ 文字 */}
          {BADGE_KINDS.map((kind, i) => {
            const y = BADGE_TOP + i * (BADGE_H + BADGE_GAP);
            const color = KIND_COLOR[kind];
            return (
              <g key={`badge-${kind}`}>
                {/* 底框（常驻、低对比） */}
                <rect
                  x={BADGE_X}
                  y={y}
                  width={BADGE_W}
                  height={BADGE_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                {/* 高亮层（默认灭，轮到该类型淡入 + 描边变色） */}
                <rect
                  ref={(el) => {
                    badgeHi.current[kind] = el;
                  }}
                  x={BADGE_X}
                  y={y}
                  width={BADGE_W}
                  height={BADGE_H}
                  rx="8"
                  fill={color}
                  fillOpacity="0.14"
                  stroke={color}
                  strokeWidth="2"
                  opacity="0"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                {/* 类型名 */}
                <text
                  x={BADGE_X + BADGE_W / 2}
                  y={y + BADGE_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={color}
                >
                  {KIND_LABEL[kind]}
                </text>
              </g>
            );
          })}

          {/* 坐标读数标题 */}
          <text
            x={PANEL_X + PANEL_W / 2}
            y={BADGE_TOP + BADGE_KINDS.length * (BADGE_H + BADGE_GAP) + 16}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            event.x / event.y
          </text>

          {/* 每步坐标读数（默认透明，轮到该步淡入）。同位置叠放，按步切换。 */}
          {TOUCH_STEPS.map((step) => {
            const c = viewCoord(step.point);
            return (
              <text
                key={`readout-${step.id}`}
                ref={(el) => {
                  readoutHi.current[step.id] = el;
                }}
                x={PANEL_X + PANEL_W / 2}
                y={BADGE_TOP + BADGE_KINDS.length * (BADGE_H + BADGE_GAP) + 40}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill={KIND_COLOR[step.kind]}
                opacity="0"
              >
                {`(${Math.round(c.x)}, ${Math.round(c.y)})`}
              </text>
            );
          })}

          {/* 入口标注：手指从这里按下 */}
          <text
            x={P_DOWN.x}
            y={P_DOWN.y + 28}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ▲ 手指按下
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次「按下 → 拖动 → 拖动 → 抬起」被拆成一串 MotionEvent 回调；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        触摸事件序列：一次手势 = 一个 ACTION_DOWN + 若干 ACTION_MOVE + 一个 ACTION_UP。
        DOWN 时 onTouchEvent 必须返回 true 消费事件，否则后续 MOVE / UP 不会再发来；
        事件先经 dispatchTouchEvent → onInterceptTouchEvent 分发，才落到 onTouchEvent。
      </figcaption>
    </figure>
  );
}
