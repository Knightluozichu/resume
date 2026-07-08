/**
 * <FengDeployStrategyDiagram>：部署策略（蓝绿/灰度/CDN回滚）图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function FengDeployStrategyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="部署策略蓝绿灰度与CDN回滚图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            部署策略：蓝绿 / 灰度 / CDN 回滚
          </text>

          {/* 蓝绿部署 */}
          <rect x="30" y="50" width="210" height="180" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="135" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">蓝绿部署</text>

          <rect x="50" y="84" width="80" height="40" rx="6" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.2" />
          <text x="90" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">蓝（旧版）</text>

          <rect x="140" y="84" width="80" height="40" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="180" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">绿（新版）</text>

          <text x="135" y="142" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">两套环境并存</text>
          <text x="135" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">流量切换：蓝 → 绿</text>
          <line x1="100" y1="172" x2="170" y2="172" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="170,172 164,168 164,176" fill="var(--text-tertiary)" />
          <text x="135" y="190" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">秒级切流，旧版保留兜底</text>
          <text x="135" y="206" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">回滚 = 切回蓝</text>
          <text x="135" y="222" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">代价：双倍资源</text>

          {/* 灰度发布 */}
          <rect x="265" y="50" width="210" height="180" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="370" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">灰度发布</text>

          <rect x="285" y="84" width="170" height="28" rx="6" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="102" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">旧版 90% 流量</text>

          <rect x="285" y="120" width="170" height="28" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="138" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">新版 10% 流量</text>

          <text x="370" y="162" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">渐进放量：10% → 50% → 100%</text>
          <text x="370" y="178" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">按用户 / 地域 / cookie 分流</text>
          <text x="370" y="194" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">观察指标无异常再放量</text>
          <text x="370" y="210" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">异常即停，影响面小</text>
          <text x="370" y="222" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">回滚 = 流量回旧版</text>

          {/* CDN 回滚 */}
          <rect x="500" y="50" width="210" height="180" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="605" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">CDN 版本回滚</text>

          <rect x="520" y="84" width="80" height="34" rx="6" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="560" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">v2 异常</text>

          <rect x="610" y="84" width="80" height="34" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="650" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">v1 回滚</text>

          <text x="605" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">静态资源版本化</text>
          <text x="605" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CDN 切换入口指向旧版本</text>
          <text x="605" y="168" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">无需重新构建发布</text>
          <text x="605" y="184" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">秒级生效、全局回退</text>
          <text x="605" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">前提：旧版本未过期清理</text>
          <text x="605" y="216" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">适合纯前端静态站点</text>

          {/* 底部对比表 */}
          <rect x="30" y="248" width="680" height="36" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="135" y="270" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">蓝绿：秒切、双资源</text>
          <text x="370" y="270" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">灰度：渐进、风险低</text>
          <text x="605" y="270" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">CDN回滚：秒级、免构建</text>

          {/* 选型建议 */}
          <rect x="30" y="300" width="680" height="140" rx="10" fill="var(--text-tertiary)" fillOpacity="0.05" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="370" y="322" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">选型决策</text>

          <text x="50" y="344" fontSize="10" fill="var(--text-secondary)">- 需要立即全量切换、有备用环境 → 蓝绿部署</text>
          <text x="50" y="362" fontSize="10" fill="var(--text-secondary)">- 大版本变更、想控制爆炸半径 → 灰度发布</text>
          <text x="50" y="380" fontSize="10" fill="var(--text-secondary)">- 纯静态站点、线上故障需秒级恢复 → CDN 版本回滚</text>
          <text x="50" y="398" fontSize="10" fill="var(--text-secondary)">- 生产实践常组合：灰度放量 + 蓝绿保底 + CDN 兜底回滚</text>
          <text x="50" y="424" fontSize="10" fill="var(--text-tertiary)">核心原则：可回滚的发布才是安全发布——任何策略都须预留回退路径</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        部署策略对比——蓝绿秒切、灰度渐进放量、CDN 版本回滚的选型与回退路径
      </figcaption>
    </figure>
  );
}
