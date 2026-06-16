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
 * <HookMechanismDiagram>：《Android 进阶解密》advanced-tech/hook-technology 章
 * 「Hook 拦截原理」配图（HEL-210）。
 *
 * 「可控教学动画」：随时间线走完一次「字段被换成中间人后，调用怎样被劫持」的全过程——
 * 看清 Hook 的本质就是「把持有原始目标的引用偷偷换成一个中间人代理」：
 *   ① 正常调用（无 Hook）：调用方令牌沿上方直达边直接打到原始目标，原始流程 →
 *   ② 安装 Hook：用反射 / 动态代理把「持有 Target 的字段」（常是系统单例 / 静态字段，
 *      如 AMS 的 IActivityManager 实例）替换成 Hook 代理——上方直达边变灰失效、下方改道边亮起 →
 *   ③ 再次调用：调用方令牌不再直达，而是先打到 Hook 代理（令牌被中间人截获）→
 *   ④ Hook 执行自定义逻辑：改参数 / 监控 / 拦截 / 加日志（代理节点高亮）→
 *   ⑤ Hook 再转调原始 Target（也可不转、完全拦截）：令牌从代理滑到原始目标。
 *
 * 每步点亮「当前活跃元素」：节点步（①④）淡入对应节点高亮层；流向步（②③⑤）让一个
 * 「调用令牌」小圆点沿该步有向边滑过 + 边描边变亮，直观看清调用先直达、被换字段后改道
 * 经中间人再到目标。安装步还把上方直达边淡灭、点亮下方改道边，强调「引用被掉包」。
 *
 * 时序照 MvcDataFlowDiagram / BroadcastDispatchDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出（最后一步 forward 停在亮态，
 * 表示已转调到原始目标、闭环完成），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：调用方=--accent、Hook 代理=--warning、原始目标=--success，全部 DESIGN token 配色
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）；几何常量具名且为 4 的倍数。
 */

// —— 画布与节点几何（全部 4 的倍数）。 ——
const VIEW_W = 680;
const VIEW_H = 360;

const NODE_W = 168;
const NODE_H = 72;

// 主链横排锚点：调用方（左）→ Hook 代理（中、下沉成「改道中转」）→ 原始目标（右）。
const CALLER = { x: 24, y: 64 };
const TARGET = { x: 488, y: 64 };
const HOOK = { x: 256, y: 224 };

// —— 节点定义（color 为该节点点亮时的语义色 token）。 ——
type Node = {
  id: string;
  title: string;
  /** 副标题（这个节点是什么 / 在干嘛）。 */
  sub: string;
  x: number;
  y: number;
  color: string;
};

const NODES: readonly Node[] = [
  {
    id: "caller",
    title: "调用方 Caller",
    sub: "ams.startActivity(…)",
    x: CALLER.x,
    y: CALLER.y,
    color: "var(--accent)",
  },
  {
    id: "target",
    title: "原始目标 Target",
    sub: "真实 IActivityManager",
    x: TARGET.x,
    y: TARGET.y,
    color: "var(--success)",
  },
  {
    id: "hook",
    title: "Hook 代理",
    sub: "InvocationHandler 中间人",
    x: HOOK.x,
    y: HOOK.y,
    color: "var(--warning)",
  },
];

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "direct",
    caption:
      "① 正常调用（无 Hook）：调用方直接打到原始目标，走原始流程——这是被 Hook 之前的样子",
  },
  {
    label: "install",
    caption:
      "② 安装 Hook：用反射 / 动态代理把「持有 Target 的字段」（常是系统单例 / 静态字段，如 AMS 的 IActivityManager 实例）替换成 Hook 代理——直达路径失效，调用改道经中间人",
  },
  {
    label: "intercept",
    caption:
      "③ 再次调用：调用方拿到的已是被掉包的引用，实际打到 Hook 代理（调用被中间人截获）",
  },
  {
    label: "custom",
    caption:
      "④ Hook 执行自定义逻辑：改参数 / 监控 / 拦截 / 加日志——横切关注点在这里织入",
  },
  {
    label: "forward",
    caption:
      "⑤ Hook 再转调原始 Target（也可不转、完全拦截）：method.invoke(realTarget, args) 还原真实行为",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 节点中心 / 锚点（连线端点用）。
function center(n: Node) {
  return { cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 };
}
const C_CALLER = center(NODES[0]);
const C_TARGET = center(NODES[1]);
const C_HOOK = center(NODES[2]);

const EDGE_GAP = 4; // 端点离节点边框的留白（4 的倍数）

// —— 有向边（流向步用）。每条 = 一条主线 + 一个沿线滑动的「调用令牌」。 ——
type Edge = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

const EDGES: Record<string, Edge> = {
  // ① 直达边：调用方 → 原始目标（上方横线，Hook 前的原始流程）。
  direct: {
    id: "direct",
    x1: CALLER.x + NODE_W + EDGE_GAP,
    y1: C_CALLER.cy,
    x2: TARGET.x - EDGE_GAP,
    y2: C_TARGET.cy,
    color: "var(--accent)",
  },
  // ③ 截获边：调用方 → Hook 代理（向下改道，调用被中间人接住）。
  intercept: {
    id: "intercept",
    x1: C_CALLER.cx,
    y1: CALLER.y + NODE_H + EDGE_GAP,
    x2: HOOK.x + EDGE_GAP,
    y2: C_HOOK.cy,
    color: "var(--accent)",
  },
  // ⑤ 转调边：Hook 代理 → 原始目标（中间人再把调用还给真身）。
  forward: {
    id: "forward",
    x1: HOOK.x + NODE_W - EDGE_GAP,
    y1: C_HOOK.cy,
    x2: C_TARGET.cx,
    y2: TARGET.y + NODE_H + EDGE_GAP,
    color: "var(--success)",
  },
};

// 步 → 它点亮的节点 id（节点步）。流向步不在此表。
const STEP_NODE: Record<string, string> = {
  direct: "target",
  custom: "hook",
};

// 步 → 它驱动的流向边 id（流向步）。节点步不在此表。
const STEP_EDGE: Record<string, string> = {
  intercept: "intercept",
  forward: "forward",
};

export function HookMechanismDiagram() {
  // 节点高亮层 + 边描边 + 调用令牌的 DOM 引用，喂给 anime.js 时间线驱动。
  const nodeHi = useRef<Record<string, SVGRectElement | null>>({});
  const edgeHi = useRef<Record<string, SVGLineElement | null>>({});
  const tokenHi = useRef<Record<string, SVGCircleElement | null>>({});
  // 直达边「底线」引用：安装 Hook 后把它淡灭，强调原始路径被掐断。
  const directBaseRef = useRef<SVGLineElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全呈现时刻 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

        if (step.label === "install") {
          // —— 安装步：反射 / 动态代理掉包字段——直达边淡灭、改道边底色亮起（路径被改写）——
          if (directBaseRef.current) {
            tl.add(
              directBaseRef.current,
              {
                opacity: [0.45, 0.12],
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          }
          // 直达高亮线（若刚在 ① 亮过）一并淡回，避免残留。
          const directHi = edgeHi.current.direct;
          if (directHi) {
            tl.add(
              directHi,
              { opacity: [1, 0.2], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
              start,
            );
          }
          tl.label(step.label, lit);
          return; // forEach 回调：跳过本步剩余分支（等价于循环 continue）。
        }

        const nodeId = STEP_NODE[step.label];
        const edgeId = STEP_EDGE[step.label];

        if (nodeId) {
          // —— 节点步：淡入该节点高亮层（点亮当前活跃节点）。 ——
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
        } else if (edgeId) {
          // —— 流向步：边描边淡亮 + 调用令牌从起点滑到终点（看清调用流向）。 ——
          const edge = edgeHi.current[edgeId];
          const token = tokenHi.current[edgeId];
          const e = EDGES[edgeId];
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
          // 流向步呈现完后把描边淡回（除最后一步）；令牌淡出已含在其关键帧里。
          if (edge && !isLast) {
            tl.add(
              edge,
              { opacity: [1, 0.2], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
              lit,
            );
          }
        } else {
          tl.label(step.label, lit);
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
          aria-label="Hook 拦截原理。左上是「调用方 Caller」（例如调用 ams.startActivity），右上是「原始目标 Target」（真实的 IActivityManager 系统对象），中下是「Hook 代理」（一个 InvocationHandler 中间人）。整个过程分五步：① 正常调用，在被 Hook 之前，调用方令牌沿上方直达边直接打到原始目标，走原始流程；② 安装 Hook，用反射或动态代理（Proxy.newProxyInstance）把持有 Target 的那个字段替换成 Hook 代理，被替换的常是系统单例或静态字段，例如 AMS 的 IActivityManager 实例，于是上方直达路径变灰失效、下方改道路径亮起；③ 再次调用时，调用方拿到的已经是被掉包的引用，调用实际打到 Hook 代理，调用被中间人截获；④ Hook 代理执行自定义逻辑，可以改参数、做监控、拦截、加日志，横切关注点在这里织入；⑤ Hook 再用 method.invoke 把调用转调回原始 Target 还原真实行为，也可以选择完全不转、彻底拦截。动态代理 Proxy.newProxyInstance 和反射替换字段是 Hook 的两大手法。播放时按此顺序依次点亮当前活跃节点，或让调用令牌沿有向边先直达、被掉包后改道经中间人再到目标，可播放、暂停、单步、拖动进度逐帧观察一次调用是如何被劫持的。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          <defs>
            <marker
              id="hook-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="hook-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* —— 有向边（常驻低对比底线 + anime.js 点亮的高亮线 + 调用令牌）—— */}
          {Object.values(EDGES).map((e) => {
            const isSuccess = e.color === "var(--success)";
            const marker = isSuccess
              ? "url(#hook-arrow-success)"
              : "url(#hook-arrow-accent)";
            const isDirect = e.id === "direct";
            return (
              <g key={e.id}>
                {/* 底线（常驻、低对比；直达边的底线会在安装步被淡灭） */}
                <line
                  ref={
                    isDirect
                      ? (el) => {
                          directBaseRef.current = el;
                        }
                      : undefined
                  }
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.4"
                  markerEnd={marker}
                  strokeDasharray={isDirect ? "6 4" : undefined}
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
                {/* 调用令牌（默认隐形，该步沿线滑过） */}
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
              {/* 标题 */}
              <text
                x={n.x + NODE_W / 2}
                y={n.y + NODE_H / 2 - 4}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={n.color}
              >
                {n.title}
              </text>
              {/* 副标题 */}
              <text
                x={n.x + NODE_W / 2}
                y={n.y + NODE_H / 2 + 16}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                {n.sub}
              </text>
            </g>
          ))}

          {/* —— 两大手法标注（钉在 Hook 代理节点下方，点出反射 + 动态代理）—— */}
          <text
            x={HOOK.x + NODE_W / 2}
            y={HOOK.y + NODE_H + 24}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--warning)"
          >
            两大手法：Proxy.newProxyInstance（动态代理） + 反射替换字段
          </text>

          {/* —— 直达边旁标注：① 正常调用（Hook 前）—— */}
          <text
            x={(EDGES.direct.x1 + EDGES.direct.x2) / 2}
            y={EDGES.direct.y1 - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ① 正常调用（Hook 前 · 直达）
          </text>

          {/* —— 截获边旁标注：③ 调用被中间人截获 —— */}
          <text
            x={(EDGES.intercept.x1 + EDGES.intercept.x2) / 2 - 12}
            y={(EDGES.intercept.y1 + EDGES.intercept.y2) / 2}
            textAnchor="end"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ③ 截获
          </text>

          {/* —— 转调边旁标注：⑤ Hook 转调原始目标 —— */}
          <text
            x={(EDGES.forward.x1 + EDGES.forward.x2) / 2 + 12}
            y={(EDGES.forward.y1 + EDGES.forward.y2) / 2}
            textAnchor="start"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            ⑤ 转调
          </text>

          {/* —— 安装步入口标注：② 反射 / 动态代理掉包字段 —— */}
          <text
            x={C_CALLER.cx}
            y={CALLER.y + NODE_H + 28}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ② 安装后引用被掉包 ▾
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次调用如何从「直达原始目标」被 Hook 改写成「先经中间人代理、再转调真身」；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Hook 拦截原理：① 无 Hook 时调用直达原始目标 → ② 用反射 / 动态代理把持有 Target 的
        字段（常是系统单例 / 静态字段）替换成 Hook 代理 → ③ 再次调用被中间人截获 →
        ④ Hook 执行自定义逻辑（改参 / 监控 / 拦截 / 日志）→ ⑤ 再转调原始 Target（或完全拦截）。
      </figcaption>
    </figure>
  );
}
