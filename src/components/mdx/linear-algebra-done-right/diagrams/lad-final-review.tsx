/**
 * <LadFinalReviewDiagram>：全书总复习：一条主线与三大定理
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function LadFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="线性代数应该这样学 · 总复习图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">线性代数应该这样学 · 总复习</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">一条主线：用算子与不变子空间理解线性结构</text>
    <rect x="40" y="70" width="300" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">四大工具链</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">空间→映射→矩阵→特征值</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">内积→正交→谱定理</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">行列式/迹放最后</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">复化统一实与复</text>
    <rect x="380" y="70" width="300" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="394" y="92" fontSize="12" fontWeight="700" fill="var(--success)">三大定理</text>
    <text x="394" y="114" fontSize="11" fill="var(--text-primary)">秩-零度：dim V = null T + rank T</text>
    <text x="394" y="131" fontSize="11" fill="var(--text-primary)">谱定理：正规↔正交对角化</text>
    <text x="394" y="148" fontSize="11" fill="var(--text-primary)">det/trace：特征值之和与积</text>
    <rect x="40" y="240" width="640" height="70" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">Axler 哲学</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">行列式先行会掩盖结构；先讲算子与不变子空间，几何更清晰</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">可对角化靠特征向量凑基，而非算行列式</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">学习成果自检</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能从向量空间一路推到谱定理，并能解释为何 det 放最后</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">一条主线：用算子与不变子空间理解线性结构</figcaption>
    </figure>
  );
}
