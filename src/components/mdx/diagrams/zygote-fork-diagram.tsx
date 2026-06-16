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
 * <ZygoteForkDiagram>：《Android 进阶解密》process-management/app-process-startup 章
 * 「从点击图标到 App 进程诞生」动画配图（HEL-217）——本图是该章已有静态
 * <AndroidStartupSequenceDiagram> 的**动画补充**，独立呈现「Zygote fork 出新 App 进程」
 * 这条主线，强调 Zygote 预加载 + COW 写时复制是 App 秒启的关键、attach 是新进程与 AMS 的握手。
 *
 * 「可控教学动画」：随时间线走完一次「用户点图标 → App 进程诞生」的全过程，看清三方协作——
 * 左 system_server（内含 AMS 调度中枢）/ 中 Zygote（模板工厂）/ 右「新 App 进程」（诞生区）：
 *   ① 用户点 Launcher 图标 → startActivity（令牌从 system_server 一侧的 AMS 节点点亮起步）→
 *   ② AMS（system_server）发现目标进程不存在，决定创建 → ③ AMS 经 Socket 向 Zygote 发 fork
 *      请求（令牌从 AMS 流到 Zygote）→ ④ Zygote 调 fork() 孵化新 App 进程：通过 COW 写时复制
 *      继承预加载的类 / 资源，省内存又省时间——「新 App 进程」卡片从 Zygote 位置**分裂**淡入
 *      并位移到右侧诞生区高亮 → ⑤ 新进程执行 ActivityThread.main()，再经 attachApplication
 *      通过 Binder **反向**绑定回 AMS（令牌从新进程回流到 AMS，这是新进程与 AMS 的握手）→
 *   ⑥ AMS 调度拉起目标 Activity（令牌再从 AMS 流向新进程，新进程走 onCreate，停在亮态）。
 *
 * 每步点亮「当前活跃元素」：节点步（①②）淡入对应节点高亮层；令牌流向步（③⑤⑥）让一段
 * 「调用令牌」小圆点沿当前有向边横穿 Socket / Binder 边界滑过 + 边描边变亮；fork 步（④）让
 * 「新 App 进程」卡片从 Zygote 位置分裂淡入并位移到诞生区——直观看清新进程是怎样**从 Zygote
 * 长出来**的，而不是凭空出现。
 *
 * 时序照 ComponentWorkflowDiagram / AmsStartActivityDiagram：步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出
 * （最后一步 onCreate 停在亮态，表示目标 Activity 已创建、App 已诞生），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：system_server / AMS=--warning、Zygote=--accent、新 App 进程 / 诞生 / 握手=--success，
 * 全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）；几何常量
 * 具名且为 4 的倍数。
 */

// —— 画布与节点几何（全部 4 的倍数）。 ——
const VIEW_W = 760;
const VIEW_H = 448;

const NODE_W = 176;
const NODE_H = 64;

// 三条进程泳道：左 = system_server（含 AMS）/ 中 = Zygote / 右 = 新 App 进程（诞生区）。
const LANE_TOP = 56; // 泳道顶边（给上方标题 + 图标卡片留白）
const LANE_H = 344; // 泳道高度
const LANE_LEFT_X = 12; // 左泳道（system_server）左边
const LANE_MID_X = 292; // 中泳道（Zygote）左边
const LANE_RIGHT_X = 524; // 右泳道（新 App 进程 / 诞生区）左边
const LANE_W = 224; // 单条泳道宽（三条等宽）

// Socket 跨进程边界（system_server → Zygote 之间的竖虚线）。
const SOCKET_X = 280; // system_server 与 Zygote 泳道之间
// Binder / fork 边界（Zygote → 新 App 进程之间的竖虚线）。
const FORK_BOUND_X = 512; // Zygote 与新 App 进程泳道之间

// 左泳道内 AMS 节点（system_server 的调度中枢，居中偏上）。
const AMS_X = 32; // AMS 节点左边
const AMS_Y = 152; // AMS 节点顶边
const AMS_H = 92; // AMS 节点更高（容纳「调度中枢」副信息）

// 中泳道内 Zygote 节点（模板工厂，与 AMS 同高带）。
const ZYGOTE_X = 308; // Zygote 节点左边
const ZYGOTE_Y = 168; // Zygote 节点顶边
const ZYGOTE_H = 64; // Zygote 节点高

// 右泳道内「新 App 进程」诞生卡片（fork 后从 Zygote 分裂位移到此处高亮）。
const APP_X = 540; // 新 App 进程节点左边（诞生终点）
const APP_Y = 168; // 新 App 进程节点顶边

// fork 分裂动画：卡片从 Zygote 位置出发，位移到诞生区终点（位移量 = 终点 x − 起点 x）。
const FORK_FROM_X = ZYGOTE_X; // 分裂起点 x（贴着 Zygote）
const FORK_DX = APP_X - FORK_FROM_X; // 卡片从 Zygote 滑到诞生区的水平位移

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
    id: "ams",
    title: "AMS（调度中枢）",
    sub: "进程不存在 → 决定创建",
    x: AMS_X,
    y: AMS_Y,
    w: NODE_W,
    h: AMS_H,
    color: "var(--warning)",
  },
  {
    id: "zygote",
    title: "Zygote",
    sub: "预加载类 / 资源 · fork()",
    x: ZYGOTE_X,
    y: ZYGOTE_Y,
    w: NODE_W,
    h: ZYGOTE_H,
    color: "var(--accent)",
  },
];

const NODE_BY_ID: Record<string, Node> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

// —— 节点中心 / 锚点（连线端点用）。 ——
function center(n: Node) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 };
}
const C_AMS = center(NODE_BY_ID.ams);
const C_ZYGOTE = center(NODE_BY_ID.zygote);
// 新 App 进程诞生卡片中心（与 Zygote 同高带）。
const C_APP = { cx: APP_X + NODE_W / 2, cy: APP_Y + ZYGOTE_H / 2 };

const EDGE_GAP = 4; // 端点离节点边框的留白（4 的倍数）

// —— 跨边界有向边（令牌流向步用）。每条 = 一条常驻底线 + 一段沿线滑动的「调用令牌」。 ——
type Edge = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

const EDGES: Record<string, Edge> = {
  // ③ AMS → Zygote（system_server 经 Socket 发 fork 请求，横穿 Socket 边界，去程）
  "socket-fork": {
    id: "socket-fork",
    x1: NODE_BY_ID.ams.x + NODE_BY_ID.ams.w + EDGE_GAP,
    y1: C_AMS.cy,
    x2: NODE_BY_ID.zygote.x - EDGE_GAP,
    y2: C_ZYGOTE.cy,
    color: "var(--warning)",
  },
  // ⑤ 新 App 进程 → AMS（attachApplication 经 Binder 反向握手回 AMS，回程）
  attach: {
    id: "attach",
    x1: APP_X - EDGE_GAP,
    y1: C_APP.cy,
    x2: NODE_BY_ID.ams.x + NODE_BY_ID.ams.w + EDGE_GAP,
    y2: C_AMS.cy,
    color: "var(--success)",
  },
  // ⑥ AMS → 新 App 进程（AMS 调度拉起目标 Activity，令牌再次去到新进程，去程）
  "launch-activity": {
    id: "launch-activity",
    x1: NODE_BY_ID.ams.x + NODE_BY_ID.ams.w + EDGE_GAP,
    y1: C_AMS.cy,
    x2: APP_X - EDGE_GAP,
    y2: C_APP.cy,
    color: "var(--success)",
  },
};

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
// 6 步知识点：①点图标 → ②AMS 发现进程缺失 → ③Socket 请 Zygote → ④fork(COW)诞生 → ⑤attach 握手 → ⑥拉起 Activity。
const STEPS: readonly TeachingStep[] = [
  {
    label: "tap",
    caption:
      "① 用户点 Launcher 图标 → startActivity——请求经 Binder 抵达 system_server 的 AMS（调度中枢被点亮）",
  },
  {
    label: "no-process",
    caption:
      "② AMS 发现目标 App 进程尚不存在，决定为它创建一个新进程",
  },
  {
    label: "socket-fork",
    caption:
      "③ AMS 经 Socket 向 Zygote 发出 fork 请求——携带 uid/gid、进程名、入口 Activity 信息",
  },
  {
    label: "fork-born",
    caption:
      "④ Zygote 调 fork() 孵化新 App 进程：通过 COW 写时复制继承预加载的类 / 资源，省内存又省时间——新进程从 Zygote「分裂」诞生",
  },
  {
    label: "attach",
    caption:
      "⑤ 新进程执行 ActivityThread.main()，再经 attachApplication 通过 Binder 反向握手回 AMS——「我准备好了」",
  },
  {
    label: "launch",
    caption:
      "⑥ AMS 调度拉起目标 Activity，新进程回调 onCreate——App 进程正式诞生、界面将显示",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 步 → 它点亮的节点 id（节点步）。令牌流向步与 fork 步不在此表。
const STEP_NODE: Record<string, string> = {
  tap: "ams",
  "no-process": "ams",
};

export function ZygoteForkDiagram() {
  // 节点高亮层 + 跨边界边描边 + 调用令牌 + fork 分裂卡片 的 DOM 引用，喂给 anime.js 驱动。
  const nodeHi = useRef<Record<string, SVGRectElement | null>>({});
  const edgeHi = useRef<Record<string, SVGLineElement | null>>({});
  const tokenHi = useRef<Record<string, SVGCircleElement | null>>({});
  // 「新 App 进程」诞生卡片整组（fork 步从 Zygote 分裂淡入 + 位移到诞生区）。
  const bornGroup = useRef<SVGGElement | null>(null);
  // 诞生卡片高亮层（fork 后维持亮态，⑥ 步再次强调）。
  const bornHi = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全呈现时刻 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

        const nodeId = STEP_NODE[step.label];

        // —— 节点步（① tap / ② no-process）：淡入该节点高亮层（点亮当前活跃节点）——
        if (nodeId) {
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
          }
          tl.label(step.label, lit);
          return;
        }

        // —— fork 诞生步（④ fork-born）：「新 App 进程」卡片从 Zygote 位置分裂淡入并位移到诞生区高亮 ——
        if (step.label === "fork-born") {
          const g = bornGroup.current;
          if (g) {
            // 卡片从 Zygote 起点（translateX = −FORK_DX，即贴着 Zygote）滑到诞生区终点（translateX = 0）。
            tl.add(
              g,
              {
                opacity: [0, 1],
                translateX: [-FORK_DX, 0],
                scale: [0.84, 1],
                duration: TEACHING_BEAT_MS,
                ease: "out(3)",
              },
              start,
            );
          }
          const hi = bornHi.current;
          if (hi) {
            // 诞生卡片高亮层淡亮后维持（fork 出来就一直「活着」，不淡灭）。
            tl.add(
              hi,
              {
                opacity: [0, 1],
                duration: TEACHING_BEAT_MS,
                ease: "out(3)",
              },
              start,
            );
          }
          tl.label(step.label, lit);
          return;
        }

        // —— 令牌流向步（③ socket-fork / ⑤ attach / ⑥ launch）：边描边淡亮 + 调用令牌横穿边界滑过 ——
        const e = EDGES[step.label === "launch" ? "launch-activity" : step.label];
        const edgeKey = step.label === "launch" ? "launch-activity" : step.label;
        const edge = edgeHi.current[edgeKey];
        const token = tokenHi.current[edgeKey];
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
      });
    },
  });

  const animatedEdges: readonly Edge[] = [
    EDGES["socket-fork"],
    EDGES.attach,
    EDGES["launch-activity"],
  ];

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
          aria-label="从用户点击图标到 App 进程诞生：Zygote fork 出新 App 进程的全过程。画面分成左中右三条进程泳道，泳道之间用竖直虚线表示跨进程边界：左泳道是 system_server 进程，内含 AMS（ActivityManagerService）这个四大组件调度中枢；中泳道是 Zygote 进程，它预加载了大量系统类与资源、并通过 fork() 孵化新进程，是 App 秒启动的关键；右泳道是「新 App 进程」诞生区。整个过程分六步：① 用户点击 Launcher 图标触发 startActivity，请求经 Binder 抵达 system_server 的 AMS，AMS 节点被点亮；② AMS 发现目标 App 进程尚不存在，决定为它创建一个新进程；③ AMS 经 Socket 向 Zygote 发出 fork 请求，携带 uid/gid、进程名、入口 Activity 信息，一个调用令牌从 AMS 横穿 Socket 边界流向 Zygote；④ Zygote 调用 fork() 孵化新 App 进程，新进程通过 COW 写时复制继承 Zygote 预加载的类与资源，省内存又省时间，画面上「新 App 进程」卡片从 Zygote 位置分裂、淡入并位移到右侧诞生区高亮，直观表现新进程是从 Zygote 长出来的；⑤ 新进程执行 ActivityThread.main()，再通过 attachApplication 经 Binder 反向握手回 AMS，告诉 AMS「我准备好了」，令牌从新进程回流到 AMS；⑥ AMS 调度拉起目标 Activity，令牌再从 AMS 流向新进程，新进程回调 onCreate，App 进程正式诞生、界面将显示。播放时按此顺序依次点亮当前活跃节点、让调用令牌沿有向边横穿 Socket 与 Binder 边界流动、并让新进程卡片从 Zygote 分裂诞生，可播放、暂停、单步、拖动进度逐帧观察 Zygote fork 出 App 进程这条主线。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker
              id="zyg-arrow-warning"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
            <marker
              id="zyg-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* —— 三条进程泳道（常驻底框，淡边框 + 极淡填充区分进程）—— */}
          <g>
            {/* 左泳道：system_server（含 AMS） */}
            <rect
              x={LANE_LEFT_X}
              y={LANE_TOP}
              width={LANE_W}
              height={LANE_H}
              rx="12"
              fill="var(--warning)"
              fillOpacity="0.04"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x={LANE_LEFT_X + 16}
              y={LANE_TOP + 20}
              fontSize="12"
              fontWeight="700"
              fill="var(--warning)"
            >
              system_server 进程
            </text>
            {/* 中泳道：Zygote */}
            <rect
              x={LANE_MID_X}
              y={LANE_TOP}
              width={LANE_W}
              height={LANE_H}
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.04"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x={LANE_MID_X + LANE_W / 2}
              y={LANE_TOP + 20}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--accent)"
            >
              Zygote 进程
            </text>
            {/* 右泳道：新 App 进程（诞生区） */}
            <rect
              x={LANE_RIGHT_X}
              y={LANE_TOP}
              width={LANE_W}
              height={LANE_H}
              rx="12"
              fill="var(--success)"
              fillOpacity="0.04"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x={LANE_RIGHT_X + LANE_W - 16}
              y={LANE_TOP + 20}
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill="var(--success)"
            >
              新 App 进程（诞生区）
            </text>
          </g>

          {/* —— 跨进程边界（竖虚线 + 标签）：左=Socket（system_server↔Zygote）/ 右=Binder fork（Zygote↔新进程）—— */}
          <g>
            <line
              x1={SOCKET_X}
              y1={LANE_TOP - 8}
              x2={SOCKET_X}
              y2={LANE_TOP + LANE_H + 8}
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
              strokeDasharray="6 6"
              opacity="0.7"
            />
            <text
              x={SOCKET_X}
              y={LANE_TOP - 16}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              Socket 请求
            </text>
            <line
              x1={FORK_BOUND_X}
              y1={LANE_TOP - 8}
              x2={FORK_BOUND_X}
              y2={LANE_TOP + LANE_H + 8}
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
              strokeDasharray="6 6"
              opacity="0.7"
            />
            <text
              x={FORK_BOUND_X}
              y={LANE_TOP - 16}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              fork / Binder
            </text>
          </g>

          {/* —— 跨边界有向边（常驻低对比底线 + anime.js 点亮的高亮线 + 调用令牌）—— */}
          {animatedEdges.map((e) => {
            const isSuccess = e.color === "var(--success)";
            const marker = isSuccess
              ? "url(#zyg-arrow-success)"
              : "url(#zyg-arrow-warning)";
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
                {/* 调用令牌（默认隐形，令牌流向步沿线横穿边界滑过） */}
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

          {/* —— 常驻节点：AMS（system_server）+ Zygote。底框 + 高亮层（anime.js 驱动，节点步）+ 文字 —— */}
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
                fontSize="13.5"
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

          {/* —— 「新 App 进程」诞生卡片（fork 步从 Zygote 分裂淡入 + 位移到诞生区，整组 anime.js 驱动）—— */}
          <g
            ref={(el) => {
              bornGroup.current = el;
            }}
            opacity="0"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            {/* 底框 */}
            <rect
              x={APP_X}
              y={APP_Y}
              width={NODE_W}
              height={ZYGOTE_H}
              rx="8"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            {/* 诞生高亮层（fork 后维持亮态） */}
            <rect
              ref={(el) => {
                bornHi.current = el;
              }}
              x={APP_X}
              y={APP_Y}
              width={NODE_W}
              height={ZYGOTE_H}
              rx="8"
              fill="var(--success)"
              fillOpacity="0.12"
              stroke="var(--success)"
              strokeWidth="2"
              opacity="0"
            />
            {/* 标题 */}
            <text
              x={C_APP.cx}
              y={APP_Y + ZYGOTE_H / 2 - 4}
              textAnchor="middle"
              fontSize="13.5"
              fontWeight="700"
              fill="var(--success)"
            >
              新 App 进程
            </text>
            {/* 副标题 */}
            <text
              x={C_APP.cx}
              y={APP_Y + ZYGOTE_H / 2 + 14}
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--text-secondary)"
            >
              ActivityThread.main()
            </text>
          </g>

          {/* —— Launcher 图标卡片（钉在 AMS 上方，强调「用户点图标发起」）—— */}
          <g>
            <rect
              x={AMS_X}
              y={AMS_Y - 40}
              width={NODE_W}
              height={28}
              rx="8"
              fill="var(--bg)"
              stroke="var(--warning)"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <text
              x={AMS_X + NODE_W / 2}
              y={AMS_Y - 22}
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--warning)"
            >
              点图标 → startActivity
            </text>
          </g>

          {/* —— COW 预加载提示（钉在 Zygote 下方，点题「秒启关键」）—— */}
          <text
            x={C_ZYGOTE.cx}
            y={ZYGOTE_Y + ZYGOTE_H + 20}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            COW 写时复制 · 预加载继承
          </text>
          <text
            x={C_ZYGOTE.cx}
            y={ZYGOTE_Y + ZYGOTE_H + 36}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            省内存 · 省时间 = App 秒启
          </text>

          {/* —— attach 握手提示（钉在新进程下方，点题「新进程与 AMS 的握手」）—— */}
          <text
            x={C_APP.cx}
            y={APP_Y + ZYGOTE_H + 20}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            attachApplication（Binder 握手）
          </text>

          {/* —— 步骤序号标注（小而稳，常驻，帮读者把动画与第几步对齐）—— */}
          <text
            x={C_AMS.cx}
            y={AMS_Y + AMS_H + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            ① 点图标 · ② 进程缺失
          </text>
          <text
            x={SOCKET_X}
            y={LANE_TOP + LANE_H + 28}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            ③ Socket 请 Zygote →
          </text>
          <text
            x={C_APP.cx}
            y={LANE_TOP + LANE_H + 28}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            ④ fork 诞生 · ⑤ attach 握手 · ⑥ onCreate
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次「点图标 → App 进程诞生」：AMS（system_server）发现进程缺失 → 经 Socket 请 Zygote → Zygote fork()（COW 继承预加载，App 秒启关键）孵化新进程 → 新进程 ActivityThread.main() 后 attach 握手回 AMS → AMS 拉起 Activity 走 onCreate；可暂停、单步、拖进度逐帧观察新进程怎样从 Zygote「分裂」诞生。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从点击图标到 App 进程诞生：AMS（system_server）发现目标进程不存在 → 经
        Socket 请 Zygote → Zygote `fork()` 孵化新进程（COW 写时复制继承预加载的类 /
        资源，是 App 秒启的关键）→ 新进程跑 ActivityThread.main() 后经 attachApplication
        **反向握手**回 AMS → AMS 调度拉起目标 Activity 走 onCreate。关键是新进程**从 Zygote
        分裂而来**、并靠 attach 与 AMS 建立联系。
      </figcaption>
    </figure>
  );
}
