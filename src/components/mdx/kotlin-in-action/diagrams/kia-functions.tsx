/**
 * <KiaFunctionsDiagram>：Kotlin实战 第3章 函数定义与调用图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KiaFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="函数定义与调用——默认参数、命名参数、扩展函数图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            函数定义与调用
          </text>

          {/* 左上：函数声明方式 */}
          <rect x="30" y="50" width="330" height="200" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">函数声明与简化</text>

          <rect x="50" y="90" width="290" height="40" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">块体函数（标准写法）</text>
          <text x="195" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fun add(a: Int, b: Int): Int {'{'} return a+b {'}'}</text>

          <rect x="50" y="138" width="290" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="156" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">表达式体函数（单行简写）</text>
          <text x="195" y="170" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fun double(x: Int) = x * 2</text>

          <rect x="50" y="186" width="290" height="50" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">默认参数（替代重载）</text>
          <text x="195" y="220" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fun greet(name: String = "World")</text>
          <text x="195" y="232" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">一个函数替代Java多个重载</text>

          {/* 右上：命名参数与扩展函数 */}
          <rect x="380" y="50" width="330" height="200" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">命名参数与扩展函数</text>

          <rect x="400" y="90" width="290" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">命名参数</text>
          <text x="545" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">greet(greeting = "Hi", name = "Kotlin")</text>
          <text x="545" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">参数顺序无关，可读性更好</text>

          <rect x="400" y="148" width="290" height="44" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="166" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">扩展函数</text>
          <text x="545" y="182" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fun String.lastChar() = this[length-1]</text>

          <rect x="400" y="200" width="290" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="218" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">扩展属性</text>
          <text x="545" y="232" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">val String.lastChar get() = this[lastIndex]</text>

          {/* 底部：扩展函数原理 */}
          <rect x="30" y="270" width="680" height="230" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">扩展函数原理与顶层函数</text>

          <rect x="50" y="310" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="150" y="332" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">扩展函数声明</text>
          <text x="150" y="350" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fun String.lastChar(): Char</text>
          <text x="150" y="365" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">= this[length - 1]</text>
          <text x="150" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">this = 接收者对象</text>

          <text x="265" y="350" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="285" y="310" width="200" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="385" y="332" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">编译为静态方法</text>
          <text x="385" y="350" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">LastCharKt.lastChar("abc")</text>
          <text x="385" y="365" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">接收者作为第一个参数</text>
          <text x="385" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不修改原始类</text>

          <text x="500" y="350" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="520" y="310" width="170" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="605" y="332" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">调用</text>
          <text x="605" y="350" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">"abc".lastChar()</text>
          <text x="605" y="365" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">看起来像成员方法</text>
          <text x="605" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">实为静态调用</text>

          <rect x="50" y="405" width="640" height="80" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="425" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">顶层函数与顶层属性</text>
          <text x="370" y="445" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Kotlin允许在类外定义函数和属性——编译为对应文件名的Kt类的静态方法</text>
          <text x="370" y="462" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">如 join.kt 中的 fun joinToString() 编译为 JoinKt.joinToString()</text>
          <text x="370" y="478" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">消除Java中「工具类满地」的反模式，直接在包级别写函数</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数定义与调用——块体/表达式体函数、默认参数替代重载、命名参数提升可读性、扩展函数原理与顶层函数
      </figcaption>
    </figure>
  );
}
