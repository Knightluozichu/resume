/**
 * <SiaLearningMapDiagram>：Spring in Action 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function SiaLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Spring in Action全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Spring in Action——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            核心IoC → Bean装配 → AOP → MVC → 数据访问 → Security → Boot → Cloud → 复习
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：Spring核心与IoC 与 Bean装配 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Spring核心与IoC</text>
          <text x="205" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第1章 容器/Bean生命周期/依赖注入</text>
          <text x="205" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">控制反转与松耦合</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Bean装配</text>
          <text x="535" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第2章 自动装配/Java配置/组件扫描</text>
          <text x="535" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@Autowired/@Bean/@Component</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：AOP 与 Spring MVC */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">面向切面编程</text>
          <text x="205" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第3章 切面/切点/通知/织入</text>
          <text x="205" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">横切关注点分离</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Spring MVC</text>
          <text x="535" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第4章 DispatcherServlet/控制器</text>
          <text x="535" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">视图解析/RESTful</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：数据访问 与 Spring Security */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">数据访问与JPA</text>
          <text x="205" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第5章 Repository/实体映射</text>
          <text x="205" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Spring Data JPA/JPQL</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Spring Security</text>
          <text x="535" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第6章 过滤链/认证/授权</text>
          <text x="535" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">密码编码/方法级安全</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：Spring Boot 与 Spring Cloud */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Spring Boot</text>
          <text x="205" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第7章 自动配置/起步依赖</text>
          <text x="205" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Actuator/外部化配置</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Spring Cloud微服务</text>
          <text x="535" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第8章 服务注册/配置中心/网关</text>
          <text x="535" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">熔断/负载均衡</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：全书复习 */}
          <rect x="50" y="440" width="640" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="370" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第9章 从IoC到微服务——Spring全栈技术体系整合</text>
          <text x="370" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">核心容器 / Web / 数据 / 安全 / 云原生 完整体系</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Spring in Action全书学习地图——核心IoC、Bean装配、AOP、MVC、数据访问、安全、Boot、云原生八阶段递进路径
      </figcaption>
    </figure>
  );
}
