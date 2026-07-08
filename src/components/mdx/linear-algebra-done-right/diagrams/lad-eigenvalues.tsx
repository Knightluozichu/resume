/**
 * <LadEigenvaluesDiagram>：特征值、特征向量与不变子空间
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function LadEigenvaluesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="特征值与不变子空间图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">特征值与不变子空间</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">不变子空间里映射只做伸缩，特征值是伸缩倍数</text>
    <rect x="40" y="70" width="300" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">不变子空间 U</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">T(U) ⊆ U</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">一维不变子空间 → 特征向量</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">Tv = λv (v ≠ 0)</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">λ 称为特征值</text>
    <rect x="380" y="70" width="300" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="394" y="92" fontSize="12" fontWeight="700" fill="var(--success)">特征多项式</text>
    <text x="394" y="114" fontSize="11" fill="var(--text-primary)">p(z) = det(T - zI)</text>
    <text x="394" y="131" fontSize="11" fill="var(--text-primary)">特征值 = p 的根</text>
    <text x="394" y="148" fontSize="11" fill="var(--text-primary)">代数重数 vs 几何重数</text>
    <text x="394" y="165" fontSize="11" fill="var(--text-primary)">几何重数 ≤ 代数重数</text>
    <rect x="40" y="240" width="640" height="70" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--danger)">特征值存在性</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">复数域上每个算子都有特征值（代数基本定理）</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">实数域未必：旋转 90° 无实特征值</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">可对角化 ⟺ 特征向量凑成基</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">dim 各特征空间之和 = dim V 时算子可对角化</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">不变子空间里映射只做伸缩，特征值是伸缩倍数</figcaption>
    </figure>
  );
}
