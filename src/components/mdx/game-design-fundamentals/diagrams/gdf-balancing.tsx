/**
 * <GdfBalancingDiagram>：游戏平衡性图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdfBalancingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏平衡性图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏平衡：策略空间与调节方法
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            对称平衡 vs 非对称平衡 · 消除统治策略
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="280" height="80" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="210" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">对称平衡</text>
          <text x="210" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">所有选项效力相等</text>
          <text x="210" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">适合纯竞技（格斗/棋类）</text>
          <text x="210" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">胜率趋近 50%</text>

          <rect x="370" y="100" width="280" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="510" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">非对称平衡</text>
          <text x="510" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">各有所长各有劣势</text>
          <text x="510" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">适合策略深度（RTS/MOBA）</text>
          <text x="510" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">场景决定优劣</text>

          <text x={VIEW_W / 2} y="208" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">
            统治策略 = 平衡的最大敌人
          </text>

          <rect x="120" y="220" width="480" height="40" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            单一策略使用率 &gt;60% 或胜率 &gt;55% → 需要削弱
          </text>

          <text x={VIEW_W / 2} y="282" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            调节方法：微调迭代
          </text>
          <text x={VIEW_W / 2} y="302" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            每次调 1-2 个参数 · 幅度 5-10% · 观察数据再迭代
          </text>
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            平衡目标：多个策略可行，而非所有选项等价
          </text>
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            使用率分布健康 &gt; 均匀分布
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏平衡性——对称/非对称平衡与微调迭代方法
      </figcaption>
    </figure>
  );
}
