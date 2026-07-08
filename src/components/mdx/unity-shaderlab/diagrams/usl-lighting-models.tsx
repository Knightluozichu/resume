/**
 * <UslLightingModelsDiagram>
 *
 * Unity 内置与自定义光照模型
 */

export function UslLightingModelsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity 内置与自定义光照模型" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">光照模型</text>

          <rect x="30" y="55" width="155" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="107" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Lambert</text>
          <text x="107" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">纯漫反射</text>
          <text x="107" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">max(N·L, 0)</text>
          <text x="107" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无高光</text>

          <rect x="200" y="55" width="155" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">BlinnPhong</text>
          <text x="277" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">漫反射 + 高光</text>
          <text x="277" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">N·L + (N·H)^n</text>
          <text x="277" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">经典模型</text>

          <rect x="370" y="55" width="155" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="447" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">Standard (PBR)</text>
          <text x="447" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Metallic 流程</text>
          <text x="447" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Smoothness</text>
          <text x="447" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">物理光照</text>

          <rect x="540" y="55" width="150" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">自定义</text>
          <text x="615" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">LightingFunc()</text>
          <text x="615" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Toon / Ramp</text>
          <text x="615" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">灵活控制</text>

          <rect x="30" y="155" width="660" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="175" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Metallic: 0=电介质 1=金属 | Smoothness: 0=粗糙 1=镜面</text>
          <text x="360" y="193" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PBR 通过金属度和光滑度模拟真实材质</text>

          <rect x="48" y="225" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="245" textAnchor="middle" fontSize="11" fill="var(--text-primary)">自定义光照: #pragma surface surf Custom → LightingCustom()</text>
          <text x="360" y="263" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Toon: N·L 量化为离散阶 + Ramp 纹理 + Fresnel 边缘高光</text>

          <text x="360" y="315" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">ForwardBase: 主光源 | ForwardAdd: 附加光源</text>
          <text x="360" y="335" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">自定义光照函数可完全控制 Diffuse/Specular 计算</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Unity 内置与自定义光照模型</figcaption>
    </figure>
  );
}
