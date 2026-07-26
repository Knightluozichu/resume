/**
 * <RtwMaterialsDiagram>：材质与散射
 * 纯静态 SVG，无交互。Server Component。
 */
export function RtwMaterialsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="三种材质的散射行为对比" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">三种材质的 scatter：入射光 → 衰减 + 散射方向</text>

          {/* 公共入射光 */}
          <line x1="40" y1="250" x2="180" y2="180" stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#mtArrow)" />
          <text x="60" y="270" fontSize="11" fill="var(--text-secondary)">入射光 r_in</text>

          {/* 漫反射 */}
          <g>
            <circle cx="220" cy="200" r="48" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
            <text x="220" y="266" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">漫反射</text>
            <line x1="220" y1="200" x2="220" y2="150" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="220" y1="200" x2="180" y2="150" stroke="var(--accent)" strokeWidth="1.4" />
            <line x1="220" y1="200" x2="160" y2="175" stroke="var(--accent)" strokeWidth="1.4" />
            <line x1="220" y1="200" x2="200" y2="140" stroke="var(--accent)" strokeWidth="1.4" />
            <text x="150" y="120" fontSize="11" fill="var(--text-secondary)">随机方向</text>
          </g>

          {/* 金属 */}
          <g>
            <circle cx="380" cy="200" r="48" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
            <text x="380" y="266" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">金属</text>
            <line x1="380" y1="200" x2="380" y2="150" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="380" y1="200" x2="440" y2="150" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#mtArrow)" />
            <text x="446" y="150" fontSize="11" fill="var(--text-secondary)">镜面反射</text>
          </g>

          {/* 电介质 */}
          <g>
            <circle cx="540" cy="200" r="48" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.4" />
            <text x="540" y="266" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">电介质</text>
            <line x1="540" y1="200" x2="540" y2="150" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 3" />
            {/* 折射 */}
            <line x1="540" y1="200" x2="600" y2="250" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#mtArrow)" />
            {/* 反射 */}
            <line x1="540" y1="200" x2="600" y2="150" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="606" y="252" fontSize="11" fill="var(--text-secondary)">折射</text>
            <text x="606" y="150" fontSize="11" fill="var(--text-secondary)">反射</text>
          </g>

          {/* 底部公式条 */}
          <rect x="48" y="300" width="624" height="80" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="322" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--text-primary)">scatter(r_in, rec, attenuation, scattered)</text>
          <text x="360" y="342" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">漫反射：方向 = N + 随机向量 · 金属：方向 = reflect(d, N) + fuzz</text>
          <text x="360" y="360" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">电介质：按 Schlick 折射率在反射/折射间选择</text>
          <text x="360" y="376" textAnchor="middle" fontSize="11" fill="var(--text-primary)">ray_color 返回 attenuation * ray_color(scattered, depth-1)</text>

          <defs>
            <marker id="mtArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">三种材质用同一 scatter 接口输出衰减色与散射方向，递归即可组合</figcaption>
    </figure>
  );
}
