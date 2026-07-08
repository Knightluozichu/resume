/**
 * <UslSurfaceShadersDiagram>
 *
 * 表面着色器与顶点/片段着色器对比
 */

export function UslSurfaceShadersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="表面着色器与顶点片段着色器对比" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">表面着色器</text>

          <rect x="30" y="55" width="310" height="120" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="185" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">表面着色器 (Surface)</text>
          <text x="185" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">自动光照 + 阴影 + GI</text>
          <text x="185" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">#pragma surface surf Lambert</text>
          <text x="185" y="129" textAnchor="middle" fontSize="10" fill="var(--text-primary)">只需填 SurfaceOutput</text>
          <text x="185" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Albedo/Normal/Emission</text>
          <text x="185" y="163" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">简洁快速，编译生成多 Pass</text>

          <rect x="380" y="55" width="310" height="120" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">顶点/片段着色器 (Vert/Frag)</text>
          <text x="535" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">手动光照 + 手动阴影</text>
          <text x="535" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">#pragma vertex vert</text>
          <text x="535" y="129" textAnchor="middle" fontSize="10" fill="var(--text-primary)">#pragma fragment frag</text>
          <text x="535" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">精确控制 Pass/状态</text>
          <text x="535" y="163" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">灵活高效，代码量大</text>

          <rect x="30" y="195" width="660" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="215" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">SurfaceOutput: Albedo / Normal / Emission / Specular / Gloss / Alpha</text>
          <text x="360" y="233" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Standard: Metallic / Smoothness / Occlusion</text>

          <rect x="48" y="270" width="624" height="56" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="290" textAnchor="middle" fontSize="11" fill="var(--text-primary)">表面着色器 → 编译 → 顶点/片段着色器 → GPU 执行</text>
          <text x="360" y="308" textAnchor="middle" fontSize="11" fill="var(--text-primary)">选择: 标准光照用 Surface，精确控制/后处理/屏幕特效用 Vert/Frag</text>

          <text x="360" y="360" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">表面着色器是 Unity 对 Vert/Frag 的封装，自动处理光照阴影</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">表面着色器与顶点片段着色器对比</figcaption>
    </figure>
  );
}
