/**
 * <GpoLearningMapDiagram>：GPU Pro 系列 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpoLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GPU Pro 系列全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            GPU Pro 系列 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            渲染技术 → 光照阴影 → 图像空间 → GPU模拟 → 程序化 → 体积渲染
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="135" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="127" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">渲染技术</text>
          <text x="127" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">延迟/前向</text>

          <rect x="210" y="100" width="135" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="277" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">光照阴影</text>
          <text x="277" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">实时GI/软阴影</text>

          <rect x="360" y="100" width="135" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="427" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">图像空间</text>
          <text x="427" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SSAO/SSR</text>

          <rect x="510" y="100" width="150" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="585" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">GPU模拟/程序化</text>
          <text x="585" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">物理/生成</text>

          <text x="127" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="277" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="427" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="585" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>

          <rect x="60" y="200" width="600" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            核心主线：从「高效渲染」到「真实光照」到「屏幕空间效果」到「GPU 计算」
          </text>
          <text x={VIEW_W / 2} y="238" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            GPU Pro = 前沿渲染技术的工程实践合集
          </text>

          <text x={VIEW_W / 2} y="282" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            学习路径
          </text>
          <text x={VIEW_W / 2} y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            渲染技术（管线基础） → 光照阴影（PBR+GI） → 图像空间（SSAO/SSR）
          </text>
          <text x={VIEW_W / 2} y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → GPU 模拟（物理） → 程序化生成 → 体积渲染 → 移动端优化 → 高级着色
          </text>

          <text x={VIEW_W / 2} y="352" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：GPU Pro 是渲染技术的「论文工程化」参考书
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GPU Pro 系列全书学习地图——从渲染技术到 GPU 计算的全链路
      </figcaption>
    </figure>
  );
}
