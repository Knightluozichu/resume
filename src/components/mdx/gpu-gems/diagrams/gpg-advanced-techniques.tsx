/**
 * <GpgAdvancedTechniquesDiagram>：GPU Gems 高级渲染技术图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpgAdvancedTechniquesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高级渲染技术：延迟渲染 vs 前向渲染"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            高级渲染技术：前向渲染 vs 延迟渲染
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            多光源场景下两种渲染路径的取舍
          </text>

          {/* 前向渲染 */}
          <rect x="40" y="80" width="310" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="195" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">前向渲染（Forward）</text>

          <rect x="60" y="120" width="270" height="28" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="195" y="138" textAnchor="middle" fontSize="10" fill="var(--text-primary)">每个物体 × 每个光源</text>

          <rect x="60" y="156" width="270" height="28" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="195" y="174" textAnchor="middle" fontSize="10" fill="var(--text-primary)">几何 → 片元 → 光照</text>

          <text x="195" y="204" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">复杂度 = O(物体 × 光源)</text>
          <text x="195" y="224" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">支持透明物体</text>
          <text x="195" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MSAA 抗锯齿原生</text>
          <text x="195" y="264" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">光源多时片元浪费严重</text>

          {/* 延迟渲染 */}
          <rect x="370" y="80" width="310" height="200" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="525" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">延迟渲染（Deferred）</text>

          <rect x="390" y="120" width="270" height="28" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="525" y="138" textAnchor="middle" fontSize="10" fill="var(--text-primary)">G-Buffer 存几何/材质</text>

          <rect x="390" y="156" width="270" height="28" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="525" y="174" textAnchor="middle" fontSize="10" fill="var(--text-primary)">每个光源只算可见像素</text>

          <text x="525" y="204" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">复杂度 = O(物体 + 像素 × 光源)</text>
          <text x="525" y="224" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">百光源仍流畅</text>
          <text x="525" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">带宽消耗大（G-Buffer）</text>
          <text x="525" y="264" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">不支持 MSAA / 透明物</text>

          {/* 底部 */}
          <rect x="40" y="300" width="640" height="70" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="11" fill="var(--text-primary)">选择依据：光源数 ≤ 4 → 前向；光源数 ≥ 8 → 延迟；需透明 → 前向+延迟混合</text>
          <text x={VIEW_W / 2} y="346" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">洞察：延迟渲染把「几何处理」和「光照计算」解耦，让光照成本只与屏幕像素数挂钩</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        前向渲染与延迟渲染的流程对比与取舍
      </figcaption>
    </figure>
  );
}
