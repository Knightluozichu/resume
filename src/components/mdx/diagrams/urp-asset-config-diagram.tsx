/**
 * <UrpAssetConfigDiagram>：URP Asset 关键参数配置指南。
 * 三栏对照：Low / Medium / High 各档位参数默认值 + 建议。
 */

export function UrpAssetConfigDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="URP Asset 三档配置对比：Low/Medium/High 的 Render Scale、MSAA、Shadow 等关键参数推荐值"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x="20" y="28" fontSize="13" fontWeight="600" fill="var(--text-primary)">URP Asset · 三档配置对比</text>

          {/* Header row */}
          <rect x="20" y="42" width="130" height="28" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="85" y="60" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">参数</text>

          <rect x="154" y="42" width="156" height="28" rx="4" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="232" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">High（高端机）</text>

          <rect x="314" y="42" width="156" height="28" rx="4" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="392" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Medium（中端机）</text>

          <rect x="474" y="42" width="156" height="28" rx="4" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="552" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Low（低端机）</text>

          {/* Rows */}
          {[
            { label: "Render Scale", high: "1.0", mid: "0.75–0.85", low: "0.6–0.7", y: 84 },
            { label: "MSAA", high: "4x", mid: "2x", low: "Off", y: 118 },
            { label: "Shadow Distance (m)", high: "80", mid: "40–50", low: "20–30", y: 152 },
            { label: "Cascade Count", high: "4", mid: "2", low: "1", y: 186 },
            { label: "HDR", high: "On", mid: "Off", low: "Off", y: 220 },
            { label: "Depth Texture", high: "After Opaques", mid: "On Demand", low: "Off", y: 254 },
          ].map((row) => (
            <g key={row.label}>
              <rect x="20" y={row.y} width="130" height="28" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="30" y={row.y + 18} fontSize="10" fill="var(--text-primary)">{row.label}</text>

              <rect x="154" y={row.y} width="156" height="28" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="232" y={row.y + 18} textAnchor="middle" fontSize="10" fill="var(--text-primary)">{row.high}</text>

              <rect x="314" y={row.y} width="156" height="28" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="392" y={row.y + 18} textAnchor="middle" fontSize="10" fill="var(--text-primary)">{row.mid}</text>

              <rect x="474" y={row.y} width="156" height="28" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="552" y={row.y + 18} textAnchor="middle" fontSize="10" fill="var(--text-primary)">{row.low}</text>
            </g>
          ))}

          <text x="20" y="308" fontSize="10" fill="var(--text-secondary)">
            每档绑定一个 URP Asset 文件 · Quality Settings 切换 · Render Scale 是移动端调优第一参数
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Low/Medium/High 三档 URP Asset 的关键参数推荐值。Render Scale 是移动端 GPU bound
        时的第一调节参数；HDR 在移动端建议关闭（带宽负担大、画面提升有限）。
      </figcaption>
    </figure>
  );
}
