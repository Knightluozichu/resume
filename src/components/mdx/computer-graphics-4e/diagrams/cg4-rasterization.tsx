/**
 * <Cg4RasterizationDiagram>：光栅化与片段处理示意图
 *
 * 展示三角形如何被光栅化为像素片段。
 */

export function Cg4RasterizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="光栅化与片段处理" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">光栅化：从三角形到像素片段</text>

          {/* 左侧：连续三角形 */}
          <text x="160" y="70" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">连续图元</text>
          <polygon points="80,300 240,100 240,300" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />

          {/* 中间箭头 */}
          <line x1="270" y1="200" x2="350" y2="200" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#cg4-rast-arrow)" />
          <text x="310" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">扫描转换</text>

          {/* 右侧：离散像素网格 */}
          <text x="520" y="70" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">离散片段</text>
          {Array.from({ length: 12 }, (_, r) =>
            Array.from({ length: 12 }, (_, c) => {
              const cx = 400 + c * 20;
              const cy = 100 + r * 20;
              const v0x = 80, v0y = 300;
              const v1x = 240, v1y = 100;
              const v2x = 240, v2y = 300;
              const fx = cx - v0x, fy = cy - v0y;
              const d1 = (v1x - v0x) * fy - (v1y - v0y) * fx;
              const d2 = (v2x - v1x) * (cy - v1y) - (v2y - v1y) * (cx - v1x);
              const d3 = (v0x - v2x) * (cy - v2y) - (v0y - v2y) * (cx - v2x);
              const inside = d1 <= 0 && d2 <= 0 && d3 <= 0;
              return (
                <rect key={`${r}-${c}`} x={cx - 10} y={cy - 10} width="20" height="20" fill={inside ? "var(--success)" : "none"} fillOpacity={inside ? 0.3 : 0} stroke="var(--border)" strokeWidth="0.5" />
              );
            })
          )}

          {/* 底部说明 */}
          <rect x="48" y="350" width="624" height="32" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="370" textAnchor="middle" fontSize="11" fill="var(--text-primary)">每个片段包含位置、深度、纹理坐标，经片段着色器计算最终颜色</text>

          <defs>
            <marker id="cg4-rast-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">光栅化将连续三角形扫描转换为离散像素片段网格</figcaption>
    </figure>
  );
}
