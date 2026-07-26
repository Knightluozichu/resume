/**
 * <SiaSpringBootDiagram>：Spring Boot 自动配置与起步依赖图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function SiaSpringBootDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Spring Boot自动配置与起步依赖图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Spring Boot——约定优于配置
          </text>

          {/* 三大核心能力 */}
          <text x="370" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">三大核心能力</text>

          <rect x="30" y="65" width="215" height="130" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.5" />
          <text x="137" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">自动配置</text>
          <text x="137" y="106" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@EnableAutoConfiguration</text>
          <text x="137" y="124" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">classpath 有依赖</text>
          <text x="137" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">→ 自动装配Bean</text>
          <text x="137" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">有MySQL驱动→配DataSource</text>
          <text x="137" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">有Tomcat→内嵌服务器</text>

          <rect x="262" y="65" width="215" height="130" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">起步依赖</text>
          <text x="370" y="106" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">spring-boot-starter-*</text>
          <text x="370" y="124" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">一个依赖 = 一组协调版本</text>
          <text x="370" y="144" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">-web: MVC+Tomcat+Jackson</text>
          <text x="370" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">-data-jpa: JPA+Hibernate</text>
          <text x="370" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无需手动管理版本</text>

          <rect x="494" y="65" width="215" height="130" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="602" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">内嵌服务器</text>
          <text x="602" y="106" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">java -jar 直接运行</text>
          <text x="602" y="124" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无需部署WAR到容器</text>
          <text x="602" y="144" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">默认 Tomcat</text>
          <text x="602" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">可换 Jetty / Undertow</text>
          <text x="602" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">适合容器化部署</text>

          {/* 自动配置原理 */}
          <text x="370" y="225" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">自动配置如何工作</text>

          <rect x="30" y="240" width="150" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="105" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">1. 启动扫描</text>
          <text x="105" y="277" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">META-INF/spring.factories</text>

          <text x="190" y="270" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="205" y="240" width="150" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="280" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">2. 条件判定</text>
          <text x="280" y="277" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@ConditionalOnClass</text>

          <text x="365" y="270" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="380" y="240" width="150" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="455" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">3. 装配Bean</text>
          <text x="455" y="277" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@Configuration</text>

          <text x="540" y="270" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="555" y="240" width="150" height="50" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="630" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">4. 可覆盖</text>
          <text x="630" y="277" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">自定义Bean优先</text>

          {/* 外部化配置 */}
          <text x="370" y="320" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">外部化配置优先级（高 → 低）</text>

          <rect x="40" y="335" width="660" height="160" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="357" fontSize="11" fill="var(--danger)">1. 命令行参数        </text>
          <text x="270" y="357" fontSize="11" fill="var(--text-secondary)">--server.port=9090</text>
          <text x="60" y="375" fontSize="11" fill="var(--danger)">2. 环境变量          </text>
          <text x="270" y="375" fontSize="11" fill="var(--text-secondary)">SERVER_PORT=9090</text>
          <text x="60" y="393" fontSize="11" fill="var(--warning)">3. application.yml  </text>
          <text x="270" y="393" fontSize="11" fill="var(--text-secondary)">当前应用配置文件</text>
          <text x="60" y="411" fontSize="11" fill="var(--warning)">4. profile配置      </text>
          <text x="270" y="411" fontSize="11" fill="var(--text-secondary)">application-prod.yml</text>
          <text x="60" y="429" fontSize="11" fill="var(--accent)">5. 默认值            </text>
          <text x="270" y="429" fontSize="11" fill="var(--text-secondary)">SpringBoot 内置默认</text>
          <text x="450" y="357" fontSize="11" fill="var(--text-primary)">@Value 注入</text>
          <text x="450" y="375" fontSize="11" fill="var(--text-primary)">@ConfigurationProperties</text>
          <text x="450" y="393" fontSize="11" fill="var(--text-secondary)">类型安全批量绑定</text>
          <text x="450" y="418" fontSize="11" fill="var(--text-secondary)">高优先级覆盖低优先级，同一key以最高优先级为准</text>
          <text x="450" y="433" fontSize="11" fill="var(--text-secondary)">生产敏感配置用环境变量，不进代码仓库</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Spring Boot——自动配置、起步依赖、内嵌服务器三大核心，条件化装配与外部化配置优先级
      </figcaption>
    </figure>
  );
}
