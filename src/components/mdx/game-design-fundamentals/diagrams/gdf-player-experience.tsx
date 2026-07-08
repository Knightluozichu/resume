/**
 * <GdfPlayerExperienceDiagram>：玩家体验设计图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdfPlayerExperienceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="玩家体验设计图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            心流区与体验曲线
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            挑战 ≈ 能力 = 心流 · 挑战 > 能力 = 焦虑 · 挑战 < 能力 = 无聊
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="80" y="100" width="200" height="50" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="180" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">焦虑区</text>
          <text x="180" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">挑战 &gt; 能力</text>

          <rect x="290" y="100" width="140" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">心流区</text>
          <text x="360" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">挑战 ≈ 能力</text>

          <rect x="440" y="100" width="200" height="50" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="540" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">无聊区</text>
          <text x="540" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">挑战 &lt; 能力</text>

          <text x={VIEW_W / 2} y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            阶梯式体验曲线
          </text>

          <rect x="80" y="194" width="100" height="30" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="0.8" />
          <text x="130" y="213" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">学习</text>

          <rect x="185" y="194" width="70" height="30" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="220" y="213" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">挑战</text>

          <rect x="260" y="194" width="90" height="30" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="0.8" />
          <text x="305" y="213" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">恢复</text>

          <rect x="355" y="194" width="70" height="30" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="390" y="213" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">挑战</text>

          <rect x="430" y="194" width="90" height="30" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="0.8" />
          <text x="475" y="213" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">恢复</text>

          <rect x="525" y="194" width="70" height="30" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="560" y="213" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Boss</text>

          <text x={VIEW_W / 2} y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            玩家动机四象限
          </text>

          <rect x="90" y="264" width="130" height="40" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="155" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">成就型</text>

          <rect x="230" y="264" width="130" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="295" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">探索型</text>

          <rect x="370" y="264" width="130" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="435" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">社交型</text>

          <rect x="510" y="264" width="130" height="40" rx="6" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="575" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">杀时间型</text>

          <text x={VIEW_W / 2} y="328" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            动态难度：成功→技能↑→难度↑ · 失败→技能↓→难度↓
          </text>
          <text x={VIEW_W / 2} y="346" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            目标：难度 ≈ 技能 × 1.1，始终在心流区
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        玩家体验设计——心流区、阶梯式体验曲线与玩家动机
      </figcaption>
    </figure>
  );
}
