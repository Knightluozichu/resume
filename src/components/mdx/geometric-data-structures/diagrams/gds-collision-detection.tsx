/**
 * <GdsCollisionDetectionDiagram>：碰撞检测：宽相与窄相两阶段加速
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdsCollisionDetectionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="碰撞检测：从宽相到窄相图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">碰撞检测：从宽相到窄相</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">两阶段加速：AABB 剔除 + SAT/GJK 精确检测</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">宽相（Broad Phase）</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">AABB 重叠测试：快速剔除不可能碰撞对</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">空间分区辅助：网格/树只查近邻</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">扫描剪枝：按轴排序 + 区间重叠</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">输出候选碰撞对</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">窄相（Narrow Phase）</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">SAT：分离轴定理（凸多边形）</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">GJK：基于 Minkowski 差</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">EPA：穿透深度计算</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">球/胶囊体特殊优化</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">性能优化</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">时间一致性：帧间位移小 → 增量更新</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">休眠对象跳过检测</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">多层 BVH：粗 AABB → 精三角形</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">SAT 核心原理：两个凸体不碰撞 ⟺ 存在一条分离轴</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">GJK 把碰撞检测变成 Minkowski 差是否含原点的问题</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">两阶段加速：AABB 剔除 + SAT/GJK 精确检测</figcaption>
    </figure>
  );
}
