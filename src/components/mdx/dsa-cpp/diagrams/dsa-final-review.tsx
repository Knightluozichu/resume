/**
 * <DsaFinalReviewDiagram>：全书知识串联图（dsa-final-review 章）。
 *
 * 四列对应四大板块，每列列出核心知识点和复杂度。
 * 中间箭头展示知识间的依赖关系。
 * 底部：工程选型决策流程。
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

const COLUMNS = [
  {
    title: "基础",
    color: accent,
    x: 60,
    items: [
      { name: "大O记号", detail: "O(1)→O(n)→O(n²)" },
      { name: "均摊分析", detail: "vector 扩容" },
      { name: "主定理", detail: "T(n)=aT(n/b)+f(n)" },
      { name: "对数器", detail: "验证正确性" },
    ],
  },
  {
    title: "数据结构",
    color: success,
    x: 230,
    items: [
      { name: "vector/list", detail: "O(1)索引 vs O(1)插入" },
      { name: "BST/AVL", detail: "O(log n) 三件套" },
      { name: "B树/B+树", detail: "磁盘 I/O 优化" },
      { name: "红黑树", detail: "std::map 底层" },
    ],
  },
  {
    title: "散列与图",
    color: warning,
    x: 400,
    items: [
      { name: "散列表", detail: "O(1) 均摊查找" },
      { name: "并查集", detail: "O(α(n)) ≈ O(1)" },
      { name: "Dijkstra", detail: "O((V+E)log V)" },
      { name: "拓扑排序", detail: "DAG 线性化" },
    ],
  },
  {
    title: "算法设计",
    color: danger,
    x: 570,
    items: [
      { name: "内省排序", detail: "快+堆+插入" },
      { name: "归并排序", detail: "稳定 O(nlogn)" },
      { name: "动态规划", detail: "状态+转移方程" },
      { name: "贪心", detail: "局部最优→全局" },
    ],
  },
];

export function DsaFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="全书知识串联图。四大板块从左到右：基础（大O记号、均摊分析、主定理）→ 数据结构（vector/list、BST/AVL、B树、红黑树）→ 散列与图（散列表、并查集、Dijkstra、拓扑排序）→ 算法设计（内省排序、归并、动态规划、贪心）。板块间有依赖箭头。底部工程选型决策流程。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>全书知识串联：从分析到设计</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>四大板块层层递进，数据结构是算法的基础</text>

          {/* 板块间依赖箭头 */}
          <path d="M 220 130 L 230 130" stroke={border} strokeWidth="1.5" markerEnd="url(#arrowFinal)" />
          <path d="M 390 130 L 400 130" stroke={border} strokeWidth="1.5" markerEnd="url(#arrowFinal)" />
          <path d="M 560 130 L 570 130" stroke={border} strokeWidth="1.5" markerEnd="url(#arrowFinal)" />

          {/* 四列 */}
          {COLUMNS.map((col) => (
            <g key={col.title}>
              {/* 列标题 */}
              <rect x={col.x} y="100" width="150" height="28" rx="6" fill={col.color} fillOpacity="0.1" stroke={col.color} strokeWidth="1.5" />
              <text x={col.x + 75} y="119" textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>{col.title}</text>

              {/* 知识点 */}
              {col.items.map((item, i) => (
                <g key={item.name}>
                  <rect x={col.x} y={140 + i * 40} width="150" height="34" rx="5" fill={col.color} fillOpacity="0.04" stroke={col.color} strokeWidth="1" strokeOpacity="0.3" />
                  <text x={col.x + 12} y={156 + i * 40} fontSize="11" fontWeight="600" fill={primary}>{item.name}</text>
                  <text x={col.x + 12} y={169 + i * 40} fontSize="11" fill={secondary}>{item.detail}</text>
                </g>
              ))}
            </g>
          ))}

          {/* ===== 底部：选型决策流程 ===== */}
          <line x1="40" y1="320" x2="680" y2="320" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          <text x={VIEW_W / 2} y="342" textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>工程选型决策流程</text>

          {/* 决策路径 */}
          {[
            { q: "精确查找?", x: 60, y: 362, yes: "散列表 O(1)", no: "→" },
            { q: "有序遍历?", x: 220, y: 362, yes: "平衡树 O(logn)", no: "→" },
            { q: "最短路径?", x: 380, y: 362, yes: "Dijkstra/BFS", no: "→" },
            { q: "最优解?", x: 540, y: 362, yes: "DP/贪心", no: "回溯" },
          ].map((d, i) => (
            <g key={i}>
              <rect x={d.x} y={d.y} width="140" height="40" rx="6" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
              <text x={d.x + 70} y={d.y + 16} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>{d.q}</text>
              <text x={d.x + 70} y={d.y + 31} textAnchor="middle" fontSize="11" fill={primary}>{d.yes}</text>
              {i < 3 && <text x={d.x + 148} y={d.y + 24} fontSize="12" fill={secondary}>{d.no}</text>}
            </g>
          ))}

          {/* 底部总结 */}
          <rect x="40" y="416" width={VIEW_W - 80} height="28" rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="434" textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>选型 = 时间 + 空间 + 正确性 + 复杂度的多维权衡</text>

          <defs>
            <marker id="arrowFinal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={border} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书四大板块构成完整体系：复杂度分析是评估工具，数据结构是存储基础，散列与图是高级结构，算法设计是求解策略。工程选型不是选「最快」的，而是选「最合适」的。
      </figcaption>
    </figure>
  );
}
