/**
 * <Cg4TexturingDiagram>：纹理映射技术示意图
 *
 * 展示纹理坐标到表面映射的概念。
 */

export function Cg4TexturingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="纹理映射技术" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">纹理映射：从纹素到像素</text>
          <text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">UV 坐标将纹理图像映射到几何表面</text>

          {/* 左侧：纹理图像 */}
          <text x="120" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">纹理图像 (Texture)</text>
          <rect x="50" y="100" width="140" height="140" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`h${i}`} x1="50" y1={100 + i * 20} x2="190" y2={100 + i * 20} stroke="var(--border)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`v${i}`} x1={50 + i * 20} y1="100" x2={50 + i * 20} y2="240" stroke="var(--border)" strokeWidth="0.5" />
          ))}
          <text x="50" y="262" fontSize="10" fill="var(--text-secondary)">(0,0)</text>
          <text x="175" y="262" fontSize="10" fill="var(--text-secondary)">(1,0)</text>

          {/* 中间箭头和UV */}
          <line x1="210" y1="170" x2="310" y2="170" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#cg4-tex-arrow)" />
          <text x="260" y="155" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">UV 映射</text>
          <text x="260" y="185" textAnchor="middle" fontSize="10" fill="var(--accent)" fontFamily="monospace">(u,v)</text>

          {/* 右侧：3D 表面 */}
          <text x="480" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">几何表面</text>
          <polygon points="350,120 600,100 620,230 370,250" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.5" />
          <line x1="475" y1="110" x2="495" y2="240" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 2" />
          <line x1="400" y1="135" x2="550" y2="125" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 2" />

          {/* 采样方法说明 */}
          <rect x="48" y="300" width="624" height="80" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="324" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">采样过滤方法</text>
          <text x="140" y="350" textAnchor="middle" fontSize="10" fill="var(--accent)">最近邻：取最近纹素，速度快但有锯齿</text>
          <text x="360" y="350" textAnchor="middle" fontSize="10" fill="var(--success)">双线性：4 邻纹素加权平均</text>
          <text x="580" y="350" textAnchor="middle" fontSize="10" fill="var(--warning)">三线性：Mipmap 层间双线性</text>
          <text x="360" y="370" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Mipmap：预生成多级纹理，减少远处 aliasing</text>

          <defs>
            <marker id="cg4-tex-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">纹理映射通过 UV 坐标将 2D 纹理贴合到 3D 几何表面</figcaption>
    </figure>
  );
}
