/**
 * <McpCapabilitiesDiagram>：一个 MCP Server 能暴露的三类能力（HEL-319，第 10 章）。
 *
 * 一张静态 SVG：顶部一个「MCP Server」框，下面三栏并列，分别是 server 能向应用暴露的
 * 三类能力——Tools（可调用的动作）/ Resources（可读取的数据·上下文）/ Prompts（预设
 * 提示模板）。每栏一句人话定位 + 一个例子，让读者一眼分清三者干啥。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：三栏与各文字零重叠、文字中心落在自己栏内、四周留白 ≥ 14px、字号 ≥ 10px、单一 x 公式。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 392;

// —— 顶部 MCP Server 框。 ——
const HEAD_W = 280;
const HEAD_H = 52;
const HEAD_X = (VIEW_W - HEAD_W) / 2; // 220
const HEAD_Y = 24;
const HEAD_CX = HEAD_X + HEAD_W / 2; // 360

// —— 三栏（单一 x 公式：col i 左边界 = MARGIN + i*(COL_W + GAP)）。 ——
const MARGIN = 24;
const COL_GAP = 24;
const COL_W = (VIEW_W - 2 * MARGIN - 2 * COL_GAP) / 3; // (720-48-48)/3 = 208
const COL_TOP = 152;
const COL_H = 216; // 底 = 152 + 216 = 368 → 距底 24

/** 第 i 栏左边界（单一公式）。 */
function colX(i: number): number {
  return MARGIN + i * (COL_W + COL_GAP);
}
function colCX(i: number): number {
  return colX(i) + COL_W / 2;
}

type Capability = {
  /** 栏标题（中英）。 */
  title: string;
  /** 一句人话定位。 */
  desc: string;
  /** 谁主导（模型主动调 / 应用按需读 / 用户挑模板）。 */
  who: string;
  /** 一个具体例子。 */
  example: string;
};

const CAPS: readonly Capability[] = [
  {
    title: "🔧 Tools",
    desc: "可调用的「动作」",
    who: "模型决定何时调",
    example: "例：发邮件、改文件、查库存",
  },
  {
    title: "📄 Resources",
    desc: "可读取的「数据 / 上下文」",
    who: "应用按需读进上下文",
    example: "例：某文件内容、一张表、日志",
  },
  {
    title: "💬 Prompts",
    desc: "预设的「提示模板」",
    who: "用户挑现成模板用",
    example: "例：「帮我审这段代码」模板",
  },
];

export function McpCapabilitiesDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="一个 MCP Server 能向 AI 应用暴露的三类能力。顶部是一个 MCP Server 框，下面三条箭头分别指向三栏。第一栏是 Tools，可调用的动作，由模型决定什么时候调用，例子有发邮件、改文件、查库存。第二栏是 Resources，可读取的数据或上下文，由应用按需读进上下文，例子有某个文件的内容、一张数据表、日志。第三栏是 Prompts，预设的提示模板，由用户挑选现成模板来用，例子是一个帮我审查这段代码的模板。核心结论：MCP Server 不只能提供工具动作，它还能提供可读的数据资源和预设的提示模板，三类能力各有分工——Tools 让模型能动手，Resources 让应用能取数据，Prompts 给用户现成的提示套路。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="mcp-cap-arrow"
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

          {/* —— 顶部 server → 三栏的连线（先画）—— */}
          {CAPS.map((_, i) => (
            <line
              key={`cap-line-${i}`}
              x1={HEAD_CX}
              y1={HEAD_Y + HEAD_H}
              x2={colCX(i)}
              y2={COL_TOP - 4}
              stroke="var(--accent)"
              strokeWidth="1.4"
              opacity="0.6"
              markerEnd="url(#mcp-cap-arrow)"
            />
          ))}

          {/* —— 顶部 MCP Server 框 —— */}
          <rect
            x={HEAD_X}
            y={HEAD_Y}
            width={HEAD_W}
            height={HEAD_H}
            rx="10"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={HEAD_CX}
            y={HEAD_Y + 22}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🔌 一个 MCP Server
          </text>
          <text
            x={HEAD_CX}
            y={HEAD_Y + 40}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            可向应用暴露三类能力
          </text>

          {/* —— 三栏能力 —— */}
          {CAPS.map((cap, i) => {
            const x = colX(i);
            const cx = colCX(i);
            return (
              <g key={`cap-${i}`}>
                <rect
                  x={x}
                  y={COL_TOP}
                  width={COL_W}
                  height={COL_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={cx}
                  y={COL_TOP + 40}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {cap.title}
                </text>
                <text
                  x={cx}
                  y={COL_TOP + 78}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {cap.desc}
                </text>
                <text
                  x={cx}
                  y={COL_TOP + 120}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {cap.who}
                </text>
                <text
                  x={cx}
                  y={COL_TOP + 170}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {cap.example}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一个 MCP Server 能暴露三类能力：<strong>Tools</strong>（可调用的动作，模型来调）、
        <strong>Resources</strong>（可读取的数据，应用来读）、<strong>Prompts</strong>
        （预设的提示模板，用户来挑）。不只是「接工具」，还能接数据和提示套路。
      </figcaption>
    </figure>
  );
}
