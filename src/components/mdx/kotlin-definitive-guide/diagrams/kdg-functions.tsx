/**
 * <KdgFunctionsDiagram>：函数与类型系统核心概念图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KdgFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin函数与类型系统核心概念图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            函数与类型系统核心概念
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            函数声明 / 默认参数 / 高阶函数 / Lambda / 函数类型
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 左列：函数声明与默认参数 */}
          <rect x="50" y="80" width="320" height="140" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="210" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">函数声明与默认参数</text>
          <text x="65" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun add(a: Int, b: Int): Int &lbrace;</text>
          <text x="65" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  return a + b</text>
          <text x="65" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
          <text x="65" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun greet(</text>
          <text x="65" y="198" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  name: String = "World"</text>
          <text x="65" y="216" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">) = "Hi, $name"  // 表达式体</text>

          {/* 右列：高阶函数与函数类型 */}
          <rect x="390" y="80" width="320" height="140" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">高阶函数与函数类型</text>
          <text x="405" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// 函数作为参数</text>
          <text x="405" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun apply(f: (Int)-&gt;Int, x: Int) = f(x)</text>
          <text x="405" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace"></text>
          <text x="405" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// 函数作为返回值</text>
          <text x="405" y="198" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun multiplier(n: Int): (Int)-&gt;Int =</text>
          <text x="405" y="216" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  &lbrace; it * n &rbrace;</text>

          {/* 左列：Lambda表达式 */}
          <rect x="50" y="240" width="320" height="140" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="262" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Lambda表达式</text>
          <text x="65" y="284" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val square = &lbrace; x: Int -&gt; x * x &rbrace;</text>
          <text x="65" y="302" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">square(5)  // 25</text>
          <text x="65" y="322" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace"></text>
          <text x="65" y="340" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// 末尾Lambda + it 隐式参数</text>
          <text x="65" y="358" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">list.filter &lbrace; it &gt; 0 &rbrace;</text>
          <text x="65" y="376" fontSize="10" fill="var(--text-tertiary)">it = 单参数Lambda的隐式名</text>

          {/* 右列：集合操作函数 */}
          <rect x="390" y="240" width="320" height="140" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="262" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">集合函数式操作</text>
          <text x="405" y="284" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">list.map &lbrace; it * 2 &rbrace;</text>
          <text x="405" y="302" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  .filter &lbrace; it &gt; 5 &rbrace;</text>
          <text x="405" y="320" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  .sortedBy &lbrace; it &rbrace;</text>
          <text x="405" y="338" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  .forEach &lbrace; println(it) &rbrace;</text>
          <text x="405" y="358" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val sum = list.reduce &lbrace; a, b -&gt; a+b &rbrace;</text>
          <text x="405" y="376" fontSize="10" fill="var(--text-tertiary)">map / filter / reduce / forEach 链式</text>

          {/* 底部：内联函数 */}
          <rect x="50" y="400" width="660" height="80" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="380" y="422" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">内联函数（inline）</text>
          <text x="65" y="444" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">inline fun &lt;T&gt; withLock(lock: Lock, body: () -&gt; T): T &lbrace; ... &rbrace;  // Lambda内联到调用处，消除闭包开销</text>
          <text x="65" y="464" fontSize="10" fill="var(--text-tertiary)">高阶函数默认有闭包开销，inline 让编译器在调用处展开 Lambda 体，提升性能</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin函数与类型系统——默认参数、表达式体、高阶函数、Lambda、集合操作与内联函数
      </figcaption>
    </figure>
  );
}
