/**
 * <DsvGraphsDiagram>：图结构与遍历图解（dsv-graphs 章）。
 *
 * 左侧：无向图示例（6 顶点 7 边）+ 邻接表表示。
 * 右侧：BFS 与 DFS 的访问顺序对比。
 * 底部总结栏点出两种遍历的区别与选择。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

type Vtx = { x: number; y: number; label: string };
const VERTICES: readonly Vtx[] = [
  { x: 90, y: 110, label: "A" },
  { x: 160, y: 80, label: "B" },
  { x: 60, y: 170, label: "C" },
  { x: 150, y: 180, label: "D" },
  { x: 210, y: 130, label: "E" },
  { x: 220, y: 190, label: "F" },
];
const EDGES: readonly [number, number][] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 3], [3, 5], [4, 5],
];

export function DsvGraphsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="图结构与遍历图解。左侧展示无向图：6 个顶点 A-F，7 条边。下方展示邻接表。右侧展示 BFS 从 A 出发的访问顺序 A,B,C,D,E,F（逐层扩展）和 DFS 从 A 出发的访问顺序 A,B,D,F,E,C（深入到底再回溯）。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            图：结构、存储与遍历
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>
            多对多关系　BFS 逐层扩展　DFS 深入回溯
          </text>

          {/* 分隔线 */}
          <line x1="280" y1="72" x2="280" y2="390" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 图 ===== */}
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={VERTICES[a].x} y1={VERTICES[a].y} x2={VERTICES[b].x} y2={VERTICES[b].y} stroke={border} strokeWidth="1.4" />
          ))}
          {VERTICES.map((v, i) => (
            <g key={i}>
              <circle cx={v.x} cy={v.y} r="16" fill={i === 0 ? accent : "var(--bg-elevated)"} fillOpacity={i === 0 ? "0.12" : "1"} stroke={i === 0 ? accent : border} strokeWidth="1.5" />
              <text x={v.x} y={v.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={i === 0 ? accent : primary}>{v.label}</text>
            </g>
          ))}

          {/* 邻接表 */}
          <text x="48" y="226" fontSize="11" fontWeight="700" fill={secondary}>邻接表</text>
          {[
            "A → B, C",
            "B → A, D, E",
            "C → A, D",
            "D → B, C, F",
            "E → B, F",
            "F → D, E",
          ].map((line, i) => (
            <text key={i} x="48" y={244 + i * 16} fontSize="11" fontFamily="monospace" fill={primary}>{line}</text>
          ))}

          {/* ===== BFS ===== */}
          <rect x="300" y="88" width="380" height="100" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="316" y="108" fontSize="13" fontWeight="700" fill={accent}>BFS 广度优先（队列）</text>
          <text x="316" y="128" fontSize="11" fill={primary}>逐层扩展：先访问所有邻居，再访问邻居的邻居</text>
          <text x="316" y="150" fontSize="11" fontWeight="600" fill={primary}>访问顺序：</text>
          <text x="316" y="170" fontSize="13" fontFamily="monospace" fontWeight="600" fill={accent}>A → B → C → D → E → F</text>

          {/* ===== DFS ===== */}
          <rect x="300" y="204" width="380" height="100" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="316" y="224" fontSize="13" fontWeight="700" fill={success}>DFS 深度优先（栈/递归）</text>
          <text x="316" y="244" fontSize="11" fill={primary}>一条路走到底，回溯换路</text>
          <text x="316" y="266" fontSize="11" fontWeight="600" fill={primary}>访问顺序：</text>
          <text x="316" y="286" fontSize="13" fontFamily="monospace" fontWeight="600" fill={success}>A → B → D → F → E → C</text>

          {/* 底部对比 */}
          <rect x="300" y="320" width="380" height="56" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="490" y="340" textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>BFS vs DFS</text>
          <text x="316" y="358" fontSize="11" fill={primary}>BFS 找无权图最短路径　DFS 适合连通性/拓扑/环检测</text>
          <text x="316" y="372" fontSize="11" fill={secondary}>两者时间复杂度均为 O(V+E)</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        图是多对多关系，用邻接表存储最常用。BFS 逐层扩展适合找最短路径，DFS 深入回溯适合连通性与拓扑。两者时间复杂度都是 O(V+E)。
      </figcaption>
    </figure>
  );
}
