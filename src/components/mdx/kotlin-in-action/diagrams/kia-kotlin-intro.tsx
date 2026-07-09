/**
 * <KiaKotlinIntroDiagram>：Kotlin实战 第1章 Kotlin简介图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KiaKotlinIntroDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin简介——Kotlin与Java对比及核心特性图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Kotlin简介——为什么选择Kotlin
          </text>

          {/* 左侧：Kotlin设计目标 */}
          <rect x="30" y="50" width="330" height="220" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">Kotlin设计目标</text>

          <rect x="50" y="90" width="290" height="40" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">简洁——消除Java样板代码</text>
          <text x="195" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">data class一行替代equals/hashCode/toString</text>

          <rect x="50" y="138" width="290" height="40" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="156" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">安全——编译期消除NPE</text>
          <text x="195" y="170" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">类型系统区分非空String与可空String?</text>

          <rect x="50" y="186" width="290" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">互操作——与Java 100%兼容</text>
          <text x="195" y="218" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Kotlin调用Java、Java调用Kotlin均可</text>

          <rect x="50" y="234" width="290" height="30" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="195" y="254" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">工具友好——IntelliJ一等支持</text>

          {/* 右侧：Java vs Kotlin 对比 */}
          <rect x="380" y="50" width="330" height="220" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">Java vs Kotlin 核心对比</text>

          <text x="400" y="98" fontSize="11" fontWeight="600" fill="var(--text-secondary)">特性</text>
          <text x="520" y="98" fontSize="11" fontWeight="600" fill="var(--text-secondary)">Java</text>
          <text x="640" y="98" fontSize="11" fontWeight="600" fill="var(--text-secondary)">Kotlin</text>

          <line x1="395" y1="104" x2="695" y2="104" stroke="var(--border)" strokeWidth="1" />

          <text x="400" y="120" fontSize="10" fill="var(--text-primary)">空安全</text>
          <text x="520" y="120" fontSize="10" fill="var(--text-secondary)">运行时NPE</text>
          <text x="640" y="120" fontSize="10" fill="var(--success)">编译期保证</text>

          <text x="400" y="140" fontSize="10" fill="var(--text-primary)">变量声明</text>
          <text x="520" y="140" fontSize="10" fill="var(--text-secondary)">String x</text>
          <text x="640" y="140" fontSize="10" fill="var(--success)">val/var推断</text>

          <text x="400" y="160" fontSize="10" fill="var(--text-primary)">类继承</text>
          <text x="520" y="160" fontSize="10" fill="var(--text-secondary)">默认可继承</text>
          <text x="640" y="160" fontSize="10" fill="var(--success)">默认final</text>

          <text x="400" y="180" fontSize="10" fill="var(--text-primary)">数据类</text>
          <text x="520" y="180" fontSize="10" fill="var(--text-secondary)">手写/Lombok</text>
          <text x="640" y="180" fontSize="10" fill="var(--success)">data class</text>

          <text x="400" y="200" fontSize="10" fill="var(--text-primary)">扩展函数</text>
          <text x="520" y="200" fontSize="10" fill="var(--text-secondary)">继承/工具类</text>
          <text x="640" y="200" fontSize="10" fill="var(--success)">fun X.ext()</text>

          <text x="400" y="220" fontSize="10" fill="var(--text-primary)">协程</text>
          <text x="520" y="220" fontSize="10" fill="var(--text-secondary)">线程池/Future</text>
          <text x="640" y="220" fontSize="10" fill="var(--success)">suspend/launch</text>

          <text x="400" y="240" fontSize="10" fill="var(--text-primary)">switch</text>
          <text x="520" y="240" fontSize="10" fill="var(--text-secondary)">switch语句</text>
          <text x="640" y="240" fontSize="10" fill="var(--success)">when表达式</text>

          <text x="400" y="260" fontSize="10" fill="var(--text-primary)">类型推断</text>
          <text x="520" y="260" fontSize="10" fill="var(--text-secondary)">Java 10+ var</text>
          <text x="640" y="260" fontSize="10" fill="var(--success)">全面推断</text>

          {/* 底部：Kotlin编译流程 */}
          <rect x="30" y="290" width="680" height="210" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="314" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">Kotlin编译与互操作流程</text>

          <rect x="60" y="335" width="140" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="130" y="357" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">.kt源码</text>
          <text x="130" y="373" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Kotlin代码</text>

          <text x="215" y="365" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="235" y="335" width="140" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="305" y="357" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">kotlinc编译器</text>
          <text x="305" y="373" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">语法分析/类型检查</text>

          <text x="390" y="365" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="410" y="335" width="140" height="50" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="480" y="357" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">.class字节码</text>
          <text x="480" y="373" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">与Java同格式</text>

          <text x="565" y="365" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="585" y="335" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="645" y="357" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">JVM运行</text>
          <text x="645" y="373" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Kotlin/Java混跑</text>

          <text x="305" y="425" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Kotlin可调用Java库（Android Framework/Guava/Spring）</text>
          <text x="480" y="425" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Java可调用Kotlin（加@JvmStatic/@JvmField注解）</text>

          <rect x="60" y="445" width="640" height="40" rx="8" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x={VIEW_W / 2} y="470" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            核心理念：Kotlin不是替代Java，而是让Java生态更简洁安全——编译产物是标准.class，与Java无缝互操作
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin简介——四大设计目标（简洁/安全/互操作/工具友好）、Java vs Kotlin核心特性对比、Kotlin编译流程
      </figcaption>
    </figure>
  );
}
