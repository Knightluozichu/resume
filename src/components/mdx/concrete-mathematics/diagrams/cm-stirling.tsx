/**
 * <CmStirlingDiagram>：Stirling 数：普通幂与阶乘幂的转换桥梁
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CmStirlingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="Stirling 数：两类转换图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Stirling 数：两类转换</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">第一类（排列）与第二类（划分）</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">第二类 S(n,k)</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">把 n 元素分入 k 个非空无标盒</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">S(n,k)=S(n-1,k-1)+k·S(n-1,k)</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">S(n,1)=S(n,n)=1, S(0,0)=1</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">Σ_k S(n,k) = Bell 数 B_n</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">第一类 s(n,k)</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">n 元素排成 k 个轮换</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">s(n,k)=s(n-1,k-1)+(n-1)·s(n-1,k)</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">|s(n,k)| = 排列中 k 轮换数</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">x^n_ = Σ s(n,k) x^k</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">互逆关系</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">普通幂 ↔ 下降幂：x^n = Σ S(n,k) x^k_</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">x^n_ = Σ s(n,k) x^k</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">两类 Stirling 矩阵互逆</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">Stirling 数在普通幂与阶乘幂之间架起桥梁</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">下降幂 x^n_ = x(x-1)...(x-n+1) 是组合的自然语言</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">第一类（排列）与第二类（划分）</figcaption>
    </figure>
  );
}
