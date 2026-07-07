/**
 * <CtrAlgorithmTestDiagram>：排序复杂度表与 BFS/DFS 对照。
 *
 * 上半：六种排序算法的平均/最坏时间、空间、稳定性表格。
 * 下半：BFS（队列·按层）与 DFS（栈/递归·纵深）的适用场景对照。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×540，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 540;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

interface SortRow {
  name: string;
  avg: string;
  worst: string;
  stable: boolean;
}

const SORTS: readonly SortRow[] = [
  { name: "冒泡", avg: "O(n²)", worst: "O(n²)", stable: true },
  { name: "选择", avg: "O(n²)", worst: "O(n²)", stable: false },
  { name: "插入", avg: "O(n²)", worst: "O(n²)", stable: true },
  { name: "归并", avg: "O(n log n)", worst: "O(n log n)", stable: true },
  { name: "快排", avg: "O(n log n)", worst: "O(n²)", stable: false },
  { name: "堆排", avg: "O(n log n)", worst: "O(n log n)", stable: false },
];

const COLS = [
  { label: "算法", x: 110 },
  { label: "平均", x: 270 },
  { label: "最坏", x: 410 },
  { label: "稳定", x: 560 },
];

const TABLE_Y = 84;
const ROW_H = 30;

export function CtrAlgorithmTestDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="排序复杂度表与 BFS/DFS 对照。上半六种排序算法复杂度表：冒泡/选择/插入平均最坏均为 O(n²)，归并/快排/堆排平均 O(n log n)，快排最坏 O(n²)，冒泡/插入/归并稳定，选择/快排/堆排不稳定。下半 BFS 用队列按层扩展适合无权最短路径，DFS 用栈或递归纵深回溯适合连通性拓扑排序回溯搜索。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            排序复杂度与 BFS/DFS
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            选对算法复杂度 · 按数据结构选遍历策略
          </text>

          {/* 排序表 */}
          <g>
            {/* 表头 */}
            <rect x={40} y={TABLE_Y} width={640} height={30} rx="8" fill="var(--accent)" fillOpacity="0.14" />
            {COLS.map((c) => (
              <text key={c.label} x={c.x} y={TABLE_Y + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{c.label}</text>
            ))}
            {SORTS.map((s, i) => {
              const y = TABLE_Y + 38 + i * ROW_H;
              const isFast = s.avg.includes("log");
              return (
                <g key={s.name}>
                  <rect x={40} y={y} width={640} height={ROW_H - 4} rx="6" fill={isFast ? "var(--success)" : "var(--warning)"} fillOpacity="0.05" stroke={border} strokeWidth="1" />
                  <text x={110} y={y + 19} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={primary}>{s.name}</text>
                  <text x={270} y={y + 19} textAnchor="middle" fontSize="11.5" fill={secondary} fontFamily="monospace">{s.avg}</text>
                  <text x={410} y={y + 19} textAnchor="middle" fontSize="11.5" fill={s.worst.includes("n²") ? "var(--danger)" : secondary} fontFamily="monospace">{s.worst}</text>
                  <text x={560} y={y + 19} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={s.stable ? "var(--success)" : "var(--danger)"}>{s.stable ? "是" : "否"}</text>
                </g>
              );
            })}
          </g>

          {/* 分隔线 */}
          <line x1={32} y1={310} x2={VIEW_W - 32} y2={310} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={334} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            图遍历：BFS vs DFS
          </text>

          {/* BFS 面板 */}
          <g>
            <rect x={48} y={352} width={300} height={150} rx="10" fill={elevated} stroke="var(--accent)" strokeWidth="1.6" strokeOpacity="0.5" />
            <rect x={48} y={352} width={300} height={32} rx="10" fill="var(--accent)" fillOpacity="0.14" />
            <rect x={48} y={374} width={300} height={10} fill="var(--accent)" fillOpacity="0.14" />
            <text x={198} y={373} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">BFS · 队列 FIFO</text>
            <text x={68} y={404} textAnchor="start" fontSize="11.5" fontWeight="700" fill={primary} fontFamily="monospace">数据结构：queue</text>
            <text x={68} y={426} textAnchor="start" fontSize="11" fill={secondary}>逐层扩展·按距离递增</text>
            <text x={68} y={448} textAnchor="start" fontSize="11" fill={secondary}>适合：无权最短路径</text>
            <text x={68} y={470} textAnchor="start" fontSize="11" fill={secondary}>层序遍历·二分图判断</text>
            <text x={68} y={492} textAnchor="start" fontSize="11" fontWeight="600" fill="var(--accent)">O(V+E)</text>
          </g>

          {/* DFS 面板 */}
          <g>
            <rect x={372} y={352} width={300} height={150} rx="10" fill={elevated} stroke="var(--success)" strokeWidth="1.6" strokeOpacity="0.5" />
            <rect x={372} y={352} width={300} height={32} rx="10" fill="var(--success)" fillOpacity="0.14" />
            <rect x={372} y={374} width={300} height={10} fill="var(--success)" fillOpacity="0.14" />
            <text x={522} y={373} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">DFS · 栈/递归 LIFO</text>
            <text x={392} y={404} textAnchor="start" fontSize="11.5" fontWeight="700" fill={primary} fontFamily="monospace">数据结构：stack/递归</text>
            <text x={392} y={426} textAnchor="start" fontSize="11" fill={secondary}>一条路走到底再回溯</text>
            <text x={392} y={448} textAnchor="start" fontSize="11" fill={secondary}>适合：连通性·拓扑排序</text>
            <text x={392} y={470} textAnchor="start" fontSize="11" fill={secondary}>找环·回溯搜索全解</text>
            <text x={392} y={492} textAnchor="start" fontSize="11" fontWeight="600" fill="var(--success)">O(V+E)</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        六种排序复杂度对照（快排最坏 O(n²) 需随机化 pivot）；BFS 用队列按层求无权最短路径，DFS 用栈/递归回溯求连通与全解。
      </figcaption>
    </figure>
  );
}
