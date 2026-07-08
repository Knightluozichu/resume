/**
 * <GdsBvhDiagram>：BVH：层次包围盒的构建与射线遍历
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdsBvhDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="BVH：层次包围盒图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">BVH：层次包围盒</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">光线追踪与碰撞检测的核心加速结构</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">BVH 构建</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">自顶向下：选最长轴 → 按质心排序 → 中位数分裂</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">自底向上：逐步合并最近节点</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">SAH（表面积启发）：最小化射线相交代价</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">叶节点存三角形（如 ≤4）</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">BVH 遍历</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">射线遍历：先测子节点 AABB</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">前向排序：近的子树先访问</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">剪枝：远子树被近子树结果裁掉</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">复杂度 O(log n) 每射线</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">与 KD-Tree 对比</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">BVH：对象分割，构建快，动态更新友好</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">KD-Tree：空间分割，查询快，构建慢</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">现代光线追踪首选 BVH（GPU 友好）</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">SAH 公式：cost = C_trav + P_left·cost_left + P_right·cost_right</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">P 用 AABB 表面积/总表面积估计射线命中概率</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">光线追踪与碰撞检测的核心加速结构</figcaption>
    </figure>
  );
}
