"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AwakeVsStartDiagram>：Awake 与 Start 跨对象执行顺序的对照教学动画（HEL-281）。
 *
 * 三个对象（演员 A / B / C）同时进场，演示一条关键时序规律：
 *  **所有对象的 Awake 先全部跑完，之后才轮到各自的 Start。**
 * 顺序是：Awake A → Awake B → Awake C → Start A → Start B → Start C。
 *
 * 由此引出用法红线：Awake 里别去引用「别的对象」——那时别人可能还没 Awake 完、
 * 甚至引用还没建好；跨对象引用要放到 Start，因为进 Start 时全场 Awake 都已结束。
 *
 * 布局：左侧三行 = 三个对象；中间「全部 Awake 阶段」「全部 Start 阶段」两栏，
 * 每个对象在每栏各有一个回调格子，按时序逐个点亮。
 *
 * 分 6 步（每步点亮一个格子）：
 *  ①②③ 三个对象的 Awake 依次点亮（第一阶段：全场创建即初始化）。
 *  ④⑤⑥ 三个对象的 Start 依次点亮（第二阶段：此时全场 Awake 已完，可放心跨对象引用）。
 * 进入第 ④ 步（第一个 Start）时，「跨对象引用放 Start」的提示条一并出现。
 *
 * 时间线 = 一条 anime.js timeline（6 个 beat）。每步点亮一格；label 锚定
 * lit = BEAT*(i+1)，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6）。
 *
 * 视觉：全部 DESIGN token，无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 700;
const VIEW_H = 380;

// 三个对象行。
const OBJECTS: readonly { id: string; label: string }[] = [
  { id: "a", label: "对象 A" },
  { id: "b", label: "对象 B" },
  { id: "c", label: "对象 C" },
];

// 几何：左标签列 + 两栏（Awake 栏 / Start 栏）。
const LABEL_X = 40; // 对象标签列 x
const COL0_X = 150; // Awake 栏左 x
const COL1_X = 420; // Start 栏左 x
const COL_W = 230; // 每栏宽
const CELL_W = 150; // 单个回调格子宽
const CELL_H = 40; // 单个回调格子高
const ROW_TOP = 118; // 首行格子顶 y
const ROW_GAP = 60; // 行间距

// 格子中心。栏内格子水平居中。
const cellX = (colX: number) => colX + (COL_W - CELL_W) / 2;
const cellY = (i: number) => ROW_TOP + i * ROW_GAP;

// 6 步时序：先三个 Awake，后三个 Start。每个 step 的 label = "phase-obj"。
const STEPS: readonly TeachingStep[] = [
  {
    label: "awake-a",
    caption: "① 对象 A 创建 → 调它的 Awake（做自身初始化）",
  },
  {
    label: "awake-b",
    caption:
      "② 对象 B 创建 → 调它的 Awake——注意：A 已 Awake 完，但还没轮到任何 Start",
  },
  {
    label: "awake-c",
    caption: "③ 对象 C 也 Awake 完。第一阶段结束：全场对象的 Awake 都跑完了",
  },
  {
    label: "start-a",
    caption:
      "④ 现在才进第二阶段：调 A 的 Start——此时 B、C 都已 Awake 好，A 可放心引用它们",
  },
  {
    label: "start-b",
    caption: "⑤ 调 B 的 Start——同理，全场早已 Awake 完，跨对象引用都安全",
  },
  {
    label: "start-c",
    caption:
      "⑥ 调 C 的 Start。规律：所有 Awake 先跑完，才轮到所有 Start——跨对象引用放 Start",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function AwakeVsStartDiagram() {
  const cellRefs = useRef<Record<string, SVGGElement | null>>({});
  const hintRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const el = cellRefs.current[step.label];
        if (el) {
          tl.add(
            el,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            start,
          );
        }
        // 第 ④ 步（第一个 Start，i===3）点亮时，提示条一并出现。
        if (step.label === "start-a" && hintRef.current) {
          tl.add(
            hintRef.current,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
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
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Awake 与 Start 跨对象执行顺序对照动画。左侧三行分别是对象 A、对象 B、对象 C。中间分两栏：左栏是全部 Awake 阶段，右栏是全部 Start 阶段。动画分六步：先依次点亮 A、B、C 三个对象的 Awake，表示所有对象的 Awake 都先跑完；之后才依次点亮 A、B、C 三个对象的 Start。关键规律是所有对象的 Awake 先全部执行完，才轮到任何对象的 Start。因此在 Awake 里不要引用别的对象，因为那时别人可能还没 Awake 完；跨对象的引用要放到 Start 里，因为进 Start 时全场 Awake 都已结束。动画可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            多个对象一起进场：先全部 Awake，再全部 Start
          </text>

          {/* ===== 两栏阶段标题 + 背景 ===== */}
          <g>
            <rect
              x={COL0_X}
              y={ROW_TOP - 36}
              width={COL_W}
              height={ROW_GAP * OBJECTS.length + 24}
              rx="10"
              fill="var(--accent)"
              fillOpacity="0.05"
              stroke="var(--accent)"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />
            <text
              x={COL0_X + COL_W / 2}
              y={ROW_TOP - 16}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="700"
              fill="var(--accent)"
            >
              第一阶段 · 全部 Awake
            </text>
            <rect
              x={COL1_X}
              y={ROW_TOP - 36}
              width={COL_W}
              height={ROW_GAP * OBJECTS.length + 24}
              rx="10"
              fill="var(--success)"
              fillOpacity="0.05"
              stroke="var(--success)"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />
            <text
              x={COL1_X + COL_W / 2}
              y={ROW_TOP - 16}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="700"
              fill="var(--success)"
            >
              第二阶段 · 全部 Start
            </text>
          </g>

          {/* ===== 阶段之间的「时间分界」箭头 ===== */}
          <line
            x1={COL0_X + COL_W + 4}
            y1={ROW_TOP + (ROW_GAP * OBJECTS.length) / 2 - 12}
            x2={COL1_X - 4}
            y2={ROW_TOP + (ROW_GAP * OBJECTS.length) / 2 - 12}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#avs-arrow)"
          />
          <text
            x={(COL0_X + COL_W + COL1_X) / 2}
            y={ROW_TOP + (ROW_GAP * OBJECTS.length) / 2 - 20}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            全场 Awake 都完了
          </text>

          {/* ===== 三个对象行：标签 + 两个回调格子 ===== */}
          {OBJECTS.map((obj, i) => {
            const y = cellY(i);
            return (
              <g key={obj.id}>
                {/* 对象标签 */}
                <text
                  x={LABEL_X}
                  y={y + CELL_H / 2 + 4}
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {obj.label}
                </text>

                {/* Awake 格子 */}
                <g
                  ref={(el) => {
                    cellRefs.current[`awake-${obj.id}`] = el;
                  }}
                  opacity="0"
                >
                  <rect
                    x={cellX(COL0_X)}
                    y={y}
                    width={CELL_W}
                    height={CELL_H}
                    rx="8"
                    fill="var(--accent)"
                    fillOpacity="0.18"
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                  />
                  <text
                    x={cellX(COL0_X) + CELL_W / 2}
                    y={y + CELL_H / 2 + 4}
                    textAnchor="middle"
                    fontSize="12.5"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    fill="var(--text-primary)"
                  >
                    {obj.label.slice(-1)}.Awake()
                  </text>
                </g>

                {/* Start 格子 */}
                <g
                  ref={(el) => {
                    cellRefs.current[`start-${obj.id}`] = el;
                  }}
                  opacity="0"
                >
                  <rect
                    x={cellX(COL1_X)}
                    y={y}
                    width={CELL_W}
                    height={CELL_H}
                    rx="8"
                    fill="var(--success)"
                    fillOpacity="0.18"
                    stroke="var(--success)"
                    strokeWidth="1.6"
                  />
                  <text
                    x={cellX(COL1_X) + CELL_W / 2}
                    y={y + CELL_H / 2 + 4}
                    textAnchor="middle"
                    fontSize="12.5"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    fill="var(--text-primary)"
                  >
                    {obj.label.slice(-1)}.Start()
                  </text>
                </g>
              </g>
            );
          })}

          {/* ===== 提示条（进第一个 Start 时出现）===== */}
          <g ref={hintRef} opacity="0">
            <rect
              x={COL0_X}
              y={VIEW_H - 46}
              width={COL1_X + COL_W - COL0_X}
              height="30"
              rx="7"
              fill="var(--warning)"
              fillOpacity="0.12"
              stroke="var(--warning)"
              strokeWidth="1.4"
            />
            <text
              x={(COL0_X + COL1_X + COL_W) / 2}
              y={VIEW_H - 27}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="var(--warning)"
            >
              要点：跨对象的引用放 Start——Awake 里别人可能还没初始化好
            </text>
          </g>

          <defs>
            <marker
              id="avs-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
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
          caption="猜一猜：A 的 Awake 里去拿 B 身上的组件，拿得到吗？单步看完两个阶段再判断。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 先把全场所有对象的 Awake 跑完，才开始跑各自的 Start。所以 Awake
        里只做「自己的」初始化；要用到别的对象，放进 Start 才稳妥。
      </figcaption>
    </figure>
  );
}
