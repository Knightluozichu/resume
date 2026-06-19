/**
 * <AgentVsWorkflowDiagram>：聊天机器人 vs 工作流 vs 智能体 三栏对比（HEL-275，第 1 章）。
 *
 * 三栏等宽对比，回答「Agent 和它的两个近亲到底差在哪」：
 *  ① 聊天机器人（Chatbot）：单轮 —— 你问一句、它答一句，到此为止，不会自己接着干。
 *  ② 工作流（Workflow）：固定流水线 —— 步骤 1 → 2 → 3 是人预先写死的，每次都走同一条路。
 *  ③ 智能体（Agent）：循环 —— LLM 在循环里自己决定下一步，路径随情况动态变化。
 *
 * 三栏用「单一 x 公式」colX(i) 排布，等宽等距，禁止双算法（svg-diagram-quality 硬规则）。
 *
 * 纯展示 Server 组件（无交互）。配色全部走 DESIGN token（无裸 hex）；
 * 几何常量具名、为 4 的倍数（硬规则 5）。几何自检：三栏零重叠、文字落在自己栏内、
 * 四周留白 ≥ 12px、字号 ≥ 10px、viewBox 利用率适中。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 348;

// —— 三栏等宽布局（单一 x 公式）。 ——
// 右边界 = COL_MARGIN + 2*(COL_W+COL_GAP) + COL_W = 24 + 464 + 212 = 700 → 左右留白各 ≥20。
const COL_W = 212;
const COL_GAP = 20;
const COL_MARGIN = 24;
/** 第 i 栏左上角 x（单一公式，禁双算法）。 */
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// —— 栏外框（标题 + 内部节点都在框内）。 ——
const COL_Y = 44;
const COL_H = 280;

// —— 栏内的「步骤节点」几何（竖排小卡片）。 ——
const NODE_W = 168;
const NODE_H = 36;
const NODE_GAP = 20; // 相邻节点垂直间隔
const NODE_TOP = COL_Y + 76; // 第一个节点 y（给标题让出空间）
/** 第 col 栏第 row 个节点左上角坐标（栏内水平居中 + 单一垂直步进公式）。 */
const nodeX = (col: number) => colX(col) + (COL_W - NODE_W) / 2;
const nodeY = (row: number) => NODE_TOP + row * (NODE_H + NODE_GAP);

type Col = {
  /** 栏标题 */
  title: string;
  /** 标题下一行的定性标签 */
  tag: string;
  /** 竖排节点文案（从上到下） */
  nodes: string[];
  /** 该栏是否高亮（Agent 为重点）。 */
  highlight: boolean;
  /** 末行小结一句话。 */
  note: string;
};

const COLS: readonly Col[] = [
  {
    title: "聊天机器人",
    tag: "单轮 · 问一句答一句",
    nodes: ["① 你提问", "② 它回答", "✦ 结束"],
    highlight: false,
    note: "不会自己接着干",
  },
  {
    title: "工作流",
    tag: "固定流水线 · 路径写死",
    nodes: ["步骤 1（写死）", "步骤 2（写死）", "步骤 3（写死）"],
    highlight: false,
    note: "每次都走同一条路",
  },
  {
    title: "智能体 Agent",
    tag: "循环 · 自己决定下一步",
    nodes: ["想：下一步干啥？", "做：调工具 / 答", "看：行不行？↺"],
    highlight: true,
    note: "路径随情况动态变",
  },
];

export function AgentVsWorkflowDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="聊天机器人、工作流、智能体三者对比图，三栏等宽。第一栏是聊天机器人，特点是单轮、问一句答一句：① 你提问，② 它回答，然后结束，它不会自己接着干。第二栏是工作流，特点是固定流水线、路径写死：步骤 1、步骤 2、步骤 3 都是人预先写死的，每次都走同一条路。第三栏是智能体 Agent（本图重点，高亮显示），特点是循环、自己决定下一步：想——下一步干啥，做——调用工具或回答，看——行不行，不行就回到想这一步循环往复，所以它的路径随情况动态变化。核心区别：聊天机器人只有一来一回，工作流的步骤是人提前写死不会变，而智能体是 LLM 在循环里自主决定每一步该干什么。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="avw-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 标题行 */}
          <text
            x={VIEW_W / 2}
            y={26}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一图看懂：聊天机器人 vs 工作流 vs 智能体
          </text>

          {COLS.map((col, ci) => {
            const cx = colX(ci) + COL_W / 2;
            const stroke = col.highlight ? "var(--accent)" : "var(--border)";
            return (
              <g key={col.title}>
                {/* 栏外框 */}
                <rect
                  x={colX(ci)}
                  y={COL_Y}
                  width={COL_W}
                  height={COL_H}
                  rx="12"
                  fill="var(--bg)"
                  stroke={stroke}
                  strokeWidth={col.highlight ? 2 : 1.4}
                />
                {/* 栏标题 + 标签 */}
                <text
                  x={cx}
                  y={COL_Y + 28}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={col.highlight ? "var(--accent)" : "var(--text-primary)"}
                >
                  {col.title}
                </text>
                <text
                  x={cx}
                  y={COL_Y + 50}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {col.tag}
                </text>

                {/* 竖排步骤节点 + 节点间下行箭头 */}
                {col.nodes.map((label, ri) => (
                  <g key={`${col.title}-n${ri}`}>
                    <rect
                      x={nodeX(ci)}
                      y={nodeY(ri)}
                      width={NODE_W}
                      height={NODE_H}
                      rx="8"
                      fill={
                        col.highlight ? "var(--accent-glow)" : "var(--bg-elevated)"
                      }
                      stroke={col.highlight ? "var(--accent)" : "var(--border)"}
                      strokeWidth="1.2"
                    />
                    <text
                      x={cx}
                      y={nodeY(ri) + NODE_H / 2 + 4}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight={col.highlight ? "600" : "400"}
                      fill="var(--text-primary)"
                    >
                      {label}
                    </text>
                    {/* 节点间下行箭头（最后一个节点不画） */}
                    {ri < col.nodes.length - 1 && (
                      <line
                        x1={cx}
                        y1={nodeY(ri) + NODE_H + 2}
                        x2={cx}
                        y2={nodeY(ri + 1) - 3}
                        stroke="var(--text-secondary)"
                        strokeWidth="1.3"
                        markerEnd="url(#avw-arrow)"
                        opacity="0.7"
                      />
                    )}
                  </g>
                ))}

                {/* 末行小结 */}
                <text
                  x={cx}
                  y={COL_Y + COL_H - 14}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={col.highlight ? "var(--accent)" : "var(--text-secondary)"}
                >
                  {col.note}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        聊天机器人只有一问一答；工作流的步骤是人提前写死、每次都一样；智能体则在循环里自己决定下一步，路径随情况而变 —— 这就是它最不一样的地方。
      </figcaption>
    </figure>
  );
}
