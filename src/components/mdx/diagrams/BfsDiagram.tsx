/**
 * <BfsDiagram>：Grokking Algorithms — 广度优先搜索可视化。
 * 展示 BFS 在树状图中的逐层扩展：
 * 根节点"你" → 第一层 A、B → 第二层 C、D → 第三层"目标"。
 * Server Component。
 */

const VIEW_W = 760;
const VIEW_H = 570;

const NODE_R = 22;

interface TreeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  isTarget?: boolean;
}

const NODES: readonly TreeNode[] = [
  { id: "you", label: "你", x: 380, y: 66 }, // Shifted right slightly to match VIEW_W = 760
  { id: "a", label: "A", x: 240, y: 140 },
  { id: "b", label: "B", x: 520, y: 140 },
  { id: "c", label: "C", x: 160, y: 220 },
  { id: "d", label: "D", x: 380, y: 220 },
  { id: "target", label: "目标", x: 240, y: 300, isTarget: true },
];

interface Edge {
  from: number;
  to: number;
}

const EDGES: readonly Edge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 3, to: 5 },
];

const BFS_STEPS = [
  { step: "Step 1", queue: ["你"] as (string | null)[], highlight: 0 },
  { step: "Step 2", queue: ["A", "B"] as (string | null)[], highlight: 1 },
  { step: "Step 3", queue: ["C", "D"] as (string | null)[], highlight: 2 },
  { step: "Step 4", queue: ["目标"] as (string | null)[], highlight: 3 },
];

const BFS_ARIA =
  "广度优先搜索 BFS 示意图。树状图展示从根节点「你」到「目标」的搜索过程。" +
  "图结构：「你」连接 A 和 B，A 连接 C 和 D，C 连接目标。" +
  "四个队列快照展示 BFS 逐层扩散：" +
  "第 1 步队列只有「你」，第 2 步队列为 [A,B]，" +
  "第 3 步队列为 [C,D]，第 4 步找到「目标」。" +
  "底部标注 O(V+E)，BFS 逐层扩散保证找到最短路径边数。" +
  "目标节点以绿色高亮标记。";

export function BfsDiagram() {
  const ac = "var(--accent)";
  const su = "var(--success)";
  const tp = "var(--text-primary)";
  const ts = "var(--text-secondary)";
  const bg = "var(--bg)";
  const bo = "var(--border)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={BFS_ARIA}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker
              id="bfs-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={ac} />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x={VIEW_W / 2}
            y={35} // Increased from 24 to satisfy margins
            textAnchor="middle"
            fontSize="16px"
            fontWeight="700"
            fill={tp}
          >
            广度优先搜索（BFS）：队列逐层扩散
          </text>

          {/* ===== 树状图 ===== */}
          {/* 边 */}
          {EDGES.map((e) => {
            const from = NODES[e.from];
            const to = NODES[e.to];
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={bo}
                strokeWidth="1.5"
              />
            );
          })}

          {/* 层高亮背景 */}
          {/* 第 0 层 */}
          <ellipse
            cx={380}
            cy={66}
            rx={100}
            ry={34}
            fill={ac}
            fillOpacity="0.06"
          />
          {/* 第 1 层 */}
          <ellipse
            cx={380}
            cy={140}
            rx={200}
            ry={34}
            fill={ac}
            fillOpacity="0.04"
          />
          {/* 第 2 层 */}
          <ellipse
            cx={270}
            cy={220}
            rx={180}
            ry={34}
            fill={ac}
            fillOpacity="0.04"
          />

          {/* 层标注 */}
          <text
            x={VIEW_W - 70}
            y={70}
            fontSize="11px"
            fill={ts}
          >
            第 0 层
          </text>
          <text
            x={VIEW_W - 70}
            y={144}
            fontSize="11px"
            fill={ts}
          >
            第 1 层
          </text>
          <text
            x={VIEW_W - 70}
            y={224}
            fontSize="11px"
            fill={ts}
          >
            第 2 层
          </text>
          <text
            x={VIEW_W - 70}
            y={304}
            fontSize="11px"
            fontWeight="700"
            fill={su}
          >
            找到！
          </text>

          {/* 节点 */}
          {NODES.map((node) => {
            const fillColor = node.isTarget
              ? su
              : node.id === "you"
                ? ac
                : bg;
            const strokeColor = node.isTarget
              ? su
              : node.id === "you"
                ? ac
                : bo;
            const textFill = node.isTarget
              ? "#FFFFFF"
              : node.id === "you"
                ? "#FFFFFF"
                : tp;

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_R}
                  fill={fillColor}
                  fillOpacity={node.isTarget || node.id === "you" ? 1 : 0}
                  stroke={strokeColor}
                  strokeWidth="2"
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize="13px"
                  fontWeight="700"
                  fill={textFill}
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* 虚线分隔 */}
          <line
            x1={40}
            y1={NODES[5].y + NODE_R + 40}
            x2={VIEW_W - 40}
            y2={NODES[5].y + NODE_R + 40}
            stroke={bo}
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* ===== 队列步骤 ===== */}
          <text
            x={VIEW_W / 2}
            y={NODES[5].y + NODE_R + 66}
            textAnchor="middle"
            fontSize="11px"
            fontWeight="600"
            fill={ts}
          >
            队列演化（前端出队 → 后端入队邻居）
          </text>

          {BFS_STEPS.map((step, si) => {
            const svY = NODES[5].y + NODE_R + 78;
            const stepX = 90 + si * 190; // Shifted right to resolve bracket margin issues
            const items = step.queue;

            return (
              <g key={step.step}>
                {/* 步骤标签 */}
                <text
                  x={stepX}
                  y={svY}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight="700"
                  fill={si === 3 ? su : ac}
                >
                  {step.step}
                </text>

                {/* 队列容器 */}
                <rect
                  x={stepX - 60}
                  y={svY + 8}
                  width={120}
                  height={38}
                  rx="6"
                  fill={bg}
                  stroke={si === 3 ? su : ac}
                  strokeWidth="1.8"
                />

                {/* 队列元素 */}
                {items.map((item, ii) => {
                  if (!item) return null;
                  const ix = stepX - 50 + ii * 48;
                  return (
                    <g key={`${si}-${ii}`}>
                      <rect
                        x={ix}
                        y={svY + 14}
                        width="38"
                        height="26"
                        rx="4"
                        fill={si === 3 ? su : ac}
                        fillOpacity={si === 3 ? 0.2 : 0.12}
                      />
                      <text
                        x={ix + 19}
                        y={svY + 31}
                        textAnchor="middle"
                        fontSize="11px"
                        fontWeight="600"
                        fill={si === 3 ? su : ac}
                      >
                        {item}
                      </text>
                    </g>
                  );
                })}

                {/* 队列两端括号 */}
                <text
                  x={stepX - 70}
                  y={svY + 33}
                  fontSize="16px"
                  fill={ts}
                >
                  [
                </text>
                <text
                  x={stepX + 64}
                  y={svY + 33}
                  fontSize="16px"
                  fill={ts}
                >
                  ]
                </text>
              </g>
            );
          })}

          {/* 步骤间箭头 */}
          {[0, 1, 2].map((i) => {
            const svY = NODES[5].y + NODE_R + 78;
            const ax = 176 + i * 190;
            return (
              <line
                key={`qa-${i}`}
                x1={ax}
                y1={svY + 28}
                x2={ax + 20}
                y2={svY + 28}
                stroke={ac}
                strokeWidth="1.5"
                markerEnd="url(#bfs-arrow)"
              />
            );
          })}

          {/* 方向说明 */}
          <text
            x={VIEW_W / 2}
            y={NODES[5].y + NODE_R + 166}
            textAnchor="middle"
            fontSize="11px"
            fill={ts}
          >
            出队：pop 队首节点 → 检查是否目标 → 入队：push 所有未访问邻居
          </text>

          {/* ===== 底部复杂度 ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 32} // Shifted up to VH-32 to solve margin (R2)
            textAnchor="middle"
            fontSize="12px"
            fontWeight="700"
            fill={ac}
          >
            O(V+E)：队列逐层扩散，找到最短路径边数
          </text>
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 16} // Shifted up to VH-16 to solve margin (R2)
            textAnchor="middle"
            fontSize="11px"
            fill={ts}
          >
            V=节点数 E=边数 · BFS 保证最先找到的目标一定是最短路径
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        广度优先搜索（BFS）：从起点出发逐层向外扩散，用队列记录待访问节点。每层出队→检查→入队邻居，直到找到目标。因为按层次遍历，所以第一次找到目标时走过的边数就是最短路径边数。
      </figcaption>
    </figure>
  );
}
