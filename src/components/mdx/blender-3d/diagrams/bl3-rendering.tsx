/**
 * <Bl3RenderingDiagram>：Blender 渲染：Cycles 与 Eevee图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Bl3RenderingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Blender 渲染：Cycles 与 Eevee图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Blender 渲染：Cycles 与 Eevee</text>
          <rect x="80" y="80" width="250" height="80" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="205" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">Cycles</text>
          <text x="205" y="130" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">光线追踪 · 慢但真实</text>
          <text x="205" y="148" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">逐像素模拟光线弹射</text>
          <rect x="390" y="80" width="250" height="80" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="515" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">Eevee</text>
          <text x="515" y="130" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">实时渲染 · 快但近似</text>
          <text x="515" y="148" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">光栅化 + 屏幕空间技巧</text>
          <text x="360" y="200" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">采样数 vs 画质</text>
          <rect x="80" y="220" width="130" height="36" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="145" y="237" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">32 采样</text>
          <text x="145" y="251" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">噪点多</text>
          <rect x="240" y="220" width="130" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="305" y="237" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">64 采样</text>
          <text x="305" y="251" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">可用</text>
          <rect x="400" y="220" width="130" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="465" y="237" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">128 采样</text>
          <text x="465" y="251" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">干净</text>
          <rect x="560" y="220" width="130" height="36" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="625" y="237" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">256 采样</text>
          <text x="625" y="251" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">精细</text>
          <rect x="80" y="290" width="560" height="50" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="315" textAnchor="middle" fontSize="12" fill="var(--text-primary)">最佳实践：64-128 采样 + AI 降噪</text>
          <text x="360" y="332" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">速度与质量的平衡点</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Blender 渲染：Cycles 与 Eevee——玩转 Blender
      </figcaption>
    </figure>
  );
}
