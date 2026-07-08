/**
 * <CmDiscreteProbDiagram>：离散概率：PGF 与矩分析
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CmDiscreteProbDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="离散概率：均值、方差与生成函数图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">离散概率：均值、方差与生成函数</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">用 PGF 分析随机变量</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">基本概念</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">E[X] = Σ x·Pr(X=x)</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">V[X] = E[X²] - E[X]²</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">E[aX+b] = aE[X]+b</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">独立：V[X+Y]=V[X]+V[Y]</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">概率生成函数 PGF</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">G_X(z) = Σ Pr(X=k) z^k</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">E[X] = G'_X(1), V[X]=G''(1)+G'(1)-G'(1)²</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">独立和：G_{X+Y} = G_X · G_Y</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">硬币 PGF：(q+pz)^n</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">应用场景</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">生日问题：碰撞期望 ≈ √(πn/2)</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">散列分析：探查次数与装载因子</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">随机排列的逆序数期望 = C(n,2)/2</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">PGF 是概率论的瑞士军刀——导数给矩，乘积给独立和</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">离散概率 = 组合数学 + 生成函数</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">用 PGF 分析随机变量</figcaption>
    </figure>
  );
}
