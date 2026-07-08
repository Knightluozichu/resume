/**
 * <GlsTextureMappingDiagram>
 *
 * 纹理映射高级技术：多层纹理+压缩+各向异性
 */

export function GlsTextureMappingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="纹理映射高级技术：多层纹理+压缩+各向异性" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">纹理映射高级技术</text>
<text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">多层纹理、压缩、各向异性过滤</text>
<rect x="36" y="72" width="153" height="32" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
<text x="112" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">多层纹理</text>
<rect x="36" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="112" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">Multitexture</text>
<rect x="206" y="72" width="153" height="32" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
<text x="282" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">纹理压缩</text>
<rect x="206" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="282" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">BC/ASTC</text>
<rect x="376" y="72" width="153" height="32" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
<text x="452" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">各向异性</text>
<rect x="376" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="452" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">Anisotropic</text>
<rect x="546" y="72" width="153" height="32" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
<text x="622" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">纹理数组</text>
<rect x="546" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="622" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">Array</text>
<rect x="48" y="320" width="624" height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
<text x="360" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">高级纹理技术提升质量与性能</text>
<text x="360" y="354" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">从第一个程序到性能优化</text>

          <defs>
            <marker id="gls-texture-mapping-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">纹理映射高级技术：多层纹理+压缩+各向异性</figcaption>
    </figure>
  );
}
