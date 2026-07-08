/**
 * <SiaSpringCoreDiagram>：Spring核心与IoC容器机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function SiaSpringCoreDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Spring核心与IoC容器机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Spring核心与IoC——容器如何管理Bean
          </text>

          {/* 顶部：传统方式 vs IoC方式 */}
          <rect x="30" y="50" width="330" height="80" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">传统方式（紧耦合）</text>
          <text x="195" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象自己 new 依赖</text>
          <text x="195" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">A a = new A(); B b = new B();</text>
          <text x="195" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">改依赖 = 改源码，无法替换</text>

          <rect x="380" y="50" width="330" height="80" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">IoC方式（松耦合）</text>
          <text x="545" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">容器注入依赖</text>
          <text x="545" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">@Autowired B b;  // 容器负责</text>
          <text x="545" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">改依赖 = 改配置，不动源码</text>

          {/* 中间：Spring容器 */}
          <rect x="170" y="160" width="400" height="240" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="184" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">Spring IoC 容器（ApplicationContext）</text>

          {/* 容器内部三步 */}
          <rect x="190" y="200" width="360" height="44" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">1. 实例化</text>
          <text x="370" y="236" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">读取配置/注解，创建Bean实例（反射）</text>

          <rect x="190" y="254" width="360" height="44" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="274" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">2. 属性填充</text>
          <text x="370" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">@Autowired 注入依赖，@Value 注入配置值</text>

          <rect x="190" y="308" width="360" height="44" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="328" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">3. 初始化</text>
          <text x="370" y="344" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">@PostConstruct → BeanPostProcessor → 就绪</text>

          <text x="370" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">销毁：@PreDestroy → 容器关闭时回调</text>

          {/* 底部：三种注入方式 */}
          <text x="370" y="430" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">三种依赖注入方式</text>
          <rect x="40" y="445" width="210" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="145" y="465" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">构造器注入（推荐）</text>
          <text x="145" y="482" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不可变、可测试、循环依赖早暴露</text>

          <rect x="265" y="445" width="210" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="465" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Setter注入</text>
          <text x="370" y="482" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可选依赖、可重新注入</text>

          <rect x="490" y="445" width="210" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="595" y="465" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">字段注入</text>
          <text x="595" y="482" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">简洁但不推荐（难测试）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Spring IoC容器——实例化、属性填充、初始化三阶段管理Bean生命周期，控制反转实现松耦合
      </figcaption>
    </figure>
  );
}
