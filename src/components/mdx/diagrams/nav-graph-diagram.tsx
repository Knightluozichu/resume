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
 * <NavGraphDiagram>：《Android 编程权威指南》fragment-navigation 章「Navigation 导航图」配图（HEL-181）。
 *
 * 「可控教学动画」：把 Navigation Graph 画成一张「地铁线路图」——三个目的地（Fragment）
 * 用 action 有向边串起来，随时间线走完一次完整的 **navigate 前进 + popBackStack 后退**，
 * 看清三件事：① startDestination 是 App 的起点站；② navigate(action) 让当前目的地沿 action
 * 边跳到下一站、上一站压入返回栈；③ 按系统返回键 = popBackStack，沿来路把栈顶弹掉、回到上一站。
 *   ① startDestination = ListFragment 高亮为当前目的地（返回栈深 1）→
 *   ② navigate(action_list_to_detail) 沿边滑到 DetailFragment，新目的地高亮、ListFragment 入栈（深 2）→
 *   ③ navigate(action_detail_to_settings) 再滑到 SettingsFragment（深 3）→
 *   ④ 按返回键 popBackStack：栈顶 SettingsFragment 弹出，沿 action 边回退到 DetailFragment（深 2）→
 *   ⑤ 再按返回键 popBackStack：回到 startDestination = ListFragment（深 1，回到起点）。
 *
 * 每步点亮「当前目的地」（accent 描边 + 高亮填充覆盖层，与 BackStackDiagram 同款语言），
 * 并让一个「导航令牌」小圆点沿该步走过的 action 边滑动（前进沿正向、popBackStack 沿反向），
 * 同时旁边的「返回栈深度」指示跟着步进——把抽象的栈深变成可数的一列方块。
 *
 * 时序照 MvcDataFlowDiagram / BackStackDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * label 落在呈现完成处 BEAT*(i+1)，最后一步停在亮态不淡出（回到起点、闭环完成），
 * 杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：当前目的地高亮用 --accent（与「栈顶 = 当前」语义统一）；navigate 前进边用 --accent、
 * popBackStack 后退边用 --danger（返回 = 销毁栈顶，红色警示）。全部 DESIGN token 配色无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量、几何常量均具名且为 4 的倍数（硬规则 5）。
 */

// —— 三个目的地节点（横向线性布局，最贴近「线路图」直觉：左→右前进，右→左后退）。 ——
type DestNode = {
  id: string;
  /** 目的地类名（Fragment）。 */
  title: string;
  /** 角色副标题。 */
  role: string;
  x: number;
  y: number;
  /** 是否 startDestination（起点站，常驻标记）。 */
  start?: boolean;
};

const NODE_W = 160;
const NODE_H = 64;
const NODE_GAP = 56; // 相邻目的地的水平间隔（容纳 action 边 + 令牌）
const ROW_Y = 96; // 三个目的地所在行的顶边 y

// 三个目的地从左到右等距排布；x = 左留白 + i*(宽+间隔)。
const COL_X = 24;
const NODES: readonly DestNode[] = [
  {
    id: "list",
    title: "ListFragment",
    role: "列表页",
    x: COL_X,
    y: ROW_Y,
    start: true,
  },
  {
    id: "detail",
    title: "DetailFragment",
    role: "详情页",
    x: COL_X + (NODE_W + NODE_GAP),
    y: ROW_Y,
  },
  {
    id: "settings",
    title: "SettingsFragment",
    role: "设置页",
    x: COL_X + (NODE_W + NODE_GAP) * 2,
    y: ROW_Y,
  },
];

const NODE_BY_ID: Record<string, DestNode> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

const VIEW_W = COL_X * 2 + NODE_W * 3 + NODE_GAP * 2; // 左右留白对称
const VIEW_H = 280;

// —— 节点锚点（边端点用）。前进边走节点中线偏上、后退边走中线偏下，两向不互相压线。 ——
const EDGE_OFF = 12; // 前进 / 后退两条边的垂直偏移（4 的倍数）
function rightMid(n: DestNode) {
  return { x: n.x + NODE_W, y: n.y + NODE_H / 2 };
}
function leftMid(n: DestNode) {
  return { x: n.x, y: n.y + NODE_H / 2 };
}

// —— 关键帧步骤：声明该步「当前目的地」、走过的 action 边（及方向）、返回栈深度。 ——
type NavStep = TeachingStep & {
  /** 该步结束时的当前目的地 id（点亮它）。 */
  current: string;
  /** 该步令牌滑动的 action 边 id（null = 无滑动，仅点亮起点站）。 */
  edge: string | null;
  /** 令牌方向：forward = navigate 正向、back = popBackStack 反向。 */
  dir: "forward" | "back" | null;
  /** 该步结束时的返回栈深度（栈里的目的地数）。 */
  depth: number;
};

const STEPS: readonly NavStep[] = [
  {
    label: "start",
    caption:
      "① App 启动停在 startDestination = ListFragment（当前目的地），返回栈深 1",
    current: "list",
    edge: null,
    dir: null,
    depth: 1,
  },
  {
    label: "nav-detail",
    caption:
      "② navigate(action_list_to_detail)：沿 action 边跳到 DetailFragment，ListFragment 入返回栈（深 2）",
    current: "detail",
    edge: "list-to-detail",
    dir: "forward",
    depth: 2,
  },
  {
    label: "nav-settings",
    caption:
      "③ navigate(action_detail_to_settings)：再沿 action 边跳到 SettingsFragment（深 3）",
    current: "settings",
    edge: "detail-to-settings",
    dir: "forward",
    depth: 3,
  },
  {
    label: "pop-settings",
    caption:
      "④ 按系统返回键 popBackStack：栈顶 SettingsFragment 弹出，沿来路回退到 DetailFragment（深 2）",
    current: "detail",
    edge: "detail-to-settings",
    dir: "back",
    depth: 2,
  },
  {
    label: "pop-detail",
    caption:
      "⑤ 再按返回键 popBackStack：回到 startDestination = ListFragment（深 1，回到起点）",
    current: "list",
    edge: "list-to-detail",
    dir: "back",
    depth: 1,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// —— 两条 action 有向边（前进方向，左→右）。每条 = 一条常驻底线 + 沿线滑动的导航令牌。 ——
type ActionEdge = {
  id: string;
  /** action 名（导航图里 <action android:id> 的值）。 */
  action: string;
  /** 前进方向起点（源目的地右边） / 终点（目标目的地左边）。 */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const EDGES: Record<string, ActionEdge> = {
  "list-to-detail": {
    id: "list-to-detail",
    action: "action_list_to_detail",
    x1: rightMid(NODE_BY_ID.list).x,
    y1: rightMid(NODE_BY_ID.list).y - EDGE_OFF,
    x2: leftMid(NODE_BY_ID.detail).x,
    y2: leftMid(NODE_BY_ID.detail).y - EDGE_OFF,
  },
  "detail-to-settings": {
    id: "detail-to-settings",
    action: "action_detail_to_settings",
    x1: rightMid(NODE_BY_ID.detail).x,
    y1: rightMid(NODE_BY_ID.detail).y - EDGE_OFF,
    x2: leftMid(NODE_BY_ID.settings).x,
    y2: leftMid(NODE_BY_ID.settings).y - EDGE_OFF,
  },
};

// —— 返回栈深度指示：底部一列方块，第 i 块在该步深度 ≥ i+1 时点亮。 ——
const STACK_MAX = 3; // 最深栈深（三个目的地）
const STACK_BOX_W = 96;
const STACK_BOX_H = 16;
const STACK_BOX_GAP = 8;
const STACK_BASE_Y = VIEW_H - 24; // 最底层方块的顶边 y（栈底在下）
const STACK_X = (VIEW_W - STACK_BOX_W) / 2; // 居中

/** 第 i 层（0 = 栈底）方块的顶边 y。 */
function stackBoxY(i: number): number {
  return STACK_BASE_Y - i * (STACK_BOX_H + STACK_BOX_GAP);
}

export function NavGraphDiagram() {
  // 目的地高亮覆盖层、action 边高亮线、导航令牌、返回栈方块的 DOM 引用，喂给 anime.js。
  const destHi = useRef<Record<string, SVGRectElement | null>>({});
  const edgeHi = useRef<Record<string, SVGLineElement | null>>({});
  const token = useRef<SVGCircleElement | null>(null);
  const stackBox = useRef<Record<number, SVGRectElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

        // (a) 目的地高亮：当前目的地淡入到 1，其余淡到半灭（与 BackStackDiagram 同款）。
        NODES.forEach((n) => {
          const hi = destHi.current[n.id];
          if (!hi) return;
          tl.add(
            hi,
            {
              opacity: n.id === step.current ? 1 : 0.16,
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
        });

        // (b) 导航令牌：沿该步走过的 action 边滑动（forward 正向 / back 反向）。
        if (step.edge && step.dir && token.current) {
          const e = EDGES[step.edge];
          const fromX = step.dir === "forward" ? e.x1 : e.x2;
          const fromY = step.dir === "forward" ? e.y1 : e.y2;
          const toX = step.dir === "forward" ? e.x2 : e.x1;
          const toY = step.dir === "forward" ? e.y2 : e.y1;
          // 令牌颜色随方向：前进 = accent，后退（popBackStack）= danger。
          tl.add(
            token.current,
            {
              opacity: [0, 1, 1, 0],
              cx: [fromX, toX],
              cy: [fromY, toY],
              fill:
                step.dir === "forward" ? "var(--accent)" : "var(--danger)",
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
          // 该步走过的边描边淡亮，呈现完后淡回（最后一步留亮）。
          const edge = edgeHi.current[step.edge];
          if (edge) {
            const litColor =
              step.dir === "forward" ? "var(--accent)" : "var(--danger)";
            tl.add(
              edge,
              {
                opacity: [0.2, 1],
                stroke: litColor,
                duration: TEACHING_BEAT_MS * 0.5,
                ease: "out(2)",
              },
              start,
            );
            if (!isLast) {
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
        }

        // (c) 返回栈深度方块：第 j 层在深度 > j 时点亮，否则灭。
        for (let j = 0; j < STACK_MAX; j++) {
          const box = stackBox.current[j];
          if (!box) continue;
          tl.add(
            box,
            {
              opacity: j < step.depth ? 1 : 0.16,
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
        }

        tl.label(step.label, lit);
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
          aria-label="Jetpack Navigation 导航图与返回栈演示。一张「地铁线路图」：三个目的地（Fragment）从左到右排列——ListFragment（列表页，标记为 startDestination 起点站）、DetailFragment（详情页）、SettingsFragment（设置页），相邻目的地之间用 action 有向边连接。底部一列方块表示返回栈深度。五步演示一次完整的前进与后退导航：① App 启动停在 startDestination = ListFragment，当前目的地高亮，返回栈深 1；② 调用 navigate(action_list_to_detail)，导航令牌沿 action 边滑到 DetailFragment，新目的地高亮，ListFragment 压入返回栈，深度变 2；③ 再调用 navigate(action_detail_to_settings)，滑到 SettingsFragment，深度变 3；④ 按系统返回键触发 popBackStack，栈顶 SettingsFragment 弹出销毁，令牌沿来路反向滑回 DetailFragment，深度回到 2；⑤ 再按返回键 popBackStack，回到 startDestination = ListFragment，深度回到 1，回到起点。前进导航的令牌与边用品牌紫，后退（popBackStack）用警示红。可播放、暂停、单步、拖动进度逐帧观察 navigate 如何沿 action 边前进入栈、popBackStack 如何沿来路后退出栈，以及当前目的地高亮如何始终对应屏幕上正显示的 Fragment。"
          className="mx-auto block h-auto w-full"
          style={{ maxWidth: `${VIEW_W}px` }}
        >
          <defs>
            <marker
              id="navgraph-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 顶部说明：导航图 = 地铁线路图 */}
          <text
            x={VIEW_W / 2}
            y={24}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            Navigation Graph：目的地 = 站，action = 跳转箭头
          </text>

          {/* —— action 有向边（常驻底线 + anime.js 点亮的高亮线 + action 名标注）—— */}
          {Object.values(EDGES).map((e) => (
            <g key={e.id}>
              {/* 底线（常驻、低对比、前进方向箭头） */}
              <line
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="var(--text-secondary)"
                strokeWidth="1.4"
                markerEnd="url(#navgraph-arrow-accent)"
                opacity="0.45"
              />
              {/* 高亮线（默认半灭，该步淡亮；颜色随方向由 anime.js 改） */}
              <line
                ref={(el) => {
                  edgeHi.current[e.id] = el;
                }}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="var(--accent)"
                strokeWidth="2.4"
                opacity="0.2"
              />
              {/* action 名（沿边上方常驻标注） */}
              <text
                x={(e.x1 + e.x2) / 2}
                y={e.y1 - 8}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                {e.action}
              </text>
            </g>
          ))}

          {/* —— 三个目的地节点：底框 + 高亮覆盖层（anime.js 驱动）+ 文字 —— */}
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
              {/* 高亮覆盖层：默认半灭，当前目的地步淡入到 1（accent 描边 + 辉光填充） */}
              <rect
                ref={(el) => {
                  destHi.current[n.id] = el;
                }}
                x={n.x}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                fill="var(--accent-glow)"
                stroke="var(--accent)"
                strokeWidth="2"
                opacity={n.id === STEPS[0].current ? 1 : 0.16}
              />
              {/* startDestination 起点站标记（常驻小角标） */}
              {n.start && (
                <text
                  x={n.x + NODE_W / 2}
                  y={n.y - 10}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--accent)"
                >
                  ★ startDestination
                </text>
              )}
              {/* 目的地类名 */}
              <text
                x={n.x + NODE_W / 2}
                y={n.y + 28}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {n.title}
              </text>
              {/* 角色副标题 */}
              <text
                x={n.x + NODE_W / 2}
                y={n.y + 48}
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--text-secondary)"
              >
                {n.role}
              </text>
            </g>
          ))}

          {/* —— 导航令牌（默认隐形，该步沿当前 action 边滑过；颜色随方向由 anime.js 改）—— */}
          <circle
            ref={(el) => {
              token.current = el;
            }}
            cx={EDGES["list-to-detail"].x1}
            cy={EDGES["list-to-detail"].y1}
            r="6"
            fill="var(--accent)"
            opacity="0"
          />

          {/* —— 返回栈深度指示（底部一列方块，栈底在下；点亮数 = 当前栈深）—— */}
          <text
            x={STACK_X + STACK_BOX_W / 2}
            y={stackBoxY(STACK_MAX - 1) - 12}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            返回栈深度
          </text>
          {Array.from({ length: STACK_MAX }, (_, j) => (
            <rect
              key={j}
              ref={(el) => {
                stackBox.current[j] = el;
              }}
              x={STACK_X}
              y={stackBoxY(j)}
              width={STACK_BOX_W}
              height={STACK_BOX_H}
              rx="4"
              fill="var(--accent-glow)"
              stroke="var(--accent)"
              strokeWidth="1.4"
              opacity={j < STEPS[0].depth ? 1 : 0.16}
            />
          ))}
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看 navigate(action) 如何沿 action 边前进入栈、按返回键 popBackStack 如何沿来路后退出栈；当前目的地高亮始终对应屏幕上正显示的 Fragment，右下返回栈深度跟着步进。可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Navigation 导航图：startDestination 是起点站，navigate(action) 沿 action 边前进、上一站入返回栈，
        按系统返回键 = popBackStack 沿来路弹出栈顶回到上一站。当前目的地高亮即屏幕上正显示的 Fragment。
      </figcaption>
    </figure>
  );
}
