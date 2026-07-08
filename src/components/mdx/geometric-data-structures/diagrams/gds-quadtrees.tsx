/**
 * <GdsQuadtreesDiagram>：四叉树：二维空间递归分割与查询
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdsQuadtreesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="四叉树：二维空间递归分割图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">四叉树：二维空间递归分割</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">自适应网格与空间查询加速</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">四叉树结构</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">每个节点分 4 个象限（NE/NW/SE/SW）</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">叶节点存少量对象（如 ≤4）</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">递归细分直到满足终止条件</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">八叉树 = 四叉树的 3D 推广</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">空间查询</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">范围查询：递归进入相交象限</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">最近邻：优先队列 + 剪枝</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">插入/删除 O(log n)</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">区域统计 O(log n + k)</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">优缺点</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">优点：自适应密度、实现简单、直观</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">缺点：树深不稳定（聚集数据）、缓存局部性差</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">适用：2D 碰撞、地形 LOD、图像压缩</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">四叉树把 O(n) 的暴力查询降为 O(log n) + k（k 为结果数）</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">八叉树是其 3D 推广，每个节点分 8 个卦限</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">自适应网格与空间查询加速</figcaption>
    </figure>
  );
}
