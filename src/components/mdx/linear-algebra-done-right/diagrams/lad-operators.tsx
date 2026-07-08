/**
 * <LadOperatorsDiagram>：正规/自伴算子与谱定理
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function LadOperatorsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="算子与谱定理图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">算子与谱定理</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">正规算子可被正交对角化——线性代数的高潮</text>
    <rect x="40" y="70" width="300" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">特殊算子</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">自伴：T = T*（实数域=对称）</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">正规：TT* = T*T</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">正算子：T = S*S</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">等距：T*T = I（保长）</text>
    <rect x="380" y="70" width="300" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="394" y="92" fontSize="12" fontWeight="700" fill="var(--success)">谱定理（复）</text>
    <text x="394" y="114" fontSize="11" fill="var(--text-primary)">T 正规 ⟺ 存在正交规范基</text>
    <text x="394" y="131" fontSize="11" fill="var(--text-primary)">  使 T 对角化</text>
    <text x="394" y="148" fontSize="11" fill="var(--text-primary)">即 T = Σ λk ⟨·,ek⟩ek</text>
    <text x="394" y="165" fontSize="11" fill="var(--text-primary)">正规 = 正交可对角化</text>
    <rect x="40" y="240" width="640" height="70" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--danger)">谱定理（实）</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">T 自伴 ⟺ 存在正交规范基使其对角化</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">实谱定理只对自伴算子成立（更强前提）</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">极分解 T = S√(T*T)</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">奇异值 = √(T*T) 的特征值；谱定理支撑 SVD 与主成分分析</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">正规算子可被正交对角化——线性代数的高潮</figcaption>
    </figure>
  );
}
