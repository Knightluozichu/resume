"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <TaskDecompositionTree>：一个大目标逐层拆成任务树并点亮的旗舰「可控教学动画」
 * （HEL-302，《规划与任务分解 Planning》篇2·4，知识点 1/2）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。本章小特接了个大活——「办一场去上海的三天旅行」，
 * 不能想哪做哪，得先把大目标拆成有序的子任务、排成一棵任务树：
 *   根（大目标）：办一场去上海的三天旅行
 *     ├─ ① 订往返高铁票        （叶子：能直接动手做）
 *     ├─ ② 订酒店              （叶子：能直接动手做）
 *     └─ ③ 排三天行程          （还能再拆 ↓）
 *           ├─ Day1 景点        （叶子）
 *           ├─ Day2 景点        （叶子）
 *           └─ Day3 返程        （叶子）
 *
 * anime 逐层 / 逐节点点亮：根 → 一级子任务 → 二级子任务，每步把对应节点（及其入边）
 * 从淡显 0.2 提到 1。所有节点**首帧不是全空**——基底 opacity≈0.2 淡显（读者一眼看出整棵树的
 * 形状，照 ReActTraceDiagram / MemoryArchitectureDiagram 范式，HEL-292 教训）。时序铁律
 * 照同篇旗舰图：步 i 占 [BEAT*i, BEAT*(i+1)]，tl.label(name, BEAT*(i+1)) 落在「该层点亮
 * 完成」时刻，杜绝 off-by-one。
 *
 * 几何守 HEL-274/296/299：树状布局根在上、子节点在下分叉；**单层节点 x 用单一公式**
 * layerX(i, n) = MARGIN_X + (i + 0.5) * (innerW / n)（禁两套算法）；连线父 → 子；叶子节点
 * 标「可直接执行」。顶部 caption y ≥ 20、所有 text 距 viewBox 边 ≥16px；rect 距边 ≥14px；
 * 字号 ≥10px；不套整圈容器大框；利用率 ≥55%。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6）；本文件再用 next/dynamic
 * (ssr:false) 把叶子组件包成动态边界懒加载，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token（accent 根 / 一级子任务、success 叶子可直接执行、warning「还能再拆」
 * 的中间节点），无裸 hex；时长走 TEACHING_BEAT_MS 具名常量。
 */

// —— 画布几何（viewBox 0 0 700 460；单层节点 x 用单一公式；距边 ≥16px）。 ——
const VIEW_W = 700;
const VIEW_H = 460;
const MARGIN_X = 28; // 内容区左右内边距（节点中心据此居中分布）
const INNER_W = VIEW_W - 2 * MARGIN_X; // 可用横向宽度

const NODE_W = 150; // 节点盒宽
const NODE_H = 44; // 节点盒高

// 三层的纵向中心 y（单一 y 公式：每层一行）。
const LAYER_CY = [70, 196, 330] as const;

/**
 * 单一 x 公式：第 layer 层第 i 个（共 n 个）节点的**中心 x**。
 * 同层所有节点共用这一个公式，禁止双算法（SVG 图质量硬规则）。
 */
function layerX(i: number, n: number): number {
  return MARGIN_X + ((i + 0.5) * INNER_W) / n;
}

const ROOT = "var(--accent)"; // 根（大目标）
const SUB = "var(--accent)"; // 一级子任务
const BRANCH = "var(--warning)"; // 中间节点（还能再拆）
const LEAF = "var(--success)"; // 叶子（可直接执行）

type TreeNode = {
  /** anime.js timeline 锚点用的 id。 */
  id: string;
  /** 第几层（0 根 / 1 一级 / 2 二级）。 */
  layer: number;
  /** 在本层中的下标。 */
  index: number;
  /** 本层节点总数（喂给单一 x 公式）。 */
  count: number;
  /** 节点文字。 */
  label: string;
  /** 节点色 token。 */
  color: string;
  /** 是否叶子（标「可直接执行」）。 */
  leaf: boolean;
  /** 父节点 id（根为 null）；用来画入边。 */
  parent: string | null;
  /** 点亮节奏属于哪一步（0 根 / 1 一级 / 2 二级）。 */
  step: number;
};

const NODES: readonly TreeNode[] = [
  // —— 第 0 层：根（大目标）——
  {
    id: "root",
    layer: 0,
    index: 0,
    count: 1,
    label: "办一场去上海的三天旅行",
    color: ROOT,
    leaf: false,
    parent: null,
    step: 0,
  },
  // —— 第 1 层：3 个一级子任务 ——
  {
    id: "sub-ticket",
    layer: 1,
    index: 0,
    count: 3,
    label: "① 订往返高铁票",
    color: SUB,
    leaf: true,
    parent: "root",
    step: 1,
  },
  {
    id: "sub-hotel",
    layer: 1,
    index: 1,
    count: 3,
    label: "② 订酒店",
    color: SUB,
    leaf: true,
    parent: "root",
    step: 1,
  },
  {
    id: "sub-itinerary",
    layer: 1,
    index: 2,
    count: 3,
    label: "③ 排三天行程",
    color: BRANCH,
    leaf: false,
    parent: "root",
    step: 1,
  },
  // —— 第 2 层：「排三天行程」再拆成 3 个叶子 ——
  {
    id: "leaf-day1",
    layer: 2,
    index: 0,
    count: 3,
    label: "Day1 景点",
    color: LEAF,
    leaf: true,
    parent: "sub-itinerary",
    step: 2,
  },
  {
    id: "leaf-day2",
    layer: 2,
    index: 1,
    count: 3,
    label: "Day2 景点",
    color: LEAF,
    leaf: true,
    parent: "sub-itinerary",
    step: 2,
  },
  {
    id: "leaf-day3",
    layer: 2,
    index: 2,
    count: 3,
    label: "Day3 返程",
    color: LEAF,
    leaf: true,
    parent: "sub-itinerary",
    step: 2,
  },
];

/** 节点中心坐标（单一公式驱动）。 */
function nodeCenter(n: TreeNode): { cx: number; cy: number } {
  return { cx: layerX(n.index, n.count), cy: LAYER_CY[n.layer] };
}

const NODE_BY_ID: Record<string, TreeNode> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

// —— 关键帧步骤（逐层点亮）。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "root",
    caption:
      "① 根 = 大目标：小特接了个大活——「办一场去上海的三天旅行」。这事一步做不完，不能想哪做哪，得先把它摊开拆解",
  },
  {
    label: "level1",
    caption:
      "② 拆成一级子任务：把大目标拆成 3 件有序的事——订往返高铁票 → 订酒店 → 排三天行程。每件都比原来的大活小、好下手",
  },
  {
    label: "level2",
    caption:
      "③ 还能再拆：「排三天行程」还是太粗，继续拆成 Day1 景点 / Day2 景点 / Day3 返程——拆到每个都是「能直接动手做」的叶子为止",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// step 序号 → label（用于按 step 把节点归到对应关键帧）。
const STEP_LABEL = ["root", "level1", "level2"] as const;

function TaskDecompositionTreeInner() {
  // 每个节点组 + 每条入边的 DOM 引用，喂给 anime.js 驱动。
  const nodeG = useRef<Record<string, SVGGElement | null>>({});
  const edgeRef = useRef<Record<string, SVGPathElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEP_LABEL.forEach((label, stepIdx) => {
        // 步 i 占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 该层点亮完成 = label 锚点。
        const start = TEACHING_BEAT_MS * stepIdx;
        const lit = TEACHING_BEAT_MS * (stepIdx + 1);

        // 本步要点亮的所有节点（及其入边）一起从 0.2 提到 1。
        NODES.filter((n) => n.step === stepIdx).forEach((n) => {
          const g = nodeG.current[n.id];
          if (g) {
            tl.add(
              g,
              {
                opacity: [0.2, 1],
                translateY: [-8, 0],
                duration: TEACHING_BEAT_MS,
                ease: "out(3)",
              },
              start,
            );
          }
          const edge = n.parent ? edgeRef.current[n.id] : null;
          if (edge) {
            tl.add(
              edge,
              {
                opacity: [0.18, 1],
                duration: TEACHING_BEAT_MS,
                ease: "out(2)",
              },
              start,
            );
          }
        });

        tl.label(label, lit);
      });
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签 */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="任务分解树演示：私人助理小特接了个大活——办一场去上海的三天旅行。这事一步做不完，得先拆成一棵任务树。最上面是根，也就是大目标办一场去上海的三天旅行。第一层把大目标拆成三个有序的一级子任务：订往返高铁票、订酒店、排三天行程。前两个是能直接动手做的叶子。第三个排三天行程还是太粗，第二层继续把它拆成三个叶子：Day1 景点、Day2 景点、Day3 返程。拆到每个都是能直接动手做的叶子为止。播放时自上而下逐层点亮节点和连线，从根到一级子任务再到二级子任务，可播放、暂停、单步、拖动进度逐帧观察一个大目标怎么被拆成有序的子任务树。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* —— 顶部标题行（左对齐，y=28 让 11px 文字 bbox 顶 ≥16px，HEL-296/299）—— */}
          <text
            x={MARGIN_X}
            y={28}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            大活拆成任务树：根（大目标）→ 子任务 → 再拆，直到「能直接动手做」↓
          </text>

          {/* —— 入边（父 → 子），先画在节点底下；默认淡显 0.18 —— */}
          {NODES.filter((n) => n.parent).map((n) => {
            const parent = NODE_BY_ID[n.parent!];
            const p = nodeCenter(parent);
            const c = nodeCenter(n);
            // 从父盒底边中点到子盒顶边中点，走一条竖直的贝塞尔弯。
            const y1 = p.cy + NODE_H / 2;
            const y2 = c.cy - NODE_H / 2;
            const midY = (y1 + y2) / 2;
            const d = `M ${p.cx} ${y1} C ${p.cx} ${midY}, ${c.cx} ${midY}, ${c.cx} ${y2}`;
            return (
              <path
                key={`edge-${n.id}`}
                ref={(el) => {
                  edgeRef.current[n.id] = el;
                }}
                d={d}
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
                opacity="0.18"
              />
            );
          })}

          {/* —— 节点（逐层点亮；首帧淡显 0.2 非全空）—— */}
          {NODES.map((n) => {
            const { cx, cy } = nodeCenter(n);
            const x = cx - NODE_W / 2;
            const y = cy - NODE_H / 2;
            const isRoot = n.layer === 0;
            return (
              <g
                key={n.id}
                ref={(el) => {
                  nodeG.current[n.id] = el;
                }}
                opacity="0.2"
              >
                {/* 节点盒 */}
                <rect
                  x={x}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={isRoot ? "var(--accent-glow)" : "var(--bg)"}
                  stroke={n.color}
                  strokeWidth={isRoot ? "2.2" : "1.8"}
                />
                {/* 节点文字（居中） */}
                <text
                  x={cx}
                  y={n.leaf ? cy - 1 : cy + 4}
                  textAnchor="middle"
                  fontSize={isRoot ? "12.5" : "11.5"}
                  fontWeight={isRoot ? 700 : 600}
                  fill={isRoot ? "var(--accent)" : "var(--text-primary)"}
                >
                  {n.label}
                </text>
                {/* 叶子标「可直接执行」（绿色小字，盒内底部） */}
                {n.leaf && (
                  <text
                    x={cx}
                    y={cy + 14}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill="var(--success)"
                  >
                    可直接执行
                  </text>
                )}
              </g>
            );
          })}

          {/* —— 图例（左下，字号 ≥10px，距底边 ≥16px）—— */}
          <circle cx={MARGIN_X + 6} cy={VIEW_H - 50} r="5" fill={BRANCH} />
          <text
            x={MARGIN_X + 16}
            y={VIEW_H - 46}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            黄框 = 还能再拆的中间节点
          </text>
          <circle cx={MARGIN_X + 196} cy={VIEW_H - 50} r="5" fill={LEAF} />
          <text
            x={MARGIN_X + 206}
            y={VIEW_H - 46}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            绿框 = 叶子，能直接动手做
          </text>

          {/* 底部一句话点题（左对齐，距底边/左右边 ≥16px） */}
          <text
            x={MARGIN_X}
            y={VIEW_H - 22}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            拆解 =
            把一个大目标拆成有序的子任务、子任务再拆，直到每个叶子都能直接动手做
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看大目标怎么被拆开：根（大目标）→ 拆成一级子任务 → 太粗的再拆成叶子；可暂停、单步、拖进度逐帧观察这棵任务树长出来。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        任务分解树：一个大目标逐层拆成有序的子任务，拆到每个叶子都「能直接动手做」为止——这就是小特办大活前要先做的事。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：把 anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，确保 anime.js 这条
 * 重交互链路绝不进首屏 / 公共 layout（硬规则 2/6）。导出名供 mdx-components 注册。
 */
const TaskDecompositionTreeDynamic = dynamic(
  () => Promise.resolve(TaskDecompositionTreeInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">任务分解树动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function TaskDecompositionTree() {
  return <TaskDecompositionTreeDynamic />;
}
