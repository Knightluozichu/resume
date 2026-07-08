/**
 * <JdgClassesModulesDiagram>：类与模块图解（class语法、ESM、动态import）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JdgClassesModulesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类与模块图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrCm" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类与模块：class 语法糖与 ES 模块系统
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            class / extends / static / ESM 静态 import / 动态 import()
          </text>

          {/* 顶部：class 语法要素 */}
          <rect x="30" y="68" width="680" height="100" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">class 语法要素（原型链的语法糖）</text>

          <rect x="50" y="100" width="150" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="125" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">constructor</text>
          <text x="125" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">构造函数</text>
          <text x="125" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">初始化实例属性</text>

          <rect x="214" y="100" width="150" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="289" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">方法</text>
          <text x="289" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">挂在原型上</text>
          <text x="289" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">实例共享</text>

          <rect x="378" y="100" width="150" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="453" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">static</text>
          <text x="453" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">类自身属性</text>
          <text x="453" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">非实例方法</text>

          <rect x="542" y="100" width="150" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="617" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">extends / super</text>
          <text x="617" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">继承父类</text>
          <text x="617" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">调用父构造/方法</text>

          {/* 中部：ESM 模块系统 */}
          <rect x="30" y="184" width="330" height="150" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="204" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">ES 模块（静态 import）</text>
          <text x="50" y="226" fontSize="11" fill="var(--text-secondary)">import &lbrace; x &rbrace; from "./m.js"</text>
          <text x="50" y="244" fontSize="11" fill="var(--text-secondary)">import * as m from "./m.js"</text>
          <text x="50" y="262" fontSize="11" fill="var(--text-secondary)">import m from "./m.js"（默认导入）</text>
          <text x="50" y="280" fontSize="11" fill="var(--text-secondary)">export / export default 导出</text>
          <text x="50" y="304" fontSize="11" fill="var(--text-secondary)">静态分析：编译期确定依赖</text>
          <text x="50" y="322" fontSize="11" fill="var(--danger)">支持 tree-shaking，严格模式默认开</text>

          <rect x="380" y="184" width="330" height="150" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="204" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">动态 import() 与特性</text>
          <text x="400" y="226" fontSize="11" fill="var(--text-secondary)">const m = await import("./m.js")</text>
          <text x="400" y="244" fontSize="11" fill="var(--text-secondary)">运行时加载，返回 Promise</text>
          <text x="400" y="262" fontSize="11" fill="var(--text-secondary)">按需加载 / 路由懒加载 / 代码分割</text>
          <text x="400" y="280" fontSize="11" fill="var(--text-secondary)">模块单例：同一模块只执行一次</text>
          <text x="400" y="298" fontSize="11" fill="var(--text-secondary)">导出是实时绑定（live binding）</text>
          <text x="400" y="322" fontSize="11" fill="var(--danger)">import 是提升的，会先于代码执行</text>

          {/* 底部：class 本质 */}
          <rect x="30" y="350" width="680" height="82" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="370" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">class 的本质与对比</text>
          <text x="50" y="392" fontSize="11" fill="var(--text-secondary)">class = 构造函数 + 原型方法的语法糖；class 声明不提升（TDZ），内部默认严格模式</text>
          <text x="50" y="410" fontSize="11" fill="var(--text-secondary)">ESM vs CommonJS：ESM 静态分析可 tree-shake / 异步加载 / 实时绑定；CommonJS 动态 require / 值拷贝 / 同步</text>
          <text x="50" y="424" fontSize="11" fill="var(--text-secondary)">私有字段 #x：真私有，不在原型上，实例自身独有</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        class 是原型链语法糖；ESM 静态 import 支持树摇，动态 import() 实现按需加载
      </figcaption>
    </figure>
  );
}
