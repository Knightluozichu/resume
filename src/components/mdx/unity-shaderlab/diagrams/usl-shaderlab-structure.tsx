/**
 * <UslShaderlabStructureDiagram>
 *
 * ShaderLab 文件结构层次
 */

export function UslShaderlabStructureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="ShaderLab 文件结构层次" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">ShaderLab 文件结构</text>

          <rect x="280" y="50" width="160" height="36" rx="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Shader "Name"</text>

          <line x1="360" y1="86" x2="160" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="86" x2="360" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="86" x2="560" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="80" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Properties &#123;&#125;</text>

          <rect x="280" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">SubShader &#123;&#125;</text>

          <rect x="480" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="560" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Fallback "..."</text>

          <rect x="30" y="160" width="260" height="70" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="160" y="180" textAnchor="middle" fontSize="10" fill="var(--text-primary)">_Color("Color", Color) = (1,1,1,1)</text>
          <text x="160" y="196" textAnchor="middle" fontSize="10" fill="var(--text-primary)">_MainTex("Tex", 2D) = "white"</text>
          <text x="160" y="212" textAnchor="middle" fontSize="10" fill="var(--text-primary)">_Gloss("Gloss", Range(0,1))</text>

          <rect x="280" y="160" width="160" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="183" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">Tags / LOD / Cull</text>

          <rect x="280" y="206" width="160" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="229" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">Pass &#123; CGPROGRAM &#125;</text>

          <rect x="48" y="280" width="624" height="50" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="300" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Tags: Queue=Transparent, RenderType=Opaque</text>
          <text x="360" y="318" textAnchor="middle" fontSize="11" fill="var(--text-primary)">LOD: 控制质量级别，Fallback: 不支持时的回退</text>

          <text x="360" y="370" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">Shader = Properties + SubShader(s) + Fallback</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">ShaderLab 文件结构层次</figcaption>
    </figure>
  );
}
