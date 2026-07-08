/**
 * <GdsRayTracingStructDiagram>：光线追踪空间结构：BVH 射线遍历与 GPU 优化
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdsRayTracingStructDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="光线追踪空间结构图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">光线追踪空间结构</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">BVH/KD-Tree 加速射线-场景相交</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">射线遍历 BVH</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">从根节点开始，测试射线与 AABB</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">递归进入相交子树（前向排序）</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">叶节点测试射线与三角形</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">剪枝：当前最近交点裁远子树</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">KD-Tree 遍历</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">空间中分面：轴对齐平面</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">射线斜率分类确定遍历顺序</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">绳索结构跨节点遍历</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">复杂度 O(log n) 平均</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">GPU 优化</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">紧凑 BVH：节点用 32B 对齐</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">MBVH：多分支（4/8 叉）减少分歧</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">队列式遍历 vs 栈式遍历</text>
    <text x="54" y="335" fontSize="11" fill="var(--text-primary)">NVIDIA RTX 硬件加速</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">射线-三角形相交：Moller-Trumbore 算法 O(1)</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">BVH 把 N 个三角形降为 O(log N) 节点访问</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">BVH/KD-Tree 加速射线-场景相交</figcaption>
    </figure>
  );
}
