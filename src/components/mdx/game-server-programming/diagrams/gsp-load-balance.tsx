/**
 * <GspLoadBalanceDiagram>：负载均衡与扩容图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function GspLoadBalanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="负载均衡与扩容策略图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            负载均衡与弹性扩容
          </text>

          {/* 客户端 */}
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="11" fill="var(--success)">
            大量客户端连接
          </text>
          <rect x="60" y="66" width="60" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="90" y="82" textAnchor="middle" fontSize="9" fill="var(--success)">客户端</text>
          <rect x="130" y="66" width="60" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="160" y="82" textAnchor="middle" fontSize="9" fill="var(--success)">客户端</text>
          <rect x="200" y="66" width="60" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="230" y="82" textAnchor="middle" fontSize="9" fill="var(--success)">客户端</text>
          <rect x="270" y="66" width="60" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="300" y="82" textAnchor="middle" fontSize="9" fill="var(--success)">...</text>
          <rect x="340" y="66" width="60" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="82" textAnchor="middle" fontSize="9" fill="var(--success)">客户端</text>
          <rect x="410" y="66" width="60" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="440" y="82" textAnchor="middle" fontSize="9" fill="var(--success)">客户端</text>
          <rect x="480" y="66" width="60" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="510" y="82" textAnchor="middle" fontSize="9" fill="var(--success)">客户端</text>
          <rect x="550" y="66" width="60" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="580" y="82" textAnchor="middle" fontSize="9" fill="var(--success)">...</text>
          <rect x="620" y="66" width="60" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="650" y="82" textAnchor="middle" fontSize="9" fill="var(--success)">客户端</text>

          <text x={VIEW_W / 2} y="108" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 负载均衡层 */}
          <rect x="180" y="116" width="380" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="136" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">负载均衡器（LB）</text>
          <text x="370" y="152" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">轮询 / 加权 / 最少连接 / 一致性哈希</text>

          {/* 分发箭头 */}
          <line x1="250" y1="160" x2="120" y2="200" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <line x1="330" y1="160" x2="290" y2="200" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <line x1="410" y1="160" x2="450" y2="200" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <line x1="490" y1="160" x2="620" y2="200" stroke="var(--text-tertiary)" strokeWidth="1.2" />

          {/* 服务器节点 */}
          <rect x="50" y="200" width="140" height="56" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="120" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">节点 A</text>
          <text x="120" y="236" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CPU 60%</text>
          <text x="120" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">连接 2000</text>

          <rect x="220" y="200" width="140" height="56" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">节点 B</text>
          <text x="290" y="236" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CPU 85%</text>
          <text x="290" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">连接 3000</text>

          <rect x="390" y="200" width="140" height="56" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="460" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">节点 C</text>
          <text x="460" y="236" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CPU 55%</text>
          <text x="460" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">连接 1800</text>

          <rect x="560" y="200" width="140" height="56" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="630" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">节点 D (新)</text>
          <text x="630" y="236" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">弹性扩容</text>
          <text x="630" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分担负载</text>

          {/* 扩容说明 */}
          <text x={VIEW_W / 2} y="286" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">
            弹性扩容触发条件
          </text>
          <rect x="50" y="296" width="200" height="36" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="150" y="318" textAnchor="middle" fontSize="10" fill="var(--danger)">CPU &gt; 80% 持续 5 分钟</text>

          <rect x="270" y="296" width="200" height="36" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="318" textAnchor="middle" fontSize="10" fill="var(--danger)">连接数 &gt; 阈值</text>

          <rect x="490" y="296" width="200" height="36" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="590" y="318" textAnchor="middle" fontSize="10" fill="var(--danger)">队列积压 &gt; 水位线</text>

          {/* 会话保持 */}
          <rect x="50" y="350" width="640" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="370" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            会话保持（Session Sticky）
          </text>
          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            一致性哈希：同一玩家路由到同一节点，避免状态同步开销
          </text>
          <text x={VIEW_W / 2} y="402" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            节点下线时，虚拟槽迁移到相邻节点，最小化重分布
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        负载均衡与弹性扩容——LB 分发流量，监控触发扩容，一致性哈希保证会话保持
      </figcaption>
    </figure>
  );
}
