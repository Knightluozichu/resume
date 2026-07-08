/**
 * <GlrLightingDiagram>
 *
 * Phong光照：法线变换→环境光+漫反射+镜面反射
 */

export function GlrLightingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Phong光照：法线变换→环境光+漫反射+镜面反射" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">OpenGL光照模型</text>
<text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Phong: 环境+漫反射+镜面</text>
<circle cx="560" cy="120" r="18" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1.5" />
<text x="560" y="100" textAnchor="middle" fontSize="10" fill="var(--warning)">光源</text>
<rect x="120" y="250" width="360" height="40" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.5" />
<text x="300" y="275" textAnchor="middle" fontSize="11" fill="var(--success)">物体表面+材质</text>
<line x1="325" y1="250" x2="325" y2="190" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 2" />
<text x="345" y="200" fontSize="10" fill="var(--accent)">N(法线)</text>
<line x1="545" y1="138" x2="340" y2="240" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="48" y="320" width="190" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
<text x="143" y="345" textAnchor="middle" fontSize="10" fill="var(--accent)">环境光 k_a</text>
<rect x="265" y="320" width="190" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
<text x="360" y="345" textAnchor="middle" fontSize="10" fill="var(--success)">漫反射 k_d*N.L</text>
<rect x="482" y="320" width="190" height="40" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
<text x="577" y="345" textAnchor="middle" fontSize="10" fill="var(--warning)">镜面 k_s*(R.V)^n</text>
          <defs>
            <marker id="glr-lighting-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Phong光照：法线变换→环境光+漫反射+镜面反射</figcaption>
    </figure>
  );
}
