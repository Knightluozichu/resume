/**
 * <PatternSpectrumDiagram>：模式光谱 / 第四篇路线图（HEL-321，第 11 章）。
 *
 * 一张静态 SVG，一条横向「自主性递增」光谱：从左到右排开本篇要展开的几种模式——
 *   单次调用 → 链式 → 路由 → 并行 → 编排-工作者 → 评估-优化 → 自主 agent，
 * 越往右自主性越高（路径越由 LLM 自己决定），并标出每种模式将在第四篇哪一章展开。
 *
 * 核心一图：本篇不是「agent vs 不 agent」的二选一，而是一道光谱——多数实用系统落在
 * 中间的工作流模式上；自主 agent 只是光谱最右端、最灵活也最贵的那一档。同时充当本篇目录：
 * 链式/路由（Ch12）、并行+编排-工作者（Ch13）、评估-优化（Ch14）。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名、为 4 的倍数（硬规则 5）。
 * 几何自检：节点零重叠、文字中心落自己框内、四周留白 ≥ 14px、字号 ≥ 10px、单一节点 x 公式。
 */

import {
  PatternDiagramViewport,
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
} from "./agentic-pattern-diagram-shell";

// —— 整体画布。 ——
const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 360;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;

// —— 标题区。 ——
const TITLE_Y = 30;

// —— 横向光谱轴（7 个节点等距，单一 x 公式）。 ——
const N = 7;
const AXIS_MARGIN = 50; // 第 0 / 末节点中心距左右边界
const AXIS_Y = 188; // 轴线（与节点中心同高）
/** 第 i 个节点中心 x（单一公式，禁双算法）。 */
const nodeCX = (i: number) => AXIS_MARGIN + (i * (VIEW_W - 2 * AXIS_MARGIN)) / (N - 1);

// —— 节点圆点。 ——
const DOT_R = 12;

// —— 节点名标签（在圆点上方或下方交替，避免相邻挤压）。 ——
const LABEL_UP_DY = -28; // 上方标签相对圆心
const LABEL_DOWN_DY = 34; // 下方标签相对圆心

// —— 章节归属标签（再往外一层）。 ——
const CHAP_UP_DY = -46;
const CHAP_DOWN_DY = 52;

type SpectrumNode = {
  /** 模式名（短）。 */
  name: string;
  /** 第二行模式名（可空，长名换行用）。 */
  name2: string;
  /** 章节归属（如「Ch12」「本篇之后」），空串表示不标。 */
  chapter: string;
  /** 标签放上方（true）还是下方（false），交替防挤。 */
  up: boolean;
  /** 是否高亮（自主 agent 终点）。 */
  highlight: boolean;
};

const NODES: readonly SpectrumNode[] = [
  { name: "单次调用", name2: "", chapter: "", up: true, highlight: false },
  { name: "链式", name2: "", chapter: "Ch12", up: false, highlight: false },
  { name: "路由", name2: "", chapter: "Ch12", up: true, highlight: false },
  { name: "并行", name2: "", chapter: "Ch13", up: false, highlight: false },
  { name: "编排", name2: "-工作者", chapter: "Ch13", up: true, highlight: false },
  { name: "评估", name2: "-优化", chapter: "Ch14", up: false, highlight: false },
  { name: "自主", name2: "agent", chapter: "Ch15+", up: true, highlight: true },
];

const AXIS_LEFT = nodeCX(0);
const AXIS_RIGHT = nodeCX(N - 1);

export function PatternSpectrumDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="智能体模式光谱图，也是第四篇的路线图。一条横向的「自主性递增」光谱，从左到右排开七种模式：单次调用、链式、路由、并行、编排-工作者、评估-优化、自主 agent。越往右，自主性越高，路径越由 LLM 自己决定，但也越灵活越贵越不可预测；越往左越是路径写死的工作流，越可预测越便宜。图上还标出了每种模式将在第四篇哪一章展开：链式和路由在第 12 章，并行和编排-工作者在第 13 章，评估-优化在第 14 章，最右端的自主 agent 在第 15 章及以后。核心结论：本篇讲的不是「上不上 agent」的二选一，而是一道连续的光谱——多数实用系统落在中间这些路径相对固定的工作流模式上，自主 agent 只是光谱最右端、最灵活也最贵的那一档。"
            className="block h-auto w-[720px]"
          >
          <defs>
            <marker
              id="psd-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
            <linearGradient id="psd-axis" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--border)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>

          {/* —— 标题 —— */}
          <text
            x={VIEW_W / 2}
            y={TITLE_Y}
            textAnchor="middle"
            fontSize={TITLE_SIZE}
            fontWeight="700"
            fill="var(--text-primary)"
          >
            智能体模式光谱：自主性从左到右递增（也是第四篇路线图）
          </text>

          {/* —— 两端注释 —— */}
          <text
            x={AXIS_LEFT}
            y={TITLE_Y + 28}
            textAnchor="middle"
            fontSize={TEXT_SIZE}
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            ◀ 路径越写死
          </text>
          <text
            x={AXIS_LEFT}
            y={TITLE_Y + 44}
            textAnchor="middle"
            fontSize={TEXT_SIZE}
            fill="var(--text-secondary)"
          >
            可预测 · 便宜
          </text>
          <text
            x={AXIS_RIGHT}
            y={TITLE_Y + 28}
            textAnchor="middle"
            fontSize={TEXT_SIZE}
            fontWeight="600"
            fill="var(--accent)"
          >
            自己拿主意越多 ▶
          </text>
          <text
            x={AXIS_RIGHT}
            y={TITLE_Y + 44}
            textAnchor="middle"
            fontSize={TEXT_SIZE}
            fill="var(--text-secondary)"
          >
            灵活 · 但贵且不定
          </text>

          {/* —— 光谱轴线（左暗右紫，带箭头）—— */}
          <line
            x1={AXIS_LEFT}
            y1={AXIS_Y}
            x2={AXIS_RIGHT + 6}
            y2={AXIS_Y}
            stroke="url(#psd-axis)"
            strokeWidth="4"
            markerEnd="url(#psd-arrow)"
          />

          {/* —— 7 个模式节点 —— */}
          {NODES.map((node, i) => {
            const cx = nodeCX(i);
            const labelDy = node.up ? LABEL_UP_DY : LABEL_DOWN_DY;
            const chapDy = node.up ? CHAP_UP_DY : CHAP_DOWN_DY;
            const stroke = node.highlight ? "var(--accent)" : "var(--border)";
            const fill = node.highlight ? "var(--accent)" : "var(--bg-elevated)";
            return (
              <g key={node.name + i}>
                {/* 圆点 */}
                <circle
                  cx={cx}
                  cy={AXIS_Y}
                  r={DOT_R}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="2"
                />
                <text
                  x={cx}
                  y={AXIS_Y + 4}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill={node.highlight ? "var(--bg)" : "var(--text-secondary)"}
                >
                  {i + 1}
                </text>

                {/* 模式名（上 / 下交替） */}
                <text
                  x={cx}
                  y={AXIS_Y + labelDy}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight={node.highlight ? "700" : "600"}
                  fill={node.highlight ? "var(--accent)" : "var(--text-primary)"}
                >
                  {node.name}
                </text>
                {node.name2 && (
                  <text
                    x={cx}
                    y={AXIS_Y + labelDy + (node.up ? -14 : 14)}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight={node.highlight ? "700" : "600"}
                    fill={node.highlight ? "var(--accent)" : "var(--text-primary)"}
                  >
                    {node.name2}
                  </text>
                )}

                {/* 章节归属 */}
                {node.chapter && (
                  <text
                    x={cx}
                    y={AXIS_Y + chapDy + (node.name2 ? (node.up ? -14 : 14) : 0)}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {node.chapter}
                  </text>
                )}
              </g>
            );
          })}
          </svg>
        </PatternDiagramViewport>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        本篇讲的不是「上不上 agent」的二选一，而是一道光谱：多数实用系统落在中间这些路径相对固定的工作流模式上，自主
        agent 只是最右端、最灵活也最贵的那一档。链式 / 路由（Ch12）、并行 /
        编排-工作者（Ch13）、评估-优化（Ch14）将逐章展开。
      </figcaption>
    </figure>
  );
}
