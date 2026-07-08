/**
 * <GlrModernOpenglDiagram>
 *
 * 现代OpenGL实践：实例化、间接绘制、DSA、SPIRV
 */

export function GlrModernOpenglDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="现代OpenGL实践：实例化、间接绘制、DSA、SPIRV" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">现代OpenGL实践</text>
<text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">性能优化与最佳实践</text>
<rect x="36" y="72" width="153" height="32" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
<text x="112" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">实例化</text>
<rect x="36" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="112" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">glDrawArraysInstanced</text>
<rect x="206" y="72" width="153" height="32" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
<text x="282" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">间接绘制</text>
<rect x="206" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="282" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">glMultiDrawElementsIndirect</text>
<rect x="376" y="72" width="153" height="32" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
<text x="452" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">DSA</text>
<rect x="376" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="452" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">直接状态访问</text>
<rect x="546" y="72" width="153" height="32" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
<text x="622" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">SPIRV</text>
<rect x="546" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="622" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">预编译着色器</text>
<rect x="48" y="320" width="624" height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
<text x="360" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">核心: 减少CPU-GPU通信、状态切换、Draw Call</text>

          <defs>
            <marker id="glr-modern-opengl-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">现代OpenGL实践：实例化、间接绘制、DSA、SPIRV</figcaption>
    </figure>
  );
}
