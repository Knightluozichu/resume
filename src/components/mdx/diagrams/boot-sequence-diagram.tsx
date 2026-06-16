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
 * <BootSequenceDiagram>：《Android 进阶解密》system-boot/system-startup 章「开机启动时序」
 * 动画配图（HEL-216）。
 *
 * 与本章已有的静态 <AndroidStartupSequenceDiagram>（聚焦 init→Zygote→SystemServer→Launcher
 * 四步）错开：本图把视角放到**更底层、更完整**的 7 阶段全链路，并用「可控教学动画」让每个
 * 阶段像引信点火 / 接力一样依次点亮，看清从按下电源到看见桌面的完整接力：
 *   ① 上电 Boot ROM → ② Bootloader → ③ Linux Kernel → ④ init 进程(pid=1) →
 *   ⑤ Zygote(孵化器) → ⑥ SystemServer(AMS/WMS/PMS) → ⑦ Launcher(桌面，开机完成)
 *
 * 每步既点亮当前阶段卡片（高亮 + 该阶段关键产物/职责标注），又让一枚「启动令牌」沿阶段间
 * 箭头滑过，直观呈现「上一棒交给下一棒」的接力感。
 *
 * 时序照 GradleBuildPipelineDiagram / ImplicitIntentResolutionDiagram：阶段 i 的点亮占
 * [BEAT*i, BEAT*(i+1)]，label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出；末步
 * Launcher 停在亮态（表示桌面已出现、开机完成），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：固件阶段=--warning、内核/系统进程=--accent、终点 Launcher=--success，全部 DESIGN
 * token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量；几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 启动阶段定义（两行各 4 / 3 块横排，蛇形接力）。color 为该阶段点亮时的语义色 token。 ——
type Stage = {
  /** anime.js timeline label = 关键帧锚点（与 STEPS 对应）。 */
  id: string;
  /** 阶段主标题（这一棒是谁）。 */
  title: string;
  /** 阶段副标题（这一棒的关键产物 / 职责）。 */
  sub: string;
  /** 高亮色 token 变量名。 */
  color: string;
};

const STAGES: readonly Stage[] = [
  { id: "bootrom", title: "上电 Boot ROM", sub: "芯片固化首段代码", color: "var(--warning)" },
  { id: "bootloader", title: "Bootloader", sub: "校验并加载内核", color: "var(--warning)" },
  { id: "kernel", title: "Linux Kernel", sub: "挂载根文件系统 → 启 idle", color: "var(--accent)" },
  { id: "init", title: "init 进程", sub: "pid=1，解析 init.rc，拉守护进程", color: "var(--accent)" },
  { id: "zygote", title: "Zygote", sub: "预加载类与资源，App 进程孵化器", color: "var(--accent)" },
  { id: "systemserver", title: "SystemServer", sub: "Zygote fork，启 AMS/WMS/PMS", color: "var(--accent)" },
  { id: "launcher", title: "Launcher", sub: "桌面启动，开机完成", color: "var(--success)" },
];

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
const STEPS: readonly TeachingStep[] = [
  { label: "bootrom", caption: "① 上电：CPU 执行芯片里固化的 Boot ROM 首段代码，找到并启动 Bootloader" },
  { label: "bootloader", caption: "② Bootloader：初始化硬件、校验内核镜像，再把 Linux 内核加载进内存并跳转执行" },
  { label: "kernel", caption: "③ Linux Kernel：启动内核、挂载根文件系统、创建 idle 进程，随后拉起用户空间第一个进程" },
  { label: "init", caption: "④ init 进程：用户空间第一个进程（pid=1），解析 init.rc 并按序启动各守护进程" },
  { label: "zygote", caption: "⑤ Zygote：预加载常用类与资源，作为所有 App 进程的孵化器，通过 fork 派生子进程" },
  { label: "systemserver", caption: "⑥ SystemServer：由 Zygote fork 出，启动 AMS/WMS/PMS 等核心系统服务" },
  { label: "launcher", caption: "⑦ Launcher：桌面被启动并显示，开机流程到此全部完成" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// —— 布局常量（间距走 4 倍数；两行蛇形排布，阶段间箭头接力）。 ——
const NODE_W = 168;
const NODE_H = 72;
const COL_GAP = 32; // 同行节点横向间隙（留给箭头）
const ROW_GAP = 56; // 两行纵向间隙（留给折返竖箭头）
const X0 = 16;
const TOP = 32;
const COLS = 4; // 第一行 4 块，第二行 3 块（蛇形）
const ROW1_Y = TOP;
const ROW2_Y = TOP + NODE_H + ROW_GAP;
const VIEW_W = X0 * 2 + COLS * NODE_W + (COLS - 1) * COL_GAP;
const VIEW_H = ROW2_Y + NODE_H + 32;

// 每个阶段的左上角坐标（蛇形：第 0 行从左到右 col 0..3，第 1 行从右到左 col 3..1）。
type Placed = Stage & { x: number; y: number };
const PLACED: readonly Placed[] = STAGES.map((s, i) => {
  if (i < COLS) {
    return { ...s, x: X0 + i * (NODE_W + COL_GAP), y: ROW1_Y };
  }
  // 第二行从右往左排（蛇形），i=4 落在 col 3，i=5 col 2，i=6 col 1。
  const colFromRight = i - COLS; // 0,1,2
  const col = COLS - 1 - colFromRight; // 3,2,1
  return { ...s, x: X0 + col * (NODE_W + COL_GAP), y: ROW2_Y };
});

// 节点中心 / 边缘锚点（连线端点用）。
function cx(p: Placed) {
  return p.x + NODE_W / 2;
}
function cy(p: Placed) {
  return p.y + NODE_H / 2;
}

const EDGE_GAP = 4; // 箭头端点离节点边框的留白（4 的倍数）

// —— 阶段间有向边（接力箭头）。每条 = 一条常驻底线 + 一段沿线滑动的「启动令牌」。 ——
// kind 决定端点取法：同行水平相邻 → 右出左入；行 0→1 折返 → 末块底部向下到末块顶部。
type Edge = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  vertical: boolean;
};

const EDGES: readonly Edge[] = STAGES.slice(0, -1).map((_, i) => {
  const from = PLACED[i];
  const to = PLACED[i + 1];
  const sameRow = from.y === to.y;
  if (sameRow) {
    // 同行水平接力：方向取决于该行排布朝向（行 0 向右、行 1 向左）。
    const goingRight = to.x > from.x;
    return {
      id: `edge-${i}`,
      x1: goingRight ? from.x + NODE_W + EDGE_GAP : from.x - EDGE_GAP,
      y1: cy(from),
      x2: goingRight ? to.x - EDGE_GAP : to.x + NODE_W + EDGE_GAP,
      y2: cy(to),
      vertical: false,
    };
  }
  // 折返竖直接力：从上一行该块底部向下到下一行同列块顶部。
  return {
    id: `edge-${i}`,
    x1: cx(from),
    y1: from.y + NODE_H + EDGE_GAP,
    x2: cx(to),
    y2: to.y - EDGE_GAP,
    vertical: true,
  };
});

export function BootSequenceDiagram() {
  // 阶段高亮层 + 接力边描边 + 接力令牌 的 DOM 引用，喂给 anime.js 时间线驱动。
  const stageHi = useRef<Record<string, SVGRectElement | null>>({});
  const edgeHi = useRef<Record<string, SVGLineElement | null>>({});
  const tokenHi = useRef<Record<string, SVGCircleElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const el = stageHi.current[step.label];
        // 阶段 i 点亮占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全点亮时刻 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

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

        // 接力令牌：从当前阶段滑向下一阶段（最后一阶段无后继边，不滑）。
        if (!isLast) {
          const edge = edgeHi.current[`edge-${i}`];
          const token = tokenHi.current[`edge-${i}`];
          const e = EDGES[i];
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
        }

        tl.label(step.label, lit);

        // 离开第 i 步从 lit 起淡出（最后一阶段 Launcher 停在亮态，表示桌面已出现）。
        if (el && !isLast) {
          tl.add(
            el,
            { opacity: [1, 0.18], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
            lit,
          );
          const edge = edgeHi.current[`edge-${i}`];
          if (edge) {
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
          aria-label="Android 开机启动时序，7 个阶段像引信点火一样依次接力点亮：① 上电 Boot ROM（CPU 执行芯片里固化的首段代码，找到并启动 Bootloader）→ ② Bootloader（初始化硬件、校验内核镜像，把 Linux 内核加载进内存并跳转执行）→ ③ Linux Kernel（启动内核、挂载根文件系统、创建 idle 进程，随后拉起用户空间第一个进程）→ ④ init 进程（用户空间第一个进程，pid=1，解析 init.rc 并按序启动各守护进程）→ ⑤ Zygote（预加载常用类与资源，作为所有 App 进程的孵化器，通过 fork 派生子进程）→ ⑥ SystemServer（由 Zygote fork 出，启动 AMS、WMS、PMS 等核心系统服务）→ ⑦ Launcher（桌面被启动并显示，开机流程到此全部完成）。播放时按此顺序依次点亮当前阶段卡片，并让一枚启动令牌沿阶段间箭头滑过，表示上一棒交给下一棒，可播放、暂停、单步、拖动进度逐帧观察从按下电源到看见桌面的完整启动接力。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="boot-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 阶段间接力边（常驻低对比底线 + anime.js 点亮的高亮线 + 启动令牌）—— */}
          {EDGES.map((e) => (
            <g key={e.id}>
              {/* 底线（常驻、低对比） */}
              <line
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="var(--text-secondary)"
                strokeWidth="1.4"
                markerEnd="url(#boot-arrow)"
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
                stroke="var(--accent)"
                strokeWidth="2.4"
                markerEnd="url(#boot-arrow)"
                opacity="0.2"
              />
              {/* 启动令牌（默认隐形，该步沿线滑过，呈现接力感） */}
              <circle
                ref={(el) => {
                  tokenHi.current[e.id] = el;
                }}
                cx={e.x1}
                cy={e.y1}
                r="5"
                fill="var(--accent)"
                opacity="0"
              />
            </g>
          ))}

          {/* —— 阶段节点：底框 + 高亮层（anime.js 驱动）+ 序号 + 文字 —— */}
          {PLACED.map((s, i) => (
            <g key={s.id}>
              {/* 底框（常驻、低对比） */}
              <rect
                x={s.x}
                y={s.y}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.2"
              />
              {/* 高亮层：默认灭，anime.js 点亮时淡入 + 描边变色 */}
              <rect
                ref={(el) => {
                  stageHi.current[s.id] = el;
                }}
                x={s.x}
                y={s.y}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                fill={s.color}
                fillOpacity="0.12"
                stroke={s.color}
                strokeWidth="2"
                opacity="0"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
              {/* 序号徽标 */}
              <text
                x={s.x + 12}
                y={s.y + 18}
                fontSize="10"
                fontWeight="700"
                fill="var(--text-secondary)"
              >
                {`0${i + 1}`}
              </text>
              {/* 主标题 */}
              <text
                x={s.x + NODE_W / 2}
                y={s.y + 36}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={s.color}
              >
                {s.title}
              </text>
              {/* 副标题（关键产物 / 职责） */}
              <text
                x={s.x + NODE_W / 2}
                y={s.y + 56}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                {s.sub}
              </text>
            </g>
          ))}

          {/* 起点 / 终点标注 */}
          <text
            x={PLACED[0].x + NODE_W / 2}
            y={ROW1_Y - 10}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--warning)"
          >
            ▼ 按下电源键
          </text>
          <text
            x={PLACED[STAGES.length - 1].x + NODE_W / 2}
            y={ROW2_Y + NODE_H + 20}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            ▲ 看到桌面
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看开机如何从上电一路接力到桌面；可暂停、单步、拖进度逐帧观察每一棒的产出。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android 开机启动时序：Boot ROM → Bootloader → Linux Kernel → init(pid=1) →
        Zygote → SystemServer → Launcher。每一棒就绪后点火下一棒，直到桌面出现、开机完成。
      </figcaption>
    </figure>
  );
}
