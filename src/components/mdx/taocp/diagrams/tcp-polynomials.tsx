/**
 * <TcpPolynomialsDiagram>：多项式运算概念图（tcp-polynomials 章）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function TcpPolynomialsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="多项式乘法的两种路径。系数直接乘 O(n²) vs FFT 加速 O(n log n)。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            多项式乘法的两种路径
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            系数直接乘 O(n²) vs FFT 加速 O(n log n)
          </text>

          <g>
            <rect x="40" y="100" width="300" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="56" cy="120" r="4" fill="var(--accent)" />
            <text x="68" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">系数表示</text>
            <text x="56" y="148" fontSize="11" fill="var(--text-secondary)">(a₀,a₁,...,aₙ)</text>
            <text x="56" y="166" fontSize="12" fontWeight="600" fill="var(--accent)">乘法 O(n²)</text>
          </g>
          <g>
            <rect x="380" y="100" width="300" height="80" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <circle cx="396" cy="120" r="4" fill="var(--success)" />
            <text x="408" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">点值表示</text>
            <text x="396" y="148" fontSize="11" fill="var(--text-secondary)">(xᵢ,yᵢ) ×n</text>
            <text x="396" y="166" fontSize="12" fontWeight="600" fill="var(--success)">乘法 O(n)</text>
          </g>
          <g>
            <rect x="40" y="210" width="300" height="80" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <circle cx="56" cy="230" r="4" fill="var(--warning)" />
            <text x="68" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">FFT</text>
            <text x="56" y="258" fontSize="11" fill="var(--text-secondary)">单位根对称性</text>
            <text x="56" y="276" fontSize="12" fontWeight="600" fill="var(--warning)">转换 O(n log n)</text>
          </g>
          <g>
            <rect x="380" y="210" width="300" height="80" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <circle cx="396" cy="230" r="4" fill="var(--danger)" />
            <text x="408" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">幂级数</text>
            <text x="396" y="258" fontSize="11" fill="var(--text-secondary)">Σaₙxⁿ</text>
            <text x="396" y="276" fontSize="12" fontWeight="600" fill="var(--danger)">生成函数</text>
          </g>

          <rect x="40" y="340" width={VIEW_W - 80} height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="365" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            系数直接乘 O(n²) vs FFT 加速 O(n log n)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        系数直接乘 O(n²) vs FFT 加速 O(n log n)
      </figcaption>
    </figure>
  );
}
