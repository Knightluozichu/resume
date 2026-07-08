/**
 * <GpgLearningMapDiagram>：GPU Gems 系列全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpgLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GPU Gems 系列全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            GPU Gems 系列全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            自然效果 → 光照材质 → 图像几何 → GPU 计算 → 高级技术
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">自然效果</text>
          <text x="130" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">水/火/毛发</text>

          <rect x="210" y="100" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="270" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">光照阴影</text>
          <text x="270" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">材质着色器</text>

          <rect x="350" y="100" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="410" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">图像几何</text>
          <text x="410" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">后处理/细分</text>

          <rect x="490" y="100" width="120" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="550" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">GPU 计算</text>
          <text x="550" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">粒子/物理</text>

          <text x="130" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="270" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="410" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="550" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>

          <rect x="70" y="200" width="540" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            核心主线：从「像素级真实感」到「GPU 通用计算」
          </text>
          <text x={VIEW_W / 2} y="238" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            着色器是贯穿全书的工具，GPGPU 是终章的能力跃迁
          </text>

          <text x={VIEW_W / 2} y="282" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            学习路径
          </text>
          <text x={VIEW_W / 2} y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            自然效果（视觉直觉） → 光照材质（物理基础） → 图像几何（处理能力）
          </text>
          <text x={VIEW_W / 2} y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 粒子物理（动态模拟） → GPU 计算（通用并行） → 高级技术（综合实战）
          </text>

          <text x={VIEW_W / 2} y="352" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：GPU Gems 是「效果驱动」的实战宝典，每章都用真实案例讲透一个渲染难题
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GPU Gems 系列全书学习地图——从自然效果到 GPU 通用计算的进阶路径
      </figcaption>
    </figure>
  );
}
