/**
 * <EjvCreatingObjectsDiagram>：创建与销毁对象图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function EjvCreatingObjectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="创建与销毁对象图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            创建与销毁对象——静态工厂 vs 构造器 vs Builder
          </text>

          {/* 左列：静态工厂 */}
          <rect x="30" y="50" width="215" height="380" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="137" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">静态工厂方法</text>
          <text x="137" y="96" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">优势</text>
          <text x="45" y="116" fontSize="10" fill="var(--text-secondary)">1. 有名称，可读性强</text>
          <text x="45" y="132" fontSize="10" fill="var(--text-secondary)">2. 不必每次创建新对象</text>
          <text x="45" y="148" fontSize="10" fill="var(--text-secondary)">3. 可返回子类型</text>
          <text x="45" y="164" fontSize="10" fill="var(--text-secondary)">4. 返回对象随输入变化</text>
          <text x="45" y="180" fontSize="10" fill="var(--text-secondary)">5. 返回类在编写时可不存在</text>
          <text x="45" y="206" fontSize="10" fill="var(--text-secondary)">示例:</text>
          <text x="45" y="222" fontSize="10" fill="var(--text-secondary)">Boolean.valueOf(b)</text>
          <text x="45" y="238" fontSize="10" fill="var(--text-secondary)">List.of(a, b, c)</text>
          <text x="45" y="254" fontSize="10" fill="var(--text-secondary)">Collections.emptyList()</text>
          <text x="45" y="280" fontSize="10" fill="var(--danger)">缺点: 无标记区分</text>
          <text x="45" y="296" fontSize="10" fill="var(--danger)">命名约定: from/of/valueOf</text>

          {/* 中列：构造器 */}
          <rect x="262" y="50" width="215" height="380" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="369" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">构造器</text>
          <text x="369" y="96" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适用场景</text>
          <text x="277" y="116" fontSize="10" fill="var(--text-secondary)">1. 参数少 (1-2个)</text>
          <text x="277" y="132" fontSize="10" fill="var(--text-secondary)">2. 公共类，子类需继承</text>
          <text x="277" y="148" fontSize="10" fill="var(--text-secondary)">3. 强制依赖注入</text>
          <text x="277" y="174" fontSize="10" fill="var(--text-secondary)">问题: 参数多时</text>
          <text x="277" y="190" fontSize="10" fill="var(--text-secondary)">new Pizza(size, cheese,</text>
          <text x="277" y="206" fontSize="10" fill="var(--text-secondary)">  pepperoni, mushroom,</text>
          <text x="277" y="222" fontSize="10" fill="var(--text-secondary)">  onion, sausage, ...)</text>
          <text x="277" y="248" fontSize="10" fill="var(--danger)"> telescoping 模式</text>
          <text x="277" y="264" fontSize="10" fill="var(--danger)"> 参数顺序易错</text>
          <text x="277" y="280" fontSize="10" fill="var(--danger)"> 类型相同无法区分</text>
          <text x="277" y="306" fontSize="10" fill="var(--text-secondary)">Javabeans 模式:</text>
          <text x="277" y="322" fontSize="10" fill="var(--text-secondary)">set + set + set...</text>
          <text x="277" y="338" fontSize="10" fill="var(--danger)"> 构造过程不原子</text>
          <text x="277" y="354" fontSize="10" fill="var(--danger)"> 无法保证不可变</text>

          {/* 右列：Builder */}
          <rect x="494" y="50" width="215" height="380" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="601" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">Builder 模式</text>
          <text x="601" y="96" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">最佳实践</text>
          <text x="509" y="116" fontSize="10" fill="var(--text-secondary)">1. 参数多 (4+)</text>
          <text x="509" y="132" fontSize="10" fill="var(--text-secondary)">2. 可选参数多</text>
          <text x="509" y="148" fontSize="10" fill="var(--text-secondary)">3. 保证不可变</text>
          <text x="509" y="164" fontSize="10" fill="var(--text-secondary)">4. 链式调用可读性强</text>
          <text x="509" y="190" fontSize="10" fill="var(--text-secondary)">示例:</text>
          <text x="509" y="206" fontSize="10" fill="var(--text-secondary)">Pizza p = new Pizza.Builder()</text>
          <text x="509" y="222" fontSize="10" fill="var(--text-secondary)">  .size(12)</text>
          <text x="509" y="238" fontSize="10" fill="var(--text-secondary)">  .cheese()</text>
          <text x="509" y="254" fontSize="10" fill="var(--text-secondary)">  .pepperoni()</text>
          <text x="509" y="270" fontSize="10" fill="var(--text-secondary)">  .build();</text>
          <text x="509" y="296" fontSize="10" fill="var(--success)">优势:</text>
          <text x="509" y="312" fontSize="10" fill="var(--success)"> 参数顺序灵活</text>
          <text x="509" y="328" fontSize="10" fill="var(--success)"> 构建一次即不可变</text>
          <text x="509" y="344" fontSize="10" fill="var(--success)"> 可自动填充默认值</text>
          <text x="509" y="370" fontSize="10" fill="var(--danger)">代价: 代码量稍多</text>
          <text x="509" y="386" fontSize="10" fill="var(--danger)"> 每次多创建Builder</text>
          <text x="509" y="402" fontSize="10" fill="var(--danger)"> 不适合性能关键路径</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        创建与销毁对象——静态工厂方法（优先）、构造器（参数少时）、Builder（参数多时）三种创建方式的对比
      </figcaption>
    </figure>
  );
}
