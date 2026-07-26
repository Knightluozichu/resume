/**
 * <AaeGraphAlgorithmsDiagram>：高级图算法图（advanced-algorithm 图算法章）。
 *
 * 一个带权有向图（7 节点 S/A/B/E/C/D/T），用不同颜色的路径标注三种算法：
 *   - Dijkstra 最短路（success 绿）：S→A→C→T，权 2+3+3=8
 *   - A* 启发式搜索（accent 紫）：S→B→D→T，权 3+3+2=8，附 h(n) 直线启发式
 *   - 最大流（warning 暖色加粗边）：S→E→T，容量 [5][3]，瓶颈 3
 * 三条路径边互不重叠，便于区分。下方标注各算法时间复杂度与适用场景。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×560（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 560;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const R = 22;

const NODES: Record<string, { x: number; y: number; label: string; sub?: string }> = {
  S: { x: 104, y: 250, label: "S", sub: "源" },
  A: { x: 254, y: 132, label: "A" },
  B: { x: 254, y: 368, label: "B" },
  E: { x: 254, y: 250, label: "E" },
  C: { x: 424, y: 132, label: "C" },
  D: { x: 424, y: 368, label: "D" },
  T: { x: 594, y: 250, label: "T", sub: "汇" },
};

interface EdgeDef {
  f: string;
  t: string;
  w: string;
  cap?: string;
  kind: "dijkstra" | "astar" | "maxflow" | "neutral";
}

const EDGES: readonly EdgeDef[] = [
  { f: "S", t: "A", w: "2", kind: "dijkstra" },
  { f: "S", t: "B", w: "3", kind: "astar" },
  { f: "S", t: "E", w: "1", cap: "5", kind: "maxflow" },
  { f: "A", t: "C", w: "3", kind: "dijkstra" },
  { f: "A", t: "D", w: "4", kind: "neutral" },
  { f: "B", t: "C", w: "2", kind: "neutral" },
  { f: "B", t: "D", w: "3", kind: "astar" },
  { f: "E", t: "T", w: "7", cap: "3", kind: "maxflow" },
  { f: "C", t: "T", w: "3", kind: "dijkstra" },
  { f: "D", t: "T", w: "2", kind: "astar" },
  { f: "C", t: "D", w: "1", kind: "neutral" },
];

const KIND_COLOR: Record<EdgeDef["kind"], string> = {
  dijkstra: success,
  astar: accent,
  maxflow: warning,
  neutral: secondary,
};

function shorten(ax: number, ay: number, bx: number, by: number, r1: number, r2: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: ax + ux * r1,
    y1: ay + uy * r1,
    x2: bx - ux * r2,
    y2: by - uy * r2,
    mx: (ax + bx) / 2,
    my: (ay + by) / 2,
    px: -uy,
    py: ux,
  };
}

export function AaeGraphAlgorithmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高级图算法图。一个带权有向图含 7 个节点 S、A、B、E、C、D、T。绿色路径标注 Dijkstra 最短路 S→A→C→T（权 8）；紫色路径标注 A* 启发式搜索 S→B→D→T（权 8），并附 h(n) 直线启发式；暖色加粗边标注最大流 S→E→T（容量 5、3，瓶颈 3）。下方列出三种算法的时间复杂度与适用场景。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ga-neutral" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="ga-dijkstra" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={success} />
            </marker>
            <marker id="ga-astar" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="ga-maxflow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            图算法三例 · 最短路 / 启发式 / 最大流
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            同一带权有向图上，三种算法走出三条互不重叠的高亮路径
          </text>

          {/* A* 启发式虚线：各节点到 T 的直线估计 h(n) */}
          {(["A", "B", "E", "S", "C", "D"] as const).map((n) => {
            const a = NODES[n];
            const b = NODES.T;
            const s = shorten(a.x, a.y, b.x, b.y, R, R);
            return (
              <line
                key={`h-${n}`}
                x1={s.x1}
                y1={s.y1}
                x2={s.x2}
                y2={s.y2}
                stroke={accent}
                strokeWidth="1"
                strokeOpacity="0.22"
                strokeDasharray="2 4"
              />
            );
          })}
          <text x={470} y={196} fontSize="11" fill={accent} fillOpacity="0.8">h(n) 启发式</text>

          {/* ===== 边 ===== */}
          {EDGES.map((e) => {
            const a = NODES[e.f];
            const b = NODES[e.t];
            const s = shorten(a.x, a.y, b.x, b.y, R, R + 2);
            const color = KIND_COLOR[e.kind];
            const isHi = e.kind !== "neutral";
            const marker =
              e.kind === "dijkstra" ? "url(#ga-dijkstra)" : e.kind === "astar" ? "url(#ga-astar)" : e.kind === "maxflow" ? "url(#ga-maxflow)" : "url(#ga-neutral)";
            const sw = e.kind === "maxflow" ? 4 : isHi ? 3 : 1.4;
            const so = isHi ? 0.95 : 0.55;
            // 权重标签位置
            const lx = s.mx + s.px * 11;
            const ly = s.my + s.py * 11;
            return (
              <g key={`${e.f}-${e.t}`}>
                <line
                  x1={s.x1}
                  y1={s.y1}
                  x2={s.x2}
                  y2={s.y2}
                  stroke={color}
                  strokeWidth={sw}
                  strokeOpacity={so}
                  markerEnd={marker}
                />
                {/* 权重 / 容量标签 */}
                {e.kind === "maxflow" ? (
                  <g>
                    <rect x={lx - 16} y={ly - 9} width="32" height="16" rx="3" fill={warning} fillOpacity="0.18" stroke={warning} strokeWidth="1" />
                    <text x={lx} y={ly + 3} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning} fontFamily="monospace">
                      cap{e.cap}
                    </text>
                  </g>
                ) : (
                  <g>
                    <rect x={lx - 9} y={ly - 9} width="18" height="16" rx="3" fill={elevated} stroke={isHi ? color : border} strokeWidth="1" strokeOpacity={isHi ? 0.6 : 0.5} />
                    <text x={lx} y={ly + 3} textAnchor="middle" fontSize="11" fontWeight={isHi ? 700 : 500} fill={isHi ? color : secondary} fontFamily="monospace">
                      {e.w}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* ===== 节点 ===== */}
          {Object.entries(NODES).map(([key, n]) => (
            <g key={key}>
              <circle cx={n.x} cy={n.y} r={R} fill={elevated} stroke={primary} strokeWidth="1.8" />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={primary} fontFamily="monospace">
                {n.label}
              </text>
              {n.sub && (
                <text x={n.x} y={n.y + R + 13} textAnchor="middle" fontSize="11" fill={secondary}>
                  {n.sub}
                </text>
              )}
            </g>
          ))}

          {/* ===== 底部图例与复杂度 ===== */}
          <line x1={32} y1={418} x2={VIEW_W - 32} y2={418} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {[
            { color: success, name: "Dijkstra", path: "S→A→C→T", cost: "权 8", cx: "O((V+E) log V)", scene: "单源最短路 · 非负权", y: 444 },
            { color: accent, name: "A*", path: "S→B→D→T", cost: "权 8", cx: "O(E)（启发式好时更少）", scene: "目标最短路 · 带启发式", y: 486 },
            { color: warning, name: "最大流", path: "S→E→T", cost: "瓶颈 3", cx: "O(VE²) Edmonds-Karp", scene: "容量网络 · 流量分配", y: 528 },
          ].map((row) => (
            <g key={row.name}>
              {/* 路径色块 */}
              <line x1={40} y1={row.y - 4} x2={68} y2={row.y - 4} stroke={row.color} strokeWidth="3.5" />
              <text x={78} y={row.y} fontSize="12" fontWeight="700" fill={row.color}>
                {row.name}
              </text>
              <text x={150} y={row.y} fontSize="11" fill={primary} fontFamily="monospace">
                {row.path}（{row.cost}）
              </text>
              <text x={330} y={row.y} fontSize="11" fill={secondary} fontFamily="monospace">
                {row.cx}
              </text>
              <text x={540} y={row.y} fontSize="11" fill={secondary}>
                {row.scene}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一带权有向图上：Dijkstra（绿色）走 S→A→C→T 最短路权 8；A*（紫色）走 S→B→D→T 同为权 8 但靠 h(n) 启发式扩展更少节点；最大流（暖色加粗边）走 S→E→T，容量 5/3 决定瓶颈为 3。
      </figcaption>
    </figure>
  );
}
