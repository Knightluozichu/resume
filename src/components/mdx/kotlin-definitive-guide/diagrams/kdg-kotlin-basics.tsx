/**
 * <KdgKotlinBasicsDiagram>：Kotlin基础语法核心概念图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KdgKotlinBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin基础语法核心概念图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Kotlin基础语法核心概念
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            变量声明 / 类型系统 / 空安全 / 控制流 / 字符串 / 集合
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 左列：变量声明与类型 */}
          <rect x="50" y="80" width="320" height="130" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="210" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">变量声明与类型系统</text>
          <text x="65" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val x: Int = 42      // 不可变</text>
          <text x="65" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">var y = "hello"      // 可变+推断</text>
          <text x="65" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val z = 3.14         // Double</text>
          <text x="65" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val b: Boolean = true</text>
          <text x="65" y="198" fontSize="10" fill="var(--text-tertiary)">val = 不可变引用 | var = 可变引用</text>

          {/* 右列：空安全 */}
          <rect x="390" y="80" width="320" height="130" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">空安全（Null Safety）</text>
          <text x="405" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">var a: String = "hi"   // 非空</text>
          <text x="405" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">var b: String? = null  // 可空</text>
          <text x="405" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val len = b?.length    // 安全调用</text>
          <text x="405" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val l = b?.length ?: 0  // Elvis</text>
          <text x="405" y="198" fontSize="10" fill="var(--text-tertiary)">?.  安全调用  |  ?:  Elvis运算符</text>

          {/* 中列：控制流 */}
          <rect x="50" y="230" width="320" height="130" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">控制流</text>
          <text x="65" y="274" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">if (x &gt; 0) "pos" else "neg"  // 表达式</text>
          <text x="65" y="292" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">when (x) &lbrace;                 // when表达式</text>
          <text x="65" y="310" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  1 -&gt; "one"</text>
          <text x="65" y="328" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  else -&gt; "other"</text>
          <text x="65" y="346" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>

          {/* 右列：字符串与集合 */}
          <rect x="390" y="230" width="320" height="130" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">字符串模板与集合</text>
          <text x="405" y="274" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">"name=$name, age=$&lbrace;age+1&rbrace;"</text>
          <text x="405" y="292" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val list = listOf(1, 2, 3)</text>
          <text x="405" y="310" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val map = mapOf("k" to "v")</text>
          <text x="405" y="328" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">for ((k, v) in map) ...</text>
          <text x="405" y="346" fontSize="10" fill="var(--text-tertiary)">$变量  |  $&lbrace;表达式&rbrace;  |  to 中缀</text>

          {/* 底部：智能转换 */}
          <rect x="50" y="380" width="660" height="100" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="380" y="402" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">智能转换（Smart Cast）</text>
          <text x="65" y="424" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">if (obj is String) &lbrace;</text>
          <text x="65" y="442" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  println(obj.length)  // 编译器自动将 obj 当作 String，无需强转</text>
          <text x="65" y="460" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin基础语法核心概念——val/var、空安全、when表达式、字符串模板与智能转换
      </figcaption>
    </figure>
  );
}
