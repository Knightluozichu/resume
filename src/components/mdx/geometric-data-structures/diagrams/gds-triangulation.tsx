/**
 * <GdsTriangulationDiagram>：Delaunay 三角剖分与约束三角剖分
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdsTriangulationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="三角剖分：Delaunay 与约束图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">三角剖分：Delaunay 与约束</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">点集的三角形化与质量优化</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">Delaunay 三角剖分</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">空圆性质：每个三角形外接圆内无其他点</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">最大化最小角 → 避免瘦长三角形</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">增量插入法 O(n log n)</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">与 Voronoi 对偶</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">构建算法</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">Bowyer-Watson：逐点插入 + 翻转</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">分治法：左右递归 + 合并</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">约束三角剖分（CDT）：保留指定边</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">用于地形网格、有限元</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">质量指标</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">最小角越大越好（Delaunay 最优）</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">面积分布均匀</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">边长方差小</text>
    <text x="54" y="335" fontSize="11" fill="var(--text-primary)">避免退化（共线点）</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">Delaunay 三角剖分是 Voronoi 图的对偶</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">空圆性质保证局部最优——每个外接圆是空的</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">点集的三角形化与质量优化</figcaption>
    </figure>
  );
}
