/**
 * <YdkScopeClosuresDiagram>：作用域与闭包深度图解（词法作用域、欺骗词法）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function YdkScopeClosuresDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="作用域与闭包深度图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            作用域与闭包：词法作用域气泡与闭包保持
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            词法作用域在编写时确定；闭包让函数记住并继续访问其词法作用域
          </text>

          {/* 左：词法作用域气泡 */}
          <rect x="30" y="72" width="330" height="288" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">词法作用域（嵌套气泡）</text>

          <rect x="50" y="104" width="290" height="244" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="60" y="124" fontSize="11" fontWeight="600" fill="var(--success)">全局作用域：var a = 2</text>

          <rect x="64" y="138" width="262" height="196" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="74" y="158" fontSize="11" fontWeight="600" fill="var(--warning)">函数作用域 foo()</text>
          <text x="74" y="176" fontSize="10" fill="var(--text-secondary)">var b = 3（向外可查 a，向内不可见 bar 的 c）</text>

          <rect x="78" y="192" width="234" height="128" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="88" y="212" fontSize="11" fontWeight="600" fill="var(--accent)">内部函数 bar()</text>
          <text x="88" y="230" fontSize="10" fill="var(--text-secondary)">可访问：c（自身）、b（外层）、a（全局）</text>
          <text x="88" y="248" fontSize="10" fill="var(--text-secondary)">查找规则：由内向外逐层查找，命中即止</text>
          <text x="88" y="266" fontSize="10" fill="var(--text-secondary)">遮蔽：内层同名变量遮蔽外层</text>
          <text x="88" y="286" fontSize="10" fill="var(--danger)">欺骗词法：eval / with（严格模式禁用 with）</text>
          <text x="88" y="304" fontSize="10" fill="var(--danger)">eval 在运行期改写词法作用域，破坏优化</text>

          {/* 右：闭包保持 */}
          <rect x="380" y="72" width="330" height="288" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">闭包：函数带走其词法作用域</text>

          <rect x="400" y="108" width="290" height="66" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="545" y="128" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">function makeCounter() &lbrace;</text>
          <text x="420" y="146" fontSize="10" fill="var(--text-secondary)">var count = 0;</text>
          <text x="420" y="162" fontSize="10" fill="var(--text-secondary)">return function() &lbrace; return ++count; &rbrace;;</text>

          <text x="545" y="192" textAnchor="middle" fontSize="11" fill="var(--accent)">makeCounter() 返回后，count 本应销毁</text>

          <rect x="400" y="202" width="290" height="48" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">闭包让 count 继续存活</text>
          <text x="545" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回的函数持有对 count 的引用</text>

          <rect x="400" y="262" width="290" height="86" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="410" y="282" fontSize="11" fontWeight="600" fill="var(--text-primary)">经典应用</text>
          <text x="410" y="300" fontSize="10" fill="var(--text-secondary)">模块模式：IIFE + 返回公开 API，私有成员藏闭包</text>
          <text x="410" y="318" fontSize="10" fill="var(--text-secondary)">once：用闭包标志位保证函数只执行一次</text>
          <text x="410" y="336" fontSize="10" fill="var(--text-secondary)">循环 + 闭包：用 IIFE/let 捕获每轮 i</text>

          {/* 底部总结 */}
          <rect x="30" y="376" width="680" height="44" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="396" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">闭包 = 函数 + 它能访问的词法作用域</text>
          <text x="370" y="412" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">不是「函数返回另一个函数」，而是「函数记住并继续访问定义处的作用域」</text>

          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：作用域在编写时画好边界，闭包在运行时延续这条边界
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        词法作用域由代码结构在编写时确定；闭包让函数带走并维持对其词法作用域的引用
      </figcaption>
    </figure>
  );
}
