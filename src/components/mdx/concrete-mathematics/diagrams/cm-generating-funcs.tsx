/**
 * <CmGeneratingFuncsDiagram>：生成函数：把序列问题变成代数问题
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CmGeneratingFuncsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="生成函数：序列的代数化身图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">生成函数：序列的代数化身</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">OGF 与 EGF 的运算法则</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">普通生成函数 OGF</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">G(z) = Σ a_n z^n</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">a_n+b_n → G_a+G_b</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">a*b(卷积) → G_a·G_b</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">位移：a_{n+k} → (G - 前 k 项)/z^k</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">指数生成函数 EGF</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">EG(z) = Σ a_n z^n/n!</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">标记对象的乘法 = EGF 乘积</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">排列 → 1/(1-z)，集合 → e^z</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">Catalan：C(z)=(1-√(1-4z))/(2z)</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">解递归的流程</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">1. 递归 → 关于 G(z) 的函数方程</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">2. 解出 G(z) = ...（代数操作）</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">3. 展开 G(z) 的系数 → a_n 闭式</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">生成函数把序列问题变成代数问题——递归变方程，方程变闭式</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">OGF 用于无标号，EGF 用于有标号组合</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">OGF 与 EGF 的运算法则</figcaption>
    </figure>
  );
}
