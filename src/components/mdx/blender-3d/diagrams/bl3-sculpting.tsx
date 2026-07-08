/**
 * <Bl3SculptingDiagram>：Blender 雕刻模式图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Bl3SculptingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Blender 雕刻模式图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Blender 雕刻模式</text>
          <rect x="60" y="75" width="140" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">低模基础</text>
          <text x="215" y="105" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="240" y="75" width="140" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="310" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Dyntopo</text>
          <text x="395" y="105" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="420" y="75" width="140" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="490" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">高模细节</text>
          <text x="360" y="170" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">笔刷工具箱</text>
          <rect x="80" y="195" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="130" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Grab</text>
          <text x="130" y="228" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">抓取拖动</text>
          <rect x="200" y="195" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="250" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Clay</text>
          <text x="250" y="228" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">堆泥巴</text>
          <rect x="320" y="195" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="370" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Flatten</text>
          <text x="370" y="228" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">压平</text>
          <rect x="440" y="195" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="490" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Crease</text>
          <text x="490" y="228" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">折痕</text>
          <rect x="560" y="195" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="610" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Smooth</text>
          <text x="610" y="228" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">平滑</text>
          <text x="360" y="280" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">高模 → 烘焙法线贴图 → 低模+贴图进游戏</text>
          <text x="360" y="305" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">适合有机体（角色/怪物/岩石），不适合硬表面</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Blender 雕刻模式——玩转 Blender
      </figcaption>
    </figure>
  );
}
