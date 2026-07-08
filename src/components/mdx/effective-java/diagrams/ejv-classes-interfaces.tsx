/**
 * <EjvClassesInterfacesDiagram>：类与接口设计图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function EjvClassesInterfacesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类与接口设计图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类与接口设计——组合优于继承、接口优于抽象类
          </text>

          {/* 左：继承的问题 */}
          <rect x="30" y="50" width="330" height="210" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">继承 (extends) 的危险</text>
          <text x="45" y="96" fontSize="11" fill="var(--text-secondary)">问题 1: 破坏封装性</text>
          <text x="45" y="114" fontSize="11" fill="var(--text-secondary)"> 子类依赖父类实现细节</text>
          <text x="45" y="132" fontSize="11" fill="var(--text-secondary)"> 父类升级可能破坏子类</text>
          <text x="45" y="158" fontSize="11" fill="var(--text-secondary)">问题 2: 不适合跨包继承</text>
          <text x="45" y="176" fontSize="11" fill="var(--text-secondary)">问题 3: 永久耦合</text>
          <text x="45" y="202" fontSize="11" fill="var(--danger)">经典案例:</text>
          <text x="45" y="220" fontSize="11" fill="var(--danger)"> HashSet 继承添加计数器</text>
          <text x="45" y="238" fontSize="11" fill="var(--danger)"> HashSet.addAll() 调用 add()</text>
          <text x="45" y="256" fontSize="11" fill="var(--danger)"> =&gt; 计数翻倍</text>

          {/* 右：组合的优势 */}
          <rect x="380" y="50" width="330" height="210" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">组合 (composition)</text>
          <text x="395" y="96" fontSize="11" fill="var(--text-secondary)">核心: 在类中持有另一个类的实例</text>
          <text x="395" y="114" fontSize="11" fill="var(--text-secondary)">优势 1: 不依赖实现细节</text>
          <text x="395" y="132" fontSize="11" fill="var(--text-secondary)">优势 2: 只暴露想暴露的方法</text>
          <text x="395" y="150" fontSize="11" fill="var(--text-secondary)">优势 3: 运行时灵活替换</text>
          <text x="395" y="176" fontSize="11" fill="var(--success)">示例:</text>
          <text x="395" y="194" fontSize="11" fill="var(--success)"> class InstrumentedSet&lt;E&gt;</text>
          <text x="395" y="212" fontSize="11" fill="var(--success)">   implements Set&lt;E&gt; &rbrace;</text>
          <text x="395" y="230" fontSize="11" fill="var(--success)">   private final Set&lt;E&gt; s;</text>
          <text x="395" y="248" fontSize="11" fill="var(--success)">   // 转发 + 计数 &rbrace;</text>

          {/* 下方：接口 vs 抽象类 */}
          <rect x="30" y="280" width="330" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="195" y="304" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">接口优于抽象类</text>
          <text x="45" y="326" fontSize="11" fill="var(--text-secondary)">接口: 可多实现，灵活</text>
          <text x="45" y="344" fontSize="11" fill="var(--text-secondary)">抽象类: 单继承，限制大</text>
          <text x="45" y="370" fontSize="11" fill="var(--text-secondary)">骨架实现 (skeletal impl):</text>
          <text x="45" y="388" fontSize="11" fill="var(--text-secondary)"> 接口定义类型 + 抽象类</text>
          <text x="45" y="406" fontSize="11" fill="var(--text-secondary)"> 提供默认实现</text>
          <text x="45" y="424" fontSize="11" fill="var(--text-secondary)"> 例: AbstractList + List</text>
          <text x="45" y="450" fontSize="11" fill="var(--text-secondary)">Java 8: default 方法</text>
          <text x="45" y="468" fontSize="11" fill="var(--text-secondary)"> 接口可直接提供实现</text>

          {/* 右下：最小可访问性 */}
          <rect x="380" y="280" width="330" height="200" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="304" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">最小可访问性原则</text>
          <text x="395" y="326" fontSize="11" fill="var(--text-secondary)">private &gt; package-private</text>
          <text x="395" y="344" fontSize="11" fill="var(--text-secondary)">&gt; protected &gt; public</text>
          <text x="395" y="370" fontSize="11" fill="var(--text-secondary)">每个类/成员尽量最小化</text>
          <text x="395" y="388" fontSize="11" fill="var(--text-secondary)">顶层类: package-private 优先</text>
          <text x="395" y="406" fontSize="11" fill="var(--text-secondary)">public 类 = API 承诺</text>
          <text x="395" y="432" fontSize="11" fill="var(--danger)">不可变类设计:</text>
          <text x="395" y="450" fontSize="11" fill="var(--danger)"> 1. 字段 final</text>
          <text x="395" y="468" fontSize="11" fill="var(--danger)"> 2. 类 final 3. 无 setter</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类与接口设计——组合优于继承避免封装破坏，接口优于抽象类实现灵活多继承，最小可访问性降低耦合
      </figcaption>
    </figure>
  );
}
