/**
 * <GlrGeometryDiagram>
 *
 * VBO存储数据，VAO封装配置，EBO存储索引
 */

export function GlrGeometryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="VBO存储数据，VAO封装配置，EBO存储索引" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">VBO/VAO/EBO关系</text>
<rect x="48" y="80" width="180" height="50" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
<text x="138" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">VBO</text>
<text x="138" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">存储顶点数据</text>
<line x1="228" y1="105" x2="268" y2="105" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="268" y="80" width="180" height="50" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
<text x="358" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">VAO</text>
<text x="358" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">封装属性配置</text>
<line x1="448" y1="105" x2="488" y2="105" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="488" y="80" width="180" height="50" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
<text x="578" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">EBO</text>
<text x="578" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">存储索引</text>
<rect x="48" y="180" width="624" height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="360" y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">顶点属性配置</text>
<text x="60" y="240" fontSize="11" fill="var(--accent)">位置(layout=0): 3个float, 步长5*float</text>
<text x="60" y="260" fontSize="11" fill="var(--success)">UV(layout=1): 2个float, 偏移3*float</text>
<text x="60" y="290" fontSize="11" fill="var(--text-secondary)">EBO: {0,1,3, 1,2,3} -> 2个三角形用4个顶点</text>
          <defs>
            <marker id="glr-geometry-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">VBO存储数据，VAO封装配置，EBO存储索引</figcaption>
    </figure>
  );
}
