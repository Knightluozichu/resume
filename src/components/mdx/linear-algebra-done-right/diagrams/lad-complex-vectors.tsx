/**
 * <LadComplexVectorsDiagram>：实算子的复化与复算子
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function LadComplexVectorsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="实算子的复化与复算子图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">实算子的复化与复算子</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">用复数给实空间“补齐”特征值</text>
    <rect x="40" y="70" width="300" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">复化 V_C</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">V_C = V + iV（形式上加 i）</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">实算子 T 扩张为 T_C</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">T_C 的特征值成共轭对</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">实空间无特征值→复化后有</text>
    <rect x="380" y="70" width="300" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="394" y="92" fontSize="12" fontWeight="700" fill="var(--success)">实谱定理的复化证明</text>
    <text x="394" y="114" fontSize="11" fill="var(--text-primary)">先在复化上用复谱定理</text>
    <text x="394" y="131" fontSize="11" fill="var(--text-primary)">共轭对对应二维不变子空间</text>
    <text x="394" y="148" fontSize="11" fill="var(--text-primary)">实空间上表现为旋转+伸缩块</text>
    <text x="394" y="165" fontSize="11" fill="var(--text-primary)">推出实自伴算子可对角化</text>
    <rect x="40" y="240" width="640" height="70" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--danger)">复 vs 实</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">复：正规算子正交可对角化</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">实：自伴算子正交可对角化（正规未必，如旋转）</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">复化是桥梁</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">把实数域的“缺口”用复数补上，再回流证明实谱定理</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">用复数给实空间“补齐”特征值</figcaption>
    </figure>
  );
}
