/**
 * <JdgArraysObjectsDiagram>：数组与对象图解（数组方法、对象展开、解构）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JdgArraysObjectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数组与对象图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrAo" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            数组与对象：方法分类、展开、解构
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            纯函数 vs 副作用 / 浅拷贝展开 / 解构赋值模式
          </text>

          {/* 顶部：数组方法分类 */}
          <rect x="30" y="68" width="680" height="150" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">数组方法分类（是否修改原数组）</text>

          <rect x="50" y="100" width="320" height="104" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="210" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">纯函数（返回新数组，不改原数组）</text>
          <text x="64" y="140" fontSize="10" fill="var(--text-secondary)">map / filter / reduce / flat / flatMap</text>
          <text x="64" y="156" fontSize="10" fill="var(--text-secondary)">slice / concat / find / findIndex</text>
          <text x="64" y="172" fontSize="10" fill="var(--text-secondary)">some / every / includes / indexOf</text>
          <text x="64" y="190" fontSize="10" fill="var(--text-secondary)">join / keys / values / entries</text>

          <rect x="390" y="100" width="300" height="104" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="540" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">副作用（修改原数组）</text>
          <text x="404" y="140" fontSize="10" fill="var(--text-secondary)">push / pop / shift / unshift</text>
          <text x="404" y="156" fontSize="10" fill="var(--text-secondary)">splice / sort / reverse</text>
          <text x="404" y="172" fontSize="10" fill="var(--text-secondary)">fill / copyWithin</text>
          <text x="404" y="190" fontSize="10" fill="var(--danger)">forEach 无返回值但可改原数组</text>

          {/* 中部：对象展开与浅拷贝 */}
          <rect x="30" y="234" width="330" height="120" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="254" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">对象展开与浅拷贝</text>
          <text x="50" y="276" fontSize="11" fill="var(--text-secondary)">&lbrace; ...a, b: 2 &rbrace; 后者覆盖前者</text>
          <text x="50" y="294" fontSize="11" fill="var(--text-secondary)">[...arr] 数组浅拷贝</text>
          <text x="50" y="312" fontSize="11" fill="var(--text-secondary)">浅拷贝只复制一层引用</text>
          <text x="50" y="332" fontSize="11" fill="var(--danger)">嵌套对象仍共享，深拷贝用 structuredClone</text>

          <rect x="380" y="234" width="330" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="254" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">解构赋值模式</text>
          <text x="400" y="276" fontSize="11" fill="var(--text-secondary)">const &lbrace; a, b: y &rbrace; = obj（重命名）</text>
          <text x="400" y="294" fontSize="11" fill="var(--text-secondary)">const [x, , z] = arr（跳过）</text>
          <text x="400" y="312" fontSize="11" fill="var(--text-secondary)">const &lbrace; a = 1 &rbrace; = obj（默认值）</text>
          <text x="400" y="332" fontSize="11" fill="var(--text-secondary)">嵌套解构 + 函数参数解构</text>

          {/* 底部：reduce 与展开要点 */}
          <rect x="30" y="370" width="680" height="62" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="390" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">工程要点</text>
          <text x="50" y="412" fontSize="11" fill="var(--text-secondary)">reduce 万能归约：arr.reduce((acc, x) =&gt; acc + x, 0) 必须给初始值避免空数组报错</text>
          <text x="50" y="426" fontSize="11" fill="var(--text-secondary)">展开运算符 ... 是浅拷贝；for...of 遍历值，for...in 遍历键（含原型链，慎用）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数组方法分纯函数与副作用两类；展开是浅拷贝；解构实现声明式提取，reduce 是通用归约
      </figcaption>
    </figure>
  );
}
