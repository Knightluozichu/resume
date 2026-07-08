/**
 * <GspServerArchitectureDiagram>：服务器架构（分服/跨服/网关）图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GspServerArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="服务器架构分服跨服网关图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏服务器三层架构
          </text>

          {/* 客户端层 */}
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">
            客户端层
          </text>
          <rect x="80" y="66" width="80" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="86" textAnchor="middle" fontSize="11" fill="var(--success)">玩家A</text>
          <rect x="200" y="66" width="80" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="240" y="86" textAnchor="middle" fontSize="11" fill="var(--success)">玩家B</text>
          <rect x="320" y="66" width="80" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="86" textAnchor="middle" fontSize="11" fill="var(--success)">玩家C</text>
          <rect x="440" y="66" width="80" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="480" y="86" textAnchor="middle" fontSize="11" fill="var(--success)">玩家D</text>
          <rect x="560" y="66" width="80" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="86" textAnchor="middle" fontSize="11" fill="var(--success)">玩家E</text>

          {/* 连线到网关层 */}
          <text x="370" y="118" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 网关层 */}
          <text x={VIEW_W / 2} y="136" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">
            网关层（Gateway）
          </text>
          <rect x="120" y="144" width="160" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="162" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">网关 1</text>
          <text x="200" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">鉴权/加密/路由</text>

          <rect x="320" y="144" width="160" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="400" y="162" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">网关 2</text>
          <text x="400" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">鉴权/加密/路由</text>

          <rect x="520" y="144" width="160" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="162" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">网关 3</text>
          <text x="600" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">鉴权/加密/路由</text>

          {/* 连线到逻辑层 */}
          <text x="370" y="204" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 逻辑服务器层 */}
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            逻辑服务器层（分服）
          </text>
          <rect x="60" y="230" width="180" height="56" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="150" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">1 区 逻辑服</text>
          <text x="150" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">战斗/背包/任务</text>
          <text x="150" y="280" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">独立 DB</text>

          <rect x="280" y="230" width="180" height="56" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">2 区 逻辑服</text>
          <text x="370" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">战斗/背包/任务</text>
          <text x="370" y="280" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">独立 DB</text>

          <rect x="500" y="230" width="180" height="56" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="590" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">3 区 逻辑服</text>
          <text x="590" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">战斗/背包/任务</text>
          <text x="590" y="280" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">独立 DB</text>

          {/* 跨服连接 */}
          <line x1="240" y1="258" x2="280" y2="258" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="460" y1="258" x2="500" y2="258" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* 跨服中心 */}
          <text x="370" y="316" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">
            跨服中心
          </text>
          <rect x="220" y="324" width="300" height="48" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="344" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">跨服服务器</text>
          <text x="370" y="360" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">跨服副本 / 排行榜 / 公会战 / 匹配</text>

          <line x1="150" y1="286" x2="250" y2="324" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.6" />
          <line x1="370" y1="286" x2="370" y2="324" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.6" />
          <line x1="590" y1="286" x2="490" y2="324" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.6" />

          {/* 数据层 */}
          <text x={VIEW_W / 2} y="396" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">
            数据层
          </text>
          <rect x="200" y="404" width="140" height="28" rx="6" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="270" y="422" textAnchor="middle" fontSize="11" fill="var(--text-primary)">MySQL（持久化）</text>
          <rect x="400" y="404" width="140" height="28" rx="6" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="470" y="422" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Redis（缓存）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏服务器三层架构——网关层负载分流，逻辑层分服隔离，跨服中心协调区服间交互
      </figcaption>
    </figure>
  );
}
