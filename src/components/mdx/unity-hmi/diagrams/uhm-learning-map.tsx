/**
 * <UhmLearningMapDiagram>：Unity for HMI 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UhmLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity for HMI 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity for HMI 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            基础入门 → 核心技能 → 高级实践 → 总复习
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="130" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="135" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">基础入门</text>
          <text x="135" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">HMI/UI框架</text>

          <rect x="220" y="100" width="130" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="285" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">核心技能</text>
          <text x="285" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">绑定/动画/输入</text>

          <rect x="370" y="100" width="130" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="435" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">高级实践</text>
          <text x="435" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">性能/部署</text>

          <rect x="520" y="100" width="130" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="585" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">总复习</text>
          <text x="585" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">知识串联</text>

          <text x="135" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="285" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="435" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="585" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>

          <rect x="70" y="200" width="580" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            核心主线：从「理解 HMI」到「驱动界面」再到「优化发布」
          </text>
          <text x={VIEW_W / 2} y="238" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            UI 是门面，数据是灵魂，性能是底线
          </text>

          <text x={VIEW_W / 2} y="282" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            学习路径
          </text>
          <text x={VIEW_W / 2} y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            HMI 基础（概念认知） → UI 框架（界面搭建） → 数据绑定（驱动机制）
          </text>
          <text x={VIEW_W / 2} y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 动画（视觉反馈） → 输入处理（交互响应） → 性能优化（工程落地）
          </text>
          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 部署发布（上线交付） → 高级 HMI（进阶能力）
          </text>

          <text x={VIEW_W / 2} y="352" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：Unity HMI 是工业级界面开发，理论与工程并重
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity for HMI 全书学习地图——从基础入门到高级实践的进阶路径
      </figcaption>
    </figure>
  );
}
