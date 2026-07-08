/**
 * <JpgObjectsOopDiagram>：对象与面向对象图解（属性特征 + 创建对象方式）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JpgObjectsOopDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="对象与面向对象：属性特征与创建对象方式图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            属性描述符与对象创建方式
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            每个属性有 4 个特征：writable / enumerable / configurable / value
          </text>

          {/* 上半：属性描述符 */}
          <rect x="40" y="64" width="660" height="150" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">数据属性描述符（Object.defineProperty）</text>

          <rect x="60" y="98" width="150" height="100" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="135" y="118" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">[[Value]]</text>
          <text x="135" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">属性的值</text>
          <text x="135" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">默认 undefined</text>
          <text x="135" y="184" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">读取/写入点</text>

          <rect x="225" y="98" width="150" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="300" y="118" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">[[Writable]]</text>
          <text x="300" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能否改写值</text>
          <text x="300" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">默认 true</text>
          <text x="300" y="184" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">false 时只读</text>

          <rect x="390" y="98" width="150" height="100" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="465" y="118" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">[[Enumerable]]</text>
          <text x="465" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能否 for-in</text>
          <text x="465" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">默认 true</text>
          <text x="465" y="184" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">false 时不可枚举</text>

          <rect x="555" y="98" width="125" height="100" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="617" y="118" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">[[Configurable]]</text>
          <text x="617" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能否删除/改特征</text>
          <text x="617" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">默认 true</text>
          <text x="617" y="184" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">false 后不可逆</text>

          {/* 下半：创建对象方式 */}
          <rect x="40" y="228" width="660" height="200" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="248" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">创建对象的四种演进方式</text>

          <rect x="60" y="262" width="150" height="80" rx="8" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="135" y="282" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">① 字面量</text>
          <text x="135" y="300" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">let o = &lbrace; a: 1 &rbrace;</text>
          <text x="135" y="320" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">简洁但无法复用</text>

          <rect x="225" y="262" width="150" height="80" rx="8" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="300" y="282" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">② 工厂模式</text>
          <text x="300" y="300" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">函数 return 新对象</text>
          <text x="300" y="320" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">无类型识别</text>

          <rect x="390" y="262" width="150" height="80" rx="8" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="465" y="282" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">③ 构造函数</text>
          <text x="465" y="300" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">new + this 赋值</text>
          <text x="465" y="320" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">方法不能复用</text>

          <rect x="555" y="262" width="125" height="80" rx="8" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="617" y="282" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">④ 原型模式</text>
          <text x="617" y="300" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">方法挂 prototype</text>
          <text x="617" y="320" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">所有实例共享</text>

          <text x="370" y="366" textAnchor="middle" fontSize="10" fill="var(--text-primary)">实际工程：构造函数 + 原型 组合（属性进构造函数，方法进原型）</text>
          <text x="370" y="384" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">new 做四件事：建空对象 → 绑原型 → 绑 this 执行 → 返回对象</text>
          <text x="370" y="402" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">class 是构造函数+原型的语法糖，本质相同</text>

          <text x="135" y="360" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="300" y="360" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="465" y="360" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <text x={VIEW_W / 2} y="430" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            访问器属性用 get/set 替代 [[Value]]/[[Writable]]，常用于数据绑定与校验
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        属性描述符控制属性的可写/可枚举/可配置；构造函数与原型组合是创建对象的标准范式
      </figcaption>
    </figure>
  );
}
