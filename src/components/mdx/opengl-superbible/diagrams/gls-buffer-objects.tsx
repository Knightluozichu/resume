/**
 * <GlsBufferObjectsDiagram>
 *
 * 缓冲对象：VBO/UBO/SSBO/PBO数据管理
 */

export function GlsBufferObjectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="缓冲对象：VBO/UBO/SSBO/PBO数据管理" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">缓冲对象类型对比</text>
<rect x="30" y="72" width="310" height="290" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" />
<text x="185" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">VBO(顶点数据)</text>
<text x="185" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">静态几何数据</text>
<text x="185" y="155" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GL_STATIC_DRAW</text>
<text x="185" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一次上传反复绘制</text>
<text x="185" y="205" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">最常用</text>
<rect x="380" y="72" width="310" height="290" rx="8" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" />
<text x="535" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">UBO/SSBO(共享数据)</text>
<text x="535" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">UBO:只读共享(64KB)</text>
<text x="535" y="155" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SSBO:读写无限制</text>
<text x="535" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合计算着色器</text>
<text x="535" y="205" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">粒子/GPU剔除</text>

          <defs>
            <marker id="gls-buffer-objects-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">缓冲对象：VBO/UBO/SSBO/PBO数据管理</figcaption>
    </figure>
  );
}
