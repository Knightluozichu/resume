/**
 * <GsaServerTopologyDiagram>：网关→逻辑→DB 三层架构图解。
 * 纯静态展示，无交互。Server Component。DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GsaServerTopologyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网关逻辑DB 三层架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            三层拓扑：网关 → 逻辑 → 数据
          </text>

          {/* 客户端 */}
          <rect x="30" y="48" width="680" height="40" rx="6" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="73" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            客户端（万级连接）
          </text>

          <text x={VIEW_W / 2} y="104" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 网关层 */}
          <rect x="30" y="114" width="680" height="60" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="134" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">网关层（无状态 · 可水平扩容）</text>
          <text x={VIEW_W / 2} y="152" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">长连接维护 · 鉴权（Redis 查 token） · 限流 · 负载均衡</text>
          <text x={VIEW_W / 2} y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">铁律：绝不阻塞 I/O，绝不持有状态</text>

          <text x={VIEW_W / 2} y="194" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; 按场景路由 &darr;</text>

          {/* 逻辑层 */}
          <rect x="30" y="204" width="680" height="90" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="224" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">逻辑层（有状态 · 按场景分服）</text>

          <rect x="60" y="238" width="140" height="44" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">战斗服</text>
          <text x="130" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Actor 模型</text>

          <rect x="220" y="238" width="140" height="44" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="290" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">聊天服</text>
          <text x="290" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">频道广播</text>

          <rect x="380" y="238" width="140" height="44" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="450" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">匹配服</text>
          <text x="450" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">全局队列</text>

          <rect x="540" y="238" width="140" height="44" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="610" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">登录服</text>
          <text x="610" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">协程异步</text>

          <text x={VIEW_W / 2} y="314" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; 缓存优先 · 异步落库 &darr;</text>

          {/* 数据层 */}
          <rect x="30" y="324" width="330" height="90" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="195" y="344" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">缓存层（Redis 集群）</text>
          <text x="195" y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">会话 · 排行榜(ZSet) · 热数据</text>
          <text x="195" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">16384 哈希槽分片</text>
          <text x="195" y="398" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">读走缓存，毫秒级响应</text>

          <rect x="380" y="324" width="330" height="90" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="545" y="344" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">持久化层（分库分表）</text>
          <text x="545" y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">玩家档 · 交易流水 · 日志</text>
          <text x="545" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一致性哈希按 uid 分片</text>
          <text x="545" y="398" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">写经消息队列异步落库</text>

          <text x={VIEW_W / 2} y="438" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：分层解耦关注点，各层独立扩容、独立故障隔离
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网关→逻辑→DB 三层架构——无状态网关水平扩容、逻辑服按场景分服、数据层缓存优先
      </figcaption>
    </figure>
  );
}
