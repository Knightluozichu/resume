/**
 * <UcnNetworkFrameworkDiagram>：网络框架设计——连接状态机与重连机制图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function UcnNetworkFrameworkDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网络框架设计——连接状态机与重连机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            客户端连接状态机与重连流程
          </text>

          {/* 状态机 */}
          <rect x="50" y="55" width="180" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="76" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">IDLE 空闲</text>
          <text x="140" y="92" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">未开始连接</text>

          <text x="140" y="118" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; connect()</text>

          <rect x="50" y="128" width="180" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="149" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">CONNECTING</text>
          <text x="140" y="165" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">TCP 三次握手中</text>

          <text x="140" y="191" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; 握手成功</text>

          <rect x="50" y="201" width="180" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="222" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">CONNECTED</text>
          <text x="140" y="238" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">正常收发消息</text>

          <text x="140" y="264" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; 网络断开 / 超时</text>

          <rect x="50" y="274" width="180" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="295" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">RECONNECTING</text>
          <text x="140" y="311" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">指数退避重连中</text>

          <text x="140" y="337" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; 重试超限</text>

          <rect x="50" y="347" width="180" height="48" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="140" y="368" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">DISCONNECTED</text>
          <text x="140" y="384" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">连接已关闭</text>

          {/* 右侧：心跳与重连细节 */}
          <rect x="280" y="55" width="430" height="170" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="495" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">心跳机制（Heartbeat）</text>

          <rect x="300" y="95" width="180" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="390" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">客户端每 5 秒发 HeartbeatReq</text>
          <text x="390" y="127" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">定时器驱动</text>

          <text x="495" y="117" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&harr;</text>

          <rect x="520" y="95" width="170" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="605" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">服务器回 HeartbeatAck</text>
          <text x="605" y="127" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">携带服务器时间戳</text>

          <text x="495" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">连续 3 次未收到 Ack → 判定断线 → 进入 RECONNECTING</text>
          <text x="495" y="176" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">服务器 15 秒未收到心跳 → 主动踢连接 → 释放资源</text>
          <text x="495" y="194" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Ack 中的服务器时间用于时钟同步 + 延迟计算（RTT）</text>
          <text x="495" y="212" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">RTT = 当前时间 - 发送时间 - 服务器处理时间</text>

          {/* 重连策略 */}
          <rect x="280" y="240" width="430" height="155" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="495" y="263" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">指数退避重连策略</text>

          <text x="300" y="288" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">第 1 次：等 1 秒</text>
          <text x="300" y="306" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">第 2 次：等 2 秒</text>
          <text x="300" y="324" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">第 3 次：等 4 秒</text>
          <text x="300" y="342" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">第 N 次：等 min(2^(N-1), 30) 秒</text>
          <text x="300" y="368" fontSize="10" fill="var(--text-tertiary)">超过最大重试次数（如 10 次）→ DISCONNECTED</text>
          <text x="300" y="384" fontSize="10" fill="var(--text-tertiary)">重连成功后重发未确认的消息（需消息队列缓存）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网络框架设计——连接状态机管理生命周期，心跳检测断线，指数退避重连保障体验
      </figcaption>
    </figure>
  );
}
