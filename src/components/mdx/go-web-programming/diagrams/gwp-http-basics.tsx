/**
 * <GwpHttpBasicsDiagram>: HTTP 请求-响应生命周期。
 *
 * 展示一个 HTTP 请求从客户端发出到响应返回的完整流程：
 * 请求行/头/体 → 服务器处理 → 状态码/响应头/响应体。
 * 纯静态 SVG，Server Component。viewBox 720x400。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function GwpHttpBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="HTTP 请求-响应生命周期图。展示客户端请求（请求行、头部、体）经过服务器处理后返回响应（状态码、头部、体）。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            HTTP 请求-响应生命周期
          </text>

          {/* 客户端 */}
          <rect x={40} y={60} width={160} height={90} rx="10" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x={120} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>客户端</text>
          <text x={120} y={104} textAnchor="middle" fontSize="11" fill={secondary}>浏览器 / curl</text>
          <text x={120} y={124} textAnchor="middle" fontSize="11" fill={secondary}>发起 TCP 连接</text>
          <text x={120} y={140} textAnchor="middle" fontSize="10" fill={secondary}>发送 HTTP 请求</text>

          {/* 服务器 */}
          <rect x={520} y={60} width={160} height={90} rx="10" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x={600} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>服务器</text>
          <text x={600} y={104} textAnchor="middle" fontSize="11" fill={secondary}>http.Server</text>
          <text x={600} y={124} textAnchor="middle" fontSize="11" fill={secondary}>Handler 处理</text>
          <text x={600} y={140} textAnchor="middle" fontSize="10" fill={secondary}>返回 HTTP 响应</text>

          {/* 请求箭头 */}
          <line x1={200} y1={95} x2={510} y2={95} stroke={accent} strokeWidth="2" markerEnd="url(#gwp-req-arrow)" />
          <text x={355} y={86} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>HTTP Request</text>

          {/* 响应箭头 */}
          <line x1={510} y1={120} x2={200} y2={120} stroke={success} strokeWidth="2" markerEnd="url(#gwp-res-arrow)" />
          <text x={355} y={134} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>HTTP Response</text>

          {/* 请求结构 */}
          <rect x={40} y={180} width={300} height={180} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={190} y={200} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>请求结构 (Request)</text>
          <text x={55} y={222} fontSize="11" fill={primary} fontFamily="monospace">POST /api/users HTTP/1.1</text>
          <text x={55} y={238} fontSize="11" fill={secondary} fontFamily="monospace">Host: example.com</text>
          <text x={55} y={254} fontSize="11" fill={secondary} fontFamily="monospace">Content-Type: application/json</text>
          <text x={55} y={270} fontSize="11" fill={secondary} fontFamily="monospace">Content-Length: 42</text>
          <line x1={55} y1={278} x2={325} y2={278} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <text x={55} y={294} fontSize="11" fill={warning} fontFamily="monospace">{"{ \"name\": \"Go\", ... }"}</text>
          <text x={55} y={320} fontSize="10" fill={secondary}>请求行 | 请求头 | 请求体</text>
          <text x={55} y={340} fontSize="10" fill={secondary}>r.Method / r.URL / r.Header</text>
          <text x={55} y={356} fontSize="10" fill={secondary}>r.Body (io.ReadCloser)</text>

          {/* 响应结构 */}
          <rect x={380} y={180} width={300} height={180} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={530} y={200} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>响应结构 (Response)</text>
          <text x={395} y={222} fontSize="11" fill={primary} fontFamily="monospace">HTTP/1.1 200 OK</text>
          <text x={395} y={238} fontSize="11" fill={secondary} fontFamily="monospace">Content-Type: text/html</text>
          <text x={395} y={254} fontSize="11" fill={secondary} fontFamily="monospace">Set-Cookie: session=abc</text>
          <text x={395} y={270} fontSize="11" fill={secondary} fontFamily="monospace">Content-Length: 128</text>
          <line x1={395} y1={278} x2={665} y2={278} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <text x={395} y={294} fontSize="11" fill={warning} fontFamily="monospace">&lt;html&gt;...&lt;/html&gt;</text>
          <text x={395} y={320} fontSize="10" fill={secondary}>状态码 | 响应头 | 响应体</text>
          <text x={395} y={340} fontSize="10" fill={secondary}>w.WriteHeader(200)</text>
          <text x={395} y={356} fontSize="10" fill={secondary}>w.Write([]byte) / w.Header()</text>

          {/* 状态码色标 */}
          <rect x={40} y={375} width={12} height={12} rx="2" fill={success} fillOpacity="0.6" />
          <text x={58} y={385} fontSize="10" fill={secondary}>2xx 成功</text>
          <rect x={130} y={375} width={12} height={12} rx="2" fill={accent} fillOpacity="0.6" />
          <text x={148} y={385} fontSize="10" fill={secondary}>3xx 重定向</text>
          <rect x={230} y={375} width={12} height={12} rx="2" fill={warning} fillOpacity="0.6" />
          <text x={248} y={385} fontSize="10" fill={secondary}>4xx 客户端错误</text>
          <rect x={350} y={375} width={12} height={12} rx="2" fill={danger} fillOpacity="0.6" />
          <text x={368} y={385} fontSize="10" fill={secondary}>5xx 服务器错误</text>

          <defs>
            <marker id="gwp-req-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker id="gwp-res-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        HTTP 请求与响应的结构分解及 Go 中的对应类型。
      </figcaption>
    </figure>
  );
}
