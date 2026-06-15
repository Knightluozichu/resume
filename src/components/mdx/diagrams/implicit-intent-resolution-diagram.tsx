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
 * <ImplicitIntentResolutionDiagram>：《Android 编程权威指南》intent-data/implicit-intents 章
 * 「隐式 Intent 解析过程」配图（HEL-184）。
 *
 * 「可控教学动画」：随时间线走完一次隐式 Intent 的解析全过程——看清「你只描述想做什么」
 * 如何被系统翻译成「谁能帮你做」：
 *   ① App 发出隐式 Intent（action=ACTION_VIEW + data=https 网址 + category=DEFAULT），
 *      Intent 卡片亮起 → ② 系统 PackageManager 拿这个 Intent 去逐个匹配各 App 在 Manifest
 *      里声明的 intent-filter（action / category / data 三要素都要命中）→ ③ 匹配出多个候选
 *      App（浏览器 A / 浏览器 B）一起高亮 → ④ 弹出 Chooser 让用户选（若唯一匹配则直接启动）。
 *
 * 每步点亮「当前活跃元素」：节点步（①②④）淡入对应节点高亮层；连线步（流向步）让一段
 * 「Intent 令牌」小圆点沿当前有向边滑过 + 边描边变亮，直观看清 Intent 从 App 流向系统、
 * 再由系统流向候选 App。
 *
 * 时序照 GradleBuildPipelineDiagram / MvcDataFlowDiagram：步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出
 * （最后一步 chooser 停在亮态，表示选择器已弹出、等用户拍板），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：App=--accent、系统=--warning、候选 App=--success，全部 DESIGN token 配色无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）；几何常量具名且为 4 的倍数。
 */

// —— 画布与节点几何（全部 4 的倍数）。 ——
const VIEW_W = 640;
const VIEW_H = 360;

const NODE_W = 160;
const NODE_H = 64;
const CAND_W = 140;
const CAND_H = 48;
const CAND_GAP = 24; // 两个候选 App 的纵向间隙

// 主链横排锚点：App（左）→ 系统（中）→ 候选区（右上两块）→ Chooser（右下）。
const APP = { x: 24, y: 148 };
const SYS = { x: 240, y: 148 };
const CAND_A = { x: 476, y: 88 };
const CAND_B = { x: 476, y: 88 + CAND_H + CAND_GAP };
const CHOOSER = { x: 240, y: 280 };

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
    id: "app",
    title: "你的 App",
    sub: "startActivity(intent)",
    x: APP.x,
    y: APP.y,
    w: NODE_W,
    h: NODE_H,
    color: "var(--accent)",
  },
  {
    id: "system",
    title: "系统 PackageManager",
    sub: "匹配 intent-filter",
    x: SYS.x,
    y: SYS.y,
    w: NODE_W,
    h: NODE_H,
    color: "var(--warning)",
  },
  {
    id: "candA",
    title: "浏览器 A",
    sub: "intent-filter ✓",
    x: CAND_A.x,
    y: CAND_A.y,
    w: CAND_W,
    h: CAND_H,
    color: "var(--success)",
  },
  {
    id: "candB",
    title: "浏览器 B",
    sub: "intent-filter ✓",
    x: CAND_B.x,
    y: CAND_B.y,
    w: CAND_W,
    h: CAND_H,
    color: "var(--success)",
  },
  {
    id: "chooser",
    title: "Chooser 选择器",
    sub: "让用户选一个",
    x: CHOOSER.x,
    y: CHOOSER.y,
    w: NODE_W,
    h: NODE_H,
    color: "var(--accent)",
  },
];

const NODE_BY_ID: Record<string, Node> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
// 4 步知识点 + 中间穿插的「流向步」（让 Intent 令牌在节点间滑动），共同串成完整解析过程。
const STEPS: readonly TeachingStep[] = [
  {
    label: "emit",
    caption: "① App 发出隐式 Intent：action=ACTION_VIEW + data=https网址 + category=DEFAULT",
  },
  {
    label: "to-system",
    caption: "Intent 投递给系统——你只说「要做什么」，不指定具体由谁来做",
  },
  {
    label: "match",
    caption: "② 系统 PackageManager 拿 Intent 逐个匹配各 App 的 intent-filter（action/category/data 三要素都要命中）",
  },
  {
    label: "to-candidates",
    caption: "系统把 Intent 分发给所有命中的候选 App",
  },
  {
    label: "candidates",
    caption: "③ 匹配出多个候选 App（浏览器 A、浏览器 B 都声明了能处理）",
  },
  {
    label: "chooser",
    caption: "④ 弹出 Chooser 让用户选其一（若唯一匹配则直接启动那个 App）",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 节点中心锚点（连线端点用）。
function center(n: Node) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 };
}
const C_APP = center(NODES[0]);
const C_SYS = center(NODES[1]);
const C_CA = center(NODES[2]);
const C_CB = center(NODES[3]);

// —— 有向边（流向步用）。每条 = 一条常驻底线 + 一段沿线滑动的「Intent 令牌」。 ——
type Edge = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

const EDGE_GAP = 4; // 端点离节点边框的留白（4 的倍数）

const EDGES: Record<string, Edge> = {
  // App → 系统（横向）
  "to-system": {
    id: "to-system",
    x1: NODES[0].x + NODES[0].w + EDGE_GAP,
    y1: C_APP.cy,
    x2: NODES[1].x - EDGE_GAP,
    y2: C_SYS.cy,
    color: "var(--accent)",
  },
};

// 流向步「to-candidates」需把令牌同时送向两个候选，单独管理两条分叉边。
const FANOUT: readonly Edge[] = [
  {
    id: "fan-a",
    x1: NODES[1].x + NODES[1].w + EDGE_GAP,
    y1: C_SYS.cy,
    x2: NODES[2].x - EDGE_GAP,
    y2: C_CA.cy,
    color: "var(--success)",
  },
  {
    id: "fan-b",
    x1: NODES[1].x + NODES[1].w + EDGE_GAP,
    y1: C_SYS.cy,
    x2: NODES[3].x - EDGE_GAP,
    y2: C_CB.cy,
    color: "var(--success)",
  },
];

// 候选 → Chooser 的常驻汇聚底线（结果收束到选择器，仅静态示意，不参与令牌动画）。
const COLLECT: readonly { x1: number; y1: number; x2: number; y2: number }[] = [
  {
    x1: C_CA.cx,
    y1: NODES[2].y + NODES[2].h + EDGE_GAP,
    x2: NODE_BY_ID.chooser.x + NODE_BY_ID.chooser.w,
    y2: NODE_BY_ID.chooser.y,
  },
  {
    x1: C_CB.cx,
    y1: NODES[3].y + NODES[3].h + EDGE_GAP,
    x2: NODE_BY_ID.chooser.x + NODE_BY_ID.chooser.w,
    y2: NODE_BY_ID.chooser.y + EDGE_GAP * 3,
  },
];

// 步 → 它点亮的节点 id（节点步）。流向步不在此表。
const STEP_NODE: Record<string, string> = {
  emit: "app",
  match: "system",
  chooser: "chooser",
};

// 节点步里同时点亮的额外节点（candidates 步要同时点亮两个候选）。
const STEP_NODES_MULTI: Record<string, readonly string[]> = {
  candidates: ["candA", "candB"],
};

export function ImplicitIntentResolutionDiagram() {
  // 节点高亮层 + 单边描边 + 单边令牌 + 分叉边描边 / 令牌 的 DOM 引用，喂给 anime.js 驱动。
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

        const singleNode = STEP_NODE[step.label];
        const multiNodes = STEP_NODES_MULTI[step.label];

        if (singleNode || multiNodes) {
          // —— 节点步：淡入一个或多个节点高亮层 ——
          const ids = multiNodes ?? [singleNode as string];
          ids.forEach((id) => {
            const el = nodeHi.current[id];
            if (!el) return;
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
          });
          tl.label(step.label, lit);
        } else if (step.label === "to-candidates") {
          // —— 分叉流向步：令牌从系统同时流向两个候选 ——
          FANOUT.forEach((e) => {
            const edge = edgeHi.current[e.id];
            const token = tokenHi.current[e.id];
            if (edge) {
              tl.add(
                edge,
                { opacity: [0.2, 1], duration: TEACHING_BEAT_MS * 0.5, ease: "out(2)" },
                start,
              );
            }
            if (token) {
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
            if (edge && !isLast) {
              tl.add(
                edge,
                { opacity: [1, 0.2], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
                lit,
              );
            }
          });
          tl.label(step.label, lit);
        } else {
          // —— 单边流向步（to-system）：令牌从 App 滑到系统 ——
          const e = EDGES[step.label];
          const edge = edgeHi.current[step.label];
          const token = tokenHi.current[step.label];
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
          if (edge && !isLast) {
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

  // 渲染用：单边 + 分叉边合并成一个可遍历的有向边列表（常驻底线 + 高亮线 + 令牌）。
  const animatedEdges: readonly Edge[] = [EDGES["to-system"], ...FANOUT];

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
          aria-label="隐式 Intent 解析过程。左侧是「你的 App」（调用 startActivity），中间是「系统 PackageManager」（负责匹配 intent-filter），右上是两个候选 App（浏览器 A、浏览器 B，都在 Manifest 里声明了能处理该 Intent），右下是 Chooser 选择器。解析分四步：① App 发出隐式 Intent，只描述 action=ACTION_VIEW、data=https 网址、category=DEFAULT 三要素，不指定具体由谁处理；② 系统 PackageManager 拿这个 Intent 去逐个匹配各 App 声明的 intent-filter，要求 action、category、data 三要素都命中；③ 匹配出多个候选 App，浏览器 A 与浏览器 B 一起高亮；④ 弹出 Chooser 选择器让用户选其一，若只有唯一匹配则直接启动那个 App。播放时按此顺序依次点亮当前活跃节点，或让 Intent 令牌沿当前有向边从 App 流向系统、再由系统分叉流向候选 App，可播放、暂停、单步、拖动进度逐帧观察隐式 Intent 是如何被系统解析并分发的。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <defs>
            <marker
              id="iir-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="iir-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker
              id="iir-arrow-muted"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 候选 → Chooser 的常驻汇聚底线（结果收束到选择器，静态示意）—— */}
          {COLLECT.map((c, i) => (
            <line
              key={`collect-${i}`}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
              markerEnd="url(#iir-arrow-muted)"
              opacity="0.4"
            />
          ))}

          {/* —— 动态有向边（常驻低对比底线 + anime.js 点亮的高亮线 + Intent 令牌）—— */}
          {animatedEdges.map((e) => {
            const isSuccess = e.color === "var(--success)";
            const marker = isSuccess
              ? "url(#iir-arrow-success)"
              : "url(#iir-arrow-accent)";
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
                {/* Intent 令牌（默认隐形，该步沿线滑过） */}
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
          {NODES.map((n) => {
            const isCand = n.id === "candA" || n.id === "candB";
            const titleSize = isCand ? 12.8 : 14;
            return (
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
                  fontSize={titleSize}
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
            );
          })}

          {/* —— Intent 三要素卡片（钉在 App 上方，强调「只描述要做什么」）—— */}
          <g>
            <rect
              x={APP.x}
              y={APP.y - 92}
              width={NODE_W}
              height={76}
              rx="8"
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <text
              x={APP.x + 12}
              y={APP.y - 72}
              fontSize="10"
              fontWeight="700"
              fill="var(--accent)"
            >
              隐式 Intent
            </text>
            <text
              x={APP.x + 12}
              y={APP.y - 56}
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              action = ACTION_VIEW
            </text>
            <text
              x={APP.x + 12}
              y={APP.y - 42}
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              data = https://...
            </text>
            <text
              x={APP.x + 12}
              y={APP.y - 28}
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              category = DEFAULT
            </text>
          </g>

          {/* —— 系统匹配处的「三要素都要命中」提示（钉在系统节点上方）—— */}
          <text
            x={SYS.x + NODE_W / 2}
            y={SYS.y - 12}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--warning)"
          >
            action ∧ category ∧ data 全命中
          </text>

          {/* —— 步骤序号标注（小而稳，常驻，帮读者把动画与第几步对齐）—— */}
          <text
            x={APP.x + NODE_W / 2}
            y={APP.y + NODE_H + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ① 发出
          </text>
          <text
            x={SYS.x + NODE_W / 2}
            y={SYS.y + NODE_H + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            ② 匹配
          </text>
          <text
            x={CAND_A.x + CAND_W / 2}
            y={CAND_A.y - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            ③ 候选
          </text>
          <text
            x={CHOOSER.x + NODE_W / 2}
            y={CHOOSER.y + NODE_H + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ④ 选择器
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次隐式 Intent 如何从 App 发出、经系统匹配 intent-filter、分发给候选 App、最后弹出选择器；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        隐式 Intent 解析过程：App 只描述「要做什么」（action + data + category）→ 系统
        PackageManager 拿它去匹配各 App 的 intent-filter（三要素全命中）→ 列出候选 App →
        弹 Chooser 让用户选（唯一匹配则直接启动）。
      </figcaption>
    </figure>
  );
}
