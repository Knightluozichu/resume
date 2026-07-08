/**
 * <UmmDeploymentDiagram>：部署与运维图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function UmmDeploymentDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="部署与运维图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity MMO 部署与运维架构
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            分服、合服、热更的运维全景
          </text>

          {/* 顶层：网关层 */}
          <rect x="200" y="70" width="340" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">网关层（Gateway）</text>
          <text x="370" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">负载均衡 / 路由分发 / 跨服转发</text>

          <text x="370" y="132" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 中层：游戏服 */}
          <rect x="30" y="144" width="200" height="120" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="130" y="166" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">游戏服 A（1 区）</text>
          <rect x="45" y="178" width="170" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="130" y="194" textAnchor="middle" fontSize="10" fill="var(--success)">逻辑线程 + IO 线程</text>
          <rect x="45" y="208" width="170" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="130" y="224" textAnchor="middle" fontSize="10" fill="var(--success)">独立数据库实例</text>
          <rect x="45" y="238" width="170" height="20" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="130" y="252" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">5000 人在线</text>

          <rect x="270" y="144" width="200" height="120" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="166" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">游戏服 B（2 区）</text>
          <rect x="285" y="178" width="170" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="194" textAnchor="middle" fontSize="10" fill="var(--success)">逻辑线程 + IO 线程</text>
          <rect x="285" y="208" width="170" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="224" textAnchor="middle" fontSize="10" fill="var(--success)">独立数据库实例</text>
          <rect x="285" y="238" width="170" height="20" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="370" y="252" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">3000 人在线</text>

          <rect x="510" y="144" width="200" height="120" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="610" y="166" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">跨服中心</text>
          <rect x="525" y="178" width="170" height="24" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="610" y="194" textAnchor="middle" fontSize="10" fill="var(--warning)">跨服战场 / 排行榜</text>
          <rect x="525" y="208" width="170" height="24" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="610" y="224" textAnchor="middle" fontSize="10" fill="var(--warning)">全局匹配 / 公会战</text>
          <rect x="525" y="238" width="170" height="20" rx="4" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="610" y="252" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">共享 Redis 集群</text>

          {/* 底层：运维能力 */}
          <text x="370" y="290" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-secondary)">运维能力</text>

          <rect x="30" y="300" width="210" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="135" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">分服</text>
          <text x="135" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">新开服 → 数据隔离</text>
          <text x="135" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ 独立扩缩容</text>

          <rect x="265" y="300" width="210" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">合服</text>
          <text x="370" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">数据迁移 → ID 冲突处理</text>
          <text x="370" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ 停服维护窗口</text>

          <rect x="500" y="300" width="210" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="605" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">热更</text>
          <text x="605" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Lua/ILRuntime 热补丁</text>
          <text x="605" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ AssetBundle 差异更新</text>

          {/* 底部总结 */}
          <rect x="30" y="374" width="680" height="48" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="394" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：分服隔离风险、合服整合用户、热更不停服——三者共同保证长线运营
          </text>
          <text x={VIEW_W / 2} y="412" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            运维的核心不是「不出问题」，而是「出了问题能快速恢复」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        部署与运维架构——网关、游戏服、跨服中心三层与分服/合服/热更能力
      </figcaption>
    </figure>
  );
}
