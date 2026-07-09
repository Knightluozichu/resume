/**
 * <KdgAdvancedTypesDiagram>：高级类型（泛型/协变）核心概念图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KdgAdvancedTypesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin高级类型泛型与协变核心概念图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            高级类型：泛型与型变
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            泛型声明 / 协变(out) / 逆变(in) / 星投影 / reified
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 左列：泛型基础 */}
          <rect x="50" y="80" width="320" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="210" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">泛型类与泛型函数</text>
          <text x="65" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">class Box&lt;T&gt;(val value: T)</text>
          <text x="65" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val intBox = Box&lt;Int&gt;(42)</text>
          <text x="65" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val strBox = Box("hi")  // 推断</text>
          <text x="65" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun &lt;T&gt; identity(x: T): T = x</text>
          <text x="65" y="198" fontSize="10" fill="var(--text-tertiary)">&lt;T&gt; 类型参数在实例化时确定</text>

          {/* 右列：协变 out */}
          <rect x="390" y="80" width="320" height="120" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">协变（out）—— 生产者</text>
          <text x="405" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">interface Producer&lt;out T&gt; &lbrace;</text>
          <text x="405" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  fun produce(): T</text>
          <text x="405" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
          <text x="405" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val p: Producer&lt;Animal&gt; =</text>
          <text x="405" y="198" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  Producer&lt;Dog&gt;()  // 合法!</text>

          {/* 左列：逆变 in */}
          <rect x="50" y="220" width="320" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="242" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">逆变（in）—— 消费者</text>
          <text x="65" y="264" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">interface Consumer&lt;in T&gt; &lbrace;</text>
          <text x="65" y="282" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  fun consume(item: T)</text>
          <text x="65" y="300" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
          <text x="65" y="320" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val c: Consumer&lt;Dog&gt; =</text>
          <text x="65" y="338" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  Consumer&lt;Animal&gt;()  // 合法!</text>

          {/* 右列：星投影与上界约束 */}
          <rect x="390" y="220" width="320" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="242" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">星投影与上界约束</text>
          <text x="405" y="264" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// 星投影：类型未知但安全</text>
          <text x="405" y="282" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun size(box: Box&lt;*&gt;) = box.value</text>
          <text x="405" y="302" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace"></text>
          <text x="405" y="320" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// 上界约束</text>
          <text x="405" y="338" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun &lt;T : Comparable&lt;T&gt;&gt; max(a:T, b:T)</text>

          {/* 底部：reified 内联泛型 */}
          <rect x="50" y="360" width="660" height="120" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="380" y="382" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">reified：内联函数的具体化类型参数</text>
          <text x="65" y="404" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">inline fun &lt;reified T&gt; filterType(items: List&lt;Any&gt;): List&lt;T&gt; =</text>
          <text x="65" y="422" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  items.filterIsInstance&lt;T&gt;()  // 运行时保留 T 的类型信息</text>
          <text x="65" y="444" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace"></text>
          <text x="65" y="464" fontSize="10" fill="var(--text-tertiary)">普通泛型 T 在运行时被擦除；reified + inline 让编译器在调用处替换 T，实现类型检查与反射</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin高级类型——泛型声明、out协变（生产者）、in逆变（消费者）、星投影与reified具体化
      </figcaption>
    </figure>
  );
}
