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
 * <MvvmDataFlowDiagram>：《Android 编程权威指南》data-binding-mvvm 章「MVVM 数据流」配图（HEL-188）。
 *
 * 「可控教学动画」：横排画出 View / ViewModel / Model 三层，随时间线走完一圈
 * **MVVM 数据流闭环**——看清一次「用户点一下」如何流到 ViewModel、再「自动」推回 View：
 *   ① 用户在 View 操作（点击）→ ② View 调用 ViewModel 的方法（onAddClicked）→
 *   ③ ViewModel 更新自身可观察状态（LiveData / StateFlow）并向 Model 取 / 存数据 →
 *   ④ Model 返回数据，ViewModel 的 LiveData 值随之改变 →
 *   ⑤ LiveData 变化经 DataBinding **自动**推回 View 刷新（无需 Activity 手动 findViewById / setText）。
 *
 * **刻意区别于同书 MvcDataFlowDiagram**：MVC 的 Controller 持有并直接操作 View（双向 6 步）；
 * MVVM 的 ViewModel **不知道 View 存在**——View 反过来「观察」ViewModel 的可观察状态。第 ⑤ 步
 * 高亮的那条 ViewModel→View 边是一条特殊的「自动绑定 / 观察」边（虚线 + ⚡ 标注），强调它不是
 * ViewModel 主动调用 View，而是 DataBinding 在 LiveData 变化时自动把新值推给 View。
 *
 * 每步点亮「当前活跃元素」：节点步（①③④）淡入对应层的高亮层；连线步（②⑤）让一段「数据令牌」
 * 小圆点沿该步的有向边滑过 + 边描边变亮，直观看清数据往哪个方向流。
 *
 * 时序照 MvcDataFlowDiagram / ActivityLifecycleDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出（最后一步「自动绑定」停在亮态，
 * 表示界面已自动刷新、闭环完成），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：三层用语义色 token 区分（View=--accent / ViewModel=--success / Model=--warning），
 * 全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

// —— 三个层节点（横排布局）。color 为该层点亮时的语义色 token。 ——
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

const NODE_W = 180;
const NODE_H = 64;

const VIEW = { x: 24, y: 96 };
const VIEWMODEL = { x: 300, y: 96 };
const MODEL = { x: 576, y: 96 };

const NODES: readonly LayerNode[] = [
  {
    id: "view",
    title: "View",
    sub: "XML + DataBinding",
    x: VIEW.x,
    y: VIEW.y,
    color: "var(--accent)",
  },
  {
    id: "viewmodel",
    title: "ViewModel",
    sub: "LiveData / StateFlow",
    x: VIEWMODEL.x,
    y: VIEWMODEL.y,
    color: "var(--success)",
  },
  {
    id: "model",
    title: "Model",
    sub: "Repository / 数据源",
    x: MODEL.x,
    y: MODEL.y,
    color: "var(--warning)",
  },
];

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
const STEPS: readonly TeachingStep[] = [
  { label: "tap", caption: "① 用户在 View 上操作（点了「添加」按钮）" },
  {
    label: "call-vm",
    caption: "② View 调用 ViewModel 的方法（android:onClick=\"@{() -> vm.onAddClicked()}\"）",
  },
  {
    label: "update-state",
    caption:
      "③ ViewModel 更新自身可观察状态 LiveData，并向 Model 取 / 存数据（不持有 View 引用）",
  },
  {
    label: "model-return",
    caption: "④ Model 返回数据，ViewModel 的 LiveData 值随之改变",
  },
  {
    label: "auto-bind",
    caption:
      "⑤ LiveData 变化经 DataBinding 自动推回 View 刷新——无需 Activity 手动 findViewById / setText",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const VIEW_W = 780;
const VIEW_H = 332;

// —— 各节点锚点（连线端点用）。 ——
function center(n: { x: number; y: number }) {
  return { cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 };
}
const V = center(VIEW);
const VM = center(VIEWMODEL);
const M = center(MODEL);

// —— 有向边（连线步用）。每条 = 一条主线 + 一个沿线滑动的「数据令牌」。 ——
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

const OFF = 16; // 平行线偏移量（4 的倍数）

const EDGES: Record<string, Edge> = {
  // ② View → ViewModel（中段、偏上，命令调用）
  "call-vm": {
    id: "call-vm",
    x1: VIEW.x + NODE_W,
    y1: V.cy - OFF,
    x2: VIEWMODEL.x,
    y2: VM.cy - OFF,
    color: "var(--accent)",
  },
  // ③ ViewModel → Model（中段、偏上，取/存数据）
  "vm-model": {
    id: "vm-model",
    x1: VIEWMODEL.x + NODE_W,
    y1: VM.cy - OFF,
    x2: MODEL.x,
    y2: M.cy - OFF,
    color: "var(--warning)",
  },
  // ④ Model → ViewModel（中段、偏下，数据返回）
  "model-return": {
    id: "model-return",
    x1: MODEL.x,
    y1: M.cy + OFF,
    x2: VIEWMODEL.x + NODE_W,
    y2: VM.cy + OFF,
    color: "var(--warning)",
  },
  // ⑤ ViewModel → View（中段、偏下，DataBinding「自动观察」推回——虚线特殊边）
  "auto-bind": {
    id: "auto-bind",
    x1: VIEWMODEL.x,
    y1: VM.cy + OFF,
    x2: VIEW.x + NODE_W,
    y2: V.cy + OFF,
    color: "var(--success)",
  },
};

// 步 → 它点亮的「节点 id」（节点步）。连线步不在此表。
const STEP_NODE: Record<string, string> = {
  tap: "view",
  "update-state": "viewmodel",
  "model-return": "model",
};

export function MvvmDataFlowDiagram() {
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
        // ③ update-state 既点亮 ViewModel 节点，也让令牌沿 ViewModel→Model 边滑过（取/存数据）。
        const sideEdgeId = step.label === "update-state" ? "vm-model" : null;

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
          }
          // ③ 附带的「ViewModel 向 Model 取/存数据」边令牌。
          if (sideEdgeId) {
            const edge = edgeHi.current[sideEdgeId];
            const token = tokenHi.current[sideEdgeId];
            const e = EDGES[sideEdgeId];
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
            if (edge && !isLast) {
              tl.add(
                edge,
                { opacity: [1, 0.2], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
                lit,
              );
            }
          }
          tl.label(step.label, lit);
          if (el && !isLast) {
            tl.add(
              el,
              { opacity: [1, 0.18], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
              lit,
            );
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
          // 连线步呈现完后把描边淡回（除最后一步——「自动绑定」边停在亮态）。
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
          aria-label="MVVM 数据流闭环。横排三层：左是 View（XML 布局 + DataBinding），中是 ViewModel（持有可观察状态 LiveData / StateFlow），右是 Model（Repository / 数据源）。一次用户操作沿闭环走五步：① 用户在 View 上点击；② View 调用 ViewModel 的方法（如 onAddClicked，经 DataBinding 的 onClick 表达式）；③ ViewModel 更新自身可观察状态 LiveData，并向 Model 取或存数据，注意 ViewModel 不持有 View 引用；④ Model 返回数据，ViewModel 的 LiveData 值随之改变；⑤ LiveData 变化经 DataBinding 自动推回 View 刷新，无需 Activity 手动 findViewById 或 setText。关键差异：与 MVC 不同，ViewModel 不知道 View 的存在，是 View 反过来观察 ViewModel 的可观察状态，第五步那条 ViewModel 到 View 的边是一条虚线表示的自动绑定观察边。播放时按此顺序依次点亮当前活跃的层节点，或让数据令牌沿当前有向边滑动，可播放、暂停、单步、拖动进度逐帧观察数据如何在三层之间流转一整圈。"
          className="mx-auto block h-auto w-full max-w-[780px]"
        >
          <defs>
            <marker
              id="mvvm-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="mvvm-arrow-warning"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
            <marker
              id="mvvm-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* —— 有向边（常驻低对比底线 + anime.js 点亮的高亮线 + 数据令牌）—— */}
          {Object.values(EDGES).map((e) => {
            const isWarn = e.color === "var(--warning)";
            const isSuccess = e.color === "var(--success)";
            const marker = isWarn
              ? "url(#mvvm-arrow-warning)"
              : isSuccess
                ? "url(#mvvm-arrow-success)"
                : "url(#mvvm-arrow-accent)";
            // ⑤ auto-bind 是「自动观察」边，用虚线区别于命令调用的实线。
            const isAutoBind = e.id === "auto-bind";
            const dash = isAutoBind ? "6 5" : undefined;
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
                  strokeDasharray={dash}
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
                  strokeDasharray={dash}
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
                y={n.y + 28}
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
                y={n.y + 48}
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
            x={(EDGES["call-vm"].x1 + EDGES["call-vm"].x2) / 2}
            y={(EDGES["call-vm"].y1 + EDGES["call-vm"].y2) / 2 - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ② 调方法
          </text>
          <text
            x={(EDGES["vm-model"].x1 + EDGES["vm-model"].x2) / 2}
            y={(EDGES["vm-model"].y1 + EDGES["vm-model"].y2) / 2 - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            ③ 取/存
          </text>
          <text
            x={(EDGES["model-return"].x1 + EDGES["model-return"].x2) / 2}
            y={(EDGES["model-return"].y1 + EDGES["model-return"].y2) / 2 + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            ④ 返回
          </text>
          <text
            x={(EDGES["auto-bind"].x1 + EDGES["auto-bind"].x2) / 2}
            y={(EDGES["auto-bind"].y1 + EDGES["auto-bind"].y2) / 2 + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            ⑤ 自动绑定 ⚡
          </text>

          {/* 入口标注：用户操作从 View 进入 */}
          <text
            x={VIEW.x + NODE_W / 2}
            y={VIEW.y - 12}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ① 用户点击 ▾
          </text>

          {/* —— 关键差异标注：MVVM 解耦 vs MVC（顶部一行，常驻）—— */}
          <text
            x={VIEW_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            MVVM：ViewModel 不知道 View 存在，靠「观察」解耦
          </text>
          <text
            x={VIEW_W / 2}
            y={52}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            对比 MVC：Controller 持有并直接操作 View；这里 View 反过来观察 ViewModel
          </text>

          {/* ⑤ 边的「自动 / 无需手动」强调标注（贴近 auto-bind 边的中段下方） */}
          <text
            x={(EDGES["auto-bind"].x1 + EDGES["auto-bind"].x2) / 2}
            y={(EDGES["auto-bind"].y1 + EDGES["auto-bind"].y2) / 2 + 36}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            DataBinding 观察 · 无 findViewById/setText
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次「用户点一下」如何流到 ViewModel，再经 DataBinding 自动推回 View；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MVVM 数据流闭环：用户操作 View → 调 ViewModel 方法 → ViewModel 改 LiveData 并取/存 Model →
        Model 返回数据 LiveData 变化 → DataBinding 自动推回 View。ViewModel 从不持有 View，是 View 在观察它。
      </figcaption>
    </figure>
  );
}
