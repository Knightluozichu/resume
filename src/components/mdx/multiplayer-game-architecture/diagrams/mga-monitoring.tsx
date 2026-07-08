/**
 * <MgaMonitoringDiagram>：监控与日志系统图解（可观测性三支柱）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgaMonitoringDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="监控与日志系统图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            可观测性三支柱：Metrics + Logging + Tracing
          </text>

          {/* 游戏服务端 */}
          <rect x="270" y="50" width="200" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">游戏服务端</text>
          <text x="370" y="88" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">埋点上报</text>

          {/* 三条线分流 */}
          <line x1="320" y1="100" x2="150" y2="140" stroke="var(--success)" strokeWidth="1.5" />
          <line x1="370" y1="100" x2="370" y2="140" stroke="var(--warning)" strokeWidth="1.5" />
          <line x1="420" y1="100" x2="590" y2="140" stroke="var(--danger)" strokeWidth="1.5" />

          {/* Metrics */}
          <rect x="40" y="140" width="220" height="120" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.5" />
          <text x="150" y="164" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">Metrics</text>
          <text x="150" y="182" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">「系统现在怎么样」</text>

          <text x="60" y="206" fontSize="9" fill="var(--text-secondary)">CCU 在线人数</text>
          <text x="60" y="222" fontSize="9" fill="var(--text-secondary)">帧时间 (Frame Time)</text>
          <text x="60" y="238" fontSize="9" fill="var(--text-secondary)">RTT / 丢包率</text>
          <text x="60" y="254" fontSize="9" fill="var(--text-secondary)">CPU / 内存</text>

          <rect x="40" y="270" width="220" height="28" rx="5" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="150" y="288" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">Prometheus + Grafana</text>

          {/* Logging */}
          <rect x="280" y="140" width="180" height="120" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="370" y="164" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">Logging</text>
          <text x="370" y="182" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">「发生了什么」</text>

          <text x="298" y="206" fontSize="9" fill="var(--text-secondary)">操作日志 (玩家行为)</text>
          <text x="298" y="222" fontSize="9" fill="var(--text-secondary)">系统日志 (启动/报错)</text>
          <text x="298" y="238" fontSize="9" fill="var(--text-secondary)">审计日志 (充值/GM)</text>
          <text x="298" y="254" fontSize="9" fill="var(--text-secondary)">结构化 JSON</text>

          <rect x="280" y="270" width="180" height="28" rx="5" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="288" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">Elasticsearch + Kibana</text>

          {/* Tracing */}
          <rect x="480" y="140" width="220" height="120" rx="10" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="590" y="164" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">Tracing</text>
          <text x="590" y="182" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">「慢在哪里」</text>

          <text x="500" y="206" fontSize="9" fill="var(--text-secondary)">Trace ID 贯穿全链路</text>
          <text x="500" y="222" fontSize="9" fill="var(--text-secondary)">每服务 Span 计时</text>
          <text x="500" y="238" fontSize="9" fill="var(--text-secondary)">跨服务依赖关系</text>
          <text x="500" y="254" fontSize="9" fill="var(--text-secondary)">瓶颈定位</text>

          <rect x="480" y="270" width="220" height="28" rx="5" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="590" y="288" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">Jaeger / Zipkin</text>

          {/* 告警系统 */}
          <rect x="40" y="320" width="660" height="100" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="342" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">告警系统（分级 + 降噪）</text>

          <rect x="60" y="356" width="130" height="48" rx="5" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="125" y="376" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">P0 全服宕机</text>
          <text x="125" y="392" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">电话通知</text>

          <rect x="205" y="356" width="130" height="48" rx="5" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="270" y="376" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">P1 单服故障</text>
          <text x="270" y="392" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">短信通知</text>

          <rect x="350" y="356" width="130" height="48" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="415" y="376" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">P2 性能下降</text>
          <text x="415" y="392" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">钉钉/飞书</text>

          <rect x="495" y="356" width="180" height="48" rx="5" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="585" y="376" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-tertiary)">P3 日志异常</text>
          <text x="585" y="392" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">仅记录不通知</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可观测性三支柱——Metrics（指标监控）+ Logging（日志）+ Tracing（链路追踪）+ 分级告警
      </figcaption>
    </figure>
  );
}
