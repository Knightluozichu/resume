/**
 * <Bl3ModelingDiagram>：Blender 多边形建模图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Bl3ModelingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Blender 多边形建模图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Blender 多边形建模</text>
          <rect x="60" y="70" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">基础几何体</text>
          <text x="205" y="100" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="220" y="70" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="280" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">挤出/环切</text>
          <text x="365" y="100" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="380" y="70" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="440" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">清拓扑</text>
          <text x="525" y="100" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="540" y="70" width="120" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="600" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">修改器</text>
          <text x="360" y="170" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">非破坏性建模流程</text>
          <rect x="100" y="195" width="520" height="120" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="360" y="225" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">挤出(E): 拉出新面 | 环切(Ctrl+R): 加循环边</text>
          <text x="360" y="248" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">镜像: 对称 | 阵列: 重复 | 布尔: 挖孔</text>
          <text x="360" y="271" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">细分曲面: 圆滑 | Decimate: 减面</text>
          <text x="360" y="298" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">尽量保持四边形，避免 N-gon</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Blender 多边形建模——玩转 Blender
      </figcaption>
    </figure>
  );
}
