"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ThreadLifecycleDiagram>：std::thread 生命周期状态机的「可控教学动画」（HEL-230，§5 主 Demo）。
 *
 * 餐厅后厨隐喻：std::thread = 喊来一个帮厨。一旦 `std::thread t(f)` 创建，线程处于
 * joinable（「这个帮厨还没安顿好」）状态，主厨必须三选一：
 *  - ① t.join()  → 主厨停下来等帮厨做完会合 → 结束（not joinable）
 *  - ② t.detach() → 放帮厨自己后台独立干，主厨不等 → 分离·后台跑（not joinable）
 *  - ③ 既不 join 也不 detach → t 析构时还 joinable → std::terminate 💥 程序崩
 *
 * 时间线 = 一条 anime.js timeline：先点亮根节点「创建[joinable]」（步 0），
 * 再依次点亮三条分支：join 分支两节点（步 1、2）、detach 分支两节点（步 3、4）、
 * 忘了管分支两节点（步 5、6）。每条分支的边与节点一起点亮。
 * 每个 step 的 label 锚定在「对应节点点亮到最亮」的时刻（lit = BEAT*(i+1)），
 * 与 ActivityLifecycleDiagram 同款写法，修正 label 落在淡入起点的 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部动态 import 切独立 chunk（硬规则 2/6），本组件再经 mdx-components 注册时
 * next/dynamic(ssr:false) 懒加载，不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

type LifeNode = {
  /** anime.js timeline label = 关键帧锚点（与 STEPS 对应）。 */
  id: string;
  /** 节点主标题（状态 / 调用）。 */
  title: string;
  /** 副标题：joinable 状态或人话说明。 */
  sub: string;
  x: number;
  y: number;
  /** 高亮色 token 变量名（点亮时描边 + 文字用此色）。 */
  color: string;
};

const NODE_W = 188;
const NODE_H = 56;

// —— 布局：根节点居左中，三条分支向右展开为上 / 中 / 下三行 ——
const ROOT_X = 16;
const ROOT_Y = 184;
const COL2_X = 256; // 三分支第一级节点列
const COL3_X = 488; // 三分支第二级（终态）节点列
const ROW_TOP_Y = 24; // join 分支行
const ROW_MID_Y = 184; // detach 分支行（与根同高）
const ROW_BOT_Y = 344; // 忘了管分支行

const NODES: readonly LifeNode[] = [
  {
    id: "create",
    title: "std::thread t(f)",
    sub: "创建 → joinable（帮厨待安顿）",
    x: ROOT_X,
    y: ROOT_Y,
    color: "var(--accent)",
  },
  // ① join 分支
  {
    id: "join-call",
    title: "t.join()",
    sub: "主厨停下来等帮厨做完",
    x: COL2_X,
    y: ROW_TOP_Y,
    color: "var(--success)",
  },
  {
    id: "join-done",
    title: "结束",
    sub: "not joinable（已会合）",
    x: COL3_X,
    y: ROW_TOP_Y,
    color: "var(--success)",
  },
  // ② detach 分支
  {
    id: "detach-call",
    title: "t.detach()",
    sub: "放帮厨自己干，主厨不等",
    x: COL2_X,
    y: ROW_MID_Y,
    color: "var(--accent)",
  },
  {
    id: "detach-bg",
    title: "分离 · 后台独立跑",
    sub: "not joinable（已放养）",
    x: COL3_X,
    y: ROW_MID_Y,
    color: "var(--accent)",
  },
  // ③ 忘了管分支
  {
    id: "neither",
    title: "既不 join 也不 detach",
    sub: "t 析构时仍 joinable",
    x: COL2_X,
    y: ROW_BOT_Y,
    color: "var(--warning)",
  },
  {
    id: "terminate",
    title: "std::terminate 💥",
    sub: "程序直接崩溃",
    x: COL3_X,
    y: ROW_BOT_Y,
    color: "var(--danger)",
  },
];

// 节点 id → 索引，方便取坐标连边。
const NODE_BY_ID: Record<string, LifeNode> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

// 边：从根分叉到三支，再各自走向终态。点亮序与 STEPS 对齐（边在「目标节点点亮」那拍一起亮）。
type Edge = { from: string; to: string; color: string; danger?: boolean };
const EDGES: readonly Edge[] = [
  { from: "create", to: "join-call", color: "var(--success)" },
  { from: "join-call", to: "join-done", color: "var(--success)" },
  { from: "create", to: "detach-call", color: "var(--accent)" },
  { from: "detach-call", to: "detach-bg", color: "var(--accent)" },
  { from: "create", to: "neither", color: "var(--warning)" },
  { from: "neither", to: "terminate", color: "var(--danger)", danger: true },
];
// 每个 step（1..6）对应点亮的目标节点 = 该 step 同时点亮指向它的那条边。
const EDGE_OF_STEP: Record<string, Edge> = {
  "join-call": EDGES[0],
  "join-done": EDGES[1],
  "detach-call": EDGES[2],
  "detach-bg": EDGES[3],
  neither: EDGES[4],
  terminate: EDGES[5],
};

const STEPS: readonly TeachingStep[] = [
  {
    label: "create",
    caption:
      "std::thread t(f) 创建：新线程立刻开跑，t 处于 joinable——帮厨还没安顿",
  },
  {
    label: "join-call",
    caption: "① t.join()：主线程停下来等子线程跑完——主厨等帮厨做完会合",
  },
  {
    label: "join-done",
    caption: "① 子线程结束，t 变 not joinable——两人会合，干净收场",
  },
  {
    label: "detach-call",
    caption: "② t.detach()：放子线程自己后台独立跑，主线程不等——主厨放养帮厨",
  },
  {
    label: "detach-bg",
    caption: "② 子线程后台独立延续，t 也变 not joinable——已脱钩，谁也不等谁",
  },
  {
    label: "neither",
    caption: "③ 既不 join 也不 detach：t 析构时还 joinable——帮厨没安顿就散场",
  },
  {
    label: "terminate",
    caption: "③ std::thread 析构调用 std::terminate💥——整个程序当场崩溃",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const VIEW_W = 692;
const VIEW_H = 424;

/** 计算从 from 节点右缘中点到 to 节点的连线端点（同行走右缘→左缘，分叉走右缘→上/下缘中）。 */
function edgePath(e: Edge): string {
  const a = NODE_BY_ID[e.from];
  const b = NODE_BY_ID[e.to];
  const ax = a.x + NODE_W;
  const ay = a.y + NODE_H / 2;
  if (a.y === b.y) {
    // 同行：直接横连到目标左缘。
    return `M ${ax} ${ay} L ${b.x} ${b.y + NODE_H / 2}`;
  }
  // 分叉：从根右缘出发，贝塞尔绕到目标左缘中点（上下行）。
  const bx = b.x;
  const by = b.y + NODE_H / 2;
  const midX = (ax + bx) / 2;
  return `M ${ax} ${ay} C ${midX} ${ay}, ${midX} ${by}, ${bx} ${by}`;
}

export function ThreadLifecycleDiagram() {
  // 节点高亮层 + 边的 DOM 引用，喂给 anime.js 时间线驱动。
  const nodeRefs = useRef<Record<string, SVGRectElement | null>>({});
  const edgeRefs = useRef<Record<string, SVGPathElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const el = nodeRefs.current[step.label];
        // 节点 i 在 [BEAT*i, BEAT*(i+1)] 淡入，lit = 完全点亮时刻 = label 锚点。
        const lit = TEACHING_BEAT_MS * (i + 1);
        if (el) {
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
        }
        // 与该节点同拍点亮指向它的边（根节点无入边）。
        const edge = EDGE_OF_STEP[step.label];
        if (edge) {
          const edgeEl = edgeRefs.current[`${edge.from}->${edge.to}`];
          if (edgeEl) {
            tl.add(
              edgeEl,
              {
                opacity: [0.15, 1],
                duration: TEACHING_BEAT_MS,
                ease: "out(2)",
              },
              TEACHING_BEAT_MS * i,
            );
          }
        }
        tl.label(step.label, lit);
      });
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
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
          aria-label="std::thread 生命周期状态机。最左侧根节点「std::thread t(f) 创建」表示线程刚创建，处于 joinable 状态。从根节点分出三条分支：第一条（上）t.join()，主线程停下来等子线程跑完，到达「结束 not joinable」干净收场；第二条（中）t.detach()，把子线程放到后台独立运行、主线程不等，到达「分离·后台独立跑 not joinable」；第三条（下）既不 join 也不 detach，t 析构时仍 joinable，导致 std::terminate 程序直接崩溃。播放时先点亮根节点，再依次点亮三条分支的节点与连线，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[692px]"
        >
          <defs>
            <marker
              id="tld-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 边：底层常驻低对比；高亮层（anime.js 点亮）—— */}
          {EDGES.map((e) => {
            const d = edgePath(e);
            return (
              <g key={`edge-${e.from}->${e.to}`}>
                <path
                  d={d}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                  opacity="0.5"
                />
                <path
                  ref={(el) => {
                    edgeRefs.current[`${e.from}->${e.to}`] = el;
                  }}
                  d={d}
                  fill="none"
                  stroke={e.color}
                  strokeWidth="2"
                  strokeDasharray={e.danger ? "6 4" : undefined}
                  markerEnd="url(#tld-arrow)"
                  opacity="0.15"
                />
              </g>
            );
          })}

          {/* —— 节点：底框 + 高亮层（anime.js 驱动）+ 文字 —— */}
          {NODES.map((n) => (
            <g key={n.id}>
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
              <rect
                ref={(el) => {
                  nodeRefs.current[n.id] = el;
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
              <text
                x={n.x + NODE_W / 2}
                y={n.y + 24}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {n.title}
              </text>
              <text
                x={n.x + NODE_W / 2}
                y={n.y + 42}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {n.sub}
              </text>
            </g>
          ))}

          {/* 分支序号标注：紧贴各分支第一级节点上方 */}
          <text
            x={COL2_X + NODE_W / 2}
            y={ROW_TOP_Y - 6}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--success)"
          >
            ① join：等会合
          </text>
          <text
            x={COL2_X + NODE_W / 2}
            y={ROW_MID_Y - 6}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--accent)"
          >
            ② detach：放养
          </text>
          <text
            x={COL2_X + NODE_W / 2}
            y={ROW_BOT_Y - 6}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--danger)"
          >
            ③ 忘了管：崩溃
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="线程一创建就 joinable，主厨必须三选一：join 等会合、detach 放养、或忘了管直接崩。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        std::thread 的命运三选一：join（等它结束）、detach（放它后台独立跑），
        二者必居其一；两样都没做，线程对象析构时就调用 std::terminate
        把整个程序掐掉。
      </figcaption>
    </figure>
  );
}
