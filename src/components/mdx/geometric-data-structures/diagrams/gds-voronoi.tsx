/**
 * <GdsVoronoiDiagram>：Voronoi 图：最近邻区域的空间分割
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdsVoronoiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="Voronoi 图：空间分割图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Voronoi 图：空间分割</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">最近邻区域的几何结构</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">Voronoi 基本概念</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">每个站点 p_i 的区域 = 离 p_i 最近的点集</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">边界 = 到两个站点等距的点（中垂线段）</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">顶点 = 到三个站点等距（外接圆心）</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">Fortune 扫描线 O(n log n)</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">与 Delaunay 对偶</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">Voronoi 顶点 ↔ Delaunay 三角形外心</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">Voronoi 边 ↔ Delaunay 边</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">Voronoi 区域 ↔ Delaunay 星形</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">两者可互相推导</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">应用场景</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">最近邻查询：给定点落在哪个站点区域</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">生物学建模：细胞结构、晶体生长</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">城市规划：设施覆盖范围</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">Voronoi 图把空间按最近邻分割</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Fortune 扫描线用抛物线海滩线实现 O(n log n)</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">最近邻区域的几何结构</figcaption>
    </figure>
  );
}
