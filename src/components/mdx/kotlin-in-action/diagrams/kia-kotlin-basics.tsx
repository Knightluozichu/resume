/**
 * <KiaKotlinBasicsDiagram>：Kotlin实战 第2章 Kotlin基础图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KiaKotlinBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin基础——变量、类型、控制流图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Kotlin基础——变量、类型与控制流
          </text>

          {/* 左上：val vs var */}
          <rect x="30" y="50" width="330" height="160" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">val vs var 变量声明</text>

          <rect x="50" y="90" width="140" height="100" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="112" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">val（只读引用）</text>
          <text x="120" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">赋值后不可变</text>
          <text x="120" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">相当于Java final</text>
          <text x="120" y="168" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">优先使用val</text>

          <rect x="200" y="90" width="140" height="100" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="270" y="112" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">var（可变引用）</text>
          <text x="270" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可重新赋值</text>
          <text x="270" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">类型推断后固定</text>
          <text x="270" y="168" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">需有变更理由</text>

          {/* 右上：类型系统 */}
          <rect x="380" y="50" width="330" height="160" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">基本类型与类型推断</text>

          <text x="400" y="98" fontSize="11" fontWeight="600" fill="var(--text-secondary)">Kotlin类型</text>
          <text x="560" y="98" fontSize="11" fontWeight="600" fill="var(--text-secondary)">Java对应</text>
          <text x="660" y="98" fontSize="11" fontWeight="600" fill="var(--text-secondary)">说明</text>
          <line x1="395" y1="104" x2="695" y2="104" stroke="var(--border)" strokeWidth="1" />

          <text x="400" y="122" fontSize="10" fill="var(--success)">Int / Long</text>
          <text x="560" y="122" fontSize="10" fill="var(--text-secondary)">int / long</text>
          <text x="660" y="122" fontSize="10" fill="var(--text-secondary)">无装箱</text>

          <text x="400" y="140" fontSize="10" fill="var(--success)">Double / Float</text>
          <text x="560" y="140" fontSize="10" fill="var(--text-secondary)">double / float</text>
          <text x="660" y="140" fontSize="10" fill="var(--text-secondary)">浮点</text>

          <text x="400" y="158" fontSize="10" fill="var(--success)">String</text>
          <text x="560" y="158" fontSize="10" fill="var(--text-secondary)">String</text>
          <text x="660" y="158" fontSize="10" fill="var(--text-secondary)">模板$var</text>

          <text x="400" y="176" fontSize="10" fill="var(--success)">Any</text>
          <text x="560" y="176" fontSize="10" fill="var(--text-secondary)">Object</text>
          <text x="660" y="176" fontSize="10" fill="var(--text-secondary)">根类型</text>

          <text x="400" y="194" fontSize="10" fill="var(--success)">Unit</text>
          <text x="560" y="194" fontSize="10" fill="var(--text-secondary)">void</text>
          <text x="660" y="194" fontSize="10" fill="var(--text-secondary)">单例类型</text>

          {/* 左下：控制流 */}
          <rect x="30" y="230" width="330" height="270" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="254" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">控制流</text>

          <rect x="50" y="270" width="290" height="44" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="288" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">when表达式（替代switch）</text>
          <text x="195" y="304" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分支可是值/范围/类型，有返回值</text>

          <rect x="50" y="322" width="290" height="44" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">if表达式（有返回值）</text>
          <text x="195" y="356" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">val max = if (a &gt; b) a else b</text>

          <rect x="50" y="374" width="290" height="44" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="392" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">区间与迭代</text>
          <text x="195" y="408" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">for (i in 1..10) / for (i in 1 until 10)</text>

          <rect x="50" y="426" width="290" height="44" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="444" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">while / do-while</text>
          <text x="195" y="460" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">与Java语法一致，支持break/continue</text>

          {/* 右下：字符串模板 */}
          <rect x="380" y="230" width="330" height="270" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="254" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">字符串模板与集合</text>

          <rect x="400" y="270" width="290" height="60" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">字符串模板</text>
          <text x="545" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">$变量名 / ${表达式}</text>
          <text x="545" y="322" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">"Hello, $name! Length is ${name.length}"</text>

          <rect x="400" y="340" width="290" height="60" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">三引号字符串</text>
          <text x="545" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">"""多行字符串"""</text>
          <text x="545" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">trimIndent()去缩进</text>

          <rect x="400" y="410" width="290" height="70" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">集合创建</text>
          <text x="545" y="448" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">listOf / setOf / mapOf（只读）</text>
          <text x="545" y="462" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">mutableListOf / mutableSetOf（可变）</text>
          <text x="545" y="476" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">val list = listOf(1, 2, 3)</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin基础——val/var变量声明、基本类型与类型推断、when/if表达式控制流、字符串模板与集合创建
      </figcaption>
    </figure>
  );
}
