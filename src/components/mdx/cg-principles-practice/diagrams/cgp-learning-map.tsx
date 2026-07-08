/**
 * <CgpLearningMapDiagram>：计算机图形学：原理及实践 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CgpLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="计算机图形学原理及实践全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            计算机图形学：原理及实践 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            导论→光栅→2D/3D→渲染→光照→建模→高级
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="140" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">基础导论</text>
          <text x="130" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">历史/光栅</text>

          <rect x="220" y="100" width="140" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">2D/3D图形</text>
          <text x="290" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">变换/投影</text>

          <rect x="380" y="100" width="140" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="450" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">渲染光照</text>
          <text x="450" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">算法/模型</text>

          <rect x="540" y="100" width="120" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="600" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">高级专题</text>
          <text x="600" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">建模/动画</text>

          <text x="130" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="290" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="450" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="600" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>

          <rect x="60" y="200" width="600" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            核心主线：从「像素原理」到「完整图形系统」
          </text>
          <text x={VIEW_W / 2} y="238" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            数学是工具，算法是手段，视觉是目标
          </text>

          <text x={VIEW_W / 2} y="282" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            学习路径
          </text>
          <text x={VIEW_W / 2} y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            导论（领域认知） → 光栅（像素原理） → 2D/3D（坐标变换）
          </text>
          <text x={VIEW_W / 2} y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 渲染算法（可见性） → 光照（着色） → 建模（表示） → 高级（动画）
          </text>

          <text x={VIEW_W / 2} y="352" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：CGP 是图形学的「百科全书」，理论与实践并重
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        计算机图形学原理及实践全书学习地图——从像素原理到完整图形系统
      </figcaption>
    </figure>
  );
}
