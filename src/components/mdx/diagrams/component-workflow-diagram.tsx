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
 * <ComponentWorkflowDiagram>：《Android 进阶解密》four-components/component-workflow 章
 * 「四大组件经 AMS 启动的工作流」配图（HEL-201），以 startActivity 为例。
 *
 * 「可控教学动画」：随时间线走完一次 Activity 从「App 进程调 startActivity」到「在 App
 * 进程走 onCreate 生命周期」的全过程——重点看清这是一条**跨进程**的调用链，令牌在两条
 * 进程泳道之间经 Binder IPC 边界来回穿梭：
 *   ① App 进程调 startActivity(intent)（令牌从 App 节点出发）→ ② 令牌经 Binder IPC
 *      跨进程边界流到 system_server 的 AMS → ③ AMS 校验权限 / 管理任务栈
 *      （ActivityRecord / TaskRecord）决定目标 Activity → ④ AMS 经 Binder 回调 App 进程的
 *      ApplicationThread（令牌反向跨边界回流）→ ⑤ ActivityThread 的 H(Handler) 调度，反射
 *      创建 Activity 实例并走 onCreate 生命周期。
 *
 * 每步点亮「当前活跃元素」：节点步（①③⑤）淡入对应节点高亮层；跨进程流向步（②④）让一段
 * 「调用令牌」小圆点沿当前有向边横穿 Binder 边界滑过 + 边描边变亮，直观看清调用是怎样从
 * App 进程发起、被 system_server 的 AMS 处理、再回调回 App 进程执行——而不是一条线在同一
 * 进程里串下去。
 *
 * 时序照 BroadcastDispatchDiagram / ImplicitIntentResolutionDiagram / MvcDataFlowDiagram：
 * 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，label 落在呈现完成处 BEAT*(i+1)，离开时从该 label
 * 起淡出（最后一步 onCreate 停在亮态，表示 Activity 已创建、生命周期开跑），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：App 进程内节点=--accent、system_server 内 AMS=--warning、回调 / 创建=--success，
 * 全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）；几何常量
 * 具名且为 4 的倍数。
 */

// —— 画布与节点几何（全部 4 的倍数）。 ——
const VIEW_W = 720;
const VIEW_H = 416;

const NODE_W = 168;
const NODE_H = 56;

// 两条进程泳道：左 = App 进程，右 = system_server 进程；中间 Binder IPC 边界分隔。
const LANE_TOP = 56; // 泳道顶边（给上方标题 + Intent 卡片留白）
const LANE_H = 320; // 泳道高度
const LANE_LEFT_X = 16; // 左泳道（App 进程）左边
const LANE_LEFT_W = 304; // 左泳道宽
const BINDER_X = 360; // Binder IPC 边界竖虚线 x（两泳道正中）
const LANE_RIGHT_X = 400; // 右泳道（system_server）左边
const LANE_RIGHT_W = 304; // 右泳道宽

// App 进程内两节点：上 = 发起者 Activity（调 startActivity），下 = ApplicationThread + H。
const APP_X = 48; // App 进程节点左边
// 注：发起者 Activity 顶部 = 120；Intent 卡片在其上方 36px（y=84-112），不与 y=76 的
// 「App 进程」泳道标签（基线 y=76、字号 12、视觉下沿约 y=80）冲突。
const APP_START_Y = 120; // 发起者 Activity 顶边（给上方 Intent 卡片让出 36px，再避开泳道标签）
const APP_THREAD_Y = 272; // ApplicationThread / ActivityThread 顶边

// system_server 内 AMS 节点（居中偏上）。
const AMS_X = 444; // AMS 节点左边
const AMS_Y = 176; // AMS 节点顶边
const AMS_H = 88; // AMS 节点更高（容纳「任务栈管理」副信息）

// —— 节点定义（color 为该节点点亮时的语义色 token）。 ——
type Node = {
  id: string;
  title: string;
  /** 副标题（这个节点是什么 / 在干嘛）。 */
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
};

const NODES: readonly Node[] = [
  {
    id: "appStart",
    title: "发起者 Activity",
    sub: "startActivity(intent)",
    x: APP_X,
    y: APP_START_Y,
    w: NODE_W,
    h: NODE_H,
    color: "var(--accent)",
  },
  {
    id: "ams",
    title: "AMS",
    sub: "校验权限 · 任务栈",
    x: AMS_X,
    y: AMS_Y,
    w: NODE_W,
    h: AMS_H,
    color: "var(--warning)",
  },
  {
    id: "appThread",
    title: "ActivityThread · H",
    sub: "反射创建 → onCreate",
    x: APP_X,
    y: APP_THREAD_Y,
    w: NODE_W,
    h: NODE_H,
    color: "var(--success)",
  },
];

const NODE_BY_ID: Record<string, Node> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
// 5 步知识点：①发起 → ②跨进程到 AMS → ③AMS 处理 → ④Binder 回调回 App → ⑤H 调度创建 onCreate。
const STEPS: readonly TeachingStep[] = [
  {
    label: "start",
    caption:
      "① App 进程的发起者 Activity 调 startActivity(intent)——只是发起请求，真正的启动决策在系统进程",
  },
  {
    label: "to-ams",
    caption:
      "② 调用经 Binder IPC 跨进程边界，从 App 进程流到 system_server 进程的 AMS",
  },
  {
    label: "ams-handle",
    caption:
      "③ AMS 校验权限、管理任务栈（ActivityRecord / TaskRecord）、决定目标 Activity 落在哪个栈",
  },
  {
    label: "callback",
    caption:
      "④ AMS 经 Binder 反向回调 App 进程的 ApplicationThread——调用令牌跨回 App 进程一侧",
  },
  {
    label: "oncreate",
    caption:
      "⑤ ActivityThread 的 H(Handler) 调度，反射创建 Activity 实例并走 onCreate 生命周期",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// —— 节点中心 / 锚点（连线端点用）。 ——
function center(n: Node) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 };
}
const C_START = center(NODES[0]);
const C_AMS = center(NODES[1]);
const C_THREAD = center(NODES[2]);

const EDGE_GAP = 4; // 端点离节点边框的留白（4 的倍数）

// —— 跨进程有向边（流向步用）。每条 = 一条常驻底线 + 一段沿线滑动的「调用令牌」。 ——
type Edge = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

const EDGES: Record<string, Edge> = {
  // ② 发起者 Activity → AMS（App 进程 → system_server，横穿 Binder 边界，去程）
  "to-ams": {
    id: "to-ams",
    x1: NODES[0].x + NODES[0].w + EDGE_GAP,
    y1: C_START.cy,
    x2: NODES[1].x - EDGE_GAP,
    y2: C_AMS.cy,
    color: "var(--accent)",
  },
  // ④ AMS → ApplicationThread / ActivityThread（system_server → App 进程，横穿 Binder 边界，回程）
  callback: {
    id: "callback",
    x1: NODES[1].x - EDGE_GAP,
    y1: C_AMS.cy,
    x2: NODES[2].x + NODES[2].w + EDGE_GAP,
    y2: C_THREAD.cy,
    color: "var(--success)",
  },
};

// 步 → 它点亮的节点 id（节点步）。流向步不在此表。
const STEP_NODE: Record<string, string> = {
  start: "appStart",
  "ams-handle": "ams",
  oncreate: "appThread",
};

export function ComponentWorkflowDiagram() {
  // 节点高亮层 + 跨进程边描边 + 调用令牌 的 DOM 引用，喂给 anime.js 驱动。
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
          // —— 节点步：淡入该节点高亮层（点亮当前活跃节点）——
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
                {
                  opacity: [1, 0.18],
                  duration: TEACHING_BEAT_MS * 0.5,
                  ease: "in(2)",
                },
                lit,
              );
            }
          } else {
            tl.label(step.label, lit);
          }
        } else {
          // —— 跨进程流向步（to-ams / callback）：边描边淡亮 + 调用令牌横穿 Binder 边界滑过 ——
          const e = EDGES[step.label];
          const edge = edgeHi.current[step.label];
          const token = tokenHi.current[step.label];
          if (edge) {
            tl.add(
              edge,
              {
                opacity: [0.2, 1],
                duration: TEACHING_BEAT_MS * 0.5,
                ease: "out(2)",
              },
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
          if (edge && !isLast) {
            tl.add(
              edge,
              {
                opacity: [1, 0.2],
                duration: TEACHING_BEAT_MS * 0.5,
                ease: "in(2)",
              },
              lit,
            );
          }
        }
      });
    },
  });

  const animatedEdges: readonly Edge[] = [EDGES["to-ams"], EDGES.callback];

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
          aria-label="四大组件经 AMS 启动的工作流（以 startActivity 为例）。画面分成左右两条进程泳道：左泳道是「App 进程」，右泳道是「system_server 进程」，中间用一条竖直虚线表示 Binder IPC 跨进程边界。App 进程里有两个节点：上方是发起者 Activity（调用 startActivity），下方是 ActivityThread 及其内部的 H(Handler)；system_server 进程里是 AMS（ActivityManagerService），负责校验权限与管理任务栈。整个工作流分五步：① App 进程的发起者 Activity 调 startActivity(intent)，只是发起请求，真正的启动决策在系统进程；② 调用经 Binder IPC 横穿中间的跨进程边界，从 App 进程流到 system_server 进程的 AMS；③ AMS 校验权限、管理任务栈，用 ActivityRecord 与 TaskRecord 决定目标 Activity 落在哪个任务栈；④ AMS 再经 Binder 反向回调 App 进程的 ApplicationThread，调用令牌横穿 Binder 边界跨回 App 进程一侧；⑤ ActivityThread 的 H(Handler) 收到调度消息，用反射创建 Activity 实例并执行 onCreate 生命周期。播放时按此顺序依次点亮当前活跃节点，或让调用令牌沿有向边横穿中间的 Binder 边界来回流动——去程从 App 进程到 AMS、回程从 AMS 回到 App 进程，可播放、暂停、单步、拖动进度逐帧观察这条跨进程调用链。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="cwf-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="cwf-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* —— 两条进程泳道（常驻底框，淡边框 + 极淡填充区分左右进程）—— */}
          <g>
            {/* 左泳道：App 进程 */}
            <rect
              x={LANE_LEFT_X}
              y={LANE_TOP}
              width={LANE_LEFT_W}
              height={LANE_H}
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.04"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x={LANE_LEFT_X + 16}
              y={LANE_TOP + 20}
              fontSize="12"
              fontWeight="700"
              fill="var(--accent)"
            >
              App 进程
            </text>
            {/* 右泳道：system_server 进程 */}
            <rect
              x={LANE_RIGHT_X}
              y={LANE_TOP}
              width={LANE_RIGHT_W}
              height={LANE_H}
              rx="12"
              fill="var(--warning)"
              fillOpacity="0.04"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x={LANE_RIGHT_X + LANE_RIGHT_W - 16}
              y={LANE_TOP + 20}
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill="var(--warning)"
            >
              system_server 进程
            </text>
          </g>

          {/* —— Binder IPC 跨进程边界（竖直虚线 + 标签）—— */}
          <g>
            <line
              x1={BINDER_X}
              y1={LANE_TOP - 8}
              x2={BINDER_X}
              y2={LANE_TOP + LANE_H + 8}
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
              strokeDasharray="6 6"
              opacity="0.7"
            />
            <text
              x={BINDER_X}
              y={LANE_TOP - 16}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              Binder IPC 边界
            </text>
          </g>

          {/* —— 跨进程有向边（常驻低对比底线 + anime.js 点亮的高亮线 + 调用令牌）—— */}
          {animatedEdges.map((e) => {
            const isSuccess = e.color === "var(--success)";
            const marker = isSuccess
              ? "url(#cwf-arrow-success)"
              : "url(#cwf-arrow-accent)";
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
                {/* 调用令牌（默认隐形，跨进程流向步沿线横穿 Binder 边界滑过） */}
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

          {/* —— 节点：底框 + 高亮层（anime.js 驱动，节点步）+ 文字 —— */}
          {NODES.map((n) => (
            <g key={n.id}>
              {/* 底框（常驻、低对比） */}
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
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
                width={n.w}
                height={n.h}
                rx="8"
                fill={n.color}
                fillOpacity="0.12"
                stroke={n.color}
                strokeWidth="2"
                opacity="0"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
              {/* 标题 */}
              <text
                x={n.x + n.w / 2}
                y={n.y + n.h / 2 - 4}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={n.color}
              >
                {n.title}
              </text>
              {/* 副标题 */}
              <text
                x={n.x + n.w / 2}
                y={n.y + n.h / 2 + 14}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                {n.sub}
              </text>
            </g>
          ))}

          {/* —— Intent 卡片（钉在发起者 Activity 上方，强调「发起请求」）—— */}
          <g>
            <rect
              x={APP_X}
              y={APP_START_Y - 36}
              width={NODE_W}
              height={28}
              rx="8"
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <text
              x={APP_X + NODE_W / 2}
              y={APP_START_Y - 18}
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              Intent → 目标 Activity
            </text>
          </g>

          {/* —— AMS 任务栈管理提示（钉在 AMS 节点下方）—— */}
          <text
            x={C_AMS.cx}
            y={AMS_Y + AMS_H + 18}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--warning)"
          >
            ActivityRecord / TaskRecord
          </text>

          {/* —— 步骤序号标注（小而稳，常驻，帮读者把动画与第几步对齐）—— */}
          <text
            x={C_START.cx}
            y={APP_START_Y + NODE_H + 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ① 发起 · ② 跨进程 →
          </text>
          <text
            x={C_AMS.cx}
            y={AMS_Y - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            ③ AMS 处理
          </text>
          <text
            x={C_THREAD.cx}
            y={APP_THREAD_Y + NODE_H + 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            ④ ← Binder 回调 · ⑤ onCreate
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次 startActivity 如何从 App 进程发起、经 Binder 跨进程交给 system_server 的 AMS 处理、再经 Binder 回调回 App 进程由 H(Handler) 调度创建 Activity 并走 onCreate；可暂停、单步、拖进度逐帧观察这条跨进程调用链。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四大组件经 AMS 启动的工作流（以 startActivity 为例）：App 进程发起 → Binder 跨进程到
        system_server 的 AMS 校验权限 / 管理任务栈 → AMS 经 Binder 回调 App 进程的
        ApplicationThread → ActivityThread 的 H(Handler) 调度反射创建 Activity 并走 onCreate。
        关键是这是一条**跨进程**调用链：令牌在两条进程泳道间经 Binder 边界来回穿梭。
      </figcaption>
    </figure>
  );
}
