/**
 * <GspTcpSocketDiagram>：TCP Socket 通信流程图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GspTcpSocketDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="TCP Socket 三次握手与数据收发流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            TCP Socket 通信生命周期
          </text>

          {/* 客户端轴 */}
          <line x1="160" y1="56" x2="160" y2="400" stroke="var(--success)" strokeWidth="2" />
          <rect x="100" y="42" width="120" height="28" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="60" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">客户端</text>

          {/* 服务器轴 */}
          <line x1="580" y1="56" x2="580" y2="400" stroke="var(--accent)" strokeWidth="2" />
          <rect x="520" y="42" width="120" height="28" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="580" y="60" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">服务器</text>

          {/* 三次握手 */}
          <text x="40" y="92" fontSize="11" fontWeight="600" fill="var(--text-secondary)">三次握手</text>
          <line x1="160" y1="88" x2="575" y2="88" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#arrowWarn)" />
          <text x="370" y="82" textAnchor="middle" fontSize="11" fill="var(--warning)">SYN, seq=x</text>

          <line x1="580" y1="116" x2="165" y2="116" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#arrowWarn)" />
          <text x="370" y="110" textAnchor="middle" fontSize="11" fill="var(--warning)">SYN+ACK, seq=y, ack=x+1</text>

          <line x1="160" y1="144" x2="575" y2="144" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#arrowWarn)" />
          <text x="370" y="138" textAnchor="middle" fontSize="11" fill="var(--warning)">ACK, ack=y+1</text>

          <text x="370" y="162" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">连接建立 ESTABLISHED</text>

          {/* 数据收发 */}
          <text x="40" y="192" fontSize="11" fontWeight="600" fill="var(--text-secondary)">数据收发</text>
          <line x1="160" y1="188" x2="575" y2="188" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arrowSuccess)" />
          <text x="370" y="182" textAnchor="middle" fontSize="11" fill="var(--success)">send(data)</text>

          <line x1="580" y1="216" x2="165" y2="216" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowAccent)" />
          <text x="370" y="210" textAnchor="middle" fontSize="11" fill="var(--accent)">recv(data) → 回执</text>

          <line x1="160" y1="244" x2="575" y2="244" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arrowSuccess)" />
          <text x="370" y="238" textAnchor="middle" fontSize="11" fill="var(--success)">send(data2)</text>

          {/* 粘包说明 */}
          <rect x="100" y="268" width="480" height="40" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="340" y="285" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">粘包问题</text>
          <text x="340" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">TCP 是字节流，无消息边界 → 需在应用层定义封包格式</text>

          {/* 四次挥手 */}
          <text x="40" y="340" fontSize="11" fontWeight="600" fill="var(--text-secondary)">四次挥手</text>
          <line x1="160" y1="336" x2="575" y2="336" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrowTertiary)" />
          <text x="370" y="330" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">FIN</text>

          <line x1="580" y1="360" x2="165" y2="360" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrowTertiary)" />
          <text x="370" y="354" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">ACK</text>

          <line x1="580" y1="384" x2="165" y2="384" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrowTertiary)" />
          <text x="370" y="378" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">FIN</text>

          <line x1="160" y1="408" x2="575" y2="408" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrowTertiary)" />
          <text x="370" y="402" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">ACK → 连接关闭</text>

          <text x={VIEW_W / 2} y="430" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键：TCP 保证有序可靠，但不保证消息边界——粘包需在应用层解决
          </text>

          {/* 箭头标记定义 */}
          <defs>
            <marker id="arrowWarn" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--warning)" />
            </marker>
            <marker id="arrowSuccess" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--success)" />
            </marker>
            <marker id="arrowAccent" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
            </marker>
            <marker id="arrowTertiary" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        TCP Socket 通信生命周期——三次握手、数据收发、粘包与四次挥手
      </figcaption>
    </figure>
  );
}
