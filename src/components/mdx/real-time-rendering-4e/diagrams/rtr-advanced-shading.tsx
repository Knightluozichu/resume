/**
 * <RtrAdvancedShadingDiagram>：高级着色与BRDF图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function RtrAdvancedShadingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高级着色与BRDF图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            高级着色与BRDF
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从经验模型到基于物理的BRDF
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* BRDF equation */}
          <rect x="60" y="100" width="600" height="50" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="130" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">BRDF: f_r(L,V) = k_d × f_diffuse + k_s × f_specular</text>

          {/* Empirical vs PBR */}
          <rect x="60" y="170" width="280" height="130" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">经验模型</text>
          <text x="200" y="216" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Phong / Blinn-Phong</text>
          <text x="200" y="234" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">参数无物理意义</text>
          <text x="200" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能量不守恒</text>
          <text x="200" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">简单快速</text>
          <text x="200" y="288" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">适合风格化渲染</text>

          <rect x="380" y="170" width="280" height="130" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="520" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">基于物理（PBR）</text>
          <text x="520" y="216" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Cook-Torrance / GGX</text>
          <text x="520" y="234" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能量守恒</text>
          <text x="520" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">微表面理论</text>
          <text x="520" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">参数有物理意义</text>
          <text x="520" y="288" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">跨引擎一致</text>

          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            Cook-Torrance: f_spec = D×F×G / (4×(N·L)×(N·V))
          </text>
          <text x={VIEW_W / 2} y="348" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            D=法线分布(GGX) F=菲涅尔(Fresnel) G=几何遮蔽(Smith)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高级着色与BRDF——从经验模型到基于物理的微表面理论
      </figcaption>
    </figure>
  );
}
