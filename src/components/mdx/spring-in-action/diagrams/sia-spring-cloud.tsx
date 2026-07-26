/**
 * <SiaSpringCloudDiagram>：Spring Cloud 微服务组件协作图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function SiaSpringCloudDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Spring Cloud微服务组件协作图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Spring Cloud——微服务全家桶协作
          </text>

          {/* 顶部：客户端 */}
          <rect x="310" y="50" width="120" height="40" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="75" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">客户端请求</text>
          <text x="370" y="100" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 网关层 */}
          <rect x="240" y="110" width="260" height="46" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="370" y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">API 网关（Spring Cloud Gateway）</text>
          <text x="370" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">路由 / 鉴权 / 限流 / 日志</text>
          <text x="370" y="170" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 服务注册中心（左侧） */}
          <rect x="30" y="180" width="160" height="80" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="110" y="202" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">服务注册中心</text>
          <text x="110" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Eureka / Nacos</text>
          <text x="110" y="236" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">服务注册与发现</text>
          <text x="110" y="252" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@EnableEurekaServer</text>

          {/* 中间：微服务集群 */}
          <rect x="210" y="180" width="320" height="200" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.5" />
          <text x="370" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">微服务集群</text>

          <rect x="225" y="212" width="135" height="46" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="292" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">订单服务</text>
          <text x="292" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">order-service</text>

          <rect x="380" y="212" width="135" height="46" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="447" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">用户服务</text>
          <text x="447" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">user-service</text>

          <rect x="225" y="270" width="135" height="46" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="292" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">商品服务</text>
          <text x="292" y="306" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">product-service</text>

          <rect x="380" y="270" width="135" height="46" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="447" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">支付服务</text>
          <text x="447" y="306" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">payment-service</text>

          <text x="370" y="340" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">服务间调用：OpenFeign（声明式HTTP）</text>
          <text x="370" y="356" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">负载均衡：Spring Cloud LoadBalancer</text>
          <text x="370" y="372" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">熔断降级：Resilience4j / Circuit Breaker</text>

          {/* 右侧：配置中心 */}
          <rect x="550" y="180" width="160" height="80" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="630" y="202" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">配置中心</text>
          <text x="630" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Spring Cloud Config</text>
          <text x="630" y="236" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">/ Nacos Config</text>
          <text x="630" y="252" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">集中配置 + 动态刷新</text>

          {/* 右侧：链路追踪 */}
          <rect x="550" y="290" width="160" height="80" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="630" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">可观测性</text>
          <text x="630" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Sleuth + Zipkin</text>
          <text x="630" y="346" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Micrometer</text>
          <text x="630" y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">分布式链路追踪</text>

          {/* 底部：熔断器状态机 */}
          <text x="370" y="410" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">熔断器状态机（Circuit Breaker）</text>

          <rect x="60" y="425" width="140" height="46" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="445" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">CLOSED（关闭）</text>
          <text x="130" y="461" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">正常放行请求</text>

          <text x="210" y="452" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">失败率超阈值</text>
          <text x="210" y="466" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="280" y="425" width="140" height="46" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="350" y="445" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">OPEN（打开）</text>
          <text x="350" y="461" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">快速失败/降级</text>

          <text x="430" y="452" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">等待超时</text>
          <text x="430" y="466" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="500" y="425" width="140" height="46" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="570" y="445" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">HALF_OPEN</text>
          <text x="570" y="461" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">放行探测请求</text>

          <text x="650" y="452" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">成功→CLOSED</text>
          <text x="650" y="466" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">失败→OPEN</text>

          <text x="370" y="495" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">保护下游服务：故障时快速失败而非级联雪崩，恢复后自动试探</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Spring Cloud——网关、注册中心、配置中心、可观测性协作的微服务架构，含熔断器三态状态机
      </figcaption>
    </figure>
  );
}
