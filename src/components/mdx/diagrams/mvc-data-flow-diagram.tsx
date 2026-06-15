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
 * <MvcDataFlowDiagram>：《Android 编程权威指南》android-mvc 章「MVC 三层架构」配图（HEL-172）。
 *
 * 「可控教学动画」：三角布局画出 View / Controller / Model 三层，随时间线走完一圈
 * **MVC 数据流闭环**——看清一次「用户点一下」如何在三层之间流转一整圈：
 *   ① 用户在 View 操作（点击）→ ② Controller 收到事件回调 → ③ Controller 更新 Model →
 *   ④ Model 数据改变 → ⑤ Controller 从 Model 读新值 → ⑥ Controller 刷回 View 重新渲染。
 *
 * 每步点亮「当前活跃元素」：节点步（①④）淡入对应层的高亮层；连线步（②③⑤⑥）让一段
 * 「数据令牌」小圆点沿该步的有向边滑过 + 边描边变亮，直观看清数据往哪个方向流。
 *
 * 时序照 ActivityLifecycleDiagram / GradleBuildPipelineDiagram：步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出
 * （最后一步 render 停在亮态，表示界面已刷新、闭环完成），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：三层用语义色 token 区分（View=--accent / Controller=--success / Model=--warning），
 * 全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

// —— 三个层节点（三角布局）。color 为该层点亮时的语义色 token。 ——
type LayerNode = {
  id: string;
  /** 层主标题。 */
  title: string;
  /** Android 映射副标题。 */
  sub: string;
  x: number;
  y: number;
  color: string;
};

const NODE_W = 184;
const NODE_H = 60;

const VIEW = { x: 24, y: 24 };
const MODEL = { x: 392, y: 24 };
const CONTROLLER = { x: 208, y: 232 };

const NODES: readonly LayerNode[] = [
  {
    id: "view",
    title: "View",
    sub: "res/layout/*.xml 布局",
    x: VIEW.x,
    y: VIEW.y,
    color: "var(--accent)",
  },
  {
    id: "model",
    title: "Model",
    sub: "Kotlin data class",
    x: MODEL.x,
    y: MODEL.y,
    color: "var(--warning)",
  },
  {
    id: "controller",
    title: "Controller",
    sub: "Activity / Fragment",
    x: CONTROLLER.x,
    y: CONTROLLER.y,
    color: "var(--success)",
  },
];

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
const STEPS: readonly TeachingStep[] = [
  { label: "tap", caption: "① 用户在 View 上操作（点了「正确」按钮）" },
  { label: "event", caption: "② View 把点击事件回调给 Controller（setOnClickListener）" },
  { label: "update-model", caption: "③ Controller 调 Model 更新数据（checkAnswer / moveToNext）" },
  { label: "model-changed", caption: "④ Model 数据改变（data class copy() 返回新状态）" },
  { label: "read-model", caption: "⑤ Controller 从 Model 读出新值（currentQuestion）" },
  { label: "render", caption: "⑥ Controller 把新值刷回 View 重新渲染（textView.text = …）" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const VIEW_W = 600;
const VIEW_H = 332;

// —— 各节点锚点（连线端点用）。 ——
function center(n: { x: number; y: number }) {
  return { cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 };
}
const V = center(VIEW);
const M = center(MODEL);
const C = center(CONTROLLER);

// —— 四条有向边（连线步用）。每条 = 一条主线 + 一个沿线滑动的「数据令牌」。 ——
// 平行偏移：同一对节点的来回两向各占一侧，方向不互相压线（更易读）。
type Edge = {
  id: string;
  /** 起点 / 终点（已含平行偏移）。 */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** 该边语义色 token。 */
  color: string;
};

// 左侧 View↔Controller：event 向下（偏左）、render 向上（偏右）。
// 右侧 Model↔Controller：update 向右上（偏上）、read 向左下（偏下）。
const OFF = 12; // 平行线偏移量（4 的倍数）

const EDGES: Record<string, Edge> = {
  // ② View → Controller（左侧、偏左）
  event: {
    id: "event",
    x1: V.cx - OFF,
    y1: VIEW.y + NODE_H,
    x2: C.cx - OFF,
    y2: CONTROLLER.y,
    color: "var(--accent)",
  },
  // ⑥ Controller → View（左侧、偏右）
  render: {
    id: "render",
    x1: C.cx + OFF,
    y1: CONTROLLER.y,
    x2: V.cx + OFF,
    y2: VIEW.y + NODE_H,
    color: "var(--accent)",
  },
  // ③ Controller → Model（右侧、偏上）
  "update-model": {
    id: "update-model",
    x1: CONTROLLER.x + NODE_W,
    y1: C.cy - OFF,
    x2: M.cx,
    y2: MODEL.y + NODE_H,
    color: "var(--warning)",
  },
  // ⑤ Model → Controller（右侧、偏下）
  "read-model": {
    id: "read-model",
    x1: M.cx + OFF,
    y1: MODEL.y + NODE_H,
    x2: CONTROLLER.x + NODE_W - OFF,
    y2: C.cy + OFF,
    color: "var(--warning)",
  },
};

// 步 → 它点亮的「节点 id」（节点步）。连线步不在此表。
const STEP_NODE: Record<string, string> = {
  tap: "view",
  "model-changed": "model",
};

export function MvcDataFlowDiagram() {
  // 节点高亮层 + 边描边 + 数据令牌的 DOM 引用，喂给 anime.js 时间线驱动。
  const nodeHi = useRef<Record<string, SVGRectElement | null>>({});
  const edgeHi = useRef<Record<string, SVGLineElement | null>>({});
  const tokenHi = useRef<Record<string, SVGCircleElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全呈现时刻 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

        const nodeId = STEP_NODE[step.label];
        if (nodeId) {
          // 节点步：淡入该层高亮层（点亮当前活跃节点）。
          const el = nodeHi.current[nodeId];
          if (el) {
            tl.add(
              el,
              {
                opacity: [0, 1],
                scale: [0.96, 1],
                duration: TEACHING_BEAT_MS,
                ease: "out(3)",
              },
              start,
            );
            tl.label(step.label, lit);
            if (!isLast) {
              tl.add(
                el,
                { opacity: [1, 0.18], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
                lit,
              );
            }
          } else {
            tl.label(step.label, lit);
          }
        } else {
          // 连线步：边描边淡亮 + 数据令牌从起点滑到终点（看清数据流向）。
          const edge = edgeHi.current[step.label];
          const token = tokenHi.current[step.label];
          const e = EDGES[step.label];
          if (edge) {
            tl.add(
              edge,
              { opacity: [0.2, 1], duration: TEACHING_BEAT_MS * 0.5, ease: "out(2)" },
              start,
            );
          }
          if (token && e) {
            tl.add(
              token,
              {
                opacity: [0, 1, 1, 0],
                cx: [e.x1, e.x2],
                cy: [e.y1, e.y2],
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          }
          tl.label(step.label, lit);
          // 连线步呈现完后把描边淡回（除最后一步）；令牌淡出已含在其关键帧里。
          if (edge && !isLast) {
            tl.add(
              edge,
              { opacity: [1, 0.2], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
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
          aria-label="MVC 三层架构数据流闭环。三角布局：左上是 View（res/layout XML 布局），右上是 Model（Kotlin data class），中下是 Controller（Activity / Fragment，居中作为协调枢纽）。一次用户操作沿闭环走六步：① 用户在 View 上点击；② View 把事件回调给 Controller；③ Controller 调 Model 更新数据；④ Model 数据改变（data class copy 返回新状态）；⑤ Controller 从 Model 读出新值；⑥ Controller 把新值刷回 View 重新渲染。播放时按此顺序依次点亮当前活跃的层节点，或让数据令牌沿当前有向边滑动，可播放、暂停、单步、拖动进度逐帧观察数据如何在三层之间流转一整圈。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="mvc-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="mvc-arrow-warning"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* —— 有向边（常驻低对比底线 + anime.js 点亮的高亮线 + 数据令牌）—— */}
          {Object.values(EDGES).map((e) => {
            const isWarn = e.color === "var(--warning)";
            const marker = isWarn
              ? "url(#mvc-arrow-warning)"
              : "url(#mvc-arrow-accent)";
            return (
              <g key={e.id}>
                {/* 底线（常驻、低对比） */}
                <line
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.4"
                  markerEnd={marker}
                  opacity="0.45"
                />
                {/* 高亮线（默认半灭，该步淡亮） */}
                <line
                  ref={(el) => {
                    edgeHi.current[e.id] = el;
                  }}
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke={e.color}
                  strokeWidth="2.4"
                  markerEnd={marker}
                  opacity="0.2"
                />
                {/* 数据令牌（默认隐形，该步沿线滑过） */}
                <circle
                  ref={(el) => {
                    tokenHi.current[e.id] = el;
                  }}
                  cx={e.x1}
                  cy={e.y1}
                  r="6"
                  fill={e.color}
                  opacity="0"
                />
              </g>
            );
          })}

          {/* —— 三层节点：底框 + 高亮层（anime.js 驱动，仅节点步）+ 文字 —— */}
          {NODES.map((n) => (
            <g key={n.id}>
              {/* 底框（常驻、低对比） */}
              <rect
                x={n.x}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.2"
              />
              {/* 高亮层：默认灭，节点步淡入 + 描边变色 */}
              <rect
                ref={(el) => {
                  nodeHi.current[n.id] = el;
                }}
                x={n.x}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                fill={n.color}
                fillOpacity="0.12"
                stroke={n.color}
                strokeWidth="2"
                opacity="0"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
              {/* 层名 */}
              <text
                x={n.x + NODE_W / 2}
                y={n.y + 26}
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill={n.color}
              >
                {n.title}
              </text>
              {/* Android 映射副标题 */}
              <text
                x={n.x + NODE_W / 2}
                y={n.y + 46}
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                {n.sub}
              </text>
            </g>
          ))}

          {/* —— 边旁步骤序号标注（小而稳，常驻，帮读者把动画与第几步对齐）—— */}
          <text
            x={(EDGES.event.x1 + EDGES.event.x2) / 2 - 14}
            y={(EDGES.event.y1 + EDGES.event.y2) / 2}
            textAnchor="end"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ② 事件
          </text>
          <text
            x={(EDGES.render.x1 + EDGES.render.x2) / 2 + 14}
            y={(EDGES.render.y1 + EDGES.render.y2) / 2}
            textAnchor="start"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ⑥ 渲染
          </text>
          <text
            x={(EDGES["update-model"].x1 + EDGES["update-model"].x2) / 2}
            y={(EDGES["update-model"].y1 + EDGES["update-model"].y2) / 2 - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            ③ 更新
          </text>
          <text
            x={(EDGES["read-model"].x1 + EDGES["read-model"].x2) / 2}
            y={(EDGES["read-model"].y1 + EDGES["read-model"].y2) / 2 + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            ⑤ 读取
          </text>

          {/* 入口标注：用户操作从 View 进入 */}
          <text
            x={VIEW.x + NODE_W / 2}
            y={VIEW.y - 8}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ① 用户点击 ▾
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次「用户点一下」在 View / Controller / Model 三层之间流转一整圈；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MVC 数据流闭环：用户在 View 操作 → Controller 收到事件 → 更新 Model → Model 改变 →
        Controller 读新值 → 刷回 View 渲染。Controller 居中当枢纽，View 与 Model 从不直接对话。
      </figcaption>
    </figure>
  );
}
