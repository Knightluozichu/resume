/**
 * <UhmAnimationDiagram>：动画系统与过渡效果图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UhmAnimationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="动画系统与过渡效果图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            HMI 动画系统：数据驱动的过渡效果
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            数据变化 → 自动触发 → Tween 过渡 → 缓动曲线
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="160" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Tween 动画</text>
          <text x="150" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">代码插值，轻量</text>
          <text x="150" y="154" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">HMI 90% 场景</text>

          <rect x="280" y="100" width="160" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Animator</text>
          <text x="360" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">状态机，重量级</text>
          <text x="360" y="154" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">复杂多状态</text>

          <rect x="490" y="100" width="160" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="570" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">数据驱动</text>
          <text x="570" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自动触发</text>
          <text x="570" y="154" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">非手动调用</text>

          <text x={VIEW_W / 2} y="190" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">
            缓动曲线选择
          </text>

          <rect x="70" y="208" width="180" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="160" y="230" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Ease Out</text>
          <text x="160" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">快进慢出</text>
          <text x="160" y="260" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">出现/展开</text>

          <rect x="270" y="208" width="180" height="56" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="360" y="230" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Ease In</text>
          <text x="360" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">慢进快出</text>
          <text x="360" y="260" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">消失/收起</text>

          <rect x="470" y="208" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="560" y="230" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Ease In Out</text>
          <text x="560" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">慢进慢出</text>
          <text x="560" y="260" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">状态切换</text>

          <text x={VIEW_W / 2} y="298" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            HMI 动画时长：界面过渡 100-300ms | 数据指示器 50-150ms
          </text>
          <text x={VIEW_W / 2} y="316" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            原则：快而准——够快不等用户，够准不误读数据
          </text>
          <text x={VIEW_W / 2} y="334" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            动画不是炫技，而是让数据变化变得可感知
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        HMI 动画系统——Tween 与 Animator 的选择及缓动曲线策略
      </figcaption>
    </figure>
  );
}
