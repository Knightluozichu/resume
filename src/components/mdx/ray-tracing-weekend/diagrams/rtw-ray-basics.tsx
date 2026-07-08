/**
 * <RtwRayBasicsDiagram>：射线与球面相交
 *
 * 纯静态 SVG，无交互。Server Component（无 "use client"）。
 */

export function RtwRayBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="射线与球面相交示意" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">射线 P(t)=A+t·b 与球面 |P−C|=r 求交</text>

          {/* 坐标参考线 */}
          <line x1="40" y1="300" x2="680" y2="300" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

          {/* 球 */}
          <circle cx="470" cy="220" r="78" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.6" />
          <circle cx="470" cy="220" r="3" fill="var(--text-primary)" />
          <text x="478" y="216" fontSize="11" fill="var(--text-secondary)">C（球心）</text>
          <line x1="470" y1="220" x2="540" y2="262" stroke="var(--text-secondary)" strokeWidth="1" />
          <text x="512" y="252" fontSize="10.5" fill="var(--text-secondary)">r</text>

          {/* 射线 */}
          <line x1="90" y1="300" x2="640" y2="180" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#rbArrow)" />
          <circle cx="90" cy="300" r="4" fill="var(--accent)" />
          <text x="70" y="318" fontSize="11" fill="var(--text-primary)">A（起点）</text>
          <text x="300" y="232" fontSize="11" fill="var(--accent)">b（方向）</text>

          {/* 交点 */}
          <circle cx="402" cy="206" r="4.5" fill="var(--text-primary)" />
          <text x="360" y="198" fontSize="10.5" fill="var(--text-primary)">P(t)=A+t·b</text>

          {/* 法线 */}
          <line x1="402" y1="206" x2="372" y2="150" stroke="var(--text-secondary)" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="338" y="146" fontSize="10.5" fill="var(--text-secondary)">N（法线）</text>

          <defs>
            <marker id="rbArrow" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
              <path d="M0,0 L8,5 L0,10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 公式条 */}
          <rect x="48" y="338" width="624" height="48" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="360" textAnchor="middle" fontSize="11.5" fill="var(--text-primary)">at² + 2ht + c = 0，a=b·b，h=o·b，c=o·o−r²（o=A−C）</text>
          <text x="360" y="378" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">Δ=h²−ac：Δ&lt;0 错过 · Δ=0 相切 · Δ&gt;0 取较小正根为最近交点</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">把射线参数方程代入球面方程得二次方程，判别式决定相交关系</figcaption>
    </figure>
  );
}
