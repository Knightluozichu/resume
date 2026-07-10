/**
 * <ShpPixelShadersDiagram>
 *
 * 像素着色器：纹理采样与颜色输出
 */

export function ShpPixelShadersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="像素着色器纹理采样与颜色输出" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`像素着色器实战`}</text>

          <rect x="30" y="60" width="160" height="60" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="110" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{`插值属性`}</text>
          <text x="110" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`UV / Normal / Color`}</text>

          <rect x="240" y="60" width="160" height="60" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="320" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{`纹理采样`}</text>
          <text x="320" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`Texture.Sample(s, uv)`}</text>

          <rect x="450" y="60" width="160" height="60" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="530" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{`颜色计算`}</text>
          <text x="530" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`光照 / 混合 / clip`}</text>

          <rect x="640" y="60" width="50" height="60" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="665" y="95" textAnchor="middle" fontSize="9" fill="var(--text-primary)">{`SV_TARGET`}</text>

          <line x1="190" y1="90" x2="240" y2="90" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-pixel-shaders-arrow)" />
          <line x1="400" y1="90" x2="450" y2="90" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-pixel-shaders-arrow)" />
          <line x1="610" y1="90" x2="640" y2="90" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-pixel-shaders-arrow)" />

          <rect x="30" y="150" width="340" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="200" y="170" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">{`Texture2D tex; SamplerState samp;`}</text>
          <text x="200" y="188" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`声明纹理 + 采样器`}</text>

          <rect x="380" y="150" width="310" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="535" y="170" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">{`float4 c = tex.Sample(samp, uv);`}</text>
          <text x="535" y="188" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`采样得到 RGBA 颜色`}</text>

          <rect x="48" y="230" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="250" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{`clip(texColor.a - 0.5); — alpha test 丢弃透明像素`}</text>
          <text x="360" y="268" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{`return lerp(colorA, colorB, uv.y); — 渐变色插值`}</text>

          <text x="360" y="320" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">{`每个像素执行一次 → 决定屏幕上每个点的最终颜色`}</text>

          <text x="360" y="355" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`执行频率 N*M >> 顶点着色器 N → 优化优先级最高`}</text>

          <defs>
            <marker id="shp-pixel-shaders-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">像素着色器纹理采样与颜色输出</figcaption>
    </figure>
  );
}
