/**
 * <WorkflowVsAgentDiagram>：工作流 vs 智能体再辨析——路径写死 vs 路径动态（HEL-321，第 11 章）。
 *
 * 一张静态 SVG，左右两栏并排，回答「同一件事，工作流和智能体到底差在哪条路」：
 *  ① 左栏 工作流：一条固定流水线，步骤 1 → 2 → 3 由人预先写死，箭头是直的、单向、无分叉。
 *     路径在写代码时就定死，每次执行都走同一条，可预测、便宜、可靠。
 *  ② 右栏 智能体：LLM 站在一个循环里，每一圈自己「想→做→看」，由它当场决定下一步走哪条路
 *     （这次调工具 A、下次调工具 B、或收尾），路径运行时才生成、随情况动态变化。
 *
 * 核心一图：不是「步数多少」的差别，而是「路径是谁定的、何时定的」——
 * 工作流的路是人写代码时定死的，智能体的路是 LLM 边跑边选的。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名、为 4 的倍数（硬规则 5）。
 * 几何自检：两栏零重叠、文字中心落自己框内、四周留白 ≥ 14px、字号 ≥ 10px、单一行/列公式。
 */

import {
  PATTERN_DIAGRAM_VIEW_W,
  PatternDiagramViewport,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
} from "./agentic-pattern-diagram-shell";

// —— 整体画布。 ——
const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 412;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const PANEL_RADIUS = PATTERN_RADIUS_CARD;
const NODE_RADIUS = PATTERN_RADIUS_CONTROL;

// —— 标题区。 ——
const TITLE_Y = 30;

// —— 两栏等宽布局（单一 x 公式）。 ——
// 右边界 = COL_MARGIN + COL_W + COL_GAP + COL_W = 24 + 328 + 16 + 328 = 696 → 右留白 24。
const COL_W = 328;
const COL_GAP = 16;
const COL_MARGIN = 24;
/** 第 i 栏左上角 x（单一公式，禁双算法）。 */
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// —— 栏外框。 ——
const COL_Y = 52;
const COL_H = 340; // 底 = 52 + 340 = 392 → 距底 20

// —— 栏内竖排步骤节点。 ——
const NODE_W = 244;
const NODE_H = 44;
const NODE_GAP = 24;
const NODE_TOP = COL_Y + 80; // 第一个节点 y（给两行标题让位）
/** 栏内节点左上角 x（栏内水平居中）。 */
const nodeX = (col: number) => colX(col) + (COL_W - NODE_W) / 2;
/** 第 row 个节点左上角 y（单一垂直步进公式）。底节点底 = 132 + 2*68 + 44 = 312 → 距小结充足。 */
const nodeY = (row: number) => NODE_TOP + row * (NODE_H + NODE_GAP);

const WORKFLOW_NODES: readonly string[] = [
  "步骤 1：查车次（写死）",
  "步骤 2：下单（写死）",
  "步骤 3：发确认（写死）",
];

const AGENT_NODES: readonly string[] = [
  "🧠 想：下一步该干啥？",
  "🛠️ 做：LLM 当场选一条路",
  "👀 看：行不行？不行就再想 ↺",
];

export function WorkflowVsAgentDiagram() {
  const leftCx = colX(0) + COL_W / 2;
  const rightCx = colX(1) + COL_W / 2;
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="工作流和智能体的路径对比图，左右两栏并排，主题是同一件「订高铁票」的事，两种做法的路有什么不一样。左栏是工作流：一条固定流水线，步骤一查车次、步骤二下单、步骤三发确认，三步都是人预先写死的，箭头是直的、单向、没有分叉；路径在写代码时就定死了，每次执行都走同一条，所以可预测、便宜、可靠。右栏是智能体：一个 LLM 站在循环里，每转一圈就自己「想——下一步该干啥，做——当场选一条路，看——行不行，不行就回到想这一步再来一圈」；这次调工具 A、下次可能调工具 B 或者直接收尾，路径是运行时才生成的、随情况动态变化。核心区别不是步数多少，而是路是谁定的、什么时候定的：工作流的路是人写代码时定死的，智能体的路是 LLM 边跑边选的。"
            className="block h-auto w-[720px]"
          >
          <defs>
            <marker
              id="wva-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="wva-arrow-accent"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
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
            同一件事，两种走法：路是谁定的、何时定的
          </text>

          {/* ===== 左栏：工作流（路径写死）===== */}
          <rect
            x={colX(0)}
            y={COL_Y}
            width={COL_W}
            height={COL_H}
            rx={PANEL_RADIUS}
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.6"
          />
          <text
            x={leftCx}
            y={COL_Y + 30}
            textAnchor="middle"
            fontSize={TEXT_SIZE}
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🛤️ 工作流：路径写死
          </text>
          <text
            x={leftCx}
            y={COL_Y + 52}
            textAnchor="middle"
            fontSize={TEXT_SIZE}
            fill="var(--text-secondary)"
          >
            写代码时就定死，每次都走同一条
          </text>
          {WORKFLOW_NODES.map((label, ri) => (
            <g key={`wf-${ri}`}>
              <rect
                x={nodeX(0)}
                y={nodeY(ri)}
                width={NODE_W}
                height={NODE_H}
                rx={NODE_RADIUS}
                fill="var(--bg-elevated)"
                stroke="var(--border)"
                strokeWidth="1.2"
              />
              <text
                x={leftCx}
                y={nodeY(ri) + NODE_H / 2 + 4}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                {label}
              </text>
              {ri < WORKFLOW_NODES.length - 1 && (
                <line
                  x1={leftCx}
                  y1={nodeY(ri) + NODE_H + 2}
                  x2={leftCx}
                  y2={nodeY(ri + 1) - 3}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.4"
                  markerEnd="url(#wva-arrow)"
                />
              )}
            </g>
          ))}
          <text
            x={leftCx}
            y={COL_Y + COL_H - 16}
            textAnchor="middle"
            fontSize={TEXT_SIZE}
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            可预测 · 便宜 · 可靠
          </text>

          {/* ===== 右栏：智能体（路径动态）===== */}
          <rect
            x={colX(1)}
            y={COL_Y}
            width={COL_W}
            height={COL_H}
            rx={PANEL_RADIUS}
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={rightCx}
            y={COL_Y + 30}
            textAnchor="middle"
            fontSize={TEXT_SIZE}
            fontWeight="700"
            fill="var(--accent)"
          >
            🔄 智能体：路径动态
          </text>
          <text
            x={rightCx}
            y={COL_Y + 52}
            textAnchor="middle"
            fontSize={TEXT_SIZE}
            fill="var(--text-secondary)"
          >
            LLM 在循环里边跑边自己选路
          </text>
          {AGENT_NODES.map((label, ri) => (
            <g key={`ag-${ri}`}>
              <rect
                x={nodeX(1)}
                y={nodeY(ri)}
                width={NODE_W}
                height={NODE_H}
                rx={NODE_RADIUS}
                fill="var(--accent-glow)"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
              <text
                x={rightCx}
                y={nodeY(ri) + NODE_H / 2 + 4}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {label}
              </text>
              {ri < AGENT_NODES.length - 1 && (
                <line
                  x1={rightCx}
                  y1={nodeY(ri) + NODE_H + 2}
                  x2={rightCx}
                  y2={nodeY(ri + 1) - 3}
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                  markerEnd="url(#wva-arrow-accent)"
                />
              )}
            </g>
          ))}
          {/* 回环箭头：从「看」回到「想」，示意循环（栏内右侧竖弧）。 */}
          <path
            d={`M ${nodeX(1) + NODE_W + 8} ${nodeY(2) + NODE_H / 2}
               C ${colX(1) + COL_W - 10} ${nodeY(2) + NODE_H / 2},
                 ${colX(1) + COL_W - 10} ${nodeY(0) + NODE_H / 2},
                 ${nodeX(1) + NODE_W + 8} ${nodeY(0) + NODE_H / 2}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
            markerEnd="url(#wva-arrow-accent)"
          />
          <text
            x={rightCx}
            y={COL_Y + COL_H - 16}
            textAnchor="middle"
            fontSize={TEXT_SIZE}
            fontWeight="600"
            fill="var(--accent)"
          >
            灵活 · 能随机应变 · 但更贵更不定
          </text>
          </svg>
        </PatternDiagramViewport>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        工作流的路是人写代码时定死的（左），智能体的路是 LLM
        在循环里边跑边选的（右）。差别不在步数多少，而在「路由谁定、何时定」。
      </figcaption>
    </figure>
  );
}
