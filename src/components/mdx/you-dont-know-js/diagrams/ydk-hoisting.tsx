/**
 * <YdkHoistingDiagram>：提升机制详解图解（函数优先、变量提升、TDZ）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function YdkHoistingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="提升机制详解图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            提升机制：编译期把声明移到作用域顶部
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            只有声明被提升，赋值留在原地；函数声明整体提升且优先于变量
          </text>

          {/* 左：var 提升 */}
          <rect x="30" y="72" width="330" height="180" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">var 提升：声明提前，值为 undefined</text>

          <rect x="50" y="104" width="290" height="64" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="124" fontSize="11" fontWeight="600" fill="var(--text-primary)">你写的代码</text>
          <text x="60" y="142" fontSize="10" fill="var(--text-secondary)">console.log(a);  // undefined</text>
          <text x="60" y="160" fontSize="10" fill="var(--text-secondary)">var a = 2;</text>

          <rect x="50" y="178" width="290" height="64" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="60" y="198" fontSize="11" fontWeight="600" fill="var(--danger)">引擎看到的（编译后）</text>
          <text x="60" y="216" fontSize="10" fill="var(--text-secondary)">var a;  // 声明提升到顶部</text>
          <text x="60" y="234" fontSize="10" fill="var(--text-secondary)">console.log(a);  // undefined（赋值未提升）</text>

          {/* 右：函数优先 */}
          <rect x="380" y="72" width="330" height="180" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">函数优先：声明整体提升，盖过同名变量</text>

          <rect x="400" y="104" width="290" height="64" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="410" y="124" fontSize="11" fontWeight="600" fill="var(--text-primary)">foo();  // "function"</text>
          <text x="410" y="142" fontSize="10" fill="var(--text-secondary)">var foo;</text>
          <text x="410" y="160" fontSize="10" fill="var(--text-secondary)">function foo() &lbrace; ... &rbrace;</text>

          <rect x="400" y="178" width="290" height="64" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="410" y="198" fontSize="11" fontWeight="600" fill="var(--success)">提升后顺序</text>
          <text x="410" y="216" fontSize="10" fill="var(--text-secondary)">function foo() 先整体提升</text>
          <text x="410" y="234" fontSize="10" fill="var(--text-secondary)">var foo 被忽略（已存在同名声明）</text>

          {/* 下：let/const 的 TDZ */}
          <rect x="30" y="268" width="680" height="152" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">let / const 的暂时性死区（TDZ）</text>

          <rect x="50" y="300" width="320" height="104" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="64" y="320" fontSize="11" fontWeight="600" fill="var(--text-primary)">let 也提升，但不初始化</text>
          <text x="64" y="338" fontSize="10" fill="var(--text-secondary)">从作用域顶部到声明行 = TDZ</text>
          <text x="64" y="356" fontSize="10" fill="var(--text-secondary)">TDZ 内访问 b 抛 ReferenceError</text>
          <text x="64" y="374" fontSize="10" fill="var(--text-secondary)">console.log(b); let b = 1; // 报错</text>
          <text x="64" y="392" fontSize="10" fill="var(--text-secondary)">typeof 在 TDZ 内也会抛错</text>

          <rect x="390" y="300" width="300" height="104" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="404" y="320" fontSize="11" fontWeight="600" fill="var(--text-primary)">最佳实践</text>
          <text x="404" y="338" fontSize="10" fill="var(--text-secondary)">先声明再使用，避免依赖提升</text>
          <text x="404" y="356" fontSize="10" fill="var(--text-secondary)">函数声明放作用域顶部，函数表达式用 let</text>
          <text x="404" y="374" fontSize="10" fill="var(--text-secondary)">默认 let/const，需要重新赋值才用 var（基本不用）</text>
          <text x="404" y="392" fontSize="10" fill="var(--text-secondary)">函数表达式赋值前调用会得到 undefined</text>

          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：提升是编译期行为，var 静默 undefined，let/const 用 TDZ 强制先声明后使用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        声明在编译期提升到作用域顶部；函数声明整体提升且优先于 var，let/const 用 TDZ 替代静默 undefined
      </figcaption>
    </figure>
  );
}
