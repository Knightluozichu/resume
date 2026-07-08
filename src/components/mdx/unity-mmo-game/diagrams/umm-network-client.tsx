/**
 * <UmmNetworkClientDiagram>：网络客户端架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function UmmNetworkClientDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网络客户端架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity 网络客户端架构
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从 Protobuf 序列化到连接管理的数据流
          </text>

          {/* 左列：发送流程 */}
          <text x="120" y="80" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">发送流程</text>

          <rect x="30" y="92" width="180" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="111" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">业务逻辑构造消息</text>
          <text x="120" y="127" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PlayerMoveReq 等</text>

          <text x="120" y="154" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="30" y="166" width="180" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="185" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Protobuf 序列化</text>
          <text x="120" y="201" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ToByteArray()</text>

          <text x="120" y="228" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="30" y="240" width="180" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="259" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">封包（长度前缀）</text>
          <text x="120" y="275" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">[4B len][payload]</text>

          <text x="120" y="302" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="30" y="314" width="180" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="333" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Socket.Send</text>
          <text x="120" y="349" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">TCP 字节流</text>

          {/* 中间：网络 */}
          <rect x="280" y="166" width="180" height="166" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="195" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">网络层</text>
          <text x="370" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">TCP 长连接</text>
          <text x="370" y="240" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">心跳保活</text>
          <text x="370" y="260" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">断线重连</text>
          <text x="370" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">粘包/半包处理</text>
          <text x="370" y="305" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">消息队列</text>

          {/* 右列：接收流程 */}
          <text x="620" y="80" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">接收流程</text>

          <rect x="530" y="92" width="180" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="620" y="111" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Socket.Receive</text>
          <text x="620" y="127" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">字节流接收</text>

          <text x="620" y="154" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="530" y="166" width="180" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="620" y="185" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">解包（长度前缀）</text>
          <text x="620" y="201" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">切分完整消息</text>

          <text x="620" y="228" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="530" y="240" width="180" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="620" y="259" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Protobuf 反序列化</text>
          <text x="620" y="275" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MergeFrom()</text>

          <text x="620" y="302" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="530" y="314" width="180" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="620" y="333" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">消息分发到 Handler</text>
          <text x="620" y="349" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">路由表查找</text>

          {/* 连接箭头 */}
          <line x1="210" y1="336" x2="280" y2="249" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="460" y1="249" x2="530" y2="114" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="4 3" />

          <text x={VIEW_W / 2} y="390" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：发送与接收是两条独立流水线，通过消息队列解耦，避免网络阻塞卡住主线程
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网络客户端架构——Protobuf 序列化、长度前缀封包、消息分发流水线
      </figcaption>
    </figure>
  );
}
