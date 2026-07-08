/**
 * <LadInnerProductDiagram>：内积、范数、正交与投影
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function LadInnerProductDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="内积空间：长度、正交与投影图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">内积空间：长度、正交与投影</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">内积把“角度”与“长度”引入向量空间</text>
    <rect x="40" y="70" width="300" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">内积与范数</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">⟨u,v⟩ = ⟨v,u⟩ 的共轭</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">范数 ‖v‖ = √⟨v,v⟩</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">柯西-施瓦茨：|⟨u,v⟩| ≤ ‖u‖‖v‖</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">勾股定理：正交则 ‖u+v‖²=‖u‖²+‖v‖²</text>
    <rect x="380" y="70" width="300" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="394" y="92" fontSize="12" fontWeight="700" fill="var(--success)">Gram-Schmidt 正交化</text>
    <text x="394" y="114" fontSize="11" fill="var(--text-primary)">把任意基变成正交规范基</text>
    <text x="394" y="131" fontSize="11" fill="var(--text-primary)">e_k = (v_k - 投影) / 长度</text>
    <text x="394" y="148" fontSize="11" fill="var(--text-primary)">标准正交基下内积=点积</text>
    <text x="394" y="165" fontSize="11" fill="var(--text-primary)">正交补 U⊥</text>
    <rect x="40" y="240" width="640" height="70" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">最佳逼近</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">v 到 U 的最佳逼近 = v 在 U 上的正交投影 Pu</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">‖v - Pu‖ 最小，残差正交于 U</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">内积 = 几何的回归</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">有了内积才能谈正交、投影、最小二乘与谱定理</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">内积把“角度”与“长度”引入向量空间</figcaption>
    </figure>
  );
}
