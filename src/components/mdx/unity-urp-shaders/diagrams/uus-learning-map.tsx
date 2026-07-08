/**
 * <UusLearningMapDiagram>：Unity URP 内置 Shader 解析 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UusLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity URP 内置 Shader 解析全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity URP 内置 Shader 解析 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            基础架构 → Shader Graph → 光照阴影 → 后处理 → 优化
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="135" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="127" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">URP 基础</text>
          <text x="127" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">架构/管线</text>

          <rect x="210" y="100" width="135" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="277" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Shader Graph</text>
          <text x="277" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Lit/Unlit</text>

          <rect x="360" y="100" width="135" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="427" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">光照阴影</text>
          <text x="427" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Light/Shadow</text>

          <rect x="510" y="100" width="150" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="585" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">后处理/优化</text>
          <text x="585" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Pass/性能</text>

          <text x="127" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="277" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="427" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="585" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>

          <rect x="60" y="200" width="600" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            核心主线：从「管线理解」到「Shader 编写」到「效果实现」到「性能调优」
          </text>
          <text x={VIEW_W / 2} y="238" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            URP = 可编程渲染管线 + SRP Batch + 内置 Shader 库
          </text>

          <text x={VIEW_W / 2} y="282" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            学习路径
          </text>
          <text x={VIEW_W / 2} y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            URP 架构（管线基础） → Shader Graph（可视化着色） → Lit/Unlit（材质模型）
          </text>
          <text x={VIEW_W / 2} y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 光照阴影（PBR + Shadow） → 后处理（Volume） → 自定义 Pass → 性能优化
          </text>

          <text x={VIEW_W / 2} y="352" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：URP 是 Unity 的现代渲染管线，兼顾跨平台与可编程性
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity URP 内置 Shader 解析全书学习地图——从管线架构到性能优化
      </figcaption>
    </figure>
  );
}
