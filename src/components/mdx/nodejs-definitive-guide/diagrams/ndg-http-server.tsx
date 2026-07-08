/**
 * <NdgHttpServerDiagram>：Node.js HTTP 服务器请求响应生命周期图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function NdgHttpServerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Node.js HTTP服务器请求响应生命周期图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            HTTP 服务器请求响应生命周期
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            http.createServer → IncomingMessage (req) + ServerResponse (res)
          </text>

          {/* 客户端 */}
          <rect x="20" y="80" width="100" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="70" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">客户端</text>
          <text x="70" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">浏览器/curl</text>

          {/* 服务器 */}
          <rect x="320" y="80" width="100" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.5" />
          <text x="370" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">HTTP Server</text>
          <text x="370" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">http.createServer(cb)</text>

          {/* 后端 */}
          <rect x="620" y="80" width="100" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="670" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">后端逻辑</text>
          <text x="670" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">路由/数据库</text>

          {/* 连线 */}
          <line x1="120" y1="105" x2="320" y2="105" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arr3)" />
          <line x1="420" y1="105" x2="620" y2="105" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arr3)" />
          <line x1="620" y1="125" x2="420" y2="125" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arr3w)" />
          <line x1="320" y1="125" x2="120" y2="125" stroke="var(--success)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arr3s)" />

          <defs>
            <marker id="arr3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
            </marker>
            <marker id="arr3w" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--warning)" />
            </marker>
            <marker id="arr3s" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--success)" />
            </marker>
          </defs>

          <text x="220" y="98" textAnchor="middle" fontSize="9" fill="var(--accent)">HTTP 请求</text>
          <text x="520" y="98" textAnchor="middle" fontSize="9" fill="var(--accent)">req 对象</text>
          <text x="520" y="140" textAnchor="middle" fontSize="9" fill="var(--warning)">res 处理</text>
          <text x="220" y="140" textAnchor="middle" fontSize="9" fill="var(--success)">HTTP 响应</text>

          {/* req 对象 */}
          <rect x="30" y="160" width="330" height="130" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">req: IncomingMessage（可读流）</text>
          <text x="50" y="200" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">req.method → "GET" / "POST"</text>
          <text x="50" y="216" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">req.url → "/api?foo=bar"</text>
          <text x="50" y="232" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">req.headers → {`{host, cookie, ...}`}</text>
          <text x="50" y="248" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">req.on("data", chunk =&gt; ...) // body</text>
          <text x="50" y="264" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">req.on("end", () =&gt; ...) // 完成</text>
          <text x="50" y="280" fontSize="8" fill="var(--text-tertiary)">继承自 Readable 流，body 以 chunk 流式到达</text>

          {/* res 对象 */}
          <rect x="380" y="160" width="330" height="130" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">res: ServerResponse（可写流）</text>
          <text x="400" y="200" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">res.writeHead(200, {`{...}`})</text>
          <text x="400" y="216" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">res.setHeader("X", "Y")</text>
          <text x="400" y="232" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">res.write("chunk") // 分段写</text>
          <text x="400" y="248" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">res.end("done") // 结束响应</text>
          <text x="400" y="264" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">res.statusCode = 404</text>
          <text x="400" y="280" fontSize="8" fill="var(--text-tertiary)">继承自 Writable 流，必须 end() 否则连接挂起</text>

          {/* 事件流程 */}
          <rect x="30" y="310" width="680" height="120" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="330" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">服务器事件流程</text>

          <rect x="50" y="344" width="120" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="110" y="366" textAnchor="middle" fontSize="9" fill="var(--accent)">connection</text>

          <text x="180" y="366" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="200" y="344" width="120" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="260" y="366" textAnchor="middle" fontSize="9" fill="var(--accent)">request (req,res)</text>

          <text x="330" y="366" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="350" y="344" width="120" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="410" y="366" textAnchor="middle" fontSize="9" fill="var(--warning)">路由 + 中间件</text>

          <text x="480" y="366" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="500" y="344" width="120" height="36" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="560" y="366" textAnchor="middle" fontSize="9" fill="var(--success)">res.end() 响应</text>

          <text x="630" y="366" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="650" y="344" width="50" height="36" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="675" y="366" textAnchor="middle" fontSize="9" fill="var(--danger)">close</text>

          <text x="50" y="404" fontSize="9" fill="var(--text-secondary)">每个连接独立回调，互不阻塞——一个慢请求不会卡住其他请求</text>
          <text x="50" y="420" fontSize="9" fill="var(--text-tertiary)">但 CPU 密集回调会阻塞事件循环，影响所有连接（需 cluster 或 worker 拆分）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        HTTP服务器生命周期——http.createServer回调中req（IncomingMessage可读流）与res（ServerResponse可写流）的处理流程
      </figcaption>
    </figure>
  );
}
