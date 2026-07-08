/**
 * <Bl3LearningMapDiagram>：Blender 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Bl3LearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Blender 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Blender 全书学习地图</text>
          <rect x="70" y="80" width="130" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="135" y="110" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">基础</text>
          <text x="215" y="110" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="225" y="80" width="130" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="110" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">核心</text>
          <text x="370" y="110" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="380" y="80" width="130" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="445" y="110" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">进阶</text>
          <text x="525" y="110" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="535" y="80" width="130" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="600" y="110" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-tertiary)">复习</text>
          <rect x="70" y="170" width="580" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="196" textAnchor="middle" fontSize="12" fill="var(--text-primary)">核心主线：从「认识工具」到「导出引擎」</text>
          <text x="360" y="250" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">关键路径</text>
          <text x="360" y="272" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">界面 → 建模 → 材质 → 灯光 → 动画</text>
          <text x="360" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">→ 雕刻 → 渲染 → 导出 → 引擎验证</text>
          <text x="360" y="330" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">每一章建立在前一章的产出之上</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Blender 全书学习地图——玩转 Blender
      </figcaption>
    </figure>
  );
}
