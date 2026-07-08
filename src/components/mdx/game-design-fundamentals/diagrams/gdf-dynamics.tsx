/**
 * <GdfDynamicsDiagram>：动态与涌现行为图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdfDynamicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="动态与涌现行为图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            动态：从机制到涌现行为
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            简单规则组合 → 不可预测的复杂行为
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <text x={VIEW_W / 2} y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">动态三层次</text>

          <rect x="70" y="112" width="170" height="60" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="155" y="134" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">微观动态</text>
          <text x="155" y="150" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">单次操作行为</text>
          <text x="155" y="164" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">跳劈/闪避/格挡</text>

          <rect x="265" y="112" width="170" height="60" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="134" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">中观动态</text>
          <text x="350" y="150" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">短期策略</text>
          <text x="350" y="164" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">连招/配合/路线</text>

          <rect x="460" y="112" width="190" height="60" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="555" y="134" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">宏观动态</text>
          <text x="555" y="150" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">长期博弈/Meta</text>
          <text x="555" y="164" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">经济运营/选人</text>

          <text x={VIEW_W / 2} y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">涌现分类</text>

          <rect x="100" y="212" width="260" height="60" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="230" y="234" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">正向涌现</text>
          <text x="230" y="250" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">速通/连招/卡位战术</text>
          <text x="230" y="264" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">增加深度，保留</text>

          <rect x="380" y="212" width="260" height="60" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="510" y="234" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">负向涌现</text>
          <text x="510" y="250" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">逃课/无限循环/崩溃</text>
          <text x="510" y="264" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">破坏体验，修补</text>

          <text x={VIEW_W / 2} y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            调控原则：引导而非禁止
          </text>
          <text x={VIEW_W / 2} y="318" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            调参数（降低逃课收益）> 加禁令（禁止行为）
          </text>
          <text x={VIEW_W / 2} y="336" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            让正道成为最优选择，而非禁止偏门
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动态与涌现行为——三层次、正负分类与调控原则
      </figcaption>
    </figure>
  );
}
