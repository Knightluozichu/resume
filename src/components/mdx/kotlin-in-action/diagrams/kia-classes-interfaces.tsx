/**
 * <KiaClassesInterfacesDiagram>：Kotlin实战 第4章 类、对象与接口图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 560;

export function KiaClassesInterfacesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类、对象与接口——继承、接口、数据类、object图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类、对象与接口
          </text>

          {/* 左上：类声明与构造函数 */}
          <rect x="30" y="50" width="330" height="170" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">类声明与构造函数</text>

          <rect x="50" y="90" width="290" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">主构造函数 + init块</text>
          <text x="195" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">class Person(val name: String) {'{'} init {'{'} ... {'}'} {'}'}</text>

          <rect x="50" y="132" width="290" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="150" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">open继承（默认final）</text>
          <text x="195" y="164" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">open class Animal {'{'} open fun sound() {'}'}</text>

          <rect x="50" y="174" width="290" height="36" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="192" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">override重写</text>
          <text x="195" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">class Dog : Animal() {'{'} override fun sound() {'}'}</text>

          {/* 右上：接口与特殊类 */}
          <rect x="380" y="50" width="330" height="170" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">接口与特殊类</text>

          <rect x="400" y="90" width="290" height="30" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">interface Clickable {'{'} fun click() {'}'}</text>

          <rect x="400" y="126" width="290" height="30" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="144" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">data class（自动生成equals/copy）</text>

          <rect x="400" y="162" width="290" height="30" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="180" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">sealed class（受限继承层级）</text>

          <rect x="400" y="198" width="290" height="20" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="212" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">object（单例）/ companion object（伴生）</text>

          {/* 底部：类层次关系图 */}
          <rect x="30" y="240" width="680" height="300" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="264" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">Kotlin类体系全景</text>

          {/* 第一层：接口 */}
          <rect x="250" y="280" width="240" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="298" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">interface Clickable</text>
          <text x="370" y="312" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">抽象方法 + 默认实现</text>

          {/* 第二层：open class */}
          <rect x="120" y="340" width="240" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="240" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">open class RichButton : Clickable</text>
          <text x="240" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">open fun animate() / disable()</text>
          <text x="240" y="386" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可被继承和重写</text>

          <rect x="400" y="340" width="240" height="50" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="520" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">data class User(val name, val age)</text>
          <text x="520" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">equals/hashCode/copy/toString</text>
          <text x="520" y="386" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">解构声明 componentN</text>

          {/* 连接线 */}
          <text x="310" y="328" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&uarr;</text>
          <text x="240" y="396" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三层：具体类 */}
          <rect x="60" y="410" width="200" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="160" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">class ThemedButton : RichButton</text>
          <text x="160" y="444" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">override fun animate()</text>

          <rect x="280" y="410" width="200" height="44" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="380" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">object Singleton</text>
          <text x="380" y="444" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">饿汉单例，线程安全</text>

          <rect x="500" y="410" width="200" height="44" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="600" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">companion object</text>
          <text x="600" y="444" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">工厂方法 / 静态常量</text>

          {/* 底部说明 */}
          <rect x="50" y="470" width="640" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="490" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Kotlin OOP核心要点</text>
          <text x="370" y="506" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">类默认final / 接口可有默认实现 / data class自动生成样板代码 / object单例替代Java双检锁</text>
          <text x="370" y="520" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">sealed class限制继承层级 / by委托替代继承 / companion object替代static</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类、对象与接口——主构造函数、open/override继承、接口默认实现、data class、object单例、sealed class、companion object
      </figcaption>
    </figure>
  );
}
