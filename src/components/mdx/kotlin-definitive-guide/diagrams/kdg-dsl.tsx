/**
 * <KdgDslDiagram>：DSL构建核心概念图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KdgDslDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin DSL构建核心概念图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            DSL构建：类型安全构建器
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            带接收者的Lambda / @DslMarker / 中缀调用 / 扩展函数
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 左列：带接收者的Lambda */}
          <rect x="50" y="80" width="320" height="150" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="210" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">带接收者的Lambda</text>
          <text x="65" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">class HTML &lbrace;</text>
          <text x="65" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  fun body(text: String) &lbrace; ... &rbrace;</text>
          <text x="65" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
          <text x="65" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun html(init: HTML.()-&gt;Unit) =</text>
          <text x="65" y="198" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  HTML().apply(init)  // init内this=HTML</text>
          <text x="65" y="218" fontSize="10" fill="var(--text-tertiary)">Lambda 接收者在块内作为 this</text>

          {/* 右列：DSL使用示例 */}
          <rect x="390" y="80" width="320" height="150" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">DSL 使用示例</text>
          <text x="405" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">html &lbrace;</text>
          <text x="405" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  body("Hello DSL")</text>
          <text x="405" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  body("Kotlin")</text>
          <text x="405" y="178" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
          <text x="405" y="200" fontSize="10" fill="var(--text-tertiary)">无需 this. 前缀，天然构建器语法</text>
          <text x="405" y="218" fontSize="10" fill="var(--text-tertiary)">Gradle Kotlin DSL / Anko 均用此机制</text>

          {/* 左列：@DslMarker 作用域控制 */}
          <rect x="50" y="250" width="320" height="130" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="272" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">@DslMarker 作用域控制</text>
          <text x="65" y="294" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">@DslMarker</text>
          <text x="65" y="312" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">annotation class HtmlDsl</text>
          <text x="65" y="332" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">@HtmlDsl class HTML &lbrace; ... &rbrace;</text>
          <text x="65" y="352" fontSize="10" fill="var(--text-tertiary)">防止外层接收者被隐式访问</text>
          <text x="65" y="370" fontSize="10" fill="var(--text-tertiary)">编译期检测到歧义时报错</text>

          {/* 右列：中缀与扩展组合 */}
          <rect x="390" y="250" width="320" height="130" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="272" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">中缀调用与扩展函数</text>
          <text x="405" y="294" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">infix fun Int.times(str: String) =</text>
          <text x="405" y="312" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  str.repeat(this)</text>
          <text x="405" y="332" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">3 times "ab"  // "ababab"</text>
          <text x="405" y="352" fontSize="10" fill="var(--text-tertiary)">infix 让 DSL 更自然</text>
          <text x="405" y="370" fontSize="10" fill="var(--text-tertiary)">扩展函数为已有类添加 DSL 方法</text>

          {/* 底部：典型DSL场景 */}
          <rect x="50" y="400" width="660" height="80" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="380" y="422" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">典型 DSL 场景</text>
          <text x="65" y="444" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">Gradle build.gradle.kts  |  Ktor 路由 DSL  |  Android Compose UI  |  SQLDelight 查询  |  测试框架 DSL</text>
          <text x="65" y="464" fontSize="10" fill="var(--text-tertiary)">带接收者的Lambda + 扩展函数 + 中缀 + @DslMarker = 类型安全的声明式 API</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin DSL构建——带接收者的Lambda、@DslMarker作用域控制、中缀调用与扩展函数组合
      </figcaption>
    </figure>
  );
}
