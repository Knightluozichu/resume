/**
 * <CmNumberTheoryDiagram>：数论：整除、素数与 Euler 函数
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CmNumberTheoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="数论：整除、素数与互素图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">数论：整除、素数与互素</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">从 Euclid 算法到 Euler 函数</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">整除与 GCD</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">gcd(a,b) = gcd(a mod b, b)（Euclid）</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">gcd(a,b)·lcm(a,b) = ab</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">Bezout：∃x,y 使 ax+by=gcd(a,b)</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">互素 gcd(a,b)=1</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">素数与 Euler φ</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">φ(n) = n·∏(1-1/p)，p|n</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">φ 为积性函数</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">Σ_{d|n} φ(d) = n</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">Fermat 小定理：a^p ≡ a mod p</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">同余与中国剩余定理</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">CRT：x ≡ a_i mod m_i（两两互素）→ 唯一解 mod M</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">Wilson：(p-1)! ≡ -1 mod p</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">n! 中素数 p 的幂次 = Σ⌊n/p^k⌋</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">核心工具：Euclid 算法 O(log n) 求 GCD，CRT 把大模数拆成小模数</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数论是密码学与组合数学的基础</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">从 Euclid 算法到 Euler 函数</figcaption>
    </figure>
  );
}
