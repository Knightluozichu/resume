/**
 * <Bl3TexturingDiagram>：Blender 材质与贴图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Bl3TexturingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Blender 材质与贴图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Blender 材质与贴图</text>
          <rect x="50" y="75" width="140" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">UV 展开</text>
          <text x="205" y="105" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="230" y="75" width="140" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="300" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">PBR 节点</text>
          <text x="385" y="105" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="410" y="75" width="140" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="480" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">烘焙法线</text>
          <text x="360" y="170" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">PBR 四通道</text>
          <rect x="120" y="200" width="480" height="28" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="150" y="219" fontSize="12" fontWeight="600" fill="var(--success)">Base Color</text>
          <text x="320" y="219" fontSize="11" fill="var(--text-secondary)">固有色</text>
          <rect x="120" y="235" width="480" height="28" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="150" y="254" fontSize="12" fontWeight="600" fill="var(--accent)">Metallic</text>
          <text x="320" y="254" fontSize="11" fill="var(--text-secondary)">金属度</text>
          <rect x="120" y="270" width="480" height="28" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="150" y="289" fontSize="12" fontWeight="600" fill="var(--warning)">Roughness</text>
          <text x="320" y="289" fontSize="11" fill="var(--text-secondary)">粗糙度</text>
          <rect x="120" y="305" width="480" height="28" rx="6" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="150" y="324" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">Normal</text>
          <text x="320" y="324" fontSize="11" fill="var(--text-secondary)">凹凸</text>
          <text x="360" y="360" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">UV 是贴图绘制的前提，无 UV = 无贴图定位</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Blender 材质与贴图——玩转 Blender
      </figcaption>
    </figure>
  );
}
