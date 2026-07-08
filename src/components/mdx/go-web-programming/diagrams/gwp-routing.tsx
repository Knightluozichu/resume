/**
 * <GwpRoutingDiagram>: HTTP 路由匹配流程。
 *
 * 展示请求路径如何匹配到不同 handler：静态路由、参数路由、
 * DefaultServeMux 与第三方路由库（如 gorilla/mux、chi）的树形匹配。
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

export function GwpRoutingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="HTTP 路由匹配流程图。展示请求路径如何通过路由表匹配到对应 handler，包括静态路由和参数路由。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            HTTP 路由匹配流程
          </text>

          {/* 入口请求 */}
          <rect x={250} y={48} width={220} height={44} rx="8" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5" />
          <text x={360} y={68} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>GET /users/42/posts</text>
          <text x={360} y={84} textAnchor="middle" fontSize="10" fill={secondary}>Method + Path</text>

          {/* 路由表 */}
          <rect x={80} y={120} width={560} height={200} rx="10" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={360} y={142} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>路由表 (ServeMux / Router)</text>

          {/* 路由条目 */}
          <rect x={100} y={156} width={240} height={34} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={120} y={177} fontSize="11" fontFamily="monospace" fill={success}>GET /</text>
          <text x={220} y={177} fontSize="11" fill={secondary}>→ indexHandler</text>

          <rect x={360} y={156} width={260} height={34} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={375} y={177} fontSize="11" fontFamily="monospace" fill={success}>GET /users</text>
          <text x={480} y={177} fontSize="11" fill={secondary}>→ listUsersHandler</text>

          <rect x={100} y={200} width={300} height={34} rx="6" fill={warning} fillOpacity="0.15" stroke={warning} strokeWidth="1.5" />
          <text x={115} y={221} fontSize="11" fontFamily="monospace" fill={warning}>GET /users/{`{id}`}/posts</text>
          <text x={290} y={221} fontSize="11" fill={warning} fontWeight="600">→ userPostsHandler</text>

          <rect x={420} y={200} width={200} height={34} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={435} y={221} fontSize="11" fontFamily="monospace" fill={success}>POST /users</text>
          <text x={530} y={221} fontSize="11" fill={secondary}>→ createUser</text>

          <rect x={100} y={244} width={240} height={34} rx="6" fill={elevated} stroke={danger} strokeWidth="1" strokeDasharray="4 2" />
          <text x={115} y={265} fontSize="11" fontFamily="monospace" fill={danger}>DELETE /users/{`{id}`}</text>
          <text x={250} y={265} fontSize="11" fill={secondary}>→ deleteUser</text>

          <rect x={360} y={244} width={260} height={34} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={375} y={265} fontSize="11" fontFamily="monospace" fill={success}>GET /health</text>
          <text x={470} y={265} fontSize="11" fill={secondary}>→ healthCheck</text>

          <text x={360} y={306} textAnchor="middle" fontSize="10" fill={secondary}>
            匹配优先级：静态路径 &gt; 参数路径 &gt; 通配符
          </text>

          {/* 匹配结果 */}
          <line x1={360} y1={92} x2={360} y2={116} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-r-arrow)" />
          <line x1={250} y1={217} x2={70} y2={217} stroke={warning} strokeWidth="2" strokeDasharray="4 2" />

          <rect x={180} y={340} width={360} height={44} rx="8" fill={warning} fillOpacity="0.12" stroke={warning} strokeWidth="1.5" />
          <text x={360} y={360} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>userPostsHandler(w, r)</text>
          <text x={360} y={376} textAnchor="middle" fontSize="10" fill={secondary}>id = r.URL.Query() 或路径参数 = "42"</text>

          <defs>
            <marker id="gwp-r-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        路由表按 Method + Path 匹配，参数路由用 {"{id}"} 捕获路径段。
      </figcaption>
    </figure>
  );
}
