/**
 * <YdkPrototypesDiagram>：原型机制深度图解（[[Prototype]]、原型链终结）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function YdkPrototypesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="原型机制深度图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrPr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            原型机制：[[Prototype]] 链与终结于 null
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            每个对象有内部 [[Prototype]]，沿链向上查找属性，直到 null
          </text>

          {/* 顶部：原型链三段 */}
          <rect x="30" y="72" width="680" height="118" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">原型链查找路径</text>

          <rect x="50" y="104" width="190" height="76" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="145" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">实例 obj</text>
          <text x="145" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Object.create(Foo.prototype)</text>
          <text x="145" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自有属性 + [[Prototype]]</text>
          <text x="145" y="174" textAnchor="middle" fontSize="10" fill="var(--accent)">__proto__ →</text>

          <rect x="275" y="104" width="190" height="76" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Foo.prototype</text>
          <text x="370" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">constructor → Foo</text>
          <text x="370" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">共享方法 greet()</text>
          <text x="370" y="174" textAnchor="middle" fontSize="10" fill="var(--accent)">__proto__ →</text>

          <rect x="500" y="104" width="190" height="76" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="595" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Object.prototype</text>
          <text x="595" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">toString / hasOwnProperty</text>
          <text x="595" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">__proto__ → null（终结）</text>

          <path d="M240 150 L 273 150" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrPr)" />
          <path d="M465 150 L 498 150" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrPr)" />

          {/* 中部：属性查找与遮蔽 */}
          <rect x="30" y="204" width="330" height="146" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="224" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">属性查找与遮蔽</text>
          <text x="50" y="246" fontSize="11" fill="var(--text-secondary)">读：沿原型链向上找，命中即返回</text>
          <text x="50" y="264" fontSize="11" fill="var(--text-secondary)">找不到返回 undefined（不报错）</text>
          <text x="50" y="284" fontSize="11" fill="var(--text-secondary)">写：直接写当前对象，遮蔽原型同名属性</text>
          <text x="50" y="304" fontSize="11" fill="var(--text-secondary)">"伪造"数组：链改 __proto__ 危险</text>
          <text x="50" y="324" fontSize="11" fill="var(--danger)">__proto__ 已 deprecated，用 Object.create</text>
          <text x="50" y="342" fontSize="11" fill="var(--text-secondary)">Object.getPrototypeOf 读取原型</text>

          {/* 右：创建与继承方式 */}
          <rect x="380" y="204" width="330" height="146" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="224" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">创建与继承方式演进</text>
          <text x="400" y="246" fontSize="11" fill="var(--text-primary)">原型链：Sub.prototype = new Super()</text>
          <text x="400" y="264" fontSize="10" fill="var(--text-secondary)">共享引用属性、无法传参</text>
          <text x="400" y="284" fontSize="11" fill="var(--text-primary)">寄生组合（最优）：</text>
          <text x="400" y="302" fontSize="10" fill="var(--text-secondary)">Object.create(Super.prototype) + 构造 call</text>
          <text x="400" y="322" fontSize="11" fill="var(--accent)">ES6 class extends 是其语法糖</text>
          <text x="400" y="342" fontSize="10" fill="var(--text-secondary)">class 仍是原型机制，非类的本质</text>

          {/* 底部总结 */}
          <rect x="30" y="362" width="680" height="58" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="384" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">原型 = 对象间委托，而非传统「类继承」</text>
          <text x="370" y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">行为委托：对象直接关联对象，沿 [[Prototype]] 复用方法，链顶 null 终结查找</text>

          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：JS 没有类，只有对象之间的原型链委托；class 是原型机制的语法糖
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        [[Prototype]] 链逐层向上查找属性，终结于 Object.prototype.__proto__ = null；行为委托优于类继承心智
      </figcaption>
    </figure>
  );
}
