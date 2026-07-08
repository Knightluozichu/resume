/**
 * <Cg4LightingModelsDiagram>：光照模型与着色示意图
 *
 * 展示 Phong 光照模型的三个分量：环境光、漫反射、镜面反射。
 */

export function Cg4LightingModelsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Phong 光照模型" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Phong 光照模型</text>
          <text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">环境光 + 漫反射 + 镜面反射 = 最终颜色</text>

          {/* 光源 */}
          <circle cx="560" cy="120" r="20" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="560" y="100" textAnchor="middle" fontSize="11" fill="var(--warning)">光源</text>

          {/* 表面 */}
          <line x1="150" y1="280" x2="500" y2="280" stroke="var(--text-primary)" strokeWidth="2" />
          <line x1="150" y1="280" x2="180" y2="300" stroke="var(--text-primary)" strokeWidth="1" />
          <line x1="250" y1="280" x2="280" y2="300" stroke="var(--text-primary)" strokeWidth="1" />
          <line x1="350" y1="280" x2="380" y2="300" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="325" y="320" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">表面</text>

          {/* 法线 */}
          <line x1="325" y1="280" x2="325" y2="200" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="340" y="210" fontSize="10" fill="var(--accent)">N (法线)</text>

          {/* 入射光方向 */}
          <line x1="540" y1="140" x2="345" y2="270" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#cg4-light-arrow)" />
          <text x="460" y="190" fontSize="10" fill="var(--warning)">L (入射光)</text>

          {/* 反射方向 */}
          <line x1="325" y1="270" x2="120" y2="140" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#cg4-light-arrow)" />
          <text x="180" y="180" fontSize="10" fill="var(--success)">R (反射)</text>

          {/* 观察方向 */}
          <line x1="325" y1="270" x2="200" y2="100" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#cg4-light-arrow)" />
          <text x="200" y="90" fontSize="10" fill="var(--danger)">V (观察)</text>

          {/* 三个分量框 */}
          <rect x="48" y="340" width="190" height="44" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="143" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">环境光 Ambient</text>
          <text x="143" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">I * k_a</text>

          <rect x="265" y="340" width="190" height="44" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="360" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">漫反射 Diffuse</text>
          <text x="360" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">I * k_d * max(N·L, 0)</text>

          <rect x="482" y="340" width="190" height="44" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="577" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">镜面反射 Specular</text>
          <text x="577" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">I * k_s * max(R·V, 0)^n</text>

          <defs>
            <marker id="cg4-light-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Phong 模型：环境光+漫反射(N·L)+镜面反射(R·V)^n</figcaption>
    </figure>
  );
}
