/**
 * <HfdFactoryDiagram>：工厂模式三种形态对比（Head First 设计模式 · 工厂模式章）。
 *
 * 三列对比：简单工厂 / 工厂方法 / 抽象工厂。
 *   简单工厂：一个工厂类用 if-else 创建所有产品。
 *   工厂方法：每个产品对应一个工厂子类，由子类决定创建哪个对象。
 *   抽象工厂：工厂接口创建一族相关产品（原料族）。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function HfdFactoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="工厂模式三种形态对比。简单工厂：一个 PizzaFactory 类用 createPizza(type) 方法，内部 if-else 判断 type 创建 CheesePizza、PepperoniPizza、VeggiePizza。工厂方法：PizzaStore 抽象类定义 createPizza 抽象方法，NYPizzaStore 和 ChicagoPizzaStore 子类各自实现 createPizza 决定创建哪种披萨。抽象工厂：PizzaIngredientFactory 接口创建一族原料（Dough、Sauce、Cheese），NYPizzaIngredientFactory 和 ChicagoPizzaIngredientFactory 实现该接口创建不同风格的原料族。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            工厂模式 · 三种形态对比
          </text>
          <text x={VIEW_W / 2} y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从「一个工厂管所有」到「一族工厂管一族产品」，封装对象创建过程
          </text>

          {/* ===== 第一列：简单工厂 ===== */}
          <rect x="36" y="72" width="208" height="40" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">简单工厂</text>
          <text x="140" y="106" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">一个工厂管所有产品</text>

          <rect x="36" y="120" width="208" height="58" rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
          <text x="140" y="138" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">SimplePizzaFactory</text>
          <line x1="48" y1="144" x2="232" y2="144" stroke="var(--border)" strokeWidth="1" />
          <text x="48" y="160" fontSize="11" fill="var(--text-primary)">createPizza(type)</text>
          <text x="48" y="174" fontSize="11" fill="var(--text-secondary)">if type → new XxxPizza()</text>

          <rect x="36" y="190" width="208" height="26" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="140" y="208" textAnchor="middle" fontSize="11" fill="var(--text-primary)">CheesePizza / PepperoniPizza</text>

          {/* 箭头 */}
          <line x1="140" y1="178" x2="140" y2="190" stroke="var(--accent)" strokeWidth="1.2" />
          <polygon points="140,190 137,184 143,184" fill="var(--accent)" />

          {/* 优缺点 */}
          <text x="140" y="236" textAnchor="middle" fontSize="11" fill="var(--success)">优点：简单直接</text>
          <text x="140" y="252" textAnchor="middle" fontSize="11" fill="var(--danger)">缺点：加产品改工厂</text>

          {/* ===== 第二列：工厂方法 ===== */}
          <rect x="256" y="72" width="208" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">工厂方法</text>
          <text x="360" y="106" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">子类决定创建哪个对象</text>

          <rect x="256" y="120" width="208" height="58" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="360" y="138" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">«abstract» PizzaStore</text>
          <line x1="268" y1="144" x2="452" y2="144" stroke="var(--border)" strokeWidth="1" />
          <text x="268" y="160" fontSize="11" fill="var(--text-primary)">orderPizza() 模板</text>
          <text x="268" y="174" fontSize="11" fill="var(--text-secondary)">createPizza() 抽象</text>

          <rect x="256" y="190" width="98" height="26" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="305" y="208" textAnchor="middle" fontSize="11" fill="var(--text-primary)">NYPizzaStore</text>

          <rect x="366" y="190" width="98" height="26" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="415" y="208" textAnchor="middle" fontSize="11" fill="var(--text-primary)">ChicagoStore</text>

          {/* 继承箭头 */}
          <line x1="305" y1="178" x2="305" y2="190" stroke="var(--success)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="415" y1="178" x2="415" y2="190" stroke="var(--success)" strokeWidth="1.2" strokeDasharray="4 3" />

          {/* 优缺点 */}
          <text x="360" y="236" textAnchor="middle" fontSize="11" fill="var(--success)">优点：加产品加子类不改父</text>
          <text x="360" y="252" textAnchor="middle" fontSize="11" fill="var(--danger)">缺点：类数量膨胀</text>

          {/* ===== 第三列：抽象工厂 ===== */}
          <rect x="476" y="72" width="208" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="580" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">抽象工厂</text>
          <text x="580" y="106" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">创建一族相关产品</text>

          <rect x="476" y="120" width="208" height="58" rx="6" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="580" y="138" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">«interface» IngredientFactory</text>
          <line x1="488" y1="144" x2="672" y2="144" stroke="var(--border)" strokeWidth="1" />
          <text x="488" y="160" fontSize="11" fill="var(--text-primary)">createDough() / createSauce()</text>
          <text x="488" y="174" fontSize="11" fill="var(--text-primary)">createCheese() / ...</text>

          <rect x="476" y="190" width="98" height="26" rx="6" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1" />
          <text x="525" y="208" textAnchor="middle" fontSize="11" fill="var(--text-primary)">NY 原料族</text>

          <rect x="586" y="190" width="98" height="26" rx="6" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1" />
          <text x="635" y="208" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Chicago 原料族</text>

          {/* 继承箭头 */}
          <line x1="525" y1="178" x2="525" y2="190" stroke="var(--warning)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="635" y1="178" x2="635" y2="190" stroke="var(--warning)" strokeWidth="1.2" strokeDasharray="4 3" />

          {/* 优缺点 */}
          <text x="580" y="236" textAnchor="middle" fontSize="11" fill="var(--success)">优点：保证产品族一致性</text>
          <text x="580" y="252" textAnchor="middle" fontSize="11" fill="var(--danger)">缺点：加新产品改接口</text>

          {/* ===== 底部总结 ===== */}
          <rect x="36" y="288" width={VIEW_W - 72} height="104" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="310" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">选择指南：看你的变化点在哪</text>
          <text x="56" y="332" fontSize="11" fill="var(--text-primary)">简单工厂：产品种类少且稳定，只是想把 new 集中到一处。</text>
          <text x="56" y="350" fontSize="11" fill="var(--text-primary)">工厂方法：产品会持续增加，希望「加新产品不改已有代码」（开闭原则）。</text>
          <text x="56" y="368" fontSize="11" fill="var(--text-primary)">抽象工厂：需要创建一族风格一致的相关产品，切换工厂即切换整套风格。</text>
          <text x="56" y="386" fontSize="11" fill="var(--text-secondary)">共同点：都把「对象创建」从「对象使用」中解耦，客户端不直接 new。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种工厂逐步升级：简单工厂把 new 集中到一处，工厂方法让子类决定创建哪个对象，抽象工厂创建一族相关产品保证风格一致。选择依据是变化点的类型——产品种类增加还是产品族切换。
      </figcaption>
    </figure>
  );
}
