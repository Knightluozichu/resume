/**
 * <NdgTcpTlsDiagram>：TCP 与 TLS 加密通信图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function NdgTcpTlsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="TCP与TLS加密通信图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            TCP 与 TLS 加密通信
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            net 模块（裸 TCP）→ tls 模块（TLS 加密层）
          </text>

          {/* 上半：裸 TCP 三次握手 */}
          <rect x="30" y="64" width="680" height="150" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">TCP 三次握手（net.createServer / net.connect）</text>

          <rect x="60" y="100" width="90" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="105" y="124" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">客户端</text>

          <rect x="590" y="100" width="90" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="635" y="124" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">服务端</text>

          <text x="170" y="150" fontSize="9" fill="var(--accent)">① SYN seq=x</text>
          <line x1="150" y1="146" x2="590" y2="146" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr4)" />

          <text x="430" y="166" fontSize="9" fill="var(--warning)">② SYN+ACK seq=y ack=x+1</text>
          <line x1="590" y1="162" x2="150" y2="162" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#arr4w)" />

          <text x="170" y="182" fontSize="9" fill="var(--accent)">③ ACK ack=y+1</text>
          <line x1="150" y1="178" x2="590" y2="178" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr4)" />

          <text x="370" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">连接建立 → socket 双工流（Duplex），on("data") 收发数据</text>

          <defs>
            <marker id="arr4" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--accent)" />
            </marker>
            <marker id="arr4w" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* 下半：TLS 握手 */}
          <rect x="30" y="230" width="680" height="200" rx="12" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="250" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">TLS 握手（tls.createServer / tls.connect）</text>

          <rect x="60" y="266" width="90" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="105" y="288" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">客户端</text>

          <rect x="590" y="266" width="90" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="635" y="288" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">服务端</text>

          <text x="170" y="314" fontSize="9" fill="var(--accent)">① ClientHello（支持的密码套件 + 随机数）</text>
          <line x1="150" y1="310" x2="590" y2="310" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr4)" />

          <text x="430" y="330" fontSize="9" fill="var(--danger)">② ServerHello + 证书 + 公钥</text>
          <line x1="590" y1="326" x2="150" y2="326" stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#arr4d)" />

          <text x="170" y="346" fontSize="9" fill="var(--accent)">③ 验证证书链 → 生成预主密钥（公钥加密）</text>
          <line x1="150" y1="342" x2="590" y2="342" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr4)" />

          <text x="430" y="362" fontSize="9" fill="var(--danger)">④ 双方用随机数+预主密钥派生会话密钥</text>
          <line x1="590" y1="358" x2="150" y2="358" stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#arr4d)" />

          <text x="370" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">⑤ Finished — 之后用对称密钥加密所有应用数据</text>

          <defs>
            <marker id="arr4d" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--danger)" />
            </marker>
          </defs>

          <text x="370" y="402" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">非对称加密（RSA/ECDHE）协商 → 对称加密（AES）传输 = 性能与安全兼顾</text>
          <text x="370" y="418" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">证书链验证：根 CA → 中间 CA → 服务器证书，任一断裂即不信任</text>

          <text x={VIEW_W / 2} y="444" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            net = 传输层裸管道；tls = 在 net 之上叠加加密握手层
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        TCP与TLS——net模块三次握手建立裸连接，tls模块在TCP之上叠加证书验证与密钥协商
      </figcaption>
    </figure>
  );
}
