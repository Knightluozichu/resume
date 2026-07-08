/**
 * <UusUrpLightingDiagram>：URP 光照系统图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UusUrpLightingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="URP 光照系统图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            URP 光照系统
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            直接光 + 间接光 = PBR 最终颜色
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="180" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">直接光</text>
          <text x="150" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Directional Light</text>
          <text x="150" y="162" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Point / Spot Light</text>
          <text x="150" y="184" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">主光源（Main Light）：</text>
          <text x="150" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">平行光，逐像素计算</text>
          <text x="150" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Additional Lights: 逐顶点/逐像素</text>

          <rect x="270" y="100" width="180" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">间接光</text>
          <text x="360" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Global Illumination</text>
          <text x="360" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">实时 GI：</text>
          <text x="360" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Spherical Harmonics (SH)</text>
          <text x="360" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Reflection Probe</text>
          <text x="360" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Baked GI: Lightmap</text>

          <rect x="480" y="100" width="160" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">BRDF</text>
          <text x="560" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Cook-Torrance</text>
          <text x="560" y="168" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Diffuse (Lambert)</text>
          <text x="560" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">+ Specular</text>
          <text x="560" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GGX NDF + Smith G</text>
          <text x="560" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Fresnel (Schlick)</text>

          <text x="245" y="164" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">+</text>
          <text x="455" y="164" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">最终颜色 = (Direct Diffuse + Direct Specular) + Indirect Diffuse + Indirect Specular</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Per-Pixel Light: 主光源 + 附加光（逐像素，上限可配）</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Per-Vertex Light: 超出逐像素上限的光源退化为逐顶点计算</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">性能权衡：逐像素质量高但开销大，逐顶点快但光照粗糙</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        URP 光照系统——直接光与间接光经 BRDF 计算合成最终颜色
      </figcaption>
    </figure>
  );
}
