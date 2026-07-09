/**
 * <ApoNetworkOptimizationDiagram>：网络优化全景图。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function ApoNetworkOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网络优化全景图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            网络优化——连接/缓存/压缩/弱网
          </text>

          {/* 请求生命周期 */}
          <rect x="30" y="50" width="680" height="120" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="50" y="72" fontSize="12" fontWeight="600" fill="var(--accent)">HTTP 请求生命周期与优化点</text>

          <rect x="50" y="85" width="110" height="70" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="105" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">DNS 解析</text>
          <text x="105" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">HTTPDNS</text>
          <text x="105" y="134" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">DNS 预解析</text>
          <text x="105" y="148" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">本地缓存</text>

          <rect x="170" y="85" width="110" height="70" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="225" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">TCP 连接</text>
          <text x="225" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Keep-Alive</text>
          <text x="225" y="134" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">连接池复用</text>
          <text x="225" y="148" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">HTTP/2 多路复用</text>

          <rect x="290" y="85" width="110" height="70" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="345" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">TLS 握手</text>
          <text x="345" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Session 复用</text>
          <text x="345" y="134" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">TLS 1.3 1-RTT</text>
          <text x="345" y="148" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">HTTP/3 QUIC</text>

          <rect x="410" y="85" width="110" height="70" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="465" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">请求发送</text>
          <text x="465" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Gzip 压缩</text>
          <text x="465" y="134" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Protobuf</text>
          <text x="465" y="148" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">合并请求</text>

          <rect x="530" y="85" width="110" height="70" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="585" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">响应接收</text>
          <text x="585" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">缓存策略</text>
          <text x="585" y="134" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">增量更新</text>
          <text x="585" y="148" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分页加载</text>

          {/* 缓存策略 */}
          <rect x="30" y="185" width="330" height="140" rx="8" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="207" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">多级缓存策略</text>

          <rect x="50" y="220" width="290" height="30" rx="5" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="195" y="239" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">L1: 内存缓存（Map/LruCache）——最快，容量小</text>

          <rect x="50" y="258" width="290" height="30" rx="5" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="195" y="277" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">L2: 磁盘缓存（DiskLruCache）——较快，容量中</text>

          <rect x="50" y="296" width="290" height="22" rx="5" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="195" y="311" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">HTTP Cache（Cache-Control/ETag）</text>

          {/* 弱网优化 */}
          <rect x="380" y="185" width="330" height="140" rx="8" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="207" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">弱网优化</text>

          <rect x="400" y="220" width="130" height="50" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="465" y="240" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">请求降级</text>
          <text x="465" y="256" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">低清图/纯文本</text>

          <rect x="540" y="220" width="150" height="50" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="615" y="240" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">离线缓存</text>
          <text x="615" y="256" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">先展示缓存再更新</text>

          <rect x="400" y="278" width="130" height="40" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="465" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">超时重试</text>
          <text x="465" y="312" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">指数退避</text>

          <rect x="540" y="278" width="150" height="40" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="615" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">预加载</text>
          <text x="615" y="312" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">WiFi 时预取内容</text>

          {/* OkHttp 配置 */}
          <rect x="30" y="340" width="680" height="150" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="362" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">OkHttp 核心配置</text>

          <rect x="50" y="375" width="200" height="95" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="150" y="395" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">连接池</text>
          <text x="60" y="412" fontSize="9" fill="var(--text-secondary)">maxIdleConnections=5</text>
          <text x="60" y="426" fontSize="9" fill="var(--text-secondary)">keepAliveDuration=5min</text>
          <text x="60" y="440" fontSize="9" fill="var(--text-secondary)">HTTP/2 多路复用单连接</text>
          <text x="60" y="458" fontSize="9" fill="var(--text-secondary)">减少 TCP/TLS 握手</text>

          <rect x="270" y="375" width="200" height="95" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" />
          <text x="370" y="395" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">拦截器</text>
          <text x="280" y="412" fontSize="9" fill="var(--text-secondary)">GzipSource 响应解压</text>
          <text x="280" y="426" fontSize="9" fill="var(--text-secondary)">Cache 拦截器磁盘缓存</text>
          <text x="280" y="440" fontSize="9" fill="var(--text-secondary)">RetryAndFollowUp 重试</text>
          <text x="280" y="458" fontSize="9" fill="var(--text-secondary)">自定义监控拦截器</text>

          <rect x="490" y="375" width="200" height="95" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="590" y="395" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">超时配置</text>
          <text x="500" y="412" fontSize="9" fill="var(--text-secondary)">connectTimeout=10s</text>
          <text x="500" y="426" fontSize="9" fill="var(--text-secondary)">readTimeout=10s</text>
          <text x="500" y="440" fontSize="9" fill="var(--text-secondary)">writeTimeout=10s</text>
          <text x="500" y="458" fontSize="9" fill="var(--text-secondary)">弱网动态调整超时</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网络优化全景——DNS/TCP/TLS/请求/响应五阶段优化、多级缓存、弱网降级、OkHttp连接池与拦截器配置
      </figcaption>
    </figure>
  );
}
