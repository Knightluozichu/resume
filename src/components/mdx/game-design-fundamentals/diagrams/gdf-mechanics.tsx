/**
 * <GdfMechanicsDiagram>：游戏机制设计图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdfMechanicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏机制设计图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏机制分类与行为空间
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            规则定义边界 · 边界内是玩家的自由
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="140" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">基础机制</text>
          <text x="140" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">移动/跳跃/攻击</text>

          <rect x="225" y="100" width="140" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="295" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">经济机制</text>
          <text x="295" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">资源/交易</text>

          <rect x="380" y="100" width="140" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="450" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">进度机制</text>
          <text x="450" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">经验/等级/解锁</text>

          <rect x="535" y="100" width="130" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="600" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">状态机制</text>
          <text x="600" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生命/Buff</text>

          <text x={VIEW_W / 2} y="186" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">
            行为空间：机制允许的所有合法操作
          </text>

          <rect x="120" y="200" width="480" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="180" y="224" textAnchor="middle" fontSize="11" fill="var(--danger)">太小：无聊</text>
          <text x="180" y="240" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">选择少/无策略</text>
          <text x="360" y="224" textAnchor="middle" fontSize="11" fill="var(--success)">大而有界：好</text>
          <text x="360" y="240" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">丰富可能/清晰边界</text>
          <text x="540" y="224" textAnchor="middle" fontSize="11" fill="var(--warning)">太大：迷茫</text>
          <text x="540" y="240" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">不知该做什么</text>

          <text x={VIEW_W / 2} y="298" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            三原则：一致性 + 可读性 + 深度
          </text>
          <text x={VIEW_W / 2} y="316" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            核心机制 3-5 个，机制间能组合产生涌现行为
          </text>
          <text x={VIEW_W / 2} y="334" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            跳跃+攻击=跳劈 · 重力+风=滑翔 · 组合越丰富行为空间越深
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏机制设计——分类、行为空间与设计三原则
      </figcaption>
    </figure>
  );
}
