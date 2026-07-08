/**
 * <LadLinearMapsDiagram>：线性映射的核、像与秩-零度定理
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function LadLinearMapsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="线性映射：核、像与秩-零度定理图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">线性映射：核、像与秩-零度定理</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">线性映射保持加法与标量乘，核衡量“塌缩”，像衡量“到达”</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">线性映射 T: V → W</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">T(u+v) = Tu + Tv</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">T(λv) = λTv</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">核 null T = {v : Tv = 0}</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">像 range T = {Tv : v ∈ V}</text>
    <rect x="380" y="70" width="300" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="394" y="92" fontSize="12" fontWeight="700" fill="var(--success)">单射 / 满射判据</text>
    <text x="394" y="114" fontSize="11" fill="var(--text-primary)">T 单射 ⟺ null T = {0}</text>
    <text x="394" y="131" fontSize="11" fill="var(--text-primary)">T 满射 ⟺ range T = W</text>
    <text x="394" y="148" fontSize="11" fill="var(--text-primary)">rank T = dim range T</text>
    <text x="394" y="165" fontSize="11" fill="var(--text-primary)">nullity T = dim null T</text>
    <rect x="40" y="240" width="640" height="70" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--danger)">秩-零度定理（核心）</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">dim V = null T + rank T</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">塌缩掉的维数 + 到达的维数 = 出发维数</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">L(V, W) 是向量空间</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">dim L(V,W) = (dim V)(dim W)；可逆映射要求维数相同且核为零</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">线性映射保持加法与标量乘，核衡量“塌缩”，像衡量“到达”</figcaption>
    </figure>
  );
}
