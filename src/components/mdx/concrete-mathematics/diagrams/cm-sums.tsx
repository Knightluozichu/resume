/**
 * <CmSumsDiagram>：求和：从记号到闭式的运算法则
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CmSumsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="求和：从记号到闭式图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`求和：从记号到闭式`}</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{`求和的运算法则与扰动法`}</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">{`基本法则`}</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">{`分配律：Σc·a_k = c·Σa_k`}</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">{`结合律：Σ(a_k+b_k) = Σa_k + Σb_k`}</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">{`交换律：可交换求和顺序`}</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">{`求和与积分平行对应`}</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">{`扰动法（Perturbation）`}</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">{`S_n = a_0 + ... + a_n`}</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">{`S_n + a_{n+1} = a_0 + Σ_{k=1}^{n+1} a_k`}</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">{`右端移项令 k→k+1 消去 a_0`}</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">{`解出 S_n 的递推 → 闭式`}</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">{`经典结果`}</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">{`Σ_{k=0}^{n} k = n(n+1)/2`}</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">{`Σ_{k=0}^{n} k^2 = n(n+1)(2n+1)/6`}</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">{`Σ_{k=0}^{n} k^3 = (n(n+1)/2)^2 = (Σk)^2`}</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">{`有限微积分：差分 Δf(x)=f(x+1)-f(x) 对应求和，类比微分对应积分`}</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`∑_{0≤k&lt;n} k^m 可用下降幂表示`}</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">求和的运算法则与扰动法</figcaption>
    </figure>
  );
}
