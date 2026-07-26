/**
 * <SiaSpringSecurityDiagram>：Spring Security 认证授权机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function SiaSpringSecurityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Spring Security认证授权机制图解"
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
            Spring Security——过滤链、认证、授权
          </text>

          {/* 顶部：请求穿过过滤链 */}
          <text
            x="370"
            y="55"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            请求穿过安全过滤链（FilterChain）
          </text>

          <rect
            x="20"
            y="65"
            width="90"
            height="40"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.10"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="65"
            y="90"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            请求
          </text>

          <text
            x="120"
            y="88"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="135"
            y="65"
            width="100"
            height="40"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="185"
            y="82"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            SecurityFilter
          </text>
          <text
            x="185"
            y="96"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Chain
          </text>

          <text
            x="245"
            y="88"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="260"
            y="65"
            width="100"
            height="40"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="310"
            y="82"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            UsernamePwd
          </text>
          <text
            x="310"
            y="96"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            AuthFilter
          </text>

          <text
            x="370"
            y="88"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="385"
            y="65"
            width="100"
            height="40"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="435"
            y="82"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            FilterSecurity
          </text>
          <text
            x="435"
            y="96"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Interceptor
          </text>

          <text
            x="495"
            y="88"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="510"
            y="65"
            width="100"
            height="40"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="560"
            y="82"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            其他Filter
          </text>
          <text
            x="560"
            y="96"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            CORS/CSRF
          </text>

          <text
            x="620"
            y="88"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="635"
            y="65"
            width="90"
            height="40"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.10"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="680"
            y="90"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            控制器
          </text>

          {/* 认证流程 */}
          <text
            x="370"
            y="140"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            认证流程（Authentication）——「你是谁」
          </text>

          <rect
            x="30"
            y="155"
            width="120"
            height="100"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.10"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="90"
            y="178"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            1. 提交凭证
          </text>
          <text
            x="90"
            y="196"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            用户名+密码
          </text>
          <text
            x="90"
            y="212"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            POST /login
          </text>

          <text
            x="158"
            y="210"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="175"
            y="155"
            width="120"
            height="100"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.10"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="235"
            y="178"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            2. Authentication
          </text>
          <text
            x="235"
            y="196"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Manager
          </text>
          <text
            x="235"
            y="212"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            分发给Provider
          </text>

          <text
            x="303"
            y="210"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="320"
            y="155"
            width="120"
            height="100"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.10"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="380"
            y="178"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            3. Authentication
          </text>
          <text
            x="380"
            y="196"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Provider
          </text>
          <text
            x="380"
            y="212"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            调 UserDetailsService
          </text>

          <text
            x="448"
            y="210"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="465"
            y="155"
            width="120"
            height="100"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.10"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="525"
            y="178"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            4. 密码编码器
          </text>
          <text
            x="525"
            y="196"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            BCryptPasswordEncoder
          </text>
          <text
            x="525"
            y="212"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            比对哈希
          </text>

          <text
            x="593"
            y="210"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="610"
            y="155"
            width="115"
            height="100"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.10"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="667"
            y="178"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            5. SecurityContext
          </text>
          <text
            x="667"
            y="196"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            存已认证主体
          </text>
          <text
            x="667"
            y="212"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Authorities
          </text>

          {/* 授权 */}
          <text
            x="370"
            y="285"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            授权（Authorization）——「你能做什么」
          </text>

          <rect
            x="30"
            y="300"
            width="215"
            height="70"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="137"
            y="320"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            URL 级授权
          </text>
          <text
            x="137"
            y="338"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            http.authorizeHttpRequests
          </text>
          <text
            x="137"
            y="354"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            /admin/** hasRole(&quot;ADMIN&quot;)
          </text>

          <rect
            x="262"
            y="300"
            width="215"
            height="70"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="370"
            y="320"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            方法级授权
          </text>
          <text
            x="370"
            y="338"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            @PreAuthorize(&quot;hasRole(&apos;ADMIN&apos;)&quot;)
          </text>
          <text
            x="370"
            y="354"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            @PostAuthorize / @Secured
          </text>

          <rect
            x="494"
            y="300"
            width="215"
            height="70"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="602"
            y="320"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            领域对象授权
          </text>
          <text
            x="602"
            y="338"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            ACL（访问控制列表）
          </text>
          <text
            x="602"
            y="354"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            细粒度到单条记录
          </text>

          {/* 密码编码演进 */}
          <rect
            x="30"
            y="395"
            width="680"
            height="105"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.05"
            stroke="var(--danger)"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x="370"
            y="418"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--danger)"
          >
            密码存储演进——明文是灾难，必须哈希
          </text>
          <text x="60" y="440" fontSize="11" fill="var(--danger)">
            明文存储{" "}
          </text>
          <text x="220" y="440" fontSize="11" fill="var(--text-secondary)">
            → 泄露即裸奔（绝对禁止）
          </text>
          <text x="60" y="458" fontSize="11" fill="var(--warning)">
            MD5/SHA{" "}
          </text>
          <text x="220" y="458" fontSize="11" fill="var(--text-secondary)">
            → 彩虹表可破（已不安全）
          </text>
          <text x="60" y="476" fontSize="11" fill="var(--accent)">
            BCrypt（推荐）{" "}
          </text>
          <text x="220" y="476" fontSize="11" fill="var(--text-secondary)">
            → 自适应哈希 + 盐，慢即安全
          </text>
          <text x="450" y="440" fontSize="11" fill="var(--accent)">
            Argon2{" "}
          </text>
          <text x="580" y="440" fontSize="11" fill="var(--text-secondary)">
            → 内存难破解
          </text>
          <text x="450" y="458" fontSize="11" fill="var(--text-secondary)">
            DelegatingPwdEncoder
          </text>
          <text x="580" y="458" fontSize="11" fill="var(--text-secondary)">
            → 平滑迁移
          </text>
          <text x="450" y="476" fontSize="11" fill="var(--text-secondary)">
            Spring默认BCrypt
          </text>
          <text x="580" y="476" fontSize="11" fill="var(--text-secondary)">
            → 强度因子可调
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Spring
        Security——过滤链处理请求、认证确认身份、授权控制访问，密码必须用BCrypt等自适应哈希存储
      </figcaption>
    </figure>
  );
}
