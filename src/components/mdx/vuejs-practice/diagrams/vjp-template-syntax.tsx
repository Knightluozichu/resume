/**
 * <VjpTemplateSyntaxDiagram>：Vue 模板编译流程图解。
 * 模板字符串 → AST → 变换 → 渲染函数 → VNode → 真实 DOM。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function VjpTemplateSyntaxDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Vue 模板编译流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Vue 模板编译流程：从字符串到真实 DOM
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            编译期：模板 → AST → 渲染函数；运行期：渲染函数 → VNode → patch
          </text>

          {/* 编译期框 */}
          <rect x="20" y="64" width="700" height="150" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="40" y="84" fontSize="12" fontWeight="600" fill="var(--success)">编译期（构建时 / 首次挂载）</text>

          <rect x="40" y="96" width="150" height="100" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">模板字符串</text>
          <text x="115" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&lt;div&gt;</text>
          <text x="115" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&lbrace;&lbrace; msg &rbrace;&rbrace;</text>
          <text x="115" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">v-if="show"</text>
          <text x="115" y="188" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&lt;/div&gt;</text>

          <text x="200" y="150" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="220" y="96" width="150" height="100" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="295" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">AST 抽象语法树</text>
          <text x="295" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Root</text>
          <text x="295" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">└ Element(div)</text>
          <text x="295" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">  ├ dir(v-if)</text>
          <text x="295" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">  └ Interpolation(msg)</text>

          <text x="380" y="150" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="400" y="96" width="150" height="100" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="475" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">变换 transform</text>
          <text x="475" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">静态提升 hoistStatic</text>
          <text x="475" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">v-if → 三元表达式</text>
          <text x="475" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">v-for → map</text>
          <text x="475" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PatchFlag 标记</text>

          <text x="560" y="150" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="580" y="96" width="130" height="100" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="645" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">渲染函数</text>
          <text x="645" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">render(ctx) &lbrace;</text>
          <text x="645" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)"> return show</text>
          <text x="645" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">  ? h('div', msg)</text>
          <text x="645" y="188" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">  : null &rbrace;</text>

          {/* 运行期框 */}
          <rect x="20" y="230" width="700" height="150" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="40" y="250" fontSize="12" fontWeight="600" fill="var(--accent)">运行期（每次响应式更新）</text>

          <rect x="80" y="262" width="180" height="100" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="170" y="286" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">执行 render()</text>
          <text x="170" y="308" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">读取响应式数据</text>
          <text x="170" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">触发 track</text>
          <text x="170" y="344" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">产出新 VNode 树</text>

          <text x="275" y="316" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="295" y="262" width="180" height="100" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="385" y="286" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">diff 比对 patch</text>
          <text x="385" y="308" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">新旧 VNode 同层比较</text>
          <text x="385" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按 key 复用节点</text>
          <text x="385" y="344" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PatchFlag 只 diff 动态项</text>

          <text x="490" y="316" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="510" y="262" width="180" height="100" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="286" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">真实 DOM</text>
          <text x="600" y="308" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">最小化 DOM 操作</text>
          <text x="600" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">仅更新变化部分</text>
          <text x="600" y="344" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">浏览器重排重绘</text>

          <text x={VIEW_W / 2} y="406" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：指令不是字符串替换，而是编译期被翻译成等价的 JavaScript 逻辑
          </text>
          <text x={VIEW_W / 2} y="424" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            v-if → 三元、v-for → renderList、@click → addEventListener
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Vue 模板编译流程——模板字符串经 AST 与 transform 生成渲染函数，运行时渲染为 VNode 并 patch 到 DOM
      </figcaption>
    </figure>
  );
}
