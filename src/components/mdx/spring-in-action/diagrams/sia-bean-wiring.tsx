/**
 * <SiaBeanWiringDiagram>：Bean装配三种方式对比图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function SiaBeanWiringDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Bean装配三种方式对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Bean装配——自动装配 vs Java配置 vs XML配置
          </text>

          {/* 自动装配 */}
          <rect
            x="30"
            y="55"
            width="215"
            height="200"
            rx="10"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="137"
            y="78"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            自动装配（推荐）
          </text>
          <text
            x="137"
            y="98"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            @Component + 组件扫描
          </text>
          <text
            x="137"
            y="116"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            @Autowired 按类型注入
          </text>
          <rect
            x="45"
            y="130"
            width="185"
            height="110"
            rx="6"
            fill="var(--bg)"
            fillOpacity="0.5"
          />
          <text x="55" y="148" fontSize="9" fill="var(--text-secondary)">
            @Component
          </text>
          <text x="55" y="162" fontSize="9" fill="var(--text-secondary)">
            public class A &lbrace;
          </text>
          <text x="55" y="176" fontSize="9" fill="var(--text-secondary)">
            {" "}
            @Autowired
          </text>
          <text x="55" y="190" fontSize="9" fill="var(--text-secondary)">
            {" "}
            B b;
          </text>
          <text x="55" y="204" fontSize="9" fill="var(--text-secondary)">
            &rbrace;
          </text>
          <text
            x="137"
            y="228"
            textAnchor="middle"
            fontSize="9"
            fill="var(--success)"
          >
            最简，Spring Boot 默认
          </text>

          {/* Java配置 */}
          <rect
            x="262"
            y="55"
            width="215"
            height="200"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="370"
            y="78"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            Java配置
          </text>
          <text
            x="370"
            y="98"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            @Configuration + @Bean
          </text>
          <text
            x="370"
            y="116"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            显式声明第三方库Bean
          </text>
          <rect
            x="277"
            y="130"
            width="185"
            height="110"
            rx="6"
            fill="var(--bg)"
            fillOpacity="0.5"
          />
          <text x="287" y="148" fontSize="9" fill="var(--text-secondary)">
            @Configuration
          </text>
          <text x="287" y="162" fontSize="9" fill="var(--text-secondary)">
            class Cfg &lbrace;
          </text>
          <text x="287" y="176" fontSize="9" fill="var(--text-secondary)">
            {" "}
            @Bean
          </text>
          <text x="287" y="190" fontSize="9" fill="var(--text-secondary)">
            {" "}
            A a()&lbrace;return new A();&rbrace;
          </text>
          <text x="287" y="204" fontSize="9" fill="var(--text-secondary)">
            &rbrace;
          </text>
          <text
            x="370"
            y="228"
            textAnchor="middle"
            fontSize="9"
            fill="var(--accent)"
          >
            类型安全，可重构
          </text>

          {/* XML配置 */}
          <rect
            x="494"
            y="55"
            width="215"
            height="200"
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="602"
            y="78"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--warning)"
          >
            XML配置（遗留）
          </text>
          <text
            x="602"
            y="98"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            &lt;bean&gt; 显式声明
          </text>
          <text
            x="602"
            y="116"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            老项目兼容、namespace
          </text>
          <rect
            x="509"
            y="130"
            width="185"
            height="110"
            rx="6"
            fill="var(--bg)"
            fillOpacity="0.5"
          />
          <text x="519" y="148" fontSize="9" fill="var(--text-secondary)">
            &lt;beans&gt;
          </text>
          <text x="519" y="162" fontSize="9" fill="var(--text-secondary)">
            {" "}
            &lt;bean id=&quot;a&quot;
          </text>
          <text x="519" y="176" fontSize="9" fill="var(--text-secondary)">
            {" "}
            class=&quot;x.A&quot;&gt;
          </text>
          <text x="519" y="190" fontSize="9" fill="var(--text-secondary)">
            {" "}
            &lt;property
          </text>
          <text x="519" y="204" fontSize="9" fill="var(--text-secondary)">
            {" "}
            ref=&quot;b&quot;/&gt;
          </text>
          <text x="519" y="218" fontSize="9" fill="var(--text-secondary)">
            {" "}
            &lt;/bean&gt;
          </text>
          <text
            x="602"
            y="228"
            textAnchor="middle"
            fontSize="9"
            fill="var(--warning)"
          >
            冗长，不类型安全
          </text>

          {/* 底部：装配流程 */}
          <text
            x="370"
            y="290"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            容器装配流程
          </text>

          <rect
            x="40"
            y="305"
            width="150"
            height="50"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.10"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="115"
            y="325"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            1. 扫描/读取
          </text>
          <text
            x="115"
            y="342"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            @ComponentScan / XML
          </text>

          <text
            x="200"
            y="335"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="215"
            y="305"
            width="150"
            height="50"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.10"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="290"
            y="325"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            2. 注册定义
          </text>
          <text
            x="290"
            y="342"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            BeanDefinition
          </text>

          <text
            x="375"
            y="335"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="390"
            y="305"
            width="150"
            height="50"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="465"
            y="325"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            3. 实例化
          </text>
          <text
            x="465"
            y="342"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            反射创建对象
          </text>

          <text
            x="550"
            y="335"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="565"
            y="305"
            width="135"
            height="50"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.10"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="632"
            y="325"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            4. 注入就绪
          </text>
          <text
            x="632"
            y="342"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            @Autowired 完成
          </text>

          {/* 作用域 */}
          <text
            x="370"
            y="395"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Bean作用域
          </text>
          <rect
            x="40"
            y="410"
            width="165"
            height="90"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="122"
            y="430"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            singleton（默认）
          </text>
          <text
            x="122"
            y="448"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            每个容器一个实例
          </text>
          <text
            x="122"
            y="464"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            无状态Service首选
          </text>
          <text
            x="122"
            y="484"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            @Scope(&quot;singleton&quot;)
          </text>

          <rect
            x="220"
            y="410"
            width="150"
            height="90"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="295"
            y="430"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            prototype
          </text>
          <text
            x="295"
            y="448"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            每次注入新实例
          </text>
          <text
            x="295"
            y="464"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            有状态对象
          </text>
          <text
            x="295"
            y="484"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            @Scope(&quot;prototype&quot;)
          </text>

          <rect
            x="385"
            y="410"
            width="150"
            height="90"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="460"
            y="430"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            request
          </text>
          <text
            x="460"
            y="448"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            每个HTTP请求一个
          </text>
          <text
            x="460"
            y="464"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            Web环境
          </text>
          <text
            x="460"
            y="484"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            @Scope(&quot;request&quot;)
          </text>

          <rect
            x="550"
            y="410"
            width="150"
            height="90"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="625"
            y="430"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            session
          </text>
          <text
            x="625"
            y="448"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            每个会话一个
          </text>
          <text
            x="625"
            y="464"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            用户级状态
          </text>
          <text
            x="625"
            y="484"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            @Scope(&quot;session&quot;)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Bean装配——自动装配、Java配置、XML配置三种方式对比，扫描→注册→实例化→注入四步流程与四种作用域
      </figcaption>
    </figure>
  );
}
