/**
 * <GmpGameplayCodingDiagram>：玩法编程与游戏逻辑图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmpGameplayCodingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="玩法编程与游戏逻辑图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            玩法编程三大核心模式
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            状态机（角色） · 行为树（AI） · 事件系统（解耦）
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="180" height="100" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">有限状态机</text>
          <text x="160" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">角色控制</text>
          <text x="160" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Idle → Run → Jump</text>
          <text x="160" y="174" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">条件触发切换</text>
          <text x="160" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">简单逻辑</text>

          <rect x="270" y="100" width="180" height="100" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">行为树</text>
          <text x="360" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">AI 决策</text>
          <text x="360" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">选择/序列/装饰</text>
          <text x="360" y="174" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">分层决策</text>
          <text x="360" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">复杂 AI</text>

          <rect x="470" y="100" width="180" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">事件系统</text>
          <text x="560" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">模块解耦</text>
          <text x="560" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Publish → Subscribe</text>
          <text x="560" y="174" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">多对多通信</text>
          <text x="560" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">可扩展</text>

          <text x={VIEW_W / 2} y="226" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            事件系统示例
          </text>

          <rect x="80" y="238" width="140" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="150" y="262" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">角色死亡</text>

          <text x="245" y="262" textAnchor="middle" fontSize="12" fill="var(--accent)">Publish</text>
          <text x="305" y="262" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="325" y="238" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="375" y="262" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">OnDeath</text>

          <text x="445" y="262" textAnchor="middle" fontSize="12" fill="var(--accent)">Subscribe</text>
          <text x="520" y="262" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="540" y="226" width="60" height="20" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.6" />
          <text x="570" y="240" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">UI</text>
          <rect x="540" y="250" width="60" height="20" rx="4" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="570" y="264" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">音效</text>
          <rect x="540" y="274" width="60" height="20" rx="4" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="0.6" />
          <text x="570" y="288" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">成就</text>

          <text x={VIEW_W / 2} y="318" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            简单逻辑用状态机 · 复杂 AI 用行为树 · 模块通信用事件
          </text>
          <text x={VIEW_W / 2} y="336" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            发送者不依赖接收者，新增功能不改现有代码
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        玩法编程——状态机、行为树与事件系统三大核心模式
      </figcaption>
    </figure>
  );
}
