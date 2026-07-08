/**
 * <GlsPerformanceDiagram>
 *
 * 性能优化：Draw Call/带宽/着色器/并行
 */

export function GlsPerformanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="性能优化：Draw Call/带宽/着色器/并行" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">性能优化策略</text>
<text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">减少CPU-GPU通信和GPU瓶颈</text>
<rect x="36" y="72" width="153" height="32" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
<text x="112" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Draw Call</text>
<rect x="36" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="112" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">实例化/合批</text>
<rect x="206" y="72" width="153" height="32" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
<text x="282" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">带宽</text>
<rect x="206" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="282" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">LOD/Mipmap/压缩</text>
<rect x="376" y="72" width="153" height="32" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
<text x="452" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">着色器</text>
<rect x="376" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="452" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">简化/查表</text>
<rect x="546" y="72" width="153" height="32" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
<text x="622" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">并行</text>
<rect x="546" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="622" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">Compute/Multi-Draw</text>
<rect x="48" y="320" width="624" height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
<text x="360" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">核心: 定位瓶颈→针对性优化</text>
<text x="360" y="354" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">从第一个程序到性能优化</text>

          <defs>
            <marker id="gls-performance-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">性能优化：Draw Call/带宽/着色器/并行</figcaption>
    </figure>
  );
}
