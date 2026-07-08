/**
 * <DnjWebsocketDiagram>：WebSocket 与实时通信图解（握手 / 帧 / 实时推送）。
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DnjWebsocketDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="WebSocket握手与帧协议图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            WebSocket：握手升级 + 帧协议 + 双向实时通信
          </text>

          {/* 握手流程 */}
          <text x={VIEW_W / 2} y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段1：HTTP 升级握手</text>

          <rect x="40" y="64" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="90" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Client</text>

          <rect x="600" y="64" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="650" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Server</text>

          <line x1="140" y1="78" x2="600" y2="78" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arr5)" />
          <text x="370" y="74" textAnchor="middle" fontSize="8" fill="var(--success)">GET /ws  Upgrade: websocket  Connection: Upgrade</text>
          <text x="370" y="86" textAnchor="middle" fontSize="8" fill="var(--success)">Sec-WebSocket-Key: dGhlIHNhbXBsZQ==</text>

          <line x1="600" y1="100" x2="140" y2="100" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#arr5)" />
          <text x="370" y="96" textAnchor="middle" fontSize="8" fill="var(--warning)">101 Switching Protocols</text>
          <text x="370" y="108" textAnchor="middle" fontSize="8" fill="var(--warning)">Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=</text>

          <text x="370" y="124" textAnchor="middle" fontSize="9" fill="var(--accent)">握手后 TCP 连接升级为 WebSocket 双工通道</text>

          {/* 帧协议 */}
          <text x={VIEW_W / 2} y="148" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段2：WebSocket 帧格式</text>

          <rect x="40" y="160" width="660" height="80" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />

          <rect x="50" y="172" width="80" height="56" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="90" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">FIN</text>
          <text x="90" y="210" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">1bit</text>
          <text x="90" y="222" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">最后帧?</text>

          <rect x="130" y="172" width="80" height="56" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="170" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">opcode</text>
          <text x="170" y="210" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">4bit</text>
          <text x="170" y="222" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">1文本/2二进制</text>

          <rect x="210" y="172" width="80" height="56" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="250" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">MASK</text>
          <text x="250" y="210" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">1bit</text>
          <text x="250" y="222" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">客户端必掩码</text>

          <rect x="290" y="172" width="80" height="56" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="330" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">payload len</text>
          <text x="330" y="210" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">7/16/64bit</text>
          <text x="330" y="222" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">数据长度</text>

          <rect x="370" y="172" width="80" height="56" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="410" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-tertiary)">mask key</text>
          <text x="410" y="210" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">32bit</text>
          <text x="410" y="222" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">掩码密钥</text>

          <rect x="450" y="172" width="240" height="56" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="570" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">payload data</text>
          <text x="570" y="210" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">实际数据（掩码异或后）</text>
          <text x="570" y="222" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">可分片传输（FIN=0 分片）</text>

          {/* 实时通信模式 */}
          <text x={VIEW_W / 2} y="266" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段3：实时通信模式对比</text>

          <rect x="40" y="280" width="210" height="90" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="145" y="300" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">HTTP 轮询</text>
          <text x="145" y="316" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">客户端定时请求</text>
          <text x="145" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">延迟高 / 空请求浪费</text>
          <text x="145" y="344" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">每次都建新连接</text>
          <text x="145" y="360" textAnchor="middle" fontSize="9" fill="var(--danger)">实时性差</text>

          <rect x="265" y="280" width="210" height="90" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="300" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">SSE（Server-Sent）</text>
          <text x="370" y="316" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">服务端单向推送</text>
          <text x="370" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">基于 HTTP 长连接</text>
          <text x="370" y="344" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">仅文本 / 自动重连</text>
          <text x="370" y="360" textAnchor="middle" fontSize="9" fill="var(--warning)">单向通信</text>

          <rect x="490" y="280" width="210" height="90" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="595" y="300" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">WebSocket</text>
          <text x="595" y="316" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">双向全双工</text>
          <text x="595" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">低延迟 / 二进制帧</text>
          <text x="595" y="344" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ws:// wss://（TLS）</text>
          <text x="595" y="360" textAnchor="middle" fontSize="9" fill="var(--success)">实时性最佳</text>

          {/* 心跳与关闭 */}
          <rect x="40" y="386" width="660" height="74" rx="8" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="406" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-tertiary)">连接保活与关闭</text>
          <text x={VIEW_W / 2} y="424" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">心跳：ping/pong 帧（opcode 0x9/0xA）检测连接存活，超时自动关闭</text>
          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">关闭：close 帧（opcode 0x8）+ 状态码 1000 正常 / 1001 离开 / 1011 服务端错误</text>

          <defs>
            <marker id="arr5" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" opacity="0.6" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        WebSocket 与实时通信——HTTP 升级握手、帧协议格式、全双工通信与心跳保活
      </figcaption>
    </figure>
  );
}
