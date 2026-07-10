/**
 * <CmIntegerFunctionsDiagram>：取整与取模函数的性质及应用
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CmIntegerFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="整函数：取整与取模图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`整函数：取整与取模`}</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{`⌊x⌋ 与 ⌈x⌉ 的性质及应用`}</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">{`基本性质`}</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">{`⌊x⌋ ≤ x &lt; ⌊x⌋+1`}</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">{`⌈x⌉-1 &lt; x ≤ ⌈x⌉`}</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">{`⌊x+n⌋ = ⌊x⌋+n（n 为整数）`}</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">{`⌊x⌋+⌊y⌋ ≤ ⌊x+y⌋ ≤ ⌊x⌋+⌊y⌋+1`}</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">{`取模与谱`}</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">{`x mod y = x - y⌊x/y⌋`}</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">{`谱 {⌊nα⌋ : n≥1} 的 Beatty 定理`}</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">{`α,β 无理且 1/α+1/β=1 → 谱互补`}</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">{`素数计数 π(n) ≈ ⌊n/ln n⌋`}</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">{`关键恒等式`}</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">{`⌊x/m⌋ = ⌊⌊x⌋/m⌋（m 为正整数）`}</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">{`Σ_{k≥1} ⌊n/p^k⌋ = n! 中 p 的幂次`}</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">{`⌈(n-1)/d⌉ = ⌊n/d⌋ 的变形技巧`}</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">{`Hermite 恒等式：⌊x⌋+⌊x+1/n⌋+...+⌊x+(n-1)/n⌋ = ⌊nx⌋`}</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`取整函数把连续量离散化的核心工具`}</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">⌊x⌋ 与 ⌈x⌉ 的性质及应用</figcaption>
    </figure>
  );
}
