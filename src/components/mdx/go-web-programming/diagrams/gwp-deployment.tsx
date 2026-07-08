/**
 * <GwpDeploymentDiagram>: Go Web 应用部署架构。
 *
 * 展示从源码到生产的完整部署链路：编译 → 容器化 →
 * 反向代理 → Go 服务 → 数据库，以及配置管理和健康检查。
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

export function GwpDeploymentDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Go Web 应用部署架构图。展示从源码编译、Docker 容器化、Nginx 反向代理到 Go 服务和数据库的完整链路。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Go Web 应用部署架构
          </text>

          {/* 构建链路 */}
          <text x={60} y={54} fontSize="11" fontWeight="700" fill={accent}>构建链路</text>

          <rect x={40} y={62} width={120} height={40} rx="6" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" />
          <text x={100} y={80} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>main.go</text>
          <text x={100} y={94} textAnchor="middle" fontSize="9" fill={secondary}>源码</text>

          <line x1={160} y1={82} x2={175} y2={82} stroke={secondary} strokeWidth="1" markerEnd="url(#gwp-dep-a)" />

          <rect x={180} y={62} width={120} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={240} y={80} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>go build</text>
          <text x={240} y={94} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={secondary}>CGO_ENABLED=0</text>

          <line x1={300} y1={82} x2={315} y2={82} stroke={secondary} strokeWidth="1" markerEnd="url(#gwp-dep-a)" />

          <rect x={320} y={62} width={120} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={380} y={80} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>单二进制</text>
          <text x={380} y={94} textAnchor="middle" fontSize="9" fill={secondary}>~10MB 无依赖</text>

          <line x1={440} y1={82} x2={455} y2={82} stroke={secondary} strokeWidth="1" markerEnd="url(#gwp-dep-a)" />

          <rect x={460} y={62} width={120} height={40} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={520} y={80} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>Docker 镜像</text>
          <text x={520} y={94} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={secondary}>FROM scratch</text>

          {/* 运行时架构 */}
          <text x={60} y={130} fontSize="11" fontWeight="700" fill={success}>运行时架构</text>

          <rect x={40} y={140} width={120} height={56} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x={100} y={160} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>用户</text>
          <text x={100} y={176} textAnchor="middle" fontSize="9" fill={secondary}>HTTPS 请求</text>
          <text x={100} y={190} textAnchor="middle" fontSize="9" fill={secondary}>443 端口</text>

          <line x1={160} y1={168} x2={185} y2={168} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-dep-a)" />

          <rect x={190} y={140} width={130} height={56} rx="8" fill={elevated} stroke={success} strokeWidth="1.5" />
          <text x={255} y={160} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>Nginx</text>
          <text x={255} y={176} textAnchor="middle" fontSize="9" fill={secondary}>反向代理</text>
          <text x={255} y={190} textAnchor="middle" fontSize="9" fill={secondary}>TLS 终止 + 负载均衡</text>

          <line x1={320} y1={168} x2={345} y2={168} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-dep-a)" />

          <rect x={350} y={140} width={130} height={56} rx="8" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x={415} y={160} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>Go 服务</text>
          <text x={415} y={176} textAnchor="middle" fontSize="9" fill={secondary}>:8080</text>
          <text x={415} y={190} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={secondary}>http.ListenAndServe</text>

          <line x1={480} y1={168} x2={505} y2={168} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-dep-a)" />

          <rect x={510} y={140} width={130} height={56} rx="8" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.5" />
          <text x={575} y={160} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>数据库</text>
          <text x={575} y={176} textAnchor="middle" fontSize="9" fill={secondary}>PostgreSQL</text>
          <text x={575} y={190} textAnchor="middle" fontSize="9" fill={secondary}>连接池</text>

          {/* 运维要素 */}
          <rect x={40} y={220} width={640} height={150} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={360} y={242} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>生产运维要素</text>

          <rect x={60} y={256} width={140} height={50} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x={130} y={274} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>配置管理</text>
          <text x={130} y={290} textAnchor="middle" fontSize="9" fill={secondary}>env / flag</text>
          <text x={130} y={302} textAnchor="middle" fontSize="9" fill={secondary}>12-Factor</text>

          <rect x={210} y={256} width={140} height={50} rx="6" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x={280} y={274} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>健康检查</text>
          <text x={280} y={290} textAnchor="middle" fontSize="9" fill={secondary}>/health 端点</text>
          <text x={280} y={302} textAnchor="middle" fontSize="9" fill={secondary}>graceful shutdown</text>

          <rect x={360} y={256} width={140} height={50} rx="6" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1" />
          <text x={430} y={274} textAnchor="middle" fontSize="10" fontWeight="600" fill={warning}>日志</text>
          <text x={430} y={290} textAnchor="middle" fontSize="9" fill={secondary}>structured log</text>
          <text x={430} y={302} textAnchor="middle" fontSize="9" fill={secondary}>slog / zap</text>

          <rect x={510} y={256} width={150} height={50} rx="6" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" />
          <text x={585} y={274} textAnchor="middle" fontSize="10" fontWeight="600" fill={danger}>监控告警</text>
          <text x={585} y={290} textAnchor="middle" fontSize="9" fill={secondary}>Prometheus</text>
          <text x={585} y={302} textAnchor="middle" fontSize="9" fill={secondary}>/metrics</text>

          <text x={60} y={332} fontSize="10" fill={secondary}>优雅关闭：捕获 SIGTERM → 停止接收新请求 → 等待处理中请求 → 关闭连接池 → 退出</text>
          <text x={60} y={350} fontSize="10" fill={secondary}>零停机部署：蓝绿部署 / 滚动更新 — 新版本就绪后切流量，旧版本优雅退出</text>

          <defs>
            <marker id="gwp-dep-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go 编译为单二进制，Docker 容器化部署，Nginx 反代 + TLS 终止。
      </figcaption>
    </figure>
  );
}
