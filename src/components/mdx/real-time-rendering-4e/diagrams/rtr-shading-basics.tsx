/**
 * <RtrShadingBasicsDiagram>：着色基础与光照模型图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function RtrShadingBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="着色基础与光照模型图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            着色基础与光照模型
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            环境光 + 漫反射 + 镜面反射 = Phong光照模型
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Three light components */}
          <rect x="60" y="110" width="180" height="130" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">环境光</text>
          <text x="150" y="156" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Ambient</text>
          <text x="150" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">模拟间接光</text>
          <text x="150" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">均匀照亮所有面</text>
          <text x="150" y="218" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">I_ambient = k_a × I_a</text>

          <rect x="270" y="110" width="180" height="130" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">漫反射</text>
          <text x="360" y="156" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Diffuse</text>
          <text x="360" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Lambert 余弦定律</text>
          <text x="360" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">法线与光源夹角</text>
          <text x="360" y="218" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">I_diff = k_d × I × max(N·L, 0)</text>

          <rect x="480" y="110" width="180" height="130" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="570" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">镜面反射</text>
          <text x="570" y="156" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Specular</text>
          <text x="570" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Phong / Blinn-Phong</text>
          <text x="570" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">反射方向与视线夹角</text>
          <text x="570" y="218" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">I_spec = k_s × I × max(R·V, 0)^n</text>

          {/* Sum */}
          <rect x="60" y="270" width="600" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Phong 光照模型 = 环境光 + 漫反射 + 镜面反射</text>
          <text x={VIEW_W / 2} y="316" textAnchor="middle" fontSize="11" fill="var(--text-primary)">I_total = k_a×I_a + k_d×I×max(N·L,0) + k_s×I×max(R·V,0)^n</text>
          <text x={VIEW_W / 2} y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Blinn-Phong 用半角向量 H 替代 R，更高效且效果更自然</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        着色基础与光照模型——Phong模型三分量分解
      </figcaption>
    </figure>
  );
}
