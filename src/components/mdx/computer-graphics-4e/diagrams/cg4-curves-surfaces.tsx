/**
 * <Cg4CurvesSurfacesDiagram>：曲线与曲面示意图
 *
 * 展示 Bezier 曲线的控制点与曲线关系。
 */

export function Cg4CurvesSurfacesDiagram() {
  // Bezier curve with 4 control points
  const p0 = { x: 60, y: 300 };
  const p1 = { x: 180, y: 80 };
  const p2 = { x: 440, y: 100 };
  const p3 = { x: 620, y: 280 };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="曲线与曲面" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Bezier 曲线与控制点</text>
          <text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">三次 Bezier 曲线由 4 个控制点定义</text>

          {/* 控制多边形 */}
          <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={p2.x} y1={p2.y} x2={p3.x} y2={p3.y} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />

          {/* Bezier 曲线 - 用 path 模拟 */}
          <path d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`} fill="none" stroke="var(--accent)" strokeWidth="2.5" />

          {/* 控制点 */}
          {[
            { p: p0, label: "P0" },
            { p: p1, label: "P1" },
            { p: p2, label: "P2" },
            { p: p3, label: "P3" },
          ].map((cp, i) => (
            <g key={cp.label}>
              <circle cx={cp.p.x} cy={cp.p.y} r="6" fill={i === 0 || i === 3 ? "var(--accent)" : "var(--success)"} stroke="var(--bg)" strokeWidth="1.5" />
              <text x={cp.p.x} y={cp.p.y - 14} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{cp.label}</text>
            </g>
          ))}

          {/* 公式区 */}
          <rect x="48" y="330" width="624" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="354" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">Bernstein 多项式：B(t) = (1-t)P0 + 3t(1-t)P1 + 3t(1-t)P2 + tP3</text>
          <text x="360" y="370" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">t ∈ [0,1]，端点 P0/P3 在曲线上，P1/P2 控制切线方向</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">三次 Bezier 曲线：4 个控制点定义曲线形状，端点插值、中间点控制方向</figcaption>
    </figure>
  );
}
