/**
 * <MglEquationsDiagram>：方程求解与韦达定理图解（mgl-equations 章）。
 *
 * 左侧：二次方程的图像与判别式三种情况。
 * 右侧：韦达定理示意 + 高次方程可解性。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function MglEquationsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="方程求解图解。左侧展示二次方程 y=x²-5x+6 的抛物线，标注两根 x=2 和 x=3，以及韦达定理 x₁+x₂=5, x₁·x₂=6。右侧展示判别式三种情况：Δ>0 两实根、Δ=0 重根、Δ<0 复根。底部展示方程次数与可解性：1-4次有公式，5次及以上无通用公式。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>方程求解与韦达定理</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>根与系数的深层联系</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：抛物线 + 韦达 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>y = x² - 5x + 6</text>

          {/* 简化抛物线 */}
          <path d="M 80 180 Q 180 280 180 180" fill="none" stroke={accent} strokeWidth="2" />
          <path d="M 180 180 Q 180 280 280 180" fill="none" stroke={accent} strokeWidth="2" />

          {/* x 轴 */}
          <line x1="60" y1="180" x2="300" y2="180" stroke={border} strokeWidth="1" />
          {/* y 轴 */}
          <line x1="180" y1="100" x2="180" y2="240" stroke={border} strokeWidth="1" />

          {/* 根 */}
          <circle cx="120" cy="180" r="4" fill={success} />
          <text x="120" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill={success}>x₁=2</text>
          <circle cx="240" cy="180" r="4" fill={success} />
          <text x="240" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill={success}>x₂=3</text>

          {/* 韦达定理 */}
          <rect x="60" y="220" width="240" height="60" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="180" y="240" textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>韦达定理</text>
          <text x="180" y="260" textAnchor="middle" fontSize="12" fontFamily="monospace" fill={primary}>x₁ + x₂ = 5 = -b/a</text>
          <text x="180" y="276" textAnchor="middle" fontSize="12" fontFamily="monospace" fill={primary}>x₁ · x₂ = 6 = c/a</text>

          {/* ===== 右侧：判别式 + 可解性 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>判别式 Δ = b²-4ac</text>

          <rect x="360" y="104" width="312" height="36" rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="127" fontSize="11" fill={primary}>Δ &gt; 0：两个不同实根</text>

          <rect x="360" y="148" width="312" height="36" rx="6" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="171" fontSize="11" fill={primary}>Δ = 0：一个重根（抛物线切 x 轴）</text>

          <rect x="360" y="192" width="312" height="36" rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="215" fontSize="11" fill={primary}>Δ &lt; 0：两个共轭复根（不与 x 轴相交）</text>

          {/* 可解性 */}
          <rect x="360" y="244" width="312" height="128" rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1" strokeOpacity="0.3" />
          <text x="376" y="264" fontSize="12" fontWeight="700" fill={danger}>方程可解性</text>
          <text x="376" y="286" fontSize="11" fill={success}>1次：x = -b/a ✓</text>
          <text x="376" y="304" fontSize="11" fill={success}>2次：求根公式 ✓</text>
          <text x="376" y="322" fontSize="11" fill={success}>3次：卡尔丹诺公式 ✓</text>
          <text x="376" y="340" fontSize="11" fill={success}>4次：费拉里公式 ✓</text>
          <text x="376" y="358" fontSize="11" fontWeight="600" fill={danger}>5次+：无通用公式（阿贝尔-鲁菲尼）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        韦达定理揭示了根与系数的深层联系，无需解方程即可知道根的对称性质。1-4 次方程有求根公式，5 次及以上没有——这是伽罗瓦理论的深刻结论。
      </figcaption>
    </figure>
  );
}
