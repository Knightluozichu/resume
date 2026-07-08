/**
 * <CmRecurrentProblemsDiagram>：递归问题：汉诺塔与 Josephus 问题的求解
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CmRecurrentProblemsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="递归问题：汉诺塔与 Josephus图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">递归问题：汉诺塔与 Josephus</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">从递归关系到闭式解的三步法</text>
    <rect x="40" y="70" width="310" height="155" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">汉诺塔 H(n)</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">T(n) = 2T(n-1) + 1</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">展开：T(n) = 2^n - 1</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">三步法：1.猜小例 2.证递归 3.验证闭式</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">n=1:1, n=2:3, n=3:7 → 猜 2^n-1</text>
    <rect x="370" y="70" width="310" height="155" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">Josephus J(n)</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">J(1)=1, J(2n)=2J(n)-1, J(2n+1)=2J(n)+1</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">设 n = 2^m + l（0 ≤ l &lt; 2^m）</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">闭式：J(n) = 2l + 1</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">幸存者位置 = 2*(n-2^⌊lg n⌋)+1</text>
    <rect x="40" y="245" width="640" height="70" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="267" fontSize="12" fontWeight="700" fill="var(--warning)">成套方法（Repertoire Method）</text>
    <text x="54" y="289" fontSize="11" fill="var(--text-primary)">把递归解设为参数线性组合，用已知特例反求参数</text>
    <text x="54" y="306" fontSize="11" fill="var(--text-primary)">f(1)=α, f(2n)=2f(n)+β, f(2n+1)=2f(n)+γ → f(n)=Aα+Bβ+Cγ</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">关键洞察：先猜后证——大胆假设闭式，用数学归纳法验证</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">递归 → 展开 → 识别模式 → 闭式</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">从递归关系到闭式解的三步法</figcaption>
    </figure>
  );
}
