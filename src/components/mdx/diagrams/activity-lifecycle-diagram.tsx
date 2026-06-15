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
 * <ActivityLifecycleDiagram>：Activity 生命周期状态机的「可控教学动画」参考图（HEL-170）。
 *
 * 「可控教学动画原语」的首个落地用例——同时用上 useTeachingTimeline + TimelineControls：
 *  - 画出六大回调状态机：onCreate → onStart → onResume →（Resumed 前台）→ onPause →
 *    onStop → onDestroy，外加 onRestart 回边（Stopped → onStart，切回时重新可见）。
 *  - 时间线随播放依次「点亮」当前所处回调/状态节点（anime.js 改高亮层 opacity + 描边色 +
 *    轻微放大 transform），每个回调打一个 label，可播放 / 暂停 / 单步 / 拖进度。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline 内部
 * 的动态 import("animejs") 切成独立 chunk（硬规则 2/6）；本组件再经 mdx-components 的
 * next/dynamic(ssr:false) 懒加载注册，故 anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色（accent / success / warning / danger / border / text-*），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

// —— 状态机节点定义（坐标 + 文案）。color 一律 CSS 变量 token，运行时由 anime.js 写入描边。 ——
type LifecycleNode = {
  /** anime.js timeline label = 关键帧锚点（与 STEPS 对应）。 */
  id: string;
  /** 回调方法名（节点主标题）。 */
  callback: string;
  /** 该回调进入的状态/典型用途副标题。 */
  sub: string;
  x: number;
  y: number;
  /** 高亮色 token 变量名（点亮时描边 + 文字用此色）。 */
  color: string;
};

const NODE_W = 168;
const NODE_H = 52;

const NODES: readonly LifecycleNode[] = [
  { id: "onCreate", callback: "onCreate()", sub: "创建：加载布局", x: 24, y: 20, color: "var(--accent)" },
  { id: "onStart", callback: "onStart()", sub: "即将可见", x: 24, y: 104, color: "var(--accent)" },
  { id: "onResume", callback: "onResume()", sub: "进入前台", x: 24, y: 188, color: "var(--success)" },
  { id: "onPause", callback: "onPause()", sub: "失去焦点：存状态", x: 24, y: 300, color: "var(--warning)" },
  { id: "onStop", callback: "onStop()", sub: "完全不可见", x: 24, y: 384, color: "var(--warning)" },
  { id: "onDestroy", callback: "onDestroy()", sub: "销毁：最终清理", x: 24, y: 468, color: "var(--danger)" },
];

// 「Resumed = 前台可交互」状态徽标（onResume 之后、onPause 之前的稳定态）。
const RESUMED = { x: 252, y: 188, w: 196, h: NODE_H };

// 关键帧步骤：顺序即时间顺序；caption 给控制条朗读。
const STEPS: readonly TeachingStep[] = [
  { label: "onCreate", caption: "onCreate()：Activity 首次创建，加载布局、初始化变量" },
  { label: "onStart", caption: "onStart()：Activity 即将可见，注册可见期监听" },
  { label: "onResume", caption: "onResume()：进入前台，可与用户交互（Resumed 稳定态）" },
  { label: "onPause", caption: "onPause()：失去焦点，持久化关键数据（最后保证执行）" },
  { label: "onStop", caption: "onStop()：完全不可见，释放重资源" },
  { label: "onDestroy", caption: "onDestroy()：Activity 被销毁，做最终清理" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const VIEW_W = 472;
const VIEW_H = 548;

export function ActivityLifecycleDiagram() {
  // 收集每个节点高亮层的 DOM 引用，喂给 anime.js 时间线驱动。
  const highlightRefs = useRef<Record<string, SVGRectElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const el = highlightRefs.current[step.label];
        if (!el) return;
        // 每个回调一拍：高亮层从「灭」淡入到「亮」并轻微放大，打 label 锚点。
        // 先在该 label 处把上一节点的高亮压回去（用 set），形成「逐个点亮」的接力。
        tl.label(step.label, TEACHING_BEAT_MS * i);
        tl.add(
          el,
          {
            opacity: [0, 1],
            scale: [0.96, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          TEACHING_BEAT_MS * i,
        );
        // 下一拍开始时把当前高亮淡出（除最后一个），保证同一时刻只亮一个。
        if (i < STEPS.length - 1) {
          tl.add(
            el,
            { opacity: [1, 0.18], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
            TEACHING_BEAT_MS * (i + 1),
          );
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
          aria-label="Android Activity 生命周期状态机。从上到下依次为六个回调：onCreate（首次创建，加载布局）→ onStart（即将可见）→ onResume（进入前台，到达 Resumed 可交互稳定态）→ onPause（失去焦点，持久化关键数据）→ onStop（完全不可见，释放重资源）→ onDestroy（被销毁，最终清理）。onStop 有一条 onRestart 回边指向 onStart，表示 Activity 切回前台时重新走 onStart、onResume 而不重建。播放时按此顺序依次点亮当前所处的回调节点，可播放、暂停、单步、拖动进度查看。"
          className="mx-auto block h-auto w-full max-w-[472px]"
        >
          <defs>
            <marker
              id="alc-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="alc-arrow-restart"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 主链连线（onCreate ↓ onStart ↓ onResume ↓ onPause ↓ onStop ↓ onDestroy）—— */}
          {NODES.slice(0, -1).map((n, i) => {
            const next = NODES[i + 1];
            const x = n.x + NODE_W / 2;
            const y1 = n.y + NODE_H;
            const y2 = next.y;
            return (
              <line
                key={`edge-${n.id}`}
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke="var(--text-secondary)"
                strokeWidth="1.4"
                markerEnd="url(#alc-arrow)"
                opacity="0.7"
              />
            );
          })}

          {/* onResume → Resumed 稳定态（横向连线） */}
          <line
            x1={NODES[2].x + NODE_W}
            y1={NODES[2].y + NODE_H / 2}
            x2={RESUMED.x}
            y2={RESUMED.y + RESUMED.h / 2}
            stroke="var(--success)"
            strokeWidth="1.4"
            markerEnd="url(#alc-arrow)"
            opacity="0.7"
          />

          {/* onStop → onStart 的 onRestart 回边（accent 虚线，右侧绕行） */}
          <path
            d={`M ${NODES[4].x + NODE_W} ${NODES[4].y + NODE_H / 2}
                C 312 ${NODES[4].y + NODE_H / 2}, 312 ${NODES[1].y + NODE_H / 2}, ${NODES[1].x + NODE_W} ${NODES[1].y + NODE_H / 2}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeDasharray="5 4"
            markerEnd="url(#alc-arrow-restart)"
            opacity="0.85"
          />
          <text
            x="320"
            y={(NODES[1].y + NODES[4].y) / 2 + NODE_H / 2}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            onRestart()
          </text>
          <text
            x="320"
            y={(NODES[1].y + NODES[4].y) / 2 + NODE_H / 2 + 14}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            切回前台
          </text>

          {/* —— 节点：底框 + 高亮层（anime.js 驱动）+ 文字 —— */}
          {NODES.map((n) => (
            <g key={n.id}>
              {/* 底框（常驻，低对比） */}
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
              {/* 高亮层：默认灭（opacity 0），anime.js 点亮时淡入 + 描边变色 */}
              <rect
                ref={(el) => {
                  highlightRefs.current[n.id] = el;
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
              {/* 回调名 */}
              <text
                x={n.x + 14}
                y={n.y + 22}
                fontSize="13"
                fontWeight="600"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {n.callback}
              </text>
              {/* 副标题 */}
              <text
                x={n.x + 14}
                y={n.y + 39}
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {n.sub}
              </text>
            </g>
          ))}

          {/* —— Resumed 稳定态徽标 —— */}
          <rect
            x={RESUMED.x}
            y={RESUMED.y}
            width={RESUMED.w}
            height={RESUMED.h}
            rx="8"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <text
            x={RESUMED.x + RESUMED.w / 2}
            y={RESUMED.y + 22}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            Resumed（前台）
          </text>
          <text
            x={RESUMED.x + RESUMED.w / 2}
            y={RESUMED.y + 39}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            可与用户交互的稳定态
          </text>

          {/* 入口 / 出口标注 */}
          <text
            x={NODES[0].x + NODE_W / 2}
            y={NODES[0].y - 6}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ▲ 启动入口
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看系统依次调用六个回调；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Activity 生命周期状态机：onCreate → onStart → onResume 进入 Resumed 前台，
        onPause → onStop → onDestroy 退出；从 Stopped 切回前台经 onRestart 重新可见，
        而非重建实例。
      </figcaption>
    </figure>
  );
}
