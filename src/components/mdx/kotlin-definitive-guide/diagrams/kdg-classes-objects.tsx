/**
 * <KdgClassesObjectsDiagram>：类与对象核心概念图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KdgClassesObjectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin类与对象核心概念图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类与对象核心概念
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            类定义 / 继承 / 接口 / 数据类 / 密封类 / 委托 / 单例
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排左：类定义与构造函数 */}
          <rect x="50" y="80" width="320" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="210" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">类定义与主构造函数</text>
          <text x="65" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">class Person(val name: String, var age: Int)</text>
          <text x="65" y="144" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace"></text>
          <text x="65" y="162" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val p = Person("Alice", 30)</text>
          <text x="65" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">p.name  // val 只读属性</text>
          <text x="65" y="198" fontSize="10" fill="var(--text-tertiary)">主构造函数参数 + val/var = 自动属性</text>

          {/* 第一排右：继承与接口 */}
          <rect x="390" y="80" width="320" height="120" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">继承与接口</text>
          <text x="405" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">open class Animal &lbrace; open fun speak() &rbrace;</text>
          <text x="405" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">class Dog : Animal() &lbrace;</text>
          <text x="405" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  override fun speak() &lbrace; ... &rbrace;</text>
          <text x="405" y="178" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
          <text x="405" y="196" fontSize="10" fill="var(--text-tertiary)">类默认 final，open 才可继承</text>

          {/* 第二排左：数据类与密封类 */}
          <rect x="50" y="220" width="320" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="242" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">数据类与密封类</text>
          <text x="65" y="264" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">data class User(val name: String, val id: Int)</text>
          <text x="65" y="282" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// 自动生成 equals/hashCode/copy</text>
          <text x="65" y="302" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace"></text>
          <text x="65" y="320" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">sealed class Result</text>
          <text x="65" y="338" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">data class Success(val v: T): Result()</text>

          {/* 第二排右：单例与委托 */}
          <rect x="390" y="220" width="320" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="242" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">单例、伴生对象与委托</text>
          <text x="405" y="264" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">object Database &lbrace; ... &rbrace;  // 单例</text>
          <text x="405" y="282" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace"></text>
          <text x="405" y="300" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">companion object &lbrace;  // 静态成员</text>
          <text x="405" y="318" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  fun create() = ...</text>
          <text x="405" y="336" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>

          {/* 第三排：属性委托 */}
          <rect x="50" y="360" width="660" height="120" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="380" y="382" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">属性委托（by）</text>
          <text x="65" y="404" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">class Foo &lbrace;</text>
          <text x="65" y="422" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  var p: String by Delegates.observable("init") &lbrace; _, old, new -&gt;</text>
          <text x="65" y="440" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">    println("$old -&gt; $new")</text>
          <text x="65" y="458" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  &rbrace;</text>
          <text x="65" y="476" fontSize="10" fill="var(--text-tertiary)">by 关键字将属性 get/set 委托给第三方对象，实现懒加载、可观察、Map 映射等</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin类与对象——主构造函数、open/override继承、data class、sealed class、object单例与属性委托
      </figcaption>
    </figure>
  );
}
