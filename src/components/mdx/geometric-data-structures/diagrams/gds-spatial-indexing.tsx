/**
 * <GdsSpatialIndexingDiagram>：空间索引：网格、哈希与 R-Tree 对比
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdsSpatialIndexingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="空间索引：网格、哈希与 R-Tree图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">空间索引：网格、哈希与 R-Tree</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">从均匀网格到层次 R-Tree 的空间查询加速</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">均匀网格</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">空间分等大格子，每格存对象列表</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">查询 O(1) 定位格子 + O(k) 遍历</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">优点：简单、快速</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">缺点：密度不均时退化</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">空间哈希</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">hash(cell_x,cell_y,cell_z) → 桶</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">稀疏场景内存友好</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">邻居查询需检查 3^d 个格子</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">游戏引擎常用（如 Unity）</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">R-Tree</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">层次 MBR（最小外接矩形）</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">节点存多个 MBR 条目</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">插入用最小面积增长策略</text>
    <text x="54" y="335" fontSize="11" fill="var(--text-primary)">范围查询 O(log n + k)，GIS 领域标准</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">空间索引选择：均匀 → 网格，稀疏 → 哈希，复杂 → R-Tree/BVH</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">没有万能结构，只有场景最优</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">从均匀网格到层次 R-Tree 的空间查询加速</figcaption>
    </figure>
  );
}
