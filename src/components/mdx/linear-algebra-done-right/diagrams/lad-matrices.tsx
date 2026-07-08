/**
 * <LadMatricesDiagram>：矩阵作为线性映射的坐标表示与基变更
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function LadMatricesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="矩阵：线性映射的坐标表示图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">矩阵：线性映射的坐标表示</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">选定基后映射变矩阵，基变更即矩阵相似</text>
    <rect x="40" y="70" width="300" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">矩阵 M(T, 基)</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">第 j 列 = T(vj) 在 W 基下的坐标</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">矩阵乘法 = 映射复合的坐标</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">M(ST) = M(S)M(T)</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">可逆 ⟺ 方阵可逆</text>
    <rect x="380" y="70" width="300" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="394" y="92" fontSize="12" fontWeight="700" fill="var(--success)">基变更 / 相似</text>
    <text x="394" y="114" fontSize="11" fill="var(--text-primary)">换基矩阵 P 可逆</text>
    <text x="394" y="131" fontSize="11" fill="var(--text-primary)">M’(T) = P⁻¹ M(T) P</text>
    <text x="394" y="148" fontSize="11" fill="var(--text-primary)">相似矩阵 = 同一映射不同基</text>
    <text x="394" y="165" fontSize="11" fill="var(--text-primary)">特征值在相似下不变</text>
    <rect x="40" y="240" width="640" height="70" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">秩的坐标含义</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">矩阵列秩 = 像的维数 = rank T</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">行秩 = 列秩（秩定理）</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">矩阵是映射的“照片”</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同一映射在不同基下拍出不同但相似的矩阵</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">选定基后映射变矩阵，基变更即矩阵相似</figcaption>
    </figure>
  );
}
