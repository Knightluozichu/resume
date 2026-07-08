/**
 * <UsfBloomGlowDiagram>
 *
 * 辉光与泛光: 降采样-上采样管线
 */

export function UsfBloomGlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="辉光与泛光效果管线" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">辉光与泛光 (Bloom)</text>

          <rect x="30" y="55" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="90" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">HDR 场景</text>
          <text x="90" y="93" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">原尺寸</text>

          <rect x="180" y="55" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="240" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">亮度提取</text>
          <text x="240" y="93" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">> threshold</text>

          <rect x="330" y="40" width="80" height="30" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="60" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Mip 0 (1/2)</text>
          <rect x="330" y="75" width="80" height="30" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="95" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Mip 1 (1/4)</text>
          <rect x="330" y="110" width="80" height="30" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="130" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Mip 2 (1/8)</text>
          <rect x="330" y="145" width="80" height="30" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="165" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Mip 3 (1/16)</text>

          <text x="440" y="55" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">降采样</text>
          <text x="440" y="160" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">上采样</text>

          <line x1="410" y1="55" x2="440" y2="55" stroke="var(--text-secondary)" strokeWidth="1" markerEnd="url(#usf-bloom-glow-arrow-d)" />
          <line x1="410" y1="90" x2="440" y2="90" stroke="var(--text-secondary)" strokeWidth="1" markerEnd="url(#usf-bloom-glow-arrow-d)" />
          <line x1="410" y1="125" x2="440" y2="125" stroke="var(--text-secondary)" strokeWidth="1" markerEnd="url(#usf-bloom-glow-arrow-d)" />
          <line x1="440" y1="160" x2="410" y2="160" stroke="var(--text-secondary)" strokeWidth="1" markerEnd="url(#usf-bloom-glow-arrow-u)" />
          <line x1="440" y1="125" x2="410" y2="125" stroke="var(--text-secondary)" strokeWidth="1" markerEnd="url(#usf-bloom-glow-arrow-u)" />
          <line x1="440" y1="90" x2="410" y2="90" stroke="var(--text-secondary)" strokeWidth="1" markerEnd="url(#usf-bloom-glow-arrow-u)" />

          <rect x="480" y="75" width="120" height="50" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="540" y="97" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Bloom 叠加</text>
          <text x="540" y="113" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">scene + bloom</text>

          <rect x="630" y="75" width="60" height="50" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="660" y="105" textAnchor="middle" fontSize="9" fill="var(--text-primary)">输出</text>

          <line x1="150" y1="80" x2="180" y2="80" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usf-bloom-glow-arrow-d)" />
          <line x1="300" y1="80" x2="330" y2="80" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usf-bloom-glow-arrow-d)" />
          <line x1="600" y1="100" x2="630" y2="100" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usf-bloom-glow-arrow-d)" />

          <rect x="48" y="215" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="235" textAnchor="middle" fontSize="11" fill="var(--text-primary)">降采样-上采样: 小尺寸小核模糊 ≡ 大尺寸大核模糊</text>
          <text x="360" y="253" textAnchor="middle" fontSize="11" fill="var(--text-primary)">采样次数大幅减少，缓存命中率更高</text>

          <rect x="48" y="290" width="624" height="50" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="310" textAnchor="middle" fontSize="11" fill="var(--text-primary)">高级 Bloom: + Lens Dirt 纹理 = bloom × dirt → 散射叠加</text>
          <text x="360" y="328" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Dirt 让辉光产生不规则散射，增加真实感</text>

          <text x="360" y="375" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">Bloom = 亮度提取 → 降采样模糊 → 上采样累加 → 叠加场景</text>

          <defs>
            <marker id="usf-bloom-glow-arrow-d" markerWidth="6" markerHeight="6" refX="5" refY="2" orient="auto">
              <path d="M0 0 L5 2 L0 4 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="usf-bloom-glow-arrow-u" markerWidth="6" markerHeight="6" refX="5" refY="2" orient="auto">
              <path d="M0 0 L5 2 L0 4 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">辉光与泛光效果管线</figcaption>
    </figure>
  );
}
