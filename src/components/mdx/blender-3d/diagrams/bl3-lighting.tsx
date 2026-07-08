/**
 * <Bl3LightingDiagram>：Blender 灯光与世界设置图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Bl3LightingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Blender 灯光与世界设置图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Blender 灯光与世界设置</text>
          <circle cx="360" cy="220" r="50" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="360" y="225" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">物体</text>
          <rect x="100" y="80" width="80" height="30" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="140" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">主光</text>
          <line x1="180" y1="110" x2="320" y2="190" stroke="var(--warning)" strokeWidth="2" strokeOpacity="0.5" />
          <rect x="540" y="80" width="80" height="30" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="580" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">辅光</text>
          <line x1="540" y1="110" x2="400" y2="190" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="5,3" />
          <rect x="320" y="320" width="80" height="30" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="360" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">轮廓光</text>
          <line x1="360" y1="320" x2="360" y2="270" stroke="var(--success)" strokeWidth="1.5" strokeOpacity="0.4" />
          <text x="360" y="55" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">三点布光：主光最强、辅光 1/3、轮廓光勾边</text>
          <text x="140" y="130" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">暖色/侧前方45°</text>
          <text x="580" y="130" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">冷色/对侧</text>
          <text x="450" y="345" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">背后上方</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Blender 灯光与世界设置——玩转 Blender
      </figcaption>
    </figure>
  );
}
