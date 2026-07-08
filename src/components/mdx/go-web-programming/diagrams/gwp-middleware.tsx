/**
 * <GwpMiddlewareDiagram>: 中间件洋葱模型。
 *
 * 展示中间件的嵌套调用链：请求从外向内穿过各层中间件，
 * 到达核心 handler 后，响应从内向外依次返回。每层可做前置/后置处理。
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

export function GwpMiddlewareDiagram() {
  const CX = 260;
  const CY = 210;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="中间件洋葱模型。请求从外向内穿过日志、认证、限流中间件到达核心 handler，响应从内向外返回。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            中间件洋葱模型 (Onion Model)
          </text>

          {/* 日志层 - 最外 */}
          <circle cx={CX} cy={CY} r={120} fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.4" />
          <text x={CX} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>日志 (Logging)</text>
          <text x={CX} y={100} textAnchor="middle" fontSize="9" fill={secondary}>记录请求/响应</text>

          {/* 认证层 */}
          <circle cx={CX} cy={CY} r={90} fill="none" stroke={success} strokeWidth="1.5" strokeOpacity="0.5" />
          <text x={CX} y={122} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>认证 (Auth)</text>
          <text x={CX} y={136} textAnchor="middle" fontSize="9" fill={secondary}>验证 Token</text>

          {/* 限流层 */}
          <circle cx={CX} cy={CY} r={60} fill="none" stroke={warning} strokeWidth="1.5" strokeOpacity="0.6" />
          <text x={CX} y={160} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>限流 (RateLimit)</text>
          <text x={CX} y={174} textAnchor="middle" fontSize="9" fill={secondary}>令牌桶</text>

          {/* 核心 handler */}
          <circle cx={CX} cy={CY} r={30} fill={danger} fillOpacity="0.15" stroke={danger} strokeWidth="2" />
          <text x={CX} y={206} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>Handler</text>
          <text x={CX} y={220} textAnchor="middle" fontSize="9" fill={secondary}>业务逻辑</text>

          {/* 请求箭头（外→内） */}
          <path d={`M ${CX - 130} ${CY - 60} Q ${CX - 120} ${CY} ${CX - 30} ${CY}`} fill="none" stroke={accent} strokeWidth="2" markerEnd="url(#gwp-mw-in)" />
          <text x={CX - 150} y={CY - 80} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>请求 →</text>
          <text x={CX - 150} y={CY - 66} textAnchor="middle" fontSize="9" fill={secondary}>前置处理</text>

          {/* 响应箭头（内→外） */}
          <path d={`M ${CX + 30} ${CY} Q ${CX + 120} ${CY} ${CX + 130} ${CY - 60}`} fill="none" stroke={success} strokeWidth="2" markerEnd="url(#gwp-mw-out)" />
          <text x={CX + 150} y={CY - 80} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>← 响应</text>
          <text x={CX + 150} y={CY - 66} textAnchor="middle" fontSize="9" fill={secondary}>后置处理</text>

          {/* 右侧代码示例 */}
          <rect x={430} y={50} width={260} height={320} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={560} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>中间件函数签名</text>

          <text x={445} y={98} fontSize="10" fontFamily="monospace" fill={accent}>{`type Middleware func(`}</text>
          <text x={445} y={114} fontSize="10" fontFamily="monospace" fill={accent}>{`  http.Handler) http.Handler`}</text>

          <text x={445} y={140} fontSize="10" fill={secondary}>// 嵌套组合</text>
          <text x={445} y={156} fontSize="10" fontFamily="monospace" fill={success}>{`h := Logging(`}</text>
          <text x={445} y={172} fontSize="10" fontFamily="monospace" fill={success}>{`  Auth(`}</text>
          <text x={445} y={188} fontSize="10" fontFamily="monospace" fill={success}>{`    RateLimit(`}</text>
          <text x={445} y={204} fontSize="10" fontFamily="monospace" fill={success}>{`      finalHandler)))`}</text>

          <text x={445} y={232} fontSize="10" fill={secondary}>// 每层结构</text>
          <text x={445} y={248} fontSize="10" fontFamily="monospace" fill={warning}>{`func Logging(next http.Handler)`}</text>
          <text x={445} y={264} fontSize="10" fontFamily="monospace" fill={warning}>{`  http.Handler {`}</text>
          <text x={445} y={280} fontSize="10" fontFamily="monospace" fill={warning}>{`  return http.HandlerFunc(`}</text>
          <text x={445} y={296} fontSize="10" fontFamily="monospace" fill={warning}>{`    func(w, r) {`}</text>
          <text x={445} y={312} fontSize="10" fontFamily="monospace" fill={accent}>{`      // 前置: 记录开始`}</text>
          <text x={445} y={328} fontSize="10" fontFamily="monospace" fill={warning}>{`      next.ServeHTTP(w, r)`}</text>
          <text x={445} y={344} fontSize="10" fontFamily="monospace" fill={accent}>{`      // 后置: 记录耗时`}</text>
          <text x={445} y={360} fontSize="10" fontFamily="monospace" fill={warning}>{`    })`}</text>

          <defs>
            <marker id="gwp-mw-in" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker id="gwp-mw-out" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        中间件以洋葱模型嵌套，请求外→内，响应内→外，每层可做前后置处理。
      </figcaption>
    </figure>
  );
}
