/**
 * <HfdDecoratorDiagram>：装饰器模式 UML 类图（Head First 设计模式 · 装饰器模式章）。
 *
 * 以咖啡店为例：
 *   Beverage（Component）← CondimentDecorator（抽象装饰器）← Mocha/Soy/Whip
 *   DarkRoast 被 Mocha 包裹再被 Whip 包裹，最终 cost() 层层委托累加。
 *   右侧展示装饰链的包裹过程。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function HfdDecoratorDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="装饰器模式 UML 类图。Beverage 是 Component 接口，声明 cost 和 getDescription。DarkRoast、Espresso、Decaf 是具体组件。CondimentDecorator 继承 Beverage 并持有一个 Beverage 引用（包裹被装饰对象）。Mocha、Soy、Whip 是具体装饰器。右侧展示装饰链：Whip 包裹 Mocha 包裹 DarkRoast，cost 逐层委托累加 = 0.99 + 0.20 + 0.10。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            装饰器模式 · 咖啡店示例
          </text>
          <text x={VIEW_W / 2} y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            装饰器继承 Component 同时持有 Component 引用，层层包裹动态叠加行为
          </text>

          {/* ===== 顶部中心：Beverage（Component） ===== */}
          <rect x="250" y="74" width="220" height="64" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="4 3" />
          <rect x="250" y="74" width="220" height="24" rx="8" fill="var(--accent)" fillOpacity="0.12" />
          <text x="360" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">«abstract» Beverage</text>
          <text x="360" y="118" textAnchor="middle" fontSize="11" fill="var(--text-primary)">+ cost(): double</text>
          <text x="360" y="132" textAnchor="middle" fontSize="11" fill="var(--text-primary)">+ getDescription(): String</text>

          {/* ===== 左侧：具体组件 ===== */}
          <rect x="40" y="80" width="170" height="26" rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
          <text x="125" y="98" textAnchor="middle" fontSize="11" fill="var(--text-primary)">DarkRoast</text>

          <rect x="40" y="112" width="170" height="26" rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
          <text x="125" y="130" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Espresso</text>

          <rect x="40" y="144" width="170" height="26" rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
          <text x="125" y="162" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Decaf</text>

          {/* 继承箭头：具体组件 → Beverage */}
          <line x1="210" y1="93" x2="250" y2="106" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="210" y1="125" x2="250" y2="112" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="210" y1="157" x2="250" y2="118" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="4 3" />

          {/* ===== 中间偏右：CondimentDecorator（抽象装饰器） ===== */}
          <rect x="510" y="74" width="180" height="78" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.4" />
          <rect x="510" y="74" width="180" height="24" rx="8" fill="var(--success)" fillOpacity="0.12" />
          <text x="600" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">«abstract» Condiment</text>
          <text x="520" y="116" fontSize="11" fill="var(--text-primary)">- beverage: Beverage</text>
          <line x1="520" y1="122" x2="680" y2="122" stroke="var(--border)" strokeWidth="1" />
          <text x="520" y="138" fontSize="11" fill="var(--text-primary)">+ cost() {`{`}</text>
          <text x="524" y="148" fontSize="11" fill="var(--text-secondary)">beverage.cost() + ...</text>

          {/* 继承箭头：CondimentDecorator → Beverage */}
          <line x1="510" y1="106" x2="470" y2="106" stroke="var(--success)" strokeWidth="1.2" />
          <polygon points="470,106 476,103 476,109" fill="var(--success)" />
          <text x="490" y="100" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">继承</text>

          {/* ===== 右侧：具体装饰器 ===== */}
          <rect x="510" y="170" width="180" height="26" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="188" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Mocha (+0.20)</text>

          <rect x="510" y="202" width="180" height="26" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="220" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Soy (+0.15)</text>

          <rect x="510" y="234" width="180" height="26" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="252" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Whip (+0.10)</text>

          {/* 继承箭头：具体装饰器 → CondimentDecorator */}
          <line x1="600" y1="152" x2="600" y2="170" stroke="var(--success)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="580" y1="152" x2="560" y2="202" stroke="var(--success)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="620" y1="152" x2="640" y2="234" stroke="var(--success)" strokeWidth="1.2" strokeDasharray="4 3" />

          {/* ===== 底部：装饰链 ===== */}
          <rect x="40" y="290" width={VIEW_W - 80} height="100" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">装饰链：Whip(Mocha(DarkRoast))</text>

          {/* 嵌套盒子 */}
          <rect x="100" y="324" width="100" height="50" rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="150" y="344" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">DarkRoast</text>
          <text x="150" y="362" textAnchor="middle" fontSize="11" fill="var(--text-primary)">cost = 0.99</text>

          <rect x="220" y="324" width="140" height="50" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.2" />
          <text x="290" y="344" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Mocha</text>
          <text x="290" y="362" textAnchor="middle" fontSize="11" fill="var(--text-primary)">0.99 + 0.20 = 1.19</text>

          <rect x="380" y="324" width="140" height="50" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.2" />
          <text x="450" y="344" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Whip</text>
          <text x="450" y="362" textAnchor="middle" fontSize="11" fill="var(--text-primary)">1.19 + 0.10 = 1.29</text>

          {/* 箭头：逐层委托 */}
          <line x1="200" y1="349" x2="220" y2="349" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <polygon points="220,349 214,346 214,352" fill="var(--text-secondary)" />
          <line x1="360" y1="349" x2="380" y2="349" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <polygon points="380,349 374,346 374,352" fill="var(--text-secondary)" />

          {/* 结果标注 */}
          <text x="560" y="344" fontSize="12" fontWeight="700" fill="var(--accent)">最终结果</text>
          <text x="560" y="362" fontSize="12" fontWeight="700" fill="var(--text-primary)">= $1.29</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        装饰器和具体组件都实现同一个 Beverage 接口，装饰器内部持有被装饰对象。调用 cost() 时层层委托：Whip 先问内层 Mocha 的价格，加上自己的 0.10，Mocha 再问 DarkRoast 的价格加上 0.20。装饰器可以在不修改原类的情况下动态叠加功能。
      </figcaption>
    </figure>
  );
}
