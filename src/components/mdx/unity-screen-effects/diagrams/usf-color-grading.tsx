/**
 * <UsfColorGradingDiagram>
 *
 * 色彩校正与调色: LUT/Tone Mapping/色彩管线
 */

export function UsfColorGradingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="色彩校正与调色" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`色彩校正与调色`}</text>

          <rect x="30" y="55" width="140" height="56" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="100" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{`HDR 渲染`}</text>
          <text x="100" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`颜色 > 1.0`}</text>

          <rect x="200" y="55" width="140" height="56" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="270" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{`色调映射`}</text>
          <text x="270" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`ACES / Reinhard`}</text>

          <rect x="370" y="55" width="140" height="56" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="440" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{`颜色调整`}</text>
          <text x="440" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`亮度/对比度/饱和度`}</text>

          <rect x="540" y="55" width="150" height="56" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{`LUT 查找`}</text>
          <text x="615" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`风格化调色`}</text>

          <line x1="170" y1="83" x2="200" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usf-color-grading-arrow)" />
          <line x1="340" y1="83" x2="370" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usf-color-grading-arrow)" />
          <line x1="510" y1="83" x2="540" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usf-color-grading-arrow)" />

          <rect x="30" y="130" width="310" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="185" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{`ACES 色调映射`}</text>
          <text x="185" y="168" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`(x*(2.51x+0.03))`}</text>
          <text x="185" y="183" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`/ (x*(2.43x+0.59)+0.14)`}</text>
          <text x="185" y="196" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">{`保留高光暗部细节，电影级`}</text>

          <rect x="380" y="130" width="310" height="70" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="535" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{`LUT 查找表`}</text>
          <text x="535" y="168" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`3D LUT 存为 2D 纹理 (256x16)`}</text>
          <text x="535" y="183" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`用原始 RGB 作为 UV 采样`}</text>
          <text x="535" y="196" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">{`外部工具调色后导出`}</text>

          <rect x="48" y="225" width="624" height="56" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="245" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{`完整管线: HDR → 白平衡 → 色调映射 → 颜色调整 → LUT → 输出`}</text>
          <text x="360" y="263" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{`Volume Blending: 参数平滑过渡，支持区域调色`}</text>

          <text x="360" y="315" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">{`色彩校正 = 颜色映射(HDR→LDR) + 颜色调整 + 风格化(LUT)`}</text>
          <text x="360" y="335" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">{`ACES 比 Reinhard 保留更多高光暗部细节`}</text>

          <defs>
            <marker id="usf-color-grading-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">色彩校正与调色</figcaption>
    </figure>
  );
}
