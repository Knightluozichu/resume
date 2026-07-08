/**
 * <GdfFinalReviewDiagram>：游戏设计基础总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdfFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏设计基础总复习图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏设计基础知识全景图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            MDA 框架 → 三要素 → 设计实践 · 机制是骨架，动态是行为，美学是感受
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="580" height="50" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="124" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">理论基石</text>
          <text x="100" y="140" textAnchor="start" fontSize="11" fill="var(--text-secondary)">MDA 框架：机制 → 动态 → 美学（规则到体验的转化透镜）</text>

          <text x={VIEW_W / 2} y="168" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="70" y="178" width="580" height="50" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="100" y="202" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--accent)">核心三要素</text>
          <text x="100" y="218" textAnchor="start" fontSize="11" fill="var(--text-secondary)">机制（行为空间）→ 动态（涌现行为）→ 美学（8 种体验目标）</text>

          <text x={VIEW_W / 2} y="246" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="70" y="256" width="580" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="100" y="280" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--warning)">设计实践</text>
          <text x="100" y="296" textAnchor="start" fontSize="11" fill="var(--text-secondary)">玩家体验（心流）→ 关卡（三层）→ 平衡（多策略）→ 原型（迭代）</text>

          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            逆向设计：A 美学目标 → D 动态行为 → M 机制规则
          </text>
          <text x={VIEW_W / 2} y="348" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            每个设计决策都问：它服务于哪个美学目标？
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏设计基础知识全景图——MDA 到设计实践的完整链路
      </figcaption>
    </figure>
  );
}
