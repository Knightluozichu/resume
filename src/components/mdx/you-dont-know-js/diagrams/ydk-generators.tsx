/**
 * <YdkGeneratorsDiagram>：生成器与迭代器协议图解（yield、{value, done}）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function YdkGeneratorsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="生成器与迭代器协议图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrGn" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            生成器与迭代器协议：可暂停的函数
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            function* 用 yield 暂停并产出值；迭代器协议约定 next() 返回 &lbrace;value, done&rbrace;
          </text>

          {/* 左：生成器执行流程 */}
          <rect x="30" y="72" width="330" height="240" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">生成器：暂停 / 恢复执行</text>

          <rect x="50" y="104" width="290" height="80" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="124" fontSize="11" fontWeight="600" fill="var(--text-primary)">function* gen() &lbrace;</text>
          <text x="60" y="142" fontSize="10" fill="var(--text-secondary)">yield 1;  // 暂停点 A</text>
          <text x="60" y="160" fontSize="10" fill="var(--text-secondary)">yield 2;  // 暂停点 B</text>
          <text x="60" y="178" fontSize="10" fill="var(--text-secondary)">yield 3;  // 暂停点 C</text>

          <text x="195" y="204" textAnchor="middle" fontSize="11" fill="var(--accent)">每次 next() 推进到下一个 yield</text>

          <rect x="50" y="214" width="80" height="40" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="90" y="232" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">next()</text>
          <text x="90" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&lbrace;1,false&rbrace;</text>

          <rect x="145" y="214" width="80" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="185" y="232" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">next()</text>
          <text x="185" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&lbrace;2,false&rbrace;</text>

          <rect x="240" y="214" width="90" height="40" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="285" y="232" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">next()</text>
          <text x="285" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&lbrace;3,true&rbrace;</text>

          <path d="M130 234 L 143 234" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrGn)" />
          <path d="M225 234 L 238 234" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrGn)" />

          <text x="195" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">yield 可双向通信：next(v) 把 v 注入</text>
          <text x="195" y="298" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">return 触发 done:true，value 为返回值</text>

          {/* 右：迭代器协议与 for...of */}
          <rect x="380" y="72" width="330" height="240" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">迭代器协议与可迭代对象</text>

          <rect x="400" y="106" width="290" height="56" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="410" y="126" fontSize="11" fontWeight="600" fill="var(--text-primary)">迭代器协议</text>
          <text x="410" y="144" fontSize="10" fill="var(--text-secondary)">实现 next()，返回 &lbrace;value, done&rbrace;</text>
          <text x="410" y="158" fontSize="10" fill="var(--text-secondary)">生成器对象天然满足此协议</text>

          <rect x="400" y="174" width="290" height="56" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="410" y="194" fontSize="11" fontWeight="600" fill="var(--text-primary)">可迭代协议</text>
          <text x="410" y="212" fontSize="10" fill="var(--text-secondary)">实现 [Symbol.iterator]() 返回迭代器</text>
          <text x="410" y="226" fontSize="10" fill="var(--text-secondary)">数组/字符串/Map/Set/生成器都满足</text>

          <rect x="400" y="242" width="290" height="56" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="410" y="262" fontSize="11" fontWeight="600" fill="var(--accent)">for...of / 展开语法 / 解构</text>
          <text x="410" y="280" fontSize="10" fill="var(--text-secondary)">底层都消费 [Symbol.iterator]</text>
          <text x="410" y="294" fontSize="10" fill="var(--text-secondary)">惰性求值：用一次算一次，省内存</text>

          {/* 底部：生成器与异步 */}
          <rect x="30" y="326" width="680" height="94" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="346" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">生成器驱动的异步：同步式写法 + 暂停等待</text>
          <text x="50" y="368" fontSize="11" fill="var(--text-secondary)">用生成器 + 运行器可把异步回调写成「同步顺序」代码，是 async/await 的前身</text>
          <text x="50" y="388" fontSize="11" fill="var(--text-secondary)">yield 一个 Promise，运行器等其 resolve 后把结果 next() 回灌进生成器</text>
          <text x="50" y="408" fontSize="11" fill="var(--accent)">async/await 是其语法糖：await 即「yield Promise + 自动回灌」</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        生成器用 yield 暂停恢复，返回符合迭代器协议的 &lbrace;value, done&rbrace;；它是 async/await 的机制原型
      </figcaption>
    </figure>
  );
}
