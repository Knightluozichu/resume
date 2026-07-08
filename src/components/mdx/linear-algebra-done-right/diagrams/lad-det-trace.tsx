/**
 * <LadDetTraceDiagram>：行列式与迹作为全局不变量
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function LadDetTraceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="行列式与迹图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">行列式与迹</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Axler 把它们放最后：行列式=体积，迹=对角和</text>
    <rect x="40" y="70" width="300" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">行列式</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">det T = (-1)^N × 体积缩放因子</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">det(ST) = det S · det T</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">可逆 ⟺ det ≠ 0</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">det = 特征值之积</text>
    <rect x="380" y="70" width="300" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="394" y="92" fontSize="12" fontWeight="700" fill="var(--success)">迹</text>
    <text x="394" y="114" fontSize="11" fill="var(--text-primary)">trace T = 对角元之和</text>
    <text x="394" y="131" fontSize="11" fill="var(--text-primary)">trace(ST) = trace(TS)</text>
    <text x="394" y="148" fontSize="11" fill="var(--text-primary)">trace = 特征值之和</text>
    <text x="394" y="165" fontSize="11" fill="var(--text-primary)">与基无关</text>
    <rect x="40" y="240" width="640" height="70" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">特征多项式再读</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">p(z) = z^n - (tr T)z^{n-1} + ... + (-1)^n det T</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">系数由主子式决定（Vieta）</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">迹与行列式是全局不变量</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">它们汇总全部特征值，但 Axler 强调：理解算子要靠结构而非算 det</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">Axler 把它们放最后：行列式=体积，迹=对角和</figcaption>
    </figure>
  );
}
