/**
 * <DsaGraphAlgsDiagram>：图算法核心对比图解（dsa-graph-algs 章）。
 *
 * 左上：图邻接表示意（5 节点带权有向图）。
 * 右上：Dijkstra 最短路径——源点 0 到各点的最短距离。
 * 左下：BFS vs DFS 遍历顺序对比。
 * 右下：拓扑排序——Kahn 算法入度表。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 图节点坐标（左上区域）
const NODES = [
  { id: 0, x: 100, y: 100 },
  { id: 1, x: 160, y: 132 },
  { id: 2, x: 130, y: 170 },
  { id: 3, x: 220, y: 105 },
  { id: 4, x: 230, y: 162 },
];

// 边：<from, to, weight, isShortest?>
const EDGES = [
  { from: 0, to: 1, w: 4, shortest: false },
  { from: 0, to: 3, w: 2, shortest: true },
  { from: 1, to: 2, w: 3, shortest: false },
  { from: 3, to: 4, w: 5, shortest: true },
  { from: 4, to: 1, w: 1, shortest: false },
  { from: 4, to: 2, w: 2, shortest: true },
];

export function DsaGraphAlgsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="图算法核心对比。左上：5节点带权有向图。右上：Dijkstra 从源点 0 出发的最短路径树，0→3(2), 0→3→4(7), 0→3→4→2(9)。左下：BFS 逐层 0,3,1,4,2 vs DFS 一路到底 0,3,4,1,2。右下：拓扑排序 Kahn 入度表。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>图算法：表示 → 遍历 → 最短路径 → 拓扑</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>以 5 节点带权图为例，串联四大核心算法</text>

          <line x1="360" y1="74" x2="360" y2="250" stroke={border} strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="250" x2="680" y2="250" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左上：图结构 ===== */}
          <text x="180" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>带权有向图</text>

          {/* 边 */}
          {EDGES.map((e, i) => {
            const from = NODES[e.from];
            const to = NODES[e.to];
            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2;
            return (
              <g key={i}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={e.shortest ? success : border} strokeWidth={e.shortest ? 2 : 1} strokeOpacity={e.shortest ? 0.6 : 0.4} />
                <text x={mx + 6} y={my - 4} fontSize="11" fill={e.shortest ? success : secondary}>{e.w}</text>
              </g>
            );
          })}

          {/* 节点 */}
          {NODES.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="12" fill={n.id === 0 ? accent : "var(--bg)"} fillOpacity={n.id === 0 ? 0.12 : 0} stroke={n.id === 0 ? accent : border} strokeWidth="1.5" />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fill={n.id === 0 ? accent : primary}>{n.id}</text>
            </g>
          ))}
          <text x="180" y="232" textAnchor="middle" fontSize="11" fill={success}>绿线 = 最短路径树</text>

          {/* ===== 右上：Dijkstra 结果 ===== */}
          <text x="540" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>Dijkstra 最短路径（源=0）</text>

          {[
            { node: 0, dist: 0, path: "0" },
            { node: 3, dist: 2, path: "0→3" },
            { node: 1, dist: 5, path: "0→3→4→1" },
            { node: 4, dist: 7, path: "0→3→4" },
            { node: 2, dist: 9, path: "0→3→4→2" },
          ].map((r, i) => (
            <g key={r.node}>
              <rect x="400" y={104 + i * 26} width="40" height="22" rx="4" fill="var(--bg)" stroke={border} strokeWidth="1" />
              <text x="420" y={119 + i * 26} textAnchor="middle" fontSize="11" fill={accent}>{r.node}</text>
              <text x="452" y={119 + i * 26} fontSize="11" fill={primary}>dist={r.dist}</text>
              <text x="520" y={119 + i * 26} fontSize="11" fill={secondary}>{r.path}</text>
            </g>
          ))}
          <text x="540" y="242" textAnchor="middle" fontSize="11" fill={secondary}>贪心：每次取最小 dist 确定节点</text>

          {/* ===== 左下：BFS vs DFS ===== */}
          <text x="180" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>BFS vs DFS 遍历顺序</text>

          {/* BFS */}
          <text x="70" y="300" fontSize="11" fontWeight="600" fill={accent}>BFS（队列）</text>
          {["0", "3", "1", "4", "2"].map((v, i) => (
            <g key={`bfs-${i}`}>
              <rect x={70 + i * 36} y="310" width="32" height="22" rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
              <text x={86 + i * 36} y={325} textAnchor="middle" fontSize="11" fill={accent}>{v}</text>
              {i < 4 && <text x={102 + i * 36} y={325} fontSize="11" fill={secondary}>→</text>}
            </g>
          ))}
          <text x="70" y="348" fontSize="11" fill={secondary}>逐层扩展：0 → (3,1) → (4) → (2)</text>

          {/* DFS */}
          <text x="70" y="374" fontSize="11" fontWeight="600" fill={success}>DFS（递归栈）</text>
          {["0", "3", "4", "1", "2"].map((v, i) => (
            <g key={`dfs-${i}`}>
              <rect x={70 + i * 36} y="384" width="32" height="22" rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
              <text x={86 + i * 36} y={399} textAnchor="middle" fontSize="11" fill={success}>{v}</text>
              {i < 4 && <text x={102 + i * 36} y={399} fontSize="11" fill={secondary}>→</text>}
            </g>
          ))}
          <text x="70" y="422" fontSize="11" fill={secondary}>一路到底：0→3→4→1→2 回溯</text>

          {/* ===== 右下：拓扑排序 ===== */}
          <text x="540" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>拓扑排序（Kahn 入度法）</text>

          {[
            { step: 1, action: "入度=0 取节点", node: "A" },
            { step: 2, action: "移除A后入度=0", node: "B" },
            { step: 3, action: "移除B后入度=0", node: "C" },
            { step: 4, action: "移除C后入度=0", node: "D" },
          ].map((s, i) => (
            <g key={s.step}>
              <text x="380" y={304 + i * 28} fontSize="11" fill={secondary}>{s.step}.</text>
              <rect x="400" y={290 + i * 28} width="36" height="22" rx="4" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" />
              <text x="418" y={305 + i * 28} textAnchor="middle" fontSize="11" fill={danger}>{s.node}</text>
              <text x="448" y={305 + i * 28} fontSize="11" fill={primary}>{s.action}</text>
            </g>
          ))}
          <text x="540" y="422" textAnchor="middle" fontSize="11" fill={secondary}>DAG 专属：有环则输出数 &lt; 节点数</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四大图算法一图串联：邻接表表示图结构，BFS 逐层遍历求无权最短路径，DFS 一路到底做拓扑排序，Dijkstra 贪心求非负权最短路径。所有算法的基础复杂度均为 O(V+E)。
      </figcaption>
    </figure>
  );
}
