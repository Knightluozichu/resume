/**
 * <GspCacheStrategyDiagram>：缓存策略与一致性图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function GspCacheStrategyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="缓存策略与数据一致性图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            缓存一致性策略对比
          </text>

          {/* Cache-Aside */}
          <text x="180" y="60" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">
            Cache-Aside（旁路缓存）
          </text>
          <rect x="50" y="70" width="260" height="120" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />

          <rect x="66" y="84" width="228" height="24" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="0.8" />
          <text x="180" y="100" textAnchor="middle" fontSize="10" fill="var(--success)">读：Cache → Miss → DB → 回填</text>

          <rect x="66" y="116" width="228" height="24" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="0.8" />
          <text x="180" y="132" textAnchor="middle" fontSize="10" fill="var(--success)">写：更新 DB → 删 Cache</text>

          <rect x="66" y="148" width="228" height="32" rx="4" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="180" y="162" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">简单可靠，最常用</text>
          <text x="180" y="174" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">短暂不一致窗口</text>

          {/* Write-Through */}
          <text x="460" y="60" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">
            Write-Through（直写）
          </text>
          <rect x="330" y="70" width="260" height="120" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />

          <rect x="346" y="84" width="228" height="24" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="460" y="100" textAnchor="middle" fontSize="10" fill="var(--warning)">读：直接读 Cache</text>

          <rect x="346" y="116" width="228" height="24" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="460" y="132" textAnchor="middle" fontSize="10" fill="var(--warning)">写：同时写 Cache + DB</text>

          <rect x="346" y="148" width="228" height="32" rx="4" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="460" y="162" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">强一致，写延迟高</text>
          <text x="460" y="174" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">适合写少读多</text>

          {/* Write-Behind */}
          <text x={VIEW_W / 2} y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">
            Write-Behind（异步写回）
          </text>
          <rect x="200" y="222" width="340" height="80" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />

          <rect x="216" y="236" width="308" height="24" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="370" y="252" textAnchor="middle" fontSize="10" fill="var(--danger)">写：只写 Cache → 标记脏 → 异步批量落 DB</text>

          <rect x="216" y="268" width="308" height="24" rx="4" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="370" y="284" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">写性能极高，容忍数据丢失风险</text>

          {/* 淘汰策略 */}
          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            缓存淘汰策略
          </text>
          <rect x="50" y="334" width="140" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="120" y="356" textAnchor="middle" fontSize="11" fill="var(--accent)">LRU 最近最少</text>

          <rect x="210" y="334" width="140" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="280" y="356" textAnchor="middle" fontSize="11" fill="var(--accent)">LFU 最少频率</text>

          <rect x="370" y="334" width="140" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="440" y="356" textAnchor="middle" fontSize="11" fill="var(--accent)">TTL 过期淘汰</text>

          <rect x="530" y="334" width="160" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="610" y="356" textAnchor="middle" fontSize="11" fill="var(--accent)">Random 随机淘汰</text>

          {/* 防穿透/击穿/雪崩 */}
          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            防穿透：空值缓存 / 布隆过滤器    防击穿：互斥锁    防雪崩：TTL 随机化
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        缓存一致性策略对比——从 Cache-Aside 到 Write-Behind，一致性 vs 性能的权衡
      </figcaption>
    </figure>
  );
}
