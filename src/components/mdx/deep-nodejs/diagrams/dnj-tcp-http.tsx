/**
 * <DnjTcpHttpDiagram>：TCP 与 HTTP 实现图解（连接池 / Keep-Alive）。
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DnjTcpHttpDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="TCP与HTTP实现连接池与Keep-Alive图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            TCP 与 HTTP：连接复用与 Keep-Alive
          </text>

          {/* 无 Keep-Alive */}
          <text x="180" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">无 Keep-Alive（HTTP/1.0）</text>

          <rect x="40" y="64" width="80" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="80" y="88" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Client</text>

          <rect x="240" y="64" width="80" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="280" y="88" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Server</text>

          <line x1="120" y1="78" x2="240" y2="78" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arr4)" />
          <text x="180" y="74" textAnchor="middle" fontSize="8" fill="var(--success)">TCP 握手</text>

          <line x1="120" y1="92" x2="240" y2="92" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arr4)" />
          <text x="180" y="100" textAnchor="middle" fontSize="8" fill="var(--success)">HTTP 请求</text>

          <line x1="240" y1="108" x2="120" y2="108" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#arr4)" />
          <text x="180" y="116" textAnchor="middle" fontSize="8" fill="var(--warning)">HTTP 响应</text>

          <line x1="240" y1="124" x2="120" y2="124" stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#arr4)" strokeDasharray="3 2" />
          <text x="180" y="132" textAnchor="middle" fontSize="8" fill="var(--danger)">TCP 断开</text>

          <line x1="120" y1="140" x2="240" y2="140" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arr4)" />
          <text x="180" y="136" textAnchor="middle" fontSize="8" fill="var(--danger)">重新握手（浪费）</text>

          <text x="180" y="160" textAnchor="middle" fontSize="9" fill="var(--danger)">每个请求 = 3 次握手 + 4 次挥手</text>

          {/* 有 Keep-Alive */}
          <text x="560" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Keep-Alive（HTTP/1.1 默认）</text>

          <rect x="420" y="64" width="80" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="460" y="88" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Client</text>

          <rect x="620" y="64" width="80" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="660" y="88" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Server</text>

          <line x1="500" y1="78" x2="620" y2="78" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arr4)" />
          <text x="560" y="74" textAnchor="middle" fontSize="8" fill="var(--success)">TCP 握手（仅一次）</text>

          <line x1="500" y1="96" x2="620" y2="96" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arr4)" />
          <text x="560" y="104" textAnchor="middle" fontSize="8" fill="var(--success)">请求1</text>

          <line x1="620" y1="112" x2="500" y2="112" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#arr4)" />
          <text x="560" y="120" textAnchor="middle" fontSize="8" fill="var(--warning)">响应1</text>

          <line x1="500" y1="128" x2="620" y2="128" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arr4)" />
          <text x="560" y="136" textAnchor="middle" fontSize="8" fill="var(--success)">请求2（复用连接）</text>

          <line x1="620" y1="144" x2="500" y2="144" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#arr4)" />
          <text x="560" y="152" textAnchor="middle" fontSize="8" fill="var(--warning)">响应2</text>

          <text x="560" y="172" textAnchor="middle" fontSize="9" fill="var(--success)">多请求复用一条 TCP 连接</text>

          {/* Agent 连接池 */}
          <text x={VIEW_W / 2} y="200" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">http.Agent 连接池</text>

          <rect x="50" y="214" width="640" height="100" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" />

          <rect x="70" y="228" width="130" height="70" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="248" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">Agent</text>
          <text x="135" y="264" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">keepAlive: true</text>
          <text x="135" y="278" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">maxSockets: 5</text>
          <text x="135" y="292" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">maxFreeSockets: 256</text>

          <text x="208" y="262" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="230" y="228" width="90" height="70" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="275" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">连接1</text>
          <text x="275" y="264" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">host:port</text>
          <text x="275" y="280" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">活跃中</text>

          <rect x="330" y="228" width="90" height="70" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="375" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">连接2</text>
          <text x="375" y="264" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">host:port</text>
          <text x="375" y="280" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">空闲池</text>

          <rect x="430" y="228" width="90" height="70" rx="6" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="475" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-tertiary)">等待队列</text>
          <text x="475" y="264" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">超 maxSockets</text>
          <text x="475" y="280" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">排队等待</text>

          <rect x="530" y="228" width="140" height="70" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="600" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">keepAliveTimeout</text>
          <text x="600" y="264" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">空闲超时关闭</text>
          <text x="600" y="280" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">默认 4000ms</text>

          {/* HTTP 模块层次 */}
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Node HTTP 模块分层</text>

          <rect x="120" y="352" width="500" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="374" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">http.Server / http.ClientRequest</text>

          <rect x="120" y="394" width="500" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="416" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">net.Socket（TCP 流，Duplex Stream）</text>

          <rect x="120" y="436" width="500" height="36" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="458" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">libuv（epoll / kqueue / IOCP）</text>

          <defs>
            <marker id="arr4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" opacity="0.6" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        TCP 与 HTTP 实现——Keep-Alive 连接复用、Agent 连接池、net.Socket 流式分层
      </figcaption>
    </figure>
  );
}
