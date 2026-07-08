/**
 * <JpgScopeClosureDiagram>：作用域链与闭包结构图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JpgScopeClosureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="作用域链与闭包结构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            词法作用域链与闭包
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            函数定义时决定作用域链；闭包 = 函数 + 捕获的词法环境
          </text>

          {/* 上半：作用域链嵌套 */}
          <rect x="60" y="64" width="620" height="180" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">作用域链（由内向外查找）</text>

          {/* 全局作用域 */}
          <rect x="80" y="96" width="580" height="134" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="114" fontSize="11" fontWeight="600" fill="var(--success)">全局作用域</text>
          <text x="640" y="114" textAnchor="end" fontSize="10" fill="var(--text-secondary)">var globalVar = &quot;G&quot;</text>

          {/* 函数作用域 */}
          <rect x="110" y="124" width="500" height="94" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="130" y="142" fontSize="11" fontWeight="600" fill="var(--warning)">外层函数作用域 outer()</text>
          <text x="590" y="142" textAnchor="end" fontSize="10" fill="var(--text-secondary)">let outerVar = &quot;O&quot;</text>

          {/* 内层函数作用域 */}
          <rect x="140" y="152" width="440" height="56" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="160" y="170" fontSize="11" fontWeight="600" fill="var(--danger)">内层函数作用域 inner()</text>
          <text x="560" y="170" textAnchor="end" fontSize="10" fill="var(--text-secondary)">let innerVar = &quot;I&quot;</text>
          <text x="160" y="192" fontSize="10" fill="var(--text-tertiary)">访问 innerVar → outerVar → globalVar 逐层向外</text>

          {/* 查找箭头 */}
          <path d="M360 200 L 360 210" stroke="var(--text-tertiary)" strokeWidth="1.2" fill="none" markerEnd="url(#arrS)" />
          <defs>
            <marker id="arrS" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 下半：闭包捕获 */}
          <rect x="60" y="260" width="620" height="170" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="278" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">闭包：函数带走它定义时的词法环境</text>

          <rect x="80" y="292" width="280" height="120" rx="8" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="220" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">function makeCounter() &lbrace;</text>
          <text x="96" y="328" fontSize="10" fill="var(--text-secondary)">let count = 0;</text>
          <text x="96" y="346" fontSize="10" fill="var(--text-secondary)">return function() &lbrace;</text>
          <text x="116" y="364" fontSize="10" fill="var(--text-secondary)">return ++count;</text>
          <text x="96" y="382" fontSize="10" fill="var(--text-secondary)">&rbrace;</text>
          <text x="220" y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">&rbrace;</text>

          <rect x="380" y="292" width="280" height="120" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="520" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">闭包环境（不被回收）</text>
          <text x="520" y="334" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">count 变量持续存活</text>
          <text x="520" y="354" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">即使 makeCounter 已返回</text>
          <text x="520" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每次调用 counter() 共享同一 count</text>
          <text x="520" y="398" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">= 私有状态的封装手段</text>

          <path d="M360 352 L 380 352" stroke="var(--danger)" strokeWidth="1.4" fill="none" markerEnd="url(#arrS)" />

          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            应用：模块模式（IIFE + 闭包）、柯里化、回调记忆——但也易致内存泄漏，需显式释放
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        词法作用域由定义位置决定；闭包让函数携带定义环境的变量，实现状态封装
      </figcaption>
    </figure>
  );
}
