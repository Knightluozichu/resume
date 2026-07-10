/**
 * <CmBinomialDiagram>：二项式系数的恒等式与生成函数视角
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CmBinomialDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="二项式系数：组合数学的核心图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`二项式系数：组合数学的核心`}</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{`C(n,k) 的恒等式与生成函数视角`}</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">{`基本定义与恒等式`}</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">{`C(n,k) = n!/(k!(n-k)!) = n^k_/k!`}</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">{`Pascal：C(n,k)=C(n-1,k)+C(n-1,k-1)`}</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">{`对称：C(n,k)=C(n,n-k)`}</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">{`范德蒙：ΣC(r,k)C(s,n-k)=C(r+s,n)`}</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">{`上指标反转与吸收`}</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">{`C(-r,k) = (-1)^k C(r+k-1,k)`}</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">{`吸收：k·C(n,k) = n·C(n-1,k-1)`}</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">{`上指标反转打开负参数之门`}</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">{`Σ_{k≤n} C(r+k,k) = C(r+n+1,n)`}</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">{`生成函数与求和`}</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">{`(1+z)^r = Σ C(r,k) z^k（二项式定理）`}</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">{`Σ_{k=0}^{n} C(n,k) = 2^n`}</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">{`Σ_{k=0}^{n} C(n,k)^2 = C(2n,n)`}</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">{`二项式系数是连接组合、递归与生成函数的桥梁`}</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`广义到负/实数上指标后威力倍增`}</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">C(n,k) 的恒等式与生成函数视角</figcaption>
    </figure>
  );
}
