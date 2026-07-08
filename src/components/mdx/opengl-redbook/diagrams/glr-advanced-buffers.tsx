/**
 * <GlrAdvancedBuffersDiagram>
 *
 * UBO/SSBO/TFO等高级缓冲技术对比
 */

export function GlrAdvancedBuffersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="UBO/SSBO/TFO等高级缓冲技术对比" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">高级缓冲技术对比</text>
<rect x="30" y="72" width="310" height="290" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" />
<text x="185" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">UBO (Uniform Buffer)</text>
<text x="185" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全局只读数据</text>
<text x="185" y="155" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">所有着色器共享</text>
<text x="185" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">大小限制(通常64KB)</text>
<text x="185" y="205" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合变换矩阵/光照参数</text>
<rect x="380" y="72" width="310" height="290" rx="8" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" />
<text x="535" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">SSBO (Shader Storage)</text>
<text x="535" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可读写随机访问</text>
<text x="535" y="155" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">大小无限制</text>
<text x="535" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合计算着色器</text>
<text x="535" y="205" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">粒子/GPU排序/删除</text>

          <defs>
            <marker id="glr-advanced-buffers-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">UBO/SSBO/TFO等高级缓冲技术对比</figcaption>
    </figure>
  );
}
