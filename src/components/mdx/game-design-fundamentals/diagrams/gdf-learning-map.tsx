/**
 * <GdfLearningMapDiagram>：游戏设计基础全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdfLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏设计基础全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏设计基础全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            MDA 框架 → 三要素 → 玩家体验 → 设计实践
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="130" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="135" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">理论基础</text>
          <text x="135" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MDA 框架</text>

          <rect x="220" y="100" width="130" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="285" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">核心三要素</text>
          <text x="285" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">机制/动态/美学</text>

          <rect x="370" y="100" width="130" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="435" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">玩家中心</text>
          <text x="435" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">体验/关卡/平衡</text>

          <rect x="520" y="100" width="130" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="585" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">设计实践</text>
          <text x="585" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">原型/迭代</text>

          <text x="135" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="285" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="435" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="585" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>

          <rect x="70" y="200" width="580" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            核心主线：从「理解游戏构成」到「设计好体验」
          </text>
          <text x={VIEW_W / 2} y="238" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            机制是骨架，动态是行为，美学是感受
          </text>

          <text x={VIEW_W / 2} y="282" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            MDA 转化链路
          </text>
          <text x={VIEW_W / 2} y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            M（规则） → D（涌现行为） → A（玩家体验）
          </text>
          <text x={VIEW_W / 2} y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            设计师从 M 出发，玩家从 A 出发
          </text>
          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            调 M 产生期望的 D，让玩家获得期望的 A
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏设计基础全书学习地图——从 MDA 框架到设计实践的进阶路径
      </figcaption>
    </figure>
  );
}
