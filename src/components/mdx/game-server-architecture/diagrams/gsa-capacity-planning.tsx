/**
 * <GsaCapacityPlanningDiagram>：容量规划与压测图解。
 * 纯静态展示，无交互。Server Component。DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GsaCapacityPlanningDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="容量规划与压测图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            容量规划：Little&apos;s Law + 压测找拐点
          </text>

          {/* Little's Law */}
          <rect x="30" y="50" width="340" height="100" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="200" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Little&apos;s Law</text>
          <text x="200" y="96" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">并发数 = QPS × 平均响应时间</text>
          <text x="200" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">例：登录 5 万 QPS × 20ms = 1000 并发</text>
          <text x="200" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单机扛 300 并发 → 理论 3.3 台</text>
          <text x="200" y="146" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">× 安全系数 2 → 实际 7 台</text>

          {/* 容量推算 */}
          <rect x="390" y="50" width="320" height="100" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">容量推算公式</text>
          <text x="550" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">所需机器 = 总 QPS / 单机 QPS × 安全系数</text>
          <text x="550" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">安全系数 1.5-2（应对突发+故障降容）</text>
          <text x="550" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">宁滥勿缺：炸服损失 &gt; 机器成本</text>
          <text x="550" y="146" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">单机 QPS 靠压测找拐点确定</text>

          {/* 压测找拐点曲线 */}
          <rect x="30" y="170" width="340" height="170" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">压测找拐点</text>

          <line x1="70" y1="320" x2="340" y2="320" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="70" y1="210" x2="70" y2="320" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="60" y="324" textAnchor="end" fontSize="8" fill="var(--text-tertiary)">0</text>
          <text x="345" y="324" fontSize="8" fill="var(--text-tertiary)">QPS</text>
          <text x="68" y="208" textAnchor="end" fontSize="8" fill="var(--text-tertiary)">P99</text>

          <path d="M 70 310 Q 180 305 220 295 Q 250 270 270 230 Q 290 200 320 195" fill="none" stroke="var(--warning)" strokeWidth="2" />
          <circle cx="220" cy="295" r="4" fill="var(--danger)" />
          <line x1="220" y1="295" x2="220" y2="320" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="225" y="290" fontSize="9" fontWeight="600" fill="var(--danger)">拐点</text>
          <text x="225" y="280" fontSize="8" fill="var(--text-tertiary)">P99 飙升</text>

          <rect x="240" y="305" width="90" height="14" rx="3" fill="var(--success)" fillOpacity="0.2" />
          <text x="285" y="315" textAnchor="middle" fontSize="8" fill="var(--success)">安全容量 × 0.7</text>

          <text x="200" y="335" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">拐点判定：P99 非线性增长 OR CPU &gt; 80%</text>

          {/* 压测四层次 */}
          <rect x="390" y="170" width="320" height="170" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">压测四层次</text>

          <rect x="410" y="204" width="280" height="26" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="420" y="221" fontSize="9" fontWeight="600" fill="var(--success)">基准压测</text>
          <text x="680" y="221" textAnchor="end" fontSize="9" fill="var(--text-secondary)">单机拐点容量</text>

          <rect x="410" y="236" width="280" height="26" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="420" y="253" fontSize="9" fontWeight="600" fill="var(--warning)">负载压测</text>
          <text x="680" y="253" textAnchor="end" fontSize="9" fill="var(--text-secondary)">70% 峰值 1-2 小时</text>

          <rect x="410" y="268" width="280" height="26" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="420" y="285" fontSize="9" fontWeight="600" fill="var(--danger)">压力压测</text>
          <text x="680" y="285" textAnchor="end" fontSize="9" fill="var(--text-secondary)">崩溃模式与天花板</text>

          <rect x="410" y="300" width="280" height="26" rx="4" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="420" y="317" fontSize="9" fontWeight="600" fill="var(--accent)">稳定性压测</text>
          <text x="680" y="317" textAnchor="end" fontSize="9" fill="var(--text-secondary)">24-72h 抓慢泄漏</text>

          {/* 通过标准 */}
          <rect x="30" y="360" width="680" height="64" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="382" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">压测通过标准（不只是 QPS 够高）</text>
          <text x={VIEW_W / 2} y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">目标 QPS 下 P99 &lt; 100ms 且 CPU &lt; 70%</text>
          <text x={VIEW_W / 2} y="418" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">靠排队堆吞吐的假象：QPS 高但 P99 飙 2 秒，玩家早掉了</text>

          <text x={VIEW_W / 2} y="446" textAnchor="middle" fontSize="10" fill="var(--danger)">
            全链路压测 &gt; 单接口压测：登录单测过，组合起来 DB 连接池打满
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        容量规划——Little&apos;s Law 推算 + 压测找拐点，通过标准是 P99 与资源利用率而非 QPS
      </figcaption>
    </figure>
  );
}
