/**
 * <DijkstraDiagram>：狄克斯特拉算法可视化。
 * 展示 Dijkstra 算法在带权有向图上的松弛过程。
 * Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 650; // Increased from 640 to satisfy bottom margin (R2)

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

const GNODES: readonly GraphNode[] = [
  { id: "S", label: "S", x: 60, y: 130 },
  { id: "A", label: "A", x: 220, y: 60 },
  { id: "B", label: "B", x: 220, y: 200 },
  { id: "C", label: "C", x: 380, y: 130 },
  { id: "T", label: "终点", x: 540, y: 130 },
];

interface GraphEdge {
  from: number;
  to: number;
  weight: number;
}

const EDGES: readonly GraphEdge[] = [
  { from: 0, to: 1, weight: 2 },
  { from: 0, to: 2, weight: 5 },
  { from: 1, to: 3, weight: 4 },
  { from: 2, to: 3, weight: 1 },
  { from: 3, to: 4, weight: 2 },
];

const NODE_R = 24;
const FINAL_PATH = [0, 1, 3, 4]; // S→A→C→T

interface DijkstraStep {
  step: string;
  selected: string;
  costs: [string, string][];
}

const DIJKSTRA_STEPS: DijkstraStep[] = [
  {
    step: "Step 1: 选 S",
    selected: "S",
    costs: [
      ["A", "2"],
      ["B", "5"],
      ["C", "∞"],
      ["终点", "∞"],
    ],
  },
  {
    step: "Step 2: 选 A, 松弛",
    selected: "A",
    costs: [
      ["A", "2 ✓"],
      ["B", "5"],
      ["C", "2+4=6"],
      ["终点", "∞"],
    ],
  },
  {
    step: "Step 3: 选 B, 松弛",
    selected: "B",
    costs: [
      ["A", "2 ✓"],
      ["B", "5 ✓"],
      ["C", "6 (6 vs 6)"],
      ["终点", "∞"],
    ],
  },
  {
    step: "Step 4: 选 C, 松弛",
    selected: "C",
    costs: [
      ["A", "2 ✓"],
      ["B", "5 ✓"],
      ["C", "6 ✓"],
      ["终点", "6+2=8"],
    ],
  },
];

export function DijkstraDiagram() {
  const ac = "var(--accent)";
  const su = "var(--success)";
  const tp = "var(--text-primary)";
  const ts = "var(--text-secondary)";
  const bg = "var(--bg)";
  const bo = "var(--border)";
  const da = "var(--danger)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="狄克斯特拉算法示意图。带权有向图中从源点 S 到终点的最短路径计算。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="dj-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="8"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={su} />
            </marker>
            <marker
              id="dj-arrow-border"
              markerWidth="8"
              markerHeight="8"
              refX="8"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={bo} />
            </marker>
          </defs>

          {/* 标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16px" fontWeight="700" fill={tp}>
            狄克斯特拉算法：最短路径
          </text>
          <text x={VIEW_W / 2} y={53} textAnchor="middle" fontSize="11px" fill={ts}>
            从 S 到终点的最小代价路径
          </text>

          {/* ===== 边（使用分裂边以避开 AABB 碰撞） ===== */}
          {EDGES.map((e, index) => {
            const from = GNODES[e.from];
            const to = GNODES[e.to];
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ux = dx / dist;
            const uy = dy / dist;

            const x1 = from.x + ux * NODE_R;
            const y1 = from.y + uy * NODE_R;
            const x2 = to.x - ux * NODE_R;
            const y2 = to.y - uy * NODE_R;

            const inFinalPath =
              FINAL_PATH.includes(e.from) &&
              FINAL_PATH.includes(e.to) &&
              Math.abs(FINAL_PATH.indexOf(e.to) - FINAL_PATH.indexOf(e.from)) === 1;

            const stroke = inFinalPath ? su : bo;
            const strokeW = inFinalPath ? 2.5 : 1.5;
            const marker = inFinalPath ? "url(#dj-arrow-success)" : "url(#dj-arrow-border)";

            // 中点分裂间距
            const gap = 14;
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            const sx2 = midX - ux * gap;
            const sy2 = midY - uy * gap;
            const ex1 = midX + ux * gap;
            const ey1 = midY + uy * gap;

            return (
              <g key={`${e.from}-${e.to}`}>
                <line x1={x1} y1={y1} x2={sx2} y2={sy2} stroke={stroke} strokeWidth={strokeW} />
                <line x1={ex1} y1={ey1} x2={x2} y2={y2} stroke={stroke} strokeWidth={strokeW} markerEnd={marker} />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight="700"
                  fill={inFinalPath ? su : tp}
                >
                  {e.weight}
                </text>
              </g>
            );
          })}

          {/* 节点 */}
          {GNODES.map((node) => {
            const isSource = node.id === "S";
            const isTarget = node.id === "T";
            const isOnPath = FINAL_PATH.includes(GNODES.indexOf(node));

            const fillColor = isTarget
              ? su
              : isSource
                ? ac
                : isOnPath
                  ? su
                  : bg;
            const strokeColor = isTarget
              ? su
              : isSource
                ? ac
                : isOnPath
                  ? su
                  : bo;
            const textFill = isTarget || isSource || isOnPath ? "#FFFFFF" : tp;

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_R}
                  fill={fillColor}
                  fillOpacity={isTarget || isSource || isOnPath ? 1 : 0}
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

          {/* 图例 */}
          <text x={GNODES[4].x + NODE_R + 10} y={GNODES[0].y} fontSize="11px" fill={ts}>
            绿线 = 最短路径
          </text>
          <line
            x1={GNODES[4].x - 20}
            y1={GNODES[0].y - 4}
            x2={GNODES[4].x + 5}
            y2={GNODES[0].y - 4}
            stroke={su}
            strokeWidth="2.5"
          />

          {/* 分隔线 */}
          <line
            x1={30}
            y1={GNODES[2].y + NODE_R + 24}
            x2={VIEW_W - 30}
            y2={GNODES[2].y + NODE_R + 24}
            stroke={bo}
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* ===== 步骤表格 ===== */}
          <text
            x={VIEW_W / 2}
            y={GNODES[2].y + NODE_R + 52}
            textAnchor="middle"
            fontSize="11px"
            fontWeight="600"
            fill={ts}
          >
            costs 表（最短距离 — 松弛过程）
          </text>

          {/* 表头 */}
          <g>
            <text x={80} y={GNODES[2].y + NODE_R + 78} fontSize="11px" fontWeight="700" fill={ts}>
              步骤
            </text>
            <text x={190} y={GNODES[2].y + NODE_R + 78} textAnchor="middle" fontSize="11px" fontWeight="700" fill={ts}>
              A
            </text>
            <text x={280} y={GNODES[2].y + NODE_R + 78} textAnchor="middle" fontSize="11px" fontWeight="700" fill={ts}>
              B
            </text>
            <text x={370} y={GNODES[2].y + NODE_R + 78} textAnchor="middle" fontSize="11px" fontWeight="700" fill={ts}>
              C
            </text>
            <text x={460} y={GNODES[2].y + NODE_R + 78} textAnchor="middle" fontSize="11px" fontWeight="700" fill={ts}>
              终点
            </text>
          </g>

          {DIJKSTRA_STEPS.map((s, si) => {
            const y = GNODES[2].y + NODE_R + 92 + si * 36;
            const isLastStep = si === 3;
            return (
              <g key={s.step}>
                <rect
                  x={36}
                  y={y - 6}
                  width={500}
                  height={30}
                  rx="5"
                  fill={isLastStep ? su : ac}
                  fillOpacity={isLastStep ? 0.06 : 0.04}
                />
                <text
                  x={80}
                  y={y + 14}
                  fontSize="11px"
                  fontWeight="600"
                  fill={isLastStep ? su : ac}
                >
                  {s.step}
                </text>
                {s.costs.map(([label, val], ci) => {
                  const cx = 190 + ci * 90;
                  const isFinal = val.includes("✓");
                  return (
                    <text
                      key={ci}
                      x={cx}
                      y={y + 14}
                      textAnchor="middle"
                      fontSize="11px"
                      fontWeight={isFinal ? "700" : "400"}
                      fill={
                        isFinal
                          ? tp
                          : val === "∞" && ci >= 2 && si === 0
                            ? ts
                            : isLastStep
                              ? su
                              : tp
                      }
                    >
                      {val}
                    </text>
                  );
                })}
              </g>
            );
          })}

          {/* 表格下方说明 */}
          <text
            x={VIEW_W / 2}
            y={GNODES[2].y + NODE_R + 260}
            textAnchor="middle"
            fontSize="11px"
            fill={ts}
          >
            松弛：if dist[u] + w(u,v) &lt; dist[v] → 更新 dist[v] = dist[u] + w(u,v)
          </text>

          {/* ===== 底部最终路径 ===== */}
          <line
            x1={30}
            y1={GNODES[2].y + NODE_R + 278}
            x2={VIEW_W - 30}
            y2={GNODES[2].y + NODE_R + 278}
            stroke={bo}
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          <text
            x={VIEW_W / 2}
            y={GNODES[2].y + NODE_R + 304}
            textAnchor="middle"
            fontSize="11px"
            fontWeight="600"
            fill={ts}
          >
            最终最短路径
          </text>

          {/* 路径展示 */}
          <g>
            <text
              x={VIEW_W / 2 - 80}
              y={GNODES[2].y + NODE_R + 332}
              textAnchor="middle"
              fontSize="14px"
              fontWeight="700"
              fill={su}
            >
              S —{">"} A —{">"} C —{">"} 终点
            </text>
            <text
              x={VIEW_W / 2 - 80}
              y={GNODES[2].y + NODE_R + 354}
              textAnchor="middle"
              fontSize="11px"
              fill={ts}
            >
              2 + 4 + 2 = 8
            </text>
          </g>

          <line
            x1={VIEW_W / 2 - 10}
            y1={GNODES[2].y + NODE_R + 306}
            x2={VIEW_W / 2 - 10}
            y2={GNODES[2].y + NODE_R + 364}
            stroke={bo}
            strokeWidth="1"
          />

          <text
            x={VIEW_W / 2 + 80}
            y={GNODES[2].y + NODE_R + 332}
            textAnchor="middle"
            fontSize="11px"
            fill={ts}
          >
            对比另一条路径
          </text>
          <text
            x={VIEW_W / 2 + 80}
            y={GNODES[2].y + NODE_R + 354}
            textAnchor="middle"
            fontSize="11px"
            fill={ts}
          >
            S→B→C→终点 = 5+1+2 = 8
          </text>

          {/* ===== 复杂度 ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 32} // Adjusted to VH-32 to solve margin (R2)
            textAnchor="middle"
            fontSize="12px"
            fontWeight="700"
            fill={ac}
          >
            O((V+E) log V)，非负权重才能使用
          </text>
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 16} // Adjusted to VH-16 to solve margin (R2)
            textAnchor="middle"
            fontSize="11px"
            fill={ts}
          >
            负权边会破坏 Dijkstra 的贪心假设，需改用 Bellman-Ford
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        狄克斯特拉（Dijkstra）算法：松弛操作更新到各节点的最短距离。S→A(2)→C(4)→终点(2) 是最短路径，总代价 8。Dijkstra 要求所有边权重非负，否则贪心策略失效。
      </figcaption>
    </figure>
  );
}
