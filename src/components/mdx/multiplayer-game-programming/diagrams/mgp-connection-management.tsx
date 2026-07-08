/**
 * <MgpConnectionManagementDiagram>：连接管理与会话状态机图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function MgpConnectionManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="连接管理与会话状态机图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            UDP 连接状态机与握手流程
          </text>

          {/* 状态机流程 */}
          <rect x="40" y="56" width="140" height="48" rx="8" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="110" y="78" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">Disconnected</text>
          <text x="110" y="94" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">未连接</text>

          {/* 箭头 */}
          <text x="195" y="84" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="195" y="74" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">Connect()</text>

          <rect x="210" y="56" width="140" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="280" y="78" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Connecting</text>
          <text x="280" y="94" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">握手中</text>

          <text x="365" y="84" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="365" y="74" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">握手成功</text>

          <rect x="380" y="56" width="140" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="450" y="78" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Connected</text>
          <text x="450" y="94" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">正常通信</text>

          <text x="535" y="84" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="535" y="74" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">Disconnect()</text>

          <rect x="550" y="56" width="140" height="48" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="620" y="78" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Disconnecting</text>
          <text x="620" y="94" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">发送断连包</text>

          {/* 超时回退箭头 */}
          <path d="M 450 110 Q 450 130 280 130 Q 110 130 110 110" fill="none" stroke="var(--danger)" strokeWidth="1" strokeDasharray="4" />
          <text x="280" y="146" textAnchor="middle" fontSize="9" fill="var(--danger)">超时 5-10s 无包 &rarr; 断开</text>

          {/* 握手协议流程 */}
          <rect x="30" y="164" width="680" height="150" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="186" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">挑战-响应握手协议</text>

          {/* 客户端 */}
          <text x="80" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">客户端</text>
          <line x1="80" y1="214" x2="80" y2="300" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 服务器 */}
          <text x="660" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">服务器</text>
          <line x1="660" y1="214" x2="660" y2="300" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 消息1: CONNECT_REQUEST */}
          <line x1="82" y1="228" x2="658" y2="228" stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#arrow-success)" />
          <text x="370" y="224" textAnchor="middle" fontSize="9" fill="var(--success)">1. CONNECT_REQUEST (protocolVersion, clientChallenge)</text>

          {/* 消息2: CONNECT_CHALLENGE */}
          <line x1="658" y1="248" x2="82" y2="248" stroke="var(--warning)" strokeWidth="1.2" markerEnd="url(#arrow-warning)" />
          <text x="370" y="244" textAnchor="middle" fontSize="9" fill="var(--warning)">2. CONNECT_CHALLENGE (serverChallenge, echo clientChallenge)</text>

          {/* 消息3: CONNECT_RESPONSE */}
          <line x1="82" y1="268" x2="658" y2="268" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow-accent)" />
          <text x="370" y="264" textAnchor="middle" fontSize="9" fill="var(--accent)">3. CONNECT_RESPONSE (echo serverChallenge, clientSalt)</text>

          {/* 消息4: CONNECT_ACCEPT */}
          <line x1="658" y1="288" x2="82" y2="288" stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#arrow-success)" />
          <text x="370" y="284" textAnchor="middle" fontSize="9" fill="var(--success)">4. CONNECT_ACCEPT (clientId) &rarr; 进入 Connected</text>

          <defs>
            <marker id="arrow-success" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="var(--success)" />
            </marker>
            <marker id="arrow-warning" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="var(--warning)" />
            </marker>
            <marker id="arrow-accent" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 底部：保活与超时 */}
          <text x="180" y="346" fontSize="10" fill="var(--text-secondary)">保活心跳：每 1s 发 KEEPALIVE</text>
          <text x="180" y="362" fontSize="10" fill="var(--text-secondary)">超时断连：5-10s 无包 &rarr; Disconnected</text>
          <text x="460" y="346" fontSize="10" fill="var(--text-tertiary)">防伪造：随机 challenge</text>
          <text x="460" y="362" fontSize="10" fill="var(--text-tertiary)">防重放：每次握手随机数不同</text>

          <text x={VIEW_W / 2} y="400" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：UDP 无连接状态，必须在应用层自建会话语义
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        连接管理与会话状态机——状态转移、挑战-响应握手与保活超时
      </figcaption>
    </figure>
  );
}
