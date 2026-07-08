/**
 * <JpgPrototypeChainDiagram>：原型与原型链图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JpgPrototypeChainDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="原型与原型链图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            原型链：实例 → 构造函数.prototype → Object.prototype → null
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            每个对象有 __proto__ 指向其构造函数的 prototype，逐层向上查找
          </text>

          <defs>
            <marker id="arrP" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 实例层 */}
          <rect x="50" y="70" width="180" height="90" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">实例 person</text>
          <text x="140" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">new Person()</text>
          <text x="140" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">name: &quot;Nicholas&quot;</text>
          <text x="140" y="144" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">__proto__ →</text>

          {/* 构造函数 */}
          <rect x="280" y="70" width="180" height="90" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Person.prototype</text>
          <text x="370" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">sayName() 方法</text>
          <text x="370" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">constructor → Person</text>
          <text x="370" y="144" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">__proto__ →</text>

          {/* Object.prototype */}
          <rect x="510" y="70" width="180" height="90" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Object.prototype</text>
          <text x="600" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">toString()</text>
          <text x="600" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">hasOwnProperty()</text>
          <text x="600" y="144" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">__proto__ → null</text>

          {/* 箭头连接 */}
          <path d="M230 130 L 275 130" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrP)" />
          <path d="M460 130 L 505 130" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrP)" />

          {/* null 终点 */}
          <rect x="600" y="180" width="100" height="36" rx="8" fill="var(--elevated)" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="650" y="203" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">null</text>
          <path d="M600 165 L 600 178" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrP)" />

          {/* 查找过程 */}
          <rect x="40" y="240" width="660" height="100" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="260" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">属性查找过程（沿原型链向上）</text>
          <rect x="60" y="272" width="200" height="50" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="160" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">1. 查实例自身</text>
          <text x="160" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">person.name ✓ 命中</text>
          <rect x="280" y="272" width="200" height="50" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="380" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">2. 查 Person.prototype</text>
          <text x="380" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">person.sayName() ✓ 命中</text>
          <rect x="500" y="272" width="180" height="50" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="590" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">3. 查 Object.prototype</text>
          <text x="590" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">person.toString() ✓ 命中</text>
          <text x="260" y="297" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="480" y="297" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 继承方式 */}
          <rect x="40" y="354" width="660" height="84" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="374" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">原型链继承 vs 寄生组合继承</text>
          <text x="60" y="394" fontSize="10" fill="var(--text-secondary)">原型链继承：SubType.prototype = new SuperType() —— 简单但共享引用属性、无法传参</text>
          <text x="60" y="412" fontSize="10" fill="var(--text-secondary)">组合继承：构造函数 call + 原型链 —— 调用两次父构造函数，有冗余</text>
          <text x="60" y="430" fontSize="10" fill="var(--accent)">寄生组合继承（最优）：Object.create 复制原型 + 构造函数 call —— 只调一次，是 ES6 class extends 的底层</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        原型链通过 __proto__ 逐层向上查找属性；寄生组合继承是原型继承的最佳实践
      </figcaption>
    </figure>
  );
}
