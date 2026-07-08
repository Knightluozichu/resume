/**
 * <UcnMessageRoutingDiagram>：消息路由与分发——消息号到 Handler 的派发流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function UcnMessageRoutingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="消息路由与分发——消息号到 Handler 的派发流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            消息路由与分发：从收包到业务 Handler
          </text>

          {/* 收包入口 */}
          <rect x="270" y="50" width="200" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="70" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">IO 线程收包</text>
          <text x="370" y="86" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">recv → 拆包 → 提取 MsgId</text>

          <text x="370" y="112" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 消息队列 */}
          <rect x="270" y="120" width="200" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="140" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">消息队列（无锁/有锁）</text>
          <text x="370" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IO 线程 → 逻辑线程解耦</text>

          <text x="370" y="182" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 路由表查找 */}
          <rect x="150" y="190" width="440" height="60" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="212" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">路由表查找：MsgId → Handler 映射</text>
          <text x="370" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">std::unordered_map&lt;uint16_t, std::function&lt;void(Session*, const char*, int)&gt;&gt;</text>

          {/* 分发到各 Handler */}
          <text x="120" y="280" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="280" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="620" y="280" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="40" y="295" width="200" height="55" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="316" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">LoginHandler</text>
          <text x="140" y="332" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">MsgId 1001-1099</text>
          <text x="140" y="345" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">登录/注册/心跳</text>

          <rect x="270" y="295" width="200" height="55" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="316" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">CombatHandler</text>
          <text x="370" y="332" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">MsgId 2001-2099</text>
          <text x="370" y="345" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">技能/伤害/死亡</text>

          <rect x="500" y="295" width="200" height="55" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="600" y="316" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">RoomHandler</text>
          <text x="600" y="332" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">MsgId 3001-3099</text>
          <text x="600" y="345" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">创建/加入/匹配</text>

          {/* 底部要点 */}
          <rect x="30" y="370" width="680" height="55" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="390" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">注册：服务启动时 REGISTER_HANDLER(1001, &amp;LoginHandler::OnLogin) 宏自动注册</text>
          <text x="370" y="406" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">分发：逻辑线程从队列取消息 → 查路由表 → 调用对应 Handler → Handler 内执行业务逻辑</text>
          <text x="370" y="422" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">关键：IO 与逻辑分离——IO 只管收发字节，逻辑只管处理消息，线程间用队列解耦</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        消息路由与分发——消息号驱动的 Handler 注册与派发，IO 线程与逻辑线程通过消息队列解耦
      </figcaption>
    </figure>
  );
}
