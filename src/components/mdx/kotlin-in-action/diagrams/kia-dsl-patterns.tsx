/**
 * <KiaDslPatternsDiagram>：Kotlin实战 第7章 DSL与领域建模图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function KiaDslPatternsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="DSL与领域建模——带接收者Lambda、类型安全构建器图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            DSL与领域建模
          </text>

          {/* 上半部：DSL核心机制 */}
          <rect x="30" y="50" width="680" height="200" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">DSL核心机制：带接收者的Lambda</text>

          <rect x="50" y="90" width="200" height="70" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="150" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">普通Lambda</text>
          <text x="150" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{`{ it -> it.method() }`}</text>
          <text x="150" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">it = 隐式参数名</text>
          <text x="150" y="156" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">需用it.前缀访问</text>

          <text x="265" y="128" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="285" y="90" width="200" height="70" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="385" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">带接收者Lambda</text>
          <text x="385" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{`String.() -> Unit`}</text>
          <text x="385" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">this = 接收者对象</text>
          <text x="385" y="156" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">直接访问接收者成员</text>

          <text x="500" y="128" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="520" y="90" width="170" height="70" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="605" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">DSL效果</text>
          <text x="605" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">html {'{'} body(...) {'}'}</text>
          <text x="605" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">类似自然语言</text>
          <text x="605" y="156" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">类型安全构建器</text>

          <rect x="50" y="170" width="640" height="60" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">关键区别</text>
          <text x="370" y="206" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">普通Lambda中接收者是参数（it），带接收者Lambda中接收者是this——可在块内直接调用其方法</text>
          <text x="370" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">这是Kotlin DSL的基础：让Lambda块看起来像在「配置」一个对象</text>

          {/* 下半部：DSL实战 + @DslMarker */}
          <rect x="30" y="270" width="330" height="250" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="294" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">HTML DSL示例</text>

          <rect x="50" y="310" width="290" height="190" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="328" fontSize="9" fill="var(--text-secondary)">fun html(init: HTML.() -&gt; Unit): HTML {'{'}</text>
          <text x="60" y="342" fontSize="9" fill="var(--text-secondary)">  val html = HTML()</text>
          <text x="60" y="356" fontSize="9" fill="var(--text-secondary)">  html.init()</text>
          <text x="60" y="370" fontSize="9" fill="var(--text-secondary)">{'}'}</text>
          <text x="60" y="388" fontSize="9" fill="var(--text-secondary)">html {'{'}</text>
          <text x="60" y="402" fontSize="9" fill="var(--text-secondary)">  body {'{'}</text>
          <text x="60" y="416" fontSize="9" fill="var(--text-secondary)">    p("Hello DSL")</text>
          <text x="60" y="430" fontSize="9" fill="var(--text-secondary)">    a(href) {'{'} "link" {'}'}</text>
          <text x="60" y="444" fontSize="9" fill="var(--text-secondary)">  {'}'}</text>
          <text x="60" y="458" fontSize="9" fill="var(--text-secondary)">{'}'}</text>
          <text x="60" y="476" fontSize="9" fill="var(--text-secondary)">{'{'}`// body/p/a都是带接收者Lambda`{'}'}</text>
          <text x="60" y="490" fontSize="9" fill="var(--text-secondary)">{'{'}`// 块内直接调用HTML的方法`{'}'}</text>

          {/* @DslMarker */}
          <rect x="380" y="270" width="330" height="250" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="294" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">@DslMarker作用域控制</text>

          <rect x="400" y="310" width="290" height="80" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">问题：隐式接收者污染</text>
          <text x="545" y="348" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">html {'{'} body {'{'} body {'{'} {'}'} {'}'} {'}'}</text>
          <text x="545" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">内层body可访问外层html的this</text>
          <text x="545" y="376" fontSize="9" fill="var(--text-secondary)">导致非预期嵌套</text>

          <rect x="400" y="398" width="290" height="80" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="418" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">解决：@DslMarker注解</text>
          <text x="545" y="436" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">@DslMarker annotation class HtmlDsl</text>
          <text x="545" y="450" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">@HtmlDsl class HTML / class BODY</text>
          <text x="545" y="464" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">编译器限制只访问最近接收者</text>

          <rect x="400" y="486" width="290" height="30" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="545" y="506" textAnchor="middle" fontSize="10" fill="var(--text-primary)">中缀调用 infix + 运算符重载也增强DSL表达力</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DSL与领域建模——带接收者Lambda（this替代it）、类型安全构建器、@DslMarker作用域控制、HTML DSL实战
      </figcaption>
    </figure>
  );
}
