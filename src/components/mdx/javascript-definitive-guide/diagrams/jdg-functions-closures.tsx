/**
 * <JdgFunctionsClosuresDiagram>：函数与闭包图解（箭头函数、call/apply/bind）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JdgFunctionsClosuresDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="函数与闭包图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrFc" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            函数与闭包：定义形式、this 绑定、闭包延续
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            四种定义 / 箭头函数无 this / call/apply/bind / 闭包记住作用域
          </text>

          {/* 顶部：四种函数定义 */}
          <rect x="30" y="68" width="680" height="90" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">四种函数定义形式</text>

          <rect x="50" y="100" width="150" height="48" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="125" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">函数声明</text>
          <text x="125" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">function f()&lbrace;&rbrace;</text>
          <text x="125" y="146" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">会提升</text>

          <rect x="214" y="100" width="150" height="48" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="289" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">函数表达式</text>
          <text x="289" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">const f = function()&lbrace;&rbrace;</text>
          <text x="289" y="146" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不提升变量名</text>

          <rect x="378" y="100" width="150" height="48" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="453" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">箭头函数</text>
          <text x="453" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">() =&gt; &lbrace;&rbrace;</text>
          <text x="453" y="146" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">无自身 this/arguments</text>

          <rect x="542" y="100" width="150" height="48" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="617" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">方法简写</text>
          <text x="617" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">&lbrace; f() &rbrace;</text>
          <text x="617" y="146" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">this 指向对象</text>

          {/* 中部：this 绑定四规则 + 箭头例外 */}
          <rect x="30" y="174" width="330" height="150" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="194" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">this 绑定四规则（普通函数）</text>
          <text x="50" y="216" fontSize="11" fill="var(--text-secondary)">1. 默认：独立调用，this → undefined（严格）</text>
          <text x="50" y="234" fontSize="11" fill="var(--text-secondary)">2. 隐式：obj.m()，this → obj</text>
          <text x="50" y="252" fontSize="11" fill="var(--text-secondary)">3. 显式：call/apply/bind 指定 this</text>
          <text x="50" y="270" fontSize="11" fill="var(--text-secondary)">4. new：构造调用，this → 新对象</text>
          <text x="50" y="294" fontSize="11" fill="var(--danger)">优先级：new &gt; bind &gt; apply/call &gt; 隐式 &gt; 默认</text>
          <text x="50" y="312" fontSize="11" fill="var(--text-secondary)">规则由调用点决定，与定义处无关</text>

          <rect x="380" y="174" width="330" height="150" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="194" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">箭头函数例外 + call/apply/bind</text>
          <text x="400" y="216" fontSize="11" fill="var(--text-secondary)">箭头函数无自身 this，继承外层词法 this</text>
          <text x="400" y="234" fontSize="11" fill="var(--text-secondary)">箭头函数 call/apply/bind 无法改其 this</text>
          <text x="400" y="252" fontSize="11" fill="var(--text-secondary)">fn.call(obj, a, b)：逐个传参</text>
          <text x="400" y="270" fontSize="11" fill="var(--text-secondary)">fn.apply(obj, [a, b])：数组传参</text>
          <text x="400" y="288" fontSize="11" fill="var(--text-secondary)">fn.bind(obj)：返回新函数，永久绑定</text>
          <text x="400" y="312" fontSize="11" fill="var(--danger)">回调丢 this 用 .bind(this) 或箭头函数修复</text>

          {/* 底部：闭包 */}
          <rect x="30" y="340" width="680" height="92" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="360" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">闭包：函数记住并延续其定义处的词法作用域</text>
          <text x="50" y="382" fontSize="11" fill="var(--text-secondary)">外层返回内层函数后，内层仍持有外层变量引用 → 外层变量不随外层调用结束而销毁</text>
          <text x="50" y="400" fontSize="11" fill="var(--text-secondary)">用途：私有状态封装、函数工厂、模块模式、柯里化、回调记住上下文</text>
          <text x="50" y="418" fontSize="11" fill="var(--text-secondary)">注意：闭包持有整个作用域，循环中 var 共享变量需用 let 或 IIFE 隔离</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数四种定义形式各有 this 行为；箭头函数继承词法 this；闭包延续作用域实现状态封装
      </figcaption>
    </figure>
  );
}
