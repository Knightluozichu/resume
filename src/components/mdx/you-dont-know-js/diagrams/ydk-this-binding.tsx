/**
 * <YdkThisBindingDiagram>：this 绑定四规则图解（默认/隐式/显式/new）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function YdkThisBindingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="this 绑定四规则图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrTh" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            this 绑定四规则：调用方式决定 this 指向
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            this 在函数调用时绑定，不是定义时；按四规则优先级判断
          </text>

          {/* 顶部：调用点 → 判断 */}
          <rect x="30" y="72" width="680" height="48" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">判断起点：找到函数的「调用点」（call-site）</text>
          <text x="370" y="110" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">优先级从高到低：new &gt; 显式 &gt; 隐式 &gt; 默认</text>

          {/* 四规则卡片 */}
          <rect x="30" y="136" width="330" height="92" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="48" y="156" fontSize="12" fontWeight="600" fill="var(--danger)">① 默认绑定（最低优先级）</text>
          <text x="48" y="174" fontSize="11" fill="var(--text-secondary)">独立函数调用 foo()</text>
          <text x="48" y="192" fontSize="11" fill="var(--text-secondary)">非严格模式 this → 全局对象</text>
          <text x="48" y="210" fontSize="11" fill="var(--text-secondary)">严格模式 this → undefined</text>
          <text x="48" y="224" fontSize="10" fill="var(--text-tertiary)">箭头函数无此规则（继承外层 this）</text>

          <rect x="380" y="136" width="330" height="92" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="398" y="156" fontSize="12" fontWeight="600" fill="var(--warning)">② 隐式绑定</text>
          <text x="398" y="174" fontSize="11" fill="var(--text-secondary)">对象方法调用 obj.foo()</text>
          <text x="398" y="192" fontSize="11" fill="var(--text-secondary)">this → 调用处的 obj</text>
          <text x="398" y="210" fontSize="11" fill="var(--text-secondary)">引用赋值或回调会「丢失」this</text>
          <text x="398" y="224" fontSize="10" fill="var(--text-tertiary)">var f = obj.foo; f() 落回默认绑定</text>

          <rect x="30" y="240" width="330" height="92" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="48" y="260" fontSize="12" fontWeight="600" fill="var(--accent)">③ 显式绑定</text>
          <text x="48" y="278" fontSize="11" fill="var(--text-secondary)">foo.call(obj)/apply(obj,[args])</text>
          <text x="48" y="296" fontSize="11" fill="var(--text-secondary)">foo.bind(obj) 返回硬绑定新函数</text>
          <text x="48" y="314" fontSize="11" fill="var(--text-secondary)">this → 指定的 obj</text>
          <text x="48" y="328" fontSize="10" fill="var(--text-tertiary)">bind 后 this 不可再改（API 稳定 this 常用）</text>

          <rect x="380" y="240" width="330" height="92" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="398" y="260" fontSize="12" fontWeight="600" fill="var(--success)">④ new 绑定（最高优先级）</text>
          <text x="398" y="278" fontSize="11" fill="var(--text-secondary)">new Foo() 构造调用</text>
          <text x="398" y="296" fontSize="11" fill="var(--text-secondary)">新建对象，this → 该新对象</text>
          <text x="398" y="314" fontSize="11" fill="var(--text-secondary)">若函数返回对象则用返回值</text>
          <text x="398" y="328" fontSize="10" fill="var(--text-tertiary)">new 与 bind 同时存在，new 仍胜出</text>

          <path d="M360 286 L 378 286" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrTh)" />

          {/* 底部：箭头函数例外 */}
          <rect x="30" y="346" width="680" height="74" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="366" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">例外：箭头函数（=&gt;）不适用四规则</text>
          <text x="50" y="388" fontSize="11" fill="var(--text-secondary)">箭头函数没有自己的 this，继承定义处外层词法作用域的 this，call/apply/bind 无法改</text>
          <text x="50" y="408" fontSize="11" fill="var(--text-secondary)">适合回调里保留外层 this；不适合需要动态 this 的对象方法或原型方法</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        this 由调用点决定，按 new/显式/隐式/默认四级优先级判断；箭头函数继承词法 this 是例外
      </figcaption>
    </figure>
  );
}
