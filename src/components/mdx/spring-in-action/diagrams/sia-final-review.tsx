/**
 * <SiaFinalReviewDiagram>：Spring in Action 全书复习思维导图。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function SiaFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Spring in Action全书复习思维导图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Spring in Action 全书复习——Spring 全栈技术体系
          </text>

          {/* 中心节点 */}
          <rect x="290" y="240" width="160" height="40" rx="20" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">Spring</text>

          {/* 八大分支 - 左上：核心IoC */}
          <line x1="290" y1="250" x2="140" y2="100" stroke="var(--warning)" strokeWidth="1.5" />
          <rect x="30" y="80" width="220" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Spring核心与IoC (第1章)</text>
          <text x="140" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">容器 / Bean生命周期 / 依赖注入</text>

          {/* 右上：Bean装配 */}
          <line x1="450" y1="250" x2="600" y2="100" stroke="var(--danger)" strokeWidth="1.5" />
          <rect x="490" y="80" width="220" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Bean装配 (第2章)</text>
          <text x="600" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">自动装配 / Java配置 / 组件扫描</text>

          {/* 左中上：AOP */}
          <line x1="290" y1="260" x2="140" y2="180" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="30" y="160" width="220" height="50" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">面向切面编程 (第3章)</text>
          <text x="140" y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">切面 / 切点 / 通知 / 织入</text>

          {/* 右中上：MVC */}
          <line x1="450" y1="260" x2="600" y2="180" stroke="var(--success)" strokeWidth="1.5" />
          <rect x="490" y="160" width="220" height="50" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Spring MVC (第4章)</text>
          <text x="600" y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">DispatcherServlet / 控制器 / RESTful</text>

          {/* 左中下：数据访问 */}
          <line x1="290" y1="270" x2="140" y2="340" stroke="var(--warning)" strokeWidth="1.5" />
          <rect x="30" y="320" width="220" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">数据访问与JPA (第5章)</text>
          <text x="140" y="358" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Repository / 实体映射 / JPQL</text>

          {/* 右中下：Security */}
          <line x1="450" y1="270" x2="600" y2="340" stroke="var(--danger)" strokeWidth="1.5" />
          <rect x="490" y="320" width="220" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Spring Security (第6章)</text>
          <text x="600" y="358" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">过滤链 / 认证 / 授权 / BCrypt</text>

          {/* 左下：Boot */}
          <line x1="290" y1="280" x2="140" y2="420" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="30" y="400" width="220" height="50" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Spring Boot (第7章)</text>
          <text x="140" y="438" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">自动配置 / 起步依赖 / 内嵌容器</text>

          {/* 右下：Cloud */}
          <line x1="450" y1="280" x2="600" y2="420" stroke="var(--success)" strokeWidth="1.5" />
          <rect x="490" y="400" width="220" height="50" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Spring Cloud (第8章)</text>
          <text x="600" y="438" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">网关 / 注册中心 / 熔断 / 配置中心</text>

          {/* 底部总结 */}
          <text x="370" y="490" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">核心理念: IoC 解耦、AOP 分离横切关注点、Boot 约定优于配置、Cloud 治理微服务</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Spring in Action全书复习思维导图——从IoC到微服务的Spring全栈技术体系
      </figcaption>
    </figure>
  );
}
