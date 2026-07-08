/**
 * <ShpPostProcessingDiagram>
 *
 * 后处理管线与高斯模糊分离
 */

export function ShpPostProcessingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="后处理管线与高斯模糊分离" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">后处理 Shader</text>

          <rect x="30" y="55" width="140" height="56" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="100" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">场景渲染</text>
          <text x="100" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">→ Render Target</text>

          <rect x="220" y="55" width="140" height="56" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="290" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">全屏 Pass</text>
          <text x="290" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">像素着色器处理</text>

          <rect x="410" y="55" width="140" height="56" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="480" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">后处理效果</text>
          <text x="480" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">模糊/辉光/调色</text>

          <rect x="600" y="55" width="90" height="56" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="645" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">屏幕</text>
          <text x="645" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SV_TARGET</text>

          <line x1="170" y1="83" x2="220" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-post-processing-arrow)" />
          <line x1="360" y1="83" x2="410" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-post-processing-arrow)" />
          <line x1="550" y1="83" x2="600" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-post-processing-arrow)" />

          <rect x="30" y="140" width="310" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="185" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">一趟 2D 高斯模糊</text>
          <text x="185" y="180" textAnchor="middle" fontSize="10" fill="var(--text-primary)">卷积核 N×N</text>
          <text x="185" y="197" textAnchor="middle" fontSize="10" fill="var(--text-primary)">采样次数: N×N = N²</text>
          <text x="185" y="215" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">复杂度 O(N²) — 昂贵</text>

          <rect x="380" y="140" width="310" height="90" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="535" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">两趟分离高斯模糊</text>
          <text x="535" y="180" textAnchor="middle" fontSize="10" fill="var(--text-primary)">水平 1×N + 垂直 1×N</text>
          <text x="535" y="197" textAnchor="middle" fontSize="10" fill="var(--text-primary)">采样次数: N + N = 2N</text>
          <text x="535" y="215" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">复杂度 O(N) — 高效</text>

          <rect x="48" y="260" width="624" height="50" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="280" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Tone Mapping: HDR → LDR，用 ACES/Reinhard 曲线压缩</text>
          <text x="360" y="298" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Bloom 管线: 亮度提取 → 降采样模糊 → 上采样叠加 → 色调映射</text>

          <text x="360" y="355" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">后处理 = 离屏渲染 + 全屏着色器 + 多趟组合</text>

          <defs>
            <marker id="shp-post-processing-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">后处理管线与高斯模糊分离</figcaption>
    </figure>
  );
}
