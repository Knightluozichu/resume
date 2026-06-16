"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ReduceTreeDiagram>：accumulate 线性链 vs reduce 树形归约「可控教学动画」（HEL-239，§3 引出 / §5 辅 Demo）。
 *
 * 左半区「accumulate（严格顺序）」：4 个数 a b c d 顺着一条链一个一个加——
 *   ((((0+a)+b)+c)+d)，第 i 步必须等第 i-1 步算完，无法并行（4 步串行）。
 * 右半区「reduce（树形归约）」：先两两并行求和 (a+b) 与 (c+d) 同时算（第一层），
 *   再把两个部分和合并 ((a+b)+(c+d))（第二层）——可重排、可并行（2 层即得结果）。
 *
 * 餐厅后厨隐喻：accumulate = 累加一摞账，必须从头一张张顺着加；
 * reduce = 可以分组并行求和、再合并——但要求加法可任意结合 / 换序。
 *
 * 强调：reduce 要求操作可结合 / 可交换才能这么重排，否则结果错（如减法 a-b-c-d
 * 重排成 (a-b)-(c-d) 结果不同）。末尾一帧打出这个警示。
 *
 * 时间线 = 一条 anime.js timeline，左右两区分别按层点亮。每个 step 的 label 锚定在
 * 「该步节点点亮到最亮」的时刻（lit），与 MutexSerializeDiagram 同款写法。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 动态 import
 * 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册不进首屏。
 *
 * 视觉全部 DESIGN token（accent / success / warning / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS（硬规则 5）。几何：每个 <text> 距 viewBox 边 ≥14px，左右两区
 * 节点框互不重叠，无叠字。
 */

const VIEW_W = 660;
const VIEW_H = 392;

const LIN_COLOR = "var(--warning)"; // accumulate 线性（橙：必须顺序）
const TREE_COLOR = "var(--success)"; // reduce 树形（绿：可并行）
const NODE_W = 60;
const NODE_H = 38;

// 左半区（accumulate 线性链）：竖直一条链，5 个节点从 0 起逐个加。
const LIN_CX = 132; // 链的中心 x
const LIN_TOP = 96;
const LIN_STEP = 56; // 节点纵向间距
const LIN_LABELS = ["0", "0+a", "+b", "+c", "+d = 和"];

// 右半区（reduce 树形）：底层 4 个叶（a b c d），中层 2 个部分和，顶层 1 个总和。
// 4 叶等距铺在右区：leafX(3)+NODE_W = 356+3*74+60 = 638，距右缘 660 还有 22px。
const TREE_BASE_X = 356; // 右区左缘（紧靠中缝分隔线 x=340 之右）
const LEAF_GAP = 14;
const LEAF_Y = 280;
const MID_Y = 184;
const TOP_Y = 96;
// 4 个叶子的 x（等距铺在右区）。
const leafX = (i: number) => TREE_BASE_X + i * (NODE_W + LEAF_GAP);
const LEAF_LABELS = ["a", "b", "c", "d"];
// 中层两节点：各在相邻两叶中间。
const midX = (i: number) =>
  (leafX(i * 2) + leafX(i * 2 + 1) + NODE_W) / 2 - NODE_W / 2;
// 顶层节点：两中层节点中间。
const topX = (midX(0) + midX(1)) / 2;

const STEPS: readonly TeachingStep[] = [
  {
    label: "lin",
    caption:
      "accumulate：从 0 起，必须 +a → +b → +c → +d 一个一个顺着加（4 步串行，第 i 步等第 i-1 步）",
  },
  {
    label: "tree-1",
    caption: "reduce 第一层：(a+b) 与 (c+d) 同时算——两组并行求和，互不依赖",
  },
  {
    label: "tree-2",
    caption:
      "reduce 第二层：把两个部分和合并 (a+b)+(c+d)——2 层就得结果，可并行",
  },
  {
    label: "warn",
    caption:
      "前提：操作必须可结合 / 可交换！减法 a-b-c-d 重排成 (a-b)-(c-d) 结果就错了",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function ReduceTreeDiagram() {
  const linRefs = useRef<Record<number, SVGRectElement | null>>({});
  const midRefs = useRef<Record<number, SVGRectElement | null>>({});
  const topRef = useRef<SVGRectElement | null>(null);
  const warnRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // —— 第一段（lin）：线性链 5 节点逐个点亮，占 4 beat（0 起、+a +b +c +d）——
      for (let i = 0; i < LIN_LABELS.length; i++) {
        const el = linRefs.current[i];
        if (!el) continue;
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * i,
        );
      }
      tl.label("lin", TEACHING_BEAT_MS * LIN_LABELS.length);

      // —— 第二段（tree-1）：右区中层两节点同时点亮（并行第一层）——
      const t1 = TEACHING_BEAT_MS * (LIN_LABELS.length + 1);
      for (let i = 0; i < 2; i++) {
        const el = midRefs.current[i];
        if (!el) continue;
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          t1,
        );
      }
      tl.label("tree-1", t1 + TEACHING_BEAT_MS);

      // —— 第三段（tree-2）：顶层节点点亮（合并第二层）——
      const t2 = t1 + TEACHING_BEAT_MS * 2;
      if (topRef.current) {
        tl.add(
          topRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          t2,
        );
      }
      tl.label("tree-2", t2 + TEACHING_BEAT_MS);

      // —— 第四段（warn）：可结合 / 可交换警示带淡入 ——
      const t3 = t2 + TEACHING_BEAT_MS * 2;
      if (warnRef.current) {
        tl.add(
          warnRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          t3,
        );
      }
      tl.label("warn", t3 + TEACHING_BEAT_MS);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="accumulate 线性链与 reduce 树形归约的对照动画。左半区 accumulate（严格顺序）：从 0 起，沿一条竖直链一个接一个地加 a、b、c、d，每一步必须等上一步算完，共 4 步严格串行，无法并行。右半区 reduce（树形归约）：底层四个数 a、b、c、d，第一层先把 a 加 b、c 加 d 两组同时并行求和，第二层再把两个部分和合并得到总和，只需两层、可并行。末尾打出警示：reduce 这样重排的前提是操作必须可结合、可交换，否则结果会错，例如减法 a 减 b 减 c 减 d 重排成 (a-b)-(c-d) 结果就不同。可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* ===== 左区标题 ===== */}
          <text x="16" y="28" fontSize="13" fontWeight="700" fill={LIN_COLOR}>
            accumulate：严格顺序
          </text>
          <text x="16" y="48" fontSize="10" fill="var(--text-secondary)">
            一张张顺着加，第 i 步等第 i-1 步——不能并行
          </text>

          {/* ===== 右区标题 ===== */}
          <text
            x={TREE_BASE_X - 8}
            y="28"
            fontSize="13"
            fontWeight="700"
            fill={TREE_COLOR}
          >
            reduce：树形归约
          </text>
          <text
            x={TREE_BASE_X - 8}
            y="48"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            两两并行求和、再合并——可重排、可并行
          </text>

          {/* 中缝分隔线 */}
          <line
            x1="340"
            y1="64"
            x2="340"
            y2={VIEW_H - 64}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== 左区：线性链（先画连线，后画节点）===== */}
          {LIN_LABELS.map((_, i) =>
            i < LIN_LABELS.length - 1 ? (
              <line
                key={`lin-edge-${i}`}
                x1={LIN_CX}
                y1={LIN_TOP + i * LIN_STEP + NODE_H}
                x2={LIN_CX}
                y2={LIN_TOP + (i + 1) * LIN_STEP}
                stroke={LIN_COLOR}
                strokeWidth="1.6"
                strokeOpacity="0.6"
                markerEnd="url(#rtd-arrow-lin)"
              />
            ) : null,
          )}
          {LIN_LABELS.map((lbl, i) => {
            const y = LIN_TOP + i * LIN_STEP;
            return (
              <g key={`lin-${i}`}>
                <rect
                  x={LIN_CX - NODE_W / 2}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="6"
                  fill={LIN_COLOR}
                  fillOpacity="0.07"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <rect
                  ref={(el) => {
                    linRefs.current[i] = el;
                  }}
                  x={LIN_CX - NODE_W / 2}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="6"
                  fill={LIN_COLOR}
                  fillOpacity="0.3"
                  stroke={LIN_COLOR}
                  strokeWidth="1.8"
                  opacity="0"
                />
                <text
                  x={LIN_CX}
                  y={y + NODE_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {lbl}
                </text>
              </g>
            );
          })}

          {/* ===== 右区：树形（先画连线，后画节点）===== */}
          {/* 叶 → 中层 连线 */}
          {[0, 1].map((m) => (
            <g key={`tree-edge-mid-${m}`}>
              <line
                x1={leafX(m * 2) + NODE_W / 2}
                y1={LEAF_Y}
                x2={midX(m) + NODE_W / 2}
                y2={MID_Y + NODE_H}
                stroke={TREE_COLOR}
                strokeWidth="1.4"
                strokeOpacity="0.6"
              />
              <line
                x1={leafX(m * 2 + 1) + NODE_W / 2}
                y1={LEAF_Y}
                x2={midX(m) + NODE_W / 2}
                y2={MID_Y + NODE_H}
                stroke={TREE_COLOR}
                strokeWidth="1.4"
                strokeOpacity="0.6"
              />
            </g>
          ))}
          {/* 中层 → 顶层 连线 */}
          {[0, 1].map((m) => (
            <line
              key={`tree-edge-top-${m}`}
              x1={midX(m) + NODE_W / 2}
              y1={MID_Y}
              x2={topX + NODE_W / 2}
              y2={TOP_Y + NODE_H}
              stroke={TREE_COLOR}
              strokeWidth="1.4"
              strokeOpacity="0.6"
            />
          ))}

          {/* 叶节点（常驻，输入数据） */}
          {LEAF_LABELS.map((lbl, i) => (
            <g key={`leaf-${i}`}>
              <rect
                x={leafX(i)}
                y={LEAF_Y}
                width={NODE_W}
                height={NODE_H}
                rx="6"
                fill={TREE_COLOR}
                fillOpacity="0.14"
                stroke={TREE_COLOR}
                strokeWidth="1.4"
              />
              <text
                x={leafX(i) + NODE_W / 2}
                y={LEAF_Y + NODE_H / 2 + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {lbl}
              </text>
            </g>
          ))}

          {/* 中层两节点（第一层并行点亮） */}
          {[0, 1].map((m) => (
            <g key={`mid-${m}`}>
              <rect
                x={midX(m)}
                y={MID_Y}
                width={NODE_W}
                height={NODE_H}
                rx="6"
                fill={TREE_COLOR}
                fillOpacity="0.07"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <rect
                ref={(el) => {
                  midRefs.current[m] = el;
                }}
                x={midX(m)}
                y={MID_Y}
                width={NODE_W}
                height={NODE_H}
                rx="6"
                fill={TREE_COLOR}
                fillOpacity="0.3"
                stroke={TREE_COLOR}
                strokeWidth="1.8"
                opacity="0"
              />
              <text
                x={midX(m) + NODE_W / 2}
                y={MID_Y + NODE_H / 2 + 4}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {m === 0 ? "a+b" : "c+d"}
              </text>
            </g>
          ))}

          {/* 顶层节点（第二层合并点亮） */}
          <g>
            <rect
              x={topX}
              y={TOP_Y}
              width={NODE_W}
              height={NODE_H}
              rx="6"
              fill={TREE_COLOR}
              fillOpacity="0.07"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <rect
              ref={topRef}
              x={topX}
              y={TOP_Y}
              width={NODE_W}
              height={NODE_H}
              rx="6"
              fill={TREE_COLOR}
              fillOpacity="0.34"
              stroke={TREE_COLOR}
              strokeWidth="1.8"
              opacity="0"
            />
            <text
              x={topX + NODE_W / 2}
              y={TOP_Y + NODE_H / 2 + 4}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              和
            </text>
          </g>
          {/* 第一层 / 第二层 行标注：放在节点行之间的空白带（右缘内侧、不压任何节点框） */}
          {/* 第二层标注落在 顶层(96-134) 与 中层(184-222) 之间的空带 y≈162 */}
          <text
            x={VIEW_W - 16}
            y={(TOP_Y + NODE_H + MID_Y) / 2 + 4}
            textAnchor="end"
            fontSize="9.5"
            fill={TREE_COLOR}
          >
            第二层：合并 ↑
          </text>
          {/* 第一层标注落在 中层(184-222) 与 叶(280-318) 之间的空带 y≈250 */}
          <text
            x={VIEW_W - 16}
            y={(MID_Y + NODE_H + LEAF_Y) / 2 + 4}
            textAnchor="end"
            fontSize="9.5"
            fill={TREE_COLOR}
          >
            第一层：并行 ↑
          </text>

          {/* ===== 警示带（最后一帧淡入）===== */}
          <g ref={warnRef} style={{ opacity: 0 }}>
            <rect
              x="16"
              y={VIEW_H - 48}
              width={VIEW_W - 32}
              height="32"
              rx="6"
              fill="var(--warning)"
              fillOpacity="0.14"
              stroke="var(--warning)"
              strokeWidth="1.4"
            />
            <text
              x={VIEW_W / 2}
              y={VIEW_H - 28}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              ⚠ reduce 重排的前提：操作可结合 / 可交换；减法 a−b−c−d 重排即错
            </text>
          </g>

          <defs>
            <marker
              id="rtd-arrow-lin"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={LIN_COLOR} />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="左：accumulate 一个一个顺着加（4 步串行）。右：reduce 先两两并行求和、再合并（2 层）。reduce 能这么重排的前提是操作可结合 / 可交换。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        accumulate 像顺着一摞账一张张加，必须从头到尾顺序来；reduce
        像把账分组并行求和、再合并——快得多，但前提是加法可任意结合、换序（减法这类就不行）。
      </figcaption>
    </figure>
  );
}
